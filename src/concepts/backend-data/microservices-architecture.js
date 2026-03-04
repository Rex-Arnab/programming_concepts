const microservicesArchitecture = {
  name: "Microservices & Architecture",
  icon: "⟐",
  color: "#A855F7",
  concepts: [
    { id: 114, name: "Monolith vs Microservices", desc: "Monolith: single deployable unit, shared database. Microservices: independent services, own databases, communicate via APIs/events. Start monolith, extract when needed." },
    { id: 115, name: "Microservices Communication", desc: "Synchronous: REST, gRPC (request-response). Asynchronous: message queues, event streaming (fire-and-forget). Prefer async for loose coupling and resilience." },
    { id: 116, name: "API Gateway", desc: "Single entry point for all client requests. Routes to appropriate service. Handles auth, rate limiting, request transformation, response aggregation. Kong, AWS API Gateway." },
    { id: 117, name: "Service Discovery", desc: "How services find each other in dynamic environments. DNS-based (Kubernetes CoreDNS), registry-based (Consul, Eureka), or environment variables." },
    { id: 118, name: "Service Mesh", desc: "Infrastructure layer managing service-to-service communication. mTLS, retries, circuit breaking, observability. Sidecar proxy pattern. Istio, Linkerd, Consul Connect." },
    { id: 119, name: "Circuit Breaker Pattern", desc: "Stop calling a failing service after threshold. States: closed (normal) → open (fail fast) → half-open (test recovery). Prevents cascade failures. Resilience4j, Polly." },
    { id: 120, name: "Bulkhead Pattern", desc: "Isolate components into failure domains. Thread pools, connection pools, or process isolation per service. One failing dependency doesn't exhaust shared resources." },
    { id: 121, name: "Strangler Fig Pattern", desc: "Incrementally migrate from monolith to microservices. Route requests to new service or legacy based on feature. Gradually replace until monolith is retired." },
    { id: 122, name: "Sidecar Pattern", desc: "Deploy helper processes alongside main service. Handles cross-cutting concerns: logging, monitoring, networking, security. Foundation of service mesh architecture." },
    { id: 123, name: "Backend for Frontend (BFF)", desc: "Dedicated backend per frontend type (web, mobile, CLI). Tailors API responses, aggregates data, handles auth per client. Reduces frontend complexity." },
    { id: 124, name: "Event-Driven Architecture", desc: "Services communicate through events. Producers emit, consumers react. Loose coupling, temporal decoupling, audit trail. Event broker (Kafka) mediates." },
    { id: 125, name: "Serverless Functions", desc: "Code runs without managing servers. AWS Lambda, Vercel Functions, Cloudflare Workers. Pay-per-execution. Cold starts are the main trade-off. Event-triggered." },
    { id: 126, name: "Modular Monolith", desc: "Monolith with clear module boundaries. Each module has its own domain, data access, and public API. Easier to extract to microservices later. Best of both worlds." },
  ],
};
export default microservicesArchitecture;
