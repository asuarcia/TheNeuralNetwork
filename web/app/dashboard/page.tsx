import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, BookOpen, Flame, Trophy, LogOut, TriangleAlert } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { signOut } from "@/lib/auth/actions";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Dashboard — TheNeuralNetwork",
};

export default async function DashboardPage() {
  let displayName = "Explorer";
  let email: string | null = null;

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login?next=/dashboard");
    email = user.email ?? null;
    displayName =
      (user.user_metadata?.display_name as string | undefined) ??
      user.email?.split("@")[0] ??
      "Explorer";
  }

  const recommended = projects.slice(0, 3);

  return (
    <main className="min-h-screen bg-neutral-950 pt-32 px-6 pb-24">
      <div className="container mx-auto">
        {!isSupabaseConfigured && (
          <div className="mb-10 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-200">
            <TriangleAlert className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              Preview mode — accounts aren&apos;t connected yet. Add your Supabase keys to{" "}
              <code className="font-mono text-amber-100">.env.local</code> to enable real sign-in and progress tracking.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-violet-400">Dashboard</span>
            <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tighter">
              Welcome back,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500">
                {displayName}
              </span>
            </h1>
            {email && <p className="mt-2 text-sm text-neutral-500 font-mono">{email}</p>}
          </div>
          <form action={signOut}>
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-neutral-300 hover:border-violet-500/40 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </form>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {[
            { icon: Flame, label: "Day streak", value: "0" },
            { icon: BookOpen, label: "Lessons completed", value: "0" },
            { icon: Trophy, label: "Certificates", value: "0" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight">{s.value}</p>
                <p className="text-xs uppercase tracking-widest text-neutral-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Continue learning — empty state for now (lesson engine arrives in Phase 2) */}
        <section className="mb-16">
          <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 mb-6">Continue learning</h2>
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-8 py-14 text-center">
            <p className="text-lg text-neutral-300 font-light mb-2">Your first interactive course is ready.</p>
            <p className="text-sm text-neutral-500 mb-6">Written lessons with runnable Python, right in the browser.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/learn/ai-foundations"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 hover:from-violet-500 hover:to-purple-500 transition-all"
              >
                Start AI Foundations
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm text-neutral-300 hover:border-violet-500/40 hover:text-white transition-colors"
              >
                Browse all
              </Link>
            </div>
          </div>
        </section>

        {/* Recommended */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">Recommended for you</h2>
            <Link href="/courses" className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-violet-400 transition-colors">
              View all
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recommended.map((course) => {
              const [level] = course.category.split(" · ");
              return (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="group rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-violet-500/30 transition-colors"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-mono uppercase tracking-widest text-violet-400">{level}</span>
                    <h3 className="mt-1 text-lg font-bold tracking-tight group-hover:text-violet-300 transition-colors">{course.title}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
