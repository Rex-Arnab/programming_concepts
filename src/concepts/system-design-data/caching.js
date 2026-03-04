const caching = {
  name: "Caching",
  icon: "◈",
  color: "#E8A83A",
  concepts: [
    { id: 43, name: "Caching", desc: "Storing frequently accessed data in fast storage (RAM). Dramatically reduces latency and database load." },
    { id: 44, name: "Cache Invalidation", desc: "Keeping cache in sync with source. Strategies: write-through, write-back, write-around." },
    { id: 45, name: "Cache Eviction Policies", desc: "LRU (Least Recently Used), LFU (Least Frequently Used), FIFO, TTL-based. Decides what gets removed." },
    { id: 46, name: "Cache-Aside (Lazy Loading)", desc: "App checks cache first; on miss, reads DB then populates cache. Most common caching pattern." },
    { id: 47, name: "Write-Through Cache", desc: "Writes go to cache and DB simultaneously. Ensures consistency but adds write latency." },
    { id: 48, name: "Write-Back Cache", desc: "Writes go to cache first, DB updated asynchronously. Fast writes but risk of data loss." },
    { id: 49, name: "Distributed Cache", desc: "Cache spread across multiple nodes (Redis Cluster, Memcached). Handles scale beyond single machine." },
    { id: 50, name: "Cache Stampede / Thundering Herd", desc: "Many requests hit DB simultaneously when a popular cache key expires. Solved with locks or staggered TTLs." },
  ],
};
export default caching;
