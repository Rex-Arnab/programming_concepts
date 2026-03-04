const threatModeling = {
  name: "Threat Modeling",
  icon: "🎯",
  color: "#f97316",
  concepts: [
    {
      id: 1092,
      name: "What is Threat Modeling",
      desc: `**Threat modeling** — a structured process for identifying potential threats to a system, evaluating their likelihood and impact, and designing mitigations before security issues become vulnerabilities in production. "What can go wrong?" applied systematically to software architecture.

**The four key questions (Shostack's framework):**
1. What are we building? (system diagram, data flows, trust boundaries)
2. What can go wrong? (threat enumeration — adversarial thinking)
3. What are we going to do about it? (mitigations, countermeasures)
4. Did we do a good job? (validation, review)

**When to threat model:** during design phase (cheapest to fix), at architectural decision points, during significant feature changes, before launching new external APIs, and periodically for existing systems. Threat modeling is iterative, not a one-time exercise.

**Who should do it:** developers, security engineers, architects — ideally as a cross-functional team exercise. Security engineers bring threat knowledge; developers know the implementation details; both are needed. The "security elite only" approach doesn't scale.

**Output artifacts:** a data flow diagram (DFD) showing components, data flows, and trust boundaries; a list of identified threats (typically in a spreadsheet or issue tracker); accepted risks with rationale; mitigations planned or implemented.

**Key insight:** Threat modeling done during design catches security issues at 1/10th the cost of finding them in production. A 2-hour threat modeling session for a new feature is the highest-ROI security activity available to most engineering teams.`,
    },
    {
      id: 1093,
      name: "STRIDE Framework",
      desc: `**STRIDE** — a threat classification mnemonic developed by Microsoft that provides a systematic way to brainstorm threats across six categories, applied to each component and data flow in a system diagram.

**STRIDE categories:**
- **S — Spoofing:** impersonating another user, service, or component. "Can an attacker pretend to be an authenticated user?" Mitigations: authentication, certificates, signed tokens.
- **T — Tampering:** modifying data or code without authorization. "Can an attacker modify data in transit or at rest?" Mitigations: integrity checks (MACs, digital signatures), access controls, immutable logs.
- **R — Repudiation:** denying having performed an action. "Can an attacker or user claim they didn't do something they did?" Mitigations: audit logging, digital signatures, non-repudiation mechanisms.
- **I — Information Disclosure:** exposing information to unauthorized parties. "What data can leak?" Mitigations: encryption, access controls, data minimization.
- **D — Denial of Service:** degrading or disabling a service. "Can an attacker make this unavailable?" Mitigations: rate limiting, auto-scaling, circuit breakers, DDoS protection.
- **E — Elevation of Privilege:** gaining more access than authorized. "Can an attacker gain higher privileges?" Mitigations: authorization checks, least privilege, sandbox isolation.

**STRIDE + DFD (Data Flow Diagram):** for each element type, applicable STRIDE categories differ — external entities can spoof; data stores can be tampered or disclosed; processes can have all six; data flows can be spoofed, tampered, or disclosed.

**Key insight:** STRIDE is a starting point, not a complete threat library. Use it to structure brainstorming, then supplement with domain-specific threats (OWASP Top 10 for web, CWE for code vulnerabilities). The goal is not to use STRIDE perfectly but to think systematically about what can go wrong.`,
    },
    {
      id: 1094,
      name: "MITRE ATT&CK Framework",
      desc: `**MITRE ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge)** — a globally accessible knowledge base of adversary behaviors based on real-world observations of cyberattacks. Provides a common taxonomy for describing attacker behavior from initial access through impact.

**Structure:** organized as a matrix of Tactics (the "why" — adversary goals) and Techniques (the "how" — specific methods). Enterprise ATT&CK has 14 tactics: Reconnaissance, Resource Development, Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement, Collection, Command and Control, Exfiltration, Impact.

**Example technique:** "T1566.001 — Spearphishing Attachment" under "Initial Access." Each technique includes a description, procedure examples (which APT groups use it, with real incident references), detection methods, and mitigation recommendations.

**Use cases:**
- **Red team planning:** choose techniques to emulate specific threat actors (APT29 "Cozy Bear" for state-actor simulation)
- **Detection coverage mapping:** map your SIEM detection rules to ATT&CK techniques; identify coverage gaps
- **Threat intelligence:** normalize intelligence reports using ATT&CK IDs; compare what you're seeing to what other organizations report
- **Purple teaming:** red team executes techniques, blue team validates detection — ATT&CK provides the shared language

**ATT&CK Navigator:** a web-based tool for visualizing and annotating the ATT&CK matrix — color-code detected techniques, planned tests, or observed attacker behaviors.

**Key insight:** ATT&CK's real value is coverage analysis — after mapping your detection rules to ATT&CK, the blank cells reveal your detection gaps. Priority: cover the most common lateral movement and persistence techniques used by the threat actors relevant to your industry.`,
    },
    {
      id: 1095,
      name: "Data Flow Diagrams (DFDs) for Security",
      desc: `**Data Flow Diagram (DFD)** — a graphical representation of data movement through a system, showing processes, data stores, external entities, and data flows. In security, DFDs are augmented with trust boundaries to identify where data crosses between different trust zones — the primary artifact for threat modeling.

**DFD elements:**
- **External entity (rectangle):** actors outside the system boundary (users, external services, third-party APIs)
- **Process (circle/ellipse):** components that transform or handle data (web server, authentication service, microservice)
- **Data store (parallel lines):** persistent data (database, cache, file system, S3 bucket)
- **Data flow (arrow):** data moving between elements (HTTP request, DB query, API call)
- **Trust boundary (dashed line):** the line between zones of different trust levels — where authentication, authorization, or encryption should occur

**Why trust boundaries matter:** threats often materialize at trust boundary crossings — when data moves from an untrusted external entity into the system (input validation needed), from one service to another (authentication between services needed), or from application to database (authorization needed).

**Creating a useful DFD:**
1. Start at the right level of abstraction (L0: system in context; L1: major components; L2: internal details of each component)
2. Label every data flow with what data is transmitted
3. Draw trust boundaries wherever trust changes
4. For each boundary crossing, ask STRIDE questions

**Tools:** Microsoft Threat Modeling Tool (free, DFD-based, auto-generates STRIDE threats), OWASP Threat Dragon (open-source, web-based), draw.io with threat modeling shapes, Lucidchart.

**Key insight:** The most valuable part of creating a DFD for threat modeling isn't the diagram itself — it's the conversations that happen while building it, as team members discover assumptions they didn't know they were making about data flows and trust.`,
    },
    {
      id: 1096,
      name: "Attack Trees",
      desc: `**Attack tree** — a tree-structured diagram representing the different ways an attacker can achieve a specific goal (the root node). Sub-goals are broken down into more specific actions; leaf nodes are atomic attacks (things an attacker can directly do). Used to reason about attacker paths, prioritize defenses, and communicate risk.

**Structure:** root = attacker's goal ("compromise user accounts"). Child nodes = sub-goals connected by AND or OR relationships. OR: attacker can achieve the goal through any of the children. AND: attacker must accomplish all children. Leaf nodes = atomic attacks ("steal password reset token", "brute force weak password", "phish admin via spear-phishing email").

**Example: "Unauthorized access to admin panel"**
- OR: bypass authentication OR steal admin session
  - Bypass authentication: AND: find admin URL AND exploit auth bypass vulnerability
  - Steal admin session: OR: XSS cookie theft OR session fixation OR MITM

**Attack tree analysis:** attach probabilities and costs to leaf nodes. The path with the lowest cost/complexity to the attacker represents the most likely attack vector — and the most valuable thing to mitigate.

**Attack trees vs STRIDE:** STRIDE asks "what threats exist?" for each component. Attack trees ask "how can an attacker achieve this specific goal?" — more goal-oriented, useful when you know what an attacker would want (steal payment data, take down the service, exfiltrate PII).

**Securitree / TAMARA / SeaMonster:** dedicated attack tree tools. For most teams, a whiteboard or draw.io is sufficient.

**Key insight:** Attack trees are most valuable for communicating risk to non-technical stakeholders — the visual representation of "here's how an attacker gets to our crown jewels, and here's which paths we've blocked" is far more actionable than a list of CVEs.`,
    },
    {
      id: 1097,
      name: "PASTA Methodology",
      desc: `**PASTA (Process for Attack Simulation and Threat Analysis)** — a seven-stage, risk-centric threat modeling methodology that aligns security analysis with business objectives, simulating attacker perspectives to prioritize mitigation of the highest-risk threats.

**Seven stages:**
1. **Define objectives:** business context, data classification, compliance requirements, risk appetite
2. **Define technical scope:** application architecture, infrastructure, data flows, technologies
3. **Application decomposition:** DFDs, use cases, trust boundaries, entry points, existing security controls
4. **Threat analysis:** enumerate relevant threats using threat intelligence, CVE databases, ATT&CK
5. **Vulnerability and weakness analysis:** identify vulnerabilities in the application and infrastructure (SAST, DAST, pen test findings)
6. **Attack modeling:** model attack scenarios using attack trees; simulate attacker paths combining threats and vulnerabilities
7. **Risk and impact analysis:** assess business risk for each attack scenario; prioritize mitigation by risk

**PASTA vs STRIDE:** STRIDE is faster and developer-friendly (30-minute exercise per feature). PASTA is more rigorous, business-aligned, and appropriate for high-value systems requiring regulatory justification for security investments.

**Risk-centric output:** PASTA produces a risk register with quantified business impact per threat scenario, making it easier to justify security budget allocation — "remediating this SSRF vulnerability reduces the expected annual loss from $2M to $50K."

**When to use PASTA:** for critical systems (payment processing, healthcare data, customer PII databases); regulatory compliance contexts (PCI DSS, HIPAA, SOC 2); when security investment requires executive justification; during security architecture reviews of existing systems.

**Key insight:** PASTA's business-alignment is its key differentiator — it converts "we found a critical vulnerability" into "this vulnerability has a 30% probability of being exploited in the next year, with an expected business impact of $4M, making it priority 1 to fix before the Q2 launch."`,
    },
    {
      id: 1098,
      name: "Cyber Kill Chain",
      desc: `**Cyber Kill Chain** — a threat model framework from Lockheed Martin (2011) that describes the stages of a targeted cyberattack, from initial reconnaissance through achieving the attacker's objective. Originally designed to help defenders identify and disrupt attacks at each stage.

**Seven stages:**
1. **Reconnaissance:** attacker gathers information about the target — public IP ranges, employee names (LinkedIn), technologies (job postings, Shodan), email formats
2. **Weaponization:** attacker creates a deliverable payload — malware + exploit (exploit kit + RAT), weaponized document (macro-enabled Word file), phishing email
3. **Delivery:** transmitting the weapon to the target — phishing email, drive-by download, infected USB, compromised supply chain package
4. **Exploitation:** triggering the exploit — user opens malicious document, browser exploits a vulnerability, or attacker directly exploits a server vulnerability
5. **Installation:** installing persistent malware — backdoor, RAT, rootkit, scheduled task, cron job, registry run key
6. **Command and Control (C2):** establishing communication channel to the attacker's infrastructure — beacon over HTTPS, DNS tunneling, GitHub issues
7. **Actions on Objectives:** achieving the attacker's goal — data exfiltration, ransomware encryption, destroying data, lateral movement for deeper access

**Defender application:** the earlier in the kill chain an attack can be interrupted, the cheaper and less damaging. Disrupting delivery (phishing filter) is cheaper than detecting C2 (SIEM alert after compromise). Defense-in-depth means having controls at every stage.

**Kill chain limitations:** assumes a linear, outside-in attack model. Modern attacks (insider threats, supply chain compromises, living-off-the-land techniques using legitimate tools) are less linear. MITRE ATT&CK provides more granular, non-linear coverage.

**Key insight:** The kill chain's lasting value is the insight that defenders need to win only once (break any link in the chain); attackers must succeed at every stage. This asymmetry favors defense — multiple layers of controls at each stage give defenders multiple opportunities to detect and respond.`,
    },
    {
      id: 1099,
      name: "Risk Assessment & Prioritization",
      desc: `**Security risk assessment** — quantifying threats by their likelihood of occurrence and potential business impact, to prioritize which risks to address first with available resources.

**Risk formula:** Risk = Likelihood × Impact. A highly likely, low-impact vulnerability (reflected XSS on a low-traffic page) may have lower risk than a low-likelihood, catastrophic-impact vulnerability (SQL injection in a payment processor).

**Qualitative risk (CVSS):** Common Vulnerability Scoring System scores vulnerabilities 0-10 based on attack vector, complexity, required privileges, user interaction, scope change, and CIA impact. CVSS v3: Base Score (intrinsic properties), Temporal Score (exploit maturity, patch availability), Environmental Score (customized to your environment).

**DREAD scoring (Microsoft, now discouraged in favor of CVSS):** Damage potential, Reproducibility, Exploitability, Affected users, Discoverability — each scored 1-3; sum gives priority. Simple but subjective.

**Business risk vs technical severity:** a CVSS 9.8 vulnerability in an internal tool used by 3 employees may be lower business risk than a CVSS 6.5 vulnerability in the customer-facing payment flow used by millions. Always contextualize with: what data is exposed? What's the blast radius? Is it customer-facing? Is there a compensating control?

**Risk acceptance:** not every risk is worth fixing. Document accepted risks explicitly — who accepted it, when, why, and what compensating controls exist. Unacknowledged risk is much more dangerous than explicitly accepted risk.

**Key insight:** The biggest risk assessment mistake is treating all critical CVEs as equal priority. Contextualize with exploitability in your environment (is the port exposed? Is there authentication?), data sensitivity, and business impact to focus effort where it matters most.`,
    },
    {
      id: 1100,
      name: "Threat Intelligence",
      desc: `**Threat intelligence** — the collection, analysis, and application of information about adversaries — their motivations, capabilities, and tactics — to inform security decisions and proactively defend against specific threats relevant to your organization.

**Intelligence types (Bianco's Pyramid of Pain):**
- **Hash values / IP addresses / domains:** easy to collect, trivial for attackers to change. Lowest value.
- **Network artifacts (HTTP headers, URIs):** slightly harder to change
- **Host artifacts (registry keys, file names):** harder to change
- **Tools (specific malware families, exploits):** expensive for attackers to replace — takes weeks
- **Tactics, Techniques, and Procedures (TTPs):** the hardest to change — describes HOW attackers operate. Highest value.

**Threat intelligence sources:**
- **Open source (OSINT):** VirusTotal, Shodan, AlienVault OTX, Abuse.ch, Twitter/X security researchers, CVE/NVD, CISA Known Exploited Vulnerabilities catalog
- **Commercial:** Recorded Future, Mandiant, CrowdStrike Threat Intelligence, IBM X-Force — provide curated, contextual intelligence including attribution and TTPs
- **ISACs (Information Sharing and Analysis Centers):** industry-specific sharing (FS-ISAC for financial sector, H-ISAC for healthcare) — peer organizations sharing real attack data

**STIX/TAXII:** standardized formats for sharing threat intelligence (STIX = Structured Threat Information eXpression; TAXII = Trusted Automated eXchange of Intelligence Information). Enables automated ingestion of intelligence feeds into SIEMs.

**Key insight:** Most organizations over-invest in indicator-based intelligence (IPs, hashes — trivial to change) and under-invest in TTP-based intelligence. Understanding that your industry is being targeted by a group that uses specific lateral movement techniques is far more operationally valuable than a list of IPs.`,
    },
    {
      id: 1101,
      name: "Threat Modeling Tools & Automation",
      desc: `**Threat modeling tools** — software that assists in creating DFDs, enumerating threats, tracking mitigations, and integrating threat modeling into the SDLC.

**Microsoft Threat Modeling Tool (TMT):** free, Windows desktop application; draws DFDs; automatically generates STRIDE threats for each element based on its type. Good for getting started; outputs an HTML report; import/export in XML. Limitation: Windows-only, no collaboration features, output is a starting point not a complete threat model.

**OWASP Threat Dragon:** open-source, web-based, cross-platform; DFD-based; stores models as JSON (can be version-controlled in Git alongside code). Generates STRIDE threats. Active development by the OWASP community.

**IriusRisk:** commercial; integrates with Jira and Azure DevOps; automatically generates threats and countermeasures based on architecture; tracks compliance against security standards (GDPR, PCI DSS, NIST); designed for enterprise-scale threat modeling programs.

**Threats-as-Code (emerging):** define system architecture in code (Terraform-like DSL); threat modeling runs as part of CI/CD. Continuous threat modeling tools: threatspec (annotate code with threat model comments), Threagile (YAML-based architecture definition generates threat models).

**Integrating into SDLC:**
- Add a "threat model review" gate to the design review process for new features
- Require updated threat models for significant architectural changes
- Use Jira/GitHub Issues to track identified threats and their mitigations
- Automate DAST/SAST in CI to detect vulnerabilities identified in threat models

**Key insight:** The best threat modeling tool is the one your team will actually use. Start with OWASP Threat Dragon or even a whiteboard — the rigor comes from the process and the people, not the tool. Adopt specialized tooling when you're threat modeling more than 2-3 systems per month.`,
    },
  ],
};

export default threatModeling;
