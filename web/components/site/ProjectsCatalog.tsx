"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Clock, Brain } from "lucide-react";
import Link from "next/link";
import { projects, type Project } from "@/content/projects";
import { getCourse, type Level } from "@/content/curriculum";

const levelStyles: Record<Level, { badge: string; bar: string }> = {
  Beginner: { badge: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10", bar: "from-emerald-500/60 to-emerald-500/0" },
  Intermediate: { badge: "text-amber-400 border-amber-500/30 bg-amber-500/10", bar: "from-amber-500/60 to-amber-500/0" },
  Advanced: { badge: "text-violet-400 border-violet-500/30 bg-violet-500/10", bar: "from-violet-500/60 to-violet-500/0" },
  Expert: { badge: "text-pink-400 border-pink-500/30 bg-pink-500/10", bar: "from-pink-500/60 to-pink-500/0" },
};

export const ProjectsCatalog = () => {
  return (
    <div className="bg-neutral-950 min-h-screen text-white pt-32 px-6">
      <div className="container mx-auto">
        <div className="mb-20">
          <Link
            href="/courses"
            className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-violet-400 transition-colors mb-8 inline-flex items-center gap-2"
          >
            ← Curriculum
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-violet-400" />
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.95]">
            Build<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500">
              Real Things
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light text-neutral-400">
            Ten hands-on projects, beginner to expert. Each one builds on a track — finish the lessons, then ship the project to prove you&apos;ve really got it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const style = levelStyles[project.level];
  const course = getCourse(project.courseSlug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block h-full rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-violet-500/30 hover:bg-violet-500/[0.03] transition-all duration-500"
      >
        <div className={`h-1 w-full bg-gradient-to-r ${style.bar}`} />
        <div className="p-6 flex flex-col h-[calc(100%-0.25rem)]">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wide ${style.badge}`}>
              {project.level}
            </span>
            <span className="font-mono text-xs text-neutral-600">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-violet-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-neutral-500 text-sm leading-relaxed mb-5 group-hover:text-neutral-400 transition-colors flex-1">
            {project.summary}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.skills.slice(0, 3).map((s) => (
              <span key={s} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[0.7rem] text-neutral-400">
                {s}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-neutral-500 border-t border-white/5 pt-4">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> ~{Math.round(project.minutes / 60)}h
            </span>
            {course && <span className="truncate">{course.code}</span>}
            <span className="ml-auto inline-flex items-center gap-1 text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Open <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
