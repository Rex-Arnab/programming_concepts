const securityTesting = {
  name: "Security Testing",
  icon: "⬟",
  color: "#EF4444",
  concepts: [
    { id: 59, name: "Security Testing (Overview)", desc: "Identifying vulnerabilities, threats, and risks in software. Ensures data protection, integrity, authentication, and authorization work correctly." },
    { id: 60, name: "SAST (Static Application Security Testing)", desc: "Analyzing source code for vulnerabilities without running the application. SonarQube, Semgrep, CodeQL, Checkmarx. Fast, catches issues early in CI." },
    { id: 61, name: "DAST (Dynamic Application Security Testing)", desc: "Testing the running application by simulating attacks. OWASP ZAP, Burp Suite. Finds runtime vulnerabilities like injection and misconfiguration." },
    { id: 62, name: "IAST (Interactive Application Security Testing)", desc: "Combines SAST and DAST. Instruments the running application to analyze security in real-time during tests. Lower false positive rate. Contrast Security." },
    { id: 63, name: "Penetration Testing (Pen Testing)", desc: "Simulated cyber attacks by ethical hackers to find exploitable vulnerabilities. Black box (no info), white box (full info), grey box (partial info)." },
    { id: 64, name: "Vulnerability Scanning", desc: "Automated tools scanning for known vulnerabilities (CVEs) in systems, networks, and dependencies. Nessus, Qualys, Snyk, Trivy. Scheduled and continuous." },
    { id: 65, name: "OWASP Top 10", desc: "Industry-standard list of critical web application security risks: injection, broken auth, sensitive data exposure, XSS, CSRF, SSRF, insecure deserialization, etc." },
    { id: 66, name: "SQL Injection Testing", desc: "Attempting to inject malicious SQL through input fields. Tests parameterized queries, ORM usage, and input sanitization. Can lead to full database compromise." },
    { id: 67, name: "Cross-Site Scripting (XSS) Testing", desc: "Injecting malicious scripts into web pages viewed by other users. Stored, reflected, and DOM-based XSS. Test input encoding, CSP headers, output escaping." },
    { id: 68, name: "Cross-Site Request Forgery (CSRF) Testing", desc: "Tricking authenticated users into performing unintended actions. Verify CSRF tokens, SameSite cookies, and origin header validation." },
    { id: 69, name: "Authentication & Authorization Testing", desc: "Verifying login flows, session management, role-based access, privilege escalation prevention, password policies, MFA, and token handling (JWT, OAuth)." },
    { id: 70, name: "API Security Testing", desc: "Testing APIs for broken auth, injection, rate limiting, data exposure, mass assignment, BOLA (broken object level auth). OWASP API Security Top 10." },
    { id: 71, name: "Fuzzing (Fuzz Testing)", desc: "Feeding random, malformed, or unexpected data to find crashes, memory leaks, and security holes. AFL, libFuzzer, OSS-Fuzz. Finds edge cases humans miss." },
    { id: 72, name: "SCA (Software Composition Analysis)", desc: "Scanning third-party dependencies for known vulnerabilities and license issues. Snyk, Dependabot, Renovate, OWASP Dependency-Check. Most code is third-party." },
    { id: 73, name: "Threat Modeling", desc: "Structured approach to identifying security threats. STRIDE (Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation). Done during design phase." },
  ],
};
export default securityTesting;
