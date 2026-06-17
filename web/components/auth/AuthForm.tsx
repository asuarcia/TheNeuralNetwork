"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import {
  signInWithEmail,
  signUpWithEmail,
  oauthSignIn,
  type AuthState,
} from "@/lib/auth/actions";

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.9 2.9 14.7 2 12 2 6.9 2 2.8 6.1 2.8 11.9S6.9 21.9 12 21.9c5.5 0 9.1-3.9 9.1-9.4 0-.6-.06-1.1-.16-1.6H12z" />
    </svg>
  );
}

function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

export function AuthForm({
  mode,
  next = "/dashboard",
  initialError,
}: {
  mode: "login" | "signup";
  next?: string;
  initialError?: string;
}) {
  const isLogin = mode === "login";
  const action = isLogin ? signInWithEmail : signUpWithEmail;
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    action,
    initialError ? { error: initialError } : undefined
  );

  return (
    <div className="w-full max-w-md">
      <div className="mb-10 text-center">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-violet-400">
          {isLogin ? "Welcome back" : "Free account"}
        </span>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tighter">
          {isLogin ? "Sign in" : "Start learning"}
        </h1>
        <p className="mt-3 text-neutral-400 font-light">
          {isLogin
            ? "Pick up right where you left off."
            : "Create an account — no credit card, ever."}
        </p>
      </div>

      {/* OAuth */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {(["google", "github"] as const).map((provider) => (
          <form key={provider} action={oauthSignIn}>
            <input type="hidden" name="provider" value={provider} />
            <input type="hidden" name="next" value={next} />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-3 text-sm font-medium text-neutral-200 hover:border-violet-500/40 hover:bg-violet-500/5 transition-colors capitalize"
            >
              {provider === "google" ? <GoogleMark /> : <GithubMark />}
              {provider}
            </button>
          </form>
        ))}
      </div>

      <div className="flex items-center gap-4 my-6">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-600">or</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Email / password */}
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />

        {!isLogin && (
          <Field icon={<User className="w-4 h-4" />}>
            <input
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="w-full bg-transparent py-3 pl-11 pr-4 text-sm focus:outline-none placeholder:text-neutral-600"
            />
          </Field>
        )}

        <Field icon={<Mail className="w-4 h-4" />}>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email address"
            className="w-full bg-transparent py-3 pl-11 pr-4 text-sm focus:outline-none placeholder:text-neutral-600"
          />
        </Field>

        <Field icon={<Lock className="w-4 h-4" />}>
          <input
            name="password"
            type="password"
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
            placeholder="Password"
            className="w-full bg-transparent py-3 pl-11 pr-4 text-sm focus:outline-none placeholder:text-neutral-600"
          />
        </Field>

        {state?.error && (
          <p className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-4 py-2.5">
            {state.error}
          </p>
        )}
        {state?.message && (
          <p className="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2.5">
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="group w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 hover:from-violet-500 hover:to-purple-500 disabled:opacity-60 transition-all"
        >
          {pending
            ? isLogin
              ? "Signing in…"
              : "Creating account…"
            : isLogin
              ? "Sign in"
              : "Create free account"}
          {!pending && <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-neutral-500">
        {isLogin ? "New here? " : "Already have an account? "}
        <Link
          href={isLogin ? "/signup" : "/login"}
          className="text-violet-400 hover:text-violet-300 font-medium"
        >
          {isLogin ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
}

function Field({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="relative rounded-xl border border-white/10 bg-white/[0.03] focus-within:border-violet-500/50 transition-colors">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">{icon}</span>
      {children}
    </div>
  );
}
