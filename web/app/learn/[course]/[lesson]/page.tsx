import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { curriculum, getLessonContext } from "@/content/curriculum";
import { CompleteButton } from "@/components/lesson/CompleteButton";

type Meta = { title: string; summary?: string };

// Only build lessons we know about; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return curriculum.flatMap((c) =>
    c.lessons.map((l) => ({ course: c.slug, lesson: l.slug }))
  );
}

export async function generateMetadata(
  props: PageProps<"/learn/[course]/[lesson]">
): Promise<Metadata> {
  const { course, lesson } = await props.params;
  const ctx = getLessonContext(course, lesson);
  return { title: ctx ? `${ctx.lesson.title} — TheNeuralNetwork` : "Lesson" };
}

export default async function LessonPage(
  props: PageProps<"/learn/[course]/[lesson]">
) {
  const { course, lesson } = await props.params;
  const ctx = getLessonContext(course, lesson);
  if (!ctx) notFound();

  let mod: { default: React.ComponentType; meta?: Meta };
  try {
    mod = await import(`@/content/courses/${course}/${lesson}.mdx`);
  } catch {
    notFound();
  }

  const Lesson = mod.default;
  const meta: Meta = mod.meta ?? { title: ctx.lesson.title };
  const { course: courseData, prev, next, index } = ctx;

  return (
    <main className="min-h-screen bg-neutral-950 pt-28 pb-24">
      <div className="container mx-auto px-6 grid lg:grid-cols-[260px_1fr] gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-violet-400 transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All courses
            </Link>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-violet-400 mb-1">
              {courseData.level}
            </p>
            <h2 className="text-lg font-bold tracking-tight mb-5">{courseData.title}</h2>
            <ol className="space-y-1">
              {courseData.lessons.map((l, i) => {
                const active = l.slug === lesson;
                return (
                  <li key={l.slug}>
                    <Link
                      href={`/learn/${courseData.slug}/${l.slug}`}
                      className={`flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        active
                          ? "bg-violet-500/10 text-white border border-violet-500/30"
                          : "text-neutral-400 hover:text-white hover:bg-white/[0.03] border border-transparent"
                      }`}
                    >
                      <span className="font-mono text-xs text-neutral-600 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-snug">{l.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </aside>

        {/* Content */}
        <article className="max-w-2xl">
          <div className="mb-8 flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-neutral-500">
            <span className="text-violet-400">Lesson {index + 1}</span>
            <span className="h-1 w-1 rounded-full bg-neutral-700" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {ctx.lesson.minutes} min
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">{meta.title}</h1>
          {meta.summary && (
            <p className="text-lg font-light text-neutral-400 leading-relaxed mb-10">{meta.summary}</p>
          )}

          <div className="border-t border-white/5 pt-10">
            <Lesson />
          </div>

          {/* Footer nav */}
          <div className="mt-16 flex items-center justify-between gap-4 border-t border-white/10 pt-8">
            {prev ? (
              <Link
                href={`/learn/${courseData.slug}/${prev.slug}`}
                className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-violet-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> {prev.title}
              </Link>
            ) : (
              <span />
            )}

            <CompleteButton
              lessonId={`${courseData.slug}/${lesson}`}
              nextHref={next ? `/learn/${courseData.slug}/${next.slug}` : "/dashboard"}
              isLast={!next}
            />
          </div>
        </article>
      </div>
    </main>
  );
}
