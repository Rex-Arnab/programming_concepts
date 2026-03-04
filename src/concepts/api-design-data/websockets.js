const websockets = {
  name: "WebSockets & Real-Time APIs",
  icon: "🔄",
  color: "#10b981",
  concepts: [
    {
      id: 1271,
      name: "WebSocket Protocol",
      desc: `**WebSocket Protocol** — a persistent, full-duplex TCP communication channel initiated over HTTP and then "upgraded" to the WebSocket protocol. Both client and server can send messages to each other at any time without the request-response cycle overhead.

**HTTP upgrade handshake:**
Client sends: "GET /ws HTTP/1.1 Upgrade: websocket Connection: Upgrade Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ=="
Server responds: "101 Switching Protocols Upgrade: websocket Connection: Upgrade Sec-WebSocket-Accept: [calculated from Key]"

After the handshake, the same TCP connection is reused for bidirectional WebSocket frames.

**WebSocket frames:** data is sent in frames (not HTTP requests). Frame types: text, binary, ping, pong, close. The WebSocket protocol is framing-only — you define the message format (JSON, binary protocol, custom text) on top.

**vs HTTP polling:** HTTP polling (every 1 second GET → new TCP + TLS handshake each time): ~500ms overhead per poll. WebSocket: zero overhead after handshake — persistent connection, messages sent in < 1ms.

**vs Server-Sent Events (SSE):** SSE is one-way server-to-client (no client-to-server push without a separate HTTP request). WebSocket is bidirectional. SSE is simpler (works over HTTP/1.1, automatic reconnection, EventSource API); WebSocket is more powerful. Use SSE for one-way feeds; WebSocket for bidirectional.

**Key insight:** WebSocket is the right technology when both sides need to push messages: chat (user sends, server sends to others), collaborative editing (user edits, server broadcasts), gaming (user actions, server state updates). For server-to-client only (notifications, live dashboards), SSE is simpler and handles HTTP reconnection automatically.`,
    },
    {
      id: 1272,
      name: "WebSocket Server Implementation",
      desc: `**WebSocket Server Implementation** — the patterns for handling WebSocket connections on the server: connection lifecycle, message handling, broadcasting, and room management.

**Connection lifecycle events:** "open" (client connected), "message" (received data), "close" (connection closed — may be client, server, or network), "error" (connection error — always followed by "close").

**Node.js with ws library:**
"const wss = new WebSocketServer({ server: httpServer }); wss.on('connection', (ws, req) => { const userId = authenticate(req); ws.on('message', (data) => { const msg = JSON.parse(data); handleMessage(userId, msg, ws); }); ws.on('close', () => cleanup(userId)); });"

**Broadcasting to all clients:** "wss.clients.forEach(client => { if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(event)); });"

**Room management (channel pattern):** store a Map of "roomId → Set[ws]"; on join, add ws to room; on message, send to all ws in the room:
"rooms.get(roomId)?.forEach(client => client.send(data))"

**Heartbeat / ping-pong:** clients can silently drop (mobile network switches, proxy timeouts). Server sends periodic pings; clients respond with pong. If pong isn't received in time, server closes the connection.

**Connection metadata:** attach data to each connection: "ws.userId = userId" — avoids separate state lookup on every message. But be careful: "ws" object is mutable and shared.

**Key insight:** WebSocket servers are stateful — connections are long-lived, and you must handle the full connection lifecycle including cleanup on close. Every "close" event must clean up resources (remove from rooms, cancel subscriptions, decrement counters). Missing cleanup is the most common WebSocket server memory leak.`,
    },
    {
      id: 1273,
      name: "WebSocket Scaling",
      desc: `**WebSocket Scaling** — the architectural challenge of distributing WebSocket connections across multiple server instances. Unlike HTTP (stateless, any server handles any request), WebSocket connections are stateful and sticky to a server, requiring explicit strategies to scale.

**The problem:** User A (on Server 1) sends a message to User B (on Server 2). Server 1 has no connection to User B. How does the message reach User B?

**Solution 1 — Sticky sessions (session affinity):** load balancer routes each user to the same server for the session's duration. Simple, but creates uneven load; server failures drop all its connections.

**Solution 2 — Pub/Sub message bus (Redis):** each WebSocket server subscribes to Redis channels. When User A sends a message: Server 1 publishes to Redis channel "room:456". All servers (including Server 2) receive it and send to their connected clients in that room. Horizontal scaling without sticky sessions.

**Solution 3 — Managed WebSocket services:** Pusher, Ably, AWS API Gateway WebSocket, Azure Web PubSub — fully managed horizontal scaling. You publish events to the service; it delivers to all subscribers across its infrastructure.

**Socket.io** handles scaling via adapters: "@socket.io/redis-adapter" for Redis pub/sub; "@socket.io/cluster-adapter" for Node.js cluster. Configure the adapter and scaling is transparent.

**Connection limits per server:** a Node.js server can handle 10k-100k concurrent WebSocket connections (depending on memory and processing). Plan server capacity based on expected concurrent connections.

**Key insight:** The Redis pub/sub pattern is the standard WebSocket scaling solution for most teams. It's simple (one Redis instance handles millions of message/sec), reliable, and keeps WebSocket servers stateless (except the connection itself). Build with Redis pub/sub from day one if you need > 1 WebSocket server instance.`,
    },
    {
      id: 1274,
      name: "Socket.io",
      desc: `**Socket.io** — a library built on top of WebSockets (with automatic fallback to HTTP long-polling) that adds rooms, namespaces, event-based messaging, automatic reconnection, and acknowledgments — making production-ready real-time features significantly easier to build.

**Key features beyond raw WebSockets:**
- **Event-based API:** "socket.emit('message', { text: 'Hello' })" / "socket.on('message', (data) => ...)" — named events instead of raw message strings
- **Rooms:** "socket.join('room:123')" / "io.to('room:123').emit('event', data)" — group sockets for targeted broadcasting
- **Namespaces:** "/admin", "/user" — logical separation of connection contexts on the same server
- **Acknowledgments:** "socket.emit('message', data, (ack) => ...)" — callback-based delivery confirmation
- **Auto-reconnection:** Socket.io client automatically reconnects on disconnect with exponential backoff
- **Fallback transport:** if WebSocket is blocked (corporate proxies), falls back to HTTP long-polling automatically

**Server:**
"const io = new Server(httpServer, { cors: { origin: 'https://app.example.com' } }); io.on('connection', (socket) => { socket.on('join-room', (roomId) => socket.join(roomId)); socket.on('chat-message', (msg) => io.to(msg.roomId).emit('chat-message', { ...msg, sender: socket.userId })); });"

**vs raw WebSocket:** Socket.io adds ~30KB client bundle overhead. For simple use cases (single-room, text messages), raw WebSocket is leaner. For complex real-time apps (rooms, multi-user, reconnection, fallback), Socket.io's abstractions pay for themselves.

**Socket.io scaling:** requires "@socket.io/redis-adapter" for multi-server deployments — Socket.io by default doesn't support multiple server instances without it.

**Key insight:** Socket.io is the jQuery of WebSockets — everyone knows the "don't use it" arguments, but it solves real cross-browser and connection-resilience problems that raw WebSocket doesn't handle. Use raw WebSocket when you control both client and server; use Socket.io when you need reconnection resilience, rooms, and fallback transport across diverse client environments.`,
    },
    {
      id: 1275,
      name: "Server-Sent Events (SSE)",
      desc: `**Server-Sent Events (SSE)** — a simple, HTTP-based protocol for one-directional server-to-client push. The server keeps an HTTP connection open and streams events to the client using a standardized text format. Supported natively via the "EventSource" browser API.

**When to use SSE over WebSockets:**
- Only the server needs to push (notifications, live dashboards, stock tickers, progress updates)
- HTTP/1.1 only (SSE works without HTTP/2; WebSocket still needs the upgrade handshake)
- Automatic reconnection is critical (EventSource reconnects automatically; WebSocket needs custom retry logic)
- Firewall/proxy friendliness (SSE is plain HTTP; some proxies block WebSocket upgrades)

**SSE event format (server response):**
"Content-Type: text/event-stream
data: {"price": 123.45, "symbol": "AAPL"}

event: alert
data: Server maintenance in 5 minutes
id: 1234

: this is a comment (ignored by client)"

Lines starting with "data:", "event:", "id:", "retry:" define each event. Blank line = event boundary.

**Browser "EventSource" API:**
"const es = new EventSource('/api/events'); es.onmessage = (e) => console.log(JSON.parse(e.data)); es.addEventListener('alert', (e) => showBanner(e.data)); es.onerror = () => { /* auto-reconnects */ };"

**Last-Event-ID:** browser sends the last received "id" on reconnect; server can resume from that position.

**SSE with authentication:** "EventSource" doesn't support custom headers. Workaround: pass auth token as query param ("?token=...") or use cookie auth. For header-based auth, use a fetch-based SSE polyfill.

**Key insight:** SSE is significantly underused. For server-push patterns (live notifications, progress bars, log streaming, dashboards), SSE is simpler than WebSockets, uses standard HTTP (no upgrade), and reconnects automatically. Start with SSE; only upgrade to WebSocket when you need bidirectional communication.`,
    },
    {
      id: 1276,
      name: "Long Polling & HTTP Polling",
      desc: `**HTTP Polling & Long Polling** — the pre-WebSocket techniques for achieving real-time updates over plain HTTP. Still relevant for environments where WebSocket or SSE are unavailable.

**Short polling:** client periodically sends "GET /events" every N seconds. Server responds immediately (even if no new data). Simple but: wastes bandwidth (empty responses), adds latency (N-second delay), and hammers the server.

"setInterval(() => fetch('/events').then(r => r.json()).then(handleEvents), 2000);"

**Long polling:** client sends "GET /events"; server holds the connection open until new data arrives, then responds and closes. Client immediately sends the next long-poll request.
- Near real-time (response sent as soon as data is available)
- Server holds connections open → higher server resource usage than WebSocket
- Each response closes the connection → reconnection overhead (new TCP + HTTP handshake each time)
- Scales poorly: 10k clients = 10k simultaneous open connections waiting

**Implementation:** server's handler "awaits" new data: "poll.js: while (noNewEvents) { await sleep(1000); if (hasNewEvents(since)) break; } return newEvents(since);" with a timeout (e.g., 30s max hold).

**When still relevant:** legacy browser support (IE), environments where WebSocket is blocked by corporate proxies, simple notification systems where polling frequency is acceptable.

**Comparison:**
- Short polling: simple, high bandwidth, high latency
- Long polling: near real-time, moderate complexity, connection overhead
- SSE: near real-time, simple, server-to-client only
- WebSocket: real-time, bidirectional, most efficient for sustained connections

**Key insight:** In 2026, there's almost no reason to choose polling over SSE for server-to-client updates in a new project. SSE works on HTTP/1.1, handles reconnection automatically, and uses a fraction of the server resources that long polling requires. Long polling is a legacy technique kept alive by environments where SSE is unavailable.`,
    },
    {
      id: 1277,
      name: "WebSocket Authentication",
      desc: `**WebSocket Authentication** — securing WebSocket connections to ensure only authorized users can connect and receive data. WebSocket authentication has nuances that HTTP authentication doesn't, because the WebSocket handshake has limited header support from browsers.

**Challenge:** the browser's native "WebSocket" constructor doesn't support custom headers. "new WebSocket(url, protocols)" — no way to pass "Authorization: Bearer token" in the upgrade request from a browser.

**Solutions:**

**1. Cookie-based auth (simplest):** if your site uses HTTP-only cookies for session auth, they're automatically sent with the WebSocket upgrade request. Server validates the session cookie. Works if you're on the same domain.

**2. Token in query parameter:** "new WebSocket('wss://api.example.com/ws?token=eyJ...')" — token visible in server logs and browser history. Mitigate by using short-lived tokens (< 60 seconds) specifically for WebSocket connection establishment.

**3. First-message auth:** connect without auth, then send an auth message as the first message. Server closes the connection if the first message isn't a valid auth message within a timeout. Clean but adds a round trip.

**4. Ticket system:** client calls REST "POST /ws-ticket" with their auth header → server returns a short-lived single-use ticket → client uses ticket in WebSocket URL "?ticket=abc". Server validates ticket, destroys it, establishes WebSocket session.

**Authorization in messages:** even after connection auth, validate authorization per message action — user authenticated ≠ user authorized for every room or channel they try to join.

**Key insight:** The ticket system is the most secure approach for browser WebSocket auth — the short-lived, single-use ticket means the URL in logs is useless after first use. The implementation cost is one REST endpoint and a Redis store for valid tickets. Worth it for security-sensitive real-time features.`,
    },
    {
      id: 1278,
      name: "Real-Time API Design Patterns",
      desc: `**Real-Time API Design Patterns** — the architectural patterns for building scalable, reliable real-time features using WebSockets, SSE, or gRPC streaming.

**Channel/Room pattern:** clients subscribe to channels (rooms, topics) by name. Messages are sent to channels, delivered to all subscribers. Basis of chat, collaborative editing, live feeds.

**Presence detection:** tracking which users are currently online. Maintain a Redis set of online user IDs per room; update on connect/disconnect with heartbeat validation. Presence changes trigger "user_joined"/"user_left" events.

**Event sourcing for real-time:** instead of stateful sync, the server is an append-only event log; clients receive events (not current state). Client reconstructs state by replaying events from their last-seen position. Enables reliable reconnection — client sends "last_event_id" and resumes.

**Operational Transform (OT) / CRDT for collaborative editing:** multiple users editing the same document simultaneously. OT (Google Docs approach): transform concurrent operations so they merge correctly. CRDT (Automerge, Yjs): data structures that merge automatically without conflict resolution logic.

**Fan-out patterns:**
- **Push to all subscribers:** message reaches all clients subscribed to a channel (Redis pub/sub)
- **Push to specific user:** maintain "userId → [connectionId]" map; push to all user's connections across servers
- **Fan-out on write:** precompute each user's feed on content creation; store in per-user queues (Twitter-style)
- **Fan-out on read:** compute feed content at read time (simpler, works for smaller audiences)

**Idempotent message delivery:** at-least-once delivery with client-side deduplication using message IDs. Client tracks processed IDs; drops duplicates.

**Key insight:** The fan-out on write vs. read distinction is the core scaling decision for real-time feeds. Twitter uses fan-out on write for most users (precomputed timelines) but fan-out on read for users with 1M+ followers (precomputing for celebrity accounts is too slow). Let your user distribution guide the choice.`,
    },
    {
      id: 1279,
      name: "WebRTC Overview",
      desc: `**WebRTC (Web Real-Time Communication)** — a browser API and protocol suite that enables peer-to-peer (P2P) audio, video, and data communication directly between browsers, without a central media server in the data path.

**Core components:**
- **RTCPeerConnection:** manages the P2P connection — ICE negotiation, DTLS encryption, audio/video codec negotiation (SDP)
- **RTCDataChannel:** bidirectional P2P data channel (like WebSocket but P2P, with reliability settings)
- **getUserMedia / getDisplayMedia:** captures local camera, microphone, and screen (covered in PWA APIs)

**Signaling:** WebRTC peers need to exchange connection metadata (SDP offers/answers) to establish the P2P connection. Signaling is NOT part of the WebRTC spec — you implement it via WebSocket, HTTP, or any mechanism. Signaling server is the "matchmaker" but not in the data path.

**ICE / STUN / TURN:**
- **STUN server:** helps each peer discover its public IP/port for P2P connection (free servers: Google's "stun:stun.l.google.com:19302")
- **TURN server:** relay server when direct P2P fails (symmetric NAT, corporate firewalls). TURN is expensive (relays all traffic); host your own with Coturn.
- **ICE:** the algorithm that gathers STUN/TURN candidates and finds the best path for the P2P connection

**Use cases:** video calls (Zoom, Google Meet use WebRTC), screen sharing, file sharing P2P, multiplayer gaming, CDN P2P delivery.

**Mesh vs SFU vs MCU:**
- **Mesh:** each peer connects to all others. Simple; only works for 2-4 participants (O(N^2) connections).
- **SFU (Selective Forwarding Unit):** peers send to one server; server forwards to others. Scales to 50+ participants. Used by Zoom, Jitsi.
- **MCU (Multipoint Control Unit):** server decodes all streams, mixes into one, sends to each client. Heavy server processing; lowest client bandwidth.

**Key insight:** WebRTC P2P sounds like it eliminates server infrastructure, but TURN servers are required for 15-30% of connections (where direct P2P fails). Budget for TURN server bandwidth in your WebRTC architecture. Most production video call services use SFU architecture for group calls.`,
    },
    {
      id: 1280,
      name: "Webhooks",
      desc: `**Webhooks** — an HTTP push pattern where a service sends an HTTP POST to your URL when an event occurs, instead of you polling the service for changes. The "callback" pattern for APIs: you register a URL, and the service calls you.

**How webhooks work:**
1. You register a webhook URL with the service: "POST /register-webhook { url: 'https://your-app.com/stripe-events', events: ['payment.succeeded', 'payment.failed'] }"
2. Service sends "POST https://your-app.com/stripe-events { type: 'payment.succeeded', data: {...} }" when the event occurs
3. Your server processes the event and responds with "200 OK" within the timeout (typically 5-30 seconds)

**Reliability — at-least-once delivery:** webhook providers retry on failure (non-200 response, timeout). Your handler must be idempotent — processing the same event twice must be safe. Check "event.id" against a processed IDs store.

**Webhook security — HMAC signature verification:** providers sign webhook payloads with a shared secret. "Stripe-Signature: t=1234,v1=abc..." — verify using HMAC-SHA256:
"const computed = crypto.createHmac('sha256', webhookSecret).update(rawBody).digest('hex'); if (!timingSafeEqual(computed, receivedSignature)) reject();"

Always use "rawBody" (before JSON.parse) for HMAC verification — any modification invalidates the signature.

**Payload replay attacks:** check the timestamp in the signature header; reject payloads older than 5 minutes to prevent replaying captured requests.

**Event ordering:** webhooks are not guaranteed to arrive in order. "payment.failed" may arrive before "payment.created". Design handlers to be order-independent; use the event's timestamp to determine causality.

**Local development:** "ngrok http 3000" — exposes your local server to the internet for receiving webhooks during development. Stripe CLI also proxies webhooks to localhost.

**Key insight:** Idempotency + signature verification = the two non-negotiable webhook requirements. Without idempotency, webhook retries cause duplicate orders/charges. Without signature verification, any attacker can POST fake events to your webhook URL. Every webhook handler needs both.`,
    },
  ],
};

export default websockets;
