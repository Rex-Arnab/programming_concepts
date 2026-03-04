# Concept Expansion Progress

Each concept needs its one-liner `desc` expanded to a detailed markdown explanation.

**Workflow:** Tell Claude: "Expand Marketing > Fundamentals > [Concept Name]" — one concept per session.

---

## Databases (128 concepts) — `Databases_concepts.jsx` ✓ COMPLETE

All 128 concepts written with rich descriptions across 12 subcategories (IDs 908–1035).
Subcategories: Database Fundamentals (ACID, BASE, CAP, PACELC, Consistency Models, Isolation Levels, Indexing, Keys, Normalization, Denormalization), SQL & Relational (Relational Model, SQL Fundamentals, JOINs, Subqueries/CTEs, Window Functions, Stored Procedures, Views/Materialized Views, Triggers, PostgreSQL, MySQL, Schema Migrations, Full-Text Search), NoSQL (Why NoSQL, MongoDB, Redis, Cassandra, Neo4j, Time-Series DBs, Elasticsearch, Vector Databases, DynamoDB, NoSQL Modeling, SQL vs NoSQL, Multi-model), NewSQL & Distributed (NewSQL, CockroachDB, Google Spanner, Raft/Paxos, 2PC, Distributed Transactions, TiDB, YugabyteDB, GSI, HTAP, Geo-Distribution), Data Modeling (ER Modeling, Normal Forms, Star Schema, Snowflake Schema, SCDs, JSON/JSONB, Event Sourcing, Sharding Strategies, Multi-Tenancy, Polymorphic Associations), Query Performance (Index Types, EXPLAIN ANALYZE, N+1 Problem, Partitioning, Connection Pooling, Read Replicas, Covering Indexes, VACUUM/Bloat, Slow Query Analysis, Query Hints), Data Engineering (Data Engineering, ETL vs ELT, Pipeline Architecture, Apache Airflow, dbt, CDC, Stream vs Batch, Data Quality, Data Lineage, Metadata Management, Data Contracts, Reverse ETL), Data Warehousing & OLAP (OLAP vs OLTP, Kimball/Inmon, Snowflake DW, BigQuery, Redshift, Columnar Storage, Lakehouse, OLAP Cubes, Data Marts, MPP), Big Data & Streaming (Big Data 3Vs, Hadoop/HDFS, MapReduce, Apache Spark, Apache Kafka, Apache Flink, Lambda Architecture, Kappa Architecture, Delta Lake/Iceberg, Stream Processing, Data Lake, Apache Hive), Data Science & Analytics (Data Science, EDA, Feature Engineering, Statistical Fundamentals, Pandas/DataFrames, SQL for Analytics, BI Tools, A/B Testing, ML Feature Stores, Analytical Engineering), Database Operations (Backup/Recovery, Replication, HA/Failover, Zero-Downtime Migrations, Monitoring, Lock Contention/Deadlocks, PITR, RLS, Encryption, Database as Code), Advanced & Emerging (LSM-Tree vs B-Tree, WAL, MVCC, Serverless Databases, DuckDB, Vector Search at Scale, DB Proxy/Middleware, ClickHouse, TimescaleDB, AI/ML in Databases).

---

## Networking (114 concepts) — `Networking_concepts.jsx` ✓ COMPLETE

All 114 concepts written with rich descriptions across 11 subcategories (IDs 794–907).
Subcategories: Networking Fundamentals (OSI Model, TCP/IP Model, IPv4/IPv6, Subnetting/CIDR, MAC/ARP, Topologies, Bandwidth/Latency, Packets/Encapsulation, Hub/Switch/Router, DHCP, NAT, Ports/Sockets), Transport Layer & TCP/IP (TCP, UDP, Three-way Handshake, Flow Control, Congestion Control, QUIC, TLS/SSL, Connection States, TCP Keep-Alive, Socket Programming), Application Layer Protocols (HTTP/1.1, HTTP/2, HTTP/3, HTTP Status Codes, DNS Overview, DNS Record Types, SMTP/IMAP, WebSockets, gRPC, MQTT, SSH, WebRTC), DNS Deep Dive (DNS Hierarchy, DNS Resolution/Caching, DNSSEC, GeoDNS, DNS over HTTPS, DNS Load Balancing, Split-Horizon DNS, DNS Attacks, Anycast/DNS, Service Discovery), Routing & Switching (IP Routing, Static/Dynamic Routing, BGP, OSPF, VLANs, STP, MPLS, SDN, Advanced NAT, ECMP), Network Security (Firewalls, VPN, Zero Trust, DDoS Mitigation, IDS/IPS, Micro-segmentation, mTLS, SNMP/Monitoring, Packet Capture, NAC), CDN & Edge (What is CDN, CDN Caching, Edge Computing, CDN Security/WAF, Image/Video Optimization, Cache Invalidation, Multi-CDN, CDN Metrics, Origin Shield, Anycast Routing), Load Balancing & Traffic Management (LB Fundamentals, L4 vs L7, Reverse Proxy, HAProxy, Service Mesh, Rate Limiting, GSLB, QoS, Health Checks/Circuit Breaker, Sticky Sessions), Wireless & Modern Networks (Wi-Fi 802.11, 4G/5G, SD-WAN, VXLAN/Overlays, IoT Networking, NFV, eBPF Networking, 5G Architecture, NTP, STUN/TURN/ICE), Network Operations (Troubleshooting Methodology, Performance Diagnostics, BGP Operations, Network Automation, IaC for Networking, Network Documentation, IXPs, Peering/Transit, Capacity Planning, RPKI/BGP Security), Advanced & Emerging (IPv6 Transition, DoH vs DoT, Network Observability, P4, QUIC Deep Dive, Segment Routing, Network Slicing, eBPF for Networking, HTTP/3 Performance, Quantum Networking).

---

## Design & UX (116 concepts) — `Design_UX_concepts.jsx` ✓ COMPLETE

All 116 concepts written with rich descriptions across 11 subcategories (IDs 678–793).
Subcategories: UX Foundations & Principles (UX vs UI, User-Centered Design, Design Thinking, Hick's Law, Fitts's Law, Gestalt, Jakob's Law, Mental Models, Cognitive Load), UI Design Fundamentals (Visual Hierarchy, Typography, Color Theory, Whitespace, Grid Systems, Iconography, Contrast, Responsive Design, Dark Mode, Microinteractions, Affordance, Motion), Design Systems (Design Tokens, Atomic Design, Component Libraries, Style Guides, Governance, Versioning, Handoff, Storybook, Figma Architecture, Accessibility in Systems, Multi-Brand Theming), Information Architecture (IA, Navigation Models, Information Scent, Card Sorting, Tree Testing, Sitemaps, Taxonomy, Search, Progressive Disclosure, Content Strategy), User Research & Discovery (Interviews, Usability Testing, Contextual Inquiry, Surveys, Personas, JTBD, Empathy Mapping, Journey Mapping, Affinity Mapping, A/B Testing, Analytics, Synthesis), Interaction Design (IxD Fundamentals, Feedback, Error Prevention, Form Design, Loading States, Empty States, Onboarding, UI States, Gesture Design, Undo), Accessibility & Inclusive Design (WCAG, ARIA, Keyboard Navigation, Screen Readers, Color Accessibility, Motor, Cognitive, Inclusive Design, Testing, Business Case), Human-Computer Interaction (HCI History, Gulf of Execution/Evaluation, GOMS, Direct Manipulation, Distributed Cognition, Input Modalities, Attention/Flow, Tangible Interaction, Multisensory Design, Adaptive Interfaces), Design Tooling & Workflow (Figma, Wireframing, Handoff, Version Control, DesignOps, Critique, Asset Optimization, Design-Eng Collaboration, Code Prototyping, Documentation), Mobile & Responsive UX (Mobile-First, Thumb Zone, Touch Targets, iOS HIG, Material Design, Responsive vs Adaptive, Breakpoints, Mobile Navigation, Offline UX, App Store UX), Advanced & Emerging UX (VUI, Conversational UI, AR/VR Spatial UX, AI-Powered UX, Dark Patterns, Emotional Design, Service Design, Zero UI, Developer Tools UX, Systems Thinking).

---

## Engineering Process & Leadership (130 concepts) — `Engineering_Process_Leadership_concepts.jsx` ✓ COMPLETE

All 130 concepts written with rich descriptions across 12 subcategories (IDs 548–677).
Subcategories: Engineering Fundamentals & Mindset (SOLID, DRY, Conway's Law, Technical Debt, YAGNI), Software Development Lifecycle (SDLC, Requirements, Prototyping, Waterfall, CI/CD, Release Management), Agile & Lean Methods (Agile Manifesto, Scrum, Kanban, Lean, Sprint ceremonies, Definition of Done, Shape Up), Engineering Practices (TDD, Pair Programming, Trunk-Based Dev, Feature Flags, CI culture, Mob Programming, XP), Technical Design & Documentation (ADRs, RFC process, Tech Specs, Design Reviews, Tech Stack Selection, API Design, Build vs Buy), Code Quality & Standards (Clean Code, Code Smells, Linting, Code Coverage, Technical Debt, Coding Standards, DORA Metrics, Security Shift Left), Technical Leadership (Staff/Principal/Tech Lead/Architect roles, Technical Vision, Influence Without Authority, Technical Roadmap, Mentoring, Technical Interviewing), Engineering Management (EM Role, IC vs Manager Track, 1:1s, Performance Reviews, Career Ladders, Hiring, Onboarding, Team Topologies, Delegation, Managing Up), Team Dynamics & Communication (Psychological Safety, Feedback Culture, Blameless Culture, Async vs Sync, Remote Teams, Knowledge Sharing, Conflict Resolution, Cross-Functional), Incident Management & Reliability Culture (Incident Process, On-Call, SLOs/SLAs/SLIs, Postmortems, Runbooks, MTTD/MTTR, Chaos Engineering, Error Budgets), Developer Experience & Productivity (DX, Flow State, Cognitive Load, SPACE Framework, Inner Development Loop, Platform Engineering, Developer Tooling, Developer Onboarding), Engineering Strategy & Culture (Engineering Strategy, Technology Radar, Technical Due Diligence, Build vs Buy vs Partner, Engineering OKRs, Innovation Culture, Long-term Trade-offs, Open Source Strategy, Org Design, Technical Governance, Engineering Philosophy).

---

## Analytics & Conversion (114 concepts) — `Analytics_Conversion_concepts.jsx` ✓ COMPLETE

All 114 concepts written with rich descriptions across 11 subcategories (IDs 434–547).
Subcategories: Analytics Foundations, Web Analytics (GA4, GTM, Sessions, UTM, Heatmaps), Product Analytics (Amplitude/Mixpanel, Funnels, Retention, DAU/MAU, PLG), Conversion Rate Optimization (CRO methodology, Landing pages, CTA, Forms, Checkout, Pricing), A/B Testing & Experimentation (Stats significance, Sample size, Bayesian, Bandit algorithms), Attribution & Marketing Analytics (Attribution models, MMM, Incrementality, UTM, Revenue analytics), Data Infrastructure & CDPs (CDP, Data warehouse, dbt, Segment, Server-side tracking, Reverse ETL), Customer Analytics (Segmentation, RFM, Churn prediction, Health score, VoC, Win/loss), Privacy & Analytics Compliance (GDPR, CMP, Cookieless, ATT, CCPA), E-commerce Analytics (Funnels, AOV, Cart abandonment, Merchandising, Mobile commerce), Advanced & AI Analytics (Predictive, AI-powered, Causal inference, Anomaly detection, Personalization).

---

## Cross-Platform Mobile (138 concepts) — `CrossPlatform_Mobile_concepts.jsx` ✓ COMPLETE

All 138 concepts written with rich descriptions across 14 subcategories (IDs 296–433).
Subcategories: Foundations & Core Concepts, React Native, Flutter & Dart, Other Frameworks (Ionic, KMM, MAUI, NativeScript, Tauri), UI & Design Systems, Navigation & Routing, State Management, Native APIs & Device Features, Performance & Optimization, Networking & Data Persistence, Testing & Quality, Deployment & App Stores, Architecture & Patterns, Advanced & Emerging (On-device ML, AR, Skia, Impeller, i18n, Wearables, CarPlay, Security).

---

## Automation (102 concepts) — `Automation_concepts.jsx` ✓ COMPLETE

All 102 concepts written with rich descriptions across 10 subcategories (IDs 194–295).
Subcategories: Foundations, Workflow Automation (n8n, Zapier, Make), Browser & Web Automation (Selenium, Playwright), RPA (UiPath, AA, Blue Prism), Task Scheduling (Airflow, Prefect, Temporal), Script & Desktop, API & Event-Driven, AI-Powered (LangChain, CrewAI, Computer Use), Test Automation, Patterns & Best Practices.

---

## Marketing (150 concepts) — `Marketing_conepts.jsx`

### Fundamentals (14) ✓
- [x] 01 — Marketing Mix (4Ps)
- [x] 02 — Target Market
- [x] 03 — Market Segmentation
- [x] 04 — Positioning
- [x] 05 — Unique Value Proposition (UVP)
- [x] 06 — Brand Identity
- [x] 07 — Brand Equity
- [x] 08 — Brand Awareness
- [x] 09 — Competitive Analysis
- [x] 10 — SWOT Analysis
- [x] 11 — Go-to-Market Strategy (GTM)
- [x] 12 — Product-Market Fit
- [x] 13 — Total Addressable Market (TAM/SAM/SOM)
- [x] 14 — Market Penetration vs Market Development

### Other categories
- [x] Digital Marketing (15)
- [ ] Content & SEO (14)
- [x] Funnels & Customer Journey (12)
- [ ] Analytics & Metrics (16)
- [x] Growth & Acquisition (11)
- [x] Pricing & Revenue (10)
- [ ] Branding & Psychology (11)
- [x] Email & Automation (10)
- [ ] Social Media & Community (8)
- [x] Strategy & Planning (13)
- [ ] Emerging & Advanced (15)

---

## Frontend (180 concepts) — `Frontend_concepts.jsx`

- [ ] HTML & Semantics
- [ ] CSS & Styling
- [ ] JavaScript Core
- [ ] TypeScript
- [ ] Frameworks & Libraries
- [ ] State Management
- [ ] Performance
- [ ] Rendering & Architecture
- [ ] Tooling & Build
- [ ] Routing & Data Fetching
- [ ] Accessibility & UX
- [ ] Browser APIs & Web Platform
- [ ] Testing (Frontend-Specific)
- [ ] Advanced & Emerging

---

## Backend (175 concepts) — `Backend_concepts.jsx`

- [ ] Core Fundamentals
- [ ] Languages & Runtimes
- [ ] APIs & Communication
- [ ] Databases & Storage
- [ ] Data Modeling & Access
- [ ] Authentication & Security
- [ ] Caching
- [ ] Messaging & Async Processing
- [ ] Microservices & Architecture
- [ ] DevOps & Operations
- [ ] Scalability & Performance
- [ ] Reliability & Resilience
- [ ] Advanced & Emerging

---

## AI Concepts (180 concepts) — `Ai_Concepts.jsx`

- [ ] Foundations
- [ ] Classical ML Algorithms
- [ ] Deep Learning Architectures
- [ ] Large Language Models (LLMs)
- [ ] RAG & Knowledge Systems
- [ ] AI Agents & Tool Use
- [ ] Computer Vision
- [ ] NLP & Speech
- [ ] Model Optimization & Deployment
- [ ] MLOps & Infrastructure
- [ ] AI Safety & Ethics
- [ ] Evaluation & Metrics
- [ ] Building AI Applications
- [ ] Advanced & Frontier

---

## DevOps (165 concepts) — `Devops_conepts.jsx`

- [ ] Core Principles
- [ ] Version Control & Collaboration
- [ ] CI/CD Pipelines
- [ ] Containers & Orchestration
- [ ] Cloud & Infrastructure
- [ ] Infrastructure as Code
- [ ] Monitoring & Observability
- [ ] Deployment Strategies
- [ ] Security (DevSecOps)
- [ ] Testing
- [ ] Networking & Service Discovery
- [ ] Reliability & SRE
- [ ] Advanced & Emerging

---

## System Design (120 concepts) — `System_design_concepts.jsx`

- [ ] Fundamentals
- [ ] Networking & Communication
- [ ] Data & Databases
- [ ] Caching
- [ ] Load Balancing & Proxies
- [ ] Architecture Patterns
- [ ] Messaging & Streaming
- [ ] Security & Auth
- [ ] Scalability Patterns
- [ ] Reliability & Resilience
- [ ] Observability & Operations
- [ ] Advanced & Distributed Systems

---

## Testing (175 concepts) — `Testing_concepts.jsx`

- [ ] Fundamentals
- [ ] Testing Levels
- [ ] Testing Types — Functional
- [ ] Testing Types — Non-Functional
- [ ] Security Testing
- [ ] Test Automation
- [ ] UI & Frontend Testing
- [ ] API & Backend Testing
- [ ] Mobile Testing
- [ ] Specialized Testing
- [ ] Test Design Techniques
- [ ] CI/CD & DevOps Testing
- [ ] Practices & Methodologies

---

