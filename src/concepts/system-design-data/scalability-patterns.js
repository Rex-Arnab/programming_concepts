const scalabilityPatterns = {
  name: "Scalability Patterns",
  icon: "⟐",
  color: "#6C5CE7",
  concepts: [
    { id: 85, name: "Horizontal vs Vertical Scaling", desc: "Vertical: bigger machine. Horizontal: more machines. Most large systems use horizontal scaling." },
    { id: 86, name: "Database Scaling Strategies", desc: "Read replicas, sharding, federation, caching layers. Often combined for optimal performance." },
    { id: 87, name: "Connection Pooling", desc: "Reuse database connections instead of creating new ones per request. Reduces overhead significantly." },
    { id: 88, name: "Autoscaling", desc: "Automatically adjusts compute resources based on demand. Scale out during peaks, scale in during lulls." },
    { id: 89, name: "Data Partitioning Strategies", desc: "Range-based, hash-based, list-based, composite. How data is split across shards/partitions." },
    { id: 90, name: "Batch Processing vs Stream Processing", desc: "Batch: process large datasets periodically (Spark, MapReduce). Stream: process data in real-time (Flink, Kafka Streams)." },
    { id: 91, name: "MapReduce", desc: "Programming model for parallel processing of large datasets. Map phase transforms, Reduce phase aggregates." },
  ],
};
export default scalabilityPatterns;
