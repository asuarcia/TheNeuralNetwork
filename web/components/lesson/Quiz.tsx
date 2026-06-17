"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

export function Quiz({
  question,
  options,
  answer,
  explanation,
}: {
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const revealed = selected !== null;
  const correct = selected === answer;

  return (
    <div className="my-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <p className="font-medium text-white mb-5">{question}</p>
      <div className="space-y-2.5">
        {options.map((opt, i) => {
          const isAnswer = i === answer;
          const isPicked = i === selected;
          let cls = "border-white/10 bg-white/[0.02] hover:border-violet-500/40";
          if (revealed && isAnswer) cls = "border-emerald-500/50 bg-emerald-500/10";
          else if (revealed && isPicked && !isAnswer) cls = "border-rose-500/50 bg-rose-500/10";
          return (
            <button
              key={i}
              disabled={revealed}
              onClick={() => setSelected(i)}
              className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm text-neutral-200 transition-colors disabled:cursor-default ${cls}`}
            >
              <span>{opt}</span>
              {revealed && isAnswer && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
              {revealed && isPicked && !isAnswer && <X className="w-4 h-4 text-rose-400 shrink-0" />}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="mt-5">
          <p className={`text-sm font-medium ${correct ? "text-emerald-400" : "text-rose-400"}`}>
            {correct ? "Correct!" : "Not quite."}
          </p>
          {explanation && <p className="mt-1.5 text-sm text-neutral-400 leading-relaxed">{explanation}</p>}
          {!correct && (
            <button
              onClick={() => setSelected(null)}
              className="mt-3 text-xs font-mono uppercase tracking-widest text-violet-400 hover:text-violet-300"
            >
              Try again
            </button>
          )}
        </div>
      )}
    </div>
  );
}
