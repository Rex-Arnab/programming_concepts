const dataModeling = {
  name: "Data Modeling & Schema Design",
  icon: "📐",
  color: "#f97316",
  concepts: [
    {
      id: 952,
      name: "Entity-Relationship (ER) Modeling",
      desc: `**ER Diagram** — a visual blueprint of a database schema showing entities (tables), their attributes (columns), and the relationships between them (one-to-one, one-to-many, many-to-many). Created before writing DDL; it's the architect's sketch before construction.

**Key notations:**
- **Crow's foot:** "one" end is a single line; "many" end is three lines (crow's foot); optionality is shown with a circle (zero) or bar (one)
- **Chen notation:** entities are rectangles, attributes are ovals, relationships are diamonds
- **UML class diagrams** are also used for database modeling

**Cardinality patterns:**
- **One-to-many:** a customer has many orders; "customer_id" FK on orders table
- **Many-to-many:** students and courses; resolved with a junction table (enrollments with student_id and course_id FKs)
- **One-to-one:** a user and a user_profile; usually the same table unless profile is optional/large

**Process:** identify entities → identify relationships and cardinality → identify attributes → identify identifying attributes (PKs) → translate to tables.

**Key insight:** 30 minutes on an ER diagram before writing SQL saves days of painful schema refactoring later. ER modeling forces you to think through edge cases (can a customer have zero orders? can an order exist without a customer?) before they become bugs.`,
    },
    {
      id: 953,
      name: "Normal Forms (1NF through BCNF)",
      desc: `**Normalization forms** — a progressive series of rules that decompose tables to eliminate redundancy and update anomalies. Each higher form is a superset of the previous.

**1NF (First Normal Form):**
- Each column holds atomic values (no comma-separated lists, no arrays)
- No repeating column groups (no "phone1, phone2, phone3" columns)
- Each row is uniquely identifiable (primary key exists)

**2NF (Second Normal Form):**
- Meets 1NF
- No partial dependencies: every non-key attribute depends on the entire primary key (only relevant with composite PKs)
- Example violation: an "order_items" table with PK (order_id, product_id) that also stores "product_name" — product_name depends only on product_id, not the full composite key

**3NF (Third Normal Form):**
- Meets 2NF
- No transitive dependencies: non-key columns don't depend on other non-key columns
- Example violation: "employees" table with "department_id" and "department_name" — department_name depends on department_id, not on employee_id

**BCNF (Boyce-Codd Normal Form):**
- Stricter 3NF: every functional determinant must be a candidate key
- Handles rare edge cases where 3NF tables still have anomalies with overlapping candidate keys

**Key insight:** 3NF is the practical target for OLTP. Going beyond BCNF solves theoretical problems that rarely appear in practice.`,
    },
    {
      id: 954,
      name: "Star Schema",
      desc: `**Star schema** — a dimensional modeling pattern for data warehouses where a central fact table is surrounded by denormalized dimension tables, forming a star shape. Invented by Ralph Kimball.

**Fact table:** stores measurable, quantitative data (events/transactions): "sales," "page_views," "transactions." Contains foreign keys to dimension tables and metric columns (amount, quantity, duration).

**Dimension tables:** describe the context of facts (who, what, where, when, why): "dim_customer," "dim_product," "dim_date," "dim_store." Denormalized — all attributes of a dimension in one table (customer_name, customer_email, customer_country all in "dim_customer").

**Why denormalized dimensions:** analytical queries join facts to many dimensions. Denormalized dimensions reduce join depth (one join per dimension instead of multiple joins through a normalized hierarchy).

**The "dim_date" table:** a pre-populated calendar table with day_of_week, is_holiday, fiscal_quarter, etc. — enables powerful date-based analytics without date functions.

**Star vs OLTP:** star schemas are intentionally denormalized (violating 3NF) because analytical workloads favor wide tables over normalized depth.

**Key insight:** The star schema's killer feature is its query simplicity — business analysts can understand and write queries against it without deep SQL expertise.`,
    },
    {
      id: 955,
      name: "Snowflake Schema",
      desc: `**Snowflake schema** — an extension of the star schema where dimension tables are further normalized into sub-dimensions, forming a snowflake-like branching structure. Example: "dim_product" splits into "dim_product," "dim_brand," and "dim_category."

**When snowflaking makes sense:**
- Very large dimension tables where duplication is costly
- Dimensions with well-defined hierarchies (country → region → city)
- When dimension attributes are updated frequently (normalizing reduces update scope)

**Star vs snowflake comparison:**
| Aspect | Star | Snowflake |
|---|---|---|
| Query complexity | Simple (fewer joins) | More complex (more joins) |
| Storage | More redundancy | Less redundancy |
| ETL complexity | Simpler loading | More complex loading |
| Query performance | Generally faster | Slower (more joins) |
| Maintenance | Harder to update | Easier to update dimensions |

**Modern data warehouses and the snowflake debate:** columnar storage (BigQuery, Snowflake, Redshift) is so fast at scanning and joining that the performance difference between star and snowflake is minimal. Many BI tools auto-generate snowflake joins.

**Key insight:** For most modern data warehouses, use a star schema — its simplicity benefits business users and analysts. Snowflake's normalization benefits (storage savings, easier dimension updates) are usually minor on columnar systems.`,
    },
    {
      id: 956,
      name: "Slowly Changing Dimensions (SCDs)",
      desc: `**Slowly Changing Dimension (SCD)** — a dimension attribute that changes over time, requiring a strategy to handle both current and historical values. Example: a customer's address or employment status changes, but you need to preserve historical data for accurate historical analysis.

**SCD Types:**
- **Type 0 (Retain):** never update; historical value is preserved (e.g., original signup date)
- **Type 1 (Overwrite):** overwrite the old value; no history preserved; simplest (e.g., typo correction in a name)
- **Type 2 (Add Row):** add a new row for each change with "effective_start_date," "effective_end_date," and "is_current" flag; preserves full history; most common for important dimensional changes
- **Type 3 (Add Column):** add a "previous_value" column; tracks only one prior state; simple but inflexible
- **Type 4 (Mini-Dimension):** fast-changing attributes separated into their own mini-dimension; prevents fact table joins on rapidly-changing attributes
- **Type 6 (Hybrid 1+2+3):** adds current value columns to a Type 2 row for query convenience

**SCD Type 2 example:** "dim_customer" with customer_id, name, city, "effective_from," "effective_to" (NULL = current). Historical sales analysis uses the SCD Type 2 row that was active at the time of the sale.

**Key insight:** SCD Type 2 is the workhorse of dimensional modeling. Without it, you can't accurately answer "what was the customer's region when they placed this order?"`,
    },
    {
      id: 957,
      name: "JSON/JSONB in SQL Databases",
      desc: `**JSON in PostgreSQL** — PostgreSQL offers two JSON types: "json" (stored as text, re-parsed on every access) and "jsonb" (stored as binary parse tree — faster for querying, supports indexing, deduplicates keys). "jsonb" is almost always the right choice.

**Querying JSONB:**
- "->" returns JSON: "data->'user'" returns a JSON object
- "->>" returns text: "data->>'email'" returns the email as text
- "#>>" for nested paths: "data#>>'{address,city}'"
- "@>" containment operator: "data @> '{"role": "admin"}'" — fast with GIN index
- "jsonb_array_elements()" to unnest arrays

**When to use JSONB columns:**
- Attributes that vary by entity type (products with different specs: a TV has screen_size, a book has isbn)
- Storing third-party API responses without a rigid schema
- Semi-structured data where only a few fields are queried

**When NOT to use JSONB:**
- Data you need to join or query frequently — use proper columns
- When every field is known and consistent — proper columns are faster, type-safe, and constrainable
- As a shortcut to avoid schema design (anti-pattern: putting everything in a JSONB column)

**Key insight:** JSONB in PostgreSQL lets you be pragmatic — use relational columns for structured, frequently-queried data, and JSONB for the variable or rarely-queried remainder. Don't make it an all-or-nothing choice.`,
    },
    {
      id: 958,
      name: "Event Sourcing Data Model",
      desc: `**Event sourcing** — a data modeling pattern where the state of an entity is derived by replaying a sequence of immutable events, rather than storing only the current state. Instead of "UPDATE balance = 500" you append "MoneyDeposited{amount: 200, timestamp: ...}."

**Anatomy:** an event store is an append-only log of typed events per entity (aggregate). Current state is computed by replaying events from the beginning (or from a snapshot). Snapshots are periodic checkpoints that prevent full replays from event 0.

**Advantages:**
- Complete audit trail: every state change is recorded with full context
- Time travel: replay events up to any point in time to see historical state
- Event-driven integration: events are naturally publishable to other services (Kafka)
- Bug recovery: if a bug processes events incorrectly, replay corrected logic over stored events

**Disadvantages:**
- Complex queries: "find all accounts with balance > 1000" requires projections (read models)
- Schema evolution: changing event schemas over years is hard
- Eventual consistency: read models (projections) may lag behind the event store

**CQRS (Command Query Responsibility Segregation)** is almost always paired with event sourcing — separate write models (commands emit events) from read models (projections of events, optimized for queries).

**Key insight:** Event sourcing is powerful for audit-heavy domains (banking, healthcare, e-commerce order lifecycle) but dramatically increases complexity. Use it only when the audit trail and time-travel capabilities justify the overhead.`,
    },
    {
      id: 959,
      name: "Database Sharding Strategies",
      desc: `**Database sharding** — horizontally partitioning data across multiple database instances (shards), each holding a subset of rows, so that no single instance handles all the data or traffic.

**Sharding strategies:**
- **Range-based:** partition by value range (shard 1: user_id 1-1M, shard 2: 1M-2M). Simple, but creates hot spots if data/access isn't evenly distributed (new users concentrate on the latest shard)
- **Hash-based:** "shard = hash(shard_key) % num_shards." Even distribution, but range queries span all shards. Adding shards requires resharding
- **Consistent hashing:** maps keys to a hash ring; adding/removing nodes only affects adjacent keys — minimizes data movement. Used by Cassandra, DynamoDB
- **Directory-based:** a lookup table maps keys to shards. Flexible, but the directory itself is a bottleneck/SPOF
- **Geographic:** route users to their regional shard (US data on US shards). Good for data residency; cross-shard queries are still expensive

**Sharding complications:**
- Cross-shard joins (must be done in the application layer)
- Cross-shard transactions (require 2PC or eventual consistency)
- Rebalancing when shards become uneven

**Key insight:** Shard at the application layer only as a last resort — it adds massive complexity. Prefer vertical scaling, read replicas, caching, and partitioning before sharding.`,
    },
    {
      id: 960,
      name: "Multi-Tenancy Patterns",
      desc: `**Multi-tenancy** — serving multiple customers (tenants) from a shared database infrastructure, where each tenant's data is logically or physically isolated from others.

**Three main patterns:**

**1. Shared database, shared schema:** all tenants share one table; a "tenant_id" column discriminates rows.
- Pros: cheapest, simplest to operate
- Cons: data isolation is only logical (a bug could expose cross-tenant data); one tenant's heavy queries affect others; harder to meet strict compliance requirements (HIPAA, SOC 2)

**2. Shared database, separate schemas:** each tenant gets their own schema (PostgreSQL schema = namespace) within one database; same tables, tenant-scoped.
- Pros: better isolation; can set schema-level permissions; easier data export per tenant
- Cons: schema migrations must run across all tenant schemas (N migrations per tenant); PostgreSQL limits: ~10k schemas per database is practical

**3. Database per tenant (siloed):** each tenant gets their own database instance.
- Pros: complete isolation; easy tenant data export/deletion; different infrastructure tiers for different tenant sizes
- Cons: expensive; complex provisioning; migrations must run on all databases; hard to do cross-tenant analytics

**Row-Level Security (RLS):** PostgreSQL's RLS lets you enforce "WHERE tenant_id = current_tenant_id()" at the database level — queries are automatically scoped, preventing cross-tenant data leaks.

**Key insight:** Start with shared schema + RLS for SaaS products. Move to database-per-tenant only for enterprise customers requiring strict isolation or for compliance mandates.`,
    },
    {
      id: 961,
      name: "Polymorphic Associations",
      desc: `**Polymorphic association** — a design pattern where a single foreign key column can reference rows in multiple different tables, with a "type" column indicating which table the FK points to. Example: a "comments" table where "commentable_id" and "commentable_type" can reference either a "posts" or "photos" row.

**Implementation:**
- "commentable_type: 'Post', commentable_id: 42" → references posts.id = 42
- "commentable_type: 'Photo', commentable_id: 17" → references photos.id = 17

**Why it's problematic:**
- Cannot enforce a database-level foreign key constraint (referential integrity is lost)
- Queries require a "WHERE type = 'Post'" + join on the posts table — two queries or a conditional join
- Reporting and analytics become complex
- Type column is a string — typos cause silent data corruption

**Better alternatives:**
- **Separate junction tables:** "post_comments" and "photo_comments" — proper FKs, type safety, query simplicity
- **Shared interface table:** create a "commentable" table with a PK, then posts and photos each have a FK to it
- **STI (Single Table Inheritance):** store all commentable types in one table with a type discriminator

**When polymorphic associations are acceptable:** in ORMs (Rails "has_many :comments, as: :commentable") for simple CRUD applications where referential integrity enforcement is handled at the application layer.

**Key insight:** Polymorphic associations trade database-level integrity for code convenience. In high-integrity systems, the convenience isn't worth the trade.`,
    },
  ],
};

export default dataModeling;
