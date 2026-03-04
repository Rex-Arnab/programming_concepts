import { FiCode } from 'react-icons/fi';
import ConceptLayout from '../ConceptLayout';
import foundations from './api-design-data/foundations';
import rest from './api-design-data/rest';
import graphql from './api-design-data/graphql';
import grpc from './api-design-data/grpc';
import websockets from './api-design-data/websockets';
import authSecurity from './api-design-data/auth-security';
import performance from './api-design-data/performance';
import developerExperience from './api-design-data/developer-experience';
import gatewayTooling from './api-design-data/gateway-tooling';
import advancedPatterns from './api-design-data/advanced-patterns';

const categories = [
  foundations,
  rest,
  graphql,
  grpc,
  websockets,
  authSecurity,
  performance,
  developerExperience,
  gatewayTooling,
  advancedPatterns,
];

export const meta = {
  title: "API Design",
  description: "From REST and GraphQL to gRPC, WebSockets, and webhooks — the complete reference for designing, securing, and scaling APIs that developers love",
  icon: FiCode,
  color: '#0ea5e9',
  conceptCount: categories.reduce((sum, cat) => sum + cat.concepts.length, 0),
};

export default function APIDesignConcepts() {
  return (
    <ConceptLayout
      title="API Design"
      subtitle="From REST fundamentals and GraphQL schemas to gRPC streaming, WebSocket scaling, OAuth security, and developer experience — every concept for building APIs developers love"
      accentColor="#0ea5e9"
      categories={categories}
    />
  );
}
