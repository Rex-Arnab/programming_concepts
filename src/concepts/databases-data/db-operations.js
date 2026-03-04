const dbOperations = {
  name: "Database Operations & Reliability",
  icon: "🔒",
  color: "#14b8a6",
  concepts: [
    {
      id: 1016,
      name: "Backup & Recovery Strategies",
      desc: `**Database backup** — a copy of data that can be used to restore the original database after data loss events (hardware failure, accidental deletion, ransomware, corruption). The RTO (Recovery Time Objective) and RPO (Recovery Point Objective) drive backup strategy.

**RPO:** maximum acceptable data loss (how much data can you afford to lose?). RPO of 1 hour means backups every hour; RPO of 5 minutes requires near-continuous backup (WAL shipping).

**RTO:** maximum acceptable downtime. RTO of 1 hour means your restore procedure must complete within an hour. Drives choices about backup size, restore tooling, and standby replicas.

**Backup types:**
- **Full backup:** complete snapshot of the entire database. Largest, slowest to take, fastest to restore
- **Incremental backup:** only changes since the last backup. Faster to take; requires chaining for restore
- **Differential backup:** changes since the last full backup. Middle ground
- **WAL archiving (PostgreSQL):** continuous shipping of WAL segments to object storage (S3); enables Point-in-Time Recovery

**Tools:**
- **pg_dump / pg_dumpall:** logical dump; human-readable SQL; portable; slow for large databases
- **pg_basebackup:** physical backup; fast; binary format; requires same PostgreSQL version for restore
- **Barman (2ndQuadrant):** PostgreSQL backup manager with WAL streaming and PITR
- **pgBackRest:** modern, fast, parallel backup and restore with S3/GCS support

**The golden rule:** a backup that has never been restored is not a backup. Test your restore procedure quarterly — and measure RTO with real production-sized data.

**Key insight:** Most organizations don't test restores. When disaster strikes, they discover their backups are corrupt, their restore time exceeds their RTO, or their RPO assumption was wrong.`,
    },
    {
      id: 1017,
      name: "Database Replication",
      desc: `**Database replication** — copying data changes from a primary database to one or more replica databases in near-real-time, providing high availability, fault tolerance, and read scaling.

**PostgreSQL streaming replication:**
- Primary streams WAL records to replicas continuously
- **Synchronous replication:** primary waits for at least one replica to confirm before committing — zero data loss, but adds commit latency (~1-5ms local, much more for geo-replicas)
- **Asynchronous replication:** primary commits immediately; replica applies WAL with slight lag — better performance but potential data loss on primary failure

**Replication lag:** the delay between a write on the primary and its availability on a replica. Monitor "pg_stat_replication.write_lag / flush_lag / replay_lag." High lag can cause read replicas to serve stale data.

**MySQL binlog replication:** primary writes all changes to binary log; replicas read and replay. Statement-based (replays SQL statements; some non-deterministic statements cause divergence), row-based (replicates actual row changes; safer), and mixed modes.

**Logical replication (PostgreSQL 10+):** replicate specific tables or publications at the logical (row) level rather than physical WAL level. Enables cross-version replication, selective replication, and CDC (Debezium uses logical replication slots).

**Cascading replication:** replicas can themselves have replicas — reduces load on the primary for streaming WAL.

**Key insight:** Replication ≠ backup. A replica applies destructive changes (DROP TABLE, accidental DELETE) immediately. You need both replication (for HA) and backups with PITR (for data recovery).`,
    },
    {
      id: 1018,
      name: "High Availability & Failover",
      desc: `**High availability (HA)** — designing a database system to minimize downtime by automatically detecting primary failure and promoting a replica to become the new primary, ideally within seconds.

**PostgreSQL HA stacks:**
- **Patroni + etcd/Consul/ZooKeeper:** the most popular open-source PostgreSQL HA solution. Patroni is a Python daemon on each node that monitors the cluster via etcd/Consul for leader election; automatically promotes a replica and reconfigures the cluster on primary failure
- **Pgpool-II:** provides connection pooling + HA + load balancing in one tool; more complex
- **Repmgr:** simpler HA solution without etcd dependency; good for smaller setups
- **Cloud-managed:** Amazon RDS Multi-AZ, Google Cloud SQL HA, Azure Database for PostgreSQL — fully managed automatic failover

**Failover process:**
1. Health check detects primary is unresponsive
2. Leader election among replicas (most advanced, least lag)
3. Promoted replica becomes new primary (updates DNS or HAProxy routing)
4. Old primary, if it recovers, rejoins as a replica (fencing prevents split-brain)

**Fencing / STONITH (Shoot The Other Node In The Head):** critical to prevent split-brain (two primaries accepting writes simultaneously). Patroni uses etcd TTL leases; cloud solutions use VPC routing and disk fencing.

**RTO for PostgreSQL HA:** well-tuned Patroni setups achieve 10-30 second failover. Amazon RDS Multi-AZ achieves 20-40 seconds typically.

**Key insight:** Testing failover in production (chaos engineering: "kill the primary, measure time to recovery") is the only reliable way to know your HA actually works as designed.`,
    },
    {
      id: 1019,
      name: "Zero-Downtime Migrations",
      desc: `**Zero-downtime database migration** — evolving a database schema without taking the application offline, by using techniques that keep the old and new schema simultaneously valid during the transition period.

**The expand-contract pattern (most important):**
1. **Expand:** add the new column/table/index alongside the old one; deploy app that writes to both old and new
2. **Backfill:** populate the new column for all existing rows (in batches to avoid locking)
3. **Switch:** deploy app that reads from the new column only
4. **Contract:** remove the old column/table in a subsequent deployment

**Dangerous operations on large tables:**
- "ALTER TABLE ADD COLUMN NOT NULL" without a default acquires a full table lock (use "ADD COLUMN DEFAULT NULL" first, backfill, then add "NOT NULL" constraint)
- "CREATE INDEX" locks the table (use "CREATE INDEX CONCURRENTLY" in PostgreSQL)
- "ALTER TABLE ALTER COLUMN TYPE" rewrites the entire table (cast every row) — painful on 100M+ rows
- "DELETE" of millions of rows at once generates huge WAL and locks; batch in chunks of 1000-10000 rows

**Tools:**
- **gh-ost** (GitHub): online schema changes for MySQL; shadows the table, copies data in background
- **pt-online-schema-change** (Percona): MySQL online schema change via trigger-based shadow table
- **pg-osc** / **pgroll**: online schema changes for PostgreSQL

**Key insight:** Every schema migration on a production database at scale should be reviewed against the expand-contract pattern. "Simple" DDL operations that take milliseconds on dev take minutes (and cause downtime) on 100M-row production tables.`,
    },
    {
      id: 1020,
      name: "Database Monitoring & Alerting",
      desc: `**Database monitoring** — continuously collecting and alerting on metrics that indicate database health, performance, and capacity, so that problems are detected before they cause user-visible failures.

**Critical PostgreSQL metrics to monitor:**

**Availability:**
- Connection count vs "max_connections" (alert at 80%)
- Active queries count; queries in "idle in transaction" state (leaked transactions)

**Performance:**
- Query latency (p50, p95, p99) via "pg_stat_statements"
- Cache hit ratio ("pg_statio_user_tables.heap_blks_hit / (heap_blks_hit + heap_blks_read)") — should be >99%
- Rows returned per query (sudden increase = missing index or regression)

**Storage:**
- Disk usage (alert at 70%, critical at 85%)
- Table/index bloat ("n_dead_tup" from "pg_stat_user_tables"; alert if >10% of live tuples)
- WAL generation rate (sudden spike = bulk operation or runaway transaction)

**Replication:**
- Replication lag in bytes and seconds ("pg_stat_replication")
- Oldest replication slot LSN gap (unused slots can accumulate WAL indefinitely — disk killer)

**Locks:**
- Long-running queries ("pg_stat_activity" WHERE wait_event_type = 'Lock' AND query_start < NOW() - INTERVAL '30s")
- Lock wait chains (query blocked by blocked query)

**Tools:** pgBadger (log analysis), pganalyze (commercial query intelligence), Datadog PostgreSQL integration, Prometheus + pg_exporter, Grafana dashboards.

**Key insight:** The single most important PostgreSQL health metric is "idle in transaction" connections — they hold locks without doing work and are the most common cause of unexplained application stalls.`,
    },
    {
      id: 1021,
      name: "Lock Contention & Deadlocks",
      desc: `**Database lock** — a mechanism preventing concurrent transactions from making conflicting changes. PostgreSQL uses row-level locks (for row modifications) and table-level locks (DDL, VACUUM FULL) with a spectrum of lock types.

**PostgreSQL lock types (from weakest to strongest):**
- "ACCESS SHARE" — acquired by SELECT; compatible with most locks
- "ROW EXCLUSIVE" — acquired by INSERT/UPDATE/DELETE; conflicts with SHARE locks
- "SHARE UPDATE EXCLUSIVE" — acquired by VACUUM, CREATE INDEX CONCURRENTLY
- "ACCESS EXCLUSIVE" — acquired by DROP TABLE, TRUNCATE, ALTER TABLE; conflicts with everything — blocks even SELECT

**Lock contention:** multiple transactions competing for the same row or table lock, causing queuing. Symptoms: application latency spikes, "pg_stat_activity" showing many "Lock" wait events.

**Deadlock:** two transactions each holding a lock that the other needs, creating a circular wait. PostgreSQL detects deadlocks automatically and rolls back the youngest transaction ("ERROR: deadlock detected"). Application must retry.

**Common deadlock pattern:**
- Transaction A: UPDATE orders WHERE id=1 → UPDATE products WHERE id=5
- Transaction B: UPDATE products WHERE id=5 → UPDATE orders WHERE id=1
- Fix: ensure all transactions acquire locks in the same order

**Long-running transactions:** a transaction started but not committed holds all its locks until commit or rollback. A forgotten "BEGIN" in psql that holds locks for hours blocks other operations. Monitor "pg_stat_activity.xact_start."

**Key insight:** "Idle in transaction" connections are the most dangerous lock sources — they hold locks without doing work. Set "idle_in_transaction_session_timeout = '30s'" in PostgreSQL to auto-terminate them.`,
    },
    {
      id: 1022,
      name: "Point-in-Time Recovery (PITR)",
      desc: `**Point-in-Time Recovery (PITR)** — the ability to restore a database to any specific moment in history, not just the time of the last full backup. Achieved by replaying WAL (Write-Ahead Log) records from a base backup up to the desired recovery target.

**How PITR works (PostgreSQL):**
1. Take a base backup (full physical copy using "pg_basebackup")
2. Continuously archive WAL segments to durable storage (S3, GCS) — each WAL segment represents a period of database activity
3. On recovery: restore the base backup, then replay WAL segments up to the target time/LSN/transaction ID

**"Recovery target" options:**
- "recovery_target_time = '2024-01-15 14:30:00'" — recover to a specific timestamp
- "recovery_target_lsn" — recover to a specific WAL position
- "recovery_target_xid" — recover to just before a specific transaction ID (useful for "undo this specific bulk operation")

**Tools:** pgBackRest (the modern standard), Barman, Wal-E/Wal-G (S3-based WAL archiving), AWS RDS (PITR built-in, 5-minute granularity), Heroku Postgres.

**WAL retention requirement:** PITR requires keeping all WAL segments between the base backup and the desired recovery point. Typically 7-35 days depending on RPO requirements.

**PITR drill:** practice PITR quarterly. The most common disaster recovery failure is discovering at crisis time that WAL segments are missing, corrupted, or the restoration process takes 4x longer than expected.

**Key insight:** PITR is the safety net for "an engineer accidentally dropped the wrong table" — arguably the most common production disaster. Without PITR, your only option is the last full backup (potentially losing hours of data).`,
    },
    {
      id: 1023,
      name: "Row-Level Security (RLS)",
      desc: `**Row-Level Security (RLS)** — a PostgreSQL feature that adds automatic, transparent filtering to every query based on security policies defined per table. Users only see rows they're allowed to see, enforced at the database level rather than application level.

**How RLS works:**
1. Enable on a table: "ALTER TABLE orders ENABLE ROW LEVEL SECURITY"
2. Define policies: "CREATE POLICY tenant_isolation ON orders USING (tenant_id = current_setting('app.tenant_id')::int)"
3. Every "SELECT," "UPDATE," "DELETE," "INSERT" automatically applies the policy predicate — no application-level WHERE clause needed

**Multi-tenant SaaS example:**
- Application sets "SET LOCAL app.tenant_id = 42" at the start of each connection
- Every query against "orders" automatically adds "WHERE tenant_id = 42"
- A bug in application code cannot accidentally expose another tenant's data

**Performance:** RLS policies participate in the query planner — an index on "tenant_id" will be used for the RLS predicate just as it would for an explicit WHERE clause.

**Force policies on table owners:** by default, table owners bypass RLS. "ALTER TABLE orders FORCE ROW LEVEL SECURITY" applies policies to owners too.

**RLS for GDPR compliance:** RLS can enforce "data residency" policies — EU users' data automatically stays within EU database connections.

**Key insight:** RLS moves tenant isolation from a "trust the application layer" guarantee to a "guaranteed by the database" guarantee. This is one of the most powerful and underused PostgreSQL features for multi-tenant applications.`,
    },
    {
      id: 1024,
      name: "Database Encryption",
      desc: `**Database encryption** — protecting data from unauthorized access by encoding it, either at rest (stored data) or in transit (data in motion between client and database server).

**Encryption at rest:**
- **Transparent Data Encryption (TDE):** encrypts database files at the storage/OS level; databases like SQL Server and Oracle support this natively; PostgreSQL relies on OS-level encryption (LUKS, EBS encryption)
- **Column-level encryption:** encrypt specific sensitive columns (SSN, credit card) using PostgreSQL's "pgcrypto" extension; application encrypts before storing, decrypts after fetching
- **Cloud-provider managed:** AWS RDS, GCP Cloud SQL, Azure Database all offer built-in storage encryption with KMS-managed keys; minimal overhead; zero setup

**Encryption in transit (TLS):**
- PostgreSQL "ssl = on" in postgresql.conf; provide server certificate
- Client connection: "sslmode=require" or "verify-full" (also validates server certificate — prevents MITM)
- Always use "sslmode=verify-full" in production; "require" only validates encryption, not server identity

**Key management:**
- Don't store encryption keys in the database you're encrypting
- Use cloud KMS (AWS KMS, Google Cloud KMS, Azure Key Vault) for key management
- Rotate keys on a schedule; log key usage for audit trails

**Application-level encryption (envelope encryption):** generate a per-record Data Encryption Key (DEK), encrypt the DEK with a Key Encryption Key (KEK) stored in KMS, store the encrypted DEK alongside the data. Revocation is efficient — rotate or revoke the KEK.

**Key insight:** Encryption at rest is a compliance checkbox, not security theater — it protects against physical disk theft or unauthorized cloud storage access. The real risk is usually application-level access control, not storage encryption.`,
    },
    {
      id: 1025,
      name: "Database as Code",
      desc: `**Database as Code** — managing database schema definitions, migrations, configuration, and infrastructure in version-controlled code files, applying the same software engineering practices (Git, PR review, CI/CD, automated testing) to database infrastructure as to application code.

**Schema as code:**
- Migration files (Flyway, Liquibase, Alembic, golang-migrate) track schema evolution as versioned scripts
- Database schema is visible in the repository — a new developer can spin up an identical database with "flyway migrate" or "alembic upgrade head"
- PR review for schema changes ensures a second pair of eyes on migrations

**Terraform for database infrastructure:**
- Provision RDS instances, Snowflake warehouses, Redshift clusters as Terraform code
- Database users and permissions as Terraform resources (avoid manual "GRANT" commands that are invisible to the team)
- "terraform plan" shows what will change before applying

**dbt for transformations:** analytical transformations as version-controlled SQL models — the data warehouse schema as code.

**Benefits:**
- Reproducibility: any environment can be recreated from code
- Auditability: the Git history shows who changed what schema and when
- Rollback: revert migrations by deploying the previous version
- Environment promotion: same migration files run dev → staging → prod sequentially

**Anti-pattern:** direct "ALTER TABLE" commands in production without a corresponding migration file — the "schema drift" problem where production differs from what's in code.

**Key insight:** The most dangerous database change is the one that bypasses the change management process. Infrastructure as code with mandatory PR review prevents the "just a quick fix in prod" disasters.`,
    },
  ],
};

export default dbOperations;
