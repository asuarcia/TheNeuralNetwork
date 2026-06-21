import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseOverview } from "@/components/site/CourseOverview";
import { curriculum, getCourse } from "@/content/curriculum";

export const dynamicParams = false;

export function generateStaticParams() {
  return curriculum.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  props: PageProps<"/courses/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const course = getCourse(slug);
  return {
    title: course ? `${course.title} — TheNeuralNetwork` : "Course — TheNeuralNetwork",
    description: course?.summary,
  };
}

export default async function CourseDetailPage(
  props: PageProps<"/courses/[slug]">
) {
  const { slug } = await props.params;
  const course = getCourse(slug);
  if (!course) notFound();
  return <CourseOverview course={course} />;
}
