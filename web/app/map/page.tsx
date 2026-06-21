import type { Metadata } from "next";
import { LearningMap } from "@/components/site/LearningMap";

export const metadata: Metadata = {
  title: "Learning Map — TheNeuralNetwork",
  description: "Your personal AI learning map: track progress, earn XP, and level up across every track.",
};

export default function MapPage() {
  return <LearningMap />;
}
