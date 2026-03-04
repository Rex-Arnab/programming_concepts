const devopsOperations = {
  name: "DevOps & Operations",
  icon: "⟡",
  color: "#10B981",
  concepts: [
    { id: 127, name: "Containerization (Docker)", desc: "Package application with all dependencies into a container image. Consistent across environments. Dockerfile → build → run. Docker Compose for multi-container apps." },
    { id: 128, name: "Kubernetes (K8s)", desc: "Container orchestration: deployment, scaling, networking, self-healing. Pods, Deployments, Services, Ingress. The industry standard for production container management." },
    { id: 129, name: "CI/CD Pipelines", desc: "Automated workflow: commit → build → test → deploy. GitHub Actions, GitLab CI, Jenkins, CircleCI. Pipeline as code. Quality gates at every stage." },
    { id: 130, name: "Logging", desc: "Structured event records (JSON format). Centralize with ELK Stack, Loki, Datadog. Log levels: debug, info, warn, error, fatal. Correlation IDs across services." },
    { id: 131, name: "Monitoring & Alerting", desc: "Track system metrics: CPU, memory, request rate, error rate, latency. Prometheus + Grafana. Alert on anomalies. SLIs/SLOs/SLAs define targets." },
    { id: 132, name: "Distributed Tracing", desc: "Track requests across microservices. Each span represents a unit of work. Jaeger, Zipkin, Datadog APM. Trace ID propagated through headers. Find bottlenecks." },
    { id: 133, name: "OpenTelemetry", desc: "Vendor-neutral instrumentation standard. SDKs generate metrics, logs, and traces. Export to any backend (Datadog, New Relic, Grafana). Becoming the universal standard." },
    { id: 134, name: "Health Checks", desc: "Endpoints reporting service status. Liveness: is it alive? Readiness: can it accept traffic? Startup: has it initialized? K8s probes, load balancer health checks." },
    { id: 135, name: "Deployment Strategies", desc: "Rolling (gradual replacement), Blue-Green (two environments), Canary (small traffic percentage), Feature Flags (toggle features). Each trades speed for safety differently." },
    { id: 136, name: "Database Migration in Production", desc: "Schema changes must be backward-compatible. Expand-contract pattern: add new → migrate data → remove old. Never rename/delete columns directly. Online DDL tools." },
    { id: 137, name: "Infrastructure as Code (IaC)", desc: "Terraform, Pulumi, CloudFormation. Define infrastructure in versioned code. Reproducible, reviewable, auditable. Plan → apply workflow. Remote state management." },
    { id: 138, name: "Environment Management", desc: "Development → Staging → Production. Environment variables for config (12-factor). .env files (local only), secrets managers (production). Never hardcode environment-specific values." },
  ],
};
export default devopsOperations;
