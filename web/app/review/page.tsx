import type { Metadata } from "next";
import { ReviewSession } from "@/components/site/ReviewSession";

export const metadata: Metadata = {
  title: "Daily Review — TheNeuralNetwork",
  description: "Spaced-repetition flashcards covering the key idea from every track. Active recall that makes the concepts stick.",
};

export default function ReviewPage() {
  return <ReviewSession />;
}
