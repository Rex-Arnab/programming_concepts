const advancedDistributed = {
  name: "Advanced & Distributed Systems",
  icon: "✦",
  color: "#A29BFE",
  concepts: [
    { id: 107, name: "Consensus Algorithms (Raft, Paxos)", desc: "Protocols for nodes to agree on state in distributed systems. Foundation for leader election and replication." },
    { id: 108, name: "Distributed Locking", desc: "Coordinating access to shared resources across nodes (Redlock, ZooKeeper). Prevents race conditions." },
    { id: 109, name: "Gossip Protocol", desc: "Nodes share information peer-to-peer like rumors. Eventually all nodes converge. Used in Cassandra." },
    { id: 110, name: "Bloom Filters", desc: "Probabilistic data structure for set membership. Can say 'definitely not in set' or 'probably in set'. Space-efficient." },
    { id: 111, name: "Merkle Trees", desc: "Hash tree for efficient data verification. Detect inconsistencies between replicas. Used in blockchain and DBs." },
    { id: 112, name: "Leader Election", desc: "Selecting one node to coordinate tasks. Handles leader failure via timeouts and re-election." },
    { id: 113, name: "Quorum", desc: "Minimum nodes that must agree for an operation to succeed. W + R > N ensures consistency." },
    { id: 114, name: "Clock Synchronization & Vector Clocks", desc: "Ordering events in distributed systems. Logical clocks, Lamport timestamps, vector clocks for causality." },
    { id: 115, name: "Split Brain", desc: "Network partition causes two halves to operate independently, risking data divergence. Solved with fencing and quorums." },
    { id: 116, name: "Tombstones", desc: "Markers indicating deleted data in distributed systems. Prevents deleted data from reappearing during sync." },
    { id: 117, name: "Conflict-Free Replicated Data Types (CRDTs)", desc: "Data structures that can be updated independently and merged automatically. No coordination needed." },
    { id: 118, name: "Two-Phase Commit (2PC)", desc: "Distributed transaction protocol: prepare phase then commit phase. Ensures all-or-nothing across nodes." },
    { id: 119, name: "Hinted Handoff", desc: "When a node is down, another temporarily stores its writes. Delivers them when the node recovers." },
    { id: 120, name: "Georeplication", desc: "Replicate data across geographic regions for low latency and disaster recovery. Multi-region architecture." },
  ],
};
export default advancedDistributed;
