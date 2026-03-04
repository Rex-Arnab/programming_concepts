const infrastructureAsCode = {
  name: "Infrastructure as Code",
  icon: "⬣",
  color: "#7B68EE",
  concepts: [
    { id: 70, name: "Terraform", desc: "Declarative IaC tool by HashiCorp. Provider-agnostic (AWS, Azure, GCP, K8s). HCL syntax. State file tracks resource mappings. Plan → Apply workflow." },
    { id: 71, name: "Terraform State Management", desc: "State file maps config to real resources. Remote backends (S3, Terraform Cloud) for team collaboration. State locking prevents conflicts." },
    { id: 72, name: "Terraform Modules", desc: "Reusable, composable infrastructure components. Public registry has thousands. Encapsulate best practices. Input variables and outputs." },
    { id: 73, name: "Pulumi", desc: "IaC using real programming languages (TypeScript, Python, Go). Full IDE support, testing, loops, conditionals. Alternative to Terraform's HCL." },
    { id: 74, name: "AWS CloudFormation / CDK", desc: "CloudFormation: AWS-native IaC in JSON/YAML. CDK: define CloudFormation using TypeScript, Python, etc. Synthesizes to CloudFormation templates." },
    { id: 75, name: "Ansible", desc: "Agentless configuration management and automation. YAML playbooks. SSH-based. Idempotent tasks. Great for configuring servers and deploying apps." },
    { id: 76, name: "Configuration Management", desc: "Automating server configuration: Ansible, Chef, Puppet, SaltStack. Ensures consistent state across all machines. Idempotent operations." },
    { id: 77, name: "Packer", desc: "HashiCorp tool for building machine images (AMI, Docker, Vagrant). Bakes dependencies into images for fast, consistent deployments." },
    { id: 78, name: "Declarative vs Imperative IaC", desc: "Declarative: define desired end state (Terraform, K8s). Imperative: define steps to reach state (scripts, Ansible tasks). Declarative preferred." },
    { id: 79, name: "Drift Detection", desc: "Detecting when actual infrastructure differs from IaC definitions. Manual changes cause drift. Tools: Terraform plan, Driftctl, AWS Config." },
    { id: 80, name: "Policy as Code", desc: "Defining infrastructure policies in code. OPA/Rego, HashiCorp Sentinel, Checkov, tfsec. Enforce compliance automatically in CI/CD." },
  ],
};
export default infrastructureAsCode;
