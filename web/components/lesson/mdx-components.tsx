import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { Callout } from "./Callout";
import { Quiz } from "./Quiz";
import { CodeExercise } from "./CodeExercise";

// Maps markdown elements to brand-styled components, plus the interactive
// lesson primitives usable directly in MDX.
export const mdxComponents = {
  h1: (p: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="text-4xl font-bold tracking-tighter mt-12 mb-6 first:mt-0" {...p} />
  ),
  h2: (p: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="text-2xl font-bold tracking-tight mt-12 mb-4" {...p} />
  ),
  h3: (p: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="text-xl font-semibold tracking-tight mt-8 mb-3" {...p} />
  ),
  p: (p: ComponentPropsWithoutRef<"p">) => (
    <p className="text-[1.05rem] leading-relaxed text-neutral-300 mb-5" {...p} />
  ),
  ul: (p: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mb-6 space-y-2 pl-5 list-disc marker:text-violet-500 text-neutral-300" {...p} />
  ),
  ol: (p: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mb-6 space-y-2 pl-5 list-decimal marker:text-violet-500 text-neutral-300" {...p} />
  ),
  li: (p: ComponentPropsWithoutRef<"li">) => <li className="leading-relaxed pl-1" {...p} />,
  strong: (p: ComponentPropsWithoutRef<"strong">) => <strong className="font-semibold text-white" {...p} />,
  em: (p: ComponentPropsWithoutRef<"em">) => <em className="italic text-neutral-200" {...p} />,
  blockquote: (p: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="my-6 border-l-2 border-violet-500/50 pl-5 italic text-neutral-400" {...p} />
  ),
  hr: () => <hr className="my-10 border-white/10" />,
  a: ({ href = "#", ...p }: ComponentPropsWithoutRef<"a">) =>
    href.startsWith("/") ? (
      <Link href={href} className="text-violet-400 underline underline-offset-4 hover:text-violet-300" {...p} />
    ) : (
      <a href={href} className="text-violet-400 underline underline-offset-4 hover:text-violet-300" {...p} />
    ),
  code: ({ className, ...p }: ComponentPropsWithoutRef<"code">) =>
    className ? (
      // fenced block (inside <pre>)
      <code className={`${className} font-mono text-sm`} {...p} />
    ) : (
      <code className="rounded bg-violet-500/10 px-1.5 py-0.5 font-mono text-[0.85em] text-violet-300" {...p} />
    ),
  pre: (p: ComponentPropsWithoutRef<"pre">) => (
    <pre className="my-6 overflow-auto rounded-xl border border-white/10 bg-[#0f0f12] p-4 text-neutral-200" {...p} />
  ),
  Callout,
  Quiz,
  CodeExercise,
};
