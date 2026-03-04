const newsqlDistributed = {
  name: "NewSQL & Distributed Databases",
  icon: "🌐",
  color: "#10b981",
  concepts: [
    {
      id: 942,
      name: "NewSQL Overview",
      desc: `**NewSQL** — a class of relational databases designed to provide the scalability of NoSQL systems while maintaining full ACID compliance and SQL compatibility. NewSQL emerged around 2011 as a response to the false choice between "scalable but weak" (NoSQL) and "consistent but single-node" (traditional RDBMS).

**What NewSQL solves:** traditional relational databases don't scale writes horizontally without massive engineering effort (sharding a normalized schema is painful). NewSQL databases build distributed consensus and sharding directly into the engine, exposing a standard SQL interface.

**Key NewSQL databases:** CockroachDB, Google Spanner, TiDB, YugabyteDB, NuoDB, VoltDB.

**How they differ from traditional RDBMS:** they use consensus algorithms (Raft, Paxos) to replicate data, consistent hashing or range-based partitioning to distribute it, and distributed transaction protocols (2PC with Paxos) to maintain ACID across shards.

**Trade-offs:**
- Higher latency than single-node databases (consensus requires multiple network round-trips)
- More complex operational model
- Serializable transactions are achievable but expensive in distributed settings

**Key insight:** NewSQL is the right choice when you've outgrown a single PostgreSQL node (>TB of data, >100k writes/sec) but still need SQL semantics and strong consistency.`,
    },
    {
      id: 943,
      name: "CockroachDB",
      desc: `**CockroachDB** — an open-source, distributed SQL database designed for global-scale OLTP with strong consistency, automatic sharding, and PostgreSQL-compatible SQL. Named for its ability to survive partial cluster failures (like a cockroach surviving adverse conditions).

**Architecture:**
- Rows are stored as key-value pairs in RocksDB (an LSM-tree storage engine)
- Data is divided into ranges (64MB by default); each range is replicated 3x via Raft consensus
- Any node can serve any query — no primary/replica distinction for writes; any node routes to the right range
- Multi-active availability: read and write from any region without a designated primary

**Key features:**
- PostgreSQL wire protocol compatibility (migrate with minimal code changes)
- Geo-partitioned replicas: pin specific rows to specific regions for data residency compliance
- Serializable isolation by default (stronger than most databases' defaults)
- Automatic rebalancing when nodes are added or removed

**Latency trade-off:** serializable transactions across regions involve Raft consensus across geographic replicas — expect 50-200ms cross-region latency. For same-region operations, ~1-5ms.

**Key insight:** CockroachDB's "multi-region" feature lets you declare which rows are "global" (replicated everywhere) vs "regional" (pinned to a specific region) — critical for GDPR compliance.`,
    },
    {
      id: 944,
      name: "Google Spanner",
      desc: `**Google Spanner** — Google's globally distributed relational database, described in a landmark 2012 paper as the first system to offer global ACID transactions with external consistency across globally-distributed data. Available as Cloud Spanner on GCP.

**TrueTime:** Spanner's key innovation — Google's proprietary atomic-clock-based time API that provides bounded uncertainty on the current time (e.g., "the time is between T-ε and T+ε"). This enables globally consistent timestamps for serializable transactions without centralized coordination.

**Architecture:**
- Data is sharded into splits (similar to ranges in CockroachDB) and replicated via Paxos
- Each shard has a designated Paxos leader for writes; reads can be served by any replica (at a potential staleness cost)
- Two-phase commit (2PC) is used for distributed transactions with Paxos as the coordinator

**Use cases:** Google's own products (Gmail, Google Photos, Google Play) run on Spanner. Best for financial and transactional workloads requiring global consistency.

**Cloud Spanner pricing:** expensive (commitment to reserved processing units). Suited for enterprises where correctness > cost.

**Key insight:** TrueTime is what makes Spanner's external consistency possible without a global sequencer — it's a hardware solution (atomic clocks and GPS receivers in data centers) to a distributed systems problem.`,
    },
    {
      id: 945,
      name: "Distributed Consensus (Raft & Paxos)",
      desc: `**Distributed consensus** — the problem of getting a cluster of nodes to agree on a single value (e.g., "this write was committed") even when some nodes are unavailable or slow. Consensus algorithms are the foundation of all distributed databases.

**Paxos** — Leslie Lamport's original consensus algorithm (1989). Theoretically elegant, notoriously hard to implement correctly. Used in Google Chubby, Zookeeper, and early Spanner.

**Raft** — designed in 2013 by Ongaro & Ousterhout as "Paxos but understandable." Uses a strong leader model: one node is elected leader, receives all writes, replicates to followers, and commits when a quorum (majority) acknowledges. Leader election uses randomized timeouts to avoid split votes.

**Raft guarantees:**
- A write is durable once committed by a majority of nodes
- Split-brain is prevented — without a quorum, the leader cannot commit
- At most one leader at any term

**Performance:** a 3-node Raft cluster tolerates 1 failure; 5 nodes tolerate 2. Adding more nodes increases fault tolerance but adds write latency (must wait for more acknowledgments).

**Key insight:** Raft's leader-based model means a single leader processes all writes — this is a throughput ceiling. Multi-Raft (one leader per shard) is how databases like TiKV and CockroachDB scale write throughput.`,
    },
    {
      id: 946,
      name: "Two-Phase Commit (2PC)",
      desc: `**Two-Phase Commit (2PC)** — a distributed transaction protocol ensuring atomicity across multiple participants (database shards, services). Phase 1 (Prepare): a coordinator asks all participants if they can commit. Phase 2 (Commit): if all say yes, the coordinator sends "commit"; if any say no, it sends "abort."

**The problem:** 2PC is a blocking protocol. If the coordinator crashes after Phase 1 but before Phase 2, participants are stuck in a "prepared" state — they can neither commit nor abort until the coordinator recovers.

**2PC failure modes:**
- Coordinator crash after PREPARE but before COMMIT: participants hold locks indefinitely
- Network partition between coordinator and a participant: participant is blocked
- Slow participants: coordinator waits for all before proceeding (reducing throughput)

**3PC (Three-Phase Commit):** adds a pre-commit phase to reduce blocking, but is still vulnerable to network partitions and rarely used in practice.

**Modern approach:** databases like CockroachDB and Spanner combine 2PC with Paxos — the coordinator role is replicated (via Paxos), so coordinator crash doesn't block the transaction indefinitely.

**Key insight:** 2PC is not a scalability mechanism — it's a correctness mechanism. High-throughput distributed systems use compensating transactions (sagas) or idempotent event sourcing to avoid 2PC entirely.`,
    },
    {
      id: 947,
      name: "TiDB",
      desc: `**TiDB** — an open-source, cloud-native distributed SQL database from PingCAP that separates the compute layer (TiDB Server) from the storage layer (TiKV), with an HTAP extension (TiFlash) for analytical queries. MySQL wire-protocol compatible.

**Architecture:**
- **TiDB Server** — stateless SQL parser and query planner; scales horizontally
- **TiKV** — distributed key-value storage using Multi-Raft; stores OLTP data in row format
- **TiFlash** — columnar replica of TiKV data; handles analytical queries with vectorized execution; updates in real-time from TiKV
- **PD (Placement Driver)** — cluster manager using etcd; handles scheduling, load balancing, and TiKV metadata

**HTAP (Hybrid Transactional/Analytical Processing):** TiDB can run transactional queries (TiKV) and analytical queries (TiFlash) on the same data without ETL, often with real-time freshness. This eliminates the need for a separate data warehouse for near-real-time analytics.

**When to use:** MySQL users who need horizontal write scaling, mixed OLTP+analytics workloads, or global distribution without abandoning SQL.

**Key insight:** TiDB's separation of compute and storage is its key architectural advantage — you can scale SQL query processing and storage independently.`,
    },
    {
      id: 948,
      name: "YugabyteDB",
      desc: `**YugabyteDB** — an open-source, distributed SQL database built on top of the DocDB storage layer (inspired by Google Spanner/HBase), with both a PostgreSQL-compatible API (YSQL) and a Cassandra-compatible API (YCQL).

**Architecture:**
- **DocDB** — the shared storage engine; uses a document-key model with RocksDB for each tablet; Raft consensus across 3+ replicas per tablet
- **YSQL** — PostgreSQL wire protocol compatibility; most PostgreSQL features work out of the box, including joins, window functions, and stored procedures
- **YCQL** — Cassandra Query Language compatibility; for teams migrating from Cassandra

**Advantages over CockroachDB:**
- PostgreSQL compatibility is more complete (YugabyteDB reuses PostgreSQL's query layer code)
- Dual API (PostgreSQL + Cassandra) from one cluster

**Use cases:** PostgreSQL users needing horizontal scale-out, global distribution with GDPR-compliant data residency, multi-API requirements.

**Key insight:** YugabyteDB and CockroachDB are the two leading open-source NewSQL options. YugabyteDB has better PostgreSQL feature compatibility; CockroachDB has a more battle-tested multi-region story.`,
    },
    {
      id: 949,
      name: "Global Secondary Indexes (GSI)",
      desc: `**Global Secondary Index (GSI)** — an index in a distributed database that spans all partitions of the base table, allowing queries on non-primary-key attributes without scanning every partition. "Global" because the index data may live on different nodes than the base table data.

**DynamoDB GSI:**
- Creates a new projection of the table data, distributed by a different partition key
- Eventually consistent by default (strong consistency option available)
- Has its own RCU/WCU provisioning separate from the base table
- Maximum 20 GSIs per table

**CockroachDB/TiDB secondary indexes:**
- Strong consistency (index updates are atomic with the base row write, via 2PC)
- More expensive to write (every write must update all indexes)
- Can query with any predicate covered by an index

**LSI vs GSI (DynamoDB):**
- **LSI** — Local Secondary Index; same partition key as the base table, different sort key; strongly consistent; created only at table creation; limited to 10GB per partition key value
- **GSI** — different partition key; eventually consistent; can be added/deleted at any time

**Key insight:** In distributed databases, secondary indexes have a higher write cost than in single-node databases — each write may need to update index partitions on different nodes, requiring distributed coordination.`,
    },
    {
      id: 950,
      name: "HTAP (Hybrid Transactional/Analytical Processing)",
      desc: `**HTAP** — a database architecture that handles both OLTP (transactional: frequent small reads/writes) and OLAP (analytical: large scans, aggregations) on the same data platform, eliminating the ETL pipeline between a transactional database and a data warehouse.

**Why HTAP is hard:** OLTP workloads favor row-oriented storage (fetch one row, update a few columns), while OLAP workloads favor columnar storage (scan millions of rows, compute aggregates on two columns). HTAP systems maintain both representations.

**Approaches:**
- **Dual-store (TiDB/TiFlash, Oracle HTAP):** row store for OLTP (TiKV), column store for OLAP (TiFlash), with real-time sync between them
- **In-memory OLAP (SAP HANA, Hyper):** entire dataset in memory, row-oriented storage with aggressive SIMD vectorization for both workloads
- **Adaptive layout:** automatically reorganize hot/cold data into the optimal layout

**Benefits:** real-time analytics without ETL delay; operational reports query live data; eliminates a separate data warehouse for near-real-time use cases.

**Limitations:** HTAP systems are complex; true isolation between OLAP queries (full table scans) and OLTP performance is hard to achieve — a heavy analytics query can still degrade transactional latency.

**Key insight:** HTAP reduces the data pipeline complexity dramatically for use cases where "T+1 hour" or "T+1 day" ETL latency is unacceptable.`,
    },
    {
      id: 951,
      name: "Geo-Distributed Databases",
      desc: `**Geo-distributed database** — a database where data and compute are physically spread across multiple geographic regions (data centers, cloud regions), serving low-latency reads/writes globally while maintaining consistency and durability.

**Why distribute geographically:**
- Low read latency: serve users from the nearest region (<10ms vs 200ms cross-continental)
- Disaster recovery: survive entire regional outages
- Data residency compliance: GDPR requires EU data to stay in the EU

**Consistency challenges:** the speed of light limits how fast nodes can communicate. A commit from New York to London takes ~80ms round-trip. Serializable global transactions are limited by this latency floor.

**Strategies:**
- **Follow-the-sun reads:** route reads to nearest replica; writes go to a primary region (CockroachDB, Aurora Global Database)
- **Multi-primary writes:** any region can accept writes with conflict resolution (DynamoDB Global Tables, Cassandra multi-DC)
- **Geo-partitioning:** pin user data to their local region (CockroachDB geo-partitioned replicas, Spanner managed instance regions)

**Latency vs consistency:** strong global consistency means writes must round-trip to a quorum of regions. Systems like Spanner accept this latency for financial data; social networks accept eventual consistency for feed data.

**Key insight:** Geo-distribution multiplies operational complexity. Start with a single region; add geo-distribution only when latency data or compliance requirements demand it.`,
    },
  ],
};

export default newsqlDistributed;
