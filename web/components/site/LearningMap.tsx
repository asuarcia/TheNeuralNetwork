"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Flame, Zap, Check } from "lucide-react";
import { curriculum, type Level } from "@/content/curriculum";
import { useProgress } from "@/lib/gamification/useProgress";
import { courseCompletedCount } from "@/lib/gamification/store";

const TIERS: Level[] = ["Beginner", "Intermediate", "Advanced", "Expert"];
const tierColor: Record<Level, string> = {
  Beginner: "from-emerald-500 to-emerald-400",
  Intermediate: "from-amber-500 to-amber-400",
  Advanced: "from-violet-500 to-violet-400",
  Expert: "from-pink-500 to-pink-400",
};
const tierText: Record<Level, string> = {
  Beginner: "text-emerald-400",
  Intermediate: "text-amber-400",
  Advanced: "text-violet-400",
  Expert: "text-pink-400",
};

function Ring({ pct, color }: { pct: number; color: string }) {
  const r = 18, c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 44 44" className="w-11 h-11 -rotate-90 shrink-0">
      <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
      <circle cx="22" cy="22" r={r} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} />
    </svg>
  );
}

export function LearningMap() {
  const { progress, level, ready } = useProgress();

  return (
    <div className="bg-neutral-950 min-h-screen text-white pt-32 px-6">
      <div className="container mx-auto max-w-5xl pb-32">
        <Link href="/" className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-violet-400 transition-colors mb-8 inline-flex items-center gap-2">← Home</Link>

        {/* Player header */}
        <div className="mb-14 rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-transparent p-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] mb-6">
            Your Learning<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500">Map</span>
          </h1>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-500/20 text-violet-300 text-xl font-bold">{ready ? level.level : "–"}</div>
              <div>
                <p className="text-sm font-bold text-white">{ready ? level.title : "…"}</p>
                <div className="w-32 h-1.5 rounded-full bg-white/10 overflow-hidden mt-1">
                  <div className="h-full bg-gradient-to-r from-violet-400 to-purple-500" style={{ width: `${ready ? level.pct : 0}%` }} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-amber-300"><Zap className="w-5 h-5" /><span className="font-bold">{ready ? progress.xp : 0}</span><span className="text-neutral-500 text-sm">XP</span></div>
            <div className="flex items-center gap-2 text-amber-400"><Flame className="w-5 h-5" /><span className="font-bold">{ready ? progress.streak : 0}</span><span className="text-neutral-500 text-sm">day streak</span></div>
            <div className="flex items-center gap-2 text-emerald-400"><Check className="w-5 h-5" /><span className="font-bold">{ready ? progress.completed.length : 0}</span><span className="text-neutral-500 text-sm">lessons done</span></div>
          </div>
        </div>

        {/* Tiers */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/30 via-violet-500/30 to-pink-500/30 -translate-x-1/2 hidden md:block" />
          {TIERS.map((tier) => {
            const tracks = curriculum.filter((c) => c.level === tier);
            if (!tracks.length) return null;
            return (
              <div key={tier} className="relative mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`text-xs font-mono uppercase tracking-[0.3em] ${tierText[tier]}`}>{tier}</span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {tracks.map((course, idx) => {
                    const total = course.lessons.length;
                    const done = ready ? Math.min(courseCompletedCount(course.slug), total) : 0;
                    const pct = total ? (done / total) * 100 : 0;
                    const complete = done >= total && total > 0;
                    return (
                      <motion.div key={course.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
                        <Link href={`/courses/${course.slug}`}
                          className={`group flex items-center gap-4 rounded-2xl border bg-white/[0.02] p-5 transition-all hover:bg-white/[0.04] ${complete ? "border-emerald-500/40" : "border-white/8 hover:border-violet-500/30"}`}>
                          <div className="relative flex items-center justify-center">
                            <Ring pct={pct} color={complete ? "#34d399" : "#a78bfa"} />
                            <span className="absolute text-[0.7rem] font-mono text-neutral-300">{done}/{total}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[0.65rem] font-mono uppercase tracking-widest text-neutral-500">{course.code}</span>
                            <h3 className="font-bold tracking-tight truncate group-hover:text-violet-300 transition-colors">{course.title}</h3>
                            <p className="text-xs text-neutral-500 truncate">{course.topics.slice(0, 3).join(" · ")}</p>
                          </div>
                          {complete
                            ? <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                            : <span className={`text-xs font-mono ${tierText[tier]} shrink-0`}>{Math.round(pct)}%</span>}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center">
          <p className="text-neutral-400 text-sm">Finish lessons to earn XP, level up, and light up the map. Keep a daily streak going with a quick <Link href="/review" className="text-violet-400 hover:text-violet-300">review session</Link>.</p>
        </div>
      </div>
    </div>
  );
}
