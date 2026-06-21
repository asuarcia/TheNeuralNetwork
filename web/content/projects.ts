// Projects bank — hands-on builds learners tackle AFTER finishing a track.
// Each project pairs with a course (courseSlug) so the course page can
// recommend "what to build next." Hand-authored manifest, like curriculum.ts.

import type { Level } from "./curriculum";

export interface Project {
  slug: string;
  title: string;
  level: Level;
  /** The course this project builds on; used for "recommended next" links. */
  courseSlug: string;
  /** Rough effort in minutes (these are real projects, not 5-minute exercises). */
  minutes: number;
  /** One-liner for cards. */
  summary: string;
  /** What you'll actually build / hand in. */
  brief: string;
  /** Concrete milestones to work through. */
  steps: string[];
  /** Skill tags. */
  skills: string[];
}

export const projects: Project[] = [
  {
    slug: "adversarial-persona-debate",
    title: "The Adversarial Persona Debate",
    level: "Beginner",
    courseSlug: "ai-foundations",
    minutes: 60,
    summary:
      "Stage a structured debate between two AI personas with opposing goals, and referee it with a third.",
    brief:
      "Design system prompts that lock two model personas into opposing stakeholder positions (say, a startup founder vs. a cautious regulator), have them argue across several turns, then add a neutral 'judge' persona that scores the exchange. You'll feel firsthand how much behavior is controlled by the prompt alone.",
    steps: [
      "Write two system prompts that each enforce a distinct persona, goal, and tone",
      "Run a multi-turn exchange where each side responds to the other",
      "Add a judge prompt that summarizes and scores each side against fixed criteria",
      "Tweak constraints and observe how the debate's quality and bias shift",
    ],
    skills: ["System prompts", "Multi-turn context", "Constraints", "Roleplay design"],
  },
  {
    slug: "hallucination-hunt",
    title: "The Fact-Checking Hallucination Hunt",
    level: "Beginner",
    courseSlug: "ai-foundations",
    minutes: 75,
    summary:
      "Generate plausible-but-flawed historical narratives, then build a prompt workflow that hunts down the errors.",
    brief:
      "Ask a model to write multi-paragraph summaries that contain a few subtle factual errors, then design a separate verification prompt that isolates and flags each questionable claim. A hands-on lesson in why models hallucinate — and how grounding and verification loops catch it.",
    steps: [
      "Prompt the model to produce a narrative with a known number of planted errors",
      "Write a verifier prompt that extracts individual factual claims",
      "Have the verifier rate each claim's confidence and flag the suspicious ones",
      "Measure how many planted errors your loop actually catches",
    ],
    skills: ["Hallucination", "Verification loops", "Grounding", "Critical evaluation"],
  },
  {
    slug: "interview-simulator",
    title: "The Persona-Driven Interview Simulator",
    level: "Beginner",
    courseSlug: "ai-foundations",
    minutes: 90,
    summary:
      "Build a model instance that holds strict behavioral boundaries and runs you through a realistic mock interview.",
    brief:
      "Condition a model to act as a domain interviewer that stays in character, asks progressively harder questions, and scores your answers against a rubric — without breaking role or giving away answers. A practical study in reliable, bounded roleplay.",
    steps: [
      "Define the interviewer persona, question bank, and scoring rubric in a system prompt",
      "Enforce boundaries: stay in role, one question at a time, no answer leakage",
      "Add adaptive difficulty based on the quality of each answer",
      "Produce a final scored debrief at the end of the session",
    ],
    skills: ["Behavioral boundaries", "Roleplay", "Rubric design", "Assessment"],
  },
  {
    slug: "knowledge-assistant",
    title: "The Syllabus Knowledge Assistant",
    level: "Intermediate",
    courseSlug: "applied-ai",
    minutes: 150,
    summary:
      "Write a Python integration that ingests a document set and answers questions about it on demand.",
    brief:
      "Build a small retrieval-augmented assistant: load a syllabus or doc set, chunk and index it, retrieve the relevant pieces for a question, and call a model to answer from that context. Your first end-to-end RAG app, glued together with real Python.",
    steps: [
      "Ingest and chunk a document set into searchable pieces",
      "Implement retrieval (keyword first, then embeddings) for a user question",
      "Stuff the retrieved context into a prompt and call the model",
      "Wrap it in a simple chat loop that cites which chunks it used",
    ],
    skills: ["RAG", "API calls", "Chunking", "Retrieval"],
  },
  {
    slug: "news-aggregator-pipeline",
    title: "The Automated News Aggregator Pipeline",
    level: "Intermediate",
    courseSlug: "applied-ai",
    minutes: 180,
    summary:
      "Orchestrate a hands-off pipeline that pulls in articles, summarizes them, and formats a digest.",
    brief:
      "Construct a pipeline that takes incoming articles (or feeds), passes each through a summarization prompt with a consistent template, and assembles a clean daily digest. Focus on reliability: handling varied inputs, formatting, and failures without manual babysitting.",
    steps: [
      "Ingest articles and normalize them into a common structure",
      "Summarize each with a templated prompt for consistent output",
      "Aggregate the summaries into a single formatted digest",
      "Add error handling and a re-run-safe (idempotent) design",
    ],
    skills: ["Data pipelines", "Summarization", "Templating", "Automation"],
  },
  {
    slug: "sentiment-web-evaluator",
    title: "The Semantic Sentiment Web Evaluator",
    level: "Intermediate",
    courseSlug: "applied-ai",
    minutes: 150,
    summary:
      "Turn messy web text into structured sentiment data using a model as a classification engine.",
    brief:
      "Harvest raw text (reviews, comments, scraped snippets), then pipe it through a model that returns strict, parseable JSON sentiment labels. A practical exercise in using LLMs as structured data engines over unstructured input — the workhorse pattern of applied AI.",
    steps: [
      "Collect and clean a batch of raw text snippets",
      "Design a prompt that returns sentiment as strict JSON",
      "Parse and validate the JSON, handling malformed responses",
      "Aggregate results into a sentiment summary with counts and examples",
    ],
    skills: ["Structured output", "Classification", "JSON parsing", "Data cleaning"],
  },
  {
    slug: "linear-regression-engine",
    title: "Linear Regression Engine from Scratch",
    level: "Advanced",
    courseSlug: "machine-learning",
    minutes: 180,
    summary:
      "Implement linear regression with raw matrix operations — no ML libraries — and train it with gradient descent.",
    brief:
      "Build a working linear regression model using only primitive array math: the prediction, the squared-error cost, the gradients, and the gradient-descent loop that fits the weights. Complete mastery of the cost function and partial derivatives behind the simplest real model.",
    steps: [
      "Implement prediction (w·x + b) for a dataset by hand",
      "Code the mean-squared-error cost function",
      "Derive and implement the gradients for w and b",
      "Run the gradient-descent loop and watch the loss converge",
    ],
    skills: ["Gradient descent", "MSE", "Matrix math", "From-scratch ML"],
  },
  {
    slug: "mnist-classifier",
    title: "MNIST Digit Classifier",
    level: "Advanced",
    courseSlug: "deep-learning",
    minutes: 240,
    summary:
      "Train a neural network to recognize handwritten digits, watching tensors flow and loss fall.",
    brief:
      "The classic deep-learning rite of passage: build and train a network on the MNIST handwritten-digit dataset using a real framework (PyTorch in a notebook). Track how data transforms across layers and how the loss drops as the model learns to see.",
    steps: [
      "Load and normalize the MNIST image dataset",
      "Define a network: input layer, hidden layers with ReLU, softmax output",
      "Train with backpropagation and a cross-entropy loss",
      "Evaluate accuracy on held-out test images and inspect mistakes",
    ],
    skills: ["Neural networks", "Backpropagation", "PyTorch", "Image classification"],
  },
  {
    slug: "lora-dialect-tuner",
    title: "LoRA Dialect Fine-Tuner",
    level: "Expert",
    courseSlug: "ai-engineering",
    minutes: 240,
    summary:
      "Fine-tune a model to speak a specific style or dialect using LoRA — on consumer hardware.",
    brief:
      "Curate a small instruction dataset in a target style or domain dialect, then train a LoRA adapter on top of a frozen base model. You'll trace cost and loss as it trains and produce a tiny, swappable adapter that specializes a giant model — the real modern fine-tuning workflow.",
    steps: [
      "Build a clean, consistent instruction-pair dataset for the target style",
      "Configure a LoRA adapter (rank, target layers) on a frozen base model",
      "Train and monitor the loss curve on accessible hardware",
      "Swap the adapter in and compare outputs against the base model",
    ],
    skills: ["LoRA / PEFT", "Fine-tuning", "Dataset curation", "Evaluation"],
  },
  {
    slug: "agent-terminal-sandbox",
    title: "The Isolated Agent Terminal Sandbox",
    level: "Expert",
    courseSlug: "ai-engineering",
    minutes: 210,
    summary:
      "Build a tool-using agent that runs commands safely behind validation layers and hard guardrails.",
    brief:
      "Design a multi-turn agent that can call tools (including running commands) inside a sandbox, with proactive validation that inspects every action before it executes. The capstone on agent safety: tool allow-lists, step caps, and human-in-the-loop for risky operations.",
    steps: [
      "Implement the agent loop: plan → act with a tool → observe → repeat",
      "Add a tool registry with a strict allow-list of permitted actions",
      "Build a validation layer that checks each action before it runs",
      "Add step caps and human approval gates for high-risk commands",
    ],
    skills: ["AI agents", "Tool use", "Guardrails", "Safety validation"],
  },
  {
    slug: "gradient-descent-visualizer",
    title: "Gradient Descent Visualizer",
    level: "Intermediate",
    courseSlug: "math-for-ml",
    minutes: 120,
    summary:
      "Implement gradient descent on a simple function and watch, step by step, how it rolls downhill to the minimum.",
    brief:
      "Pick a function (start with f(x) = x²), compute its gradient, and run the update rule in a loop — logging each step's position and loss. Then plot the path to see learning rate in action: too small crawls, too large diverges. The clearest way to make 'gradient descent' click.",
    steps: [
      "Implement the function and its gradient",
      "Write the update loop: x = x - lr * gradient",
      "Log position and loss at each step",
      "Plot the descent path and experiment with different learning rates",
    ],
    skills: ["Gradient descent", "Derivatives", "Optimization", "Visualization"],
  },
  {
    slug: "titanic-survival",
    title: "Titanic Survival Predictor",
    level: "Advanced",
    courseSlug: "machine-learning",
    minutes: 150,
    summary:
      "The classic first ML competition: predict who survived the Titanic from passenger data, end to end.",
    brief:
      "Work the full ML pipeline on the famous Titanic dataset: explore the data, handle missing values, engineer features (title, family size), train a classifier, and evaluate it honestly with a train/test split. The canonical on-ramp to real machine learning.",
    steps: [
      "Explore the data and handle missing values",
      "Engineer features from names, cabins, and family columns",
      "Train logistic regression and a random forest",
      "Compare them with accuracy, precision, and recall on a held-out set",
    ],
    skills: ["Data cleaning", "Feature engineering", "Classification", "Evaluation"],
  },
  {
    slug: "neural-net-from-scratch",
    title: "Neural Network from Scratch (NumPy)",
    level: "Advanced",
    courseSlug: "deep-learning",
    minutes: 240,
    summary:
      "Build a working multi-layer neural network using only NumPy — forward pass, backprop, and training loop, no frameworks.",
    brief:
      "Implement a real neural network from first principles: weight initialization, the forward pass, a loss function, backpropagation by hand, and gradient-descent updates. Train it on a small dataset and watch the loss fall. The single best way to truly understand deep learning.",
    steps: [
      "Implement the forward pass for a 2-layer network",
      "Code the loss and derive the gradients via backprop",
      "Write the training loop with gradient-descent updates",
      "Train on a toy dataset and confirm the loss decreases",
    ],
    skills: ["Backpropagation", "NumPy", "From-scratch DL", "Gradient descent"],
  },
  {
    slug: "micrograd",
    title: "micrograd: Build an Autograd Engine",
    level: "Expert",
    courseSlug: "deep-learning",
    minutes: 210,
    summary:
      "Recreate Karpathy's micrograd: a tiny automatic-differentiation engine that powers a real neural net in ~150 lines.",
    brief:
      "Build a scalar-valued autograd engine from scratch — a Value object that tracks operations and computes gradients by walking the computation graph backward. Then use it to train a small MLP. This demystifies exactly what PyTorch's autograd does under the hood.",
    steps: [
      "Build a Value class that records operations into a graph",
      "Implement backward() for +, *, and an activation via the chain rule",
      "Topologically sort the graph and propagate gradients",
      "Train a small MLP built on your engine",
    ],
    skills: ["Autograd", "Chain rule", "Computation graphs", "From-scratch DL"],
  },
  {
    slug: "edge-detector",
    title: "Edge Detector from Scratch",
    level: "Advanced",
    courseSlug: "computer-vision",
    minutes: 120,
    summary:
      "Implement convolution by hand and apply classic filters to detect edges in a real image.",
    brief:
      "Load a grayscale image as a grid of numbers and write the convolution operation yourself. Apply Sobel filters to find horizontal and vertical edges, combine them into an edge map, and see the building block of every CNN working on a real photo — no deep-learning library required.",
    steps: [
      "Load an image and convert it to a grayscale number grid",
      "Implement 2D convolution (slide, multiply, sum)",
      "Apply Sobel-x and Sobel-y edge filters",
      "Combine into an edge-magnitude map and display it",
    ],
    skills: ["Convolution", "Filters", "Image processing", "NumPy"],
  },
  {
    slug: "image-classifier-transfer",
    title: "Cat vs. Dog Classifier (Transfer Learning)",
    level: "Advanced",
    courseSlug: "computer-vision",
    minutes: 210,
    summary:
      "Fine-tune a pretrained CNN to classify your own images with only a few hundred examples.",
    brief:
      "Use transfer learning to build an image classifier without a data center: take a model pretrained on ImageNet, freeze its feature extractor, attach a new head for your classes, and train on a small dataset (in a Colab notebook). Then evaluate accuracy and inspect what it gets wrong.",
    steps: [
      "Gather a small labeled image dataset (two classes)",
      "Load a pretrained CNN and freeze its base layers",
      "Attach and train a new classification head",
      "Evaluate accuracy and review misclassified images",
    ],
    skills: ["Transfer learning", "CNNs", "Fine-tuning", "PyTorch"],
  },
  {
    slug: "build-a-tokenizer",
    title: "Build a Tokenizer",
    level: "Intermediate",
    courseSlug: "nlp",
    minutes: 120,
    summary:
      "Write the text-to-tokens step that every language model depends on — including a simple subword algorithm.",
    brief:
      "Build a tokenizer from scratch: start with whitespace and punctuation splitting, build a vocabulary with token IDs, then implement a simplified Byte-Pair Encoding (BPE) that merges frequent pairs into subwords. You'll understand exactly what happens before text reaches a model.",
    steps: [
      "Implement basic word + punctuation tokenization",
      "Build a vocabulary mapping tokens to integer IDs",
      "Implement a simple BPE merge loop for subwords",
      "Encode and decode text round-trip to verify it",
    ],
    skills: ["Tokenization", "BPE", "Vocabularies", "Text processing"],
  },
  {
    slug: "spam-filter-naive-bayes",
    title: "Spam Filter with Naive Bayes",
    level: "Advanced",
    courseSlug: "nlp",
    minutes: 150,
    summary:
      "Build the classic email spam filter from probability up — train it on real messages and measure precision and recall.",
    brief:
      "Implement Naive Bayes text classification end to end: compute word probabilities per class, apply smoothing, work in log-space to avoid underflow, and classify unseen emails. Then evaluate with precision and recall, and inspect which words most signal spam.",
    steps: [
      "Tokenize a labeled spam/ham dataset and count word frequencies",
      "Compute per-class word probabilities with smoothing",
      "Classify new emails using summed log-probabilities",
      "Evaluate precision/recall and surface the most 'spammy' words",
    ],
    skills: ["Naive Bayes", "Probability", "Text classification", "Evaluation"],
  },
  {
    slug: "q-learning-frozenlake",
    title: "Q-Learning Agent for FrozenLake",
    level: "Advanced",
    courseSlug: "reinforcement-learning",
    minutes: 180,
    summary:
      "Train an agent to cross a slippery frozen lake using tabular Q-learning — from random flailing to a reliable policy.",
    brief:
      "Implement Q-learning from scratch on a grid world (FrozenLake-style): a Q-table, the update rule, epsilon-greedy exploration with decay, and a training loop over many episodes. Watch the success rate climb, then visualize the learned policy as arrows on the grid.",
    steps: [
      "Set up the grid environment (states, actions, rewards)",
      "Initialize a Q-table and implement the update rule",
      "Add epsilon-greedy action selection with decay",
      "Train over many episodes and visualize the learned policy",
    ],
    skills: ["Q-learning", "Exploration", "Reward design", "RL from scratch"],
  },
  {
    slug: "tic-tac-toe-rl",
    title: "Self-Taught Tic-Tac-Toe Agent",
    level: "Advanced",
    courseSlug: "reinforcement-learning",
    minutes: 180,
    summary:
      "Build an agent that learns to play tic-tac-toe by playing thousands of games against itself.",
    brief:
      "Apply reinforcement learning to a real game: represent board states, let the agent explore moves, reward wins and penalize losses, and update its value estimates through self-play. After training it should play optimally — never losing. A satisfying, fully self-contained RL project.",
    steps: [
      "Represent board states and legal moves",
      "Implement value updates from game outcomes (self-play)",
      "Balance exploration vs. exploitation during training",
      "Play against the trained agent and verify it never loses",
    ],
    skills: ["Reinforcement learning", "Self-play", "Value functions", "Game AI"],
  },
  {
    slug: "markov-text-generator",
    title: "Markov-Chain Text Generator",
    level: "Advanced",
    courseSlug: "generative-ai",
    minutes: 120,
    summary:
      "Build a simple generative text model from word statistics — the spiritual ancestor of every language model.",
    brief:
      "Train a Markov chain on a body of text: learn which words tend to follow which, then generate new sentences by sampling from those transitions. It's generative AI stripped to its essence — model the distribution, then sample — and a great contrast to how transformers do the same job.",
    steps: [
      "Build a transition table of which words follow which",
      "Sample the next word from each state's distribution",
      "Generate new text by chaining samples together",
      "Experiment with higher-order chains for more coherent output",
    ],
    skills: ["Generative models", "Probability", "Sampling", "Language modeling"],
  },
  {
    slug: "nanogpt",
    title: "nanoGPT: Build GPT from Scratch",
    level: "Expert",
    courseSlug: "generative-ai",
    minutes: 360,
    summary:
      "Follow Karpathy's path and build a small but real GPT — self-attention, transformer blocks, and training — that generates text.",
    brief:
      "The capstone build: implement a character-level GPT from scratch (in a Colab notebook with PyTorch). Code the self-attention you studied, stack transformer blocks, train on a text corpus, and watch it generate Shakespeare-like output. Everything in the curriculum converges here.",
    steps: [
      "Build a character tokenizer and batching for a text corpus",
      "Implement self-attention and a transformer block",
      "Stack blocks into a GPT and train with next-token loss",
      "Generate text and tune depth, heads, and context length",
    ],
    skills: ["Transformers", "Self-attention", "From-scratch GPT", "PyTorch"],
  },
];

export type ProjectRuntime = "browser" | "colab";

/**
 * Projects that need a GPU, PyTorch, large datasets, or live API access run as
 * real Jupyter notebooks (Colab/download). Everything else runs in-browser as a
 * guided MDX notebook via Pyodide — zero setup. See content/projects/<slug>.mdx
 * for the browser ones and public/notebooks/<slug>.ipynb for the Colab ones.
 */
const COLAB_PROJECTS = new Set<string>([
  "titanic-survival",
  "edge-detector",
  "image-classifier-transfer",
  "mnist-classifier",
  "nanogpt",
  "lora-dialect-tuner",
  "agent-terminal-sandbox",
]);

export function projectRuntime(slug: string): ProjectRuntime {
  return COLAB_PROJECTS.has(slug) ? "colab" : "browser";
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Projects recommended after finishing a given course. */
export function projectsForCourse(courseSlug: string): Project[] {
  return projects.filter((p) => p.courseSlug === courseSlug);
}

export const totalProjects = projects.length;
