import type { Metadata } from "next";
import { ProjectsCatalog } from "@/components/site/ProjectsCatalog";

export const metadata: Metadata = {
  title: "Projects — TheNeuralNetwork",
  description:
    "Hands-on AI projects, beginner to expert. Apply what you've learned by building real things — from prompt-engineered debates to LoRA fine-tuning.",
};

export default function ProjectsPage() {
  return <ProjectsCatalog />;
}
