const sdlc = {
  name: "Software Development Lifecycle",
  icon: "🔄",
  color: "#3b82f6",
  concepts: [
    {
      id: 558,
      name: "SDLC Overview",
      desc: `**Software Development Lifecycle (SDLC)** — a structured process that guides software from initial concept through deployment and ongoing maintenance. It provides a framework for managing complexity, quality, and risk across the entire lifespan of a system — not just the initial build, but the years of changes that follow.

**The core phases (in any SDLC model):**
1. **Planning:** scope definition, feasibility, resource estimation, risk assessment
2. **Requirements:** what does the system need to do? Stakeholder interviews, use cases, functional and non-functional requirements
3. **Design:** how will it be built? Architecture, data models, API contracts, UI wireframes
4. **Implementation:** writing code against agreed designs
5. **Testing:** verification that what was built matches requirements, and validation that it solves the right problem
6. **Deployment:** releasing to production environments
7. **Maintenance:** monitoring, fixing bugs, adapting to changing requirements

**The phases never run linearly in practice:** Requirements change during implementation. Design flaws surface during testing. Production monitoring reveals requirements that were never articulated. Modern SDLC models (Agile, continuous delivery) acknowledge this and build iteration into the process.

**Key insight:** The phase that determines project outcomes most is requirements — not implementation. Teams that rush past requirements to start coding build the wrong thing correctly. The cost of fixing a requirement defect discovered in production is 50-100× the cost of fixing it during the requirements phase.`,
    },
    {
      id: 559,
      name: "Requirements Engineering",
      desc: `**Requirements engineering** — the systematic process of discovering, documenting, validating, and managing requirements for a software system. Poor requirements are the leading cause of project failure — not poor coding, not poor technology choices.

**Types of requirements:**
- **Functional:** what the system must do (a user can log in with email and password)
- **Non-functional:** how the system must perform (login must complete in <200ms at p99 for 10,000 concurrent users)
- **Business requirements:** the higher-level goal (reduce customer churn by making re-engagement faster)
- **User stories:** requirements from the user's perspective in "as a [user], I want [action], so that [value]" format

**The requirements-reality gap:** Stakeholders often describe solutions, not problems. "We need a dashboard" is a solution; the problem is "we can't tell how many customers are at churn risk." Asking "why do you need that?" iteratively surfaces the real requirement and opens the solution space.

**Validation vs. verification:** Verification asks "did we build the system right?" (does it match the spec). Validation asks "did we build the right system?" (does it solve the actual problem). Both are necessary. A perfectly spec-compliant system that solves the wrong problem is a failure.

**Living documentation:** Requirements drift. A spec written in January is often wrong by March. Keep requirements co-located with the code (as tests, as user stories in a living backlog, as ADRs) so they're maintained alongside the system they describe.

**Key insight:** The best requirements engineers are translators — from business language to engineering precision, and back again. "Make the search faster" needs translating into "reduce p95 search latency from 1.2s to <300ms for queries returning >100 results." Precision forces clarity, exposes unstated assumptions, and makes success measurable.`,
    },
    {
      id: 560,
      name: "Prototyping & MVP",
      desc: `**Prototype** — a preliminary version of a system built to explore design options, test assumptions, or demonstrate feasibility before committing to full implementation. **MVP (Minimum Viable Product)** — the smallest version of a product with enough functionality to satisfy early adopters and generate validated learning about whether the product should be built at all.

**Two types of prototype:**
- **Throwaway (exploratory):** built to answer a question, then discarded. Never ship a throwaway prototype — it was built without the constraints of production code.
- **Evolutionary (incremental):** built to be refined and extended into production. Requires production-quality foundations from the start.

**MVP misunderstandings:** MVP is frequently misread as "a bad version of the product." Eric Ries' original meaning: MVP is the fastest experiment that lets you test a core hypothesis. It may not even be software — a landing page that measures signup interest before writing a line of code is a valid MVP. The key word is "viable" — viable enough to generate the learning, not viable as a sellable product.

**When prototyping pays:**
- Validating technical feasibility for novel technology choices
- Getting UX feedback before engineering commitment
- Exploring algorithm options when performance characteristics are unknown
- Demonstrating to stakeholders what a product could be (design prototypes)

**Key insight:** The most expensive prototype is the one you build in production. Every system architects reluctantly admit that "the real architecture emerged after we learned what the system needed to do." Planning for the rewrite — treating v1 as a learning prototype and v2 as the real architecture — is often more efficient than trying to get the architecture right before you understand the domain.`,
    },
    {
      id: 561,
      name: "Waterfall Model",
      desc: `**Waterfall** — a sequential SDLC model where each phase must be fully completed before the next begins, with no formal mechanism for revisiting previous phases. Requirements → Design → Implementation → Testing → Deployment flow like water cascading downward. Named by Winston Royce in a 1970 paper — in which he described it as a flawed model to illustrate the risks of sequential development.

**Where waterfall works:** Domains with stable, fully-knowable requirements (hardware manufacturing, civil engineering, regulated compliance systems). When the cost of late design changes is catastrophic (building a bridge), upfront design investment is justified. Software is rarely this stable.

**Why waterfall fails for most software:**
- Requirements are rarely fully knowable at project start; they emerge through use
- Integration problems that surface at testing (after all other phases are "done") are the most expensive to fix
- The feedback loop from users to developers takes months, not days
- By deployment, market conditions, technology, and stakeholder needs have all changed

**Waterfall as planning fiction:** Many organizations operate a waterfall process nominally while iterating informally. The spec changes, the design adapts, the timeline slips. Waterfall overhead without waterfall discipline adds bureaucracy without the benefits of iteration. Agile formalizes the iteration that was happening informally anyway.

**Key insight:** Waterfall's fundamental premise — that requirements can be fully specified before design begins, design before coding, coding before testing — is false for most software systems. The discipline of thinking ahead is valuable; the illusion that full upfront specification eliminates iteration is harmful.`,
    },
    {
      id: 562,
      name: "Iterative & Incremental Development",
      desc: `**Iterative development** — building a system through repeated cycles of partial implementation, evaluation, and refinement. Each iteration produces a more refined version of the same features. **Incremental development** — building a system by adding feature slices in a planned sequence, with each increment adding functional value. Most modern methodologies combine both: each increment is developed iteratively.

**The core premise:** You learn more about what you should build by building something and evaluating it than you learn from upfront analysis alone. Feedback from working software — from users, from integration testing, from production monitoring — is richer than feedback from specifications.

**Iteration size matters:** Very short iterations (1-2 weeks in Scrum sprints) force scope discipline and produce frequent feedback. Very long iterations (quarterly) accumulate risk and reduce the learning rate. The right iteration length depends on how quickly requirements evolve and how much it costs to integrate and deploy.

**Risks of unmanaged iteration:** Without discipline, "we'll iterate on it" becomes an excuse for shipping poor quality and never refactoring. Iteration is not permission for permanent "work in progress" — each iteration should produce shippable, production-quality work.

**Key insight:** The incremental approach reveals a hidden benefit: you ship value earlier. A project that would take 12 months to complete sequentially can deliver its highest-value 20% in the first 3 months using incremental delivery. Users get value sooner; feedback informs subsequent increments; the project can be stopped early if it's delivering insufficient value.`,
    },
    {
      id: 563,
      name: "Continuous Delivery vs Continuous Deployment",
      desc: `**Continuous Integration (CI)** — every developer's changes are merged to a shared main branch frequently (at least daily), with automated builds and tests running on each merge to detect integration problems immediately. **Continuous Delivery (CD)** — software is always in a releasable state; the deployment to production is a business decision, not a technical event. **Continuous Deployment** — every change that passes automated testing is deployed to production automatically, without human approval gates.

**The progression:**
- CI: merge frequently, test automatically, detect breakage fast
- Continuous Delivery: pipeline produces a deployable artifact; release is a button click
- Continuous Deployment: that button click is automated — no human involvement between commit and production

**Choosing between Delivery and Deployment:** Continuous Deployment requires very high automated test coverage, feature flags for safe deployment of incomplete features, and strong monitoring for fast rollback. It's appropriate for consumer web products with fast iteration loops. Continuous Delivery is appropriate for regulated industries (requires audit trails), enterprise software with customer-controlled upgrade timing, or teams still building testing infrastructure.

**DORA metrics as outcome measures:** The DevOps Research and Assessment (DORA) program found that high-performing engineering organizations achieve deployment frequency of multiple times per day, lead time for changes under 1 hour, mean time to recover under 1 hour, and change failure rate under 15%. CI/CD is the technical foundation that makes these metrics achievable.

**Key insight:** Continuous Delivery solves risk through frequency, not through caution. Counterintuitively, deploying 50× per day is safer than deploying once per month — each change is tiny, easy to understand, and easy to roll back. The large monthly deployment batches risk into a single high-stakes event.`,
    },
    {
      id: 564,
      name: "Release Management",
      desc: `**Release management** — the process of planning, scheduling, coordinating, and controlling the movement of software through development, testing, staging, and production environments. In CI/CD environments, most tactical release management is automated; the strategic layer (what goes out when and to whom) remains a human decision.

**Versioning strategies:**
- **Semantic Versioning (SemVer):** MAJOR.MINOR.PATCH — breaking changes increment MAJOR, new backward-compatible features increment MINOR, bug fixes increment PATCH. Establishes a contract with consumers.
- **Calendar versioning (CalVer):** version numbers encode the release date (Ubuntu's 24.04 = April 2024). Easy to understand, poor signal for API compatibility.
- **Release trains:** features are ready when the train leaves the station on a fixed schedule, regardless of what's complete. Reduces coordination overhead.

**Deployment strategies (see also System Design):**
- Blue-green: two identical environments; traffic switches instantaneously
- Canary: gradual rollout to a percentage of users before full release
- Feature flags: code deploys dark; features enabled by configuration

**Release notes and communication:** Releases affect users, downstream teams, support staff, and sales. Good release communication: what changed, what it means for users, what's been fixed, what's known-broken. Internal-facing releases also need runbooks for on-call engineers who'll be first responders if issues arise.

**Key insight:** The most dangerous releases are the ones treated as non-events — no communication, no rollback plan, no monitoring strategy. Size and frequency of a change don't predict risk as well as recency: the code that changed most recently is most likely to be involved in incidents. Flag recent changes in incident triage.`,
    },
    {
      id: 565,
      name: "Change Management",
      desc: `**Change management (engineering context)** — the systematic approach to introducing technical changes — to systems, architecture, processes, or tooling — while managing risk, maintaining quality, and ensuring adoption. Not to be confused with ITIL change management (though that's related), which is the governance process for approving infrastructure changes.

**The people problem:** Most technical change initiatives fail not because the technology is wrong but because adoption fails. Engineers habituated to existing tools resist new ones; teams with different incentives don't converge on new processes; leadership doesn't provide air cover for the transition period where productivity dips.

**Change models that work in engineering:**
- **Pilot with willing team:** let the most enthusiastic team adopt first, document what they learn, then expand — don't mandate organization-wide adoption of unproven tools
- **Make the new way easier than the old way:** if migrating to a new pattern requires more ceremony than the old one, migration won't happen voluntarily
- **Migration guides and tooling:** automated codemods, example migrations, and pairing support lower the friction of change

**Resistance as signal:** When engineers resist a change, the most productive response is curiosity, not force. "What concern does this resistance reflect?" Often it surfaces real problems: the new tool doesn't handle their use case, the migration path is too expensive, or there's a hidden dependency that breaks under the new approach.

**Key insight:** The change management process for technical decisions is itself a product — it needs a "user experience." Engineers are users of architecture, processes, and tooling. If the experience of adopting the change is painful, the change won't stick. Design change management with the same user empathy you'd apply to end-user product design.`,
    },
    {
      id: 566,
      name: "Version Control Workflow",
      desc: `**Version control workflow** — the set of conventions governing how developers use a version control system (typically Git) to collaborate: how branches are named, how long they live, how code moves from development to production, and how conflicts are resolved. The workflow is as important as the tool — bad workflows with Git produce the same chaos as no version control.

**Major workflow patterns:**
- **Trunk-Based Development:** everyone commits to one main branch frequently (multiple times/day). Feature flags gate incomplete work. Requires strong CI. Enables continuous delivery. Preferred by high-performing teams.
- **GitHub Flow:** main branch is always deployable; short-lived feature branches, reviewed and merged via pull request. Simple, effective for teams shipping continuously.
- **GitFlow:** long-lived develop, release, and hotfix branches alongside feature branches. Higher ceremony; suited to scheduled release cadences or multiple concurrent version maintenance.

**Branch naming conventions:** Consistent naming enables automation. Common patterns: "feature/TICKET-123-short-description", "fix/bug-description", "chore/cleanup-task". Kebab-case over snake_case in branch names (filesystem and URL compatibility).

**Commit message discipline:** Conventional Commits ("feat:", "fix:", "chore:", "docs:") enables automated changelog generation, semantic versioning bumps, and filtering. More importantly, well-written commit messages are documentation — "what changed" is in the diff; "why it changed" belongs in the message.

**Key insight:** Branch lifetime is inversely correlated with integration risk. Branches that live for days create small merge conflicts; branches that live for weeks create large ones; branches that live for months become integration disasters. The goal of any workflow should be to minimize branch lifetime through small, focused, frequently-integrated changes.`,
    },
    {
      id: 567,
      name: "Code Review Process",
      desc: `**Code review** — the practice of having one or more developers examine a proposed change before it's merged, checking for correctness, design quality, security issues, test coverage, and adherence to team standards. Code review is simultaneously a quality gate, a knowledge-transfer mechanism, and a culture-building practice.

**The LGTM trap:** "Looks Good To Me" rubber-stamp reviews are worse than no reviews — they create false confidence without providing the value. An effective review engages with logic and design, not just style.

**What good reviewers check:**
- Does this solve the right problem? Is the approach the simplest that works?
- Are there edge cases not handled? Failure modes not considered?
- Does this change comply with the existing architecture and patterns?
- Are the tests meaningful, or are they testing implementation rather than behavior?
- Are there security implications (input validation, access control, data exposure)?

**Review anti-patterns:**
- Nit-picking style instead of automating style with linters
- Designing-in-review instead of designing-before-coding (expensive feedback loop)
- Blocking reviews with low-priority personal preferences rather than genuine concerns
- Async review cycles that stretch across days, creating context-switching cost for the author

**Author responsibilities:** Good code review starts with the author. Small, focused PRs (one concern per PR), descriptive PR descriptions that explain the why, self-review before requesting others, and linking to the ticket or specification so reviewers have context.

**Key insight:** The review is a conversation, not a judgment. The goal is to ship high-quality code, not to demonstrate reviewer superiority. The best code review culture produces PRs where the author is excited to receive feedback and reviewers feel invested in the code they've reviewed. If reviews create anxiety or adversarialism, the culture needs attention before the process.`,
    },
    {
      id: 568,
      name: "Refactoring",
      desc: `**Refactoring** — the disciplined process of restructuring existing code without changing its external behavior, improving internal quality attributes: readability, testability, maintainability, and performance. Martin Fowler's definition adds the key constraint: refactoring preserves observable behavior — not as a coincidence, but as a guarantee enforced by tests.

**Why tests are prerequisite:** Without tests, refactoring is gambling. You're changing the structure of code whose correctness was previously confirmed by behavior, and you have no systematic way to verify the refactored version is equivalent. Test-first development makes refactoring safe.

**The refactoring catalog:** Fowler's Refactoring book catalogs specific moves — Extract Method, Rename Variable, Introduce Parameter Object, Replace Conditional with Polymorphism, Move Function — each with a name, motivation, mechanics, and examples. Naming the refactoring helps communicate intent and think precisely about what you're changing.

**Refactoring vs rewriting:** Refactoring is incremental, preserves behavior, and keeps the system running throughout. Rewriting is starting over, is high-risk, and produces a blank-slate understanding problem. The rewrite is tempting because "the code is terrible" but is rarely the right choice — the existing code, however messy, contains years of accumulated bug fixes and edge case handling that the rewrite will take years to rediscover.

**Continuous refactoring (the Boy Scout Rule):** "Leave the code better than you found it." Small improvements on every touch — better variable names, extracted functions, removed dead code — prevent the accumulation of quality debt that eventually requires large, risky refactoring efforts.

**Key insight:** Refactoring is not a separate activity from feature development — it's the mechanism by which codebases remain maintainable as requirements evolve. A codebase that can't be safely refactored will calcify over time, becoming increasingly expensive to change. The investment in keeping refactoring safe (tests, CI, small increments) pays continuous dividends.`,
    },
    {
      id: 569,
      name: "Legacy System Migration",
      desc: `**Legacy system migration** — the process of replacing, modernizing, or re-architecting software that is old, poorly understood, hard to change, or running on deprecated technology. "Legacy" doesn't mean old — it means code that's hard to change with confidence. Some 30-year-old COBOL systems are well-maintained; some 3-year-old microservice meshes are already legacy.

**Migration strategies (Michael Feathers + Martin Fowler):**
- **Strangler Fig Pattern:** incrementally wrap the old system with the new, routing traffic to the new implementation feature by feature, until the old system is fully "strangled" and can be removed
- **Branch by abstraction:** introduce an abstraction layer, build the new implementation behind it, switch over atomically, then remove the old implementation
- **Big bang rewrite:** replace everything at once. Almost always more expensive and risky than predicted — see the Netscape rewrite disaster.

**Why migrations take longer than expected:**
- The old system contains undocumented behavior that only surfaces in production after migration
- Data migration is harder than code migration — cleaning, transforming, and validating historical data is time-consuming
- Cutover risk is often highest for the last 10% of traffic or functionality

**Preserving behavior:** The most important tool for migration is a comprehensive test suite for the old system's behavior, used to verify the new system matches it. If the old system has no tests, building characterization tests (tests that capture existing behavior without judging correctness) is the first step.

**Key insight:** Successful legacy migrations are measured in years, not sprints. The organizations that succeed treat migration as a continuous strategy — incrementally strangling old components while delivering new value in parallel — rather than as a project with a defined end state. "The migration will be done by Q3" is usually fiction; "we'll migrate the payment flow this quarter and the user service next quarter" is a plan.`,
    },
  ],
};

export default sdlc;
