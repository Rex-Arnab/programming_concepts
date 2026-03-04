const dataWarehousing = {
  name: "Data Warehousing & OLAP",
  icon: "🏛️",
  color: "#06b6d4",
  concepts: [
    {
      id: 984,
      name: "OLAP vs OLTP",
      desc: `**OLTP (Online Transactional Processing)** — databases optimized for high-volume, short-duration, concurrent read/write transactions representing business operations: "insert an order," "update a user's address," "fetch account balance." Row-oriented, highly normalized, ACID-compliant.

**OLAP (Online Analytical Processing)** — databases (data warehouses) optimized for complex analytical queries over large historical datasets: "total revenue by product category per quarter over 3 years." Column-oriented, denormalized (star/snowflake schema), batch-updated.

**Key differences:**

| Aspect | OLTP | OLAP |
|---|---|---|
| Query type | Simple CRUD | Complex aggregations |
| Data volume per query | Rows | Millions-billions of rows |
| Write frequency | Continuous (real-time) | Batch (hourly/daily) |
| Schema | Normalized (3NF) | Denormalized (star schema) |
| Optimization | Row storage | Columnar storage |
| Users | Application servers | Analysts, BI tools |
| Examples | PostgreSQL, MySQL | Snowflake, BigQuery |

**Why separate systems:** running heavy analytical scans on an OLTP database competes with transactional latency (an analyst's "SELECT COUNT(*)" scans every row and locks buffers). Separation protects operational performance.

**Key insight:** The OLTP/OLAP split is one of the oldest architectural patterns in data systems. HTAP (e.g., TiDB/TiFlash) is the emerging challenge to this split, but for most organizations, separate systems remain the right answer.`,
    },
    {
      id: 985,
      name: "Data Warehouse Architecture (Kimball vs Inmon)",
      desc: `**Kimball methodology (bottom-up)** — Ralph Kimball's approach to data warehousing: build dimensional models (star schemas) for individual business processes first, then integrate them into a "data warehouse bus" using conformed dimensions. Fast time-to-value; start with one business process (sales), add others incrementally.

**Inmon methodology (top-down)** — Bill Inmon's approach: first design a normalized enterprise data warehouse (EDW) capturing all enterprise data in 3NF, then build departmental data marts (aggregated, denormalized) on top. More upfront design; longer to implement; theoretically more consistent.

**Modern data warehouse layers (regardless of methodology):**
1. **Raw / Landing zone:** exact copy of source data; never modified; the "source of truth" for re-transformation
2. **Staging:** cleaned, typed, deduplicated; no business logic applied
3. **Core / Integration:** conformed dimensions and facts; business logic applied
4. **Presentation / Data marts:** aggregated, business-friendly datasets for specific teams or tools

**Modern tooling:** Snowflake, BigQuery, Redshift, Databricks. dbt implements the transformation layers with version control and testing.

**The shift:** modern data warehouses separate storage and compute (cloud-native), use ELT instead of ETL, and use dbt for transformation. Kimball's dimensional modeling principles remain dominant for the "gold layer."

**Key insight:** Kimball vs Inmon is less relevant today — the "modern data stack" (ELT + cloud DW + dbt) has absorbed the best of both. What matters is having clear, documented layers with ownership and quality guarantees.`,
    },
    {
      id: 986,
      name: "Snowflake (Data Warehouse)",
      desc: `**Snowflake** — a cloud-native data warehouse built on a unique multi-cluster shared data architecture that separates storage, compute, and services, making it infinitely scalable and enabling multiple independent workloads to run simultaneously without competition.

**Architecture:**
- **Storage layer:** data stored as compressed columnar files in cloud object storage (S3/GCS/Azure Blob). Unlimited, cheap, durable
- **Compute layer (Virtual Warehouses):** clusters of compute nodes (T-shirt sizes: XS to 6XL) that process queries. Spin up/down in seconds; you pay only while running
- **Cloud services layer:** query optimization, metadata, authentication — the "brain"

**Key differentiators:**
- **Zero-copy cloning:** instantly clone a database/table/schema without copying data — perfect for dev/test environments and CI/CD
- **Time Travel:** query data as it existed up to 90 days ago ("SELECT * FROM orders AT (TIMESTAMP => '2024-01-01')")
- **Data sharing:** share live data with other Snowflake accounts without copying it (Snowflake Marketplace)
- **Separate workload isolation:** marketing runs on one virtual warehouse; data science on another; no resource contention

**Snowflake vs BigQuery:** Snowflake uses a per-second virtual warehouse pricing model; BigQuery uses per-query pricing (pay for bytes scanned). Snowflake has richer ecosystem integrations; BigQuery has deeper GCP integration.

**Key insight:** Snowflake's zero-copy cloning revolutionized data engineering workflows — a full production clone for testing costs pennies and takes seconds.`,
    },
    {
      id: 987,
      name: "Google BigQuery",
      desc: `**BigQuery** — Google's fully managed, serverless data warehouse. No infrastructure to manage; queries automatically scale across thousands of slots (units of compute). Pay-per-query (per TB scanned) with no upfront provisioning.

**Architecture:**
- **Dremel engine:** massively parallel query execution across thousands of workers; petabyte-scale queries in seconds
- **Capacitor columnar format:** proprietary columnar storage with Dremel-inspired nesting for STRUCT/ARRAY types
- **Colossus storage:** Google's distributed file system; separated from compute
- **Slots:** units of BigQuery compute; automatic in on-demand mode; reserved slots for flat-rate pricing

**Key features:**
- **Nested/repeated fields:** STRUCT and ARRAY types natively supported — no normalization needed for JSON-like data
- **BigQuery ML:** run ML model training and inference directly in SQL ("CREATE MODEL...")
- **BigQuery Omni:** query data in AWS S3 or Azure Blob without moving it to GCP
- **Streaming inserts:** "insertAll" API appends rows with seconds latency; good for real-time data
- **BI Engine:** in-memory analysis layer for sub-second dashboard queries

**Cost optimization:** partition by date + cluster by common filter columns; "LIMIT" doesn't reduce bytes scanned (use "SELECT col" not "SELECT *"); use partition pruning.

**Key insight:** BigQuery's serverless model means no virtual warehouse management — pay for what you use. The cost gotcha: a poorly-written query scanning 10TB at $5/TB costs $50 in a single run.`,
    },
    {
      id: 988,
      name: "Columnar Storage",
      desc: `**Columnar storage** — a physical data layout where values from the same column are stored contiguously on disk, rather than values from the same row. This fundamentally changes I/O characteristics for analytical queries.

**Row-oriented storage (OLTP):** all values for one row are stored together. Fast for retrieving a complete row ("SELECT * FROM users WHERE id = 42"). Slow for scanning a column across all rows.

**Columnar storage (OLAP):** all values for "revenue" are stored together, all values for "region" are stored together, etc. An aggregation "SELECT region, SUM(revenue) FROM sales" reads only the "region" and "revenue" columns — skips all other columns entirely.

**Columnar advantages for analytics:**
- **I/O reduction:** read only queried columns (a 100-column table where a query uses 3 columns = 97% I/O savings)
- **Compression:** a single column contains similar values — "revenue" is all floats, "country" is a small set of strings. Columnar data compresses 5-30x better than row data (dictionary encoding, run-length encoding, delta encoding)
- **SIMD vectorization:** CPUs can apply the same operation (SUM, comparison) to a batch of same-type values simultaneously

**Formats:** Parquet and ORC are the open columnar file formats used in data lakes. Snowflake, BigQuery, Redshift use proprietary columnar formats internally.

**Key insight:** Columnar storage is why BigQuery can scan 1TB of data in 5 seconds. The same query on a row-oriented database would read 100x more data from disk.`,
    },
    {
      id: 989,
      name: "Data Lakehouse (Delta Lake & Apache Iceberg)",
      desc: `**Data lakehouse** — an architectural pattern that combines the cheap, scalable storage of a data lake (files on S3/GCS) with the ACID transactions, schema enforcement, and performance of a data warehouse. Coined by Databricks; the reference implementations are Delta Lake and Apache Iceberg.

**The problem with "pure" data lakes:** raw Parquet files on S3 have no ACID guarantees, no schema enforcement, no support for "UPDATE" or "DELETE," and no time travel. Concurrent writes can corrupt data; there's no "as-of" query capability.

**Delta Lake (Databricks):** adds a transaction log ("_delta_log" directory) over Parquet files. Every insert/update/delete is an atomic commit recorded in JSON log files. Supports ACID transactions, schema enforcement, time travel ("VERSION AS OF 10"), and upserts ("MERGE INTO").

**Apache Iceberg (Netflix/Apple, now Apache):** open table format with richer metadata (manifest files, partition spec evolution, hidden partitioning). Supported by Spark, Flink, Trino, Hive, Snowflake, BigQuery. Better partition evolution than Delta Lake.

**Apache Hudi (Uber):** another open lakehouse format focused on record-level updates and CDC on data lakes.

**Lakehouse vs warehouse:** lakehouses store data in open formats (Parquet) on object storage — no vendor lock-in, multiple engines can read the same data. Warehouses use proprietary formats but offer simpler management.

**Key insight:** Delta Lake and Iceberg resolve the "data lake swamp" problem — they bring database-grade reliability to cheap cloud storage, making the data lake a first-class analytical store.`,
    },
    {
      id: 990,
      name: "OLAP Cubes & Aggregations",
      desc: `**OLAP cube** — a multi-dimensional data structure pre-computing aggregations along every combination of dimensions, enabling instant drill-down and slice-and-dice analysis without re-scanning fact tables. Think of a 3D spreadsheet with axes: time, product, region.

**Operations on OLAP cubes:**
- **Slice:** filter one dimension to a single value (show only 2024 data)
- **Dice:** filter multiple dimensions (2024, Europe, Electronics)
- **Roll-up (aggregate):** aggregate to a higher level (daily → monthly → quarterly)
- **Drill-down:** disaggregate to a lower level (quarterly → monthly → daily)
- **Pivot:** rotate axes to see data from a different perspective

**Traditional MOLAP vs ROLAP:**
- **MOLAP (Multidimensional OLAP):** pre-computed cube stored in a proprietary format (Cognos TM1, Oracle Essbase). Lightning-fast queries; expensive storage; must rebuild on data changes
- **ROLAP (Relational OLAP):** generates SQL against a relational star schema on-the-fly. Flexible, no pre-computation, but slower for complex cross-dimensional queries

**Modern approach:** columnar data warehouses (BigQuery, Snowflake, Redshift) are so fast that MOLAP-style pre-aggregation is less necessary. Materialized views provide targeted pre-aggregation where needed.

**Key insight:** OLAP cubes as a standalone product are declining — modern columnar warehouses have made brute-force SQL aggregation fast enough for most use cases, reducing the need for pre-computed multidimensional structures.`,
    },
    {
      id: 991,
      name: "Amazon Redshift",
      desc: `**Amazon Redshift** — Amazon's fully managed, cloud-native columnar data warehouse optimized for OLAP workloads. Built on a massively parallel processing (MPP) architecture with nodes distributing data and query execution across the cluster.

**Architecture:**
- **Leader node:** receives queries, generates execution plans, coordinates workers
- **Compute nodes:** store data slices and execute query portions in parallel
- **Dense storage (DS2) vs Dense compute (DC2):** DS2 for large data volumes (HDD); DC2 for performance-sensitive workloads (SSD)
- **RA3 nodes:** separate storage (S3-based "Managed Storage") from compute; scale independently

**Key features:**
- **Distribution styles:** "EVEN" (round-robin), "KEY" (co-locate rows with the same key on the same node — avoids data movement for joins), "ALL" (replicate small dimension tables to every node)
- **Sort keys:** physical ordering of data on disk by a column — dramatically improves range scan performance on sorted columns
- **Concurrency scaling:** automatically adds temporary cluster capacity for query bursts
- **Redshift Spectrum:** query S3 data directly without loading into Redshift
- **AQUA (Advanced Query Accelerator):** hardware-accelerated cache for frequently accessed data

**Redshift vs BigQuery vs Snowflake:** Redshift offers tight AWS integration and is cost-effective for consistent high-volume workloads. BigQuery excels at serverless scalability. Snowflake wins on multi-cloud and sharing.

**Key insight:** Redshift distribution key selection is the most impactful performance tuning lever — a poorly chosen distribution key means every join requires shuffling data across all nodes (expensive broadcast or hash redistribution).`,
    },
    {
      id: 992,
      name: "Data Marts",
      desc: `**Data mart** — a focused, subject-specific subset of a data warehouse, containing pre-filtered, pre-aggregated data tailored for a specific business team or function: a sales data mart, a marketing data mart, a finance data mart.

**Why data marts exist:**
- **Performance:** analysts query a smaller, pre-aggregated dataset rather than the full warehouse
- **Simplicity:** business analysts don't need to understand the full enterprise schema; they use a familiar, domain-specific model
- **Security:** restrict access to data relevant to each team without complex row/column security on the central warehouse
- **Independence:** each team can optimize their mart for their specific access patterns

**Data mart types:**
- **Dependent data mart:** derived from the central enterprise data warehouse (conforms to conformed dimensions)
- **Independent data mart:** built directly from source systems, bypassing a central warehouse (creates data silos and inconsistency — anti-pattern)
- **Logical data mart:** a view layer on top of the central warehouse rather than a physical copy

**Data marts in the modern stack:** often implemented as a "gold layer" of dbt models — the final, business-facing transformations are the data mart. Physical materialization (separate database or schema) vs logical (views) depends on query performance needs.

**Key insight:** Avoid independent data marts that pull directly from source systems — they create "shadow IT" data islands with inconsistent definitions. All marts should derive from a shared, conformed core.`,
    },
    {
      id: 993,
      name: "MPP (Massively Parallel Processing)",
      desc: `**Massively Parallel Processing (MPP)** — an architecture where a query is broken into parallel tasks executed simultaneously across many nodes or processors, each processing a partition of the data. The final result is assembled from all partial results.

**How MPP works in data warehouses:**
1. Optimizer generates a parallel execution plan
2. Each node receives a portion of the data ("slice") and processes its local data independently
3. For joins, data may need to be "shuffled" across nodes (redistributed by join key)
4. Results are aggregated at the leader/coordinator node

**MPP vs SMP (Symmetric Multiprocessing):** SMP uses multiple CPUs sharing one memory pool (single powerful server). MPP uses many nodes each with their own memory and storage — scales to petabytes where SMP can't.

**MPP databases:** Redshift, Greenplum, Teradata, Snowflake (virtual warehouse = multiple compute nodes), Vertica, ClickHouse.

**Data distribution challenges in MPP:**
- **Data skew:** one node has significantly more data than others — it becomes the bottleneck
- **Broadcast join:** a small dimension table is replicated to every node to avoid reshuffling the large fact table
- **Shuffle join:** both tables are redistributed by join key; most expensive operation in MPP

**ClickHouse MPP:** uses a shared-nothing architecture with per-shard Zookeeper coordination; excellent for time-series analytics with sub-second query latency on billions of rows.

**Key insight:** MPP's performance ceiling is determined by the node with the most data (data skew) and the slowest shuffle operation (distributed join). Distribution key selection is the primary MPP performance tuning lever.`,
    },
  ],
};

export default dataWarehousing;
