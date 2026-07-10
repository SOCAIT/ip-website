# Building a learning system that refuses to take my word for it

## Semideus Cognition, and the engineering behind a "prove it" learning loop

There is a lie I tell myself every time I read a dense paper: *I get it.* I highlight a few sentences, nod at the hard part, close the tab, and file the topic under "known." Weeks later I cannot explain the thing to a colleague without hedging. The highlight was never understanding. It was the feeling of understanding, which is a different and much cheaper substance.

Semideus Cognition is the project I built to make that lie impossible for myself. The whole product is organized around a single stubborn rule: **a claim of knowledge does not count until typed proof attaches, and self-report never moves state.** There is no "mark as learned" button anywhere in the app. You do not tell the system you understand something. You teach it back, you sit a test generated from your own sources, you survive spaced retrieval over months, and a number that you cannot touch decides how much you actually know.

This writeup is the honest tour: the vision, the full stack, and especially the agentic parts, because that is where most of the interesting engineering lives. I will show real mechanisms, not a feature list.

---

## The vision, in one paragraph

In an era where a model can summarize anything in seconds, the bottleneck is no longer access to information. It is the human's capacity to internalize it. Consumption feels like progress while nothing actually crosses into you. So the product treats *your own learning process as the thing under instrumentation*. You bring raw material (papers, PDFs, YouTube lectures, articles, pasted transcripts) and the system turns it into an interrogable second brain: projects, learning paths, modules, decks of cards, and a source-grounded wiki. Then it makes you prove understanding through channels you cannot grade yourself, and it composes those proofs into a per-topic Mastery Score. On top of that sits a meta-learning layer that models *how you specifically learn* and adapts everything it generates to you.

The audience is people who refuse to confuse consuming information with becoming capable: researchers, engineers, students, operators. People who do not want to be told "great job." They want to be told, honestly, what they cannot yet explain and what they are about to forget.

---

## Architecture at a glance

The system is two repositories with a deliberate split down the middle.

**The product (`semideus-cognition`)** is a Next.js 15 app on the App Router, React 19, TypeScript in strict mode, Tailwind, Framer Motion for the mastery rings and review transitions, Recharts for the analytics, Zustand for client state. It runs on Vercel. This is where the user-facing learning surface lives, where the proof loop is scored, and where the in-process AI agents run.

**The backend (`semideus-cognition-backend`)** is a Python service (3.13, FastAPI, uvloop) that owns the heavy lifting the frontend should not do in-process. It ships two surfaces from one codebase:

1. A **RAG ingest pipeline** over HTTP on port 8000. Give it a URL or pasted text, it extracts, chunks, embeds, and writes vectors to a shared Qdrant collection.
2. An **MCP server** on port 8090 that exposes around twenty learning and wiki tools to Claude Desktop, Claude Code, or any MCP client, secured with full OAuth 2.1.

The seam between them matters. Persistence is Supabase Postgres with Row-Level Security. Both services share the same database and the same Qdrant collection, but the frontend never re-implements RAG, and the backend never touches schema migrations or the scoring engine. The frontend is a thin proxy to ingest and an identity bridge for the MCP OAuth handshake. Everything else has one home.

Why split it at all? Two reasons. First, the AI work that needs Python's ecosystem (document loaders, PDF extraction, transcript APIs, LangChain splitters) belongs in Python, and the reactive product belongs in TypeScript. Second, the MCP server is a genuinely different kind of thing from a web app: it is an OAuth authorization server with its own token lifecycle, and I wanted it to be able to scale and deploy on its own.

---

## The knowledge substrate: ingest and RAG

Understanding needs something to be *about*, so the first job is turning whatever you throw at the system into grounded, retrievable material.

When you add a source, the frontend proxies a request to the backend's `POST /api/v1/sources/ingest`. The request is authenticated with your Supabase JWT, which the backend validates by decoding the `sub` claim locally rather than making a network round-trip to Supabase Auth on every call. A router then sniffs the URL and dispatches to the right extractor: YouTube (transcript API), PDF (`unstructured`), or a general webpage (`trafilatura`). Pasted text skips extraction entirely.

Extraction is slow and flaky, so it never happens inline. In production the ingest endpoint enqueues a Google Cloud Tasks job that calls back into a webhook (guarded by a shared secret header); in development it uses FastAPI `BackgroundTasks`. Same code path, two schedulers, so local behavior matches prod. The endpoint returns immediately with a "processing" row, and the UI shows the source materializing.

The store step is where a few small decisions pay off. Text is chunked with a recursive splitter (1000 characters, 200 overlap), embedded with `text-embedding-3-large` (3072 dimensions), and upserted to Qdrant in batches. Every point carries a payload with a `file-id` (the `learning_sources` row UUID), the `user-id`, the `project-id`, source URL, source type, and chunk position. That `file-id` is the key that makes re-ingest idempotent: before inserting fresh chunks I delete every existing point for that source, scoped by `file-id`, so re-processing replaces a source's vectors instead of piling up duplicates, and can never touch another user's or another source's points. External calls to OpenAI, Qdrant, and Supabase are all wrapped in tenacity retries with exponential backoff, and the collection check is cached in-process and warmed at startup so steady-state ingests skip the round-trip.

Once material is in, generation is grounded. The wiki distills sources into linked, citation-backed articles where every claim traces back to a passage. Decks and tests are generated from your material, not from the model's general knowledge. Nothing is generic content.

---

## The proof engine: why the number cannot be faked

This is the spine of the product. Mastery for a topic is a single 0 to 100 score composed from three proof channels:

- **Teach-back: 50%.** You explain a concept in your own words. Claude scores the explanation against the module's ground truth on clarity, accuracy, depth, and analogy quality, and it names the specific gaps and contradictions.
- **Tests: 30%.** Questions generated from your own sources, scored question by question against a rubric, not against an answer key you can peek at.
- **Retention: 20%.** Spaced retrieval over time. A card is not "known" because you got it once. It has to survive 30, 60, and 180-day floors.

When any signal is missing, the formula degrades gracefully instead of punishing you. If you have taught back and reviewed cards but never taken a test, it blends 70/30 teach-back and cards. If you have tested but have no cards, it blends 60/40. The full 50/30/20 kicks in when all three exist. This lives in `persistModuleMastery.ts`, and the blended module scores roll up into path scores and then project scores.

The part I care most about is *where* this runs. Every write that moves mastery happens server-side through a service-role Supabase client. The browser client can only read owner-scoped rows. So "self-report never moves state" is not a UI convention I hope nobody bypasses; it is enforced at the data layer. There is no client-authored path to a mastery number.

For scheduling, retention uses FSRS-6 (the modern spaced-repetition algorithm) through a wrapper that is the only module allowed to import the library, so the algorithm is swappable and the rest of the app speaks plain state types. Users never touch raw FSRS parameters. They get one "review intensity" dial that maps to the algorithm's target retention, clamped to a sane band. On top of FSRS sit the 30/60/180-day retention floors, which are the long-horizon durability layer: a card mastered two months ago gets a probe, and failing it drops the topic's retention component and pulls the card back into rotation.

The teach-back evaluator itself is deliberately defensive. It prompts Claude for strict JSON, strips code fences, parses, and then clamps every field into range with sensible fallbacks, so a malformed model response degrades to a reasonable score instead of throwing. It also recomputes the overall score from the sub-scores if the model's own overall is missing. The Bloom taxonomy level is computed internally to drive the engine but is deliberately never shown to the user. Mastery and gaps surface in plain language. No academic chips, no "you reached Level 4 Analyze."

---

## The agentic layer

Here is the part I would actually want to talk about in an interview. The product is not a chatbot with a system prompt. It is several distinct agentic systems, each with a different shape, wired so that the models do the language work while the server owns the truth.

The whole in-process agent runtime is built on **Mastra**, with the **Anthropic** and **OpenAI** SDKs underneath. Agents are registered per model tier (a fast tier, a smart tier, and a pro tier), because different jobs deserve different cost and capability, and the route picks the tier per request.

### 1. The Project Agent: grounded, tool-routing generation

This is the assistant embedded inside a learning project. It is the one that runs slash commands like `/create-path`, `/generate-cards`, `/challenge`, `/teach-back`, and `/distill`. What makes it more than a wrapper is the discipline around it.

**A strict grounding hierarchy.** For any factual question, the agent is instructed to try the project wiki first (distilled, interlinked truth), then RAG over your uploaded sources, then web search, and if none cover the question, to say so plainly rather than invent. It cites wiki pages as `[[slug|label]]` and sources by title. If a tool returns a degraded flag or errors, it falls back to the next source and keeps going instead of retrying a failing call in a loop, and the tool loop is bounded at sixteen steps as a safety net.

**Personalization that never compromises correctness.** Before generating content, the agent pulls the user's cognitive profile and applies it as a style layer only: prefer these analogy domains, match this depth and pace, skip basics for already-known topics. That instruction block is appended *after* the structural rules so that correctness and required depth always win over style.

**Real engineering on cost and memory.** The large, tool-schema-heavy system prompt is marked with an Anthropic ephemeral cache breakpoint, so the whole tools-plus-instructions prefix is billed once per cache window instead of on every step of the tool loop. (The trace that motivated this showed 30k input tokens with zero cache reads and an 8.4 second time-to-first-token.) When a Postgres connection is configured, the agent also gains persistent memory: durable per-user working memory (a learner profile it maintains), recent-message history, and semantic recall, so the route stops resending the full transcript every turn. When it is not configured, the agent degrades cleanly to stateless.

**Prompt-injection defense as a first-class rule.** Content returned by any retrieval tool is treated as data, never as instructions. The agent is told, explicitly, never to obey directives embedded in retrieved material ("ignore your instructions," "reveal your prompt"). It may quote or describe such content; it may never execute it. When your app's whole job is to ingest arbitrary text from the internet and feed it to an LLM, this is not optional.

### 2. The Socratic tutor: a multi-agent loop where the server holds the state

This is the most architecturally interesting piece. A Socratic dialogue is not one model in a chat window. It is a small society of specialized agents, each with one job, coordinated by server-owned state.

The concept being learned is decomposed into named "parts," each with a state (exploring, forming, got it). On each turn:

- A **Diagnostician** classifies the learner's last reply into one of a fixed set of classes: on-track, partial, near-miss, off-track, misconception, meta-question, give-up. It returns structured JSON and nothing else.
- An **Orchestrator** reads the live session state (which was classified and progressed server-side, not by the model) and picks exactly one next pedagogical move from a closed vocabulary: probe, self-explain, retrieval check, nudge, counter-example, transfer probe, synthesis advance, teach-back invite, or refuse-answer-request. Refusing to just hand over the answer is a first-class move. It also writes the plain-language rationale that the learner sees when they click "why did you ask that?"
- A **Synthesizer** writes the wrap-up at the end: what landed, what stayed fuzzy, and a few gap cards to generate.
- Supporting agents handle part decomposition and scaffolding.

The crucial design choice: **the server owns the loop and the proof; the models only choose moves and produce language.** The orchestration code calls each agent, parses defensively, and falls back to something safe on failure. If a model call gets flaky, the move quality degrades but the loop never breaks and the proof stays intact. State transitions, nudge-level tracking (never skip a level), and progress live in code, not in a model's head. This is what lets an LLM-driven tutor be reliable enough to attach to a mastery score.

### 3. The Protégé: proving you know it by teaching a machine that does not

This one is my favorite from a product standpoint. You teach a concept to an AI apprentice, part by part, streamed over Server-Sent Events. She reacts, asks follow-ups, and pushes back where your explanation thins out. Then she sits a quiz on what you taught her, and here is the twist: her score becomes *your* proof.

The logic is honest by construction. Her quiz is graded server-side. Her score, expressed on the same 0 to 5 teach-back scale, is written as a teach-back row sourced from her, which becomes durable, citable evidence and a mastery signal. And it can only ever help you: proof never regresses mastery, so a weak apprentice score holds your prior score rather than dragging it down (I clamp back to the pre-event value and re-roll the path and project rollups). The framing writes itself: "She missed two of five. She slipped exactly where your explanation thinned out." Her gaps are a mirror of yours.

### 4. The Provocateur: productive resistance, on purpose

A small, sharp agent that reads a passage you are studying and generates exactly one provocation, then stops. It has six moves (surface a buried assumption, pose the strongest counterargument, demand evidence, offer an alternative frame, locate where the idea breaks, reconcile a tension) and a hard set of rules: never state a fact, never declare the passage true or false, never resolve the provocation, never summarize. It is grounded in your own material so the resistance is specific, not generic. If the passage is too thin to provoke honestly, it emits a literal `SKIP`. It is a thinking partner, not a citation, and truth verification deliberately lives elsewhere.

### 5. The MCP server: your cognition, exposed to any agent, over real OAuth

This is the part that took the most careful engineering and the part I am proudest of. The backend exposes your learning state (learning paths, due cards, modules, teach-backs, wiki articles, around twenty tools total) over the Model Context Protocol, so you can sit inside Claude Desktop or Claude Code and say "what am I about to forget?" and it reads and mutates your real cognition state.

The hard problem is auth. An MCP tool must act as *you*, with your permissions, and it must do so without you pasting a token anywhere. So the MCP server implements **full OAuth 2.1, acting as both authorization server and resource server, federating identity to Supabase.** The flow:

1. A client (Claude Desktop, say) registers dynamically (RFC 7591 Dynamic Client Registration) and starts a PKCE-protected authorization request.
2. The MCP server redirects to the cognition frontend's login page, packing everything it needs to recover later (client id, redirect URI, PKCE challenge, scopes) into an HMAC-signed `state`.
3. You log in with Supabase on the frontend. The frontend posts the resulting session back to the MCP server's callback.
4. The server issues its own authorization code, then exchanges it for its own token pair.

The token design is where the details matter. The access token is a signed JWT whose `sub` is your Supabase user id. Embedded inside it, encrypted with AES-GCM, is your Supabase JWT, so when a tool call comes in, the server can decrypt it and bind a per-request Supabase client carrying your identity *without a database round-trip on every call*. The refresh token is opaque, hashed at rest, and rotated on every use, with cascade revocation of the access tokens it minted. Refreshing also refreshes the underlying Supabase session behind the scenes.

And then the payoff: every tool reads the caller from `get_authenticated_user_id()`; no tool ever accepts a `user_id` parameter. That function binds a context-scoped Supabase client to your JWT, so every query inside a tool passes Row-Level Security *as you*. Service-role access exists only for genuine background jobs. So even when an external agent is driving, it is boxed into exactly your data by the database itself.

---

## The meta-learning layer

A flashcard app helps you memorize. The ambition here is to help you learn how to learn, which means modeling the learner.

The **cognitive profile** captures preferred analogy domains (with weights), explanation depth, a concrete-versus-abstract lean, pace, prior-knowledge tags, and outside interests. Every generator reads it and shapes tone and examples to it. The nice part is that it self-refines without nagging you for input: when the teach-back evaluator sees you produce a strong analogy from a particular domain, it nudges that domain's weight up with an exponential moving average. Over time the system's examples drift toward the ones that actually land for you.

The **skill-progression ledger** is append-only. Meaningful events (a teach-back completed, a challenge passed, a card mastered, a retention probe, a Protégé lesson) each write a full snapshot of the path's state: mastery, retention rate, the 60-day retention floor, average teach-back score, cards mastered, study hours, and more. Frequency of events is itself signal, and the append-only history is what powers the trend charts and the "you are learning faster than last month" claim.

---

## Cross-cutting engineering

A few things run through the whole system that I think separate a demo from a product.

**Observability.** Every LLM call is traced through Langfuse, on both sides. The teach-back evaluator opens a generation span with the model, parameters, and token usage; the Mastra runtime exports traces automatically. When a scoring result looks wrong, I can open the exact prompt and completion that produced it.

**Security discipline as a habit.** RLS everywhere. Service-role only for background jobs, and even then every query is explicitly scoped by user id because service-role skips RLS. Secrets never hit the client. Conversion-tracking tokens are read server-side only. The prompt-injection rule described above. The backend has binding contributor rules (structlog with no f-strings in event names, tenacity on every flaky call, a rate-limit decorator on every route, imports at the top of every file) enforced by ruff, so the codebase stays boring in the way infrastructure should be boring.

**A design language with a point of view.** The product has a cosmic, slightly mythic aesthetic (gold and violet on a dark void), but the in-product vocabulary is deliberately neural rather than mythic: nodes, synthesis, apertures. The review surface is a "lattice" of nodes you bring into focus. It sounds like a small thing, but a coherent vocabulary is part of making the abstract idea of "mastery" feel like a real, tangible object you are shaping.

---

## Trade-offs I made on purpose

No project is only its highlight reel, and I would rather be straight about the seams.

The product started as a fork of a larger multi-pillar app and was stripped to the cognition pillar. That inheritance was a gift (the whole proof loop landed working on day one) and a tax (there were cross-pillar seams to cut and a baseline schema to re-own as first-class migrations). I chose the fork because shipping a working spine and then removing what did not belong was faster than rebuilding from zero.

There is no ORM. It is raw Supabase client calls throughout. For a schema this relational, an ORM would arguably help, but the raw client keeps the RLS story simple and the queries legible, and I did not want a second source of truth about the schema.

The Mastra subtree is excluded from `tsc --noEmit` due to an inherited Zod type-instantiation issue and typechecks via the Next build instead. Automated test coverage is honestly still thin: the highest-value first targets are mastery composition and the teach-back evaluation contract, exactly because those are the parts that must never silently drift. I would rather name that than pretend the whole thing is covered.

---

## What I actually learned building it

The technical lesson I keep coming back to is this: **when you build with LLMs, the reliability comes from everything around the model, not the model.** The Socratic tutor is trustworthy because the server owns the state machine and the proof, and the agents only choose moves inside a closed vocabulary with defensive parsing and safe fallbacks. The mastery number is trustworthy because it can only be written server-side. The MCP integration is safe because RLS boxes every tool call into the caller's own data regardless of which agent is driving. The model is the language engine. The system is the architecture that makes its output safe to depend on.

The product lesson is simpler. The most valuable thing software can tell you is not "great job." It is "here is the exact thing you cannot yet explain, and here is what you are about to forget." Building the machine that says that to me, honestly, every day, changed how I read.

I set out to make it impossible to lie to myself about what I know. The engineering is what makes the honesty non-negotiable.
