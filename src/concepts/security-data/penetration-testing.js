const penetrationTesting = {
  name: "Penetration Testing & Red Teaming",
  icon: "🔴",
  color: "#10b981",
  concepts: [
    {
      id: 1102,
      name: "Penetration Testing Methodology",
      desc: `**Penetration testing (pen test)** — an authorized, simulated attack on a system to identify security vulnerabilities before malicious actors can exploit them. A pen tester thinks and acts like an attacker, but with explicit permission and defined scope.

**Standard phases (PTES — Penetration Testing Execution Standard):**
1. **Pre-engagement:** scope definition, rules of engagement, legal authorization (get it in writing — "get out of jail" letter), success criteria
2. **Intelligence gathering:** passive and active reconnaissance; OSINT; network enumeration
3. **Threat modeling:** what are the highest-value targets? What attack paths exist?
4. **Vulnerability analysis:** identify vulnerabilities via scanning, manual testing, research
5. **Exploitation:** attempt to exploit identified vulnerabilities to demonstrate real-world impact
6. **Post-exploitation:** demonstrate the blast radius — privilege escalation, lateral movement, persistence
7. **Reporting:** document findings, evidence (screenshots, logs), severity, and remediation recommendations

**Types of engagements:**
- **Black box:** no prior knowledge of the system — simulates an external attacker
- **Grey box:** partial information (network diagrams, credentials for one role) — simulates a partially informed attacker
- **White box:** full information (source code, architecture diagrams, credentials) — most thorough; focuses on deep coverage

**Key insight:** A pen test is a point-in-time assessment, not continuous security. A clean pen test report means no vulnerabilities found with the specified scope in the time available — not that the system is secure. Continuous automated scanning + periodic pen tests is the right combination.`,
    },
    {
      id: 1103,
      name: "Reconnaissance & OSINT",
      desc: `**Reconnaissance** — the intelligence-gathering phase of an attack or assessment, collecting information about the target to map attack surface and identify vulnerabilities. OSINT (Open Source Intelligence) uses publicly available information.

**Passive reconnaissance (no target interaction):**
- **WHOIS:** domain registrant information, name servers, registration dates
- **DNS enumeration:** "dig", "host", "dnsx" — enumerate subdomains, MX records, SPF/DKIM records. Subdomain enumeration reveals forgotten services: "dev.company.com", "staging-api.company.com"
- **Certificate Transparency logs:** all TLS certificates logged publicly; "crt.sh" reveals all subdomains that have ever had a certificate — including internal and development systems
- **Shodan / Censys:** internet-wide scanners that index banners, certificates, and service information. Find exposed services, default credentials, vulnerable versions.
- **Google dorks:** advanced Google operators revealing exposed files, login panels, error messages: "site:target.com filetype:pdf", "site:target.com inurl:admin"
- **LinkedIn / job postings:** reveal technology stack ("5 years of experience with Spring Boot, AWS RDS, Kubernetes"), organizational structure, employee names for phishing

**Active reconnaissance (target interaction):**
- **Port scanning (nmap):** "nmap -sV -sC -oA scan target.com" — identify open ports, service versions, OS
- **Web crawling:** discover directories, endpoints, parameters
- **DNS zone transfer:** "dig axfr @nameserver domain.com" — if misconfigured, dumps all DNS records

**Key insight:** Most organizations don't know their own attack surface as well as a motivated attacker does. Certificate Transparency logs and Shodan often reveal forgotten external services (old dev servers, misconfigured cloud instances) that the organization doesn't know are exposed.`,
    },
    {
      id: 1104,
      name: "Vulnerability Scanning",
      desc: `**Vulnerability scanning** — automated discovery of known vulnerabilities in systems, applications, and network infrastructure by comparing observed configurations, versions, and behaviors against a database of known CVEs and security issues.

**Network vulnerability scanners:**
- **Nessus (Tenable):** industry-leading commercial scanner; 170,000+ plugins; agent-based and agentless modes; credentialed scans (SSH/WinRM access) provide much deeper results than unauthenticated scans
- **OpenVAS (Greenbone):** open-source Nessus alternative; solid coverage; community-updated plugin feed
- **Qualys:** SaaS-based; continuous scanning; excellent for enterprise asset management + vulnerability tracking

**Web application scanners:**
- **OWASP ZAP (Zed Attack Proxy):** open-source; active and passive scanning; API scanning; CI/CD integration for automated DAST
- **Burp Suite Pro:** the professional web app testing standard; active scanner; Burp Collaborator for out-of-band vulnerability detection; indispensable for manual web app testing

**Authenticated vs unauthenticated scans:** unauthenticated scans see what an external attacker sees (exposed services, version banners). Authenticated scans log into systems and test from the inside — 10x more findings, far fewer false positives. Prioritize credentialed scans for internal infrastructure.

**Scan frequency:** critical systems: continuous or weekly; internal infrastructure: monthly; external perimeter: continuous (or use attack surface management tools like Detectify, Censys Attack Surface Management).

**Key insight:** Vulnerability scanners generate many findings. The skill is prioritization: CVSS score alone is insufficient — combine with asset criticality, exploitability, exposure (internet-facing vs internal), and whether a public exploit exists. Focus on exploitable vulnerabilities on critical, exposed assets.`,
    },
    {
      id: 1105,
      name: "Exploitation Frameworks",
      desc: `**Exploitation framework** — a platform providing a collection of exploits, payloads, auxiliary modules, and post-exploitation capabilities, used by penetration testers to efficiently demonstrate the impact of vulnerabilities.

**Metasploit Framework:** the most widely used exploitation framework. Modules: exploits (target specific CVEs), payloads (meterpreter, shell, stager), auxiliary (scanners, brute-forcers, fuzzers), post-exploitation (privilege escalation, credential harvesting, pivoting). "msfconsole" interface; integrates with Nessus, Nexpose.

**Meterpreter:** an advanced, in-memory payload that never writes to disk; provides a rich post-exploitation shell — dump credentials, capture keystrokes, pivot through the network, escalate privileges.

**Core exploit database resources:** Exploit-DB (exploit archive), PacketStorm, SearchSploit (offline CLI search of Exploit-DB), NVD/CVE (vulnerability information).

**Custom exploitation:** for novel vulnerabilities (zero-days, custom application bugs), testers write custom exploits. Languages: Python (scripting, fuzzing), C (shellcode, kernel exploits), Ruby (Metasploit modules).

**Post-exploitation techniques:**
- **Privilege escalation:** Linux — SUID binaries, kernel exploits, misconfigured sudoers; Windows — unquoted service paths, weak service permissions, token impersonation
- **Credential harvesting:** Mimikatz (dump Windows credential hashes and plaintext passwords from LSASS); secretsdump.py (remote credential dumping)
- **Pivoting:** routing traffic through a compromised host to reach internal systems not directly accessible

**Ethical and legal context:** exploitation frameworks are legitimate security tools when used with explicit authorization. Using them against systems without permission is illegal. Certifications like OSCP (Offensive Security Certified Professional) train on responsible use.

**Key insight:** The goal of exploitation in a pen test is demonstrating business impact — showing the client what data an attacker could access, what systems they could control — not just listing vulnerabilities. A meterpreter session on an HR server showing employee salaries is more persuasive than a "critical" scanner finding.`,
    },
    {
      id: 1106,
      name: "Web Application Penetration Testing",
      desc: `**Web app penetration testing** — a targeted assessment of web applications to discover and exploit security vulnerabilities, typically following the OWASP Testing Guide and OWASP Top 10 as a structure.

**Burp Suite workflow:**
1. Configure browser to proxy through Burp Suite (typically 127.0.0.1:8080)
2. Browse the application normally — Burp captures all requests in the Proxy tab (passive mapping)
3. Use Spider/Crawl to discover additional endpoints
4. Send interesting requests to Repeater for manual manipulation
5. Use Intruder for fuzzing and automated parameter testing
6. Run active scanner for automated vulnerability detection

**Manual testing areas:**
- **Authentication testing:** password brute force, account lockout bypass, password reset flow, JWT manipulation, session fixation, OAuth flows
- **Authorization testing:** IDOR (change IDs in requests), privilege escalation (access admin endpoints as user), horizontal access (access other users' data)
- **Input validation:** all OWASP Top 10 injection types — SQL injection (SQLMap for automated testing), XSS (reflected, stored, DOM), command injection, path traversal
- **Business logic flaws:** price manipulation (negative quantity, price tampering), workflow bypass (skip payment step), race conditions (concurrent requests for limited resources)

**API testing:** modern applications expose REST or GraphQL APIs. GraphQL introspection reveals the full schema; test for excessive data exposure (API returns more fields than the UI displays), broken object-level authorization (IDOR in API), and mass assignment vulnerabilities.

**Key insight:** Automated scanners (OWASP ZAP, Burp active scan) find maybe 30% of real web app vulnerabilities. Business logic flaws, complex authorization issues, and chained vulnerabilities require manual testing by a skilled tester who understands how the application is supposed to work.`,
    },
    {
      id: 1107,
      name: "Red Team vs Blue Team vs Purple Team",
      desc: `**Red Team** — an adversarial security group that simulates realistic threat actors to test an organization's defenses, detection capabilities, and incident response. Goes beyond point-in-time pen testing to emulate sophisticated, persistent adversaries (APT simulation).

**Red team vs penetration test:**
- Pen test: find as many vulnerabilities as possible in defined scope; duration 1-4 weeks; focus on vulnerability discovery
- Red team: emulate a specific threat actor achieving a specific objective (steal IP, access CFO email, persist undetected for 60 days); findings are about detection gaps and business impact, not vulnerability count

**Red team techniques:** initial access via phishing, watering hole, or supply chain; C2 infrastructure (Cobalt Strike, Brute Ratel C4); living-off-the-land (using legitimate Windows tools like PowerShell, WMI, certutil to avoid detection); lateral movement; persistence; data exfiltration.

**Blue Team** — the defenders: SOC analysts, incident responders, security engineers. Monitor for threats, detect and investigate alerts, respond to incidents, harden the environment.

**Purple Team** — collaborative exercises where red and blue teams work together openly. Red team executes a technique; blue team checks if they detected it; both teams learn what works and what doesn't. More efficient than adversarial red-blue exercises for rapidly improving detection capabilities.

**TIBER-EU (Threat Intelligence-Based Ethical Red Teaming):** European Central Bank framework for red team assessments of financial institutions, using real threat intelligence to guide attack scenarios.

**Key insight:** A red team engagement that goes undetected for 2 weeks teaches you far more about your detection gaps than a report listing all your open vulnerabilities. The most important metric isn't what the red team found — it's how long it took the blue team to detect them, and whether they detected them at all.`,
    },
    {
      id: 1108,
      name: "Social Engineering & Phishing",
      desc: `**Social engineering** — manipulating people into taking actions or divulging information, exploiting human psychology rather than technical vulnerabilities. The most common initial access vector in real-world breaches: 82% of breaches involve a human element (Verizon DBIR 2022).

**Phishing types:**
- **Spear phishing:** highly targeted email crafted for a specific individual, using personal details (name, role, colleagues, recent events) to appear legitimate. Used by nation-state actors and financially motivated attackers. Open rates 2-5x higher than generic phishing.
- **Whaling:** spear phishing targeting executives ("CEO fraud" / "Business Email Compromise" — impersonate CEO to request wire transfer to attacker account)
- **Vishing (voice phishing):** phone calls impersonating IT support, banks, or government agencies; very effective with context from LinkedIn OSINT
- **Smishing:** SMS phishing — "Your package is delayed, click here to reschedule delivery"
- **Pretexting:** creating a fabricated scenario (an IT technician who needs your password to fix an issue)

**Phishing simulation tools:** GoPhish (open-source), Proofpoint Security Awareness, KnowBe4 — send controlled phishing campaigns to employees, track who clicks, follow up with targeted training.

**Technical phishing defenses:**
- **Email authentication:** SPF (authorized senders), DKIM (signed emails), DMARC (policy for handling failures) — prevent spoofing of your domain
- **Anti-phishing filters:** Microsoft Defender for Office 365 (Safe Links, Safe Attachments), Proofpoint, Mimecast — URL rewriting, attachment sandboxing
- **MFA everywhere:** phishing steals credentials; MFA prevents their use (though MFA phishing kits like EvilginX can relay MFA codes in real time — FIDO2 hardware keys are phishing-proof)

**Key insight:** No technical control defeats a well-crafted spear phishing email delivered to an employee's personal email, viewed on their personal phone. Security awareness training + phishing-resistant MFA + quick detection-and-response is the realistic defense posture.`,
    },
    {
      id: 1109,
      name: "Privilege Escalation Techniques",
      desc: `**Privilege escalation** — an attacker's technique to gain higher-level permissions than initially obtained, moving from a low-privilege foothold to administrative or root access on a system or network.

**Linux privilege escalation:**
- **SUID/SGID binaries:** files with the SUID bit run as their owner (root). Misconfigured binaries: "find / -perm -4000 -type f" reveals SUID files. GTFOBins documents how to abuse legitimate SUID binaries (find, vim, less, etc.) to escape to root.
- **Writable cron jobs:** if root's cron job runs a script that a low-privilege user can write to, they can inject commands executed as root
- **Weak sudo configuration:** "sudo -l" shows what the user can run as root. Misconfigured entries like "(ALL) NOPASSWD: /usr/bin/vim" allow spawning a root shell from vim
- **Kernel exploits:** unpatched kernels with known exploits (Dirty COW, DirtyCred); use "uname -r" to identify kernel version; check against exploit databases
- **Writable /etc/passwd:** if writable, add a root-level user directly

**Windows privilege escalation:**
- **Unquoted service paths:** Windows searches each path component for the executable; "C:\Program Files\My App\service.exe" → Windows first tries "C:\Program.exe" — if writable by low-privilege users, plant a binary there
- **Weak service permissions:** "accesschk.exe -ucqv MyService" shows service permissions; a service modifiable by non-admins can be changed to run an attacker's binary as SYSTEM
- **AlwaysInstallElevated:** if enabled, MSI packages run with SYSTEM privileges regardless of installer's privilege level

**Mimikatz:** dumps Windows plaintext passwords, NTLM hashes, and Kerberos tickets from LSASS memory. Used for pass-the-hash, pass-the-ticket, and credential reuse across systems.

**Key insight:** Privilege escalation is rarely a single magic command — it's methodical enumeration of the local system (users, services, file permissions, scheduled tasks, network config) to find the weakest link. LinPEAS and WinPEAS automate this enumeration.`,
    },
    {
      id: 1110,
      name: "Bug Bounty Programs",
      desc: `**Bug bounty program** — a crowdsourced vulnerability disclosure program where organizations invite external security researchers to find and responsibly disclose security vulnerabilities, in exchange for monetary rewards (bounties) and recognition.

**Platforms:** HackerOne, Bugcrowd, Intigriti, Synack (vetted researcher community for higher-sensitivity targets). Companies also run private programs (invitation-only) before going public.

**Program structure:**
- **Scope:** defines which targets are in-scope (specific domains, IP ranges, mobile apps) and out-of-scope (third-party services, social engineering, physical attacks). Testing out-of-scope assets is grounds for program disqualification.
- **Severity tiers:** Critical (P1, $5,000-$250,000+), High (P2, $1,000-$10,000), Medium (P3, $250-$2,000), Low (P4, $50-$500), Informational (no bounty)
- **Responsible disclosure:** researcher reports to the company privately; company triages and patches; researcher can disclose publicly after a fix is deployed (typically 90 days)

**Top bug bounty payouts:** Google paid $605,000 for a Pixel 6 full chain exploit; Apple paid $500,000 for an iCloud zero-click exploit; Meta paid $160,000 for an Instagram RCE; Shopify paid $1M+ total per year.

**Metrics that attract good researchers:** fast triage times, clear communication, fair and consistent severity ratings, on-time payment, public hall of fame. Programs with a reputation for disputing valid findings or slow payment lose researchers to competitors.

**From researcher perspective:** start with domains that have broad scope; test login/auth flows (IDOR, broken auth), upload functionality (file inclusion, XXE), and APIs (BOLA, broken function-level authorization). Duplicate submissions are common — move to underexplored features.

**Key insight:** Bug bounty programs complement internal security testing but don't replace it. They provide continuous external coverage from diverse researchers but are not SLA-bound, don't cover all attack scenarios, and shouldn't be the primary source of security testing for critical systems.`,
    },
    {
      id: 1111,
      name: "Lateral Movement & Post-Exploitation",
      desc: `**Lateral movement** — an attacker's techniques for progressively moving through a network after an initial foothold, accessing additional systems and privileges to reach the ultimate objective (data, control systems, domain admin).

**Common lateral movement techniques:**
- **Pass-the-Hash (PtH):** capture NTLM hash from one machine (via Mimikatz); use it to authenticate to other machines without knowing the plaintext password. "evil-winrm -i target -u admin -H <hash>"
- **Pass-the-Ticket (PtT):** steal a Kerberos ticket (TGT or service ticket); use it to authenticate to services as that user. Golden ticket attack: forge a TGT using the krbtgt hash — valid for 10 years, works even after password change.
- **Remote service exploitation:** use harvested credentials or existing vulnerabilities to access other hosts (SMB, WMI, WinRM, RDP, SSH)
- **Living off the Land (LotL):** use legitimate tools already present on the system (PowerShell, WMI, certutil, bitsadmin, PsExec) to avoid triggering AV/EDR. Harder to detect than custom malware.

**Pivoting:** routing traffic through a compromised host to access network segments not directly reachable. Tools: sshuttle (VPN over SSH), chisel (HTTP tunnel), Metasploit route/portfwd.

**BloodHound:** Active Directory attack path analysis tool. Collects data from AD (SharpHound collector); creates a graph of relationships between users, groups, GPOs, and computers; identifies the shortest privilege escalation path to Domain Admin. Indispensable for red teams and Blue teams defending AD.

**Detection:** lateral movement is most detectable at: unusual authentication (a service account logging into workstations), unusual network connections between hosts that don't normally communicate, unexpected use of admin tools (PsExec, WMI remotely executed), anomalous Kerberos ticket requests.

**Key insight:** Lateral movement prevention focuses on reducing the blast radius of initial compromise — network segmentation, just-in-time admin access, unique local admin passwords (LAPS), and disabling NTLM where possible. An attacker who can't move laterally is contained to the initial foothold.`,
    },
  ],
};

export default penetrationTesting;
