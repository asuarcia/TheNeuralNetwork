import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Certificate } from "@/components/site/Certificate";
import { curriculum, getCourse } from "@/content/curriculum";

export const dynamicParams = false;

export function generateStaticParams() {
  return curriculum.map((c) => ({ course: c.slug }));
}

export async function generateMetadata(
  props: PageProps<"/certificate/[course]">
): Promise<Metadata> {
  const { course } = await props.params;
  const c = getCourse(course);
  return { title: c ? `Certificate — ${c.title}` : "Certificate — TheNeuralNetwork" };
}

export default async function CertificatePage(
  props: PageProps<"/certificate/[course]">
) {
  const { course } = await props.params;
  const c = getCourse(course);
  if (!c) notFound();
  return (
    <Certificate
      slug={c.slug}
      code={c.code}
      title={c.title}
      total={c.lessons.length}
      firstLesson={c.lessons[0].slug}
    />
  );
}
