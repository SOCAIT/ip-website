/**
 * Portfolio case studies.
 *
 * `blocks` uses the same shape as the Supabase-backed articles, so the existing
 * <ArticleContent> renderer draws these unchanged. Projects live in code rather
 * than the CMS on purpose: there are a handful of them, they change a few times
 * a year, and they are part of the site's structure rather than a content feed.
 *
 * A project with `blocks` gets a case-study page at /portfolio/<slug>.
 * A project with only `externalLink` links straight out.
 * A project with neither renders as a non-interactive card.
 */

export const projects = [
  {
    slug: 'semideus-cognition',
    blurb: 'LLM · Mastra · Teach-back · Spaced retrieval · Mastery score',
    title: 'Semideus Cognition',
    tagline: 'A learning system that refuses to take your word for it',
    summary:
      'A learning platform where saying you understood something never moves the score. You prove it through teach-back, generated tests, and spaced retrieval. A mastery score you cannot edit decides what you actually know.',
    year: '2025 to present',
    role: 'Product, backend, agent runtime',
    image:
      'https://gfzoopjhqhxjomjtxsyy.supabase.co/storage/v1/object/public/article-images/gzx2zsrqdjg-1782996891993.png',
    tags: ['EdTech', 'AI Agents', 'Full Stack'],
    stack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Mastra',
      'Anthropic SDK',
      'FastAPI',
      'Qdrant',
      'Supabase',
      'FSRS-6',
    ],
    links: [
      { label: 'Live product', href: 'https://learn.semideus.io/welcome', external: true },
      { label: 'Full technical writeup', href: '/articles/semideus-cognition-a-prove-it-learning-system' },
    ],
    blocks: [
      { type: 'heading', level: 2, text: 'The problem' },
      {
        type: 'text',
        text: 'Reading a dense paper gives you the *feeling* of understanding. That is cheaper than the real thing. You highlight a few sentences, nod at the hard part, file the topic as known, and weeks later you cannot explain it to a colleague without hedging. Every learning tool I tried made this worse because they let me mark my own progress.',
      },
      { type: 'heading', level: 2, text: 'The rule the whole system is built around' },
      {
        type: 'text',
        text: '**A claim of knowledge does not count until typed proof attaches, and self-report never moves state.** There is no "mark as learned" button anywhere in the product. This is not a UI choice. Every write that moves a mastery number happens server-side through a service-role client, and the browser can only read owner-scoped rows. There is no client-authored path to a mastery score.',
      },
      { type: 'heading', level: 2, text: 'How mastery is composed' },
      {
        type: 'text',
        text: 'Mastery for a topic is a single 0–100 score built from three channels you cannot grade yourself:',
      },
      {
        type: 'bullet_list',
        items: [
          { text: '**Teach-back, 50%.** You explain a concept in your own words. The model scores it against the module\'s ground truth on clarity, accuracy, depth and analogy quality, and names the specific gaps and contradictions.' },
          { text: '**Tests, 30%.** Questions generated from your own uploaded sources, scored question by question against a rubric rather than a peekable answer key.' },
          { text: '**Retention, 20%.** Spaced retrieval on FSRS-6, with 30, 60 and 180-day floors. A card is not "known" because you got it once.' },
        ],
      },
      {
        type: 'text',
        text: 'When a signal is missing the formula eases off instead of punishing you. Teach-back and cards alone blend 70/30. Tests without cards blend 60/40. The full 50/30/20 only applies once all three exist.',
      },
      { type: 'heading', level: 2, text: 'Architecture' },
      {
        type: 'text',
        text: 'Two repositories with a deliberate split. The product is a Next.js 15 App Router app on React 19 and strict TypeScript, running the in-process agent runtime on Mastra with the Anthropic and OpenAI SDKs behind it. The backend is a Python 3.13 FastAPI service that owns the work the frontend should not do in-process: a RAG ingest pipeline that extracts, chunks and embeds sources into a shared Qdrant collection, and an MCP server exposing around twenty learning and wiki tools over full OAuth 2.1.',
      },
      {
        type: 'text',
        text: 'The seam matters. Both services share one Postgres and one vector collection, but the frontend never re-implements RAG and the backend never touches schema migrations or the scoring engine. Re-ingesting a source deletes its existing vectors by `file-id` before inserting fresh ones, so reprocessing replaces rather than duplicates and can never reach another user\'s points.',
      },
      { type: 'heading', level: 2, text: 'The agents' },
      {
        type: 'text',
        text: 'The product is not a chatbot with a system prompt. Agents are registered per model tier (fast, smart, pro) and the route picks a tier per request, because different jobs deserve different cost and capability.',
      },
      {
        type: 'text',
        text: 'The project agent runs under a strict grounding hierarchy: try the project wiki first, then RAG over your uploaded sources, then web search, and if none of them cover the question, say so plainly rather than invent. Tool failures fall through to the next source instead of retrying in a loop, and the tool loop is bounded at sixteen steps as a safety net.',
      },
      { type: 'heading', level: 2, text: 'What I would call the hard part' },
      {
        type: 'text',
        text: 'Making the model do the language work while the server owns the truth. The teach-back evaluator prompts for strict JSON, strips code fences, parses, then clamps every field into range with sensible fallbacks. A malformed response becomes a reasonable score instead of throwing. Bloom taxonomy level is computed internally to drive the engine and never shown. Mastery and gaps surface in plain language, with no academic chips and no "you reached Level 4 Analyze".',
      },
    ],
  },

  {
    slug: 'offline-rl-world-of-tanks',
    blurb: 'TorchRL · PyTorch · Off-policy evaluation · NVIDIA',
    title: 'Offline Reinforcement Learning in World of Tanks',
    tagline: 'MSc thesis, in collaboration with Wargaming',
    summary:
      'Learning driving policies from logged World of Tanks battle data without touching the live game, and evaluating them off-policy. In a shipped title you cannot let a half-trained agent explore.',
    year: '2024 to 2025',
    role: 'MSc thesis · research collaboration with Wargaming',
    image: '/assets/projects/wot.webp',
    tags: ['Reinforcement Learning', 'Deep Learning', 'Gaming'],
    stack: ['PyTorch', 'TorchRL', 'CUDA', 'NVIDIA', 'Python'],
    links: [],
    blocks: [
      { type: 'heading', level: 2, text: 'The problem' },
      {
        type: 'text',
        text: 'Online reinforcement learning assumes you can let a policy act in the environment and learn from what happens. In a live commercial game that assumption is unusable: exploration means a half-trained agent behaving visibly badly in front of players, and the sample budget an on-policy method needs is far beyond what a production title will give up.',
      },
      {
        type: 'text',
        text: 'What Wargaming does have is an enormous archive of logged battles. The question this thesis takes on is whether that archive is enough. Can you learn a competent policy purely from behaviour that was already recorded, and, harder, can you *trust* your evaluation of it without ever deploying it?',
      },
      { type: 'heading', level: 2, text: 'Why offline RL is the hard version' },
      {
        type: 'text',
        text: 'Offline RL removes the feedback loop that normally keeps value estimates honest. A Q-function trained on a fixed dataset will happily assign high value to state-action pairs the data never covered, and because there is no environment to contradict it, that error compounds through bootstrapping instead of being corrected. Most of the engineering is about constraining the learned policy toward the support of the logged data without collapsing it into pure imitation.',
      },
      { type: 'heading', level: 2, text: 'Approach' },
      {
        type: 'bullet_list',
        items: [
          { text: 'Built the training stack on **TorchRL** and PyTorch, with CUDA acceleration on NVIDIA hardware, so the offline algorithms and replay structures came from a maintained library rather than bespoke implementations.' },
          { text: 'Framed the logged battle archive as a static dataset of trajectories, with the state, action and reward representation derived from telemetry rather than designed for an agent.' },
          { text: 'Used **off-policy evaluation** as the primary measurement channel, estimating how a candidate policy would perform from data generated by a different behaviour policy, since running the candidate to find out was not an option.' },
        ],
      },
      { type: 'heading', level: 2, text: 'Results' },
      {
        type: 'text',
        text: 'TODO. Add the headline numbers here: which offline algorithms you compared, the OPE estimator(s) used, and how the learned policies scored against the behaviour policy baseline. This is the section a reader will look for first.',
      },
      { type: 'heading', level: 2, text: 'What I took away' },
      {
        type: 'text',
        text: 'TODO. Two or three sentences on what surprised you, what you would do differently, and what this says about applying offline RL to shipped products generally.',
      },
    ],
  },

  {
    slug: 'physical-ai-picar',
    blurb: 'Raspberry Pi · Vision + tool use · Closed-loop agent',
    title: 'Physical AI PiCar',
    tagline: 'One robot, many AI brains',
    summary:
      'A physical robot with a single hardware abstraction and swappable AI control interfaces. The one built today is an LLM agent: give it a goal in plain English and a vision-and-tool-use loop perceives, reasons and drives real motors one step at a time.',
    year: '2026',
    role: 'Solo project',
    image: '/assets/projects/orion_robotics.webp',
    tags: ['Robotics', 'Computer Vision', 'AI Agents'],
    stack: ['Python 3.11+', 'Claude (vision + tools)', 'Raspberry Pi', 'Adeept PiCar-B2', 'OpenCV'],
    links: [
      { label: 'Source on GitHub', href: 'https://github.com/giannisp09/physical-ai-picar', external: true },
    ],
    blocks: [
      { type: 'heading', level: 2, text: 'The idea' },
      {
        type: 'text',
        text: 'The Adeept PiCar-B2 is four wheels with front-wheel steering, a pan/tilt camera and an ultrasonic distance sensor on a Raspberry Pi. Its stock software is a manual web joystick. This project replaces the human driver with a closed-loop agent. You hand the robot a goal in plain English ("find the red ball", "drive forward until you see a doorway, then stop") and it works out the rest.',
      },
      { type: 'heading', level: 2, text: 'The loop' },
      {
        type: 'numbered_list',
        items: [
          { text: '**Perceive.** Grab a camera frame plus the forward ultrasonic distance.' },
          { text: '**Reason.** The model looks at the image and decides the single best next move.' },
          { text: '**Act.** It calls exactly one tool: `drive`, `turn`, `look` or `stop`.' },
          { text: '**Repeat.** Observe the new frame and re-plan, until the goal is met or judged unreachable.' },
        ],
      },
      {
        type: 'text',
        text: 'One tool call per step is the constraint that makes the thing debuggable. The agent cannot plan a five-move sequence and execute it blind. Every action is followed by fresh perception, which is the only way the loop stays honest about a world that does not match its expectations.',
      },
      { type: 'heading', level: 2, text: 'Architecture' },
      {
        type: 'text',
        text: 'The design principle is **one hardware abstraction, many interchangeable control interfaces**. Every brain, whatever paradigm it works in, drives the robot through the same `RobotBackend` surface (`drive`, `turn`, `look`, `stop`, `distance`, `frame`), so adding a new interface never touches hardware code.',
      },
      {
        type: 'text',
        text: 'That surface has two implementations: a `MockBackend` with a synthetic camera that runs on a laptop with no hardware attached, and a `PicarBackend` driving real motors, servos and camera. Being able to develop and test the whole agent loop without the robot on the desk is what made the project tractable.',
      },
      { type: 'heading', level: 2, text: 'Where it goes next' },
      {
        type: 'text',
        text: 'The abstraction exists so the brain can be swapped. Two interfaces are on the roadmap and not yet built: a **Vision-Language-Action policy** mapping pixels and text straight to actions, and a **world model** doing action-conditioned prediction in the V-JEPA family. The interesting comparison is not which one wins, but what each paradigm needs from the same physical surface.',
      },
    ],
  },

  {
    slug: 'tweet-sentiment-financial-analysis',
    blurb: 'NLP · Time series · Stock market · GPT',
    title: 'Tweet Sentiment Financial Analysis and Generation',
    summary: 'NLP and time-series work linking tweet sentiment to stock market movement.',
    year: '2023',
    image: '/assets/projects/twitter_stock.webp',
    tags: ['NLP', 'FinTech', 'ML'],
    externalLink: 'https://github.com/giannisp09/NLP623-Team-6',
  },

  {
    slug: 'drone-vision-xai',
    blurb: 'YOLO · XAI · Real-time detection',
    title: 'Object Detection and Explainability using Drone Vision',
    summary: 'Real-time YOLO detection with explainability overlays, aimed at civilian and environmental protection.',
    year: '2024',
    image: '/assets/projects/drone.webp',
    tags: ['Computer Vision', 'XAI', 'Drones'],
    externalLink:
      'https://www.cygnus-project.eu/images/publications/2024_Adversarial-Explanations-for-Informed-Civilian.pdf',
  },

  {
    slug: 'qaoa-travelling-salesman',
    blurb: 'Python 3 · Qiskit · Quantum optimisation',
    title: 'QAOA for the Travelling Salesman Problem',
    tagline: 'BSc thesis',
    summary: 'Quantum approximate optimisation for the travelling salesman problem, implemented in Qiskit.',
    year: '2021',
    image: '/assets/projects/tsp.webp',
    tags: ['Quantum Computing', 'Optimization'],
  },
];

export const caseStudies = projects.filter((project) => Array.isArray(project.blocks));

export function getProject(slug) {
  return projects.find((project) => project.slug === slug) ?? null;
}

/** Where a card should point: a case study if one exists, else the external link. */
export function projectHref(project) {
  if (Array.isArray(project.blocks)) return `/portfolio/${project.slug}`;
  return project.externalLink ?? null;
}
