const securityOperations = {
  name: "Security Operations",
  icon: "🖥️",
  color: "#f59e0b",
  concepts: [
    {
      id: 1122,
      name: "Security Operations Center (SOC)",
      desc: `**SOC (Security Operations Center)** — a team of security analysts and engineers who monitor, detect, analyze, and respond to cybersecurity incidents 24/7. The defensive nerve center of an organization's security program.

**SOC tiers:**
- **Tier 1 (Alert Analyst):** monitors dashboards and SIEM alerts; triages incoming alerts; basic investigation to determine if an alert is a true positive or false positive; escalates to Tier 2
- **Tier 2 (Incident Responder):** investigates escalated incidents; deeper forensic analysis; coordinates incident response; determines scope and impact
- **Tier 3 (Threat Hunter/SME):** proactive threat hunting; developing new detection rules; malware analysis; complex forensics; handling major incidents

**SOC models:**
- **In-house:** full control; expensive to staff 24/7; challenge retaining talent
- **MSSP (Managed Security Service Provider):** outsourced SOC; lower cost; 24/7 coverage; may lack business context
- **Hybrid:** in-house senior analysts, outsourced Tier 1 alert monitoring
- **MDR (Managed Detection and Response):** MSSP with active response capabilities; not just alerting but containing threats

**Key SOC metrics:**
- MTTD (Mean Time to Detect): time from intrusion to detection alert
- MTTR (Mean Time to Respond/Remediate): time from detection to containment
- False positive rate: proportion of alerts that are not real threats (high rate = analyst fatigue)
- Alert volume and coverage: how many alerts per day, what percentage are triaged

**Key insight:** SOC effectiveness is determined more by process and people than by technology. A well-tuned SIEM with alert triage processes and skilled analysts outperforms a sophisticated tool stack operated by undertrained staff drowning in false positives.`,
    },
    {
      id: 1123,
      name: "SIEM (Security Information & Event Management)",
      desc: `**SIEM (Security Information & Event Management)** — a platform that aggregates log data from across the organization's infrastructure (servers, firewalls, endpoints, applications, cloud services), normalizes it into a common format, correlates events across sources, and generates alerts for suspicious patterns.

**SIEM capabilities:**
- **Log aggregation:** collect logs from hundreds of sources; normalize different formats into a common schema
- **Real-time correlation:** match patterns across multiple log sources — a failed VPN login followed by a successful VPN login followed by lateral movement attempts is detected as a single attack chain
- **Alerting:** triggered on detection rules (Sigma rules, custom queries) or ML anomaly detection
- **Search and investigation:** forensic timeline reconstruction during incident response
- **Dashboards:** operational visibility — login volumes, failed authentications, network traffic anomalies
- **Compliance reporting:** SOC 2, PCI DSS, and HIPAA require logging and SIEM reporting

**SIEM platforms:**
- **Splunk:** market leader; extremely powerful search language (SPL); expensive at scale; on-prem and cloud (Splunk Cloud)
- **Microsoft Sentinel:** Azure-native; tight Azure/M365 integration; consumption-based pricing; SOAR built-in
- **Elastic SIEM:** built on Elasticsearch/Kibana; open-source core; competitive pricing; Elastic Common Schema (ECS)
- **Google Chronicle:** petabyte-scale; Google's threat intelligence integrated; UDM (Unified Data Model); flat pricing model

**Detection rules:** Sigma is the vendor-agnostic SIEM rule format — write a rule once, export to Splunk SPL, Elastic KQL, or Chronicle YARA-L. The Sigma community maintains thousands of detection rules for known attack patterns.

**Key insight:** A SIEM is only as good as its data quality and detection coverage. Garbage-in-garbage-out: missing key log sources means blind spots. Sigma rule coverage mapped to MITRE ATT&CK reveals exactly which techniques you can and cannot detect.`,
    },
    {
      id: 1124,
      name: "Incident Response Lifecycle",
      desc: `**Incident response (IR)** — the organized approach to managing and recovering from a security incident, minimizing damage, reducing recovery time, and preventing recurrence. NIST SP 800-61 defines the canonical IR lifecycle.

**NIST IR phases:**
1. **Preparation:** IR plan, playbooks, IR team, tools (forensic workstations, evidence storage), communication templates, legal retainer, cyber insurance
2. **Detection and Analysis:** identify that an incident has occurred; determine its scope and severity; preserve evidence; assess impact
3. **Containment, Eradication, and Recovery:**
   - Short-term containment: isolate affected systems (disconnect from network but keep running for forensics)
   - Evidence collection: forensic disk images, memory dumps, log exports
   - Long-term containment: apply patches, change credentials, fix the root cause
   - Eradication: remove malware, close attack vectors, validate clean systems
   - Recovery: restore from clean backups, monitor for re-infection
4. **Post-Incident Activity:** post-mortem analysis; lessons learned; update IR plan and detection rules

**Severity classification:**
- P1/Critical: breach confirmed, data exfiltration suspected, production down — all-hands response
- P2/High: active attacker in environment, significant systems compromised
- P3/Medium: contained compromise, single system affected
- P4/Low: suspicious activity, potential phishing, single endpoint malware

**Communication:** pre-drafted executive communication templates; legal/PR involvement for public disclosures; regulatory notification requirements (GDPR: 72-hour breach notification; HIPAA: 60 days; SEC: 4 business days for material incidents).

**Key insight:** The IR plan is most valuable in the first 30 minutes of an incident, when stress is highest and clear procedures prevent panic-driven mistakes. Run tabletop exercises quarterly — a plan never exercised is a plan that will fail when needed.`,
    },
    {
      id: 1125,
      name: "Digital Forensics",
      desc: `**Digital forensics** — the application of scientific methods to collect, preserve, analyze, and present digital evidence in a legally admissible manner. Critical for incident response investigations, legal proceedings, and understanding the full scope of a breach.

**Evidence types:**
- **Volatile data (collect first):** running processes, network connections, logged-on users, memory contents — lost when the system powers off
- **Non-volatile data:** disk images, log files, registry hives, browser history, file system metadata
- **Network forensics:** captured network traffic (pcap files), firewall logs, proxy logs, DNS logs

**Forensic order of volatility (collect most volatile first):**
1. CPU registers and cache
2. RAM (memory dump)
3. Network connections, routing tables
4. Running processes and open files
5. Disk image
6. Log files

**Chain of custody:** the documented, unbroken record of who had access to evidence and when. Critical for legal proceedings — evidence without clear chain of custody is inadmissible. Use write blockers when imaging disks; hash evidence immediately (MD5 + SHA-256); store in tamper-evident bags.

**Memory forensics:** RAM contains artifacts not visible on disk — running malware, decrypted credentials, network connections, recently executed commands. Volatility framework analyzes memory dumps: "volatility -f memory.raw --profile=Win10x64 pslist" lists processes; "malfind" detects injected code.

**Disk forensics tools:** Autopsy (GUI, free, used by law enforcement), FTK (Forensic Toolkit, commercial), dd for imaging, mmls for partition analysis, Plaso for timeline generation.

**Key insight:** The most important forensic principle is "do not alter the evidence." Never run forensic tools on the live system — they write to disk, overwrite slack space, and contaminate the evidence. Image first, analyze the copy.`,
    },
    {
      id: 1126,
      name: "Threat Hunting",
      desc: `**Threat hunting** — a proactive security practice where analysts search for hidden threats that have evaded existing detection tools, rather than waiting for alerts. Based on the assumption that sophisticated attackers are already inside the network and haven't been detected yet.

**Hypothesis-driven hunting:** start with a hypothesis based on threat intelligence or ATT&CK techniques — "I believe APT29 uses malicious scheduled tasks for persistence — let me look for unusual scheduled tasks across all endpoints." Systematically query data to prove or disprove the hypothesis.

**Data sources for hunting:**
- Endpoint telemetry (EDR: CrowdStrike, SentinelOne, Microsoft Defender for Endpoint) — process creation, network connections, file operations, registry changes
- Network traffic (NetFlow, full packet capture) — unusual communication patterns, C2 beacons, data exfiltration
- Authentication logs (AD, Azure AD, VPN) — unusual login times, locations, or volumes
- DNS logs — domain generation algorithm (DGA) detection, DNS tunneling patterns

**Hunting techniques:**
- **Stacking / frequency analysis:** "show me the most and least common values of X" — outliers are suspicious. Least common parent process for "cmd.exe" may reveal malware spawning shells.
- **TTP-based queries:** translate ATT&CK techniques to queries. T1059.001 (PowerShell): look for "powershell.exe" with "-EncodedCommand" argument (common malware evasion); unusual parent processes spawning PowerShell.
- **Time-based analysis:** find activity at unusual hours for the environment; look for beaconing (periodic connections at regular intervals to the same external IP)

**Tooling:** SIEM SPL/KQL queries; EDR threat hunting consoles; Jupyter notebooks for data analysis; SIGMA rules translated to hunting queries.

**Key insight:** Threat hunting is the highest-skill, lowest-automation security activity. Its value is in finding what automated detection misses — which means hunters must be deeply familiar with normal behavior in the environment to recognize what's abnormal.`,
    },
    {
      id: 1127,
      name: "Security Metrics & KPIs",
      desc: `**Security metrics** — quantitative measurements that assess the effectiveness of security controls, the organization's risk posture, and the performance of the security program. Critical for communicating security value to leadership and guiding resource allocation.

**Operational metrics (SOC performance):**
- **MTTD (Mean Time to Detect):** average time from initial intrusion to detection. Industry median is 207 days (Mandiant M-Trends). Best-in-class: hours.
- **MTTR (Mean Time to Respond):** average time from detection to containment. Industry median 70 days. Best-in-class: hours.
- **False positive rate:** percentage of alerts that are not real threats. Target: <10% false positive rate to avoid analyst fatigue.
- **Alert coverage:** percentage of MITRE ATT&CK techniques with detection coverage

**Risk metrics (CISO-level):**
- **Vulnerability patch SLA compliance:** percentage of critical/high vulnerabilities remediated within SLA (e.g., critical within 72 hours, high within 30 days)
- **Phishing simulation failure rate:** percentage of employees who click phishing links; target: <5% click rate with training
- **MFA adoption rate:** percentage of accounts with MFA enabled; target: 100% for all users
- **Third-party risk ratings (SecurityScorecard, BitSight):** external risk rating based on observable security signals

**Business metrics (board-level):**
- Cyber insurance premium trends (lower premium = improved risk posture)
- Regulatory compliance status (percentage of controls met)
- Incident cost and frequency
- Security ROI: cost of breaches prevented vs security investment

**Key insight:** Vanity metrics (number of vulnerabilities scanned, number of alerts generated) don't tell leadership anything useful. MTTD, MTTR, and patch SLA compliance directly measure the organization's ability to limit the impact of security incidents — these are the metrics that matter.`,
    },
    {
      id: 1128,
      name: "Vulnerability Management Program",
      desc: `**Vulnerability management** — the continuous, cyclical process of identifying, classifying, prioritizing, remediating, and mitigating vulnerabilities across the organization's technology assets. Not a one-time scan but an ongoing operational discipline.

**Vulnerability management lifecycle:**
1. **Asset inventory:** know what you have — you can't protect what you don't know exists. CMDB (Configuration Management Database), cloud asset inventory, network discovery.
2. **Scanning:** continuous or scheduled vulnerability scans (Tenable, Qualys, Rapid7 InsightVM) covering all assets — internal, cloud, containers, web apps
3. **Prioritization:** triage by CVSS + asset criticality + exploitability (EPSS) + business context. Not all critical CVEs need immediate remediation.
4. **Remediation:** patch, compensating controls (WAF rule, network isolation), or documented risk acceptance for each vulnerability
5. **Verification:** re-scan after remediation to confirm the vulnerability is resolved
6. **Reporting:** SLA tracking, trend analysis, executive dashboards

**Prioritization framework:**
- CISA KEV (Known Exploited Vulnerabilities catalog): mandated 15-day remediation for US federal agencies; any CVE on this list is being actively exploited — prioritize immediately
- EPSS > 0.1 (10% probability of exploitation in 30 days) + CVSS > 7.0: high priority
- Internet-facing assets: higher priority than internal-only systems
- Data sensitivity: vulnerability on a PII database is higher priority than an isolated dev server

**Remediation SLAs (example):**
- Critical (CVSS 9+, actively exploited): 24-72 hours
- High (CVSS 7-8.9): 30 days
- Medium (CVSS 4-6.9): 90 days
- Low (CVSS < 4): 180 days or risk acceptance

**Key insight:** The biggest vulnerability management failure is having a comprehensive scan and no remediation process. Thousands of open findings with no prioritization, ownership, or SLA result in the same security posture as no scanning at all.`,
    },
    {
      id: 1129,
      name: "Security Awareness Training",
      desc: `**Security awareness training** — educating employees about cybersecurity threats, safe behaviors, and organizational security policies to reduce human-factor risk. Humans are both the first line of defense and the most targeted attack vector.

**Training components:**
- **Phishing simulation + training:** send simulated phishing emails; employees who click get immediate micro-training; track improvement over time. Tools: KnowBe4, Proofpoint Security Awareness Training, Cofense.
- **Annual compliance training:** regulatory requirements (HIPAA, PCI DSS) mandate security awareness training for all employees; covers: password hygiene, phishing recognition, data handling, incident reporting
- **Role-based training:** developers get secure coding training (OWASP Top 10); administrators get privileged access training; executives get business email compromise awareness
- **Continuous awareness:** monthly security newsletters, intranet posts, screensaver messages, gamified learning modules

**Effectiveness measurement:**
- Phishing simulation click rate over time (target: <5% click rate, down from typical 30%+ baseline)
- Employee-reported phishing (via "Report Phishing" button) — measures active engagement
- Training completion rates
- Help desk calls about security issues (proxy for applied awareness)

**What doesn't work:** one-size-fits-all annual compliance training completed in 20 minutes with a quiz. Employees learn to skip through quickly. Role-based, engaging, simulation-paired training with immediate feedback is 10x more effective.

**Tailgating and physical security:** awareness training must include physical security — not holding doors for strangers, locking screens when leaving, not plugging in found USB drives, recognizing social engineering in person.

**Key insight:** The goal of security awareness training is not completing a training module — it's changing behavior. Measure phishing click rates and social engineering test results, not training completion. A 30-second phishing report from an employee is worth more than a completed training certificate.`,
    },
    {
      id: 1130,
      name: "Tabletop Exercises",
      desc: `**Tabletop exercise** — a discussion-based incident response simulation where stakeholders walk through a hypothetical security scenario to test IR plans, identify gaps, and build muscle memory without disrupting production systems.

**Format:** facilitator presents a realistic attack scenario in stages; participants discuss how they would respond at each stage ("what would you do if you saw these logs?", "who do you notify first?", "when would you consider shutting down the payment system?"). No actual systems are involved — discussion only.

**Typical participants:** CISO, SOC manager, incident response team, IT operations, legal counsel, communications/PR, executive leadership (for major incidents), HR (for insider threat scenarios).

**Common scenario types:**
- Ransomware attack (most common — every organization needs this scenario practiced)
- Insider threat / data theft by employee
- Third-party/supply chain compromise
- DDoS attack during peak business period (Black Friday for e-commerce)
- Data breach with regulatory notification obligations
- Business email compromise / wire fraud
- Cloud environment compromise

**Facilitation best practices:** base scenarios on real-world incidents in your industry (CISA advisories, news reports); inject complications as the exercise progresses ("the attacker has now encrypted backup servers too"); include decision points that expose gaps in policy or communication ("who has authority to take the website offline?").

**Outcomes:** gaps in IR playbooks; missing contacts or unclear escalation paths; tools the team doesn't know how to use under pressure; regulatory notification timeline misunderstandings; unclear decision authority.

**Key insight:** Tabletop exercises consistently reveal that the communication chain is the most common failure point — teams know the technical response but don't know who to notify when, or they find out that the notification list has phone numbers that are 3 years out of date.`,
    },
    {
      id: 1131,
      name: "SOAR (Security Orchestration, Automation & Response)",
      desc: `**SOAR (Security Orchestration, Automation and Response)** — a platform that automates repetitive security operations tasks (alert triage, threat intelligence enrichment, containment actions) and orchestrates responses across multiple security tools, enabling SOC teams to handle more alerts with fewer analysts.

**SOAR capabilities:**
- **Playbook automation:** codify IR processes as executable workflows. "When a phishing alert fires, automatically: extract all URLs from the email, check URLs against VirusTotal and URLVoid, look up the sender domain's age and reputation, and if all checks are malicious, automatically quarantine the email and notify the user's manager." A manual process that takes 30 minutes, automated in 30 seconds.
- **Alert enrichment:** automatically add context to alerts — IP reputation, user's recent logins, asset criticality, similar past incidents, WHOIS data — so analysts have a complete picture when they open a ticket
- **Case management:** centralized incident tracking; evidence collection; task assignment; audit trail
- **Integration hub:** connects SIEM, EDR, ticketing (Jira, ServiceNow), threat intelligence platforms, email security, firewall, IAM — coordinating actions across tools

**SOAR platforms:** Splunk SOAR (formerly Phantom), Microsoft Sentinel (built-in SOAR with Logic Apps), Palo Alto XSOAR, Google SecOps SOAR (formerly Chronicle SOAR), Swimlane.

**ROI of SOAR:** a well-implemented SOAR playbook for common alert types (malware detection, phishing) reduces analyst time per alert from 20-30 minutes to 2-3 minutes, increasing effective SOC capacity by 10x for those alert types.

**When not to automate:** don't automate high-stakes actions (blocking customer accounts, shutting down production systems) without human approval steps. Automation should handle enrichment and low-risk containment; humans should approve high-impact response actions.

**Key insight:** SOAR ROI comes from automating high-volume, low-complexity, well-understood alert types — not from trying to automate complex investigations. Start with the three most common alert types (phishing, malware detection, account compromise), automate those end-to-end, then expand.`,
    },
  ],
};

export default securityOperations;
