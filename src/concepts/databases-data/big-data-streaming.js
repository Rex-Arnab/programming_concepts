const bigDataStreaming = {
  name: "Big Data & Streaming",
  icon: "🌊",
  color: "#84cc16",
  concepts: [
    {
      id: 994,
      name: "Big Data (The 3 Vs)",
      desc: `**Big data** — datasets that are too large, too fast, or too varied for traditional relational databases to process within acceptable timeframes. Characterized by the "3 Vs" framework coined by Doug Laney in 2001.

**Volume:** data at a scale that requires distributed storage and processing (terabytes to petabytes). A single PostgreSQL instance can handle tens of TB; beyond that, distributed systems are needed.

**Velocity:** data arriving faster than traditional systems can ingest and process (millions of events per second from IoT sensors, clickstreams, transaction logs).

**Variety:** data in diverse formats — structured (relational tables), semi-structured (JSON, XML, logs), and unstructured (images, video, audio, free text). Traditional databases handle structured data; big data systems handle all three.

**Extended Vs:** practitioners have added Veracity (data quality and uncertainty), Value (extracting business value from raw data), and Variability (inconsistency in data format or meaning).

**Does every company have "big data"?** No. Most startups and SMBs have "medium data" — gigabytes to terabytes manageable by a well-tuned PostgreSQL + Snowflake stack. Hadoop-scale infrastructure is rarely needed below 100TB+ or millions of events/second.

**Key insight:** "Big data" became a buzzword leading many companies to adopt Hadoop/Spark for gigabytes of data. Always start with the simplest solution (good SQL + indexes) and add complexity only when you've measured the need.`,
    },
    {
      id: 995,
      name: "Apache Hadoop & HDFS",
      desc: `**Apache Hadoop** — the foundational open-source big data framework consisting of HDFS (storage) and MapReduce (processing), designed to run on commodity hardware at petabyte scale. Inspired by Google's GFS and MapReduce papers (2003-2004).

**HDFS (Hadoop Distributed File System):**
- Files are split into large blocks (default 128MB) and replicated 3x across DataNodes
- NameNode stores filesystem metadata (file-to-block mapping); DataNodes store actual blocks
- Design for sequential read of large files (not random access) — optimized for batch analytics
- Rack-aware replication: replicas placed on different racks to survive rack-level failures

**YARN (Yet Another Resource Negotiator):** the resource manager introduced in Hadoop 2. Applications (Spark, MapReduce, Flink) request containers from YARN; YARN allocates CPU/memory across the cluster.

**Hadoop's decline:** HDFS-centric architecture assumes data is local to compute. Cloud storage (S3, GCS) decouples storage from compute — you can spin compute up and down while storage persists. Spark on S3 with a cloud data warehouse (Snowflake, BigQuery) has replaced most Hadoop deployments.

**When Hadoop is still used:** organizations with decade-old on-premises Hadoop investments; workloads where data locality (compute near storage) provides network performance benefits.

**Key insight:** HDFS revolutionized big data storage from 2006-2016. Cloud object storage (S3) has largely replaced it for new architectures — it's cheaper, more durable, and doesn't require cluster management.`,
    },
    {
      id: 996,
      name: "MapReduce",
      desc: `**MapReduce** — Google's programming model (2004) for processing large datasets in parallel across a cluster. Two functions: **Map** (transform each input record into key-value pairs) and **Reduce** (aggregate all values for each key).

**How it works:**
1. **Split:** input data (HDFS files) divided into chunks
2. **Map:** each chunk processed by a mapper function; outputs (key, value) pairs
3. **Shuffle & Sort:** framework groups all values by key, sorts, and sends to reducers
4. **Reduce:** each reducer receives all values for a key and emits the final result

**Classic word count example:**
- Map: "Hello World" → {Hello: 1}, {World: 1}
- Shuffle: groups all "Hello" instances, all "World" instances across all mappers
- Reduce: {Hello: [1, 1, 1]} → {Hello: 3}

**MapReduce limitations:** every step reads from and writes to HDFS disk (fault tolerance through persistence). Iterative algorithms (ML training requiring 100 passes over data) generate 100x the expected I/O. This was Spark's founding problem to solve.

**MapReduce's legacy:** the paradigm — parallelize work via map, aggregate via reduce — influenced modern big data systems (Hive compiles SQL to MapReduce, Spark's RDD API mirrors it). The specific implementation is now largely obsolete.

**Key insight:** MapReduce's disk-persistence model was a deliberate trade-off: fault tolerance over performance. Spark's in-memory model sacrifices some fault tolerance for 10-100x speed improvement on iterative workloads.`,
    },
    {
      id: 997,
      name: "Apache Spark",
      desc: `**Apache Spark** — the dominant open-source distributed data processing framework, providing in-memory computation across a cluster for batch, streaming, SQL, ML, and graph processing through a unified API (Scala, Python, Java, R).

**Core abstraction — RDD (Resilient Distributed Dataset):** an immutable, distributed collection of objects. Operations on RDDs are lazily evaluated — transformations build a DAG; actions trigger execution. Lineage (the transformation chain) enables recomputation on failure without full replication.

**DataFrames and Spark SQL:** higher-level abstraction over RDDs; columnar in-memory format (Apache Arrow); SQL queries via "spark.sql(...)." Catalyst optimizer generates optimized physical plans. Almost always prefer DataFrames over RDDs.

**Spark architecture:**
- **Driver program:** your code; defines the DAG and coordinates execution
- **Cluster manager:** allocates resources (YARN, Kubernetes, Spark Standalone, Mesos)
- **Executors:** worker processes on each node; run tasks and cache data

**Spark ecosystem:**
- **Spark Streaming / Structured Streaming:** micro-batch and continuous stream processing
- **MLlib:** distributed ML algorithms (classification, clustering, ALS recommender)
- **GraphX:** graph computation
- **Delta Lake:** ACID transactions on Spark data lakes

**When to use Spark:** ETL of hundreds of GB to petabytes, ML feature engineering at scale, batch aggregations over large datasets. Not needed for data that fits in a single machine's memory.

**Key insight:** Spark's catalyst optimizer and tungsten execution engine have made it competitive with purpose-built SQL engines like Presto for many workloads. PySpark is the lingua franca of big data engineering.`,
    },
    {
      id: 998,
      name: "Apache Kafka",
      desc: `**Apache Kafka** — a distributed event streaming platform designed for high-throughput, fault-tolerant, ordered, replayable message storage and delivery. Originally built at LinkedIn to handle billions of events per day.

**Core concepts:**
- **Topic:** a named, ordered, immutable log of events. Producers write to topics; consumers read from topics
- **Partition:** a topic is divided into partitions, each an ordered log on a different broker. Enables parallel consumption and horizontal scaling
- **Offset:** each message in a partition has a sequential integer offset. Consumers track their offset — "I've processed up to offset 1234"
- **Consumer group:** multiple consumers sharing a topic's load; each partition assigned to exactly one consumer in a group
- **Retention:** messages are retained for a configurable period (7 days default) or size. Unlike traditional MQs, Kafka doesn't delete on consumption — consumers can replay from any offset

**Why Kafka vs traditional message queues (RabbitMQ, SQS):**
- Kafka is a log, not a queue — messages persist after consumption; multiple consumers can independently read the same topic
- Replay: re-process historical events from any point in time
- High throughput: millions of messages/second on commodity hardware

**Kafka Connect:** pre-built connectors for ingesting from databases (JDBC, Debezium), cloud storage (S3, GCS), and exporting to data stores.

**Kafka Streams:** a lightweight library for building stateful stream processing applications directly on Kafka — no external cluster required.

**Key insight:** Kafka's offset-based consumption makes it the backbone of event-driven architectures — producers and consumers are decoupled in time; failures don't lose messages; multiple consumers process the same stream independently.`,
    },
    {
      id: 999,
      name: "Apache Flink",
      desc: `**Apache Flink** — a distributed stream processing framework designed for true streaming (event-at-a-time) with exactly-once semantics, low latency, and stateful computations. While Spark Structured Streaming is micro-batch (10s of milliseconds), Flink is truly event-driven.

**Core concepts:**
- **DataStream API:** process unbounded streams of events
- **DataSet API (deprecated):** batch processing; superseded by Flink's unified batch+stream model
- **Event time vs processing time:** Flink can process events based on when they occurred (event time) rather than when they arrived (processing time) — critical for out-of-order events
- **Watermarks:** progress markers in the stream indicating "all events before timestamp T have arrived" — enables correct window computation despite late-arriving data
- **Stateful operators:** Flink checkpoints state to durable storage (HDFS, S3, RocksDB) for exactly-once fault recovery

**Windowing:** time-based grouping for aggregations on infinite streams:
- **Tumbling window:** fixed non-overlapping intervals (every 1 minute)
- **Sliding window:** fixed intervals with overlap (5-minute window every 1 minute)
- **Session window:** group events separated by an inactivity gap

**Flink vs Kafka Streams:** Kafka Streams runs within your application (no separate cluster); Flink runs as a separate cluster with more powerful stateful processing and better fault tolerance for complex pipelines.

**Key insight:** Flink's event-time processing with watermarks is the correct solution for out-of-order data streams (mobile events arriving late due to offline periods). Spark's micro-batch can approximate it, but Flink's model is fundamentally more precise.`,
    },
    {
      id: 1000,
      name: "Lambda Architecture",
      desc: `**Lambda Architecture** — a data processing architecture (Nathan Marz, 2012) that runs two parallel systems to handle both real-time and historical data: a **batch layer** (Hadoop/Spark, recomputes all historical data on a schedule) and a **speed layer** (Kafka/Storm/Flink, processes recent data in real-time). A **serving layer** merges results from both.

**Why two layers:** batch processing produces accurate results but has high latency (hours). Stream processing has low latency but may produce approximate results (missing late-arriving data). Lambda serves both: look up the batch view for historical accuracy, merge with the speed view for recency.

**Components:**
- **Batch layer:** processes all data (past + present); outputs immutable batch views; recalculates periodically
- **Speed layer:** processes only recent data (since last batch run); outputs real-time views; expires once batch catches up
- **Serving layer:** indexes batch views + speed views; merges for a complete answer

**Problems with Lambda:**
- Code duplication: the same business logic implemented twice (batch + stream)
- Operational complexity: two separate processing systems to maintain, monitor, and debug
- Merging batch and speed views introduces complexity in the serving layer

**Lambda has been largely superseded by Kappa Architecture** — just use a capable stream processor (Flink, Spark Structured Streaming) for both real-time and historical (replay the stream from Kafka for batch reprocessing).

**Key insight:** Lambda Architecture was the right answer circa 2012 when stream processors couldn't handle complex historical reprocessing. Kappa is now the preferred approach for new architectures.`,
    },
    {
      id: 1001,
      name: "Kappa Architecture",
      desc: `**Kappa Architecture** — a simplification of Lambda Architecture proposed by LinkedIn's Jay Kreps in 2014. Replace the batch layer entirely by using a replayable stream as the single source of truth. Run stream processing for both real-time and historical (batch) by replaying the stream from the beginning.

**Core idea:** store all data in an immutable, replayable event log (Kafka). For real-time: consume from the tail of the log. For historical reprocessing: replay the log from offset 0. One system; one codebase.

**Kappa requirements:**
- The stream (Kafka) must retain all historical data (set long retention, or use Kafka's log compaction or S3-backed tiered storage)
- The stream processor must be able to replay at high speed (Flink, Spark Structured Streaming)
- Version management: to deploy new logic, spin up a new stream processor reading from the beginning in parallel; swap to it when caught up

**When Kappa is the right choice:**
- New architectures where the streaming stack is mature
- Domains where event-time processing is natural (IoT, user events)
- Teams that want to avoid the operational complexity of two systems

**When Lambda still applies:**
- Legacy systems where a batch layer (Hadoop/Spark) already exists
- Workloads requiring full historical recomputation from raw SQL-queryable data (not all data flows through Kafka)

**Key insight:** Kappa's elegance is "there is only one kind of data processing — streaming." The tradeoff is that Kafka must be sized to retain all historical data, which can be expensive.`,
    },
    {
      id: 1002,
      name: "Delta Lake / Apache Iceberg",
      desc: `**Delta Lake** — an open-source storage framework by Databricks that adds ACID transactions, schema enforcement, and time travel to data lakes (Parquet files on cloud storage). A "transaction log" directory records every change as an atomic JSON entry, enabling snapshot isolation and auditing.

**Delta Lake features:**
- **ACID transactions:** concurrent writers use optimistic concurrency control; readers always see a consistent snapshot
- **Schema enforcement:** rejects writes that don't match the table schema
- **Schema evolution:** "ALTER TABLE ... ADD COLUMN" evolves the schema safely
- **Time Travel:** "SELECT * FROM delta."s3://bucket/table" VERSION AS OF 5" or "TIMESTAMP AS OF '2024-01-01'"
- **MERGE INTO (upsert):** update matching rows, insert non-matching — CDC/SCD Type 2 made easy
- **Z-ordering:** multi-dimensional clustering that co-locates related data for faster filtered queries

**Apache Iceberg:**
- Alternative open table format with richer metadata (partition spec, sort order, schema evolution) and better multi-engine support
- Adopted by Snowflake, BigQuery, Trino, Spark, Flink
- Hidden partitioning: Iceberg tracks partition metadata separately from data files — partition scheme can change without rewriting data
- Row-level deletes without rewriting entire files (position deletes and equality deletes)

**Delta vs Iceberg:** Iceberg has better partition evolution and multi-engine support; Delta Lake has a larger Databricks ecosystem and better Spark integration.

**Key insight:** Delta Lake and Iceberg solve the same fundamental problem — bringing database reliability to data lakes. The format you choose largely depends on your cloud ecosystem (Databricks → Delta Lake; everyone else → Iceberg).`,
    },
    {
      id: 1003,
      name: "Stream Processing Concepts",
      desc: `**Event time vs processing time:** "event time" is when the event actually occurred (the timestamp in the payload); "processing time" is when the event was processed by the system. Mobile events can arrive minutes or hours late (device offline). Correct analytics use event time with late-arrival handling.

**Watermarks:** a mechanism to handle late-arriving events. A watermark "W(t)" signals "all events with event time <= t have now arrived." Events arriving after the watermark is past their window are considered "late" and can be dropped or handled specially.

**Windowing strategies:**
- **Tumbling window:** fixed non-overlapping intervals (sales totals per hour)
- **Sliding window:** fixed size, advances by a step (5-min window every 1 min — 80% overlap)
- **Session window:** dynamic window closed after N seconds of inactivity (user session grouping)
- **Global window:** aggregate all events (no time bound; triggered by count or custom condition)

**State management:** many streaming operations are stateful (counts, aggregations, joins). State must survive worker failures. Flink checkpoints to S3; Kafka Streams uses RocksDB local state + Kafka changelog topic for durability.

**Exactly-once semantics:** the holy grail of stream processing. Kafka's transactional producer + Flink's checkpointing achieve exactly-once end-to-end. Kafka Streams guarantees exactly-once within the Kafka ecosystem.

**Key insight:** "At least once" + idempotent consumer is often the pragmatic choice over "exactly once" — exactly-once adds latency overhead and the complexity is only justified for financial and counting applications where duplicates have real costs.`,
    },
    {
      id: 1004,
      name: "Data Lake Architecture",
      desc: `**Data lake** — a centralized repository storing raw data at any scale in its native format (structured, semi-structured, unstructured) in cheap cloud object storage (S3, GCS, Azure Data Lake Storage). Unlike a data warehouse, a data lake accepts data first and defines structure on read.

**Schema-on-read vs schema-on-write:** data warehouses enforce schema on write (data must conform before loading). Data lakes store raw data and apply schema on read (Hive/Athena/Spark define schema at query time). Flexible — different consumers can interpret the same raw data differently.

**Data lake zones:**
- **Raw / Bronze:** exact copy of source data; never modified; immutable; preserve original format
- **Cleaned / Silver:** standardized formats, deduplication, basic validation; ready for analysis
- **Curated / Gold:** aggregated, business-logic-applied, ready for consumption by BI and ML

**Data lake problems ("data swamp"):**
- Without governance, data lakes become disorganized dumps of untrustworthy, undocumented data
- No ACID transactions (solved by Delta Lake/Iceberg)
- Difficult to update or delete specific records (solved by Delta Lake/Iceberg)
- Metadata and discoverability challenges (solved by data catalog)

**Data lake vs data warehouse vs data lakehouse:**
- Data lake: raw, cheap, flexible, unstructured — low cost, high governance effort
- Data warehouse: clean, expensive, structured — fast queries, higher cost
- Data lakehouse: open formats + ACID transactions on object storage — best of both

**Key insight:** Every data lake needs a governance strategy from day one. Without metadata management, lineage tracking, and data quality enforcement, the lake becomes a swamp within 12 months.`,
    },
    {
      id: 1005,
      name: "Apache Hive",
      desc: `**Apache Hive** — a data warehouse infrastructure built on top of Hadoop that provides SQL-like querying (HiveQL) of data stored in HDFS or object storage. Hive compiles SQL queries into MapReduce, Tez, or Spark jobs.

**Core concept — Hive Metastore:** the catalog service that maps table names to HDFS/S3 paths and schema definitions. Other tools (Spark, Presto, Trino, Athena) query the Hive Metastore to discover table locations and schemas — it's the de facto metadata standard for data lakes.

**HiveQL:** SQL-like syntax for querying data in flat files. Supports DDL ("CREATE TABLE"), DML ("INSERT INTO"), JOINs, GROUP BY, subqueries, and UDFs (User Defined Functions in Java/Python).

**Performance evolution:**
- **Hive on MapReduce:** original; extremely slow (minutes per query); high latency due to disk I/O per stage
- **Hive on Tez:** Hive 0.13+; Tez's DAG execution avoids intermediate HDFS writes; 5-100x faster
- **Hive LLAP (Live Long and Process):** in-memory caching daemon; sub-second queries for warm data; introduced Hive 2.0

**Hive's role today:** the query engine is largely superseded by Trino/Presto and Spark SQL for performance. However, the **Hive Metastore** remains critically important — it's the table catalog for almost all data lake tools. Even Snowflake and BigQuery can query an "external Hive table" by reading the metastore.

**Key insight:** You may never write a HiveQL query, but you'll rely on the Hive Metastore every day as a data engineer — it's the invisible backbone of data lake discoverability.`,
    },
  ],
};

export default bigDataStreaming;
