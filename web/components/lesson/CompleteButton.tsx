"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, Zap } from "lucide-react";
import { completeLesson, isCompleted, XP_PER_LESSON } from "@/lib/gamification/store";
import { Confetti } from "@/components/gamification/Confetti";

// Client-side lesson completion: awards XP, fires confetti, then advances.
// (On the interactive-overhaul branch this replaces the server form action;
// progress lives in localStorage so it works with no backend.)
export function CompleteButton({
  lessonId,
  nextHref,
  isLast,
}: {
  lessonId: string;
  nextHref: string;
  isLast: boolean;
}) {
  const router = useRouter();
  const [fire, setFire] = useState(0);
  const [busy, setBusy] = useState(false);

  function onClick() {
    if (busy) return;
    setBusy(true);
    const already = isCompleted(lessonId);
    completeLesson(lessonId, XP_PER_LESSON);
    setFire((n) => n + 1);
    // Let the confetti play, then move on.
    setTimeout(() => router.push(nextHref), already ? 250 : 950);
  }

  return (
    <>
      <Confetti fire={fire} />
      <button
        onClick={onClick}
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 hover:from-violet-500 hover:to-purple-500 transition-all disabled:opacity-80"
      >
        <Check className="w-4 h-4" />
        {isLast ? "Finish course" : "Complete & continue"}
        <span className="ml-1 inline-flex items-center gap-1 text-amber-200 text-xs">
          <Zap className="w-3.5 h-3.5" /> +{XP_PER_LESSON}
        </span>
        {!isLast && <ArrowRight className="w-4 h-4" />}
      </button>
    </>
  );
}
