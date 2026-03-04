const networkSecurity = {
  name: "Network Security",
  icon: "🌐",
  color: "#3b82f6",
  concepts: [
    {
      id: 1072,
      name: "Firewalls",
      desc: `**Firewall** — a network security device (hardware or software) that monitors and controls incoming and outgoing network traffic based on predefined security rules, acting as a barrier between trusted internal networks and untrusted external networks.

**Types:**
- **Packet filtering (stateless):** inspects individual packets against static rules (source/dest IP, port, protocol). Fast but cannot detect multi-packet attacks or application-layer threats.
- **Stateful inspection:** tracks the state of network connections. Knows that a packet is part of an established TCP connection — more context for decisions. The standard for perimeter firewalls.
- **Application layer (L7) / NGFW (Next-Generation Firewall):** understands application protocols (HTTP, DNS, TLS); can block specific applications, inspect encrypted traffic (TLS inspection), detect intrusion signatures, and apply user-identity-based policies. Products: Palo Alto, Fortinet, Check Point.
- **Web Application Firewall (WAF):** specialized for HTTP/HTTPS — blocks OWASP Top 10 attacks, rate limits, bot mitigation. CloudFlare, AWS WAF, F5 Advanced WAF.

**Host-based firewalls:** "iptables" (Linux), "nftables" (modern Linux), Windows Defender Firewall — run on individual servers; essential defense-in-depth even behind a perimeter firewall.

**Firewall rules best practice:** default-deny posture (block everything, then explicitly allow what's needed); limit egress (outbound) rules, not just ingress — malware needs to phone home; log and alert on denied connections.

**Key insight:** Firewalls are necessary but insufficient. A firewall blocking port 80 does nothing for a web app with a SQL injection vulnerability on port 443. Perimeter firewalls need to be combined with WAF, host-based controls, and application security.`,
    },
    {
      id: 1073,
      name: "Intrusion Detection & Prevention (IDS/IPS)",
      desc: `**IDS (Intrusion Detection System)** — monitors network traffic or host activity for suspicious patterns and generates alerts. Passive — it detects and notifies but does not block. **IPS (Intrusion Prevention System)** — extends IDS by actively blocking detected malicious traffic in real time. Inline — sits in the traffic path.

**Network-based (NIDS/NIPS):** analyzes traffic at the network level; monitors all traffic passing through a tap or mirror port. Examples: Suricata, Snort (open source); Palo Alto Threat Prevention, Cisco Firepower.

**Host-based (HIDS/HIPS):** monitors activity on individual hosts — file system changes, process activity, registry modifications, log events. Examples: OSSEC, Wazuh, CrowdStrike Falcon (endpoint protection).

**Detection methods:**
- **Signature-based:** matches traffic against known attack patterns (regex rules for CVE exploits, malware C2 traffic). Fast and precise for known threats; blind to novel attacks (zero-days).
- **Anomaly-based:** builds a baseline of "normal" behavior; alerts on statistical deviations. Detects unknown attacks; higher false positive rate.
- **Behavioral analysis:** ML-based; detects patterns of malicious behavior (lateral movement, data exfiltration) rather than specific signatures.

**Suricata rules example:** "alert http $EXTERNAL_NET any -> $HOME_NET any (msg:'EXPLOIT SQL Injection'; content:'UNION SELECT'; http.uri; sid:1000001;)"

**IPS tuning:** too sensitive = alert fatigue (thousands of false positives, real alerts missed); too permissive = missed attacks. Regular tuning, suppressing known-good traffic, and tiered response (alert on low confidence, block on high confidence) are essential.

**Key insight:** IDS/IPS without a process for reviewing and responding to alerts is security theater. The value is not in the alerts generated but in the investigations triggered and the attacks blocked — which requires human attention and well-tuned rules.`,
    },
    {
      id: 1074,
      name: "VPN & Tunneling Protocols",
      desc: `**VPN (Virtual Private Network)** — creates an encrypted tunnel between a client and a server (or site-to-site between networks), allowing secure communication over untrusted networks (the internet) and providing network-level access to private resources.

**VPN protocols:**
- **WireGuard:** modern, minimal code (~4,000 lines vs OpenVPN's ~600,000), state-of-the-art cryptography (ChaCha20-Poly1305, Curve25519), fast handshake, excellent performance. The recommended choice for new deployments.
- **OpenVPN:** mature, widely supported, highly configurable; uses OpenSSL; slower than WireGuard due to userspace TLS overhead; UDP or TCP.
- **IPSec/IKEv2:** native to most operating systems; excellent for mobile (IKEv2 handles network switching gracefully); commonly used for site-to-site VPNs and enterprise remote access.
- **L2TP/IPSec, PPTP:** legacy; PPTP is completely broken and should never be used; L2TP/IPSec is acceptable but being replaced.

**VPN use cases:**
- Remote access (employees connecting to corporate network)
- Site-to-site (connecting branch offices or data centers)
- Secure public Wi-Fi usage (consumer VPNs — limited benefit for privacy-conscious users)

**VPN limitations:** VPN provides network-level access — a compromised VPN client has the same network access as the VPN user. Zero Trust Network Access (ZTNA) replaces VPN with per-application access control, reducing lateral movement risk.

**Split tunneling:** VPN traffic only for corporate resources; internet traffic bypasses VPN. Reduces load but means internet traffic isn't protected by corporate security controls.

**Key insight:** Traditional VPN grants broad network access — once inside, attackers can probe internal services. Zero Trust VPN replacements (Cloudflare Access, Zscaler) grant access per application, per session, making lateral movement far harder.`,
    },
    {
      id: 1075,
      name: "DDoS Attacks & Mitigation",
      desc: `**DDoS (Distributed Denial of Service)** — an attack where an attacker overwhelms a target system with traffic from many sources (a botnet), exhausting bandwidth, CPU, memory, or connection limits to make the service unavailable to legitimate users.

**Attack types:**
- **Volumetric:** flood the target with massive traffic (terabits per second); DNS amplification (spoof victim's IP, send small DNS query to open resolvers — response is 100x larger, amplified at victim); NTP amplification, SSDP amplification. Mitigated by upstream scrubbing.
- **Protocol attacks:** exploit weaknesses in network protocols; SYN flood (overwhelm TCP connection table with half-open connections — stateful firewalls can't keep up); mitigation: SYN cookies.
- **Application layer (L7):** HTTP floods mimicking legitimate requests; Slowloris (sends partial HTTP headers, holding connections open); hard to distinguish from legitimate traffic.

**Mitigation strategies:**
- **Upstream scrubbing:** route traffic through a DDoS mitigation provider (Cloudflare, Akamai, AWS Shield) that absorbs and filters attack traffic before it reaches your infrastructure
- **Anycast network diffusion:** distribute the attack traffic across many PoPs globally instead of one target
- **Rate limiting:** limit requests per IP per time window
- **Challenge pages (CAPTCHA):** for L7 attacks, present a challenge to browsers but not attackers

**AWS Shield:** Standard (free, basic protection), Advanced ($3K/month, 24/7 DDoS Response Team, cost protection for scaling during attacks).

**Key insight:** You cannot outscale a terabit DDoS attack with your own infrastructure. DDoS protection requires a provider with substantially more capacity than any potential attacker — which means using Cloudflare, Akamai, AWS Shield, or similar.`,
    },
    {
      id: 1076,
      name: "Man-in-the-Middle (MitM) Attacks",
      desc: `**Man-in-the-Middle (MitM)** — an attack where the attacker secretly intercepts and potentially alters communications between two parties who believe they are communicating directly with each other. The attacker is positioned between client and server, relaying (and potentially modifying) traffic.

**Common MitM techniques:**
- **ARP spoofing:** send gratuitous ARP replies to poison the ARP cache, associating the attacker's MAC address with a victim's IP on the local network — all traffic meant for the victim goes to the attacker
- **DNS spoofing / poisoning:** return malicious DNS responses, redirecting domain lookups to attacker-controlled IP addresses
- **SSL stripping:** downgrade HTTPS connections to HTTP when TLS isn't enforced (HSTS prevents this)
- **Evil twin / rogue AP:** set up a Wi-Fi access point with the same SSID as a legitimate network; clients connect to the attacker's AP instead
- **BGP hijacking:** announce more-specific routes for a victim's IP range, attracting their internet traffic through the attacker's network

**Defenses:**
- **TLS/HTTPS everywhere:** certificates bind domain names to public keys; a MitM cannot forge a valid certificate for a domain they don't control (assuming CA infrastructure is intact)
- **HSTS (HTTP Strict Transport Security):** browser remembers that a site must be accessed via HTTPS; prevents SSL stripping
- **Certificate pinning:** hardcode expected certificate or public key in the client; reject any other certificate even if valid (used in mobile apps; risky if the certificate changes)
- **DNSSEC:** cryptographically signs DNS responses; prevents DNS spoofing

**Key insight:** TLS certificate validation is the primary defense against MitM. Any tool that intercepts HTTPS (corporate proxies, antivirus, debugging proxies) must install a trusted CA certificate on the client — which is exactly what a MitM attacker would do. Verify your certificate chain carefully.`,
    },
    {
      id: 1077,
      name: "Network Segmentation & Zero Trust Networking",
      desc: `**Network segmentation** — dividing a network into smaller, isolated segments to contain breaches and limit lateral movement. If an attacker compromises one segment, they cannot freely access others without crossing segment boundaries — which are controlled and monitored.

**DMZ (Demilitarized Zone):** a network zone between the internet and the internal network, containing public-facing servers (web servers, reverse proxies). Compromising a DMZ server doesn't give direct access to internal databases and backend systems.

**VLAN (Virtual LAN):** logical network segmentation within a physical switch infrastructure. VLANs isolate traffic at Layer 2 — devices on different VLANs can only communicate if routed through a firewall or router with appropriate rules.

**Micro-segmentation:** fine-grained segmentation at the workload level (per VM, container, or service) rather than network perimeter. Each workload has explicit firewall rules; east-west traffic within the data center is controlled as strictly as north-south (internet-facing) traffic. Implemented with software-defined networking (VMware NSX, Illumio, Calico in Kubernetes, AWS Security Groups).

**East-west traffic:** traffic between internal systems (server to server, microservice to microservice). Historically trusted; increasingly a primary attack vector for lateral movement. Micro-segmentation with mTLS (mutual TLS) secures east-west traffic.

**Kubernetes network policies:** "NetworkPolicy" objects in Kubernetes restrict pod-to-pod communication — default-deny all ingress and egress, then explicitly allow needed paths. Without network policies, all pods in a cluster can communicate with all others.

**Key insight:** The 2013 Target breach ($162M in damages) began with a compromised HVAC vendor with network access. The HVAC system was on the same network as payment card systems with no segmentation. Network segmentation is a direct control against lateral movement after initial compromise.`,
    },
    {
      id: 1078,
      name: "DNS Security (DNSSEC, DoH, DoT)",
      desc: `**DNS security** — protecting the Domain Name System from attacks that manipulate DNS resolution to redirect users to malicious servers, intercept communications, or perform reconnaissance.

**DNSSEC (DNS Security Extensions):** cryptographically signs DNS records using a chain of trust from the root zone. Resolvers can verify that DNS responses are authentic and unmodified. Prevents DNS cache poisoning and spoofing, but does not encrypt queries — the domain names in queries are still visible.

**DNS over HTTPS (DoH):** encrypts DNS queries inside HTTPS, hiding them from network observers. Implemented in Firefox (Cloudflare or NextDNS by default), Chrome, and Windows 11. ISPs, corporate networks, and surveillance systems can no longer sniff DNS queries. Controversial: bypasses corporate DNS filtering and parental controls.

**DNS over TLS (DoT):** encrypts DNS queries using TLS on port 853. Similar privacy benefits to DoH; easier to identify and filter by network administrators (distinct port vs DoH which blends with HTTPS traffic).

**DNS attack types:**
- **Cache poisoning (Kaminsky attack):** inject forged DNS responses into a resolver's cache; all clients of that resolver get wrong answers
- **DNS hijacking:** compromise a domain's DNS settings at the registrar level or nameserver; redirect all traffic for a domain
- **DNS amplification (DDoS):** use open DNS resolvers to amplify attack traffic (described in DDoS section)
- **Subdomain takeover:** a DNS record points to a cloud service (S3, GitHub Pages) that's been deprovisioned; an attacker claims that service and controls the subdomain

**Key insight:** DNSSEC adoption remains low (~30% of zones signed) because the deployment is complex and signing errors can make domains unreachable. Monitor for unauthorized DNS changes (CT logs for certificates, DNS change monitoring) as early indicators of domain hijacking.`,
    },
    {
      id: 1079,
      name: "Wireless Security (WPA3, Rogue APs)",
      desc: `**Wireless security** — protecting Wi-Fi networks from eavesdropping, unauthorized access, and attacks targeting wireless protocols. Wireless networks extend the attack surface beyond physical boundaries — an attacker in a parking lot can attempt to access your Wi-Fi.

**Wi-Fi security protocols (evolution):**
- **WEP (1997):** completely broken; 40-bit key crackable in seconds. Never use.
- **WPA (2003):** deprecated; TKIP cipher vulnerable to attacks.
- **WPA2 (2004):** AES-CCMP; still widely used and secure if configured correctly (avoid TKIP fallback). Vulnerable to KRACK (Key Reinstallation Attack) against 4-way handshake; patched in most modern devices.
- **WPA3 (2018):** SAE (Simultaneous Authentication of Equals) replaces PSK — resistant to offline dictionary attacks; each session negotiates a unique key; even if the password is guessed, past traffic can't be decrypted (PFS). Required for Wi-Fi 6 certification.

**WPA2/3-Enterprise:** uses 802.1X and RADIUS server for authentication; each user has individual credentials (not a shared PSK). Certificates can authenticate users and devices. Required for corporate networks — a shared PSK means all employees (and former employees) share the same secret.

**Rogue AP (Evil Twin):** an attacker sets up a Wi-Fi AP mimicking a legitimate network. Clients that auto-connect provide traffic to the attacker. Mitigate with wireless intrusion detection systems (WIDS) and 802.1X certificate-based authentication (which prevents connecting to fake APs).

**WPS (Wi-Fi Protected Setup):** a convenience feature with known PIN brute-force vulnerabilities. Disable WPS on all access points.

**Key insight:** Corporate Wi-Fi should use WPA3-Enterprise with certificate-based authentication — not a shared PSK. A PSK-based corporate network means a single compromised password (or departing employee) exposes the network to everyone who ever knew the password.`,
    },
    {
      id: 1080,
      name: "Network Monitoring & Traffic Analysis",
      desc: `**Network traffic analysis** — capturing, analyzing, and monitoring network traffic to detect security threats, investigate incidents, troubleshoot performance issues, and maintain visibility into what's happening across the network.

**Packet capture tools:**
- **Wireshark / tshark:** the definitive GUI/CLI packet capture and analysis tool. Supports hundreds of protocols; dissects TLS (with session keys); indispensable for incident response and protocol debugging.
- **tcpdump:** lightweight command-line capture; "tcpdump -i eth0 -w capture.pcap" saves a capture for offline analysis in Wireshark.
- **Network taps / SPAN ports:** hardware or switch-configured port mirrors send copies of all traffic to a monitoring interface — the basis for NIDS and traffic analysis.

**NetFlow / IPFIX:** summarized traffic flow records (source/dest IP, port, bytes transferred, duration) rather than full packet capture. Much lower storage requirement; suitable for long-term retention and anomaly detection. Exported by routers/switches to collectors (ntopng, Elastiflow, Kentik).

**Threat detection use cases:**
- **Data exfiltration detection:** unusual volumes of outbound traffic to external IPs, especially to cloud storage or TOR exit nodes
- **C2 (Command-and-Control) detection:** periodic beacon traffic to the same external host (malware phoning home); DNS queries to algorithmically generated domains (DGA detection)
- **Lateral movement:** internal hosts scanning other internal hosts (port scans); traffic on unusual ports between segments that shouldn't communicate

**Key insight:** Full packet capture at scale is expensive (a 10Gbps link generates ~4TB/hour). Use NetFlow for long-term visibility and trigger full packet capture selectively (on alerted IPs) to balance storage costs against forensic capability.`,
    },
    {
      id: 1081,
      name: "TLS Certificate Management",
      desc: `**TLS certificate management** — the operational discipline of issuing, deploying, monitoring, and renewing TLS certificates before they expire. Certificate expiration causes high-profile outages (Microsoft Teams, LinkedIn, Equifax — each took services down for hours due to an expired cert).

**Certificate types:**
- **DV (Domain Validated):** proves control of the domain only; issued automatically (Let's Encrypt); adequate for most web services
- **OV (Organization Validated):** includes verified organization information; some enterprises prefer for trust signaling
- **EV (Extended Validation):** rigorous vetting of organization; formerly showed green bar in browsers; browsers removed the visual distinction; provides minimal additional user trust signal today
- **Wildcard (*.example.com):** covers all immediate subdomains; one cert for many subdomains but shared private key risk
- **Multi-SAN:** lists multiple specific domains; preferred over wildcard for better isolation

**Let's Encrypt + ACME protocol:** free, automated DV certificates. ACME (Automated Certificate Management Environment) protocol handles issuance and renewal. Certbot and cloud-native ACME clients (AWS Certificate Manager, cert-manager in Kubernetes) automate rotation.

**Certificate monitoring:** expiration alerts; Certificate Transparency log monitoring (detect unauthorized certificates issued for your domains — Cert Spotter, Facebook Certificate Transparency monitoring); OCSP/CRL revocation checking.

**Kubernetes cert-manager:** automatically provisions and renews TLS certificates for Ingress resources, using Let's Encrypt or internal CAs. The standard approach for Kubernetes TLS management.

**Key insight:** Automate certificate renewal — human-managed renewals always eventually fail. Let's Encrypt + ACME client automation means certificates renew silently 30 days before expiry. Any certificate that requires a human to renew it will eventually cause an outage.`,
    },
  ],
};

export default networkSecurity;
