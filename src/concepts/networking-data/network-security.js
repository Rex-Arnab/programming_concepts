const networkSecurity = {
  name: "Network Security",
  icon: "🔒",
  color: "#ef4444",
  concepts: [
    {
      id: 848,
      name: "Firewalls",
      desc: `**Firewall** — a network security device (hardware or software) that monitors and controls incoming and outgoing network traffic based on predefined security rules, establishing a barrier between trusted internal networks and untrusted external networks. The fundamental network security control.

**Types of firewalls:**
- **Packet filtering (stateless)** — inspects individual packets against ACL rules (source IP, destination IP, protocol, port); no awareness of connection state; fast but limited; can't distinguish legitimate response packets from attack packets without explicit rules
- **Stateful inspection** — tracks connection state; a response packet is only allowed if it belongs to an established, allowed connection; the standard for modern firewalls
- **Application layer / next-generation firewall (NGFW)** — inspects application layer content (HTTP, DNS, TLS SNI); can apply policy based on application identity, user identity, URL categories, file types; Palo Alto, Fortinet, Check Point

**Firewall placement:**
- **Perimeter firewall** — between internet and internal network; protects against external attacks
- **Internal segmentation firewall** — between internal network zones (user network, server network, PCI environment); limits lateral movement
- **Host-based firewall** — software on individual hosts (iptables/nftables on Linux, Windows Defender Firewall); enforces policy regardless of network position

**Firewall rule principles:** Default-deny (block all, whitelist specific allowed traffic); ingress filtering (filter incoming traffic from external sources); egress filtering (filter outgoing traffic to prevent data exfiltration and malware callbacks — often neglected).

**Key insight:** The hardest firewall problem is egress filtering. Inbound rules are well-understood; egress rules are often a permissive "allow any outbound" that enables malware C2 communication, data exfiltration, and DNS tunneling. Application-aware firewalls that block unauthorized outbound connections are the correct answer — but require significant operational investment to manage without breaking legitimate applications.`,
    },
    {
      id: 849,
      name: "VPN (Virtual Private Network)",
      desc: `**VPN (Virtual Private Network)** — a technology that creates an encrypted tunnel over a public network (typically the internet), allowing remote users or sites to communicate as if they were on the same private network. Used for secure remote access, site-to-site connectivity, and privacy.

**VPN types:**
- **Remote access VPN** — individual users (employees, contractors) connect to the corporate network from anywhere; client software creates an encrypted tunnel; user's traffic routes through corporate network (split-tunnel: only corporate traffic; full-tunnel: all traffic through VPN)
- **Site-to-site VPN** — connects entire networks at different locations (branch offices, data centers, cloud VPCs) via always-on encrypted tunnels; IPsec most common

**VPN protocols:**
- **IPsec** — network-layer encryption; supports both transport mode (encrypts payload) and tunnel mode (encrypts entire packet); uses IKE for key negotiation; robust but complex to configure
- **OpenVPN** — SSL/TLS-based; runs over UDP or TCP; widely compatible; moderately complex setup; open-source
- **WireGuard** — modern, minimal protocol (4,000 lines of code); UDP-based; excellent performance; easy to configure; built into Linux kernel 5.6+; increasingly the default for new deployments
- **SSL VPN / TLS VPN** — browser-based or clientless; simpler deployment; Palo Alto GlobalProtect, Cisco AnyConnect

**Split tunneling vs full tunnel:** Split tunneling routes only corporate traffic through the VPN; all other traffic goes direct. More efficient; reduces VPN bandwidth load. Full tunnel routes everything through VPN; provides visibility and control over all user traffic; slower.

**Key insight:** WireGuard has fundamentally changed VPN expectations. Traditional IPsec VPNs have thousands of lines of protocol implementation, complex configuration (ESP, AH, IKE, Phase 1/2 parameters), and cryptographic agility that creates attack surface. WireGuard's minimal codebase, fixed modern cryptography, and simple configuration make it auditable and operationally simple. For new deployments, there is rarely a good reason to choose IPsec over WireGuard.`,
    },
    {
      id: 850,
      name: "Zero Trust Networking",
      desc: `**Zero Trust** — a security model and architecture that assumes no implicit trust — every access request is authenticated, authorized, and continuously validated regardless of whether the user/device is inside or outside the corporate network perimeter. Coined by John Kindervag at Forrester Research in 2010; accelerated by cloud adoption and remote work.

**The core principle:** "Never trust, always verify." Traditional perimeter-based security assumed internal network = trusted; external = untrusted. Zero Trust eliminates this assumption — a compromised internal device is as dangerous as an external attacker.

**Zero Trust components:**
- **Identity verification** — strong authentication (MFA) for every user; no session persistence
- **Device health** — only healthy, managed devices can access resources; device posture checks (patched, encrypted, compliant)
- **Least-privilege access** — users get access to only what they need for the specific task; no broad network access grants
- **Micro-segmentation** — network divided into small zones; workloads can't communicate without explicit authorization; lateral movement is blocked even if one workload is compromised
- **Continuous monitoring** — all access logged and analyzed; anomalous behavior triggers re-authentication or access revocation

**Zero Trust vs VPN:** Traditional VPN grants broad network access after authentication — once inside, the user can reach many internal resources. Zero Trust grants access to specific applications/services, not the network. Okta, Zscaler, Google BeyondCorp, Cloudflare Access implement Zero Trust network access (ZTNA).

**Key insight:** Zero Trust is not a product you buy — it's an architectural approach you implement over time. Most organizations are years from full Zero Trust adoption; the path is incremental: start with strong identity (MFA everywhere), then device compliance, then application-level access policies. The SolarWinds and Colonial Pipeline attacks, where internal network access enabled massive lateral movement, are the business case for Zero Trust.`,
    },
    {
      id: 851,
      name: "DDoS Attacks & Mitigation",
      desc: `**DDoS (Distributed Denial of Service)** — an attack that overwhelms a target system (server, network, service) with traffic from thousands of coordinated sources, rendering it unavailable to legitimate users. Distributed nature (many sources) makes blocking by source IP ineffective.

**DDoS attack types:**
- **Volumetric attacks** — flood the target with traffic to saturate bandwidth; UDP flood, ICMP flood, DNS amplification (DNS reflection exploits the response-to-query size ratio); measured in Gbps or Tbps
- **Protocol attacks** — exploit weaknesses in network protocols; SYN flood (half-open connection state exhaustion), ping of death, Smurf attack; measured in pps (packets per second) or connections per second
- **Application layer attacks (Layer 7)** — targeted HTTP requests that appear legitimate but exhaust server resources; slowloris (holds connections open without completing requests); HTTP floods; harder to detect because traffic looks legitimate

**Mitigation approaches:**
- **Upstream filtering / scrubbing centers** — Cloudflare, Akamai, AWS Shield Advanced absorb attack traffic at their massive network capacity before it reaches the origin; traffic is "scrubbed" — legitimate traffic passed through, attack traffic dropped
- **Anycast absorption** — distribute attack traffic across many PoPs; no single location is overwhelmed
- **Rate limiting** — limit request rate per IP, per subnet, or globally; effective for L7 attacks; may affect legitimate users during large attacks
- **BGP blackholing / RTBH** — advertise a route to the attacked IP with no-forward community; all traffic to that IP is dropped; stops the attack but also kills legitimate traffic (nuclear option)
- **Connection rate limiting** — TCP SYN cookies, rate limiting new connections per source

**Record attacks:** Cloudflare reported mitigating a 3.8 Tbps DDoS attack in 2024. The attack vectors have shifted: TCP-based volumetric attacks have declined (firewalls handle SYN floods); DNS amplification and HTTP/2 rapid reset (CVE-2023-44487) attacks have increased.

**Key insight:** The primary DDoS defense for most organizations is not technical — it's architectural: use a CDN or DDoS protection service (Cloudflare, AWS Shield) that absorbs attacks at massive network scale before traffic reaches your origin. Building your own scrubbing infrastructure at terabit capacity is not feasible for any but the largest internet companies.`,
    },
    {
      id: 852,
      name: "Network Intrusion Detection & Prevention",
      desc: `**IDS/IPS (Intrusion Detection System / Intrusion Prevention System)** — network security monitoring systems that analyze traffic for signs of malicious activity, policy violations, and known attack patterns.

**IDS vs IPS:**
- **IDS** — passive monitoring; detects and alerts on suspicious traffic but doesn't block it; installed out-of-band (traffic copy via SPAN port); low risk (doesn't affect traffic flow); used for visibility and forensics
- **IPS** — active inline device; detects and blocks suspicious traffic in real time; higher risk (false positives block legitimate traffic); requires careful tuning

**Detection methods:**
- **Signature-based** — matches traffic against a database of known attack signatures; fast and accurate for known attacks; ineffective against zero-days and novel attacks
- **Anomaly-based** — establishes a baseline of normal behavior; detects deviations; can detect novel attacks; high false-positive rate during tuning
- **Reputation-based** — blocks connections to/from known malicious IPs and domains (threat intelligence feeds); effective against known bad actors

**Network traffic analysis (NTA) / Network Detection & Response (NDR):** Modern evolution of IDS/IPS; uses ML to analyze network flow data (NetFlow, IPFIX), packet captures, and behavioral patterns to detect threats that bypass signature detection; Darktrace, ExtraHop, Vectra.

**IPS placement:** Inline between firewall and core network; also at data center perimeter; sometimes between security zones internally. Tuning is critical — too aggressive and legitimate traffic is blocked; too permissive and attacks are missed.

**Key insight:** IPS is most effective as part of a defense-in-depth strategy, not as the primary control. Attackers who understand IPS signatures use evasion techniques (fragmentation, encoding, slow-rate attacks below detection thresholds). The highest-value use of IDS/IPS is detecting lateral movement within already-breached networks — catching attackers after they've crossed the perimeter but before they've achieved their objectives.`,
    },
    {
      id: 853,
      name: "Network Segmentation & Micro-segmentation",
      desc: `**Network segmentation** — dividing a network into isolated segments, controlling traffic between segments via firewalls and access controls. Limits the blast radius of a breach — a compromised segment cannot directly reach other segments. **Micro-segmentation** — fine-grained segmentation applied to individual workloads or applications, often implemented in software.

**Traditional segmentation zones:**
- **DMZ (Demilitarized Zone)** — semi-trusted zone between the internet and internal network; hosts public-facing services (web servers, mail relays) that external users must reach; DMZ servers can't initiate connections to the internal network
- **Production network** — internal servers, databases; tightly restricted
- **User network** — employee workstations; can access internal resources but not servers directly
- **Management network** — out-of-band management (iDRAC, IPMI, switch management) isolated from production traffic

**Micro-segmentation in cloud and data centers:** Traditional firewalls sit at segment boundaries — traffic between hosts in the same segment is unrestricted. Micro-segmentation applies firewall policy at the workload level — each VM or container has its own policy that controls what it can communicate with. VMware NSX, Illumio, and cloud security groups implement micro-segmentation.

**Zero Trust and micro-segmentation:** Zero Trust requires micro-segmentation — without it, an attacker who compromises one workload can reach all other workloads on the same network segment. Micro-segmentation ensures lateral movement requires explicit authorization.

**Segmentation implementation:** VLANs (Layer 2), separate subnets + ACLs (Layer 3), security groups (cloud-native), host-based firewalls (Linux iptables/nftables, Windows Defender Firewall). Defense in depth uses multiple layers.

**Key insight:** The "flat network" — a single large broadcast domain with no internal segmentation — is still common in SMB environments, legacy enterprise networks, and sometimes even modern cloud deployments. A flat network means a single compromised endpoint can scan and attack every other device on the network. Network segmentation is not a luxury; it is the primary control that contains breaches.`,
    },
    {
      id: 854,
      name: "mTLS (Mutual TLS)",
      desc: `**mTLS (Mutual TLS)** — a TLS configuration where both the client and server authenticate each other using certificates, rather than only the server authenticating to the client (standard TLS). Used extensively in service-to-service communication within microservices architectures and Zero Trust environments.

**Standard TLS vs mTLS:**
- **Standard TLS:** server sends its certificate; client verifies it; client is anonymous to the server (except via other authentication: session tokens, API keys)
- **mTLS:** both sides exchange certificates; both sides verify the other's certificate against a trusted CA; both sides cryptographically prove they hold the corresponding private key

**How mTLS works:**
1. Standard TLS handshake begins
2. Server requests a client certificate (CertificateRequest message)
3. Client sends its certificate
4. Client sends CertificateVerify — a signature proving it holds the private key for the certificate
5. Server verifies client certificate against its trusted CA list
6. If valid, connection proceeds; if invalid, server rejects

**mTLS in microservices (service mesh):** Istio, Linkerd, and Consul Connect implement mTLS transparently between all service pods — a sidecar proxy handles certificate management and mTLS without application code changes. This enables service-to-service authentication and encryption without requiring application-level authentication logic.

**Certificate management for mTLS:** Requires a PKI (Public Key Infrastructure) — a CA issues short-lived certificates to each service. SPIFFE (Secure Production Identity Framework For Everyone) standardizes service identity; SPIRE implements SPIFFE for production environments; Vault PKI and cert-manager are common alternatives.

**Key insight:** mTLS makes "is this service request from an authorized service?" answerable cryptographically rather than via network topology ("is this IP in the trusted range?"). In a world where workloads run anywhere (Kubernetes, serverless, hybrid cloud), IP-based trust is insufficient. mTLS provides identity-based trust that follows the workload, not the IP address.`,
    },
    {
      id: 855,
      name: "Network Monitoring & SNMP",
      desc: `**Network monitoring** — the systematic observation and analysis of network infrastructure health, performance, and availability. Essential for detecting failures before they affect users, understanding capacity utilization, and diagnosing performance issues.

**SNMP (Simple Network Management Protocol):** The original protocol for managing and monitoring network devices. Agent runs on managed devices (switches, routers, firewalls, servers); manager (NMS) queries agents. Three versions: SNMPv1 (plain text, avoid), SNMPv2c (community-string auth, insecure), SNMPv3 (authentication and encryption, required for security-sensitive environments).

**Key monitoring protocols and approaches:**
- **SNMP polling** — manager queries device OIDs (Object Identifiers) for counter values (interface bytes in/out, CPU, memory); interval-based (every 60s, 5min)
- **SNMP traps** — device sends unsolicited notifications to manager when events occur (link up/down, threshold exceeded); push model, lower overhead
- **NetFlow / IPFIX** — routers export summaries of traffic flows (src/dst IP, ports, bytes, packets); traffic analytics without full packet capture; useful for bandwidth profiling and security analytics
- **sFlow** — statistical packet sampling exported from switches; low overhead; less granular than NetFlow
- **Streaming telemetry (gNMI/gRPC)** — modern push-based approach to network telemetry; structured data (protobuf/JSON) at high frequency; replaces SNMP polling for modern devices

**Monitoring stack:** Prometheus (metrics collection) + Grafana (visualization) for modern environments; Nagios/Zabbix/Observium for traditional; Kentik/SolarWinds/PRTG for commercial; OpenTelemetry for vendor-neutral instrumentation.

**Key insight:** SNMP polling every 5 minutes means a 5-minute outage can be completely invisible in your graphs (a brief spike and recovery between samples). Streaming telemetry with 10-30 second intervals (or per-event) reveals transient issues that 5-minute polling misses. Network problems are often highly intermittent; high-resolution telemetry is essential for diagnosing them.`,
    },
    {
      id: 856,
      name: "Packet Capture & Analysis",
      desc: `**Packet capture** — recording raw network traffic for later analysis or real-time inspection. The ultimate network debugging tool — when all else fails, capture packets and see exactly what's on the wire. Requires appropriate permissions and network access.

**tcpdump:** The command-line packet capture standard on Unix/Linux systems. Uses libpcap (or PF-RING, AF_PACKET for high throughput). Syntax: "tcpdump -i eth0 -w capture.pcap host 10.0.0.1 and port 443" captures all traffic to/from 10.0.0.1:443 on eth0, writes to a file. BPF (Berkeley Packet Filter) expressions enable powerful filtering at capture time.

**Wireshark:** The graphical packet analyzer, supporting hundreds of protocol dissectors. Opens pcap files; provides protocol tree, stream reassembly, conversation statistics. Essential for diagnosing application-layer issues (HTTP headers, TLS errors, DNS response timing, TCP retransmissions).

**What packet analysis reveals:**
- TCP retransmissions (packet loss indicator)
- TCP zero-window events (receiver buffer full)
- TLS certificate errors and handshake failures
- DNS resolution timing and failures
- HTTP response codes and latency
- Connection setup and teardown timing
- Malformed packets (hardware/driver issues)

**Encrypted traffic challenge:** TLS-encrypted traffic can't be decrypted at the packet level without the private key or a session key log. In development environments, you can log TLS session keys (SSLKEYLOGFILE environment variable in Chrome/Firefox and many libraries) and load them in Wireshark to decrypt captured TLS sessions.

**Span ports and network taps:** Capturing traffic on network segments you don't control requires a SPAN (Switched Port Analyzer) port — a switch configuration that mirrors traffic from specified ports to the capture interface. Hardware network taps provide passive inline capture without SPAN port limitations.

**Key insight:** "I can't reproduce the bug" is the beginning of a packet capture session, not the end of an investigation. The ability to say "I captured 30 minutes of traffic during the problem window and here is exactly what I see at the packet level" is the difference between guessing and knowing. Learning tcpdump and Wireshark is the highest-ROI networking investment for any engineer who touches production systems.`,
    },
    {
      id: 857,
      name: "Network Access Control (NAC)",
      desc: `**NAC (Network Access Control)** — a security approach that controls which devices are allowed to connect to a network and what they can access based on device identity, health status, and user identity. Prevents unauthorized devices from accessing network resources even if they have the correct credentials.

**What NAC evaluates:**
- **Device identity** — is this device registered/managed? MAC address, device certificate, 802.1X certificate
- **Device health (posture)** — is the device compliant? OS version, antivirus up to date, disk encryption enabled, endpoint agent installed
- **User identity** — who is logging in? Active Directory integration, MFA status
- **Context** — time of day, location, connection type (wired vs wireless vs VPN)

**802.1X port-based authentication:** The primary wired NAC standard. When a device connects to a switch port, the switch (authenticator) blocks all traffic except EAP (Extensible Authentication Protocol) packets; the device (supplicant) must authenticate to a RADIUS server (authentication server); only after successful authentication does the switch allow network access.

**RADIUS / RADIUS accounting:** Remote Authentication Dial-In User Service — the protocol between the authenticating switch/WAP and the authentication server. RADIUS centralizes authentication, authorization, and accounting for network access. Microsoft NPS, Cisco ISE, FreeRADIUS, Aruba ClearPass are common implementations.

**Wireless NAC:** The same 802.1X framework applies to wireless; the wireless AP is the authenticator. PEAP (Protected EAP), EAP-TLS (certificate-based, most secure), and EAP-TTLS are common wireless authentication methods.

**Key insight:** NAC is most valuable in environments where unknown or unmanaged devices regularly attempt network access: corporate campuses, hospitals, universities, or any environment with BYOD policies. Without NAC, a visitor's laptop or a compromised personal device gets the same network access as a managed corporate endpoint. With NAC, unmanaged devices are isolated to a guest VLAN.`,
    },
  ],
};

export default networkSecurity;
