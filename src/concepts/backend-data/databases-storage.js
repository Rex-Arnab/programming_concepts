const databasesStorage = {
  name: "Databases & Storage",
  icon: "◈",
  color: "#8B5CF6",
  concepts: [
    { id: 41, name: "Relational Databases (SQL)", desc: "Structured data in tables with rows and columns. ACID transactions. SQL query language. PostgreSQL, MySQL, SQLite, SQL Server. Best for structured, relational data." },
    { id: 42, name: "PostgreSQL", desc: "Advanced open-source relational DB. JSONB, full-text search, extensions (PostGIS, pgvector), CTEs, window functions, LISTEN/NOTIFY. The default backend choice." },
    { id: 43, name: "MySQL / MariaDB", desc: "Most deployed open-source database. InnoDB engine (ACID), replication, partitioning. MariaDB: community fork with additional features. WordPress, many web apps." },
    { id: 44, name: "SQLite", desc: "Embedded file-based database. Zero configuration, serverless. Single-file storage. Perfect for mobile apps, CLI tools, edge computing, development. Turso for distributed SQLite." },
    { id: 45, name: "NoSQL Databases (Overview)", desc: "Non-relational databases optimized for specific access patterns. Document (MongoDB), Key-Value (Redis), Column-Family (Cassandra), Graph (Neo4j). Schema-flexible." },
    { id: 46, name: "MongoDB", desc: "Document database storing BSON (binary JSON). Flexible schema, horizontal scaling, aggregation pipeline, change streams. Atlas for managed hosting. Most popular NoSQL." },
    { id: 47, name: "Redis", desc: "In-memory key-value store. Strings, hashes, lists, sets, sorted sets, streams. Caching, sessions, queues, pub/sub, rate limiting. Sub-millisecond latency." },
    { id: 48, name: "Cassandra / ScyllaDB", desc: "Wide-column store for massive scale. No single point of failure. Tunable consistency. Time-series, IoT, high-write workloads. ScyllaDB: C++ rewrite, 10x faster." },
    { id: 49, name: "DynamoDB", desc: "AWS managed key-value/document DB. Single-digit millisecond latency at any scale. On-demand or provisioned capacity. DAX for caching. Global tables for multi-region." },
    { id: 50, name: "Elasticsearch / OpenSearch", desc: "Distributed search and analytics engine. Full-text search, fuzzy matching, aggregations, geo queries. ELK stack for logging. OpenSearch is the AWS fork." },
    { id: 51, name: "Neo4j (Graph Database)", desc: "Stores data as nodes and relationships. Cypher query language. Social networks, recommendation engines, fraud detection, knowledge graphs. Relationship-first queries." },
    { id: 52, name: "Vector Databases", desc: "Store and query high-dimensional embeddings. Similarity search for AI/ML: semantic search, RAG, recommendations. Pinecone, Weaviate, Milvus, pgvector." },
    { id: 53, name: "Time-Series Databases", desc: "Optimized for timestamped data. InfluxDB, TimescaleDB (PostgreSQL extension), QuestDB. Metrics, IoT sensors, financial data. Built-in downsampling and retention." },
    { id: 54, name: "Object Storage (S3)", desc: "Store unstructured data (files, images, videos, backups) as objects. S3, GCS, MinIO. Virtually unlimited, cheap. Not a filesystem — key-value with metadata." },
    { id: 55, name: "NewSQL Databases", desc: "SQL databases with NoSQL scalability. CockroachDB, TiDB, YugabyteDB, Spanner. Distributed ACID transactions. Horizontal scaling without sacrificing consistency." },
  ],
};
export default databasesStorage;
