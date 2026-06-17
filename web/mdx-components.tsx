import type { MDXComponents } from "mdx/types";
import { mdxComponents } from "@/components/lesson/mdx-components";

// Required by @next/mdx (App Router). Injects our styled elements + interactive
// lesson components (Callout, Quiz, CodeExercise) into all MDX files.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components, ...mdxComponents };
}
