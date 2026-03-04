import { FiGlobe } from 'react-icons/fi';
import ConceptLayout from '../ConceptLayout';
import fundamentals from './networking-data/fundamentals';
import transportLayer from './networking-data/transport-layer';
import applicationProtocols from './networking-data/application-protocols';
import dns from './networking-data/dns';
import routingSwitching from './networking-data/routing-switching';
import networkSecurity from './networking-data/network-security';
import cdnEdge from './networking-data/cdn-edge';
import loadBalancing from './networking-data/load-balancing';
import wirelessModern from './networking-data/wireless-modern';
import networkOperations from './networking-data/network-operations';
import advancedEmerging from './networking-data/advanced-emerging';

const categories = [
  fundamentals,
  transportLayer,
  applicationProtocols,
  dns,
  routingSwitching,
  networkSecurity,
  cdnEdge,
  loadBalancing,
  wirelessModern,
  networkOperations,
  advancedEmerging,
];

export const meta = {
  title: "Networking",
  description: "From TCP/IP fundamentals to BGP, CDNs, and eBPF — every concept for understanding how the internet works and how to build on it",
  icon: FiGlobe,
  color: '#0ea5e9',
  conceptCount: categories.reduce((sum, cat) => sum + cat.concepts.length, 0),
};

export default function NetworkingConcepts() {
  return (
    <ConceptLayout
      title="Networking"
      subtitle="From OSI layers to quantum networking — every concept for understanding, building, and operating internet infrastructure"
      accentColor="#0ea5e9"
      categories={categories}
    />
  );
}
