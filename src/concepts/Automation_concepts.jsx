import { FiZap } from 'react-icons/fi';
import ConceptLayout from "../ConceptLayout";
import foundations from './automation-data/foundations';
import workflowAutomation from './automation-data/workflow-automation';
import browserWebAutomation from './automation-data/browser-web-automation';
import rpa from './automation-data/rpa';
import schedulingOrchestration from './automation-data/scheduling-orchestration';
import scriptDesktopAutomation from './automation-data/script-desktop-automation';
import apiEventAutomation from './automation-data/api-event-automation';
import aiPoweredAutomation from './automation-data/ai-powered-automation';
import testingAutomation from './automation-data/testing-automation';
import patternsBestPractices from './automation-data/patterns-best-practices';

const categories = [
  foundations,
  workflowAutomation,
  browserWebAutomation,
  rpa,
  schedulingOrchestration,
  scriptDesktopAutomation,
  apiEventAutomation,
  aiPoweredAutomation,
  testingAutomation,
  patternsBestPractices,
];

export const meta = {
  title: "Automation Concepts",
  description: "From scripts to AI agents — every concept a modern automation engineer needs",
  icon: FiZap,
  color: '#F59E0B',
  conceptCount: categories.reduce((sum, cat) => sum + cat.concepts.length, 0),
};

export default function AutomationConcepts() {
  return (
    <ConceptLayout
      title="Automation Concepts"
      subtitle="From cron jobs to AI agents — every tool, pattern, and principle for modern automation"
      accentColor="#F59E0B"
      categories={categories}
    />
  );
}
