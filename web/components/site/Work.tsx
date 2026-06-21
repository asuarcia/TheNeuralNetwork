"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Brain, BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import { curriculum, type Level } from "@/content/curriculum";

const levelStyles: Record<Level, { badge: string; bar: string }> = {
  Beginner: { badge: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10", bar: "from-emerald-500/60 to-emerald-500/0" },
  Intermediate: { badge: "text-amber-400 border-amber-500/30 bg-amber-500/10", bar: "from-amber-500/60 to-amber-500/0" },
  Advanced: { badge: "text-violet-400 border-violet-500/30 bg-violet-500/10", bar: "from-violet-500/60 to-violet-500/0" },
  Expert: { badge: "text-pink-400 border-pink-500/30 bg-pink-500/10", bar: "from-pink-500/60 to-pink-500/0" },
};

export const Work = () => {
  return (
    <div className="bg-neutral-950 min-h-screen text-white pt-32 px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-end mb-20">
          <div>
            <Link
              href="/"
              className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-violet-400 transition-colors mb-8 inline-flex items-center gap-2"
            >
              ← Home
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-violet-400" />
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.95]">
              The<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500">
                Curriculum
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg font-light text-neutral-400">
              Beginner to expert — start with no coding at all, or dive straight into runnable code. Start anywhere; they build on each other.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 pb-32">
          {curriculum.map((course, index) => {
            const style = levelStyles[course.level];
            const minutes = course.lessons.reduce((t, l) => t + l.minutes, 0);
            return (
              <motion.div
                key={course.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={`/courses/${course.slug}`}
                  className="group block h-full rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-violet-500/30 hover:bg-violet-500/[0.03] transition-all duration-500"
                >
                  <div className={`h-1 w-full bg-gradient-to-r ${style.bar}`} />
                  <div className="p-7">
                    <div className="flex items-center justify-between mb-5">
                      <span className={`px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wide ${style.badge}`}>
                        {course.level}
                      </span>
                      <span className="font-mono text-xs text-neutral-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-violet-300 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed mb-6 group-hover:text-neutral-400 transition-colors">
                      {course.summary}
                    </p>
                    <div className="flex items-center gap-5 text-xs font-mono uppercase tracking-widest text-neutral-500">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" /> {course.lessons.length} lessons
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {minutes} min
                      </span>
                      <span className="ml-auto inline-flex items-center gap-1 text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Start <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
