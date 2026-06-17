# Security

How TheNeuralNetwork protects users and data, what's enforced in code, and what you (the operator) must do.

## What's implemented

### Authentication & sessions
- Auth is handled by **Supabase** (`@supabase/ssr`), not hand-rolled. Sessions live in **httpOnly, Secure, SameSite cookies** — not readable by JavaScript, which blocks token theft via XSS.
- The session is refreshed server-side on every request in `proxy.ts` (Next 16's renamed middleware).
- Passwords are never stored or handled by this app; Supabase hashes them.

### Authorization (row-level security)
- Every user-data table (`profiles`, `enrollments`, `lesson_progress`) has **RLS enabled** with policies that allow a user to read/write **only their own rows** (`auth.uid() = user_id`). See `supabase/schema.sql`.
- The Supabase **anon key is public by design** — it's safe in the client *because* RLS is the real gatekeeper. Never disable RLS.
- Route gating: `proxy.ts` redirects unauthenticated users away from `/dashboard` and `/learn`. This is defense-in-depth; RLS is the authoritative check.

### Brute-force protection
- Auth server actions are **rate-limited** per IP (`lib/security/rate-limit.ts`, 8 attempts/minute). In-memory for single-instance/beta; move to a shared store (Upstash/Redis) for multi-instance production.

### HTTP security headers (`next.config.ts`)
- `X-Frame-Options: DENY` + CSP `frame-ancestors 'none'` — anti-clickjacking.
- `X-Content-Type-Options: nosniff` — no MIME sniffing.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy` — denies camera/mic/geolocation/topics.
- **Production-only**: `Content-Security-Policy` (restricts script/style/img/connect/worker sources to self + the few required origins: jsdelivr for Pyodide, Supabase) and `Strict-Transport-Security` (HSTS). CSP is prod-only so it doesn't block local HMR.

### CSRF
- Mutations go through **Next.js Server Actions**, which include built-in Origin verification — standard CSRF protection.

### Untrusted code execution (lesson exercises)
- Learner Python runs in **Pyodide (WebAssembly)** — a sandboxed runtime with no access to the host filesystem or network unless explicitly granted. It can't read cookies or call your backend.
- Lesson content (MDX) is **authored in-repo** and trusted; it is not user-generated, so no injection surface there.

### Secrets
- `.env.local` is git-ignored (`.gitignore` covers `.env*`). Only `NEXT_PUBLIC_*` values reach the browser.
- The **service-role key** is server-only and never imported into client code.

## Known tradeoffs / future hardening
- The production CSP includes `'unsafe-inline'` and `'unsafe-eval'` in `script-src` because (a) Next injects inline hydration scripts and (b) Pyodide needs eval/wasm-eval. To tighten: adopt **nonce-based CSP** and run Pyodide in a **dedicated Web Worker** with a stricter policy.
- Rate limiting is in-memory (resets on restart, per-instance). Use a shared store for real scale.

## Operator responsibilities (do these)
1. **Never commit `.env.local`** or expose the service-role key.
2. In Supabase: keep **RLS on**, require **email confirmation**, set a **strong database password**, and enable the dashboard's **Auth rate-limiting / CAPTCHA** for an extra layer.
3. Restrict **OAuth redirect URLs** to your real domains (and `http://localhost:3000/auth/callback` for local dev only).
4. Rotate keys immediately if any are leaked.
5. Run `npm audit` regularly and keep dependencies patched.

## Reporting
Found a vulnerability? Email security@theneuralnetwork.ai (placeholder) rather than opening a public issue.
