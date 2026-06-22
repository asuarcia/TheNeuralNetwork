"use client";

import { useState } from "react";

// Interactive single-neuron playground. Drag the inputs, weights, and bias and
// watch the weighted sum and activation update live. Embeddable in MDX.
function Slider({ label, value, set, min, max, step = 0.1, color }: {
  label: string; value: number; set: (n: number) => void; min: number; max: number; step?: number; color: string;
}) {
  return (
    <label className="block">
      <span className="flex justify-between text-xs font-mono text-neutral-400 mb-1">
        <span>{label}</span>
        <span className="text-neutral-200">{value.toFixed(1)}</span>
      </span>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => set(parseFloat(e.target.value))}
        className="w-full accent-violet-500"
        style={{ accentColor: color }}
      />
    </label>
  );
}

export function NeuronLab() {
  const [x1, setX1] = useState(1);
  const [x2, setX2] = useState(2);
  const [w1, setW1] = useState(0.5);
  const [w2, setW2] = useState(-1);
  const [b, setB] = useState(1);

  const z = w1 * x1 + w2 * x2 + b;
  const a = Math.max(0, z); // ReLU
  const firing = a > 0;
  const barPct = Math.min(100, (a / 6) * 100);

  return (
    <div className="my-8 rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs font-mono uppercase tracking-widest text-violet-400">Neuron Lab</span>
        <span className="text-xs font-mono text-neutral-500">drag the dials</span>
      </div>
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
        <div className="space-y-3">
          <p className="text-[0.7rem] font-mono uppercase tracking-widest text-neutral-500">Inputs</p>
          <Slider label="x₁" value={x1} set={setX1} min={-3} max={3} color="#60a5fa" />
          <Slider label="x₂" value={x2} set={setX2} min={-3} max={3} color="#60a5fa" />
        </div>
        <div className="space-y-3">
          <p className="text-[0.7rem] font-mono uppercase tracking-widest text-neutral-500">Weights &amp; bias</p>
          <Slider label="w₁" value={w1} set={setW1} min={-2} max={2} color="#a78bfa" />
          <Slider label="w₂" value={w2} set={setW2} min={-2} max={2} color="#a78bfa" />
          <Slider label="bias" value={b} set={setB} min={-3} max={3} color="#f472b6" />
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-black/40 border border-white/5 p-5">
        <p className="font-mono text-sm text-neutral-300">
          z = ({w1.toFixed(1)})·({x1.toFixed(1)}) + ({w2.toFixed(1)})·({x2.toFixed(1)}) + ({b.toFixed(1)}) ={" "}
          <span className="text-white font-bold">{z.toFixed(2)}</span>
        </p>
        <p className="font-mono text-sm text-neutral-300 mt-1">
          ReLU(z) = max(0, z) = <span className={firing ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>{a.toFixed(2)}</span>
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-3 flex-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className={`h-full transition-all ${firing ? "bg-gradient-to-r from-emerald-500 to-emerald-400" : "bg-rose-500/40"}`}
              style={{ width: `${Math.max(barPct, firing ? 4 : 0)}%` }}
            />
          </div>
          <span className={`text-xs font-mono ${firing ? "text-emerald-400" : "text-rose-400"}`}>
            {firing ? "FIRING" : "silent"}
          </span>
        </div>
      </div>
      <p className="mt-3 text-xs text-neutral-500">
        Negative inputs or weights can push z below zero — ReLU then clamps the neuron to silent. That single bend is what lets stacked neurons model curves.
      </p>
    </div>
  );
}
