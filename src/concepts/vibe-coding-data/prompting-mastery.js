const promptingMastery = {
  name: "Prompting Mastery",
  icon: "✍️",
  color: "#10b981",
  concepts: [
    {
      id: 1687,
      name: "The Anatomy of a Great Prompt",
      desc: `**The Anatomy of a Great Prompt** — the structural components that distinguish high-signal prompts from vague requests: a clear goal, success criteria, tech stack constraints, relevant context (file paths, types), and an explicit non-goals section.

Every great prompt answers five questions: What do I want to build? What does "done" look like? What constraints must the solution respect? What context does the AI need that it cannot infer? And what should it explicitly NOT do? Missing any of these invites the AI to fill the gap with assumptions — assumptions that may be plausible but wrong for your specific project. The non-goals section is the most commonly omitted and most valuable — explicitly saying "do not add error handling yet" or "do not refactor the existing code" prevents a significant class of unwanted AI behavior.

**Builder tip:** Keep a prompt template file in your project root. For a feature prompt, the template might be: "Goal: [one sentence]. Success criteria: [observable behavior]. Tech stack: [stack]. Relevant files: [paths]. Non-goals: [what to skip]." Fill in the template before every significant generation session.

**Watch out:** Long prompts are not necessarily good prompts. A 500-word prompt with contradictory requirements will produce worse output than a 100-word prompt with clear, consistent direction. Edit your prompts for clarity and consistency before sending — contradictions are amplified, not resolved, by the model.`,
    },
    {
      id: 1688,
      name: "Role Assignment Prompting",
      desc: `**Role Assignment Prompting** — the technique of explicitly defining the AI's persona, expertise level, and priorities at the start of a prompt — "Act as a senior TypeScript engineer who prioritizes type safety and accessibility" — to tap into the model's relevant domain knowledge and stylistic patterns.

Role assignment is not theater — it is a genuine way to shift the model's output distribution toward the patterns most associated with the expertise you need. When you tell the model it is a senior React engineer, it draws on the corpus of senior-level React discussions, code reviews, and architecture decisions in its training data. The priorities embedded in the role description — "who prioritizes security" or "who prefers simple solutions over clever ones" — bias every subsequent decision the model makes in the session.

**Builder tip:** Make role assignments specific rather than general. "Act as a senior engineer" is less effective than "Act as a senior TypeScript engineer building a consumer-facing SaaS product who prioritizes bundle size, accessibility, and type safety over flexibility." The more specific the role, the more coherent and targeted the output.

**Watch out:** Role assignment raises the ceiling on output quality — it does not guarantee it. A role-assigned model can still hallucinate, make architectural mistakes, and miss edge cases. Do not reduce your review rigor because the model is "acting as a senior engineer." Senior engineers make mistakes too; that is why code review exists.`,
    },
    {
      id: 1689,
      name: "Stepwise & Modular Prompting",
      desc: `**Stepwise & Modular Prompting** — the technique of breaking a complex feature into a sequence of focused, single-concern prompts rather than requesting everything in one shot — producing more accurate, reviewable output at each step.

Multi-paragraph feature requests produce monolithic code blocks — generic, brittle, and packed with hidden assumptions. Stepwise prompting addresses this by treating implementation as a pipeline: first the data model, then the API route, then the business logic, then the UI component, then the tests. Each step is independently reviewable, independently correctable, and independently committable. The AI maintains accuracy on each narrow task rather than juggling all dimensions simultaneously.

**Builder tip:** For any feature that touches more than 2 files or requires more than 30 lines of code, write a sequence of 3-5 prompts before starting. Phase 1: data model and types. Phase 2: server-side logic. Phase 3: client-side component. Phase 4: tests. Execute each phase, commit, review, then proceed. This rhythm dramatically improves output consistency.

**Watch out:** Over-modularizing small tasks adds overhead without benefit. If the feature fits naturally in one prompt — a single utility function, a CSS tweak, a one-line fix — use one prompt. Stepwise prompting is for complexity management; it is not a universal ritual to apply to every interaction.`,
    },
    {
      id: 1690,
      name: "Context Layering",
      desc: `**Context Layering** — the technique of stacking project-specific context upfront in a prompt before the actual request, so the AI generates code that fits your existing architecture, conventions, and patterns rather than a generic interpretation of the task.

Without context layering, the AI produces plausible-but-generic output: correct code for some React app, not your React app. With context layering, you specify the exact shape of your world: "We use React Query for server state, Zustand for client state, Zod for validation, and our API client is in 'src/lib/api.ts' and returns typed responses." Now every line the AI generates is calibrated to your actual codebase. Context layering is the difference between getting code that works in general and code that works in your project without modifications.

**Builder tip:** Create a "project brief" snippet — 5-10 lines describing your tech stack, key architectural decisions, and important file paths. Paste this at the top of any generation session where project-awareness matters. In Cursor, the .cursorrules file automates this; in other environments, keep the brief in a snippet manager.

**Watch out:** Context layering works only if the layered context is accurate. Stale or incorrect context is worse than no context — the AI will confidently follow outdated conventions, use removed libraries, or reference renamed files. Review your project brief monthly and update it whenever your stack or architecture changes significantly.`,
    },
    {
      id: 1691,
      name: "Plan-Before-Code Prompting",
      desc: `**Plan-Before-Code Prompting** — the discipline of asking the AI to produce a numbered implementation plan before writing any code, allowing you to validate the approach, correct the mental model, and approve the architecture before code is generated.

Skipping the planning step is the most expensive mistake in vibe coding. The AI generates code that reflects an incorrect understanding of the requirements, you accept it because it looks reasonable, and 30 minutes later you discover the core assumption was wrong. Plan-before-code breaks this cycle: "Before writing any code, give me a numbered step-by-step plan for implementing X. Do not include any code — just the plan." Review the plan, edit it if needed, then say "Now implement step 1."

**Builder tip:** Use a stronger, reasoning-focused model (o3, Claude claude-opus-4-6) for the planning step and a faster model (Claude claude-sonnet-4-6, GPT-4o) for the implementation. The planning decision is the highest-value AI call in the entire session — spend your most capable model tokens on getting it right.

**Watch out:** Plans can be deceptively good. An AI plan that reads clearly and logically may still be architecturally wrong for your specific context. Do not approve a plan just because it sounds reasonable — verify that it accounts for your actual constraints: existing code patterns, team conventions, performance requirements, and deployment environment.`,
    },
    {
      id: 1692,
      name: "Scope Limitation Technique",
      desc: `**Scope Limitation Technique** — the practice of explicitly constraining what the AI should NOT do in a prompt — "do not integrate Stripe yet, just use dummy payment data" — to prevent the AI from filling in unstated gaps with plausible but premature implementations.

AI models are trained to be helpful and complete. Left to their own judgment, they will implement what they think you want, not just what you asked for. This produces "feature creep from the AI" — authentication added when you only wanted a form, database schemas created when you only wanted UI, error handling patterns introduced when you were not ready for them. Scope limitation explicitly blocks this behavior, keeping the AI focused on the minimal viable implementation of the specific thing you are trying to validate.

**Builder tip:** Add a "Non-goals for this session" section to every significant prompt. List 3-5 things the AI should skip: "Do not add authentication," "Do not create database migrations," "Do not add loading states," "Do not refactor existing code." This simple addition reduces the scope of AI action by 40-60% and keeps diffs small and reviewable.

**Watch out:** Over-constraining prompts can produce implementations that are technically compliant but unusable. If you say "do not add error handling" and the AI produces a component that crashes silently on API failures, you have a scope that is too narrow for practical use. Balance scope limitation with minimum viable quality — the output must still be runnable.`,
    },
    {
      id: 1693,
      name: "The Non-Goals Section",
      desc: `**The Non-Goals Section** — an explicit section in your prompt listing things you do not want the AI to do, implement, or modify, preventing unsolicited additions, premature optimizations, and scope expansion that makes diffs large and reviews difficult.

Experienced vibe coders treat the non-goals section as equally important as the goals section. Telling the AI what you want is half the instruction; telling it what you do not want is the other half. Common non-goals: "Do not refactor existing code," "Do not add TypeScript generics beyond what is necessary," "Do not implement error states yet," "Do not touch any files outside of 'src/components/Auth.tsx.'" Each non-goal you specify prevents a class of unwanted AI behavior.

**Builder tip:** Review the last 5 diffs that frustrated you — code the AI added that you did not want, files it modified without being asked, abstractions it introduced prematurely. Each frustration maps to a non-goal you forgot to include. Build a personal non-goals library from your own experience and paste the relevant items into every prompt.

**Watch out:** Non-goals have diminishing returns past a certain length. A prompt with 15 non-goals is cognitively overloading the model's instruction-following capacity. Prioritize the 3-5 most impactful constraints rather than exhaustively listing every possible deviation. More is not always more effective.`,
    },
    {
      id: 1694,
      name: "Diff-Not-Rewrite Prompting",
      desc: `**Diff-Not-Rewrite Prompting** — the technique of explicitly instructing the AI to make targeted, minimal modifications to existing code rather than rewriting entire files, keeping changes reviewable, git-friendly, and easy to revert.

By default, AI models tend toward complete rewrites when they could instead make surgical modifications. "Rewrite" gives them a blank canvas with full creative latitude; "modify" forces them to work within your existing patterns. A rewrite might fix the bug but also change variable names, restructure the component, and add unsolicited abstractions — creating a diff that is impossible to meaningfully review. A targeted modification changes only what is necessary, producing a diff you can actually understand.

**Builder tip:** Use explicit framing: "Modify only the 'handleSubmit' function in 'src/components/Form.tsx' to add loading state. Do not rewrite the file, do not change other functions, do not restructure the component." The phrase "modify only" combined with a specific target dramatically reduces diff size and review overhead.

**Watch out:** Sometimes a rewrite is genuinely the right answer. If the existing code is so tangled that a targeted fix would be more complex than a clean reimplementation, say so in your prompt and ask for a justified rewrite. The discipline is about avoiding unnecessary rewrites — not about never rewriting.`,
    },
    {
      id: 1695,
      name: "Meta-Prompting",
      desc: `**Meta-Prompting** — the technique of using one AI model to generate, optimize, or evaluate a prompt that will be used with another AI model (or the same model), improving output quality by applying AI's natural language capabilities to prompt engineering itself.

Meta-prompting treats prompts as artifacts to be optimized. You describe the task to a reasoning model (o3, Claude claude-opus-4-6) and ask it to generate the ideal prompt for a coding model to implement it. Or you ask the same model to critique a prompt you have written before sending it for execution. This is most valuable for complex, repeated tasks — if you are generating similar components 50 times, investing 10 minutes in meta-prompting to perfect the template saves hours of reviewing mediocre output.

**Builder tip:** Use meta-prompting to create reusable prompt templates for your most common vibe coding tasks. Ask Claude claude-opus-4-6: "Generate the ideal prompt template for generating a React component that follows our project conventions [paste conventions]. The template should produce consistent, high-quality output for any component specification." Save the result and use it as a starting point for every component generation session.

**Watch out:** Meta-prompting adds a step and a cost. It is only worth the overhead for tasks you will repeat many times. For one-off prompts or simple requests, just write the prompt directly — the meta-prompting overhead exceeds the benefit for low-frequency or low-complexity tasks.`,
    },
    {
      id: 1696,
      name: "Sample Data Anchoring",
      desc: `**Sample Data Anchoring** — the practice of providing concrete, representative example data in your prompts — real or realistic mock records, API responses, or schema samples — to ground the AI's output in the actual shape of your data rather than invented examples.

AI models generate code around data shapes they imagine, not data shapes you have. The result is type mismatches, field name inconsistencies, and components that work with invented data but break with real data. Sample data anchoring prevents this: "Here is a sample API response: {json}. Generate a component that renders this data." Now the AI knows exactly what fields exist, what their types are, and what edge cases might appear (null fields, arrays, nested objects).

**Builder tip:** Maintain a "sample-data.json" file in your project with representative examples of your key data structures. Before any generation session involving data display or data processing, paste the relevant sample into your prompt. This single habit eliminates a large class of type errors in generated code.

**Watch out:** Sample data anchoring can introduce hallucinated business logic if your sample implies patterns that are not universally true. If your sample user has "role: admin," the AI might assume all users have roles and add role-based logic you did not want. Use representative samples that reflect the general case, and add a note about what varies across records.`,
    },
    {
      id: 1697,
      name: "Debug Prompting Patterns",
      desc: `**Debug Prompting Patterns** — the structured approach to asking an AI to fix bugs: reproduce minimally, isolate the failing component, provide the actual error message, and request a targeted fix with constraints — never ask for a general "fix the bug."

Vague debug prompts ("it is not working, fix it") produce vague fixes — the AI guesses at the problem and implements a solution for its guess, not your actual issue. Structured debug prompts are surgical: "In 'src/api/auth.ts' at line 45, the 'refreshToken' function throws 'TypeError: Cannot read properties of undefined (reading token)' when called after logout. Here is the error stack trace: [trace]. Fix only this function without changing its signature or any other code."

**Builder tip:** Before writing a debug prompt, reproduce the bug in the smallest possible context. If the bug occurs in a 500-line component, isolate it to a 20-line reproduction. The smaller the context, the more focused and accurate the AI fix. Provide the exact error message, the exact file and line number, and the exact conditions that trigger the bug.

**Watch out:** AI fixes can introduce new bugs while fixing the reported one. Always run your full test suite after any AI-generated bug fix, not just the specific test that was failing. "Fixed the reported bug while breaking three unrelated things" is a common pattern in AI debugging sessions — tests are your safety net.`,
    },
    {
      id: 1698,
      name: "Prompt Log & Traceability",
      desc: `**Prompt Log & Traceability** — the practice of maintaining a record of significant prompts, their context, and the reasoning behind major AI-directed decisions, enabling debugging, onboarding, and review of how the codebase evolved through AI assistance.

Code review tells you what changed; prompt logs tell you why. When a colleague asks "why is this implemented this way?" the answer might be "because the AI generated it in response to this specific prompt with these constraints." Prompt logs create accountability and auditability for AI-generated code — especially valuable in regulated industries, security-sensitive projects, and team environments where multiple developers are using AI tools.

**Builder tip:** Keep a "PROMPTS.md" file in your repo for significant architectural decisions made with AI assistance. Format each entry as: Date, Decision, Prompt used, Why this approach was chosen, Alternatives rejected. This file becomes invaluable during debugging sessions where the root cause is an AI-generated design decision made months earlier.

**Watch out:** Prompt logs are only valuable if they capture the prompts that led to significant decisions — not every tab completion. Focus on architectural choices, complex algorithms, security-sensitive logic, and non-obvious implementations. A prompt log full of "generate a loading spinner" entries is noise, not signal.`,
    },
  ],
};

export default promptingMastery;
