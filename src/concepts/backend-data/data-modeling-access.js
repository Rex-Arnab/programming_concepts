const dataModelingAccess = {
  name: "Data Modeling & Access",
  icon: "⊞",
  color: "#EC4899",
  concepts: [
    { id: 56, name: "ORM (Object-Relational Mapping)", desc: "Maps database tables to code objects. Prisma (TS), SQLAlchemy (Python), Hibernate (Java), Active Record (Ruby), Entity Framework (.NET). Abstracts raw SQL." },
    { id: 57, name: "Query Builders", desc: "Programmatic SQL construction without full ORM overhead. Knex.js, Drizzle ORM, JOOQ, Kysely. Type-safe queries with more control than ORMs." },
    { id: 58, name: "Raw SQL & Prepared Statements", desc: "Direct SQL execution. Prepared statements prevent SQL injection by parameterizing inputs. Maximum control and performance. Use for complex queries ORMs can't express." },
    { id: 59, name: "Database Migrations", desc: "Versioned schema changes applied in order. Up (apply) and down (rollback) scripts. Prisma Migrate, Alembic, Flyway, Knex migrations. Track in version control." },
    { id: 60, name: "Database Normalization (1NF–5NF)", desc: "Organizing data to reduce redundancy. 1NF: atomic values. 2NF: no partial dependencies. 3NF: no transitive dependencies. Balance normalization with query performance." },
    { id: 61, name: "Denormalization", desc: "Intentionally adding redundancy for read performance. Materialized views, computed columns, duplicated data. Trade storage and write complexity for faster reads." },
    { id: 62, name: "Indexing", desc: "Data structures (B-tree, hash, GIN, GiST) for fast lookups. Composite indexes, covering indexes, partial indexes. Speeds reads, slows writes. EXPLAIN ANALYZE to verify." },
    { id: 63, name: "Database Transactions & ACID", desc: "Atomicity (all-or-nothing), Consistency (valid state), Isolation (concurrent safety), Durability (persisted). BEGIN → operations → COMMIT/ROLLBACK." },
    { id: 64, name: "Transaction Isolation Levels", desc: "Read Uncommitted → Read Committed → Repeatable Read → Serializable. Higher isolation prevents more anomalies (dirty reads, phantom reads) but reduces concurrency." },
    { id: 65, name: "Connection Pooling", desc: "Reusing database connections instead of creating new ones per request. PgBouncer, HikariCP, node-postgres pool. Reduces connection overhead dramatically." },
    { id: 66, name: "N+1 Query Problem", desc: "Fetching N related records with N+1 separate queries instead of one. Solved with eager loading (JOIN), data loaders (GraphQL), or includes (ORM). Major performance killer." },
    { id: 67, name: "Database Sharding", desc: "Splitting data across multiple database instances by shard key (user_id, region). Horizontal scaling. Complexity: cross-shard queries, rebalancing, hotspots." },
    { id: 68, name: "Read Replicas", desc: "Database copies handling read queries, offloading the primary. Asynchronous replication introduces lag. Route writes to primary, reads to replicas." },
    { id: 69, name: "Database Replication", desc: "Copying data across nodes. Single-leader (primary-replica), multi-leader, leaderless. Synchronous vs asynchronous. Trade-off: consistency vs latency vs availability." },
    { id: 70, name: "CQRS (Command Query Responsibility Segregation)", desc: "Separate models for reads and writes. Write model optimized for updates, read model for queries. Different databases possible. Event sourcing often paired." },
  ],
};
export default dataModelingAccess;
