const fundamentals = {
  name: "Networking Fundamentals",
  icon: "🌐",
  color: "#6366f1",
  concepts: [
    {
      id: 794,
      name: "OSI Model",
      desc: `**OSI (Open Systems Interconnection) Model** — a conceptual 7-layer framework that standardizes how different network systems communicate, allowing products and software from different vendors to interoperate. Developed by ISO in 1984. Each layer handles a specific aspect of networking and only communicates with the layers directly above and below it.

**The 7 layers (mnemonic: "Please Do Not Throw Sausage Pizza Away"):**
1. **Physical** — raw bits over a medium; cables, fiber, radio signals, voltage levels
2. **Data Link** — node-to-node delivery on the same network segment; MAC addresses, Ethernet frames, switches
3. **Network** — routing between networks; IP addresses, routers
4. **Transport** — end-to-end communication between processes; TCP, UDP, port numbers
5. **Session** — managing connections between applications; establishment, maintenance, termination
6. **Presentation** — data formatting, encryption, compression; TLS, encoding
7. **Application** — the interface for end-user software; HTTP, DNS, SMTP, FTP

**OSI vs real life:** TCP/IP (the actual internet protocol suite) is a 4-layer model that maps loosely to OSI: Network Access (OSI 1-2), Internet (OSI 3), Transport (OSI 4), Application (OSI 5-7). The OSI model is primarily a teaching and diagnostic framework, not an implementation spec.

**Why learn it:** The OSI model is the shared vocabulary for discussing where in the stack a problem lies. "That's a Layer 3 issue" — routing problem. "L7 load balancer" — routes traffic based on application-layer data (HTTP headers, URLs). The model structures network troubleshooting systematically.

**Key insight:** When debugging network issues, the OSI model provides a diagnostic ladder — start at Layer 1 ("is the cable plugged in?") and work up. Most "mysterious" network failures are mundane issues at a specific layer: misconfigured routing (L3), firewall rules (L3-L4), or application misconfiguration (L7). The model prevents random troubleshooting.`,
    },
    {
      id: 795,
      name: "TCP/IP Model",
      desc: `**TCP/IP Model** (Internet Protocol Suite) — the practical 4-layer networking model that underpins all internet communication, developed by DARPA in the 1970s. Unlike OSI (a theoretical framework), TCP/IP is an actual implementation standard. Every networked device on the internet communicates via TCP/IP.

**The 4 layers:**
1. **Link Layer** (Network Access) — physical medium and hardware addressing; Ethernet, Wi-Fi, ARP; gets packets onto the local network
2. **Internet Layer** — logical addressing and routing across networks; IP (IPv4/IPv6), ICMP, routing protocols; gets packets to the destination network
3. **Transport Layer** — process-to-process communication with reliability or speed trade-offs; TCP (reliable, ordered, connection-oriented) or UDP (unreliable, unordered, connectionless)
4. **Application Layer** — protocols used by applications; HTTP, DNS, SMTP, SSH, FTP

**Encapsulation:** Data travels down the stack at the sender, gaining headers at each layer (a process called encapsulation), and strips headers at each layer at the receiver (decapsulation). An HTTP request becomes: HTTP data → TCP segment → IP packet → Ethernet frame → electrical signal on the wire.

**Why TCP/IP won:** The internet was designed as a packet-switched network with no central control — TCP/IP's connectionless Internet Layer (IP) enables this. Each router only needs to know how to forward a packet one hop closer to the destination; it doesn't maintain connection state. This simplicity and scalability enabled internet growth from thousands to billions of devices.

**Key insight:** Understanding TCP/IP means understanding that the internet is fundamentally about packets: self-contained units of data with source and destination addresses, which routers forward independently. Two packets in the same conversation may take entirely different physical paths across the internet and arrive out of order — TCP's job is to reassemble them correctly.`,
    },
    {
      id: 796,
      name: "IP Addressing (IPv4 & IPv6)",
      desc: `**IP Address** — a logical identifier assigned to each device on a network, used by the Internet Layer to route packets to their destination. IPv4 uses 32-bit addresses (4.3 billion total); IPv6 uses 128-bit addresses (340 undecillion — effectively unlimited).

**IPv4:** Written as four decimal octets (0-255) separated by dots: "192.168.1.1". Of the 4.3 billion IPv4 addresses, large blocks are reserved: private ranges (10.x.x.x, 172.16-31.x.x, 192.168.x.x — not routable on the public internet), loopback (127.0.0.1 = "localhost"), multicast, and broadcast. IPv4 exhaustion was declared in 2011 for IANA; regional registries exhausted address pools between 2012-2019.

**IPv6:** Written as eight groups of four hex digits separated by colons: "2001:0db8:85a3:0000:0000:8a2e:0370:7334". Leading zeros in groups can be omitted; consecutive all-zero groups can be compressed to "::". IPv6 was designed to address IPv4 exhaustion; adoption has reached ~40% of internet traffic as of 2024.

**Why IPv6 adoption is slow:** Most internet infrastructure still uses IPv4 with NAT (Network Address Translation) to stretch the address space. IPv6 and IPv4 are not directly interoperable — dual-stack (running both simultaneously) is the standard transition approach. Operating systems, routers, and ISPs all need to support IPv6, requiring coordinated upgrade.

**Link-local vs global scope:** IPv6 addresses have scopes: link-local (fe80::/10, only valid on the local segment), unique-local (fc00::/7, private range equivalent), and global unicast (2000::/3, publicly routable). IPv6 eliminates NAT — every device gets a globally unique, publicly routable address.

**Key insight:** IPv6 is not just "more IP addresses" — it redesigns aspects of IP fundamentally: IPSec is integrated (not optional), multicast replaces broadcast, neighbor discovery replaces ARP, and every interface can have multiple addresses simultaneously. The transition is slow precisely because it's a fundamental protocol change, not just a version number bump.`,
    },
    {
      id: 797,
      name: "Subnetting & CIDR",
      desc: `**Subnetting** — the practice of dividing a larger IP network into smaller sub-networks (subnets), enabling efficient address allocation, traffic isolation, and security segmentation. **CIDR (Classless Inter-Domain Routing)** — the notation and addressing scheme that replaced the rigid classful IPv4 system; allows any network boundary, not just class A/B/C boundaries.

**CIDR notation:** An IP address followed by a slash and the prefix length: "192.168.1.0/24" means the first 24 bits are the network portion, the last 8 bits are for hosts. A "/24" subnet has 2^8 = 256 addresses (254 usable — one for network address, one for broadcast).

**Subnet mask:** The alternative notation for prefix length: "/24" = "255.255.255.0". The mask marks which bits are network bits (1s) and which are host bits (0s). Bitwise AND of IP address and mask = network address.

**Common subnet sizes:**
- "/32" — single host (used for loopback routes, host routes)
- "/30" — 4 addresses, 2 usable; point-to-point links
- "/29" — 8 addresses, 6 usable
- "/28" — 16 addresses, 14 usable
- "/24" — 256 addresses, 254 usable; the most common "one network segment" unit
- "/16" — 65,536 addresses; entire private 172.16-31.x.x range is "/12"
- "/8" — 16.7 million addresses; e.g., the entire "10.x.x.x" private range

**Variable Length Subnet Masking (VLSM):** Using different prefix lengths for different subnets within the same address space, matching subnet size to actual host count requirements — minimizes address waste.

**Key insight:** Subnetting is the IP addressing skill that separates network engineers from people who just configure things. Understanding CIDR means being able to instantly answer: "which subnet does 10.1.5.17 belong to if subnets are /27?" It's pure binary math with a practical application — and it's the foundation of routing table design, cloud VPC architecture, and firewall rule writing.`,
    },
    {
      id: 798,
      name: "MAC Addresses & ARP",
      desc: `**MAC Address** (Media Access Control address) — a hardware identifier assigned to a network interface controller (NIC) at manufacturing time, used for communication within a local network segment (the Data Link Layer). A 48-bit (6 byte) address typically written as six hex pairs: "00:1A:2B:3C:4D:5E". The first three bytes identify the manufacturer (OUI — Organizationally Unique Identifier); the last three are device-specific.

**How MAC addresses are used:** Within an Ethernet network, frames are addressed using MAC addresses — not IP addresses. A switch forwards frames based on MAC address tables, learning which MAC address is reachable on which port. MAC addresses are local — they are stripped and replaced at each router hop (unlike IP addresses, which persist from source to destination).

**ARP (Address Resolution Protocol):** The mechanism that resolves an IP address to its corresponding MAC address on the local network. When a device wants to send a packet to "192.168.1.1" and only knows the IP, it broadcasts an ARP request ("Who has 192.168.1.1? Tell me your MAC address"). The device with that IP responds with its MAC address, which is cached in the sender's ARP table for future use.

**ARP in practice:** Every IP packet sent on a LAN requires an ARP resolution first (unless cached). The ARP table ("arp -n" on Linux) maps IP addresses to MAC addresses with a TTL. ARP is a Layer 2 protocol — it doesn't cross routers (unlike IP).

**ARP spoofing:** A security attack where an attacker sends forged ARP responses, associating their MAC address with a legitimate IP address. Traffic intended for the victim is then redirected to the attacker — enabling man-in-the-middle attacks. Mitigated by Dynamic ARP Inspection (DAI) on managed switches.

**Key insight:** MAC addresses are a "this physical hop" address; IP addresses are a "this logical destination" address. Understanding the distinction clarifies why your laptop has both — and why ARP is needed to translate between them at each network segment.`,
    },
    {
      id: 799,
      name: "Network Topologies",
      desc: `**Network topology** — the arrangement of nodes and connections in a network, both physical (how cables and hardware are connected) and logical (how data flows). Topology choices affect cost, fault tolerance, scalability, and performance.

**Physical topologies:**
- **Bus** — all devices on a single shared cable; one failure can take down the entire segment; mostly historical (10BASE5 coax)
- **Star** — all devices connect to a central switch; most common in modern LANs; single switch failure brings down the segment, but individual node failures are isolated
- **Ring** — each device connects to the next in a loop; historically used in FDDI and Token Ring; single break disrupts the entire ring unless dual ring (SONET)
- **Mesh** — every node connects to every other node; maximum redundancy; expensive and complex; used in core internet infrastructure and data center fabrics
- **Partial mesh** — some nodes have multiple connections; balance of redundancy and cost; typical in WAN designs

**Logical topologies (how data flows regardless of physical layout):**
- A physical star can behave as a logical bus (shared Ethernet) or logical star (switched Ethernet)
- The internet is a logical mesh — packets can route through many different paths

**Modern data center topology:** Spine-leaf architecture — two-tier design with leaf switches (connecting servers) and spine switches (connecting leaves). Every leaf connects to every spine; any server can reach any other server in at most two hops. No spanning tree required; simple, predictable latency; scales horizontally by adding leaves or spines.

**Key insight:** Topology determines failure domains. In a bus topology, one failure affects everyone; in a star, one failure affects one device; in a mesh, failures are absorbed by alternate paths. Designing fault-tolerant networks means designing topologies with appropriate redundancy — and understanding which failures the topology can and cannot absorb.`,
    },
    {
      id: 800,
      name: "Bandwidth, Latency & Throughput",
      desc: `**Bandwidth** — the maximum rate at which data can be transferred over a network link, measured in bits per second (bps, Kbps, Mbps, Gbps). The "width of the pipe." A 1 Gbps Ethernet interface can transfer up to 1 billion bits per second. **Latency** — the time it takes for a packet to travel from source to destination, measured in milliseconds. **Throughput** — the actual rate of successful data delivery achieved in practice; always ≤ bandwidth.

**Why throughput < bandwidth:** Protocol overhead (headers), congestion, TCP slow start, packet loss (retransmissions), and interference all reduce the effective throughput below the theoretical bandwidth limit.

**Latency components:**
- **Propagation delay** — the time for a signal to physically travel; speed of light in fiber is ~200,000 km/s. A round-trip San Francisco to London = ~85ms propagation alone.
- **Transmission delay** — time to put all bits on the wire; size / bandwidth (a 1 MB packet on a 1 Mbps link takes 8 seconds to transmit)
- **Processing delay** — time for routers and switches to process headers and forward packets
- **Queuing delay** — time waiting in router buffers due to congestion

**Latency vs bandwidth trade-off:** For bulk data transfer (large files), bandwidth dominates — more bandwidth = faster transfer. For interactive applications (remote desktop, voice calls, gaming), latency dominates — doubling bandwidth doesn't help if round-trip time is 200ms. For small requests (HTTP APIs), latency dominates regardless of bandwidth.

**The bandwidth-delay product:** bandwidth × round-trip time = the amount of data "in flight" that can fill a TCP connection's pipe. High-bandwidth, high-latency links (satellite) require large TCP window sizes to be utilized efficiently; the default TCP window often leaves these links severely underutilized.

**Key insight:** The speed of light is the fundamental constraint on latency. No protocol optimization can make London closer to Tokyo. This is why CDNs exist — bringing content closer to users reduces the physical propagation distance, directly reducing latency. Bandwidth can be purchased; propagation delay cannot be engineered away.`,
    },
    {
      id: 801,
      name: "Packets, Frames & Encapsulation",
      desc: `**Packet** — the fundamental unit of data transmission in IP networking. A packet contains a header (source IP, destination IP, protocol, TTL, and other control fields) and a payload (the data being carried). **Frame** — the Data Link Layer equivalent; wraps a packet with hardware addressing (source MAC, destination MAC) and error-checking (CRC checksum).

**Encapsulation process (sending):**
1. Application creates data (HTTP response body)
2. TCP adds a segment header (source port, destination port, sequence number, checksum)
3. IP adds a packet header (source IP, destination IP, TTL, protocol)
4. Ethernet adds a frame header (source MAC, destination MAC) and trailer (CRC)
5. Physical layer converts to electrical/optical/radio signals

**Decapsulation (receiving):** Each layer strips its header and passes the payload up to the next layer. The switch operates at Layer 2 (reads MAC addresses, strips at Layer 2). The router operates at Layer 3 (reads IP addresses, strips at Layer 3, re-encapsulates for the next hop).

**Maximum Transmission Unit (MTU):** The largest frame size a network link can carry. Ethernet standard: 1500 bytes. Jumbo frames (used in data centers): up to 9000 bytes. If an IP packet is larger than the path MTU, it must be fragmented (IPv4) or the sender notified to reduce packet size (IPv6 uses Path MTU Discovery). Mismatched MTU settings cause mysterious connectivity failures where large packets fail but small ones succeed.

**Time To Live (TTL):** An 8-bit field in the IP header, decremented by each router. When TTL reaches 0, the packet is discarded and an ICMP "Time Exceeded" message is sent to the source. Prevents routing loops from circulating packets indefinitely. The "traceroute" command exploits TTL — sending packets with TTL=1, 2, 3, etc. to identify each hop.

**Key insight:** TTL is not measured in time — it's measured in hops. The "Time" in the name is historical (original RFC specified it in seconds; practice changed to hops). Understanding TTL explains both traceroute's operation and why routing loops are bounded — they burn through TTL and self-extinguish.`,
    },
    {
      id: 802,
      name: "Hub, Switch & Router",
      desc: `**Hub** — a Layer 1 device that broadcasts every incoming packet to all connected ports. Every device receives every packet, regardless of destination. Causes excessive collisions and bandwidth waste. Effectively obsolete — replaced by switches. **Switch** — a Layer 2 device that learns which MAC address is on which port and forwards frames only to the appropriate destination port. **Router** — a Layer 3 device that routes packets between different IP networks using routing tables.

**How a switch learns MAC addresses:**
1. When a frame arrives, the switch records the source MAC address and the incoming port in its MAC address table (CAM table)
2. It looks up the destination MAC in the table
3. If found: forwards only to that port
4. If not found (unknown unicast): floods to all ports except the incoming one

**Switches vs routers:**
- Switches: same network, MAC addresses, Layer 2; fast hardware forwarding; no IP awareness in basic operation
- Routers: different networks, IP addresses, Layer 3; route based on routing tables; implement NAT, firewalling, QoS

**Layer 3 switches:** Modern managed switches include routing capabilities — they can route between VLANs (inter-VLAN routing) using hardware-accelerated routing. The line between switch and router has blurred; data center "top of rack" switches perform full IP routing.

**Broadcast domains:** All devices in the same subnet share a broadcast domain — ARP requests, DHCP discovery, and other broadcasts reach every device. Routers (and VLAN boundaries) segment broadcast domains. Broadcast domains should be kept small in large networks — a flat /16 with 65,000 devices in one broadcast domain generates enormous broadcast traffic.

**Key insight:** A switch makes networks efficient by eliminating unnecessary traffic — only the intended recipient sees a unicast frame. A router makes networks scalable by segmenting broadcast domains and providing policy control between network segments. Together they define the architecture of every modern network from home to data center.`,
    },
    {
      id: 803,
      name: "DHCP",
      desc: `**DHCP (Dynamic Host Configuration Protocol)** — the protocol that automatically assigns IP addresses, subnet masks, default gateways, and DNS server addresses to devices when they connect to a network. Without DHCP, every device would need a manually configured static IP address — a management nightmare at scale.

**The DORA process (4-way handshake):**
1. **Discover** — client broadcasts "I need an IP address" (from 0.0.0.0 to 255.255.255.255)
2. **Offer** — DHCP server responds with a proposed IP address and configuration
3. **Request** — client broadcasts acceptance of the offered address (broadcast allows other servers to see the selection)
4. **Acknowledge** — server confirms the lease; client configures its interface

**DHCP lease:** IP addresses are leased for a finite period (minutes to days). Before expiry, clients attempt to renew. If the server is unreachable at renewal time, clients can use the address until the lease expires; afterward, they restart DORA.

**DHCP relay:** DHCP uses broadcast, which doesn't cross routers. In networks with multiple subnets but a central DHCP server, a DHCP relay agent (typically the router) forwards DHCP broadcasts as unicast to the server. The server knows which subnet the client is on from the relay agent's IP.

**Static vs dynamic DHCP:** Most DHCP deployments use a pool of addresses assigned dynamically. DHCP reservations (static bindings) assign a specific IP to a specific MAC address — the device always gets the same IP through DHCP, combining the convenience of DHCP with the predictability of static addresses.

**Key insight:** DHCP is the reason you can plug a laptop into any network in the world and have connectivity within seconds. The failure modes are revealing: if DHCP is down, no new devices get IPs; devices with existing leases continue working until expiry. This asymmetry means DHCP failures are sometimes noticed only when new devices try to connect.`,
    },
    {
      id: 804,
      name: "NAT (Network Address Translation)",
      desc: `**NAT (Network Address Translation)** — a mechanism that remaps IP addresses as packets pass through a router, enabling many devices on a private (RFC 1918) IP network to share a single public IP address. NAT was the primary mechanism that stretched the IPv4 address space from its theoretical exhaustion in the 1990s until today.

**How NAT works (PAT — Port Address Translation, the most common form):**
1. Device "192.168.1.100:54321" sends a packet to "1.2.3.4:80"
2. NAT router replaces source IP with its public IP and records the mapping: "public_ip:60001 → 192.168.1.100:54321"
3. Packet goes to internet with source "public_ip:60001"
4. Response returns to "public_ip:60001"
5. NAT router translates back: replaces destination with "192.168.1.100:54321" and forwards

**Types of NAT:**
- **Static NAT** — one-to-one mapping of private to public IP; used for servers behind NAT that need to be reachable
- **Dynamic NAT** — a pool of public IPs mapped dynamically; rarely used today
- **PAT (Masquerade / Overload)** — many private IPs share one public IP using port numbers; the standard home/enterprise NAT

**NAT and peer-to-peer:** NAT was designed for client-server architectures where internal clients initiate connections to external servers. Peer-to-peer and VoIP require NAT traversal techniques (STUN, TURN, ICE) because NAT blocks incoming connections that weren't initiated from inside.

**NAT and IPv6:** IPv6 eliminates the need for NAT — every device gets a globally unique address. However, NAT provides a form of incidental security (external hosts can't directly initiate connections to NAT-ed devices) that some organizations want to preserve even with IPv6.

**Key insight:** NAT is simultaneously a brilliant hack (extending IPv4 decades beyond its expiry date) and an architectural violation (breaking the end-to-end principle of the internet — the idea that any host should be able to communicate directly with any other host). The internet's peer-to-peer problems are largely NAT's fault.`,
    },
    {
      id: 805,
      name: "Network Ports & Sockets",
      desc: `**Port** — a 16-bit number (0–65535) that identifies a specific process or service on a host, allowing multiple services to share the same IP address. Ports allow a server with one IP address to run a web server (port 80/443), SSH (port 22), email (port 25/587), and many other services simultaneously.

**Port categories:**
- **Well-known ports (0–1023)** — assigned by IANA to standard services: 22 (SSH), 25 (SMTP), 53 (DNS), 80 (HTTP), 443 (HTTPS), 3306 (MySQL), 5432 (PostgreSQL), 6379 (Redis), 27017 (MongoDB)
- **Registered ports (1024–49151)** — registered with IANA but not restricted; application-specific
- **Dynamic/ephemeral ports (49152–65535)** — assigned by the OS for client-side connections; a browser opening a connection to google.com gets a random source port from this range

**Socket:** A socket is one endpoint of a bidirectional communication link. Identified by the 5-tuple: (protocol, local IP, local port, remote IP, remote port). Every active connection is uniquely identified by this tuple. A server "listening" on port 80 is waiting for connections; each accepted connection creates a new socket with a unique 5-tuple.

**The "too many open files" error:** Each socket consumes a file descriptor. Systems have limits on open file descriptors (ulimit). High-traffic servers hit this limit — a busy web server with thousands of concurrent connections needs a high file descriptor limit (typically set to 65536 or higher in production).

**Port scanning:** Tools like nmap discover which ports are open on a host by attempting connections. Open ports reveal running services; firewall rules determine which ports are accessible from which sources. Security posture = close every port not needed; whitelist only required access.

**Key insight:** A port number alone doesn't identify a service — the combination of IP, port, and protocol does. You can run an SSH server on port 8022 and a web server on port 22 (just confusing). What matters is what process is listening on which port — port numbers are conventions, not protocols themselves.`,
    },
  ],
};

export default fundamentals;
