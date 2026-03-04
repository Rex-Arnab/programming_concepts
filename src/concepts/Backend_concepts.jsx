import { FiServer } from 'react-icons/fi';
import ConceptLayout from "../ConceptLayout";
import coreFundamentals from './backend-data/core-fundamentals';
import languagesRuntimes from './backend-data/languages-runtimes';
import apisCommunication from './backend-data/apis-communication';
import databasesStorage from './backend-data/databases-storage';
import dataModelingAccess from './backend-data/data-modeling-access';
import authSecurity from './backend-data/auth-security';
import caching from './backend-data/caching';
import messagingAsync from './backend-data/messaging-async';
import microservicesArchitecture from './backend-data/microservices-architecture';
import devopsOperations from './backend-data/devops-operations';
import scalabilityPerformance from './backend-data/scalability-performance';
import reliabilityResilience from './backend-data/reliability-resilience';
import advancedEmerging from './backend-data/advanced-emerging';

export const meta = {
  title: "Backend Concepts",
  description: "Backend development fundamentals and architecture patterns",
  icon: FiServer,
  color: '#f97316',
};

const categories = [
  coreFundamentals, languagesRuntimes, apisCommunication, databasesStorage,
  dataModelingAccess, authSecurity, caching, messagingAsync,
  microservicesArchitecture, devopsOperations, scalabilityPerformance,
  reliabilityResilience, advancedEmerging,
];

export default function BackendConcepts() {
  return (
    <ConceptLayout
      title="Backend Development Concepts"
      subtitle="APIs to distributed systems — the complete server-side engineering reference"
      accentColor="#22C55E"
      categories={categories}
    />
  );
}
