const dataEngineering = {
  name: "Data Engineering & Pipelines",
  icon: "🔧",
  color: "#ef4444",
  concepts: [
    {
      id: 972,
      name: "What is Data Engineering",
      desc: `**Data engineering** — the discipline of designing, building, and operating the infrastructure and pipelines that move, transform, and store data so that it's available, reliable, and usable for analytics, ML, and business decision-making.

**Data engineers vs software engineers vs data scientists:**
- Software engineers build product features; they own the application database
- Data engineers build the "plumbing" — pipelines from source systems to analytical stores
- Data scientists build models and run analyses on the data the engineers provide

**Core responsibilities:**
- Ingest data from diverse sources (APIs, databases, files, event streams)
- Transform raw data into clean, structured, analysis-ready formats
- Build and maintain data pipelines with reliability, monitoring, and error handling
- Manage data warehouses, data lakes, and analytical infrastructure
- Ensure data quality, lineage, and documentation

**The data engineering stack (modern):**
- **Ingestion:** Fivetran, Airbyte, Debezium (CDC), Kafka
- **Storage:** Snowflake, BigQuery, Databricks (Delta Lake), S3/GCS
- **Transformation:** dbt, Spark, SQL-based transforms
- **Orchestration:** Airflow, Prefect, Dagster
- **Observability:** Great Expectations, Monte Carlo, dbt tests

**Key insight:** Data engineering is infrastructure engineering for data. The same reliability, maintainability, and observability principles that apply to software systems apply equally to data pipelines.`,
    },
    {
      id: 973,
      name: "ETL vs ELT",
      desc: `**ETL (Extract, Transform, Load)** — the traditional data pipeline pattern: extract data from sources, transform it to the target schema in a staging area (often a dedicated ETL server), then load the clean data into the warehouse.

**ELT (Extract, Load, Transform)** — the modern cloud-native pattern: extract data and load it raw into the data warehouse first, then transform it using the warehouse's own compute (SQL or Spark). Made possible by cheap, scalable cloud storage and powerful columnar compute (BigQuery, Snowflake, Redshift).

**ETL advantages:**
- Raw data never reaches the warehouse (compliance: sensitive fields can be masked before loading)
- Reduced warehouse storage costs (only clean data stored)
- Works with limited warehouse compute budgets

**ELT advantages:**
- Faster pipeline development (skip pre-transformation; transform incrementally as needs evolve)
- Raw data preserved for future re-transformation with different rules
- Better tooling (dbt enables SQL-based ELT with version control, testing, lineage)
- Leverage warehouse's MPP compute for transformation

**The rise of ELT:** tools like Fivetran (automated ingestion) and dbt (SQL transformation with software engineering practices) made ELT the dominant modern pattern. dbt in particular brought software engineering discipline (version control, testing, documentation) to SQL transformations.

**Key insight:** ELT + dbt is the de facto modern data stack. ETL is still appropriate for compliance-sensitive data (HIPAA, PII masking before landing in the warehouse).`,
    },
    {
      id: 974,
      name: "Data Pipeline Architecture",
      desc: `**Data pipeline** — a series of automated steps that move data from source systems to destination systems, with transformations applied along the way. Pipelines are the assembly line of data infrastructure.

**Pipeline layers (lambda-inspired):**
1. **Ingestion:** pull from source (API, DB, file) or receive pushed events (webhooks, Kafka)
2. **Raw/bronze layer:** store data as-is, exactly as received from the source (immutable, timestamped)
3. **Cleaned/silver layer:** deduplicated, typed, validated, and lightly transformed data
4. **Aggregated/gold layer:** business-logic-applied aggregations and joins, ready for consumption by BI tools and analysts

**Pipeline design principles:**
- **Idempotency:** running a pipeline twice produces the same result as running it once
- **Incremental loading:** process only new/changed data rather than full reloads (use "updated_at" watermarks or CDC)
- **Backfill capability:** able to reprocess historical data when logic changes
- **Observability:** every pipeline run logs row counts, timing, and errors; alerts on anomalies

**Common failure modes:**
- Schema changes in source systems silently break downstream pipelines
- Missing data (source system had downtime) creates data gaps
- Duplicate data from reprocessing without deduplication

**Key insight:** The most important pipeline property is idempotency — if a pipeline can safely be re-run without producing duplicates or data loss, debugging and recovery become dramatically simpler.`,
    },
    {
      id: 975,
      name: "Apache Airflow",
      desc: `**Apache Airflow** — the most widely used open-source workflow orchestration platform for data pipelines. Pipelines are defined as DAGs (Directed Acyclic Graphs) of tasks in Python, scheduled and monitored via a web UI.

**Core concepts:**
- **DAG:** a Python file defining a directed acyclic graph of tasks with dependencies; the "what and in what order"
- **Task / Operator:** a single unit of work (BashOperator, PythonOperator, SparkSubmitOperator, BigQueryOperator)
- **Sensor:** waits for an external condition (file exists, upstream API returns data)
- **Hook:** interface to external systems (PostgreSQL, S3, GCP)
- **Scheduler:** parses DAGs, determines what tasks are ready to run, and schedules them
- **Executor:** runs tasks (LocalExecutor, CeleryExecutor, KubernetesExecutor)

**Strengths:**
- Rich UI for monitoring DAG runs, task status, logs, and backfill
- Massive ecosystem of operators and providers
- Powerful dependency management and conditional task execution
- Mature, battle-tested at Airbnb, LinkedIn, and thousands of companies

**Weaknesses:**
- Python DAG definitions are verbose and have a steep learning curve
- Dynamic DAGs (varying structure based on data) are cumbersome
- Scheduler performance degrades with thousands of DAGs
- Not designed for streaming or event-driven pipelines

**Alternatives:** Prefect (code-first, less boilerplate), Dagster (asset-centric, built-in data quality), Temporal (general-purpose workflows), Mage (notebook-native).

**Key insight:** Airflow's "schedule_interval" + "catchup=True" enables powerful backfill — if your pipeline was down for a week, Airflow will automatically run all missed intervals when it comes back up.`,
    },
    {
      id: 976,
      name: "dbt (Data Build Tool)",
      desc: `**dbt** — a SQL-first transformation tool that brings software engineering practices to data transformation. Write SQL SELECT statements; dbt handles dependency resolution, testing, documentation, and lineage. The "T" in ELT.

**Core concepts:**
- **Models:** SQL SELECT files in "models/" directory. dbt compiles them to "CREATE TABLE AS SELECT" or "CREATE VIEW AS SELECT" DDL statements and runs them in the correct dependency order
- **Refs:** "{{ ref('stg_orders') }}" creates a dependency between models and compiles to the correct schema/table name across environments
- **Sources:** "{{ source('raw', 'orders') }}" references raw data with freshness testing
- **Tests:** "not_null," "unique," "accepted_values," "relationships" — run with "dbt test"
- **Seeds:** CSV files loaded as reference tables
- **Macros:** Jinja2 templating for reusable SQL patterns

**dbt advantages:**
- Version control for SQL transformations (Git-native)
- Automatic lineage graph (dependency visualization)
- Column-level documentation in YAML files
- Environment promotion (dev → staging → prod) via target profiles
- "dbt docs generate" creates a searchable data catalog

**dbt Cloud vs dbt Core:** Core is open-source CLI; Cloud adds managed scheduling, CI/CD, IDE, and collaboration features.

**Key insight:** dbt transformed data transformation from undocumented spaghetti SQL scripts into maintainable, tested, version-controlled software. It's now the default transformation layer in the modern data stack.`,
    },
    {
      id: 977,
      name: "Change Data Capture (CDC)",
      desc: `**Change Data Capture (CDC)** — the technique of tracking and publishing every row-level change (INSERT, UPDATE, DELETE) in a database as an event stream, enabling real-time replication, event-driven pipelines, and data synchronization without polling.

**How it works (PostgreSQL logical replication):**
- PostgreSQL writes every data change to the WAL (Write-Ahead Log)
- CDC tools (Debezium, Airbyte) connect as a logical replication slot and read the WAL stream
- Each change is published as a structured event: "{op: 'c', table: 'orders', new: {...}}"
- Events are typically published to Kafka, then consumed by downstream systems

**CDC vs polling:** polling runs "SELECT * FROM orders WHERE updated_at > last_run" periodically — misses deletes, has latency equal to poll interval, adds load to the source database. CDC is event-driven, captures all change types, and typically has sub-second latency.

**Use cases:**
- Real-time data warehouse sync (Debezium → Kafka → Snowflake)
- Cache invalidation: update Redis when a database row changes
- Microservice event sourcing: publish domain events derived from DB changes
- Audit logging: capture every change for compliance

**Tools:** Debezium (open-source, Kafka-native), AWS DMS, Airbyte (CDC source), Fivetran (managed CDC).

**Key insight:** CDC is the most efficient and complete way to replicate data from operational databases — it's how modern data platforms achieve real-time analytics without hammering the production database with polling queries.`,
    },
    {
      id: 978,
      name: "Stream vs Batch Processing",
      desc: `**Batch processing** — processes data in discrete, large chunks on a schedule (hourly, daily): collect all the day's orders, then compute totals. Simple to implement, predictable resource usage, but introduces latency equal to the batch interval.

**Stream processing** — processes data record-by-record as it arrives, with latency measured in milliseconds to seconds. Enables real-time analytics, fraud detection, live dashboards, and event-driven actions.

**When to use batch:**
- Daily/weekly reports that don't need real-time data
- Heavy ML model training (train once nightly)
- ETL from source systems that don't support streaming
- Large aggregations over historical data (full re-computations)

**When to use streaming:**
- Fraud detection (act within milliseconds of a suspicious transaction)
- Real-time personalization (update user recommendations as they browse)
- Alerting (notify on-call engineer when error rate spikes)
- Live dashboards and leaderboards

**Micro-batch:** a middle ground — buffer events for a few seconds, then process the mini-batch. Spark Structured Streaming and Kafka Streams use micro-batch internally. Lower complexity than true streaming at the cost of slightly higher latency (1-5 seconds).

**Key insight:** Most "real-time" business requirements are actually satisfied by micro-batch processing with 5-30 second latency — true streaming adds significant complexity and is only justified for millisecond-latency requirements.`,
    },
    {
      id: 979,
      name: "Data Quality & Validation",
      desc: `**Data quality** — the degree to which data is accurate, complete, consistent, timely, and valid for its intended use. Poor data quality is the silent killer of data products — dashboards showing wrong numbers, ML models trained on garbage data, and business decisions made on incorrect reports.

**Data quality dimensions:**
- **Accuracy:** values correctly represent the real world (no data entry errors)
- **Completeness:** no missing values where values are expected
- **Consistency:** same values across systems that should agree (order count in Salesforce matches the data warehouse)
- **Timeliness:** data arrives within expected freshness windows
- **Validity:** values conform to expected types, formats, and ranges

**Data validation in practice:**
- **dbt tests:** "not_null," "unique," "accepted_values," "relationships" — run per model as part of CI/CD
- **Great Expectations:** Python library for defining "expectations" (assertions) about data and generating validation reports
- **Soda:** SQL-based data quality checks with scheduling and alerting
- **Anomaly detection:** statistical alerts when a metric deviates significantly from historical norms (Monte Carlo, Bigeye)

**Data SLAs:** just as services have uptime SLAs, data pipelines should have freshness SLAs (e.g., "the daily revenue report is available by 6 AM with data through midnight, with >99% row completeness").

**Key insight:** Data quality checks should be treated like unit tests — automated, run on every pipeline execution, and blocking promotion to production when they fail.`,
    },
    {
      id: 980,
      name: "Data Lineage",
      desc: `**Data lineage** — the ability to trace a piece of data's origin (source system), transformations (what operations were applied), and destination (where it's consumed), creating a full provenance chain for every field in every dataset.

**Why lineage matters:**
- **Impact analysis:** "if I change this source table, what downstream models and dashboards break?"
- **Debugging:** "why does this revenue number differ from last week? What changed in the transformation?"
- **Compliance:** GDPR "right to erasure" requires knowing everywhere a user's data is stored and transformed
- **Trust:** analysts trust data more when they can see how it was derived

**Tools:**
- **dbt lineage graph:** auto-generated from "{{ ref() }}" dependencies; shows model-to-model flow
- **OpenLineage:** open standard for lineage metadata (Marquez is the reference server)
- **Apache Atlas:** enterprise metadata and lineage for Hadoop/Hive/Spark ecosystems
- **DataHub (LinkedIn):** comprehensive data catalog with lineage, schema history, and ownership
- **Alation, Collibra:** enterprise data catalogs with lineage

**Column-level lineage:** knowing that "revenue.net_amount" is derived from "orders.total" - "refunds.amount" is more useful than table-level lineage but harder to capture (requires parsing SQL ASTs).

**Key insight:** Table-level lineage is achievable with dbt for free. Column-level lineage requires more sophisticated tooling but is worth the investment for complex, high-stakes analytical pipelines.`,
    },
    {
      id: 981,
      name: "Metadata Management",
      desc: `**Metadata management** — the practice of systematically capturing, storing, and providing access to metadata: data about data. This includes technical metadata (schemas, row counts, data types), business metadata (descriptions, owners, definitions), and operational metadata (pipeline run history, freshness timestamps).

**Types of metadata:**
- **Technical metadata:** schema definitions, column types, nullable flags, index definitions
- **Business metadata:** friendly column descriptions ("mrr = Monthly Recurring Revenue = sum of active subscription amounts"), business owners, data stewards
- **Operational metadata:** last pipeline run time, row count, data freshness, quality check results
- **Social metadata:** who queries this table, who owns it, related tables

**Data catalog:** a searchable inventory of all data assets in an organization — tables, pipelines, dashboards, ML models. Makes data discoverable.

**Tools:**
- **DataHub** (LinkedIn, open-source): highly extensible catalog with lineage and governance
- **Apache Atlas** (Hadoop ecosystem)
- **dbt docs:** simple auto-generated documentation from YAML descriptions
- **Alation, Collibra:** enterprise-grade with governance workflows

**The "undiscoverable data" problem:** data teams often recreate work because they can't find existing datasets. A good catalog reduces redundant ETL and analysis work significantly.

**Key insight:** A data catalog is the "README" for your data warehouse. Without it, data teams spend 20-30% of their time searching for data and validating it — time that could be spent on analysis.`,
    },
    {
      id: 982,
      name: "Data Contracts",
      desc: `**Data contract** — a formal agreement between data producers (a team that owns a source table or event stream) and data consumers (downstream pipelines, analytics teams) about the schema, semantics, freshness, and quality guarantees of a dataset.

**What a data contract specifies:**
- Schema: column names, types, nullable/required, constraints
- Semantics: what each field means (business definitions)
- SLAs: freshness guarantees (data available by 6 AM), completeness thresholds
- Breaking change policy: how schema changes are communicated and versioned
- Owner: who to contact if something breaks

**Why data contracts exist:** without contracts, data producers change schemas without notifying consumers, breaking downstream pipelines silently. Contracts shift this from "who broke it?" to "we agreed on this, here's how to evolve it."

**Implementation:**
- YAML-defined schemas (Great Expectations, dbt schema.yml, Protobuf, Avro schemas)
- Schema registry (Confluent Schema Registry for Kafka ensures Avro/Protobuf schema compatibility)
- CI/CD validation: consumers' pipelines run against the contract; breaking changes fail CI

**Data mesh connection:** data contracts are a core governance mechanism in the data mesh paradigm — data product teams own their data and publish contracts that downstream consumers can rely on.

**Key insight:** Data contracts prevent the most common and painful class of data engineering failures — silent schema changes that break downstream pipelines hours or days after the fact.`,
    },
    {
      id: 983,
      name: "Reverse ETL",
      desc: `**Reverse ETL** — the process of moving data from a data warehouse back into operational systems (CRMs, marketing tools, customer success platforms), making analytics-derived insights actionable in the tools business teams use daily.

**The problem it solves:** a data warehouse might compute that "customer health score" or "propensity to churn," but this insight sits locked in BigQuery/Snowflake. The sales team uses Salesforce; the support team uses Zendesk. Reverse ETL syncs those computed metrics back into the operational tools.

**Classic reverse ETL use cases:**
- Sync customer LTV (lifetime value) from the data warehouse to Salesforce (so sales reps see it on the account)
- Push "users likely to churn" segment from BigQuery to HubSpot for targeted campaigns
- Sync cohort membership from the warehouse to an email platform for personalized sequences
- Populate a customer-facing dashboard with warehouse-computed metrics

**Tools:** Census, Hightouch, Polytouch, Grouparoo (open-source, acquired by Census).

**Reverse ETL vs CDP (Customer Data Platform):** CDPs (Segment, RudderStack) collect event data and route it to tools. Reverse ETL takes computed analytics data from the warehouse and pushes it to tools. They're complementary.

**Key insight:** Reverse ETL closes the loop between analytics and action — it's what transforms a data warehouse from a "reporting destination" into an "operational intelligence platform."`,
    },
  ],
};

export default dataEngineering;
