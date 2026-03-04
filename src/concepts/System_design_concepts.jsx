import { FiCpu } from 'react-icons/fi';
import ConceptLayout from "../ConceptLayout";

export const meta = {
  title: "System Design Concepts",
  description: "Core system design principles and patterns",
  icon: FiCpu,
  color: '#eab308',
};

const categories = [
  {
    name: "Fundamentals",
    icon: "◆",
    color: "#E8553A",
    concepts: [
      { id: 1, name: "Scalability", desc: `Scalability is a system's ability to handle increased load — more users, more data, more requests — without degrading in performance or requiring a complete redesign. It is not about handling today's load well; it's about being architected so that capacity can grow incrementally as demand grows. Every successful system eventually confronts a scalability ceiling, and whether that ceiling is hit gracefully or catastrophically depends on decisions made early in the design.

**How it works:**
- **Vertical scaling (scaling up):** Add more resources (CPU, RAM, disk) to the existing server. Simple — no code changes required. Has hard limits (you can't add infinite RAM to one machine) and creates a single point of failure. Works well for databases in early stages.
- **Horizontal scaling (scaling out):** Add more machines to distribute the load. Requires a load balancer to distribute traffic. Applications must be stateless (or share state via external cache/DB) to scale horizontally. The dominant model for web-scale systems.
- **Stateless vs stateful scaling:** Stateless services (each request carries all needed context) scale trivially — spin up any number of instances. Stateful services (in-memory session, local files) require sticky sessions, distributed session stores, or redesign before they can scale horizontally.
- **Data layer scaling:** Application servers scale easily; databases are the hard part. Read replicas for read-heavy workloads, sharding for write-heavy workloads, and caching (Redis/Memcached) to reduce DB load are the standard progression.
- **Auto-scaling:** Cloud platforms (AWS Auto Scaling, Kubernetes HPA) monitor load metrics and automatically add/remove instances. Requires health checks, graceful startup/shutdown, and idempotent operations.

**Real-world example:** Instagram's backend in 2012 served 30 million users with 3 engineers and a handful of servers — by keeping the application stateless (Django), scaling reads with PostgreSQL replicas, and aggressively caching with Redis. When traffic spiked, they scaled by adding more web workers horizontally. By the time they reached 1 billion users, the architecture had evolved to hundreds of microservices and thousands of servers, but the core principle — stateless application tier, scaled-out data tier — remained the same.

**Key takeaway:** Design your application tier to be stateless from day one — it costs almost nothing upfront and makes horizontal scaling trivial later. Don't over-engineer early, but don't paint yourself into a stateful corner. The standard progression is: vertical scaling first (quick wins), then read replicas, then caching, then sharding — each step buys time for the next.` },
      { id: 2, name: "Availability", desc: `Availability is the percentage of time a system is operational and serving requests correctly. It is the most customer-visible reliability metric — when a system is down, users know immediately. Availability is typically expressed in "nines": 99% (two nines), 99.9% (three nines), 99.99% (four nines). The gap between three nines and four nines sounds small (0.09%) but represents the difference between ~8.7 hours and ~52 minutes of acceptable downtime per year — and the engineering cost to achieve four nines is dramatically higher than three.

**How it works:**
- **Availability math:** Availability = Uptime / (Uptime + Downtime). For a system with two independent components in series (both must work), availability multiplies: 99.9% × 99.9% = 99.8%. For components in parallel (either can work), availability improves: 1 - (0.001 × 0.001) = 99.9999%. This is why redundancy is the primary tool for improving availability.
- **Nines and their meaning:** 99% (two nines) = 87.6 hours downtime/year. 99.9% = 8.76 hours. 99.99% = 52 minutes. 99.999% = 5.26 minutes. Moving from 99.9% to 99.999% requires eliminating planned maintenance windows, zero-downtime deployments, multi-region failover, and extensive chaos engineering.
- **Achieving high availability:** Eliminate single points of failure (redundant everything), deploy across multiple availability zones, use health checks and automatic failover, implement graceful degradation (serve degraded functionality rather than returning errors), and practice chaos engineering to find failure modes before they cause outages.
- **Planned vs unplanned downtime:** Most teams focus on unplanned outages, but planned maintenance (deployments, migrations) often causes more downtime. Zero-downtime deployments (blue/green, canary, rolling) are essential for high availability targets.
- **Geographic redundancy:** Multi-region architectures tolerate entire cloud region failures. Active-active (traffic split across regions) vs active-passive (failover to standby region). Comes with significant complexity (distributed transactions, data replication lag, DNS TTL considerations).

**Real-world example:** AWS S3 targets 99.99% availability (four nines) for its standard storage tier. Achieving this requires data distributed across at least three availability zones, automatic failover when a zone goes down, and operations that remain available even during zone outages. AWS publicly maintains a Service Health Dashboard and issues credits when SLAs are violated — the financial commitment creates internal pressure to hit the target.

**Key takeaway:** Don't target four nines unless your business genuinely requires it — the last nines are exponentially expensive. Start with 99.9%, which most applications can achieve with basic redundancy and load balancing. Calculate the actual business cost of downtime (revenue loss, SLA penalties, support cost) and set your availability target accordingly. Architecture decisions flow from the target, not the other way around.` },
      { id: 3, name: "Reliability", desc: `Reliability is a system's ability to perform its intended function correctly over time, even in the face of component failures, software bugs, network partitions, and operator errors. It is broader than availability: an available system is running; a reliable system is running and producing correct results. A system can be highly available but unreliable (returning 200 OK with corrupt data) or temporarily unavailable but ultimately reliable (it fails safely and recovers to a consistent state). Google's SRE book defines reliability as the most important feature of a production service.

**How it works:**
- **Fault tolerance:** The system continues operating correctly even when components fail. Achieved through redundancy (multiple replicas), checksums (detecting data corruption), retries with idempotency (safe to retry without side effects), and circuit breakers (stopping cascading failures).
- **Data durability:** Data written to the system is not lost. Databases achieve durability via write-ahead logs (WAL), replication to multiple nodes, and periodic backups. Durability is separate from availability — a database replica might be temporarily unavailable but its data is durable on disk.
- **Graceful degradation:** When a dependency fails, the system serves a degraded but correct response rather than failing entirely. Netflix's Chaos Monkey tests whether services degrade gracefully when dependencies fail.
- **Idempotency:** Operations can be retried safely without duplicating side effects. Critical for reliable distributed systems where messages may be delivered multiple times. POST /payment should be idempotent (use idempotency keys); GET /balance is naturally idempotent.
- **Testing reliability:** Chaos engineering (deliberately injecting failures in production), disaster recovery drills, and load testing under adverse conditions all build confidence in reliability. Systems that have never been tested under failure often fail unexpectedly in production.

**Real-world example:** Amazon DynamoDB guarantees 99.999% availability and eleven nines of data durability (99.999999999%). Durability is achieved by replicating each piece of data across three availability zones using a consensus protocol. A write is not acknowledged until a majority of replicas confirm it — meaning even if two zones simultaneously fail, no acknowledged write is lost. The distinction between availability (99.999%) and durability (11 nines) is critical: durability is much harder to achieve and is essentially a one-way door (lost data cannot be recovered).

**Key takeaway:** Design for failure as the normal operating condition, not the exception. Assume every external call can fail, every disk can corrupt, and every operator can make mistakes. Build in retries (with backoff and jitter), idempotency, checksums, and circuit breakers from the start. The difference between a reliable system and an unreliable one is usually not the presence of failures but how the system responds to them.` },
      { id: 4, name: "Latency vs Throughput vs Bandwidth", desc: `Latency, throughput, and bandwidth are the three fundamental performance dimensions of a system, and confusing them leads to incorrect optimization efforts. A system can have high bandwidth but terrible latency (a truck full of hard drives — high capacity, slow to arrive). It can have low latency but low throughput (a fast response that can only serve one user at a time). Understanding which dimension is the bottleneck tells you where to invest optimization effort.

**How it works:**
- **Latency:** The time elapsed from when a request is sent to when a response is received. Composed of: network propagation delay (distance / speed of light), transmission delay (packet size / bandwidth), processing time (server computation), and queuing delay (waiting behind other requests). Measured in milliseconds. Optimized by: reducing round trips, using CDNs (geographic proximity), keeping request payloads small, and optimizing server-side processing.
- **Throughput:** The number of requests (or operations, or bytes) processed per unit of time — requests/second, transactions/second, MB/s. A system's throughput is limited by its bottleneck resource (CPU, network, disk, or a slow dependency). Throughput is increased by parallelism (more servers, more threads) and by eliminating bottlenecks.
- **Bandwidth:** The maximum rate at which data can be transferred over a network link — the theoretical ceiling. Bandwidth is a property of the network infrastructure; throughput is what you actually achieve (always ≤ bandwidth due to protocol overhead, congestion, and retransmissions).
- **The relationship:** Little's Law connects them: L = λW (average concurrent requests = throughput × average latency). If latency doubles and throughput stays constant, the number of concurrent requests in the system doubles — meaning you need double the resources to keep up.
- **Latency numbers everyone should know:** L1 cache ~1ns, main memory ~100ns, SSD read ~100μs, HDD read ~10ms, network within same datacenter ~0.5ms, cross-continental network ~150ms. These anchor back-of-the-envelope calculations.

**Real-world example:** Google found that adding 500ms of latency to search results caused a 20% drop in traffic — users are extraordinarily sensitive to latency. This drove Google's investment in global network infrastructure, CDN edge nodes, and preloading predictions. Meanwhile, Google's Bigtable was designed for throughput (millions of read/write operations per second) over low latency — the right trade-off for batch analytics workloads versus interactive search.

**Key takeaway:** Profile before optimizing — measure actual latency percentiles (p50, p95, p99) and throughput under load. P99 latency (the slowest 1% of requests) often reveals infrastructure problems invisible in averages. Optimize latency for interactive user-facing services; optimize throughput for batch processing and data pipelines. Never assume bandwidth is your bottleneck without measuring.` },
      { id: 5, name: "Fault Tolerance", desc: `Fault tolerance is a system's ability to continue operating correctly when one or more of its components fail. In a distributed system at scale, component failures are not exceptional events — they are continuous background noise. Servers crash, disks fail, network packets are dropped, and third-party APIs return errors. Fault-tolerant systems treat failure as the normal operating condition and engineer around it. The goal is not to prevent failures (impossible at scale) but to isolate them and prevent them from propagating.

**How it works:**
- **Redundancy:** Every critical component has a backup. Active-active redundancy (multiple instances serve traffic simultaneously — failure of one reduces capacity but doesn't stop service). Active-passive redundancy (standby replica takes over on failure — brief interruption but simpler). The number of simultaneous failures a system can tolerate is expressed as its fault tolerance level (N+1, N+2, etc.).
- **Replication:** Data is stored on multiple nodes so no single disk or server failure loses data. Replication factor of 3 (three copies) is the common default — tolerates one failure with consensus still possible.
- **Circuit breakers:** When a dependency is failing, stop sending it requests rather than queueing up more. The circuit "trips" open after a failure threshold, returns errors immediately (fast failure), and periodically probes whether the dependency has recovered. Prevents cascading failures where a slow dependency brings down its callers.
- **Bulkheads:** Isolate components so failure in one doesn't cascade to others. Separate thread pools, connection pools, and resource limits per dependency. Named after the watertight compartments in ship hulls — a breach in one compartment doesn't sink the ship.
- **Chaos engineering:** Netflix's Chaos Monkey deliberately kills random production instances. Chaos Kong kills entire availability zones. The discipline — intentionally introducing failures to discover weaknesses — builds genuine fault tolerance rather than assumed fault tolerance.

**Real-world example:** Kafka achieves fault tolerance by replicating each partition across multiple brokers (configurable replication factor, typically 3). Each partition has a leader and followers. All writes go to the leader; followers replicate asynchronously. If the leader fails, a new leader is elected automatically from the in-sync replicas (ISR). Kafka consumers track their own offsets, so they can resume from the exact position they left off after any failure. The system handles broker failures, network partitions, and slow consumers without losing messages or requiring operator intervention.

**Key takeaway:** Design for N+1 (minimum) or N+2 (recommended for critical systems) redundancy at every layer. Implement circuit breakers around every external dependency. Automate failover so humans don't need to be in the loop. Run chaos experiments in production (starting with low-traffic hours) to validate that your fault tolerance actually works — untested fault tolerance is assumption, not engineering.` },
      { id: 6, name: "High Availability vs Fault Tolerance", desc: `High Availability (HA) and Fault Tolerance (FT) are often used interchangeably, but they represent different engineering goals with different cost profiles. Both deal with keeping systems operational during failures, but HA accepts brief interruptions (measured in seconds) while FT requires continuous operation with zero interruption. Choosing between them depends on the business requirement — and FT's cost premium is significant enough that most systems target HA rather than true FT.

**How it works:**
- **High Availability (HA):** Minimizes downtime through rapid failure detection and fast failover. When a primary component fails, a backup takes over — but there is a brief interruption during the switchover (seconds to minutes). Achieved via load balancers with health checks, database failover (PostgreSQL's Patroni, MySQL's Orchestrator), and redundant infrastructure. Targets 99.9% to 99.99% uptime. Cost: moderate (N+1 redundancy, automated failover tooling).
- **Fault Tolerance (FT):** Ensures zero service interruption even during component failures. Requires active-active configurations where multiple components serve the same requests simultaneously — if one fails, others absorb its load instantly with no switchover delay. Requires more sophisticated consensus protocols, distributed coordination, and significantly more hardware. Targets 99.999%+ uptime. Cost: high (often 3× or more hardware vs non-redundant).
- **The spectrum:** Most real systems fall on a spectrum between HA and FT. Stateless web tier is naturally fault-tolerant (load balancers route around failed instances instantly). Databases typically target HA (primary/replica with automated failover). Payment processing systems target fault tolerance (no transaction can be lost or doubled).
- **Recovery time objective (RTO):** HA systems have an RTO of seconds to minutes (time to detect failure and complete failover). FT systems have an RTO of zero — recovery is instantaneous because no failover is needed.
- **Detection vs prevention:** HA relies on detecting failures and recovering. FT relies on running redundant paths simultaneously so there is nothing to recover from.

**Real-world example:** Google Spanner achieves fault tolerance for a globally distributed database by using synchronous Paxos replication — writes are only committed once a majority of replicas in multiple datacenters confirm them. A datacenter going offline does not interrupt writes because the remaining majority can still form consensus. This is true fault tolerance for the data layer. By contrast, most PostgreSQL deployments use HA — a primary with one or more hot standbys, where a DBA or automation tool promotes a standby if the primary fails, with 30–60 seconds of interruption.

**Key takeaway:** Target HA for most systems — it provides 99.9–99.99% uptime at a reasonable cost. Reserve FT for components where even seconds of interruption are unacceptable and cost is justified: payment processing, telecommunications switching, air traffic control systems. For web applications, a 30-second failover is typically acceptable. The extra engineering and hardware cost of true fault tolerance rarely delivers proportional business value.` },
      { id: 7, name: "Single Point of Failure (SPOF)", desc: `A Single Point of Failure (SPOF) is any component in a system whose failure causes the entire system to become unavailable. SPOFs are the enemy of availability — a system is only as reliable as its most fragile, unreplicated component. Identifying and eliminating SPOFs is one of the first exercises in designing a reliable system. The challenge is that SPOFs are not always obvious: they can be hardware, software, configuration, human dependencies, or even organizational bottlenecks like "only one engineer understands this service."

**How it works:**
- **Finding SPOFs:** Draw a dependency graph of your system. For each component, ask: "If this fails, what stops working?" Any answer of "everything" or "the entire user-facing service" identifies a SPOF. Common SPOFs: a single database server, a single load balancer, a single DNS provider, a single network switch, a single deployment server, or a single region.
- **Eliminating SPOFs through redundancy:** Replace each SPOF with an N+1 or N+2 configuration. Load balancers in active-active pairs. Database primaries with hot standbys and automated failover. DNS with multiple resolvers. Network switches in stacked configurations. The key is that redundancy must include automated failover — manual intervention means human SPOF.
- **Hidden SPOFs:** Shared infrastructure creates hidden SPOFs. If service A and service B both depend on the same database, a database failure creates a SPOF for both. Shared configuration stores, shared message brokers, and shared authentication services are common hidden SPOFs in microservice architectures.
- **Geographic SPOFs:** Deploying in a single availability zone or region creates a geographic SPOF. Power failures, cooling failures, and network outages affect entire AZs. Multi-AZ deployment eliminates intra-region SPOFs; multi-region eliminates regional SPOFs.
- **Software SPOFs:** A bug in shared code that all services depend on can be a software SPOF — if library version X has a critical bug and all services use it, a triggered bug brings down all services simultaneously. Dependency isolation and staggered deployments mitigate software SPOFs.

**Real-world example:** The 2017 AWS S3 outage in us-east-1 was triggered by an operator running a command that removed a larger set of servers than intended from the S3 subsystem handling billing. Because so many AWS services (and therefore so many internet companies) depended on a single S3 region, the failure cascaded: CloudFront, EC2, Elastic Beanstalk, and hundreds of major websites went down. S3 in us-east-1 was a de facto SPOF for much of the internet — a sobering example of how seemingly redundant cloud services can still harbor SPOFs at the ecosystem level.

**Key takeaway:** Build a SPOF inventory for your system — list every component and its redundancy level. Prioritize eliminating SPOFs in the order of their blast radius (how much of the system fails if they fail). Automated failover is non-negotiable: a redundant component with manual failover is a SPOF with extra steps. Include people and processes in your SPOF analysis — a team where only one person can deploy is an organizational SPOF.` },
      { id: 8, name: "Disaster Recovery", desc: `Disaster Recovery (DR) is the set of policies, tools, and procedures to enable the recovery of critical systems and data after a catastrophic failure — a complete datacenter loss, a ransomware attack, accidental mass data deletion, or a major cloud provider outage. DR goes beyond high availability (which handles individual component failures) to address scenarios where an entire site or region becomes unavailable. The defining metrics are RPO and RTO, which translate business requirements into measurable engineering targets.

**How it works:**
- **Recovery Point Objective (RPO):** The maximum acceptable amount of data loss measured in time. If RPO is 1 hour, you can afford to lose up to 1 hour of data in the worst case. RPO drives backup frequency and replication strategy. RPO = 0 requires synchronous replication; RPO = 24 hours allows nightly backups.
- **Recovery Time Objective (RTO):** The maximum acceptable downtime from disaster declaration to service restoration. RTO = 4 hours means the system must be functional within 4 hours of a disaster. RTO drives infrastructure investment — a 4-hour RTO can be met with backup-based recovery; a 15-minute RTO requires warm standby infrastructure.
- **DR strategies (cost vs recovery time tradeoff):**
  - **Backup and restore:** Cheapest. Restore from backups when disaster strikes. RTO: hours to days. RPO: last backup (hours to days).
  - **Pilot light:** A minimal version of the system runs in the DR region (just database replication, no application servers). Scale up application tier when needed. RTO: minutes to hours. RPO: seconds to minutes.
  - **Warm standby:** A scaled-down version of the full production system runs continuously in DR region. Scale up to full capacity on failover. RTO: minutes. RPO: seconds.
  - **Active-active (multi-site):** Full production capacity runs in multiple regions simultaneously. Traffic routed to healthy regions on failure. RTO: near zero. RPO: near zero. Most expensive.
- **DR testing:** A DR plan is only as good as its last successful test. Regular "disaster drills" — actually failing over to DR and running workloads there — are essential. An untested DR plan frequently fails when needed.

**Real-world example:** GitLab's 2017 database incident is a canonical DR lesson: a database administrator accidentally deleted the wrong PostgreSQL directory on the primary server. They discovered that their backups were not being verified (restore tests had never been run), their replication to secondary had stopped 6 hours prior (unnoticed), and their DR procedures were untested. They lost 6 hours of production data and were down for 18 hours. The incident led to publicly documented improvements in backup verification, monitoring, and DR testing — and GitLab's radical transparency in publishing the incident report became an industry model for post-mortems.

**Key takeaway:** Define RPO and RTO before designing DR — these numbers drive all architectural decisions. Test your DR plan at least quarterly; the only way to know it works is to run it. Verify backups continuously (not just that they're created, but that they can be restored). Start with warm standby if active-active is too costly — it provides a good balance of recovery speed and cost. The question is not "will we ever need DR?" but "when we need it, will it work?"` },
      { id: 9, name: "Back-of-the-Envelope Estimation", desc: `Back-of-the-envelope estimation is the practice of quickly calculating rough but reasonable capacity numbers for a system design — without a calculator, in an interview or planning meeting, in under a few minutes. The goal is not precision but order of magnitude: knowing whether you need 1 server or 1,000 servers, 1 GB of storage or 1 PB, 100 QPS or 1 million QPS. These estimates drive architectural decisions — a system handling 1,000 QPS needs a very different architecture than one handling 1 million QPS.

**How it works:**
- **Key numbers to memorize:**
  - Traffic: 1M daily active users × 10 requests/day = 10M req/day ÷ 86,400 sec/day ≈ 116 QPS average, ~1,160 QPS at peak (10× average)
  - Storage: 1M users × 1 photo/day × 500KB/photo = 500 GB/day. × 365 = ~180 TB/year
  - Bandwidth: 1M users × 10KB/request × 100 QPS = 1 GB/s outbound
  - A single server: handles ~1,000–10,000 QPS (simple reads); 100–1,000 QPS with DB writes; 10–100 QPS for compute-heavy requests
  - A PostgreSQL instance: handles ~10,000 simple reads/sec, ~1,000–5,000 writes/sec
- **Estimation process:** (1) Clarify scale: daily active users, read/write ratio, data size. (2) Calculate QPS: users × actions/day / 86,400. (3) Calculate storage growth: new data per day × retention. (4) Calculate bandwidth: QPS × average request/response size. (5) Estimate servers: total QPS / QPS per server.
- **Power of 2 approximations:** 1,000 ≈ 10^3 (kilo), 1,000,000 ≈ 10^6 (mega), 10^9 (giga), 10^12 (tera). Approximate freely: 86,400 sec/day ≈ 10^5, 10M ÷ 10^5 = 100 QPS.
- **Read/write ratio:** Most systems are read-heavy (10:1 to 100:1). Estimate reads and writes separately — they have different scaling strategies.
- **When to scale:** One server → add caching when DB becomes bottleneck → add read replicas → add more app servers → consider sharding when a single DB can't handle write volume.

**Real-world example:** Twitter in 2013 handled ~400M tweets/day. 400M ÷ 86,400 ≈ 4,600 tweets/second written. Each tweet is read by followers: average user has ~200 followers, so 4,600 × 200 = 920,000 timeline insertions/second. This fan-out calculation immediately reveals why Twitter's home timeline delivery is the hard problem — and why they built a hybrid push/pull model (push for users with <10,000 followers; pull from celebrities' feeds on read) rather than simple fan-out.

**Key takeaway:** Practice these estimates until they're instinctive. The key numbers: 100K seconds/day (≈ 86,400), 1 server ≈ 10K simple QPS, 1 GB ≈ 10^9 bytes, network latency same DC ≈ 1ms, cross-continental ≈ 100ms. In interviews and design sessions, show your reasoning, not just your answer — the process demonstrates architectural thinking. Being off by 2× is fine; being off by 100× indicates a wrong assumption worth investigating.` },
      { id: 10, name: "SLAs, SLOs, SLIs", desc: `SLAs, SLOs, and SLIs form a hierarchy for defining, measuring, and enforcing reliability commitments — from the raw metric (SLI) to the internal target (SLO) to the external contract (SLA). They are the operational language of reliability: without them, "the system should be fast and reliable" is a vague aspiration; with them, it becomes a measurable, accountable commitment. Google's Site Reliability Engineering practice codified this framework and it has become the industry standard for production systems.

**How it works:**
- **Service Level Indicator (SLI):** A specific, measurable metric that reflects service quality. Examples: availability (% of successful HTTP responses), latency (% of requests completing under 200ms), error rate (% of requests returning 5xx), throughput (requests/second). SLIs are the raw measurements — they tell you what the system is actually doing right now.
- **Service Level Objective (SLO):** An internal target for an SLI, expressed as a percentage over a time window. "99.9% of requests complete in under 200ms over a 30-day rolling window." "99.95% of requests return non-5xx responses." SLOs are commitments to your own team — they define what "good enough" means and trigger action when violated. SLOs should be ambitious but achievable with normal engineering investment.
- **Service Level Agreement (SLA):** An external contract with a customer that specifies minimum SLO levels and consequences for violation (credits, refunds, contract exit rights). SLAs are typically looser than internal SLOs — if your SLO is 99.9%, your SLA might commit to 99.5%, giving a buffer. Violating an SLA has financial and legal consequences; violating an SLO triggers internal engineering response.
- **Error budgets:** The complement of an SLO. If the SLO is 99.9% availability, the error budget is 0.1% — about 43 minutes/month. If the error budget is exhausted, new feature deployments stop until the budget replenishes. This creates a structured tension between shipping velocity and reliability.
- **Choosing SLIs:** Not every metric should be an SLI — choose the metrics that best reflect user experience. Availability and latency are almost always SLIs for user-facing services. Correctness (are the results right?) is often overlooked but critical for data pipelines.

**Real-world example:** Google Cloud Storage publishes an SLA of 99.95% monthly uptime for the Standard storage class. Internally, Google targets a higher SLO (perhaps 99.99%) so they have headroom before the SLA is violated. Each team managing a GCS dependency has error budgets derived from their SLOs — when an error budget is close to exhaustion, the team freezes risky changes and focuses on reliability. This framework prevented Google SREs from having arbitrary arguments about "is this safe to ship?" — the error budget answered objectively.

**Key takeaway:** Define SLIs before building, not after. Choose SLIs that directly reflect user experience (latency at p95/p99, not average; error rate, not uptime). Set SLOs that are meaningful to the business. Make error budgets explicit — they transform reliability from a vague aspiration into a concrete, finite resource that engineering teams manage deliberately. If you're not measuring it, you're not managing it.` },
    ],
  },
  {
    name: "Networking & Communication",
    icon: "⬡",
    color: "#3A8FE8",
    concepts: [
      { id: 11, name: "Client-Server Architecture", desc: `Client-server architecture is the foundational model of network computing: clients initiate requests, servers process them and send back responses. Every web application, mobile app, and API-based system is built on this pattern. Understanding it deeply — not just the surface definition — means understanding statelessness, connection management, protocol layers, and the trade-offs between thin and thick clients. These trade-offs have oscillated over 40 years of computing history and continue to shape modern architecture decisions.

**How it works:**
- **Clients:** Any entity that initiates requests — browsers, mobile apps, desktop applications, other servers acting as clients. Clients handle presentation logic and user interaction. In web apps, the client is the browser executing JavaScript.
- **Servers:** Listen on a network port, accept client connections, execute business logic, and return responses. Servers are stateless in well-designed systems — each request carries all the context needed to process it, with no reliance on leftover state from previous requests.
- **The request-response cycle:** Client opens a TCP connection (or reuses an existing one via HTTP keep-alive or HTTP/2 multiplexing), sends a request (HTTP method + headers + body), server processes and responds, connection may persist or close. Modern HTTP/2 allows multiple concurrent requests over a single connection.
- **Thin vs thick clients:** Thin clients (traditional web browsers before SPAs) received fully rendered HTML from the server — minimal client logic. Thick clients (modern SPAs, mobile apps) contain significant application logic and only fetch data (JSON) from the server. The shift to thick clients moves computation to the client, reducing server load but complicating state management.
- **Stateless vs stateful servers:** Stateless servers treat every request independently — session state lives in the client (JWT tokens) or an external store (Redis). Stateful servers maintain session state in memory, which breaks horizontal scaling (a different server doesn't have your session). Stateless design is almost always preferred for web-scale systems.

**Real-world example:** Shopify serves millions of merchants with a client-server architecture where the Storefront API (GraphQL) acts as the server interface. Merchants' storefronts (thick clients) fetch only the product and cart data they need. Shopify's servers are stateless — session data lives in encrypted cookies. This allows Shopify to horizontally scale their API servers across thousands of instances, routing any request to any server without sticky sessions.

**Key takeaway:** Design servers to be stateless from day one — it is the single most impactful decision for horizontal scalability. Externalise session state to Redis or JWTs. Understand the thick vs thin client trade-off for your use case: SPAs shift computation to the client (faster interactions, better UX) at the cost of client complexity and SEO; server-rendered pages (Next.js, Rails) simplify the server-client boundary and improve initial load performance.` },
      { id: 12, name: "DNS (Domain Name System)", desc: `DNS is the internet's distributed phonebook — translating human-readable domain names (api.example.com) into machine-readable IP addresses (203.0.113.42). It is one of the most critical pieces of internet infrastructure, yet it is often overlooked in system design until a misconfiguration causes an outage. DNS is not just a lookup service: its TTL-based caching, propagation delays, and record types (A, CNAME, MX, TXT, SRV) have direct implications for deployment strategies, failover speed, and geographic routing.

**How it works:**
- **Resolution hierarchy:** Browser cache → OS cache → Recursive resolver (ISP or 8.8.8.8) → Root nameserver → TLD nameserver (.com) → Authoritative nameserver (your DNS provider). Each level caches the result for the TTL duration, meaning DNS changes don't propagate instantly.
- **Key record types:** A record (domain → IPv4), AAAA (domain → IPv6), CNAME (alias to another domain — cannot be used at zone apex), MX (mail routing), TXT (arbitrary text, used for SPF/DKIM/domain verification), SRV (service location with port and priority), NS (authoritative nameserver delegation).
- **TTL (Time To Live):** How long resolvers cache a DNS record before re-querying. Low TTL (60s) allows fast failover but increases DNS query load. High TTL (86400s) reduces load but means changes take up to 24 hours to propagate. For deployments and failover, pre-lower the TTL hours in advance, make the change, then raise it back.
- **DNS for load balancing and failover:** Round-robin DNS returns multiple A records; clients use any IP. GeoDNS returns different IPs based on the client's geographic location (Cloudflare, Route 53 latency-based routing). Health-check-based DNS failover (Route 53 health checks) automatically removes unhealthy endpoints from responses.
- **DNS as a SPOF:** Using a single DNS provider is a SPOF. Major DNS provider outages (Dyn 2016, Cloudflare 2020) have taken down large portions of the internet. Using multiple DNS providers (Route 53 + Cloudflare) with NS records split across both provides resilience.

**Real-world example:** The 2016 Dyn DNS attack (a massive DDoS) took down Twitter, Reddit, Spotify, and dozens of major services simultaneously because all relied on Dyn as their DNS provider. The attack exploited the centralization of DNS infrastructure — a single provider failure became an internet-scale outage. This event drove widespread adoption of multi-provider DNS strategies and anycast-based DDoS-resistant DNS services.

**Key takeaway:** Lower DNS TTLs to 60–300 seconds at least 1 TTL before any planned change or failover event — you can't retroactively speed up propagation. Use GeoDNS (Route 53, Cloudflare) to route users to the nearest healthy region. Never rely on a single DNS provider for mission-critical services. Monitor DNS resolution latency — a slow DNS lookup adds to every user's first-byte time and is often overlooked in performance optimization.` },
      { id: 13, name: "CDN (Content Delivery Network)", desc: `A Content Delivery Network is a globally distributed network of servers (edge nodes or Points of Presence — PoPs) that cache and serve content from locations geographically close to end users. The fundamental insight is that network latency is dominated by physical distance — speed of light limits how fast data can travel. By serving content from a server 20ms away instead of one 200ms away, CDNs provide a 10× improvement in perceived load time. CDNs have evolved from caching static files to serving dynamic API responses, running serverless functions at the edge, and providing DDoS protection.

**How it works:**
- **Cache hit path:** User requests asset → DNS resolves to nearest CDN edge node → edge node has cached copy → responds directly (< 10ms typical). No origin server involved. Cache hit ratio (typically 80–95% for well-configured static assets) determines CDN effectiveness.
- **Cache miss path:** Edge node doesn't have the asset → fetches from origin server → caches it with the response's Cache-Control headers → serves to user. Origin fetch adds ~50–200ms but future requests are cache hits.
- **Cache-Control headers:** The origin server's Cache-Control response header controls CDN caching behavior. Cache-Control: public, max-age=31536000, immutable tells the CDN (and browser) to cache for 1 year and never revalidate — appropriate for content-hashed assets (bundle.abc123.js). Cache-Control: no-cache tells the CDN to always revalidate with origin before serving.
- **Cache invalidation:** CDNs cache content based on TTL. To invalidate before TTL expires, use cache purge APIs (Cloudflare, CloudFront). Better strategy: content-addressable URLs (include hash in filename) — when content changes, URL changes, bypassing the old cache entirely. Never invalidate; just use new URLs.
- **Edge computing:** Modern CDNs (Cloudflare Workers, CloudFront Functions, Vercel Edge) run JavaScript at the edge — A/B testing, authentication, request routing, and even full React SSR at the edge node closest to the user, eliminating origin round-trips for dynamic content.

**Real-world example:** Netflix delivers video to 230 million subscribers using Open Connect, their purpose-built CDN with servers installed directly inside ISPs and internet exchange points. By placing servers inside ISPs, Netflix eliminates internet backbone transit entirely — a user's video travels from a server in their ISP's datacenter, often under 1ms away. Netflix reportedly delivers ~15% of North American internet traffic through Open Connect, saving hundreds of millions in bandwidth costs versus using a third-party CDN.

**Key takeaway:** Use a CDN for all static assets from day one — it costs almost nothing for moderate traffic and dramatically improves global load times. Content-hash your JS/CSS filenames (Vite and webpack do this automatically) so you can set 1-year cache headers safely. For APIs, carefully evaluate what can be cached at the edge (public data, user-agnostic responses) versus what requires origin (authenticated, personalized responses). Consider edge computing (Cloudflare Workers) for latency-sensitive logic that currently runs at a single origin.` },
      { id: 14, name: "API Design", desc: `API design is the practice of defining the interface through which systems communicate — the contract between a producer and its consumers. A well-designed API is intuitive, consistent, predictable, and backward-compatible; a poorly designed one creates friction for every consumer, generates support burden, and becomes increasingly painful to evolve. Since APIs are often the most visible surface of a system and frequently outlive the implementation behind them, design quality compounds over time in both directions.

**How it works:**
- **Resource naming:** REST APIs use nouns, not verbs. /users/{id}/orders not /getUserOrders. Collections are plural (/users), individual resources include identifier (/users/42). Nested resources express relationships (/users/42/orders) but avoid deep nesting beyond two levels — it couples the URL structure to the data model.
- **HTTP methods correctly:** GET (read, idempotent, no body), POST (create, not idempotent), PUT (replace entire resource, idempotent), PATCH (partial update, idempotent if designed correctly), DELETE (remove, idempotent). Using POST for everything (RPC-style) sacrifices cacheability and semantic clarity.
- **Versioning strategies:** URL versioning (/v1/users) — explicit, easy to route, pollutes URLs. Header versioning (Accept: application/vnd.api+json;version=2) — cleaner URLs, harder to test in browsers. No versioning with strict backward compatibility — add fields, never remove or change types. Choose one strategy and be consistent; URL versioning is most common for public APIs.
- **Pagination:** Offset pagination (page=2&size=20) — simple but degrades for large datasets and has inconsistency with concurrent inserts. Cursor pagination (after=<opaque_cursor>) — consistent, performant, the right choice for feeds and large datasets. Always paginate — never return unbounded collections.
- **Error responses:** Use HTTP status codes correctly (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity, 429 Too Many Requests, 500 Server Error). Return structured error bodies: {"error": {"code": "INVALID_EMAIL", "message": "...", "field": "email"}}. Machine-readable error codes allow programmatic handling.

**Real-world example:** Stripe's API is widely regarded as the gold standard for API design. Key decisions: URL-versioned (/v1/) with dated versioning per account (your API key uses the version that existed when you signed up — Stripe maintains all historical versions simultaneously), cursor pagination for all lists, consistent error format with both HTTP status and machine-readable codes, idempotency keys on POST requests to prevent duplicate charges, and extensive backward compatibility — fields added freely, never removed. Stripe's API design quality is a competitive advantage that drives developer adoption.

**Key takeaway:** Design APIs for the consumer, not the implementation — the URL structure and field names should reflect the consumer's mental model, not your database schema. Establish conventions (naming, error format, pagination) before writing the first endpoint and document them in an API style guide. Plan for backward compatibility from v1 — adding fields is safe, changing types or removing fields breaks consumers. Idempotency keys on all state-mutating endpoints prevent duplicate operations from network retries.` },
      { id: 15, name: "REST APIs", desc: `REST (Representational State Transfer) is an architectural style for distributed systems, defined by Roy Fielding in his 2000 doctoral dissertation. It is not a protocol or standard — it is a set of constraints. APIs that follow REST constraints (statelessness, uniform interface, resource identification via URIs, manipulation via representations) are called RESTful. In practice, most "REST APIs" are REST-inspired rather than strictly RESTful, and that's fine — the constraints that matter most for practical web API design are statelessness and resource orientation.

**How it works:**
- **Resources and URIs:** Everything is a resource — a user, an order, a product. Each resource has a unique identifier (URI). Clients interact with representations of resources (JSON, XML), not the resources directly. The server is free to change its internal representation without changing the API.
- **Statelessness:** Each request from client to server must contain all information needed to understand and process it — no client session state is stored on the server. Authentication credentials (JWT, API keys) are sent with every request. This constraint enables horizontal scaling — any server can handle any request.
- **HTTP semantics:** GET retrieves (cacheable, safe, idempotent). POST creates (not idempotent — two POSTs create two resources). PUT replaces completely (idempotent). PATCH updates partially. DELETE removes (idempotent). Using the right HTTP method enables caching infrastructure (GET responses can be cached by CDNs and browsers) and communicates intent.
- **Status codes:** 2xx success (200 OK, 201 Created, 204 No Content), 3xx redirects (301 Moved Permanently, 304 Not Modified), 4xx client errors (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable), 5xx server errors (500 Internal Server Error, 503 Service Unavailable). HTTP status codes are a communication protocol — use them correctly.
- **HATEOAS (optional but powerful):** Hypermedia as the Engine of Application State — responses include links to valid next actions. A GET /orders/42 response includes links to {cancel, pay, track}. Clients discover the API through responses rather than documentation. Rarely implemented fully in practice but the concept of including relevant next-action links improves discoverability.

**Real-world example:** GitHub's REST API (api.github.com) serves as a reference implementation. It uses resource-oriented URLs (/repos/{owner}/{repo}/issues), correct HTTP methods, Link headers for pagination (cursor-based with next/prev/first/last links), consistent error format, and rate limiting with headers (X-RateLimit-Remaining). GitHub also offers GraphQL (api.github.com/graphql) for cases where REST's over-fetching is problematic — acknowledging that REST and GraphQL solve different problems.

**Key takeaway:** The two REST constraints that matter most in practice: statelessness (enables horizontal scaling) and correct HTTP method semantics (enables caching and communicates intent). Don't REST-wash RPC — if your "GET /getUser" calls a stored procedure and returns whatever the DB returns, you're writing RPC over HTTP, not REST. That's acceptable, but be honest about what you're building. REST excels for CRUD-heavy resource management APIs; consider GraphQL for data-fetching-heavy client applications and gRPC for internal service-to-service communication.` },
      { id: 16, name: "GraphQL", desc: `GraphQL is a query language for APIs and a runtime for executing those queries, developed by Facebook in 2012 and open-sourced in 2015. Its core insight: in REST APIs, the server defines what data is returned per endpoint — but what if the client could specify exactly what it needs? GraphQL inverts this: clients send a typed query describing the exact fields they want, and the server returns precisely that structure. This solves over-fetching (getting more data than needed) and under-fetching (making multiple round trips to assemble data from multiple endpoints).

**How it works:**
- **Schema-first:** A GraphQL schema defines all types, fields, and operations (queries, mutations, subscriptions) the API exposes. It is a typed contract between server and client. Schema introspection allows clients and tools (GraphiQL, Apollo Studio) to discover the full API automatically.
- **Single endpoint:** All GraphQL requests go to one endpoint (POST /graphql). The query in the request body specifies what to fetch. No versioning needed — add new fields without breaking existing queries; deprecate old fields without removing them.
- **Queries and mutations:** Query (read): { user(id: "42") { name, email, orders { total } } }. The response mirrors the query structure exactly. Mutation (write): mutation { createOrder(input: {...}) { id, status } }. Both are POST requests to the same endpoint.
- **N+1 problem:** Naive GraphQL resolvers cause N+1 database queries — for a list of 100 users, each user's orders field triggers a separate DB query. Solved with DataLoader (batching and caching): instead of 100 queries, DataLoader batches all order lookups into 1 query. DataLoader is non-optional in production GraphQL.
- **Subscriptions:** Real-time updates via WebSockets. subscription { orderUpdated(userId: "42") { status, updatedAt } }. Useful for live feeds, notifications, and dashboards where polling is wasteful.

**Real-world example:** GitHub migrated their public API v4 to GraphQL after finding that REST v3 required 4–8 round trips to load a typical page (repository list, user info, pull requests, issue counts). With GraphQL, a single query fetches all of it. GitHub reports that GraphQL reduced their API response sizes by ~60% for typical queries and eliminated the need to maintain multiple REST endpoints for different client needs (mobile vs desktop vs CI/CD tools all send different queries). Shopify's Storefront API, Twitter's v2 API, and Shopify's Admin API are all GraphQL-first.

**Key takeaway:** Choose GraphQL when you have multiple clients (web, mobile, third parties) with diverse data needs, or when REST over-fetching causes performance problems. Implement DataLoader from day one — the N+1 query problem will bite you in production without it. Prefer REST for simple CRUD APIs, public APIs consumed by third parties (simpler to use without GraphQL client libraries), and services where caching is critical (GraphQL queries are POST requests, making HTTP-layer caching difficult). GraphQL and REST are not mutually exclusive — many systems use REST for external APIs and GraphQL for internal client-server communication.` },
      { id: 17, name: "gRPC", desc: `gRPC (Google Remote Procedure Call) is a high-performance, open-source RPC framework that uses Protocol Buffers (protobuf) as its interface definition language and serialization format, running over HTTP/2. It was developed by Google in 2015 and is now the dominant choice for internal service-to-service communication in microservice architectures at companies like Google, Netflix, Dropbox, and Lyft. gRPC's advantages over REST/JSON — binary encoding (3–10× smaller payloads), HTTP/2 multiplexing, bi-directional streaming, and strongly typed generated clients — make it the right choice for high-throughput internal APIs.

**How it works:**
- **Protocol Buffers (protobuf):** IDL (Interface Definition Language) for defining service contracts and message types. Example: message User { string id = 1; string name = 2; int32 age = 3; }. Protobufs compile to language-specific client and server code. Binary encoding is 3–10× more compact than JSON and significantly faster to serialize/deserialize.
- **HTTP/2:** gRPC runs over HTTP/2, which provides: multiplexed streams (multiple concurrent RPCs over a single TCP connection), header compression (HPACK), and server push. This eliminates the head-of-line blocking of HTTP/1.1 and reduces connection overhead between services.
- **Four communication patterns:** Unary (single request, single response — like REST). Server streaming (single request, stream of responses — log streaming, live scores). Client streaming (stream of requests, single response — file upload, telemetry). Bi-directional streaming (both sides stream concurrently — real-time chat, multiplayer games).
- **Code generation:** From a .proto file, protoc generates type-safe client and server stubs in Go, Java, Python, Node.js, C++, etc. The client stub makes an RPC call that looks like a local function call; the generated code handles serialization, HTTP/2 framing, and retry logic. This eliminates hand-written HTTP client boilerplate.
- **Limitations:** gRPC is not browser-native — browsers cannot send raw HTTP/2 frames. gRPC-Web (with a proxy like Envoy) bridges this. JSON is human-readable; protobuf binary is not (harder to debug with curl). Schema changes require recompiling protos and redeploying clients.

**Real-world example:** Google's internal systems run on Stubby (gRPC's predecessor), handling billions of RPCs per second. When gRPC was open-sourced, Lyft adopted it for all internal service communication in their Envoy-based service mesh. Lyft reports that switching from JSON/REST to gRPC for internal services reduced CPU time on serialization/deserialization by ~30% and reduced payload sizes by ~60%, directly translating to fewer servers and lower latency between services in their high-QPS environment.

**Key takeaway:** Use gRPC for internal service-to-service communication where performance matters — it outperforms REST/JSON significantly on throughput and latency. Use REST/JSON for external APIs consumed by third parties and browsers (better tooling, no proto compilation required). The proto schema doubles as auto-generating documentation and type-safe client libraries. Start with unary RPCs (simplest, most like REST) and adopt streaming patterns only when the use case genuinely requires them (real-time data, large file transfers).` },
      { id: 18, name: "WebSockets", desc: `WebSockets provide full-duplex communication channels over a single, persistent TCP connection — once established, both the client and server can send messages to each other at any time, without the client having to initiate a request. This is fundamentally different from HTTP's request-response model, where the server can only respond to client requests. WebSockets are the right tool for any application where the server needs to push data to the client in real time: live collaborative editing, chat applications, live sports scores, trading dashboards, and multiplayer games.

**How it works:**
- **Handshake:** WebSocket connections start as HTTP requests with an Upgrade header (Upgrade: websocket). If the server supports WebSockets, it responds with 101 Switching Protocols. The connection is then upgraded — the TCP connection stays open but the HTTP protocol is replaced with the WebSocket framing protocol. No new TCP connection is needed.
- **Framing:** WebSocket messages are composed of frames (like HTTP/2 but simpler). Frames can be text (UTF-8 string) or binary. Messages can be fragmented into multiple frames for large payloads. The protocol is lightweight — each frame has only 2–14 bytes of overhead versus HTTP headers of 200–1000 bytes per request.
- **Connection lifecycle:** Unlike HTTP, WebSocket connections are long-lived. They must be actively managed: heartbeat pings to detect dead connections (TCP can silently die), reconnection logic with exponential backoff on the client, and graceful close handshake (close frame with status code and reason).
- **Scaling WebSockets:** WebSocket connections are stateful — a user's connection stays on a specific server instance. This breaks simple horizontal scaling. Solutions: sticky sessions (load balancer routes user to same server), or offload state to a pub/sub broker (Redis Pub/Sub, Kafka) where any server can subscribe to messages for its connected clients and publish events that all servers broadcast.
- **WebSockets vs HTTP/2 push:** HTTP/2 Server Push allows servers to proactively send resources, but it's cache-based (preloading assets) not event-based. SSE (EventSource) provides server-to-client streaming over HTTP/1.1 but is one-directional. WebSockets are the only standard option for bidirectional real-time communication.

**Real-world example:** Slack's real-time messaging uses WebSockets for instant message delivery to connected clients. When a message is sent, Slack's servers broadcast it over the open WebSocket connections of all users in that channel — delivering it in under 100ms globally. For scale (millions of concurrent connections), Slack uses a gateway layer of WebSocket servers that maintain client connections and communicate with backend services via message queues, decoupling connection management from business logic. This architecture allows backend services to scale independently of the WebSocket connection layer.

**Key takeaway:** Use WebSockets for bidirectional real-time communication where low latency and server-initiated push are both required. For server-to-client-only push, SSE is simpler (works over HTTP/1.1, automatic reconnection, built-in browser EventSource API). WebSocket connections are expensive resources — each holds a file descriptor and memory on the server. Use connection limits, heartbeats, and graceful reconnection. When scaling WebSockets horizontally, adopt a pub/sub pattern (Redis Pub/Sub) early to avoid sticky session complexity.` },
      { id: 19, name: "Long Polling vs Short Polling", desc: `Polling is how HTTP-based clients simulate real-time updates without WebSockets — by repeatedly asking the server "is there anything new?" Short polling and long polling are two approaches with very different performance characteristics. Both are workarounds for HTTP's request-response limitation, and both have been largely superseded by WebSockets (bidirectional) and SSE (server-to-client) for new systems. However, they remain relevant for environments with restricted WebSocket support, or as fallback strategies in libraries like Socket.IO.

**How it works:**
- **Short polling:** Client sends a request every N seconds (setInterval), regardless of whether there's new data. Simple to implement. Problems: (1) Unnecessary load — if nothing changes, every request returns empty data; (2) Latency equal to polling interval — if N=10s, updates arrive up to 10s late; (3) Doesn't scale well — 10,000 clients polling every second = 10,000 requests/second of mostly empty responses.
- **Long polling:** Client sends a request; server holds the connection open (does not respond) until new data is available or a timeout expires (typically 30–60 seconds). When data arrives, server responds, client immediately sends another request. Server must manage "hanging" connections. Reduces empty responses; typical latency is seconds rather than polling interval. But still creates high connection overhead — 10,000 waiting clients = 10,000 open server connections.
- **Resource comparison:** Short polling (10s interval): each client generates 6 req/min, mostly wasted. Long polling: each client holds 1 persistent connection, responded to immediately on event. Short polling is better for very frequent updates (every 1s); long polling is better for infrequent updates where immediacy matters.
- **Implementation challenges:** Long polling requires server-side connection tracking, timeout handling, and the ability to push data to a specific hanging request when an event occurs — which typically requires an in-memory map of pending requests or a pub/sub mechanism.
- **When to use each today:** Short polling for simple dashboards that refresh every 30–60 seconds, non-latency-sensitive status checks, and environments where connection limits are generous. Long polling as a WebSocket fallback in restrictive corporate proxy environments. For anything else: prefer SSE or WebSockets.

**Real-world example:** Early versions of Gmail used long polling for real-time email delivery — the page sent a hanging HTTP request to Google's servers, and when a new email arrived, the server responded to that request with the new message data, and the page immediately opened another. This delivered near-instant email notifications in 2004 without WebSocket support (which didn't exist yet). When WebSockets became widely supported, modern email clients (including Gmail) migrated to persistent connections for efficiency.

**Key takeaway:** Short polling is the simplest possible real-time mechanism and is appropriate when update intervals can be > 30 seconds or when implementation simplicity trumps efficiency. Long polling is a reasonable intermediate option — better latency than short polling, simpler server requirements than WebSockets. For new systems: use SSE for server-to-client push (simpler than WebSockets, works with HTTP/2), WebSockets for bidirectional communication. Use polling only as a fallback or for legacy compatibility.` },
      { id: 20, name: "Server-Sent Events (SSE)", desc: `Server-Sent Events (SSE) is a browser API and HTTP-based protocol for one-directional server-to-client streaming — the server pushes a stream of events to the client over a persistent HTTP connection. Unlike WebSockets, SSE works over standard HTTP/1.1 and HTTP/2, requires no protocol upgrade, supports automatic reconnection natively, and has a simple, text-based format. For use cases where the client only needs to receive data from the server (notifications, live dashboards, AI streaming responses), SSE is simpler and more appropriate than WebSockets.

**How it works:**
- **Protocol:** The server sets Content-Type: text/event-stream and keeps the HTTP response body open, sending lines in the format: data: {JSON here} followed by a blank line. Event types: data (payload), event (named event type), id (event ID for reconnection), retry (reconnection delay in ms).
- **EventSource API:** The browser's built-in EventSource API handles SSE connections. const es = new EventSource('/events'). es.onmessage = (e) => console.log(JSON.parse(e.data)). Automatic reconnection — if the connection drops, EventSource reconnects using the Last-Event-ID header, allowing the server to resume from where it left off.
- **HTTP/2 advantage:** With HTTP/1.1, browsers limit SSE connections to 6 per domain (the connection limit). HTTP/2 multiplexing removes this limit — all SSE streams share one TCP connection. Modern systems running HTTP/2 can have many simultaneous SSE streams without hitting browser connection limits.
- **Comparison to WebSockets:** SSE is text-only (WebSockets support binary); SSE is one-directional (WebSockets are bidirectional); SSE works through proxies and firewalls that strip WebSocket upgrades; SSE has built-in reconnection (WebSockets require custom reconnection logic); SSE is a standard HTTP response (trivially works with existing HTTP infrastructure, CDNs, load balancers).
- **Scaling SSE:** Like WebSockets, SSE connections are long-lived and must be managed. Use a pub/sub broker (Redis Pub/Sub) to decouple event generation from SSE servers — any server can publish events; SSE servers subscribe and forward to their connected clients.

**Real-world example:** OpenAI's streaming API (used by ChatGPT and API consumers) uses SSE to stream tokens as they are generated. The request is a standard POST, and the response is a text/event-stream where each data: line contains a JSON chunk with the next token. This allows the UI to render tokens as they arrive rather than waiting for the full response — dramatically improving perceived latency. The ChatGPT interface's "typewriter" effect is built on SSE streaming.

**Key takeaway:** Use SSE over WebSockets when communication is one-directional (server pushes to client only). SSE is significantly simpler: works with HTTP/2 out of the box, automatic reconnection, no need for a WebSocket server library, trivially works behind proxies. Ideal for: live notifications, activity feeds, real-time dashboard metrics, AI token streaming, and progress updates. Use WebSockets only when you need bidirectional communication — chat, collaborative editing, multiplayer games.` },
      { id: 21, name: "Synchronous vs Asynchronous Communication", desc: `Synchronous and asynchronous communication represent two fundamentally different patterns for how services and components interact. In synchronous communication, the caller blocks until the callee responds — both parties participate in the exchange in real time. In asynchronous communication, the caller sends a message and immediately continues — the callee processes it independently, and results (if any) are delivered later. The choice between them is one of the most consequential architectural decisions in distributed systems, affecting coupling, resilience, throughput, and complexity.

**How it works:**
- **Synchronous (request-response):** Caller sends request → waits (blocks) → receives response → continues. Examples: HTTP REST calls, gRPC unary, database queries. Simple, intuitive, easy to reason about. Problems at scale: the caller is as slow as the slowest callee; if the callee is down, the caller fails too; temporal coupling (both must be available simultaneously).
- **Asynchronous (message passing):** Caller publishes a message to a queue or topic → returns immediately → callee picks up the message independently → processes in its own time. Examples: Kafka, RabbitMQ, SQS, email. Decouples producer from consumer temporally (consumer doesn't need to be running when message is sent) and spatially (producer doesn't need to know who processes the message).
- **When synchronous is right:** When the caller genuinely needs the response before continuing — user login (need to know if credentials are valid), payment authorization (need to know if payment succeeded before confirming order), read operations (user needs data to render page). User-facing request paths are typically synchronous.
- **When asynchronous is right:** When work can be deferred — sending emails after signup, generating thumbnails after image upload, processing analytics events, coordinating multi-step workflows. When the callee is slower than the caller — don't let image processing block the HTTP response; put it in a queue. When you need to absorb traffic spikes — a queue buffers bursts that would overwhelm a synchronous service.
- **Saga pattern:** Distributed transactions across services use async choreography (each service publishes events that trigger next steps) or orchestration (a central coordinator sends commands and awaits results). Replaces ACID transactions across service boundaries.

**Real-world example:** Uber's trip completion triggers ~20 downstream operations: payment processing, driver payout, rating requests, receipt emails, fraud analysis, analytics updates, loyalty point credits. If all were synchronous, trip completion would take 5–10 seconds and any downstream failure would fail the entire transaction. Instead, trip completion publishes a TripCompleted event to Kafka; downstream services subscribe and process independently. Trip completion takes milliseconds; everything else proceeds asynchronously, with retries for failures.

**Key takeaway:** Default to synchronous for user-facing request paths where the response is needed immediately. Default to asynchronous for background work, cross-service workflows, and anything that can tolerate eventual consistency. Async patterns dramatically improve resilience (producer continues even if consumer is down) and throughput (no blocking), but add complexity: you lose immediate error feedback, debugging requires distributed tracing, and ensuring at-least-once delivery requires idempotent consumers.` },
      { id: 22, name: "HTTP/HTTPS & TLS", desc: `HTTP (HyperText Transfer Protocol) is the application-layer protocol that powers the web — every request from a browser, mobile app, or API client uses it. HTTPS is HTTP over TLS (Transport Layer Security), adding encryption, authentication, and integrity verification to every connection. TLS is not optional for any production system: search engines penalize non-HTTPS sites, browsers label them as "Not Secure," and without encryption, credentials and data are visible to anyone on the network path. Understanding HTTP versions (1.1, 2, 3) matters because each generation offers significant performance improvements.

**How it works:**
- **TLS handshake:** Client connects to server → server presents its certificate (signed by a trusted CA) → client verifies the certificate → both parties perform a key exchange (ECDHE) to derive a shared symmetric key → all subsequent communication is encrypted with that key. Modern TLS 1.3 completes the handshake in 1 round trip (vs TLS 1.2's 2 round trips), reducing connection setup latency.
- **HTTP/1.1 limitations:** One request per connection at a time (head-of-line blocking). Connections are reused (keep-alive) but requests queue behind each other. Workarounds: multiple parallel connections (browsers open 6 per domain), domain sharding, CSS/JS bundling to reduce request count.
- **HTTP/2 improvements:** Multiplexing — multiple requests in flight simultaneously over one connection, using streams. Header compression (HPACK — headers are indexed rather than sent repeatedly). Server Push (server proactively sends resources). Binary framing (more efficient than HTTP/1.1 text). Dramatically reduces need for HTTP/1.1 performance hacks.
- **HTTP/3 (QUIC):** Replaces TCP with QUIC (UDP-based) — eliminates TCP-level head-of-line blocking (a lost packet in HTTP/2 blocks all multiplexed streams sharing that TCP connection; QUIC streams are independent). 0-RTT connection establishment for returning connections. Particularly beneficial on lossy networks (mobile). Cloudflare and Google serve HTTP/3 to over 20% of web traffic.
- **Certificate management:** TLS certificates expire (typically every 90 days for Let's Encrypt, up to 1 year for paid CAs). Certificate expiry causes hard failures (browsers refuse to connect). Automate certificate renewal with Let's Encrypt + certbot or use managed TLS from cloud providers (AWS ACM, Cloudflare) that renew automatically.

**Real-world example:** Google's adoption of HTTP/2 and then HTTP/3 was driven by internal data showing that multiplexing reduced page load times by 15–20% for typical web pages, which make 60–100 sub-requests. For Google Search — where 100ms of latency correlates with ~1% drop in searches — these are significant wins. Google's QUIC protocol (which became HTTP/3's transport) was developed to address packet loss on mobile networks where TCP retransmission causes multi-second delays.

**Key takeaway:** HTTPS everywhere, no exceptions — use Let's Encrypt for free TLS and automate renewal. Enable HTTP/2 on your servers (nginx, caddy, traefik all support it out of the box) — it's a free performance improvement requiring no code changes. Don't worry about HTTP/3 yet unless you serve mobile-heavy traffic on lossy networks. Configure TLS correctly: TLS 1.2 minimum, TLS 1.3 preferred, HSTS headers (tell browsers to always use HTTPS), and OCSP stapling (speeds up certificate validation).` },
      { id: 23, name: "TCP vs UDP", desc: `TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) are the two transport-layer protocols that underpin nearly all internet communication. TCP provides reliable, ordered, error-checked delivery at the cost of connection setup overhead, retransmission latency, and head-of-line blocking. UDP is connectionless, provides no reliability guarantees, but has minimal overhead and no retransmission delays — making it ideal for applications where speed matters more than perfect delivery. Choosing between them (or building reliability on top of UDP) is a fundamental systems design decision.

**How it works:**
- **TCP: how reliability works:** Three-way handshake (SYN, SYN-ACK, ACK) establishes connection. Each byte has a sequence number; receiver sends acknowledgments. Lost packets are retransmitted. Flow control (receiver advertises buffer size) prevents overwhelming the receiver. Congestion control (CUBIC, BBR) reduces send rate when network congestion is detected. All of this guarantees ordered, reliable delivery — but adds latency (retransmission = round trip wait) and bandwidth overhead.
- **UDP: raw speed:** No handshake, no connection state, no acknowledgments, no ordering guarantees. Sender fires packets; receiver gets what arrives, in whatever order it arrives, with no notification of loss. No retransmission delay — if a packet is lost, it's gone. Suitable when: (1) old data is useless (live video frame — retransmitting a 100ms-old frame makes things worse, not better); (2) application-level reliability is preferred; (3) latency is more critical than completeness.
- **TCP head-of-line blocking:** In HTTP/1.1 and HTTP/2 over TCP, a lost packet stalls all subsequent data in the TCP stream until it's retransmitted. This is why HTTP/3 runs over QUIC (UDP-based) — streams are independent, so a lost packet only stalls that one stream.
- **Building reliability on UDP:** DNS, QUIC, WebRTC, DTLS, and gaming protocols build their own reliability mechanisms on UDP — selective retransmission (only retransmit lost critical data, not everything), forward error correction (send redundant data so some loss can be recovered without retransmission), and custom congestion control tuned for their use case.
- **Practical use cases:** TCP: HTTP, HTTPS, SSH, SMTP, database connections — anything where correctness is non-negotiable. UDP: DNS (single request/response — fast, loss handled by retry), live video/audio (WebRTC, Zoom), gaming (position updates — old data is irrelevant), DHCP, NTP.

**Real-world example:** Zoom uses UDP with a custom reliability layer for video/audio transmission. If a video packet is lost, Zoom doesn't wait for TCP retransmission — it uses forward error correction (FEC) to reconstruct missing packets from redundant data, or simply skips them if recovery is too slow. The result is that Zoom prioritizes audio continuity over video quality under packet loss (you might see frozen video briefly but you still hear the speaker) — a deliberate design choice enabled by their UDP-based transport.

**Key takeaway:** Default to TCP for all application development — most protocols and libraries use it, and reliability is almost always worth the overhead. Reach for UDP only when: (1) your application generates data faster than the network delivers it (live video, audio); (2) retransmitted data would be stale by the time it arrives (real-time gaming); or (3) you need to implement custom reliability semantics. Understanding TCP's congestion control (BBR vs CUBIC) matters for high-throughput data transfer — BBR can achieve significantly better throughput on high-latency links.` },
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

export default function SystemDesignConcepts() {
  return (
    <ConceptLayout
      title="System Design Concepts"
      subtitle="Every concept you need — from fundamentals to distributed systems"
      accentColor="#3A8FE8"
      categories={categories}
    />
  );
}
