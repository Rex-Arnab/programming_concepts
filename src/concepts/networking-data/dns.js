const dns = {
  name: "DNS Deep Dive",
  icon: "🗄️",
  color: "#10b981",
  concepts: [
    {
      id: 828,
      name: "DNS Hierarchy & Zones",
      desc: `**DNS hierarchy** — the tree-structured, distributed database that makes DNS scalable and manageable. No single server holds all DNS records; authority is delegated downward through a hierarchy of zones, each administered independently.

**The DNS tree:**
- **Root zone** — the top of the hierarchy; 13 root server cluster addresses (a.root-servers.net through m.root-servers.net, each anycast to hundreds of physical servers globally). The root zone maps TLDs to their authoritative nameservers.
- **Top-Level Domains (TLDs)** — ".com", ".org", ".net", ".io", country codes (".uk", ".de", ".jp"), new gTLDs (".app", ".dev"). Each TLD has a registry (Verisign for .com) that authorizes second-level domain registrations.
- **Second-level domains** — "example.com", "github.com"; the registrant (you) controls DNS for this zone
- **Subdomains** — "www.example.com", "api.example.com"; administered within the second-level domain zone or delegated to sub-zones

**DNS zone** — a portion of the DNS namespace administered as a unit. The zone file contains all resource records for the zone. A zone can be delegated via NS records — "subdomain.example.com uses these nameservers" — which transfers administrative control to those nameservers.

**Glue records:** When a nameserver is within the domain it's authoritative for (ns1.example.com is the nameserver for example.com), a chicken-and-egg problem arises — resolving "ns1.example.com" requires example.com's nameserver, but you need that nameserver's IP to start. Glue records (A records stored at the parent zone) break this cycle.

**Key insight:** The DNS hierarchy is one of the most successful distributed systems ever deployed. Each level only needs to know about the level immediately below it. The root servers don't know where google.com is — they only know which TLD server to ask for ".com". This delegation enables a database of billions of records to be maintained by millions of independent organizations.`,
    },
    {
      id: 829,
      name: "DNS Resolution & Caching",
      desc: `**DNS resolution** — the step-by-step process of translating a domain name to an IP address, involving multiple servers and caching at each level.

**Iterative vs recursive resolution:**
- **Recursive resolver** — performs the full resolution on behalf of the client; follows each referral until an authoritative answer is found; returns the final answer to the client. This is what your OS's configured DNS server (8.8.8.8, 1.1.1.1) does.
- **Iterative resolution** — each server returns either an answer or a referral to the next server; the resolver makes each subsequent query itself. Recursive resolvers use iterative queries to root/TLD servers.

**Caching at every level:**
1. **Browser DNS cache** — Chrome, Firefox cache DNS results separately (chrome://net-internals/#dns)
2. **OS DNS cache** — "nscd", "systemd-resolved", Windows DNS Client service cache
3. **Recursive resolver cache** — ISP or public resolver (Google, Cloudflare) caches all answers it resolves
4. **Authoritative nameserver negative caching** — "NXDOMAIN" (non-existent domain) responses also cache for the SOA record's minimum TTL

**TTL strategy:** Short TTL (60-300s) for records that need rapid failover (load balancing, CDN origin switching). Long TTL (86400s) for stable records reduces recursive resolver load. Before DNS migrations, pre-lower TTL 48 hours in advance (beyond the current TTL), wait for caches to expire with the new low TTL, make the change, then re-raise TTL after propagation.

**DNS negative caching:** If a query returns NXDOMAIN, the resolver caches the negative response. If a developer deletes a DNS record by mistake, even restoring it immediately won't help clients whose resolvers cached the NXDOMAIN — they must wait for the negative TTL to expire.

**Key insight:** "DNS propagation" is just waiting for TTLs to expire across recursive resolvers worldwide. There's no "propagation delay" in the sense of the change slowly spreading — the change is instant on the authoritative server. What's slow is cache expiry. This is why controlling TTLs is the key to controlling DNS change velocity.`,
    },
    {
      id: 830,
      name: "DNSSEC",
      desc: `**DNSSEC (DNS Security Extensions)** — a set of DNS extensions (RFCs 4033-4035) that add cryptographic authentication to DNS responses, preventing DNS spoofing and cache poisoning attacks. DNSSEC creates a chain of trust from the DNS root to individual domain records.

**The problem DNSSEC solves — DNS cache poisoning (Kaminsky attack, 2008):** An attacker can inject forged DNS responses into a resolver's cache by flooding it with incorrect answers before the legitimate response arrives. Once cached, every client using that resolver receives the attacker's IP address for the target domain. Dan Kaminsky demonstrated this could be accomplished in seconds in 2008.

**How DNSSEC works:**
- Zone operators sign their DNS records with a private key
- The corresponding public key (DNSKEY record) is published in DNS
- A DS (Delegation Signer) record in the parent zone contains a hash of the child zone's DNSKEY, creating the chain of trust
- Resolvers verify signatures up the chain to the root (the root zone's key is a "trust anchor" pre-configured in DNSSEC-validating resolvers)
- Signed records include RRSIG (Resource Record Signature) records; NSEC/NSEC3 records prove non-existence

**DNSSEC limitations:**
- Prevents data forgery but not DDoS or zone enumeration (NSEC allows walking the zone)
- Adds operational complexity (key rotation, expiry management)
- Increases response sizes (signatures are large)
- Adoption is incomplete — roughly 90% of TLDs are signed, but far fewer second-level domains

**DNS over HTTPS (DoH) and DNS over TLS (DoT):** Different from DNSSEC — these protocols encrypt DNS queries between client and resolver (protecting privacy). DNSSEC authenticates the data (ensuring it hasn't been tampered with). Both are needed for a fully secure DNS.

**Key insight:** DNSSEC and DoH/DoT solve different problems. DNSSEC ensures data integrity (the answer hasn't been modified). DoH/DoT ensures query privacy (nobody can see what you're looking up). An internet-facing service with neither has both unencrypted query surveillance and potential cache poisoning exposure.`,
    },
    {
      id: 831,
      name: "GeoDNS & Traffic Steering",
      desc: `**GeoDNS** — a DNS technique that returns different DNS records based on the geographic location of the requesting resolver, enabling traffic routing to the nearest (or most appropriate) server. Fundamental to global CDN and multi-region application architectures.

**How GeoDNS works:** The authoritative DNS server inspects the IP address of the querying recursive resolver (or EDNS Client Subnet extension for more precise geolocation) and returns an A record pointing to the nearest or preferred origin. A user in Europe gets a European data center IP; a user in Asia gets an Asian IP.

**GeoDNS limitations:**
- DNS caches responses — once cached at a resolver, all clients using that resolver get the same response regardless of their true location
- EDNS Client Subnet (ECS) allows the resolver to include the client's subnet prefix in queries, enabling the authoritative server to return client-appropriate responses — CDNs (Cloudflare, Akamai, Fastly) rely on ECS for accurate geographic routing
- Geolocation accuracy depends on IP databases (MaxMind GeoIP, IP2Location)

**Latency-based routing vs geo-based:** Pure geographic proximity doesn't always equal lowest latency (network topology matters). Latency-based routing (Route 53's latency routing) measures actual latency from each DNS resolution point and returns the endpoint with measured lowest latency.

**DNS failover:** Health-check-based DNS — if the primary server fails its health check, DNS automatically returns the secondary server's IP. Used for active/passive failover. Caveat: DNS TTL means failover isn't instantaneous — clients with cached responses continue hitting the failed server until TTL expires.

**Key insight:** GeoDNS is often considered "good enough" for global routing. For latency-sensitive applications, it frequently isn't — a user in São Paulo may get routed to a US-East server because the recursive resolver they use is in Miami. Anycast (routing at the network level rather than DNS level) solves this more accurately and with faster failover.`,
    },
    {
      id: 832,
      name: "DNS over HTTPS & Privacy",
      desc: `**DNS over HTTPS (DoH)** — a protocol (RFC 8484, 2018) that transmits DNS queries and responses over HTTPS, encrypting them to prevent eavesdropping and manipulation. Similarly, **DNS over TLS (DoT)** (RFC 7858) encrypts DNS traffic using TLS on port 853.

**The problem:** Traditional DNS queries are sent in plaintext over UDP. Your ISP, network administrator, or anyone on the network path can see every domain you look up — a detailed profile of browsing behavior. Cloudflare's 1.1.1.1 DoH resolver launched in 2018 as a privacy-first service; Google's 8.8.8.8 also supports DoH.

**DoH vs DoT:**
- **DoH** — DNS over port 443 (HTTPS); indistinguishable from normal HTTPS traffic; harder for firewalls to block; browser-native (Chrome, Firefox have built-in DoH)
- **DoT** — DNS over port 853; clearly identifiable as DNS; easier for enterprise filtering and monitoring; more appropriate for system-level (OS, router) deployment
- Both provide equivalent encryption; the choice is operational (visibility vs privacy)

**The enterprise filtering problem:** DoH breaks traditional DNS-based content filtering (parental controls, corporate security policies). If browsers bypass the OS resolver and use hardcoded DoH servers, DNS-based blocklists are ineffective. Mozilla introduced an "enterprise canary domain" that, if resolvable, signals DoH should be disabled for enterprise environments.

**Browser implementation:** Chrome, Firefox, Edge, and Safari support DoH and will auto-upgrade to DoH when the configured resolver supports it. Firefox queries Cloudflare's 1.1.1.1 by default in the US; Chrome uses the system resolver's DoH endpoint if available.

**Key insight:** DoH and DoT encrypt the last mile of DNS (client to recursive resolver) — they don't make DNS queries private from your chosen resolver. Switching from your ISP's resolver to Cloudflare's 1.1.1.1 moves your DNS query visibility from your ISP to Cloudflare. Privacy is about trust in the resolver, not just encryption in transit.`,
    },
    {
      id: 833,
      name: "DNS Load Balancing",
      desc: `**DNS load balancing** — using DNS to distribute traffic across multiple servers or data centers by returning multiple A records or rotating between addresses. The simplest form of load distribution; requires no dedicated load balancing hardware or software at the point of traffic entry.

**Round-robin DNS:** Return multiple A records for the same hostname. Resolvers typically return all records; clients (browsers, HTTP clients) choose one — usually the first, creating an approximation of load distribution. Not true load balancing — client choice is opaque, unhealthy servers still receive traffic, and long TTLs prevent quick removal.

**Weighted routing:** Return different records with different probabilities — 80% to primary, 20% to secondary. Useful for blue-green deployments, canary releases at the DNS level, or gradual traffic shifts during migrations.

**Health check integration:** Modern DNS services (Route 53, Cloudflare Load Balancing, Azure Traffic Manager) combine DNS with health checks — if the health check fails for a record, it's removed from DNS responses. Enables DNS-level failover, though TTL-bounded.

**Limitations of DNS load balancing:**
- Clients cache DNS responses for the TTL — an unhealthy server continues receiving traffic for cached responses
- DNS doesn't know about connection count, CPU load, or response time — it can't make intelligent load distribution decisions
- Sticky sessions are problematic — a client may resolve to server A once and server B next time, breaking session-based applications
- Some HTTP clients ignore multiple A records and always use the first

**Key insight:** DNS load balancing is appropriate for geographic traffic steering (route to the nearest region) and simple active/passive failover. For per-request load balancing with health awareness and session management, a proper Layer 4 or Layer 7 load balancer (HAProxy, NGINX, ALB) is necessary. The two are complementary, not substitutes.`,
    },
    {
      id: 834,
      name: "Split-Horizon DNS",
      desc: `**Split-horizon DNS** (split-brain DNS) — a configuration where different DNS responses are returned for the same domain name depending on where the query originates. Internal users get an internal IP; external users get a public IP. Enables the same domain name to work correctly from both inside and outside the corporate network.

**The problem it solves:** A company has a web server "api.company.com" with public IP "203.0.113.1" and internal IP "10.1.2.3". External users connect via the public IP; internal users should connect via the internal IP for efficiency and to avoid traffic hairpinning (going out to the internet and back in through the firewall for an internal destination).

**Implementation:**
- **DNS view-based:** BIND and most enterprise DNS servers support "views" — different zone configurations served to different source IP ranges
- **Separate internal/external nameservers:** Internal DNS servers serve internal records; external (public) DNS servers serve public records; internal resolver configuration directs internal clients to internal servers
- **Conditional forwarding:** Internal DNS server handles internal domains; forwards external queries to public resolvers

**Cloud architectures:** In AWS VPCs, split-horizon DNS is common: Route 53 private hosted zones serve internal DNS (10.x.x.x addresses) for VPC resources; public Route 53 zones serve external addresses. Resources resolve to private IPs within the VPC and public IPs from outside.

**Key insight:** Split-horizon DNS is one of those configurations that seems unnecessary until you need it — and when you need it, its absence causes bizarre routing problems (traffic hairpinning, TLS certificate mismatches when internal services connect to the public IP). In any architecture with both internal and external network access to the same service, split-horizon DNS is the clean solution.`,
    },
    {
      id: 835,
      name: "DNS Attacks & Defenses",
      desc: `**DNS attacks** — a category of attacks targeting the DNS infrastructure to misdirect traffic, disrupt resolution, or enumerate zone contents. DNS is critical infrastructure; DNS failures cascade across all services that depend on name resolution.

**DNS cache poisoning (Kaminsky attack):** Attacker floods a recursive resolver with forged responses to inject malicious records. Mitigated by: DNSSEC (cryptographic verification), source port randomization (increases attacker's guessing workload), 0x20 encoding (randomizes case in queries; legitimate servers preserve case, forged responses typically don't).

**DNS amplification/reflection DDoS:** Attacker sends DNS queries with spoofed source IP (victim's IP) to many open resolvers; resolvers send large responses to the victim. Amplification factor: a small ANY query can produce a 50x larger response. Mitigated by: Response Rate Limiting (RRL) on authoritative servers, ingress filtering (BCP38) to block spoofed source IPs, blocking open recursion on authoritative servers.

**DNS hijacking:** Attacker modifies DNS responses at the resolver level (ISP hijacking) or at the registrar level (domain hijacking via compromised account). Mitigated by: registry lock (prevents unauthorized domain transfers), DNSSEC, multi-factor authentication on registrar accounts.

**DNS exfiltration:** Data encoded in DNS queries — a covert channel for malware to exfiltrate data through firewalls that allow DNS traffic. Queries to "data.attacker.com" where "data" encodes stolen information. Mitigated by: DNS monitoring, detecting anomalous query patterns, blocklisting suspicious resolvers.

**NXDOMAIN hijacking (DNS wildcard abuse):** Some ISPs resolve all NXDOMAIN (nonexistent domain) queries to their own advertising/search page. Breaks security tools and legitimate applications that depend on NXDOMAIN responses.

**Key insight:** The most impactful DNS attack vector for most organizations is not technical — it's social: registrar account takeover. Attackers phish or social-engineer registrar credentials, transfer the domain, and redirect all traffic. Registry lock (which requires out-of-band verification for any transfer) is the most effective countermeasure and is underused.`,
    },
    {
      id: 836,
      name: "Anycast & DNS",
      desc: `**Anycast** — a routing technique where the same IP address is announced from multiple geographic locations simultaneously. Network routing protocols (BGP) automatically direct each client to the topologically nearest (in routing terms) instance of that IP address. Traffic automatically fails over to the next nearest instance if one goes down.

**Anycast for DNS:** Root DNS servers and public resolvers (8.8.8.8, 1.1.1.1) use anycast — a query to "8.8.8.8" is routed to the nearest Google data center, which may be hundreds of miles away from you but is the "nearest" in BGP routing terms. Dozens of physical locations each announce the same anycast IP. Root server "anycast" expanded from 13 physical machines to 1,500+ globally distributed instances without changing the 13 anycast addresses.

**Anycast benefits:**
- **Latency** — clients connect to the nearest instance automatically
- **DDoS resilience** — attack traffic is spread across all anycast instances; no single instance bears the full load
- **Automatic failover** — if an instance fails and withdraws its BGP announcement, traffic reroutes to the next nearest instance in minutes (BGP convergence time)

**Anycast for application delivery:** CDNs (Cloudflare, Akamai, Fastly) use anycast for HTTP traffic — the same IP resolves and routes to the nearest edge PoP. This is different from GeoDNS (which returns different IPs based on location) — anycast uses the same IP globally and relies on routing to steer traffic.

**Anycast limitations:** Not suitable for TCP connections that need to persist across multiple requests from the same client — if routing changes mid-connection, the TCP connection breaks. Works well for UDP (DNS) and HTTPS (short-lived or QUIC's connection migration).

**Key insight:** Anycast is why "8.8.8.8" responds from hundreds of different physical locations yet you always get the closest one. It's one of the most elegant solutions in networking — scalability and fault tolerance achieved through nothing more than BGP route announcements. The entire root DNS system's resilience rests on this elegant routing principle.`,
    },
    {
      id: 837,
      name: "DNS for Service Discovery",
      desc: `**DNS for service discovery** — using DNS as the mechanism for microservices and containerized applications to find each other within a cluster or cloud environment. Instead of hardcoding IP addresses or using a dedicated service registry, services register themselves in DNS and discover each other by name.

**Kubernetes DNS:** Every Kubernetes cluster runs a DNS server (CoreDNS). Services are automatically assigned a DNS name: "service-name.namespace.svc.cluster.local". Pods resolve service names to the cluster's virtual IP (ClusterIP), which kube-proxy then load-balances to pod endpoints. Headless services return the actual pod IPs (for stateful apps where clients must connect to specific pods).

**SRV records for service discovery:** SRV records provide hostname AND port, enabling DNS-based service discovery without hardcoded ports: "_http._tcp.api.example.com SRV 10 5 8080 api-host.example.com". Consul and similar service meshes publish SRV records for registered services.

**Consul DNS:** HashiCorp Consul provides DNS-based service discovery: "web.service.consul" resolves to registered web service instances; "web.service.dc1.consul" targets a specific datacenter. Health-check-failing instances are removed from DNS responses automatically.

**Dynamic DNS registration:** In cloud environments (EC2, ECS, Kubernetes), service instances come and go continuously. Automated DNS registration (via cloud-init, Kubernetes DNS controllers, or Consul agents) keeps DNS in sync with running instances without manual configuration.

**Key insight:** DNS-based service discovery is not just a convenience — it's a decoupling strategy. Services don't need to know each other's IP addresses or ports; they just know the DNS name. This allows re-deployments, scaling, and IP changes to be transparent to consuming services. The trade-off is DNS TTL: service changes don't propagate instantly; clients must respect low TTLs.`,
    },
  ],
};

export default dns;
