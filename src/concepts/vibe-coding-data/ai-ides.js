const aiIdes = {
  name: "AI IDEs & Dev Environments",
  icon: "⚡",
  color: "#3b82f6",
  concepts: [
    {
      id: 1655,
      name: "Cursor",
      desc: `**Cursor** — VS Code rebuilt from the ground up with AI at its core, featuring a deeply integrated Agent Mode that can plan, read, edit, and run code across your entire codebase in a single session.

Unlike extensions that bolt AI onto an existing editor, Cursor integrates AI into every workflow — multi-file Composer sessions, Tab completion that predicts entire logical blocks, inline chat for targeted edits, and an autonomous Agent that can run terminal commands. Cursor's codebase indexing means the AI understands your project structure before you prompt, producing suggestions that fit your actual conventions rather than generic patterns. It is the most widely adopted professional vibe coding IDE as of 2025.

**Builder tip:** Configure a ".cursorrules" file at your repo root immediately. Define your tech stack, preferred libraries, naming conventions, and patterns to avoid. This single file dramatically improves every subsequent generation — the AI stops suggesting jQuery when you are using React.

**Watch out:** Agent Mode in Cursor can run terminal commands and edit multiple files simultaneously. Always review the proposed plan before confirming. Agents have deleted test databases, introduced breaking changes across 20 files, and run "npm install" with untrusted packages — all in a single unchecked session.`,
    },
    {
      id: 1656,
      name: "Windsurf by Codeium",
      desc: `**Windsurf** — an AI-native IDE by Codeium built around the concept of "flow state," featuring the Cascade agent that maintains deep awareness of your full codebase and can execute multi-step tasks while explaining its reasoning at each step.

Windsurf's Cascade agent is designed to feel collaborative rather than autocratic — it surfaces its plan, checks in before destructive operations, and provides clear explanations of architectural decisions. Codeium's enterprise focus means Windsurf has strong support for large codebases, monorepos, and team workflows. Its indexing covers the entire repository, not just open files, giving the AI genuine project context. Many developers use Windsurf for complex refactors where Cascade's explanation-first approach reduces surprises.

**Builder tip:** Use Windsurf's "Write" mode for focused single-file edits and "Cascade" for cross-file tasks that require coordination. When doing a large refactor, start by asking Cascade to explain its proposed approach before executing — this gives you a chance to correct its mental model before it touches 15 files.

**Watch out:** Windsurf's deep codebase indexing takes time on large repos. Do not evaluate the tool on your first session with a 500k-line monorepo — give the indexer time to complete before judging response quality. Performance on cold-start is not representative.`,
    },
    {
      id: 1657,
      name: "VS Code + AI Extensions",
      desc: `**VS Code + AI Extensions** — the approach of adding AI capabilities to Visual Studio Code through extensions like Cline, Continue, Roo Code, or Augment Code, preserving existing workflows while layering AI assistance on top.

This approach suits developers who have invested heavily in VS Code customization — their keybindings, extensions, themes, and muscle memory. Extensions like Cline (formerly Claude Dev) provide an agentic panel that can read, write, and run code using any AI model. Continue offers inline completions and chat without vendor lock-in. The trade-off versus purpose-built AI IDEs: the integration is shallower, context awareness is more limited, and the experience feels bolted on rather than native.

**Builder tip:** Cline with Claude claude-sonnet-4-6 via the Anthropic API is a powerful combination for developers who want to stay in VS Code. Configure Cline's "Auto Approve" for read-only operations only — require manual approval for file writes and terminal commands until you trust the model's judgment on your codebase.

**Watch out:** Extension-based AI has shallower codebase awareness than purpose-built AI IDEs. The model only sees what you explicitly share — open files, selected text, or manually provided context. Cursor and Windsurf index your entire repo automatically; extensions require you to do that context work manually.`,
    },
    {
      id: 1658,
      name: "GitHub Copilot",
      desc: `**GitHub Copilot** — Microsoft's AI pair programmer, integrated directly into VS Code, JetBrains, Neovim, and GitHub itself, offering inline code completion, Copilot Chat, workspace-aware suggestions, and PR summaries.

Copilot is the most widely deployed AI coding tool in enterprise environments — primarily because it integrates directly into the GitHub ecosystem developers already use. Copilot Workspace can take a GitHub issue and generate a full implementation plan with code changes. Copilot Chat understands your workspace context. For many enterprise teams, it is the safest entry point into AI-assisted development because it operates within existing security and compliance frameworks.

**Builder tip:** Use Copilot's inline completion for boilerplate-heavy code (test fixtures, API route handlers, type definitions) where the pattern is clear and the blast radius of a wrong suggestion is low. For architectural decisions or complex logic, switch to Copilot Chat and ask it to explain its reasoning before accepting any output.

**Watch out:** Copilot's inline completions optimize for plausibility, not correctness. It will confidently complete a function with a subtly wrong algorithm — one that looks right but has an off-by-one error or mishandles an edge case. Never accept a completion you have not mentally traced through.`,
    },
    {
      id: 1659,
      name: "Zed",
      desc: `**Zed** — a high-performance, Rust-native collaborative code editor with built-in AI assistant, real-time multiplayer editing, and native support for Claude and other models, built by the creators of Atom and Tree-sitter.

Zed's distinguishing features are raw performance (renders at 120fps even with large files) and true multiplayer collaboration — multiple developers editing the same file simultaneously like a Google Doc. Its AI assistant supports inline transformations, chat, and custom prompts. For vibe coding teams, Zed's multiplayer mode enables a "director + builder" workflow where a product person writes prompts in real time while a developer reviews generated output in the same session.

**Builder tip:** Zed's "Custom Prompts" feature lets you define project-specific prompt templates that appear in the command palette. Set up prompts for your most common tasks — "Add error handling to this function," "Write a test for this component," "Refactor to use the project's API client pattern" — and they become one-keystroke operations.

**Watch out:** Zed's extension ecosystem is significantly smaller than VS Code's. If your workflow depends on specific debuggers, linters, or language servers that only exist as VS Code extensions, Zed may not be viable yet. Check extension compatibility before committing to a Zed migration.`,
    },
    {
      id: 1660,
      name: ".cursorrules",
      desc: `**.cursorrules** — a project-level configuration file placed at the repository root that provides persistent, structured instructions to the Cursor AI for every session in that project, acting as a standing brief that never needs repeating.

Without .cursorrules, every Cursor session starts cold — the AI does not know your tech stack, your conventions, your forbidden libraries, or your style guide. You end up repeating "we use Tailwind, not inline styles" and "always use Zod for validation" in every session. The .cursorrules file encodes all of this permanently. It supports markdown formatting and can include code examples showing preferred patterns. Well-written .cursorrules files are the single highest-leverage configuration in a vibe coding workflow.

**Builder tip:** Structure your .cursorrules with these sections: "Tech Stack" (exact versions), "Coding Conventions" (naming, file structure), "Preferred Libraries" (what to use for auth, forms, API calls), "Patterns to Avoid" (no class components, no any type in TypeScript), and "Project Context" (brief description of what the app does). Start with 30 lines and expand as you catch the AI making recurring mistakes.

**Watch out:** .cursorrules is not magic — it biases the AI toward your preferences but does not enforce them. The model may still violate rules, especially under complex prompts. Treat .cursorrules as a strong nudge, not a hard constraint, and still review every diff.`,
    },
    {
      id: 1661,
      name: "CLAUDE.md",
      desc: `**CLAUDE.md** — the persistent context file for Claude Code, placed at the project root, that is automatically loaded into every Claude Code session, providing project conventions, architecture notes, forbidden patterns, and workflow instructions without repeating them in every prompt.

Claude Code reads CLAUDE.md at session start and treats its contents as persistent instructions. This is the equivalent of onboarding a new team member with a thorough project guide — you write it once and every session benefits. CLAUDE.md can include your tech stack, the project's architectural patterns, specific files to always reference, things the AI must never do (like overwrite certain files), and the preferred workflow for common tasks.

**Builder tip:** Include a "Key Files" section in CLAUDE.md that lists the most important files in your project with one-line descriptions. Example: "src/lib/api.ts — all external API calls go through this client." This prevents Claude Code from inventing its own API client pattern when one already exists.

**Watch out:** CLAUDE.md content counts against your context window. Keep it focused and under 500 lines. A bloated CLAUDE.md that includes every possible convention dilutes its own value — the model's attention is spread thin and the most important rules get lost. Prioritize ruthlessly.`,
    },
    {
      id: 1662,
      name: "Composer & Multi-file Editing",
      desc: `**Composer** — Cursor's multi-file editing environment where the AI can read, plan, and modify multiple files in a coordinated session, making it possible to implement features that span components, tests, types, and routes in a single pass.

Composer is the step up from inline chat. Instead of editing one file at a time, Composer understands the full scope of a change and coordinates edits across your codebase. You describe a feature, Composer shows a plan listing which files it will touch, you approve, and it executes. This is where vibe coding starts to feel like genuine leverage — implementing a feature end-to-end (API route + business logic + types + component + test) in a single session.

**Builder tip:** Before accepting a Composer plan, count the files it proposes to touch. If it is more than 5-7 files, the prompt scope is too broad. Break it into phases: "First, add the API route and types. Then, in a second session, add the UI component. Finally, add tests." Smaller scope = higher accuracy.

**Watch out:** Composer will sometimes edit files that were not in its stated plan — it discovers a dependency mid-execution and modifies it. Always check the diff holistically after a Composer session, not just the files you expected it to touch. Unexpected modifications are where silent breaking changes hide.`,
    },
    {
      id: 1663,
      name: "Agent Mode vs Chat Mode",
      desc: `**Agent Mode vs Chat Mode** — the distinction between letting the AI autonomously execute actions (read files, run commands, write code, iterate) versus having a conversation where you control each step and manually apply suggestions.

Chat Mode is low-risk and conversational — you ask questions, get explanations, paste suggested code manually. Agent Mode is high-leverage and autonomous — the AI reads your files, writes changes directly, runs your tests, and iterates until a goal is achieved. Agent Mode is dramatically faster for well-defined tasks but dramatically more dangerous for ambiguous or risky ones. The choice depends on how confident you are in the goal definition and how comfortable you are with the blast radius of a wrong decision.

**Builder tip:** Use Chat Mode for exploration, planning, and learning. Switch to Agent Mode only when the goal is specific, the acceptance criteria are clear, and you have committed the current state to git. This gives you a clean rollback point if Agent Mode makes a mess.

**Watch out:** Agent Mode autonomy is a multiplier for both good prompts and bad prompts. A vague instruction like "improve the codebase" in Agent Mode has produced sessions where the AI refactored 30 files, introduced subtle behavioral changes, and deleted test utilities — all while confidently reporting success. Specificity is non-negotiable in Agent Mode.`,
    },
    {
      id: 1664,
      name: "Context Pinning",
      desc: `**Context Pinning** — the practice of explicitly adding specific files to the AI's active context in your IDE, ensuring the model has access to the most relevant code before generating output, rather than relying on automatic inference about what matters.

AI IDEs use various heuristics to decide what code to include in context — recently opened files, imported dependencies, files mentioned in your prompt. These heuristics are often wrong. Context pinning lets you override them: in Cursor, you use "@" to reference specific files; in Continue, you pin files to the session. When the AI has access to your actual type definitions, API contracts, and existing utility functions, its output is dramatically more coherent and project-consistent.

**Builder tip:** Develop a standard context set for your project. For a React/TypeScript project, this might be: the types file, the API client, the component you are editing, and the test file for that component. Make context pinning the first thing you do in any session — before you write a single prompt.

**Watch out:** Pinning too many files is counterproductive. A context window flooded with 20 files means the model's attention is spread thin — it may miss details in the most important files. Be selective: pin only the files that directly constrain the output you want. More is not better.`,
    },
    {
      id: 1665,
      name: "IDE Model Selection",
      desc: `**IDE Model Selection** — the strategic choice of which AI model to use for different tasks within your IDE, matching model capability and cost to the complexity and stakes of each operation.

Different tasks require different models. Inline tab completion needs a fast, cheap model (Claude Haiku, GPT-4o mini) that responds in milliseconds with low latency. Complex architectural planning needs the most capable available model (Claude claude-opus-4-6, o3) that reasons deeply and handles nuance. Feature implementation sits in the middle — a mid-tier model like Claude claude-sonnet-4-6 or GPT-4o balances quality and speed. Most AI IDEs allow per-task model configuration; many developers use fast models for drafts and switch to a stronger model for the review and integration pass.

**Builder tip:** For planning sessions — "how should I structure this feature?" — always use the strongest available model. The planning decision propagates through all subsequent code; a bad plan generates bad code that even a strong model can not fix without a rewrite. Spend tokens on the decision, not just the execution.

**Watch out:** Using the strongest model for every operation is expensive at scale. Track your token spend in the IDE's usage dashboard. A team of 5 running o3 for all tab completions will hit significant monthly costs. Right-size the model to the task — reserve compute-heavy models for compute-heavy decisions.`,
    },
    {
      id: 1666,
      name: "Tab Completion vs Agent Mode",
      desc: `**Tab Completion vs Agent Mode** — knowing when to use AI's inline autocomplete (fast, low-friction, narrow scope) versus a full agent session (slower, higher friction, broad scope), and matching the tool to the task.

Tab completion is the lightest AI intervention — it predicts the next token, line, or logical block as you type. It is best for: writing boilerplate, completing patterns you have established, filling in obvious continuations. Agent Mode is the heaviest — it plans, executes, and iterates autonomously across files. It is best for: implementing defined features, running refactors, fixing failing tests across multiple files. The mistake is using Agent Mode when Tab completion would suffice, and using Tab completion when you actually need coordinated multi-file changes.

**Builder tip:** Use this heuristic: if the change fits in one file and you can see the logical destination of the code, Tab completion. If the change requires modifying more than one file or you need to think about the architecture first, Agent Mode. In between, use inline chat for targeted, scoped transformations.

**Watch out:** Over-reliance on Tab completion trains you to accept the model's continuation rather than thinking through the logic yourself. The most dangerous completions are the ones that look right but implement subtly wrong behavior — correct syntax, wrong semantics. Read every completion you accept, not just at the cursor position but in context of what came before.`,
    },
  ],
};

export default aiIdes;
