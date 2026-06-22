"use client";

import Link from "next/link";
import { Flame, Zap } from "lucide-react";
import { useProgress } from "@/lib/gamification/useProgress";

// Compact XP / level / streak chip for the navbar. Hidden until mounted so it
// doesn't flash default values or cause hydration mismatch.
export function XpBadge() {
  const { progress, level, ready } = useProgress();
  if (!ready || progress.xp === 0) return null;

  return (
    <Link
      href="/map"
      className="hidden sm:flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] pl-3 pr-1.5 py-1 hover:border-violet-500/40 transition-colors"
      title={`${progress.xp} XP · ${level.title}`}
    >
      {progress.streak > 0 && (
        <span className="flex items-center gap-1 text-xs font-mono text-amber-400">
          <Flame className="w-3.5 h-3.5" />
          {progress.streak}
        </span>
      )}
      <span className="flex items-center gap-1.5">
        <span className="relative flex items-center">
          <span className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <span
              className="block h-full bg-gradient-to-r from-violet-400 to-purple-500"
              style={{ width: `${level.pct}%` }}
            />
          </span>
        </span>
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold">
          {level.level}
        </span>
      </span>
    </Link>
  );
}

// Inline "+XP" tag used on the lesson completion button etc.
export function XpTag({ amount }: { amount: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-amber-300">
      <Zap className="w-3.5 h-3.5" /> +{amount} XP
    </span>
  );
}
