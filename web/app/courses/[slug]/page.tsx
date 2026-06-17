import type { Metadata } from "next";
import { ProjectDetail } from "@/components/site/ProjectDetail";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/courses/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project ? `${project.title} — TheNeuralNetwork` : "Course — TheNeuralNetwork",
    description: project?.description,
  };
}

export default async function CourseDetailPage(
  props: PageProps<"/courses/[slug]">
) {
  const { slug } = await props.params;
  return <ProjectDetail slug={slug} />;
}
