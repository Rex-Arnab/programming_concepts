const foundations = {
  name: "Foundations & Philosophy",
  icon: "🌊",
  color: "#6366f1",
  concepts: [
    {
      id: 1645,
      name: "What is Vibe Coding",
      desc: `**What is Vibe Coding** — a software development approach where you express intent in natural language and direct an AI to generate, refine, and debug code, shifting from writing every line to directing outcomes.

The term was coined by AI researcher Andrej Karpathy in a February 2025 post where he described "fully giving in to the vibes" — embracing AI as the primary code author while the human steers direction. Within months, Y Combinator reported that 25% of Winter 2025 batch startups had codebases that were 95% AI-generated. Vibe coding is not a shortcut or a toy — it is a fundamental shift in the developer role from craftsman to director.

**Builder tip:** Think of yourself as a film director, not an actor. Your job is to define the scene, set the constraints, and approve the take — not perform every role yourself. Start every session by writing a one-paragraph brief of what you want to build before touching the AI.

**Watch out:** Vibe coding is not zero-skill development. The quality of your output is directly proportional to the precision of your direction. Vague prompts produce vague code — and at scale, vague code becomes an unmaintainable mess that costs more to fix than it saved to generate.`,
    },
    {
      id: 1646,
      name: "The Director Mindset",
      desc: `**The Director Mindset** — the mental shift from writing code yourself to defining outcomes, setting constraints, and approving generated results, treating the AI as a capable but junior collaborator who needs clear direction.

In traditional development, the developer is the author — they make every syntax decision, every structural choice. In vibe coding, the developer becomes the director: they define what success looks like, constrain the solution space, and evaluate the output against acceptance criteria. This is not easier — it requires a different kind of precision. A director who can not articulate what a good scene looks like will get garbage from even the best actor.

**Builder tip:** Before each prompt, write down two things: (1) what done looks like — the exact behavior you expect, and (2) what out-of-scope looks like — what the AI should NOT touch. Including both dramatically tightens output quality.

**Watch out:** The director mindset fails when you rubber-stamp AI output without genuine review. Every diff must be read line by line. The moment you start clicking "Accept All" without reading, you have abdicated direction and become a passive observer of a system you no longer control.`,
    },
    {
      id: 1647,
      name: "Vibe Coding vs Traditional Coding",
      desc: `**Vibe Coding vs Traditional Coding** — the trade-off between AI-directed development (fast, high-level, prototype-friendly) and hand-written code (precise, controlled, audit-friendly), and knowing when each approach wins.

Traditional coding gives you full understanding and control of every line — essential for performance-critical paths, complex distributed systems, and security-sensitive components. Vibe coding gives you speed, iteration velocity, and the ability to explore solution spaces rapidly — essential for MVPs, internal tools, UI iterations, and validation experiments. The best developers treat these as complementary, not competing, approaches: vibe code the structure and boilerplate, hand-write the critical paths.

**Builder tip:** Use the "criticality test" to decide which mode to use. Ask: if this code behaves incorrectly, what is the blast radius? Cosmetic UI bugs = vibe code freely. Authentication logic, payment processing, or data migrations = hand-write with tests, use AI only for suggestions.

**Watch out:** The biggest trap is vibe coding something you do not understand and shipping it without understanding it. Generated code you can not explain is a liability. Before shipping any AI-generated logic, be able to explain in plain English what each function does and why.`,
    },
    {
      id: 1648,
      name: "Vibe Coding vs Agentic Coding",
      desc: `**Vibe Coding vs Agentic Coding** — the spectrum between human-in-the-loop AI assistance (vibe coding) and autonomous, goal-driven AI execution (agentic coding), each suited to different task complexity and risk levels.

Vibe coding keeps the human in the loop at every step — you prompt, review the output, approve or reject, then prompt again. Agentic coding delegates entire objectives to an AI agent that plans, executes, tests, and reports results autonomously. Think: vibe coding is a jazz improvisation between you and the AI; agentic coding is commissioning a composer to write the full symphony and deliver it on deadline. The arXiv paper "Vibe Coding vs. Agentic Coding" (2025) argues that successful AI development harmonizes both within a unified lifecycle.

**Builder tip:** Use vibe coding when you need tight control or are exploring unknown territory. Shift to agentic mode for well-defined tasks with clear acceptance criteria — "refactor the API layer for consistency and update all tests" is a good agentic task; "build me a startup" is not.

**Watch out:** Agentic coding on an ambiguous objective produces confident, wrong results at scale. The autonomy multiplies both good direction and bad direction. Never launch an autonomous agent without a specific, verifiable goal and a sandboxed environment with rollback capability.`,
    },
    {
      id: 1649,
      name: "When to Vibe Code",
      desc: `**When to Vibe Code** — the contexts where AI-directed development genuinely accelerates output without accumulating dangerous debt: MVPs, demos, internal tools, UI iterations, documentation scaffolding, and prototype validation.

Vibe coding excels when speed of iteration matters more than perfection, when the blast radius of errors is low, and when the goal is validating a hypothesis before committing engineering resources. Building a landing page to test copy? Vibe code it in an hour. Building a quick internal Slack bot? Vibe code it in an afternoon. Prototyping a new UI pattern before the design is finalized? Vibe code five variants and pick the best. These contexts reward speed over precision.

**Builder tip:** The best vibe coding targets are things that would take a human 2-8 hours and have clear visual or behavioral acceptance criteria. If you can describe "done" in a paragraph and verify it in under 5 minutes, it is a perfect vibe coding candidate.

**Watch out:** "Internal tool" is not a free pass to skip security review. Internal tools frequently get promoted to customer-facing features or access production data. Build internal tools with vibe coding speed, but audit them with the same security mindset as customer-facing code before giving them production database access.`,
    },
    {
      id: 1650,
      name: "When NOT to Vibe Code",
      desc: `**When NOT to Vibe Code** — the contexts where AI-directed development creates more risk than value: safety-critical systems, cryptography and security primitives, complex distributed architecture, and code requiring deep domain expertise to verify.

Some code requires understanding that the AI can fake but you can not afford to verify quickly. Cryptographic implementations need expert review — AI will generate plausible-looking but subtly broken crypto. Authentication and authorization logic must be hand-written and audited. Real-time control systems, medical device software, and financial transaction engines require deterministic, provably correct behavior. AI-generated code in these contexts produces confident-looking output that may contain subtle errors you only discover in production.

**Builder tip:** Apply the "can I explain this to a security auditor" test. If you generated a piece of code and could not walk a security professional through exactly how it works and why it is safe, do not ship it until you can. Rewrite it by hand if necessary.

**Watch out:** The seductive speed of vibe coding makes it tempting to apply it everywhere. Developers who vibe code authentication flows and payment processing without deep review are the source of serious production vulnerabilities. Research shows AI-generated code has 2.74x more security vulnerabilities than human-written code — that multiplier matters most in security-critical paths.`,
    },
    {
      id: 1651,
      name: "The Prototype-to-Production Gap",
      desc: `**The Prototype-to-Production Gap** — the significant engineering work required to transform a vibe-coded prototype into a production-ready application: error handling, security hardening, performance optimization, observability, and maintainability.

A vibe-coded prototype typically skips everything that makes software production-ready: no input validation, no error boundaries, no logging, no rate limiting, no graceful degradation, no monitoring. This is correct for a prototype — those concerns slow iteration. The gap appears when builders mistake a working prototype for production-ready software. The Graduate Workflow addresses this: prototype in a browser builder, then move to Cursor or Claude Code for a structured production pass that adds all the missing layers.

**Builder tip:** Before promoting any vibe-coded prototype, run through this checklist: all user inputs validated, all errors handled gracefully, secrets in environment variables not hardcoded, all console.log statements removed, dependencies audited with "npm audit," and at least one happy-path integration test passing.

**Watch out:** The "it works on my machine" trap is lethal in vibe-coded projects. AI frequently generates code that works in the demo environment but breaks under load, with real data, with concurrent users, or in the target deployment environment. Always test with production-representative data before shipping.`,
    },
    {
      id: 1652,
      name: "The 50-Prompt Degradation Problem",
      desc: `**The 50-Prompt Degradation Problem** — the observed phenomenon where AI output quality declines significantly as a conversation grows longer, because the model's attention is diluted across an expanding context of prior decisions, changes, and contradictions.

Multiple practitioners independently report that the 5th prompt in a session produces better code than the 50th. As context grows, the model must reconcile an increasingly long history of decisions, some of which contradict each other. It starts producing generic, hedging, or inconsistent output. The fixes it suggests stop fitting the actual codebase. Errors begin referencing wrong variable names or outdated function signatures. The conversation has become cognitively polluted.

**Builder tip:** Treat context like RAM — finite and precious. For large features, break the work into focused sessions of 10-15 prompts maximum. Before starting a new session, write a fresh context brief: tech stack, relevant file paths, the current state, and the specific goal for this session. Start a new conversation rather than continuing a degraded one.

**Watch out:** The degradation is subtle — you will not notice a sharp cliff. Output gets slightly worse with each exchange until you suddenly realize you have been spending 20 minutes fixing AI-introduced bugs that did not exist before. The signal to reset: the AI starts referencing things that are not in your current codebase.`,
    },
    {
      id: 1653,
      name: "AI-Generated Code Security Risk",
      desc: `**AI-Generated Code Security Risk** — the empirically higher rate of security vulnerabilities in AI-generated code compared to human-written code, driven by training data that includes vulnerable examples and the model's inability to reason about threat models.

Research consistently shows AI-generated code contains approximately 1.7x more major issues and 2.74x more security vulnerabilities than hand-written code. The failure modes are predictable: SQL injection through unsanitized inputs, missing authentication checks, hardcoded secrets, dependency confusion attacks through hallucinated packages, and insecure direct object references. The AI writes code that passes functional tests but fails security review — because it optimizes for "does the feature work" not "can an attacker abuse this."

**Builder tip:** Treat every piece of AI-generated code touching user input, authentication, authorization, or data storage as untrusted until reviewed. Use automated tools — "npm audit," "bandit" for Python, "semgrep" for any language — as a first pass, then manual review for anything that handles sensitive data.

**Watch out:** The most dangerous vulnerability pattern in vibe-coded apps is the AI skipping authorization checks. It will build a fully functional CRUD API and forget to verify that the requesting user has permission to access the requested resource. Always explicitly test that user A cannot access user B's data.`,
    },
    {
      id: 1654,
      name: "The Productivity Perception Trap",
      desc: `**The Productivity Perception Trap** — the gap between perceived and actual productivity when using AI coding tools, documented in a July 2025 METR randomized controlled trial where experienced developers were 19% slower with AI tools but believed they were 20% faster.

The METR RCT is the most rigorous study on AI coding productivity to date. Experienced developers working on real tasks in their own codebases were randomly assigned to AI-enabled or AI-disabled conditions. Those with AI access felt faster and more confident — but their actual task completion time was slower. The likely explanation: AI tools create a sense of flow and momentum that masks the cognitive overhead of reviewing, correcting, and integrating AI output.

**Builder tip:** Measure actual cycle time, not perceived effort. Track time from "start prompt" to "feature merged and tested." Compare this to your baseline for similar tasks. Your intuition about AI speed is miscalibrated — instrument reality instead of trusting the feeling of velocity.

**Watch out:** The perception trap is most dangerous at the team level. Engineering managers who see developers "in flow" with AI tools and assume output is accelerating may be observing false confidence. The real signal is deployed, working features per sprint — not keystrokes saved or lines of code generated.`,
    },
  ],
};

export default foundations;
