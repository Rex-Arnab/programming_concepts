const caching = {
  name: "Caching",
  icon: "⬣",
  color: "#F59E0B",
  concepts: [
    { id: 89, name: "Caching Strategies Overview", desc: "Store frequently accessed data in fast storage to reduce latency and database load. Decide: what to cache, where, how long, and how to invalidate." },
    { id: 90, name: "Cache-Aside (Lazy Loading)", desc: "Application checks cache first. On miss: read from DB, write to cache. Most common pattern. Cache only what's requested. Cold cache on startup." },
    { id: 91, name: "Write-Through Cache", desc: "Write to cache and DB simultaneously. Cache is always consistent. Higher write latency but simpler reads. Good for read-heavy data that's written occasionally." },
    { id: 92, name: "Write-Behind (Write-Back)", desc: "Write to cache first, asynchronously flush to DB. Fastest writes but risk data loss if cache fails before flush. Buffer writes for batch DB operations." },
    { id: 93, name: "Read-Through Cache", desc: "Cache itself handles DB reads on miss. Application always reads from cache. Cache layer encapsulates data source. Simplifies application code." },
    { id: 94, name: "Cache Invalidation", desc: "'Only two hard things: cache invalidation and naming things.' TTL-based, event-based (publish on write), version-based. Stale data is the primary risk." },
    { id: 95, name: "Cache Eviction Policies", desc: "LRU (Least Recently Used), LFU (Least Frequently Used), FIFO, Random, TTL-based. LRU is the most common default. Redis supports multiple policies." },
    { id: 96, name: "CDN Caching", desc: "Cache responses at edge locations. Cache-Control headers: max-age, s-maxage, stale-while-revalidate. Surrogate-Key for targeted invalidation. Cloudflare, Fastly, CloudFront." },
    { id: 97, name: "HTTP Caching", desc: "Browser and proxy caching via headers. Cache-Control, ETag, Last-Modified, Vary. 304 Not Modified for conditional requests. Reduces server load and latency." },
    { id: 98, name: "Distributed Cache (Redis Cluster)", desc: "Cache spread across multiple nodes. Redis Cluster: automatic sharding, failover. Memcached: simpler, multi-threaded. Scales beyond single-machine memory limits." },
    { id: 99, name: "Cache Stampede / Thundering Herd", desc: "Many requests hit DB simultaneously when a popular cache key expires. Solutions: locking (single recompute), probabilistic early expiry, stale-while-revalidate." },
    { id: 100, name: "Application-Level Caching", desc: "In-memory caches within the application process. Node-cache, Guava Cache, functools.lru_cache. Zero network latency. Lost on restart. Good for computed values." },
    { id: 101, name: "Memoization", desc: "Caching function results based on arguments. Avoid recomputing expensive operations. In-memory, per-request, or persistent. Redis for shared memoization across instances." },
  ],
};
export default caching;
