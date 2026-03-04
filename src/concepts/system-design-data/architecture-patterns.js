const architecturePatterns = {
  name: "Architecture Patterns",
  icon: "⬣",
  color: "#E84393",
  concepts: [
    { id: 58, name: "Monolithic Architecture", desc: "Single deployable unit containing all functionality. Simple to start but hard to scale independently." },
    { id: 59, name: "Microservices Architecture", desc: "Application as suite of small, independent services. Each owns its data and communicates via APIs." },
    { id: 60, name: "Serverless Architecture", desc: "Cloud provider manages infrastructure. Code runs in stateless functions (AWS Lambda). Pay per execution." },
    { id: 61, name: "Event-Driven Architecture", desc: "Components communicate through events. Producers emit events, consumers react. Enables loose coupling." },
    { id: 62, name: "CQRS", desc: "Command Query Responsibility Segregation. Separate models for reads and writes. Optimizes each independently." },
    { id: 63, name: "Event Sourcing", desc: "Store all state changes as immutable events. Reconstruct state by replaying events. Full audit trail." },
    { id: 64, name: "Saga Pattern", desc: "Manages distributed transactions across microservices using a sequence of local transactions with compensating actions." },
    { id: 65, name: "Strangler Fig Pattern", desc: "Incrementally migrate from monolith to microservices by gradually replacing functionality." },
    { id: 66, name: "Sidecar Pattern", desc: "Deploy helper process alongside main service for logging, monitoring, networking (used in service meshes)." },
    { id: 67, name: "Backend for Frontend (BFF)", desc: "Dedicated backend service per frontend type (mobile, web). Tailors API responses to each client's needs." },
    { id: 68, name: "Peer-to-Peer (P2P)", desc: "Nodes act as both client and server. Decentralized. Used in file sharing, blockchain, WebRTC." },
    { id: 69, name: "Lambda Architecture", desc: "Combines batch processing (accurate) and stream processing (fast) for big data systems." },
  ],
};
export default architecturePatterns;
