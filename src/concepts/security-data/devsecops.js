const devsecops = {
  name: "DevSecOps",
  icon: "⚙️",
  color: "#84cc16",
  concepts: [
    {
      id: 1112,
      name: "Shift Left Security",
      desc: `**Shift left security** — integrating security practices earlier in the software development lifecycle (SDLC), moving security from a gate at the end of development to a continuous activity from design through deployment. "Left" refers to the earlier stages on a left-to-right SDLC timeline.

**Why shift left:** a vulnerability discovered in design costs $100 to fix; the same issue in production costs $10,000+ (Capers Jones study). Security review as a deployment gate creates a bottleneck and encourages teams to treat security as an obstacle rather than a quality attribute.

**Shift left practices:**
- **Threat modeling during design:** identify security requirements before code is written
- **Secure coding standards:** training developers in OWASP Top 10, language-specific security pitfalls; embedding security champions in teams
- **Pre-commit hooks:** run secret scanning, linting, and basic security checks before code reaches the CI pipeline
- **Security in Definition of Done:** security review is part of feature acceptance, not a separate release gate
- **Developer security training:** targeted training on the specific vulnerabilities relevant to the technologies they use

**DevSecOps maturity model:** Level 1 — security added after development; Level 2 — security checks in CI/CD; Level 3 — security integrated throughout SDLC with developer ownership; Level 4 — security is a first-class requirement with continuous feedback.

**Cultural change:** shift left fails if security is imposed on developers without empathy for their workflow. Security engineers must make it easy to do the right thing — pre-configured security scanning in CI, developer-facing documentation, security champions who translate security requirements into actionable guidance.

**Key insight:** The primary benefit of shift left isn't just cost — it's speed. Finding a SQL injection in CI takes 5 minutes to fix. Finding it in a pen test 2 weeks before launch triggers an emergency patch, regression testing, and potential delay. Shift left makes teams faster, not slower.`,
    },
    {
      id: 1113,
      name: "SAST (Static Application Security Testing)",
      desc: `**SAST (Static Application Security Testing)** — analyzing source code, bytecode, or binary code without executing it, to find security vulnerabilities at the code level. Runs at build time; finds issues before deployment.

**What SAST finds:** SQL injection patterns (string concatenation in query parameters), XSS-prone code (unsafe HTML rendering), hardcoded secrets, insecure cryptography (MD5 for passwords, ECB mode), dangerous function calls (eval, exec, system with user input), SSRF-prone URL fetching, path traversal vulnerabilities.

**Tools by language:**
- **Python:** Bandit (simple, fast, CI-friendly), Semgrep (cross-language, regex-like rules, highly customizable)
- **JavaScript/TypeScript:** ESLint with eslint-plugin-security, Semgrep, CodeQL
- **Java:** SpotBugs + Find Security Bugs, SonarQube, Checkmarx, Veracode
- **Go:** gosec, govulncheck
- **C/C++:** Coverity, CodeSonar, Flawfinder
- **Multi-language/cloud:** Semgrep (Semgrep's community rule registry covers 30+ languages), CodeQL (GitHub's query language for code analysis), Snyk Code

**False positive problem:** SAST tools generate many false positives — code patterns that look like vulnerabilities but aren't in context. High false positive rates cause developers to ignore all findings. Tune rules, suppress known-safe patterns with inline comments, and prioritize findings rather than requiring zero-finding gates.

**CI integration:** run SAST on every PR; fail CI for new critical findings; track findings in issues/Jira for remediation; don't require fixing all historical findings before new code merges — prioritize reducing new vulnerabilities.

**Key insight:** SAST is most valuable for catching a specific set of injection-pattern vulnerabilities reliably and cheaply. It cannot detect logic flaws, authorization issues, or race conditions — complement with DAST and manual review for those.`,
    },
    {
      id: 1114,
      name: "DAST (Dynamic Application Security Testing)",
      desc: `**DAST (Dynamic Application Security Testing)** — testing a running application by sending malicious inputs and observing responses, simulating an attacker's perspective without access to source code. Black-box testing of the deployed application.

**What DAST finds:** XSS (reflected, stored — detected by injecting payloads and checking responses), SQL injection (error-based, blind), open redirects, directory traversal, insecure HTTP methods, missing security headers, CORS misconfigurations, authentication issues, SSL/TLS vulnerabilities.

**DAST tools:**
- **OWASP ZAP:** open-source, scriptable, excellent CI/CD integration; baseline scan (passive, fast), active scan (full attack simulation, slower). "zap-baseline.py" for non-intrusive CI checks.
- **Burp Suite Pro:** industry standard for manual web app testing; active scanner integrated with manual testing workflow
- **Nikto:** legacy web server scanner; fast, noisy (many false positives), good for quick checks
- **Nuclei:** template-based scanner with a massive community template library (thousands of vulnerability checks); very fast; excellent for known CVE detection

**API-specific DAST:** standard DAST tools scan HTML-rendered pages; API testing requires providing an OpenAPI/Swagger spec. Tools: Burp Suite (import OpenAPI spec), 42Crunch API Security Audit, StackHawk (CI-native API DAST).

**DAST in CI/CD:** baseline/passive scan on every deployment (seconds to minutes); full active scan on scheduled nightly builds or pre-release (minutes to hours). Integrations: GitHub Actions OWASP ZAP action, GitLab DAST CI template.

**DAST limitations:** cannot test code paths not reachable through the UI/API; requires an authenticated session to test protected functionality; may not detect second-order injections (stored, triggered by a different flow).

**Key insight:** DAST tests what's actually running in a real deployment — it catches misconfigurations and vulnerabilities that SAST misses because they only appear at runtime (wrong server config, framework misuse, deployment environment issues).`,
    },
    {
      id: 1115,
      name: "SCA (Software Composition Analysis)",
      desc: `**SCA (Software Composition Analysis)** — identifying and assessing the security and license risks of open-source dependencies in your application. The modern application is typically 80%+ open-source code; vulnerabilities in dependencies (like Log4Shell, Apache Struts, OpenSSL Heartbleed) affect every application using them.

**What SCA does:** inventories all direct and transitive dependencies; maps them to CVE/NVD and proprietary vulnerability databases; identifies vulnerable versions; suggests fixed versions; tracks license compliance (GPL copyleft requirements, commercial restrictions).

**The dependency graph problem:** "npm install" for a modern web app installs thousands of transitive dependencies. A vulnerability in a deep transitive dependency (not one you chose) can be just as dangerous as one in a direct dependency.

**SCA tools:**
- **Snyk:** commercial with generous free tier; deep vulnerability database; PR-based fix suggestions (automatically opens PRs updating vulnerable packages); CI integration; container scanning
- **Dependabot (GitHub):** built into GitHub; automatic PRs for vulnerable dependency updates; free for GitHub repos
- **OWASP Dependency-Check:** open-source; Java/.NET focus; integrates with Maven, Gradle, Jenkins
- **npm audit / pip audit / bundle audit:** language ecosystem built-in tools; simpler but less rich than dedicated SCA tools
- **Socket.sh:** detects malicious packages (supply chain attacks) in addition to CVEs — analyzes npm package code for suspicious behavior

**EPSS (Exploit Prediction Scoring System):** complements CVSS by predicting the probability that a vulnerability will be exploited in the next 30 days. A CVSS 9.8 vulnerability with 0.1% EPSS may be lower priority than a CVSS 7.5 with 50% EPSS.

**Key insight:** Automate dependency updates with Dependabot or Renovate — the default behavior of pinning dependencies and updating manually means you're always running outdated, potentially vulnerable versions. Automated PRs + good test coverage makes keeping dependencies current easy.`,
    },
    {
      id: 1116,
      name: "Secret Scanning & Credential Management",
      desc: `**Secret scanning** — automatically detecting secrets (API keys, passwords, tokens, certificates, connection strings) accidentally committed to source code repositories or configuration files, before they can be exploited.

**The scale of the problem:** GitHub's 2022 Secret Scanning report found 6.7 million secrets committed to public repositories in one year. AWS access keys committed to a public repository are typically detected and exploited within minutes by automated scanners monitoring GitHub.

**Secret scanning tools:**
- **GitHub Secret Scanning:** built into GitHub; alerts repository owners when known secret patterns (AWS keys, GitHub tokens, Stripe keys, 200+ provider patterns) are committed; push protection proactively blocks commits containing secrets before they land
- **Trufflehog:** open-source; searches git history (not just latest commit) for high-entropy strings and known secret patterns; integrates with CI/CD
- **Gitleaks:** fast, CI-friendly secret scanner; pre-commit hook or CI step
- **detect-secrets (Yelp):** creates a baseline of known false positives; tracks new secrets in CI

**Secret patterns to detect:** AWS access keys (AKIA prefix), private keys (PEM headers), generic API keys (high-entropy base64/hex strings), connection strings, password fields in config files, OAuth tokens.

**If a secret is committed:**
1. Rotate the secret immediately (assume it was seen; don't "clean" the history and hope)
2. Revoke the old credential with the provider
3. Audit access logs for unauthorized use of the credential
4. Remove from git history (git-filter-repo) — but this doesn't help if it was already pushed publicly

**Key insight:** Git history is permanent. A secret committed 3 years ago is still discoverable via "git log" or archived copies. Rotating secrets is mandatory when they're committed; history cleaning is cosmetic. The real fix is pre-commit hooks and secrets managers to prevent secrets from reaching source code.`,
    },
    {
      id: 1117,
      name: "Container Image Security",
      desc: `**Container image security** — ensuring that Docker and OCI images used in production are free of known vulnerabilities, use minimal attack surfaces, and are built from trusted, verified sources.

**Image scanning:**
- **Trivy (Aqua Security):** fast, comprehensive open-source scanner; scans OS packages, language packages (npm, pip, gem, go.sum), IaC files, and Kubernetes manifests; integrates with CI, registries (ECR, GCR), and Kubernetes admission control
- **Grype (Anchore):** open-source; integrates with Syft for SBOM generation; CI-native
- **Snyk Container:** commercial; developer-friendly remediation advice; base image upgrade recommendations
- **AWS ECR image scanning:** built-in basic scanning (Clair-based) and enhanced scanning (Inspector-powered, near-real-time CVE detection)

**Minimal base image strategy:**
- **Distroless (Google):** no shell, no package manager, no extra utilities — just the application runtime. Attack surface is the smallest possible.
- **Alpine:** minimal (~5MB); musl libc instead of glibc; package manager (apk) for needed dependencies
- **Scratch:** empty base image for statically compiled binaries (Go binaries, Rust binaries)

**Image hardening:**
- Multi-stage builds: build in a full SDK image; copy only the binary to a minimal runtime image
- "USER" instruction: never run as root; create a dedicated non-root user
- No secrets in image layers: "docker history" reveals every layer; use build-time secrets (Docker BuildKit secrets) or runtime secret injection
- Immutable images: never "docker exec" to modify running containers; rebuild and redeploy for changes

**Key insight:** Scanning at build time is not enough — new CVEs are discovered daily. Scan images continuously in the registry and alert (or re-deploy) when running images have newly discovered critical vulnerabilities.`,
    },
    {
      id: 1118,
      name: "Security in CI/CD Pipelines",
      desc: `**CI/CD pipeline security** — protecting the software delivery pipeline itself from compromise, while integrating security checks into the pipeline to scan code before deployment.

**Pipeline as an attack surface:** CI/CD systems have access to production secrets, deployment credentials, and code signing keys. A compromised CI system can inject malicious code into production deployments (SolarWinds attack compromised the build system). Pipeline security is now a primary attack vector.

**Securing the pipeline:**
- **Least-privilege for pipeline credentials:** CI credentials should only have the permissions needed for the specific job (a test job doesn't need deployment credentials)
- **Ephemeral environments:** each CI run in an isolated, ephemeral environment; no persistent state between runs that could be poisoned
- **Pinned dependencies:** pin all CI dependencies (Docker images, GitHub Actions, npm packages) to specific SHAs, not tags (tags can be overwritten with malicious versions)
- **Branch protection:** require PR review and passing CI for protected branches; disable force pushes to main; protect main from unauthorized pushes
- **Pipeline-as-code (PaC):** Jenkinsfile, .github/workflows, GitLab CI YAML in the repository — version-controlled, auditable, and reviewable

**Security gates in CI/CD:**
- Pre-commit hooks: secret scanning, linting
- PR stage: SAST, SCA vulnerability scanning, secret scanning, unit tests
- Build stage: container image scanning, IaC scanning, SBOM generation
- Pre-deployment: DAST against staging, penetration test findings, security sign-off for major releases
- Post-deployment: runtime security monitoring, continuous vulnerability scanning

**Supply chain security:** use GitHub Actions with explicit SHA pins ("uses: actions/checkout@abc123def"); sign and verify release artifacts (Sigstore cosign + Rekor transparency log); generate SBOMs at build time.

**Key insight:** The CI/CD pipeline is now the most valuable target for supply chain attacks. A single compromised GitHub Action or Jenkins plugin with write access to production deployment credentials can affect every organization using it.`,
    },
    {
      id: 1119,
      name: "SBOM (Software Bill of Materials)",
      desc: `**SBOM (Software Bill of Materials)** — a formal, machine-readable inventory of all software components, dependencies, and their relationships in an application. The "ingredient list" for software, enabling organizations to quickly identify which systems are affected by a vulnerability.

**Why SBOMs matter (Log4Shell example):** when the Log4Shell vulnerability (CVE-2021-44228, CVSS 10.0) was disclosed in December 2021, organizations needed to urgently identify every system using log4j. Organizations with SBOMs answered in hours; those without spent weeks manually auditing every application. Log4j was embedded 17,000 components in the dependency graphs of millions of applications.

**US Government mandate:** Executive Order 14028 (2021) requires SBOMs for all software sold to the US federal government — a major driver of SBOM adoption. CISA published SBOM guidance and requirements.

**SBOM formats:**
- **SPDX (Software Package Data Exchange):** Linux Foundation standard; ISO/IEC 5962:2021; supports JSON, YAML, RDF, tag-value
- **CycloneDX:** OWASP-led; JSON and XML; designed for security use cases; supports VEX (Vulnerability Exploitability eXchange — indicates which CVEs affect which components in context)
- **SWID (Software Identification Tags):** ISO/IEC 19770-2; primarily for installed software management

**SBOM generation tools:** Syft (generates SBOM from container images, filesystems, or package manifests in SPDX and CycloneDX), CycloneDX tools (language-specific: cdxgen, cyclonedx-maven-plugin), Microsoft SBOM Tool, Anchore Grype (pairs SBOM with vulnerability matching).

**Key insight:** SBOM alone isn't useful — it needs to be paired with a vulnerability database and continuous monitoring. An SBOM generated at build time and never updated provides a historical snapshot, not current risk status. Integrate SBOM generation into CI and continuous vulnerability scanning against the SBOM.`,
    },
    {
      id: 1120,
      name: "Infrastructure as Code (IaC) Security",
      desc: `**IaC security** — applying security scanning, policy enforcement, and best practices to infrastructure-as-code files (Terraform, CloudFormation, Kubernetes YAML, Ansible playbooks) before they're deployed, catching misconfigurations as early as possible.

**Why IaC security matters:** a Terraform file creating an S3 bucket with "acl = 'public-read'" is a misconfiguration that will exist in production until someone notices it (possibly never, or after a breach). Scanning IaC before deployment catches it at the cheapest point.

**IaC security tools:**
- **tfsec (Trivy's IaC scanner):** scans Terraform for security issues — insecure S3 bucket settings, missing KMS encryption, overly permissive IAM policies, unencrypted RDS instances, security group rules with 0.0.0.0/0 on sensitive ports
- **Checkov:** Bridgecrew's open-source IaC scanner; supports Terraform, CloudFormation, Kubernetes, Helm, Dockerfile, GitHub Actions; integrates with Prisma Cloud for drift detection
- **Terrascan:** Tenable's open-source IaC scanner; OPA/Rego policies
- **kube-score / kube-linter:** Kubernetes YAML analysis; flags missing resource limits, missing probes, running as root
- **Conftest / OPA (Open Policy Agent):** policy-as-code; write custom security policies in Rego; validate any structured config (Terraform, Kubernetes, Dockerfile, JSON/YAML)

**Policy-as-code:** "All S3 buckets must have versioning enabled and Block Public Access enabled" written as OPA/Rego policy, enforced in CI. Changes to Terraform that violate the policy fail the pipeline — security policy as code, not as documentation.

**Pre-deployment vs runtime:** IaC scanning catches misconfigurations before deployment; CSPM (Cloud Security Posture Management) detects drift and misconfigurations in the running cloud environment. Both are needed — IaC for prevention, CSPM for detection.

**Key insight:** The 30-second IaC scan that blocks a deployment for a public S3 bucket prevents the 30-day incident investigation and breach notification after the data is exposed. Shift IaC security as far left as possible — pre-commit hooks, CI gates, and PR review required for security-impacting changes.`,
    },
    {
      id: 1121,
      name: "Security Champions Program",
      desc: `**Security Champions** — developers, QA engineers, or other non-security team members who take on a part-time security advocacy role within their team, acting as the liaison between the security team and development teams, driving security culture from within.

**The scaling problem:** a single security engineer cannot thoroughly review every PR, attend every design session, and train hundreds of developers across dozens of teams. Security doesn't scale as a pure center-of-excellence — it must be embedded in the engineering culture.

**Champion responsibilities:**
- First point of security contact for their team's questions ("is this pattern safe?")
- Conduct lightweight security reviews of team's design decisions
- Participate in and facilitate threat modeling sessions for major features
- Track and advocate for remediation of security findings
- Attend security team training and knowledge share with the team
- Escalate to the security team for complex issues

**Champion enablement:**
- Dedicated security training (SANS courses, secure coding courses, CTF access)
- Regular champion community calls — share findings, patterns, threat intelligence
- Security team office hours — champions get direct access to security engineers
- Recognition and career development acknowledgment (performance reviews, conference speaking)

**Program structure:** typically 5-15% time commitment; one champion per squad or feature team; quarterly rotation or voluntary long-term participation; security team provides curriculum and tooling.

**Measuring success:** reduction in security findings in code review; faster remediation times; increased threat model coverage; developer satisfaction with security process (survey); number of security issues caught in design vs production.

**Key insight:** Security Champions programs consistently show that developers who become champions become the team's security conscience — they naturally bring security considerations to design discussions and code reviews without needing to be reminded. The cultural shift from "security is someone else's job" to "security is everyone's job" requires these internal advocates.`,
    },
  ],
};

export default devsecops;
