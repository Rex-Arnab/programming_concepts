import { FiCpu } from 'react-icons/fi';
import ConceptLayout from "../ConceptLayout";
import fundamentals from './system-design-data/fundamentals';
import networkingCommunication from './system-design-data/networking-communication';
import dataDatabases from './system-design-data/data-databases';
import caching from './system-design-data/caching';
import loadBalancingProxies from './system-design-data/load-balancing-proxies';
import architecturePatterns from './system-design-data/architecture-patterns';
import messagingStreaming from './system-design-data/messaging-streaming';
import securityAuth from './system-design-data/security-auth';
import scalabilityPatterns from './system-design-data/scalability-patterns';
import reliabilityResilience from './system-design-data/reliability-resilience';
import observabilityOperations from './system-design-data/observability-operations';
import advancedDistributed from './system-design-data/advanced-distributed';
import cloudDesignPatterns from './system-design-data/cloud-design-patterns';
import performanceAntipatterns from './system-design-data/performance-antipatterns';
import estimationTradeoffs from './system-design-data/estimation-tradeoffs';
import philosophyPrinciples from './system-design-data/philosophy-principles';

const categories = [
  fundamentals, networkingCommunication, dataDatabases, caching,
  loadBalancingProxies, architecturePatterns, messagingStreaming, securityAuth,
  scalabilityPatterns, reliabilityResilience, observabilityOperations, advancedDistributed,
  cloudDesignPatterns, performanceAntipatterns, estimationTradeoffs, philosophyPrinciples,
];

export const meta = {
  title: "System Design Concepts",
  description: "Core system design principles and patterns",
  icon: FiCpu,
  color: '#eab308',
  conceptCount: categories.reduce((sum, cat) => sum + cat.concepts.length, 0),
};

export default function SystemDesignConcepts() {
  return (
    <ConceptLayout
      title="System Design Concepts"
      subtitle="Every concept you need — from fundamentals to distributed systems"
      accentColor="#3A8FE8"
      categories={categories}
    />
  );
}
