import { FiActivity } from 'react-icons/fi';
import ConceptLayout from '../ConceptLayout';
import coreWebVitals from './web-performance-data/core-web-vitals';
import networkTab from './web-performance-data/network-tab';
import performanceTab from './web-performance-data/performance-tab';
import applicationTab from './web-performance-data/application-tab';
import rendering from './web-performance-data/rendering';
import javascriptPerformance from './web-performance-data/javascript-performance';
import resourceOptimization from './web-performance-data/resource-optimization';
import lighthouse from './web-performance-data/lighthouse';
import monitoring from './web-performance-data/monitoring';
import patterns from './web-performance-data/patterns';

const categories = [
  coreWebVitals,
  networkTab,
  performanceTab,
  applicationTab,
  rendering,
  javascriptPerformance,
  resourceOptimization,
  lighthouse,
  monitoring,
  patterns,
];

export const meta = {
  title: "Web Performance",
  description: "From Core Web Vitals and Chrome DevTools to Lighthouse, rendering pipelines, and real-user monitoring — the complete reference for building fast, measurable, user-centric web experiences",
  icon: FiActivity,
  color: '#10b981',
  conceptCount: categories.reduce((sum, cat) => sum + cat.concepts.length, 0),
};

export default function WebPerformanceConcepts() {
  return (
    <ConceptLayout
      title="Web Performance"
      subtitle="From Core Web Vitals and Chrome DevTools profiling to Lighthouse CI, rendering pipelines, JavaScript optimization, and real-user monitoring — every concept for building measurably fast web experiences"
      accentColor="#10b981"
      categories={categories}
    />
  );
}
