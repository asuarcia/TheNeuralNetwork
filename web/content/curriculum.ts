// Curriculum structure (order, titles, levels). Lesson BODIES live as MDX at
// content/courses/<course>/<lesson>.mdx. This manifest is the source of truth
// for navigation, the catalog, and progress; it's hand-authored and reviewable.

export type Level = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface LessonRef {
  slug: string;
  title: string;
  minutes: number;
}

export interface Course {
  slug: string;
  title: string;
  level: Level;
  summary: string;
  lessons: LessonRef[];
}

export const curriculum: Course[] = [
  {
    slug: "ai-foundations",
    title: "AI Foundations",
    level: "Beginner",
    summary:
      "Start from zero. Understand what AI really is, write your first Python in the browser, and build a tiny model by hand.",
    lessons: [
      { slug: "what-is-ai", title: "What Is AI, Really?", minutes: 10 },
      { slug: "prompting-basics", title: "Prompting Basics", minutes: 15 },
      { slug: "python-for-ai", title: "Just Enough Python", minutes: 20 },
      { slug: "data-and-vectors", title: "Data, Numbers & Vectors", minutes: 18 },
      { slug: "your-first-model", title: "Your First Model", minutes: 20 },
    ],
  },
  {
    slug: "machine-learning",
    title: "Machine Learning Foundations",
    level: "Intermediate",
    summary:
      "How machines actually learn from data: features and labels, fitting a line, and measuring whether a model is any good.",
    lessons: [
      { slug: "the-ml-mindset", title: "The ML Mindset", minutes: 15 },
      { slug: "linear-regression", title: "Linear Regression by Hand", minutes: 25 },
      { slug: "evaluating-models", title: "Is My Model Any Good?", minutes: 20 },
    ],
  },
  {
    slug: "deep-learning",
    title: "Deep Learning",
    level: "Advanced",
    summary:
      "What a neuron computes, how layers stack into networks, and the gradient idea that lets them learn — built up from scratch.",
    lessons: [
      { slug: "the-neuron", title: "Anatomy of a Neuron", minutes: 22 },
      { slug: "activations-and-loss", title: "Activations & Loss", minutes: 20 },
      { slug: "gradients", title: "How Networks Learn", minutes: 25 },
    ],
  },
  {
    slug: "ai-engineering",
    title: "AI Engineering",
    level: "Expert",
    summary:
      "Build with modern AI: retrieval-augmented generation, autonomous agents, and what it takes to ship responsibly.",
    lessons: [
      { slug: "rag", title: "Retrieval-Augmented Generation", minutes: 22 },
      { slug: "agents", title: "Building AI Agents", minutes: 25 },
      { slug: "shipping-responsibly", title: "Shipping AI Responsibly", minutes: 18 },
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return curriculum.find((c) => c.slug === slug);
}

export function getLessonContext(courseSlug: string, lessonSlug: string) {
  const course = getCourse(courseSlug);
  if (!course) return undefined;
  const index = course.lessons.findIndex((l) => l.slug === lessonSlug);
  if (index === -1) return undefined;
  return {
    course,
    lesson: course.lessons[index],
    index,
    prev: index > 0 ? course.lessons[index - 1] : undefined,
    next: index < course.lessons.length - 1 ? course.lessons[index + 1] : undefined,
  };
}
