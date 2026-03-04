const transportLayer = {
  name: "Transport Layer & TCP/IP",
  icon: "🔗",
  color: "#3b82f6",
  concepts: [
    {
      id: 806,
      name: "TCP (Transmission Control Protocol)",
      desc: `**TCP (Transmission Control Protocol)** — a connection-oriented, reliable transport protocol that guarantees ordered, error-checked delivery of a byte stream between two endpoints. TCP underpins HTTP, HTTPS, SSH, SMTP, and most other internet application protocols where data integrity matters.

**TCP guarantees:**
- **Reliable delivery** — every segment is acknowledged; unacknowledged segments are retransmitted
- **Ordered delivery** — sequence numbers ensure data is reassembled in the correct order even if packets arrive out of sequence
- **Error detection** — 16-bit checksum on each segment; corrupted segments are discarded and retransmitted
- **Flow control** — receiver advertises a "receive window" size; sender doesn't transmit more than the receiver can buffer
- **Congestion control** — sender reduces transmission rate when the network is congested (Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery)

**TCP header key fields:** Source port, destination port, sequence number (byte position of first data byte in this segment), acknowledgment number (next expected byte from sender), flags (SYN, ACK, FIN, RST, PSH, URG), window size, checksum.

**TCP is a byte stream:** TCP provides no message boundaries — the application must implement its own framing. HTTP/1.1 uses "Content-Length" or chunked encoding to delimit messages within the TCP stream.

**TCP tradeoffs:** The reliability guarantees come at a cost — additional round trips for connection setup and teardown, retransmission delays, and head-of-line blocking (a lost segment blocks all subsequent data until retransmitted). For latency-sensitive applications (live video, gaming), UDP is often preferable.

**Key insight:** TCP's reliability is implemented entirely in the endpoints — the network itself (IP) makes no guarantees. This "smart endpoints, dumb network" architecture was a deliberate design choice that enables internet innovation: the network stays simple; applications implement whatever reliability they need.`,
    },
    {
      id: 807,
      name: "UDP (User Datagram Protocol)",
      desc: `**UDP (User Datagram Protocol)** — a connectionless, unreliable transport protocol that sends discrete datagrams with no delivery guarantee, no ordering, and no congestion control. Trades TCP's reliability for speed and simplicity.

**What UDP provides:** A minimal wrapper around IP — it adds only source port, destination port, length, and a checksum. Everything else that TCP provides (reliability, ordering, flow control) is absent. If a UDP datagram is lost, the application either doesn't care or handles retransmission itself.

**When UDP is the right choice:**
- **Latency-sensitive streaming** — live video and audio (a lost frame is worthless to retransmit; play silence/skip a frame and continue)
- **Real-time gaming** — positional updates must arrive now or not at all; stale updates are worse than no updates
- **DNS** — queries are small, fit in one datagram, and the application retries on timeout; the connection overhead of TCP is wasteful
- **DHCP** — client has no IP yet; can't establish a TCP connection
- **IoT telemetry** — sensors sending frequent low-value updates; a few lost readings are acceptable

**UDP with application-level reliability:** Many protocols use UDP but add their own reliability layer — only for the specific reliability semantics they need. QUIC (the transport for HTTP/3) is UDP-based but implements reliability at the application level with better congestion control than TCP.

**Multicast and broadcast:** UDP supports sending one datagram to multiple destinations simultaneously (multicast) or all devices on a subnet (broadcast). TCP is point-to-point only — it can't multicast.

**Key insight:** "Unreliable" doesn't mean "broken." UDP datagrams reach their destination most of the time under normal network conditions. "Unreliable" means no built-in retry mechanism — which is exactly what you want when you need speed and the application can tolerate occasional loss. UDP is not TCP with the reliability removed; it's a different tool for different problems.`,
    },
    {
      id: 808,
      name: "TCP Three-Way Handshake",
      desc: `**TCP three-way handshake** — the process by which a TCP connection is established between a client and server before any application data is sent. Requires one full round trip (1.5 round trips total from client's perspective) before the first data can be sent.

**The three steps:**
1. **SYN** — client sends a SYN (synchronize) segment with its initial sequence number (ISN): "I want to connect; my sequence numbers start at X"
2. **SYN-ACK** — server responds with SYN+ACK: "I received your SYN; my sequence numbers start at Y; I acknowledge your ISN" (ACK = X+1, SYN = Y)
3. **ACK** — client acknowledges the server's SYN: "I received your SYN-ACK, ready to exchange data"

**Why three steps (not two):** A two-way handshake would only confirm the client → server direction. The SYN-ACK confirms both: the server received the client's SYN, and the client's SYN-ACK acknowledges the server's sequence number. Three steps ensures both ends agree on sequence numbers and both directions are confirmed working.

**Connection teardown (four-way):** FIN from one side → FIN-ACK from other → FIN from other → FIN-ACK. Each side independently closes its half of the connection; both must close for the socket to be fully terminated. TIME-WAIT state: the active closer waits 2×MSL (Maximum Segment Lifetime) after sending the final ACK to ensure the other end received it.

**Performance impact:** Every new TCP connection costs one round trip before data flows. At 100ms RTT (cross-continental), this is a 100ms latency floor. TLS adds another 1-2 round trips for the TLS handshake. This is the primary motivation for HTTP/2 multiplexing and QUIC (0-RTT connections after first connection).

**Key insight:** The three-way handshake is also the foundation of SYN flood attacks — an attacker sends many SYN packets with spoofed source IPs, filling the server's SYN queue with half-open connections that never complete. SYN cookies mitigate this by encoding session state in the SYN-ACK sequence number, eliminating the need to store half-open connection state.`,
    },
    {
      id: 809,
      name: "TCP Flow Control & Sliding Window",
      desc: `**TCP flow control** — a mechanism that prevents the sender from transmitting data faster than the receiver can buffer and process it. Achieved via the receive window (rwnd) field in the TCP header — the receiver advertises how many bytes of buffer space it has available. The sender must not have more unacknowledged data outstanding than the receive window.

**Sliding window:** A conceptual window that "slides" forward as acknowledgments arrive. If the window is 64 KB and the sender has sent 64 KB of unacknowledged data, it must wait for ACKs before sending more. As ACKs arrive, the window slides forward, opening space for new data.

**Zero window:** When the receiver's buffer is full (e.g., application is processing data slowly), it advertises a window of 0 — the sender must stop transmitting. When the application drains the buffer, the receiver sends a window update to resume transmission. A "window stuck at 0" is a sign of a slow consumer application, not a network problem.

**The receive window determines throughput ceiling:** Maximum throughput = receive window / round-trip time. Default TCP receive window was 65 KB (16-bit field); RFC 7323 introduced window scaling (1-byte multiplier, up to 14 bits), allowing windows up to 1 GB. On high-bandwidth, high-latency links (satellite, intercontinental), the small default window severely limits throughput.

**Buffer bloat:** Modern networks and home routers have large buffers. When a link is congested, these buffers fill — adding 100s of milliseconds of queuing delay before packet loss occurs. Large buffers allow congestion control to react slowly, causing high latency. "Buffer bloat" made home internet feel laggy even at high bandwidth; CoDel and FQ-CoDel are active queue management algorithms designed to reduce it.

**Key insight:** Flow control solves a receiver-overrun problem; congestion control (separate mechanism) solves a network-overrun problem. Confusing them is common. A zero-window stall means the receiver is slow. A cwnd (congestion window) reduction means the network is congested. Same symptom (sender stops transmitting); different diagnosis.`,
    },
    {
      id: 810,
      name: "TCP Congestion Control",
      desc: `**TCP congestion control** — the set of algorithms that prevent a TCP sender from overwhelming the network, avoiding congestion collapse (the condition where everyone retransmitting simultaneously causes complete network breakdown). TCP has built-in congestion control because IP provides no congestion feedback — TCP infers it from packet loss and delay.

**The four phases (TCP Reno / New Reno):**
1. **Slow Start** — on connection establishment or after timeout, begin with cwnd (congestion window) = 1 MSS; double cwnd each RTT (exponential growth) until reaching ssthresh (slow start threshold) or loss occurs
2. **Congestion Avoidance** — once cwnd ≥ ssthresh, increase cwnd by 1 MSS per RTT (additive increase); much slower than Slow Start
3. **Fast Retransmit** — 3 duplicate ACKs signal a single lost segment; retransmit immediately without waiting for timeout
4. **Fast Recovery** — after Fast Retransmit, set ssthresh = cwnd/2, cwnd = ssthresh; continue in Congestion Avoidance (not Slow Start); the "AIMD" (Additive Increase, Multiplicative Decrease) algorithm

**Modern variants:**
- **CUBIC** (Linux default) — uses a cubic function for window growth; more aggressive on high-bandwidth links
- **BBR (Bottleneck Bandwidth and RTT)** — Google's algorithm; models the network rather than reacting to loss; significantly better throughput on lossy and high-latency links
- **QUIC (HTTP/3)** — implements congestion control at the application level with more flexibility than kernel TCP

**Why congestion control matters for product performance:** TCP Slow Start means a brand-new connection starts slow and only reaches full speed after several RTTs. Short-lived connections (many small HTTP/1.1 requests) frequently get "stuck" in Slow Start, never reaching line speed. HTTP/2 multiplexing and connection reuse amortize Slow Start across many requests.

**Key insight:** TCP congestion control is a collective good — every sender that restrains itself during congestion benefits all other users of that link. Without it, the internet would devolve into retransmission storms. It's one of the most important distributed algorithms ever deployed — running on billions of devices with no central coordination.`,
    },
    {
      id: 811,
      name: "QUIC Protocol",
      desc: `**QUIC** — a modern general-purpose transport protocol developed by Google (2012) and standardized by the IETF (RFC 9000, 2021) as the transport for HTTP/3. QUIC runs over UDP and reimplements reliable transport at the application layer, fixing several fundamental TCP limitations while adding built-in encryption (TLS 1.3 is integrated, not layered on top).

**QUIC's improvements over TCP+TLS:**
- **0-RTT connection establishment** — for returning clients, QUIC can send application data in the first packet (versus TCP+TLS: 1-2 RTTs just for handshake)
- **No head-of-line blocking** — QUIC multiplexes independent streams; a lost packet blocks only the affected stream, not all streams on the connection (unlike TCP, where one loss blocks the entire connection)
- **Connection migration** — a QUIC connection is identified by a Connection ID (not IP+port), enabling seamless handoff between networks (e.g., switching from Wi-Fi to 5G without reconnecting)
- **Integrated TLS 1.3** — encryption is mandatory and built in; no option for unencrypted QUIC
- **Improved loss detection** — packet numbers never reuse (unlike TCP sequence numbers, which can cause ambiguity on retransmission)

**HTTP/3 over QUIC:** HTTP/3 uses QUIC's multiplexed streams for HTTP request/response pairs. The improvement is most dramatic on lossy networks (mobile, satellite) where TCP+TLS+HTTP/2 suffers severe head-of-line blocking.

**Adoption:** Chrome, Firefox, and Safari support HTTP/3/QUIC. Major services (Google, Facebook, Cloudflare, Netflix) have deployed HTTP/3. OS kernel integration is slower — many QUIC implementations run in userspace.

**Key insight:** QUIC running over UDP was a controversial design choice — it bypasses ossified middleboxes (firewalls, NAT devices) that understand TCP but not QUIC. This was intentional: by running over UDP, QUIC can evolve without requiring middlebox updates. The internet infrastructure's inability to update TCP is what made QUIC's "start over on UDP" approach necessary.`,
    },
    {
      id: 812,
      name: "TLS/SSL",
      desc: `**TLS (Transport Layer Security)** — the cryptographic protocol that provides authentication, confidentiality, and integrity for network communication. The successor to SSL (Secure Sockets Layer); all SSL versions are deprecated. "HTTPS" = HTTP over TLS. TLS 1.3 (RFC 8446, 2018) is the current standard; TLS 1.2 is still widely deployed.

**What TLS provides:**
- **Authentication** — the server proves its identity via a certificate signed by a trusted Certificate Authority (CA); optional client authentication via client certificates (mTLS)
- **Confidentiality** — data is encrypted; a passive observer can't read the contents
- **Integrity** — a message authentication code (MAC) detects any tampering in transit

**TLS 1.3 handshake (1-RTT):**
1. **ClientHello** — client sends supported cipher suites, TLS version, key exchange parameters
2. **ServerHello + Certificate + CertificateVerify + Finished** — server selects cipher, sends certificate and proof it has the private key; derives session keys; sends Finished
3. **Client Finished + Application Data** — client verifies certificate, derives session keys, sends Finished and can immediately begin sending encrypted application data

**TLS 1.3 improvements over 1.2:** 1-RTT handshake (vs 2-RTT), 0-RTT session resumption, forward secrecy mandatory (ephemeral key exchange), removed insecure cipher suites (RC4, 3DES, RSA key exchange).

**Certificate chain:** A server certificate is signed by an Intermediate CA, which is signed by a Root CA. Browsers trust Root CAs (hundreds are pre-installed). The chain must be complete and valid; a missing intermediate certificate is a common misconfiguration causing "certificate not trusted" errors.

**Key insight:** TLS's most important property is forward secrecy (via ephemeral Diffie-Hellman key exchange) — the session key is generated fresh for each connection and never stored. If an attacker records all encrypted traffic and later compromises the server's private key, they can't decrypt historical traffic. Without forward secrecy (RSA key exchange), the private key is the master secret.`,
    },
    {
      id: 813,
      name: "Connection States & TIME-WAIT",
      desc: `**TCP connection states** — the finite state machine that governs a TCP connection's lifecycle, from CLOSED through ESTABLISHED to various closing states. Understanding these states is essential for diagnosing connection issues and understanding why ports appear busy after a connection closes.

**Key states:**
- **LISTEN** — server waiting for incoming connections (socket bound and listening)
- **SYN-SENT** — client sent SYN, waiting for SYN-ACK
- **SYN-RECEIVED** — server received SYN, sent SYN-ACK, waiting for ACK
- **ESTABLISHED** — connection fully open; data can flow
- **FIN-WAIT-1** — application called close(); FIN sent, waiting for ACK
- **FIN-WAIT-2** — received ACK of FIN; waiting for remote FIN
- **CLOSE-WAIT** — received remote FIN; application hasn't called close() yet
- **TIME-WAIT** — sent final ACK; waiting 2×MSL before CLOSED
- **CLOSED** — no connection

**TIME-WAIT (the important one):** After the active closer sends the final ACK, the socket enters TIME-WAIT for 2×MSL (Maximum Segment Lifetime = 60 seconds per RFC, meaning TIME-WAIT lasts 120 seconds). This ensures: (1) the final ACK reaches the remote end (it retransmits FIN if ACK is lost), and (2) delayed packets from the old connection aren't confused with a new connection on the same 5-tuple.

**The TIME-WAIT problem:** On high-throughput servers closing many connections (short-lived HTTP requests), TIME-WAIT sockets accumulate, exhausting ephemeral port ranges. Mitigations: "SO-REUSEADDR" (socket option allowing new connections to reuse TIME-WAIT ports), reducing TIME-WAIT timeout, or using HTTP Keep-Alive to reuse connections.

**Key insight:** "Connection refused" (RST) means the port is not listening. "Connection timeout" means packets are being dropped (firewall? unreachable host?). "Address already in use" on a server usually means TIME-WAIT or the previous process is still running. Knowing what TCP state maps to what error message is a core network debugging skill.`,
    },
    {
      id: 814,
      name: "TCP Keep-Alive",
      desc: `**TCP Keep-Alive** — a mechanism that sends periodic probes on an idle TCP connection to detect whether the remote end is still alive and the connection is still valid. Solves the problem of "half-open connections" — where one side believes a connection is active but the other has crashed or the network path has been broken.

**The problem it solves:** If a client crashes or the network path goes down without sending a FIN/RST, the server's socket remains in ESTABLISHED state indefinitely, consuming resources and blocking application-level reconnection logic. Without keep-alive, a server might hold thousands of phantom connections to long-dead clients.

**How TCP Keep-Alive works:** After a configurable idle time (Linux default: 7200 seconds / 2 hours), the OS sends a keep-alive probe (empty ACK). If no response within the probe interval, it retries a configurable number of times. If all retries fail, the connection is declared dead and an error is returned to the application.

**Keep-alive parameters (tunable per-socket or system-wide):**
- "tcp_keepalive_time" — idle time before first probe (default: 7200s — far too long for most applications)
- "tcp_keepalive_intvl" — interval between probes (default: 75s)
- "tcp_keepalive_probes" — number of probes before declaring dead (default: 9)

**Application-layer keep-alive vs TCP keep-alive:** Many application protocols implement their own keep-alive mechanisms (HTTP/1.1 "Connection: keep-alive", WebSocket ping frames, SSH keepalive messages). Application-layer keep-alive is more portable and controllable; TCP keep-alive requires socket option configuration.

**Key insight:** TCP keep-alive at OS default settings (2 hours idle before first probe) is useless for production services — you'll have held a dead connection for 2 hours before detecting it. Always configure per-socket keep-alive with much shorter intervals for long-lived production connections (60-120 seconds idle time is typical).`,
    },
    {
      id: 815,
      name: "Socket Programming Concepts",
      desc: `**Socket programming** — the API through which applications create network connections, send and receive data. Sockets abstract the underlying TCP/UDP/IP stack, providing a file-like interface for network I/O. The Berkeley Sockets API (BSD Sockets), designed in the early 1980s, is the de facto standard; virtually every OS and language implements it.

**Socket types:**
- **SOCK-STREAM** — TCP; reliable, ordered, byte-stream
- **SOCK-DGRAM** — UDP; unreliable, unordered, message-based
- **SOCK-RAW** — raw IP; used for custom protocols, network tools (ping uses ICMP via raw sockets)
- **Unix Domain Sockets** — IPC between processes on the same machine; similar API to TCP sockets but via the filesystem; no network overhead; used by PostgreSQL, Docker, Nginx ↔ PHP-FPM communication

**The server lifecycle:**
1. "socket()" — create socket
2. "bind()" — associate socket with a local address and port
3. "listen()" — mark socket as passive (accepting connections)
4. "accept()" — block until a client connects; returns a new socket for that connection
5. "read()" / "write()" — exchange data
6. "close()" — close the socket

**Blocking vs non-blocking I/O:** By default, socket operations block — "read()" waits until data is available. Non-blocking mode returns immediately with EAGAIN/EWOULDBLOCK if no data is ready, requiring "select()", "poll()", or "epoll()" to efficiently wait on multiple sockets. This is the foundation of event-driven servers (Node.js, nginx, Redis).

**Key insight:** The difference between a blocking and non-blocking server architecture is not about what the CPU does — it's about how many threads/processes you need. A blocking server needs one thread per connection; a non-blocking event loop handles thousands of connections in one thread. At 10,000 concurrent connections, these architectures have radically different memory and context-switching overhead.`,
    },
  ],
};

export default transportLayer;
