const sqlRelational = {
  name: "SQL & Relational Databases",
  icon: "📋",
  color: "#3b82f6",
  concepts: [
    {
      id: 918,
      name: "The Relational Model",
      desc: `**Relational model** — Edgar Codd's 1970 framework for representing data as tables (relations) of rows (tuples) and columns (attributes), where all operations are performed using set-based logic rather than record-by-record navigation.

Mental model: every piece of data lives in a table, every table has a schema, and relationships between data are expressed by shared keys — not by pointers or nested structures. You describe *what* you want; the query optimizer decides *how* to retrieve it.

**Why it endures:** the relational model separates the logical representation (what the data means) from the physical storage (how it's stored). This physical data independence lets storage engines evolve without changing application queries.

**Key insight:** SQL's declarative nature — "give me all orders from customers in Germany" rather than "iterate through orders, check each customer" — is the killer feature. The optimizer can pick the best execution plan invisibly.`,
    },
    {
      id: 919,
      name: "SQL Fundamentals",
      desc: `**SQL (Structured Query Language)** — the standard language for managing and querying relational databases, divided into DDL (Data Definition Language: CREATE, ALTER, DROP), DML (Data Manipulation Language: SELECT, INSERT, UPDATE, DELETE), DCL (Data Control Language: GRANT, REVOKE), and TCL (Transaction Control Language: COMMIT, ROLLBACK).

Core SELECT anatomy: "SELECT columns FROM table WHERE condition GROUP BY col HAVING agg_condition ORDER BY col LIMIT n". Execution order differs from written order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.

**Common pitfalls:**
- "SELECT *" in production queries (fetches unnecessary data, breaks on schema changes)
- "WHERE" on a non-indexed column (full table scan)
- "UPDATE/DELETE" without a "WHERE" clause (modifies all rows)
- Using "HAVING" where "WHERE" suffices (HAVING filters after aggregation; WHERE filters before)

**Key insight:** Understanding the logical execution order (FROM before WHERE before SELECT) explains why you can't use a SELECT alias in a WHERE clause — the alias doesn't exist yet at that evaluation stage.`,
    },
    {
      id: 920,
      name: "JOIN Types",
      desc: `**SQL JOINs** — operations that combine rows from two or more tables based on a related column, forming the heart of relational query composition.

Types:
- **INNER JOIN** — returns only rows where the join condition matches in both tables (the intersection)
- **LEFT JOIN** (LEFT OUTER) — returns all rows from the left table, with NULLs for non-matching rows from the right
- **RIGHT JOIN** — mirror of LEFT JOIN
- **FULL OUTER JOIN** — all rows from both tables; NULLs where there's no match
- **CROSS JOIN** — cartesian product (every combination of rows); use carefully — N×M rows
- **SELF JOIN** — a table joined to itself (useful for hierarchical data like org charts)

**Performance:** joins on indexed foreign keys are fast (index lookup per row). Joins on non-indexed columns trigger hash joins or nested loops that scale poorly. Multiple joins on large tables require careful execution plan inspection.

**Key insight:** "LEFT JOIN + WHERE right.col IS NULL" is the idiomatic pattern to find rows in the left table with no match in the right (e.g., customers with no orders).`,
    },
    {
      id: 921,
      name: "Subqueries & CTEs",
      desc: `**Subquery** — a query nested inside another query, used in SELECT (scalar subquery), FROM (derived table), or WHERE (correlated/uncorrelated subquery). **CTE (Common Table Expression)** — a named temporary result set defined with "WITH", making complex queries readable and reusable within a single statement.

**Correlated vs uncorrelated subquery:** an uncorrelated subquery runs once independently ("WHERE id IN (SELECT id FROM vip_users)"). A correlated subquery references the outer query and runs once per outer row — potentially catastrophic on large tables.

**CTE advantages:**
- Readability: break a complex query into named logical steps
- Recursion: "WITH RECURSIVE" enables tree traversal (org charts, bill of materials)
- Multiple references: refer to the same CTE twice without re-computing

**When to use CTEs vs subqueries:** CTEs for readability and recursion; subqueries when the optimizer can push them down more efficiently. In PostgreSQL, CTEs prior to v12 were optimization fences — always materialized. PostgreSQL 12+ allows the optimizer to inline them.

**Key insight:** "WITH RECURSIVE" unlocks hierarchical queries that would otherwise require application-side loops — a single SQL statement can traverse an entire tree.`,
    },
    {
      id: 922,
      name: "Window Functions",
      desc: `**Window functions** — SQL functions that perform calculations across a set of rows related to the current row (the "window"), without collapsing rows like GROUP BY does. Syntax: "FUNCTION() OVER (PARTITION BY col ORDER BY col ROWS BETWEEN ...)".

Essential window functions:
- "ROW_NUMBER()" — sequential row number within partition
- "RANK()" / "DENSE_RANK()" — rank with / without gaps for ties
- "LAG()" / "LEAD()" — access previous / next row's value (running comparisons, day-over-day changes)
- "SUM() OVER (...)" — running total
- "NTILE(n)" — divide rows into n buckets (percentile bucketing)
- "FIRST_VALUE()" / "LAST_VALUE()" — first/last value in window

**Classic use cases:**
- Running total of revenue by date: "SUM(amount) OVER (ORDER BY date)"
- Top N per group: "ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC)" then filter on row_num <= 3
- Month-over-month change: "LAG(revenue) OVER (ORDER BY month)"

**Key insight:** Window functions let you do analytics that previously required self-joins or subqueries, often in a single pass — they're one of the most powerful and underused SQL features.`,
    },
    {
      id: 923,
      name: "Stored Procedures & Functions",
      desc: `**Stored procedure** — a named block of SQL (and procedural logic) stored in the database and executed on the server, callable by name. **Database function** — similar but must return a value and can be used in SQL expressions. Both are written in procedural languages (PL/pgSQL, T-SQL, PL/SQL).

**Advantages:**
- Reduced network round-trips (logic runs in DB, not app)
- Reusability and centralized business logic
- Can encapsulate multi-step transactions atomically
- Security: grant EXECUTE without SELECT/UPDATE access

**Disadvantages:**
- Hard to version-control and test compared to application code
- Vendor lock-in (PL/pgSQL ≠ T-SQL)
- Debugging is poor compared to modern IDEs
- Business logic hidden in DB makes codebase harder to understand
- Performance monitoring is harder

**When to use:** narrow use cases — ETL transformations within the database, triggers, audit logging. For most application logic, keep it in the application layer where you have proper tooling, testing, and version control.

**Key insight:** The "fat database" anti-pattern (putting business logic in stored procedures) was popular in the 2000s and is now widely considered harmful for maintainability.`,
    },
    {
      id: 924,
      name: "Views & Materialized Views",
      desc: `**View** — a named, saved SQL query that behaves like a virtual table. Every time you query a view, the underlying SQL runs. Views simplify complex queries, provide security (expose only certain columns/rows), and create stable interfaces over evolving schemas.

**Materialized view** — a view whose result is physically stored on disk and refreshed on demand or on a schedule. Querying a materialized view reads the cached result — dramatically faster for expensive aggregations, but potentially stale.

**View trade-offs:**
- Regular views: always fresh, zero storage, but the underlying query runs every time — can be slow
- Materialized views: fast reads, but stale until refreshed; refresh itself can be expensive

**Use cases for materialized views:**
- Daily/hourly analytics aggregations (total sales by product, active user counts)
- Denormalized read models for frequently-queried data
- Full-text search indexes (PostgreSQL "tsvector" columns)

**Concurrent refresh:** PostgreSQL supports "REFRESH MATERIALIZED VIEW CONCURRENTLY" — refreshes without locking reads, at the cost of extra storage and time.

**Key insight:** Materialized views are a lightweight caching layer inside the database — no Redis required for pre-computed query results.`,
    },
    {
      id: 925,
      name: "Triggers",
      desc: `**Database trigger** — a procedural function automatically executed by the database in response to an event (INSERT, UPDATE, DELETE) on a specified table. Can fire BEFORE or AFTER the DML operation, and FOR EACH ROW or FOR EACH STATEMENT.

**Common uses:**
- Audit logging: automatically write to an "audit_log" table on every UPDATE
- Derived data: auto-update a "last_modified_at" timestamp column
- Enforcing complex constraints that CHECK constraints can't express
- Soft delete: override DELETE with an UPDATE setting "deleted_at"

**Why triggers are dangerous:**
- Hidden side effects: code reading the table has no idea triggers are firing
- Cascading triggers: trigger A fires trigger B — debugging nightmares
- Performance: triggers add latency to every affected DML operation
- Testing: hard to unit test trigger logic in isolation

**When NOT to use:** business logic that belongs in the application layer. Triggers make it invisible to developers reading the codebase.

**Key insight:** Triggers are a sharp tool — perfect for audit logging and "updated_at" timestamps, but using them for business logic creates invisible complexity that haunts teams for years.`,
    },
    {
      id: 926,
      name: "PostgreSQL",
      desc: `**PostgreSQL** — the world's most advanced open-source relational database, known for strict SQL standards compliance, extensibility, and a feature set that rivals commercial databases (Oracle, SQL Server). Default port: 5432.

**Standout features:**
- Full ACID compliance with SSI (Serializable Snapshot Isolation)
- JSONB for document storage with indexing (GIN indexes on JSON fields)
- Full-text search with "tsvector"/"tsquery"
- Table inheritance and partitioning
- Custom data types, operators, and index types (GiST, GIN, BRIN, SP-GiST)
- Logical replication and streaming replication
- "pg_stat_statements" for query performance monitoring
- Extensions: PostGIS (geo), pgvector (AI embeddings), TimescaleDB (time-series)

**When to choose PostgreSQL:** almost any relational use case. It handles OLTP, light analytics, JSON documents, time-series (with TimescaleDB), and geospatial data in one system.

**Key insight:** PostgreSQL's MVCC (Multi-Version Concurrency Control) means readers never block writers and vice versa — a major concurrency advantage over MySQL's older locking model.`,
    },
    {
      id: 927,
      name: "MySQL & MariaDB",
      desc: `**MySQL** — the most widely deployed open-source relational database (powering much of WordPress, Drupal, and legacy LAMP stacks). InnoDB is its default storage engine providing ACID transactions, foreign keys, and MVCC. **MariaDB** is a community fork of MySQL by the original creator, API-compatible but with divergent features.

**MySQL strengths:**
- Massive ecosystem and community (huge talent pool)
- Simple replication setup (binlog-based)
- Strong performance for read-heavy OLTP workloads
- "GROUP_CONCAT()", "INSERT IGNORE", "ON DUPLICATE KEY UPDATE" — practical extensions
- Excellent cloud support (Amazon RDS, Google Cloud SQL, PlanetScale)

**MySQL vs PostgreSQL:**
- MySQL historically had a simpler optimizer; PostgreSQL is now generally stronger for complex queries
- MySQL's "ONLY_FULL_GROUP_BY" mode (now default) prevents a common error pattern
- PostgreSQL has better standards compliance and more advanced features (window functions fully supported since 8.4; MySQL only since 8.0)
- MySQL is still the safe default for teams with legacy LAMP infrastructure

**Key insight:** For new projects, PostgreSQL is usually the better choice. For systems already running MySQL, migration cost often outweighs the benefits.`,
    },
    {
      id: 928,
      name: "Schema Migrations",
      desc: `**Schema migration** — a versioned, incremental change to a database schema (adding a column, creating an index, modifying a constraint), tracked as code so the schema evolves alongside the application.

**Tools:** Flyway (SQL-file based, versioned), Liquibase (XML/YAML/SQL), Alembic (Python/SQLAlchemy), Prisma Migrate, Rails Active Record Migrations, golang-migrate.

**Safe migration patterns:**
- **Expand-contract:** add the new column (expand), backfill it, update code, then drop the old column (contract) — supports zero-downtime deployments
- **Non-blocking index creation:** "CREATE INDEX CONCURRENTLY" in PostgreSQL builds the index without locking the table
- **Adding NOT NULL columns:** add as nullable, backfill, then apply NOT NULL constraint — adding NOT NULL to a large table locks it
- Never rename a column or table in a single deployment — use expand-contract

**Anti-patterns:** running "ALTER TABLE" with table locks during business hours on a 100M-row table; mixing schema changes with data changes in one migration.

**Key insight:** Schema migrations are code. They belong in version control, in CI/CD pipelines, and must be tested against production-sized data before deployment.`,
    },
    {
      id: 929,
      name: "Full-Text Search in SQL",
      desc: `**Full-text search (FTS)** — searching document-like text for relevant results using linguistic analysis (stemming, stop words, ranking), rather than exact string matching. "LIKE '%query%'" is not full-text search — it can't rank results, can't stem ("run" ≠ "running"), and doesn't scale.

**PostgreSQL FTS:**
- "tsvector" stores preprocessed document tokens; "tsquery" is the search query
- "to_tsvector('english', body)" tokenizes and stems text in English
- GIN index on the "tsvector" column makes search fast
- "ts_rank()" scores results by relevance

**MySQL FTS:** "FULLTEXT" index on text columns; "MATCH(col) AGAINST('query' IN BOOLEAN MODE)"

**When to use in-database FTS:** simple product/post search in small-to-medium applications. It avoids an extra service dependency.

**When to use Elasticsearch/OpenSearch:** advanced relevance tuning (BM25 scoring, custom analyzers), faceted search, autocomplete, fuzzy matching, or search across millions of documents with sub-100ms latency.

**Key insight:** PostgreSQL FTS handles 80% of search use cases without introducing an Elasticsearch cluster. Add Elasticsearch when your search requirements outgrow SQL.`,
    },
  ],
};

export default sqlRelational;
