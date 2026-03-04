import { FiCheckCircle } from 'react-icons/fi';
import ConceptLayout from "../ConceptLayout";
import fundamentals from './testing-data/fundamentals';
import testingLevels from './testing-data/testing-levels';
import typesFunctional from './testing-data/types-functional';
import typesNonFunctional from './testing-data/types-non-functional';
import securityTesting from './testing-data/security-testing';
import testAutomation from './testing-data/test-automation';
import uiFrontendTesting from './testing-data/ui-frontend-testing';
import apiBackendTesting from './testing-data/api-backend-testing';
import mobileTesting from './testing-data/mobile-testing';
import specializedTesting from './testing-data/specialized-testing';
import testDesignTechniques from './testing-data/test-design-techniques';
import cicdDevopsTesting from './testing-data/cicd-devops-testing';
import practicesMethodologies from './testing-data/practices-methodologies';

const categories = [
  fundamentals, testingLevels, typesFunctional, typesNonFunctional,
  securityTesting, testAutomation, uiFrontendTesting, apiBackendTesting,
  mobileTesting, specializedTesting, testDesignTechniques,
  cicdDevopsTesting, practicesMethodologies,
];

export const meta = {
  title: "Testing Concepts",
  description: "Software testing methodologies and best practices",
  icon: FiCheckCircle,
  color: '#84cc16',
  conceptCount: categories.reduce((sum, cat) => sum + cat.concepts.length, 0),
};

export default function TestingConcepts() {
  return (
    <ConceptLayout
      title="Software Testing Concepts"
      subtitle="Unit tests to chaos engineering — the complete QA & testing encyclopedia"
      accentColor="#F97316"
      categories={categories}
    />
  );
}
