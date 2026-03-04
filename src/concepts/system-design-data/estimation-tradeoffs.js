const estimationTradeoffs = {
  name: "Estimation & Trade-offs",
  icon: "⚖",
  color: "#8B5CF6",
  concepts: [
    {
      id: 147,
      name: "Back-of-Envelope Calculation",
      desc: "Rough math to validate system assumptions before designing. Use powers of 2 and round aggressively. 1M users × 1KB avg profile = 1GB; that fits in a single server's RAM — no distributed storage needed yet. The goal isn't precision but order-of-magnitude correctness. In system design interviews and real projects, these calculations drive architecture decisions: Do I need sharding? A CDN? How many servers?",
    },
    {
      id: 148,
      name: "Latency Numbers Every Engineer Should Know",
      desc: "Intuition for operation costs: L1 cache hit ~1ns; L2 cache ~4ns; RAM access ~100ns; SSD read ~100μs; HDD seek ~10ms; network round-trip same datacenter ~0.5ms; cross-country ~150ms; cross-ocean ~300ms. Key insight: RAM is 1000x faster than SSD, SSD is 100x faster than HDD, network is 1000x slower than RAM. Use these to evaluate whether a design decision adds acceptable latency.",
    },
    {
      id: 149,
      name: "QPS / Throughput Estimation",
      desc: "Queries Per Second = total_daily_requests / 86,400. Twitter: 300M users × 2 tweets/day = 600M tweets/day ÷ 86,400 ≈ 7,000 write QPS. Read QPS is often 10–100x writes. With 100:1 read/write ratio: 700,000 read QPS. Peak is typically 2–5x average. This tells you: how many servers, whether you need a read replica, whether caching is mandatory. Always estimate both average and peak QPS.",
    },
    {
      id: 150,
      name: "Storage Estimation",
      desc: "Total storage = records × record_size × replication_factor. Instagram: 1B users, avg 1 post/day, 500KB per photo = 500TB/day raw. × 3 replication = 1.5PB/day. Over 5 years = 2.7EB. This immediately tells you: you need distributed object storage (S3), tiered storage (hot/warm/cold), and aggressive compression. Storage estimates drive infrastructure choices — do you need your own datacenter or can cloud work?",
    },
    {
      id: 151,
      name: "Bandwidth Estimation",
      desc: "Ingress bandwidth = write_QPS × avg_payload_size. Egress bandwidth = read_QPS × avg_response_size. YouTube: 500 hours of video uploaded per minute. At 300MB per hour of video = 150GB/min ingress = 2.5GB/s incoming. Egress (1B views/day × 5min avg × 5Mbps streaming) = massive — that's why CDNs are mandatory. Bandwidth drives CDN strategy, peering agreements, and data transfer costs.",
    },
    {
      id: 152,
      name: "SLA / SLO / SLI Definitions",
      desc: "SLI (Service Level Indicator): the metric you measure (e.g., request success rate). SLO (Service Level Objective): the target you set internally (99.9% success rate). SLA (Service Level Agreement): the contractual commitment to customers, usually with financial penalties. The hierarchy: SLA ≥ SLO ≥ measured SLI. Error budget = 1 - SLO. At 99.9% SLO, you have 8.7 hours/year of allowed downtime. Spend it wisely — ship features vs. maintain reliability.",
    },
    {
      id: 153,
      name: "Capacity Planning",
      desc: "Predict future resource needs based on growth trends. Start with current utilization, project growth rate (users, data, QPS), add headroom (typically 20–30% buffer), determine when you'll hit capacity limits, then plan infrastructure changes before you need them. Rule: provision for 6–12 months ahead. Avoid reactive scaling (expensive, risky). Use auto-scaling for compute but plan storage and networking proactively.",
    },
    {
      id: 154,
      name: "Read/Write Ratio Analysis",
      desc: "Understanding your read-to-write ratio fundamentally changes architecture. Read-heavy (100:1 like Twitter): optimize for read performance — caching, read replicas, CDN, denormalization. Write-heavy (1:1 like logging): optimize for write throughput — LSM-tree DBs (Cassandra, RocksDB), write-ahead logs, append-only storage, batch writes. Mixed workloads may need separate read and write paths (CQRS). Profile your actual ratio before assuming.",
    },
    {
      id: 155,
      name: "Peak Load Estimation",
      desc: "Peak load is 2–10x your average load depending on domain. E-commerce: 10x on Black Friday. Social media: 2–3x during viral events. Sports apps: 50x during championship finals. Design for peak, not average — users care about performance during peaks. Use auto-scaling to handle peaks economically (pay only when needed) rather than permanently provisioning peak capacity (expensive). Load test at 150% of expected peak.",
    },
    {
      id: 156,
      name: "Cost-Performance Trade-off Analysis",
      desc: "Every architectural decision has a cost-performance curve. More replicas = better availability + higher cost. More cache = better latency + more RAM cost. Synchronous replication = stronger consistency + higher latency. Frame decisions as: 'We can achieve 99.99% availability for $X more per month, vs 99.9% availability at current cost.' Product decides the business value of that extra 9. Engineers quantify the cost of each reliability tier.",
    },
    {
      id: 157,
      name: "Database Sizing",
      desc: "Row count × avg row size = raw data size. Add 20–40% for indexes, overhead. MySQL: a table with 100M rows at 500 bytes avg = 50GB raw + indexes ≈ 70GB. PostgreSQL JSONB inflates 2–3x. Benchmark: MySQL handles ~1B rows well; beyond that, sharding becomes necessary. B-tree indexes grow with data — plan for index size explicitly. Monitor index-to-data ratio; bloated indexes kill write performance.",
    },
    {
      id: 158,
      name: "Little's Law",
      desc: "L = λW. In a stable system: L (number of items in the system) = λ (arrival rate) × W (average time in system). At 1,000 req/s with avg latency 200ms: L = 1000 × 0.2 = 200 concurrent requests in-flight. This tells you: thread pool size, connection pool size, in-memory state requirements. If latency increases, concurrency skyrockets. Little's Law is why latency spikes cause cascading failures — suddenly you need 10x the capacity.",
    },
  ],
};
export default estimationTradeoffs;
