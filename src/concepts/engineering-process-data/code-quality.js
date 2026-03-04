const codeQuality = {
  name: "Code Quality & Standards",
  icon: "✨",
  color: "#f59e0b",
  concepts: [
    {
      id: 602,
      name: "Clean Code Principles",
      desc: `**Clean code** — code that is easy to read, understand, modify, and test. Robert Martin (Uncle Bob) popularized the term with his book "Clean Code" (2008), though the underlying principles predate it. Clean code is not the absence of bugs — it's the presence of clarity. Bugs in clean code are easier to find and fix.

**Core principles:**
- **Meaningful names:** variables, functions, and classes named by what they represent, not how they work. No cryptic abbreviations; no misleading names. A function named calculateTax() should only calculate tax.
- **Small functions that do one thing:** a function that does A and B and C should be three functions. Small functions are easier to name, test, and understand.
- **Avoid comments for obvious things:** self-explanatory code needs no comments. Comments that explain why (business rule, known limitation) are valuable; comments that explain what (restating the code in English) are noise.
- **No duplication:** DRY applied at the code level
- **Consistent formatting and style:** cognitive load of parsing inconsistent formatting is real

**The "WTF/minute" code review metric (unofficial):** The best proxy for code quality in review is the frequency of "what the f*ck?" moments when reading unfamiliar code. Clean code minimizes WTF/minute. It reads like well-written prose: predictable, clear, no surprises.

**Clean code vs. clean architecture:** Clean code operates at the function and class level — naming, size, coupling. Clean architecture operates at the component and system level — dependency rules, boundaries, layer separation. Both are necessary; clean code alone doesn't make a well-architected system.

**Key insight:** Clean code is written for the human reader first, the computer second. The computer doesn't care about your variable names or function lengths; the next developer (often your future self) does. Treating code as communication between humans is the mindset shift that produces clean code naturally.`,
    },
    {
      id: 603,
      name: "Code Smells",
      desc: `**Code smell** — a surface indication in code that suggests a deeper design problem. Martin Fowler's term (from Refactoring, 1999) for heuristics that signal "something might be wrong here" — not definitively, but as a prompt to investigate. Smells don't cause bugs directly; they indicate structures that are likely to resist change or hide problems.

**Catalog of common smells:**
- **Long Method:** functions that do too many things; hard to name, test, or modify in isolation
- **Large Class:** classes with too many responsibilities; violates Single Responsibility Principle
- **Duplicate Code:** same logic in multiple places; diverges on maintenance
- **Long Parameter List:** 5+ parameters signal a missing abstraction (Parameter Object)
- **Shotgun Surgery:** one change requires modifying many classes simultaneously — concerns are over-distributed
- **Feature Envy:** a method that uses data from another class more than its own — it belongs in that other class
- **Primitive Obsession:** using primitives (strings, integers) where domain objects should exist (Money, PhoneNumber, Email)
- **Divergent Change:** one class changes for many different reasons — it has multiple responsibilities
- **Data Clumps:** groups of data that always appear together should become a class
- **Comments:** when code needs extensive comments to be understandable, it's a smell; refactor to be self-documenting

**Smell ≠ bug:** Code with smells can work correctly. The issue is maintainability — smelly code is harder to change safely and tends to accumulate more bugs over time.

**Key insight:** The most actionable use of the code smell catalog is during code review. Instead of saying "I don't like this" (preference), saying "this is a case of Feature Envy — the method accesses more of X's data than its own" gives the author a specific, documented design pattern to learn from, and grounds the feedback in shared vocabulary rather than personal taste.`,
    },
    {
      id: 604,
      name: "Linting & Static Analysis",
      desc: `**Linting** — automated analysis of source code to flag programming errors, style violations, suspicious constructs, and potentially dangerous patterns — without executing the code. **Static analysis** is broader: includes linting, but also type checking, security scanning, and complexity analysis. Both find classes of bugs that are invisible to runtime testing.

**What each type catches:**
- **Style linting (ESLint, Prettier, Pylint):** unused variables, inconsistent formatting, deprecated API usage, code that technically works but is confusing
- **Type checking (TypeScript, mypy, Flow):** type mismatches, null pointer risks, wrong argument types — entire categories of runtime bugs eliminated at compile time
- **Security scanners (Semgrep, Snyk, Bandit):** hardcoded secrets, SQL injection patterns, insecure crypto usage, known vulnerable dependency versions
- **Complexity analyzers (SonarQube, CodeClimate):** cyclomatic complexity, cognitive complexity, duplication percentages — signals for refactoring targets

**Linting as culture:** The value of linting comes from automation and team agreement. One linter config, enforced in CI, means style decisions are made once and enforced without code review debate. "Why did you use double quotes?" disappears as a review comment when Prettier handles it.

**Fixing lint vs. ignoring:** A codebase with 500 lint suppressions ("// eslint-disable-next-line") has abandoned linting. Suppressions should be rare, explained, and tracked. Allowing easy suppression creates a pressure valve that deflates the tool's value.

**Key insight:** Every lint rule has a cost — developer friction on false positives — and a benefit — bugs caught, style enforced, complexity limited. Review and tune your lint config to maximize signal-to-noise ratio. A toolchain that finds 3 real issues per 100 false warnings will be disabled by developers; one with 95% relevant warnings will be adopted.`,
    },
    {
      id: 605,
      name: "Code Coverage",
      desc: `**Code coverage** — a measurement of how much of the source code is executed when the test suite runs. Expressed as percentages: line coverage (lines executed), branch coverage (conditional branches taken), function coverage (functions called), statement coverage. A coverage report shows what the test suite exercises — not what it thoroughly validates.

**Why coverage is necessary but insufficient:** 100% line coverage can coexist with completely inadequate testing. If every function is called in tests but no assertions are made, coverage is 100% and the test suite catches nothing. Coverage measures quantity of exercise, not quality of assertions.

**Coverage as a minimum bar, not a target:** Requiring 80% coverage prevents obvious gaps (entire modules never tested, main execution paths untested). But chasing 95%+ can lead to testing implementation rather than behavior — tests that make the coverage number go up while not validating correctness. The 20% that's hardest to test is often the 20% most critical to get right.

**Branch coverage over line coverage:** Line coverage misses the "what if this condition were false?" path. Branch coverage is a stronger metric — it requires covering both sides of every conditional. Even stronger: mutation testing (see below).

**Mutation testing:** A technique that introduces deliberate bugs (mutations) into the code and checks whether the test suite detects them. Coverage measures whether the code was executed; mutation testing measures whether the test suite would catch a bug at that line. It's more accurate and more expensive.

**Key insight:** When a team debates "should we require 80% or 90% coverage?" they're asking the wrong question. The right question is "do our tests give us confidence to refactor?" A team that ships new features without fear of regression has effective tests regardless of the coverage percentage. Let confidence drive coverage investment, not the number itself.`,
    },
    {
      id: 606,
      name: "Technical Debt Management",
      desc: `**Technical debt management** — the systematic practice of identifying, tracking, prioritizing, and repaying accumulated design and implementation shortcuts that reduce the codebase's quality and maintainability. Unmanaged, technical debt doesn't stay static — it compounds, as deferred improvements become harder to address as the system grows around them.

**Making debt visible:**
- **Debt register:** a tracked list of known debt items with descriptions, owning teams, estimated impact, and estimated cost to fix
- **Tagging in code:** TODO/FIXME comments with ticket references and dates (not just "fix this later")
- **Quality metrics over time:** test coverage trend, static analysis findings, deploy frequency, mean time to implement a feature — these quantify debt's interest rate

**Prioritizing debt repayment:**
- **Hotspot analysis:** which files are changed most frequently? Debt in frequently-modified files has the highest interest rate — every new change is more expensive.
- **Impact × effort matrix:** high-impact, low-effort debt items first
- **Risk-adjacent debt:** debt in systems responsible for revenue, security, or reliability should be repaid sooner

**Sustainable velocity approach:** Reserve 15-20% of each sprint for technical debt work. Not "cleanup sprints" that are constantly deprioritized by new features — a consistent budget that makes debt reduction a normal, expected activity. This prevents the "we'll fix it in the next sprint" cycle that always ends in "we never fix it."

**Key insight:** The argument for paying technical debt is a business argument, not a technical one. "Our authentication module is spaghetti" doesn't move a product manager. "Adding MFA to our auth module will take 3 weeks because of accumulated debt — it should take 3 days. Here's what we'd need to fix to get there" is a concrete, economic case that product leadership can evaluate.`,
    },
    {
      id: 607,
      name: "Coding Standards & Style Guides",
      desc: `**Coding standards** — team-level agreements about how code should be written: naming conventions, formatting, comment style, error handling patterns, import organization, and other stylistic and structural norms. Style guides document these agreements for onboarding and reference.

**What to standardize (and what not to):**
- **Automate:** formatting (indentation, line length, quote style) — tools like Prettier and Black make this frictionless. Don't debate what Prettier automates.
- **Lint:** naming conventions, unused imports, anti-pattern detection — ESLint/Pylint rules enforced in CI
- **Document:** higher-level patterns that tools can't enforce — how to structure a new module, how to handle errors, when to create abstractions, how to write tests

**Language-specific guides:** Google, Airbnb, PEP 8 (Python), and the Rust Book are well-regarded public style guides. Adopt one as a foundation rather than writing from scratch — most decisions have already been made and debated.

**The consistency principle:** Consistent code is easier to read than "correctly styled" code. A project that uses camelCase consistently is easier to navigate than one that uses camelCase for most things except a few modules that use snake_case. When in doubt, match existing conventions.

**Living style guides:** As tools, patterns, and team norms evolve, style guides must too. A style guide that hasn't been updated in three years is probably enforcing outdated practices. Assign ownership and schedule periodic review.

**Key insight:** Style debates ("tabs vs spaces," "where to put the opening brace") are individually trivial and collectively costly. They consume code review attention that should go to logic, design, and correctness. Automating style decisions is not pedantry — it's redirecting cognitive effort from what tools can do to what only humans can do.`,
    },
    {
      id: 608,
      name: "DORA Metrics",
      desc: `**DORA Metrics** — four key metrics identified by the DevOps Research and Assessment program (Nicole Forsgren, Jez Humble, Gene Kim) that distinguish elite software delivery performance from average and low performers. Validated across thousands of organizations, they're the most evidence-based framework for measuring engineering effectiveness.

**The four metrics:**
1. **Deployment Frequency:** how often does the team deploy to production? Elite: multiple times per day. High: weekly to monthly. Medium/Low: monthly or less.
2. **Lead Time for Changes:** from code committed to code in production. Elite: < 1 hour. High: 1 day to 1 week. Medium: 1 week to 1 month.
3. **Change Failure Rate:** percentage of deployments causing production failures requiring remediation. Elite: 0-15%. High: 16-30%. Medium/Low: 16-45%.
4. **Mean Time to Recovery (MTTR):** how long to recover from a production failure. Elite: < 1 hour. High: < 1 day. Medium: 1 day to 1 week.

**What DORA metrics reveal:** Low deployment frequency and long lead times indicate process bottlenecks (approvals, testing, environments). High change failure rate indicates insufficient automated testing or risky deployment practices. Long MTTR indicates monitoring, on-call, and recovery process gaps.

**Using DORA for improvement (not comparison):** DORA metrics are for tracking a team's own trajectory over time — not for comparing teams or using as performance ratings. Teams with different domains, legacy constraints, and risk profiles will have different baselines.

**Key insight:** The DORA research's most counterintuitive finding: delivery speed and stability are positively correlated in elite teams. Low performers believe "we can either be fast or be stable." Elite teams achieve both — because they've invested in the practices (CI/CD, TDD, trunk-based dev, feature flags) that make fast deployment safe, rather than trading one for the other.`,
    },
    {
      id: 609,
      name: "Code Review Metrics",
      desc: `**Code review metrics** — quantitative signals for the health of a team's code review process, identifying bottlenecks, reviewing thoroughness, and collaboration patterns. Not for evaluating individual developers — for improving team-level review norms.

**Key metrics:**
- **Time to first review:** how long after a PR is opened until the first reviewer engages? >24 hours often signals review queue buildup or unclear assignment.
- **Review cycle time:** from PR creation to merge. Long cycles (days) indicate either large PRs, unclear standards, or review bottlenecks.
- **Review iteration count:** how many round-trips between author and reviewer before approval? Consistently high counts signal unclear requirements, insufficient pre-review by the author, or overly critical reviewers.
- **Comment-to-approval ratio:** very low (rubber stamping) or very high (nitpicking) both signal quality issues.
- **PR size distribution:** large PRs (>500 LOC) correlate with lower review quality, as reviewers lose focus. Most PRs should be <250 LOC.

**PR size and review effectiveness:** Research consistently shows that review effectiveness drops sharply above 200-400 lines of code. Over 500 lines, reviewers typically approve with less scrutiny regardless of what they found.

**Anti-patterns in review metrics:**
- Using review comment counts as a proxy for review quality (more comments ≠ better review)
- Using review speed as a primary metric (fast reviews that catch nothing are useless)
- Tracking individuals rather than team patterns (creates adversarial dynamics)

**Key insight:** If the average PR in your team takes 3 days to merge, the root cause is almost never "reviewers are slow." It's usually: PRs are too large, review assignments are unclear, reviewers have no protected review time in their schedule, or the team doesn't treat review backlog as a shared problem. Fix the system, not the symptom.`,
    },
    {
      id: 610,
      name: "Security in Development (Shift Left)",
      desc: `**Shift Left Security** — the practice of integrating security considerations earlier in the development lifecycle rather than treating security as a final gate before deployment. "Shift left" refers to moving security to the left on the SDLC timeline — to requirements, design, and development rather than pre-production testing.

**Why shifting left works:** A security vulnerability identified in requirements costs virtually nothing to fix (change the spec). Found in design: cheap (revise the design). Found in development: moderate cost. Found in QA: expensive. Found in production: very expensive (incident response, breach costs, remediation, reputation damage). The cost curve is exponential.

**Shift left practices:**
- **Threat modeling in design:** identify what assets need protection, who might attack them, and how — before a line of code is written
- **Secure coding standards:** developers trained to recognize and avoid OWASP Top 10, SQL injection, XSS, CSRF, insecure deserialization
- **SAST (Static Application Security Testing):** automated tools (Semgrep, Checkmarx) integrated into CI to catch security patterns before review
- **Dependency scanning:** automated alerts for known CVEs in dependencies (Dependabot, Snyk)
- **Security unit tests:** tests for authentication bypass, authorization logic, injection paths
- **Developer security training:** annual training on current threat landscape and secure coding

**The DevSecOps cultural shift:** Security can't be a separate team's problem in modern delivery cadences. When deploying 50× per day, there's no time for a security team to review every change. Developers must own security for their code, supported by tooling and training.

**Key insight:** The hardest part of shifting security left is the cultural change, not the tooling. Security teams accustomed to being gatekeepers must transition to enablers — embedding security engineers in development teams, building security tooling into developer workflows, and treating security as a shared responsibility rather than a checkpoint.`,
    },
    {
      id: 611,
      name: "Observability as Quality Practice",
      desc: `**Observability (in engineering quality context)** — the degree to which the internal state of a system can be inferred from its external outputs. High-observability systems make debugging, performance analysis, and quality assessment possible without redeploying code or guessing. Low observability means production problems are invisible until users report them.

**The three pillars:**
- **Metrics:** numeric time-series data — request rate, error rate, latency percentiles, queue depth, resource utilization
- **Logs:** immutable records of discrete events — requests processed, errors encountered, state transitions
- **Traces:** connected records of a request's journey through distributed components — the "flight path" from user action to response

**Observability as a quality attribute:** Systems designed without observability produce low-quality operations — long MTTR, hard-to-reproduce bugs, slow diagnosis. Observability designed in from the start produces systems where the team can confidently ask "what is the system doing right now?" and get a useful answer.

**Instrumentation design:** Observability is not about adding monitoring after the fact. It's about designing systems to emit useful signals — structured logs with correlation IDs, metrics that reflect business meaning (not just "CPU usage" but "payments processed per minute"), traces that span service boundaries. The time to think about "how will we debug this in production?" is during design.

**Cardinality and cost:** High-cardinality dimensions in metrics (user_id, request_id) can cause storage cost explosions in traditional time-series databases. Distributed tracing handles high-cardinality lookups; metrics use lower-cardinality labels. Understanding this prevents both blind spots and runaway costs.

**Key insight:** A system that's hard to observe is a system that's hard to trust. Before deploying a new service or significant feature, ask: "If this breaks at 2am, can an on-call engineer diagnose it without me?" If the answer is no, observability is insufficient. The on-call engineer at 2am is your proxy user for operational quality.`,
    },
  ],
};

export default codeQuality;
