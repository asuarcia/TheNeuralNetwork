import { redirect, notFound } from "next/navigation";
import { getCourse } from "@/content/curriculum";

export default async function CourseLearnRedirect(props: PageProps<"/learn/[course]">) {
  const { course } = await props.params;
  const c = getCourse(course);
  if (!c || c.lessons.length === 0) notFound();
  redirect(`/learn/${course}/${c.lessons[0].slug}`);
}
