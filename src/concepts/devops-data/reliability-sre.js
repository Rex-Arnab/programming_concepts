const reliabilitySre = {
  name: "Reliability & SRE",
  icon: "⛉",
  color: "#3A86FF",
  concepts: [
    { id: 140, name: "Site Reliability Engineering (SRE)", desc: "Google's approach to operations. Software engineering principles applied to infrastructure. Automate operations, manage reliability with error budgets." },
    { id: 141, name: "Incident Management", desc: "Process for detecting, responding to, and resolving production issues. Incident commander, communication channels, status pages, timelines." },
    { id: 142, name: "MTTR / MTTF / MTBF", desc: "MTTR: Mean Time to Recovery. MTTF: Mean Time to Failure. MTBF: Mean Time Between Failures. Key reliability metrics." },
    { id: 143, name: "Circuit Breaker Pattern", desc: "Stop calling a failing service after threshold breaches. States: closed (normal), open (failing, fast-fail), half-open (testing recovery)." },
    { id: 144, name: "Retry & Exponential Backoff", desc: "Retry failed requests with increasing delays plus jitter. Prevents thundering herd on recovering services. Standard in SDK clients." },
    { id: 145, name: "Rate Limiting & Throttling", desc: "Limiting request rates to protect services. Token bucket, sliding window algorithms. Applied at API gateway, service, or infrastructure level." },
    { id: 146, name: "Graceful Degradation", desc: "System continues with reduced functionality during partial failures. Serve cached data, disable non-critical features, show fallback content." },
    { id: 147, name: "Bulkhead Pattern", desc: "Isolate components into failure domains. One failing service doesn't exhaust shared resources. Like watertight compartments on a ship." },
    { id: 148, name: "Disaster Recovery (DR)", desc: "Strategies for catastrophic failures. Backup & restore, pilot light, warm standby, multi-site active-active. RTO and RPO define requirements." },
    { id: 149, name: "Backup Strategies", desc: "Full, incremental, differential backups. 3-2-1 rule: 3 copies, 2 media types, 1 offsite. Test restores regularly — untested backups are hopes." },
    { id: 150, name: "High Availability Patterns", desc: "Active-active, active-passive, multi-AZ, multi-region. Eliminate single points of failure at every layer. 99.99% requires automated failover." },
    { id: 151, name: "Capacity Planning", desc: "Forecasting resource needs based on growth, traffic patterns, and business projections. Prevent outages from insufficient capacity." },
    { id: 152, name: "GameDay / Fire Drills", desc: "Scheduled exercises simulating failures in production. Test incident response, runbooks, and team readiness. Practice makes prepared." },
  ],
};
export default reliabilitySre;
