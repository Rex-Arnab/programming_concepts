const contextManagement = {
  name: "Context Management",
  icon: "🧠",
  color: "#06b6d4",
  concepts: [
    {
      id: 1699,
      name: "Context Window Limits",
      desc: `**Context Window Limits** — the finite amount of text an AI model can process in a single session, measured in tokens, which determines how much code, conversation history, and documentation the model can actively consider when generating output.

Every major model has a context limit: Claude claude-sonnet-4-6 supports 200k tokens (~150k words), GPT-4o supports 128k tokens, Gemini 2.5 Pro supports 1M tokens. In practice, effective quality degrades before the hard limit — models lose track of earlier context as conversations grow. Code generation is particularly vulnerable because accuracy requires holding multiple files, type definitions, and architectural constraints simultaneously. A 10,000-line codebase can easily exceed practical context limits when you include conversation history.

**Builder tip:** Monitor your context usage actively. Cursor and Claude Code display token counts — treat 50% utilization as a yellow flag to start a fresh session soon. At 75%, start a new session immediately. Continuing past 75% produces an observable drop in output coherence and accuracy.

**Watch out:** Long conversations create context pollution — the model tries to reconcile contradictory instructions given at different points in the conversation. Earlier instructions are weighted less than recent ones, so long-running sessions often silently abandon constraints you set at the beginning. Start fresh sessions for new features, even within the same working day.`,
    },
    {
      id: 1700,
      name: "When to Start a Fresh Context",
      desc: `**When to Start a Fresh Context** — recognizing the signals that indicate a conversation has become too polluted, bloated, or degraded to produce quality output, and knowing that starting a new session is faster than fighting a degraded one.

The signals are clear once you know to look for them: the AI starts referencing variables that do not exist, repeating suggestions it already gave, suggesting solutions you explicitly rejected earlier, or producing code that does not match your project's conventions despite explicit instructions. These are not temporary glitches — they are symptoms of context degradation that worsen with every additional exchange. A fresh session, even if it requires re-establishing context, produces better output in fewer total exchanges.

**Builder tip:** Write a "session handoff" note before ending a degraded session: the current state of the feature, what has been implemented, what is still needed, and what approaches to avoid. Paste this at the start of the fresh session. This re-establishes context in 30 seconds and produces better output than continuing a 2-hour session with increasing AI confusion.

**Watch out:** The temptation to persist in a degraded session is strong — you have invested time building context and do not want to "lose" it. But context is not an asset you lose by resetting; you lose it by continuing to use a session that is producing bad output. The cost of one bad commit from a degraded session often exceeds the cost of a fresh session start.`,
    },
    {
      id: 1701,
      name: "CLAUDE.md as Living Documentation",
      desc: `**CLAUDE.md as Living Documentation** — treating the CLAUDE.md file not as a one-time setup document but as an evolving project guide that captures new conventions, lessons learned, forbidden patterns, and architectural decisions as the codebase grows.

A static CLAUDE.md set up in week 1 and never touched is useful but limited. A living CLAUDE.md that is updated whenever a new convention is established, whenever the AI makes a mistake you do not want repeated, or whenever the architecture evolves becomes genuinely powerful — it compounds knowledge over time. Every time you catch the AI making a recurring mistake, document the correct pattern in CLAUDE.md and it will never make that mistake again.

**Builder tip:** After every significant vibe coding session, spend 2 minutes reviewing: did the AI make any mistakes I had to correct manually? Did I establish any new patterns or conventions? Add these as bullet points to CLAUDE.md immediately. The habit takes 2 minutes per session and produces a document that saves hours per month.

**Watch out:** CLAUDE.md has a size limit in practice — both the token budget it consumes and the cognitive load of maintaining it. Keep it under 200 lines of actionable content. Archive old conventions to a separate file when they are superseded. A CLAUDE.md that contains contradictory conventions (from different architectural phases) is actively harmful — it creates confusion rather than clarity.`,
    },
    {
      id: 1702,
      name: ".cursorrules Anatomy",
      desc: `**.cursorrules Anatomy** — the internal structure of an effective .cursorrules file: a technology stack declaration, coding conventions, library preferences, patterns to avoid, and project context — organized so the AI can quickly locate the most relevant instruction for any given task.

A well-structured .cursorrules file typically opens with a project overview (2-3 sentences), then lists the technology stack with versions, then coding conventions (TypeScript strict mode, named exports, no default exports), then preferred libraries for common tasks (React Query for async state, Zod for validation, date-fns for dates), then patterns to explicitly avoid, and finally any project-specific context the AI needs (this is a B2B SaaS tool, users are financial analysts). The structure matters because the model processes the file from top to bottom.

**Builder tip:** Put the most critical constraints near the top of .cursorrules — the model weights earlier content more heavily. If you must use a specific API client, if there is a critical security requirement, or if there is a common AI mistake you want to prevent, lead with it. The last 20 lines of a 100-line .cursorrules are processed with lower attention than the first 20.

**Watch out:** .cursorrules is not enforced — it is instructional. The model can still violate its contents, particularly under complex or contradictory prompts. Treat it as a strong default bias, not an absolute constraint. Critical requirements (like "never log sensitive data") must also be enforced in code, not just in .cursorrules.`,
    },
    {
      id: 1703,
      name: "File Pinning Strategy",
      desc: `**File Pinning Strategy** — the deliberate selection of which files to explicitly include in AI context for a given task, based on what information the AI needs to generate project-coherent output — not which files happen to be open.

The files you pin determine the quality of what the AI generates. For a UI component task: pin the types file (so types are correct), the design system components file (so existing components are reused), and the relevant existing component (so style patterns are matched). For a backend task: pin the database schema, the API contract types, and the existing route handler pattern. Every session benefits from a deliberate 30-second decision about which files to include.

**Builder tip:** Create a mental model of your project's "anchor files" — the 5-7 files that define your project's constraints and patterns. These might include: the main types file, the API client, the design system index, the database schema, and the project's main utility file. Develop the habit of always including the most relevant anchor files in context before generating.

**Watch out:** Pinning irrelevant files wastes context budget and can actively mislead the AI. If you pin a deprecated utility file out of habit and the AI uses its patterns, you have introduced deprecated code into new features. Audit your pinning habits regularly and remove files from your standard context set when they become stale or irrelevant.`,
    },
    {
      id: 1704,
      name: "Context Poisoning",
      desc: `**Context Poisoning** — the phenomenon where a single incorrect AI assumption, once accepted and built upon, propagates through subsequent generations as a false constraint, making future output increasingly misaligned with the project's actual requirements.

Context poisoning starts with a small error: the AI generates a function with a slightly wrong signature, you accept it without noticing, and in the next prompt the AI builds on that signature as if it were correct. Two prompts later, the entire feature assumes the wrong signature. By the time you discover the original error, unwinding it requires examining every downstream decision that built on it. The accepted error became a false axiom — the entire logical chain that follows is contaminated.

**Builder tip:** Never accept AI output you do not understand. Every function signature, every type definition, every architectural decision the AI introduces must be one you can reason about. If something looks off, stop and investigate before continuing. Pausing to question takes 30 seconds; unwinding poisoned context takes hours.

**Watch out:** Context poisoning is self-reinforcing. Once a wrong assumption is in the conversation history, the model will cite it as established fact in future responses: "As we established earlier, the API returns..." No — you accepted what the AI claimed, not what the API actually does. The distinction matters enormously when the claim was wrong.`,
    },
    {
      id: 1705,
      name: "Retrieval-Augmented Coding",
      desc: `**Retrieval-Augmented Coding** — the technique of using embeddings and semantic search to give AI agents access to codebases, documentation, and knowledge bases that exceed the context window, retrieving only the most relevant sections for each query.

Standard context windows limit how much code an agent can see simultaneously. RAC (adapting the RAG pattern to code) addresses this: the codebase is embedded, stored in a vector database, and retrieved on demand. When you ask "how does our authentication middleware work?" the system retrieves the auth middleware files, the relevant types, and the related test files — not the entire 500k-line codebase. Tools like Cursor's codebase indexing, Sourcegraph's Cody, and custom RAG setups with LlamaIndex implement this pattern.

**Builder tip:** For large codebases, configure Cursor's codebase indexing and use "@codebase" references in your prompts. This enables questions like "@codebase how do we handle pagination in our API routes?" that would be impossible with manual file pinning in a project with 200+ files.

**Watch out:** RAC retrieval is imperfect — the embedding search may miss the most relevant file if the query does not use the same terminology as the code. Always verify that the AI's answer reflects the actual code by asking it to cite the specific file and line number it is drawing from. If it can not cite a source, it may be hallucinating.`,
    },
    {
      id: 1706,
      name: "Codebase Preparation for AI",
      desc: `**Codebase Preparation for AI** — the structural and documentation practices that make a codebase more understandable to AI agents: clear naming, consistent patterns, inline comments on non-obvious logic, and explicit type annotations that give the model accurate signals about intent.

AI output quality correlates strongly with codebase quality. A well-structured codebase with consistent naming, explicit types, and clear module boundaries gives the AI accurate signals about patterns and intent. A messy codebase with inconsistent naming, implicit types, and scattered business logic produces AI output that confidently extends the mess. The AI amplifies existing patterns — good and bad — rather than correcting them.

**Builder tip:** Before starting a major vibe coding initiative on an existing codebase, invest a session in "AI-readiness cleanup": add explicit TypeScript types to the core data models, add brief comments explaining non-obvious architectural decisions, and rename any ambiguously named files or functions. This single session pays back throughout the entire initiative.

**Watch out:** Do not conflate codebase preparation with premature optimization. You do not need perfect code to use AI effectively — you need consistent and readable code. The goal is giving the AI accurate context about patterns and intent, not achieving architectural perfection before a single prompt is written.`,
    },
    {
      id: 1707,
      name: "The Muddled Thread Problem",
      desc: `**The Muddled Thread Problem** — the state a long conversation reaches when accumulated context includes contradictory instructions, accepted errors, abandoned approaches, and competing constraints — making every new response less coherent than the last.

A muddled thread is the cumulative effect of an evolving conversation that never reset. Prompt 5 established a pattern that prompt 15 tried to undo. Prompt 10 accepted an error that prompt 20 is now working around. Prompt 18 introduced a constraint that conflicts with prompt 3. The model does its best to reconcile the entire history but the reconciliation produces incoherent output — code that partially reflects multiple conflicting approaches. The solution is not another prompt; it is starting fresh with a clean context.

**Builder tip:** Recognize the signal: you are writing prompts that start with "actually, ignore what I said about..." or "let us go back to the approach from earlier..." These are symptoms of a muddled thread. Stop. Write a fresh session brief summarizing current state and what you actually want. Start a new conversation.

**Watch out:** The muddled thread problem scales with session length. Short, focused sessions rarely muddle. Long sessions, especially those that change direction mid-session, almost inevitably muddle. The discipline of keeping sessions focused on one feature or one clear goal is the primary prevention — not the cure.`,
    },
    {
      id: 1708,
      name: "Organizational Debt Amplification",
      desc: `**Organizational Debt Amplification** — the principle that AI coding tools amplify the quality of your existing engineering foundation — good process, clean code, and clear conventions produce great AI output; messy codebases, poor documentation, and inconsistent patterns produce coherently wrong AI output, faster.

This is one of the most important and least discussed truths about vibe coding: AI does not compensate for organizational dysfunction, it accelerates it. A team with clear coding standards, well-organized repositories, and disciplined documentation gets output that fits their patterns. A team with undocumented tribal knowledge, inconsistent naming, and scattered business logic gets AI output that extends the inconsistency — confidently and at scale.

**Builder tip:** Before evaluating AI tools for your team, assess your codebase health honestly. If your TypeScript types are mostly "any," your file structure is inconsistent, and your conventions are tribal knowledge held in senior developers' heads — fix those problems first. AI tools will not solve them and will make them harder to untangle.

**Watch out:** The amplification effect is rapid and compounding. A team using AI on a messy codebase can accumulate more technical debt in one month than they accumulated manually in a year. The velocity is real but so is the accumulated mess. Set explicit standards for AI-generated code before unleashing the tools on the team.`,
    },
  ],
};

export default contextManagement;
