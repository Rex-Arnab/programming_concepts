const testing = {
  name: "Testing",
  icon: "⟐",
  color: "#B5E48C",
  concepts: [
    { id: 121, name: "Testing Pyramid", desc: "Many unit tests (fast, cheap), fewer integration tests, fewest E2E tests (slow, expensive). Invert and you get slow, flaky pipelines." },
    { id: 122, name: "Unit Testing", desc: "Testing individual functions/methods in isolation. Fast, deterministic. Mocking external dependencies. Jest, pytest, JUnit, Vitest." },
    { id: 123, name: "Integration Testing", desc: "Testing how components work together. Database queries, API calls, service interactions. Slower but catches interface issues." },
    { id: 124, name: "End-to-End (E2E) Testing", desc: "Simulating real user workflows through the full stack. Cypress, Playwright, Selenium. Slow and brittle but catches real-world bugs." },
    { id: 125, name: "Contract Testing", desc: "Verifying API contracts between services. Consumer-driven contracts ensure changes don't break consumers. Pact is the standard tool." },
    { id: 126, name: "Load / Performance Testing", desc: "Simulating high traffic to find bottlenecks and breaking points. k6, Locust, Gatling, JMeter. Test before production, not in production." },
    { id: 127, name: "Chaos Engineering", desc: "Intentionally injecting failures to test resilience. Kill pods, inject latency, simulate AZ failure. Netflix Chaos Monkey, Litmus, Gremlin." },
    { id: 128, name: "Smoke Testing", desc: "Quick sanity check after deployment. Verify critical paths work (login, homepage, API health). First gate before broader testing." },
    { id: 129, name: "Canary Analysis (Automated)", desc: "Automatically comparing canary metrics against baseline. Kayenta, Flagger. Promotes or rolls back canary without human intervention." },
    { id: 130, name: "Test Data Management", desc: "Creating, maintaining, and cleaning test data. Fixtures, factories, database seeding. Anonymized production data for realistic testing." },
    { id: 131, name: "Shift-Right Testing", desc: "Testing in production: feature flags, observability, synthetic monitoring, canary deploys. Complements shift-left with real-world validation." },
  ],
};
export default testing;
