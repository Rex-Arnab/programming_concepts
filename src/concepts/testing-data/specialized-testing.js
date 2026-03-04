const specializedTesting = {
  name: "Specialized Testing",
  icon: "⟡",
  color: "#22D3EE",
  concepts: [
    { id: 126, name: "Chaos Engineering", desc: "Intentionally injecting failures into production systems to build confidence in resilience. Kill processes, inject latency, corrupt data. Netflix Chaos Monkey, Litmus, Gremlin." },
    { id: 127, name: "Resilience Testing", desc: "Verifying system behavior under adverse conditions: service failures, network partitions, disk full, DNS failures, clock skew. Beyond chaos — systematic." },
    { id: 128, name: "Disaster Recovery Testing", desc: "Validating backup restoration, failover procedures, and recovery time. Test RTO and RPO. If you haven't tested your backups, you don't have backups." },
    { id: 129, name: "A/B Testing", desc: "Comparing two versions with real users to measure which performs better. Statistical significance, control vs variant, sample size calculation. Data-driven decisions." },
    { id: 130, name: "Canary Testing", desc: "Deploying changes to a small percentage of traffic. Automated metric comparison against baseline. Promote or rollback based on SLIs. Kayenta, Flagger." },
    { id: 131, name: "Feature Flag Testing", desc: "Testing all flag combinations and transitions. Verify behavior with flag on, off, and during toggles. Test cleanup when flags are removed." },
    { id: 132, name: "Infrastructure Testing", desc: "Testing IaC before applying: Terratest, kitchen-terraform, Pulumi testing. Validate cloud resources are created correctly with correct configurations." },
    { id: 133, name: "Compliance Testing", desc: "Verifying software meets regulatory requirements: GDPR, HIPAA, PCI-DSS, SOC2, SOX. Data handling, audit logs, encryption, access controls." },
    { id: 134, name: "Data Pipeline Testing", desc: "Testing ETL/ELT workflows: data quality, schema validation, transformation logic, deduplication, latency, completeness. Great Expectations, dbt tests." },
    { id: 135, name: "AI/ML Model Testing", desc: "Evaluating model accuracy, bias, fairness, robustness, and drift. Training/validation/test splits, cross-validation, adversarial testing, A/B testing in production." },
    { id: 136, name: "Blockchain / Smart Contract Testing", desc: "Testing smart contract logic, gas optimization, security vulnerabilities (reentrancy, overflow). Hardhat, Foundry, Truffle testing frameworks." },
    { id: 137, name: "IoT Testing", desc: "Testing embedded devices: firmware, connectivity, protocol compliance (MQTT, CoAP), power consumption, over-the-air updates, and sensor accuracy." },
    { id: 138, name: "Game Testing", desc: "Functional, performance, compatibility, and playability testing for games. Frame rate, physics, multiplayer sync, load testing, console certification." },
  ],
};
export default specializedTesting;
