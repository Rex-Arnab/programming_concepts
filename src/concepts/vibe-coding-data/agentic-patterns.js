const agenticPatterns = {
  name: "Agentic & Advanced Patterns",
  icon: "🚀",
  color: "#ec4899",
  concepts: [
    {
      id: 1741,
      name: "Agentic Coding vs Vibe Coding",
      desc: `**Agentic Coding vs Vibe Coding** — the fundamental distinction between human-in-the-loop AI assistance (vibe coding, where you review and approve each step) and autonomous, goal-driven execution (agentic coding, where an AI agent plans, executes, tests, and iterates independently toward a defined objective).

Vibe coding keeps the human in the loop at every step — you prompt, the AI generates, you review, you decide. Agentic coding delegates entire objectives to an AI agent that reasons about strategy, selects tools, executes actions, evaluates results, and iterates until the goal is achieved — with minimal human intervention. The 2025 arXiv paper "Vibe Coding vs. Agentic Coding" frames these as complementary paradigms on a spectrum: vibe coding for exploration and creativity, agentic coding for well-defined, repetitive, or large-scale tasks.

**Builder tip:** Use the "well-defined goal test" to decide which mode to use. If you can write a 3-sentence objective that a colleague could verify was completed correctly, it is a good agentic task. If the goal requires judgment calls, aesthetic decisions, or exploration, vibe coding is the better mode — the human-in-the-loop matters for fuzzy goals.

**Watch out:** The autonomy of agentic coding amplifies both good direction and bad direction. A well-specified goal executed autonomously produces impressive results. A vague or incorrect goal executed autonomously produces impressive-looking but wrong results — at scale, and potentially irreversibly. Specificity of goal definition is the most critical input to agentic coding.`,
    },
    {
      id: 1742,
      name: "ReAct Pattern",
      desc: `**ReAct Pattern** — the Reasoning + Acting agent architecture where the AI model alternates between explicit reasoning steps (thinking about what to do next) and action steps (actually calling tools, running code, or making changes), producing transparent, auditable agent behavior.

ReAct (from the 2022 paper "ReAct: Synergizing Reasoning and Acting in Language Models") structures agent behavior as an explicit loop: Thought (what I know and what I should do next) → Action (call a tool or execute a step) → Observation (what the tool returned) → Thought → Action → ... until the goal is achieved. The Thought steps make the agent's reasoning transparent — you can see where it is going and intervene before a wrong reasoning step leads to a wrong action. Claude Code and most modern agentic frameworks implement ReAct internally.

**Builder tip:** When building custom agents, expose the Thought steps in your logging. A ReAct agent that only shows actions is an opaque box; one that shows thoughts before each action lets you intercept wrong reasoning before it becomes wrong actions. The thought log is your primary debugging tool for agentic behavior.

**Watch out:** ReAct's transparency is only useful if you actually review the thought steps. Agents that are left to run autonomously for extended sessions without anyone monitoring the thought log can make a sequence of individually plausible but collectively wrong decisions. Implement thought-level logging and alert on unusual reasoning patterns for production agents.`,
    },
    {
      id: 1743,
      name: "SPARC Framework",
      desc: `**SPARC Framework** — a structured agentic delivery methodology: Specification (clarify requirements) → Pseudocode (outline the approach) → Architecture (design the system) → Refinement (iterate and improve) → Completion (verify and deliver) — applying software engineering discipline to AI agent task execution.

SPARC treats agentic coding like Agile for AI: breaking delivery into deliberate phases with explicit artifacts at each stage. The Specification phase produces a requirements document; Pseudocode produces a high-level algorithm outline; Architecture produces a system design; Refinement iterates on the implementation; Completion verifies against the original specification. Each phase has a clear deliverable and approval gate. For complex, long-running agentic tasks, SPARC prevents the "confident but wrong" pattern where agents produce complete but incorrect implementations.

**Builder tip:** Use SPARC for multi-hour agentic tasks — anything you estimate will take an agent more than 30 minutes to complete. Start by asking the agent to produce each SPARC artifact in sequence, reviewing and approving each before moving to the next phase. The 10 minutes spent reviewing the Specification before Pseudocode saves hours of wrong implementation.

**Watch out:** SPARC adds overhead that is not justified for simple, well-understood tasks. A SPARC process for "add a loading spinner to this button" is absurd. Reserve the framework for genuinely complex agentic tasks: large refactors, new module implementations, multi-service integrations, or any task where an incorrect implementation would require significant rework.`,
    },
    {
      id: 1744,
      name: "Multi-Agent Orchestration",
      desc: `**Multi-Agent Orchestration** — the architecture of using multiple specialized AI agents working in parallel or in sequence, each assigned a specific role (planner, coder, tester, reviewer), to complete complex software development tasks that exceed a single agent's capability or context window.

Multi-agent systems decompose complex tasks across specialized agents. A planner agent breaks the objective into subtasks. Coder agents implement individual subtasks in parallel. A tester agent verifies each implementation against acceptance criteria. A reviewer agent integrates the results and checks for consistency. Frameworks like CrewAI, LangGraph, and AutoGen implement this pattern. The decomposition enables parallelism, specialization, and the ability to work on tasks that exceed a single context window.

**Builder tip:** For multi-agent systems, define clear handoff contracts between agents — the exact format and content of what each agent produces and what the next agent expects to receive. Vague handoffs between agents produce the same quality problems as vague prompts to single agents, compounded by the additional complexity of agent coordination.

**Watch out:** Multi-agent systems introduce coordination overhead and failure modes that single-agent systems do not have. Agents can produce inconsistent implementations, conflict on shared resources, or produce cascading failures when one agent's incorrect output becomes another agent's input. Test multi-agent pipelines exhaustively before deploying them for production tasks.`,
    },
    {
      id: 1745,
      name: "Tool Use Primitives",
      desc: `**Tool Use Primitives** — the fundamental building blocks of agent capability: file read, file write, bash execution, web search, API calls, database queries, and browser automation — the verbs that transform a language model from a text generator into an agent that can affect real systems.

Tool use is what gives agents their power and their risk. An agent without tools is a chatbot; an agent with file write, bash execution, and network access is a system that can build software, deploy applications, and modify production databases. The primitives seem simple but their combinations are powerful: read a file → understand its patterns → write a modified version → run tests → if tests fail, read the error → modify the file again → repeat. This loop, repeated autonomously, is what makes agents transformative.

**Builder tip:** When designing an agent's tool set, apply the principle of least privilege: give the agent only the primitives it needs to accomplish its specific task. A documentation-writing agent needs read access and write access to markdown files — it does not need bash execution or network access. Each additional primitive is an additional attack surface.

**Watch out:** Bash execution is the most powerful and most dangerous tool primitive. An agent with bash access can run any command — including ones that delete data, install software, or make network connections to arbitrary destinations. Always require explicit confirmation for bash execution in production environments, and sandbox the execution environment for autonomous agents.`,
    },
    {
      id: 1746,
      name: "Memory in Agents",
      desc: `**Memory in Agents** — the mechanisms by which AI agents store and retrieve information across interactions: short-term memory (the active context window), episodic memory (conversation history), semantic memory (vector embeddings of past interactions), and procedural memory (learned tool use patterns encoded in prompts).

Single-session agents forget everything between conversations. Persistent agents use memory systems to maintain context across sessions: a vector database stores embeddings of past interactions, relevant memories are retrieved based on semantic similarity to the current query, and the retrieved context is injected into each new session. For long-running development agents — ones that work on a codebase over days or weeks — persistent memory is the difference between a tool that learns your patterns and one that starts cold every session.

**Builder tip:** Implement a simple memory layer for long-running agents using a markdown file the agent writes to at session end: "Today I learned: [key insights, patterns discovered, decisions made]." At session start, inject this file as context. This simple approach provides 80% of the benefit of vector memory with none of the infrastructure complexity.

**Watch out:** Agent memory can become corrupted or outdated. A memory that records "the database uses PostgreSQL" becomes harmful when the project migrates to MySQL. Include a memory audit step in your agent workflow — periodically review and prune memories that are no longer accurate. Stale memories are worse than no memories.`,
    },
    {
      id: 1747,
      name: "Human-in-the-Loop Checkpoints",
      desc: `**Human-in-the-Loop Checkpoints** — explicitly defined approval gates in an autonomous agent pipeline where the agent pauses, presents its current state and proposed next action, and waits for human confirmation before proceeding — preventing autonomous accumulation of irreversible mistakes.

Full autonomy is appropriate for low-stakes, reversible tasks with clear success criteria. Human-in-the-loop checkpoints are appropriate for: any action that cannot be undone (deleting data, sending communications, deploying to production), any decision that involves significant judgment (architectural choices, prioritization), and any action beyond a predefined scope. The checkpoint is not a failure of autonomy — it is a designed feature that preserves human oversight for the decisions that matter most.

**Builder tip:** Design checkpoints based on reversibility, not just step count. "After every 10 actions" is an arbitrary checkpoint that may interrupt during harmless boilerplate generation. "Before any write to the database," "before any deployment," and "before any external API call" are risk-based checkpoints that preserve human oversight where it matters.

**Watch out:** Too many checkpoints defeat the purpose of autonomous agents — the human spends all their time approving trivial decisions. Too few checkpoints allow the agent to make consequential mistakes autonomously. Calibrate checkpoint placement by mapping out your task's risk profile before deploying the agent: which actions are low-stakes and reversible (approve autonomously), which are high-stakes or irreversible (require human approval).`,
    },
    {
      id: 1748,
      name: "Vibe Coding to Agentic Engineering",
      desc: `**Vibe Coding to Agentic Engineering** — the progression from simple AI-assisted coding (vibe coding) through increasingly sophisticated AI integration (prompt engineering, multi-agent systems, meta-prompts) to a fully agentic engineering approach where AI agents plan, implement, test, and deploy software with minimal human intervention.

The progression follows a maturity ladder: Ideation (vibe coding for quick prototypes) → Exploration (prompt engineering for reliable generation) → Architecture (agentic engineering for complex multi-step tasks) → System Scaling (meta-prompts and orchestration for repeatable pipelines). Each stage builds on the previous, adding sophistication as the tasks become more complex and the team becomes more skilled at directing AI systems. The endpoint — "agentic engineering" — is not the elimination of human developers but the transformation of their role into system designers and AI orchestrators.

**Builder tip:** Assess your current maturity stage honestly before jumping to the next. Teams that try to implement multi-agent orchestration before mastering basic prompt discipline fail because the foundational skills are missing. Master the vibe loop before building agents; master single-agent workflows before building multi-agent systems.

**Watch out:** "Agentic engineering" is a direction, not a destination you arrive at completely. Even the most sophisticated agentic systems require human oversight, architectural judgment, and continuous calibration. The goal is not to remove humans from software development — it is to remove humans from the parts of software development that AI does better, freeing them for the parts that require genuine creativity and judgment.`,
    },
    {
      id: 1749,
      name: "Orchestrator-Worker Pattern",
      desc: `**Orchestrator-Worker Pattern** — the multi-agent architecture where a high-capability orchestrator agent (using a strong model) decomposes a complex goal into subtasks and delegates them to specialized worker agents (potentially using cheaper, faster models), then integrates and validates the results.

The pattern mirrors effective engineering management: the orchestrator thinks strategically (what needs to be done, in what order, by whom), the workers think tactically (how to implement this specific piece). The orchestrator uses a strong model (Claude claude-opus-4-6, o3) for planning and coordination; workers use capable but cheaper models (Claude claude-sonnet-4-6, GPT-4o) for implementation. This produces high-quality results at a fraction of the cost of running the strongest model for every operation.

**Builder tip:** In LangGraph or CrewAI implementations, always make the orchestrator's plan explicit and reviewable before workers begin execution. An orchestrator plan is a directed acyclic graph of tasks — visualize it, review it, and approve it before triggering parallel worker execution. This gives you the oversight of vibe coding with the efficiency of agentic execution.

**Watch out:** Orchestrator errors propagate to all workers. If the orchestrator misunderstands the goal or decomposes the task incorrectly, every worker implements the wrong thing — correctly, efficiently, and at scale. Review the orchestrator's decomposition with the same rigor you apply to your own architectural decisions; it is making the same class of decisions.`,
    },
    {
      id: 1750,
      name: "The Future of Software Development",
      desc: `**The Future of Software Development** — the trajectory from manual coding to AI-assisted development to AI-autonomous engineering, and the evolving role of human developers as orchestrators of intelligent systems rather than authors of individual lines of code.

The trajectory is clear: software development is moving from "write code" to "direct AI" to "orchestrate agent systems." The skills that will define the best engineers in 2027 are not memorizing syntax or knowing every library API — they are defining precise goals, designing evaluation criteria, building systems that maintain quality under AI-generated output, and knowing when to trust automation and when to intervene. Y Combinator's data point — 25% of Winter 2025 batch with 95% AI-generated codebases — is a preview of the near-term norm.

**Builder tip:** Invest in the meta-skills that compound in an AI-assisted world: precise communication (prompt engineering is communication engineering), system thinking (agentic pipelines are system design problems), and rapid evaluation (the ability to quickly assess whether AI output is correct is the scarcest and most valuable skill in this new paradigm).

**Watch out:** The "AI will replace developers" narrative misses the actual direction. AI is replacing the routine parts of development — boilerplate, CRUD operations, standard UI patterns. It is not replacing the hard parts: understanding user needs, designing systems that scale, debugging emergent behavior, and making architectural trade-offs under uncertainty. Those skills are more valuable, not less, in a world where the routine work is automated.`,
    },
  ],
};

export default agenticPatterns;
