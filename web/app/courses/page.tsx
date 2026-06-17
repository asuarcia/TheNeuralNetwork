import type { Metadata } from "next";
import { Work } from "@/components/site/Work";

export const metadata: Metadata = {
  title: "All Courses — TheNeuralNetwork",
  description: "Browse the full catalog of interactive AI and machine learning courses, from beginner to expert.",
};

export default function CoursesPage() {
  return <Work />;
}
