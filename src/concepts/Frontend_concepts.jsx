import { FiLayout } from 'react-icons/fi';
import ConceptLayout from "../ConceptLayout";
import htmlSemantics from './frontend-data/html-semantics';
import cssStyling from './frontend-data/css-styling';
import javascriptCore from './frontend-data/javascript-core';
import typescript from './frontend-data/typescript';
import frameworksLibraries from './frontend-data/frameworks-libraries';
import stateManagement from './frontend-data/state-management';
import performance from './frontend-data/performance';
import renderingArchitecture from './frontend-data/rendering-architecture';
import toolingBuild from './frontend-data/tooling-build';
import routingDataFetching from './frontend-data/routing-data-fetching';
import accessibilityUx from './frontend-data/accessibility-ux';
import browserApisWeb from './frontend-data/browser-apis-web';
import testingFrontend from './frontend-data/testing-frontend';
import advancedEmerging from './frontend-data/advanced-emerging';

const categories = [
  htmlSemantics, cssStyling, javascriptCore, typescript,
  frameworksLibraries, stateManagement, performance, renderingArchitecture,
  toolingBuild, routingDataFetching, accessibilityUx, browserApisWeb,
  testingFrontend, advancedEmerging,
];

export const meta = {
  title: "Frontend Concepts",
  description: "180 essential frontend development concepts from HTML to WebGPU",
  icon: FiLayout,
  color: '#818cf8',
  conceptCount: categories.reduce((sum, cat) => sum + cat.concepts.length, 0),
};

export default function FrontendConcepts() {
  return (
    <ConceptLayout
      title="Frontend Development Concepts"
      subtitle="HTML to WebGPU — everything a modern frontend engineer needs to know"
      accentColor="#61DAFB"
      categories={categories}
    />
  );
}
