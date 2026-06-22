"use client";

import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";
import { useProgress } from "@/lib/gamification/useProgress";
import { courseCompletedCount } from "@/lib/gamification/store";

export function CourseCertBadge({ slug, total }: { slug: string; total: number }) {
  const { ready } = useProgress();
  const done = ready ? Math.min(courseCompletedCount(slug), total) : 0;
  const complete = ready && done >= total && total > 0;

  return (
    <Link
      href={`/certificate/${slug}`}
      className={`flex items-center gap-3 rounded-xl border px-5 py-4 transition-colors ${
        complete
          ? "border-emerald-500/40 bg-emerald-500/5 hover:border-emerald-500/60"
          : "border-white/8 bg-white/[0.02] hover:border-violet-500/30"
      }`}
    >
      <GraduationCap className={`w-5 h-5 shrink-0 ${complete ? "text-emerald-400" : "text-violet-400"}`} />
      <div className="flex-1 text-sm">
        {complete ? (
          <span className="font-medium text-emerald-300">Claim your Certificate of Completion</span>
        ) : (
          <span className="text-neutral-300">Earn a certificate of completion — finish all {total} lessons {ready && done > 0 ? `(${done}/${total} done)` : ""}</span>
        )}
      </div>
      <ArrowRight className="w-4 h-4 text-neutral-500 shrink-0" />
    </Link>
  );
}
