import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Clock, Check, Sparkles, GraduationCap } from "lucide-react";
import { courseMinutes, type Course, type Level } from "@/content/curriculum";
import { projectsForCourse } from "@/content/projects";
import { certsForCourse } from "@/content/outcomes";
import { CourseCertBadge } from "@/components/site/CourseCertBadge";

const levelClass: Record<Level, string> = {
  Beginner: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  Intermediate: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  Advanced: "text-violet-400 border-violet-500/30 bg-violet-500/10",
  Expert: "text-pink-400 border-pink-500/30 bg-pink-500/10",
};

export function CourseOverview({ course }: { course: Course }) {
  const minutes = courseMinutes(course);
  const first = course.lessons[0];
  const projects = projectsForCourse(course.slug);
  const certs = certsForCourse(course.slug);

  return (
    <div className="bg-neutral-950 min-h-screen text-white pt-32 px-6">
      <div className="container mx-auto">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-violet-400 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> All courses
        </Link>

        {/* Hero */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-violet-400">{course.code}</span>
                <div className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wide ${levelClass[course.level]}`}>
                  {course.level}
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
                {course.title}
              </h1>
            </div>
            <div className="flex items-center gap-6 text-sm font-mono text-neutral-500 mb-2">
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />{course.lessons.length} lessons</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />~{minutes} min</span>
              <span className="flex items-center gap-1.5 text-emerald-400"><Sparkles className="w-4 h-4" />Free</span>
            </div>
          </div>

          <div className="aspect-[16/9] w-full bg-neutral-900 overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 mb-24">
          {/* Left: meta + CTA */}
          <div className="space-y-8">
            <div className="p-6 rounded-xl border border-violet-500/10 bg-violet-500/5 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-2">You&apos;ll cover</span>
                <div className="flex flex-wrap gap-2">
                  {course.topics.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-1">Format</span>
                <p className="font-medium text-white">
                  {course.runsCode
                    ? "Interactive lessons with runnable Python"
                    : "Interactive lessons — no coding required"}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02]">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-4">By the end you can</span>
              <ul className="space-y-3">
                {course.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-sm text-neutral-300 leading-relaxed">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={`/learn/${course.slug}/${first.slug}`}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold tracking-tight hover:from-violet-500 hover:to-purple-500 transition-all hover:scale-[1.02] shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2"
            >
              Start course
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-center text-xs text-neutral-500">
              <Link href="/signup" className="text-violet-400 hover:text-violet-300">Create a free account</Link> to save your progress.
            </p>

            <CourseCertBadge slug={course.slug} total={course.lessons.length} />

            {certs.length > 0 && (
              <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02]">
                <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
                  <GraduationCap className="w-4 h-4 text-violet-400" /> Prepares you for
                </span>
                <ul className="space-y-2">
                  {certs.map((c) => (
                    <li key={c.name} className="text-sm">
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-neutral-200 hover:text-violet-300 transition-colors">
                        {c.name}
                      </a>
                      <span className="block text-xs text-neutral-600">{c.provider}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: outline */}
          <div>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-neutral-300 mb-12">
              {course.summary}
            </p>

            <div className="pt-10 border-t border-violet-500/10">
              <h3 className="text-lg font-bold mb-6 text-white">Course outline</h3>
              <ol className="space-y-2">
                {course.lessons.map((lesson, i) => (
                  <li key={lesson.slug}>
                    <Link
                      href={`/learn/${course.slug}/${lesson.slug}`}
                      className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4 hover:border-violet-500/30 hover:bg-violet-500/5 transition-colors"
                    >
                      <span className="font-mono text-xs text-neutral-600 w-6 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-medium text-neutral-200 group-hover:text-white transition-colors">
                        {lesson.title}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-mono text-neutral-600 shrink-0">
                        <Clock className="w-3.5 h-3.5" /> {lesson.minutes}m
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>

            {projects.length > 0 && (
              <div className="mt-16 pt-10 border-t border-violet-500/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Build this next</h3>
                  <Link href="/projects" className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-violet-400 transition-colors">
                    All projects
                  </Link>
                </div>
                <p className="text-sm text-neutral-500 mb-6">
                  Finished the lessons? Cement it by shipping a real project that builds on this track.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {projects.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/projects/${p.slug}`}
                      className="group rounded-xl border border-white/5 bg-white/[0.02] p-5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono uppercase tracking-widest text-violet-400">{p.level}</span>
                        <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-violet-400 transition-colors" />
                      </div>
                      <h4 className="font-bold tracking-tight mb-1 group-hover:text-violet-300 transition-colors">{p.title}</h4>
                      <p className="text-sm text-neutral-500 leading-relaxed">{p.summary}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4 text-sm text-neutral-400">
              <Check className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
              <p>
                {course.runsCode
                  ? "Every lesson runs real Python in your browser — no install, no setup. Finish at your own pace and pick up where you left off."
                  : "Plain-language lessons with quick quizzes and real-world practice — no coding, no setup. Finish at your own pace and pick up where you left off."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
