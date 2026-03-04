const cloudSecurity = {
  name: "Cloud Security",
  icon: "☁️",
  color: "#06b6d4",
  concepts: [
    {
      id: 1082,
      name: "Shared Responsibility Model",
      desc: `**Shared Responsibility Model** — the division of security obligations between a cloud provider and the cloud customer. The provider secures "the cloud" (infrastructure, physical facilities, hypervisor, managed services); the customer secures "in the cloud" (data, applications, access management, OS configuration, network configuration).

**AWS example responsibilities:**
- AWS owns: physical data center security, hardware, hypervisor, managed service security (RDS engine patches), global network
- Customer owns: OS patches (for EC2), application security, IAM configuration, data encryption, network ACLs, security groups, S3 bucket policies

**Responsibility shifts by service model:**
- **IaaS (EC2):** most responsibility on the customer — OS, runtime, application, data
- **PaaS (Elastic Beanstalk, Lambda):** platform managed by AWS; customer responsible for application code and data
- **SaaS (Workdocs, Salesforce):** minimal customer responsibility; provider manages almost everything except account access

**The "Security IN the cloud" gap:** the most common cloud breaches stem from customer-side misconfigurations — publicly accessible S3 buckets, overly permissive IAM roles, exposed databases, and missing encryption — all customer responsibilities.

**Key insight:** Cloud providers invest billions in securing their infrastructure (physical security, network infrastructure); customer-side misconfigurations cause most cloud security incidents. The shared model clarifies responsibility but doesn't reduce the customer's need for security expertise.`,
    },
    {
      id: 1083,
      name: "IAM Least Privilege in Cloud",
      desc: `**Least privilege in cloud IAM** — granting only the minimum permissions required for a task, to a specific identity, for the minimum time necessary. Over-privileged identities are the root cause of most cloud security breaches.

**AWS IAM concepts:**
- **Policies:** JSON documents defining what actions are allowed or denied on which resources. Managed policies (AWS-provided or customer-managed) vs inline policies.
- **Roles:** identities with policies attached, assumed temporarily via STS. EC2 instances, Lambda functions, and ECS tasks assume roles — no static credentials needed.
- **IAM best practices:** enable MFA for all human users; no root account usage (create an admin user, lock root away); no access keys for root; rotate access keys regularly.

**Overly permissive patterns to avoid:**
- "Action: '*'" — grants all actions on all services
- "Resource: '*'" — applies to all resources in all regions
- "arn:aws:iam::*:role/*" as a trust policy — any account can assume the role
- Attaching "AdministratorAccess" to a user or service that needs one specific action

**AWS tools for least privilege:**
- **IAM Access Analyzer:** detects external access to your resources; generates least-privilege policies from CloudTrail logs
- **AWS Config rules:** continuously evaluate IAM configurations against compliance rules
- **Permissions boundaries:** limit the maximum permissions an identity can be granted (guardrails for delegated administration)

**Key insight:** Generate IAM policies from CloudTrail access logs using IAM Access Analyzer's policy generation feature — it creates least-privilege policies based on actual usage over the past 90 days, far more accurate than manual policy authoring.`,
    },
    {
      id: 1084,
      name: "Secrets Management in Cloud",
      desc: `**Cloud secrets management** — securely storing and accessing sensitive configuration values (API keys, database passwords, OAuth secrets, TLS certificates) without embedding them in code, environment variables, or configuration files.

**The anti-pattern:** hardcoding secrets in source code or .env files committed to Git. GitHub Secret Scanning and Trufflehog find thousands of leaked credentials daily in public repositories — AWS keys, Stripe keys, Twilio auth tokens.

**AWS Secrets Manager:** stores secrets encrypted with KMS; automatic rotation for supported services (RDS passwords, Redshift); fine-grained IAM access control; SDK integration for fetching secrets at runtime. "aws secretsmanager get-secret-value --secret-id prod/database/password".

**AWS Parameter Store:** simpler and cheaper than Secrets Manager; SecureString type encrypts with KMS; useful for non-rotated configuration values. No automatic rotation; no secret version management beyond "previous" version.

**HashiCorp Vault:** self-hosted or cloud (HCP Vault); dynamic secrets (generates short-lived database credentials on demand — credentials expire automatically); PKI secrets engine (issues short-lived TLS certificates); Kubernetes integration (Vault Agent Injector injects secrets into pods as files).

**Environment variables vs files:** both are accessible to any process running as the same user; prefer mounted files (narrower file permissions) over environment variables (leaked in "env" output, crash dumps, Docker inspect, subprocesses).

**Key insight:** Dynamic secrets (Vault generating a DB credential that expires in 1 hour) are dramatically better than static credentials — even if leaked, they're useless after expiration, and every credential issuance is audited. Start with a secrets manager immediately; migrate to dynamic secrets over time.`,
    },
    {
      id: 1085,
      name: "Cloud Security Posture Management (CSPM)",
      desc: `**CSPM (Cloud Security Posture Management)** — continuously assessing and enforcing cloud infrastructure configurations against security best practices and compliance frameworks (CIS Benchmarks, SOC 2, PCI DSS, HIPAA), identifying misconfigurations before they're exploited.

**What CSPM detects:** publicly accessible S3 buckets, security groups open to 0.0.0.0/0 on sensitive ports, RDS instances without encryption, root account activity, missing CloudTrail logging, unencrypted EBS volumes, overly permissive IAM policies, internet-facing resources in unexpected accounts.

**AWS-native CSPM:**
- **AWS Security Hub:** aggregates findings from GuardDuty, Inspector, Macie, IAM Access Analyzer; provides a security score against AWS Foundational Security Best Practices and CIS AWS Benchmark
- **AWS Config:** records configuration changes and evaluates against rules; "s3-bucket-public-read-prohibited" rule flags public buckets
- **Amazon Macie:** ML-powered discovery of sensitive data (PII, credentials, financial data) in S3

**Commercial CSPM tools:** Wiz (agent-less; graphs relationships across cloud resources; identifies attack paths — "this EC2 instance with a public IP can reach the database via overly permissive security group and a Lambda with admin IAM role"), Prisma Cloud, Lacework, Orca Security.

**Infrastructure drift:** IaC-defined configuration vs actual cloud state diverges when engineers make manual changes ("ClickOps"). CSPM detects drift; "terraform plan" shows it before it applies.

**Key insight:** CSPM's value is not individual misconfiguration alerts — it's attack path analysis. Wiz's graph showing "public S3 bucket → Lambda triggered → EC2 instance → admin IAM role → entire AWS account" is far more actionable than five separate low-severity alerts.`,
    },
    {
      id: 1086,
      name: "Container & Kubernetes Security",
      desc: `**Container security** — the set of practices ensuring that container images, registries, runtimes, and orchestration platforms are hardened against vulnerabilities and misconfigurations.

**Image security:**
- Scan images for CVEs (Trivy, Snyk, AWS ECR scanning, Anchore) — base images accumulate vulnerabilities; scan in CI before pushing
- Use minimal base images (distroless, Alpine) — fewer packages = smaller attack surface; "google/distroless" images contain only the runtime, no shell or package manager
- Never run as root — add "USER 1001" in Dockerfile; Kubernetes "runAsNonRoot: true" in pod security context
- Sign images (Sigstore/cosign, Docker Content Trust) to ensure image integrity

**Kubernetes security controls:**
- **RBAC:** ClusterRoles and Roles define what Kubernetes API operations are permitted; principle of least privilege for service accounts
- **Network Policies:** restrict pod-to-pod traffic; default-deny all, then allowlist needed paths (requires a CNI that supports network policies: Calico, Cilium)
- **Pod Security Standards / Admission Control:** enforce security policies on pod creation — restrict privileged containers, host network/PID/IPC access, unsafe volume mounts
- **Secrets management:** Kubernetes Secrets are base64-encoded, not encrypted, in etcd by default — enable encryption at rest; use Vault Agent Injector or External Secrets Operator
- **Falco:** runtime security tool; detects unexpected process execution, file access, or network connections in running containers (behavioral anomaly detection)

**Namespace isolation:** don't put all workloads in "default" namespace; separate by team/environment; apply different RBAC and network policies per namespace.

**Key insight:** The most dangerous Kubernetes misconfiguration is a service account with cluster-admin rights mounted into a pod — any code execution vulnerability in that pod gives an attacker full Kubernetes cluster control.`,
    },
    {
      id: 1087,
      name: "Cloud Storage Security (S3, GCS, Blob)",
      desc: `**Cloud storage security** — ensuring that object storage (AWS S3, Google Cloud Storage, Azure Blob Storage) containing sensitive data is not publicly exposed, is encrypted, and has appropriate access controls.

**Public access misconfiguration:** the most common cloud breach cause. Thousands of S3 breaches have exposed PII, credentials, source code, and backups because buckets were set to "public" or "ACL: public-read." AWS now blocks public access by default at the account level ("S3 Block Public Access" settings) — but can be overridden.

**S3 security controls:**
- **Block Public Access:** enable at the account level; use SCPs to prevent disabling it
- **Bucket policies:** resource-based policies controlling who can access the bucket; never use "Principal: '*'" (public) without intent
- **Encryption:** SSE-S3 (S3-managed keys), SSE-KMS (customer-managed keys in KMS with audit trail), or SSE-C (customer-provided keys). SSE-KMS is recommended — every decryption is logged in CloudTrail.
- **Versioning + MFA delete:** protect against accidental deletion and ransomware; require MFA to permanently delete versions
- **VPC endpoints:** access S3 from EC2 instances without traversing the public internet

**Pre-signed URLs:** time-limited URLs granting temporary access to private objects; useful for file downloads without making buckets public. Set short expiration (minutes, not hours); don't embed in code.

**Amazon Macie:** automatically discovers and classifies sensitive data (SSNs, credit card numbers, AWS access keys) in S3 using ML — alerts when sensitive data is stored in unexpected buckets.

**Key insight:** A single misconfigured public S3 bucket can expose an entire company's data. Implement S3 Block Public Access at the AWS Organizations level (via SCP), preventing any account in your organization from making buckets public without explicit policy override.`,
    },
    {
      id: 1088,
      name: "Cloud Audit Logging & Compliance",
      desc: `**Cloud audit logging** — capturing a comprehensive, tamper-resistant record of all actions taken within a cloud environment — who did what, when, from where — essential for incident investigation, compliance, and detecting unauthorized activity.

**AWS CloudTrail:** records all API calls to AWS services. "Who created this S3 bucket? Who changed this security group? Which role deleted these resources?" — CloudTrail answers all of these. By default, management events are logged; data events (S3 object reads/writes, Lambda invocations) must be explicitly enabled (higher cost but essential for sensitive data).

**CloudTrail best practices:**
- Enable in all regions and all accounts (via AWS Organizations trail)
- Send to S3 + CloudWatch Logs; enable CloudTrail Insights for anomaly detection
- Enable log file validation (CloudTrail signs log files; Integrity verification detects tampering)
- Set S3 access logging on the CloudTrail bucket itself; enable MFA delete on the log bucket

**Google Cloud Audit Logs:** Admin Activity logs (always on, no charge), Data Access logs (must enable; logged per service), System Event logs.

**SIEM integration:** forward audit logs to a SIEM (Splunk, Datadog, Elastic Security) for correlation and alerting. Key detections: root account login, IAM policy changes, security group changes, disabling CloudTrail itself.

**Compliance frameworks:** SOC 2 requires audit logging and log retention (typically 1 year). PCI DSS requires 1 year retention with 3 months immediately accessible. HIPAA requires 6 years.

**Key insight:** CloudTrail is the single most important AWS security control for incident investigation. Without it, you cannot determine the scope of a breach — what was accessed, what was changed, what was deleted. Enable it before anything else.`,
    },
    {
      id: 1089,
      name: "Serverless Security",
      desc: `**Serverless security** — applying security controls to function-as-a-service (FaaS) environments like AWS Lambda, Google Cloud Functions, and Azure Functions, where traditional host-level security is managed by the provider.

**Serverless-specific risks:**
- **Function over-privilege:** Lambda functions that need to read one DynamoDB table but have "dynamodb:*" on all tables. Each function should have a minimal execution role.
- **Event injection:** Lambda functions that process data from SQS, SNS, API Gateway, or S3 and pass inputs to SQL queries, shell commands, or eval without sanitization — injection vulnerabilities still apply to serverless.
- **Third-party package vulnerabilities:** npm, PyPI packages bundled in the Lambda deployment package. No underlying OS to patch, but dependencies need the same vulnerability management as traditional apps.
- **Cold start information leakage:** function execution environments can be reused between invocations; sensitive data in global scope persists between invocations (both a performance feature and a risk).

**Lambda security controls:**
- **VPC configuration:** deploy Lambda in a VPC with a security group to control network access; use VPC endpoints to access AWS services without public internet
- **Environment variable encryption:** Lambda encrypts environment variables at rest with KMS; use KMS CMK for sensitive variables and rotate keys
- **Reserved concurrency:** limit maximum concurrent executions to prevent runaway billing from DDoS events
- **Resource-based policies:** control which AWS services and accounts can invoke the function

**Serverless attack surface:** the event input is the attack surface. Validate and sanitize all inputs from every event source — API Gateway body, SQS messages, S3 event metadata, DynamoDB streams.

**Key insight:** Serverless reduces infrastructure security responsibility (no OS patching, no SSH access to harden) but introduces new risks: function sprawl (hundreds of functions with individual IAM roles is hard to audit), and application-layer vulnerabilities remain fully the developer's responsibility.`,
    },
    {
      id: 1090,
      name: "Cloud Infrastructure Entitlement Management (CIEM)",
      desc: `**CIEM (Cloud Infrastructure Entitlement Management)** — discovering, analyzing, and right-sizing permissions across cloud accounts and identities to enforce least privilege at scale. As cloud environments grow, IAM permissions proliferate — CIEM automates what humans can't manually audit.

**The entitlement explosion problem:** a typical AWS account has hundreds of IAM users, roles, groups, and service accounts; thousands of policies; and millions of effective permissions. Manually auditing who can do what to which resources is impossible — attackers exploit this gap.

**CIEM capabilities:**
- **Permission discovery:** enumerate all effective permissions for every identity across all accounts and services
- **Usage analysis:** compare granted permissions to actual usage (via CloudTrail); surface unused permissions
- **Anomaly detection:** identify identities with permissions they've never used, service accounts with human-level access, cross-account risks
- **Remediation suggestions:** automatically generate least-privilege replacement policies

**Cloud-native tools:**
- **AWS IAM Access Analyzer:** generates least-privilege policies from access activity; identifies external access to resources
- **GCP Policy Analyzer:** similar for GCP; identifies effective permissions considering org hierarchy, IAM conditions, and VPC Service Controls
- **AWS IAM credential report:** lists all IAM users, their access keys, password ages, and MFA status

**Commercial CIEM solutions:** Wiz, Ermetic (now Tenable Cloud Security), Sonrai Security, Zscaler Posture Control.

**Key insight:** CIEM findings typically reveal that 80%+ of granted permissions are never used. Remediating these is low-risk (removing permissions nothing actually uses) and dramatically reduces the blast radius of any credential compromise.`,
    },
    {
      id: 1091,
      name: "Cloud Security Architecture Patterns",
      desc: `**Cloud security architecture** — the structural patterns and controls that compose a secure cloud environment, from account structure and network design to data protection and operations.

**AWS Landing Zone / Control Tower:** a baseline multi-account architecture with security account, logging account, shared services account, and workload accounts. Guardrails (SCPs) enforce compliance across all accounts — preventing any account from disabling CloudTrail, creating public S3 buckets, or disabling encryption.

**Security account pattern:** a dedicated AWS account receiving logs from all other accounts (S3 + CloudTrail + Config logs); security team has read access to all accounts; no production workloads. Separation ensures that a compromised application account doesn't give access to security logs.

**Hub-and-spoke network model:** a "Hub" VPC hosting shared services (NAT gateways, VPN/Direct Connect, DNS, security appliances) connected to multiple "Spoke" VPCs via Transit Gateway or VPC Peering. Spoke-to-spoke traffic must traverse the hub (where inspection occurs).

**Egress filtering:** all outbound internet traffic routed through centralized egress VPCs with NAT gateways and inspection. Prevents direct outbound connections from compromised workloads; enables detection of C2 beacons and data exfiltration.

**Data classification and protection:** classify data by sensitivity (public, internal, confidential, restricted); apply encryption, access controls, and audit logging proportional to classification. Restricted data requires encryption with customer-managed KMS keys, column-level access control, and field-level encryption.

**Key insight:** Security architecture decisions made at the start of a cloud journey (account structure, network design, logging strategy) are extremely expensive to change later. Invest in a proper Landing Zone design early — retrofitting security controls onto an organically grown cloud environment costs 10x more than building them in from day one.`,
    },
  ],
};

export default cloudSecurity;
