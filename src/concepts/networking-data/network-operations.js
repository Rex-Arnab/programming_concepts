const networkOperations = {
  name: "Network Operations & Engineering",
  icon: "🔧",
  color: "#ec4899",
  concepts: [
    {
      id: 888,
      name: "Network Troubleshooting Methodology",
      desc: `**Network troubleshooting methodology** — a systematic approach to diagnosing and resolving network problems, using the OSI model as a diagnostic ladder and a structured gather-analyze-hypothesize-test cycle.

**The OSI troubleshooting ladder:**
Start at Layer 1 and work up:
1. **L1 (Physical)** — is the cable connected? Is the NIC showing link? ("ip link show", ethtool, LED indicators)
2. **L2 (Data Link)** — can you see the MAC address of the gateway? ("arp -n", "ip neigh")
3. **L3 (Network)** — do you have an IP address? Can you ping the gateway? Can you ping 8.8.8.8? ("ip addr", "ping", "ip route")
4. **L4 (Transport)** — can you establish a TCP connection to the destination? ("nc -zv host port", "telnet host port")
5. **L5-L7 (Application)** — is the application responding correctly? ("curl -v", protocol-specific tests)

**Essential diagnostic tools:**
- **ping** — ICMP echo; confirms IP reachability and measures RTT; blocked by firewalls (not a reliable test for connectivity)
- **traceroute / tracepath** — maps the route to a destination, showing each hop and RTT; identifies where packets are being dropped or delayed
- **ip route / netstat -rn** — display routing table; verify default gateway and routes
- **ss / netstat** — socket statistics; list listening ports, established connections
- **dig / nslookup** — DNS query tool; diagnose DNS resolution
- **curl -v** — HTTP testing with verbose output showing headers, TLS, redirects
- **tcpdump / tshark** — packet capture and analysis

**Divide and conquer:** Test connectivity at each layer and at each hop. "Can the server reach the database?" — can it reach the database server's IP? Can it open a TCP connection on the database port? Does the database respond to authentication? Isolate the failing layer.

**Key insight:** The most common network troubleshooting mistake is jumping to complex solutions before ruling out simple causes. The phrase "have you checked the cable?" is a cliché because physical layer failures (unplugged cables, bad SFP modules, negotiation mismatches) account for a disproportionate percentage of network outages. Layer 1 first; Layer 7 last.`,
    },
    {
      id: 889,
      name: "Network Performance Diagnostics",
      desc: `**Network performance diagnostics** — measuring and analyzing network performance characteristics to identify bottlenecks, quantify latency, and determine achievable throughput.

**Throughput testing — iperf3:**
The standard tool for measuring TCP/UDP throughput between two hosts. One side runs as server ("iperf3 -s"), the other as client ("iperf3 -c server-ip"). Measures achievable bandwidth, parallel streams, retransmissions. Essential for validating new links and diagnosing bandwidth limitations.

**Latency measurement tools:**
- **ping** — basic RTT measurement; average + standard deviation reveals jitter; ICMP may not reflect TCP latency accurately (different QoS handling)
- **hping3** — ping using TCP packets; tests TCP port latency; useful when ICMP is blocked
- **mtr (Matt's Traceroute)** — combines traceroute and ping; shows per-hop latency and loss in real time; essential for diagnosing where in the path latency is added

**Diagnosing packet loss:**
- Consistent loss at a specific hop in mtr: congestion or hardware problem at that hop
- Loss visible to destination but not intermediate hops: ICMP rate limiting (intermediate routers rate-limit ICMP but forward TCP normally; not true loss)
- Random loss throughout path: physical layer issues (bad cable/SFP), wireless interference, congestion

**Bandwidth measurement without iperf:**
- "wget -O /dev/null http://speedtest" measures download throughput from HTTP
- "curl -o /dev/null -w '%{speed_download}' url" measures download speed with curl
- These measure application-layer throughput; TCP overhead, HTTP overhead, and TLS overhead reduce the value below raw link bandwidth

**Throughput formula check:** Expected throughput = (Window Size) / RTT. If measured throughput is much lower than available bandwidth, suspect: small TCP window, packet loss triggering retransmit, or TCP slow start that never completed.

**Key insight:** "The network is slow" is a symptom, not a diagnosis. "The TCP throughput between node A and node B is 12 Mbps when the link is 100 Mbps, with 0.1% packet loss and 45ms RTT" is data that points to specific causes. Measure, quantify, then diagnose — vague complaints produce vague solutions.`,
    },
    {
      id: 890,
      name: "BGP Operations",
      desc: `**BGP operations** — the day-to-day management of BGP sessions, prefix advertisements, and routing policies for organizations that operate BGP (ISPs, cloud providers, enterprises with multiple upstream providers, or any organization with their own ASN).

**BGP session types:**
- **iBGP** — between routers in the same AS; used to distribute BGP routes internally; full mesh required (or Route Reflectors to avoid O(n^2) peering sessions)
- **eBGP** — between routers in different ASes; used at IXPs, ISP peering points, customer-provider connections; typically direct connections (no intermediate hops)

**BGP prefix filtering (critical security practice):**
- **BOGON filtering** — don't accept routes to unallocated IP space (private ranges, documentation prefixes, 0.0.0.0/0 too specific)
- **Prefix length filtering** — reject prefixes longer than /24 (avoid accepting /32s as global routes; /24 is the accepted maximum for global routing tables)
- **AS path filtering** — reject routes with unexpected AS paths (private ASNs, AS path loops)
- **IRR filtering** — validate received prefixes against Internet Routing Registry (RIPE, ARIN IRR) registered route objects

**RPKI (Resource Public Key Infrastructure):**
Cryptographic validation of prefix ownership. Route Origin Authorization (ROA) records cryptographically bind an IP prefix to its legitimate originating AS. RPKI-validating routers reject RPKI-invalid routes (wrong origin AS or prefix more specific than the ROA allows). Critical BGP hijacking mitigation.

**BGP debugging commands (Cisco/FRRouting):**
- "show bgp summary" — BGP neighbor states and received/sent prefix counts
- "show bgp neighbors" — detailed neighbor information including session state, timers, messages
- "show bgp 203.0.113.0/24" — routing table entry for a specific prefix
- "debug bgp updates" — verbose per-update logging; use carefully, very verbose

**Key insight:** BGP misconfiguration can take down the internet for millions of users. The classic BGP disasters (Pakistan Telecom YouTube hijack, Cloudflare routing incident, Facebook October 2021 BGP withdrawal) demonstrate that BGP has no built-in validation of route legitimacy. RPKI + strict prefix filtering are the two practices that prevent most BGP incidents.`,
    },
    {
      id: 891,
      name: "Network Automation",
      desc: `**Network automation** — using code and orchestration tools to configure, manage, and monitor network infrastructure programmatically, replacing manual CLI commands with repeatable, version-controlled, testable automation.

**The automation imperative:** Large-scale networks are unmanageable manually. A network with 500 switches, each requiring 50 configuration lines, means 25,000 individual CLI commands to deploy. Automation makes this a single declarative configuration pushed by a script.

**Network automation tools:**
- **Ansible** — agentless automation using YAML playbooks; "network modules" for Cisco IOS, NX-OS, Junos, Arista EOS, F5; most widely used for network automation; uses SSH to connect to devices
- **Nornir** — Python framework for network automation; faster than Ansible (native Python, parallel execution); more flexible; better for complex logic
- **Netmiko** — Python library for SSH connections to network devices; handles device-specific login quirks, prompts, and pagination; the low-level SSH building block
- **NAPALM (Network Automation and Programmability Abstraction Layer with Multivendor support)** — vendor-agnostic Python library; "get_facts()", "get_bgp_neighbors()", "load_merge_candidate()" work identically on Cisco, Juniper, Arista

**Configuration management approaches:**
- **Template-based** — Jinja2 templates + device facts → device-specific configuration; version control the templates and facts separately
- **Model-driven** — YANG data models describe network configuration; NETCONF/RESTCONF/gNMI as transport; structured configuration rather than text templates
- **Desired state** — declare what the network should look like; tooling (Batfish, Nautobot) validates and enforces

**Key insight:** The network automation journey starts with "automate the most painful manual task" — usually VLAN provisioning, ACL changes, or firmware upgrades. Don't start with "automate everything." Identify the repetitive, error-prone task that consumes the most time, automate it, learn from that, then expand.`,
    },
    {
      id: 892,
      name: "Infrastructure as Code for Networking",
      desc: `**IaC for networking** — applying infrastructure-as-code principles to network configuration: storing network state as version-controlled code, using declarative specifications, enabling peer review of network changes, and automating deployment.

**Key tools:**
- **Terraform** — provisions cloud network resources (VPCs, subnets, security groups, load balancers, DNS records) declaratively; HCL configuration; state management; plan (what will change) → apply (make it so); AWS, GCP, Azure, Cloudflare all have Terraform providers
- **Pulumi** — like Terraform but uses general-purpose languages (TypeScript, Python, Go) instead of HCL; enables network IaC with full programming language capabilities
- **Ansible** — for physical network device configuration IaC; playbooks as code; integrates with version control; idempotent (running twice produces the same result)
- **Nix / GitOps** — network configuration committed to Git; automated pipelines deploy changes; any change requires a code review

**GitOps for networking:** All network changes as pull requests; peer review; CI pipeline validates configuration (linting, syntax checking, policy validation); automated deployment on merge; automatic rollback on failure. Implements "network as code" with the same workflow as application code.

**Network policy as code:**
- OPA (Open Policy Agent) with Rego for network access policies
- Kubernetes NetworkPolicy resources (declarative pod-to-pod network policies)
- Terraform sentinel policies for cloud network guardrails

**Benefits of network IaC:**
- **Reproducibility** — recreate any environment from code; disaster recovery from scratch in hours not days
- **Audit trail** — every change has a git commit with author, timestamp, and reason
- **Rollback** — revert a bad change by reverting the commit
- **Consistency** — dev, staging, and prod have identical network configuration from the same code

**Key insight:** The most impactful network IaC adoption step is moving cloud networking (VPCs, security groups, load balancers, DNS) into Terraform. Cloud resources are already API-driven, making them perfect IaC targets. The result: "what does our network look like?" is answered by reading the repository, not by logging into consoles.`,
    },
    {
      id: 893,
      name: "Network Documentation",
      desc: `**Network documentation** — the set of artifacts that describe what a network looks like, how it is configured, how it behaves, and how to operate it. Critical for troubleshooting, capacity planning, onboarding, audits, and disaster recovery.

**Essential documentation types:**
- **Network diagrams** — physical topology (what is physically connected where), logical topology (IP addressing, VLANs, routing), and security zone diagrams
- **IP address management (IPAM)** — a database or tool tracking every allocated IP address, subnet, VLAN, and their assigned owners/purposes; prevents IP conflicts and enables quick lookup during incidents
- **Device inventory** — hostname, management IP, location, model, firmware version, purpose, owner, support contract expiry
- **Configuration backup** — automated backups of device configurations after changes; enables restoring configuration to last known good state after a failure

**Diagramming tools:** draw.io / diagrams.net (free, excellent), Lucidchart, Microsoft Visio (enterprise standard), NetBox (IPAM + topology), Netdisco (automated network topology discovery).

**IPAM tools:** NetBox (open-source, widely used), phpIPAM, InfoBlox (enterprise), Solarwinds IPAM. NetBox also serves as source of truth for network automation.

**Documentation anti-patterns:**
- **Stale documentation** — diagrams showing the network as it was 3 years ago; actively harmful (misleads troubleshooting)
- **Documentation only after the fact** — document during the change, not months later when memory fades
- **Undocumented exceptions** — "that server has a static route that bypasses the firewall for historical reasons" undocumented = future outage

**Runbooks:** Step-by-step procedures for common operational tasks (add a VLAN, investigate a network outage, replace a failed switch). The test: can an engineer unfamiliar with the environment follow the runbook and succeed?

**Key insight:** Network documentation is a forcing function for understanding. Engineers who document their networks discover gaps in their own knowledge — "wait, I don't actually know why that route exists" is a valuable discovery. Undocumented networks are operationally brittle; documented networks enable faster incident response and safer change management.`,
    },
    {
      id: 894,
      name: "Internet Exchange Points (IXPs)",
      desc: `**IXP (Internet Exchange Point)** — a physical infrastructure enabling multiple networks (ISPs, content providers, CDNs, cloud providers) to exchange internet traffic directly with each other, rather than routing traffic through third-party transit providers. The largest IXPs handle terabits per second of traffic and are critical internet infrastructure.

**How IXPs work:** Participating networks connect their routers to a shared switching fabric at the IXP. Each participant establishes BGP sessions with other participants directly over the shared fabric — traffic between them doesn't leave the IXP. An ISP in Frankfurt peering with Cloudflare at DE-CIX keeps that traffic local, reducing latency and transit costs.

**Major IXPs:**
- **DE-CIX (Frankfurt, Germany)** — world's largest by traffic; regularly exceeds 10 Tbps
- **AMS-IX (Amsterdam, Netherlands)** — 10+ Tbps; historically the first large IXP
- **LINX (London)** — UK's largest
- **SIX (Seattle)** — major US West Coast IXP
- **NYIIX (New York)** — major US East Coast IXP

**Peering vs transit:**
- **Peering** — free or settlement-free exchange between networks of similar size and traffic; both benefit from avoiding transit costs; BGP at IXP or private peering
- **Transit** — one network pays another to carry its traffic to the rest of the internet; ISPs charge per Mbps for transit

**IXP vs private peering:** Large content providers (Google, Netflix, Facebook) establish direct private interconnection links with major ISPs without going through an IXP — dedicated fiber circuits, typically at a colocation facility. IXP is a shared fabric; private peering is a dedicated circuit.

**Key insight:** IXPs are the nodes where the internet actually interconnects. Without them, every byte of traffic would pass through expensive transit providers. The concentration of IXPs in specific cities (Frankfurt, Amsterdam, London, New York, Singapore, Tokyo) explains why latency from one part of the world to another follows specific paths — internet traffic flows toward IXP hubs.`,
    },
    {
      id: 895,
      name: "Peering & Transit",
      desc: `**Peering** — a direct, bilateral interconnection between two networks to exchange traffic without involving intermediate providers. **Transit** — a commercial relationship where one network (the customer) pays another (the transit provider, i.e., the upstream ISP) to carry traffic to and from the global internet.

**Why peering matters:**
- **Cost** — transit providers charge per Mbps of traffic; peering is typically settlement-free or flat-rate; large networks save significant money by peering
- **Performance** — direct peering means traffic takes fewer hops; lower latency, less congestion, more predictable performance
- **Resilience** — multiple peering relationships provide redundant paths; reliance on a single transit provider is a single point of failure

**Peering economics:** Two networks will peer if the benefit to both exceeds the cost (port at IXP, router interface, engineering time). "Hot potato routing" — hand off traffic to the peer as soon as possible; "cold potato routing" — carry traffic across your own network as far as possible before handing off.

**Peering policies:**
- **Open peering** — peer with any network that meets minimum technical requirements; typical of CDNs, content providers
- **Selective peering** — only peer with networks of similar size or specific traffic ratios; ISPs often have peering policies requiring traffic volume equality
- **Closed peering** — no public peering; only private peering with specific partners

**IP transit tiers:**
- **Tier 1** — networks that have global reach via peering only; no upstream transit; settlement-free with each other; AT&T, Level 3, NTT, Telia, GTT
- **Tier 2** — networks that peer with some but purchase transit from Tier 1 networks; most regional ISPs
- **Tier 3** — networks that purchase transit from Tier 2; typical enterprise ISPs, small ISPs

**Key insight:** The economics of internet transit have changed dramatically. A decade ago, transit prices were dollars per Mbps per month; today, well-connected IXPs offer transit at fractions of a cent per Gbps. CDNs like Cloudflare now offer "bandwidth alliance" agreements with major cloud providers. The cost of internet transit is approaching near-zero for large networks — which is why cloud egress pricing (a remnant of historical transit costs) is increasingly controversial.`,
    },
    {
      id: 896,
      name: "Capacity Planning",
      desc: `**Network capacity planning** — the process of determining current and future network resource requirements (bandwidth, port count, IP addresses, routing table size) and provisioning infrastructure ahead of demand to prevent saturation.

**Capacity planning process:**
1. **Baseline measurement** — measure current utilization (SNMP, NetFlow, metrics); identify trends (daily peaks, weekly patterns, seasonal patterns)
2. **Growth projection** — extrapolate usage growth from historical trends; incorporate planned application launches, user growth, and business changes
3. **Headroom target** — determine the maximum acceptable utilization (typically 60-80%); resources used beyond this threshold risk congestion and outage
4. **Lead time awareness** — hardware procurement can take 4-16 weeks; bandwidth upgrades with ISPs take 4-12 weeks; plan ahead of need

**Key bandwidth metrics:**
- **95th percentile billing** — ISPs often bill on the 95th percentile of 5-minute traffic samples; this allows occasional bursts without paying peak pricing
- **Committed Information Rate (CIR) vs burst** — many links have a guaranteed CIR and a burst rate; understand the distinction when capacity planning

**Routing table scalability:** The global BGP routing table has grown to 950,000+ IPv4 prefixes and 250,000+ IPv6 prefixes. Routers have Forwarding Information Base (FIB) memory limits — older hardware can't hold the full global table. Route filtering and default routes reduce FIB memory requirements.

**IP address planning:** IPAM (IP Address Management) prevents address exhaustion in large organizations. Plan subnets with room to grow; allocate private space hierarchically (data center gets a /16; each PoP gets a /20 from within it; each rack gets a /24 from within the PoP allocation).

**Key insight:** Reactive capacity management — adding bandwidth after users complain about slowness — is always more expensive than proactive management. Service degradation drives customer complaints before engineering notices utilization graphs. Plan capacity to stay ahead of the 80% utilization threshold, and you'll never run capacity-constrained incidents.`,
    },
    {
      id: 897,
      name: "RPKI & BGP Security",
      desc: `**RPKI (Resource Public Key Infrastructure)** — a cryptographic framework that enables IP address holders to make verifiable statements about which Autonomous Systems are authorized to originate specific IP prefixes. The definitive BGP hijacking mitigation.

**The BGP security problem:** BGP has no built-in authentication. Any AS can announce any IP prefix; other ASes accept these announcements based on routing policy and peer trust, not cryptographic proof. BGP hijacking — announcing prefixes you don't own — can divert internet traffic maliciously or accidentally.

**How RPKI works:**
- Regional Internet Registries (RIRs: ARIN, RIPE, APNIC, LACNIC, AFRINIC) operate Trust Anchors (TA) containing cryptographically signed objects
- IP address holders create **ROA (Route Origin Authorization)** objects: "I, the holder of 203.0.113.0/24, authorize AS12345 to originate this prefix"
- ROAs are signed by the resource holder's certificate, which chains to the RIR's Trust Anchor
- **RPKI validators** (routinator, gortr, Cloudflare OctoRPKI) download and validate all ROAs from all RIRs
- BGP routers query the validator; routes with a valid ROA but wrong origin AS are marked "RPKI Invalid" and dropped

**RPKI validation states:**
- **Valid** — a ROA exists for this prefix/origin AS combination; legitimate
- **Invalid** — a ROA exists but this origin AS is not authorized; DROP
- **NotFound** — no ROA exists; BGP routing proceeds as normal (no validation, no action)

**Adoption progress:** As of 2024, approximately 45% of global IPv4 prefixes have ROAs; approximately 70% of Tier 1 ISPs perform RPKI validation (Route Origin Validation, ROV). Cloudflare, AWS, and Google all perform RPKI validation. Coverage is increasing as more organizations create ROAs.

**Key insight:** RPKI doesn't prevent all BGP attacks — it only validates origin AS, not the full AS path. BGP path hijacking (inserting your AS in the middle of a valid path) isn't stopped by RPKI. BGPSec (full path authentication) addresses this but has near-zero deployment due to performance and operational complexity. RPKI is the pragmatic, deployable solution; BGPSec is the theoretically complete but practically undeployed solution.`,
    },
  ],
};

export default networkOperations;
