const advancedEmerging = {
  name: "Advanced & Emerging",
  icon: "✦",
  color: "#C77DFF",
  concepts: [
    { id: 153, name: "Platform Engineering", desc: "Building Internal Developer Platforms (IDPs) that abstract infrastructure complexity. Self-service for devs. Backstage, Humanitec, Port." },
    { id: 154, name: "Internal Developer Portal", desc: "Single pane of glass for developers: service catalog, docs, templates, CI/CD status, runbooks. Backstage (Spotify) is the leading framework." },
    { id: 155, name: "FinOps", desc: "Cloud financial operations. Engineers take ownership of cloud spend. Visibility, optimization, accountability. Tag resources, right-size, use spot instances." },
    { id: 156, name: "Ephemeral Environments", desc: "Spin up full environments per PR/branch. Test in isolation, destroy after merge. Preview deployments. Vercel, Render, Kubernetes namespaces." },
    { id: 157, name: "WebAssembly (Wasm) in Cloud", desc: "Lightweight, sandboxed execution format. Faster cold starts than containers. Spin, Fermyon, WasmCloud. Emerging serverless alternative." },
    { id: 158, name: "eBPF", desc: "Run sandboxed programs in the Linux kernel. Networking, observability, security without kernel modules. Cilium, Falco, Pixie powered by eBPF." },
    { id: 159, name: "Supply Chain Security", desc: "Securing the entire software delivery pipeline from source to production. Signed artifacts, verified builds, dependency auditing, SBOM." },
    { id: 160, name: "AI/ML Ops (MLOps)", desc: "DevOps practices for ML: model versioning, training pipelines, model serving, monitoring drift. MLflow, Kubeflow, SageMaker." },
    { id: 161, name: "ChatOps", desc: "Managing operations through chat (Slack, Teams). Bots trigger deployments, run queries, page on-call. Centralizes visibility and action." },
    { id: 162, name: "Observability-Driven Development", desc: "Design systems with observability built in from day one. Instrument before writing business logic. Observe in staging and production." },
    { id: 163, name: "Green Computing / Sustainable DevOps", desc: "Reducing carbon footprint of infrastructure. Right-sizing, spot instances, carbon-aware scheduling, efficient architectures. Sustainability as a metric." },
    { id: 164, name: "Developer Experience (DX)", desc: "Optimizing the developer's daily workflow. Fast CI, easy local dev, good docs, self-service tooling. Happy devs = productive devs." },
    { id: 165, name: "Infrastructure from Code (IfC)", desc: "Infer infrastructure from application code instead of defining it separately. Nitric, Klotho, Ampt. Emerging alternative to traditional IaC." },
  ],
};
export default advancedEmerging;
