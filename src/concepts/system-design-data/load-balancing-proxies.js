const loadBalancingProxies = {
  name: "Load Balancing & Proxies",
  icon: "⊞",
  color: "#9B59B6",
  concepts: [
    { id: 51, name: "Load Balancing", desc: "Distributes incoming traffic across multiple servers. Improves availability, throughput, and reliability." },
    { id: 52, name: "Load Balancing Algorithms", desc: "Round Robin, Weighted RR, Least Connections, IP Hash, Random. Each optimizes for different scenarios." },
    { id: 53, name: "Layer 4 vs Layer 7 Load Balancing", desc: "L4: routes by IP/port (fast). L7: routes by HTTP content/headers/URL (smart). L7 enables path-based routing." },
    { id: 54, name: "Reverse Proxy", desc: "Sits in front of servers, forwarding client requests. Provides security, caching, SSL termination (Nginx, HAProxy)." },
    { id: 55, name: "Forward Proxy", desc: "Sits in front of clients, forwarding requests to the internet. Used for privacy, filtering, caching." },
    { id: 56, name: "API Gateway", desc: "Single entry point for all API calls. Handles auth, rate limiting, routing, request transformation." },
    { id: 57, name: "Service Mesh", desc: "Infrastructure layer managing service-to-service communication (Istio, Linkerd). Handles retries, observability, mTLS." },
  ],
};
export default loadBalancingProxies;
