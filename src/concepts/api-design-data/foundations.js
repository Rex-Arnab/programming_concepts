const foundations = {
  name: "API Design Foundations",
  icon: "🔌",
  color: "#6366f1",
  concepts: [
    {
      id: 1227,
      name: "What is an API",
      desc: `**API (Application Programming Interface)** — a defined contract between software systems that specifies how they can communicate: what operations are available, what data to send, and what to expect in return. APIs are the connective tissue of modern software — every microservice, mobile app, and third-party integration depends on them.

Mental model: an API is like a restaurant menu. You don't need to know how the kitchen works — you just order from the menu (API contract) and receive a meal (response). The kitchen implementation can change entirely as long as the menu stays the same.

**API types by communication style:**
- **Request-response:** client sends a request, server sends a response (REST, GraphQL, gRPC unary)
- **Streaming:** server pushes data to client continuously (gRPC streaming, WebSockets, SSE)
- **Event-driven:** asynchronous message passing (webhooks, message queues)
- **Batch:** process many requests as a single operation

**API types by audience:**
- **Public/Open APIs:** third-party developers (Stripe, Twilio, Twitter)
- **Partner APIs:** specific partners with signed agreements
- **Internal/Private APIs:** consumed only within the organization

**Why API design matters:** a well-designed API is used correctly by default; a poorly designed one requires constant support, generates bugs at integration points, and becomes technical debt that's painful to change. APIs are products — design them for the developer using them, not for the server implementing them.

**Key insight:** APIs outlive the code that implements them. A poorly named endpoint or wrong data model choice becomes permanent once external systems depend on it. Invest heavily in design before building — once published, changing an API is harder than changing internal code.`,
    },
    {
      id: 1228,
      name: "API Paradigms Compared",
      desc: `**API paradigms** — the major architectural styles for building APIs, each with distinct trade-offs in coupling, performance, tooling, and use cases. Choosing the wrong paradigm for your use case creates friction for the lifetime of the API.

**REST (Representational State Transfer):**
- Resources + HTTP verbs; stateless; widely understood; excellent tooling
- Best for: public APIs, CRUD-heavy systems, browser-consumable APIs
- Weakness: over/under-fetching; multiple round-trips for related data; no real-time

**GraphQL:**
- Client-specified queries; single endpoint; strongly typed schema; hierarchical data
- Best for: complex data graphs, multiple client types (mobile/web with different needs), rapid iteration
- Weakness: caching complexity; N+1 query problem; learning curve; overkill for simple CRUD

**gRPC:**
- Binary protocol (Protocol Buffers); strongly typed; bidirectional streaming; HTTP/2
- Best for: internal microservice communication, high-throughput systems, streaming, polyglot environments
- Weakness: not human-readable; limited browser support (needs grpc-web); requires schema tooling

**WebSockets:**
- Full-duplex persistent connection; true real-time; both client and server can push
- Best for: chat, live collaboration, gaming, market data feeds
- Weakness: stateful (hard to scale); no built-in message format; reconnection complexity

**When to use each:** most applications use multiple paradigms — REST for public APIs, gRPC for internal services, WebSockets for real-time features, GraphQL for flexible data APIs.

**Key insight:** There is no universally superior paradigm. The mistake is applying one paradigm everywhere (REST-everything or GraphQL-everything). Stripe uses REST for its public API because developers know it; Netflix uses gRPC internally because performance matters more than human-readability between services.`,
    },
    {
      id: 1229,
      name: "API-First Design",
      desc: `**API-First Design** — a development philosophy where the API contract (schema, endpoints, request/response shapes) is designed and agreed upon before any implementation code is written. The API is treated as a first-class product, not an afterthought of implementation.

**vs. Code-First:** Code-first generates the API from implementation (e.g., auto-generating REST routes from a database schema or ORM). Fast initially, but tends to expose internal data models rather than clean client-facing abstractions.

**API-First workflow:**
1. Design the API in a specification language (OpenAPI for REST, GraphQL SDL, Protobuf)
2. Review with API consumers (frontend, mobile, partners) before implementation
3. Generate mock server from spec — consumers can start building against it immediately
4. Implement the server to satisfy the spec (contract testing ensures compliance)
5. Generate client SDKs, documentation, and validation from the spec

**Benefits:**
- Parallel development: backend and frontend work simultaneously against the agreed contract
- Fewer integration surprises: consumers validate assumptions during design, not after code ships
- Auto-generated artifacts: SDKs, docs, tests, mocks reduce manual work
- Stable contracts: changes require deliberate spec updates, preventing accidental breaking changes

**Tooling:** Stoplight Studio (visual API design), SwaggerHub (OpenAPI design + collaboration), Postman (design + mock + test), Buf (Protobuf), Apollo Studio (GraphQL).

**Key insight:** API-first is a forcing function for consumer empathy. When you write the API spec before the code, you naturally think "what does the caller need?" instead of "what does my database have?" That inversion of perspective produces dramatically better API designs.`,
    },
    {
      id: 1230,
      name: "Idempotency",
      desc: `**Idempotency** — a property of an operation where executing it multiple times produces the same result as executing it once. Critical for distributed systems where network failures cause clients to retry requests — idempotent operations make retries safe.

Mental model: pressing an elevator button multiple times doesn't call multiple elevators — the outcome is the same whether you press once or ten times.

**HTTP method idempotency:**
- **Idempotent:** GET, PUT, DELETE, HEAD, OPTIONS — safe to retry on failure
- **Not idempotent:** POST — retrying a POST payment request could charge the user twice

**Idempotency keys:** for non-idempotent operations (POST), clients include a unique "Idempotency-Key" header. The server stores the response for that key and returns the cached response for duplicate requests. Stripe's payment API uses this pattern.

**Server-side implementation:** store "idempotency_key → (status, response)" in a database with a unique constraint on the key. On request: check if key exists → return stored response. If not: process → store response → return. Use a TTL (24h typical).

**At-least-once vs. exactly-once delivery:** most distributed systems guarantee at-least-once delivery (messages may be delivered multiple times). Idempotent consumers turn at-least-once into effectively-once by handling duplicates safely.

**Key insight:** Every state-mutating API operation in a distributed system should be idempotent. The cost of not designing for idempotency is double-charges, duplicate orders, and corrupt data when networks hiccup and clients retry. Add idempotency keys to your POST/PATCH endpoints from day one — retrofitting it later is painful.`,
    },
    {
      id: 1231,
      name: "Rate Limiting",
      desc: `**Rate Limiting** — controlling the number of requests a client can make to an API within a time window. Protects APIs from abuse, DoS attacks, and runaway clients while ensuring fair resource distribution.

**Rate limiting algorithms:**
- **Fixed window:** count requests per fixed time window (e.g., 100 req/min resets at :00). Simple, but allows burst at window boundary (100 at :59 + 100 at :00 = 200 in 2 seconds).
- **Sliding window:** track requests in a rolling window (last 60 seconds). Smoother, prevents boundary bursts; more memory-intensive.
- **Token bucket:** tokens refill at constant rate; each request consumes a token; allows controlled bursting. Used by AWS API Gateway.
- **Leaky bucket:** requests processed at constant rate regardless of burst; excess queued or rejected. Smooths traffic.

**Rate limit response headers (standard):**
- "X-RateLimit-Limit": 100 (requests per window)
- "X-RateLimit-Remaining": 47 (requests left)
- "X-RateLimit-Reset": 1714051200 (Unix timestamp when window resets)
- "Retry-After": 30 (seconds until retry is safe — sent with 429 responses)

**Rate limit granularity:**
- Per API key (most common for public APIs)
- Per IP address (for unauthenticated endpoints)
- Per user/account (different tiers: free vs. pro)
- Per endpoint (expensive endpoints get tighter limits)

**Distributed rate limiting:** single server rate limiting is trivial (in-memory counter); distributed rate limiting (across multiple API server instances) requires shared state — Redis is the standard solution ("INCR" with expiry).

**Key insight:** Rate limits are a feature, not a punishment. They're how you protect paying customers from other customers' runaway bugs. Communicate limits clearly in documentation and response headers. Always return 429 (Too Many Requests) — never silently drop requests or return incorrect responses.`,
    },
    {
      id: 1232,
      name: "Pagination",
      desc: `**Pagination** — the mechanism for returning large collections in manageable chunks rather than all at once. Essential for any API that returns lists — without it, a single endpoint returning 100,000 users will time out, exhaust memory, and ruin client performance.

**Pagination strategies:**

**1. Offset pagination:** "GET /users?offset=0&limit=20" → "GET /users?offset=20&limit=20"
- Simple and familiar; supports random access to any page
- Problems: slow on large offsets (DB must skip N rows); page drift (new items inserted while paginating cause duplicates/skips)

**2. Cursor pagination:** "GET /users?cursor=eyJpZCI6MTAwfQ&limit=20" → response includes "next_cursor" for next page
- Cursor = opaque token encoding the last seen position (often base64-encoded ID or timestamp)
- Stable during inserts/deletes; consistent performance at any depth; no random access
- Best for feeds, timelines (Twitter, Facebook, Instagram all use cursor pagination)

**3. Page-based:** "GET /users?page=3&per_page=20"
- Human-friendly; same problems as offset (page 3 = offset 60)

**4. Keyset pagination:** "GET /users?after_id=100&limit=20" — equivalent to cursor but the cursor is a readable field
- Great performance (uses index on the sort column); no random access

**Response envelope:**
"{ data: [...], pagination: { next_cursor: 'abc', has_more: true, total: 1500 } }"

**Total count:** avoid "SELECT COUNT(*)" on large tables for every paginated request — expensive. Return "has_more: true/false" instead; only compute total when explicitly requested.

**Key insight:** Cursor pagination is almost always the right choice for feeds and timelines; offset pagination is acceptable for admin interfaces with explicit page numbers. The critical mistake is shipping offset pagination for feeds and discovering page drift and slow "LIMIT 100000 OFFSET 99980" queries in production.`,
    },
    {
      id: 1233,
      name: "API Error Design",
      desc: `**API Error Design** — the conventions for communicating failures from API to clients in a way that is unambiguous, actionable, and consistent. Well-designed errors are as important as successful responses — they determine how quickly developers can debug integration issues.

**HTTP status code categories:**
- **2xx Success:** 200 OK, 201 Created, 202 Accepted, 204 No Content
- **3xx Redirect:** 301 Moved Permanently, 302 Found, 304 Not Modified
- **4xx Client errors:** 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity, 429 Too Many Requests
- **5xx Server errors:** 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout

**Error response body (RFC 7807 — Problem Details):**
"{ type: 'https://api.example.com/errors/validation-failed', title: 'Validation Failed', status: 422, detail: 'The email field must be a valid email address.', instance: '/users/register', errors: [{ field: 'email', message: 'Invalid email format' }] }"

**Common error design mistakes:**
- Returning 200 with an error body ("{ success: false, error: '...' }") — breaks HTTP caching, proxy handling, and monitoring tools
- Generic "500 Internal Server Error" for all failures — developers can't distinguish input errors from bugs
- Exposing stack traces in production error responses — security risk
- Inconsistent error formats across endpoints

**Machine-readable error codes:** include a "code" or "type" field with stable, documented values ("INSUFFICIENT_FUNDS", "USER_NOT_FOUND") that clients can programmatically switch on — not just human-readable messages that can change.

**Key insight:** The quality of your error responses determines how fast developers can build on your API. An unambiguous 422 with field-level validation errors saves hours of debugging. A generic 400 "Bad Request" with no detail sends developers to Postman, your docs, and your support channel. Design errors for the developer debugging at midnight.`,
    },
    {
      id: 1234,
      name: "API Versioning",
      desc: `**API Versioning** — the strategy for evolving an API over time without breaking existing clients. Once an API is published and clients depend on it, changes must be backward compatible or versioned to prevent breakage.

**Versioning strategies:**

**1. URL path versioning:** "GET /v1/users" → "GET /v2/users"
- Pros: explicit, visible in logs and bookmarks, easy to route at the load balancer level
- Cons: clients must update URL; multiple versions run simultaneously; URLs aren't REST-pure

**2. Query parameter:** "GET /users?version=2"
- Simple but easy to forget; hard to enforce; clutters URLs

**3. Header versioning:** "Accept: application/vnd.example.v2+json"
- Clean URLs; invisible in logs; harder to test in a browser

**4. Content negotiation:** "Accept-Version: 2"
- Elegant; REST-pure; lowest developer experience

**URL path versioning wins in practice** for public APIs — it's explicit, undeniable, and easy to route. Stripe, GitHub, and Twilio all use it.

**Semantic versioning for APIs:** major version (v1 → v2) = breaking changes; add minor versions only if needed. Avoid v1.1, v1.2 — they create complexity with little benefit.

**Backward-compatible changes (no version bump needed):** adding new optional fields, adding new endpoints, adding new enum values to non-required fields.

**Breaking changes (require version bump):** removing or renaming fields, changing field types, changing response structure, making previously optional fields required, changing auth requirements.

**Sunset policy:** announce deprecation timelines; send "Deprecation" and "Sunset" headers; email developers using deprecated versions; give at least 6-12 months notice.

**Key insight:** The best versioning strategy is one you rarely need. Invest in API design up front to minimize breaking changes. When a v2 is needed, maintain v1 for 12-18 months minimum — some enterprise clients cannot upgrade quickly. Stripe still supports API versions from 2015.`,
    },
    {
      id: 1235,
      name: "Hypermedia & HATEOAS",
      desc: `**HATEOAS (Hypermedia as the Engine of Application State)** — a REST constraint where API responses include links to related actions and resources, so clients discover next steps from the response rather than hardcoding URLs. The purist endpoint of REST API design.

**Example:** a GET /orders/123 response:
"{ id: 123, status: 'pending', total: 49.99, _links: { self: { href: '/orders/123' }, cancel: { href: '/orders/123/cancel', method: 'POST' }, payment: { href: '/orders/123/payment' } } }"

The client knows it can cancel the order by following the "cancel" link — it doesn't need to know the URL pattern. If the order were already shipped, the "cancel" link wouldn't appear.

**Why HATEOAS is rarely implemented:** it requires clients to be "link-following" rather than "URL-hardcoding." In practice, every client (mobile app, frontend, partner) hardcodes URLs anyway. The coupling HATEOAS tries to remove exists in the client code regardless.

**Practical hypermedia:** even without full HATEOAS, include useful links in responses: pagination "next"/"prev" URLs, canonical resource URLs (self links), related resource URLs. Saves clients from constructing URLs and makes APIs more explorable.

**HAL (Hypertext Application Language) and JSON:API:** standardized formats for hypermedia REST APIs. HAL uses "_links" and "_embedded"; JSON:API uses "links" and "relationships". Worth considering if you want a formal hypermedia contract.

**Key insight:** Full HATEOAS is theoretically elegant but practically over-engineered for most APIs — clients will hardcode your URL patterns regardless of what links you return. Focus on self links and pagination links (high practical value) rather than trying to make clients fully link-following. The REST dissertation is a PhD thesis, not a prescription for every web API.`,
    },
    {
      id: 1236,
      name: "API Design Principles",
      desc: `**API Design Principles** — the guiding heuristics for designing APIs that are intuitive, consistent, and pleasant to use. Good API design is a craft — these principles are distilled from the collective experience of API teams at Stripe, Twilio, GitHub, and Google.

**Principle 1 — Design for your consumer, not your implementation:** the API shape should reflect what clients need, not what your database looks like. Expose resources and operations from the client's mental model.

**Principle 2 — Consistency is king:** naming conventions, error formats, date formats, pagination patterns — be consistent. An inconsistent API is the most frustrating kind. If you return "createdAt" in one endpoint and "created_date" in another, developers will hate you.

**Principle 3 — The principle of least astonishment:** APIs should do what developers expect. GET should never delete data. A "create user" endpoint should return the created user. Violations of expectations are integration bugs waiting to happen.

**Principle 4 — Explicit over implicit:** never silently ignore unrecognized fields (return 422). Make required vs. optional fields clear. Make side effects explicit (not hidden in query params).

**Principle 5 — Design for evolution:** use envelopes (wrapping responses in "{ data: ... }") to add metadata later. Make fields nullable initially rather than adding nullable later (breaking change).

**Principle 6 — Empathize with the error case:** design error responses as carefully as success responses. What will the developer see when things go wrong?

**Principle 7 — Be generous in what you accept, strict in what you return:** accept "email" or "emailAddress" in input (normalize internally); always return the canonical "email" field.

**Key insight:** The real test of API design quality is: can a developer use this API correctly with only the response they received, without reading the documentation? If they need the docs to avoid mistakes, the design failed. Great APIs are self-documenting through clear naming, consistent patterns, and intuitive structures.`,
    },
  ],
};

export default foundations;
