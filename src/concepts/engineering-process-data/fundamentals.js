const fundamentals = {
  name: "Engineering Fundamentals & Mindset",
  icon: "🧠",
  color: "#6366f1",
  concepts: [
    {
      id: 548,
      name: "Software Engineering vs. Coding",
      desc: `**Software engineering** — the disciplined application of engineering principles to the design, development, maintenance, testing, and evaluation of software. Coding is writing instructions a computer can execute; software engineering is reasoning about trade-offs, long-term maintainability, and the human systems that produce and depend on the code.

**The distinction matters:** A coder asks "does this work?" A software engineer asks "does this work now, will it work at 100× the load, can a new team member understand and modify it in six months, and what happens when the external API it depends on is unavailable?" The difference is systems thinking applied at every level.

**Key dimensions software engineering adds beyond coding:**
- **Correctness over time:** software that's correct today but unmaintainable becomes incorrect tomorrow
- **Operability:** how will this run in production? Who monitors it? How do we debug it?
- **Collaboration:** code is a communication medium for humans as much as instructions for machines
- **Economics:** every technical choice has a cost — in build time, maintenance burden, cognitive load, and future optionality

**What trips up coders who become engineers:** The hardest shift is learning to value what's not there — the abstraction you didn't create, the dependency you didn't take on, the framework you chose not to add. Engineering restraint is as important as engineering capability.

**Key insight:** The goal of software engineering is not to write the most sophisticated code — it's to write the least code that solves the problem reliably, with the right abstractions at the right boundaries, in a way that a future teammate (often your future self) can understand, modify, and extend without fear.`,
    },
    {
      id: 549,
      name: "First Principles Thinking",
      desc: `**First principles thinking** — the practice of breaking a problem down to its fundamental truths and reasoning up from there, rather than reasoning by analogy from existing solutions. Elon Musk's famous example: instead of accepting that battery packs cost $600/kWh because "that's the market price," decompose them into raw materials, price those at commodity rates, and discover the theoretical floor is far lower.

**In software engineering, first principles means asking:**
- What problem are we actually trying to solve — not what solution are we copying?
- What are the fundamental constraints? (latency physics, consistency theorems like CAP, human memory limits)
- If we had no existing code, no existing frameworks, no prior decisions — what would we build?

**When analogy reasoning is correct:** Most decisions should use analogies (patterns, prior art, conventions) because re-deriving everything from scratch is prohibitively expensive. Use first principles when facing genuinely novel problems, when prior solutions are clearly wrong, or when you suspect the problem has changed but the solution hasn't caught up.

**The trap of cargo cult engineering:** Copying patterns without understanding why they exist leads to applying solutions to the wrong problem. "We use microservices because Netflix does" without understanding that Netflix's problem (independent scaling of video processing, recommendations, and billing) is categorically different from a 5-person startup's problem.

**Key insight:** First principles thinking is expensive — it requires time, deep domain knowledge, and the intellectual courage to question established practice. Reserve it for decisions with high leverage and long-lived consequences: architecture choices, data model design, foundational API contracts. For routine decisions, trust and apply accumulated wisdom.`,
    },
    {
      id: 550,
      name: "SOLID Principles",
      desc: `**SOLID** — five design principles articulated by Robert Martin that guide object-oriented software toward systems that are easier to understand, modify, and extend without introducing regressions. They're less rules than lenses: ways of spotting design smells before they become maintenance burdens.

**The five principles:**
- **S — Single Responsibility:** A class (or module, or function) should have one reason to change. Don't mix data parsing, business logic, and I/O in the same unit.
- **O — Open/Closed:** Open for extension, closed for modification. Add behavior through new code, not by changing existing, tested code. Strategy and plugin patterns implement this.
- **L — Liskov Substitution:** Subtypes must be substitutable for their base types without breaking program correctness. A Square that overrides Rectangle's setWidth to also set setHeight violates this — callers expecting rectangular behavior will get surprises.
- **I — Interface Segregation:** Clients shouldn't depend on interfaces they don't use. One fat interface becomes a dependency burden — split it into focused contracts.
- **D — Dependency Inversion:** High-level modules should not depend on low-level modules; both should depend on abstractions. Inject dependencies rather than instantiating them — makes testing and substitution possible.

**When SOLID hurts:** Applied dogmatically to small codebases, SOLID creates architecture for architecture's sake — dozens of tiny classes, abstraction layers with one implementation, indirection that costs more in comprehension than it saves in flexibility. These principles pay off when a codebase grows past the "one person can hold it all in their head" threshold.

**Key insight:** SOLID is not about classes — it's about managing change. The question each principle answers is the same: "If requirements change in this area, how much code must I touch?" Good SOLID application minimizes blast radius.`,
    },
    {
      id: 551,
      name: "DRY, WET, and DAMP",
      desc: `**DRY (Don't Repeat Yourself)** — every piece of knowledge in a system should have a single, authoritative representation. When logic or data exists in multiple places, a change in one place requires finding and updating all others — leading to inconsistency and bugs. DRY is about eliminating knowledge duplication, not syntactic similarity.

**The important distinction:** DRY is about *knowledge*, not *code*. Two functions that look similar but represent different domain concepts should NOT be merged — merging them creates false coupling. Two functions that implement the same business rule in different files SHOULD be merged — they'll drift apart when the rule changes.

**WET (Write Everything Twice / We Enjoy Typing)** — the antipattern of copy-pasting logic because abstraction feels expensive. Fine once; dangerous three or more times. The moment you paste for the third time, the extract-refactor cost is lower than the future divergence risk.

**DAMP (Descriptive and Meaningful Phrases)** — a counterpoint applied primarily in test code, where duplication is often acceptable in exchange for readability. A test that's 30 lines of clearly-named setup is better than a test that delegates to 5 helpers and requires mental stack-unwinding to understand what's being tested. Tests should read like specifications.

**The false DRY trap:** Premature abstraction ("I'll abstract this now for future use") is as dangerous as duplication. Abstractions created before you understand the variation points often create more rigidity than flexibility. The classic "Rule of Three" heuristic: tolerate the first duplication, be suspicious at the second, abstract at the third.

**Key insight:** DRY violations are usually visible in version control — when you touch code in five files to change one business rule, you've found a DRY violation. The fix isn't always abstraction; sometimes it's reorganization. Let the pain of maintenance guide when to abstract.`,
    },
    {
      id: 552,
      name: "YAGNI & KISS",
      desc: `**YAGNI (You Ain't Gonna Need It)** — don't implement functionality until it's actually required. Predicting future requirements is harder than it looks; most anticipated features never arrive, and the ones that do often arrive in a different form than anticipated. Code written for requirements that never materialize is maintenance burden without payoff.

**KISS (Keep It Simple, Stupid)** — the simplest solution that works is the best solution. Complexity is a cost paid continuously — in comprehension time, debugging time, onboarding time, and testing time. Every layer of complexity requires justification.

**What YAGNI means in practice:**
- Don't add configuration options that no current user needs
- Don't build plugin systems until you have three concrete extension needs
- Don't add caching layers until you've measured a performance problem
- Don't design for millions of users when you have thousands

**The cost of premature generalization:** Over-engineered systems are harder to modify for the actual requirement when it arrives, because the abstraction layers impose constraints. A system built for flexibility often has less flexibility than a focused one because the flexibility is in the wrong dimensions.

**When simplicity is wrong:** Some complexity pays for itself immediately — security infrastructure, observability, error handling for edge cases that definitely exist. YAGNI and KISS don't mean "skip error handling" or "don't think about security." They mean: don't add complexity that doesn't address a real, present requirement.

**Key insight:** In a five-year codebase, 60-80% of initially-written YAGNI code will need to be rewritten or deleted. The discipline of YAGNI is not defeatist — it's an acknowledgment that understanding of requirements matures through production use, and deferring architecture decisions to the last responsible moment produces better-fit solutions than anticipating them.`,
    },
    {
      id: 553,
      name: "Separation of Concerns",
      desc: `**Separation of concerns (SoC)** — the design principle of organizing a system so that each distinct concern (parsing, business logic, persistence, presentation) is handled by a dedicated component, with minimal overlap. A change in one concern should not require touching code responsible for another.

**Why it matters:** Software has natural fault lines — input parsing fails differently than business logic fails; persistence layers change when the database changes, not when business rules change. Respecting these fault lines makes individual components smaller, more testable, and independently changeable.

**Classic separations:**
- MVC / MVVM: model (data/business logic), view (presentation), controller/viewmodel (coordination)
- Layered architecture: presentation → application → domain → infrastructure
- Clean Architecture / Hexagonal: domain logic at center, I/O at edges, dependency inversion between them

**The leakage problem:** Concerns leak. Database schema details appear in view templates. Business logic accumulates in controllers. SQL appears in frontend JavaScript via poorly-designed APIs. Leakage is usually gradual — one shortcut at a time — until the system is untestable and changes have unpredictable blast radius.

**SoC in microservices:** Service boundaries are a macro-level SoC decision. A payment service shouldn't own user authentication. But boundaries that are too granular create coordination overhead and distributed transaction complexity. SoC at the service level requires matching boundaries to genuine domain separation.

**Key insight:** Separation of concerns is not about file count or layer count — it's about ensuring that the most frequently changed pieces of a system can be changed independently. Ask: "If this business rule changes, how many files in how many layers do I touch?" If the answer involves touching the database schema, the business logic, the API, and the UI, your concerns are fused, not separated.`,
    },
    {
      id: 554,
      name: "Unix Philosophy",
      desc: `**Unix Philosophy** — a design doctrine distilled from the Unix operating system (Ken Thompson, Dennis Ritchie, Doug McIlroy, 1970s) that emphasizes small, focused programs that do one thing well and compose through standard interfaces. The most concise version is McIlroy's: "Write programs that do one thing and do it well. Write programs to work together. Write programs that handle text streams, because that is a universal interface."

**The four rules (Rob Pike's formulation):**
1. Write simple parts connected by clean interfaces
2. Clarity is better than cleverness
3. Design programs to be connected with other programs
4. Separate policy from mechanism (the engine from the switches that control it)

**How it applies to modern software:**
- CLI tools that compose via stdin/stdout pipelines
- Microservices with clean API contracts
- Functions that do one thing and return predictable results
- Libraries that provide mechanism; applications that implement policy

**Where it breaks down:** Some problems are inherently coupled — a database that's also a messaging system and a caching layer (Redis) is successful precisely because it integrates these concerns efficiently. Forced decomposition can produce more complexity than it eliminates. The Unix philosophy is a starting heuristic, not a universal law.

**Key insight:** The deepest insight of the Unix philosophy is that composability requires simplicity. A tool complex enough to have many implicit behaviors can't be composed reliably — its behavior in a pipeline depends on which mode it's in, which flags were set, which context it was called from. Simplicity enables composability; composability enables power through combination.`,
    },
    {
      id: 555,
      name: "Conway's Law",
      desc: `**Conway's Law** — "Organizations which design systems are constrained to produce designs which are copies of the communication structures of those organizations." Articulated by Melvin Conway in 1968, the law predicts that your architecture will mirror your org chart — not because of technical necessity but because of communication friction. Teams design the interfaces between their components to match the interfaces between themselves.

**Real-world manifestation:** If three teams own the frontend, API layer, and database respectively, the system will have three distinct layers with APIs between them. If one team owns the entire user journey, the system will tend toward more integrated designs. This isn't pathological — it's physics.

**The Inverse Conway Maneuver:** Instead of fighting Conway's Law, deliberately design your organization to match your desired architecture. If you want autonomous, independently-deployable microservices — create teams organized around those service boundaries, each owning their domain end-to-end. Amazon's "two-pizza teams" owning their services is this principle at scale.

**Team Topologies** (Skelton & Pais) codifies this: four team types (stream-aligned, platform, enabling, complicated-subsystem) and three interaction modes (collaboration, X-as-a-service, facilitating) define a vocabulary for deliberately designing organizational communication to produce desired architectural outcomes.

**Key insight:** When your architecture and org structure are misaligned, architecture always loses — eventually. A distributed team that needs to coordinate four handoffs to ship one feature will gradually build a monolith of implicit coordination. Sustainable architecture must be supported by team structures that can maintain it. Organizational design IS systems design.`,
    },
    {
      id: 556,
      name: "Technical Debt",
      desc: `**Technical debt** — a metaphor coined by Ward Cunningham for the implied cost of rework caused by choosing expedient, short-cut solutions instead of better approaches that would take longer now but be cheaper to maintain. Like financial debt, technical debt accrues interest: the longer it's deferred, the more expensive it becomes.

**The four quadrants (Martin Fowler):**
- **Reckless & Deliberate:** "We don't have time for design" — debt from explicit shortcuts taken under pressure
- **Prudent & Deliberate:** "We must ship now; we'll deal with consequences later" — acknowledged debt, intentionally taken with a plan to repay
- **Reckless & Inadvertent:** "What is layering?" — debt from lack of knowledge of better practices
- **Prudent & Inadvertent:** "Now we know how we should have designed this" — debt discovered retrospectively; the normal cost of learning

**The interest mechanism:** Debt compounds because messy code is harder to modify, so future changes take longer, add more mess, and make the next changes even slower. A system with high debt reaches a "debt ceiling" where new features require 5× the time they would in a clean system.

**Managing debt consciously:**
- Track it explicitly in a tech debt register alongside a business cost estimate
- Allocate 15-20% of sprint capacity to debt repayment continuously — not "cleanup sprints" that never happen
- Measure debt impact: time-to-implement-a-feature is a leading indicator; defect rate in high-debt areas is a lagging one

**Key insight:** Not all technical debt is bad. Taking deliberate, time-limited shortcuts to hit a market window is sound engineering economics — IF you track the debt and repay it before it compounds. The problem is reckless or inadvertent debt that's invisible and unmeasured. Make debt visible, assign ownership, and treat repayment as product work, not "housekeeping."`,
    },
    {
      id: 557,
      name: "Premature Optimization",
      desc: `**Premature optimization** — the practice of making a system more complex in order to improve performance before establishing through measurement that the performance problem exists, is significant, and is located where you're optimizing. Donald Knuth's full quote: "We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil. Yet we should not pass up our opportunities in that critical 3%."

**Why it's harmful:** Optimization trades simplicity for performance. When you optimize before measuring, you're paying the simplicity cost without knowing whether you're gaining meaningful performance improvement. You may be optimizing a non-bottleneck while the actual constraint is elsewhere — Amdahl's Law: the speedup of a program is limited by the portion that cannot be parallelized (or optimized). If 10% of your code is the bottleneck, optimizing the other 90% achieves nearly nothing.

**The correct order:**
1. Make it work (correct, testable, readable)
2. Make it right (well-structured, maintainable)
3. Make it fast (only if there's a measured need)

**When to optimize early:** Some optimizations belong in design — choosing a hash map over a list for O(1) lookups when the access pattern is known, choosing an indexed database schema when query patterns are defined. Algorithmic choices that affect big-O complexity should be made deliberately upfront. Micro-optimizations (loop unrolling, cache-line tuning) should wait for profiler evidence.

**Key insight:** Profile before you optimize. A profiler will tell you that 80% of your execution time is in a single function you'd never have suspected. Every performance optimization should start with a profiler run, a hypothesis about the bottleneck, a change, and a before/after measurement — not intuition about where things are slow.`,
    },
  ],
};

export default fundamentals;
