const corePrinciples = {
  name: "Core Principles",
  icon: "◆",
  color: "#06D6A0",
  concepts: [
    { id: 1, name: "DevOps Culture", desc: "A cultural shift breaking silos between development and operations. Shared ownership, collaboration, transparency, and continuous improvement." },
    { id: 2, name: "Continuous Integration (CI)", desc: "Developers merge code to a shared repo frequently. Each merge triggers automated builds and tests. Catch bugs early, ship faster." },
    { id: 3, name: "Continuous Delivery (CD)", desc: "Code is always in a deployable state. Every change passes through automated pipeline and can be released at any time with a manual approval." },
    { id: 4, name: "Continuous Deployment", desc: "Every change that passes all pipeline stages is automatically deployed to production. No manual gates. Requires robust testing and monitoring." },
    { id: 5, name: "Infrastructure as Code (IaC)", desc: "Managing infrastructure through code files instead of manual processes. Terraform, Pulumi, CloudFormation. Version-controlled, repeatable, auditable." },
    { id: 6, name: "GitOps", desc: "Using Git as the single source of truth for declarative infrastructure and apps. Changes via pull requests, automated reconciliation. ArgoCD, Flux." },
    { id: 7, name: "Shift Left", desc: "Moving testing, security, and quality checks earlier in the development lifecycle. Find and fix issues when they're cheapest to resolve." },
    { id: 8, name: "Everything as Code", desc: "Infrastructure, configuration, policies, pipelines, documentation — all defined in code. Enables versioning, review, and automation for everything." },
    { id: 9, name: "Immutable Infrastructure", desc: "Servers are never modified after deployment. Changes require building a new image and replacing the old one. Eliminates configuration drift." },
    { id: 10, name: "Cattle vs Pets", desc: "Pets: servers you name and nurse back to health. Cattle: identical, numbered, replaced when sick. Modern infra treats servers as cattle." },
    { id: 11, name: "The Three Ways of DevOps", desc: "1) Flow: fast left-to-right delivery. 2) Feedback: fast right-to-left feedback loops. 3) Continual Learning: experimentation and improvement." },
    { id: 12, name: "DORA Metrics", desc: "Four key metrics: Deployment Frequency, Lead Time for Changes, Change Failure Rate, Mean Time to Recovery. Measures DevOps performance." },
    { id: 13, name: "Toil Reduction", desc: "Eliminating manual, repetitive, automatable work. SRE principle: if a human does it more than twice, automate it." },
    { id: 14, name: "Blameless Postmortems", desc: "After incidents, focus on systemic causes, not individuals. Document what happened, why, and how to prevent recurrence. Builds trust." },
  ],
};
export default corePrinciples;
