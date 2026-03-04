const performance = {
  name: "API Performance & Scalability",
  icon: "🚀",
  color: "#f59e0b",
  concepts: [
    {
      id: 1291,
      name: "API Latency & Throughput",
      desc: `**API Latency & Throughput** — the two foundational performance metrics for APIs. Latency = time for one request to complete; throughput = number of requests processed per second. They're related but distinct, and optimizations that improve one can worsen the other.

**Latency components (client perspective):**
- DNS resolution: 10-100ms (cached = 0ms)
- TCP + TLS handshake: 100-300ms (HTTP/2 persistent connections eliminate repeated handshakes)
- Time to First Byte (TTFB): server processing time — database queries, computation, downstream calls
- Data transfer: response payload traversal over the network

**Latency targets (rough industry benchmarks):**
- p50 (median): < 50ms for read endpoints, < 200ms for write endpoints
- p99 (99th percentile): < 500ms — the "tail latency" that affects 1% of requests and all users during contention
- p999 (99.9th percentile): < 2s — worst-case performance under load

**Throughput considerations:** a single API server handling 10ms requests can theoretically serve ~100 req/sec per CPU core. Real-world throughput is limited by the slowest resource: database connections, I/O wait, memory.

**Little's Law:** "Throughput = Concurrency / Latency". To double throughput: halve latency (faster) or double concurrency (more parallelism). Understanding this guides capacity planning.

**Tail latency (p99/p999):** the 99th percentile request is often 10-100x slower than the median. Sources: GC pauses, lock contention, database query plan changes, cold cache misses. Monitor p99, not just p50 — that's where user experience degrades.

**Key insight:** Median latency is a vanity metric. P99 latency is what your worst 1% of users experience — and under load, contention makes tail latencies worse. Always optimize for reducing p99, not p50. A service with p50=10ms and p99=5000ms has a serious performance problem invisible in the median.`,
    },
    {
      id: 1292,
      name: "Caching at the API Layer",
      desc: `**API-Layer Caching** — storing computed responses to avoid re-executing expensive operations (database queries, external API calls, computation) on every request. Caching is the single highest-leverage API performance optimization.

**Cache layers:**
1. **CDN/Edge cache:** for public, cacheable GET responses — response served from CDN without hitting origin. "Cache-Control: public, max-age=300, stale-while-revalidate=60"
2. **Application cache (Redis/Memcached):** cache expensive database query results, computed aggregations, external API responses. Hit rate target: 80%+ for read-heavy APIs.
3. **Database query cache:** database-level (PostgreSQL: query result caching via "pg_prewarm" or external cache); ORM-level (Hibernate second-level cache)
4. **In-process cache:** in-memory LRU cache within the application process (fastest; lost on restart; limited by instance memory). Node.js: lru-cache; Go: go-cache; Java: Caffeine.

**Cache-aside (lazy loading) pattern:** "const value = await redis.get(key); if (!value) { const data = await db.query(...); await redis.setex(key, TTL, JSON.stringify(data)); return data; } return JSON.parse(value);"

**Write-through cache:** on write, update both cache and database simultaneously. Keeps cache consistent; more complex; additional write latency.

**Cache invalidation strategies:**
- TTL-based: expire after N seconds (simple; may serve stale data)
- Event-based: invalidate on write ("cache.del(key)" when entity updates)
- Tag-based: invalidate all entries tagged with "product:123" when product 123 changes

**Cache stampede (thundering herd):** when a popular cache entry expires, many requests miss simultaneously and hammer the database. Mitigate with: probabilistic early recomputation, mutex locks on cache miss, staggered TTLs.

**Key insight:** "Cache invalidation is one of the two hard problems in computer science." TTL-based invalidation is wrong by up to TTL seconds but operationally simple. Event-based invalidation is correct but complex to implement without missing invalidation events. Start with TTL; move to event-based only for data where staleness causes real problems.`,
    },
    {
      id: 1293,
      name: "Connection Pooling",
      desc: `**Connection Pooling** — reusing a set of pre-established database or HTTP connections rather than creating a new connection for each request. Creating connections (TCP handshake + authentication) takes 10-100ms — at 100 req/sec without pooling, connection overhead dominates latency.

**Database connection pools:**
- PostgreSQL: "pg.Pool({ max: 20, idleTimeoutMillis: 30000 })" — max 20 connections; idle connections closed after 30s
- Connection pool sizing: "connections = (core_count * 2) + effective_spindle_count" (HikariCP formula). Too few: requests queue waiting for connections. Too many: database struggles with context switching.

**Connection pool monitoring:**
- Pool size vs active connections (are you exhausting the pool?)
- Connection wait time (time requests spend waiting for a connection)
- Connection errors (pool exhausted → "timeout waiting for connection")

**PgBouncer:** connection pooler for PostgreSQL that sits between your app and database. Your app opens 1000 connections to PgBouncer; PgBouncer maintains 20 real database connections. Transaction-mode pooling: a database connection is assigned for the duration of one transaction, then returned to pool.

**HTTP connection pooling (for outbound calls):** use HTTP clients with keep-alive and connection pooling for external API calls:
- Node.js http.Agent with "keepAlive: true, maxSockets: 10"
- Go's "http.Client" with custom transport: "MaxIdleConnsPerHost: 10"

**K8s + connection pooling:** with horizontal scaling, each pod opens its own connection pool. 50 pods × 20 connections = 1000 database connections. PgBouncer or RDS Proxy prevents connection exhaustion at scale.

**Key insight:** Running out of database connections is a common production scaling crisis that happens suddenly and catastrophically — all new requests queue, timeouts cascade, and the database is overwhelmed with connection creation. Size your connection pool based on load testing, not guessing. PgBouncer at the database level is non-negotiable at significant Kubernetes scale.`,
    },
    {
      id: 1294,
      name: "Async Processing & Job Queues",
      desc: `**Async Processing & Job Queues** — offloading slow, resource-intensive, or non-critical work from the API request-response cycle to background workers. The API returns immediately (202 Accepted); the work happens asynchronously.

**When to use async processing:**
- Operations taking > 500ms (sending emails, generating reports, processing images, running ML inference)
- Operations that can retry on failure (no synchronous client waiting)
- Operations triggered by events (webhook delivery, notification dispatch)
- Batch operations (nightly data exports, bulk email sends)

**Job queue architectures:**
- **Redis-based queues (BullMQ, Sidekiq):** fast, simple; at-least-once delivery; job priorities; delayed jobs; retry with backoff. Good for most use cases.
- **Message broker queues (RabbitMQ):** durable queues, complex routing (topics, exchanges), dead-letter queues. More operational overhead.
- **Cloud queues (SQS, Google Pub/Sub, Azure Service Bus):** fully managed, serverless; at-least-once; visibility timeout. No infrastructure to manage.
- **Temporal / Durable Execution:** workflow orchestration with automatic retry, state persistence, and versioning. For long-running multi-step workflows.

**API pattern for async jobs:**
"POST /reports { type: 'monthly_summary' } → 202 Accepted { jobId: 'job_abc123' }"
"GET /jobs/job_abc123 → { status: 'processing', progress: 65 } or { status: 'complete', result_url: '...' }"

Or use webhooks to push completion notification.

**At-least-once delivery + idempotency:** queues guarantee delivery at least once (can deliver multiple times on failure). Job handlers must be idempotent — safe to process the same job twice.

**Key insight:** The API response time is a contract with your users. Never make users wait for operations that don't need to complete before the response. An email send that takes 2 seconds in the request path becomes a job queued in 2ms. This pattern is the most impactful architectural change for improving API p99 latency at scale.`,
    },
    {
      id: 1295,
      name: "Database Query Optimization for APIs",
      desc: `**Database Query Optimization for APIs** — the techniques for making database queries fast at scale. APIs are typically I/O-bound: 80%+ of API latency is database query time. Optimizing queries is the highest-ROI API performance work.

**Index design:**
- Index columns used in "WHERE", "ORDER BY", "JOIN ON" clauses
- Composite indexes follow the selectivity rule: most selective column first
- "EXPLAIN ANALYZE" in PostgreSQL shows query plan and actual execution stats — always analyze slow queries
- Partial indexes: "CREATE INDEX ON orders(user_id) WHERE status = 'active'" — index only active orders; much smaller, faster for the common query

**N+1 query elimination:**
"SELECT * FROM orders" → loop: "SELECT * FROM users WHERE id = ?" × N = N+1 queries. Fix: JOIN or WHERE IN: "SELECT * FROM orders JOIN users ON orders.user_id = users.id" or "SELECT * FROM users WHERE id IN (1, 2, 3, ...)"

**SELECT only what you need:** "SELECT id, name, email FROM users" not "SELECT *" — reduces data transfer between database and application. Matters enormously for wide tables.

**Pagination at the database level:** always use "LIMIT" and "OFFSET" (or cursor/keyset). Never "SELECT * FROM orders" and paginate in application memory — catastrophic for large tables.

**Read replicas:** direct read queries (GET endpoints, search) to read replicas; writes to primary. Horizontally scales read throughput without touching write capacity.

**Connection-level optimization:** use prepared statements (compiled once, executed many times); use transactions to batch related writes; avoid long-running transactions (lock contention).

**Key insight:** A single missing index can make a query 1000x slower. "EXPLAIN ANALYZE" is the most powerful performance tool available — run it on every slow query before optimizing. The query plan reveals sequential scans (missing index), nested loops (N+1), and expensive sorts that point directly to the fix.`,
    },
    {
      id: 1296,
      name: "API Load Testing",
      desc: `**API Load Testing** — systematically applying increasing load to an API to measure performance characteristics, find breaking points, and validate that the system meets throughput and latency targets under expected and peak load.

**Load test types:**
- **Load test:** simulate expected production load; verify system performs within SLA. Baseline validation.
- **Stress test:** increase load until system degrades; find the breaking point and failure mode. Capacity planning.
- **Spike test:** sudden traffic burst (product launch, news coverage); verify system recovers after spike.
- **Soak test:** sustained load over hours/days; finds memory leaks, connection pool exhaustion, slow resource accumulation.

**Tools:**
- **k6 (JavaScript):** script load tests in JS; excellent CLI and cloud runner; Grafana integration. Standard choice for API load testing.
- **Locust (Python):** write tests in Python; easy to model complex user behavior; distributed load generation.
- **Gatling (Scala DSL):** high-performance load generation; excellent HTML reports; steep learning curve.
- **Artillery:** YAML-based; good for quick API load tests without deep scripting.
- **Apache JMeter:** GUI-based; widely used in enterprise; heavy but feature-rich.

**k6 example:**
"export default function () { http.get('https://api.example.com/products', { headers: { Authorization: 'Bearer ' + TOKEN } }); check(res, { 'status 200': (r) => r.status === 200, 'p95 < 500ms': () => res.timings.duration < 500 }); sleep(1); }"

**What to measure:** p50/p95/p99 latency per endpoint; error rate (< 0.1% target); throughput (requests/sec); server resource utilization (CPU, memory, connections) under load.

**Key insight:** Load test before you launch, not after you're paged at 3am. The target: system handles 2x expected peak load with p99 < SLA target and error rate < 0.1%. Run load tests against a staging environment that mirrors production configuration. A system that passes load tests with one database connection and in-memory cache won't perform the same in production.`,
    },
  ],
};

export default performance;
