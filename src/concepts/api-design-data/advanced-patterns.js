const advancedPatterns = {
  name: "Advanced API Patterns",
  icon: "🏗️",
  color: "#ec4899",
  concepts: [
    {
      id: 1309,
      name: "CQRS & Event-Driven APIs",
      desc: `**CQRS (Command Query Responsibility Segregation)** — an architectural pattern that separates read (query) and write (command) operations into distinct models, often backed by different data stores optimized for each concern.

**Traditional CRUD:** the same data model handles reads and writes. As complexity grows: reads need denormalized views for performance; writes need normalized data for consistency. They're in conflict.

**CQRS separation:**
- **Write side (Commands):** "POST /orders { items: [...] }" → validates → emits "OrderCreated" event → updates write model (normalized). Optimized for consistency and business rule enforcement.
- **Read side (Queries):** "GET /orders?userId=123" → reads from pre-computed read model (denormalized, optimized for the specific query pattern). Often a separate database (Elasticsearch, Redis, read replica).

**Event sourcing + CQRS:** instead of storing current state, store the sequence of events that led to it ("OrderCreated", "ItemAdded", "OrderShipped"). Reconstruct state by replaying events. The event log is the source of truth; read models are projections rebuilt from events.

**API implications:**
- Write endpoints return 202 Accepted (async) — the command is accepted; the read model updates eventually
- Read endpoints serve from optimized projections — can be milliseconds behind writes (eventual consistency)
- "Command" DTOs separate from "Query" response shapes — different validation, different field sets

**When to use:** complex domains with many query patterns that conflict with write normalization needs; high-read/write asymmetry; audit trail requirements (event sourcing). Overkill for simple CRUD.

**Key insight:** CQRS solves the read-write model impedance mismatch that causes performance and complexity problems in growing systems. The operational cost (separate models, eventual consistency) is real — don't adopt it for simple applications. Use it when your read requirements have outgrown what your write model can efficiently serve.`,
    },
    {
      id: 1310,
      name: "API Composition Patterns",
      desc: `**API Composition Patterns** — the strategies for implementing an operation that requires data from multiple downstream services, without requiring the client to make multiple API calls.

**The microservices data problem:** in a monolith, joining data across entities is a database JOIN. In microservices (Order Service, User Service, Product Service), there's no shared database — a client asking for "order with user details and product info" requires 3 API calls.

**Pattern 1 — API Gateway Composition:**
Gateway receives "GET /orders/123/full" → parallel calls to Order Service, User Service (for the order's user), Product Service (for ordered products) → merges responses → returns to client. Single client request; gateway handles the fan-out.

**Pattern 2 — Backend for Frontend (BFF):**
Dedicated BFF service for mobile client aggregates data from multiple services and returns the mobile-optimized response. BFF contains client-specific aggregation logic; keeps microservices clean.

**Pattern 3 — GraphQL as composition layer:**
GraphQL resolvers naturally compose data from multiple sources. "{ order(id: 123) { items { product { name price } } user { name email } } }" — each resolver can call a different service; GraphQL merges the result.

**Pattern 4 — Saga pattern (for writes):**
Multi-step write operations spanning services: "CreateOrder saga: 1. Reserve inventory 2. Charge payment 3. Confirm order." Each step is a separate service call; the saga orchestrator coordinates. On failure, compensation transactions undo previous steps.

**Async composition with events:** for eventual consistency — Order created → event published → User Service updates order history → Product Service decrements inventory. No synchronous cross-service calls; services remain decoupled.

**Key insight:** API composition is where microservices complexity concentrates. The client shouldn't know about your internal service boundaries — the composition layer (gateway, BFF, or GraphQL) hides that complexity. Choose the simplest approach: BFF for client-specific aggregation, GraphQL for flexible data needs, gateway composition for fixed cross-service queries.`,
    },
    {
      id: 1311,
      name: "Circuit Breaker Pattern",
      desc: `**Circuit Breaker Pattern** — a resilience pattern that prevents an application from repeatedly calling a failing downstream service, allowing the failing service time to recover and preventing cascade failures.

**The problem:** Service A calls Service B. Service B is slow/down. Service A's requests queue up waiting for B. Service A's thread pool exhausts waiting for timeouts. Service A becomes slow. Service C calling Service A now has problems. Cascade failure destroys the entire system.

**Circuit breaker states:**
- **Closed (normal):** requests flow through. Count failures. If failures exceed threshold (e.g., 50% failure rate in 10 seconds) → trip to Open.
- **Open (tripped):** requests fail immediately with a fallback response (no call to Service B). After a reset timeout (e.g., 30 seconds) → move to Half-Open.
- **Half-Open (testing):** allow one request through. If it succeeds → reset to Closed. If it fails → back to Open.

**Fallback strategies:**
- Return cached/stale data: "show last known inventory count"
- Return a default: "return 0 results with 'try again later' message"
- Return an error: fail fast with a clear error rather than a timeout

**Libraries:**
- **Resilience4j (Java):** annotation-based circuit breaker: "@CircuitBreaker(name='inventoryService', fallbackMethod='getFallbackInventory')"
- **Polly (.NET):** "Policy.Handle<HttpRequestException>().CircuitBreaker(3, TimeSpan.FromSeconds(30))"
- **Hystrix (deprecated, Netflix):** the original; concept still valid; replaced by Resilience4j
- **Service mesh (Istio/Envoy):** configures circuit breaking in the proxy without application code

**Key insight:** Circuit breakers are the immune system of distributed systems. Without them, one failing service brings down every service that depends on it. With them, failures are contained: Service B is down → Service A's circuit opens → Service A degrades gracefully → Service B recovers → circuit closes → normal operation resumes. Implement circuit breakers for every external service call.`,
    },
    {
      id: 1312,
      name: "API Backward Compatibility",
      desc: `**API Backward Compatibility** — the engineering discipline of evolving an API without breaking existing clients. An API is backward compatible if an old client can still communicate with the new API without code changes.

**Additive changes (always safe):**
- Adding new optional request parameters (existing clients don't send them → same behavior)
- Adding new response fields (existing clients ignore unknown fields → safe if clients use defensive parsing)
- Adding new endpoints
- Adding new enum values (risky if clients switch on exhaustive enum — add "UNKNOWN" fallback)
- Making previously required parameters optional

**Breaking changes:**
- Removing or renaming request parameters
- Removing or renaming response fields
- Changing field types ("string" → "integer")
- Changing semantics (same field name, different meaning)
- Adding new required parameters
- Changing authentication requirements
- Changing status codes for existing operations

**Tolerant reader pattern:** clients should parse API responses defensively — ignore unknown fields, handle missing optional fields with defaults, handle new enum values as "unknown." Brittle clients ("I expect exactly these fields, no more") break on any additive change.

**Postel's Law for APIs (Robustness Principle):** "Be conservative in what you send, be liberal in what you accept." Accept variations in input (lowercase/uppercase, extra whitespace); return consistent, well-formed output.

**Field deprecation without breaking:** return both old and new field names simultaneously: "{ email: 'alice@example.com', emailAddress: 'alice@example.com' }" — old clients read "email", new clients read "emailAddress". Remove "email" only after migration period.

**Key insight:** Most breaking changes can be made backward compatible with an additive migration path: add the new field/behavior alongside the old; deprecate the old; remove after migration. The temptation to "just rename this field for clarity" ignores the cost borne by every client. Backward compatibility is the social contract of APIs.`,
    },
    {
      id: 1313,
      name: "Bulk & Batch API Design",
      desc: `**Bulk & Batch API Design** — the patterns for APIs that accept or return multiple items in a single request, reducing round-trip overhead for high-volume operations.

**When batch APIs matter:** creating 1000 users one by one = 1000 HTTP requests = 1000 × (network + auth + overhead) ≈ minutes. One batch request for 1000 users ≈ seconds. Batch APIs are 10-100x more efficient for bulk operations.

**Bulk create/update patterns:**

**Pattern 1 — Array in request body:**
"POST /users/bulk { users: [{ name: 'Alice', email: '...' }, { name: 'Bob', email: '...' }] }"
→ "{ created: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }], failed: [{ index: 2, error: 'Duplicate email' }] }"

**Pattern 2 — NDJSON (Newline-Delimited JSON):** stream records separated by newlines — more memory-efficient for large batches; server can process records as they stream in.

**Partial success handling:** when 50 of 100 items fail, what should the API return? Options:
- **All-or-nothing (transactional):** if any fail, all fail and roll back. Simple; may be too strict.
- **Best-effort (partial success):** succeed on valid items, fail gracefully on invalid ones. Return both succeeded and failed items in the response.
- **Mixed:** document which strategy you use — never leave it ambiguous.

**Batch size limits:** cap request payload size (e.g., 500 items per batch, 10MB max body). Prevent memory exhaustion from unbounded batch sizes.

**Asynchronous batch jobs:** for very large batches (10k+ items), accept the batch and return a job ID; process asynchronously; notify via webhook when complete.

**Key insight:** Batch APIs without partial success reporting are frustrating — clients can't tell which items succeeded and which failed without re-querying. Always return per-item status in batch responses. The "{ succeeded: [...], failed: [{ index, error }] }" pattern is the developer-friendly standard.`,
    },
    {
      id: 1314,
      name: "API Design for Mobile",
      desc: `**API Design for Mobile** — the specific adaptations that make APIs efficient and ergonomic for mobile clients facing constraints REST doesn't address by default: bandwidth, battery, intermittent connectivity, and diverse screen sizes.

**Mobile-specific challenges:**
- **Bandwidth:** mobile data is expensive and slower than WiFi; minimize payload sizes
- **Battery:** each network request drains battery; minimize request count
- **Latency:** mobile networks add 100-500ms of network latency on top of server latency
- **Intermittent connectivity:** requests fail silently; retry logic is essential
- **Multiple requests on a single screen:** mobile screens aggregate data from many sources — N REST calls per screen is expensive

**Mobile API design patterns:**

**1. Composite endpoints (screen-specific):** one endpoint returns all data needed for one screen:
"GET /home-feed" → returns feed posts + user profile summary + notification count + trending topics. Avoids N parallel requests on screen render.

**2. GraphQL from mobile:** mobile queries specify exactly the fields needed for the current screen. No over-fetching bloated responses.

**3. Field selection:** "GET /users/123?fields=name,avatar,followers_count" — return only fields the screen needs. Standard for bandwidth-constrained mobile APIs.

**4. Pagination defaults:** mobile screens are small — default to 20 items per page max, not 100. Consider infinite scroll patterns.

**5. Response compression:** always support "Accept-Encoding: gzip, br" (Brotli). JSON payloads compress 70-80% — massive bandwidth savings on mobile.

**6. Conditional requests (If-None-Match):** return 304 Not Modified when data hasn't changed since the client's last fetch. Zero bytes transferred for unchanged responses.

**7. Offline-first considerations:** idempotent writes with idempotency keys; clear error codes that distinguish network failures from server errors; retry-safe operations.

**Key insight:** Mobile API design is backend developers writing APIs for an environment they don't feel. Measure real payload sizes on 3G connections; measure battery impact of your request patterns; test on real devices. The BFF (Backend for Frontend) pattern — a separate API service per client type — is the architectural solution when mobile needs diverge significantly from web needs.`,
    },
  ],
};

export default advancedPatterns;
