const philosophyPrinciples = {
  name: "Philosophy & Mental Models",
  icon: "◈",
  color: "#10B981",
  concepts: [
    {
      id: 159,
      name: "Fallacies of Distributed Computing",
      desc: "Eight assumptions programmers wrongly make: (1) The network is reliable. (2) Latency is zero. (3) Bandwidth is infinite. (4) The network is secure. (5) Topology doesn't change. (6) There is one administrator. (7) Transport cost is zero. (8) The network is homogeneous. Articulated by Peter Deutsch at Sun Microsystems. Every major distributed systems failure can be traced to violating one of these. Internalize them — they're the physics of distributed programming.",
    },
    {
      id: 160,
      name: "Conway's Law",
      desc: "'Organizations which design systems are constrained to produce designs which are copies of the communication structures of those organizations.' — Mel Conway, 1967. Your system architecture will mirror your org chart. A company with 4 teams ships a 4-component system. The inverse (Inverse Conway Maneuver): deliberately design your org structure to produce the architecture you want. Amazon's 'two-pizza teams' → microservices. Org design is system design.",
    },
    {
      id: 161,
      name: "Amdahl's Law",
      desc: "The speedup of a parallel program is limited by its sequential portion. If 20% of your code can't be parallelized, adding infinite cores gives max 5x speedup (1/0.2). In system design: if your DB is a sequential bottleneck (all writes go through one primary), adding more app servers gives diminishing returns. Find and eliminate sequential bottlenecks — they cap your scalability ceiling. Profile before you scale.",
    },
    {
      id: 162,
      name: "CAP Theorem Deep Dive",
      desc: "In a distributed system, during a network partition you must choose: Consistency (every read returns the most recent write) or Availability (every request gets a response, possibly stale). CP systems (HBase, ZooKeeper, etcd): return error or timeout rather than serve stale data. AP systems (Cassandra, DynamoDB, CouchDB): serve potentially stale data rather than fail. The real nuance: partition tolerance isn't optional in distributed systems — it's forced. You're always choosing C vs A during partitions.",
    },
    {
      id: 163,
      name: "PACELC Theorem",
      desc: "Extension of CAP by Daniel Abadi: even when there is no Partition, you must choose between latency (L) and consistency (C). PACELC: if Partition → choose A or C; Else → choose L or C. DynamoDB: PA/EL (available during partition, low latency otherwise). CockroachDB: PC/EC (consistent always, accepts higher latency). This is more practical than CAP alone because partitions are rare — your everyday trade-off is L vs C, not A vs C.",
    },
    {
      id: 164,
      name: "Unix Philosophy",
      desc: "Three principles by Doug McIlroy: (1) Write programs that do one thing and do it well. (2) Write programs that work together. (3) Write programs that handle text streams (universal interface). Applied to distributed systems: each service does one thing well, services compose via clean interfaces (APIs/events), and data flows between them. Microservices are Unix philosophy applied at the service level. Composability over monolithic completeness.",
    },
    {
      id: 165,
      name: "Postel's Law (Robustness Principle)",
      desc: "'Be conservative in what you send, liberal in what you accept.' — Jon Postel (TCP/IP pioneer). In system design: accept and tolerate unexpected input formats from clients (backward compatibility), but emit strictly well-formed outputs. APIs should gracefully handle missing fields, extra fields, and minor format variations. However, over-application breeds ambiguity — strict schema validation at boundaries (protobuf, JSON Schema) often beats extreme liberality.",
    },
    {
      id: 166,
      name: "KISS in Distributed Systems",
      desc: "Keep It Simple, Stupid — complexity is the enemy of reliability. Every additional component, protocol, or pattern adds failure modes, operational burden, and cognitive load. The most reliable distributed system is one you don't build — use a managed service. The second most reliable is the simplest one. Ask: 'Does this system need to be distributed at all?' Many systems that reach for Kafka and Cassandra day one could start with Postgres and a job queue for years.",
    },
    {
      id: 167,
      name: "YAGNI in System Design",
      desc: "You Aren't Gonna Need It — don't build for scale you don't have. Engineers notoriously over-engineer for hypothetical scale: 'What if we get 10M users?' when current traffic is 1,000 DAU. Premature scaling adds complexity that slows feature development. Design for 10x your current load, not 1000x. Amazon, Twitter, and Netflix all ran on a monolith at first. Migrate to microservices when monolith pain is real, not imagined.",
    },
    {
      id: 168,
      name: "Gall's Law",
      desc: "'A complex system that works is invariably found to have evolved from a simple system that worked.' — John Gall. You cannot design a working complex system from scratch. Start simple, let complexity emerge from real needs. Every successful large-scale system (Linux, TCP/IP, the web) began as a simple, working system that grew. Attempts to design complex systems ab initio fail. In system design: start with the simplest architecture that could work, then evolve.",
    },
    {
      id: 169,
      name: "Hyrum's Law",
      desc: "'With a sufficient number of users of an API, it does not matter what you promise in the contract: all observable behaviors of your system will be depended on by somebody.' — Hyrum Wright (Google). Even undocumented behaviors become de facto contracts once enough users depend on them. Implications: changing internal behavior breaks downstream users even if your documented API is unchanged. This is why Google changes to stdlib or AWS API behaviors cause widespread breakage.",
    },
    {
      id: 170,
      name: "Design Trade-off Frameworks",
      desc: "All system design is trade-off navigation. Common frameworks: (1) CAP: consistency vs availability vs partition tolerance. (2) SPACE: satisfaction, performance, activity, communication, efficiency. (3) Write vs read optimization (LSM vs B-tree). (4) Strong vs eventual consistency — choose based on business requirements, not instinct. (5) Latency vs throughput — optimize for the bottleneck your users actually feel. Always articulate the trade-off explicitly; hidden trade-offs become production incidents.",
    },
    {
      id: 171,
      name: "Two Hard Problems in CS",
      desc: "'There are only two hard things in Computer Science: cache invalidation and naming things.' — Phil Karlton. Cache invalidation: when you cache data, how do you know when it's stale? Write-through, write-behind, TTL, event-driven invalidation — each has trade-offs. Naming: names encode assumptions; bad names mislead for years. In distributed systems: add 'and distributed consensus' to the list. These aren't jokes — they represent genuinely unsolved engineering problems that cause most production failures.",
    },
    {
      id: 172,
      name: "Occam's Razor in System Design",
      desc: "Among competing solutions, prefer the simpler one. When choosing between a complex event-sourced, CQRS-based microservice architecture and a simple REST API + Postgres, choose the simpler one unless you have concrete evidence the simpler solution is insufficient. Complexity must justify itself with measurable benefits. In system design interviews: state the simple solution first, then explain what specific constraints would force a more complex design. Reviewers reward judgment over complexity.",
    },
  ],
};
export default philosophyPrinciples;
