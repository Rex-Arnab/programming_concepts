const dbFundamentals = {
  name: "Database Fundamentals",
  icon: "🗄️",
  color: "#6366f1",
  concepts: [
    {
      id: 908,
      name: "ACID Properties",
      desc: `**ACID** — the four guarantees that make database transactions reliable: **Atomicity** (all-or-nothing — a transaction either fully commits or fully rolls back), **Consistency** (every transaction moves the DB from one valid state to another), **Isolation** (concurrent transactions behave as if they ran serially), and **Durability** (committed data survives crashes).

Mental model: a bank transfer deducting $100 from account A and crediting account B must be atomic — you can't have the debit without the credit. Consistency ensures no balance goes negative if that's a rule. Isolation ensures two simultaneous transfers don't interfere. Durability means once the bank says "done," a power cut can't reverse it.

**Trade-off:** Full ACID compliance is expensive — isolation in particular requires locks or MVCC overhead. This is why distributed systems often relax it to BASE. Most relational databases (PostgreSQL, MySQL InnoDB) are ACID-compliant by default.

**Key insight:** Isolation is the most nuanced property — it has levels (READ UNCOMMITTED → SERIALIZABLE), each trading correctness for concurrency.`,
    },
    {
      id: 909,
      name: "BASE Properties",
      desc: `**BASE** — the alternative to ACID favored by distributed/NoSQL systems: **Basically Available** (the system remains operational even during failures), **Soft state** (the system's state may change over time, even without new inputs), and **Eventual Consistency** (given no new updates, all replicas will converge to the same value eventually).

Mental model: a social media "like" count doesn't need to be perfectly consistent across all data centers in real time — it's acceptable if different users see slightly different counts for a few milliseconds. The count eventually converges. This is BASE.

**When BASE is appropriate:** read-heavy workloads, global replication, high availability requirements where a few seconds of stale data is acceptable (DNS, shopping carts, social feeds). **Avoid BASE** for financial transactions, inventory management, or any "count must be exact" scenario.

**Key insight:** BASE is not "broken ACID" — it's a deliberate trade-off choosing availability over consistency in the CAP spectrum.`,
    },
    {
      id: 910,
      name: "CAP Theorem",
      desc: `**CAP Theorem** — Eric Brewer's proof that a distributed data store can only guarantee two of three properties simultaneously: **Consistency** (every read returns the most recent write), **Availability** (every request gets a non-error response), and **Partition Tolerance** (the system continues operating despite network partitions).

Mental model: in a distributed system, network failures (partitions) are unavoidable. So the real choice is: when a partition occurs, do you sacrifice Consistency (allow stale reads) or Availability (refuse to respond)? This yields CP systems (e.g., HBase, Zookeeper) and AP systems (e.g., Cassandra, CouchDB). CA systems exist only on a single machine.

**Common misunderstanding:** CAP is not a continuous dial — it applies only during a partition. Most of the time, distributed databases can provide both C and A. The CAP choice matters only in the failure scenario.

**Key insight:** CAP is frequently misapplied. PACELC extends it to also reason about latency vs consistency during normal operation, which is often more relevant.`,
    },
    {
      id: 911,
      name: "PACELC Theorem",
      desc: `**PACELC** — an extension of CAP that says: if there is a Partition (P), a system must choose between Availability (A) and Consistency (C); **Else** (E) during normal operation, it must choose between Latency (L) and Consistency (C).

Mental model: CAP only describes failure scenarios. PACELC adds the normal-operation trade-off — a globally distributed database can choose to acknowledge a write immediately (low latency, eventual consistency) or wait for all replicas to confirm (high latency, strong consistency). DynamoDB defaults to low latency (EL); Spanner chooses consistency (EC) and absorbs the latency cost.

**Why it matters:** Most operational decisions are not about handling failures but about tuning behavior during normal load. A real-time bidding system (PA/EL) has very different needs from a financial ledger (PC/EC).

**Key insight:** PACELC makes explicit what CAP glosses over — every distributed system makes a latency/consistency trade-off every second, not just during failures.`,
    },
    {
      id: 912,
      name: "Consistency Models",
      desc: `**Consistency models** — a spectrum of guarantees about the ordering and visibility of reads and writes across distributed replicas, ranging from strongest to weakest.

Key levels (strongest → weakest):
- **Linearizability / Strong consistency** — every read returns the latest committed write; operations appear instantaneous and in real-time order
- **Sequential consistency** — all processes see operations in the same order, but not necessarily real-time
- **Causal consistency** — causally related operations are seen in order; unrelated operations may differ across nodes
- **Eventual consistency** — all replicas converge to the same value given no new updates (the weakest useful guarantee)
- **Read-your-writes** — a client always sees its own writes immediately

**Key insight:** Most systems offer tunable consistency — Cassandra lets you set "QUORUM" or "ONE" per query, trading latency for freshness. Understanding which level your use case actually needs prevents over-engineering for strong consistency when eventual is fine (and vice versa).`,
    },
    {
      id: 913,
      name: "Transaction Isolation Levels",
      desc: `**Transaction isolation levels** — SQL standard defines four levels that trade concurrency for correctness, protecting against three read phenomena: dirty reads, non-repeatable reads, and phantom reads.

| Level | Dirty Read | Non-Repeatable Read | Phantom Read |
|---|---|---|---|
| READ UNCOMMITTED | possible | possible | possible |
| READ COMMITTED | prevented | possible | possible |
| REPEATABLE READ | prevented | prevented | possible |
| SERIALIZABLE | prevented | prevented | prevented |

**Dirty read:** reading uncommitted data from another transaction. **Non-repeatable read:** re-reading a row yields different data (another tx updated it). **Phantom read:** re-running a range query yields new rows (another tx inserted).

PostgreSQL's default is READ COMMITTED. MySQL InnoDB defaults to REPEATABLE READ. Full SERIALIZABLE is achieved via SSI (Serializable Snapshot Isolation) in modern databases — much cheaper than traditional lock-based serialization.

**Key insight:** Most applications run fine at READ COMMITTED. Choose SERIALIZABLE only when you need absolute correctness (financial reconciliation, inventory allocation).`,
    },
    {
      id: 914,
      name: "Database Indexing",
      desc: `**Database index** — a separate data structure that maintains a sorted pointer map from column values to row locations, enabling the database to find rows without scanning the entire table (O(log n) vs O(n)).

Mental model: a book's index lists topics and page numbers so you jump directly to the page rather than reading every page. A B-Tree index does the same for a column — binary search in the index, then direct row lookup.

**What indexing solves:** full table scans on large tables (millions of rows). A query "SELECT * FROM orders WHERE customer_id = 42" without an index reads every row. With an index on "customer_id", it jumps directly to matching rows.

**When NOT to index:**
- Columns with very low cardinality (boolean, status with 3 values) — index is larger than the benefit
- Tables with heavy write load — every INSERT/UPDATE/DELETE must update all indexes
- Small tables — full scan is often faster than index lookup + heap fetch

**Key insight:** The most impactful single database optimization is adding the right index. The second most impactful is removing wrong indexes that slow writes.`,
    },
    {
      id: 915,
      name: "Primary, Foreign & Surrogate Keys",
      desc: `**Primary key** — a column (or combination) that uniquely identifies each row in a table. Every table should have one; the database enforces uniqueness and creates an index automatically. **Foreign key** — a column that references the primary key of another table, enforcing referential integrity (no orphan records).

**Natural key vs surrogate key:** a natural key uses a real-world attribute (email, SSN) as the PK; a surrogate key is a system-generated identifier (UUID, auto-increment integer) with no business meaning. Surrogate keys are almost always better — natural keys change (email updates), leak information (sequential IDs reveal row count), and UUIDs work across distributed systems.

**UUID vs auto-increment:** auto-increment integers are compact and ordered (great for B-Tree index locality); UUIDs are globally unique but random — UUIDv4 causes index fragmentation. Use UUIDv7 (time-ordered) or ULID for distributed systems with B-Tree indexes.

**Key insight:** Use surrogate keys (ULID or UUIDv7 for distributed, bigserial for single-node) and add UNIQUE constraints on natural key columns separately.`,
    },
    {
      id: 916,
      name: "Database Normalization",
      desc: `**Normalization** — the process of organizing a relational database to eliminate data redundancy and update anomalies by decomposing tables into smaller, well-structured ones following a series of Normal Forms (NF).

Key normal forms:
- **1NF:** each column holds atomic values; no repeating groups
- **2NF:** 1NF + no partial dependencies (non-key columns depend on the whole PK, not part of it)
- **3NF:** 2NF + no transitive dependencies (non-key columns depend only on the PK, not on other non-key columns)
- **BCNF:** stricter 3NF — every determinant is a candidate key
- **4NF/5NF:** handle multi-valued and join dependencies (rarely needed in practice)

**When to normalize:** OLTP systems where write correctness matters — avoids anomalies where updating a value in one row leaves stale data in another.

**When to denormalize:** OLAP/analytics workloads where read speed matters more than write simplicity. Also necessary when join costs become a bottleneck.

**Key insight:** 3NF is the practical sweet spot for OLTP. Beyond BCNF, you're usually solving academic edge cases.`,
    },
    {
      id: 917,
      name: "Denormalization",
      desc: `**Denormalization** — intentionally introducing redundancy into a database schema by merging tables, duplicating columns, or pre-computing values to reduce join complexity and improve read performance.

Mental model: instead of joining "orders" and "customers" on every query, store "customer_name" directly in the "orders" table. Reads are fast; the trade-off is that if a customer changes their name, you must update it in both places.

**Common techniques:**
- Storing computed aggregates (total order count on user record)
- Duplicating lookup values (country name alongside country code)
- Pre-joining tables (wide flat table for analytics)
- Using JSON columns for infrequently-accessed nested data

**When to denormalize:**
- Read-heavy systems where join latency is measurable
- Analytics queries that aggregate millions of rows
- Document/NoSQL modeling where the query pattern is known upfront

**When NOT to denormalize:** when write consistency is critical and the data changes frequently. Stale denormalized data is a silent bug.

**Key insight:** Normalize first, denormalize with measurement. Premature denormalization is as harmful as premature optimization.`,
    },
  ],
};

export default dbFundamentals;
