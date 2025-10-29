// src/lib/case-studies.ts

export type CaseMetric = { label: string; value: string; tooltip?: string };
export type CaseGalleryItem = { src: string; alt?: string; ratio?: string };

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;

  role: string;
  period: string;
  category: "Product" | "Systems" | "Tooling" | "Open Source";

  stack: string[];
  featured?: boolean;

  highlights: string[];
  metrics?: string[]; // chips-style quick metrics (kept for backward compatibility)

  // Optional extras for detail pages (used by CaseStudyPage, etc.)
  stats?: CaseMetric[]; // structured stats for a "results" strip
  impact?: string[]; // narrative outcomes
  gallery?: CaseGalleryItem[]; // additional media

  image?: string; // hero/screenshot
  icon?: string; // Lucide icon name, e.g., "Mail", "Link", "FileText", "Wand2"
  links?: { live?: string; code?: string; caseStudy?: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "prompt-studio",
    title: "Prompt Studio",
    tagline: "LLM prompt engineering with measurable rigor.",
    summary:
      "Specialized environment for building and testing high‑fidelity prompts with verifiable metrics, adversarial suites, and cost analysis.",
    role: "Indie Project",
    period: "2025",
    category: "Product",
    stack: ["Next.js", "TypeScript", "OpenAI", "Embeddings (Jina)", "Postgres"],
    // featured: true,
    highlights: [
      "Adversarial testing with “Strictness Score” (99% constraint adherence)",
      "Semantic validation for intent alignment",
      "Real‑time collaboration + session persistence",
    ],
    metrics: ["Tracked prompt cost and coverage across suites"],
    // Optional structured stats for detail pages
    stats: [
      { label: "Strictness score", value: "99%" },
      { label: "Suite coverage", value: "90%+" },
    ],
    impact: [
      "Reduced regression rate across prompt updates by introducing adversarial suites.",
      "Improved cross‑team confidence with reproducible metrics and versioned runs.",
    ],
    // image: "/images/projects/prompt-studio/cover.png",
    icon: "Wand2",
    links: {
      live: "https://prompt-studio-liard.vercel.app",
      code: "https://github.com/patrickmvla/prompt-studio",
    },
    // gallery: [
    //   {
    //     src: "/images/projects/prompt-studio/editor.png",
    //     alt: "Prompt Studio editor",
    //     ratio: "aspect-[4/3]",
    //   },
    //   {
    //     src: "/images/projects/prompt-studio/suites.png",
    //     alt: "Adversarial suites",
    //     ratio: "aspect-[4/3]",
    //   },
    // ],
  },
  {
    slug: "eiga",
    title: "Eiga",
    tagline:
      "A private cinema club for people who love thinking about movies as much as watching them.",
    summary:
      "Eiga is a private cinema club for people who love thinking about movies as much as watching them. We keep membership small, the cadence steady, and the conversation deliberate. The goal isn’t to collect ratings—it’s to build an evolving conversation among a committed group.",
    role: "Indie Project",
    period: "2025",
    category: "Product",
    stack: ["Supabase", "Supabase Realtime", "Drizzle ORM", "Resend", "TMDB"],

    highlights: [
      "Invite‑only membership; small by design",
      "Steady cadence; deliberate, longform discussion",
      "Conversation over ratings; shared notes and reflection",
    ],
    metrics: ["Private", "Steady cadence", "Longform"],
    impact: [
      "Quality over quantity.",
      "Presence over performance.",
      "Curiosity over consensus.",
    ],
     image: "/images/projects/eiga/eiga.png",
    icon: "Clapperboard", // add to ProjectMedia iconMap if not already
    links: {
      live: "https://eiiga.vercel.app",
      code: "https://github.com/patrickmvla/eiga",
    },
  },
 {
  slug: "ronbun",
  title: "Ronbun",
  tagline:
    "Fast, personal AI/ML paper tracker — summaries, explainers, watchlists.",
  summary:
    "Web-only tracker for arXiv CS/ML papers that surfaces relevant new work, streams quick summaries and explainers, extracts structured fields, integrates PwC leaderboards, and delivers a personal feed and weekly digest — all grounded strictly on title/abstract (+ optional README).",
  role: "Indie Project",
  period: "2025",
  category: "Product",
  stack: [
    "Next.js",
    "Tailwind",
    "shadcn/ui",
    "Zustand",
    "TanStack Query",
    "React Hook Form",
    "Zod",
    "Supabase (Postgres, Auth, Storage)",
    "Drizzle ORM",
    "GroqCloud",
    "arXiv API",
    "ar5iv",
    "Papers with Code API",
  ],
  featured: true,
  highlights: [
    "Streaming summaries, multi‑level explainers, and reviewer mode (Groq)",
    "Watchlists with personal feed and weekly email digest",
    "PwC leaderboards + GitHub repo detection and quickstart",
  ],
  metrics: [
    "Web‑only, no RAG",
    "Keyless arXiv/PwC",
    "Grounded on title/abstract (+ README)",
  ],
  stats: [
    { label: "Grounding", value: "Title/abstract (+ README)" },
    { label: "RAG", value: "None" },
    {
      label: "Categories",
      value: "cs.AI, cs.LG, cs.CL, cs.CV, cs.NE, stat.ML",
    },
    { label: "Streaming", value: "Yes (Groq Llama 3.1)" },
    { label: "Digest", value: "Weekly" },
  ],
  impact: [
    "Cuts skim time with concise summaries and structured extraction.",
    "Keeps builders and researchers current via watchlists and momentum ranking.",
    "Transparent scoring and ‘Not stated’ guardrails reduce hallucinations.",
  ],
  image: "/images/projects/ronbun/cover.png", // ← add this
  icon: "BookOpen", // keep as fallback
  links: { live: "https://ronbunn.vercel.app" },
},
  {
    slug: "ai-gmail-sorter",
    title: "AI Gmail Sorter",
    tagline: "Intelligent email automation.",
    summary:
      "Headless AI agent learns email patterns and organizes inboxes with high accuracy. Event‑driven and resilient at scale.",
    role: "Indie Project",
    period: "2025",
    category: "Product",
    stack: ["TensorFlow.js", "Node.js", "Gmail API", "GCP Pub/Sub"],
    highlights: [
      "Bi‑LSTM model for real‑time classification",
      "Event‑driven pipeline (<100ms)",
      "24/7 service handling 1,000+ emails/day",
    ],
    metrics: ["~95% classification accuracy"],
    stats: [
      { label: "Accuracy", value: "~95%" },
      { label: "p95 latency", value: "<100ms" },
      { label: "Throughput", value: "1k+ emails/day" },
    ],
    impact: [
      "Reduced manual triage time with continuously learning classifiers.",
      "Stable operations with backpressure and retries across bursts.",
    ],
    // image: "/images/projects/ai-gmail-sorter/cover.png",
    icon: "Mail",
    links: { code: "https://github.com/patrickmvla/ai-gmail-sorter" },
  },

];
