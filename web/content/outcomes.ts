// What learners actually get out of finishing: concrete things they can do,
// and the real industry certifications the tracks prepare them for.

export interface UseCase {
  title: string;
  blurb: string;
  /** Course slug you do this in (links to the track). */
  courseSlug: string;
  /** A project slug where you actually build it (links to the hands-on build). */
  projectSlug?: string;
}

export const useCases: UseCase[] = [
  {
    title: "Automate your daily busywork",
    blurb: "Summarize threads, draft emails, plan, and organize with AI — no code. Do it in real tools by the end of lesson one.",
    courseSlug: "ai-foundations",
  },
  {
    title: "Chat with your own documents",
    blurb: "Build a retrieval-augmented assistant that answers from your notes, wiki, or PDFs — the #1 production AI pattern.",
    courseSlug: "applied-ai",
    projectSlug: "knowledge-assistant",
  },
  {
    title: "Ship an image classifier",
    blurb: "Fine-tune a vision model to recognize your own categories with only a few hundred images.",
    courseSlug: "computer-vision",
    projectSlug: "image-classifier-transfer",
  },
  {
    title: "Build GPT from scratch",
    blurb: "Implement self-attention and a working transformer that generates text — the real thing, line by line.",
    courseSlug: "generative-ai",
    projectSlug: "nanogpt",
  },
  {
    title: "Train an agent to play",
    blurb: "Write Q-learning from scratch and watch an agent teach itself to win — then connect it to how chatbots are aligned.",
    courseSlug: "reinforcement-learning",
    projectSlug: "q-learning-frozenlake",
  },
  {
    title: "Ship and run AI in production",
    blurb: "Serve a model behind an API, monitor it for drift, and roll out new versions safely — the MLOps that real jobs need.",
    courseSlug: "mlops",
  },
];

export interface Certification {
  name: string;
  provider: string;
  blurb: string;
  /** Tracks that prepare you for it. */
  tracks: string[];
  url: string;
}

export const certifications: Certification[] = [
  {
    name: "AWS Certified AI Practitioner",
    provider: "Amazon Web Services",
    blurb: "AI/ML fundamentals, generative AI, prompting, and responsible AI & governance.",
    tracks: ["ai-foundations", "applied-ai", "ai-engineering", "generative-ai"],
    url: "https://aws.amazon.com/certification/certified-ai-practitioner/",
  },
  {
    name: "NVIDIA DLI Certificates",
    provider: "NVIDIA Deep Learning Institute",
    blurb: "Fundamentals of Deep Learning, computer vision, and generative AI with diffusion models.",
    tracks: ["deep-learning", "computer-vision", "generative-ai"],
    url: "https://www.nvidia.com/en-us/training/",
  },
  {
    name: "TensorFlow Developer Certificate",
    provider: "Google",
    blurb: "Build and train neural networks for vision and NLP — the hands-on skills these tracks drill.",
    tracks: ["deep-learning", "computer-vision", "nlp"],
    url: "https://www.tensorflow.org/certificate",
  },
  {
    name: "AWS Certified ML Engineer – Associate",
    provider: "Amazon Web Services",
    blurb: "Building, deploying, monitoring, and maintaining ML systems in production.",
    tracks: ["machine-learning", "mlops"],
    url: "https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/",
  },
];

/** Certifications a given track contributes toward (for the course page). */
export function certsForCourse(slug: string): Certification[] {
  return certifications.filter((c) => c.tracks.includes(slug));
}
