"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { rateLimit, sweepExpired } from "@/lib/security/rate-limit";

export type AuthState = { error?: string; message?: string } | undefined;

const NOT_CONFIGURED =
  "Accounts aren't connected yet — add your Supabase keys to .env.local to enable sign in.";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function siteOrigin() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

async function clientIp() {
  const h = await headers();
  return (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local";
}

// Returns an error string if the caller has exceeded the auth attempt budget.
async function checkAuthRate(): Promise<string | null> {
  sweepExpired();
  const ip = await clientIp();
  const { ok, retryAfter } = rateLimit(`auth:${ip}`, 8, 60_000);
  return ok ? null : `Too many attempts. Try again in ${retryAfter}s.`;
}

export async function signInWithEmail(_prev: AuthState, formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured) return { error: NOT_CONFIGURED };
  const limited = await checkAuthRate();
  if (limited) return { error: limited };

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/dashboard") || "/dashboard";

  if (!isEmail(email)) return { error: "Enter a valid email address." };
  if (password.length < 6) return { error: "Password must be at least 6 characters." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  redirect(next);
}

export async function signUpWithEmail(_prev: AuthState, formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured) return { error: NOT_CONFIGURED };
  const limited = await checkAuthRate();
  if (limited) return { error: limited };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

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
  const next = String(formData.get("next") ?? "/dashboard") || "/dashboard";
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
