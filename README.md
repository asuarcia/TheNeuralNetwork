# TheNeuralNetwork

**Master AI by building — from beginner fundamentals to advanced neural architectures.**

An AI education platform for all skill levels. Learn by doing: every lesson runs real Python in your browser, with auto-checked exercises and quizzes. No setup, no install.

> The application lives in [`./web`](./web).

## Highlights

- **Interactive lessons** — written content with runnable Python (via [Pyodide](https://pyodide.org) / WebAssembly), auto-graded `<CodeExercise>` and `<Quiz>` components.
- **A real curriculum** — four tracks, beginner → expert: AI Foundations, Machine Learning, Deep Learning, AI Engineering.
- **Accounts & progress** — email/password + Google + GitHub sign-in, progress tracking, all gated by row-level security.
- **Built for trust** — CSP, HSTS, rate-limiting, and a sandboxed code runtime. See [`web/SECURITY.md`](./web/SECURITY.md).

## Tech stack

- **Next.js (App Router)** + **React** + **TypeScript**
- **Tailwind CSS v4** + Framer Motion
- **Supabase** — Postgres, Auth, row-level security
- **Pyodide** — Python in the browser
- **MDX** (`@next/mdx`) for lesson content

## Getting started

```bash
cd web
npm install
cp .env.example .env.local   # then fill in your Supabase keys
npm run dev
```

Open http://localhost:3000. The app runs in "preview mode" until Supabase keys are added — see [`web/SECURITY.md`](./web/SECURITY.md) and the env example for setup.

### Connect Supabase (to enable accounts & progress)

1. Create a project at [supabase.com](https://supabase.com) and put its URL + anon key in `web/.env.local`.
2. Run [`web/supabase/schema.sql`](./web/supabase/schema.sql) in the Supabase SQL editor.
3. Enable Google / GitHub providers and add `http://localhost:3000/auth/callback` as a redirect URL.

## Project structure

```
web/
├─ app/                 # routes: marketing, courses, auth, dashboard, /learn lessons
├─ components/          # UI, landing sections, auth, lesson primitives
├─ content/             # curriculum manifest + MDX lessons
├─ lib/                 # supabase clients, auth actions, pyodide runtime, security
├─ supabase/schema.sql  # user-data tables + RLS
└─ SECURITY.md
```

## Status

Free public beta. Built with care — designed to teach AI the way it should be learned: by building.
