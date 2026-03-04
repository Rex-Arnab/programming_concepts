const rest = {
  name: "REST & HTTP APIs",
  icon: "🌐",
  color: "#3b82f6",
  concepts: [
    {
      id: 1237,
      name: "REST Constraints",
      desc: `**REST (Representational State Transfer)** — an architectural style defined by Roy Fielding in his 2000 dissertation. REST is not a protocol or standard — it's a set of six constraints that, when followed, produce scalable, stateless, uniform APIs. Most "REST APIs" are actually REST-ish (they don't follow all constraints).

**The six constraints:**
1. **Client-server:** separation of concerns — UI concerns separate from data storage. Client doesn't need to know how data is stored; server doesn't need to know how data is rendered.
2. **Stateless:** each request must contain all information needed to process it. Server stores no session state. Scales horizontally — any server can handle any request.
3. **Cacheable:** responses must declare themselves cacheable or non-cacheable. Enables CDN and browser caching; critical for performance.
4. **Uniform interface:** a consistent interface between components (resources, HTTP verbs, representations, HATEOAS). Simplifies architecture; enables independent evolution.
5. **Layered system:** client can't tell if it's connected to the origin server or an intermediary (proxy, CDN, gateway). Enables load balancers, caches, security layers.
6. **Code on demand (optional):** servers can extend client functionality by transferring executable code (JavaScript). The only optional constraint.

**REST vs RESTful vs REST-ish:** most APIs called "REST APIs" violate HATEOAS (no hypermedia links) and sometimes statelessness (session cookies). Pragmatic APIs that follow constraints 1-5 are good enough.

**Key insight:** The most valuable REST constraints in practice are statelessness (enables horizontal scaling) and uniform interface (HTTP methods + resource URLs). Don't get dogmatic about HATEOAS; do get rigorous about statelessness and correct HTTP semantics.`,
    },
    {
      id: 1238,
      name: "HTTP Methods & Semantics",
      desc: `**HTTP Methods (Verbs)** — the standardized actions in HTTP that specify the intent of a request. Using the correct HTTP method is not optional — it enables caching, idempotency, browser behavior, and proxy behavior to work correctly.

**Core methods:**
- **GET:** retrieve a resource; safe (no side effects) + idempotent; responses cacheable; body allowed but ignored by convention. Never modify state with GET — search engine crawlers and monitoring tools will call it.
- **POST:** create a resource or trigger an action; neither safe nor idempotent; response not cached by default. The only method for non-idempotent operations.
- **PUT:** replace a resource completely (full representation required); idempotent; "if the resource doesn't exist, create it." Sending partial PUT = clearing missing fields.
- **PATCH:** partial update (only send changed fields); not inherently idempotent (concurrent patches can conflict); use for partial updates to avoid PUT's "replace everything" semantics.
- **DELETE:** remove a resource; idempotent (deleting a deleted resource = 404 or 204, same outcome); no request body by convention.
- **HEAD:** same as GET but returns only headers, no body. Use for cache validation and checking resource existence.
- **OPTIONS:** returns allowed methods for a URL. Used by browsers for CORS preflight requests.

**Safe methods:** GET, HEAD, OPTIONS — no side effects; can be retried and cached freely.

**Idempotent methods:** GET, HEAD, PUT, DELETE, OPTIONS — safe to retry on failure.

**Real-world abuses:** "GET /users/delete/5", "POST /getUser" — break caching, monitoring, idempotency guarantees, and developer expectations. Use correct methods.

**Key insight:** HTTP methods carry semantic weight beyond routing. GET responses can be cached by CDNs without your code running. DELETE being idempotent means a retry after a network failure is safe. These semantics exist to enable the web to scale — violating them creates subtle, hard-to-debug issues.`,
    },
    {
      id: 1239,
      name: "Resource Naming & URL Design",
      desc: `**Resource Naming & URL Design** — the conventions for structuring URL paths that make REST APIs intuitive, consistent, and self-describing. URLs are the primary interface developers see — they shape the mental model of your entire API.

**Core conventions:**
- Use **nouns for resources**, not verbs: "/users" not "/getUsers"; "/orders/123/cancel" (action as sub-resource) not "/cancelOrder?id=123"
- Use **plural nouns**: "/users" not "/user"; "/products" not "/product"
- Use **lowercase and hyphens**: "/user-profiles" not "/UserProfiles" or "/user_profiles"
- Use **nested resources for relationships**: "/users/123/orders" for orders belonging to user 123
- Avoid deep nesting (> 2-3 levels): "/users/123/orders/456/items/789/reviews" is too deep; use "GET /reviews?order_item_id=789" instead

**Collection vs. item URLs:**
- "GET /users" → list of users (200 with array)
- "POST /users" → create a user (201 with new resource)
- "GET /users/123" → get specific user (200 or 404)
- "PUT /users/123" → replace user (200 or 204)
- "PATCH /users/123" → partial update (200 or 204)
- "DELETE /users/123" → delete user (204 or 404)

**Actions that don't fit CRUD:** use sub-resources: "POST /orders/123/cancel", "POST /users/123/activate", "POST /payments/123/refund".

**Query strings for filtering, sorting, searching:** "GET /products?category=electronics&sort=price_asc&q=laptop&page=2&limit=20"

**Key insight:** Consistent URL patterns are more important than perfect REST purity. If your entire API uses "/v1/{resource}/{id}/{sub-resource}", developers can guess the URL for any new resource. Inconsistency ("GET /users/123" but "GET /getOrder?order_id=456") forces developers to consult docs for every endpoint.`,
    },
    {
      id: 1240,
      name: "HTTP Status Codes",
      desc: `**HTTP Status Codes** — the three-digit numeric codes in HTTP responses that communicate the outcome of a request. Using correct status codes is critical for caching, monitoring, error handling, and developer experience.

**Essential codes for REST APIs:**

**2xx — Success:**
- **200 OK:** successful GET, PUT, PATCH. Response body contains representation.
- **201 Created:** successful POST that created a resource. Include "Location: /users/123" header pointing to new resource.
- **202 Accepted:** request accepted for async processing (job queued). Response body may include a job ID to poll.
- **204 No Content:** successful DELETE or PUT/PATCH with no response body. Do not return 200 with empty body.

**4xx — Client Errors:**
- **400 Bad Request:** malformed syntax, invalid JSON, missing required fields
- **401 Unauthorized:** not authenticated (confusing name — means "not logged in")
- **403 Forbidden:** authenticated but not authorized (has token but lacks permission)
- **404 Not Found:** resource doesn't exist (also used to hide existence for security: returning 404 instead of 403)
- **409 Conflict:** state conflict (duplicate unique field, optimistic concurrency failure)
- **410 Gone:** resource existed and was permanently deleted (vs. 404 = never existed or we're not saying)
- **422 Unprocessable Entity:** valid syntax, but failed validation (wrong email format, value out of range)
- **429 Too Many Requests:** rate limit exceeded. Include "Retry-After" header.

**5xx — Server Errors:**
- **500 Internal Server Error:** unhandled exception, bug in server code
- **502 Bad Gateway:** upstream service returned an invalid response
- **503 Service Unavailable:** server overloaded or maintenance; include "Retry-After"
- **504 Gateway Timeout:** upstream service timed out

**Key insight:** 401 vs 403 trips up many developers. Simple rule: 401 = "who are you?" (please authenticate); 403 = "I know who you are, but no." Never return 200 with an error body — every monitoring tool, HTTP cache, and client library treats 200 as success.`,
    },
    {
      id: 1241,
      name: "Content Negotiation",
      desc: `**Content Negotiation** — the HTTP mechanism for clients and servers to agree on the format (media type) and language of the response. Allows a single URL to serve different representations of the same resource.

**Accept header (client preference):**
"Accept: application/json, application/xml;q=0.8, */*;q=0.1"
- "q=" is the quality factor (preference weight, 0-1). "application/json" preferred, then XML, then anything.
- Server returns the best match from its supported types; responds with "Content-Type: application/json"

**Content-Type header (request body format):**
- "Content-Type: application/json" — request body is JSON
- "Content-Type: multipart/form-data" — file upload
- "Content-Type: application/x-www-form-urlencoded" — HTML form submission

**Accept-Language:** "Accept-Language: en-US, fr;q=0.8" — server returns response in English or French.

**Accept-Encoding:** "Accept-Encoding: gzip, br" — server compresses with gzip or Brotli. Transparent to application code; handled by HTTP server layer.

**Versioning via content type:** "Accept: application/vnd.example.v2+json" — a versioning strategy using custom media types. Elegant but poor developer experience (hard to test in browser, invisible in logs).

**Vary header:** "Vary: Accept-Encoding, Accept-Language" — tells CDNs that responses can differ based on these request headers; cache stores separate versions per combination.

**Key insight:** Always validate and respond with correct "Content-Type" headers. Returning "Content-Type: text/html" for JSON confuses clients. Accept the "Accept" header seriously in APIs that support multiple formats (JSON and XML). Ignoring it and always returning JSON is acceptable for JSON-only APIs.`,
    },
    {
      id: 1242,
      name: "CORS (Cross-Origin Resource Sharing)",
      desc: `**CORS (Cross-Origin Resource Sharing)** — a browser security mechanism that restricts web pages from making requests to a different origin (domain, protocol, or port) than the page's origin. APIs serving browser-based clients must configure CORS correctly or browser requests will be blocked.

**Same-origin policy:** browsers block JavaScript "fetch()" calls to different origins by default. "api.example.com" is a different origin from "app.example.com" (different subdomain).

**CORS flow:**
1. Browser sends preflight "OPTIONS" request with "Origin" and "Access-Control-Request-Method" headers
2. Server responds with allowed origins, methods, headers: "Access-Control-Allow-Origin: https://app.example.com"
3. Browser sends actual request
4. Server responds with "Access-Control-Allow-Origin" on every response

**Key response headers:**
- "Access-Control-Allow-Origin": "*" (any origin) or specific origin. Use specific origins in production — "*" disables cookies.
- "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS"
- "Access-Control-Allow-Headers": "Authorization, Content-Type, X-Request-ID"
- "Access-Control-Allow-Credentials": "true" — required to send cookies cross-origin
- "Access-Control-Max-Age": "86400" — cache preflight response for 24 hours (reduces OPTIONS overhead)

**Credentials + wildcard conflict:** "Access-Control-Allow-Origin: *" cannot be combined with "Access-Control-Allow-Credentials: true" — must specify explicit origin for credentialed requests.

**Not a security measure:** CORS is enforced by the browser, not the server. Server-to-server requests (curl, Postman, other backends) bypass CORS entirely. CORS protects users from malicious websites making requests with their cookies — it doesn't protect APIs from non-browser clients.

**Key insight:** CORS errors are the most common API integration frustration for frontend developers. Configure CORS headers correctly, including pre-flight OPTIONS handling, and document which origins are allowed. Never use "*" in production for APIs that use cookies or authentication headers.`,
    },
    {
      id: 1243,
      name: "HTTP Caching",
      desc: `**HTTP Caching** — the browser and proxy caching mechanisms built into HTTP that allow responses to be stored and reused, reducing server load, bandwidth, and latency. Correctly configured caching is one of the highest-leverage performance optimizations for REST APIs.

**Cache-Control directive:** the primary caching header. Value is comma-separated directives:
- "Cache-Control: no-store" — never cache (sensitive data: bank balances, private messages)
- "Cache-Control: no-cache" — cache but always revalidate with server before serving (ETag/Last-Modified)
- "Cache-Control: public, max-age=3600" — cache for 1 hour in any cache (browser + CDN)
- "Cache-Control: private, max-age=300" — cache for 5 minutes only in browser (not CDN)
- "Cache-Control: stale-while-revalidate=60" — serve stale while revalidating in background (60-second grace)
- "Cache-Control: immutable" — content never changes; never revalidate (for content-addressed URLs)

**Conditional requests (validation):**
- "ETag: "abc123"" — fingerprint of the response content
- "Last-Modified: Tue, 01 Jan 2025 00:00:00 GMT"
- Client sends "If-None-Match: abc123" or "If-Modified-Since: ..." on next request
- Server returns 304 Not Modified (no body, tiny response) if content unchanged

**GET vs POST caching:** GET responses are cacheable by default (with proper headers); POST responses are not cached by default. This is why search APIs sometimes use GET with query params rather than POST with body.

**CDN caching:** "Cache-Control: public, s-maxage=300" — cached at CDN edge for 5 minutes. "Vary: Accept-Encoding" — CDN stores separate versions per encoding.

**Key insight:** Every API endpoint should have an explicit "Cache-Control" header. No header = browser and proxies apply their own heuristic caching. "no-store" for private data; "max-age" + "stale-while-revalidate" for public data. Correct caching can reduce origin server load by 80%+ for read-heavy APIs.`,
    },
    {
      id: 1244,
      name: "REST API Request/Response Design",
      desc: `**REST Request/Response Design** — the conventions for structuring JSON request bodies and response payloads that make APIs consistent, evolvable, and pleasant to use.

**Response envelope pattern:**
"{ data: { id: 123, name: 'Alice' }, meta: { request_id: 'req_abc', timestamp: '2025-01-01T00:00:00Z' }, links: { self: '/users/123' } }"

Wrapping "data" allows adding "meta", "links", and "errors" fields later without breaking clients. APIs that return bare objects (just "{ id: 123 }") can't add metadata without a breaking change.

**List responses:**
"{ data: [{ id: 1 }, { id: 2 }], pagination: { total: 1000, page: 1, per_page: 20, next_cursor: 'xyz' } }"

**Naming conventions:**
- Use "snake_case" (most common in REST: Stripe, GitHub, Twilio) or "camelCase" (JSON-native, preferred in JavaScript ecosystems)
- Be consistent — never mix
- Boolean fields: "is_active", "has_access", "can_edit" (not "active", "access", "edit")
- Timestamps: ISO 8601 strings ("2025-01-01T00:00:00Z") not Unix timestamps (human-readable, timezone-aware)
- IDs: string representation even if internally integer (avoids JavaScript integer precision issues for large IDs)

**Partial responses (field selection):** "GET /users/123?fields=id,name,email" — return only requested fields. Reduces payload size for bandwidth-constrained clients. Used by Google APIs.

**Empty states:** always return an empty array ("[]") instead of "null" for empty collections. "null" forces null checks; "[]" can be iterated directly.

**Key insight:** The most impactful response design decision is whether to use an envelope. Start with an envelope from day one — adding it later requires a version bump. Stripe wraps everything; GitHub wraps paginated resources. The 3 lines of boilerplate save years of version headaches.`,
    },
    {
      id: 1245,
      name: "OpenAPI Specification",
      desc: `**OpenAPI Specification (OAS)** — the de facto standard for describing REST APIs in a machine-readable format (JSON or YAML). Formerly Swagger. An OpenAPI document describes every endpoint, request/response schema, authentication method, and error response.

**OAS enables:**
- **Documentation:** auto-generate interactive docs (Swagger UI, Redoc)
- **Client SDKs:** generate type-safe clients in any language (openapi-generator)
- **Server stubs:** generate server scaffolding to implement
- **Request validation:** validate requests against the schema at the API gateway layer
- **Mock servers:** generate mock responses from the schema for frontend dev before backend is ready
- **Contract testing:** ensure the implementation matches the spec

**Core structure:**
"openapi: 3.1.0, info: { title, version }, paths: { /users: { get: { summary, parameters, responses }, post: { requestBody, responses } } }, components: { schemas: { User: { type: object, properties: { id: { type: string } } } } }"

**OAS 3.1 vs 3.0:** OAS 3.1 is fully aligned with JSON Schema draft 2020-12; supports "webhooks" natively; "$ref" improvements. Use 3.1 for new APIs.

**Generating from code vs. writing spec-first:** code-first (annotations in controllers → generated spec) is fast but produces spec that reflects implementation; spec-first (write OAS → generate stubs) enables API-first design. Spec-first produces better designed APIs.

**Tools:** Stoplight Studio (visual editor), SwaggerHub (team collaboration), Redocly (linting + docs), openapi-generator (SDK generation), Spectral (spec linting rules).

**Key insight:** Maintaining an OpenAPI spec is non-negotiable for any public or partner API. The tooling ecosystem means you write the spec once and get documentation, validation, SDKs, and mock servers for free. Teams that skip the spec spend 3x as long writing documentation and handling integration support requests.`,
    },
    {
      id: 1246,
      name: "REST API Testing",
      desc: `**REST API Testing** — the practices and tools for validating API behavior, performance, and contract compliance. Testing APIs is distinct from testing internal code — it tests the HTTP interface, headers, status codes, and response shapes.

**Testing layers:**
- **Unit tests:** individual functions/handlers in isolation (mock database, mock HTTP clients)
- **Integration tests:** full request-response cycle with real database; test actual HTTP behavior, middleware, authentication
- **Contract tests:** verify the API matches its OpenAPI specification; catch spec drift
- **End-to-end tests:** test complete user flows across multiple API calls
- **Load tests:** validate performance at expected and peak traffic

**Tools:**
- **Postman / Insomnia:** manual exploration + automated test collections; Postman's Newman CLI runs collections in CI
- **Rest-assured (Java), Supertest (Node.js), pytest-httpx (Python):** code-first integration testing frameworks
- **Dredd:** runs test scenarios from an OpenAPI spec against a live server; validates spec compliance
- **k6 / Locust / Gatling:** load testing with scenario scripting
- **Schemathesis:** property-based testing that automatically generates test cases from OpenAPI spec and finds edge cases

**What to test in integration tests:** status codes, response body structure (not just presence — validate types), required headers, authentication enforcement (401 without credentials, 403 with wrong role), pagination behavior, error responses.

**Contract testing (Pact):** consumer-driven contract testing — the consumer defines what it needs from the API; Pact verifies the provider satisfies those contracts. Catches breaking changes before they reach production.

**Key insight:** The most valuable API test is the one that catches a breaking change before it ships. Contract tests (Dredd vs. OpenAPI spec, Pact for consumer contracts) provide this safety net. Unit tests test implementation; contract tests test the interface — both are essential.`,
    },
    {
      id: 1247,
      name: "JSON:API & HAL",
      desc: `**JSON:API and HAL** — standardized JSON response formats for REST APIs that impose consistent conventions for resource representation, relationships, pagination, and links. Adopting a standard format enables reusable client libraries and reduces bikeshedding on response design.

**JSON:API (jsonapi.org):**
"{ data: { type: 'users', id: '1', attributes: { name: 'Alice', email: 'alice@example.com' }, relationships: { posts: { data: [{ type: 'posts', id: '1' }] } } }, included: [{ type: 'posts', id: '1', attributes: { title: 'Hello' } }] }"

- Resources have explicit "type" and "id" fields
- Relationships use resource linkage (type + id references)
- "included" for compound documents (side-loaded related resources — no N+1 fetching)
- Standardized pagination via "links": { first, last, prev, next }
- Standardized error format

**HAL (Hypertext Application Language):**
"{ id: 1, name: 'Alice', _links: { self: { href: '/users/1' }, posts: { href: '/users/1/posts' } }, _embedded: { posts: [{ id: 1, title: 'Hello', _links: { self: { href: '/posts/1' } } }] } }"

- "_links" for hypermedia links; "_embedded" for embedded related resources
- Simpler than JSON:API; less opinionated

**When to adopt:** consider JSON:API or HAL when building for multiple client types or when you want reusable generic API client libraries. For single-team internal APIs, custom conventions with a consistent envelope are often simpler.

**Key insight:** JSON:API solves real problems (N+1 fetching via "included", consistent pagination) but adds verbosity and learning curve. The "type" wrapping that JSON:API requires feels bureaucratic for simple APIs. Use it when the standardization benefits outweigh the verbosity cost — typically for public APIs with diverse client ecosystems.`,
    },
    {
      id: 1248,
      name: "REST Best Practices & Pitfalls",
      desc: `**REST Best Practices & Pitfalls** — the common mistakes that experienced REST API designers avoid and the practical conventions that separate good APIs from painful ones.

**Pitfalls:**

**Chatty APIs:** requiring 10 round trips to render one screen. Fix: allow field selection, compound documents, or batch endpoints for known high-frequency operation groups.

**Overfetching:** returning all 50 fields of a user object when the client only needs 3. Fix: field selection ("?fields=id,name") or GraphQL.

**Underfetching:** not including related data the client almost always needs. Fix: support "?include=author,tags" for common relationship inclusions.

**Anemic resources:** modeling every action as a separate endpoint ("POST /startOrder", "POST /confirmOrder", "POST /shipOrder") instead of state transitions on resources ("PATCH /orders/123 { status: 'confirmed' }").

**Exposing database schemas:** returning column names, foreign keys, and internal IDs directly. Clients couple to your DB structure. Use a translation layer.

**Ignoring HTTP semantics:** using POST for all operations; returning 200 for errors; ignoring caching headers.

**No API key → can't deprecate:** without API keys (even free-tier ones), you can't identify which clients use which endpoints. You're flying blind on deprecation impact.

**Best practices:**
- Include "request_id" in every response for tracing
- Return the resource after create/update (not just 204)
- Use "Link" headers for pagination (GitHub does this)
- Support bulk operations for high-volume use cases
- Implement health check endpoint ("GET /health" → 200 OK)
- Document all query parameters, headers, and error codes

**Key insight:** Most REST API problems are discovered in production when clients have already integrated. The cost of fixing a bad URL structure, wrong status code, or missing field after public launch is orders of magnitude higher than fixing it in design review. Invest in API design reviews before shipping.`,
    },
  ],
};

export default rest;
