import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, Check, Sparkles, BookOpen, Play } from "lucide-react";
import { getCourse, type Level } from "@/content/curriculum";
import type { Project, ProjectRuntime } from "@/content/projects";

const levelClass: Record<Level, string> = {
  Beginner: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  Intermediate: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  Advanced: "text-violet-400 border-violet-500/30 bg-violet-500/10",
  Expert: "text-pink-400 border-pink-500/30 bg-pink-500/10",
};

// Colab opens notebooks straight from a public GitHub repo. Adjust the repo
// path here if the notebooks live elsewhere in the published repo.
const COLAB_BASE = "https://colab.research.google.com/github/asuarcia/TheNeuralNetwork/blob/main";
const REPO_NOTEBOOK_DIR = "web/public/notebooks";

export function ProjectDetail({
  project,
  runtime,
  notebook,
}: {
  project: Project;
  runtime: ProjectRuntime;
  notebook: React.ReactNode;
}) {
  const course = getCourse(project.courseSlug);
  const hours = Math.round(project.minutes / 60);
  const colabUrl = `${COLAB_BASE}/${REPO_NOTEBOOK_DIR}/${project.slug}.ipynb`;
  const downloadUrl = `/notebooks/${project.slug}.ipynb`;

  return (
    <div className="bg-neutral-950 min-h-screen text-white pt-32 px-6">
      <div className="container mx-auto max-w-4xl">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-violet-400 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> All projects
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wide ${levelClass[project.level]}`}>
              {project.level}
            </span>
            <span className="flex items-center gap-1.5 text-sm font-mono text-neutral-500">
              <Clock className="w-4 h-4" /> ~{hours} hour{hours === 1 ? "" : "s"}
            </span>
            <span className="flex items-center gap-1.5 text-sm font-mono text-emerald-400">
              {runtime === "browser" ? (
                <><Play className="w-4 h-4" /> Runs in your browser</>
              ) : (
                <><Sparkles className="w-4 h-4" /> Colab notebook</>
              )}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] mb-6">
            {project.title}
          </h1>
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-neutral-300">
            {project.summary}
          </p>
        </div>

        {/* Prereq course */}
        {course && (
          <Link
            href={`/courses/${course.slug}`}
            className="group mb-12 flex items-center gap-4 rounded-xl border border-violet-500/15 bg-violet-500/5 px-5 py-4 hover:border-violet-500/40 transition-colors"
          >
            <BookOpen className="w-5 h-5 text-violet-400 shrink-0" />
            <div className="flex-1">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block">Builds on</span>
              <span className="font-medium text-white group-hover:text-violet-300 transition-colors">
                {course.code} · {course.title}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-violet-400 transition-colors" />
          </Link>
        )}

        <div className="grid md:grid-cols-[2fr_1fr] gap-12 mb-16">
          {/* Main */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-4">What you&apos;ll build</h2>
            <p className="text-[1.05rem] leading-relaxed text-neutral-300 mb-10">{project.brief}</p>

            {/* Milestones — shown as the outline for Colab projects; browser
                projects walk through these inline in the notebook below. */}
            {runtime === "colab" && (
              <>
                <h2 className="text-xl font-bold tracking-tight mb-6">Milestones</h2>
                <ol className="space-y-3">
                  {project.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4">
                      <span className="font-mono text-xs text-violet-400 mt-1 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-relaxed text-neutral-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>

          {/* Side */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02]">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-3">Skills you&apos;ll practice</span>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {runtime === "colab" ? (
              <div className="p-6 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-300 block">Run this project</span>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  This one needs real compute (GPU / heavy libraries), so it&apos;s a Jupyter notebook. Open it in Google Colab (free GPU, nothing to install) or download it to run locally.
                </p>
                <a
                  href={colabUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 font-bold tracking-tight hover:from-amber-400 hover:to-orange-400 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" /> Open in Colab
                </a>
                <a
                  href={downloadUrl}
                  download
                  className="w-full py-3 rounded-xl border border-white/10 text-neutral-200 font-medium hover:border-white/25 hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowUpRight className="w-4 h-4" /> Download .ipynb
                </a>
              </div>
            ) : (
              <div className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-4 text-sm text-neutral-300">
                <Play className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p>An interactive notebook — every step runs real Python right here in your browser. Nothing to install. Scroll down and start coding.</p>
              </div>
            )}

            {course && (
              <Link
                href={`/learn/${course.slug}/${course.lessons[0].slug}`}
                className="w-full py-3.5 rounded-xl border border-violet-500/20 text-violet-300 font-medium hover:border-violet-500/40 hover:text-violet-200 transition-colors flex items-center justify-center gap-2"
              >
                Review the track <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Browser notebook — the guided, runnable walkthrough */}
        {runtime === "browser" && notebook && (
          <article className="max-w-3xl border-t border-white/10 pt-12 mb-24">
            <div className="mb-8 flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-emerald-400">
              <Play className="w-3.5 h-3.5" /> The notebook
            </div>
            {notebook}
          </article>
        )}
      </div>
    </div>
  );
}
