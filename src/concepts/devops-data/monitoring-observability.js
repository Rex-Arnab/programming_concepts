const monitoringObservability = {
  name: "Monitoring & Observability",
  icon: "◉",
  color: "#F72585",
  concepts: [
    { id: 81, name: "Observability (Three Pillars)", desc: "Logs + Metrics + Traces. Together they let you understand what's happening inside your systems. Ask arbitrary questions about system state." },
    { id: 82, name: "Metrics", desc: "Numerical measurements over time: CPU usage, request rate, error rate, latency percentiles. Time-series data. Prometheus, Datadog, CloudWatch." },
    { id: 83, name: "Logging", desc: "Structured event records. Centralize with ELK (Elasticsearch, Logstash, Kibana), Loki + Grafana, Datadog, Splunk. Structured JSON logs preferred." },
    { id: 84, name: "Distributed Tracing", desc: "Tracking requests across microservices. Each span represents a unit of work. Jaeger, Zipkin, AWS X-Ray, Datadog APM. Find latency bottlenecks." },
    { id: 85, name: "OpenTelemetry (OTel)", desc: "Vendor-neutral standard for generating metrics, logs, and traces. SDKs for every major language. Becoming the industry default for instrumentation." },
    { id: 86, name: "Prometheus", desc: "Open-source metrics monitoring system. Pull-based model, PromQL query language, alert rules. De facto standard for Kubernetes monitoring." },
    { id: 87, name: "Grafana", desc: "Visualization platform for metrics, logs, and traces. Dashboards for Prometheus, Loki, Tempo, CloudWatch, and 100+ data sources." },
    { id: 88, name: "Alerting & On-Call", desc: "Notifications when metrics breach thresholds. PagerDuty, OpsGenie, VictorOps for on-call rotation. Avoid alert fatigue with good thresholds." },
    { id: 89, name: "SLIs, SLOs, SLAs", desc: "SLI: metric (e.g., 99.5% requests < 200ms). SLO: target for SLI. SLA: contractual agreement with consequences. SRE foundation." },
    { id: 90, name: "Error Budgets", desc: "Allowed amount of unreliability (100% - SLO). If error budget is exhausted, freeze feature releases and focus on reliability." },
    { id: 91, name: "Synthetic Monitoring", desc: "Simulated user interactions to test availability and performance. Pingdom, Datadog Synthetics. Catches issues before real users do." },
    { id: 92, name: "Real User Monitoring (RUM)", desc: "Tracking actual user experience in browsers/apps. Page load times, JS errors, Core Web Vitals. Complements synthetic monitoring." },
    { id: 93, name: "APM (Application Performance Monitoring)", desc: "Deep visibility into application internals: method-level timing, database queries, external calls. New Relic, Datadog APM, Dynatrace." },
    { id: 94, name: "Log Aggregation", desc: "Collecting logs from all services into a central system. ELK Stack, Loki, Splunk, Datadog. Enables searching, correlating, and alerting." },
    { id: 95, name: "Health Checks & Liveness/Readiness Probes", desc: "Liveness: is the process alive? (restart if not). Readiness: can it accept traffic? (remove from LB if not). K8s native concept." },
    { id: 96, name: "Runbooks & Playbooks", desc: "Documented step-by-step procedures for handling incidents. Automate where possible. Reduce MTTR and remove dependency on tribal knowledge." },
  ],
};
export default monitoringObservability;
