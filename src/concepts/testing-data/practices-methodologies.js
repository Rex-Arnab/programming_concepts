const practicesMethodologies = {
  name: "Practices & Methodologies",
  icon: "✦",
  color: "#F472B6",
  concepts: [
    { id: 163, name: "Agile Testing", desc: "Testing embedded throughout agile sprints, not a separate phase. Whole-team responsibility. Continuous feedback, adaptive planning, iterative testing." },
    { id: 164, name: "Agile Testing Quadrants", desc: "Q1: Technology-facing, guide dev (unit, component). Q2: Business-facing, guide dev (functional, story). Q3: Business-facing, critique (exploratory, usability). Q4: Technology-facing, critique (performance, security)." },
    { id: 165, name: "Test Estimation", desc: "Estimating test effort: function points, test point analysis, use case points, experience-based. Factor in complexity, risk, coverage goals, and automation." },
    { id: 166, name: "Test Automation ROI", desc: "Calculating return on automation investment. Manual cost × runs saved vs automation build + maintenance cost. Breakeven typically at 5–15 runs." },
    { id: 167, name: "Testing Debt", desc: "Accumulated shortcuts in testing: missing tests, ignored flaky tests, outdated test data, poor coverage. Like tech debt — grows if not addressed." },
    { id: 168, name: "Crowdsourced Testing", desc: "Distributing testing to a large pool of external testers worldwide. Real devices, diverse environments, fresh perspectives. Rainforest QA, Testlio, Applause." },
    { id: 169, name: "Test Maturity Model (TMM)", desc: "Framework assessing organizational testing capability across levels. From ad-hoc (Level 1) to optimization (Level 5). Guides improvement roadmap." },
    { id: 170, name: "Left Shift of Responsibility", desc: "Developers own quality, not just QA. Devs write unit+integration tests, review test plans, participate in exploratory sessions. QA coaches and enables." },
    { id: 171, name: "Testing in Production (TiP)", desc: "Deliberately validating software in the live environment. Feature flags, monitoring, synthetic checks, canary analysis. Not the same as 'no testing'." },
    { id: 172, name: "Property-Based Testing", desc: "Define properties that should always hold (e.g., sort(list) has same length), then the framework generates random inputs. fast-check (JS), Hypothesis (Python), QuickCheck." },
    { id: 173, name: "Golden File / Approval Testing", desc: "Comparing output against a pre-approved 'golden' file. Any diff fails the test. Useful for complex outputs: HTML, reports, serialization. ApprovalTests library." },
    { id: 174, name: "Regression Test Selection & Prioritization", desc: "Intelligently choosing which regression tests to run and in what order. Risk-based, change-based, history-based. Run high-value tests first." },
    { id: 175, name: "Testing Anti-Patterns", desc: "Ice cream cone (inverted pyramid), testing implementation not behavior, slow suites, shared mutable state, sleeping instead of waiting, testing third-party code." },
  ],
};
export default practicesMethodologies;
