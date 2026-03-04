import { FiTerminal } from 'react-icons/fi';
import ConceptLayout from "../ConceptLayout";
import corePrinciples from './devops-data/core-principles';
import versionControl from './devops-data/version-control';
import cicdPipelines from './devops-data/cicd-pipelines';
import containersOrchestration from './devops-data/containers-orchestration';
import cloudInfrastructure from './devops-data/cloud-infrastructure';
import infrastructureAsCode from './devops-data/infrastructure-as-code';
import monitoringObservability from './devops-data/monitoring-observability';
import deploymentStrategies from './devops-data/deployment-strategies';
import securityDevsecops from './devops-data/security-devsecops';
import testing from './devops-data/testing';
import networkingServiceDiscovery from './devops-data/networking-service-discovery';
import reliabilitySre from './devops-data/reliability-sre';
import advancedEmerging from './devops-data/advanced-emerging';

export const meta = {
  title: "DevOps Concepts",
  description: "DevOps principles, tools, and practices",
  icon: FiTerminal,
  color: '#10b981',
};

const categories = [
  corePrinciples, versionControl, cicdPipelines, containersOrchestration,
  cloudInfrastructure, infrastructureAsCode, monitoringObservability, deploymentStrategies,
  securityDevsecops, testing, networkingServiceDiscovery, reliabilitySre, advancedEmerging,
];

export default function DevopsConcepts() {
  return (
    <ConceptLayout
      title="DevOps Concepts"
      subtitle="CI/CD, containers, cloud, observability, security — the complete DevOps toolkit"
      accentColor="#06D6A0"
      categories={categories}
    />
  );
}
