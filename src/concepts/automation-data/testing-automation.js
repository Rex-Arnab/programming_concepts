const testingAutomation = {
  name: "Test Automation",
  icon: "🧪",
  color: "#EF4444",
  concepts: [
    {
      id: 278,
      name: "Test Data Generation",
      desc: `**Test data generation** — the automated creation of realistic, varied, and valid test data for use in automated test suites, eliminating the maintenance burden of hand-crafted test fixtures.

**Why test data generation matters:** Hand-crafted test data has two failure modes: too minimal (misses edge cases) and too static (becomes stale as the system evolves). Generated test data can cover the full space of valid inputs systematically.

**Faker libraries — realistic dummy data:**
\`\`\`python
from faker import Faker
import factory

fake = Faker()

# Generate individual fake data
user = {
    'name': fake.name(),                    # "John Smith"
    'email': fake.email(),                  # "john@example.com"
    'phone': fake.phone_number(),           # "+1-555-555-5555"
    'address': fake.address(),              # "123 Main St, City, ST 12345"
    'company': fake.company(),             # "Smith & Associates"
    'date_of_birth': fake.date_of_birth(minimum_age=18, maximum_age=90),
}

# Factory Boy — Django/SQLAlchemy model factories
class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User
    name = factory.Faker('name')
    email = factory.LazyAttribute(lambda o: f"{o.name.lower().replace(' ', '.')}@example.com")
    created_at = factory.Faker('date_time_this_year')

# Generate 100 test users
users = UserFactory.create_batch(100)
\`\`\`

**Property-based testing (Hypothesis):** Instead of example-based tests, define the PROPERTIES that should hold for any valid input — let the library generate hundreds of test cases automatically.
\`\`\`python
from hypothesis import given, strategies as st

@given(st.integers(min_value=1, max_value=1000))
def test_discount_never_exceeds_price(price):
    discount = calculate_discount(price)
    assert discount <= price  # This property must hold for ALL inputs
\`\`\`

**Database seeding:** Populate test databases with realistic volumes of data to catch performance issues invisible with minimal data. A query that runs in 50ms on 100 records may take 15 seconds on 1 million records.

**Key insight:** Test data is a testing asset that needs the same care as test code. Version-control your factories and seed scripts. A test suite that works with one schema version but breaks when someone adds a required field is a test suite with a fragile data strategy.`,
    },
    {
      id: 279,
      name: "API Testing Automation",
      desc: `**API testing automation** — running automated test suites against REST/GraphQL/gRPC APIs to verify correctness, contract compliance, performance, and security across development environments and on every code change.

**Postman/Newman — the CI/CD pipeline:**
\`\`\`bash
# Run Postman collection in CI
newman run api-tests.postman_collection.json \\
  --environment staging.postman_environment.json \\
  --reporters cli,junit \\
  --reporter-junit-export results.xml \\
  --bail  # Stop on first failure
\`\`\`

**pytest + requests — code-based API tests:**
\`\`\`python
import pytest
import requests

BASE_URL = "https://api.example.com/v1"

@pytest.fixture
def auth_headers(api_key):
    return {"Authorization": f"Bearer {api_key}"}

def test_create_order(auth_headers):
    payload = {"product_id": "prod_123", "quantity": 2}
    response = requests.post(f"{BASE_URL}/orders", json=payload, headers=auth_headers)

    assert response.status_code == 201
    data = response.json()
    assert "id" in data
    assert data["status"] == "pending"
    assert data["quantity"] == 2

def test_create_order_validates_quantity(auth_headers):
    response = requests.post(f"{BASE_URL}/orders",
        json={"product_id": "prod_123", "quantity": -1},
        headers=auth_headers)
    assert response.status_code == 422
    assert "quantity" in response.json()["errors"]

def test_get_nonexistent_order(auth_headers):
    response = requests.get(f"{BASE_URL}/orders/nonexistent", headers=auth_headers)
    assert response.status_code == 404
\`\`\`

**API test coverage checklist:**
- Happy path (valid inputs → expected response)
- Input validation (invalid data → appropriate 4xx)
- Authentication (missing/invalid token → 401/403)
- Authorization (valid token, insufficient permissions → 403)
- Edge cases (empty lists, maximum values, special characters)
- Error responses (are errors consistent, informative, and not leaking internals?)

**Contract testing vs. integration testing:** Contract tests verify the API's schema/contract without needing a running backend. Integration tests verify behavior with a real running system. Both serve different purposes.

**Key insight:** Test the error paths as rigorously as the happy path. Production systems spend 90% of their time on the happy path; bugs live in the error paths. An API that returns \`500 Internal Server Error\` with a stack trace on invalid input is both incorrect and a security vulnerability.`,
    },
    {
      id: 280,
      name: "Contract Testing (Pact)",
      desc: `**Contract testing** — verifying that a service and its consumers agree on the API interface without requiring both systems to be running simultaneously. The middle ground between unit tests (too isolated) and integration tests (too coupled).

**The consumer-driven contract model:** Instead of the provider defining the API and consumers adapting, consumers define what they need (the contract) and providers verify they fulfill it. This prevents providers from breaking consumers when making changes.

**How Pact works:**
1. Consumer team writes tests that generate a pact (contract) file — a JSON document describing expected interactions
2. Pact file is published to a Pact Broker (shared registry)
3. Provider team runs their tests against the pact file to verify they fulfill the contract
4. Both teams can deploy independently — providers only break contracts when they fail to verify

**Consumer side (Python):**
\`\`\`python
from pact import Consumer, Provider

pact = Consumer('OrderService').has_pact_with(Provider('UserService'))

def test_get_user():
    (pact
        .given('User 123 exists')
        .upon_receiving('a request for user 123')
        .with_request('GET', '/users/123')
        .will_respond_with(200, body={
            'id': 123,
            'name': 'John Smith',
            'email': 'john@example.com'
        }))

    with pact:
        result = user_service_client.get_user(123)
        assert result.name == 'John Smith'

pact.publish_to_broker('https://pact-broker.example.com')
\`\`\`

**Provider verification:**
\`\`\`python
# Provider verifies it fulfills the consumer's contract
pytest --provider "UserService" \\
    --pact-broker-url "https://pact-broker.example.com" \\
    --provider-base-url "http://localhost:8000"
\`\`\`

**Key insight:** Contract testing solves the microservices integration testing problem. Without contracts, teams either maintain expensive end-to-end test environments (slow, costly) or skip integration validation entirely (risky). Contract tests give confidence that services are compatible without requiring both services to run simultaneously.`,
    },
    {
      id: 281,
      name: "Visual Regression (Percy, Chromatic)",
      desc: `**Visual regression testing tools** — cloud platforms for automated visual comparison of UI screenshots, detecting unintended visual changes before they reach production users.

**The visual regression workflow:**
1. Tests run in CI and capture screenshots
2. Screenshots are uploaded to the cloud platform
3. Platform compares new screenshots against approved baselines
4. Detected differences are presented for human review
5. Engineer approves intended changes (new baseline) or rejects regressions (fix the code)

**Percy (by BrowserStack):**
\`\`\`bash
npm install --save-dev @percy/cli @percy/playwright

# Capture Percy snapshots in Playwright tests
import { percySnapshot } from '@percy/playwright';

test('product page visual', async ({ page }) => {
    await page.goto('/products/widget-pro');
    await percySnapshot(page, 'Product Page - Desktop');

    await page.setViewportSize({ width: 375, height: 812 });
    await percySnapshot(page, 'Product Page - Mobile');
});

# CI execution
npx percy exec -- npx playwright test
\`\`\`

**Chromatic (Storybook integration):**
\`\`\`bash
# Each Storybook story becomes a visual test
npx chromatic --project-token <token>
# → Uploads all stories, compares with baseline, flags changes
\`\`\`

**Chromatic vs. Percy comparison:**
- **Chromatic:** Component-level (Storybook stories). Best for design systems and component libraries.
- **Percy:** Page-level (full page screenshots, any test framework). Best for full-page visual regression.
- **Applitools:** AI-powered diff (ignores rendering noise, anti-aliasing). Best for cross-browser comparison.

**Handling rendering noise:** Screenshots differ between platforms due to anti-aliasing, font rendering, and GPU differences. Cloud platforms solve this by rendering in a consistent environment. For self-hosted solutions, normalize the rendering environment (same OS, same browser version, same GPU flags).

**Key insight:** Visual regression tests are only valuable if the review process is fast. If reviewing visual diffs takes longer than fixing CSS bugs manually, the workflow breaks down. Choose platforms with efficient review UIs (batch approve, diff highlighting, mobile/desktop toggle) and build the review into your PR process.`,
    },
    {
      id: 282,
      name: "Synthetic Monitoring",
      desc: `**Synthetic monitoring** — continuously running scripted user journeys against production systems to proactively detect availability and performance issues before real users encounter them.

**Core mental model:** Synthetic monitoring is like having a robot user that executes your most critical user flows every few minutes from multiple geographic locations and alerts you when something breaks. You find out about the checkout being broken at 3am from a monitor, not from angry customers at 9am.

**What synthetic monitoring tests:**
- Login → dashboard → perform action → verify result
- Search → filter → product page → add to cart → checkout flow
- API health check → response time within threshold → expected data format
- Critical third-party integrations (payment processor, auth provider)

**Tools:**
- **Datadog Synthetics:** Browser tests (Selenium-based recordings) and API tests; integrates with Datadog monitoring
- **New Relic Synthetics:** Similar capability set; strong APM integration
- **Checkly:** Code-based synthetic monitoring using Playwright tests; developer-first; open-source local runner
- **Grafana k6 + cloud:** Combine load testing and synthetic monitoring

**Checkly example:**
\`\`\`javascript
// checkly.config.ts — runs this Playwright test every 5 minutes from 3 regions
import { BrowserCheck } from '@checkly/cli/constructs'

new BrowserCheck('checkout-flow', {
    name: 'Checkout Flow',
    frequency: 5,  // Every 5 minutes
    locations: ['us-east-1', 'eu-west-1', 'ap-southeast-1'],
    code: {
        entrypoint: './tests/checkout.spec.ts'
    }
})
\`\`\`

**Alert on:** Response time exceeding SLA (P95 > 2 seconds), availability below threshold (< 99.9%), specific element missing from the page, API returning unexpected status code.

**Key insight:** Run synthetic monitors from the same regions as your users, not just your infrastructure region. A checkout flow that works in us-east-1 but times out for European users due to CDN misconfiguration won't be caught by a single-region monitor.`,
    },
    {
      id: 283,
      name: "Chaos Engineering Automation",
      desc: `**Chaos engineering** — the practice of deliberately injecting failures into production systems to discover resilience weaknesses before they cause unplanned outages — "breaking things on purpose to prevent things from breaking by accident."

**The chaos engineering hypothesis model:**
1. Define "steady state" — measurable normal behavior (error rate < 0.1%, P95 latency < 200ms)
2. Hypothesize the system will maintain steady state when X failure occurs
3. Inject the failure in a controlled way (start small, minimize blast radius)
4. Observe whether the system maintains steady state
5. If not, you've found a resilience gap — fix it

**Common failure types to inject:**
- **Network:** Latency injection (add 100ms to all calls to Service A), packet loss, network partition between services
- **Resource:** CPU saturation, memory pressure, disk full, file descriptor exhaustion
- **Application:** Kill random instances, crash specific processes, introduce slow responses
- **Dependency:** Service unavailable (502/503), degraded response times, incorrect responses

**Tools:**
- **AWS Fault Injection Service (FIS):** Inject EC2 failures, EKS pod terminations, RDS failovers, network latency — directly integrated with AWS resources
- **Chaos Monkey (Netflix):** Randomly terminates EC2 instances in production — the original chaos engineering tool
- **Gremlin:** Commercial chaos-as-a-service platform with a library of attacks and impact monitoring
- **Litmus (CNCF):** Kubernetes-native chaos engineering with operator-based chaos experiments

**GameDay — planned chaos:** Schedule a "GameDay" where the team deliberately triggers a major failure (regional failover, database failover) and observes the system's response. Reveals operational gaps that automated chaos can't find (runbook accuracy, alert routing, on-call response time).

**Key insight:** Start chaos engineering in staging, not production. Graduate to production only after you've built confidence in your system's resilience and have monitoring in place to detect when chaos experiments cause real issues. The goal is to discover weaknesses safely — not to create real incidents.`,
    },
    {
      id: 284,
      name: "Mutation Testing",
      desc: `**Mutation testing** — evaluating the quality of a test suite by introducing small code changes (mutations) and checking whether the tests detect them. If a mutation survives (tests still pass), the test suite has a gap.

**The insight:** Code coverage metrics (line coverage, branch coverage) tell you which code was executed during tests, not whether the tests actually verify the code's behavior. 100% line coverage can coexist with a useless test suite that makes no assertions. Mutation testing measures assertion quality.

**How it works:**
1. Take the source code
2. Create "mutants" — modified versions with small changes (change \`>\` to \`>=\`, \`+\` to \`-\`, return \`true\` instead of \`false\`)
3. Run the test suite against each mutant
4. If tests fail for a mutant: the mutant was "killed" (good — the test detected the change)
5. If tests pass for a mutant: the mutant "survived" (bad — the test suite can't detect this type of error)

**Mutation score = killed mutants / total mutants**

A mutation score of 85%+ is generally considered good; below 60% indicates significant test suite weaknesses.

**Python - mutmut:**
\`\`\`bash
pip install mutmut
mutmut run --paths-to-mutate src/payment.py
mutmut results
# → Survived mutations show where tests are missing assertions

mutmut show 23  # Show what mutation #23 looks like
# - if total > 0:
# + if total >= 0:    # This mutation survived — tests don't check the boundary!
\`\`\`

**Java - PIT (Pitest):**
\`\`\`bash
mvn org.pitest:pitest-maven:mutationCoverage
# → HTML report showing survived mutations by class/method
\`\`\`

**Where mutation testing is most valuable:** Core business logic — calculation functions, validation rules, state transitions — where incorrect behavior has high impact. Less valuable for infrastructure glue code (logging, configuration reading).

**Key insight:** Mutation testing is not a replacement for code coverage — it's a complement. High mutation score with low coverage means the tested code is well-tested but coverage gaps exist. Low mutation score with high coverage means tests are superficial — they run the code but don't verify its behavior.`,
    },
    {
      id: 285,
      name: "Test Parallelization",
      desc: `**Test parallelization** — running multiple tests simultaneously across CPU cores, machines, or cloud infrastructure to reduce the total time required to execute a test suite.

**Why test speed matters:** A test suite that takes 45 minutes to run creates 45-minute feedback loops. Developers don't run slow tests locally; slow tests become a bottleneck in CI/CD. The faster the tests, the more often they run — and the faster bugs are found.

**Types of parallelization:**

**Process-level parallelism (single machine):**
\`\`\`bash
# pytest-xdist — distribute tests across CPU cores
pip install pytest-xdist
pytest -n auto  # Use all available CPU cores
pytest -n 4     # Use exactly 4 workers

# Jest — parallel by default across CPU cores
jest --maxWorkers=4
\`\`\`

**Test sharding (distributed across machines):**
\`\`\`bash
# GitHub Actions — run tests in parallel across matrix jobs
jobs:
  test:
    strategy:
      matrix:
        shard: [1, 2, 3, 4]
    steps:
      - run: pytest --shard-id=\${{ matrix.shard }} --num-shards=4

# Playwright test sharding
npx playwright test --shard=1/4  # Run first quarter of tests
\`\`\`

**Parallel test isolation requirements:**
- **No shared state:** Tests must not share database records, files, or in-memory state
- **Independent databases:** Each test worker should use its own database (or transaction rollback)
- **Port conflicts:** Services started by tests must use random or worker-specific ports

**Database isolation strategies:**
- **Transaction rollback:** Wrap each test in a transaction; roll back after. Fast but limited (can't test code that commits).
- **Truncate between tests:** Delete and repopulate test data before each test. Slow but reliable.
- **Separate databases per worker:** Highest isolation; requires multiple database instances.

**Playwright sharding + reporting:**
\`\`\`bash
# Run 4 shards in CI, merge results
npx playwright test --shard=1/4 --reporter=blob
npx playwright merge-reports ./blob-report  # Combine all shards' results
\`\`\`

**Key insight:** Test suite time often follows the Pareto principle: 20% of tests take 80% of the time. Profile your test suite before parallelizing — identify and fix the slow outliers first. A test that takes 30 seconds might be testable in 300ms with proper mocking.`,
    },
  ],
};
export default testingAutomation;
