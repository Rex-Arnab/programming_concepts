import { FiPenTool } from 'react-icons/fi';
import ConceptLayout from '../ConceptLayout';
import uxFoundations from './design-ux-data/ux-foundations';
import uiFundamentals from './design-ux-data/ui-fundamentals';
import designSystems from './design-ux-data/design-systems';
import informationArchitecture from './design-ux-data/information-architecture';
import userResearch from './design-ux-data/user-research';
import interactionDesign from './design-ux-data/interaction-design';
import accessibility from './design-ux-data/accessibility';
import hci from './design-ux-data/hci';
import designTooling from './design-ux-data/design-tooling';
import mobileResponsiveUX from './design-ux-data/mobile-responsive-ux';
import advancedEmergingUX from './design-ux-data/advanced-emerging-ux';

const categories = [
  uxFoundations,
  uiFundamentals,
  designSystems,
  informationArchitecture,
  userResearch,
  interactionDesign,
  accessibility,
  hci,
  designTooling,
  mobileResponsiveUX,
  advancedEmergingUX,
];

export const meta = {
  title: "Design & UX",
  description: "From Gestalt to design systems — every concept for crafting interfaces that are usable, accessible, and genuinely delightful",
  icon: FiPenTool,
  color: '#ec4899',
  conceptCount: categories.reduce((sum, cat) => sum + cat.concepts.length, 0),
};

export default function DesignUXConcepts() {
  return (
    <ConceptLayout
      title="Design & UX"
      subtitle="From first principles to emerging frontiers — every concept for designing interfaces that serve people well"
      accentColor="#ec4899"
      categories={categories}
    />
  );
}
