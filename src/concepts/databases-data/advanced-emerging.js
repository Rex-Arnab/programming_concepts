const advancedEmerging = {
  name: "Advanced & Emerging",
  icon: "🚀",
  color: "#f97316",
  concepts: [
    {
      id: 1026,
      name: "Database Internals: LSM-Tree vs B-Tree",
      desc: `**B-Tree (Balanced Tree)** — the dominant index structure in traditional RDBMS (PostgreSQL, MySQL). A self-balancing tree where nodes contain sorted keys and pointers to children or data. O(log n) reads and writes. Updates are in-place — find the leaf node and modify it.

**LSM-Tree (Log-Structured Merge-Tree)** — used by NoSQL databases (Cassandra, RocksDB, LevelDB, HBase). All writes are appended sequentially to an in-memory buffer (MemTable), then flushed to immutable sorted files (SSTables) on disk. Reads must check the MemTable + multiple SSTables (compaction merges them periodically).

**B-Tree vs LSM-Tree trade-offs:**

| Aspect | B-Tree | LSM-Tree |
|---|---|---|
| Write speed | Moderate (random I/O for in-place update) | High (sequential append always) |
| Read speed | High (one tree traversal) | Moderate (check multiple SSTables) |
| Space amplification | Low | Higher (compaction produces temporary extra copies) |
| Write amplification | Lower | Higher (data written multiple times during compaction) |
| Best for | Read-heavy OLTP | Write-heavy workloads |

**Compaction:** LSM-Trees periodically merge SSTables to remove overwrites and deleted records, maintaining read performance. Without compaction, reads degrade as more SSTables accumulate.

**Key insight:** Cassandra, RocksDB (used by TiKV, CockroachDB storage layer), and DynamoDB all use LSM-Trees — the write performance advantage is why they dominate write-heavy workloads. PostgreSQL's B-Tree is still faster for random reads.`,
    },
    {
      id: 1027,
      name: "Write-Ahead Logging (WAL)",
      desc: `**Write-Ahead Log (WAL)** — a fundamental database durability mechanism: before changing any data file, write a description of the change to a sequential log (the WAL). On crash recovery, replay the WAL to bring data files to a consistent state.

**Why WAL provides durability:** disk writes are not atomic (a power failure mid-write corrupts a data block). WAL is sequential — appending to the end of a log file is crash-safe because a partial write at the end of the log is simply discarded during recovery.

**WAL enables:**
- **Crash recovery:** replay WAL records from the last checkpoint to redo committed transactions
- **Streaming replication:** stream WAL from primary to replicas — replicas apply the same changes
- **PITR:** archive WAL segments to object storage; replay to any timestamp
- **Logical replication / CDC:** read WAL at the logical level to extract row-level changes (Debezium)

**WAL buffer:** changes are first written to the WAL buffer in shared memory, then flushed to WAL files on disk at transaction commit (controlled by "synchronous_commit"). Setting "synchronous_commit = off" improves throughput but risks losing the last few transactions on crash (acceptable for non-critical data).

**Checkpoints:** PostgreSQL periodically writes all dirty data pages to disk and records a checkpoint in the WAL. Recovery only needs to replay from the last checkpoint, not from the beginning.

**Key insight:** WAL is the heart of every relational database's durability and replication story. Understanding WAL sequence numbers (LSN in PostgreSQL) is essential for diagnosing replication lag and planning storage for WAL archiving.`,
    },
    {
      id: 1028,
      name: "MVCC (Multi-Version Concurrency Control)",
      desc: `**MVCC (Multi-Version Concurrency Control)** — a concurrency control mechanism where the database maintains multiple versions of each row, allowing readers to access a consistent snapshot of data at a point in time without blocking writers, and vice versa.

**How PostgreSQL MVCC works:**
- Every row has "xmin" (transaction that created it) and "xmax" (transaction that deleted/updated it)
- An UPDATE creates a new row version with a new xmin, and marks the old version with xmax
- A transaction's snapshot includes all rows where "xmin <= my_txid AND (xmax is null OR xmax > my_txid)"
- Readers never block writers; writers never block readers (only writer-writer conflicts require locks)

**MVCC trade-offs:**
- **Read performance:** each query applies snapshot visibility rules to every row — slight overhead vs non-MVCC
- **Dead tuples:** old row versions accumulate and must be cleaned up by VACUUM — storage overhead
- **Transaction IDs:** 32-bit XID wraps around every ~2 billion transactions; VACUUM freezes old XIDs to prevent XID wraparound catastrophe

**MVCC in other databases:**
- MySQL InnoDB: MVCC using an undo log (old versions stored in the undo tablespace, not inline)
- Oracle: MVCC via undo segments
- CockroachDB: MVCC with timestamps instead of transaction IDs

**Snapshot isolation vs serializable:** MVCC naturally provides snapshot isolation. Serializable Snapshot Isolation (SSI) adds detection of serialization anomalies (predicate conflicts) to achieve true serializability — PostgreSQL uses SSI for SERIALIZABLE isolation level.

**Key insight:** MVCC is why PostgreSQL's read performance doesn't degrade under write load — reads take a consistent snapshot and proceed without waiting for concurrent writes to finish.`,
    },
    {
      id: 1029,
      name: "Serverless Databases",
      desc: `**Serverless database** — a database service where the provider automatically manages scaling (including scaling to zero), provisioning, and billing per actual usage (per-query or per-second), removing capacity planning from the operator's responsibilities.

**Key serverless databases:**
- **PlanetScale** (MySQL-compatible): Vitess-based; branching feature (database branches like Git branches for schema changes); scales from zero; no foreign key constraints by default
- **Neon** (PostgreSQL-compatible): separates storage (shared, object-storage-based) from compute; compute scales to zero when idle; instant branching; built for serverless architectures
- **CockroachDB Serverless:** automatic scaling; consumption-based pricing; multi-tenant shared cluster
- **Aurora Serverless v2 (AWS):** scales PostgreSQL/MySQL compute in 0.5 ACU increments; great for variable workloads; not true scale-to-zero (minimum ~0.5 ACU)
- **Fauna:** globally distributed, multi-model, truly serverless; FQL query language

**Scale-to-zero value:** for development environments, staging, or low-traffic applications — don't pay for idle compute. A dev database that's only used during business hours can scale to zero overnight.

**Limitations:**
- Cold start latency when scaling up from zero (seconds)
- Vendor lock-in (proprietary APIs, limited SQL compliance in some)
- Less predictable billing for high and sustained workloads

**Key insight:** Serverless databases are ideal for startups, dev/test environments, and applications with highly variable traffic. For sustained, predictable high-throughput workloads, provisioned instances remain more cost-effective.`,
    },
    {
      id: 1030,
      name: "DuckDB & Analytical SQL",
      desc: `**DuckDB** — an in-process analytical SQL database engine designed to run directly within your application (like SQLite, but for OLAP). No server, no network — query CSV, Parquet, JSON files and in-memory DataFrames at near-C++ speed.

**Why DuckDB is transforming analytics:**
- Run complex analytical SQL on local files: "SELECT * FROM 'data.parquet' WHERE date > '2024-01-01'"
- Query S3 Parquet files without downloading: "SELECT * FROM read_parquet('s3://bucket/data/*.parquet')"
- Query pandas DataFrames directly from SQL: "duckdb.sql('SELECT * FROM df')" — zero data copying
- Multi-threaded vectorized execution using SIMD
- Columnar in-memory format (similar to Apache Arrow) for 10-100x faster analytics than pandas

**DuckDB vs Pandas for analytics:** DuckDB is typically 5-20x faster than pandas for groupby/aggregate operations on medium to large DataFrames. The SQL interface is often clearer for complex transformations.

**DuckDB vs Spark:** DuckDB is single-machine (no distributed processing). For data that fits in local RAM (up to ~100GB with disk spilling), DuckDB is faster and simpler. For petabytes, use Spark.

**MotherDuck:** managed cloud DuckDB — run DuckDB queries against cloud-hosted data at scale; hybrid execution (local + cloud).

**Key insight:** DuckDB is replacing pandas for many analytical tasks — it's faster, uses SQL (familiar to analysts), and handles files too large to load fully into RAM via disk spilling. "DuckDB is to analytics what SQLite is to transactional data."`,
    },
    {
      id: 1031,
      name: "Vector Similarity Search at Scale",
      desc: `**Vector similarity search** — finding the K nearest vectors to a query vector in a high-dimensional space, the fundamental operation powering semantic search, recommendation engines, and RAG pipelines.

**Distance metrics:**
- **Cosine similarity:** angle between vectors; most common for text embeddings (measures directional similarity regardless of magnitude)
- **Euclidean distance (L2):** straight-line distance; better for image embeddings and some ML models
- **Dot product:** similar to cosine but magnitude-sensitive; used by many LLM embedding APIs

**Exact vs approximate nearest neighbor (ANN):** exact k-NN requires comparing the query vector against every stored vector — O(n×d). For 1M vectors at 1536 dimensions (OpenAI embedding size), this is 1.5 billion multiplications per query. ANN algorithms trade a small accuracy loss (recall@10 = 95%) for 100-1000x speed improvement.

**HNSW (Hierarchical Navigable Small World):** the dominant ANN algorithm. Builds a multi-layer graph where long-range connections in upper layers enable fast navigation, and short-range connections in lower layers ensure accuracy. O(log n) search. Used by pgvector, Weaviate, Qdrant.

**IVF (Inverted File Index):** clusters vectors into Voronoi cells; searches only the nearest cells rather than all vectors. Less memory than HNSW; slightly lower recall. Used by Faiss, Pinecone.

**Hybrid search:** combine vector similarity (semantic) with keyword search (BM25) or metadata filtering. "Find vectors similar to the query that also have timestamp > yesterday." Most production RAG systems use hybrid search for better recall.

**Key insight:** pgvector with HNSW index handles semantic search for most production applications up to ~5M vectors. Beyond that, purpose-built vector databases (Qdrant, Weaviate) provide better performance and more operational tooling.`,
    },
    {
      id: 1032,
      name: "Database Proxy & Middleware",
      desc: `**Database proxy** — an intermediate layer between application and database that can add connection pooling, read/write splitting, query routing, caching, authentication, and observability without modifying the application or database.

**Key database proxies:**

**PgBouncer** — lightweight PostgreSQL connection pooler; transaction-mode pooling enables thousands of application connections sharing tens of database connections; the standard for PostgreSQL deployments.

**ProxySQL (MySQL)** — advanced MySQL proxy with query routing, read/write splitting (write to primary, read from replica), query caching, query rewriting, and traffic shaping based on query patterns. More feature-rich than MySQL Router.

**AWS RDS Proxy** — managed database proxy for RDS/Aurora; connection pooling + IAM authentication + SSL termination; integrates with Lambda functions (which otherwise create a new connection per invocation).

**Vitess (PlanetScale)** — horizontal scaling middleware for MySQL. Shards MySQL transparently at the proxy layer; used by YouTube, GitHub. Powers PlanetScale's serverless offering.

**pgBouncer alternatives for PostgreSQL:** Pgpool-II (connection pooling + HA + load balancing), Odyssey (Yandex, supports per-query load balancing), Supavisor (Supabase, Elixir-based, handles millions of connections for serverless workloads).

**Read/write splitting:** proxy detects "SELECT" vs write statements and routes reads to replicas automatically. Applications don't need to manage multiple connection strings.

**Key insight:** A database proxy is essential for serverless and microservice architectures — Lambda functions that each hold their own database connection can exhaust "max_connections" in seconds. RDS Proxy multiplexes thousands of Lambda invocations onto a small connection pool.`,
    },
    {
      id: 1033,
      name: "ClickHouse",
      desc: `**ClickHouse** — an open-source column-oriented database management system designed for online analytical processing (OLAP) with extreme performance. Sub-second queries on billions of rows; 100-1000x faster than row-oriented databases for analytics.

**Why ClickHouse is fast:**
- True columnar storage with per-column compression (LZ4 or ZSTD)
- Vectorized query execution: processes 8192 rows at a time using SIMD instructions
- Sparse primary index: stores only the first value of every 8192-row "granule" rather than an index entry per row — tiny index that fits in cache
- Append-only writes (MergeTree engine): parts are written atomically and merged in the background — no MVCC overhead
- Distributed execution: queries fan out to all shards simultaneously

**ClickHouse engines:**
- **MergeTree:** the foundational engine; append-only; sorted by primary key; background merge of parts
- **ReplacingMergeTree:** deduplicates rows with the same primary key (asynchronously); useful for CDC/upsert patterns
- **AggregatingMergeTree:** stores pre-aggregated states; incremental aggregation
- **CollapsingMergeTree / VersionedCollapsingMergeTree:** efficient updates via "sign" column

**Use cases:** user behavior analytics (clickstream), observability (logs, traces, metrics), real-time dashboards, time-series analytics, ad tech bidding analytics.

**ClickHouse Cloud:** Altinity, DoubleCloud, or the official ClickHouse Cloud managed service.

**Key insight:** ClickHouse's limitation is that it's optimized for append-heavy analytical workloads — complex UPDATE/DELETE operations are slow (requires ReplacingMergeTree + final reads). It's not a replacement for PostgreSQL; it's a complement for analytics.`,
    },
    {
      id: 1034,
      name: "TimescaleDB",
      desc: `**TimescaleDB** — a PostgreSQL extension that transforms PostgreSQL into a purpose-built time-series database, adding automatic time-based partitioning (hypertables), columnar compression for old data, and time-series-optimized query functions — all while retaining full SQL and PostgreSQL compatibility.

**Core concepts:**

**Hypertable:** "CREATE TABLE metrics (...) WITH (timescaledb.hypertable = true)." TimescaleDB automatically partitions by time into "chunks" (default 7 days). Query the hypertable like a regular table; TimescaleDB prunes irrelevant chunks automatically.

**Continuous aggregates:** materialized views that automatically refresh as new data arrives. "CREATE MATERIALIZED VIEW hourly_avg WITH (timescaledb.continuous) AS SELECT time_bucket('1 hour', time), device_id, AVG(temperature) FROM metrics GROUP BY 1, 2." Background refresh; query the view for fast pre-aggregated results.

**Compression:** "ALTER TABLE metrics SET (timescaledb.compress = true)." Old chunks are columnar-compressed asynchronously — 90-95% size reduction for typical time-series data. Queries decompress transparently.

**Data tiering:** automatically move old chunks to cheaper storage (S3 via Timescale's "tiered storage") while keeping them queryable.

**TimescaleDB vs InfluxDB:** TimescaleDB runs on PostgreSQL (full SQL, JOINs to relational tables, all PostgreSQL tooling); InfluxDB uses Flux (custom language) and is purpose-built (faster for pure TSDB workloads, less flexible for relational queries).

**Key insight:** TimescaleDB's "best of both worlds" story is genuine — you get time-series performance on top of the most mature open-source relational database, without abandoning SQL or your existing PostgreSQL tooling and expertise.`,
    },
    {
      id: 1035,
      name: "AI/ML Integration in Databases",
      desc: `**AI/ML in databases** — the trend of embedding machine learning capabilities directly into database engines, enabling ML inference, embedding generation, and similarity search through SQL queries without moving data to external ML systems.

**pgvector (PostgreSQL extension):**
- Add "vector(1536)" column type to any table
- "CREATE INDEX ON embeddings USING hnsw (embedding vector_cosine_ops)" for fast similarity search
- "SELECT * FROM documents ORDER BY embedding <=> query_embedding LIMIT 10" — cosine similarity search in pure SQL
- Foundation for in-database RAG pipelines

**BigQuery ML ("BQML"):**
- "CREATE MODEL project.dataset.my_model OPTIONS (model_type='linear_reg') AS SELECT ..." — train a model in SQL
- "ML.PREDICT(MODEL project.dataset.my_model, (SELECT ...))'" — run inference in SQL
- Supports linear regression, logistic regression, k-means, boosted trees, DNN, and importing TensorFlow/XGBoost models

**AWS Aurora Machine Learning:**
- Call Amazon SageMaker or Amazon Comprehend from SQL
- "SELECT aws_ml.invoke_endpoint(endpoint_name, input_json)" — ML inference in a SQL query

**DuckDB + Hugging Face:** community extensions enable running embedding models and LLM inference directly from DuckDB SQL queries.

**Operational considerations:**
- In-database ML is convenient but limited — training complex models still requires dedicated ML platforms
- Embedding computation at write time vs query time: storing pre-computed embeddings (at insert) is faster at query time; computing at query time is always fresh but slower
- Index maintenance: adding/updating rows requires updating the HNSW vector index

**Key insight:** pgvector + PostgreSQL is the "good enough" ML integration layer for 90% of applications needing semantic search or RAG. Move to a dedicated vector database only when your vector count exceeds ~5M or you need advanced features like multi-vector search.`,
    },
  ],
};

export default advancedEmerging;
