const performanceAntipatterns = {
  name: "Performance Antipatterns",
  icon: "⚠",
  color: "#EF4444",
  concepts: [
    {
      id: 135,
      name: "N+1 Query Problem",
      desc: "You fetch N records, then issue one query per record to fetch related data — 1 + N queries total. Fetching 100 posts and then querying comments for each post = 101 queries. The ORM hides this beautifully until production load exposes 10,000 queries/request. Fix: eager loading (JOIN or IN clause), DataLoader (batching), or GraphQL's dataloader pattern. Profile with query counting middleware.",
    },
    {
      id: 136,
      name: "Chatty I/O",
      desc: "Making many small, frequent network or disk calls instead of fewer, larger batched ones. Calling an external API 1,000 times in a loop vs. once with a bulk endpoint. Each call incurs network round-trip latency (1–100ms), adding up to seconds of wasted time. Fix: batch APIs, bulk database inserts, buffered writes, pipelining (Redis), or consolidating reads into single queries.",
    },
    {
      id: 137,
      name: "Busy Database",
      desc: "Pushing business logic into the database (stored procedures, triggers, heavy JOINs, aggregations) that should live in application code. Databases are hard to scale horizontally; application servers are not. A database doing too much computation becomes the global bottleneck — it can't be replicated cheaply. Move logic to the application layer; use the database for storage and indexed retrieval only.",
    },
    {
      id: 138,
      name: "Synchronous I/O Blocking",
      desc: "Performing blocking I/O (network calls, disk reads, DB queries) on threads that could serve other requests. In a thread-per-request model, a 100ms DB call blocks that thread for 100ms. At 100 concurrent users, you need 100 threads. Fix: async/await (Node.js, Kotlin coroutines, Python asyncio) or reactive programming. Non-blocking I/O multiplexes thousands of concurrent operations on few threads.",
    },
    {
      id: 139,
      name: "Retry Storm (Thundering Herd)",
      desc: "When a service goes down, all clients simultaneously retry, causing a massive traffic spike the moment the service recovers — crashing it again instantly. Also occurs when a cache expires and thousands of requests simultaneously hit the database. Fix: exponential backoff with jitter for retries; cache stampede prevention via probabilistic early expiration or a single 'cache-filler' lock (mutex/promise coalescing).",
    },
    {
      id: 140,
      name: "Hot Partition / Hot Key Problem",
      desc: "One shard or partition receives disproportionate traffic while others sit idle. Sharding by user_id but one celebrity user drives 80% of reads. Or a cache key that 10,000 req/s all want simultaneously. Fix: add randomized prefix/suffix to distribute across shards, add local in-process caching for extreme hot keys, use read replicas, or redesign the partition key. Monitoring: watch for partition traffic imbalance.",
    },
    {
      id: 141,
      name: "Cache Bypass (No Caching)",
      desc: "Fetching the same expensive data from the database on every request without caching it. A product page that runs 10 queries each time it loads, but the data changes only once per hour. 10,000 req/s × 10 queries = 100,000 DB queries/s when 1,000/s would suffice. Identify read-heavy, write-infrequent data and cache it at the right layer (CDN, in-memory, Redis) with an appropriate TTL.",
    },
    {
      id: 142,
      name: "Extraneous Fetching (Over-fetching)",
      desc: "Fetching far more data than you need. SELECT * when you need two columns. Loading entire user objects to check a single boolean. Fetching 10,000 rows to display 20. The REST 'over-fetching' problem that GraphQL was designed to solve. Extra data means more bytes over the wire, more memory allocated, more serialization cost. Always SELECT only needed columns; paginate large result sets.",
    },
    {
      id: 143,
      name: "Improper Instantiation",
      desc: "Creating expensive objects (DB connections, HTTP clients, thread pools) per request instead of reusing shared instances. Opening a new database connection for every query destroys performance — connection setup alone takes 10–100ms. Fix: connection pooling (PgBouncer, HikariCP), singleton HTTP clients, shared thread pools. Stateless expensive clients should be initialized once at startup and reused across requests.",
    },
    {
      id: 144,
      name: "Noisy Neighbor",
      desc: "In shared infrastructure (multi-tenant databases, shared Kubernetes nodes, shared caches), one tenant's heavy workload degrades performance for all others. A batch job monopolizes CPU; a bursty tenant exhausts connection pool slots. Fix: resource quotas and limits (Kubernetes requests/limits, DB connection limits per tenant), separate pools per tier, or physical isolation for high-value tenants. Monitor per-tenant resource consumption.",
    },
    {
      id: 145,
      name: "Monolithic Datastore",
      desc: "Using a single relational database for every data need: user sessions, event logs, full-text search, time-series metrics, graph relationships. SQL databases excel at structured relational data but are poor at document storage, time-series, graph traversals, and text search. The right tool: Elasticsearch for search, Redis for sessions, InfluxDB for metrics, Neo4j for graphs. Polyglot persistence wins at scale.",
    },
    {
      id: 146,
      name: "Distributed Monolith",
      desc: "You split into microservices but services are tightly coupled — they share databases, make synchronous chains of calls, or must deploy together. You get all the complexity of distributed systems with none of the benefits of decoupling. The worst of both worlds. Fix: each service owns its data (no shared DB), communication via async events, independent deployability is the true test of microservice architecture.",
    },
  ],
};
export default performanceAntipatterns;
