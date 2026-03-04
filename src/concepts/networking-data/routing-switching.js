const routingSwitching = {
  name: "Routing & Switching",
  icon: "🔀",
  color: "#f97316",
  concepts: [
    {
      id: 838,
      name: "IP Routing",
      desc: `**IP routing** — the process by which routers forward IP packets from source to destination across networks, making hop-by-hop forwarding decisions based on the destination IP address and a routing table. Routing is the fundamental function of the Internet Layer in the TCP/IP model.

**How routing works:**
1. Router receives a packet; extracts destination IP address
2. Looks up destination IP in routing table; finds the longest prefix match (most specific route)
3. Forwards the packet out the matching interface, updating the destination MAC address to the next-hop router's MAC
4. TTL decremented by 1; if TTL=0, discard and send ICMP Time Exceeded to source
5. Process repeats at each hop until reaching the destination network

**Routing table structure:** Each entry contains:
- Destination network (in CIDR notation)
- Next-hop address (or "directly connected")
- Outgoing interface
- Metric (cost)
- Administrative distance (preference when multiple routing protocols have routes to the same destination)

**Longest prefix match:** When multiple routing table entries could match a destination, the most specific (longest) prefix wins. "10.0.1.0/24" beats "10.0.0.0/8" for a packet to "10.0.1.5". This enables hierarchical routing — a default route "0.0.0.0/0" catches everything; more specific routes override it for known destinations.

**The default route:** "0.0.0.0/0" — matches any destination; the "route of last resort." Every router has or needs one. Without a default route, packets to unknown destinations are dropped.

**Key insight:** Routing is stateless — each router makes its forwarding decision independently, with no knowledge of the full path to the destination. A packet from New York to London may take different physical paths each hop. This stateless design is what enables the internet's scale and fault tolerance: routers can join and leave the routing topology dynamically, and packets find their way around failures.`,
    },
    {
      id: 839,
      name: "Static vs Dynamic Routing",
      desc: `**Static routing** — routing table entries manually configured by an administrator; they don't change unless the administrator modifies them. **Dynamic routing** — routing table entries automatically learned and updated by routing protocols that exchange information between routers about network topology.

**Static routing characteristics:**
- Predictable and fully controlled; no protocol overhead
- Doesn't adapt to topology changes; if a link fails, traffic is dropped until an admin manually updates routes
- Appropriate for simple networks with few routers, stub networks (networks with only one exit), and specialized paths that must not change

**Dynamic routing protocols automatically:**
- Discover neighbors
- Exchange topology or reachability information
- Calculate optimal paths using metrics (bandwidth, delay, hop count, cost)
- Update routing tables when topology changes
- Adapt to failures and re-route traffic within seconds to minutes

**Administrative distance (AD):** When multiple routing sources have routes to the same destination, AD determines which to prefer. Lower AD wins. Cisco defaults: Connected (0) > Static (1) > OSPF (110) > RIP (120) > EBGP (20) > IBGP (200). Custom static routes intentionally override dynamic routes by having a lower AD.

**Floating static routes:** Static routes with a high AD configured as backup paths — they're inactive when a dynamic route to the same destination exists; they activate when the dynamic route disappears (link failure).

**Key insight:** Dynamic routing is not "set it and forget it" — it is "design it carefully and monitor it." Misconfigured dynamic routing (wrong metrics, incorrect redistribution, route summarization errors) can cause routing loops, suboptimal paths, or complete reachability failures. Static routing in large networks is also a trap — maintaining hundreds of static routes is error-prone. The right answer is dynamic routing with security controls and rigorous testing.`,
    },
    {
      id: 840,
      name: "BGP (Border Gateway Protocol)",
      desc: `**BGP (Border Gateway Protocol)** — the routing protocol that powers the internet; the glue that connects autonomous systems (AS) — independently administered networks (ISPs, cloud providers, corporations, universities) — into the global routing table. BGP is a path vector protocol: it advertises reachability to IP prefixes along with the path of AS numbers through which that prefix is reachable.

**Autonomous Systems (AS):** Each AS is assigned a unique 16-bit (or 32-bit) AS Number (ASN) by regional internet registries (ARIN, RIPE, APNIC). Google is AS15169; Amazon is AS16509; Cloudflare is AS13335. A BGP session (peering session) between two ASes exchanges routing information.

**eBGP vs iBGP:**
- **eBGP (External BGP)** — between routers in different ASes; used at internet exchange points and ISP peering
- **iBGP (Internal BGP)** — between routers within the same AS; distributes BGP routes internally without modifying the AS path

**BGP path selection (simplified order):**
1. Highest local preference (prefer routes through a specific AS)
2. Shortest AS path (fewer hops is better)
3. Lowest MED (Multi-Exit Discriminator) — hint from neighbor about preferred entry point
4. Prefer eBGP over iBGP
5. Lowest IGP metric to next hop
6. Lowest Router ID (tiebreaker)

**BGP hijacking:** An AS announces (originates) prefixes it doesn't own, capturing traffic. The 2008 Pakistan Telecom BGP hijack of YouTube's routes made YouTube globally unreachable for 2 hours. RPKI (Resource Public Key Infrastructure) provides cryptographic authorization for prefix origination — the definitive mitigation.

**Key insight:** BGP is simultaneously the most critical and most fragile protocol on the internet. It was designed for trust between small numbers of known peers; it now runs on a global infrastructure of 100,000+ ASes with no inherent authentication. Every major internet routing incident (Cloudflare, Facebook, various government-directed hijacks) involves BGP misconfigurations or attacks.`,
    },
    {
      id: 841,
      name: "OSPF (Open Shortest Path First)",
      desc: `**OSPF (Open Shortest Path First)** — a link-state Interior Gateway Protocol (IGP) used to route within a single autonomous system (AS). Unlike BGP (which routes between ASes), OSPF routes within an enterprise or ISP network. OSPFv2 for IPv4 (RFC 2328); OSPFv3 for IPv6 (RFC 5340).

**Link-state operation:** Each OSPF router maintains a complete topology database (LSDB — Link State Database) of the entire OSPF area. Routers flood Link State Advertisements (LSAs) describing their local links and their states throughout the area. Every router runs Dijkstra's Shortest Path First (SPF) algorithm independently on the identical topology database to compute the shortest path tree to all destinations.

**OSPF convergence:** When a link fails, the detecting router floods an updated LSA immediately. All routers receive it, update their LSDB, and re-run SPF. Convergence time: typically 1-5 seconds for detection + 1 second for SPF calculation. OSPF's fast convergence (compared to RIP's 30+ seconds) made it the dominant enterprise IGP.

**OSPF areas:** Large OSPF deployments are divided into areas to limit LSA flooding and SPF computation scope. Area 0 (the backbone) connects all other areas; all non-backbone areas must connect to Area 0 via Area Border Routers (ABRs). Area types: normal, stub (no external routes), totally stub (only default route), NSSA (not so stubby).

**OSPF cost metric:** Calculated from interface bandwidth: cost = reference bandwidth / interface bandwidth. By default, reference bandwidth is 100 Mbps — this means FastEthernet (100Mbps) and GigabitEthernet (1Gbps) have the same cost of 1, which fails to differentiate them. Increase reference bandwidth to 10,000+ Mbps to differentiate modern high-speed links.

**Key insight:** OSPF's design elegantly solves consistent routing: because all routers have identical topology information and run the same deterministic algorithm, they all produce the same routing table — eliminating routing inconsistencies and loops. The cost is scalability: every topology change triggers flooding and SPF recalculation. Areas exist specifically to bound this operational complexity.`,
    },
    {
      id: 842,
      name: "VLANs & Network Segmentation",
      desc: `**VLAN (Virtual Local Area Network)** — a logical network segment created within physical switch infrastructure that isolates Layer 2 broadcast domains without requiring separate physical switches. Devices in different VLANs cannot communicate at Layer 2 even if physically connected to the same switch — they require a router or Layer 3 switch to communicate.

**How VLANs work:** Ethernet frames are tagged with a VLAN ID (1-4094) using the IEEE 802.1Q standard — a 4-byte tag inserted into the Ethernet frame header. Switches use VLAN tags to keep traffic isolated between VLANs, forward only to ports in the same VLAN, and prevent inter-VLAN broadcast propagation.

**Access vs trunk ports:**
- **Access port** — connects to a single end device; frames are untagged in/out; the port is assigned to one VLAN
- **Trunk port** — carries multiple VLANs between switches, between a switch and a router, or to hypervisors; frames are tagged with 802.1Q VLAN IDs; used for switch-to-switch and switch-to-router uplinks

**Inter-VLAN routing:** Traffic between VLANs requires Layer 3 routing. Options:
- "Router on a stick" — one physical router interface with multiple 802.1Q sub-interfaces, one per VLAN
- Layer 3 switch — hardware-accelerated routing between VLANs; more efficient than a separate router

**Security use cases:** VLANs segment the network into security zones: user VLAN, server VLAN, management VLAN, guest VLAN, IoT VLAN. Combined with ACLs at VLAN boundaries, VLANs implement network segmentation that limits lateral movement if one segment is compromised.

**Key insight:** VLANs don't provide security by themselves — they only isolate broadcast domains. A misconfigured trunk port (carrying all VLANs) or VLAN hopping attack (double-tagging) can bypass VLAN isolation. Real security requires ACLs or a firewall enforcing policy between VLANs. VLANs are a segmentation mechanism, not a security boundary, unless protected by access controls.`,
    },
    {
      id: 843,
      name: "Spanning Tree Protocol (STP)",
      desc: `**Spanning Tree Protocol (STP)** — a Layer 2 protocol (IEEE 802.1D) that prevents network loops in switched Ethernet networks. Without STP, physically redundant switch paths cause broadcast storms — frames loop endlessly, consuming all bandwidth and crashing the network within seconds.

**The STP problem:** Physical loops are desirable for redundancy — if one uplink fails, traffic should flow over the alternate. But Layer 2 has no TTL (unlike IP) — frames with no TTL loop forever. A broadcast frame (like an ARP request) hitting a loop is copied at each switch pass, quickly multiplying to fill all bandwidth.

**STP operation:**
1. **Root bridge election** — the switch with the lowest bridge ID (priority + MAC address) becomes the root bridge
2. **Root port selection** — each non-root switch selects the port with the lowest path cost to the root as its root port (one per switch)
3. **Designated port selection** — one designated port per network segment (link); the switch with the lowest path cost to the root on that segment
4. **Blocking** — all other ports enter Blocking state; they receive BPDUs but don't forward frames
5. **Convergence** — initially takes 30-50 seconds; ports transition through Listening (15s) → Learning (15s) → Forwarding

**Rapid STP (RSTP, 802.1w):** Convergence in 1-2 seconds vs STP's 30-50 seconds; uses proposal/agreement handshake for fast port state transitions. "PortFast" and "BPDU Guard" for access ports (devices, not switches) bypass STP for immediate forwarding.

**Modern alternatives:** MLAG (Multi-Chassis Link Aggregation) and spine-leaf architectures in data centers avoid STP entirely by using equal-cost multipath (ECMP) routing at Layer 3, treating the network as routed from the access layer up.

**Key insight:** STP is one of the most important protocols to understand in enterprise networking — and one of the most dangerous to misconfigure. Unexpected STP topology changes (TC events) can cause 30+ second network outages. Proper STP design (manually set root bridge priority rather than letting election happen randomly) and monitoring STP topology events are critical operational practices.`,
    },
    {
      id: 844,
      name: "MPLS (Multiprotocol Label Switching)",
      desc: `**MPLS (Multiprotocol Label Switching)** — a high-performance packet forwarding technology that routes packets using short, fixed-length labels rather than long IP addresses, enabling fast switching in the network core and supporting advanced traffic engineering and VPN services. Standardized by IETF (RFC 3031, 2001); widely deployed by service providers and enterprise WAN operators.

**How MPLS works:**
- **Label Edge Routers (LERs)** — at the network ingress, add ("push") an MPLS label stack to packets; at egress, remove ("pop") labels and forward based on IP
- **Label Switch Routers (LSRs)** — in the network core, swap labels and forward based on label lookups (not IP routing); label tables are much smaller and faster to look up than full IP routing tables
- **Label Switched Paths (LSPs)** — pre-established paths through the network; defined by signaling protocols (RSVP-TE, LDP)

**MPLS applications:**
- **MPLS VPNs (L3VPN)** — service providers use MPLS to deliver Layer 3 VPN services; enterprise sites share provider infrastructure while being logically isolated (BGP VRFs)
- **Traffic engineering (MPLS-TE)** — explicitly route traffic over specific paths (bypassing IGP shortest path) to use underutilized links; reserve bandwidth for priority traffic
- **Quality of Service** — EXP/TC bits in the MPLS header carry traffic class information for QoS treatment

**MPLS and SD-WAN:** SD-WAN is largely displacing traditional MPLS WAN services. MPLS is expensive (service provider charges per-bit); SD-WAN uses commodity internet (broadband, 4G/5G) with software-based optimization. MPLS remains valuable for latency-sensitive, guaranteed-SLA traffic where it's available.

**Key insight:** Understanding MPLS is important for diagnosing issues in enterprise WAN environments — many organizations still rely on provider MPLS for site-to-site connectivity, especially where SD-WAN hasn't yet replaced it. The key operational insight: MPLS failures are often "label switching" problems — the control plane (routing) works but the forwarding plane (label switching) doesn't, causing mysterious black holes.`,
    },
    {
      id: 845,
      name: "Software-Defined Networking (SDN)",
      desc: `**SDN (Software-Defined Networking)** — a network architecture that separates the control plane (routing decisions) from the data plane (packet forwarding), centralizing network intelligence in a software controller rather than distributing it across individual network devices. Devices become "dumb" forwarders; the controller provides a unified programmable interface to the network.

**Traditional vs SDN:**
- **Traditional:** each router/switch independently runs routing protocols, maintains routing tables, and makes forwarding decisions; distributed intelligence; tight coupling of control and forwarding
- **SDN:** a central controller has a global view of the network topology; computes forwarding tables and pushes them to devices via a southbound API (OpenFlow, NETCONF, gRPC); devices are simple forwarding elements

**OpenFlow:** The original SDN southbound protocol (Stanford, 2008); a protocol for the controller to program match-action tables in switches. A match rule (match on destination IP, source MAC, VLAN tag, etc.) maps to an action (forward to port X, drop, modify header, send to controller).

**SDN use cases:**
- **Data center networking** — Google's Andromeda, VMware NSX, OpenStack Neutron; programmatic network provisioning
- **WAN traffic engineering** — Google's B4 and BwE; optimize WAN utilization using SDN on inter-data-center backbone
- **Network function virtualization (NFV)** — firewall, load balancer, NAT as software instead of dedicated hardware
- **Network automation** — any provisioning task becomes an API call rather than CLI commands on individual devices

**Key insight:** SDN's commercial impact has been more nuanced than its academic promise. "Pure" SDN with a central controller hasn't displaced traditional routing protocols at internet scale — BGP and OSPF still run the internet. But SDN thinking has transformed data center networking (VMware NSX, AWS VPC) and enabled network automation that was impractical with per-device CLI configuration.`,
    },
    {
      id: 846,
      name: "Network Address Translation — Advanced",
      desc: `**Advanced NAT** — the range of NAT behaviors beyond basic PAT, including hairpin NAT, NAT64, carrier-grade NAT (CGNAT), and the networking implications of different NAT behaviors for application design.

**NAT types (from STUN perspective):**
- **Full-cone NAT** — once internal IP:port is mapped to external IP:port, any external host can send to the external IP:port; most permissive; P2P-friendly
- **Address-restricted cone** — external host can only send if internal host previously sent to that external host's IP
- **Port-restricted cone** — external host can only send if internal host previously sent to that exact external IP:port
- **Symmetric NAT** — different external port used for each different destination; breaks many P2P protocols; requires TURN relay

**Carrier-Grade NAT (CGNAT / LSN):** Double NAT applied by ISPs when they're also out of IPv4 addresses. Home router gets a private IP in the 100.64.0.0/10 "shared address space" from the ISP; ISP performs NAT to its public IPs. This breaks many P2P applications and makes inbound connections nearly impossible.

**NAT64 / DNS64:** IPv6-only networks accessing IPv4 resources. DNS64 synthesizes AAAA records from A records (encodes IPv4 address in IPv6); NAT64 translates the IPv6 packet to IPv4 when it exits to the legacy internet. Enables IPv6-only deployments to communicate with IPv4-only services.

**Hairpin NAT (NAT reflection):** When an internal client accesses a service by its public IP (rather than internal IP), the router must NAT the source IP as well, so the server responds to the router (which then forwards to the client). Without hairpin NAT, the server responds directly to the internal client's private IP, which the client's packet didn't originate from — causing asymmetric routing failures.

**Key insight:** Symmetric NAT is the bane of WebRTC and VoIP. If either endpoint is behind symmetric NAT, direct P2P connection requires a TURN relay — adding latency and cost. NAT type is determined by the user's router and ISP, invisible to application developers. Robust real-time communication applications must implement TURN fallback and handle TURN costs.`,
    },
    {
      id: 847,
      name: "Equal-Cost Multi-Path (ECMP)",
      desc: `**ECMP (Equal-Cost Multi-Path routing)** — a routing strategy that allows traffic to be distributed across multiple paths with equal routing metrics, enabling both load balancing and redundancy at the network layer. When multiple routes to the same destination have equal cost, ECMP uses all of them simultaneously.

**How ECMP distributes traffic:** Routers hash packet headers (typically: source IP, destination IP, source port, destination port — the 5-tuple) to consistently assign each flow to one next-hop path. Consistency is key: all packets in the same TCP connection go to the same path to avoid out-of-order delivery. Different flows are distributed across available paths.

**ECMP in modern data centers:** Spine-leaf architectures use ECMP extensively. Each leaf switch connects to every spine switch with equal-cost links. Traffic from any server can reach any other server via any spine — load distributed across all spines. No spanning tree; no blocked ports; all links active.

**ECMP and asymmetric capacity:** ECMP assumes equal-cost links. Mixing 1Gbps and 10Gbps links in ECMP creates unequal load — the 1Gbps link gets the same number of flows as the 10Gbps link but at 1/10 the bandwidth. "Weighted ECMP" or UCMP (Unequal-Cost Multi-Path) handles this.

**ECMP and stateful middleboxes:** Firewalls and load balancers are stateful — they must see both directions of a connection (forward and return traffic). If ECMP distributes forward traffic via one path and return traffic via another, and those paths go through different firewalls, the stateful device only sees half the connection and drops it. "Asymmetric routing" and stateful firewalls don't mix.

**Key insight:** ECMP is the networking equivalent of horizontal scaling — add more links and get proportionally more throughput. The mental model shift from traditional networking (one active path, blocked backups) to ECMP-based networking (all paths active, traffic distributed) is fundamental to understanding why modern data center networks can scale to petabits of internal bandwidth.`,
    },
  ],
};

export default routingSwitching;
