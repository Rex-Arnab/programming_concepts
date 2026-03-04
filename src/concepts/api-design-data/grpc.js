const grpc = {
  name: "gRPC & Protocol Buffers",
  icon: "⚡",
  color: "#06b6d4",
  concepts: [
    {
      id: 1261,
      name: "gRPC Overview",
      desc: `**gRPC (Google Remote Procedure Call)** — a high-performance, open-source RPC framework from Google that uses Protocol Buffers as its interface definition language and HTTP/2 as its transport. It's the dominant internal API protocol for microservices at Google, Netflix, Square, and Lyft.

**Core value proposition:**
- **Performance:** binary serialization (Protobuf) is 3-10x smaller and faster than JSON; HTTP/2 multiplexing eliminates connection overhead
- **Streaming:** four communication patterns (unary, server streaming, client streaming, bidirectional) built-in
- **Code generation:** "protoc" generates type-safe client and server code in 10+ languages from a single ".proto" file
- **Strongly typed:** the ".proto" schema is the contract; type mismatches are compile-time errors, not runtime surprises

**vs REST:** gRPC is not REST. It's RPC — you call procedures (functions), not resources. "GetUser" not "GET /users/123". Better for internal services where you control both client and server; REST for public APIs.

**HTTP/2 benefits:** multiplexing (multiple RPC calls over one TCP connection), header compression (HPACK), binary framing, server push, flow control — all leveraged by gRPC.

**vs JSON over HTTP:** gRPC+Protobuf messages are 60-80% smaller than equivalent JSON; serialization is 5-10x faster. At scale (Google processes 10B+ gRPC calls/day), this translates to significant cost savings.

**Key insight:** gRPC is the standard for internal microservice communication when performance and polyglot support matter. Netflix uses gRPC between all services. But gRPC is not a replacement for REST in public APIs — the binary protocol isn't human-readable, browser support requires grpc-web, and debugging requires specialized tooling. Use each where it excels.`,
    },
    {
      id: 1262,
      name: "Protocol Buffers (Protobuf)",
      desc: `**Protocol Buffers (Protobuf)** — Google's language-neutral, platform-neutral binary serialization format and interface definition language (IDL). The ".proto" file defines message structures and service interfaces; "protoc" generates efficient serialization code in the target language.

**Proto3 syntax:**
"syntax = 'proto3'; package user; message User { string id = 1; string name = 2; string email = 3; int32 age = 4; repeated string roles = 5; UserStatus status = 6; } enum UserStatus { UNKNOWN = 0; ACTIVE = 1; INACTIVE = 2; }"

**Field numbers (not names):** fields are identified by number (1, 2, 3) in the binary encoding — not by name. "name = 2" means the "name" field is encoded as field number 2. This enables backward compatibility: add new fields with new numbers; old code ignores unknown field numbers. Never reuse field numbers.

**Default values in proto3:** all fields have defaults if not set: 0 for numbers, "" for strings, false for bool, empty list for repeated. No "required" vs "optional" distinction (proto3 removed required — all fields are effectively optional).

**Binary encoding:** Protobuf uses a compact binary format with varint encoding (small integers use fewer bytes), field number + wire type tags, and no delimiters between fields. A JSON {"id": "123", "name": "Alice"} might be 30 bytes; equivalent Protobuf ~10 bytes.

**Well-known types:** Google provides standard Protobuf types: "google.protobuf.Timestamp", "google.protobuf.Duration", "google.protobuf.Any", "google.protobuf.Struct" (JSON-like), "google.protobuf.Empty".

**Key insight:** Never reuse or delete Protobuf field numbers — reusing a number for a different field type causes silent data corruption in old clients that still have the old definition. Deprecate fields with the "reserved" keyword; use new field numbers for new fields. This is the #1 Protobuf migration mistake.`,
    },
    {
      id: 1263,
      name: "gRPC Service Definition",
      desc: `**gRPC Service Definition** — the "service" block in a ".proto" file that defines the API contract: the service name and all RPCs with their request and response message types.

**Four communication patterns:**
"service UserService { rpc GetUser (GetUserRequest) returns (User) {} rpc ListUsers (ListUsersRequest) returns (stream User) {} rpc CreateUsers (stream CreateUserRequest) returns (BatchCreateResult) {} rpc Chat (stream ChatMessage) returns (stream ChatMessage) {} }"

1. **Unary RPC:** client sends one request → server sends one response (like a regular function call). Most common pattern.
2. **Server streaming:** client sends one request → server sends a stream of responses (large dataset, real-time updates). "returns (stream T)"
3. **Client streaming:** client sends a stream of requests → server sends one response (file upload, batch ingest). "(stream T) returns (T)"
4. **Bidirectional streaming:** both client and server send streams simultaneously (chat, collaborative editing, real-time sync). "(stream T) returns (stream T)"

**Request/Response messages:** every RPC has typed request and response messages defined as Protobuf messages. No generic "any object" — full type safety.

**Empty messages:** use "google.protobuf.Empty" (or define "message EmptyRequest {}") for RPCs with no parameters — don't reuse the same empty message across multiple RPCs (harder to evolve independently).

**Key insight:** The choice of communication pattern is architectural. Server streaming is the right pattern for paginated large result sets, live feeds, and progress reporting. Bidirectional streaming is powerful but complex — reserve it for real-time collaborative scenarios. Most RPC calls should be unary.`,
    },
    {
      id: 1264,
      name: "gRPC Error Handling",
      desc: `**gRPC Error Handling** — gRPC uses a standardized set of status codes (not HTTP status codes) and optional error metadata for communicating failures. The gRPC status model is richer than HTTP 4xx/5xx categories.

**gRPC status codes (subset):**
- "OK (0):" success
- "INVALID_ARGUMENT (3):" bad input (equivalent to HTTP 400) — client should fix the request
- "NOT_FOUND (5):" resource doesn't exist (HTTP 404)
- "ALREADY_EXISTS (6):" conflicting create (HTTP 409)
- "PERMISSION_DENIED (7):" authenticated but not authorized (HTTP 403)
- "UNAUTHENTICATED (16):" not authenticated (HTTP 401)
- "RESOURCE_EXHAUSTED (8):" rate limit exceeded (HTTP 429)
- "INTERNAL (13):" server bug (HTTP 500)
- "UNAVAILABLE (14):" server temporarily unavailable; client should retry with backoff (HTTP 503)
- "DEADLINE_EXCEEDED (4):" request exceeded the client-set deadline
- "FAILED_PRECONDITION (9):" operation rejected because system is not in required state
- "ABORTED (10):" operation aborted, typically for concurrency conflicts

**Rich error details (google.rpc.Status):** gRPC errors carry a "Status" message with code + message + "repeated Any details". Standard detail types: "google.rpc.BadRequest" (field violations), "google.rpc.RetryInfo" (when to retry), "google.rpc.ErrorInfo" (error domain + reason), "google.rpc.QuotaFailure".

**Retryable vs non-retryable:** UNAVAILABLE and DEADLINE_EXCEEDED → retry with exponential backoff. INVALID_ARGUMENT and PERMISSION_DENIED → fix the request, don't retry.

**Key insight:** gRPC's status codes are more semantically precise than HTTP status codes — there's a difference between "server is down" (UNAVAILABLE) and "server processed the request but it took too long" (DEADLINE_EXCEEDED). Clients can programmatically distinguish these and retry appropriately. Define your retry policy per status code in your service mesh (Envoy, Istio do this automatically).`,
    },
    {
      id: 1265,
      name: "gRPC Metadata & Interceptors",
      desc: `**gRPC Metadata** — key-value pairs sent alongside RPC calls (equivalent to HTTP headers). Used for authentication tokens, request IDs, tracing headers, and other cross-cutting concerns without polluting message schemas.

**Metadata types:**
- **Request metadata:** sent by client with every call — auth token, request ID, client version, feature flags
- **Response metadata:** sent by server with response — timing, version, server ID
- **Trailing metadata:** sent after response stream completes — useful in streaming RPCs for final status metadata

**Setting metadata (Go example):**
"md := metadata.Pairs('authorization', 'Bearer ' + token, 'x-request-id', requestID); ctx = metadata.NewOutgoingContext(ctx, md)"

**Reading metadata in server (Go):**
"md, ok := metadata.FromIncomingContext(ctx); token := md.Get('authorization')"

**Interceptors (gRPC middleware):** functions that wrap every RPC call for cross-cutting concerns. Two types:
- **Unary interceptors:** wrap unary RPCs (like HTTP middleware)
- **Stream interceptors:** wrap streaming RPCs (called once but can intercept messages)

**Common interceptor use cases:**
- Authentication: validate JWT from metadata; inject user into context
- Logging: log every RPC call (method, duration, status code, request ID)
- Distributed tracing: extract trace context from metadata; create spans (OpenTelemetry)
- Rate limiting: check rate limit before executing handler
- Panic recovery: catch panics in handlers; return INTERNAL status instead of crashing

**gRPC-Go interceptor chaining:** "grpc.ChainUnaryInterceptor(authInterceptor, loggingInterceptor, tracingInterceptor)"

**Key insight:** Interceptors in gRPC are what middleware is in Express or filters in Spring — the right place for auth, logging, and tracing that applies to every RPC. Put common concerns in interceptors; keep business logic in handlers. This separation makes each layer independently testable.`,
    },
    {
      id: 1266,
      name: "gRPC Deadlines & Cancellation",
      desc: `**gRPC Deadlines & Cancellation** — first-class features of gRPC that allow clients to set a time limit for RPC completion and cancel in-progress RPCs when results are no longer needed. Critical for building resilient distributed systems.

**Deadlines:** the client specifies an absolute time by which the RPC must complete: "ctx, cancel := context.WithTimeout(ctx, 5*time.Second)" — the RPC must finish within 5 seconds or the client gets DEADLINE_EXCEEDED. The deadline is propagated to downstream services, preventing cascading timeouts.

**Why deadlines matter:** without deadlines, a slow upstream service causes downstream calls to wait indefinitely → thread/goroutine exhaustion → cascade failure. Deadlines bound resource usage — if the client won't wait more than 5 seconds, the server shouldn't continue processing after 5 seconds either.

**Propagating deadlines:** when service A calls service B, which calls service C — A's deadline should propagate through the chain. gRPC propagates deadlines automatically via context. If A's deadline is 5s and A→B takes 2s, B→C gets at most 3s.

**Cancellation:** "cancel()" from "context.WithTimeout" sends a cancellation signal upstream — the server can detect "ctx.Done()" and stop processing. Correct server code checks "ctx.Err()" in long loops: "if err := ctx.Err(); err != nil { return err }"

**Client-triggered cancellation:** user closes the app mid-operation → client cancels the context → server stops the RPC. Saves server resources for work that will never be used.

**Key insight:** Every gRPC call should have a deadline. "Never set a deadline" is the same as "I'm fine with this call hanging forever." Production services use per-method deadline configurations in service meshes (Envoy's timeout configuration) so engineers don't need to set timeouts in every call site.`,
    },
    {
      id: 1267,
      name: "gRPC-Web & Browser Support",
      desc: `**gRPC-Web** — a protocol variant that enables browser JavaScript to communicate with gRPC services. Browsers cannot use native gRPC (HTTP/2 framing is not accessible via browser Fetch/XHR APIs), so gRPC-Web uses a proxy to translate between browser-compatible HTTP and native gRPC.

**Architecture:** Browser → (HTTP/1.1 or HTTP/2 with gRPC-Web framing) → Envoy Proxy / gRPC-Web proxy → (native gRPC over HTTP/2) → gRPC service.

**Envoy proxy:** the standard gRPC-Web → gRPC translation layer. Envoy terminates the gRPC-Web connection and forwards native gRPC to backend services. Alternatively: grpc-web-proxy (standalone proxy), Traefik, or Nginx with grpc-web module.

**Limitations vs native gRPC:**
- No client streaming or bidirectional streaming (Envoy supports server streaming)
- Server streaming: works in gRPC-Web (useful for real-time feeds)
- Requires the proxy layer (operational overhead)

**@improbable-eng/grpc-web (browser client library):** "grpcWeb.invoke(UserService.GetUser, { request: new GetUserRequest().setId('123'), host: 'https://api.example.com', onMessage: (user) => console.log(user.getName()), onEnd: (code, message) => ... });"

**Alternative — gRPC transcoding:** configure Envoy or the gRPC server to expose HTTP/JSON alongside gRPC — a single ".proto" service with "@http" annotations can serve both REST/JSON and gRPC clients without a separate proxy.

**Key insight:** gRPC-Web fills the browser gap in gRPC-first architectures, but adds proxy complexity. For public APIs with browser clients, REST/JSON is still simpler. For internal tooling frontends or teams already running Envoy as a service mesh, gRPC-Web makes the frontend a consistent member of the gRPC ecosystem.`,
    },
    {
      id: 1268,
      name: "Protocol Buffer Compatibility",
      desc: `**Protobuf Backward & Forward Compatibility** — the rules for safely evolving ".proto" schemas without breaking existing clients or servers. Protobuf's binary encoding is designed for compatibility, but violations of the rules cause silent data corruption or crashes.

**Safe changes (backward compatible):**
- Add new fields with new field numbers → old code ignores unknown fields
- Remove optional fields (deprecated but not deleted) → new code gets default values
- Rename fields (field numbers unchanged) → binary encoding doesn't use names
- Add new enum values → old code may get UNKNOWN or 0 default

**Unsafe changes (breaking):**
- Change a field's type (e.g., int32 → string) → binary encoding incompatible; silent corruption
- Reuse a field number for a different field → binary encoding reads wrong type; silent corruption
- Change a "singular" field to "repeated" or vice versa → structural mismatch
- Remove a field number without "reserving" it → future reuse risk

**"reserved" keyword:** "reserved 2, 5, 'old_name', 'deprecated_email';" — blocks reuse of retired field numbers and names. Use whenever you remove a field.

**Proto3 "optional" keyword:** "optional string email = 3;" — distinguishes between "field not set" and "field set to default value". Without "optional", proto3 has no way to differentiate "name = ''" from "name not provided" (hasField was removed in proto3 base).

**Buf — the schema registry for Protobuf:** "buf breaking --against origin/main" — checks your changes for breaking compatibility violations. Essential in CI/CD for catching breaking schema changes before they deploy.

**Key insight:** Protobuf compatibility is more fragile than JSON compatibility — silent data corruption (not crashes) is the failure mode for field number reuse. Every ".proto" project should run "buf breaking" in CI. Treat field numbers like primary keys: once allocated, never reuse.`,
    },
    {
      id: 1269,
      name: "Connect Protocol",
      desc: `**Connect Protocol** — a newer RPC protocol from Buf (the makers of the Buf schema registry) that is fully compatible with gRPC and gRPC-Web but also natively supports browser-friendly HTTP/1.1 + JSON. A single server can speak gRPC, gRPC-Web, and Connect simultaneously.

**Why Connect:** gRPC requires HTTP/2 (native gRPC) or a proxy (gRPC-Web). Connect works natively over HTTP/1.1 or HTTP/2, using either binary Protobuf or JSON serialization — no proxy required for browser clients.

**Connect RPC format:** unary calls become standard HTTP POST requests; the path is "/package.Service/Method". JSON mode: "Content-Type: application/json". Binary mode: "Content-Type: application/proto". Trivially curl-able.

**Multi-protocol support:** a Connect server responds to:
- Connect protocol (native, no proxy needed, browser-compatible)
- gRPC protocol (native gRPC clients)
- gRPC-Web protocol (gRPC-Web clients)

All three from the same server, auto-detected from the "Content-Type" header.

**Buf's Connect implementations:** "connectrpc/connect-go", "connectrpc/connect-es" (TypeScript/JS), "connectrpc/connect-swift", "connectrpc/connect-kotlin". Each generates Connect-compatible clients from ".proto" files.

**Browser DX:** browser TypeScript client:
"const client = createClient(UserService, createConnectTransport({ baseUrl: 'https://api.example.com' })); const user = await client.getUser({ id: '123' });"

No proxy, no gRPC-Web adapter — direct HTTP/1.1 from the browser.

**Key insight:** Connect is what gRPC-Web should have been — it makes gRPC-style RPC work natively in browsers without proxy infrastructure. For new projects choosing between REST and gRPC, Connect bridges the gap: you get Protobuf's type safety and code generation, REST-like HTTP/JSON compatibility for browsers and curl, and full gRPC compatibility for backend services.`,
    },
    {
      id: 1270,
      name: "gRPC vs REST vs GraphQL",
      desc: `**Choosing between gRPC, REST, and GraphQL** — a practical decision framework based on who the consumers are, what performance requirements exist, and what tooling your team can support.

**Decision matrix:**

| Criteria | REST | GraphQL | gRPC |
|---|---|---|---|
| Browser clients | Excellent | Good (needs client lib) | Needs proxy |
| Internal microservices | Good | Rarely used | Excellent |
| Mobile clients | Good | Good | Good (with Connect) |
| Public/partner API | Excellent | Good | Poor |
| Real-time/streaming | Poor (polling) | Good (subscriptions) | Excellent |
| Performance (throughput) | Good | Good | Excellent |
| Caching | Excellent (HTTP cache) | Complex | Requires custom |
| Type safety | Manual | Schema-enforced | Compile-time |
| Learning curve | Low | Medium | Medium-high |
| Tooling maturity | Excellent | Good | Good |

**Practical recommendations:**
- **Public API:** REST — universal understanding; HTTP caching; no special tooling required
- **Internal microservices:** gRPC — performance, streaming, contract-first with Protobuf
- **BFF (Backend for Frontend):** GraphQL — aggregates multiple services; clients specify data needs
- **Real-time features:** gRPC streaming or WebSockets — true push
- **Small team, quick build:** REST — lowest operational overhead

**Polyglot reality:** most mature engineering organizations use all three: REST for public APIs, gRPC internally, GraphQL for flexible client data fetching, WebSockets for real-time.

**Key insight:** The worst API architecture decision is applying one protocol everywhere out of philosophical consistency. Netflix doesn't use REST for internal service-to-service calls — they use gRPC. Stripe doesn't use GraphQL for their public API — they use REST. Each protocol was designed for specific trade-offs. Match the protocol to the use case.`,
    },
  ],
};

export default grpc;
