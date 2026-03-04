const networkingServiceDiscovery = {
  name: "Networking & Service Discovery",
  icon: "⟡",
  color: "#FFB4A2",
  concepts: [
    { id: 132, name: "Service Discovery", desc: "How services find each other in dynamic environments. DNS-based (K8s CoreDNS), registry-based (Consul, Eureka), or environment variables." },
    { id: 133, name: "DNS in Kubernetes (CoreDNS)", desc: "Built-in DNS for K8s. Services resolve via service-name.namespace.svc.cluster.local. Pods get DNS entries automatically." },
    { id: 134, name: "Reverse Proxy (Nginx / Envoy / Traefik)", desc: "Sits in front of backend services. Handles SSL termination, routing, rate limiting, compression. Envoy powers most service meshes." },
    { id: 135, name: "API Gateway", desc: "Single entry point for external traffic. Auth, rate limiting, request transformation, routing. Kong, AWS API Gateway, Traefik." },
    { id: 136, name: "Sidecar Proxy Pattern", desc: "A proxy container alongside each service pod. Handles networking concerns (TLS, retries, tracing). Envoy sidecar in Istio/Linkerd." },
    { id: 137, name: "Network Segmentation", desc: "Dividing networks into zones with controlled access between them. Public subnet, private subnet, DMZ. Defense in depth." },
    { id: 138, name: "NAT Gateway", desc: "Allows private subnet resources to reach the internet without exposing them. Outbound-only connectivity. Essential for pulling packages securely." },
    { id: 139, name: "Ingress Controllers", desc: "K8s components managing external access. Process Ingress resources into load balancer rules. Nginx Ingress, Traefik, AWS ALB Controller." },
  ],
};
export default networkingServiceDiscovery;
