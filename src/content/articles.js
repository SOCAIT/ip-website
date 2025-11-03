export const articles = [
  {
    slug: "first-post",
    title: "Agentic Systems: From RL to LLMs",
    date: "2025-09-16",
    excerpt: "Bridging classical reinforcement learning with modern agentic LLM stacks.",
    coverImage: "/assets/projects/wot.png",
    blocks: [
      { type: "heading", level: 1, text: "Agentic Systems" },
      { type: "text", text: "In this article, we explore how reinforcement learning concepts inform design choices for agentic LLM applications: memory, tools, and alignment." },
      { type: "image", src: "/assets/projects/syntrafit_sm.gif", alt: "Agent Loop", caption: "Feedback loops matter: observe → plan → act → reflect." },
      { type: "heading", level: 2, text: "Design Principles" },
      { type: "text", text: "Start small with a single tool, instrument everything, and iterate on reward / success metrics that reflect user value." }
    ]
  },
  {
    slug: "vision-xai",
    title: "Vision + XAI for Trustworthy Perception",
    date: "2025-07-01",
    excerpt: "A practical take on explainability overlays and saliency for robust perception.",
    coverImage: "/assets/projects/drone.jpeg",
    blocks: [
      { type: "heading", level: 1, text: "Explaining Vision Models" },
      { type: "text", text: "We examine quick wins for explainability overlays in production pipelines, without blocking performance budgets." },
      { type: "image", src: "/assets/ml.png", alt: "XAI Overlay", caption: "Saliency maps and bounding box rationales." }
    ]
  }
];


