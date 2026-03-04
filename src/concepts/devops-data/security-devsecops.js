const securityDevsecops = {
  name: "Security (DevSecOps)",
  icon: "⬟",
  color: "#E63946",
  concepts: [
    { id: 107, name: "DevSecOps", desc: "Integrating security into every phase of DevOps. Security is everyone's responsibility, not a separate team's gate. Shift security left." },
    { id: 108, name: "SAST (Static Application Security Testing)", desc: "Analyzing source code for vulnerabilities without executing it. SonarQube, Semgrep, CodeQL. Run in CI on every PR." },
    { id: 109, name: "DAST (Dynamic Application Security Testing)", desc: "Testing running applications for vulnerabilities. Simulates attacks. OWASP ZAP, Burp Suite. Catches runtime issues SAST can't." },
    { id: 110, name: "SCA (Software Composition Analysis)", desc: "Scanning dependencies for known vulnerabilities (CVEs). Snyk, Dependabot, Renovate. Critical — most code is third-party." },
    { id: 111, name: "Secret Management", desc: "Securely storing and accessing API keys, passwords, certificates. HashiCorp Vault, AWS Secrets Manager, SOPS. Never commit secrets to Git." },
    { id: 112, name: "Secret Scanning", desc: "Detecting accidentally committed secrets in code repos. GitLeaks, TruffleHog, GitHub Secret Scanning. Pre-commit hooks prevent leaks." },
    { id: 113, name: "RBAC (Role-Based Access Control)", desc: "Assigning permissions based on roles. Principle of least privilege. Applied to K8s, cloud IAM, CI/CD platforms, databases." },
    { id: 114, name: "Zero Trust Security", desc: "Never trust, always verify. Every request authenticated and authorized. Micro-segmentation, mTLS, identity-aware proxies. No implicit trust." },
    { id: 115, name: "mTLS (Mutual TLS)", desc: "Both client and server authenticate each other with certificates. Standard in service meshes. Encrypts and verifies all service-to-service traffic." },
    { id: 116, name: "Container Image Scanning", desc: "Scanning Docker images for OS and library vulnerabilities. Trivy, Snyk Container, Aqua, Clair. Block vulnerable images from deploying." },
    { id: 117, name: "SBOM (Software Bill of Materials)", desc: "Complete inventory of components in your software. Required for supply chain security. SPDX, CycloneDX formats. Track what's in production." },
    { id: 118, name: "SLSA Framework", desc: "Supply-chain Levels for Software Artifacts. Google-backed framework for build integrity. Provenance, hermetic builds, verified sources." },
    { id: 119, name: "Network Policies", desc: "K8s and cloud firewall rules controlling traffic between services. Default deny, allow specific flows. Calico, Cilium for enforcement." },
    { id: 120, name: "Compliance as Code", desc: "Automating compliance checks (SOC2, HIPAA, PCI-DSS) in CI/CD. InSpec, Open Policy Agent, Checkov. Continuous compliance, not annual audits." },
  ],
};
export default securityDevsecops;
