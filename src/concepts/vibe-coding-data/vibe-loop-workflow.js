const vibeLoopWorkflow = {
  name: "Workflow & The Vibe Loop",
  icon: "🔄",
  color: "#f97316",
  concepts: [
    {
      id: 1709,
      name: "The Vibe Loop",
      desc: `**The Vibe Loop** — the core iterative cycle of AI-assisted development: Frame (define the outcome and constraints) → Scope (identify files, set boundaries) → Generate (focused AI pass) → Vibe Check (run the app, validate behavior) → Objective Check (review diff, run tests) → Integrate (commit, document, plan next steps).

The Vibe Loop is the operational backbone of effective vibe coding — the rhythm that separates disciplined builders from those who accumulate chaos. Each phase has a distinct purpose and exit criterion. You do not move to "Generate" without completing "Frame and Scope." You do not move to "Integrate" without completing the "Objective Check." Skipping phases feels faster and is slower — bugs accumulate, diffs grow unreviable, and sessions eventually collapse into unworkable messes.

**Builder tip:** Make the Vibe Loop a literal checklist for every session: write out Frame/Scope before generating, run the app before reviewing code, review the full diff before committing. The 5 minutes spent on structure at the beginning saves 30 minutes of confused debugging at the end.

**Watch out:** The most commonly skipped phase is Scope. Developers jump from "I want to add X" directly to generating, without specifying which files are in scope and which are out. The result: the AI modifies 8 files when 2 were needed, producing a diff that is impossible to meaningfully review.`,
    },
    {
      id: 1710,
      name: "The Vibe Check",
      desc: `**The Vibe Check** — the first quality gate in the Vibe Loop: running the application immediately after generation, clicking through core flows, and verifying that the fundamental behavior works and no obvious regressions appeared — before doing any code review.

The Vibe Check is the 60-second sanity test that catches the most common AI failure: code that compiles but does not work. Start the app, navigate to the affected area, perform the user action, and verify the expected result. Check for console errors. Click through adjacent flows to catch obvious regressions. This takes 60 seconds and catches issues that code review alone misses — subtle behavioral bugs that look correct in code but break in execution.

**Builder tip:** Develop a standard vibe check routine for each area of your app. For a form component: open the form, fill it with test data, submit it successfully, submit it with invalid data, and verify the error state. This 90-second script catches 80% of form-related AI bugs without reading a single line of code.

**Watch out:** Passing the vibe check is a first gate, not a final gate. Many AI-generated bugs are not detectable through manual UI interaction — off-by-one errors in data processing, incorrect handling of edge case data, or subtle race conditions only appear under specific conditions. Never skip the Objective Check just because the Vibe Check passed.`,
    },
    {
      id: 1711,
      name: "Commit-as-Checkpoint Strategy",
      desc: `**Commit-as-Checkpoint Strategy** — committing working code to git before every AI generation session and after every successful generation, creating a clean history of stable states that you can instantly return to if a subsequent session goes wrong.

Git is your safety net in vibe coding. The commit before a session records "everything was working here" — a guaranteed rollback point. The commit after a successful session records "this AI contribution works" — a permanent artifact. Between these commits, you can be fearless about trying aggressive AI generations because the escape hatch is always one "git checkout" away. Without these checkpoints, a bad generation session can leave you in an unknown state with no clean path back.

**Builder tip:** Create a two-command habit: "git add -p && git commit -m 'pre-session checkpoint'" before any AI session, and "git add -p && git commit -m 'added [feature]: [description]'" after every successful generation. These 30-second bookends give you complete auditability and instant rollback throughout your development session.

**Watch out:** Commit-as-checkpoint strategy only works if you commit working states, not broken ones. Committing immediately after a generation that partially works creates a checkpoint you may not actually want to return to. Always run the vibe check before committing — commit only confirmed-working states as your reference points.`,
    },
    {
      id: 1712,
      name: "Small Diff Discipline",
      desc: `**Small Diff Discipline** — the practice of keeping AI-generated changes small enough to review meaningfully — targeting diffs under 150-200 lines — by scoping prompts narrowly and splitting large features into multiple sessions.

Diff size is a direct proxy for review quality. A 50-line diff can be reviewed thoroughly in 3 minutes. A 500-line diff requires 30 minutes of serious attention to review properly — and most developers do not spend that time. When diffs get large, review becomes rubber-stamping, which means bugs, security vulnerabilities, and architectural issues get through unchecked. Small diff discipline forces prompt scope to stay narrow, which also improves generation quality.

**Builder tip:** Set a personal diff size limit: if a generation produces more than 200 lines of changes across more than 4 files, the prompt scope was too broad. Undo the generation, break the feature into 3-4 smaller prompts, and execute them sequentially with review and commit between each.

**Watch out:** Small diffs are not always possible. Some features genuinely require coordinated changes across many files — a new database entity might need schema, migration, API routes, types, and UI changes all at once. In these cases, review the diff by area (schema → API → types → UI) rather than by file, maintaining the review discipline even when the size discipline is not achievable.`,
    },
    {
      id: 1713,
      name: "The Pre-Prompt Ritual",
      desc: `**The Pre-Prompt Ritual** — the 2-minute preparation step before writing a prompt: identifying exactly which files are involved, defining what done looks like, and writing the non-goals — transforming a vague intention into a precise directive that produces accurate, reviewable output.

Without the pre-prompt ritual, most prompts are written from the top of the developer's head — loosely articulated, missing key constraints, and leaving too much to AI interpretation. The ritual forces precision: which files, what behavior, what constraints, what is out of scope. Developers who adopt this ritual consistently report fewer rounds of iteration to reach acceptable output, fewer unwanted modifications, and smaller diffs.

**Builder tip:** The pre-prompt ritual takes 2 minutes and saves 20. Spend it answering: (1) What is the exact goal? (2) Which files does this touch? (3) What is the observable success criterion? (4) What must the AI NOT do? Write these answers before opening the AI interface. Your prompt writes itself from the answers.

**Watch out:** The ritual becomes a bottleneck if applied to every single prompt, including trivial ones. For simple, low-stakes prompts — "fix the typo in line 45," "add a CSS class to this button" — skip the ritual and prompt directly. Reserve the full ritual for anything that touches business logic, affects multiple files, or could have security implications.`,
    },
    {
      id: 1714,
      name: "Iterating on UI vs Logic",
      desc: `**Iterating on UI vs Logic** — the different prompting patterns appropriate for visual iteration (UI components, styling, layout) versus behavioral iteration (business logic, state management, data processing), because these require different validation approaches and have different error risk profiles.

UI iteration is low-risk and highly visual — you generate a component, look at it, decide what to change, prompt again. The feedback loop is immediate and the blast radius of a mistake is low (it looks wrong). Logic iteration is higher-risk and requires explicit testing — you generate a function, run it with test cases, check the output against expected values, and prompt for corrections. Treating logic iteration with the same casualness as UI iteration is how business-critical bugs get introduced through vibe coding.

**Builder tip:** For UI iteration: use fast models and iterate freely. For logic iteration: write a test case first (even a simple manual one), generate the logic, run the test, commit only when the test passes. The additional step takes 3 minutes and produces logic you can trust.

**Watch out:** The line between UI and logic is blurrier than it appears. A UI component that "just displays data" may contain derived calculations, conditional display logic, and format transformations that are actually business logic embedded in JSX. Audit components for logic before applying the lightweight UI iteration approach.`,
    },
    {
      id: 1715,
      name: "Rollback-and-Reframe",
      desc: `**Rollback-and-Reframe** — the strategy of reverting to the last clean git commit and completely rewriting the prompt from a different angle when repeated AI fixes are making a problem worse rather than better, rather than continuing to compound failed attempts.

The rollback-and-reframe principle: when you have made 3+ attempts to fix a problem and each attempt makes it worse or introduces new problems, you are in a local minimum. The conversation context is contaminated with failed approaches, and the AI is now trying to reconcile multiple contradictory attempts. The solution is not a fourth attempt — it is a clean slate. Rollback to the last known-good commit, start a fresh session, and frame the problem from scratch with the knowledge gained from the failed attempts.

**Builder tip:** Set a personal limit of 3 failed fix attempts before triggering rollback-and-reframe. When you hit that limit, write a brief "lessons learned" note: what approaches failed and why. Then rollback, start fresh, and use those lessons to frame a better initial approach. The lessons from failure are the most valuable part of the failed session.

**Watch out:** Rollback-and-reframe requires emotional discipline. Reverting work feels like losing it, even when keeping it is making things worse. Internalize that bad AI-generated code is a liability, not an asset — reverting it is not losing work, it is recovering from a wrong turn. The earlier you revert, the less debt you accumulate.`,
    },
    {
      id: 1716,
      name: "The Release Checklist",
      desc: `**The Release Checklist** — the specific quality gates a vibe-coded feature must pass before deployment: requirements documented, diff reviewed line-by-line, app tested with representative data, automated tests passed, dependencies audited, no secrets in code, documentation updated, and rollback plan defined.

Every vibe coding release needs an explicit checklist because the speed of vibe coding creates pressure to skip verification steps. The checklist is the counterweight to that pressure — a documented set of non-negotiable gates that prevent shipping untested, insecure, or undocumented AI-generated code. The checklist is not bureaucracy; it is the minimum viable quality standard for code you do not have 100% control over because you did not write every line yourself.

**Builder tip:** Keep your release checklist in CLAUDE.md or a RELEASING.md file. Run through it literally — checkboxes, not mental acknowledgment. The difference between "I think I checked the dependencies" and "I ran npm audit and reviewed the results" is the difference between a secure release and a production vulnerability.

**Watch out:** Release checklists age out. A checklist written for a 3-person team building an internal tool is insufficient for a 20-person team building a customer-facing product. Review and update your checklist every quarter, adding new items as your threat model, team size, and deployment complexity grow.`,
    },
    {
      id: 1717,
      name: "Prompt-to-PR Workflow",
      desc: `**Prompt-to-PR Workflow** — the end-to-end process from initial prompt to a reviewable pull request: prompt → generate → vibe check → commit → PR with AI-generated description → human review → merge — treating AI contributions with the same rigor as human contributions.

In teams, AI-generated code must go through the same review process as human-written code — potentially with extra scrutiny given the known risk profile. The Prompt-to-PR workflow formalizes this: every AI-generated feature starts with a focused prompt, produces a small diff committed to a feature branch, and is submitted as a PR with a clear description of what changed and why. The PR description can itself be AI-generated (Cursor and GitHub Copilot both offer this), but the human review is non-negotiable.

**Builder tip:** Use Claude Code's PR generation capability or GitHub Copilot's PR description feature to draft the PR description, but always add a "How to Test" section manually. Include the specific user flows a reviewer should test and the edge cases they should verify. This makes review efficient and ensures the most important scenarios are explicitly validated.

**Watch out:** Team review of AI-generated PRs can create false confidence — reviewers assume someone else thoroughly vetted the AI output, while the author assumes the reviewer will catch issues. Establish explicit team norms: who is responsible for security review of AI-generated code, and what is the minimum review standard for AI-generated changes versus human-written changes.`,
    },
    {
      id: 1718,
      name: "Parallel Vibe Sessions",
      desc: `**Parallel Vibe Sessions** — running multiple simultaneous AI coding sessions on independent features, each in its own conversation and ideally on its own git branch, to maximize throughput when features are genuinely non-overlapping.

AI sessions are not CPU-bound — you can run multiple simultaneously without degrading individual session quality. If you have three independent features to build, you can have Cursor working on feature A, Claude Code working on feature B, and Bolt.new prototyping feature C — all at once. The bottleneck shifts from generation time to your review capacity. The key constraint: features must be genuinely independent — touching different files, different modules, different parts of the system — to avoid merge conflicts and context pollution between sessions.

**Builder tip:** Use git worktrees or separate git branches for parallel sessions to eliminate merge conflict risk. The command "git worktree add ../feature-b feature-b-branch" creates an independent working directory for feature B while you continue working on feature A in the main directory.

**Watch out:** Parallel sessions multiply review debt. If you run 3 sessions simultaneously, you have 3 diffs to review, test, and commit before merging. The temptation to merge all three quickly leads to rubber-stamping. Set a personal rule: never merge more than 2 AI-generated PRs in the same day without thorough review of each.`,
    },
  ],
};

export default vibeLoopWorkflow;
