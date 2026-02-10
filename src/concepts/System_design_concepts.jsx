import { useState } from "react";

export const meta = {
  title: "System Design Concepts",
  description: "Core system design principles and patterns",
};

const categories = [
  {
    name: "Fundamentals",
    icon: "◆",
    color: "#E8553A",
    concepts: [
      { id: 1, name: "Scalability", desc: "System's ability to handle increased load. Vertical scaling (bigger machine) vs Horizontal scaling (more machines)." },
      { id: 2, name: "Availability", desc: "Percentage of time a system is operational. Measured in 'nines' — 99.99% = ~52 min downtime/year." },
      { id: 3, name: "Reliability", desc: "Ability to perform correctly over time, even during failures. Includes fault tolerance & data durability." },
      { id: 4, name: "Latency vs Throughput vs Bandwidth", desc: "Latency = time per request. Throughput = requests per second. Bandwidth = max data transfer capacity." },
      { id: 5, name: "Fault Tolerance", desc: "System continues operating properly despite component failures. Achieved via redundancy and graceful degradation." },
      { id: 6, name: "High Availability vs Fault Tolerance", desc: "HA minimizes downtime; FT ensures zero interruption. FT is stricter and more expensive than HA." },
      { id: 7, name: "Single Point of Failure (SPOF)", desc: "A component whose failure brings down the entire system. Eliminated through redundancy and failover." },
      { id: 8, name: "Disaster Recovery", desc: "Strategies to restore systems after catastrophic failures. RPO (data loss tolerance) and RTO (recovery time)." },
      { id: 9, name: "Back-of-the-Envelope Estimation", desc: "Quick calculations to estimate system capacity needs — storage, bandwidth, servers, QPS." },
      { id: 10, name: "SLAs, SLOs, SLIs", desc: "Service Level Agreements/Objectives/Indicators. Contracts and metrics defining expected system performance." },
    ],
  },
  {
    name: "Networking & Communication",
    icon: "⬡",
    color: "#3A8FE8",
    concepts: [
      { id: 11, name: "Client-Server Architecture", desc: "Clients send requests, servers process and respond. Foundation of web architecture." },
      { id: 12, name: "DNS (Domain Name System)", desc: "Translates domain names to IP addresses. Hierarchical system with caching at multiple levels." },
      { id: 13, name: "CDN (Content Delivery Network)", desc: "Geographically distributed servers caching content closer to users. Reduces latency for static assets." },
      { id: 14, name: "API Design", desc: "Defining interfaces for system communication. Includes endpoint design, versioning, pagination, error handling." },
      { id: 15, name: "REST APIs", desc: "Stateless, resource-based API style using HTTP methods (GET, POST, PUT, DELETE). Most common web API pattern." },
      { id: 16, name: "GraphQL", desc: "Query language for APIs letting clients request exactly the data they need. Solves over/under-fetching." },
      { id: 17, name: "gRPC", desc: "High-performance RPC framework using Protocol Buffers. Binary format, HTTP/2, ideal for microservice communication." },
      { id: 18, name: "WebSockets", desc: "Full-duplex communication over a single TCP connection. Enables real-time bidirectional data flow." },
      { id: 19, name: "Long Polling vs Short Polling", desc: "Short polling: repeated requests at intervals. Long polling: server holds request until data is available." },
      { id: 20, name: "Server-Sent Events (SSE)", desc: "One-way server-to-client streaming over HTTP. Simpler than WebSockets for push notifications." },
      { id: 21, name: "Synchronous vs Asynchronous Communication", desc: "Sync: caller waits for response. Async: caller continues, response handled later via callbacks/queues." },
      { id: 22, name: "HTTP/HTTPS & TLS", desc: "Application protocol for the web. HTTPS adds TLS encryption for secure data transmission." },
      { id: 23, name: "TCP vs UDP", desc: "TCP: reliable, ordered delivery. UDP: fast, connectionless, no delivery guarantees. Gaming/streaming uses UDP." },
    ],
  },
  {
    name: "Data & Databases",
    icon: "⬢",
    color: "#2EBF6E",
    concepts: [
      { id: 24, name: "SQL vs NoSQL", desc: "SQL: structured, ACID, relational (PostgreSQL, MySQL). NoSQL: flexible schema, scalable (MongoDB, Redis, Cassandra)." },
      { id: 25, name: "ACID Properties", desc: "Atomicity, Consistency, Isolation, Durability. Guarantees for reliable database transactions." },
      { id: 26, name: "BASE Properties", desc: "Basically Available, Soft state, Eventually consistent. NoSQL alternative to ACID for distributed systems." },
      { id: 27, name: "CAP Theorem", desc: "Distributed systems can guarantee only 2 of 3: Consistency, Availability, Partition Tolerance." },
      { id: 28, name: "PACELC Theorem", desc: "Extension of CAP: if Partition, choose A or C; Else, choose Latency or Consistency." },
      { id: 29, name: "Consistency Models", desc: "Strong, eventual, causal, read-your-writes. Defines when writes become visible to reads." },
      { id: 30, name: "Data Replication", desc: "Copying data across multiple nodes for redundancy and read performance. Leader-follower, multi-leader, leaderless." },
      { id: 31, name: "Read Replicas", desc: "Database copies that handle read queries, offloading the primary. Introduces replication lag." },
      { id: 32, name: "Sharding / Data Partitioning", desc: "Splitting data across multiple databases by a shard key. Horizontal partitioning for scale." },
      { id: 33, name: "Consistent Hashing", desc: "Distributes data across nodes minimizing redistribution when nodes join/leave. Used in caches and DBs." },
      { id: 34, name: "Database Indexing", desc: "Data structures (B-tree, hash) for fast lookups. Trade-off: faster reads, slower writes, more storage." },
      { id: 35, name: "Denormalization", desc: "Adding redundant data to reduce expensive joins. Improves read performance at the cost of write complexity." },
      { id: 36, name: "Normalization", desc: "Organizing data to reduce redundancy (1NF, 2NF, 3NF). Ensures data integrity but may require joins." },
      { id: 37, name: "Database Federation", desc: "Splitting databases by function (users DB, products DB, orders DB). Each scales independently." },
      { id: 38, name: "Object Storage", desc: "Stores unstructured data as objects (S3, GCS). Ideal for images, videos, backups. Highly scalable." },
      { id: 39, name: "Data Lakes & Data Warehouses", desc: "Lake: raw data in any format. Warehouse: structured, optimized for analytics (Redshift, BigQuery, Snowflake)." },
      { id: 40, name: "Time-Series Databases", desc: "Optimized for timestamped data (InfluxDB, TimescaleDB). Used for metrics, IoT, monitoring." },
      { id: 41, name: "Graph Databases", desc: "Store data as nodes and edges (Neo4j). Ideal for social networks, recommendations, fraud detection." },
      { id: 42, name: "Vector Databases", desc: "Store and query high-dimensional embeddings (Pinecone, Weaviate). Powers semantic search and AI/RAG." },
    ],
  },
  {
    name: "Caching",
    icon: "◈",
    color: "#E8A83A",
    concepts: [
      { id: 43, name: "Caching", desc: "Storing frequently accessed data in fast storage (RAM). Dramatically reduces latency and database load." },
      { id: 44, name: "Cache Invalidation", desc: "Keeping cache in sync with source. Strategies: write-through, write-back, write-around." },
      { id: 45, name: "Cache Eviction Policies", desc: "LRU (Least Recently Used), LFU (Least Frequently Used), FIFO, TTL-based. Decides what gets removed." },
      { id: 46, name: "Cache-Aside (Lazy Loading)", desc: "App checks cache first; on miss, reads DB then populates cache. Most common caching pattern." },
      { id: 47, name: "Write-Through Cache", desc: "Writes go to cache and DB simultaneously. Ensures consistency but adds write latency." },
      { id: 48, name: "Write-Back Cache", desc: "Writes go to cache first, DB updated asynchronously. Fast writes but risk of data loss." },
      { id: 49, name: "Distributed Cache", desc: "Cache spread across multiple nodes (Redis Cluster, Memcached). Handles scale beyond single machine." },
      { id: 50, name: "Cache Stampede / Thundering Herd", desc: "Many requests hit DB simultaneously when a popular cache key expires. Solved with locks or staggered TTLs." },
    ],
  },
  {
    name: "Load Balancing & Proxies",
    icon: "⊞",
    color: "#9B59B6",
    concepts: [
      { id: 51, name: "Load Balancing", desc: "Distributes incoming traffic across multiple servers. Improves availability, throughput, and reliability." },
      { id: 52, name: "Load Balancing Algorithms", desc: "Round Robin, Weighted RR, Least Connections, IP Hash, Random. Each optimizes for different scenarios." },
      { id: 53, name: "Layer 4 vs Layer 7 Load Balancing", desc: "L4: routes by IP/port (fast). L7: routes by HTTP content/headers/URL (smart). L7 enables path-based routing." },
      { id: 54, name: "Reverse Proxy", desc: "Sits in front of servers, forwarding client requests. Provides security, caching, SSL termination (Nginx, HAProxy)." },
      { id: 55, name: "Forward Proxy", desc: "Sits in front of clients, forwarding requests to the internet. Used for privacy, filtering, caching." },
      { id: 56, name: "API Gateway", desc: "Single entry point for all API calls. Handles auth, rate limiting, routing, request transformation." },
      { id: 57, name: "Service Mesh", desc: "Infrastructure layer managing service-to-service communication (Istio, Linkerd). Handles retries, observability, mTLS." },
    ],
  },
  {
    name: "Architecture Patterns",
    icon: "⬣",
    color: "#E84393",
    concepts: [
      { id: 58, name: "Monolithic Architecture", desc: "Single deployable unit containing all functionality. Simple to start but hard to scale independently." },
      { id: 59, name: "Microservices Architecture", desc: "Application as suite of small, independent services. Each owns its data and communicates via APIs." },
      { id: 60, name: "Serverless Architecture", desc: "Cloud provider manages infrastructure. Code runs in stateless functions (AWS Lambda). Pay per execution." },
      { id: 61, name: "Event-Driven Architecture", desc: "Components communicate through events. Producers emit events, consumers react. Enables loose coupling." },
      { id: 62, name: "CQRS", desc: "Command Query Responsibility Segregation. Separate models for reads and writes. Optimizes each independently." },
      { id: 63, name: "Event Sourcing", desc: "Store all state changes as immutable events. Reconstruct state by replaying events. Full audit trail." },
      { id: 64, name: "Saga Pattern", desc: "Manages distributed transactions across microservices using a sequence of local transactions with compensating actions." },
      { id: 65, name: "Strangler Fig Pattern", desc: "Incrementally migrate from monolith to microservices by gradually replacing functionality." },
      { id: 66, name: "Sidecar Pattern", desc: "Deploy helper process alongside main service for logging, monitoring, networking (used in service meshes)." },
      { id: 67, name: "Backend for Frontend (BFF)", desc: "Dedicated backend service per frontend type (mobile, web). Tailors API responses to each client's needs." },
      { id: 68, name: "Peer-to-Peer (P2P)", desc: "Nodes act as both client and server. Decentralized. Used in file sharing, blockchain, WebRTC." },
      { id: 69, name: "Lambda Architecture", desc: "Combines batch processing (accurate) and stream processing (fast) for big data systems." },
    ],
  },
  {
    name: "Messaging & Streaming",
    icon: "↯",
    color: "#00B894",
    concepts: [
      { id: 70, name: "Message Queues", desc: "Asynchronous communication buffer between services (RabbitMQ, SQS). Decouples producers from consumers." },
      { id: 71, name: "Pub/Sub (Publish-Subscribe)", desc: "Publishers send messages to topics, subscribers receive them. Enables fan-out to multiple consumers." },
      { id: 72, name: "Event Streaming / Log", desc: "Append-only log of events (Kafka, Kinesis). Consumers read at their own pace. Replayable." },
      { id: 73, name: "Dead Letter Queue (DLQ)", desc: "Stores messages that fail processing repeatedly. Enables debugging and retry without blocking the pipeline." },
      { id: 74, name: "Idempotency", desc: "Operations produce the same result regardless of how many times executed. Critical for retry-safe systems." },
      { id: 75, name: "Exactly-Once vs At-Least-Once vs At-Most-Once", desc: "Message delivery guarantees. Trade-offs between reliability, performance, and complexity." },
      { id: 76, name: "Backpressure", desc: "Mechanism to slow producers when consumers can't keep up. Prevents system overload." },
    ],
  },
  {
    name: "Security & Auth",
    icon: "⬟",
    color: "#E74C3C",
    concepts: [
      { id: 77, name: "Authentication vs Authorization", desc: "AuthN: who are you? (identity). AuthZ: what can you do? (permissions). Different concerns, often confused." },
      { id: 78, name: "OAuth 2.0 / OpenID Connect", desc: "OAuth2: delegated authorization framework. OIDC: identity layer on top of OAuth2. Standard for third-party login." },
      { id: 79, name: "JWT (JSON Web Tokens)", desc: "Self-contained tokens encoding user claims. Signed by server. Stateless authentication mechanism." },
      { id: 80, name: "Session-based vs Token-based Auth", desc: "Sessions: server stores state, sends cookie. Tokens: client stores JWT, sends in headers. Tokens scale better." },
      { id: 81, name: "Rate Limiting", desc: "Restricts number of requests per time window. Protects against abuse and DDoS. Algorithms: token bucket, sliding window." },
      { id: 82, name: "API Keys", desc: "Simple tokens identifying the calling application. Used for tracking, billing, basic access control." },
      { id: 83, name: "Encryption at Rest & in Transit", desc: "At rest: encrypting stored data (AES-256). In transit: encrypting network data (TLS/SSL)." },
      { id: 84, name: "Zero Trust Architecture", desc: "Never trust, always verify. Every request authenticated and authorized regardless of network location." },
    ],
  },
  {
    name: "Scalability Patterns",
    icon: "⟐",
    color: "#6C5CE7",
    concepts: [
      { id: 85, name: "Horizontal vs Vertical Scaling", desc: "Vertical: bigger machine. Horizontal: more machines. Most large systems use horizontal scaling." },
      { id: 86, name: "Database Scaling Strategies", desc: "Read replicas, sharding, federation, caching layers. Often combined for optimal performance." },
      { id: 87, name: "Connection Pooling", desc: "Reuse database connections instead of creating new ones per request. Reduces overhead significantly." },
      { id: 88, name: "Autoscaling", desc: "Automatically adjusts compute resources based on demand. Scale out during peaks, scale in during lulls." },
      { id: 89, name: "Data Partitioning Strategies", desc: "Range-based, hash-based, list-based, composite. How data is split across shards/partitions." },
      { id: 90, name: "Batch Processing vs Stream Processing", desc: "Batch: process large datasets periodically (Spark, MapReduce). Stream: process data in real-time (Flink, Kafka Streams)." },
      { id: 91, name: "MapReduce", desc: "Programming model for parallel processing of large datasets. Map phase transforms, Reduce phase aggregates." },
    ],
  },
  {
    name: "Reliability & Resilience",
    icon: "⟡",
    color: "#FD79A8",
    concepts: [
      { id: 92, name: "Circuit Breaker Pattern", desc: "Stops calling a failing service after threshold. Prevents cascade failures. States: closed, open, half-open." },
      { id: 93, name: "Retry with Exponential Backoff", desc: "Retry failed requests with increasing delays (1s, 2s, 4s, 8s...). Add jitter to prevent thundering herd." },
      { id: 94, name: "Bulkhead Pattern", desc: "Isolate components so failure in one doesn't sink others. Like watertight compartments on a ship." },
      { id: 95, name: "Failover Strategies", desc: "Active-passive: standby takes over on failure. Active-active: both serve traffic. Hot, warm, cold standby." },
      { id: 96, name: "Health Checks & Heartbeats", desc: "Periodic signals to verify service liveness. Load balancers use these to route away from unhealthy nodes." },
      { id: 97, name: "Graceful Degradation", desc: "System continues with reduced functionality rather than total failure. Show cached data if DB is down." },
      { id: 98, name: "Chaos Engineering", desc: "Intentionally inject failures to test resilience (Netflix Chaos Monkey). Find weaknesses before users do." },
      { id: 99, name: "Redundancy", desc: "Duplicate critical components. No single point of failure. Applied at every layer: servers, databases, networks." },
    ],
  },
  {
    name: "Observability & Operations",
    icon: "◉",
    color: "#00CEC9",
    concepts: [
      { id: 100, name: "Logging", desc: "Record events and errors. Structured logging (JSON) enables analysis. Centralized with ELK stack or Datadog." },
      { id: 101, name: "Monitoring & Alerting", desc: "Track system metrics (CPU, memory, error rates). Alert on anomalies. Prometheus + Grafana is a common stack." },
      { id: 102, name: "Distributed Tracing", desc: "Track requests across microservices (Jaeger, Zipkin). Identifies latency bottlenecks in complex systems." },
      { id: 103, name: "Metrics (RED & USE Methods)", desc: "RED: Rate, Errors, Duration (for services). USE: Utilization, Saturation, Errors (for resources)." },
      { id: 104, name: "Blue-Green Deployment", desc: "Run two identical environments. Switch traffic from blue (old) to green (new). Instant rollback." },
      { id: 105, name: "Canary Deployment", desc: "Roll out changes to a small percentage of users first. Monitor, then expand. Reduces blast radius." },
      { id: 106, name: "Feature Flags", desc: "Toggle features on/off without deployment. Enable gradual rollouts, A/B testing, kill switches." },
    ],
  },
  {
    name: "Advanced & Distributed Systems",
    icon: "✦",
    color: "#A29BFE",
    concepts: [
      { id: 107, name: "Consensus Algorithms (Raft, Paxos)", desc: "Protocols for nodes to agree on state in distributed systems. Foundation for leader election and replication." },
      { id: 108, name: "Distributed Locking", desc: "Coordinating access to shared resources across nodes (Redlock, ZooKeeper). Prevents race conditions." },
      { id: 109, name: "Gossip Protocol", desc: "Nodes share information peer-to-peer like rumors. Eventually all nodes converge. Used in Cassandra." },
      { id: 110, name: "Bloom Filters", desc: "Probabilistic data structure for set membership. Can say 'definitely not in set' or 'probably in set'. Space-efficient." },
      { id: 111, name: "Merkle Trees", desc: "Hash tree for efficient data verification. Detect inconsistencies between replicas. Used in blockchain and DBs." },
      { id: 112, name: "Leader Election", desc: "Selecting one node to coordinate tasks. Handles leader failure via timeouts and re-election." },
      { id: 113, name: "Quorum", desc: "Minimum nodes that must agree for an operation to succeed. W + R > N ensures consistency." },
      { id: 114, name: "Clock Synchronization & Vector Clocks", desc: "Ordering events in distributed systems. Logical clocks, Lamport timestamps, vector clocks for causality." },
      { id: 115, name: "Split Brain", desc: "Network partition causes two halves to operate independently, risking data divergence. Solved with fencing and quorums." },
      { id: 116, name: "Tombstones", desc: "Markers indicating deleted data in distributed systems. Prevents deleted data from reappearing during sync." },
      { id: 117, name: "Conflict-Free Replicated Data Types (CRDTs)", desc: "Data structures that can be updated independently and merged automatically. No coordination needed." },
      { id: 118, name: "Two-Phase Commit (2PC)", desc: "Distributed transaction protocol: prepare phase then commit phase. Ensures all-or-nothing across nodes." },
      { id: 119, name: "Hinted Handoff", desc: "When a node is down, another temporarily stores its writes. Delivers them when the node recovers." },
      { id: 120, name: "Georeplication", desc: "Replicate data across geographic regions for low latency and disaster recovery. Multi-region architecture." },
    ],
  },
];

const totalConcepts = categories.reduce((sum, c) => sum + c.concepts.length, 0);

export default function SystemDesignConcepts() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      concepts: cat.concepts.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.desc.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.concepts.length > 0);

  const displayCategories = activeCategory
    ? filteredCategories.filter((c) => c.name === activeCategory)
    : filteredCategories;

  const matchCount = filteredCategories.reduce(
    (sum, c) => sum + c.concepts.length,
    0
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0A0F",
        color: "#E0E0E8",
        fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "40px 32px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background:
            "linear-gradient(180deg, rgba(58,143,232,0.06) 0%, transparent 100%)",
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontSize: 11,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#3A8FE8",
                fontWeight: 600,
              }}
            >
              Reference Guide
            </span>
            <span
              style={{
                fontSize: 10,
                background: "rgba(58,143,232,0.15)",
                color: "#3A8FE8",
                padding: "2px 8px",
                borderRadius: 3,
                letterSpacing: 1,
              }}
            >
              {totalConcepts} CONCEPTS
            </span>
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              margin: "8px 0 6px",
              color: "#FAFAFE",
              letterSpacing: -0.5,
              fontFamily:
                "'Space Grotesk', 'Inter', system-ui, sans-serif",
            }}
          >
            System Design Concepts
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "#7A7A8E",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Every concept you need — from fundamentals to distributed systems
          </p>

          {/* Search */}
          <div style={{ marginTop: 20, position: "relative" }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search concepts..."
              style={{
                width: "100%",
                padding: "10px 16px 10px 36px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                color: "#E0E0E8",
                fontSize: 13,
                fontFamily: "inherit",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#555",
                fontSize: 14,
              }}
            >
              ⌕
            </span>
            {search && (
              <span
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#7A7A8E",
                  fontSize: 11,
                }}
              >
                {matchCount} results
              </span>
            )}
          </div>

          {/* Category pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginTop: 16,
            }}
          >
            <button
              onClick={() => setActiveCategory(null)}
              style={{
                padding: "5px 12px",
                fontSize: 11,
                borderRadius: 4,
                border: "1px solid",
                borderColor: !activeCategory
                  ? "rgba(58,143,232,0.4)"
                  : "rgba(255,255,255,0.08)",
                background: !activeCategory
                  ? "rgba(58,143,232,0.12)"
                  : "transparent",
                color: !activeCategory ? "#3A8FE8" : "#7A7A8E",
                cursor: "pointer",
                fontFamily: "inherit",
                letterSpacing: 0.3,
                transition: "all 0.15s",
              }}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === cat.name ? null : cat.name
                  )
                }
                style={{
                  padding: "5px 12px",
                  fontSize: 11,
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor:
                    activeCategory === cat.name
                      ? `${cat.color}66`
                      : "rgba(255,255,255,0.08)",
                  background:
                    activeCategory === cat.name
                      ? `${cat.color}18`
                      : "transparent",
                  color:
                    activeCategory === cat.name ? cat.color : "#7A7A8E",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  letterSpacing: 0.3,
                  transition: "all 0.15s",
                }}
              >
                <span style={{ marginRight: 4 }}>{cat.icon}</span>
                {cat.name}
                <span style={{ marginLeft: 4, opacity: 0.5 }}>
                  {cat.concepts.length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 32px 60px" }}>
        {displayCategories.map((cat) => (
          <div key={cat.name} style={{ marginBottom: 32 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
                paddingBottom: 8,
                borderBottom: `1px solid ${cat.color}22`,
              }}
            >
              <span style={{ color: cat.color, fontSize: 16 }}>{cat.icon}</span>
              <h2
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: cat.color,
                  margin: 0,
                  letterSpacing: 0.5,
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                }}
              >
                {cat.name}
              </h2>
              <span
                style={{
                  fontSize: 10,
                  color: "#555",
                  marginLeft: "auto",
                }}
              >
                {cat.concepts.length} concepts
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {cat.concepts.map((concept) => {
                const isExpanded = expandedId === concept.id;
                return (
                  <div
                    key={concept.id}
                    onClick={() =>
                      setExpandedId(isExpanded ? null : concept.id)
                    }
                    style={{
                      padding: isExpanded ? "12px 16px" : "9px 16px",
                      background: isExpanded
                        ? `${cat.color}0A`
                        : "rgba(255,255,255,0.015)",
                      border: "1px solid",
                      borderColor: isExpanded
                        ? `${cat.color}30`
                        : "rgba(255,255,255,0.04)",
                      borderRadius: 6,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 9,
                          color: "#555",
                          minWidth: 24,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {String(concept.id).padStart(3, "0")}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: isExpanded ? "#FAFAFE" : "#C0C0CC",
                          flex: 1,
                        }}
                      >
                        {concept.name}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          color: "#444",
                          transform: isExpanded
                            ? "rotate(90deg)"
                            : "none",
                          transition: "transform 0.15s",
                        }}
                      >
                        ▸
                      </span>
                    </div>
                    {isExpanded && (
                      <div
                        style={{
                          marginTop: 10,
                          marginLeft: 34,
                          fontSize: 12,
                          lineHeight: 1.7,
                          color: "#9A9AAE",
                          borderLeft: `2px solid ${cat.color}33`,
                          paddingLeft: 12,
                        }}
                      >
                        {concept.desc}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
