import { GraduationCap } from "lucide-react";

// End-of-lesson assignment. A distinct amber-themed box so homework reads as
// a clear call to action, separate from inline tips/notes.
export function Homework({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-amber-500/30 bg-amber-500/5">
      <div className="flex items-center gap-2 border-b border-amber-500/20 bg-amber-500/10 px-5 py-2.5">
        <GraduationCap className="w-4 h-4 text-amber-400" />
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-300">Homework</span>
      </div>
      <div className="px-5 py-4 text-neutral-300 leading-relaxed [&>p]:mb-3 [&>p:last-child]:mb-0 [&>ol]:mb-0 [&>ul]:mb-0 [&>ol]:mt-0 [&>ul]:mt-0">
        {children}
      </div>
    </div>
  );
}
