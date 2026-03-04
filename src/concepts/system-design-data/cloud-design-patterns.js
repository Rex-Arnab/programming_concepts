const cloudDesignPatterns = {
  name: "Cloud Design Patterns",
  icon: "☁",
  color: "#0EA5E9",
  concepts: [
    {
      id: 121,
      name: "Ambassador Pattern",
      desc: "Deploy a helper service alongside your main app to handle cross-cutting network concerns: retries, circuit breaking, logging, TLS termination. Like a diplomatic ambassador who speaks the local language on your behalf — your service speaks only business logic while the ambassador handles the messy protocol details. Heavily used in service meshes (Envoy, Linkerd).",
    },
    {
      id: 122,
      name: "Anti-Corruption Layer (ACL)",
      desc: "A translation layer that isolates your clean domain model from a messy legacy system or third-party API. When integrating with an old monolith or external vendor, the ACL translates their weird types and concepts into your domain's language — so their chaos never leaks into your code. DDD's answer to the 'the legacy system will eat us alive' problem.",
    },
    {
      id: 123,
      name: "Bulkhead Pattern",
      desc: "Isolate resources (thread pools, connection pools, queues) per downstream service. Named after ship compartments — if one floods, the others stay dry. Without bulkheads, a slow downstream service can exhaust your thread pool and bring down your entire app. With them, only that service's compartment floods. Essential for microservices resilience.",
    },
    {
      id: 124,
      name: "Claim Check Pattern",
      desc: "When a message payload is large (images, documents, big JSON), store it in cheap blob storage (S3, GCS) and pass only a reference token (the 'claim check') through your message queue. Avoids message size limits (Kafka: 1MB default, SQS: 256KB), reduces queue costs, and keeps your messaging infrastructure fast. Retrieve the full payload only when needed.",
    },
    {
      id: 125,
      name: "Competing Consumers",
      desc: "Multiple worker instances consume from the same queue in parallel — whoever grabs a message first processes it. Enables horizontal scaling of work processing without coordination: add more consumers to handle load spikes, remove them to save cost. The pattern behind worker pools in Celery, Sidekiq, and SQS-based systems. Consumer count ≈ your throughput knob.",
    },
    {
      id: 126,
      name: "Compensating Transaction",
      desc: "When you can't use ACID transactions across services, compensating transactions undo previously completed steps upon failure. Step 3 fails? Execute compensating actions for steps 2 and 1. The undo log of distributed systems. Used in Saga patterns: each step has a corresponding compensating action that reverses its effect. Tricky to implement correctly — idempotency is required.",
    },
    {
      id: 127,
      name: "Gatekeeper Pattern",
      desc: "A dedicated service validates, sanitizes, and authenticates all incoming requests before forwarding to backend services. Acts as a security checkpoint — backends trust only the gatekeeper, never raw internet traffic. Different from an API Gateway in emphasis: the Gatekeeper focuses specifically on security validation, not routing. Reduces attack surface dramatically.",
    },
    {
      id: 128,
      name: "Priority Queue",
      desc: "Route high-priority work ahead of low-priority work using separate queues with differentiated consumers. Pro plan users get processed before free users; critical alerts before routine reports. Implementation: multiple queues (high/medium/low) with more consumers assigned to higher-priority queues, or a single priority-aware queue (e.g., RabbitMQ priority queues). Prevents SLA violations during load spikes.",
    },
    {
      id: 129,
      name: "Queue-Based Load Leveling",
      desc: "Place a queue between a producer and a consumer to absorb traffic spikes. Instead of overwhelming your service with sudden bursts, requests queue up and are processed at a steady rate. Classic Black Friday pattern: order requests pile up in SQS, processors work through them sustainably. Decouples throughput from burst capacity. Queue depth = your backlog visibility.",
    },
    {
      id: 130,
      name: "Retry Pattern",
      desc: "Automatically retry transient failures with exponential backoff and jitter. Transient faults (network blips, rate limits, temporary unavailability) often self-resolve. Without retries, you fail fast unnecessarily. Without jitter, all retries arrive simultaneously causing retry storms. Formula: wait = base * 2^attempt + random_jitter. Set a max retry count and dead-letter unresolvable failures.",
    },
    {
      id: 131,
      name: "Valet Key Pattern",
      desc: "Grant clients a time-limited, scope-limited credential (a 'valet key') to access a resource directly, bypassing your service. S3 pre-signed URLs are the canonical example: generate a URL that grants upload/download access for 15 minutes to exactly one object. The client uploads directly to S3 — your service never touches the bytes. Reduces load, cost, and latency for large payloads.",
    },
    {
      id: 132,
      name: "Throttling Pattern",
      desc: "Deliberately limit the rate at which a service processes requests to protect downstream resources and enforce fairness. Unlike rate limiting (which rejects excess), throttling queues or delays requests. Protects databases from query floods, prevents vendor API cost overruns, ensures no single tenant starves others. Implemented via token buckets or leaky buckets. Critical for multi-tenant SaaS.",
    },
    {
      id: 133,
      name: "Scheduler Agent Supervisor",
      desc: "Orchestrate distributed workflows across services with three roles: Scheduler (decides what to do and when), Agent (executes individual steps against external services), Supervisor (monitors and recovers failed tasks). Like a project manager, worker, and QA lead in one pattern. Handles partial failures gracefully — the Supervisor can restart failed Agents or roll back via compensating actions.",
    },
    {
      id: 134,
      name: "Health Endpoint Monitoring",
      desc: "Expose dedicated `/health` and `/ready` endpoints that report system status — database connectivity, downstream dependencies, memory, disk. Load balancers and orchestrators (Kubernetes) use liveness probes to restart broken pods and readiness probes to stop routing traffic to pods that aren't ready. Shallow health check = 'am I running?'; Deep health check = 'can I serve traffic?'",
    },
  ],
};
export default cloudDesignPatterns;
