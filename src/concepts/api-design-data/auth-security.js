const authSecurity = {
  name: "API Authentication & Security",
  icon: "🔐",
  color: "#ef4444",
  concepts: [
    {
      id: 1281,
      name: "API Keys",
      desc: `**API Keys** — simple, opaque tokens passed in HTTP headers or query parameters to identify and authenticate API callers. The most common authentication mechanism for public and partner APIs due to their simplicity.

**Formats and transmission:**
- Custom header (preferred): "X-API-Key: sk_live_abc123"
- Authorization header: "Authorization: ApiKey sk_live_abc123"
- Query parameter (avoid for production): "?api_key=sk_live_abc123" — logged in server logs and browser history

**Anatomy of a well-designed API key:**
- **Prefix:** "sk_live_" (Stripe), "pk_test_" (public/test) — human-readable key type
- **Body:** 24-32 random bytes (URL-safe base64 or hex) — cryptographically random
- **Environment suffix:** "sk_live_" vs "sk_test_" — prevent production keys in staging

**Storage (server-side):** never store raw API keys. Store "hash(key)" using SHA-256. On request: hash the received key; compare against stored hash. If database is breached, keys are not leaked.

**Scoped keys:** keys should have associated permissions/scopes: "sk_read_only" vs "sk_full_access". Allow users to create narrow-scope keys for specific integrations.

**Key rotation:** support multiple active keys per customer (old + new) to enable zero-downtime key rotation. Provide a webhook event when keys expire.

**Key vs OAuth:** API keys are simpler (one string, no token exchange) but less granular. OAuth is correct when keys act on behalf of end users. API keys are correct for machine-to-machine (M2M) authentication.

**Key insight:** API key security is entirely about storage and transmission. "sk_live_" prefix is a Stripe innovation that GitHub replicated: when a secret scanner finds a string matching "sk_live_...", it knows exactly which service to revoke it from. Adopt meaningful prefixes so automated scanners can alert on leaked keys immediately.`,
    },
    {
      id: 1282,
      name: "OAuth 2.0 Flows",
      desc: `**OAuth 2.0** — an authorization framework that enables third-party applications to access user resources without the user sharing their password. OAuth defines multiple "flows" (grant types) for different client types and trust levels.

**Authorization Code Flow (web apps, most secure):**
1. App redirects user to authorization server: "GET /authorize?response_type=code&client_id=...&redirect_uri=...&scope=read:profile&state=random_nonce"
2. User authenticates and approves
3. Auth server redirects to "redirect_uri?code=AUTH_CODE&state=nonce" — verify state matches
4. App exchanges code for tokens: "POST /token { code, client_id, client_secret, redirect_uri }" → "{ access_token, refresh_token, expires_in }"
5. Use access_token in API calls: "Authorization: Bearer ACCESS_TOKEN"

**PKCE (Proof Key for Code Exchange):** extension for public clients (SPAs, mobile apps without a client secret). Replaces client_secret with a dynamically generated code_challenge/code_verifier pair — prevents authorization code interception attacks.

**Client Credentials Flow (M2M, no user):**
"POST /token { grant_type: client_credentials, client_id, client_secret, scope }" → access_token. Service-to-service auth without user interaction.

**Implicit Flow (deprecated):** returned tokens in URL hash. Replaced by Authorization Code + PKCE. Never use implicit flow in new implementations.

**Device Code Flow:** for devices with limited input (smart TVs, CLI tools). Device displays a code; user authorizes on a separate device.

**Access token vs Refresh token:** access tokens are short-lived (1 hour); refresh tokens are long-lived (30 days). Exchange refresh token for new access token silently when access token expires.

**Key insight:** Always use Authorization Code + PKCE for user-facing flows in SPAs and mobile apps — never Implicit flow. The code exchange prevents tokens from appearing in browser history or server logs. The "state" parameter is non-optional — it prevents CSRF attacks on the OAuth callback.`,
    },
    {
      id: 1283,
      name: "JWT (JSON Web Tokens)",
      desc: `**JWT (JSON Web Token)** — a compact, self-contained token format for securely transmitting claims between parties. JWTs are widely used as OAuth access tokens and API authentication tokens because they carry verifiable, self-describing payloads without requiring a database lookup.

**Structure:** "header.payload.signature" — three base64url-encoded sections:
- **Header:** "{ alg: 'RS256', typ: 'JWT' }" — algorithm and type
- **Payload:** "{ sub: 'user_123', iss: 'https://auth.example.com', aud: 'api.example.com', exp: 1714051200, iat: 1714047600, scope: 'read:profile write:posts' }"
- **Signature:** HMAC-SHA256(header.payload, secret) or RSA signature

**Standard claims (registered claims):**
- "sub": subject (user ID)
- "iss": issuer (who created the token)
- "aud": audience (intended recipient — verify this!)
- "exp": expiration time (Unix timestamp — always set)
- "iat": issued at
- "jti": JWT ID (unique ID for revocation)

**Verification:** validate signature; validate "exp" (not expired); validate "iss" (correct issuer); validate "aud" (intended for this service). Failing to validate "aud" allows tokens issued for Service A to be used against Service B.

**Critical pitfalls:**
- **alg:none attack:** some libraries accept "{ alg: 'none' }" JWTs with no signature. Always specify allowed algorithms explicitly.
- **RS256 → HS256 confusion:** servers expecting RS256 (asymmetric) can be tricked into accepting HS256 (symmetric) tokens signed with the public key as the HMAC secret. Whitelist algorithm.
- **Storing in localStorage:** vulnerable to XSS. Use HTTP-only cookies for refresh tokens; keep access tokens in memory.

**Key insight:** JWTs are not encrypted by default — the payload is base64url encoded (not encrypted). Anyone can read the payload. Never put sensitive data (passwords, PII) in a JWT payload. The security guarantee is authenticity (signature) and integrity (tamper detection), not confidentiality.`,
    },
    {
      id: 1284,
      name: "API Authorization Patterns",
      desc: `**API Authorization Patterns** — the strategies for determining what an authenticated user is allowed to do. Authentication = who are you; authorization = what can you do.

**Role-Based Access Control (RBAC):**
- Assign users to roles: ADMIN, EDITOR, VIEWER
- Roles have permissions: ADMIN can DELETE; VIEWER can only GET
- Simple and scalable for most applications
- Weakness: roles can proliferate ("ADMIN_EXCEPT_DELETE_USERS", "EDITOR_WITH_BILLING_ACCESS"); coarse-grained

**Attribute-Based Access Control (ABAC):**
- Permissions based on attributes of the user, resource, and environment: "user.department === resource.department AND resource.classification <= user.clearance AND time.isBusinessHours()"
- Highly flexible; handles complex policies
- OPA (Open Policy Agent) evaluates ABAC policies: "query('allow', { user, resource, action })"
- Complexity: policies become hard to audit and debug

**Resource-Based Authorization:**
- "Can this user access THIS specific resource?" — check ownership or group membership
- "order.userId === currentUser.id OR currentUser.role === ADMIN"
- Most common pattern for multi-tenant SaaS

**Scopes in OAuth tokens:** "scope: 'read:orders write:orders read:profile'" — token has explicit permissions. API checks: "if (!token.scopes.includes('write:orders')) return 403"

**Never trust the client:** authorization must be enforced server-side on every request. A frontend hiding the "Delete" button is UX — the API must independently verify authorization. "If in doubt, deny."

**Principle of least privilege:** issue tokens/keys with only the permissions needed. Don't give admin-scope API keys to integrations that only need read access.

**Key insight:** Multi-tenant authorization bugs are the #1 source of data breaches in SaaS. "Can user A access user B's data?" must be checked at the database query level, not just at the route handler level. Use a data layer that enforces tenant isolation automatically (Row Level Security in PostgreSQL, or OPA policies).`,
    },
    {
      id: 1285,
      name: "TLS/HTTPS for APIs",
      desc: `**TLS (Transport Layer Security) for APIs** — the encryption layer that secures data in transit between API clients and servers. All production APIs must use HTTPS (HTTP over TLS) — no exceptions for APIs transmitting credentials, tokens, or sensitive data.

**TLS handshake (TLS 1.3 — the current standard):**
1. Client sends "ClientHello" with supported cipher suites
2. Server responds with certificate + selected cipher
3. Client verifies certificate (chain of trust to a trusted CA)
4. Key exchange (X25519 ECDH); both derive session keys
5. Encrypted communication begins (1-RTT vs TLS 1.2's 2-RTT)

**Certificate management:**
- Let's Encrypt: free, automated 90-day certificates via ACME protocol. "certbot" automates renewal.
- AWS ACM (Certificate Manager): free certificates for AWS services (CloudFront, ALB); auto-renewed.
- Wildcard certificates ("*.example.com") cover all subdomains — simpler to manage than per-subdomain certs.

**HTTP Strict Transport Security (HSTS):** "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload" — instructs browsers to only connect over HTTPS; rejects HTTP connections; prevents SSL stripping attacks. "preload" submits to browser HSTS preload lists.

**Mutual TLS (mTLS):** both client and server present certificates — the server verifies the client certificate. Used for service-to-service auth (microservices) where clients should be verified cryptographically, not just by API key. Istio/Linkerd service meshes can enforce mTLS transparently.

**Certificate pinning:** mobile apps embed the expected server certificate hash; reject connections presenting different certificates. Protects against rogue CA certificates; makes certificate rotation painful.

**Key insight:** TLS 1.3 is the minimum for new deployments — disable TLS 1.0 and 1.1. Enforce it at the load balancer level, not per-service. HSTS with preload makes HTTPS enforcement permanent — before setting the preload flag, ensure all subdomains support HTTPS. The "preload" flag is hard to undo once browsers cache it.`,
    },
    {
      id: 1286,
      name: "API Input Validation & Sanitization",
      desc: `**API Input Validation & Sanitization** — verifying that incoming API data conforms to expected types, ranges, and formats before processing. The first line of defense against injection attacks, data corruption, and unexpected behavior.

**Validate at the boundary:** validate all input at the API entry point — before it reaches business logic or the database. Use schema validation libraries:
- **Zod (TypeScript):** "z.object({ email: z.string().email(), age: z.number().int().min(18).max(120) }).parse(req.body)"
- **Joi (Node.js):** mature, highly configurable schema validation
- **Pydantic (Python):** model-based validation with type hints
- **express-validator:** middleware-based validation for Express

**What to validate:**
- Type (string, number, boolean, array)
- Format (email, URL, UUID, date, phone number)
- Range (min/max for numbers, min/max length for strings)
- Allowed values (enum validation)
- Required vs optional fields
- Nested object structure

**Sanitization vs validation:** validation rejects bad data; sanitization cleans acceptable data. Sanitize user-facing HTML to prevent XSS: "DOMPurify.sanitize(input)" strips dangerous HTML. Never sanitize SQL by hand — use parameterized queries.

**JSON depth limits:** deeply nested JSON ("{ a: { b: { c: ... } } }" 1000 levels deep) can crash parsers. Limit JSON depth and size before parsing.

**File upload validation:** validate MIME type from file content (magic bytes), not just the extension or "Content-Type" header (both user-controlled). Max file size limits. Scan for malware.

**Key insight:** Never build your own validation logic for common formats (email, URL, UUID). Use established libraries — email validation alone has edge cases that trip up custom regex. Validate on every endpoint, every time — don't assume "this endpoint is internal" means untrusted input can't reach it. Defense in depth: validate at API gateway AND in service code.`,
    },
    {
      id: 1287,
      name: "API Security Headers",
      desc: `**HTTP Security Headers** — response headers that instruct browsers to apply security policies: prevent XSS, clickjacking, MIME sniffing, and enforce HTTPS. Essential for any API serving browser-accessible resources.

**Content-Security-Policy (CSP):** "Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-abc123'; img-src 'self' data: https://cdn.example.com; object-src 'none'" — allowlists what scripts, styles, and resources browsers may load. The most powerful XSS mitigation.

**X-Frame-Options (legacy):** "X-Frame-Options: DENY" — prevents page from being embedded in iframes (clickjacking protection). Superseded by CSP "frame-ancestors" directive.

**X-Content-Type-Options:** "X-Content-Type-Options: nosniff" — browser won't MIME-sniff responses; must serve correct Content-Type. Prevents loading a JavaScript file disguised as an image.

**Referrer-Policy:** "Referrer-Policy: strict-origin-when-cross-origin" — controls how much URL info is sent in the Referer header. Prevents leaking sensitive URL paths to third parties.

**Permissions-Policy:** "Permissions-Policy: geolocation=(), camera=(self), microphone=()" — controls browser feature access (geolocation, camera, microphone). Disable what your app doesn't need.

**Cross-Origin-Opener-Policy (COOP):** "Cross-Origin-Opener-Policy: same-origin" — isolates your browsing context from cross-origin window references. Enables SharedArrayBuffer (required for WebAssembly threads, Figma, Google Docs).

**Cross-Origin-Resource-Policy (CORP):** "Cross-Origin-Resource-Policy: same-origin" — prevents other origins from loading your resources (images, scripts) with "no-cors" requests.

**Helmet.js (Node.js):** sets all security headers with sensible defaults in one middleware: "app.use(helmet())" — enables X-Content-Type-Options, HSTS, X-Frame-Options, Referrer-Policy, and more.

**Key insight:** Security headers are free security. Helmet.js sets 12 security headers with one line of code. The only header requiring careful configuration is CSP — it's powerful but breaks apps with unsafe-inline or missing source exceptions. Start with "Content-Security-Policy-Report-Only" to detect violations before enforcing.`,
    },
    {
      id: 1288,
      name: "API Gateway Security",
      desc: `**API Gateway Security** — the security capabilities implemented at the API gateway layer (Kong, AWS API Gateway, Nginx, Envoy) that apply to all APIs without requiring per-service implementation: authentication, rate limiting, DDoS protection, IP allowlisting, and WAF.

**Security concerns at the gateway vs. service level:**
- Gateway: authentication token validation, rate limiting, IP filtering, SSL termination, DDoS mitigation, WAF rules — applied to all services uniformly
- Service: authorization (can THIS user do THIS action), business logic validation — per-service

**JWT validation at the gateway:** validate "exp", "iss", "aud", and signature at the gateway; forward decoded claims to downstream services via headers. Services trust the gateway-forwarded identity without re-validating the full token.

**WAF (Web Application Firewall):** inspects HTTP requests for attack patterns (SQL injection attempts, XSS payloads, known exploit patterns). AWS WAF, Cloudflare WAF, and ModSecurity detect and block attacks before they reach your API. WAF rules must be tuned to minimize false positives.

**DDoS mitigation:** API gateways with rate limiting (per-IP, per-API-key) absorb volumetric attacks. CDN-level DDoS protection (Cloudflare, AWS Shield) handles large-scale attacks upstream of the gateway.

**IP allowlisting:** restrict partner or internal APIs to known IP ranges at the gateway: only Stripe's webhook IPs can call "/webhooks/stripe". Reduces attack surface dramatically.

**Gateway vs mTLS:** service mesh (Istio, Linkerd) handles service-to-service auth via mTLS transparently. API gateway handles external-to-internal auth. Both layers are complementary.

**Key insight:** The API gateway is your security choke point — everything entering the system passes through it. Implement authentication, rate limiting, and WAF here once instead of in every service. But don't put authorization logic in the gateway — authorizing "can this user delete this order?" requires business context the gateway doesn't have.`,
    },
    {
      id: 1289,
      name: "OWASP API Security Top 10",
      desc: `**OWASP API Security Top 10** — the 10 most critical API security vulnerabilities published by OWASP (Open Web Application Security Project). API-specific security risks distinct from general web app vulnerabilities.

**API1: Broken Object Level Authorization (BOLA/IDOR):** API uses user-controlled IDs to access objects without verifying ownership. "GET /orders/12345" — does the current user own order 12345? The most common API vulnerability.

**API2: Broken Authentication:** weak credential handling — guessable tokens, missing rate limiting on auth endpoints, tokens in URLs, long-lived tokens without rotation.

**API3: Broken Object Property Level Authorization:** API returns full object but client sees only a subset. User can send additional fields to set properties they shouldn't control ("role: admin" in registration body). **Mass assignment attack.**

**API4: Unrestricted Resource Consumption:** no rate limiting, size limits, or complexity limits. Attackers send 10MB payloads, deeply nested JSON, or 1000 calls/second.

**API5: Broken Function Level Authorization:** user can call admin endpoints by guessing the URL ("POST /admin/users") if endpoint-level authorization is missing.

**API6: Unrestricted Access to Sensitive Business Flows:** business logic abuse — scraping, account enumeration, inventory exhaustion, abuse of free trial flows. Rate limiting + behavioral detection required.

**API7: Server-Side Request Forgery (SSRF):** API accepts URLs and fetches them on behalf of the user — attacker passes internal service URLs to probe the internal network.

**API8: Security Misconfiguration:** verbose error messages exposing stack traces, default credentials, unnecessary HTTP methods enabled, missing security headers, debug endpoints in production.

**API9: Improper Inventory Management:** old API versions still running and unmonitored; shadow APIs (undocumented, forgotten endpoints); test APIs exposed to production traffic.

**API10: Unsafe Consumption of APIs:** your API consumes third-party APIs without validation. Third-party sends malicious payload → your API processes it → injection attack.

**Key insight:** API1 (BOLA) is responsible for more real-world data breaches than all other API vulnerabilities combined. Every API endpoint that retrieves or modifies a resource using an ID must verify ownership/authorization. This is not automatic — it must be explicitly coded in every handler.`,
    },
    {
      id: 1290,
      name: "API Monitoring & Anomaly Detection",
      desc: `**API Security Monitoring** — the operational practices for detecting attacks, abuse, and anomalies in real-time API traffic. Security isn't only in the code — it's in continuous observation.

**What to log for every API request:**
- Timestamp, request ID, client IP, user ID (if authenticated), endpoint, HTTP method
- Response status code, response time, request size, response size
- User agent, geographic location (country at minimum)
- API key/token identifier (not the token itself)

**Alerting thresholds:**
- Sudden spike in 401/403 responses from one IP: credential stuffing or reconnaissance
- High rate of 404 responses: endpoint scanning (attacker probing for unlisted endpoints)
- Unusual spike in API errors (5xx) on specific endpoint: potential exploitation attempt
- Same user ID on multiple IPs simultaneously: account sharing or compromised credential
- Request patterns matching known scraping signatures: user agent, request timing, sequential ID enumeration

**Security observability tools:**
- **SIEM integration:** send API logs to Splunk, Elastic, or Datadog; create detection rules for anomalous patterns
- **API-specific WAF + monitoring:** Salt Security, Noname Security, Traceable — dedicated API security platforms that baseline normal traffic and alert on anomalies
- **Rate limiting alerts:** alert when specific users/IPs hit rate limits repeatedly (indicates abuse, not accidents)

**Threat intelligence:** subscribe to feeds of known malicious IPs and user agents; block at the gateway layer automatically.

**Incident response for APIs:** prepare playbooks for: credential stuffing attacks (block IPs, force password reset, notify users), data exfiltration (rate limit, audit logs, legal notification if PII), API key compromise (revoke, rotate, notify).

**Key insight:** Most API breaches are discovered weeks or months after they occur — not in real-time. Proper logging and anomaly detection collapses this window to hours or minutes. Build API monitoring dashboards alongside the API, not as an afterthought. Security is 50% in the code and 50% in the observation.`,
    },
  ],
};

export default authSecurity;
