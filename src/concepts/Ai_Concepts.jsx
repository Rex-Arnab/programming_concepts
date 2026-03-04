import { SiOpenai } from 'react-icons/si';
import ConceptLayout from "../ConceptLayout";
import foundations from './ai-data/foundations';
import classicalMl from './ai-data/classical-ml';
import deepLearning from './ai-data/deep-learning';
import llms from './ai-data/llms';
import ragKnowledge from './ai-data/rag-knowledge';
import aiAgents from './ai-data/ai-agents';
import computerVision from './ai-data/computer-vision';
import nlpSpeech from './ai-data/nlp-speech';
import modelOptimization from './ai-data/model-optimization';
import mlopsInfrastructure from './ai-data/mlops-infrastructure';
import aiSafetyEthics from './ai-data/ai-safety-ethics';
import evaluationMetrics from './ai-data/evaluation-metrics';
import buildingAiApps from './ai-data/building-ai-apps';
import advancedFrontier from './ai-data/advanced-frontier';

export const meta = {
  title: "AI Concepts",
  description: "Artificial intelligence and machine learning fundamentals",
  icon: SiOpenai,
  color: '#a78bfa',
};

const categories = [
  foundations, classicalMl, deepLearning, llms,
  ragKnowledge, aiAgents, computerVision, nlpSpeech,
  modelOptimization, mlopsInfrastructure, aiSafetyEthics, evaluationMetrics,
  buildingAiApps, advancedFrontier,
];

export default function AiConcepts() {
  return (
    <ConceptLayout
      title="Artificial Intelligence Concepts"
      subtitle="From neural networks to AGI — the complete AI & machine learning reference"
      accentColor="#A78BFA"
      categories={categories}
    />
  );
}
