// Curriculum structure (order, titles, levels, marketing copy). Lesson BODIES
// live as MDX at content/courses/<course>/<lesson>.mdx. This manifest is the
// single source of truth for navigation, the catalog, the landing page, and
// progress. Hand-authored and reviewable.

export type Level = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface LessonRef {
  slug: string;
  title: string;
  minutes: number;
}

export interface Course {
  slug: string;
  /** Course code, e.g. "AI 101". Shown as a kicker on cards and the course page. */
  code: string;
  title: string;
  level: Level;
  summary: string;
  /** Short skill tags shown on cards and the course page. */
  topics: string[];
  /** Concrete outcomes — what a learner can do after finishing. */
  outcomes: string[];
  /**
   * Whether lessons include runnable Python exercises. False for the
   * non-technical literacy track so the UI doesn't promise coding to
   * a general audience.
   */
  runsCode: boolean;
  /** Hero/card image (Unsplash). */
  image: string;
  lessons: LessonRef[];
}

export const curriculum: Course[] = [
  {
    slug: "ai-foundations",
    code: "AI 101",
    title: "AI Foundations",
    level: "Beginner",
    summary:
      "No coding, no jargon — for absolutely everyone. Understand what AI really is, get great results from any AI tool, put it to work in your daily life, and learn where it goes wrong.",
    topics: ["What AI is", "How LLMs work", "Choosing AI tools", "Prompting", "Everyday AI", "Risks & ethics"],
    outcomes: [
      "Explain in plain language how a modern AI model produces an answer",
      "Pick the right AI tool for a given task",
      "Write clear prompts that reliably get what you want",
      "Use AI for everyday writing, planning, and organizing — no code required",
      "Recognize hallucination, bias, and privacy risks, and work around them",
    ],
    runsCode: false,
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1200&auto=format&fit=crop",
    lessons: [
      { slug: "what-is-ai", title: "What Is AI, Really?", minutes: 12 },
      { slug: "how-llms-work", title: "How AI Chatbots Actually Work", minutes: 14 },
      { slug: "choosing-ai-tools", title: "Choosing the Right AI Tool", minutes: 14 },
      { slug: "prompting-basics", title: "Prompting Basics", minutes: 14 },
      { slug: "advanced-prompting", title: "Advanced Prompting", minutes: 18 },
      { slug: "ai-for-everyday-work", title: "AI for Everyday Work", minutes: 16 },
      { slug: "ai-limitations", title: "Limits, Risks & Ethics", minutes: 16 },
    ],
  },
  {
    slug: "ai-playground",
    code: "AI 100",
    title: "AI Playground",
    level: "Beginner",
    summary:
      "Skip the reading — build intuition by playing. Drag live neurons and gradient descent, predict what happens, and feel why AI works before you ever write code.",
    topics: ["Live neuron", "Gradient descent", "Predict & reveal", "No setup"],
    outcomes: [
      "Build hands-on intuition for what a neuron computes",
      "Feel how the learning rate makes or breaks gradient descent",
      "Practice predicting model behavior before being told",
      "Connect the pieces into how a whole network learns",
    ],
    runsCode: false,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
    lessons: [
      { slug: "neuron-playground", title: "Feel a Neuron", minutes: 8 },
      { slug: "descent-playground", title: "Feel Gradient Descent", minutes: 10 },
      { slug: "how-learning-works", title: "How a Network Learns", minutes: 10 },
    ],
  },
  {
    slug: "coding-for-ai",
    code: "AI 110",
    title: "Python for AI",
    level: "Beginner",
    summary:
      "Ready to go hands-on? Write your first real Python — right in the browser, nothing to install — then use it to represent data and build a tiny model by hand. The on-ramp from AI user to AI builder.",
    topics: ["Python basics", "Lists & functions", "Data & vectors", "Your first model"],
    outcomes: [
      "Read and write basic Python: variables, lists, loops, functions",
      "Represent real data as numbers and vectors, and do the core operations",
      "Build and evaluate a tiny predictive model in a few lines of code",
      "Be ready for the Machine Learning and Deep Learning tracks",
    ],
    runsCode: true,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1200&auto=format&fit=crop",
    lessons: [
      { slug: "python-for-ai", title: "Just Enough Python", minutes: 24 },
      { slug: "data-and-vectors", title: "Data, Numbers & Vectors", minutes: 20 },
      { slug: "your-first-model", title: "Your First Model", minutes: 24 },
    ],
  },
  {
    slug: "applied-ai",
    code: "AI 201",
    title: "Applied AI & Automation",
    level: "Intermediate",
    summary:
      "Leave the chat box behind. Call models from code, manage tokens and cost, ground answers in your own documents with RAG, and wire up agents that take actions.",
    topics: ["Model APIs", "Tokens & cost", "RAG", "Embeddings", "Data pipelines", "AI agents"],
    outcomes: [
      "Call a language model from Python and control its output with sampling parameters",
      "Estimate and manage token cost and context-window limits",
      "Build a retrieval-augmented pipeline that answers from your own data",
      "Design an agent loop that uses tools safely",
    ],
    runsCode: true,
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1200&auto=format&fit=crop",
    lessons: [
      { slug: "calling-models", title: "Talking to Models in Code", minutes: 22 },
      { slug: "tokens-and-cost", title: "Tokens, Cost & the Context Window", minutes: 18 },
      { slug: "rag", title: "Retrieval-Augmented Generation", minutes: 24 },
      { slug: "embeddings-and-search", title: "Embeddings & Vector Search", minutes: 24 },
      { slug: "data-pipelines", title: "Building Data Pipelines", minutes: 22 },
      { slug: "building-agents", title: "Building AI Agents", minutes: 28 },
    ],
  },
  {
    slug: "math-for-ml",
    code: "AI 210",
    title: "Math for Machine Learning",
    level: "Intermediate",
    summary:
      "The handful of math ideas that machine learning actually runs on — vectors, matrices, derivatives, and probability — taught visually and in code, not in dense proofs.",
    topics: ["Linear algebra", "Matrices", "Derivatives", "Probability", "Statistics"],
    outcomes: [
      "Work with vectors and matrices and know what each operation means",
      "Understand derivatives and gradients as the slope that powers learning",
      "Reason about probability and expected value",
      "Summarize and normalize data with mean, variance, and z-scores",
    ],
    runsCode: true,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
    lessons: [
      { slug: "vectors", title: "Vectors & Linear Algebra", minutes: 20 },
      { slug: "matrices", title: "Matrices & Matrix Multiplication", minutes: 22 },
      { slug: "derivatives", title: "Derivatives & the Gradient", minutes: 22 },
      { slug: "probability", title: "Probability Essentials", minutes: 20 },
      { slug: "statistics", title: "Statistics & Distributions", minutes: 20 },
    ],
  },
  {
    slug: "machine-learning",
    code: "AI 301",
    title: "Machine Learning Foundations",
    level: "Advanced",
    summary:
      "Open the black box. Fit lines and curves, grow decision trees, measure whether a model is any good, and watch gradient descent learn — all built up from the math.",
    topics: ["Regression", "Classification", "Trees & forests", "Evaluation", "Gradient descent", "Bias-variance"],
    outcomes: [
      "Build and reason about linear, logistic, and tree-based models",
      "Choose the right metric — accuracy, precision, recall, F1, ROC — for the job",
      "Explain and run gradient descent to fit a model from scratch",
      "Diagnose overfitting and underfitting using the bias-variance tradeoff",
    ],
    runsCode: true,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    lessons: [
      { slug: "the-ml-mindset", title: "The ML Mindset", minutes: 16 },
      { slug: "linear-regression", title: "Linear Regression by Hand", minutes: 24 },
      { slug: "logistic-regression", title: "Logistic Regression & Classification", minutes: 22 },
      { slug: "trees-and-forests", title: "Decision Trees & Random Forests", minutes: 22 },
      { slug: "evaluating-models", title: "Is My Model Any Good?", minutes: 22 },
      { slug: "gradient-descent", title: "How Models Learn: Gradient Descent", minutes: 26 },
      { slug: "bias-variance", title: "Overfitting & the Bias-Variance Tradeoff", minutes: 20 },
    ],
  },
  {
    slug: "deep-learning",
    code: "AI 401",
    title: "Deep Learning",
    level: "Advanced",
    summary:
      "What a neuron computes, how layers stack into networks, how backprop teaches them, and the attention mechanism that powers every modern transformer — built from scratch.",
    topics: ["Neurons & layers", "Activations & loss", "Backpropagation", "Networks", "Transformers", "Attention"],
    outcomes: [
      "Implement a neuron, a layer, and a forward pass in plain Python",
      "Explain backpropagation and why gradients flow the way they do",
      "Describe the transformer architecture and what each block does",
      "Work through scaled dot-product self-attention by hand",
    ],
    runsCode: true,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
    lessons: [
      { slug: "the-neuron", title: "Anatomy of a Neuron", minutes: 20 },
      { slug: "activations-and-loss", title: "Activations & Loss", minutes: 22 },
      { slug: "gradients", title: "Backpropagation: How Networks Learn", minutes: 28 },
      { slug: "building-a-network", title: "Building a Network from Scratch", minutes: 28 },
      { slug: "transformers", title: "The Transformer Architecture", minutes: 26 },
      { slug: "self-attention", title: "Self-Attention, Step by Step", minutes: 28 },
    ],
  },
  {
    slug: "computer-vision",
    code: "AI 415",
    title: "Computer Vision",
    level: "Advanced",
    summary:
      "How machines see. From pixels to convolutions to CNNs and transfer learning — the ideas behind image classification, detection, and segmentation.",
    topics: ["Images as data", "Convolution", "CNNs", "Transfer learning", "Detection & segmentation"],
    outcomes: [
      "Represent and manipulate images as numbers",
      "Apply convolution filters by hand and explain what they detect",
      "Describe how CNNs build features layer by layer",
      "Use transfer learning to solve a vision task with little data",
    ],
    runsCode: true,
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1200&auto=format&fit=crop",
    lessons: [
      { slug: "images-as-numbers", title: "Images Are Just Numbers", minutes: 18 },
      { slug: "convolution", title: "Convolution & Filters", minutes: 24 },
      { slug: "cnns", title: "Convolutional Neural Networks", minutes: 24 },
      { slug: "pooling-and-architectures", title: "Pooling & CNN Architectures", minutes: 20 },
      { slug: "transfer-learning", title: "Transfer Learning for Vision", minutes: 22 },
      { slug: "detection-segmentation", title: "Detection & Segmentation", minutes: 20 },
    ],
  },
  {
    slug: "nlp",
    code: "AI 425",
    title: "Natural Language Processing",
    level: "Advanced",
    summary:
      "Teaching machines to read. Turn text into numbers, classify and search it, learn word embeddings, and trace the path from bag-of-words to transformers.",
    topics: ["Tokenization", "TF-IDF", "Naive Bayes", "Embeddings", "Transformers for NLP"],
    outcomes: [
      "Turn raw text into numeric features (tokens, counts, TF-IDF)",
      "Build a text classifier and reason about its errors",
      "Explain word embeddings and semantic similarity",
      "Trace the evolution from bag-of-words to RNNs to transformers",
    ],
    runsCode: true,
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1200&auto=format&fit=crop",
    lessons: [
      { slug: "text-to-numbers", title: "Turning Text into Numbers", minutes: 20 },
      { slug: "tfidf-and-classification", title: "TF-IDF & Text Classification", minutes: 22 },
      { slug: "naive-bayes", title: "A Spam Filter with Naive Bayes", minutes: 22 },
      { slug: "word-embeddings", title: "Word Embeddings", minutes: 22 },
      { slug: "sequence-models", title: "From RNNs to Transformers", minutes: 22 },
    ],
  },
  {
    slug: "reinforcement-learning",
    code: "AI 435",
    title: "Reinforcement Learning",
    level: "Advanced",
    summary:
      "Learning by trial and error. Agents, rewards, and the Q-learning algorithm that lets a program teach itself to play — built up from a simple grid world.",
    topics: ["Agents & rewards", "Value & Q-learning", "Exploration", "Policy gradients", "RLHF"],
    outcomes: [
      "Frame a problem as states, actions, and rewards",
      "Explain and run a Q-learning update by hand",
      "Balance exploration and exploitation with epsilon-greedy",
      "Connect RL to policy gradients and RLHF in modern AI",
    ],
    runsCode: true,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    lessons: [
      { slug: "rl-framing", title: "Agents, States & Rewards", minutes: 18 },
      { slug: "value-and-return", title: "Value, Return & Discounting", minutes: 20 },
      { slug: "q-learning", title: "Q-Learning from Scratch", minutes: 24 },
      { slug: "exploration", title: "Exploration vs. Exploitation", minutes: 18 },
      { slug: "policy-gradients", title: "Policy Gradients & RLHF", minutes: 20 },
    ],
  },
  {
    slug: "ai-engineering",
    code: "AI 451",
    title: "AI Engineering & Generative Architectures",
    level: "Expert",
    summary:
      "Ship state-of-the-art models in the real world: adapt them with fine-tuning and LoRA, shrink them with quantization, evaluate them honestly, and deploy responsibly.",
    topics: ["Fine-tuning", "LoRA / PEFT", "Quantization", "Inference speed", "Evaluation", "Responsible AI"],
    outcomes: [
      "Decide when to prompt, retrieve, or fine-tune — and why",
      "Explain LoRA and why parameter-efficient tuning is the default today",
      "Use quantization and KV caching to run big models on small hardware",
      "Build an evaluation harness and ship with safety and governance in mind",
    ],
    runsCode: true,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    lessons: [
      { slug: "fine-tuning", title: "Fine-Tuning & Transfer Learning", minutes: 24 },
      { slug: "lora-peft", title: "LoRA & Parameter-Efficient Tuning", minutes: 26 },
      { slug: "quantization-and-inference", title: "Quantization & Fast Inference", minutes: 24 },
      { slug: "evaluating-llms", title: "Evaluating LLMs", minutes: 22 },
      { slug: "shipping-responsibly", title: "Shipping AI Responsibly", minutes: 22 },
    ],
  },
  {
    slug: "mlops",
    code: "AI 455",
    title: "AI in Production (MLOps)",
    level: "Expert",
    summary:
      "A model in a notebook is worth nothing until it's serving real users. The engineering discipline of deploying, scaling, monitoring, and maintaining AI systems in the real world.",
    topics: ["ML lifecycle", "Feature pipelines", "Serving", "Monitoring & drift", "CI/CD & rollouts"],
    outcomes: [
      "Map the full lifecycle from notebook to production and back",
      "Build reproducible data/feature pipelines and avoid train/serve skew",
      "Choose batch vs. real-time serving and reason about latency and throughput",
      "Monitor models for drift and roll out new versions safely",
    ],
    runsCode: true,
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1200&auto=format&fit=crop",
    lessons: [
      { slug: "ml-lifecycle", title: "From Notebook to Production", minutes: 18 },
      { slug: "feature-pipelines", title: "Data & Feature Pipelines", minutes: 20 },
      { slug: "serving-models", title: "Serving Models at Scale", minutes: 22 },
      { slug: "monitoring-drift", title: "Monitoring & Drift", minutes: 20 },
      { slug: "mlops-practices", title: "Versioning, CI/CD & Safe Rollouts", minutes: 20 },
    ],
  },
  {
    slug: "generative-ai",
    code: "AI 465",
    title: "Generative AI & Diffusion",
    level: "Expert",
    summary:
      "How machines create. Autoencoders, GANs, and the diffusion models behind modern image generators — plus CLIP, guidance, and the ethics of synthetic media.",
    topics: ["Generative models", "Autoencoders", "GANs", "Diffusion", "Text-to-image", "Ethics"],
    outcomes: [
      "Explain what it means for a model to learn a data distribution",
      "Contrast autoencoders, GANs, and diffusion models",
      "Describe how diffusion turns noise into images, step by step",
      "Understand text-to-image guidance (CLIP) and the ethics of genAI",
    ],
    runsCode: true,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1200&auto=format&fit=crop",
    lessons: [
      { slug: "what-is-generative", title: "What 'Generative' Really Means", minutes: 18 },
      { slug: "autoencoders", title: "Autoencoders & Latent Space", minutes: 22 },
      { slug: "gans", title: "GANs: Generator vs. Discriminator", minutes: 22 },
      { slug: "diffusion", title: "Diffusion Models", minutes: 24 },
      { slug: "text-to-image", title: "Text-to-Image, CLIP & Guidance", minutes: 20 },
      { slug: "genai-ethics", title: "The Ethics of Generative AI", minutes: 18 },
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return curriculum.find((c) => c.slug === slug);
}

export function courseMinutes(course: Course): number {
  return course.lessons.reduce((total, lesson) => total + lesson.minutes, 0);
}

/** Totals for honest, derived stats on the marketing pages. */
export const totalCourses = curriculum.length;
export const totalLessons = curriculum.reduce((n, c) => n + c.lessons.length, 0);

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
