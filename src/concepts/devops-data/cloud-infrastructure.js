const cloudInfrastructure = {
  name: "Cloud & Infrastructure",
  icon: "◈",
  color: "#FF9F1C",
  concepts: [
    { id: 55, name: "Cloud Computing Models (IaaS/PaaS/SaaS)", desc: "IaaS: virtual machines (EC2). PaaS: managed platform (Heroku, App Engine). SaaS: ready-to-use software (Slack). Abstraction increases upward." },
    { id: 56, name: "AWS / Azure / GCP", desc: "The big three cloud providers. AWS: largest ecosystem. Azure: enterprise/Microsoft integration. GCP: data/ML strength. Multi-cloud is common." },
    { id: 57, name: "Virtual Machines (VMs)", desc: "Emulated computers running on hypervisors. Full OS isolation. Heavier than containers but stronger isolation. EC2, Azure VMs, Compute Engine." },
    { id: 58, name: "Serverless Computing", desc: "Run code without managing servers. Pay per execution. AWS Lambda, Azure Functions, Google Cloud Functions. Auto-scales to zero." },
    { id: 59, name: "Edge Computing", desc: "Processing data closer to where it's generated. Reduces latency. CDN edge functions (Cloudflare Workers), IoT edge nodes." },
    { id: 60, name: "Regions & Availability Zones", desc: "Regions: geographic locations with clusters of data centers. AZs: isolated data centers within a region. Deploy across AZs for high availability." },
    { id: 61, name: "VPC (Virtual Private Cloud)", desc: "Isolated network within the cloud. Subnets (public/private), route tables, internet gateways, NAT gateways. Network foundation." },
    { id: 62, name: "Load Balancers (ALB/NLB/CLB)", desc: "Distribute traffic across targets. ALB: HTTP/HTTPS layer 7. NLB: TCP/UDP layer 4. Managed by cloud providers. Health check integrated." },
    { id: 63, name: "Auto Scaling Groups", desc: "Automatically adjust the number of instances based on demand. Scaling policies based on CPU, memory, custom metrics, or schedules." },
    { id: 64, name: "Managed Databases", desc: "Cloud-managed DB services: RDS, Aurora, Cloud SQL, DynamoDB, Cosmos DB. Handles backups, patching, replication, scaling." },
    { id: 65, name: "Object Storage (S3 / GCS / Blob)", desc: "Scalable storage for unstructured data. Virtually unlimited capacity. Storage classes for cost optimization (Standard, Infrequent, Glacier)." },
    { id: 66, name: "CDN (CloudFront / Cloudflare / Fastly)", desc: "Caches content at edge locations worldwide. Reduces latency for static and dynamic content. DDoS protection often included." },
    { id: 67, name: "DNS Management (Route 53 / Cloud DNS)", desc: "Managed DNS services with health checks, failover routing, weighted routing, geolocation routing. Foundation for high availability." },
    { id: 68, name: "Cloud Cost Optimization", desc: "Reserved Instances, Spot/Preemptible Instances, right-sizing, auto-scaling, storage tiering, unused resource cleanup. FinOps discipline." },
    { id: 69, name: "Multi-Cloud & Hybrid Cloud", desc: "Multi-cloud: using multiple providers. Hybrid: combining on-premise with cloud. Avoids vendor lock-in but increases operational complexity." },
  ],
};
export default cloudInfrastructure;
