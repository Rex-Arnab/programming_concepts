const observabilityOperations = {
  name: "Observability & Operations",
  icon: "◉",
  color: "#00CEC9",
  concepts: [
    { id: 100, name: "Logging", desc: "Record events and errors. Structured logging (JSON) enables analysis. Centralized with ELK stack or Datadog." },
    { id: 101, name: "Monitoring & Alerting", desc: "Track system metrics (CPU, memory, error rates). Alert on anomalies. Prometheus + Grafana is a common stack." },
    { id: 102, name: "Distributed Tracing", desc: "Track requests across microservices (Jaeger, Zipkin). Identifies latency bottlenecks in complex systems." },
    { id: 103, name: "Metrics (RED & USE Methods)", desc: "RED: Rate, Errors, Duration (for services). USE: Utilization, Saturation, Errors (for resources)." },
    { id: 104, name: "Blue-Green Deployment", desc: "Run two identical environments. Switch traffic from blue (old) to green (new). Instant rollback." },
    { id: 105, name: "Canary Deployment", desc: "Roll out changes to a small percentage of users first. Monitor, then expand. Reduces blast radius." },
    { id: 106, name: "Feature Flags", desc: "Toggle features on/off without deployment. Enable gradual rollouts, A/B testing, kill switches." },
  ],
};
export default observabilityOperations;
