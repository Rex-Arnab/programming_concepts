const advancedEmerging = {
  name: "Advanced & Emerging Threats",
  icon: "⚠️",
  color: "#ec4899",
  concepts: [
    {
      id: 1132,
      name: "Zero-Day Vulnerabilities",
      desc: `**Zero-day vulnerability** — a security flaw in software or hardware that is unknown to the vendor and therefore has no official patch. "Zero days" refers to the zero days the vendor has had to fix it. Actively exploited zero-days are the most dangerous class of vulnerability — defenders have no patch to apply.

**Zero-day lifecycle:**
1. Researcher or attacker discovers a vulnerability unknown to the vendor
2. Exploitation begins (or the vulnerability is sold to a nation-state/broker)
3. Vendor learns of the vulnerability (via security researcher, disclosure, or detecting exploitation)
4. Vendor develops and releases a patch ("zero-day" becomes "n-day" — the clock starts)
5. Organizations apply the patch

**Zero-day market:** legitimate bug bounty (Google Project Zero, HackerOne, Zerodium — pay $100K-$2.5M for zero-days in popular software); government acquisition (NSA, GCHQ, Vulnerability Equities Process for US government); underground markets (dark web, criminal syndicates).

**Notable examples:** EternalBlue (NSA zero-day, leaked by Shadow Brokers, used in WannaCry ransomware, 200K+ victims); Stuxnet (US/Israel zero-day weapon against Iran nuclear centrifuges); Log4Shell (widely exploited within hours of disclosure).

**Defenses against zero-days:**
- Defense-in-depth: perimeter controls, network segmentation, EDR, anomaly detection
- Attack surface reduction: minimize software installed, disable unused features, use sandboxing
- Exploit mitigations: ASLR, DEP/NX, stack canaries, CFI — make exploitation harder even when a vulnerability exists
- Fast patching: once a zero-day is disclosed (becoming an n-day), attacker exploits increase dramatically — patch critical vulnerabilities within 24-72 hours

**Key insight:** Zero-day defense is not primarily about preventing zero-day exploitation — it's about detection and response when exploitation occurs. Assume sophisticated attackers have zero-days; focus on detecting malicious behavior (lateral movement, C2 beacons, data exfiltration) that follows the initial exploit.`,
    },
    {
      id: 1133,
      name: "Advanced Persistent Threats (APTs)",
      desc: `**APT (Advanced Persistent Threat)** — a sophisticated, organized threat actor (typically nation-state or state-sponsored) that conducts long-duration, targeted attacks against specific organizations, using advanced techniques and maintaining persistent access over extended periods.

**Characteristics:**
- **Advanced:** custom malware, zero-day exploits, sophisticated evasion techniques
- **Persistent:** months to years of access, operating quietly below detection thresholds
- **Targeted:** specific geopolitical or industrial espionage objectives — not opportunistic mass exploitation

**Notable APT groups (named by security vendors):**
- **APT29 "Cozy Bear" (Russia/SVR):** SolarWinds supply chain attack (2020), MS Exchange vulnerabilities; sophisticated OPSEC, custom malware families (MiniDuke, Hammertoss)
- **APT41 (China/MSS-affiliated):** dual-mission — espionage AND financially motivated (cryptocurrency theft, ransomware); unique among APTs
- **Lazarus Group (North Korea/RGB):** financially motivated — $1.5B+ stolen from cryptocurrency exchanges; Sony Pictures hack (2014); WannaCry ransomware attribution
- **Sandworm (Russia/GRU):** destructive attacks — NotPetya wiper ($10B in damage, 2017), Ukraine power grid attacks (2015, 2016), Olympic Destroyer

**APT tactics (ATT&CK alignment):**
- Initial access: spear phishing, supply chain compromise, trusted relationship exploitation
- Persistence: custom backdoors, living-off-the-land
- Lateral movement: Kerberoasting, credential dumping (Mimikatz), SMB shares
- Exfiltration: slow, low-volume exfiltration to avoid detection thresholds; encrypted channels; steganography

**Defense against APTs:** threat-intelligence-driven detection (subscribe to sector-specific feeds); assume breach posture; hunt for APT-specific TTPs; privileged access workstations for high-value targets; air-gapped systems for crown jewels.

**Key insight:** APTs don't use the same tools twice — they adapt to your defenses. TTP-based detection (behavior patterns) is far more durable than IOC-based detection (IPs, hashes), which APTs rotate after each operation.`,
    },
    {
      id: 1134,
      name: "Supply Chain Security",
      desc: `**Software supply chain attack** — compromising software by attacking the development pipeline, build systems, or dependencies used by the target, rather than attacking the target directly. The attacker poisons the well — affecting all downstream consumers of the compromised component.

**Major supply chain attacks:**
- **SolarWinds (2020):** attackers (APT29) compromised SolarWinds' build system; inserted SUNBURST backdoor into a signed Orion software update; affected 18,000 organizations including US government agencies, Microsoft, FireEye — the code passed code review, was signed by SolarWinds, and passed all security scans.
- **Log4Shell (2021):** a zero-day in log4j, present in an estimated 8% of all Maven package transitive dependency trees; affected thousands of companies running Java applications.
- **XZ Utils (2024):** a sophisticated 2-year social engineering attack by a threat actor ("Jia Tan") gaining maintainer trust, then inserting an SSH backdoor into xz utils just before it was widely deployed.
- **Codecov (2021):** CI/CD script compromised; exfiltrated environment variables (including AWS keys) from 29,000+ CI pipelines.

**Supply chain attack vectors:**
- **Dependency confusion:** publishing a malicious package to a public registry with the same name as a private package — package managers may prefer the public version
- **Typosquatting:** "colourama" (mimicking "colorama") on PyPI with malicious code
- **Maintainer compromise:** social engineering or credential theft of package maintainer accounts
- **Build system compromise:** injecting malicious code at compile time (SolarWinds)

**Defenses:** vendor security assessments; SBOM generation and monitoring; dependency pinning to known-good SHA hashes; private artifact mirrors; Sigstore for supply chain signing; reproducible builds; CI/CD pipeline hardening.

**Key insight:** Supply chain attacks are the threat model's biggest blind spot — most security controls assume attackers are external. A malicious update signed by a trusted vendor passes every perimeter control. Zero-trust even for your software supply chain is the only answer.`,
    },
    {
      id: 1135,
      name: "AI-Powered Security & AI Threats",
      desc: `**AI in security** — the application of machine learning and AI to both sides of the security equation: defenders using AI to detect threats faster and more accurately, while attackers use AI to create more sophisticated, personalized, and scalable attacks.

**Defensive AI applications:**
- **Behavioral anomaly detection:** ML models learn baseline user/entity behavior (time of login, volume of data accessed, applications used) and alert on deviations — UEBA (User and Entity Behavior Analytics). Effective for detecting insider threats and compromised accounts without known IOCs.
- **Malware classification:** ML models classify unknown executables as malicious or benign based on features (API calls, strings, control flow graphs) — finds novel malware families. EDR vendors (CrowdStrike, SentinelOne) use ML models in their detection engines.
- **Alert triage automation:** LLMs explain security alerts in plain language; automate preliminary investigation; reduce analyst cognitive load
- **Vulnerability discovery:** AI-assisted code review for security issues; LLM-powered SAST tools; fuzzing guided by ML (Honggfuzz, LibFuzzer with ML)

**Offensive AI threats:**
- **AI-generated phishing:** LLMs produce grammatically perfect, personalized spear phishing at scale — eliminates the typos and awkward language that previously helped humans detect phishing
- **Deepfake vishing:** voice cloning enables convincing impersonation of executives over phone; video deepfakes for video call fraud ($25M deepfake CFO fraud in Hong Kong, 2024)
- **AI-assisted vulnerability discovery:** LLMs (GPT-4, Claude) assist attackers in understanding code, finding vulnerabilities, and generating proof-of-concept exploits; lowering the skill floor for offensive security
- **Automated vulnerability exploitation:** AI agents that autonomously discover and exploit vulnerabilities end-to-end (demonstrated in research contexts)

**Key insight:** AI lowers the skill bar for attackers — sophisticated spear phishing, voice cloning, and vulnerability research now require less expertise. Defenders must use AI to scale detection proportionally. The arms race is accelerating; organizations that don't adopt AI-powered detection will fall further behind.`,
    },
    {
      id: 1136,
      name: "Ransomware & Extortion",
      desc: `**Ransomware** — malware that encrypts the victim's data and demands payment (typically cryptocurrency) for the decryption key. Modern ransomware attacks are sophisticated, targeted, and typically involve data exfiltration before encryption, enabling "double extortion" (pay to decrypt + pay to prevent publication).

**Modern ransomware-as-a-service (RaaS) model:** ransomware developers provide the malware and infrastructure; affiliates conduct the actual attacks and take 20-30% of the ransom. LockBit, ALPHV/BlackCat, Cl0p, Royal, Black Basta — all RaaS operations. Affiliates may be criminals in one country using ransomware from a different country.

**Attack timeline (typical):**
1. Initial access: phishing, exposed RDP (port 3389), VPN vulnerability
2. Persistence and privilege escalation: deploy RAT, harvest credentials, gain domain admin
3. Reconnaissance: map network, identify backup systems and crown jewels
4. Exfiltration: copy data to attacker's cloud storage (2-8 weeks of quiet exfiltration)
5. Ransomware deployment: encrypt everything simultaneously across all hosts in minutes
6. Ransom demand: note left on every system; leak site threatens to publish data if unpaid

**Average ransom payment (2023):** $740,000 median for large organizations; total ransomware payments exceeded $1.1 billion in 2023 (on-chain analysis).

**Defenses:**
- **Offline, tested backups:** the only reliable recovery mechanism. 3-2-1 rule (3 copies, 2 media types, 1 offsite). Test restoration quarterly.
- **MFA everywhere:** the majority of ransomware initial access is via compromised credentials + RDP
- **Endpoint detection:** EDR products detect ransomware behavior (rapid file encryption) and can halt the encryption process
- **Network segmentation:** limits blast radius — contains encryption to compromised segments

**Key insight:** Paying the ransom doesn't guarantee recovery — only 8% of organizations that paid got all their data back. The negotiation itself takes 1-2 weeks. The real solution is working offline backups tested before the attack. Every dollar spent on backup infrastructure has an ROI that becomes obvious at 3am when ransomware fires.`,
    },
    {
      id: 1137,
      name: "Hardware Security (TPM, HSM, Secure Enclave)",
      desc: `**Hardware security** — leveraging dedicated hardware components that provide cryptographic operations and secure key storage in tamper-resistant environments, offering stronger security guarantees than software-only solutions.

**TPM (Trusted Platform Module):** a dedicated security microcontroller soldered to the motherboard that provides: secure key generation and storage, measured boot (records hash of each boot component, enabling attestation that software hasn't been tampered with), platform attestation (prove to a remote verifier what software is running), and sealed storage (data decryptable only when the system is in a specific, measured state).

**BitLocker + TPM:** encrypts the drive; TPM releases the encryption key only if the boot sequence hasn't been tampered with (bootloader, OS, UEFI settings all match expected measurements). Without TPM, BitLocker requires a PIN or USB key on every boot.

**HSM (Hardware Security Module):** purpose-built, tamper-resistant hardware for high-volume cryptographic operations and secure key storage in data centers. Used for: CA private keys (PKI), payment card PIN verification (PCI HSM requirement), code signing infrastructure. Cloud HSMs: AWS CloudHSM, Google Cloud HSM, Azure Dedicated HSM — single-tenant, FIPS 140-2 Level 3 certified.

**Secure Enclave (Apple) / Trusted Execution Environment (ARM TrustZone):** isolated hardware execution environment within the main processor. Biometric data, payment credentials (Apple Pay), and other sensitive data are processed exclusively in the enclave; the main OS cannot access the enclave's memory. Even a fully compromised iOS cannot read the enclave's secrets.

**Intel SGX (Software Guard Extensions):** hardware-encrypted memory enclaves; code running in an SGX enclave is encrypted even from the operating system and hypervisor — relevant for confidential computing (processing sensitive data in untrusted cloud environments).

**Key insight:** Hardware security roots of trust (TPM, secure enclave, HSM) fundamentally change the threat model — they're the difference between "my security depends on the OS not being compromised" and "my security holds even if the OS is fully compromised."`,
    },
    {
      id: 1138,
      name: "Privacy-Enhancing Technologies (PETs)",
      desc: `**Privacy-Enhancing Technologies (PETs)** — cryptographic and data management techniques that enable computation and analytics on sensitive data while minimizing or eliminating the exposure of the underlying private data.

**Differential privacy:** adds carefully calibrated mathematical noise to query results so that no individual's data can be identified, while maintaining statistical accuracy for aggregate analysis. Apple uses it for keyboard usage statistics and emoji popularity. Google uses it for Chrome telemetry. "A dataset with differential privacy (epsilon ε) guarantees that any single person's participation changes the output probability by at most e^ε."

**Federated learning:** machine learning model training distributed across devices or organizations, where training data never leaves its origin. Each participant trains locally on their data, shares only model updates (gradients), and aggregates them centrally. Apple and Google use federated learning for keyboard prediction models. Banks use it for fraud detection across institutions without sharing customer data.

**Homomorphic encryption (HE):** computes on encrypted data without decrypting it — the result, when decrypted, matches what you'd get from computing on the plaintext. A hospital can outsource analytics on encrypted patient records to a cloud provider without ever decrypting them. Still computationally expensive (100-10,000x overhead vs plaintext) but improving rapidly (TFHE, CKKS schemes).

**Secure multi-party computation (SMPC):** multiple parties jointly compute a function over their private inputs without revealing those inputs to each other. Classic example: Yao's Millionaires' Problem (two millionaires learn who is richer without revealing their exact wealth).

**Private set intersection (PSI):** compute the intersection of two sets without either party learning elements outside the intersection. Used by Apple for CSAM detection (matching against known hash list without seeing the photo), contact discovery in messaging apps.

**Key insight:** PETs are moving from academic cryptography to production systems. When regulation (GDPR, CCPA, HIPAA) prevents sharing raw data for analytics or ML, PETs provide a path to getting analytical value from data while maintaining privacy — the "privacy by design" principle made technically concrete.`,
    },
    {
      id: 1139,
      name: "Smart Contract & Web3 Security",
      desc: `**Smart contract security** — protecting blockchain-based applications (DeFi protocols, NFT platforms, DAOs) from vulnerabilities in their Solidity/Rust code, where bugs result in irreversible loss of funds with no central authority to intervene.

**The immutability problem:** unlike traditional software, deployed smart contracts typically cannot be patched — a bug in production is permanent unless upgrade patterns (proxy contracts) were used. The consequences of a bug are immediate and often total loss of funds locked in the contract.

**Major smart contract vulnerability classes:**
- **Reentrancy:** attacker's malicious contract calls back into the victim contract before the first execution completes. Used in the DAO hack (2016, $60M ETH stolen). Prevention: checks-effects-interactions pattern; ReentrancyGuard modifier.
- **Integer overflow/underflow:** Solidity 0.8+ has built-in overflow checks; older contracts using SafeMath for protection.
- **Flash loan attacks:** uncollateralized loans of massive amounts within a single transaction, used to manipulate prices, drain liquidity pools, and exploit protocol logic. Cannot be prevented by requiring collateral — they're fully legitimate within their transaction.
- **Price oracle manipulation:** if a protocol uses a DEX spot price as an oracle, flash loans can manipulate it in the same transaction. Use Chainlink oracles or TWAP (Time-Weighted Average Price) to resist manipulation.
- **Access control issues:** missing "onlyOwner" or improper role checks on sensitive functions.

**Security tools:** Slither (static analyzer for Solidity), Mythril (symbolic execution), Foundry (testing framework with fuzz testing), Certora Prover (formal verification).

**Audit process:** before deployment, engage multiple reputable audit firms (Trail of Bits, OpenZeppelin, Consensys Diligence); run Slither and Mythril in CI; conduct bug bounty program post-audit; start with lower total value locked (TVL) and monitor.

**Key insight:** $3.8B was stolen from DeFi protocols in 2022 alone (Chainalysis). Smart contract security requires formal verification and multiple independent audits — not just testing. "Code is law" means a bug is not a bug, it's a feature that attackers will use.`,
    },
    {
      id: 1140,
      name: "Insider Threats",
      desc: `**Insider threat** — a security risk originating from within the organization: current or former employees, contractors, or business partners who misuse their authorized access to harm the organization, intentionally or unintentionally.

**Insider threat types:**
- **Malicious insider:** intentionally harms the organization — data theft before resignation, sabotage, fraud, selling access to external attackers. Motivations: financial gain, grievance, ideology, coercion.
- **Negligent insider:** accidental damage — clicking a phishing link, misconfiguring a system, sharing credentials, sending sensitive data to the wrong recipient. Responsible for 56% of insider incidents (Ponemon Institute).
- **Compromised insider:** an employee's account or device is taken over by an external attacker; the attacker operates with the employee's legitimate access.

**Warning signs:** large data downloads before resignation; accessing systems outside normal working hours; accessing data unrelated to their job function; repeated security policy violations; disgruntlement (performance issues, disputes, passed over for promotion).

**UEBA (User and Entity Behavior Analytics):** ML-based detection of insider threats by learning baseline behavior and alerting on deviations. "This user normally accesses 100 files per day; they accessed 10,000 files today" — likely data exfiltration before departure.

**Defenses:**
- Least privilege: employees only access data they need for current job function
- Data loss prevention (DLP): prevents large data exfiltration via email, USB, cloud upload
- Activity monitoring: privileged user monitoring (Privileged Access Management logs); DLP system
- Offboarding process: immediate revocation of all access when employment ends — on the same day, not a week later
- Culture: psychological safety reporting; anonymous tip line; manager training on warning signs

**Key insight:** The most dangerous insider threat is the trusted employee with broad access and legitimate reasons to move large amounts of data — a senior developer, DBA, or data analyst. Monitoring their activity is sensitive but necessary; the detection must be done consistently and without bias.`,
    },
    {
      id: 1141,
      name: "Security Chaos Engineering",
      desc: `**Security chaos engineering** — deliberately injecting failures and attack scenarios into production or staging environments to verify that security controls, detection capabilities, and incident response procedures actually work as expected, before real attackers test them.

**Inspired by resilience chaos engineering (Netflix's "Chaos Monkey"):** just as Netflix deliberately kills production services to verify that systems recover gracefully, security chaos engineering deliberately simulates attacks to verify that security systems detect and respond appropriately.

**Security chaos scenarios:**
- **Canary token injection:** plant honeypot credentials in code, configuration files, or data stores; any access triggers an alert. Verify the alert fires within expected time.
- **Detection validation:** simulate specific ATT&CK techniques (encoded PowerShell execution, credential dumping, port scanning from internal hosts) and verify SIEM alerts fire within SLA.
- **Backup recovery drills:** actually restore from backups and measure RTO/RPO — not just verify backup files exist.
- **SOC response simulation:** generate realistic alerts at 2am and verify on-call responds within SLA.
- **Red team "assumed breach" exercises:** assume an attacker has gained a foothold and test: how long until detected? What controls prevent lateral movement?

**Tools:**
- **Atomic Red Team (Red Canary):** library of small, portable tests that simulate ATT&CK techniques — run "T1059.001" to test PowerShell detection
- **Infection Monkey (Guardicore):** simulates lateral movement and exfiltration within your network; maps attack paths; validates network segmentation
- **Stratus Red Team (DataDog):** AWS/GCP/Azure attack simulation; tests cloud detection capabilities

**Running security chaos safely:**
- Pre-notify SOC and operations teams (or don't, to test real response — document the choice)
- Scope clearly: which systems, which techniques, time windows
- Rollback plan: procedures for cleaning up simulation artifacts
- Post-exercise review: compare expected vs actual detection; update runbooks

**Key insight:** "Our controls should detect that" is an assumption. Security chaos engineering converts assumptions into verified facts. The first time you run Atomic Red Team against your SIEM, you'll find at least one technique you thought was detected that isn't. Better to find out now than during a real incident.`,
    },
  ],
};

export default advancedEmerging;
