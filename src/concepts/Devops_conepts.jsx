import { useState } from "react";

export const meta = {
  title: "DevOps Concepts",
  description: "DevOps principles, tools, and practices",
};

const categories = [
  {
    name: "Core Principles",
    icon: "◆",
    color: "#06D6A0",
    concepts: [
      { id: 1, name: "DevOps Culture", desc: "A cultural shift breaking silos between development and operations. Shared ownership, collaboration, transparency, and continuous improvement." },
      { id: 2, name: "Continuous Integration (CI)", desc: "Developers merge code to a shared repo frequently. Each merge triggers automated builds and tests. Catch bugs early, ship faster." },
      { id: 3, name: "Continuous Delivery (CD)", desc: "Code is always in a deployable state. Every change passes through automated pipeline and can be released at any time with a manual approval." },
      { id: 4, name: "Continuous Deployment", desc: "Every change that passes all pipeline stages is automatically deployed to production. No manual gates. Requires robust testing and monitoring." },
      { id: 5, name: "Infrastructure as Code (IaC)", desc: "Managing infrastructure through code files instead of manual processes. Terraform, Pulumi, CloudFormation. Version-controlled, repeatable, auditable." },
      { id: 6, name: "GitOps", desc: "Using Git as the single source of truth for declarative infrastructure and apps. Changes via pull requests, automated reconciliation. ArgoCD, Flux." },
      { id: 7, name: "Shift Left", desc: "Moving testing, security, and quality checks earlier in the development lifecycle. Find and fix issues when they're cheapest to resolve." },
      { id: 8, name: "Everything as Code", desc: "Infrastructure, configuration, policies, pipelines, documentation — all defined in code. Enables versioning, review, and automation for everything." },
      { id: 9, name: "Immutable Infrastructure", desc: "Servers are never modified after deployment. Changes require building a new image and replacing the old one. Eliminates configuration drift." },
      { id: 10, name: "Cattle vs Pets", desc: "Pets: servers you name and nurse back to health. Cattle: identical, numbered, replaced when sick. Modern infra treats servers as cattle." },
      { id: 11, name: "The Three Ways of DevOps", desc: "1) Flow: fast left-to-right delivery. 2) Feedback: fast right-to-left feedback loops. 3) Continual Learning: experimentation and improvement." },
      { id: 12, name: "DORA Metrics", desc: "Four key metrics: Deployment Frequency, Lead Time for Changes, Change Failure Rate, Mean Time to Recovery. Measures DevOps performance." },
      { id: 13, name: "Toil Reduction", desc: "Eliminating manual, repetitive, automatable work. SRE principle: if a human does it more than twice, automate it." },
      { id: 14, name: "Blameless Postmortems", desc: "After incidents, focus on systemic causes, not individuals. Document what happened, why, and how to prevent recurrence. Builds trust." },
    ],
  },
  {
    name: "Version Control & Collaboration",
    icon: "⬡",
    color: "#118AB2",
    concepts: [
      { id: 15, name: "Git", desc: "Distributed version control system. Tracks code changes, enables branching/merging. Foundation of all modern development workflows." },
      { id: 16, name: "Branching Strategies", desc: "Git Flow (feature/develop/release/hotfix), GitHub Flow (main + feature branches), Trunk-Based Development (short-lived branches off main)." },
      { id: 17, name: "Trunk-Based Development", desc: "All developers commit to a single branch (main/trunk). Short-lived feature branches (<1 day). Enables CI and reduces merge conflicts." },
      { id: 18, name: "Pull Requests / Merge Requests", desc: "Proposed code changes reviewed by peers before merging. Includes code review, automated checks, and discussion. Quality gate." },
      { id: 19, name: "Code Review", desc: "Peers examine code for bugs, style, architecture, and security. Catches issues early. Knowledge sharing across the team." },
      { id: 20, name: "Monorepo vs Polyrepo", desc: "Monorepo: all projects in one repo (Google, Meta). Polyrepo: separate repos per service. Trade-off: visibility vs independence." },
      { id: 21, name: "Semantic Versioning (SemVer)", desc: "MAJOR.MINOR.PATCH (e.g., 2.4.1). Major: breaking changes. Minor: new features. Patch: bug fixes. Standard for dependency management." },
      { id: 22, name: "Conventional Commits", desc: "Structured commit messages (feat:, fix:, chore:, docs:). Enables automated changelogs, versioning, and release notes." },
      { id: 23, name: "Git Hooks", desc: "Scripts that run at specific Git events (pre-commit, pre-push). Enforce linting, tests, commit message format before code enters repo." },
    ],
  },
  {
    name: "CI/CD Pipelines",
    icon: "⬢",
    color: "#EF476F",
    concepts: [
      { id: 24, name: "CI/CD Pipeline", desc: "Automated workflow: code commit → build → test → deploy. Defined as code in YAML/config. The backbone of DevOps delivery." },
      { id: 25, name: "Build Automation", desc: "Compiling code, resolving dependencies, and producing artifacts automatically. Tools: Maven, Gradle, Webpack, esbuild, Vite." },
      { id: 26, name: "Artifact Repository", desc: "Stores build outputs (JARs, Docker images, binaries). JFrog Artifactory, Nexus, GitHub Packages, AWS ECR. Single source of truth for artifacts." },
      { id: 27, name: "Pipeline as Code", desc: "Defining CI/CD pipelines in version-controlled files. Jenkinsfile, .gitlab-ci.yml, .github/workflows. Reviewable and reproducible." },
      { id: 28, name: "Pipeline Stages", desc: "Typical stages: Lint → Build → Unit Test → Integration Test → Security Scan → Deploy Staging → E2E Test → Deploy Production." },
      { id: 29, name: "Parallel & Matrix Builds", desc: "Running pipeline jobs simultaneously across multiple OS, language versions, or configurations. Reduces total pipeline time dramatically." },
      { id: 30, name: "Self-Hosted vs Cloud CI Runners", desc: "Cloud: managed runners (GitHub Actions, CircleCI). Self-hosted: your own machines. Trade-off: convenience vs control and cost." },
      { id: 31, name: "CI/CD Tools", desc: "Jenkins, GitHub Actions, GitLab CI, CircleCI, Travis CI, Azure DevOps, ArgoCD, Tekton, Drone, Buildkite. Each has different strengths." },
      { id: 32, name: "Caching in CI", desc: "Caching dependencies and build outputs between pipeline runs. Dramatically reduces build times. npm cache, Docker layer caching." },
      { id: 33, name: "Flaky Tests", desc: "Tests that pass and fail inconsistently. Erode trust in CI. Must be quarantined, fixed, or deleted. A major DevOps pain point." },
      { id: 34, name: "Pipeline Security (Supply Chain)", desc: "Securing the CI/CD pipeline itself: signed commits, verified base images, SBOM, dependency scanning, secret rotation, SLSA framework." },
    ],
  },
  {
    name: "Containers & Orchestration",
    icon: "⊞",
    color: "#26C6DA",
    concepts: [
      { id: 35, name: "Containers", desc: "Lightweight, isolated environments packaging app + dependencies. Share the host OS kernel. Faster and smaller than VMs. Docker is the standard." },
      { id: 36, name: "Docker", desc: "Platform for building, running, and distributing containers. Dockerfile defines the image. Docker Compose for multi-container apps." },
      { id: 37, name: "Container Images", desc: "Read-only templates for creating containers. Built in layers. Stored in registries (Docker Hub, ECR, GCR). Tag images for versioning." },
      { id: 38, name: "Dockerfile Best Practices", desc: "Multi-stage builds, minimize layers, use .dockerignore, pin base image versions, run as non-root, keep images small (<100MB ideal)." },
      { id: 39, name: "Container Registry", desc: "Storage and distribution service for container images. Docker Hub, AWS ECR, GCR, GitHub Container Registry, Harbor (self-hosted)." },
      { id: 40, name: "Kubernetes (K8s)", desc: "Container orchestration platform. Automates deployment, scaling, networking, and management of containerized apps. The industry standard." },
      { id: 41, name: "K8s Pods", desc: "Smallest deployable unit in Kubernetes. One or more containers sharing network/storage. Pods are ephemeral — they get replaced, not repaired." },
      { id: 42, name: "K8s Deployments & ReplicaSets", desc: "Deployment manages desired state (replicas, image version). ReplicaSet ensures the right number of pods are running. Handles rolling updates." },
      { id: 43, name: "K8s Services", desc: "Stable network endpoint for a set of pods. Types: ClusterIP (internal), NodePort (external port), LoadBalancer (cloud LB), ExternalName." },
      { id: 44, name: "K8s Ingress", desc: "Manages external HTTP/HTTPS access to services. Path-based and host-based routing. Controllers: Nginx, Traefik, AWS ALB Ingress." },
      { id: 45, name: "K8s ConfigMaps & Secrets", desc: "ConfigMaps: non-sensitive config data as key-value pairs. Secrets: sensitive data (base64-encoded). Injected as env vars or mounted files." },
      { id: 46, name: "K8s Namespaces", desc: "Virtual clusters within a physical cluster. Isolate environments (dev, staging, prod) or teams. Resource quotas per namespace." },
      { id: 47, name: "K8s StatefulSets", desc: "For stateful applications needing stable identities and persistent storage. Ordered deployment/scaling. Used for databases, Kafka, ZooKeeper." },
      { id: 48, name: "K8s DaemonSets", desc: "Ensures a pod runs on every node (or selected nodes). Used for logging agents, monitoring, node-level networking (Fluentd, Datadog agent)." },
      { id: 49, name: "K8s Horizontal Pod Autoscaler (HPA)", desc: "Automatically scales pod replicas based on CPU, memory, or custom metrics. Responds to traffic spikes without manual intervention." },
      { id: 50, name: "Helm", desc: "Package manager for Kubernetes. Charts are reusable, parameterized K8s manifest templates. Simplifies complex deployments. values.yaml for config." },
      { id: 51, name: "K8s Operators", desc: "Custom controllers that encode operational knowledge. Automate lifecycle management of complex stateful apps (databases, message brokers)." },
      { id: 52, name: "Service Mesh", desc: "Infrastructure layer for service-to-service communication. Handles mTLS, retries, observability, traffic management. Istio, Linkerd, Consul Connect." },
      { id: 53, name: "Container Security", desc: "Scan images for vulnerabilities (Trivy, Snyk), run as non-root, use read-only filesystems, Pod Security Standards, network policies." },
      { id: 54, name: "Docker Compose", desc: "Tool for defining multi-container applications in a single YAML file. Great for local development and simple deployments. docker-compose up." },
    ],
  },
  {
    name: "Cloud & Infrastructure",
    icon: "◈",
    color: "#FF9F1C",
    concepts: [
      { id: 55, name: "Cloud Computing Models (IaaS/PaaS/SaaS)", desc: "IaaS: virtual machines (EC2). PaaS: managed platform (Heroku, App Engine). SaaS: ready-to-use software (Slack). Abstraction increases upward." },
      { id: 56, name: "AWS / Azure / GCP", desc: "The big three cloud providers. AWS: largest ecosystem. Azure: enterprise/Microsoft integration. GCP: data/ML strength. Multi-cloud is common." },
      { id: 57, name: "Virtual Machines (VMs)", desc: "Emulated computers running on hypervisors. Full OS isolation. Heavier than containers but stronger isolation. EC2, Azure VMs, Compute Engine." },
      { id: 58, name: "Serverless Computing", desc: "Run code without managing servers. Pay per execution. AWS Lambda, Azure Functions, Google Cloud Functions. Auto-scales to zero." },
      { id: 59, name: "Edge Computing", desc: "Processing data closer to where it's generated. Reduces latency. CDN edge functions (Cloudflare Workers), IoT edge nodes." },
      { id: 60, name: "Regions & Availability Zones", desc: "Regions: geographic locations with clusters of data centers. AZs: isolated data centers within a region. Deploy across AZs for high availability." },
      { id: 61, name: "VPC (Virtual Private Cloud)", desc: "Isolated network within the cloud. Subnets (public/private), route tables, internet gateways, NAT gateways. Network foundation." },
      { id: 62, name: "Load Balancers (ALB/NLB/CLB)", desc: "Distribute traffic across targets. ALB: HTTP/HTTPS layer 7. NLB: TCP/UDP layer 4. Managed by cloud providers. Health check integrated." },
      { id: 63, name: "Auto Scaling Groups", desc: "Automatically adjust the number of instances based on demand. Scaling policies based on CPU, memory, custom metrics, or schedules." },
      { id: 64, name: "Managed Databases", desc: "Cloud-managed DB services: RDS, Aurora, Cloud SQL, DynamoDB, Cosmos DB. Handles backups, patching, replication, scaling." },
      { id: 65, name: "Object Storage (S3 / GCS / Blob)", desc: "Scalable storage for unstructured data. Virtually unlimited capacity. Storage classes for cost optimization (Standard, Infrequent, Glacier)." },
      { id: 66, name: "CDN (CloudFront / Cloudflare / Fastly)", desc: "Caches content at edge locations worldwide. Reduces latency for static and dynamic content. DDoS protection often included." },
      { id: 67, name: "DNS Management (Route 53 / Cloud DNS)", desc: "Managed DNS services with health checks, failover routing, weighted routing, geolocation routing. Foundation for high availability." },
      { id: 68, name: "Cloud Cost Optimization", desc: "Reserved Instances, Spot/Preemptible Instances, right-sizing, auto-scaling, storage tiering, unused resource cleanup. FinOps discipline." },
      { id: 69, name: "Multi-Cloud & Hybrid Cloud", desc: "Multi-cloud: using multiple providers. Hybrid: combining on-premise with cloud. Avoids vendor lock-in but increases operational complexity." },
    ],
  },
  {
    name: "Infrastructure as Code",
    icon: "⬣",
    color: "#7B68EE",
    concepts: [
      { id: 70, name: "Terraform", desc: "Declarative IaC tool by HashiCorp. Provider-agnostic (AWS, Azure, GCP, K8s). HCL syntax. State file tracks resource mappings. Plan → Apply workflow." },
      { id: 71, name: "Terraform State Management", desc: "State file maps config to real resources. Remote backends (S3, Terraform Cloud) for team collaboration. State locking prevents conflicts." },
      { id: 72, name: "Terraform Modules", desc: "Reusable, composable infrastructure components. Public registry has thousands. Encapsulate best practices. Input variables and outputs." },
      { id: 73, name: "Pulumi", desc: "IaC using real programming languages (TypeScript, Python, Go). Full IDE support, testing, loops, conditionals. Alternative to Terraform's HCL." },
      { id: 74, name: "AWS CloudFormation / CDK", desc: "CloudFormation: AWS-native IaC in JSON/YAML. CDK: define CloudFormation using TypeScript, Python, etc. Synthesizes to CloudFormation templates." },
      { id: 75, name: "Ansible", desc: "Agentless configuration management and automation. YAML playbooks. SSH-based. Idempotent tasks. Great for configuring servers and deploying apps." },
      { id: 76, name: "Configuration Management", desc: "Automating server configuration: Ansible, Chef, Puppet, SaltStack. Ensures consistent state across all machines. Idempotent operations." },
      { id: 77, name: "Packer", desc: "HashiCorp tool for building machine images (AMI, Docker, Vagrant). Bakes dependencies into images for fast, consistent deployments." },
      { id: 78, name: "Declarative vs Imperative IaC", desc: "Declarative: define desired end state (Terraform, K8s). Imperative: define steps to reach state (scripts, Ansible tasks). Declarative preferred." },
      { id: 79, name: "Drift Detection", desc: "Detecting when actual infrastructure differs from IaC definitions. Manual changes cause drift. Tools: Terraform plan, Driftctl, AWS Config." },
      { id: 80, name: "Policy as Code", desc: "Defining infrastructure policies in code. OPA/Rego, HashiCorp Sentinel, Checkov, tfsec. Enforce compliance automatically in CI/CD." },
    ],
  },
  {
    name: "Monitoring & Observability",
    icon: "◉",
    color: "#F72585",
    concepts: [
      { id: 81, name: "Observability (Three Pillars)", desc: "Logs + Metrics + Traces. Together they let you understand what's happening inside your systems. Ask arbitrary questions about system state." },
      { id: 82, name: "Metrics", desc: "Numerical measurements over time: CPU usage, request rate, error rate, latency percentiles. Time-series data. Prometheus, Datadog, CloudWatch." },
      { id: 83, name: "Logging", desc: "Structured event records. Centralize with ELK (Elasticsearch, Logstash, Kibana), Loki + Grafana, Datadog, Splunk. Structured JSON logs preferred." },
      { id: 84, name: "Distributed Tracing", desc: "Tracking requests across microservices. Each span represents a unit of work. Jaeger, Zipkin, AWS X-Ray, Datadog APM. Find latency bottlenecks." },
      { id: 85, name: "OpenTelemetry (OTel)", desc: "Vendor-neutral standard for generating metrics, logs, and traces. SDKs for every major language. Becoming the industry default for instrumentation." },
      { id: 86, name: "Prometheus", desc: "Open-source metrics monitoring system. Pull-based model, PromQL query language, alert rules. De facto standard for Kubernetes monitoring." },
      { id: 87, name: "Grafana", desc: "Visualization platform for metrics, logs, and traces. Dashboards for Prometheus, Loki, Tempo, CloudWatch, and 100+ data sources." },
      { id: 88, name: "Alerting & On-Call", desc: "Notifications when metrics breach thresholds. PagerDuty, OpsGenie, VictorOps for on-call rotation. Avoid alert fatigue with good thresholds." },
      { id: 89, name: "SLIs, SLOs, SLAs", desc: "SLI: metric (e.g., 99.5% requests < 200ms). SLO: target for SLI. SLA: contractual agreement with consequences. SRE foundation." },
      { id: 90, name: "Error Budgets", desc: "Allowed amount of unreliability (100% - SLO). If error budget is exhausted, freeze feature releases and focus on reliability." },
      { id: 91, name: "Synthetic Monitoring", desc: "Simulated user interactions to test availability and performance. Pingdom, Datadog Synthetics. Catches issues before real users do." },
      { id: 92, name: "Real User Monitoring (RUM)", desc: "Tracking actual user experience in browsers/apps. Page load times, JS errors, Core Web Vitals. Complements synthetic monitoring." },
      { id: 93, name: "APM (Application Performance Monitoring)", desc: "Deep visibility into application internals: method-level timing, database queries, external calls. New Relic, Datadog APM, Dynatrace." },
      { id: 94, name: "Log Aggregation", desc: "Collecting logs from all services into a central system. ELK Stack, Loki, Splunk, Datadog. Enables searching, correlating, and alerting." },
      { id: 95, name: "Health Checks & Liveness/Readiness Probes", desc: "Liveness: is the process alive? (restart if not). Readiness: can it accept traffic? (remove from LB if not). K8s native concept." },
      { id: 96, name: "Runbooks & Playbooks", desc: "Documented step-by-step procedures for handling incidents. Automate where possible. Reduce MTTR and remove dependency on tribal knowledge." },
    ],
  },
  {
    name: "Deployment Strategies",
    icon: "↯",
    color: "#4CC9F0",
    concepts: [
      { id: 97, name: "Rolling Deployment", desc: "Gradually replace old instances with new ones. Zero downtime. If issues arise, stop rollout. Default K8s deployment strategy." },
      { id: 98, name: "Blue-Green Deployment", desc: "Two identical environments: Blue (current) and Green (new). Switch traffic after validation. Instant rollback by switching back." },
      { id: 99, name: "Canary Deployment", desc: "Route a small percentage of traffic (1-5%) to the new version. Monitor metrics. Gradually increase if healthy. Reduce blast radius." },
      { id: 100, name: "A/B Testing Deploys", desc: "Route different user segments to different versions. Measure business metrics (conversion, engagement). Data-driven feature decisions." },
      { id: 101, name: "Feature Flags / Feature Toggles", desc: "Deploy code with features disabled. Enable gradually by user segment, percentage, or geography. Decouple deploy from release. LaunchDarkly." },
      { id: 102, name: "Dark Launches", desc: "Deploy new code to production but don't expose to users. Process real traffic in shadow mode. Validate performance before enabling." },
      { id: 103, name: "Rollback Strategies", desc: "Automated or manual reversion to previous version. Requires: versioned artifacts, database migration compatibility, health check automation." },
      { id: 104, name: "Progressive Delivery", desc: "Umbrella term for canary, feature flags, and A/B testing. Gradually expose changes to larger audiences based on metrics. Flagger, Argo Rollouts." },
      { id: 105, name: "Immutable Deployments", desc: "Never modify running instances. Deploy new instances from new images, then terminate old ones. Eliminates snowflake servers." },
      { id: 106, name: "Database Migrations in CI/CD", desc: "Versioned, automated schema changes. Forward-only migrations. Must be backward-compatible for zero-downtime deploys. Flyway, Alembic, Prisma Migrate." },
    ],
  },
  {
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
  },
  {
    name: "Testing",
    icon: "⟐",
    color: "#B5E48C",
    concepts: [
      { id: 121, name: "Testing Pyramid", desc: "Many unit tests (fast, cheap), fewer integration tests, fewest E2E tests (slow, expensive). Invert and you get slow, flaky pipelines." },
      { id: 122, name: "Unit Testing", desc: "Testing individual functions/methods in isolation. Fast, deterministic. Mocking external dependencies. Jest, pytest, JUnit, Vitest." },
      { id: 123, name: "Integration Testing", desc: "Testing how components work together. Database queries, API calls, service interactions. Slower but catches interface issues." },
      { id: 124, name: "End-to-End (E2E) Testing", desc: "Simulating real user workflows through the full stack. Cypress, Playwright, Selenium. Slow and brittle but catches real-world bugs." },
      { id: 125, name: "Contract Testing", desc: "Verifying API contracts between services. Consumer-driven contracts ensure changes don't break consumers. Pact is the standard tool." },
      { id: 126, name: "Load / Performance Testing", desc: "Simulating high traffic to find bottlenecks and breaking points. k6, Locust, Gatling, JMeter. Test before production, not in production." },
      { id: 127, name: "Chaos Engineering", desc: "Intentionally injecting failures to test resilience. Kill pods, inject latency, simulate AZ failure. Netflix Chaos Monkey, Litmus, Gremlin." },
      { id: 128, name: "Smoke Testing", desc: "Quick sanity check after deployment. Verify critical paths work (login, homepage, API health). First gate before broader testing." },
      { id: 129, name: "Canary Analysis (Automated)", desc: "Automatically comparing canary metrics against baseline. Kayenta, Flagger. Promotes or rolls back canary without human intervention." },
      { id: 130, name: "Test Data Management", desc: "Creating, maintaining, and cleaning test data. Fixtures, factories, database seeding. Anonymized production data for realistic testing." },
      { id: 131, name: "Shift-Right Testing", desc: "Testing in production: feature flags, observability, synthetic monitoring, canary deploys. Complements shift-left with real-world validation." },
    ],
  },
  {
    name: "Networking & Service Discovery",
    icon: "⟡",
    color: "#FFB4A2",
    concepts: [
      { id: 132, name: "Service Discovery", desc: "How services find each other in dynamic environments. DNS-based (K8s CoreDNS), registry-based (Consul, Eureka), or environment variables." },
      { id: 133, name: "DNS in Kubernetes (CoreDNS)", desc: "Built-in DNS for K8s. Services resolve via service-name.namespace.svc.cluster.local. Pods get DNS entries automatically." },
      { id: 134, name: "Reverse Proxy (Nginx / Envoy / Traefik)", desc: "Sits in front of backend services. Handles SSL termination, routing, rate limiting, compression. Envoy powers most service meshes." },
      { id: 135, name: "API Gateway", desc: "Single entry point for external traffic. Auth, rate limiting, request transformation, routing. Kong, AWS API Gateway, Traefik." },
      { id: 136, name: "Sidecar Proxy Pattern", desc: "A proxy container alongside each service pod. Handles networking concerns (TLS, retries, tracing). Envoy sidecar in Istio/Linkerd." },
      { id: 137, name: "Network Segmentation", desc: "Dividing networks into zones with controlled access between them. Public subnet, private subnet, DMZ. Defense in depth." },
      { id: 138, name: "NAT Gateway", desc: "Allows private subnet resources to reach the internet without exposing them. Outbound-only connectivity. Essential for pulling packages securely." },
      { id: 139, name: "Ingress Controllers", desc: "K8s components managing external access. Process Ingress resources into load balancer rules. Nginx Ingress, Traefik, AWS ALB Controller." },
    ],
  },
  {
    name: "Reliability & SRE",
    icon: "⛉",
    color: "#3A86FF",
    concepts: [
      { id: 140, name: "Site Reliability Engineering (SRE)", desc: "Google's approach to operations. Software engineering principles applied to infrastructure. Automate operations, manage reliability with error budgets." },
      { id: 141, name: "Incident Management", desc: "Process for detecting, responding to, and resolving production issues. Incident commander, communication channels, status pages, timelines." },
      { id: 142, name: "MTTR / MTTF / MTBF", desc: "MTTR: Mean Time to Recovery. MTTF: Mean Time to Failure. MTBF: Mean Time Between Failures. Key reliability metrics." },
      { id: 143, name: "Circuit Breaker Pattern", desc: "Stop calling a failing service after threshold breaches. States: closed (normal), open (failing, fast-fail), half-open (testing recovery)." },
      { id: 144, name: "Retry & Exponential Backoff", desc: "Retry failed requests with increasing delays plus jitter. Prevents thundering herd on recovering services. Standard in SDK clients." },
      { id: 145, name: "Rate Limiting & Throttling", desc: "Limiting request rates to protect services. Token bucket, sliding window algorithms. Applied at API gateway, service, or infrastructure level." },
      { id: 146, name: "Graceful Degradation", desc: "System continues with reduced functionality during partial failures. Serve cached data, disable non-critical features, show fallback content." },
      { id: 147, name: "Bulkhead Pattern", desc: "Isolate components into failure domains. One failing service doesn't exhaust shared resources. Like watertight compartments on a ship." },
      { id: 148, name: "Disaster Recovery (DR)", desc: "Strategies for catastrophic failures. Backup & restore, pilot light, warm standby, multi-site active-active. RTO and RPO define requirements." },
      { id: 149, name: "Backup Strategies", desc: "Full, incremental, differential backups. 3-2-1 rule: 3 copies, 2 media types, 1 offsite. Test restores regularly — untested backups are hopes." },
      { id: 150, name: "High Availability Patterns", desc: "Active-active, active-passive, multi-AZ, multi-region. Eliminate single points of failure at every layer. 99.99% requires automated failover." },
      { id: 151, name: "Capacity Planning", desc: "Forecasting resource needs based on growth, traffic patterns, and business projections. Prevent outages from insufficient capacity." },
      { id: 152, name: "GameDay / Fire Drills", desc: "Scheduled exercises simulating failures in production. Test incident response, runbooks, and team readiness. Practice makes prepared." },
    ],
  },
  {
    name: "Advanced & Emerging",
    icon: "✦",
    color: "#C77DFF",
    concepts: [
      { id: 153, name: "Platform Engineering", desc: "Building Internal Developer Platforms (IDPs) that abstract infrastructure complexity. Self-service for devs. Backstage, Humanitec, Port." },
      { id: 154, name: "Internal Developer Portal", desc: "Single pane of glass for developers: service catalog, docs, templates, CI/CD status, runbooks. Backstage (Spotify) is the leading framework." },
      { id: 155, name: "FinOps", desc: "Cloud financial operations. Engineers take ownership of cloud spend. Visibility, optimization, accountability. Tag resources, right-size, use spot instances." },
      { id: 156, name: "Ephemeral Environments", desc: "Spin up full environments per PR/branch. Test in isolation, destroy after merge. Preview deployments. Vercel, Render, Kubernetes namespaces." },
      { id: 157, name: "WebAssembly (Wasm) in Cloud", desc: "Lightweight, sandboxed execution format. Faster cold starts than containers. Spin, Fermyon, WasmCloud. Emerging serverless alternative." },
      { id: 158, name: "eBPF", desc: "Run sandboxed programs in the Linux kernel. Networking, observability, security without kernel modules. Cilium, Falco, Pixie powered by eBPF." },
      { id: 159, name: "Supply Chain Security", desc: "Securing the entire software delivery pipeline from source to production. Signed artifacts, verified builds, dependency auditing, SBOM." },
      { id: 160, name: "AI/ML Ops (MLOps)", desc: "DevOps practices for ML: model versioning, training pipelines, model serving, monitoring drift. MLflow, Kubeflow, SageMaker." },
      { id: 161, name: "ChatOps", desc: "Managing operations through chat (Slack, Teams). Bots trigger deployments, run queries, page on-call. Centralizes visibility and action." },
      { id: 162, name: "Observability-Driven Development", desc: "Design systems with observability built in from day one. Instrument before writing business logic. Observe in staging and production." },
      { id: 163, name: "Green Computing / Sustainable DevOps", desc: "Reducing carbon footprint of infrastructure. Right-sizing, spot instances, carbon-aware scheduling, efficient architectures. Sustainability as a metric." },
      { id: 164, name: "Developer Experience (DX)", desc: "Optimizing the developer's daily workflow. Fast CI, easy local dev, good docs, self-service tooling. Happy devs = productive devs." },
      { id: 165, name: "Infrastructure from Code (IfC)", desc: "Infer infrastructure from application code instead of defining it separately. Nitric, Klotho, Ampt. Emerging alternative to traditional IaC." },
    ],
  },
];

const totalConcepts = categories.reduce((sum, c) => sum + c.concepts.length, 0);

export default function DevOpsConcepts() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      concepts: cat.concepts.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.desc.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.concepts.length > 0);

  const displayCategories = activeCategory
    ? filteredCategories.filter((c) => c.name === activeCategory)
    : filteredCategories;

  const matchCount = filteredCategories.reduce(
    (sum, c) => sum + c.concepts.length,
    0
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060810",
        color: "#D0D0DE",
        fontFamily: "'Source Code Pro', 'Fira Code', 'Menlo', monospace",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "40px 32px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          background:
            "linear-gradient(180deg, rgba(6,214,160,0.05) 0%, transparent 100%)",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontSize: 11,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#06D6A0",
                fontWeight: 600,
              }}
            >
              Reference Guide
            </span>
            <span
              style={{
                fontSize: 10,
                background: "rgba(6,214,160,0.12)",
                color: "#06D6A0",
                padding: "2px 8px",
                borderRadius: 3,
                letterSpacing: 1,
              }}
            >
              {totalConcepts} CONCEPTS
            </span>
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              margin: "8px 0 6px",
              color: "#F0F0FF",
              letterSpacing: -0.5,
              fontFamily: "'Outfit', 'Manrope', system-ui, sans-serif",
            }}
          >
            DevOps Concepts
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "#5E5E74",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            CI/CD, containers, cloud, observability, security — the complete DevOps toolkit
          </p>

          {/* Search */}
          <div style={{ marginTop: 20, position: "relative" }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search concepts..."
              style={{
                width: "100%",
                padding: "10px 16px 10px 36px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 8,
                color: "#D0D0DE",
                fontSize: 13,
                fontFamily: "inherit",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#444",
                fontSize: 14,
              }}
            >
              ⌕
            </span>
            {search && (
              <span
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#5E5E74",
                  fontSize: 11,
                }}
              >
                {matchCount} results
              </span>
            )}
          </div>

          {/* Category pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginTop: 16,
            }}
          >
            <button
              onClick={() => setActiveCategory(null)}
              style={{
                padding: "5px 12px",
                fontSize: 11,
                borderRadius: 4,
                border: "1px solid",
                borderColor: !activeCategory
                  ? "rgba(6,214,160,0.4)"
                  : "rgba(255,255,255,0.06)",
                background: !activeCategory
                  ? "rgba(6,214,160,0.1)"
                  : "transparent",
                color: !activeCategory ? "#06D6A0" : "#5E5E74",
                cursor: "pointer",
                fontFamily: "inherit",
                letterSpacing: 0.3,
                transition: "all 0.15s",
              }}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === cat.name ? null : cat.name
                  )
                }
                style={{
                  padding: "5px 12px",
                  fontSize: 11,
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor:
                    activeCategory === cat.name
                      ? `${cat.color}66`
                      : "rgba(255,255,255,0.06)",
                  background:
                    activeCategory === cat.name
                      ? `${cat.color}14`
                      : "transparent",
                  color:
                    activeCategory === cat.name ? cat.color : "#5E5E74",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  letterSpacing: 0.3,
                  transition: "all 0.15s",
                }}
              >
                <span style={{ marginRight: 4 }}>{cat.icon}</span>
                {cat.name}
                <span style={{ marginLeft: 4, opacity: 0.5 }}>
                  {cat.concepts.length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{ maxWidth: 960, margin: "0 auto", padding: "24px 32px 60px" }}
      >
        {displayCategories.map((cat) => (
          <div key={cat.name} style={{ marginBottom: 32 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
                paddingBottom: 8,
                borderBottom: `1px solid ${cat.color}18`,
              }}
            >
              <span style={{ color: cat.color, fontSize: 16 }}>
                {cat.icon}
              </span>
              <h2
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: cat.color,
                  margin: 0,
                  letterSpacing: 0.5,
                  fontFamily: "'Outfit', system-ui, sans-serif",
                }}
              >
                {cat.name}
              </h2>
              <span
                style={{
                  fontSize: 10,
                  color: "#3A3A48",
                  marginLeft: "auto",
                }}
              >
                {cat.concepts.length} concepts
              </span>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: 4 }}
            >
              {cat.concepts.map((concept) => {
                const isExpanded = expandedId === concept.id;
                return (
                  <div
                    key={concept.id}
                    onClick={() =>
                      setExpandedId(isExpanded ? null : concept.id)
                    }
                    style={{
                      padding: isExpanded ? "12px 16px" : "9px 16px",
                      background: isExpanded
                        ? `${cat.color}07`
                        : "rgba(255,255,255,0.01)",
                      border: "1px solid",
                      borderColor: isExpanded
                        ? `${cat.color}25`
                        : "rgba(255,255,255,0.03)",
                      borderRadius: 6,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 9,
                          color: "#3A3A48",
                          minWidth: 24,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {String(concept.id).padStart(3, "0")}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: isExpanded ? "#F0F0FF" : "#A0A0B4",
                          flex: 1,
                        }}
                      >
                        {concept.name}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          color: "#2A2A38",
                          transform: isExpanded
                            ? "rotate(90deg)"
                            : "none",
                          transition: "transform 0.15s",
                        }}
                      >
                        ▸
                      </span>
                    </div>
                    {isExpanded && (
                      <div
                        style={{
                          marginTop: 10,
                          marginLeft: 34,
                          fontSize: 12,
                          lineHeight: 1.7,
                          color: "#7A7A92",
                          borderLeft: `2px solid ${cat.color}28`,
                          paddingLeft: 12,
                        }}
                      >
                        {concept.desc}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
