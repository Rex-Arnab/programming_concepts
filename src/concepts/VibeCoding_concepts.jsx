import { FiCpu } from 'react-icons/fi';
import ConceptLayout from '../ConceptLayout';
import foundations from './vibe-coding-data/foundations';
import aiIdes from './vibe-coding-data/ai-ides';
import browserBuilders from './vibe-coding-data/browser-builders';
import cliTools from './vibe-coding-data/cli-tools';
import promptingMastery from './vibe-coding-data/prompting-mastery';
import contextManagement from './vibe-coding-data/context-management';
import vibeLoopWorkflow from './vibe-coding-data/vibe-loop-workflow';
import aiModelsStrategy from './vibe-coding-data/ai-models-strategy';
import qualitySecurity from './vibe-coding-data/quality-security';
import agenticPatterns from './vibe-coding-data/agentic-patterns';

const categories = [
  foundations,
  aiIdes,
  browserBuilders,
  cliTools,
  promptingMastery,
  contextManagement,
  vibeLoopWorkflow,
  aiModelsStrategy,
  qualitySecurity,
  agenticPatterns,
];

export const meta = {
  title: "Vibe Coding",
  description: "From AI IDEs and browser builders to prompting mastery, agentic patterns, and production safety — the complete reference for AI-assisted software development",
  icon: FiCpu,
  color: '#8b5cf6',
  conceptCount: categories.reduce((sum, cat) => sum + cat.concepts.length, 0),
};

export default function VibeCodingConcepts() {
  return (
    <ConceptLayout
      title="Vibe Coding"
      subtitle="AI-assisted development from first prompt to production — tools, workflows, prompting mastery, and agentic patterns for the modern builder"
      accentColor="#8b5cf6"
      categories={categories}
    />
  );
}
