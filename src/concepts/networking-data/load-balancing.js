const loadBalancing = {
  name: "Load Balancing & Traffic Management",
  icon: "⚖️",
  color: "#f59e0b",
  concepts: [
    {
      id: 868,
      name: "Load Balancing Fundamentals",
      desc: `**Load balancer** — a device or software that distributes incoming network traffic across multiple backend servers, ensuring no single server bears too much load, enabling horizontal scaling, and providing high availability through health-check-based failover.

**Why load balance:**
- **Scalability** — add backend servers to increase capacity; distribute load horizontally
- **High availability** — if a backend fails its health check, the load balancer stops sending it traffic; remaining backends absorb the load
- **Centralized TLS termination** — terminate TLS once at the load balancer rather than on every backend
- **Session persistence** — route all requests from the same client to the same backend (for stateful applications)

**Load balancing algorithms:**
- **Round-robin** — requests distributed sequentially; assumes all backends have equal capacity and similar request processing time
- **Weighted round-robin** — assign more requests to higher-capacity backends; appropriate for heterogeneous server pools
- **Least connections** — route to the backend with the fewest active connections; better for variable request complexity (long and short requests mixed)
- **IP hash** — hash the source IP to consistently route clients to the same backend; provides "sticky sessions" without cookies; problematic if clients share an IP (corporate NAT)
- **Random** — randomly select a backend; surprisingly effective at scale; simple and scalable
- **Least response time** — route to the backend with the lowest average response time; requires measurement overhead; most sophisticated

**Health checks:** Periodic probes to each backend (TCP connection, HTTP GET returning 200, application-specific endpoint); backends failing health checks are removed from rotation until they recover.

**Key insight:** "Least connections" outperforms round-robin in most real-world applications because requests aren't uniform — a database query takes 10ms while a file upload takes 30 seconds; round-robin sends equal numbers of requests to each backend regardless of actual load. For applications with high variance in request duration, least-connections significantly improves utilization.`,
    },
    {
      id: 869,
      name: "Layer 4 vs Layer 7 Load Balancing",
      desc: `**Layer 4 (L4) load balancing** — routes traffic based on network-layer information: source IP, destination IP, TCP/UDP port. The load balancer doesn't inspect the application content. Fast, low overhead, transparent to the application. **Layer 7 (L7) load balancing** — routes based on application-layer content: HTTP headers, URL paths, cookies, request body. More intelligent, more flexible, higher overhead.

**Layer 4 characteristics:**
- Operates at the TCP/UDP level; sees only IP addresses and ports
- Very fast — minimal processing; hardware can achieve line rate (100 Gbps+)
- Transparent to the application — backends see the original client IP (with DSR) or load balancer IP (with NAT)
- Cannot route based on URL, cookies, or HTTP headers
- Common use: routing TCP traffic for non-HTTP protocols (databases, game servers, SMTP)

**Layer 7 characteristics:**
- Terminates the TCP connection; establishes a new connection to the backend
- Inspects HTTP headers, URL paths, cookies
- Can route "/api" traffic to API servers, "/static" to CDN, "/" to web servers
- Can do health checks by calling actual application endpoints and checking response bodies
- Enables content-based routing, header manipulation, TLS termination, request/response transformation
- Higher CPU overhead (parsing HTTP); much more flexible

**Practical examples:**
- AWS NLB (Network Load Balancer) = L4; AWS ALB (Application Load Balancer) = L7
- HAProxy: supports both L4 and L7 modes
- NGINX: operates at L7 (HTTP) but can also do L4 (stream module) for TCP/UDP

**When to choose L4:** Non-HTTP protocols, maximum throughput at minimum latency, or when content-based routing isn't needed. **When to choose L7:** HTTP/HTTPS traffic, path-based routing, header manipulation, advanced health checks, authentication at the LB layer.

**Key insight:** Most modern web applications should use L7 load balancing. The overhead of L7 inspection is trivial compared to backend processing time for most workloads, and the flexibility — routing by URL path, cookie-based sticky sessions, header injection — enables architecture patterns that L4 cannot support. The exception: extremely latency-sensitive non-HTTP protocols where every microsecond counts.`,
    },
    {
      id: 870,
      name: "Reverse Proxy",
      desc: `**Reverse proxy** — a server that sits in front of web servers and forwards client requests to them. From the client's perspective, the reverse proxy is the server. Provides a controlled, single entry point to the backend, enabling TLS termination, load balancing, caching, compression, authentication, and content transformation.

**Reverse proxy vs forward proxy:**
- **Forward proxy** — sits in front of clients; clients configure it explicitly; used to access resources on behalf of clients (corporate internet proxying, privacy/anonymity)
- **Reverse proxy** — sits in front of servers; clients have no knowledge of it; used to protect and scale servers

**NGINX as reverse proxy:** The most widely deployed reverse proxy. Typical configuration: receive HTTPS on port 443, terminate TLS, proxy requests to backend servers on internal ports, add headers ("X-Real-IP", "X-Forwarded-For"), serve static files directly, cache responses.

**Use cases beyond load balancing:**
- **TLS termination** — decrypt incoming HTTPS, proxy over HTTP to backends (backends don't need TLS certificates or TLS overhead)
- **Rate limiting** — limit requests per IP, per URL, per user; implemented at the proxy layer without burdening backends
- **Authentication gateway** — verify JWTs or session cookies before forwarding; reject unauthenticated requests at the proxy
- **Web Application Firewall (WAF)** — inspect and filter requests before they reach the application
- **A/B testing** — route percentage of traffic to new backend version based on cookie or random assignment
- **Protocol translation** — receive HTTP from clients, proxy gRPC to backends

**The "X-Forwarded-For" problem:** When a reverse proxy forwards requests, the backend sees the proxy's IP, not the client's. "X-Forwarded-For" and "X-Real-IP" headers carry the client IP, but backends must be configured to trust these headers only from known proxy IPs — otherwise clients can spoof their IP by setting these headers directly.

**Key insight:** A reverse proxy is the single most impactful infrastructure component you can add to a basic web application architecture. It provides TLS, load balancing, rate limiting, and caching in one component. NGINX's ability to serve 50,000+ concurrent connections in a single process while forwarding to a less scalable backend application is what makes it ubiquitous in production architectures.`,
    },
    {
      id: 871,
      name: "HAProxy",
      desc: `**HAProxy (High Availability Proxy)** — an open-source, high-performance TCP/HTTP load balancer and proxy server, considered the gold standard for load balancing in production environments. Handles millions of concurrent connections with sub-millisecond overhead; used by GitHub, Airbnb, Twitter, and thousands of other high-traffic sites.

**HAProxy capabilities:**
- Full L4 (TCP) and L7 (HTTP) load balancing
- ACL-based routing (route based on URL, headers, source IP, SSL SNI)
- Health checks (TCP, HTTP response code, HTTP response content, agent checks)
- Active/passive and active/active high availability
- SSL/TLS termination and passthrough
- Rate limiting and connection throttling
- Comprehensive statistics dashboard
- Hot-reload without dropping connections

**HAProxy vs NGINX:**
- HAProxy: specialized for load balancing and proxying; more sophisticated load balancing algorithms; finer-grained health checks; better concurrency per resource
- NGINX: excellent as reverse proxy AND web server for static content; simpler configuration for basic use cases; better for serving files, embedding caching; adequate load balancing

**Configuration structure:**
- "global" — process-level settings (max connections, user/group, logging)
- "defaults" — default settings applied to all frontends/backends
- "frontend" — defines listening ports, protocols, ACL-based routing rules
- "backend" — defines server groups, balance algorithms, health check parameters
- "listen" — combines frontend and backend (simple shorthand for symmetric configurations)

**Zero-downtime reloads:** HAProxy supports SIGUSR2 hot-reload — new configuration is loaded and applied without dropping existing connections. The old process handles in-flight connections while the new process handles new ones. Essential for production configuration changes.

**Key insight:** HAProxy's statistics page (exposed on a dedicated port) is the best live debugging tool for traffic issues. It shows real-time request rates, error rates, backend server status, queue depth, and session counts. "My backend is returning 500 errors" becomes immediately diagnosable when you can see which backend servers are failing, at what rate, and whether they're being removed from rotation.`,
    },
    {
      id: 872,
      name: "Service Mesh",
      desc: `**Service mesh** — a dedicated infrastructure layer for handling service-to-service communication within a microservices architecture. Implemented via sidecar proxies deployed alongside each service container, intercepting all inbound and outbound traffic without modifying application code.

**What a service mesh provides:**
- **mTLS between services** — automatic certificate management and mutual authentication; all inter-service traffic is encrypted and authenticated
- **Load balancing** — client-side load balancing at the sidecar level; eliminates single-point-of-failure central load balancer for service-to-service traffic
- **Observability** — automatic distributed tracing, metrics (request rate, latency, error rate), and access logs for every service-to-service call
- **Traffic management** — fine-grained routing (route 10% of traffic to new service version), retries, timeouts, circuit breaking, fault injection
- **Access control** — service-level authorization policies (service A can call service B; service C cannot)

**Sidecar pattern:** A proxy (Envoy is the dominant choice) is deployed alongside each application container in the same pod. The proxy intercepts all traffic via iptables rules at the network level — applications are unaware of the mesh. Configuration is managed by a control plane.

**Istio:** The most widely deployed service mesh; uses Envoy as the data plane proxy; Istiod as the control plane. Rich feature set; historically complex to operate; Istio 1.6+ simplified the control plane significantly.

**Linkerd:** Lighter weight than Istio; Rust-based proxies; lower resource overhead; simpler configuration; less feature-rich.

**Key insight:** Service meshes solve real problems — mTLS between services, distributed tracing without code changes, traffic management for canary deployments. But they add significant operational complexity. The questions to ask before adopting: "Do we have the ops maturity to run a service mesh?" and "Which of these capabilities do we genuinely need vs. could solve with lighter-weight tools?" Premature service mesh adoption is a common microservices overcomplexity mistake.`,
    },
    {
      id: 873,
      name: "Rate Limiting",
      desc: `**Rate limiting** — restricting the number of requests a client (by IP, user ID, API key, or other identifier) can make within a defined time window. Protects services from overload, abuse, credential stuffing, scraping, and API quota enforcement.

**Rate limiting algorithms:**
- **Fixed window** — count requests in fixed time buckets (100 req/min); simple but allows bursts at window boundaries (100 at 0:59, 100 at 1:01 = 200 in 2 seconds)
- **Sliding window** — count requests in a rolling window ending at the current time; more accurate; higher storage/computation cost
- **Token bucket** — a bucket fills with tokens at a constant rate; each request consumes a token; allows bursts up to bucket capacity; most flexible
- **Leaky bucket** — requests enter a queue (bucket); processed at a fixed output rate regardless of input rate; smooths bursty traffic; introduces latency for bursts
- **Sliding window log** — store timestamps of all requests; count within the window; most accurate; highest storage cost

**Where to implement:**
- **CDN/WAF layer** — Cloudflare rate limiting, AWS WAF rate rules; before traffic hits your infrastructure; most effective against DDoS
- **API Gateway** — Kong, AWS API Gateway, Nginx; centralized enforcement; rate limiting per API key or user
- **Application layer** — rate limiting middleware in your app; highest flexibility; but requires shared state for distributed deployments (Redis for distributed rate limiting)

**Rate limiting response:** Return "429 Too Many Requests" with "Retry-After" header indicating when the client can retry and "X-RateLimit-Limit", "X-RateLimit-Remaining", "X-RateLimit-Reset" headers for client transparency.

**Key insight:** Rate limiting is most effective in layers. CDN-level rate limiting stops volumetric attacks (thousands of requests/second per IP). API Gateway rate limiting enforces quotas per authenticated user. Application-level rate limiting applies business-logic-aware limits (max 5 password reset attempts/hour). Each layer catches what the layer above misses.`,
    },
    {
      id: 874,
      name: "Global Server Load Balancing (GSLB)",
      desc: `**GSLB (Global Server Load Balancing)** — distribution of traffic across servers in multiple geographic regions or data centers, combining DNS-based routing, health monitoring, and routing policies to direct users to the optimal destination globally.

**GSLB components:**
- **Health monitoring** — continuously checks availability and performance of all data center endpoints
- **DNS-based traffic steering** — returns different IP addresses based on user location, data center health, and routing policy
- **Routing policies** — geographic routing (nearest data center), active/passive failover, weighted distribution, performance-based routing

**GSLB vs standard DNS load balancing:** Standard DNS load balancing returns records and leaves client choice to DNS TTL expiry. GSLB adds health awareness — unhealthy endpoints are removed from DNS responses near-immediately (low TTL + health monitoring), and routing is policy-driven (send 60% to US-East, 40% to US-West; all traffic to EU-West if US is down).

**Implementations:**
- **AWS Route 53 traffic policies** — geographic, latency-based, failover, weighted routing with health checks
- **Cloudflare Load Balancing** — DNS-based GSLB with Cloudflare's global network; sub-second health check failure detection
- **Akamai / F5 / Citrix GTM** — commercial GSLB appliances/services

**Active/passive vs active/active:**
- **Active/passive** — all traffic to primary region; secondary handles only if primary fails; simpler; primary bears all load
- **Active/active** — traffic distributed across all regions simultaneously; higher utilization; requires data replication between regions for stateful applications

**Key insight:** GSLB is where networking meets business continuity. The TTL is the key operating parameter: low TTL (30-60 seconds) enables fast failover but increases DNS query load; high TTL (300 seconds) reduces DNS load but slows failover. For mission-critical applications, 30-60 second TTLs with health-check-driven DNS are the standard — accepting higher DNS query costs for faster incident recovery.`,
    },
    {
      id: 875,
      name: "Traffic Shaping & QoS",
      desc: `**Traffic shaping** (packet shaping) — controlling the flow of network traffic to optimize or guarantee performance for specific traffic types, prioritizing important traffic over less-critical traffic, and preventing any single type from monopolizing bandwidth.

**QoS (Quality of Service):** The broad term for mechanisms that prioritize network traffic. Particularly important for latency-sensitive applications (VoIP, video conferencing, real-time gaming) that share bandwidth with bulk traffic (file downloads, backups).

**QoS markings:**
- **DSCP (Differentiated Services Code Point)** — 6-bit field in the IPv4/IPv6 header; marks packets with traffic class (EF for expedited forwarding / voice, AF for assured forwarding, CS for class selector); routers honor DSCP markings for queuing and scheduling
- **802.1p** — 3-bit field in the 802.1Q VLAN tag; Layer 2 QoS marking for switched networks

**Traffic shaping mechanisms:**
- **Token bucket / leaky bucket** — same algorithms as rate limiting; smooth bursty traffic to a steady rate
- **Priority queuing** — multiple queues with different priorities; high-priority traffic served first; low-priority may starve during congestion
- **Weighted Fair Queuing (WFQ)** — multiple queues with configured weights; provides predictable bandwidth shares
- **Low Latency Queuing (LLQ)** — combines strict priority queue (for voice/video) with weighted queues for other traffic; prevents voice from being delayed by data traffic

**Traffic policing vs shaping:** Policing drops excess traffic above the configured rate immediately; shaping buffers excess traffic and delays it. Policing is harsh (drop); shaping is gentle (delay). Shaping is preferred when short bursts are acceptable; policing is used at ingress points to enforce SLAs.

**Key insight:** QoS is most critical in WAN environments where bandwidth is expensive and constrained. In LAN environments with 1-10 Gbps switching, bandwidth is rarely a bottleneck. The most impactful QoS deployment is ensuring voice/video traffic has priority on the WAN link — a Zoom call buffering because a file backup is saturating the uplink is a classic enterprise QoS failure.`,
    },
    {
      id: 876,
      name: "Health Checks & Circuit Breaking",
      desc: `**Health checks** — periodic probes from a load balancer to each backend server to verify it can serve traffic. Servers failing health checks are removed from the load balancing pool until they recover, preventing traffic from being sent to unhealthy backends.

**Health check types:**
- **TCP health check** — attempt to establish a TCP connection; if successful, backend is considered healthy; verifies port is listening but not application health
- **HTTP health check** — send an HTTP GET request; check for 200 OK (or other configurable code); optionally check response body for health status; verifies application is running
- **gRPC health check** — use gRPC Health Checking Protocol; service implements the health check endpoint; more sophisticated application-level verification
- **Custom/script** — run an arbitrary script; can check database connectivity, disk space, external dependencies

**Health check configuration:**
- **Interval** — how often to probe (typically 5-30 seconds)
- **Timeout** — how long to wait for response (typically 2-5 seconds)
- **Healthy threshold** — consecutive successes required to move from unhealthy to healthy (typically 2)
- **Unhealthy threshold** — consecutive failures required to mark unhealthy (typically 2-3)

**Circuit breaker pattern:** A software pattern (in load balancers or client libraries) that tracks error rates to downstream services and "opens the circuit" when errors exceed a threshold — failing fast for subsequent requests rather than waiting for timeouts. States: Closed (normal operation), Open (fail fast), Half-Open (probe periodically to check if service has recovered). Hystrix (Netflix), Resilience4j, Envoy circuit breaking implement this.

**Key insight:** The combination of health checks and circuit breakers implements "fail fast, recover gracefully" at the infrastructure level. Without health checks, a load balancer routes to a dead backend until a human intervenes. With circuit breaking, downstream service degradation doesn't cascade into full system failure — unhealthy services are isolated while the rest of the system continues operating.`,
    },
    {
      id: 877,
      name: "Sticky Sessions",
      desc: `**Sticky sessions** (session persistence / affinity) — a load balancer configuration that ensures all requests from the same client are routed to the same backend server, maintaining session state for stateful applications.

**Why sticky sessions exist:** Many web applications store session state in server memory or local files (PHP session files, in-memory caches). If request 1 creates a session on Server A and request 2 goes to Server B, Server B has no knowledge of the session — the user is effectively logged out.

**Sticky session mechanisms:**
- **IP-based affinity** — hash the source IP; route consistently to the same backend. Problem: many clients share an IP (corporate NAT), concentrating load; IP changes break stickiness
- **Cookie-based affinity** — load balancer sets a cookie (AWSALB, JSESSIONID) on the first response; uses cookie value to route subsequent requests. Most reliable; survives IP changes; browsers must accept cookies
- **Header-based affinity** — custom headers carry a session token; client must set the header on every request

**The right solution: stateless backends:** Sticky sessions are a workaround for stateful backend designs. The modern architecture pattern is stateless backends with centralized session storage (Redis, database, JWT tokens). Any backend can handle any request. This enables:
- True horizontal scaling (add/remove backends freely)
- Zero-downtime deployments (drain existing sessions, restart backends)
- Better load distribution (no hot servers handling more sessions)

**When sticky sessions are unavoidable:** Long-running operations that can't be interrupted (file upload, transcoding job), WebSocket connections (must stay on the same backend for the connection lifetime), legacy applications that can't be refactored to stateless.

**Key insight:** Sticky sessions solve a symptom (stateful backends) rather than the root cause (sessions stored locally). Every time sticky sessions cause a problem — uneven load distribution, deployment complexity, loss of stickiness on failover — the argument for investing in stateless backend architecture becomes stronger.`,
    },
  ],
};

export default loadBalancing;
