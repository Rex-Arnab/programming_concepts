const engineeringPractices = {
  name: "Engineering Practices",
  icon: "🛠️",
  color: "#10b981",
  concepts: [
    {
      id: 582,
      name: "Test-Driven Development (TDD)",
      desc: `**Test-Driven Development (TDD)** — a software development practice where you write a failing test before writing the production code that makes it pass, then refactor both to high quality. The cycle: Red (write a failing test) → Green (write minimal code to pass it) → Refactor (improve design while tests stay green).

**Why TDD changes the design outcome:** Writing the test first forces you to think about the interface before the implementation. Code that's hard to test is hard to use — the test exposes coupling, hidden dependencies, and overloaded responsibilities before they're baked into the implementation. TDD produces more modular, loosely coupled designs.

**The three rules (Uncle Bob's formulation):**
1. You may not write production code until you have written a failing unit test
2. You may not write more of a unit test than is sufficient to fail
3. You may not write more production code than is sufficient to pass the currently failing test

**What TDD is not:** TDD is not primarily about test coverage. It's a design technique. The tests are a byproduct — a high-quality regression suite that documents behavior. Coverage is a happy consequence; the goal is design feedback at the speed of thought.

**When TDD is harder:** Exploratory work where you don't know the right interface yet; UI/UX where the "correct" behavior is subjective; systems with hard-to-fake external dependencies; legacy code without test infrastructure. In these cases, writing characterization tests after understanding behavior is a pragmatic compromise.

**Key insight:** TDD has a steep learning curve — the first month feels slower, not faster. The payback comes 3-6 months in, when the test suite enables safe refactoring, new features don't require fear of breakage, and defect rates in TDD code are measurably lower. Like compound interest: the investment looks wrong early and right later.`,
    },
    {
      id: 583,
      name: "Pair Programming",
      desc: `**Pair Programming** — a practice where two developers work together at one workstation: one types (the "driver") while the other reviews, navigates, and thinks strategically (the "navigator"). They switch roles frequently. Despite the apparent inefficiency of two people on one machine, studies consistently show pair programming produces fewer defects, better designs, and effective knowledge transfer.

**Two pairing styles:**
- **Driver-Navigator:** classic Pomodoro-style rotation; navigator thinks ahead while driver focuses on current implementation
- **Ping-Pong (TDD pairing):** one developer writes a failing test; the other writes code to pass it, then writes the next failing test; roles alternate continuously

**Measured benefits:**
- Defect rates reduced 15-45% (less isolation, instant review, two brains catching errors)
- Faster onboarding — a senior-junior pair transfers months of context in days
- Broader code ownership — fewer "only one person knows this" situations
- Better design decisions from continuous design dialog

**When pairing doesn't pay:** Routine, well-understood tasks (configuration changes, boilerplate); when one person would significantly impede the other's flow; when the problem requires research, not building; or when team members' energy levels and time zones don't align.

**Remote pairing tools:** VS Code Live Share, JetBrains Code With Me, Tuple (macOS). Remote pairing requires explicit turn-taking communication that colocation makes implicit.

**Key insight:** The primary ROI of pairing is not productivity per line of code — it's reduction in downstream costs: review time, defect fixing, knowledge silos, and the re-derivation cost when a solo developer is unavailable. The "two people, one task" calculation looks wrong until you account for the distribution of rework costs across the project.`,
    },
    {
      id: 584,
      name: "Trunk-Based Development",
      desc: `**Trunk-Based Development (TBD)** — a source control practice where developers integrate their work into a shared main branch (trunk) frequently — multiple times per day — keeping branches short-lived (less than 1-2 days). The contrast to long-lived feature branches where work accumulates for days or weeks before integration.

**Why frequent integration wins:** Long-lived branches defer the integration problem. Two developers independently changing overlapping code creates a large merge conflict that both have to resolve under pressure. Integration frequency is the variable that controls merge conflict size. The math: 10 developers × 10 days of divergence = O(100) potential conflicts. 10 developers × half-day divergence = O(1) manageable conflicts.

**Feature flags as the enabler:** Incomplete features can live in the main branch, hidden behind feature flags. Code is merged continuously; features are enabled when ready. This decouples deployment (technical) from feature release (business decision).

**TBD requirements:**
- Strong CI — every commit triggers a fast, comprehensive test suite
- Feature flags infrastructure for incomplete work
- Team trust and discipline to commit working (if incomplete) code
- Deployment automation to keep the main branch always deployable

**TBD vs. GitHub Flow vs. GitFlow:** TBD is the most extreme integration frequency. GitHub Flow (feature branches + PR + merge) is a middle ground. GitFlow (long-lived develop/release branches) is lowest frequency. DORA research consistently shows TBD correlates with elite performance on all four DORA metrics.

**Key insight:** Trunk-based development is uncomfortable initially because it forces problems to surface immediately. Long-lived branches create the illusion of progress (everyone's "working on their feature") while hiding the integration problem until the worst possible moment — right before release. TBD makes integration a daily routine rather than a quarterly crisis.`,
    },
    {
      id: 585,
      name: "Feature Flags",
      desc: `**Feature flags** (feature toggles, feature switches) — configuration-driven mechanisms that enable or disable features in production without deploying new code. They decouple code deployment from feature release, enabling continuous delivery of code while managing when users see new functionality.

**Four types (Pete Hodgson's taxonomy):**
- **Release toggles:** hide incomplete features in production (temporary; meant to be removed)
- **Experiment toggles:** A/B test flags enabling different behavior for different user segments
- **Ops toggles:** circuit breakers and kill switches for operational control (disable feature if database is struggling)
- **Permission toggles:** entitlement flags (premium feature enabled for paying customers)

**Use cases:**
- **Canary releases:** enable a feature for 1% → 10% → 100% of users, monitoring for errors at each step
- **Beta programs:** enable features for specific users or companies before broad rollout
- **Dark launches:** deploy and exercise code in production without users seeing results — validate performance, catch bugs
- **Rollback without rollback:** instead of reverting a deployment, flip a flag off

**The flag debt problem:** Flags that are never cleaned up accumulate. A codebase with 200 flags includes branches for all combinations of those flags — untestable, incomprehensible, and increasingly fragile. Every flag must have an owner and a deletion date. Some teams add flag deletion to the Definition of Done for the feature's full rollout.

**Key insight:** Feature flags transform deployment risk. Instead of "all users see this change at once" (catastrophic if wrong), you get "1% of users see this, we monitor for 24 hours, then expand." The risk profile goes from binary (works or it doesn't) to gradient (we catch problems at small scale before full impact). This is the technical foundation of safe continuous deployment.`,
    },
    {
      id: 586,
      name: "Continuous Integration Culture",
      desc: `**Continuous Integration (CI) culture** — the team norms and behaviors that make the CI process work: committing frequently, never leaving the build broken, treating broken builds as emergencies, and investing in test suite quality. The tool (Jenkins, GitHub Actions, CircleCI) is trivial; the culture that uses it well is the hard part.

**Core CI discipline:**
- Commit at least once per day to the main branch or a short-lived branch
- Don't go home with a broken build — fix it immediately or revert
- Build failure is a team blocker, not just the committer's problem
- Tests must be fast enough that developers run them before committing (under 10 minutes for the core suite)

**The broken window problem:** A broken build that stays broken trains the team to ignore build status. "Oh, it's always red" becomes the norm, and actual regressions hide in the noise. Zero-tolerance for broken builds maintains the signal integrity of CI status.

**Test suite performance:** A CI suite that takes 45 minutes destroys the feedback loop. Developers don't wait; they push and move on. Solutions: parallelize test execution across multiple agents; use test-impact analysis to run only tests affected by the change; separate fast unit tests from slow integration tests with different trigger policies.

**Quality ratchets:** Some teams add rules that CI enforces: coverage can't decrease, no new Sonar critical issues, no new dependencies with known vulnerabilities. These ratchets prevent regression of quality metrics without requiring human enforcement.

**Key insight:** CI is only as valuable as the confidence you have in the test suite. A test suite that produces false positives (flaky tests) trains engineers to ignore failures. A test suite that doesn't catch real regressions provides false confidence. Investment in test reliability and coverage is investment in CI's core value proposition.`,
    },
    {
      id: 587,
      name: "Mob Programming",
      desc: `**Mob Programming** (Ensemble Programming) — a practice where the entire team works on the same thing, at the same time, in the same space, on the same computer. Popularized by Woody Zuill, it's an extreme extension of pair programming: all cognitive resources of the team focused on one problem simultaneously.

**The structure:** One keyboard (the "driver"), one large screen; everyone else is a "navigator." The driver translates the team's ideas into code. Role rotation every 5-10 minutes. The driver implements only what the team directs — no independent decision-making.

**When mob programming shines:**
- Complex architectural decisions where multiple perspectives reduce risk
- Onboarding — the fastest way to immerse a new team member in the codebase and culture
- Solving hard problems that have blocked individuals for days
- Critical, high-stakes code where collective review is warranted
- Learning new technology as a team

**Productivity math:** Five people working on one task looks 80% "inefficient" by utilization metrics. But if that task is the highest-priority work, has significant rework risk, and requires knowledge spreading across the team — the 1-task throughput may exceed 5-tasks-in-parallel throughput over a sprint.

**When to avoid it:** Routine, well-understood work where the parallelism of individual tasks is clearly more valuable; when energy or timezone differences make synchronization impractical; when the team has poor psychological safety (mob programming requires trust to be effective).

**Key insight:** Mob programming is radical in its premise — all the team's capacity on one thing — but its practitioners report it as the most productive and enjoyable working mode they've experienced. The secret is that "working" includes thinking, deciding, reviewing, and transferring knowledge — all of which mob programming does simultaneously rather than sequentially.`,
    },
    {
      id: 588,
      name: "Extreme Programming (XP)",
      desc: `**Extreme Programming (XP)** — an Agile software development methodology formalized by Kent Beck in 1999, characterized by taking proven engineering practices to their logical extreme. Where code review is good, review all code all the time (pair programming). Where testing is good, test first (TDD). Where integration is good, integrate continuously.

**XP values:** Communication, Simplicity, Feedback, Courage, Respect.

**XP practices (12 original):**
- Fine-scale feedback: TDD, planning game, whole team (customer on-site), pair programming
- Continuous process: continuous integration, refactoring, small releases
- Shared understanding: coding standards, collective code ownership, simple design, system metaphor
- Programmer welfare: sustainable pace (40-hour weeks; overtime is a code smell indicating planning problems)

**Collective code ownership:** Anyone on the team can change any code at any time. Eliminates "that's Ali's code, don't touch it." Requires team agreement on standards and good test coverage so changes don't break things.

**The system metaphor:** A shared story about how the system works — an architectural metaphor that helps everyone understand the structure without reading documentation. "We're a UNIX pipeline where each stage is a pure function" communicates architecture faster than a diagram.

**XP's influence:** Most modern engineering best practices trace to XP: CI/CD from continuous integration and small releases, Scrum + TDD from the XP feedback loop, refactoring culture from XP's refactoring emphasis, collective code ownership is now standard in high-performing teams.

**Key insight:** XP's "take good practices to the extreme" framing is philosophically important. When you say "testing is good but takes too long," XP asks "what if we made tests so fast and integrated so tightly into development that testing took no additional time?" This reframing often breaks the assumption that quality and speed trade off.`,
    },
    {
      id: 589,
      name: "Boy Scout Rule",
      desc: `**Boy Scout Rule** — "Always leave the code better than you found it." Applied from the actual Boy Scout camping rule ("leave the campsite cleaner than you found it"), the principle holds that every time you touch code, you make a small improvement — better variable names, extracted functions, removing dead code, adding a missing test. Not a major refactoring; an incremental improvement.

**The compounding effect:** If every developer makes one small improvement per task, a codebase of 100K lines can experience meaningful quality improvement without dedicated "cleanup sprints" that never get scheduled. It turns quality improvement into a continuous background process rather than a periodic crisis.

**What qualifies as a Scout improvement:**
- Renaming a confusing function or variable
- Extracting a long function into smaller named functions
- Deleting commented-out code
- Fixing a lint warning in a modified file
- Adding a docstring or test for an untested path you touched

**The scope constraint:** The improvement must be small relative to the primary task, and must not change behavior (pure refactoring). A bug fix that turns into a two-day refactoring of the surrounding module is scope creep, not Scout work. The rule is about hygiene, not renovation.

**Danger: using Scout Rule to justify reckless changes:** The Scout Rule requires test coverage — you need to know that your improvements don't break anything. Without tests, "leaving the code better" can mean "introducing a subtle regression." Build the safety net before exercising the rule aggressively.

**Key insight:** Codebases age at the rate of entropy unless actively maintained. Without the Scout Rule norm, every developer produces new features while quality degrades — not through negligence but through the natural tendency to minimize scope. The Scout Rule makes quality maintenance a team habit rather than a scheduled event.`,
    },
    {
      id: 590,
      name: "Spike Stories",
      desc: `**Spike** (or "spike story") — a time-boxed research or exploration task in Agile development, used to answer a technical question or reduce uncertainty before committing to an implementation approach. Named after the XP practice of driving a nail in quickly (to test the wood) before committing to a joint.

**When to create a spike:**
- Technology is unfamiliar and complexity is unknown
- Multiple implementation approaches exist with unclear trade-offs
- External API or integration has unclear behavior or performance characteristics
- A story estimate has too much uncertainty to commit to a sprint

**Spike structure:**
- Clear question to answer (not a deliverable to build)
- Time box (typically 1-3 days; rarely longer)
- Owner (one person or a pair)
- Output: a decision with documented rationale, not a production-quality implementation

**Spike output formats:** A brief written summary of findings (what was tried, what was learned, the recommendation), a proof-of-concept in a branch (to be thrown away, not merged), a spike report presented to the team.

**The throw-it-away discipline:** Spike output is exploration, not production code. The temptation to keep and extend the spike prototype instead of writing the real implementation is strong — but spike code is shortcuts and hacks. "We'll just clean it up" almost never happens. Delete the spike; build the real thing.

**Key insight:** Spikes are insurance against the biggest sprint failure mode — committing to work you didn't understand. A 2-day spike that reveals the planned approach won't work saves a 2-week sprint failure. The return on uncertainty-reduction is high; the cost of finding out "we were wrong" in sprint planning is negligible compared to finding out mid-sprint.`,
    },
    {
      id: 591,
      name: "Technical Documentation",
      desc: `**Technical documentation** — the written artifacts that help engineers understand, use, operate, and extend a system. Good documentation is a force multiplier: it extends the reach of expert knowledge without requiring the expert to be present for every question.

**Documentation types by audience and purpose:**
- **README:** orientation for new contributors — what this is, how to set up, how to run
- **API documentation:** interface contracts for library/service consumers; generated from code annotations (OpenAPI/Swagger, JSDoc)
- **Architecture Decision Records (ADRs):** the "why" behind significant decisions; immutable once made (append-only)
- **Runbooks / Playbooks:** operational procedures for on-call engineers; step-by-step, not conceptual
- **Tutorials:** guided, learning-oriented; hand-holds through a specific journey
- **How-to guides:** problem-oriented; "how do I do X in this codebase?"
- **Reference:** information-oriented; API specs, config options, data schemas

**The documentation rot problem:** Documentation written once and never updated becomes actively harmful — it misleads readers and erodes trust. Documentation that lives near the code (in the same repo, referenced from ADRs) decays more slowly. Documentation that lives in wikis that aren't part of the development workflow decays quickly.

**Docs-as-code:** Treating documentation with the same workflow discipline as code — version control, review, CI checks for broken links — slows decay and ensures documentation changes accompany code changes.

**Key insight:** The best documentation is the code that doesn't need documentation. Clear names, small functions, obvious data structures, and well-designed APIs reduce the documentation burden. When you find yourself writing a long comment to explain how something works, consider whether the code can be rewritten to not need that explanation.`,
    },
  ],
};

export default engineeringPractices;
