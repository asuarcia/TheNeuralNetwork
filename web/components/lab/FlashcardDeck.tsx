"use client";

import { useState } from "react";
import { RotateCw, Check, X, Trophy } from "lucide-react";
import { addXp, XP_PER_QUIZ } from "@/lib/gamification/store";

export interface Card { front: string; back: string; track: string }

// A spaced-repetition-style review session: flip each card (active recall),
// mark "Got it" or "Again". Missed cards loop back to the end of the queue.
export function FlashcardDeck({ cards }: { cards: Card[] }) {
  const [queue, setQueue] = useState<Card[]>(() => shuffle(cards));
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(0);
  const [missed, setMissed] = useState(0);
  const total = cards.length;

  if (queue.length === 0) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-10 text-center">
        <Trophy className="w-10 h-10 text-amber-400 mx-auto mb-4" />
        <p className="text-xl font-bold text-white mb-1">Review complete!</p>
        <p className="text-neutral-400">{done} reviewed · {missed} needed a second look. Come back tomorrow to keep the streak alive.</p>
      </div>
    );
  }

  const card = queue[i];

  function answer(got: boolean) {
    addXp(got ? XP_PER_QUIZ : 0);
    setDone((d) => d + 1);
    const rest = queue.filter((_, idx) => idx !== i);
    const nextQueue = got ? rest : [...rest, card];
    if (!got) setMissed((m) => m + 1);
    setFlipped(false);
    setQueue(nextQueue);
    setI(nextQueue.length === 0 ? 0 : i % Math.max(nextQueue.length, 1));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 text-xs font-mono text-neutral-500">
        <span>{queue.length} in queue</span>
        <span className="px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300">{card.track}</span>
        <span>{done} / {total}+ reviewed</span>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="w-full min-h-[220px] rounded-2xl border border-white/10 bg-neutral-900/60 p-8 flex flex-col items-center justify-center text-center hover:border-violet-500/30 transition-colors"
      >
        <span className="text-[0.7rem] font-mono uppercase tracking-widest text-neutral-500 mb-3">
          {flipped ? "Answer" : "Question — recall it, then flip"}
        </span>
        <span className="text-lg md:text-xl text-white leading-relaxed">{flipped ? card.back : card.front}</span>
        <span className="mt-5 inline-flex items-center gap-1.5 text-xs text-neutral-500">
          <RotateCw className="w-3.5 h-3.5" /> {flipped ? "flip back" : "tap to flip"}
        </span>
      </button>

      {flipped && (
        <div className="mt-4 flex gap-3">
          <button onClick={() => answer(false)} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/5 px-4 py-3 text-sm text-rose-300 hover:bg-rose-500/10">
            <X className="w-4 h-4" /> Again
          </button>
          <button onClick={() => answer(true)} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-300 hover:bg-emerald-500/10">
            <Check className="w-4 h-4" /> Got it <span className="text-amber-300 text-xs">+{XP_PER_QUIZ}</span>
          </button>
        </div>
      )}
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
