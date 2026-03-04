const qualitySecurity = {
  name: "Quality, Security & Production",
  icon: "🔒",
  color: "#ef4444",
  concepts: [
    {
      id: 1729,
      name: "The Three Quality Gates",
      desc: `**The Three Quality Gates** — the sequential quality checks that every vibe-coded feature must pass before deployment: (1) Vibe Check (does the core flow work?), (2) Objective Check (does the diff pass tests and review?), and (3) Release-Ready (is it documented, monitored, and rollback-able?).

Each gate has a distinct purpose and must be passed in order. The Vibe Check is behavioral — run the app, click through the core user flow, verify the expected outcome. The Objective Check is analytical — read every line of the diff, run the test suite, verify security-sensitive operations. The Release-Ready check is operational — confirm documentation is updated, monitoring is in place, and a rollback path exists. Skipping any gate because the previous gate passed is where production bugs originate.

**Builder tip:** Make each gate a literal checklist item in your PR template. A PR description template that includes "[ ] Vibe check complete," "[ ] Diff reviewed line-by-line," and "[ ] Rollback plan defined" creates team accountability for each gate. Unchecked boxes become explicit conversation items in review.

**Watch out:** Gate inflation — adding so many checks to each gate that the process becomes so slow developers start skipping steps again. Keep each gate to 3-5 specific, binary checks. The goal is a 5-minute quality process, not a 45-minute bureaucracy. Design the checklist to be fast enough to actually use.`,
    },
    {
      id: 1730,
      name: "AI Code Review Mindset",
      desc: `**AI Code Review Mindset** — reviewing AI-generated diffs with the same skepticism applied to a capable but junior developer's code: read every line, question every assumption, verify every dependency, and do not accept output just because it compiles and the tests pass.

The most dangerous thing about AI-generated code is that it looks professional. Indentation is perfect, naming is consistent, the logic flow is readable — but a subtle semantic error lurks in the middle. "Looks like code I would write" is not a quality signal; it is the AI's design goal. Review must focus on correctness, not appearance: does this function handle null inputs correctly? Does this API call handle the error response? Does this database query respect the data access rules?

**Builder tip:** Adopt a structured review checklist for AI diffs: (1) Does every new function handle its error cases? (2) Is every user input validated before use? (3) Does every database query filter by the authenticated user's scope? (4) Are there any hardcoded values that should be environment variables? Running these four checks on every AI diff catches the majority of production bugs.

**Watch out:** Reviewer fatigue is the enemy of AI code review. When diffs are large and reviews are frequent, reviewers start approving without reading. Maintain small diffs, review immediately after generation while context is fresh, and never approve an AI PR you have not actually read.`,
    },
    {
      id: 1731,
      name: "Dependency Auditing",
      desc: `**Dependency Auditing** — the practice of verifying every package or library that AI-generated code introduces, checking that it exists, is maintained, has an acceptable license, has no known critical vulnerabilities, and is necessary for the task.

AI models frequently introduce new dependencies without notifying you — an import appears in the generated code, the build runs, and a new package is installed silently. This is how malicious or unmaintained packages enter codebases. Run "npm audit" or "pip-audit" after every AI-generated change that touches dependency files. Check the GitHub page for any unfamiliar package — star count, last commit date, and open security issues are reliable quality signals.

**Builder tip:** Add dependency auditing to your release checklist as a non-skippable step. The command is "npm audit --audit-level=high" for JavaScript or "pip-audit" for Python. If a new high or critical vulnerability is introduced in a new dependency, do not ship until you have found an alternative or applied a patch.

**Watch out:** The most dangerous AI dependency pattern is hallucinated packages — the AI generates an import for a package name that sounds plausible but does not exist in the registry. In JavaScript, typosquatted package names (packages that are similar to common package names but contain malicious code) are a real attack vector. Always verify that every imported package name is the exact, canonical name of the intended package.`,
    },
    {
      id: 1732,
      name: "Secret Hygiene in Prompts",
      desc: `**Secret Hygiene in Prompts** — the strict practice of never including API keys, database credentials, .env file contents, or other sensitive secrets in AI prompts, regardless of the platform or the urgency of the debugging session.

When you paste a .env file, a config file with credentials, or a database connection string into an AI prompt, that data is sent to the AI provider's servers and logged per their data handling policy. Even if the provider's policy is favorable, the risk is real: prompt logs can be exposed in security breaches, employees at AI companies have access to logs, and some providers use prompt data for model training. Treat AI prompts as public communications — never include anything you would not post publicly.

**Builder tip:** If you need to debug code that involves secrets, replace the real values with obvious placeholders before including in a prompt: "STRIPE_SECRET_KEY=sk_PLACEHOLDER" or "DATABASE_URL=postgresql://user:PASSWORD@host/db." The AI can debug the code logic without knowing the actual values, and you avoid the security risk entirely.

**Watch out:** The pressure to paste real secrets comes from debugging urgency — you are stuck on a problem, the error involves a connection string, and pasting the full config seems like the fastest path to a solution. This is exactly when discipline matters most. Slow down, replace secrets with placeholders, and paste the sanitized version. The 30-second discipline prevents a potential credential exposure.`,
    },
    {
      id: 1733,
      name: "The 1.7x Vulnerability Multiplier",
      desc: `**The 1.7x Vulnerability Multiplier** — the research finding that AI-generated code contains approximately 1.7x more major issues and 2.74x more security vulnerabilities than human-written code, quantifying the security review obligation for any team shipping vibe-coded features.

The multiplier is not an indictment of AI tools — it is a calibration signal. AI generates code efficiently but without the security intuition that experienced developers build through exposure to vulnerabilities, security reviews, and post-mortems. The model optimizes for "does this work" before "is this safe." Understanding the multiplier helps teams right-size their security review investment: AI-generated code requires proportionally more security attention, not less, precisely because it produces more.

**Builder tip:** Apply this heuristic: for every hour of AI-generated code you ship, budget 30 minutes of explicit security review. This is not overhead — it is the acknowledged cost of the AI-assisted development model. Teams that acknowledge this cost and budget for it ship securely; teams that assume AI output is safe ship vulnerabilities.

**Watch out:** The 1.7x figure is a population average — it does not mean every piece of AI code has more vulnerabilities than human code. Simple UI components may have fewer vulnerabilities; authentication flows may have more. Apply security review proportionally to the sensitivity of the code, not uniformly to all AI output.`,
    },
    {
      id: 1734,
      name: "Hallucinated Dependencies",
      desc: `**Hallucinated Dependencies** — the failure mode where an AI model generates import statements or package installations for libraries that do not exist, have different names than used, or have been deprecated — a risk that can introduce build failures, security vulnerabilities, or non-functional code.

Hallucinated dependencies come in three flavors: completely invented package names (no such package exists), correct package concept but wrong npm name (the model knows the functionality but not the exact package name), and outdated packages (the model suggests a package that has been deprecated and replaced). Each requires a different response, but the detection method is the same: verify every new package in the official registry before installing it.

**Builder tip:** Before running "npm install" on a new package the AI suggested, open the npm registry at npmjs.com and search for the exact package name. Verify: it exists, it has recent updates (last published within 6 months is a good baseline), it has a meaningful number of weekly downloads, and it comes from a trusted publisher or organization.

**Watch out:** The most dangerous hallucination variant is a plausible-but-wrong package name that corresponds to a malicious typosquat. The AI suggests "react-hook-form-validator" (does not exist), you install it, and a typosquat with that name installs a crypto miner. Verification against the registry is not optional — it is a security requirement.`,
    },
    {
      id: 1735,
      name: "Performance Validation",
      desc: `**Performance Validation** — the explicit step of profiling and load-testing AI-generated code before shipping it, because AI models optimize for functional correctness rather than performance efficiency, frequently producing O(n²) algorithms, N+1 database queries, and unnecessary re-renders.

AI-generated code passes functional tests but may perform poorly under production load. A search algorithm that works correctly on 100 records may time out on 100,000. A React component that renders correctly may re-render unnecessarily on every state change. A database query that returns correct results may do N+1 queries under the hood. These performance issues are invisible in development and catastrophic in production. Explicit performance validation catches them before they hit users.

**Builder tip:** For any AI-generated database query or data processing function, run it against a representative dataset size before shipping. If your production table has 1M rows, test the query against 1M rows in staging. A query that takes 50ms on 1,000 rows may take 50 seconds on 1M — a finding you need before, not after, deployment.

**Watch out:** Performance issues in AI-generated code often have subtle root causes. An N+1 query is caused by ORM usage patterns that the AI is not aware you are creating; an unnecessary re-render is caused by inline object creation in JSX that the AI treats as idiomatic. Fixing symptoms without understanding root causes produces fragile fixes that break again in the next AI generation session.`,
    },
    {
      id: 1736,
      name: "Licensing of Generated Assets",
      desc: `**Licensing of Generated Assets** — the legal consideration that AI-generated code may reproduce patterns or specific implementations from copyrighted training data, creating intellectual property obligations that require review before commercial use.

AI models are trained on vast corpora of publicly available code, including GPL, AGPL, and MIT-licensed repositories. There is ongoing legal uncertainty about whether AI-generated code that closely mirrors training data carries the license of the original. For commercial products, this uncertainty requires due diligence: review AI-generated code for obvious reproduction of distinctive patterns, avoid shipping AI output for cryptographic algorithms or other highly specific implementations, and understand your AI provider's IP indemnification policy.

**Builder tip:** Check your AI provider's commercial use policy. Anthropic, OpenAI, and Google all have IP indemnification provisions in their commercial tiers — they agree to defend customers against certain IP claims related to AI output. Review the specific terms before relying on this protection, as coverage varies by provider and tier.

**Watch out:** The licensing risk is concentrated in specific domains: implementations of well-known algorithms with distinctive code signatures, UI components that closely mirror specific open-source design systems, and utilities that solve common problems with established, canonical implementations. These are the areas where training data reproduction is most likely and license obligations are most contested.`,
    },
    {
      id: 1737,
      name: "MCP Security Risks",
      desc: `**MCP Security Risks** — the security vulnerabilities in the Model Context Protocol ecosystem, including tool poisoning attacks (malicious MCP servers manipulating agent behavior), data exfiltration via carefully crafted tool responses, and prompt injection through external data sources accessed by MCP tools.

CyberArk's 2025 research documented that MCP has severe vulnerabilities extending beyond the known tool poisoning attack vector. A malicious MCP server can inject instructions into tool responses that alter the agent's subsequent behavior — effectively controlling what code the agent writes, what commands it runs, and what data it accesses. This is particularly dangerous when agents have file system write access and the ability to run shell commands.

**Builder tip:** Only install MCP servers from vendors you explicitly trust — Anthropic's official MCP servers, major platform integrations (GitHub, Slack, Linear), or servers with audited, public source code you have reviewed. Never install an MCP server from an unknown source, a new GitHub repo with no history, or a tool shared informally by another developer.

**Watch out:** The MCP ecosystem is expanding rapidly with community-built servers for every possible tool integration. The convenience of "install this MCP server to connect your agent to X" obscures the security model: you are giving that server the ability to influence your agent's actions. Treat each MCP server installation as you would a browser extension — with appropriate skepticism about what access you are granting.`,
    },
    {
      id: 1738,
      name: "Testing Strategy for Vibe Code",
      desc: `**Testing Strategy for Vibe Code** — writing tests before or alongside AI code generation, using tests as executable acceptance criteria that definitively answer whether generated code is correct, rather than relying on visual inspection alone.

Tests are the highest-value quality tool in a vibe coding workflow — precisely because you did not write the code yourself and cannot rely on the implementation intuition that comes from having authored every line. A failing test is unambiguous: the code is wrong. A passing test, combined with a visual vibe check, provides strong evidence of correctness. Writing tests first (or alongside generation) also improves the generation itself — you can include the test in the prompt and ask the AI to generate code that passes it.

**Builder tip:** For business logic functions, write the test first: "Here is a test for the function I want you to implement: [test code]. Write a function that passes this test." The AI produces code calibrated to your specific acceptance criteria rather than its interpretation of your prose description. This dramatically reduces iterations on logic correctness.

**Watch out:** AI-generated tests are not a substitute for human-written tests. AI will write tests that confirm the behavior of its own generated implementation — which may not match your actual requirements. Test generation is valuable for boilerplate (type tests, snapshot tests) but human authorship is essential for tests that verify business requirements.`,
    },
    {
      id: 1739,
      name: "Synthetic Monitoring for AI Features",
      desc: `**Synthetic Monitoring for AI Features** — running automated tests against production endpoints and user flows on a scheduled basis, providing continuous visibility into whether AI-generated features behave correctly under real production conditions.

AI-generated code can pass all tests in staging and behave unexpectedly in production — different environment variables, real data edge cases, race conditions under production load, and third-party API behavior that differs from mocked responses in tests. Synthetic monitoring catches these post-deployment: automated scripts run the critical user flows every 5 minutes against production, alerting immediately if behavior changes. For vibe-coded features where you have less implementation intuition, this continuous validation is especially valuable.

**Builder tip:** Set up synthetic monitors for every core user flow in your app using a tool like Checkly, Playwright Test Cloud, or Datadog Synthetics. The monitors for flows that use AI-generated code should run at higher frequency (every 5 minutes) and with more assertion detail than flows you wrote by hand, reflecting the higher uncertainty about edge case behavior.

**Watch out:** Synthetic monitors only catch what you explicitly test. A monitor that verifies "the login button works" will not catch a subtle data processing error that affects a specific subset of users. Design monitors around observable business outcomes ("user can complete checkout and receives confirmation email") rather than technical implementation details.`,
    },
    {
      id: 1740,
      name: "Rollback Infrastructure",
      desc: `**Rollback Infrastructure** — the technical mechanisms and operational processes that allow immediate reversion of deployed AI-generated features when production issues are detected, without downtime or data loss: feature flags, blue-green deployments, and database migration versioning.

Rollback infrastructure is especially critical for AI-generated code because the source of unexpected behavior may not be immediately diagnosable. Rather than scrambling to debug production with users affected, a rollback restores the previous state in seconds while debugging happens offline. Feature flags allow disabling specific features without redeployment. Blue-green deployments allow routing traffic back to the previous version instantly. Database migration versioning allows reverting schema changes if a migration causes data issues.

**Builder tip:** Adopt feature flags (LaunchDarkly, Unleash, or simple environment variables) for every significant AI-generated feature before it reaches production. The flag costs 5 minutes to add and provides an instant kill switch if the feature causes production issues. This is the single most valuable rollback mechanism for rapidly deployed vibe-coded features.

**Watch out:** Rollback infrastructure is useless if it is not tested. Run rollback drills regularly — actually revert a feature flag, actually switch your blue-green deployment, actually run a database rollback migration in staging. An untested rollback mechanism may fail exactly when you need it most: during a production incident when the pressure is highest.`,
    },
  ],
};

export default qualitySecurity;
