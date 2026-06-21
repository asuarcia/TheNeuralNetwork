import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/site/ProjectDetail";
import { projects, getProject, projectRuntime } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  return {
    title: project ? `${project.title} — TheNeuralNetwork` : "Project — TheNeuralNetwork",
    description: project?.summary,
  };
}

export default async function ProjectDetailPage(
  props: PageProps<"/projects/[slug]">
) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const runtime = projectRuntime(slug);

  // Browser projects are guided MDX notebooks rendered inline with runnable
  // Python cells. Colab projects link out to a real .ipynb instead.
  let notebook: React.ReactNode = null;
  if (runtime === "browser") {
    try {
      const mod = await import(`@/content/projects/${slug}.mdx`);
      const Notebook = mod.default;
      notebook = <Notebook />;
    } catch {
      notebook = null;
    }
  }

  return <ProjectDetail project={project} runtime={runtime} notebook={notebook} />;
}
