const nosql = {
  name: "NoSQL Databases",
  icon: "🌿",
  color: "#8b5cf6",
  concepts: [
    {
      id: 930,
      name: "Why NoSQL",
      desc: `**NoSQL** — a broad class of databases that abandon or relax the strict relational model in favor of flexible schemas, horizontal scalability, and specialized data models optimized for specific access patterns.

**Why NoSQL emerged:** relational databases struggle to scale writes horizontally (sharding a normalized schema is complex), and they enforce a rigid schema that slows development for rapidly-changing data structures. By 2010, companies like Google (Bigtable), Amazon (Dynamo), and Facebook (Cassandra) had published papers on their distributed databases that inspired the NoSQL movement.

**NoSQL types:**
- Document stores (MongoDB, Firestore)
- Key-value stores (Redis, DynamoDB)
- Wide-column stores (Cassandra, HBase)
- Graph databases (Neo4j, Amazon Neptune)
- Time-series (InfluxDB, TimescaleDB)
- Search engines (Elasticsearch)
- Vector databases (Pinecone, Weaviate)

**When NOT to use NoSQL:** complex relational queries, strong consistency requirements, data with many-to-many relationships, when you need ad-hoc queries you can't predict in advance.

**Key insight:** NoSQL databases don't replace SQL — they solve different problems. The right question is "what are my read/write access patterns?" not "SQL or NoSQL?"`,
    },
    {
      id: 931,
      name: "Document Databases (MongoDB)",
      desc: `**Document database** — stores data as self-describing JSON-like documents (BSON in MongoDB), allowing flexible, nested structures without a fixed schema. Each document can have different fields, and documents are grouped in collections (analogous to tables).

**MongoDB highlights:**
- Flexible schema: add new fields without altering a table; great for rapidly evolving data models
- Embedded documents: store related data together (user + addresses + preferences in one document) — avoids joins
- Rich query language: filter, project, sort, aggregate with a JSON-based API
- Aggregation Pipeline: powerful multi-stage data transformation (analogous to SQL's GROUP BY + JOIN + HAVING chain)
- Horizontal sharding built-in (mongos router, config servers, shard keys)
- Transactions: multi-document ACID transactions since MongoDB 4.0

**When to use:** catalogs with variable attributes (products with different specs), CMS content, user profiles, event logs.

**When NOT to use:** highly relational data with complex joins, financial transactions requiring strong consistency across multiple entities.

**Key insight:** MongoDB's "store everything in one document" pattern is powerful but dangerous — deeply nested, large documents become slow to update and hard to query; model with access patterns in mind.`,
    },
    {
      id: 932,
      name: "Key-Value Stores (Redis)",
      desc: `**Key-value store** — the simplest NoSQL model: data is stored and retrieved by a unique key, like a giant hash map. The value is opaque to the database — it can be a string, blob, or serialized object. **Redis** elevates this with rich data structures (strings, hashes, lists, sets, sorted sets, streams) and in-memory storage with optional persistence.

**Redis use cases:**
- **Caching:** store expensive query results or API responses with TTL; "GET key" is O(1) at microsecond latency
- **Sessions:** store user session data with automatic expiry
- **Rate limiting:** "INCR key" + "EXPIRE" implements a token bucket or sliding window counter atomically
- **Leaderboards:** sorted sets ("ZADD", "ZRANGE") maintain scores with O(log n) updates
- **Pub/Sub:** lightweight message passing between services
- **Distributed locks:** "SET key value NX EX 30" acquires a lock atomically

**Redis persistence:** RDB snapshots (periodic full dump) or AOF (append-only log of every command). Redis Cluster provides horizontal partitioning. Redis Sentinel provides HA with automatic failover.

**Key insight:** Redis is in-memory first — all data must fit in RAM. For caches this is fine; for durable storage of large datasets, it gets expensive.`,
    },
    {
      id: 933,
      name: "Wide-Column Stores (Cassandra)",
      desc: `**Wide-column store** — a database that organizes data in rows and dynamic columns, where each row can have different columns and there can be millions of columns per row. The row key is the primary lookup unit. Apache Cassandra is the dominant open-source wide-column store, modeled after Google Bigtable.

**Cassandra's architecture:**
- **Masterless (peer-to-peer):** no single point of failure; any node can handle any request
- **Consistent hashing + virtual nodes:** data is distributed by partition key across the ring; adding nodes requires minimal reshuffling
- **Tunable consistency:** per-query consistency (ONE, QUORUM, ALL) lets you choose between speed and correctness
- **Compaction:** merges SSTables periodically to reclaim space from deleted/updated data

**Cassandra data modeling rule:** model for your queries, not for normalization. Create a separate table for each query pattern (denormalization is expected).

**When to use:** write-heavy workloads at massive scale (IoT telemetry, time-series events, activity logs), global active-active deployments, data that partitions naturally by a key (user_id, sensor_id).

**Key insight:** Cassandra's superpower is linear write scalability — adding nodes increases write throughput proportionally. Its kryptonite is ad-hoc queries and aggregations (use Spark or Presto for analytics).`,
    },
    {
      id: 934,
      name: "Graph Databases (Neo4j)",
      desc: `**Graph database** — stores data as nodes (entities) and edges (relationships) with properties on both, optimized for traversing connected data. Graph databases shine when the relationships between data are as important as the data itself.

**When graphs beat relational databases:**
- Queries that traverse multiple hops: "find all colleagues of my colleagues who live in Berlin" — a recursive SQL CTE or multiple joins; in Neo4j, a single Cypher query
- Relationship-heavy domains: social networks, fraud detection (shared devices, IPs, accounts), recommendation engines, knowledge graphs, supply chain

**Neo4j & Cypher:** Neo4j's query language Cypher uses ASCII art to express patterns: "(alice)-[:KNOWS]->(bob)" reads as "alice knows bob." It's intuitive for graph patterns.

**Graph database types:**
- Property graphs (Neo4j, Amazon Neptune): nodes and edges have arbitrary key-value properties
- RDF/triple stores (Stardog, GraphDB): Subject-Predicate-Object triples, W3C standard, used in semantic web

**When NOT to use:** simple CRUD data with no meaningful relationships, large analytics over flat tabular data.

**Key insight:** A 6-hop social graph query that takes minutes in SQL (exponential join explosion) takes milliseconds in Neo4j — graph databases don't join, they follow pointers.`,
    },
    {
      id: 935,
      name: "Time-Series Databases",
      desc: `**Time-series database (TSDB)** — a database optimized for storing and querying sequences of data points indexed by time: metrics, sensor readings, financial ticks, application logs. Time is the primary dimension.

**What makes TSDBs special:**
- **Time-based partitioning:** data is chunked by time range — recent data is hot, old data is cold and compressible
- **Efficient compression:** sequential numeric values compress extremely well (delta encoding, XOR compression — Gorilla algorithm achieves 1.37 bytes per data point)
- **Automatic retention:** old data is automatically downsampled or deleted (data policies)
- **Time-aware queries:** "last 5 minutes," "average per hour," "rate of change" are first-class operations

**Key TSDBs:**
- **InfluxDB** — popular for infrastructure metrics; Flux query language; purpose-built TSDB
- **TimescaleDB** — PostgreSQL extension; full SQL with time-series optimizations; best of both worlds
- **Prometheus** — pull-based monitoring + TSDB; PromQL for alerting; integrates with Grafana
- **ClickHouse** — columnar OLAP that also excels at time-series analytics at massive scale

**Key insight:** Storing IoT sensor data (1M readings/second) in a relational database quickly becomes unmanageable. A TSDB handles this natively with 10-100x better compression and query speed.`,
    },
    {
      id: 936,
      name: "Search Databases (Elasticsearch)",
      desc: `**Elasticsearch** — a distributed, RESTful search and analytics engine built on Apache Lucene. Documents are stored as JSON and indexed for full-text search, structured queries, and aggregations — all via HTTP API. Part of the Elastic Stack (ELK: Elasticsearch, Logstash, Kibana).

**Core concepts:**
- **Index:** analogous to a database table; each index has a mapping (schema)
- **Document:** a JSON object; the unit of search
- **Inverted index:** Lucene's core data structure — maps terms to the documents containing them
- **Shards & replicas:** index is divided into primary shards (parallelism) and replica shards (HA + read scaling)
- **Relevance scoring:** BM25 algorithm ranks results by term frequency, inverse document frequency, and field length

**Strengths:** fuzzy search, autocomplete ("search-as-you-type"), faceted navigation (filters with counts), log analytics (Kibana dashboards), geospatial queries.

**Weaknesses:** not a primary data store (no ACID transactions), high memory requirements, complex cluster management, eventual consistency.

**When to use:** search across large text corpora, log aggregation (ELK stack), product search with facets, autocomplete.

**Key insight:** Elasticsearch is typically a secondary store — your primary data lives in PostgreSQL/MongoDB, and you sync it to Elasticsearch for search. Never make Elasticsearch your system of record.`,
    },
    {
      id: 937,
      name: "Vector Databases",
      desc: `**Vector database** — a database optimized for storing and querying high-dimensional vector embeddings using approximate nearest neighbor (ANN) algorithms, enabling semantic similarity search rather than exact keyword matching.

**Why they matter for AI:** LLMs represent text, images, and audio as dense vectors (embeddings). "Find documents semantically similar to this query" means finding vectors geometrically close in embedding space — a problem traditional databases solve poorly.

**How ANN works:** exact nearest-neighbor search in high dimensions is O(n×d) — too slow. ANN algorithms (HNSW — Hierarchical Navigable Small World, IVF-Flat, PQ — Product Quantization) trade a small accuracy loss for 100-1000x speed improvement.

**Key vector databases:**
- **Pinecone** — fully managed, easy to use, expensive
- **Weaviate** — open-source, multi-modal, GraphQL API
- **Qdrant** — open-source, Rust-based, excellent performance
- **Chroma** — developer-friendly, common in LangChain demos
- **pgvector** — PostgreSQL extension; "good enough" for <1M vectors without additional infrastructure

**Retrieval-Augmented Generation (RAG):** embed a knowledge base, store in vector DB, query with the user's question embedding to retrieve relevant context for an LLM.

**Key insight:** pgvector handles most RAG use cases up to ~1M vectors. Dedicated vector databases become necessary at larger scale or with advanced hybrid search requirements.`,
    },
    {
      id: 938,
      name: "Amazon DynamoDB",
      desc: `**DynamoDB** — Amazon's fully managed, serverless NoSQL database offering single-digit millisecond latency at any scale. Uses a key-value and document model. Scales to trillions of items and millions of requests per second with no capacity planning.

**Core concepts:**
- **Partition key (hash key):** determines data placement across partitions; must be chosen carefully to avoid hot partitions
- **Sort key (range key):** enables range queries and compound primary keys (partition_key + sort_key)
- **LSI (Local Secondary Index):** alternate sort key on the same partition; created at table creation only
- **GSI (Global Secondary Index):** query on non-primary-key attributes; eventually consistent; has its own throughput
- **Single-table design:** DynamoDB experts store multiple entity types in one table, using key prefixes to differentiate (e.g., "USER#123" and "ORDER#456") — avoids the join limitation

**Pricing model:** read capacity units (RCUs) and write capacity units (WCUs); on-demand or provisioned. Strong reads cost 2x eventual reads.

**When to use:** high-traffic applications needing reliable low latency at scale (gaming leaderboards, shopping carts, session stores), serverless applications on AWS.

**Key insight:** DynamoDB's single-table design is counterintuitive but powerful — it requires understanding access patterns upfront, but delivers consistent performance regardless of scale.`,
    },
    {
      id: 939,
      name: "NoSQL Data Modeling",
      desc: `**NoSQL data modeling** — designing schemas around query patterns rather than around normalized entities. Unlike relational modeling (normalize first, optimize later), NoSQL modeling starts with "what queries will I run?" and works backward to the schema.

**Core principles:**
- **Denormalize aggressively:** duplicate data to collocate it with the query that needs it
- **Embed vs reference:** embed related data (MongoDB: user + addresses in one document) when always fetched together; reference when data changes independently or is shared
- **Design for access patterns:** create one table/collection per query pattern in Cassandra; use composite keys in DynamoDB to enable range queries
- **Avoid unbounded arrays:** embedding an array that grows without limit becomes a performance and storage problem

**Partition key design (Cassandra/DynamoDB):**
- High cardinality: spread data across nodes (avoid hot partitions)
- Even access distribution: don't let one key get 90% of traffic
- Natural query alignment: the partition key should match your most common query predicate

**Anti-pattern:** designing a NoSQL schema like a relational schema, then wondering why it doesn't scale.

**Key insight:** NoSQL data modeling is harder than relational modeling, not easier. The flexibility is a trap for beginners — disciplined modeling around query patterns is essential.`,
    },
    {
      id: 940,
      name: "SQL vs NoSQL Trade-offs",
      desc: `**Choosing SQL vs NoSQL** — the decision depends on data structure, access patterns, consistency requirements, and scale — not trends or team preference.

**Choose SQL when:**
- Data is relational with complex many-to-many relationships
- You need ad-hoc queries (data analysts running exploratory queries)
- Strong consistency and ACID transactions are required (financial, healthcare)
- Team is comfortable with SQL and relational modeling
- Schema is relatively stable

**Choose NoSQL when:**
- Access patterns are well-defined and unlikely to change
- Horizontal write scalability is required (millions of writes/sec)
- Data is document-like with flexible, schema-less attributes
- Ultra-low latency (sub-millisecond) is needed (key-value cache/store)
- Specific data model maps naturally (graphs, time-series, vectors)

**The polyglot persistence pattern:** modern systems use multiple databases — PostgreSQL for core business data, Redis for caching, Elasticsearch for search, Kafka for event streaming. Each tool does what it's best at.

**Key insight:** "Use the right tool for the job" is the correct answer, but it requires operational maturity to run multiple database systems. Start with a good relational database; add specialized stores when you have a clear, measured need.`,
    },
    {
      id: 941,
      name: "Multi-Model Databases",
      desc: `**Multi-model database** — a database system that supports multiple data models (document, graph, key-value, relational) through a unified query interface and storage engine, reducing the operational complexity of running multiple specialized databases.

**Examples:**
- **ArangoDB** — document, graph, and key-value with AQL (ArangoDB Query Language)
- **Azure Cosmos DB** — document (Core SQL API), MongoDB API, Cassandra API, Gremlin (graph), Table API — same underlying engine, multiple wire protocols
- **FaunaDB / Fauna** — document + relational with ACID transactions
- **OrientDB** — document + graph

**Advantages:**
- Single operational stack (one database to manage, monitor, backup)
- Transactions can span model types (update a document and a graph edge atomically)
- Polyglot data modeling without running separate services

**Disadvantages:**
- Often not as optimized as specialized databases for their respective models
- Lock-in to a specific vendor or engine
- Smaller community and ecosystem than dedicated tools

**When to consider:** when you genuinely need multiple data models and the operational overhead of multiple systems is high; when transaction consistency across model types is required.

**Key insight:** Multi-model databases are a pragmatic choice for smaller teams. High-scale systems usually outgrow them and decompose into specialized stores.`,
    },
  ],
};

export default nosql;
