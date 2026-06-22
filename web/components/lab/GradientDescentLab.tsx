"use client";

import { useEffect, useRef, useState } from "react";

// Interactive gradient-descent visualizer over f(x) = (x-3)^2.
// Step or run, and feel how the learning rate controls convergence vs. blow-up.
const XMIN = -1, XMAX = 7, YMAX = 16;
const W = 520, H = 240, PAD = 28;

const f = (x: number) => (x - 3) ** 2;
const df = (x: number) => 2 * (x - 3);
const sx = (x: number) => PAD + ((x - XMIN) / (XMAX - XMIN)) * (W - 2 * PAD);
const sy = (y: number) => H - PAD - (Math.min(y, YMAX) / YMAX) * (H - 2 * PAD);

export function GradientDescentLab() {
  const [x, setX] = useState(0);
  const [lr, setLr] = useState(0.1);
  const [running, setRunning] = useState(false);
  const [steps, setSteps] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = () => {
    if (timer.current) { clearInterval(timer.current); timer.current = null; }
    setRunning(false);
  };
  const step = () => {
    setX((cur) => {
      const next = cur - lr * df(cur);
      return Math.max(-3, Math.min(9, next)); // allow a little off-curve to show divergence
    });
    setSteps((s) => s + 1);
  };
  const run = () => {
    if (running) { stop(); return; }
    setRunning(true);
    timer.current = setInterval(step, 350);
  };
  const reset = () => { stop(); setX(0); setSteps(0); };

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);
  // auto-stop when converged or diverged
  useEffect(() => {
    if (running && (Math.abs(df(x)) < 0.01 || Math.abs(x) > 8.5)) stop();
  }, [x, running]);

  const curve = Array.from({ length: 81 }, (_, i) => {
    const xx = XMIN + (i / 80) * (XMAX - XMIN);
    return `${sx(xx)},${sy(f(xx))}`;
  }).join(" ");

  const diverging = Math.abs(x) > 8;

  return (
    <div className="my-8 rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-violet-400">Gradient Descent Lab</span>
        <span className="text-xs font-mono text-neutral-500">f(x) = (x − 3)²</span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-xl bg-black/40 border border-white/5">
        {/* minimum marker */}
        <line x1={sx(3)} y1={PAD - 8} x2={sx(3)} y2={H - PAD} stroke="#10b981" strokeOpacity="0.3" strokeDasharray="4 4" />
        <text x={sx(3) + 4} y={PAD - 2} fill="#10b981" fontSize="10" fontFamily="monospace">min x=3</text>
        {/* curve */}
        <polyline points={curve} fill="none" stroke="#a78bfa" strokeWidth="2.5" />
        {/* ball */}
        <circle cx={sx(x)} cy={sy(f(x))} r="7" fill={diverging ? "#f87171" : "#f472b6"} stroke="#fff" strokeWidth="1.5" />
        {/* gradient arrow at the ball */}
        <line
          x1={sx(x)} y1={sy(f(x))}
          x2={sx(x - Math.sign(df(x)) * 0.7)} y2={sy(f(x))}
          stroke="#fbbf24" strokeWidth="2" markerEnd=""
        />
      </svg>

      <div className="mt-4 grid sm:grid-cols-[1fr_auto] gap-4 items-end">
        <label className="block">
          <span className="flex justify-between text-xs font-mono text-neutral-400 mb-1">
            <span>learning rate</span><span className="text-neutral-200">{lr.toFixed(2)}</span>
          </span>
          <input type="range" min={0.01} max={1.1} step={0.01} value={lr}
            onChange={(e) => setLr(parseFloat(e.target.value))} className="w-full accent-violet-500" />
        </label>
        <div className="flex gap-2">
          <button onClick={step} className="rounded-lg border border-white/10 px-3 py-2 text-sm text-neutral-200 hover:border-white/25">Step</button>
          <button onClick={run} className="rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-3 py-2 text-sm font-medium text-white hover:from-violet-500 hover:to-purple-500">
            {running ? "Pause" : "Run"}
          </button>
          <button onClick={reset} className="rounded-lg border border-white/10 px-3 py-2 text-sm text-neutral-400 hover:text-white hover:border-white/25">Reset</button>
        </div>
      </div>

      <p className="mt-4 font-mono text-sm text-neutral-300">
        step {steps} · x = <span className="text-white font-bold">{x.toFixed(3)}</span> · loss = <span className="text-white font-bold">{f(x).toFixed(3)}</span> · slope = {df(x).toFixed(2)}
        {diverging && <span className="text-rose-400"> · diverging! lower the learning rate</span>}
        {!diverging && Math.abs(df(x)) < 0.01 && <span className="text-emerald-400"> · converged ✓</span>}
      </p>
      <p className="mt-2 text-xs text-neutral-500">
        Try lr ≈ 0.1 (smooth), lr ≈ 0.9 (bouncy), and lr &gt; 1.0 (watch it explode). The yellow arrow is the downhill step direction.
      </p>
    </div>
  );
}
