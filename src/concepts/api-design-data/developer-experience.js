const developerExperience = {
  name: "Documentation & Developer Experience",
  icon: "📚",
  color: "#8b5cf6",
  concepts: [
    {
      id: 1297,
      name: "API Documentation",
      desc: `**API Documentation** — the complete reference that enables developers to understand, integrate with, and use your API correctly. Documentation quality is a primary driver of API adoption — developers evaluate APIs by their docs before writing a single line of integration code.

**Documentation components:**
- **Getting started guide:** "working call in 5 minutes" — authentication, first request, response handling. The fastest path from zero to working integration.
- **Authentication guide:** how to get credentials, how to send them, token refresh, security best practices
- **API reference:** every endpoint, request parameters, response fields, error codes. Generated from OpenAPI spec (Redoc, Swagger UI) for consistency.
- **Tutorials:** task-oriented guides for common use cases ("How to accept a payment", "How to send an email")
- **Code examples:** in every major language (Node.js, Python, Ruby, PHP, Java, Go). Curl examples for quick testing.
- **Changelog:** dated list of API changes; especially breaking changes with migration guides
- **SDK reference:** language-specific documentation for official client libraries

**Documentation principles:**
- Start with working examples — code first, explanation second
- Include error examples alongside success examples
- Explain "why" alongside "what" (why this field is required, why this flow is used)
- Keep documentation in sync with the API — auto-generate from OpenAPI spec where possible

**Tooling:** Redoc (clean, responsive), Swagger UI (interactive, try it in-browser), ReadMe.io (developer portal with usage metrics), Mintlify, Docusaurus.

**Key insight:** Stripe's documentation is the gold standard and their most powerful growth tool. Developers choose Stripe over competitors partly because of documentation quality. If integrating your API takes 4 hours instead of 30 minutes, you lose developers to the competitor with better docs. Documentation is product.`,
    },
    {
      id: 1298,
      name: "API SDKs & Client Libraries",
      desc: `**API SDKs (Software Development Kits)** — language-specific client libraries that abstract HTTP calls, authentication, error handling, and retry logic into idiomatic language constructs. SDKs dramatically reduce integration time and error rate.

**Benefits for API consumers:**
- No HTTP boilerplate: "const charge = await stripe.charges.create({ amount: 2000, currency: 'usd', source: token })" vs. raw fetch with auth headers, JSON serialization, error handling
- Type safety: TypeScript types prevent passing wrong parameter types; IDE autocomplete reduces docs consultation
- Built-in retry logic: exponential backoff on 429/503 responses
- Consistent error handling: SDK wraps HTTP errors in language-specific exception types
- Versioning: SDK version pins the API version; easy upgrade path

**SDK generation:** generate SDKs from OpenAPI spec using:
- **openapi-generator-cli:** generates SDK in 40+ languages from OpenAPI spec
- **Fern:** modern SDK generator with idiomatic language output and automatic publishing
- **Speakeasy:** enterprise SDK generation with quality optimizations

**What hand-crafted SDKs add over generated ones:** better ergonomics, smarter retry logic, pagination helpers, streaming support, business-domain naming conventions. Stripe hand-crafts their SDKs; the code quality shows.

**Official SDK maintenance:** commit to maintaining official SDKs for the top 4-5 languages your users use (typically: Node.js/TypeScript, Python, Ruby, PHP, Java/Kotlin, Go). Each requires: automated testing, version publishing to package registries, changelog, migration guides.

**SDK versioning:** follow SemPatch (major.minor.patch). Major version = breaking SDK change (not necessarily API change). Pin SDK version in generated SDKs to an API version.

**Key insight:** An SDK converts your API from a protocol specification into a product. The ROI is clear: Stripe's Node.js SDK has 4M weekly npm downloads. Those developers aren't writing raw HTTP calls — they're using the SDK. Time to first successful API call drops from 2 hours (raw HTTP) to 15 minutes (SDK). Ship SDKs for your top languages on day one.`,
    },
    {
      id: 1299,
      name: "API Sandbox & Testing Environments",
      desc: `**API Sandbox & Testing Environments** — dedicated environments where developers can test integrations against real API behavior without affecting production data or triggering real-world side effects (charging real money, sending real emails, making real calls).

**Sandbox patterns:**

**1. Separate environment with test credentials:** "sk_test_..." vs "sk_live_..." — different API keys route to different infrastructure. Stripe's model: test mode has full API parity but uses Stripe's test card numbers (4242 4242 4242 4242 for success).

**2. Shared staging environment:** single staging API shared by all developers. Risk: data pollution (dev A's test orders affect dev B's tests). Mitigation: namespace test data by developer/org.

**3. Mock server (generated from spec):** Prism, WireMock, or Mockoon serve responses from your OpenAPI spec or manually defined stubs. Fast, isolated, deterministic — but doesn't test real business logic.

**Sandbox test fixtures:** provide pre-built test data: "test_user_with_subscription_123", "test_order_in_pending_state_456". Developers import fixtures and immediately test edge cases without building data setup.

**Triggering edge cases:** provide API endpoints or special test values to trigger specific scenarios: Stripe's "4000 0000 0000 9995" card simulates insufficient funds; "4000 0025 0000 3155" simulates 3D Secure authentication required.

**Sandbox data reset:** allow developers to reset their sandbox to a clean state — essential for automated testing that needs a predictable starting state.

**Key insight:** A sandbox with 100% API parity is a competitive advantage. If developers can test every edge case (payment failures, webhook retries, rate limiting) in sandbox without coordinating with your support team, they integrate faster and ship more confidently. Sandbox investment pays back in developer trust and reduced integration support burden.`,
    },
    {
      id: 1300,
      name: "API Changelog & Deprecation",
      desc: `**API Changelog & Deprecation** — the practices for communicating API changes to developers and managing the retirement of old API versions without breaking integrations.

**Changelog best practices:**
- **Date-ordered:** most recent changes at the top
- **Categorized:** Breaking Changes (red), New Features (green), Improvements (blue), Bug Fixes
- **Actionable:** for breaking changes, include migration steps, code before/after examples
- **Versioned:** tie changelog entries to API versions
- **Discoverable:** linked from the API reference, SDK release notes, and email newsletters

**Breaking change communication timeline:**
1. Announce deprecation with sunset date (at least 6 months; 12+ months preferred)
2. Add "Deprecation" and "Sunset" HTTP headers to deprecated endpoints
3. Email developers who have called the deprecated endpoint in the last 90 days
4. Add warnings in SDK release notes and documentation
5. Monitor usage of deprecated endpoints — proactively reach out to high-usage clients
6. Sunset: turn off the endpoint; return 410 Gone

**"Deprecation" and "Sunset" headers (RFC 8594):**
"Deprecation: Tue, 01 Jan 2026 00:00:00 GMT
Sunset: Sun, 01 Jan 2028 00:00:00 GMT"

These headers signal to clients (and API gateway monitors) that the endpoint is deprecated. Tools like "libopenapi" and "openapi-enforcer" can alert on deprecated endpoint usage in CI.

**Version sunset strategy:** maintain v1 while v2 exists. Sunset v1 only after usage drops below a threshold or after the committed sunset date. Stranding users on deprecated versions is an API governance failure.

**Key insight:** The deprecation period is your API's accountability window. "We'll sunset this in 30 days" is unreasonable — enterprise customers have change control processes, testing cycles, and approval chains. Six months minimum; twelve months for APIs with significant enterprise adoption. Stripe still supports API versions from 2015. That longevity is why enterprises trust Stripe.`,
    },
    {
      id: 1301,
      name: "API Developer Portal",
      desc: `**API Developer Portal** — the self-service web portal where developers discover, evaluate, authenticate against, and manage their use of your API. The developer portal is the "storefront" of your API product.

**Core portal components:**
- **Interactive documentation:** Swagger UI / Redoc with "Try it" capabilities; developers run real API calls from the browser
- **Getting started guides:** step-by-step tutorials for common use cases
- **API key management:** create/view/rotate/revoke API keys; set scopes; view usage per key
- **Usage dashboard:** requests/day graph, error rate, latency percentiles, quota usage
- **Sandbox environment:** test API access with dedicated test credentials
- **Changelog and announcements:** subscribe to API updates via email or RSS
- **Status page link:** real-time API health and incident history

**Self-service as a principle:** every action a developer needs — from getting credentials to upgrading their plan — should be completable in the portal without contacting support. Each support contact represents a portal UX failure.

**Portal tooling:**
- **ReadMe.io:** hosted developer portal with usage analytics, interactive docs, API explorer, changelog
- **Stoplight:** OpenAPI-first documentation hub; visual API design + documentation
- **Mintlify:** MDX-based documentation with embeddable API playground
- **Custom portal:** React + Redoc + auth layer — full control, full maintenance burden

**Developer analytics:** track which docs pages developers visit before their first successful API call. Where they drop off indicates friction points. Which endpoints generate the most support tickets indicates documentation gaps.

**Key insight:** The developer portal replaces your first sales call for API-led products. When a developer lands on your portal at 11pm to evaluate your API, the quality of that experience determines whether they build on your platform or your competitor's. Invest in portal UX as a growth channel, not just a documentation repository.`,
    },
  ],
};

export default developerExperience;
