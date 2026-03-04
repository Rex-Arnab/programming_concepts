const reliabilityResilience = {
  name: "Reliability & Resilience",
  icon: "⟡",
  color: "#FD79A8",
  concepts: [
    { id: 92, name: "Circuit Breaker Pattern", desc: "Stops calling a failing service after threshold. Prevents cascade failures. States: closed, open, half-open." },
    { id: 93, name: "Retry with Exponential Backoff", desc: "Retry failed requests with increasing delays (1s, 2s, 4s, 8s...). Add jitter to prevent thundering herd." },
    { id: 94, name: "Bulkhead Pattern", desc: "Isolate components so failure in one doesn't sink others. Like watertight compartments on a ship." },
    { id: 95, name: "Failover Strategies", desc: "Active-passive: standby takes over on failure. Active-active: both serve traffic. Hot, warm, cold standby." },
    { id: 96, name: "Health Checks & Heartbeats", desc: "Periodic signals to verify service liveness. Load balancers use these to route away from unhealthy nodes." },
    { id: 97, name: "Graceful Degradation", desc: "System continues with reduced functionality rather than total failure. Show cached data if DB is down." },
    { id: 98, name: "Chaos Engineering", desc: "Intentionally inject failures to test resilience (Netflix Chaos Monkey). Find weaknesses before users do." },
    { id: 99, name: "Redundancy", desc: "Duplicate critical components. No single point of failure. Applied at every layer: servers, databases, networks." },
  ],
};
export default reliabilityResilience;
