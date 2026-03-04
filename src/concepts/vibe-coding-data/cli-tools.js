const cliTools = {
  name: "CLI & Agentic Tools",
  icon: "🖥️",
  color: "#f59e0b",
  concepts: [
    {
      id: 1677,
      name: "Claude Code",
      desc: `**Claude Code** — Anthropic's terminal-native AI coding agent that runs in your shell and has access to your file system, git, terminal commands, browser tools, and the full Claude model family — the closest thing to an AI collaborator with genuine system access.

Claude Code is not an IDE extension or a chat interface — it is an autonomous agent that operates in your terminal with the same access level as your shell session. It can read any file, run any command, make git commits, search the web, and manage its own todo list across a session. Its deep integration with Anthropic's models means it follows complex, nuanced instructions with high fidelity. CLAUDE.md files in your repo provide persistent project context that survives across sessions.

**Builder tip:** Use Claude Code's "plan first" workflow for complex tasks. Ask it to create a plan and write it to a TODO.md file before touching any code. Review the plan, edit it if needed, then tell Claude Code to execute. This separates the thinking from the doing and catches architectural mistakes before they are embedded in code.

**Watch out:** Claude Code has real shell access. It can delete files, run database migrations, push to git, and make network requests. Always review its proposed actions before confirming, especially for operations touching production systems or irreversible state. Run Claude Code with minimum necessary file permissions for sensitive projects.`,
    },
    {
      id: 1678,
      name: "Aider",
      desc: `**Aider** — an open-source, terminal-based AI pair programmer that integrates deeply with git, automatically committing every AI-generated change with a descriptive message, creating a clean, auditable history of every AI contribution to your codebase.

Aider's defining discipline is the commit-per-change model — every modification the AI makes is immediately committed with a clear message, creating a granular, reviewable history. This makes it trivially easy to see what the AI changed and revert any specific change without affecting others. Aider supports all major AI providers (Anthropic, OpenAI, Google, local models via Ollama), uses tree-sitter for precise code parsing, and works in any language. Many experienced vibe coders prefer Aider for its transparency and control.

**Builder tip:** Start an Aider session with "aider --model claude-sonnet-4-6" and use "/add" to add specific files to context rather than letting Aider infer. Run "git log --oneline" after any session to review every AI commit — this is the fastest way to audit what changed and why.

**Watch out:** Aider's automatic commits are a feature, not a bug — but they can flood your git history in long sessions. Use "git rebase -i" to squash related AI commits before merging to main. A PR showing 47 individual AI commits is harder to review than one logical commit per feature.`,
    },
    {
      id: 1679,
      name: "Goose",
      desc: `**Goose** — Block's open-source, extensible agentic CLI that runs autonomously to complete coding tasks, with a plugin architecture that allows connecting to external tools, APIs, and data sources via a standardized extension system.

Goose is designed for autonomous task completion — you give it a goal, it figures out the steps, executes them using its available tools, and reports results. Its plugin system (called "extensions") allows connecting Goose to your specific tools: GitHub, Jira, Slack, databases, or custom APIs. The open-source nature means you can inspect its behavior, contribute extensions, and run it with local models for privacy-sensitive workloads. Block (formerly Square) uses Goose internally for developer productivity automation.

**Builder tip:** Start with Goose's built-in extensions before building custom ones. The GitHub extension alone enables powerful workflows: "fix all failing tests in this PR and push a follow-up commit" is a genuinely autonomous task Goose can handle end-to-end with the right extensions enabled.

**Watch out:** Goose's autonomy is its strength and its risk. An imprecise goal can result in the agent taking unexpected actions — modifying files you did not intend, making API calls you did not anticipate, or getting stuck in retry loops. Always run Goose in a sandboxed environment for the first few sessions with any new goal type.`,
    },
    {
      id: 1680,
      name: "Warp",
      desc: `**Warp** — an AI-native terminal that replaces the traditional shell with natural language command translation, AI-powered debugging, shareable command workflows, and an Agent Mode that can execute multi-step terminal tasks autonomously.

Warp reimagines the terminal as an AI-first environment. You can type natural language — "find all files modified in the last 24 hours larger than 10MB" — and Warp translates it to the correct shell command, explains what it does, and runs it. Its AI debugging feature analyzes error output and suggests fixes. Warp's "Workflows" let you save and share common command sequences. Agent Mode chains multiple commands to accomplish a goal, handling errors and retrying automatically.

**Builder tip:** Use Warp's natural language mode for complex shell operations you rarely need — find, awk, sed, jq pipelines with multiple flags. Rather than looking up the exact syntax, describe what you want and let Warp generate the command. Always read the generated command before running it — the description alone does not capture what flags do.

**Watch out:** Warp sends your terminal input to its servers for AI processing. For terminals handling sensitive credentials, production server access, or proprietary data, this is a significant security consideration. Review Warp's data handling policy before using it in regulated environments or on machines with production access.`,
    },
    {
      id: 1681,
      name: "MyCoder.ai & RA.Aid",
      desc: `**MyCoder.ai & RA.Aid** — open-source CLI agents designed for autonomous software development tasks, each with different approaches to tool use, planning, and human-in-the-loop interaction for complex multi-step coding goals.

MyCoder.ai focuses on browser automation combined with code generation — it can research documentation, look up APIs, and implement features that require real-time information not in the model's training data. RA.Aid (Research, Architect, Implement) breaks tasks into three explicit phases: research the problem space, architect the solution, then implement — a disciplined approach that reduces the single-pass hallucination common in less structured agents. Both tools represent the open-source alternative to commercial agents.

**Builder tip:** Use RA.Aid's three-phase structure as a mental model even when using other tools. Before any significant feature implementation, spend a session on research (what do I need to know?), then architecture (how should this be structured?), then implementation. The discipline of separating these phases produces dramatically better code.

**Watch out:** Open-source CLI agents have less polish and more rough edges than commercial tools. They may fail in unexpected ways, require manual intervention mid-task, or produce output that needs more cleanup than a commercial agent. Budget time for debugging the tool itself, not just the code it generates.`,
    },
    {
      id: 1682,
      name: "Tool Use in Agents",
      desc: `**Tool Use in Agents** — the capability of AI agents to call external functions — reading files, executing shell commands, making HTTP requests, searching the web, querying databases — that extend the model beyond pure text generation into actual system interaction.

Tool use is what transforms a language model into an agent. Without tools, the model can only generate text. With tools, it can read your codebase, run your tests, look up current documentation, make API calls, and write files. Anthropic's tool use API (used by Claude Code), OpenAI's function calling, and Google's Gemini function calling all implement this pattern. The quality of an agent is largely determined by the quality of its tool definitions — clear, well-typed tool descriptions produce accurate invocations.

**Builder tip:** When building custom agents, write tool descriptions as if explaining to a capable but literal colleague who has never used the tool. Include: what the tool does, when to use it, what parameters it accepts, and what errors to expect. A single unclear tool description causes the agent to misuse that tool in 30% of invocations.

**Watch out:** Tool use creates real side effects. Unlike generating text, tool calls delete files, send emails, charge credit cards, and modify databases. Every agentic system must have explicit confirmation gates for irreversible operations. "Are you sure?" is not just UX hygiene — it is the difference between a useful agent and a catastrophic one.`,
    },
    {
      id: 1683,
      name: "Sandboxing Agents",
      desc: `**Sandboxing Agents** — the practice of running AI agents in isolated, permission-constrained environments to limit the blast radius of mistakes, prevent unintended access to sensitive systems, and maintain control over what the agent can actually affect.

An agent with unrestricted access to your machine is a significant risk surface. It can read private keys, delete production data, make outbound network requests to unintended destinations, or install malicious packages. Sandboxing addresses this with layers: containerization (Docker), network isolation (no outbound by default), file system restrictions (read-only for sensitive directories, write access only to project-specific paths), and process-level restrictions (no root, no sudo).

**Builder tip:** For sensitive projects, run CLI agents inside a Docker container with mounted project directories and no access to your home directory, credentials, or SSH keys. A simple "docker run --rm -v $(pwd):/workspace agent-image" provides meaningful isolation without significant overhead.

**Watch out:** Sandboxing adds friction. Agents that can not access the internet may fail to look up current documentation. Agents that can not write outside the project directory may fail to cache dependencies. Always test that a sandboxed agent can accomplish its intended task before deploying the sandbox in a real workflow — broken sandboxes that silently fail waste more time than they save.`,
    },
    {
      id: 1684,
      name: "Commit-per-Change Discipline",
      desc: `**Commit-per-Change Discipline** — the practice of committing after every discrete AI-generated change, creating an atomic, reviewable git history where each AI contribution is independently visible, describable, and revertable.

Aider popularized this pattern — every AI action produces a git commit with a descriptive message. The result is a git log that reads like a pair programming session: "Added user authentication middleware," "Fixed undefined variable in auth handler," "Added tests for auth middleware." If any commit introduces a problem, you can revert exactly that commit without affecting the others. Without this discipline, long vibe coding sessions produce monolithic diffs that are impossible to review or selectively revert.

**Builder tip:** Even if you are not using Aider, adopt the commit-per-change habit manually. After each successful AI generation that passes a basic sanity check, run "git add -p && git commit -m 'brief description of what this changes.'" The 30-second overhead per commit pays back tenfold when you need to understand what the AI did two hours ago.

**Watch out:** Commit-per-change discipline breaks down when AI changes span multiple interdependent steps that cannot be safely committed individually. In these cases, use a git stash or a feature branch to group related changes, committing the full coherent set rather than intermediate states that may break the build.`,
    },
    {
      id: 1685,
      name: "MCP Servers",
      desc: `**MCP Servers** — Model Context Protocol servers that give AI agents controlled, standardized access to external tools, data sources, and APIs — filesystem, web search, databases, GitHub, Slack, and custom internal systems — without the agent needing direct system credentials.

MCP (introduced by Anthropic) is a standardized protocol for AI tool integration. An MCP server exposes a set of tools to the AI agent (search the web, read a GitHub repo, query a database) over a local connection. The agent calls these tools through the MCP interface rather than having direct access to the underlying systems. This enables precise permission scoping — the agent can access only the specific tools the MCP server exposes, not everything on the machine. Claude Code, Cursor, and Windsurf all support MCP.

**Builder tip:** Configure MCP servers for the tools your agents use most frequently. A well-configured MCP setup with servers for GitHub, your database, and your internal docs means the agent can answer questions about your codebase, create PRs, and query live data — dramatically expanding what autonomous workflows can accomplish.

**Watch out:** CyberArk's research (2025) found that MCP has severe vulnerabilities beyond known tool poisoning attacks. Malicious MCP servers can manipulate agent behavior, exfiltrate data, or execute unintended actions. Only install MCP servers from trusted sources, review MCP server code before running it locally, and never give MCP servers access to production credentials.`,
    },
    {
      id: 1686,
      name: "Agent Permission Scoping",
      desc: `**Agent Permission Scoping** — the practice of granting AI agents the minimum necessary permissions to accomplish their task — no more — to limit the blast radius of mistakes, prevent security vulnerabilities, and maintain clear boundaries on what the agent can affect.

The principle of least privilege applies to AI agents exactly as it does to service accounts. An agent that only needs to read source files and run tests does not need write access to the database, access to production credentials, or permission to push to main. Every additional permission is an additional attack surface and an additional way a miscommunicated instruction can cause irreversible harm. Define explicit capability sets for each agent role and enforce them at the infrastructure level, not just in the prompt.

**Builder tip:** Before deploying an agent workflow, write out its permission requirements explicitly: which directories can it read, which can it write, which commands can it run, which network destinations can it reach? This exercise frequently reveals you have given the agent far more access than it needs, and the constraints often improve the agent's focus.

**Watch out:** Agents that are overly constrained silently fail — they encounter a permission error, try a workaround, fail again, and report success while having accomplished nothing. Properly scoped permissions include enough access to do the job AND enough error reporting to surface permission failures clearly. Silent failure in an agentic workflow is worse than a loud error.`,
    },
  ],
};

export default cliTools;
