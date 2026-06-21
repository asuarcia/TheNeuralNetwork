"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkles, Flame } from "lucide-react";
import { FlashcardDeck } from "@/components/lab/FlashcardDeck";
import { reviewDeck } from "@/content/review-deck";
import { useProgress } from "@/lib/gamification/useProgress";

export function ReviewSession() {
  const [started, setStarted] = useState(false);
  const { progress, ready } = useProgress();

  return (
    <div className="bg-neutral-950 min-h-screen text-white pt-32 px-6">
      <div className="container mx-auto max-w-2xl pb-32">
        <Link href="/map" className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-violet-400 transition-colors mb-8 inline-flex items-center gap-2">← Map</Link>

        {!started ? (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-violet-300 mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Active recall
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] mb-6">
              Daily<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500">Review</span>
            </h1>
            <p className="text-lg font-light text-neutral-400 mb-8 max-w-md mx-auto">
              {reviewDeck.length} flashcards covering the biggest idea from every track. Recall each answer <em>before</em> flipping — retrieval is what makes it stick. Earn XP and keep your streak alive.
            </p>
            {ready && progress.streak > 0 && (
              <p className="mb-6 inline-flex items-center gap-1.5 text-amber-400 text-sm"><Flame className="w-4 h-4" /> {progress.streak}-day streak — don&apos;t break it!</p>
            )}
            <div>
              <button onClick={() => setStarted(true)} className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 font-bold text-white shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-purple-500 transition-all hover:scale-[1.02]">
                Start review
              </button>
            </div>
          </div>
        ) : (
          <FlashcardDeck cards={reviewDeck} />
        )}
      </div>
    </div>
  );
}
