"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { rateLimit, sweepExpired } from "@/lib/security/rate-limit";
import { safeNext } from "@/lib/security/safe-redirect";

export type AuthState = { error?: string; message?: string } | undefined;

const NOT_CONFIGURED =
  "Accounts aren't connected yet — add your Supabase keys to .env.local to enable sign in.";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Canonical site origin. Prefer a server-configured URL so a spoofed Host
// header can't poison confirmation / OAuth redirect links (account takeover).
// Falls back to the Host header only for local dev convenience.
async function siteOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/+$/, "");
  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const proto = host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  return `${proto}://${host}`;
}

// Best-effort client IP. Trust the platform's x-real-ip first; for x-forwarded-for
// take the LAST hop (added by our trusted edge), since earlier entries are
// client-controlled and trivially spoofed to bypass rate limiting.
async function clientIp() {
  const h = await headers();
  const real = h.get("x-real-ip");
  if (real) return real.trim();
  const parts = (h.get("x-forwarded-for") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length ? parts[parts.length - 1] : "local";
}

// Rate limit by IP and (when available) by account, so distributed
// credential-stuffing across many IPs can't slip past a per-IP limit alone.
async function checkAuthRate(email?: string): Promise<string | null> {
  sweepExpired();
  const ip = await clientIp();
  const byIp = rateLimit(`auth:ip:${ip}`, 8, 60_000);
  if (!byIp.ok) return `Too many attempts. Try again in ${byIp.retryAfter}s.`;
  if (email) {
    const byEmail = rateLimit(`auth:email:${email.toLowerCase()}`, 6, 60_000);
    if (!byEmail.ok) return `Too many attempts for this account. Try again in ${byEmail.retryAfter}s.`;
  }
  return null;
}

export async function signInWithEmail(_prev: AuthState, formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured) return { error: NOT_CONFIGURED };

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = safeNext(formData.get("next"));

  const limited = await checkAuthRate(email);
  if (limited) return { error: limited };

  if (!isEmail(email)) return { error: "Enter a valid email address." };
  if (password.length < 6) return { error: "Password must be at least 6 characters." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  redirect(next);
}

export async function signUpWithEmail(_prev: AuthState, formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured) return { error: NOT_CONFIGURED };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const limited = await checkAuthRate(email);
  if (limited) return { error: limited };

  if (name.length < 2) return { error: "Tell us your name (2+ characters)." };
  if (!isEmail(email)) return { error: "Enter a valid email address." };
  if (password.length < 6) return { error: "Password must be at least 6 characters." };

  const supabase = await createClient();
  const origin = await siteOrigin();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: name },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });
  if (error) return { error: error.message };

  // If email confirmation is on, there is no active session yet.
  if (data.session) redirect("/dashboard");
  return { message: "Almost there — check your inbox to confirm your email, then sign in." };
}

export async function oauthSignIn(formData: FormData): Promise<void> {
  if (!isSupabaseConfigured) redirect("/login?error=not_configured");
  if (await checkAuthRate()) redirect("/login?error=rate");

  const provider = String(formData.get("provider") ?? "");
  const next = safeNext(formData.get("next"));
  if (provider !== "google" && provider !== "github") redirect("/login");

  const supabase = await createClient();
  const origin = await siteOrigin();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}` },
  });

  if (error || !data.url) redirect("/login?error=oauth");
  redirect(data.url);
}

export async function signOut(): Promise<void> {
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/login");
}
