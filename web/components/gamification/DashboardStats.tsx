"use client";

import { Flame, BookOpen, Zap } from "lucide-react";
import { useProgress } from "@/lib/gamification/useProgress";

export function DashboardStats() {
  const { progress, level, ready } = useProgress();
  const stats = [
    { icon: Flame, label: "Day streak", value: ready ? String(progress.streak) : "–" },
    { icon: BookOpen, label: "Lessons completed", value: ready ? String(progress.completed.length) : "–" },
    { icon: Zap, label: `Level ${ready ? level.level : ""} · ${ready ? level.title : ""}`.trim(), value: ready ? `${progress.xp} XP` : "–" },
  ];
  return (
    <div className="grid sm:grid-cols-3 gap-4 mb-16">
      {stats.map((s) => (
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
  );
}
