const cicdDevopsTesting = {
  name: "CI/CD & DevOps Testing",
  icon: "⛉",
  color: "#D946EF",
  concepts: [
    { id: 151, name: "Testing in CI/CD Pipelines", desc: "Automated tests as pipeline gates: lint → unit → integration → security → E2E → deploy. Tests must be fast, reliable, and deterministic." },
    { id: 152, name: "Shift-Left Testing", desc: "Moving testing earlier in the development lifecycle. Write tests during design, not after coding. Static analysis, pair programming, TDD. Prevention over detection." },
    { id: 153, name: "Shift-Right Testing", desc: "Testing in production: canary deploys, synthetic monitoring, feature flags, observability. Complements shift-left with real-world validation." },
    { id: 154, name: "Test-Driven Development (TDD)", desc: "Write a failing test first → write minimum code to pass → refactor. Red-Green-Refactor cycle. Tests drive the design. Ensures high coverage by default." },
    { id: 155, name: "Behavior-Driven Development (BDD)", desc: "Writing tests in natural language: Given-When-Then. Bridges devs, QA, and business. Cucumber, SpecFlow, Behave. Living documentation from executable specs." },
    { id: 156, name: "Acceptance Test-Driven Development (ATDD)", desc: "Collaborative approach where acceptance criteria become automated tests before development begins. Devs, QA, and PO define tests together upfront." },
    { id: 157, name: "Continuous Testing", desc: "Testing at every stage of the CI/CD pipeline, not just at the end. Pre-commit hooks, PR checks, post-deploy verification. Feedback in minutes, not days." },
    { id: 158, name: "Test Impact Analysis", desc: "Running only the tests affected by code changes instead of the entire suite. Dramatically speeds up CI. Language-specific tools: Jest --changedSince, Launchable." },
    { id: 159, name: "Test Containerization", desc: "Running tests inside containers for consistent environments. Testcontainers spins up real databases, message brokers, etc. in Docker for integration tests." },
    { id: 160, name: "Pre-commit Hooks & Linting", desc: "Automated checks before code is committed: linting (ESLint, Ruff), formatting (Prettier, Black), type checking, secret scanning. Husky, pre-commit framework." },
    { id: 161, name: "Quality Gates", desc: "Automated checkpoints in CI/CD that block progression if quality standards aren't met. Coverage thresholds, zero critical bugs, security scan pass." },
    { id: 162, name: "Synthetic Monitoring", desc: "Simulated user transactions running continuously in production. Scripted browser checks, API pings, multi-step flows. Catches issues before real users do." },
  ],
};
export default cicdDevopsTesting;
