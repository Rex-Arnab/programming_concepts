const scalabilityPerformance = {
  name: "Scalability & Performance",
  icon: "◎",
  color: "#F43F5E",
  concepts: [
    { id: 139, name: "Horizontal vs Vertical Scaling", desc: "Vertical: bigger server (more CPU/RAM). Horizontal: more servers behind load balancer. Horizontal is preferred for resilience and unlimited growth. Stateless services scale horizontally." },
    { id: 140, name: "Load Balancing", desc: "Distribute traffic across servers. Algorithms: Round Robin, Least Connections, IP Hash, Weighted. Layer 4 (TCP) vs Layer 7 (HTTP). Nginx, HAProxy, AWS ALB/NLB." },
    { id: 141, name: "Reverse Proxy", desc: "Sits in front of backend servers. SSL termination, compression, caching, rate limiting, request routing. Nginx, Caddy, Traefik. Often combined with load balancer." },
    { id: 142, name: "Database Connection Pooling", desc: "Reuse connections instead of creating per request. PgBouncer (transaction/session pooling), HikariCP, generic-pool. Reduces connection overhead 10-100x." },
    { id: 143, name: "Query Optimization", desc: "EXPLAIN ANALYZE for query plans. Add indexes for WHERE/JOIN columns. Avoid SELECT *. Use pagination. Optimize N+1 queries. Slow query log for identification." },
    { id: 144, name: "Async Processing", desc: "Offload heavy work from request cycle. Image processing, email sending, report generation → background queues. Return 202 Accepted, poll or callback for result." },
    { id: 145, name: "Concurrency Models", desc: "Thread-per-request (Java), event loop (Node.js), goroutines (Go), actor model (Erlang/Akka), async/await (Python asyncio). Each handles concurrent requests differently." },
    { id: 146, name: "Back-of-the-Envelope Estimation", desc: "Quick capacity math. QPS, storage growth, bandwidth needs. 86,400 seconds/day. 1M daily users ≈ 12 QPS average. 10:1 read:write ratio. Size requests to plan infrastructure." },
    { id: 147, name: "Graceful Shutdown", desc: "Handle SIGTERM: stop accepting new requests, finish in-flight requests, close DB connections, flush logs. Process managers (PM2, systemd) send signals on deploy." },
    { id: 148, name: "Compression (gzip / Brotli)", desc: "Compress HTTP responses to reduce transfer size. Brotli: better compression ratio. gzip: wider support. Content-Encoding header. 60-80% size reduction for text." },
    { id: 149, name: "Batch Processing", desc: "Processing large datasets in batches rather than real-time. ETL pipelines, report generation, data migrations. Spark, Hadoop MapReduce, custom scripts with chunking." },
    { id: 150, name: "Stream Processing", desc: "Processing data in real-time as it arrives. Kafka Streams, Flink, Storm. Windowing, aggregations, joins on streams. Lower latency than batch. Exactly-once semantics." },
  ],
};
export default scalabilityPerformance;
