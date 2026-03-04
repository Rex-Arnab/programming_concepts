const appsecOwasp = {
  name: "AppSec & OWASP",
  icon: "🛡️",
  color: "#ef4444",
  concepts: [
    {
      id: 1036,
      name: "OWASP Top 10",
      desc: `**OWASP Top 10** — the globally recognized list of the most critical web application security risks, published by the Open Web Application Security Project and updated every few years based on real-world vulnerability data from thousands of organizations.

The 2021 edition: A01 Broken Access Control, A02 Cryptographic Failures, A03 Injection, A04 Insecure Design, A05 Security Misconfiguration, A06 Vulnerable & Outdated Components, A07 Identification & Authentication Failures, A08 Software & Data Integrity Failures, A09 Security Logging & Monitoring Failures, A10 Server-Side Request Forgery (SSRF).

**Why it matters:** The OWASP Top 10 is the de facto baseline for application security compliance (PCI DSS, SOC 2, ISO 27001 all reference it). Security assessors check against it; bug bounty hunters hunt it; penetration testers use it as a checklist.

**Key insight:** The shift from "Injection" (#1 in 2017) to "Broken Access Control" (#1 in 2021) reflects how the industry got better at input validation but continues to struggle with authorization logic — the more business-logic-heavy the app, the harder access control is to get right.`,
    },
    {
      id: 1037,
      name: "SQL Injection (SQLi)",
      desc: `**SQL Injection** — an attack where user-supplied input is concatenated into a SQL query without sanitization, allowing an attacker to manipulate the query's logic, extract data, bypass authentication, or even execute OS commands on the database server.

Classic example: a login form with "username = 'admin' --" in the username field — the "-- " comments out the password check, granting access as admin. More destructive: "'; DROP TABLE users; --" or UNION-based extraction of the entire database.

**Prevention:**
- **Parameterized queries / prepared statements** — the only reliable fix. The query structure is sent to the DB separately from the data; the driver ensures data is never interpreted as SQL
- ORMs (SQLAlchemy, Prisma, ActiveRecord) use parameterized queries by default
- Input validation as defense-in-depth, but NOT as a primary defense
- Least privilege: the DB user the application connects as should not have DROP or admin rights

**Key insight:** SQL injection has been #1 on OWASP for most of its history and is entirely preventable with parameterized queries — yet it persists because developers concatenate strings for "convenience." There is no performance excuse: prepared statements are equally fast.`,
    },
    {
      id: 1038,
      name: "Cross-Site Scripting (XSS)",
      desc: `**Cross-Site Scripting (XSS)** — an injection attack where malicious JavaScript is embedded into a web page and executed in victims' browsers, allowing attackers to steal session cookies, capture keystrokes, perform actions on behalf of the user, or redirect to phishing pages.

**Three types:**
- **Reflected XSS:** payload in the URL/request, reflected immediately in the response. Victim must click a crafted link. Example: a search page that echoes "Results for: <script>alert(1)</script>"
- **Stored XSS:** payload saved to the database (comment, profile bio) and served to all users who view it. Far more dangerous — no victim interaction needed beyond visiting the page
- **DOM-based XSS:** payload never reaches the server; JavaScript reads from "location.hash" or "document.referrer" and writes it to the DOM unsafely

**Prevention:**
- Output encoding/escaping: HTML-encode all user content before rendering (modern frameworks like React do this by default via JSX — "dangerouslySetInnerHTML" is the escape hatch that re-enables it)
- Content Security Policy (CSP) header: restricts which scripts can execute — a violated CSP blocks injected scripts even if encoding is missed
- "HTTPOnly" cookies: prevent JavaScript from accessing session cookies even if XSS succeeds

**Key insight:** React, Vue, and Angular escape output by default. XSS vulnerabilities in modern SPAs almost always trace back to explicit unsafe APIs like "dangerouslySetInnerHTML", "v-html", or "bypassSecurityTrust" — treat these like red flags in code review.`,
    },
    {
      id: 1039,
      name: "Cross-Site Request Forgery (CSRF)",
      desc: `**Cross-Site Request Forgery (CSRF)** — an attack that tricks an authenticated user's browser into sending an unintended request to a web application — exploiting the fact that browsers automatically include cookies (including session cookies) with cross-site requests.

Classic example: a victim is logged into their bank. An attacker hosts a page with "< img src='https://bank.com/transfer?to=attacker&amount=1000'>" — the victim's browser fetches that URL with their session cookie, executing the transfer.

**Why it works:** HTTP cookies are sent automatically by the browser with every matching request, regardless of which site initiated it. The server sees a valid session cookie and trusts the request.

**Prevention:**
- **CSRF tokens:** a random, secret, per-session token embedded in forms and validated server-side. Attackers can't forge requests because they don't know the token
- **SameSite cookie attribute:** "SameSite=Strict" or "SameSite=Lax" prevents cookies from being sent in cross-site requests — the modern primary defense
- **Double-submit cookie pattern:** send CSRF token in both a cookie and a request parameter; same-origin policy prevents an attacker from reading the cookie
- Checking "Origin" and "Referer" headers as defense-in-depth

**Key insight:** Modern "SameSite=Lax" (now the default in Chrome) has largely mitigated CSRF for typical use cases — but custom header tokens (used by JSON APIs) and SameSite=Strict are still best practice for sensitive operations.`,
    },
    {
      id: 1040,
      name: "Broken Access Control & IDOR",
      desc: `**Broken Access Control** — the #1 OWASP category (2021): failures to enforce what authenticated users are allowed to do. Includes Insecure Direct Object Reference (IDOR), privilege escalation, and missing function-level access control.

**IDOR (Insecure Direct Object Reference):** exposing internal object IDs (database primary keys, file paths) in URLs or API parameters without verifying that the requester owns the object. Example: "GET /api/orders/12345" — changing 12345 to 12346 returns another user's order because the server checks authentication but not authorization.

**Vertical privilege escalation:** a regular user accessing admin functions (e.g., calling "DELETE /admin/users/42" — the endpoint exists but lacks proper authorization checks).

**Horizontal privilege escalation:** a user accessing another user's resources at the same privilege level (the IDOR case above).

**Prevention:**
- Server-side authorization checks on every request — never trust the client's claimed identity
- Use opaque, non-sequential identifiers (UUIDs) to prevent enumeration (defense-in-depth, not primary defense)
- Centralized authorization middleware rather than ad-hoc checks scattered in controllers
- "Deny by default" — functions are inaccessible unless explicitly granted
- Automated tests for authorization: test that user A cannot access user B's resources

**Key insight:** IDOR vulnerabilities are extremely common in bug bounty programs because authorization logic is complex, tested manually, and easy to miss when adding new API endpoints under deadline pressure.`,
    },
    {
      id: 1041,
      name: "Authentication Vulnerabilities",
      desc: `**Authentication vulnerabilities** — weaknesses in how applications verify user identity: broken password policies, credential stuffing, session management flaws, predictable tokens, and missing brute-force protections.

**Credential stuffing:** attackers take leaked username/password lists (from other breaches) and automate login attempts across many sites. Works because 60%+ of users reuse passwords. Defense: breach password detection (HaveIBeenPwned API), rate limiting, MFA.

**Brute force / password spraying:** exhaustively trying passwords. Defense: account lockout, CAPTCHA, exponential backoff, device fingerprinting.

**Weak session tokens:** sessions that use sequential IDs or short random values are guessable. Use cryptographically secure random tokens (128+ bits of entropy).

**Session fixation:** attacker sets a known session ID before authentication; after the user logs in, they share the same session. Fix: always regenerate session ID on login.

**JWT pitfalls:** "alg: none" vulnerability (some libraries accept a token with no signature if algorithm is set to "none"); RS256 → HS256 confusion attack (library uses public key as HMAC secret). Always explicitly validate the algorithm; never trust the header's "alg" claim.

**Key insight:** The most impactful authentication improvement for most applications is adding MFA — it defeats credential stuffing, phishing, and brute force in one step, regardless of password strength.`,
    },
    {
      id: 1042,
      name: "Security Misconfiguration",
      desc: `**Security misconfiguration** — the most common class of vulnerability: insecure default settings left in place, unnecessary features enabled, overly permissive access, missing security headers, exposed debug information, or default credentials unchanged.

**Common examples:**
- Default credentials on admin panels (admin/admin, admin/password)
- Stack traces and debug error pages served in production (leaks internal paths, library versions, SQL queries)
- Directory listing enabled on web servers (reveals file structure)
- Unnecessary open ports and services (an exposed Redis instance with no auth became a primary attack vector for cryptominers)
- Missing HTTP security headers: no CSP, no HSTS, no X-Content-Type-Options, no X-Frame-Options
- Cloud storage buckets set to public (S3 bucket misconfiguration is responsible for some of the largest data breaches)
- Verbose error messages revealing database structure or internal IP addresses

**Prevention:**
- Security-hardened base images and infrastructure-as-code templates with secure defaults
- CIS Benchmarks for OS/container/cloud hardening
- Automated configuration scanning (ScoutSuite for AWS, Prowler, OWASP ZAP for HTTP headers)
- Environment-specific configs: "DEBUG=False" in production, different secrets per environment

**Key insight:** Security misconfiguration is insidious because it's not a code bug — it's an operational gap. The fix is configuration management discipline and automated scanning, not better programming.`,
    },
    {
      id: 1043,
      name: "Sensitive Data Exposure & Cryptographic Failures",
      desc: `**Cryptographic failures** (formerly "Sensitive Data Exposure") — failures to adequately protect sensitive data in transit or at rest: using weak algorithms, improper key management, transmitting data over HTTP, or storing passwords in plain text or with weak hashing.

**Critical failures:**
- **Passwords stored as plain text or MD5/SHA-1 hashes** — MD5 is broken and rainbow-table precomputed. Use bcrypt, scrypt, or Argon2 (memory-hard, adaptive cost factor)
- **HTTP instead of HTTPS** — traffic sniffable at any hop on the path. Use HTTPS everywhere with HSTS (HTTP Strict Transport Security) to prevent downgrade attacks
- **Weak cipher suites** — TLS 1.0/1.1 are deprecated; use TLS 1.2 minimum, 1.3 preferred. Disable RC4, 3DES, export-grade ciphers
- **Hardcoded secrets in source code** — API keys, DB passwords committed to Git are exposed to everyone with repo access (and often public GitHub history)
- **Insufficient key length** — RSA-1024 is considered broken; use RSA-2048+ or ECDSA P-256+

**Key insight:** The single highest-impact cryptographic failure continues to be weak password hashing. If your database is breached, bcrypt with a high cost factor (12+) means cracking even one password takes seconds per attempt — slowing attackers from millions of attempts per second to a few per second.`,
    },
    {
      id: 1044,
      name: "Server-Side Request Forgery (SSRF)",
      desc: `**Server-Side Request Forgery (SSRF)** — an attack where an attacker induces the server to make HTTP requests to an arbitrary destination, including internal services, cloud metadata endpoints, or other backend systems that are otherwise inaccessible from the internet.

**Classic attack flow:** an application accepts a URL parameter ("fetch this image: http://..."). An attacker submits "http://169.254.169.254/latest/meta-data/iam/security-credentials/" — the AWS EC2 instance metadata endpoint. The server fetches it and returns IAM credentials to the attacker.

**Why SSRF became #10 in OWASP 2021:** cloud architectures make internal metadata endpoints a goldmine. SSRF was the initial vector in the Capital One breach (2019, 100M records) — an EC2 instance's WAF was exploited to fetch metadata credentials.

**Other SSRF targets:** internal HTTP services on 10.x.x.x ranges, Redis on localhost:6379, Elasticsearch, Kubernetes API server, internal admin panels, file:// protocol (read local files).

**Prevention:**
- Allowlist of permitted destination URLs/IPs (not blocklist — bypassed with DNS rebinding, IPv6, URL parsing differences)
- Firewall/network policies blocking outbound connections from web tier to internal networks
- Disable cloud metadata endpoint redirect at the VPC level; use IMDSv2 (requires PUT request, can't be SSRF'd with simple GET)
- Validate and sanitize URLs; reject private IP ranges on the server side

**Key insight:** SSRF vulnerabilities are particularly severe in cloud environments because the metadata service is reachable from any EC2/GCE/Azure VM — a single SSRF flaw can grant full IAM credential access to the cloud account.`,
    },
    {
      id: 1045,
      name: "Insecure Deserialization",
      desc: `**Insecure deserialization** — a vulnerability where untrusted data is deserialized into objects without validation, allowing attackers to manipulate the serialized payload to achieve remote code execution, privilege escalation, or data tampering.

**How it works:** serialization converts objects to a byte stream for storage or transfer. Deserialization reconstructs objects. If the deserializer trusts the payload and reconstructs arbitrary objects (including ones with dangerous methods like "readObject"), an attacker can craft a payload that executes code when deserialized — even before any application logic runs.

**Java's notorious history:** Java's native serialization (ObjectInputStream) has been the source of some of the most critical RCE vulnerabilities: Apache Commons Collections gadget chains, Log4Shell (JNDI deserialization), WebLogic, Jenkins, and Struts2 exploits. The "ysoserial" tool generates payloads for known gadget chains.

**Other languages:** Python "pickle.loads()" executes arbitrary code embedded in the pickle; PHP's "unserialize()" has had numerous RCE gadget chains; XML deserialization (XXE) enables file read and SSRF.

**Prevention:**
- Never deserialize untrusted data using native serialization mechanisms
- Use safe data formats (JSON, XML with schema validation) instead of binary serialization for external input
- If native deserialization is unavoidable, implement allowlisting of expected classes before deserialization
- Sign and verify serialized data with a HMAC to detect tampering

**Key insight:** The root cause of deserialization vulnerabilities is that deserializers execute code to reconstruct objects — making deserialization of untrusted data fundamentally equivalent to remote code execution.`,
    },
    {
      id: 1046,
      name: "XML External Entities (XXE)",
      desc: `**XML External Entities (XXE)** — a vulnerability in XML parsers where an attacker can define an external entity that references a file path or URL; when the parser resolves the entity, it reads the file or makes an HTTP request on the server's behalf.

**Example attack payload:**
"<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]><foo>&xxe;</foo>"
When the vulnerable XML parser processes this, it replaces "&xxe;" with the contents of /etc/passwd.

**Capabilities:**
- **File disclosure:** read arbitrary files the server process can access ("/etc/passwd", "/var/www/app/.env", SSH keys, application configs)
- **SSRF:** use "http://" entities to probe internal services
- **Blind XXE:** exfiltrate data to an attacker-controlled server via out-of-band channels when the response doesn't directly reflect the entity

**Affected surfaces:** any API accepting XML input (SOAP services, document uploads, SVG/DOCX/XLSX processing — these are ZIP files containing XML internally), XML-based config parsing.

**Prevention:**
- Disable external entity processing in the XML parser (this is usually a single configuration flag)
- In Java: "factory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true)"
- Use JSON APIs instead of XML where possible
- SAX parsers are safer by default than DOM parsers in many languages

**Key insight:** XXE is particularly tricky because it affects file upload processing — parsing an XLSX, DOCX, or SVG file triggers XML parsing, making attack surface larger than developers realize.`,
    },
    {
      id: 1047,
      name: "Injection Attacks (Beyond SQL)",
      desc: `**Injection vulnerabilities** — the broad class where untrusted input is interpreted as commands or queries rather than data, enabling attackers to execute unintended operations. SQL injection is the most famous, but injection manifests everywhere user input touches an interpreter.

**Command injection:** passing user input to OS shell commands without sanitization. "os.system('ping ' + user_input)" with input "8.8.8.8; rm -rf /" — the shell interprets the semicolon as command separator. Prevention: use "subprocess.run(['ping', user_input], shell=False)" with shell=False.

**LDAP injection:** user input embedded in LDAP queries allows authentication bypass or data extraction from Active Directory.

**NoSQL injection:** MongoDB queries like "{ username: req.body.user, password: req.body.pass }" — submitting "{ "$ne": null }" as the password bypasses authentication because "password != null" is true for all documents.

**Template injection (SSTI):** Server-Side Template Injection — user input rendered by a template engine (Jinja2, Twig, Freemarker). "{{7*7}}" returning "49" confirms SSTI; "{{config.__class__.__init__.__globals__['os'].popen('id').read()}}" achieves RCE.

**Header injection / CRLF injection:** inserting CR-LF characters ("\r\n") into HTTP headers enables response splitting, cookie injection, and cache poisoning.

**Key insight:** The universal injection prevention principle: separate code from data by using parameterized APIs (prepared statements, "subprocess" with list args, template auto-escaping) rather than string concatenation.`,
    },
  ],
};

export default appsecOwasp;
