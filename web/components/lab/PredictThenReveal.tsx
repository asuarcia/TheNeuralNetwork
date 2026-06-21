"use client";

import { useState } from "react";
import { Eye, Brain } from "lucide-react";

// Active-recall primitive: ask the learner to predict, then reveal the answer.
// Retrieval before being told boosts retention. Use in MDX:
//   <PredictThenReveal prompt="What will this output?">...the answer...</PredictThenReveal>
export function PredictThenReveal({ prompt, children }: { prompt: string; children: React.ReactNode }) {
  const [shown, setShown] = useState(false);
  return (
    <div className="my-8 rounded-2xl border border-sky-500/25 bg-sky-500/5 p-5">
      <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-widest text-sky-300">
        <Brain className="w-4 h-4" /> Predict first
      </div>
      <p className="text-neutral-200 font-medium mb-4">{prompt}</p>
      {shown ? (
        <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-neutral-300 [&>p]:m-0 [&>p+p]:mt-3">
          {children}
        </div>
      ) : (
        <button
          onClick={() => setShown(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 px-4 py-2 text-sm text-sky-200 hover:bg-sky-500/10 transition-colors"
        >
          <Eye className="w-4 h-4" /> Make your prediction, then reveal
        </button>
      )}
    </div>
  );
}
