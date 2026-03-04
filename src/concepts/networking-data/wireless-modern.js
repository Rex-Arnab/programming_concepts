const wirelessModern = {
  name: "Wireless & Modern Networks",
  icon: "📶",
  color: "#84cc16",
  concepts: [
    {
      id: 878,
      name: "Wi-Fi Standards (802.11)",
      desc: `**Wi-Fi (IEEE 802.11)** — the family of wireless networking standards that defines how devices communicate over radio frequencies in local area networks. Wi-Fi operates primarily in the 2.4 GHz and 5 GHz bands (and now 6 GHz for Wi-Fi 6E/7).

**Wi-Fi generations:**
- **802.11n (Wi-Fi 4, 2009)** — introduced MIMO (Multiple Input, Multiple Output), allowing multiple antennas for simultaneous data streams; max throughput: 600 Mbps; 2.4 GHz + 5 GHz
- **802.11ac (Wi-Fi 5, 2013)** — MU-MIMO (multi-user MIMO), up to 8 spatial streams; 5 GHz only (no 2.4 GHz for 802.11ac); max theoretical: 6.9 Gbps; beamforming
- **802.11ax (Wi-Fi 6/6E, 2019/2021)** — OFDMA (Orthogonal Frequency Division Multiple Access, enables simultaneous transmission to multiple devices), BSS Coloring (reduces interference from neighboring networks), TWT (Target Wake Time, improves battery life for IoT), WPA3 mandatory; Wi-Fi 6E adds 6 GHz band
- **802.11be (Wi-Fi 7, 2024)** — Multi-Link Operation (MLO, simultaneous use of multiple bands), 320 MHz channels, max 46 Gbps; extremely low latency

**The 2.4 GHz vs 5 GHz vs 6 GHz trade-off:**
- **2.4 GHz** — longer range (lower frequency penetrates walls better), higher interference (microwave ovens, Bluetooth, neighbors' networks), only 3 non-overlapping channels (1, 6, 11)
- **5 GHz** — shorter range, less interference, 25 non-overlapping channels, faster throughput
- **6 GHz** — no legacy devices, clean spectrum, excellent throughput, shorter range

**Key insight:** "Wi-Fi performance is slow" is almost always a spectrum congestion issue in apartment buildings and dense environments, not a device limitation. A Wi-Fi 5 router in a congested 5 GHz environment performs worse than a Wi-Fi 4 router in clean spectrum. Wi-Fi 6's OFDMA and BSS Coloring were specifically designed for dense, high-contention environments — they're worth the upgrade in apartment buildings and office environments.`,
    },
    {
      id: 879,
      name: "Cellular Networks (4G LTE & 5G)",
      desc: `**4G LTE (Long-Term Evolution)** — the current widely deployed cellular standard; theoretical peak: 100 Mbps downlink / 50 Mbps uplink; real-world: 20-100 Mbps typical. Fully packet-switched (unlike 3G which mixed circuit and packet); IP-based end-to-end. **5G NR (New Radio)** — the fifth generation standard; multiple spectrum tiers with very different characteristics.

**5G spectrum tiers:**
- **Sub-6 GHz (FR1)** — broad coverage; uses existing tower infrastructure; modest throughput improvements over 4G (2-4×); most deployed 5G is this tier; meaningful real-world improvement in congested areas (stadiums, urban centers)
- **mmWave (FR2, 24-52 GHz)** — extremely high bandwidth (multi-Gbps), extremely short range (meters), doesn't penetrate buildings; useful in stadiums, convention centers, dense urban outdoor deployment; still limited deployment

**Network architecture:**
- **LTE EPC (Evolved Packet Core)** — central control plane: MME (Mobility Management Entity), SGW, PGW, HSS, PCRF
- **5G Core (5GC)** — cloud-native, microservices-based architecture; network slicing; AMF, SMF, UPF functions; designed for software deployment on commodity hardware

**Network slicing (5G):** Create logically separate networks (slices) over shared physical infrastructure with different QoS guarantees. A slice for emergency services gets guaranteed low latency; a slice for IoT telemetry gets high connection density at low bandwidth per device; a slice for consumer broadband gets high throughput. Each slice is independently managed.

**5G for fixed wireless access:** 5G replacing fixed broadband in areas with poor fiber penetration — a 5G home gateway receives mobile signal, distributes Wi-Fi inside the house. T-Mobile and Verizon market this; real-world performance: 100-300 Mbps in good conditions.

**Key insight:** 5G is most impactful at network edges — in high-density environments where 4G is congested, and for applications requiring ultra-low latency (autonomous vehicles, industrial automation). For typical smartphone users in suburban areas, the 4G-to-5G improvement is modest in current deployments. The transformative 5G use cases (mmWave in dense venues, network slicing for industry) are still being deployed.`,
    },
    {
      id: 880,
      name: "SD-WAN",
      desc: `**SD-WAN (Software-Defined Wide Area Network)** — a technology that uses software-defined networking principles to manage WAN connectivity, enabling organizations to use multiple transport options (broadband internet, LTE, MPLS) intelligently and cost-effectively, with central management and automated traffic optimization.

**The problem SD-WAN solves:** Traditional WAN architecture relied on expensive MPLS circuits with rigid QoS and predictable (but costly) SLAs. Cloud migration changed the traffic pattern — traffic increasingly goes to the internet (SaaS, cloud), not back to the headquarters data center. Backhauling all traffic through headquarters ("hairpinning") over MPLS to reach the internet is wasteful and expensive.

**SD-WAN capabilities:**
- **Multi-path transport** — use multiple WAN connections simultaneously (MPLS + broadband + LTE); active/active or active/backup
- **Application-aware routing** — route based on application type; voice/video over MPLS (low latency SLA); bulk data over broadband (cheaper); auto-detect application using DPI (Deep Packet Inspection)
- **Dynamic path selection** — continuously measure link quality (loss, latency, jitter); automatically reroute applications to the best-performing path
- **Direct internet breakout** — route internet-bound traffic directly from branch offices to the internet; don't backhaul to headquarters; critical for SaaS performance
- **Centralized management** — configure, monitor, and update all edges from a central controller; zero-touch provisioning for new branches

**SD-WAN vendors:** Cisco Viptela, VMware Velocloud, Fortinet, Silver Peak (HP Aruba), Palo Alto Prisma SD-WAN.

**Key insight:** The business case for SD-WAN is simple: MPLS bandwidth costs 5-10× more than equivalent broadband. SD-WAN enables organizations to replace expensive MPLS circuits with cheap broadband while maintaining or improving application performance through intelligent traffic management. A typical enterprise sees 50-70% WAN cost reduction while improving performance.`,
    },
    {
      id: 881,
      name: "Network Virtualization (VXLAN & Overlays)",
      desc: `**Network virtualization** — creating logical network topologies decoupled from the physical network infrastructure, enabling flexible, software-defined network segmentation for cloud and data center environments.

**VXLAN (Virtual Extensible LAN):** The dominant data center and cloud overlay protocol. VXLAN encapsulates Layer 2 Ethernet frames in UDP packets, enabling Layer 2 network segments to span Layer 3 (IP) networks. This allows VMs on different physical hosts (connected by IP routing) to appear to be on the same Ethernet segment.

**VXLAN mechanics:**
- Each VXLAN segment has a 24-bit VNI (VXLAN Network Identifier) — allows 16 million virtual networks (vs VLAN's 4094)
- VTEP (VXLAN Tunnel End Point) — the software or hardware component that encapsulates/decapsulates VXLAN packets; typically on hypervisors (OVS, vSwitch) or physical switches
- Frames are encapsulated: outer UDP header (port 4789) + outer IP + VXLAN header (VNI) + original Ethernet frame

**Use cases:**
- **Multi-tenant cloud** — AWS VPCs, Azure VNets are VXLAN-based; each customer gets isolated virtual network segments over shared physical infrastructure
- **Data center overlay** — decouple VM mobility from physical network; VMs can migrate between hosts on any physical rack without IP changes
- **Kubernetes networking** — Flannel, Calico VXLAN mode, Cilium create pod-to-pod overlay networks using VXLAN

**Geneve (Generic Network Virtualization Encapsulation):** A more flexible successor to VXLAN; extensible header format; increasing adoption in cloud environments.

**Key insight:** VXLAN is why cloud VPCs can exist. A customer's VPC creates the illusion of a dedicated private Ethernet network — any VM can communicate with any other VM as if directly connected. Physically, those VMs are spread across thousands of servers. VXLAN's encapsulation makes the physical topology irrelevant to the virtual network — the fundamental abstraction that makes multi-tenant cloud infrastructure possible.`,
    },
    {
      id: 882,
      name: "IoT Networking",
      desc: `**IoT (Internet of Things) networking** — the network protocols, connectivity standards, and architecture patterns for connecting billions of constrained devices (sensors, actuators, controllers) that often have limited power, processing, memory, and intermittent connectivity.

**IoT connectivity spectrum (range vs bandwidth trade-off):**
- **Bluetooth/BLE (Bluetooth Low Energy)** — 10-100 meters; 1-3 Mbps; very low power; ideal for wearables, peripherals, indoor sensors; Bluetooth 5 extended range; BLE mesh for home automation
- **Zigbee/Z-Wave** — 10-100 meters per hop, mesh extends range; very low power; tens of kbps; designed for smart home mesh networks; self-healing mesh topology
- **Wi-Fi** — 30-100 meters; high bandwidth; high power consumption; appropriate for streaming devices, cameras, appliances on power
- **LoRaWAN** — 2-15 km; 0.3-50 kbps; extremely low power; battery life measured in years; ideal for geographically dispersed sensors (agriculture, smart city, environmental monitoring)
- **NB-IoT / LTE-M** — cellular-based LPWAN; NB-IoT: wide coverage, very low power, low bandwidth; LTE-M: higher bandwidth, lower latency, supports mobility; deployed over existing 4G/5G infrastructure

**IoT protocol stack:**
- **Application** — MQTT (most common), CoAP (UDP-based REST for constrained devices, RFC 7252), AMQP
- **Transport** — UDP (for low-overhead), TCP (for reliability when available)
- **Network** — IPv6 (6LoWPAN compresses IPv6 headers for constrained networks), IPv4

**Security challenges:** IoT devices are frequently shipped with default credentials, lack firmware update mechanisms, run outdated software, and can't support heavy cryptographic operations. Compromised IoT devices form botnets (Mirai) or provide lateral movement into corporate networks.

**Key insight:** The hardest IoT problem is not connectivity — it's security lifecycle management. A sensor deployed in a field for 10 years needs firmware updates, certificate rotation, and eventually decommissioning. Products shipped without over-the-air update capability are security liabilities from day one. IoT security starts at product design, not after deployment.`,
    },
    {
      id: 883,
      name: "Network Function Virtualization (NFV)",
      desc: `**NFV (Network Function Virtualization)** — replacing purpose-built network appliances (physical firewalls, load balancers, routers, NAT devices, WAN optimizers) with software running on commodity x86 servers. Defined by ETSI NFV ISG in 2012; core to telecom 5G core network deployment and enterprise network modernization.

**Traditional networking vs NFV:**
- **Traditional:** dedicated hardware appliances (firewall: Cisco ASA / Palo Alto; load balancer: F5 BIG-IP; router: Cisco ASR); expensive, rigid, long procurement cycles
- **NFV:** software versions of the same functions running in VMs or containers; scale by adding compute; provision in minutes not weeks

**NFV components:**
- **VNF (Virtual Network Function)** — the software version of a network function (virtual firewall, vRouter, virtual WAN optimizer)
- **NFVI (NFV Infrastructure)** — the underlying compute, storage, and network resources (servers, hypervisors, OpenStack, Kubernetes)
- **MANO (Management and Network Orchestration)** — lifecycle management (provisioning, scaling, healing) of VNFs

**NFV vs SDN:** SDN separates the control plane from the data plane and centralizes control; NFV virtualizes network functions. They complement each other: SDN provides the programmable network infrastructure; NFV runs virtualized network services on that infrastructure.

**Telecom NFV:** The 5G core (5GC) is entirely NFV-based — AMF, SMF, UPF, PCF are software functions running in containers on commodity Kubernetes. This represents the telecom industry's fundamental architecture shift from proprietary hardware to cloud-native software.

**Key insight:** NFV's value is most obvious in total cost of ownership. A physical F5 BIG-IP load balancer costs $50,000-200,000; an equivalent virtual edition runs on commodity hardware that costs a fraction of that, with the ability to scale by adding VM instances. The operational model also changes — "provision a new load balancer instance" becomes a Kubernetes deployment, not a 6-week hardware procurement cycle.`,
    },
    {
      id: 884,
      name: "eBPF Networking",
      desc: `**eBPF (extended Berkeley Packet Filter)** — a revolutionary Linux kernel technology that allows custom programs to run safely inside the kernel without modifying kernel source code or loading kernel modules. In networking, eBPF enables custom packet processing, filtering, and observability at kernel speed, bypassing the traditional network stack for specific use cases.

**Traditional networking pipeline limitation:** A packet arrives at a NIC → kernel network stack (many layers) → socket buffer → application. For high-performance networking, the user-kernel context switches and layer traversal are bottlenecks.

**eBPF networking capabilities:**
- **XDP (eXpress Data Path)** — attach eBPF programs to NIC driver level; process packets before they enter the kernel networking stack; 10-100 Gbps DDoS mitigation at the NIC level; Cloudflare uses XDP for DDoS mitigation
- **TC (Traffic Control) eBPF** — attach programs at the traffic control layer; packet filtering, manipulation, redirection; load balancing without NAT overhead
- **Socket-level programs** — intercept socket operations; implement custom socket policies
- **Observability** — capture any network event with zero performance overhead; trace every TCP connection, DNS query, HTTP request without code changes

**Cilium:** The dominant Kubernetes CNI (Container Network Interface) using eBPF. Implements Kubernetes networking, network policy, and load balancing entirely in eBPF — no iptables. Benefits: dramatic performance improvement over iptables (especially at scale with many services/pods), better observability (Hubble), and richer network policy.

**Replacing iptables:** iptables is O(n) in number of rules — performance degrades linearly with rule count. Large Kubernetes clusters have thousands of iptables rules. Cilium's eBPF implementation is O(1) for lookups using hash maps — consistent performance regardless of scale.

**Key insight:** eBPF is the most significant Linux kernel innovation in decades. It's enabling a generation of networking tools (Cilium, Falco, Pixie, Katran) that were previously impossible or required kernel patches. Understanding eBPF is increasingly important for platform engineers — it's the substrate on which next-generation observability and networking tools are built.`,
    },
    {
      id: 885,
      name: "5G Network Architecture",
      desc: `**5G network architecture** — the cloud-native, service-based architecture (SBA) of the 5G core (5GC) that replaces the 4G EPC's monolithic network elements with microservices communicating over HTTP/2 APIs, enabling flexible deployment, scaling, and network slicing.

**5G NF (Network Functions) — key components:**
- **AMF (Access and Mobility Management Function)** — handles registration, connection, and mobility management (replaces 4G MME)
- **SMF (Session Management Function)** — manages PDU sessions (data paths); allocates IP addresses; selects UPF
- **UPF (User Plane Function)** — the data plane; performs packet forwarding, QoS, traffic inspection; can be deployed at the edge (MEC) for low latency
- **PCF (Policy Control Function)** — defines session and mobility policies
- **UDM (Unified Data Management)** — subscriber data repository (replaces HSS)
- **AUSF (Authentication Server Function)** — handles authentication

**Service-based interface:** 5G NFs communicate via RESTful HTTP/2 APIs (unlike 4G's diameter/S1/X2 interfaces). Any NF can subscribe to events from any other NF. This SBA enables independent scaling — scale only the AMFs handling connection surges; SMF capacity can be independent.

**Multi-access Edge Computing (MEC):** Deploy compute (and UPF) at the base station level — 1-5 ms latency to edge application servers. Enables applications that can't tolerate 50+ ms round-trip to a central data center: industrial automation, AR/VR, V2X (vehicle-to-everything) communication.

**Open RAN (O-RAN):** Disaggregating the radio access network — separate the radio hardware from the software baseband processing; use open interfaces; enable software from multiple vendors. Aims to break Ericsson/Nokia/Huawei's integrated RAN dominance; still maturing.

**Key insight:** The 5G core's SBA is the telecom industry adopting cloud-native patterns 10 years after hyperscalers. This enables telecom operators to run their core network on Kubernetes, scale individual NFs independently, and deploy network slices as separate logical networks. The architecture is sound; the operational maturity for running carrier-grade infrastructure on commodity Kubernetes is still being developed.`,
    },
    {
      id: 886,
      name: "Network Time Protocol (NTP)",
      desc: `**NTP (Network Time Protocol)** — the protocol for synchronizing clocks across computers on a network to a common time reference. Clock synchronization is critical for distributed systems: logging (correlating events across systems), security (certificate validity, token expiry), databases (consistent ordering), and distributed coordination protocols.

**NTP hierarchy (stratum levels):**
- **Stratum 0** — primary time references (atomic clocks, GPS receivers, CDMA clocks); not on the network directly
- **Stratum 1** — servers directly connected to Stratum 0 references; national time servers (time.nist.gov, time.windows.com, time.apple.com)
- **Stratum 2** — servers that sync from Stratum 1; the level most internet-connected servers use
- **Stratum 3+** — servers syncing from Stratum 2; each hop adds a small amount of drift and uncertainty

**How NTP works:** Client queries server; server responds with timestamps allowing the client to calculate round-trip time and offset; client adjusts local clock by slewing (gradual adjustment) to avoid time jumps. NTP can achieve accuracy of 1-10 ms over the internet, 1 ms or better on LANs.

**PTP (Precision Time Protocol, IEEE 1588):** Sub-microsecond accuracy for applications requiring it (financial trading, telecom, industrial automation). Requires hardware timestamping in NICs; operates on the LAN; impractical over internet.

**Chrony:** Modern NTP implementation (replacing ntpd on most Linux distributions); faster initial synchronization; better handling of unstable clocks and intermittent network access; recommended for all new deployments.

**Key insight:** Incorrect system clocks cause bizarre, hard-to-diagnose problems: TLS handshake failures (certificate validity window), JWT token rejections (token is from "the future"), log correlation confusion, and distributed lock failures. "Check if clocks are in sync" should be one of the first steps when debugging mysterious distributed system failures.`,
    },
    {
      id: 887,
      name: "STUN, TURN & ICE (WebRTC/VoIP)",
      desc: `**STUN/TURN/ICE** — the NAT traversal framework that enables peer-to-peer communication between devices behind NAT, essential for WebRTC (video/audio conferencing), VoIP, and any P2P protocol.

**The NAT traversal problem:** Both communicating parties are behind NAT devices that block unsolicited incoming connections. Neither can directly initiate a connection to the other's private IP address. ICE coordinates the discovery of possible paths and selects the best working one.

**STUN (Session Traversal Utilities for NAT):**
- A STUN server is a publicly accessible server that reflects a client's public IP and port back to it
- A client behind NAT sends a STUN request; the server responds with "your public IP is 203.0.113.1 and your public port is 54321"
- This is the "server reflexive" candidate — the address as seen from the internet
- Works for most NAT types; fails for symmetric NAT (different external port per destination)

**TURN (Traversal Using Relays around NAT):**
- A relay server that forwards packets between two peers
- Both peers connect to the TURN server; TURN relays traffic between them
- Always works but adds latency and cost; last resort when direct P2P fails
- Requires significant bandwidth on the TURN server; typically ~100KB/s per active video stream

**ICE (Interactive Connectivity Establishment):**
- Discovers all possible paths (candidates): host candidates (direct LAN), server reflexive candidates (STUN), relay candidates (TURN)
- Tests connectivity for each candidate pair (connectivity checks via STUN binding requests)
- Selects the highest-priority working pair (prefer direct > STUN reflexive > TURN relay)
- Handles NAT traversal, prioritization, and fallback automatically

**Key insight:** In production WebRTC deployments, approximately 80-85% of connections succeed via STUN (direct or server-reflexive) without needing TURN relay. The remaining 15-20% behind symmetric NAT require TURN. Always provision TURN capacity — applications that rely solely on STUN will fail for 15-20% of users, typically those in enterprise or carrier-grade NAT environments.`,
    },
  ],
};

export default wirelessModern;
