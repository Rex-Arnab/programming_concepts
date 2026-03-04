const gatewayTooling = {
  name: "API Gateway & Tooling",
  icon: "🔧",
  color: "#f97316",
  concepts: [
    {
      id: 1302,
      name: "API Gateway Patterns",
      desc: `**API Gateway** — a server that acts as the single entry point for all client requests, routing them to appropriate backend services while handling cross-cutting concerns: authentication, rate limiting, logging, SSL termination, and request transformation.

**Core gateway responsibilities:**
- **Routing:** match request patterns to backend services; path-based routing, host-based routing
- **Authentication:** validate API keys, JWT tokens, OAuth tokens before forwarding to services
- **Rate limiting:** enforce per-client, per-endpoint quotas
- **SSL termination:** decrypt HTTPS at the gateway; backend services communicate over plain HTTP (within the private network)
- **Request/response transformation:** modify headers, translate protocols (REST to gRPC), aggregate responses
- **Load balancing:** distribute requests across service instances
- **Observability:** centralized access logging, distributed tracing headers, metrics

**Gateway patterns:**
- **Backend for Frontend (BFF):** separate gateway per client type (mobile gateway, web gateway). Each BFF aggregates and shapes data for its specific client's needs. Avoids one-size-fits-all API that's suboptimal for all clients.
- **API aggregation:** single client request triggers multiple upstream calls; gateway aggregates and returns combined response. Reduces client round-trips.
- **Protocol translation:** external REST → internal gRPC. Gateway translates protocol; services use gRPC; clients see REST.

**Popular API gateways:**
- **Kong:** open-source, Nginx-based, plugin ecosystem. Self-hosted or cloud.
- **AWS API Gateway:** fully managed; tight AWS integration; pay-per-request pricing.
- **Traefik:** cloud-native, Kubernetes-native; automatic service discovery; excellent for K8s.
- **Envoy:** high-performance proxy; foundation of Istio service mesh; used by Lyft, Google, Netflix.
- **Nginx:** battle-tested HTTP server + reverse proxy + gateway capabilities.

**Key insight:** The API gateway centralizes policies that would otherwise be duplicated in every service. One authentication change in the gateway applies to all 50 services instantly. Without a gateway, each service implements its own auth, rate limiting, and logging — inconsistently. The gateway is the correct place for universal policies; services implement business logic.`,
    },
    {
      id: 1303,
      name: "Service Mesh & API Management",
      desc: `**Service Mesh** — an infrastructure layer that handles service-to-service communication (east-west traffic) through a set of transparent network proxies (sidecars), providing mTLS, load balancing, circuit breaking, observability, and traffic management without application code changes.

**API Gateway vs Service Mesh:**
- **API Gateway:** north-south traffic (external client → internal services); authentication, rate limiting for external callers
- **Service Mesh:** east-west traffic (service A → service B → service C); mTLS, circuit breaking, retries between services

**Both are complementary** — gateway handles the perimeter; service mesh handles the interior.

**Istio architecture:** each service pod gets a sidecar Envoy proxy injected. All traffic flows through Envoy sidecars. The control plane (Istiod) configures all sidecars centrally.

**Service mesh capabilities:**
- **mTLS everywhere:** all service-to-service traffic encrypted and authenticated with x.509 certificates — no application code needed
- **Traffic management:** traffic splitting (10% to v2, 90% to v1 for canary deployments), retries, timeouts, circuit breaking
- **Observability:** automatic distributed traces (Jaeger), metrics (Prometheus), access logs for all service calls — no instrumentation in application code
- **Fault injection:** inject 5% failures or 500ms latency to test service resilience

**Linkerd vs Istio:** Linkerd is lighter weight, simpler, Rust-based sidecar. Istio is more feature-rich, more complex, Envoy-based. Teams spending > 20% of time debugging Istio complexity may benefit from Linkerd's simplicity.

**Key insight:** The service mesh's value is making distributed systems observability free — every service-to-service call is traced, metered, and TLS-encrypted without developers writing any infrastructure code. The cost is operational complexity of the control plane and sidecar resource overhead (~50MB RAM per sidecar). Worth it at scale (50+ services); over-engineered for 5 services.`,
    },
    {
      id: 1304,
      name: "API Observability",
      desc: `**API Observability** — the ability to understand the internal state of an API system from its external outputs (logs, metrics, traces). The three pillars of observability — logs, metrics, and traces — together answer "what is happening, how much, and why."

**Logs (structured):**
"{ level: 'info', message: 'Request processed', requestId: 'req_abc', userId: 'user_123', endpoint: 'GET /orders', statusCode: 200, durationMs: 45, timestamp: '2025-01-01T00:00:00Z' }"
Use structured JSON logging; include request_id for correlation; log at appropriate levels (DEBUG for development, INFO for business events, ERROR for failures).

**Metrics (time-series):**
- Request rate (requests/second per endpoint)
- Error rate (% of requests returning 4xx/5xx)
- Latency distribution (p50, p95, p99 per endpoint)
- Saturation (CPU, memory, connection pool usage)

Prometheus + Grafana: the standard self-hosted stack. Datadog, New Relic, Honeycomb: managed observability platforms.

**Distributed traces:**
A single API request triggers calls to 5 downstream services. Distributed tracing (OpenTelemetry → Jaeger/Zipkin) shows the full call chain: parent span (API request) → child spans (DB query, cache lookup, external API call). Identifies where latency is actually occurring.

**OpenTelemetry:** the vendor-neutral standard for instrumenting applications to emit traces, metrics, and logs. Instrument once with OTel SDK; export to any backend (Jaeger, Zipkin, Datadog, Honeycomb, Grafana Tempo).

**USE Method for API health:**
- **Utilization:** how busy is the resource (CPU, connections)?
- **Saturation:** how much is it queuing / waiting?
- **Errors:** how many errors are occurring?

**RED Method for API health:**
- **Rate:** requests per second
- **Errors:** error rate
- **Duration:** latency distribution

**Key insight:** Logs answer "what happened to this specific request." Metrics answer "how is the system behaving overall." Traces answer "which step made this request slow." All three are needed — a team with only logs drowns in noise searching for patterns; a team with only metrics can't diagnose individual failures. Implement all three from day one.`,
    },
    {
      id: 1305,
      name: "API Testing Tools",
      desc: `**API Testing Tools** — the software for exploring, testing, documenting, and automating API interactions throughout the development lifecycle.

**Exploration & manual testing:**
- **Postman:** the industry standard API client. Collections (organized requests), environments (dev/staging/prod variables), automated test scripts (JavaScript), mock servers, team collaboration, API documentation publishing.
- **Insomnia:** open-source alternative to Postman; clean UI; GraphQL support; plugin ecosystem.
- **Hoppscotch:** web-based, open-source; GraphQL, WebSocket, SSE, gRPC support; good for quick testing.
- **Bruno:** local-only, Git-native API client; collections stored as plain files in your repo — no Postman cloud dependency.

**HTTP from the command line:**
- **curl:** the universal fallback. "curl -X POST https://api.example.com/users -H 'Content-Type: application/json' -d '{"name": "Alice"}'"
- **HTTPie:** human-friendly curl alternative. "http POST api.example.com/users name=Alice Authorization:'Bearer token'"
- **xh:** Rust-based, fast; same interface as HTTPie.

**Automated testing frameworks:**
- **Supertest (Node.js):** "request(app).get('/users').expect(200).expect(Content-Type, /json/)"
- **pytest + httpx (Python):** async-first HTTP testing for Python APIs
- **REST-assured (Java):** BDD-style API testing DSL
- **Playwright / Cypress:** E2E testing that includes API calls as part of UI test flows

**Contract testing:**
- **Pact:** consumer-driven contract testing. Consumer defines expectations; Pact broker verifies provider satisfies them. Prevents breaking changes from shipping.
- **Dredd:** runs test scenarios from OpenAPI spec against live server.

**Key insight:** Postman collections are underused as living documentation. A well-organized Postman collection with environment variables, pre-request scripts (authentication), and test assertions becomes an executable spec that any developer can run against any environment. Export the collection and commit it to your repo — it's the fastest path for a new team member to explore the API.`,
    },
    {
      id: 1306,
      name: "API Mocking & Contract Testing",
      desc: `**API Mocking** — simulating an API's behavior (returning predefined responses) without calling the real service. Enables parallel development (frontend starts before backend is ready), isolated testing, and testing edge cases that are hard to trigger in real systems.

**Mocking approaches:**

**1. Generated mock from OpenAPI spec:**
- **Prism** (Stoplight): "prism mock openapi.yaml" — starts a mock server that returns example responses from your spec. Validates requests against the spec schema.
- **WireMock:** configure stub responses via JSON; extensive request matching (headers, body patterns, query params); record and replay real API interactions.

**2. Code-level mocking (unit tests):**
- "jest.mock('axios')" or use "msw" (Mock Service Worker) to intercept fetch/XHR in tests
- "nock" (Node.js): intercept HTTP requests at the http module level: "nock('https://api.example.com').get('/users/1').reply(200, { id: 1, name: 'Alice' })"

**3. Contract testing with Pact:**
Consumer side: define the expected API interaction:
"provider.interaction('get user').given('user 123 exists').uponReceiving('GET /users/123').willRespondWith({ status: 200, body: { id: '123', name: 'Alice' } })"

Provider side: run Pact verification against real provider:
"pact.verifyProvider({ provider: 'UserService', pactUrls: ['./pacts/consumer-usersevice.json'] })"

Pact verifies that the real provider satisfies all consumer expectations — before deployment.

**Record and replay:** tools like WireMock in record mode capture real API interactions; replay mode serves cached responses for offline testing. Useful for third-party APIs with rate limits.

**Key insight:** Mocking enables frontend/backend parallel development — arguably the biggest timeline improvement in API-first teams. But mocks must stay synchronized with the real API — a mock that diverges from the real API creates a false test environment. Contract tests (Pact, Dredd) are the automated solution: they verify the mock's accuracy continuously.`,
    },
    {
      id: 1307,
      name: "API Versioning Strategies",
      desc: `**API Versioning Strategies** — the technical approaches for managing multiple API versions simultaneously while allowing the API to evolve. Choosing the right strategy affects URL aesthetics, routing complexity, client upgrade friction, and operational overhead.

**Strategy comparison:**

**URL Path versioning ("GET /v1/users", "GET /v2/users"):**
- Pros: visible in URLs; easy to route; easy to test; browser-friendly
- Cons: URL design purists dislike version in URL; multiple code paths to maintain
- Used by: Stripe, GitHub, Twilio, AWS

**Header versioning ("Api-Version: 2025-01-01"):**
- Pros: clean URLs; date-based versioning documents change history
- Cons: invisible in browser address bar; harder to test; not obvious when routes break
- Used by: Stripe (in addition to "v1" URL prefix — they use date for minor versioning)

**Query parameter ("GET /users?version=2"):**
- Pros: simple; no URL change
- Cons: easily forgotten; clutters URLs; cache-unfriendly
- Rarely used in production

**Content negotiation ("Accept: application/vnd.example.v2+json"):**
- Pros: REST-pure; clean URLs
- Cons: poor developer experience; not browser-testable; invisible in logs
- Used by: GitHub API (in addition to URL versioning)

**Date-based versioning (Stripe model):** API key is associated with a default version; requests use that version unless "Stripe-Version: 2025-01-15" header overrides. Breaking changes only affect clients explicitly upgrading. Sophisticated, requires careful implementation.

**Maintaining multiple versions:** typically means maintaining multiple codebases or using feature flags. Common pattern: v1 and v2 share business logic but have separate request/response adapters. Minimize code duplication between versions.

**Key insight:** Choose URL path versioning for any API with external developers. The operational simplicity (route at load balancer, clear in logs, testable in browser) outweighs the philosophical purity arguments for header-based versioning. Add "Sunset" HTTP headers to signal deprecation timelines.`,
    },
    {
      id: 1308,
      name: "Distributed Tracing for APIs",
      desc: `**Distributed Tracing** — a technique for tracking a single request as it propagates through multiple services in a distributed system. A trace is a collection of spans (units of work) linked by a shared trace ID, forming a causality tree of the entire request journey.

**Why it's needed:** a user request to "GET /checkout" might call the cart service → product service → inventory service → pricing service → fraud service — each over the network. A 2-second response time is impossible to diagnose without knowing which step took how long.

**Core concepts:**
- **Trace:** the complete journey of a single request through all services. Identified by a unique "trace_id".
- **Span:** one unit of work within a trace (one service call, one DB query). Has start time, duration, service name, operation name, tags, and logs.
- **Parent span / child span:** the checkout handler span is the parent; DB query span and external call spans are children.
- **Context propagation:** the "trace_id" and "parent_span_id" are passed in HTTP headers ("traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01") to downstream services, enabling trace stitching.

**W3C TraceContext (standard):** "traceparent" and "tracestate" headers — vendor-neutral, supported by all major tracing vendors.

**OpenTelemetry (instrumentation standard):**
"tracer.startActiveSpan('checkout', (span) => { span.setAttribute('user.id', userId); const result = await processOrder(); span.setStatus({ code: SpanStatusCode.OK }); span.end(); return result; });"

**Backends:** Jaeger (self-hosted, open-source), Zipkin (self-hosted), Datadog APM, Honeycomb, Grafana Tempo.

**Key insight:** Distributed tracing turns "something is slow" into "the fraud check service is slow for users in the EU because it calls a third-party risk API with a 500ms p99." Without traces, distributed system performance debugging is guesswork through logs across 10 services. OpenTelemetry auto-instrumentation for HTTP frameworks means you get traces without manual span creation.`,
    },
  ],
};

export default gatewayTooling;
