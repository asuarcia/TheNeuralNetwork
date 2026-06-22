"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GraduationCap, Check, ArrowRight, Sparkles } from "lucide-react";
import { useProgress } from "@/lib/gamification/useProgress";
import { courseCompletedCount } from "@/lib/gamification/store";

// Credential ID is unique per user (random suffix stored in localStorage) and
// per course (slug prefix). Not server-verified — this is a self-reported
// completion certificate based on in-browser progress tracking.
const CRED_KEY = "tnn:cred-salt";

function credentialId(slug: string): string {
  // Stable random salt per browser (not per user — Supabase auth is optional).
  // Ensures the ID differs between devices/users even for the same course.
  let salt = "";
  try {
    salt = window.localStorage.getItem(CRED_KEY) ?? "";
    if (!salt) {
      salt = Math.random().toString(36).slice(2, 8).toUpperCase();
      window.localStorage.setItem(CRED_KEY, salt);
    }
  } catch { salt = "LOCAL"; }
  const combined = slug + "-" + salt;
  let h = 0;
  for (const ch of combined) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return "TNN-" + h.toString(36).toUpperCase().padStart(8, "0").slice(0, 8);
}

export function Certificate({
  slug,
  code,
  title,
  total,
  firstLesson,
}: {
  slug: string;
  code: string;
  title: string;
  total: number;
  firstLesson: string;
}) {
  const { ready } = useProgress();
  const [name, setName] = useState("");

  useEffect(() => {
    setName(window.localStorage.getItem("tnn:name") || "");
  }, []);

  function onName(v: string) {
    setName(v);
    try { window.localStorage.setItem("tnn:name", v); } catch {}
  }

  const done = ready ? Math.min(courseCompletedCount(slug), total) : 0;
  const complete = ready && done >= total && total > 0;
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="bg-neutral-950 min-h-screen text-white pt-32 px-6">
      <div className="container mx-auto max-w-3xl pb-32">
        <Link href={`/courses/${slug}`} className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-violet-400 transition-colors mb-10 inline-flex items-center gap-2 print:hidden">← {title}</Link>

        {!ready ? (
          <p className="text-neutral-500 font-mono text-sm">Loading your progress…</p>
        ) : complete ? (
          <>
            <div className="mb-6 print:hidden">
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">Name on certificate</label>
              <input
                value={name}
                onChange={(e) => onName(e.target.value)}
                placeholder="Type your name"
                className="w-full max-w-sm rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-white placeholder:text-neutral-600 focus:border-violet-500/50 outline-none"
              />
            </div>

            {/* The certificate */}
            <div className="relative rounded-2xl border border-violet-500/30 bg-gradient-to-br from-neutral-900 to-neutral-950 p-10 md:p-14 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(139,92,246,0.08)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-32 bg-violet-600/15 blur-3xl rounded-full pointer-events-none" />
              <div className="relative">
                <div className="flex items-center justify-center gap-2 mb-8">
                  <GraduationCap className="w-7 h-7 text-violet-400" />
                  <span className="text-lg font-bold tracking-tight">
                    <span className="text-white">The</span><span className="text-violet-400">Neural</span><span className="text-purple-500">Network</span>
                  </span>
                </div>
                <p className="text-xs font-mono uppercase tracking-[0.4em] text-violet-300 mb-6">Certificate of Completion</p>
                <p className="text-neutral-400 text-sm mb-2">This certifies that</p>
                <p className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-purple-400">
                  {name.trim() || "Your Name"}
                </p>
                <p className="text-neutral-400 text-sm mb-1">has completed all {total} lessons of</p>
                <p className="text-xl md:text-2xl font-bold tracking-tight mb-8">{code} · {title}</p>
                <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs font-mono text-neutral-500 border-t border-white/10 pt-6">
                  <span>{date}</span>
                  <span>Credential&nbsp;ID&nbsp;<span className="text-neutral-300">{credentialId(slug)}</span></span>
                  <span className="inline-flex items-center gap-1 text-violet-400"><Check className="w-3.5 h-3.5" /> Completed</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 print:hidden">
              <button onClick={() => window.print()} className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-purple-500 transition-all">
                Print / Save as PDF
              </button>
              <Link href="/map" className="rounded-xl border border-white/10 px-6 py-3 text-sm text-neutral-300 hover:border-violet-500/40 hover:text-white transition-colors inline-flex items-center gap-2">
                Back to your map <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-7 h-7 text-violet-400" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-3">Your certificate is waiting</h1>
            <p className="text-neutral-400 mb-2">Finish all {total} lessons of <span className="text-white font-medium">{title}</span> to unlock your Certificate of Completion.</p>
            <p className="text-sm text-neutral-500 mb-8">Progress: <span className="text-violet-300 font-bold">{done} / {total}</span> lessons</p>
            <div className="w-full max-w-sm mx-auto h-2 rounded-full bg-white/10 overflow-hidden mb-8">
              <div className="h-full bg-gradient-to-r from-violet-400 to-purple-500 transition-all" style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
            </div>
            <Link href={`/learn/${slug}/${firstLesson}`} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-purple-500 transition-all">
              <Sparkles className="w-4 h-4" /> {done > 0 ? "Keep going" : "Start the track"}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
