import { FiBriefcase } from 'react-icons/fi';
import ConceptLayout from '../ConceptLayout';
import businessFundamentals from './business-data/business-fundamentals';
import startingABusiness from './business-data/starting-a-business';
import fundraisingStages from './business-data/fundraising-stages';
import angelsVc from './business-data/angels-vc';
import equityCapTable from './business-data/equity-cap-table';
import termSheets from './business-data/term-sheets';
import hierarchyGovernance from './business-data/hierarchy-governance';
import ceoLeadership from './business-data/ceo-leadership';
import scalingGrowth from './business-data/scaling-growth';
import financeMetrics from './business-data/finance-metrics';

const categories = [
  businessFundamentals,
  startingABusiness,
  fundraisingStages,
  angelsVc,
  equityCapTable,
  termSheets,
  hierarchyGovernance,
  ceoLeadership,
  scalingGrowth,
  financeMetrics,
];

export const meta = {
  title: "Business & Entrepreneurship",
  description: "From business models and fundraising to equity, VCs, cap tables, company hierarchy, and scaling — the complete dual-lens reference for founders and investors",
  icon: FiBriefcase,
  color: '#0ea5e9',
  conceptCount: categories.reduce((sum, cat) => sum + cat.concepts.length, 0),
};

export default function BusinessConcepts() {
  return (
    <ConceptLayout
      title="Business & Entrepreneurship"
      subtitle="From founding and fundraising to equity mechanics, company hierarchy, CEO leadership, and scaling — every concept a founder and investor needs, through both lenses"
      accentColor="#0ea5e9"
      categories={categories}
    />
  );
}
