const queryPerformance = {
  name: "Query Performance & Optimization",
  icon: "⚡",
  color: "#f59e0b",
  concepts: [
    {
      id: 962,
      name: "Index Types (B-Tree, Hash, GIN, GiST, BRIN)",
      desc: `**B-Tree index** — the default and most versatile index type. Stores keys in a balanced tree supporting equality, range queries, sorting, and prefix matching. O(log n) lookup. Works for any orderable data type.

**Hash index** — maps keys to buckets via a hash function. O(1) equality lookup but cannot do range queries or sorting. Useful for equality-heavy workloads (session_id lookups). In PostgreSQL, hash indexes are now WAL-logged (crash-safe since PG 10).

**GIN (Generalized Inverted Index)** — indexes composite values where the items inside the value are what you're searching for. Perfect for:
- Full-text search ("tsvector" columns)
- JSONB containment queries ("data @> '{...}'")
- Array membership ("tags @> ARRAY['sql']")

**GiST (Generalized Search Tree)** — a balanced tree for complex data types: geometry (PostGIS), text similarity, range types. Slower than B-Tree for simple equality but enables queries that B-Tree can't express.

**BRIN (Block Range Index)** — stores min/max values for each block range of a table. Tiny footprint (kilobytes vs gigabytes for B-Tree). Effective only when data has natural correlation with physical storage order (e.g., "created_at" on an append-only events table).

**Key insight:** Index type selection matters — using B-Tree on a JSONB column you query with "@>" wastes the index. Use GIN for JSONB containment and full-text search, BRIN for time-series data, B-Tree for everything else.`,
    },
    {
      id: 963,
      name: "Query Execution Plans (EXPLAIN ANALYZE)",
      desc: `**Query execution plan** — the step-by-step strategy the database query planner selects to execute a query: which indexes to use, which join algorithm to apply, in what order to process tables.

**PostgreSQL EXPLAIN ANALYZE:**
- "EXPLAIN" shows the estimated plan without executing
- "EXPLAIN ANALYZE" executes the query and shows actual vs estimated row counts and timing
- "EXPLAIN (ANALYZE, BUFFERS)" also shows I/O cache hit/miss counts

**Key plan node types:**
- "Seq Scan" — full table scan (no index used); check "rows" estimate — if millions, you need an index
- "Index Scan" — uses an index to find rows, then fetches full rows from the heap
- "Index Only Scan" — satisfies the query from the index alone (covering index); fastest
- "Bitmap Heap Scan" — collects multiple index entries, then fetches heap pages; good for range queries
- "Hash Join" — builds a hash table from the smaller relation, probes with the larger; O(n)
- "Nested Loop" — for each outer row, loops through inner; good with indexes, bad without
- "Merge Join" — both relations sorted; efficient for large sorted inputs

**Reading the plan:** look for "rows estimated vs actual" — large discrepancies indicate stale statistics ("ANALYZE" updates them). Look for "Seq Scan" on large tables as a signal to add an index.

**Key insight:** "EXPLAIN ANALYZE" is the most important debugging tool for slow queries. Never optimize a query by guessing — read the plan first.`,
    },
    {
      id: 964,
      name: "The N+1 Query Problem",
      desc: `**N+1 problem** — a performance anti-pattern where fetching N parent records triggers N additional queries to fetch related data, resulting in N+1 total queries instead of 1-2. The canonical ORM trap: "for each post, load its comments."

**Example:** fetching 100 blog posts, then for each post loading its author = 101 queries. With eager loading, this is 2 queries: "SELECT * FROM posts" and "SELECT * FROM users WHERE id IN (1, 2, ...)."

**Why ORMs cause this:** lazy loading is convenient (access "post.author" and the ORM fetches it on demand) but disastrous in loops.

**Solutions:**
- **Eager loading / JOIN:** "SELECT posts.*, users.* FROM posts JOIN users ON posts.user_id = users.id" — one query
- **Batch loading (DataLoader pattern):** collect all needed IDs, fetch them in one query. Used in GraphQL (Facebook's DataLoader)
- **Preload / include in ORMs:** Rails "Post.includes(:author)," Django "select_related()," Hibernate "JOIN FETCH"

**Detection:**
- ORM query logs: look for repetitive queries differing only by ID
- Tools: Bullet gem (Rails), Django Debug Toolbar, Hibernate statistics
- APM tools (Datadog, New Relic) show query count per request

**Key insight:** N+1 is the most common database performance issue in applications using ORMs. Monitoring query count (not just query duration) in development catches it early.`,
    },
    {
      id: 965,
      name: "Database Partitioning",
      desc: `**Table partitioning** — dividing a large table into smaller physical sub-tables (partitions) based on a column value, while exposing them as a single logical table. The query planner prunes irrelevant partitions ("partition pruning"), scanning only the relevant subset.

**Partitioning strategies:**
- **Range partitioning:** rows go to partitions based on value ranges — "created_at BETWEEN '2024-01-01' AND '2024-12-31'." Ideal for time-series tables; archive/drop old partitions without slow DELETE
- **List partitioning:** partition by a specific list of values — "country IN ('US', 'CA')" on one partition, "country IN ('DE', 'FR')" on another
- **Hash partitioning:** route rows by "hash(column) % num_partitions." Evenly distributes data; less useful for range queries

**When partitioning helps:**
- Tables with billions of rows where only recent data is queried (archive old partitions to cold storage)
- Dropping old data: "DROP TABLE orders_2020" is instant vs "DELETE FROM orders WHERE year = 2020" (scans and logs every row)
- Parallel query: each partition can be scanned by a separate worker

**PostgreSQL declarative partitioning (v10+):**
"CREATE TABLE events (id bigint, ts timestamptz) PARTITION BY RANGE (ts);"

**Key insight:** Partitioning is most powerful for time-series and audit log tables where you regularly drop old data. The instant "DROP PARTITION" replaces painful bulk DELETEs.`,
    },
    {
      id: 966,
      name: "Connection Pooling (PgBouncer)",
      desc: `**Connection pooling** — maintaining a pool of pre-established database connections that application instances share, rather than opening a new connection per request. PostgreSQL connections are expensive: each connection is a separate OS process (~5-10MB RAM), and connection establishment takes ~50ms.

**The problem without pooling:** a Node.js app with 10 pods, each needing 50 concurrent DB connections = 500 PostgreSQL connections. At 10MB each = 5GB RAM on the database server just for connections, plus high memory pressure on the OS.

**PgBouncer** — the standard PostgreSQL connection pooler:
- Sits between application and PostgreSQL
- Applications maintain connections to PgBouncer (cheap); PgBouncer maintains a smaller pool to PostgreSQL (expensive)
- **Session mode:** client gets a server connection for its entire session. Compatible with all PostgreSQL features
- **Transaction mode:** client holds a server connection only for the duration of a transaction. Multiplexes aggressively but breaks prepared statements and LISTEN/NOTIFY
- **Statement mode:** hold connection only for one statement. Rarely used

**Alternatives:** pgpool-II (more features, more complexity), connection pooling built into ORMs (Sequelize, ActiveRecord), AWS RDS Proxy.

**Key insight:** PgBouncer in transaction mode is essential for PostgreSQL applications with many concurrent lightweight connections (web APIs, microservices). It allows thousands of application connections to multiplex onto tens of database connections.`,
    },
    {
      id: 967,
      name: "Read Replicas",
      desc: `**Read replica** — a copy of the primary database that receives changes via replication (PostgreSQL streaming replication, MySQL binlog) and can serve read queries, offloading the primary for write operations.

**How streaming replication works (PostgreSQL):** the primary writes WAL (Write-Ahead Log) records; replicas apply the same WAL, staying in sync. Lag depends on replica hardware and network; typically milliseconds.

**When read replicas help:**
- Read-heavy workloads (10:1 read/write ratio or higher)
- Analytics queries that scan millions of rows (run against replica, don't block OLTP)
- Geographic distribution: replicas closer to read-heavy regions
- BI tools / reporting: direct reporting tool connections to replica

**Limitations:**
- **Replication lag:** replicas are slightly behind the primary. A user who just wrote data and immediately reads may get stale data. Solution: route reads to primary for the user's own data; replica for aggregated/global data
- **Eventual consistency:** replicas are not primary-consistent; can't use for transactions
- **Read-your-writes:** needs careful routing logic to avoid

**Cloud offerings:** Amazon Aurora Global Database, RDS read replicas, Google Cloud SQL replicas, PlanetScale.

**Key insight:** Read replicas are one of the first scalability tools after vertical scaling. They're operationally simple (compared to sharding) and effectively double or triple read capacity.`,
    },
    {
      id: 968,
      name: "Covering Indexes",
      desc: `**Covering index** — an index that contains all the columns required by a query, allowing the database to satisfy the query entirely from the index without accessing the heap (the actual table data). The query plan shows "Index Only Scan" — the fastest possible access path.

**Why index-only scans are fast:** a regular "Index Scan" reads the index to find matching rows, then fetches each matching row from the heap (random I/O). An "Index Only Scan" reads only the index (sequential I/O), avoiding the heap entirely.

**Example:** query "SELECT email FROM users WHERE status = 'active'" with an index on only "status" requires a heap fetch for every matching row to retrieve "email." An index on "(status, email)" is a covering index — both columns are in the index.

**PostgreSQL INCLUDE columns:** "CREATE INDEX idx ON users (status) INCLUDE (email, name)." The INCLUDE columns are stored in leaf nodes but not used for sorting — avoids inflating the index B-Tree while still covering common projections.

**Composite index column order:** for a composite index "(a, b, c)," queries filter on "(a)," "(a, b)," or "(a, b, c)" — but not "(b, c)" alone. Leftmost prefix rule.

**Key insight:** Covering indexes eliminate heap I/O entirely — for frequent, high-throughput queries (hot paths), an index-only scan can be 10-100x faster than an index scan.`,
    },
    {
      id: 969,
      name: "VACUUM & Table Bloat (PostgreSQL)",
      desc: `**MVCC and dead tuples:** PostgreSQL's MVCC (Multi-Version Concurrency Control) handles concurrent reads and writes by keeping old row versions visible to transactions that started before an update. When a row is updated or deleted, the old version is marked "dead" but remains on disk until VACUUM reclaims it.

**Table bloat:** accumulation of dead tuples. A table with heavy UPDATE traffic can accumulate gigabytes of dead tuples, causing:
- Larger-than-necessary table/index sizes
- Slower sequential scans (reading dead tuples and skipping them)
- Index bloat (dead index entries)

**VACUUM:** reclaims dead tuple space for reuse within the same table (doesn't shrink file size). **AUTOVACUUM** runs automatically based on dead tuple thresholds (configurable). Critical to keep autovacuum tuned for high-update tables.

**VACUUM FULL:** rewrites the table to a new file, reclaiming actual disk space. Takes an ACCESS EXCLUSIVE lock (blocks all reads and writes) — never run on production tables during business hours.

**Transaction ID wraparound:** PostgreSQL uses 32-bit transaction IDs (XID). After ~2 billion transactions, XIDs wrap around and old data becomes "in the future" — catastrophic. VACUUM prevents this by freezing old XIDs. Monitor "pg_stat_user_tables.n_dead_tup" and "age(relfrozenxid)."

**Key insight:** Untuned autovacuum is the hidden cause of many PostgreSQL performance degradations. Monitor dead tuple ratios and autovacuum activity as a core operational concern.`,
    },
    {
      id: 970,
      name: "Slow Query Analysis",
      desc: `**Slow query log** — a database feature that records queries exceeding a threshold duration, enabling identification of performance bottlenecks. The starting point for any database performance investigation.

**PostgreSQL slow query setup:**
- "log_min_duration_statement = 1000" in postgresql.conf logs queries over 1 second
- "pg_stat_statements" extension aggregates query statistics (total time, calls, mean time, rows)
- Query: "SELECT query, total_exec_time, calls, mean_exec_time FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 20" — find the worst offenders

**MySQL slow query log:**
- "slow_query_log = 1; long_query_time = 1;" in my.cnf
- "pt-query-digest" from Percona Toolkit analyzes slow query logs and groups similar queries

**Analysis workflow:**
1. Identify slowest query (total time × calls = total impact)
2. Run "EXPLAIN ANALYZE" on the query
3. Look for Seq Scans on large tables, bad row estimates, hash joins on large unindexed tables
4. Add index or rewrite query
5. Verify with "EXPLAIN ANALYZE" again

**Key metrics:** mean execution time, total execution time (mean × calls), rows examined vs rows returned.

**Key insight:** A query taking 50ms that runs 100,000 times/day has 3x more total impact than a query taking 10 seconds that runs 10 times/day. Optimize by total impact, not single-execution time.`,
    },
    {
      id: 971,
      name: "Query Hints & Optimizer Overrides",
      desc: `**Query optimizer** — the database component that takes a parsed SQL query and determines the most efficient execution plan: which indexes to use, what join order to choose, what join algorithm to apply. It uses table statistics (row counts, column cardinality, data distribution) to estimate costs.

**When the optimizer gets it wrong:** with stale statistics, unusual data distributions, or very complex queries, the optimizer may choose a suboptimal plan (e.g., a nested loop on 1M rows because it estimated 100).

**PostgreSQL optimizer hints:**
- No official "hints" syntax in vanilla PostgreSQL (unlike Oracle/MySQL)
- "SET enable_seqscan = off" disables seq scan for the session (use "RESET" after)
- "SET enable_nestloop = off" forces hash or merge join
- "pg_hint_plan" extension adds Oracle-style hints
- Rewriting the query (add CTE, change join order) often guides the optimizer

**MySQL hints:**
- "FORCE INDEX (idx_name)" forces a specific index
- "IGNORE INDEX (idx_name)" prevents use of an index
- "STRAIGHT_JOIN" forces join order as written

**Better long-term solutions:**
- Run "ANALYZE tablename" to update statistics manually after bulk loads
- Adjust "default_statistics_target" for columns with skewed distribution
- Create indexes that cover the exact query pattern

**Key insight:** Query hints are a last resort — they hardcode a plan that may become wrong as data changes. Fix the root cause (stale statistics, missing index, query structure) instead of patching with hints.`,
    },
  ],
};

export default queryPerformance;
