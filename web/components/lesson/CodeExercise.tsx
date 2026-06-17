"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { python } from "@codemirror/lang-python";
import { Play, RotateCcw, Eye, Check, X } from "lucide-react";
import { runPython } from "@/lib/pyodide/runtime";

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), {
  ssr: false,
  loading: () => (
    <div className="p-4 font-mono text-sm text-neutral-600">Loading editor…</div>
  ),
});

type Status = "idle" | "running" | "pass" | "fail";

export function CodeExercise({
  prompt,
  starter,
  expected,
  solution,
}: {
  id?: string;
  prompt?: string;
  starter: string;
  expected?: string;
  solution?: string;
}) {
  const [code, setCode] = useState(starter);
  const [output, setOutput] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [showSolution, setShowSolution] = useState(false);

  async function run() {
    setStatus("running");
    setOutput("Loading Python and running…");
    const res = await runPython(code);
    const out = res.output.trim();
    setOutput(res.error ? `${out}\n${res.error}`.trim() : out || "(no output)");
    if (res.error) {
      setStatus("fail");
    } else if (expected !== undefined) {
      setStatus(out === expected.trim() ? "pass" : "fail");
    } else {
      setStatus("idle");
    }
  }

  function reset() {
    setCode(starter);
    setOutput("");
    setStatus("idle");
    setShowSolution(false);
  }

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60">
      {prompt && (
        <p className="border-b border-white/5 px-5 py-3.5 text-sm text-neutral-300">{prompt}</p>
      )}

      <div className="bg-[#0f0f12]">
        <CodeMirror
          value={code}
          onChange={(v) => setCode(v)}
          extensions={[python()]}
          theme="dark"
          basicSetup={{ lineNumbers: true, highlightActiveLine: false }}
        />
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 border-t border-white/5 px-4 py-3">
        <button
          onClick={run}
          disabled={status === "running"}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-purple-500 disabled:opacity-60 transition-all"
        >
          <Play className="w-4 h-4" />
          {status === "running" ? "Running…" : "Run"}
        </button>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-neutral-400 hover:text-white hover:border-white/20 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
        {solution && (
          <button
            onClick={() => setShowSolution((s) => !s)}
            className="ml-auto inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-neutral-400 hover:text-white hover:border-white/20 transition-colors"
          >
            <Eye className="w-4 h-4" />
            {showSolution ? "Hide" : "Solution"}
          </button>
        )}
      </div>

      {/* Status */}
      {status === "pass" && (
        <div className="flex items-center gap-2 border-t border-emerald-500/20 bg-emerald-500/10 px-5 py-2.5 text-sm font-medium text-emerald-300">
          <Check className="w-4 h-4" /> Correct — nicely done.
        </div>
      )}
      {status === "fail" && (
        <div className="flex items-center gap-2 border-t border-rose-500/20 bg-rose-500/10 px-5 py-2.5 text-sm font-medium text-rose-300">
          <X className="w-4 h-4" />
          {expected !== undefined ? "Not quite — check the output below." : "There was an error — see below."}
        </div>
      )}

      {/* Output */}
      {output && (
        <pre className="max-h-56 overflow-auto border-t border-white/5 bg-black/40 px-5 py-4 font-mono text-sm text-neutral-300 whitespace-pre-wrap">
          {output}
        </pre>
      )}

      {showSolution && solution && (
        <pre className="border-t border-white/5 bg-black/40 px-5 py-4 font-mono text-sm text-violet-200 whitespace-pre-wrap">
          {solution}
        </pre>
      )}
    </div>
  );
}
