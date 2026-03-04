const technicalDesign = {
  name: "Technical Design & Documentation",
  icon: "📐",
  color: "#f97316",
  concepts: [
    {
      id: 592,
      name: "Architecture Decision Records (ADRs)",
      desc: `**Architecture Decision Records (ADRs)** — short, structured documents that capture the context, decision, and consequences of a significant architectural choice. Introduced by Michael Nygard in 2011. An ADR answers: what was decided, why it was decided, and what the consequences (both positive and negative) are expected to be.

**Standard ADR format:**
- **Title:** a short, present-tense statement (e.g., "Use PostgreSQL for primary data storage")
- **Status:** Proposed → Accepted → Deprecated → Superseded
- **Context:** the situation that forces a decision; the forces at play
- **Decision:** the actual architectural decision
- **Consequences:** positive outcomes, negative consequences, and trade-offs accepted

**Why ADRs are valuable:** In six months, nobody remembers why the team chose Redis over Memcached, or why the API uses REST instead of GraphQL. Without ADRs, new team members re-litigate past decisions, or — worse — accidentally reverse them without understanding the original rationale.

**Where to store them:** In the repository, near the code they affect. A "/docs/adr/" directory, numbered sequentially. ADRs are immutable once accepted — don't edit old ADRs to reflect new reality; write a new ADR that supersedes the old one. Immutability preserves the historical record.

**What requires an ADR:** Not every code decision — that would be overwhelming. ADRs belong at architectural decision points: choosing a framework, defining a data model, selecting a communication protocol, establishing a deployment strategy, or making a reversibility trade-off.

**Key insight:** The most valuable part of an ADR isn't the decision — it's the context. The decision is usually obvious in hindsight; the context (what constraints existed, what alternatives were considered, what risks were accepted) is the part that disappears from team memory within months. Write the context with the same care as the decision.`,
    },
    {
      id: 593,
      name: "RFC Process",
      desc: `**RFC (Request for Comments)** — a lightweight proposal process for significant technical decisions, borrowed from the IETF's internet standards process. An engineer writes a document proposing a change, explaining the motivation and design, and circulates it for feedback before implementation begins. Popularized in engineering culture by Rust's governance model and adopted by many large engineering organizations.

**When to write an RFC:**
- A change that affects multiple teams or services
- A new framework, library, or infrastructure pattern the whole team will use
- A significant API change or new API
- Any decision with long-term architectural implications

**RFC structure:**
- **Motivation:** why is this needed? What problem does it solve?
- **Detailed design:** what is the proposed change, with enough specifics that it could be implemented
- **Drawbacks:** why should we NOT do this?
- **Alternatives:** what other approaches were considered and why were they rejected?
- **Unresolved questions:** what's still unknown?

**RFC as asynchronous design review:** The RFC process lets the team comment and respond at their own pace, without requiring a synchronous design meeting. Engineers in different time zones can participate fully. The document creates a written record of the decision process that's searchable and linkable.

**The distinction from design docs:** Design docs describe how something will be built (implementation plan). RFCs propose whether something should be built and what the high-level approach should be. Design docs follow RFCs for approved proposals.

**Key insight:** The RFC's "Drawbacks" and "Alternatives" sections are the most valuable parts to write and the most often skipped. Forcing yourself to articulate the strongest case against your own proposal is the most reliable way to find the holes in it — before the team does in a review.`,
    },
    {
      id: 594,
      name: "Technical Specification Writing",
      desc: `**Technical specification (tech spec / design doc)** — a written document that describes how a system, feature, or component will be implemented. More detailed than an RFC (which covers "whether" and "what"), a tech spec covers the "how": data models, API contracts, algorithms, state machines, failure modes.

**Why write specs before coding:**
- Forces you to think through the full system before writing any of it, discovering design problems cheaply
- Aligns the team and stakeholders before substantial work is committed
- Provides a review artifact that can be evaluated faster than code
- Documents implementation rationale for future maintainers

**Tech spec sections (common template):**
1. **Overview:** one paragraph on what this is and why we're building it
2. **Background / context:** what currently exists; why the current state is insufficient
3. **Goals and non-goals:** explicit about scope (non-goals are as important as goals)
4. **Proposed design:** data models, API contracts, algorithms, state transitions, sequence diagrams
5. **Alternative designs considered:** why this design was chosen over alternatives
6. **Operational considerations:** monitoring, deployment strategy, rollback plan, performance expectations
7. **Open questions:** unresolved issues; decisions still pending

**The spec-reality gap:** Specs are wrong at the point of writing — they're best guesses. The goal is not a perfect spec but a decision-making artifact that surfaces disagreements and risks early. Expect the implementation to deviate; update the spec to reflect significant deviations so it remains accurate documentation.

**Key insight:** The value of writing a tech spec is proportional to how much you think you understand the problem before writing. If you feel certain you understand it, you'll learn the most from writing the spec — because the act of precise specification always reveals assumptions that weren't actually agreed on.`,
    },
    {
      id: 595,
      name: "Design Reviews",
      desc: `**Design review** — a structured meeting or async process where an engineer presents a technical design to peers and stakeholders for feedback and approval before implementation. Distinct from code review (which reviews implemented changes) — design review catches architectural problems when they're cheapest to fix.

**What design review catches:**
- Missing edge cases and failure modes
- Conflicts with existing system architecture or contracts
- Security vulnerabilities introduced by the design
- Performance implications not considered
- Over-engineering or under-engineering for the use case
- Alignment gaps between business requirements and technical design

**Async vs. synchronous review:** For most organizations, async design review (circulating a written spec or RFC) is more efficient than synchronous design meetings. It allows reviewers to read at their own pace, give more considered feedback, and review across time zones. Reserve synchronous review for high-stakes, complex designs where live discussion accelerates convergence.

**Review roles:**
- **Author:** presents and defends the design; final decision-maker within their scope
- **Approvers:** stakeholders (tech lead, platform team, security team) whose approval is required
- **Reviewers:** anyone who can provide useful feedback; no approval authority

**Constructive review norms:** Comments should be categorized — blocking (must resolve before approval), non-blocking (important but doesn't block), nit (style). Blocking comments need clear rationale; preference-based blocking is expensive and should be challenged.

**Key insight:** Design reviews shift cost structure dramatically. A 2-hour review that prevents a 3-week misaligned implementation has a 10:1 ROI. The teams that skip design reviews are often the same teams that do the most rework — not because they're bad engineers, but because they find problems at the most expensive point.`,
    },
    {
      id: 596,
      name: "Tech Stack Selection",
      desc: `**Tech stack selection** — the decision of which programming languages, frameworks, databases, infrastructure platforms, and tools to use for a new system or significant component. One of the highest-leverage architectural decisions because it's hard to reverse and shapes team hiring, maintainability, and capability for years.

**Decision criteria:**
- **Fitness for purpose:** does the stack's performance, ecosystem, and capability match the system's requirements?
- **Team expertise:** the best stack for the problem is worthless if no one can use it effectively
- **Ecosystem maturity:** active maintenance, security patches, community size, library availability
- **Operational complexity:** how hard is it to deploy, monitor, and maintain?
- **Hiring market:** can you hire people who know this stack, or can you train them quickly?
- **Cost:** licensing, cloud pricing, tooling costs

**The "boring technology" principle (Dan McKinley):** Choose boring, well-understood technology for most problems. Each new technology is an "innovation token" — you have a limited number, and you should spend them where they genuinely differentiate. Boring technology has known failure modes, extensive documentation, and accumulated operational wisdom.

**When new tech is justified:** Genuine requirement that existing tools don't meet (streaming at Kafka's throughput requires Kafka); team expertise in a technology that would accelerate delivery significantly; technology that the industry is clearly converging on (resistance is costly long-term).

**The integration complexity trap:** Stacks with 15 specialized components (5 microservices + message queue + cache + multiple databases) are harder to maintain, debug, and onboard into than systems built on fewer, more general-purpose components. The cost of integration complexity compounds.

**Key insight:** The worst time to evaluate a technology is when you're excited about it. Evaluate it when you have a concrete requirement it might address, compare it to alternatives on that specific requirement, and time-box the evaluation. Excitement-driven stack selection is a leading cause of technical debt.`,
    },
    {
      id: 597,
      name: "API Design Principles",
      desc: `**API design** — the craft of creating interfaces (REST, GraphQL, gRPC, library APIs) that are intuitive to use, hard to misuse, consistent, and stable over time. A well-designed API reduces integration time, minimizes support burden, and enables clients to build with confidence.

**Principles of good API design:**
- **Consistency:** similar things should behave similarly. If one endpoint returns ISO 8601 dates, all endpoints should.
- **Minimal surface area:** expose only what's needed. Every endpoint and parameter is a commitment to maintain and support.
- **Predictability:** behavior should match reasonable expectations. No surprising side effects; resources named by what they represent, not what an implementation does.
- **Reversibility:** additions are backward-compatible; deletions and breaking changes require versioning
- **Fail clearly:** good error messages, specific error codes, actionable remediation. A 400 with "Invalid input" is useless; "field 'email' must be a valid email address" is useful.

**REST conventions:** Resources as nouns (not verbs), HTTP methods for semantics (GET = read, POST = create, PUT/PATCH = update, DELETE = delete), HTTP status codes used correctly, URL structure reflects resource hierarchy.

**The Principle of Least Astonishment:** An API should behave in ways that align with reasonable expectations of someone who understands the problem domain. Surprise in an API is a defect — even if the behavior is technically correct.

**API versioning strategies:** URL path versioning (/v1/users), HTTP header versioning (Accept: application/vnd.api.v2+json), query parameter versioning. URL versioning is most visible; header versioning is more "RESTful"; either beats no versioning.

**Key insight:** Public APIs are forever. The moment a client depends on a behavior — even an undocumented one — you own it. Be explicit about what is guaranteed behavior (supported) vs. implementation detail (may change). Treating the specification as the contract, not the implementation, is what makes APIs trustworthy.`,
    },
    {
      id: 598,
      name: "System Design Documents",
      desc: `**System design document** — a comprehensive specification for a new system or major subsystem that captures architecture, data flows, component interactions, API contracts, deployment topology, and operational considerations. Distinct from a feature spec (which covers one feature) — a system design doc defines a complete system boundary and its external-facing behavior.

**When to write one:** For greenfield systems, major platform components, or any system that multiple teams will depend on or integrate with. The investment threshold: if the system will require more than 2-3 months of engineering effort or will have 3+ external integrations.

**Key sections:**
- **System overview:** what problem this system solves; who uses it; usage patterns and scale requirements
- **Architecture diagram:** high-level component diagram with communication arrows and data flows
- **Component specifications:** each component, its responsibilities, and interfaces
- **Data model:** entity-relationship diagram or schema for the core data structures
- **API contracts:** endpoint specifications or service interface definitions
- **Non-functional requirements:** latency targets, availability SLOs, throughput requirements
- **Security model:** authentication, authorization, data sensitivity handling
- **Deployment and operations:** infrastructure, deployment strategy, monitoring requirements
- **Migration plan:** how to transition from current state to new system

**Living vs. snapshot documentation:** System design docs written once and never updated become misleading. Either commit to keeping them updated as the system evolves (expensive) or label them clearly as "design intent as of [date]" (honest but limited). A hybrid: keep the high-level architecture diagram current; treat detailed component specs as historical.

**Key insight:** The most common gap in system design documents is the operational section. Engineers write beautifully detailed data models and API specs, then mention monitoring with "we'll set up some alerts." Operational decisions — what you monitor, how you alert, how you debug, how you rollback — are as important as functional design. Production is where design meets reality.`,
    },
    {
      id: 599,
      name: "Proof of Concept (PoC)",
      desc: `**Proof of Concept (PoC)** — a minimal implementation created to demonstrate that a technical idea, approach, or integration is feasible before committing to a full build. Unlike a spike (research/exploration), a PoC produces a working demonstration, even if incomplete and throwaway.

**PoC vs Prototype vs MVP:**
- **PoC:** proves feasibility — "can this even be done?" Does it work at all?
- **Prototype:** proves design — "does this design work for the use case?" May be shown to users.
- **MVP:** proves product-market fit — "will people use this and find it valuable?" Must be production-quality enough for real users.

**When to build a PoC:**
- Integrating with an unfamiliar third-party API or service
- Evaluating a new machine learning model in your domain
- Testing whether a novel architecture (event sourcing, CQRS) supports your use cases
- Demonstrating technical feasibility to non-technical stakeholders

**The throwaway imperative:** A PoC is built to answer a question, not to form the foundation of production code. The constraints that make a PoC fast (no error handling, no tests, no security, hardcoded values) make it dangerous in production. The discipline is to actually throw it away and build properly — not to "just clean up the PoC."

**What to measure in a PoC:** Define success criteria before building — the hypothesis to be validated. "Does this API return responses under 100ms for our typical query?" is measurable. "Does this feel right?" is not. PoCs without success criteria become open-ended research with no exit condition.

**Key insight:** The most valuable output of a PoC is not the code — it's what you learn. A PoC that answers "no, this approach won't work" is a spectacular success: it cost two days to save two months. Document not just the conclusion but the specific blockers, limitations, or surprises encountered — this is institutional knowledge that outlives the throwaway code.`,
    },
    {
      id: 600,
      name: "Diagramming & System Visualization",
      desc: `**System diagramming** — creating visual representations of software architecture, data flows, deployment topologies, and component interactions. Diagrams communicate system structure faster than prose and are invaluable for onboarding, design reviews, and incident analysis.

**Diagram types:**
- **C4 Model (Simon Brown):** four levels — Context (system in its environment), Container (deployable units), Component (modules within containers), Code (class/function level). Use the level of detail appropriate to the audience and decision.
- **Sequence diagrams:** time-ordered interactions between components (ideal for request flows, API calls, async message processing)
- **Entity-Relationship (ER) diagrams:** database schema and relationships
- **Deployment diagrams:** infrastructure topology — servers, cloud services, networks
- **State machine diagrams:** valid states and valid transitions for entities with lifecycle

**Diagrams-as-code tools:** Mermaid, PlantUML, and Structurizr generate diagrams from text definitions. These live in the repository alongside code, are version-controlled, and can be reviewed in pull requests. Binary image files can't be meaningfully diffed; text-based diagrams can.

**The staleness problem:** Diagrams maintained separately from code rot rapidly. Solutions: diagrams-as-code in the repo; automated diagram generation from codebase analysis (dependency graphs, API maps); clear date-stamps on manually-drawn diagrams with ownership.

**Key insight:** The best diagram is the one that answers the question being asked with minimum cognitive load. Don't include everything in one diagram — separate the concerns by audience. A security architect needs a different diagram than an on-call engineer debugging a production incident. Audience-driven diagramming is a communication skill as important as the technical content.`,
    },
    {
      id: 601,
      name: "Build vs. Buy vs. Open Source",
      desc: `**Build vs. Buy vs. Open Source** — a fundamental architectural decision framework for evaluating whether to create capability in-house, purchase a commercial solution, or adopt an open-source solution. Each option has different cost structures, control levels, and risk profiles.

**Build:** maximum control, maximum cost. Full customization to exact requirements; no vendor dependency; the team understands the implementation deeply. Cost: full development and maintenance burden, no external innovation, internal expertise must be maintained indefinitely. Appropriate when: the capability is core competitive differentiation; no solution meets requirements; the team has deep domain expertise.

**Buy (SaaS/commercial):** minimum control, variable cost, fastest time to value. Vendor owns roadmap, security patches, scalability. Vendor lock-in is the primary risk. Appropriate when: the problem is not core to the business; the vendor's solution is significantly more mature; switching cost is manageable.

**Open Source:** high control, low cash cost (but real total cost). The team can inspect, modify, and extend the source. Active community provides innovation and security patches. Cost: integration work, upgrade management, support burden. Risk: project abandonment, license changes, security vulnerabilities. Appropriate when: a well-maintained OSS solution exists that meets requirements; the team has capacity to manage it.

**The "not core" test:** If you can't explain how this capability differentiates your product from competitors, it's probably not worth building. Auth, payments, email delivery, monitoring, logging — these are infrastructure, not differentiation. Buy or use open source for them; build what makes you unique.

**Key insight:** The true cost of building includes not just development time but the ongoing maintenance cost, the opportunity cost of what wasn't built instead, and the organizational knowledge required to keep it working. The true cost of buying includes not just the subscription but the integration work, the vendor risk, and the feature gaps. Total cost of ownership analysis — not just upfront cost — should drive this decision.`,
    },
  ],
};

export default technicalDesign;
