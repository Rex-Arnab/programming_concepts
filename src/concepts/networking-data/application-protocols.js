const applicationProtocols = {
  name: "Application Layer Protocols",
  icon: "📡",
  color: "#8b5cf6",
  concepts: [
    {
      id: 816,
      name: "HTTP/1.1",
      desc: `**HTTP/1.1 (Hypertext Transfer Protocol)** — the foundational application protocol of the World Wide Web, standardized in RFC 2068 (1997) and updated in RFC 7230-7235 (2014). A text-based, request-response protocol running over TCP. Client sends a request; server sends a response; repeat.

**HTTP/1.1 request structure:**
- Request line: "GET /path HTTP/1.1"
- Headers: "Host", "User-Agent", "Accept", "Cookie", "Authorization", etc.
- Optional body (for POST, PUT, PATCH)

**HTTP methods:** GET (retrieve, safe and idempotent), POST (submit data, non-idempotent), PUT (replace, idempotent), PATCH (partial update), DELETE (remove, idempotent), HEAD (GET without body), OPTIONS (discover allowed methods), CONNECT (proxy tunneling).

**Key HTTP/1.1 features:**
- **Persistent connections** — "Connection: keep-alive" (default in 1.1) reuses the TCP connection for multiple requests, reducing handshake overhead
- **Chunked transfer encoding** — stream responses of unknown length
- **Conditional requests** — "If-Modified-Since", "ETag" for cache validation
- **Content negotiation** — "Accept", "Accept-Language", "Accept-Encoding" headers

**The performance problems of HTTP/1.1:**
- **Head-of-line blocking** — requests on a persistent connection are processed serially; response to request 1 must complete before request 2 begins on the same connection
- **HTTP pipelining** — sending multiple requests without waiting for responses, theoretically solving HOLB; practically, poor server/proxy support made it unreliable and it was rarely enabled
- **Workarounds:** browsers open 6 parallel connections per domain; domain sharding (spreading assets across multiple domains to get more parallel connections) — both are hacks for HTTP/1.1's serial nature

**Key insight:** HTTP/1.1's "one outstanding request per connection" constraint caused an entire ecosystem of workarounds: CSS/JS concatenation (fewer files = fewer requests), image sprites, inlining, and domain sharding. HTTP/2 made most of these optimizations unnecessary — or even counterproductive.`,
    },
    {
      id: 817,
      name: "HTTP/2",
      desc: `**HTTP/2** — the second major version of HTTP (RFC 7540, 2015), based on Google's SPDY protocol. Addresses HTTP/1.1's performance limitations through multiplexing, header compression, and binary framing — all over a single TCP connection.

**HTTP/2 key features:**
- **Binary framing** — HTTP/2 messages are binary frames (not text), more efficient to parse; the wire format is fundamentally different from HTTP/1.1
- **Multiplexing** — multiple requests and responses can interleave on the same TCP connection simultaneously as independent "streams"; no head-of-line blocking at the HTTP layer
- **Header compression (HPACK)** — HTTP headers are highly repetitive across requests; HPACK encodes them differentially, reducing overhead by 85-95% on typical traffic
- **Server Push** — server can proactively send resources the client will need before it asks (e.g., push CSS and JS when serving HTML); proved less useful than expected and is deprecated in HTTP/3
- **Stream prioritization** — clients can signal which responses are more urgent; browsers prioritize render-blocking resources

**HTTP/2 and TLS:** HTTP/2 technically supports both encrypted (h2) and cleartext (h2c), but all major browsers require TLS for HTTP/2 in practice. HTTP/2 over TLS uses ALPN (Application-Layer Protocol Negotiation) TLS extension to negotiate the protocol during the TLS handshake.

**HTTP/2's remaining problem:** TCP head-of-line blocking. All HTTP/2 streams share a single TCP connection — a single lost TCP packet blocks all streams until retransmission. HTTP/2 eliminated HTTP-layer HOLB but not TCP-layer HOLB.

**Key insight:** HTTP/2 multiplexing means most HTTP/1.1 optimization advice is obsolete or counterproductive in HTTP/2 contexts. Concatenating JavaScript files into one bundle was essential for HTTP/1.1 (fewer requests); with HTTP/2, smaller files can be fetched in parallel and cached more granularly. HTTP/2's adoption required unlearning a decade of HTTP/1.1 performance wisdom.`,
    },
    {
      id: 818,
      name: "HTTP/3 & QUIC",
      desc: `**HTTP/3** — the third major version of HTTP (RFC 9114, 2022), which runs over QUIC instead of TCP. HTTP/3 solves the final HTTP/2 bottleneck — TCP head-of-line blocking — by moving to QUIC's UDP-based transport with independent per-stream reliability.

**HTTP/3 vs HTTP/2 differences:**
- **Transport** — QUIC (UDP) vs TCP; eliminates TCP head-of-line blocking
- **Connection establishment** — 0-RTT for resumed connections (QUIC 0-RTT) vs 2-3 RTTs for TCP+TLS
- **Multiplexing** — independent streams in QUIC; a lost packet only blocks the affected stream, not all streams
- **Connection migration** — QUIC connections survive IP/port changes (phone switching between Wi-Fi and cellular); TCP connections break on IP change
- **Encryption** — mandatory TLS 1.3 integrated in QUIC vs TLS layered on TCP

**Performance gains:** HTTP/3 improvements are most dramatic on:
- Mobile networks with frequent packet loss and connection migration
- High-latency paths (satellite, cross-continental) where 0-RTT saves a full round trip
- Lossy links where TCP HOLB stalls all streams during retransmission

**Deployment challenges:** QUIC runs over UDP on port 443; many corporate firewalls block or throttle UDP traffic (expecting TCP on 443). QUIC falls back to TCP/HTTP/2 when UDP is blocked. UDP packet processing has historically been less optimized in OS kernels than TCP, though this gap is narrowing.

**Key insight:** HTTP/3's headline benefit (0-RTT connection establishment) is relevant for the first connection; returning users benefit the most. But the everyday benefit is eliminating TCP HOLB on mobile networks — the user experience improvement on mobile is measurable and consistent. HTTP/3 is most impactful for users with poor network conditions, which is precisely who most needs the improvement.`,
    },
    {
      id: 819,
      name: "HTTP Status Codes",
      desc: `**HTTP status codes** — three-digit codes in HTTP responses indicating the result of the request. Grouped into five classes by the first digit. Status codes are part of the HTTP contract — using them correctly is a core responsibility of API design.

**The five classes:**
- **1xx Informational** — request received; processing continues. "100 Continue" (client should proceed with request body), "101 Switching Protocols" (WebSocket upgrade)
- **2xx Success** — request was received, understood, and accepted. "200 OK", "201 Created" (POST creating a resource), "204 No Content" (DELETE succeeding with no body), "206 Partial Content" (range request)
- **3xx Redirection** — further action needed. "301 Moved Permanently" (update bookmarks), "302 Found" (temporary redirect, keep original method), "304 Not Modified" (cached version is current), "307 Temporary Redirect" (preserve method), "308 Permanent Redirect" (preserve method, permanent)
- **4xx Client Error** — request has an error. "400 Bad Request", "401 Unauthorized" (not authenticated), "403 Forbidden" (authenticated but lacks permission), "404 Not Found", "405 Method Not Allowed", "409 Conflict", "422 Unprocessable Entity", "429 Too Many Requests"
- **5xx Server Error** — server failed to fulfill a valid request. "500 Internal Server Error", "502 Bad Gateway" (proxy received invalid upstream response), "503 Service Unavailable" (overloaded/maintenance), "504 Gateway Timeout"

**The 301 vs 302 trap:** 301 tells browsers and search engines the redirect is permanent — cache it, update bookmarks, transfer PageRank. 302 is temporary — check again next time. Using 301 when you mean 302 causes cached redirects that are hard to undo.

**Key insight:** 401 means "you're not authenticated"; 403 means "you're authenticated but not authorized." The names are confusing (401 says "Unauthorized" but means "Unauthenticated"). Many APIs use 401 for both cases to avoid revealing information about resource existence — returning 404 for resources the authenticated user doesn't have access to is a security-conscious alternative.`,
    },
    {
      id: 820,
      name: "DNS (Domain Name System)",
      desc: `**DNS (Domain Name System)** — the internet's distributed, hierarchical directory service that translates human-readable domain names (google.com) into IP addresses (142.250.80.46) that network equipment uses to route traffic. Often called the "phone book of the internet." DNS is one of the most critical infrastructure components on the internet.

**DNS query resolution process:**
1. Browser checks local cache; OS checks local cache ("hosts" file, OS DNS cache)
2. Query goes to the recursive resolver (configured on your device; often your ISP's or Google's 8.8.8.8)
3. Recursive resolver checks its cache; if miss, queries the root nameservers
4. Root nameserver responds with the TLD nameservers ("for .com, ask these servers")
5. Recursive resolver queries the TLD nameserver; receives the authoritative nameserver for google.com
6. Recursive resolver queries google.com's authoritative nameserver; receives the A record (IP address)
7. Resolver returns the IP to the client and caches it for the TTL duration

**Key DNS concepts:**
- **Authoritative nameserver** — has the definitive answer for a domain's records; the source of truth
- **Recursive resolver** — looks up the answer on behalf of the client, querying multiple servers if needed
- **TTL (Time To Live)** — how long the answer should be cached; low TTL allows fast propagation of changes; high TTL reduces DNS query load

**UDP vs TCP for DNS:** Standard DNS uses UDP on port 53 for most queries (fast, single datagram). TCP is used for responses larger than 512 bytes (zone transfers, DNSSEC responses) and as fallback when UDP is unavailable.

**Key insight:** DNS propagation is the TTL in action. When you change a DNS record, old records persist in caches worldwide until their TTL expires. Lowering TTL before a planned change (and waiting for the old TTL to expire) ensures changes propagate quickly. This is why "wait 24-48 hours for DNS to propagate" is outdated advice — with a low TTL (300 seconds), propagation takes minutes.`,
    },
    {
      id: 821,
      name: "DNS Record Types",
      desc: `**DNS record types** — the different types of resource records stored in DNS, each serving a specific purpose. Understanding DNS record types is essential for configuring domains, email, CDN, certificate validation, and service discovery.

**Common record types:**
- **A** — maps a hostname to an IPv4 address: "example.com → 93.184.216.34"
- **AAAA** — maps a hostname to an IPv6 address (four times as many bits, hence four A's)
- **CNAME (Canonical Name)** — alias from one hostname to another: "www.example.com → example.com"; CNAME chains are followed recursively; cannot coexist with other records on the same name
- **MX (Mail Exchanger)** — specifies mail servers for a domain, with priority; "example.com MX 10 mail.example.com"
- **TXT** — arbitrary text associated with a domain; used for domain verification (Google, AWS), SPF (email anti-spoofing), DKIM (email signing), and DMARC policies
- **NS (Nameserver)** — specifies authoritative nameservers for a domain
- **SOA (Start of Authority)** — zone metadata: primary nameserver, admin email, serial number, refresh/retry/expire intervals
- **PTR (Pointer)** — reverse DNS; maps IP address to hostname; used in "in-addr.arpa" zones; required for email server reputation
- **SRV (Service)** — specifies host and port for specific services: "_xmpp-server._tcp.example.com SRV 10 5 5269 xmpp.example.com"
- **CAA (Certification Authority Authorization)** — specifies which CAs are allowed to issue certificates for the domain; prevents unauthorized certificate issuance

**The CNAME at apex limitation:** DNS standards prohibit CNAME records at the zone apex (the "root" of the domain, e.g., "example.com" not "www.example.com") because the apex must have SOA and NS records. CDN providers work around this with ALIAS/ANAME records (proprietary) or CNAME flattening.

**Key insight:** TXT records are the Swiss Army knife of DNS. Domain ownership verification, email authentication (SPF, DKIM, DMARC), certificate authorization (CAA), and site verification for search consoles all use TXT records. When email deliverability is broken, the answer is almost always in the TXT records.`,
    },
    {
      id: 822,
      name: "SMTP, IMAP & Email Protocols",
      desc: `**Email protocols** — the suite of protocols that together enable email: SMTP for sending, IMAP and POP3 for retrieval, and MIME for encoding attachments and rich content.

**SMTP (Simple Mail Transfer Protocol):** Used for sending email between mail servers and from email clients to servers. Port 25 (server-to-server, often blocked by ISPs to prevent spam), port 587 (client submission, requires authentication, TLS recommended), port 465 (SMTPS — SMTP over TLS). SMTP is a "push" protocol — the sender initiates connection to the recipient's mail server.

**IMAP (Internet Message Access Protocol):** Used by email clients to retrieve messages from a mail server, while leaving messages on the server. Supports synchronization across multiple devices — read/delete/folder operations are reflected server-side. Port 143 (IMAP), port 993 (IMAPS over TLS). The standard for modern email clients.

**POP3 (Post Office Protocol v3):** Older retrieval protocol that downloads messages to the local device and typically deletes them from the server. Poor multi-device support. Port 110 / 995 (SSL). Largely replaced by IMAP except in specific use cases (archiving to local storage).

**Email authentication:**
- **SPF (Sender Policy Framework)** — TXT record listing authorized IP addresses that can send email for the domain; receiving servers check if the sending IP is in the SPF record
- **DKIM (DomainKeys Identified Mail)** — cryptographic signature added to outgoing emails; receiving servers verify the signature against the public key in DNS (TXT record)
- **DMARC** — policy specifying what to do when SPF or DKIM fails (none/quarantine/reject) and where to send reports

**Key insight:** Email deliverability is almost entirely a DNS configuration problem. Without correct SPF, DKIM, and DMARC records, email from your domain goes to spam — regardless of content quality. These three DNS records have become table stakes for any domain sending transactional email.`,
    },
    {
      id: 823,
      name: "WebSockets",
      desc: `**WebSockets** — a full-duplex, persistent communication protocol (RFC 6455, 2011) that enables bidirectional real-time communication between a client and server over a single, long-lived TCP connection. Solves the fundamental limitation of HTTP's request-response model — the server can't push data to the client without a prior client request.

**The WebSocket upgrade:** WebSocket connections start as HTTP requests with a special "Upgrade: websocket" header. If the server supports WebSockets, it responds with "101 Switching Protocols" and the connection transitions from HTTP to WebSocket protocol. This allows WebSockets to use HTTP's port 80/443 and traverse firewalls that permit HTTP.

**WebSocket message framing:** Unlike HTTP, WebSocket is message-based (not stream-based like TCP). Each message has a small header indicating type (text, binary, ping, pong, close), masking key (client-to-server messages are masked to prevent proxy issues), and payload length.

**Use cases:** Real-time chat, collaborative document editing (Google Docs-style), live sports scores, financial market data, multiplayer games, live notifications, IoT device telemetry, remote terminal (shell access in browser).

**WebSockets vs Server-Sent Events (SSE):**
- WebSockets: full-duplex; both client and server can send; requires custom protocol; more complex
- SSE (EventSource): server-to-client only; unidirectional; built on HTTP/1.1; simpler; auto-reconnect; built-in text/event-stream format

**WebSockets at scale:** WebSocket connections are persistent and stateful — a load balancer must route all requests from the same client to the same backend server (sticky sessions). Horizontal scaling requires a pub/sub layer (Redis, Kafka) to relay messages between server instances.

**Key insight:** WebSockets are often chosen when Server-Sent Events would suffice. If the client only needs to receive updates and only occasionally sends data (like a user action), SSE is simpler to implement, works over HTTP/2 multiplexing, and handles reconnection automatically. Choose WebSockets only when genuinely bidirectional real-time communication is required.`,
    },
    {
      id: 824,
      name: "gRPC",
      desc: `**gRPC** — a high-performance, open-source RPC (Remote Procedure Call) framework developed by Google (2015) that uses Protocol Buffers (protobuf) for serialization and HTTP/2 as the transport. Designed for efficient communication between microservices; notably more compact and faster than JSON-over-HTTP REST.

**How gRPC works:**
1. Define the service and messages in a ".proto" file using Protocol Buffer's Interface Definition Language (IDL)
2. Run the protoc compiler to generate client and server stubs in the target language (Go, Python, Java, Node.js, C#, etc.)
3. Implement the server logic using the generated server interface
4. Client uses the generated stub to call remote methods as if they were local function calls

**Four service types:**
- **Unary RPC** — single request, single response (like a normal function call)
- **Server streaming** — single request, stream of responses
- **Client streaming** — stream of requests, single response
- **Bidirectional streaming** — stream in both directions; both sides can read/write independently

**Advantages over REST+JSON:**
- **Compact binary encoding** — protobufs are typically 3-10x smaller than equivalent JSON; faster to encode/decode
- **Strong typing and schema enforcement** — the .proto file is the contract; mismatches fail at compile time
- **Code generation** — client stubs generated automatically; no manual HTTP client code
- **HTTP/2 transport** — multiplexing, header compression, streaming

**Disadvantages:** Not human-readable (binary format); harder to debug (need special tools); less browser-native support (gRPC-Web required for browser clients); looser interoperability with non-protobuf systems.

**Key insight:** gRPC is the right choice for service-to-service communication where performance and strong contracts matter. It's the wrong choice for public APIs consumed by diverse clients — REST+JSON's universality, human-readability, and browser nativity make it better there. The two aren't mutually exclusive: many services expose REST externally and gRPC internally.`,
    },
    {
      id: 825,
      name: "MQTT",
      desc: `**MQTT (Message Queuing Telemetry Transport)** — a lightweight publish-subscribe messaging protocol designed for constrained devices and low-bandwidth, high-latency networks. Originally developed by IBM in 1999 for oil pipeline SCADA systems over satellite; now the dominant protocol for IoT (Internet of Things) communication.

**How MQTT works:**
- **Broker** — central server that manages message routing (Mosquitto, HiveMQ, AWS IoT Core, EMQX)
- **Clients** — publishers (devices/services that send messages) and subscribers (devices/services that receive messages)
- **Topics** — hierarchical strings that categorize messages: "home/bedroom/temperature"; "factory/line1/sensor3/pressure"
- **Publish** — client sends a message to a topic
- **Subscribe** — client registers interest in a topic or pattern ("home/+/temperature" matches any room)

**Why MQTT for IoT:** HTTP's request-response model requires IoT devices (temperature sensors, lights, switches) to constantly poll for updates — expensive for battery-powered devices. MQTT's broker model enables devices to receive updates only when they arrive; connections are persistent and reuse TCP; tiny 2-byte fixed header minimizes overhead.

**Quality of Service levels:**
- **QoS 0** — at most once; fire and forget; no acknowledgment
- **QoS 1** — at least once; acknowledged but possible duplicates
- **QoS 2** — exactly once; two-phase commit; slowest but guaranteed

**Last Will and Testament:** When connecting, a client can register a "last will" message that the broker publishes automatically if the client disconnects unexpectedly. Other clients can subscribe to detect device failures.

**Key insight:** MQTT's simplicity and efficiency are its strengths. The entire protocol spec can be read in an afternoon; implementations exist for microcontrollers with 32KB of RAM. When designing IoT systems, the question isn't "should we use MQTT?" — it's "is there a reason not to use MQTT?" The answer is usually no.`,
    },
    {
      id: 826,
      name: "SSH (Secure Shell)",
      desc: `**SSH (Secure Shell)** — a cryptographic network protocol (RFC 4251-4256) for secure remote login, command execution, file transfer, and tunneling over an unsecured network. Replaced Telnet, rsh, and rlogin with an encrypted alternative. Nearly universal for Linux/Unix server administration; runs on port 22 by default.

**SSH protocol components:**
- **SSH Transport Protocol** — provides host authentication, encryption, and integrity protection; establishes an encrypted channel using Diffie-Hellman key exchange
- **SSH User Authentication Protocol** — authenticates the user (password, public key, keyboard-interactive, GSSAPI)
- **SSH Connection Protocol** — multiplexes multiple logical channels (shell sessions, port forwards, SFTP) over the single encrypted connection

**Public key authentication:** The recommended method for automated access. Client generates a key pair (private + public); public key added to "~/.ssh/authorized_keys" on the server. Authentication: server sends a challenge; client signs with private key; server verifies with public key. The private key never leaves the client.

**SSH tunneling:**
- **Local port forwarding** — "ssh -L 8080:internal-server:80 bastion" — forwards local port 8080 through the SSH connection to internal-server:80; enables accessing internal services through a jump host
- **Remote port forwarding** — "ssh -R 80:localhost:8080 server" — exposes local port 8080 on the remote server; useful for testing webhooks
- **SOCKS proxy (dynamic forwarding)** — "ssh -D 1080 server" — creates a SOCKS proxy; route all browser traffic through the SSH tunnel

**SSH best practices:** Disable password authentication (use keys only); disable root login; change default port (security theater, but reduces log noise); use SSH certificates for large fleets (Vault SSH, AWS EC2 Instance Connect); set "AllowUsers" to limit who can log in.

**Key insight:** SSH's most underused feature is multiplexing ("ControlMaster"). A single SSH connection can be reused by multiple SSH sessions to the same host — subsequent connections open in milliseconds instead of waiting for a new handshake. For workflows involving repeated SSH connections to the same server, this is a significant time saver.`,
    },
    {
      id: 827,
      name: "WebRTC",
      desc: `**WebRTC (Web Real-Time Communication)** — an open standard (W3C + IETF) that enables peer-to-peer audio, video, and data communication directly between browsers and devices without requiring a plugin or intermediary server. Used by Google Meet, Discord, Zoom, and thousands of other real-time communication applications.

**WebRTC components:**
- **getUserMedia** — accesses camera and microphone from the browser
- **RTCPeerConnection** — manages the peer-to-peer connection; handles codec negotiation (SDP), ICE candidate gathering, DTLS encryption
- **RTCDataChannel** — arbitrary data transfer over the peer-to-peer connection; reliable (like TCP) or unreliable (like UDP) mode

**SDP (Session Description Protocol):** A text format describing a WebRTC session's capabilities: supported codecs, IP addresses, ports. Two peers exchange SDPs (Offer/Answer model) to negotiate a compatible configuration.

**ICE, STUN, and TURN — solving NAT traversal:**
- **ICE (Interactive Connectivity Establishment)** — discovers the best path between peers; gathers "candidates" (possible connection paths)
- **STUN (Session Traversal Utilities for NAT)** — helps a device discover its public IP and port as seen from outside its NAT
- **TURN (Traversal Using Relays around NAT)** — a relay server for cases where direct P2P fails (symmetric NAT, restrictive firewalls); traffic relays through TURN server; always works but not P2P

**Media over WebRTC:** Audio and video are sent using RTP (Real-time Transport Protocol) over UDP (via SRTP — Secure RTP). Adaptive bitrate codecs (VP8, VP9, H.264, AV1 for video; Opus for audio) adjust quality based on available bandwidth in real time.

**Key insight:** "Peer-to-peer" in WebRTC is aspirational — in practice, 15-20% of WebRTC connections fall back to TURN relay due to NAT configurations. Always budget for TURN server capacity. The signaling server (for exchanging SDPs and ICE candidates) is also required — WebRTC only defines the peer-to-peer media channel, not how peers find each other.`,
    },
  ],
};

export default applicationProtocols;
