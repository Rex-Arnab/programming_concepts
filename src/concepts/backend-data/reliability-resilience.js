const reliabilityResilience = {
  name: "Reliability & Resilience",
  icon: "⛉",
  color: "#0EA5E9",
  concepts: [
    { id: 151, name: "Retry with Exponential Backoff", desc: "Retry failed requests with increasing delays (1s, 2s, 4s, 8s) plus random jitter. Prevents thundering herd on recovering services. Set max retries and timeout." },
    { id: 152, name: "Timeouts", desc: "Always set timeouts for external calls: HTTP requests, DB queries, cache operations. Connection timeout + read timeout. Fail fast rather than hang indefinitely." },
    { id: 153, name: "Graceful Degradation", desc: "System continues with reduced functionality during failures. Serve cached data if DB is down. Disable recommendations if ML service fails. Feature flags help." },
    { id: 154, name: "Failover Strategies", desc: "Active-passive: standby takes over on failure. Active-active: both serve traffic, share load. DNS failover, database failover, multi-region failover." },
    { id: 155, name: "Data Backup Strategies", desc: "Full, incremental, differential backups. 3-2-1 rule: 3 copies, 2 media types, 1 offsite. Point-in-time recovery (PITR). Test restores regularly." },
    { id: 156, name: "Chaos Engineering", desc: "Intentionally inject failures to test resilience. Kill processes, inject latency, simulate outages. Netflix Chaos Monkey, Gremlin. Build confidence in production systems." },
    { id: 157, name: "Error Handling Patterns", desc: "Return meaningful error responses: status code, error code, message, details. Never expose internal errors to clients. Log full stack trace server-side." },
    { id: 158, name: "Distributed Transactions", desc: "Transactions spanning multiple services. Two-Phase Commit (2PC): prepare → commit. Saga pattern: local transactions + compensation. Avoid 2PC when possible — use sagas." },
    { id: 159, name: "Consistency Models", desc: "Strong: read always returns latest write. Eventual: reads eventually catch up. Causal: respects cause-and-effect ordering. Read-your-writes: see your own changes immediately." },
    { id: 160, name: "CAP Theorem", desc: "Distributed systems guarantee only 2 of 3: Consistency, Availability, Partition Tolerance. Since partitions happen, choose CP (consistent) or AP (available). PACELC extends this." },
  ],
};
export default reliabilityResilience;
