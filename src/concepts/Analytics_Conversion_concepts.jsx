import { FiBarChart2 } from 'react-icons/fi';
import ConceptLayout from "../ConceptLayout";
import foundations from './analytics-data/foundations';
import webAnalytics from './analytics-data/web-analytics';
import productAnalytics from './analytics-data/product-analytics';
import cro from './analytics-data/cro';
import abTesting from './analytics-data/ab-testing';
import attribution from './analytics-data/attribution';
import dataInfrastructure from './analytics-data/data-infrastructure';
import customerAnalytics from './analytics-data/customer-analytics';
import privacyCompliance from './analytics-data/privacy-compliance';
import ecommerceAnalytics from './analytics-data/ecommerce-analytics';
import advancedAnalytics from './analytics-data/advanced-analytics';

const categories = [
  foundations,
  webAnalytics,
  productAnalytics,
  cro,
  abTesting,
  attribution,
  dataInfrastructure,
  customerAnalytics,
  privacyCompliance,
  ecommerceAnalytics,
  advancedAnalytics,
];

export const meta = {
  title: "Analytics & Conversion",
  description: "From GA4 to A/B testing — every concept for measuring, optimizing, and growing digital products",
  icon: FiBarChart2,
  color: '#0d9488',
  conceptCount: categories.reduce((sum, cat) => sum + cat.concepts.length, 0),
};

export default function AnalyticsConversionConcepts() {
  return (
    <ConceptLayout
      title="Analytics & Conversion"
      subtitle="From measurement fundamentals to AI-powered analytics — every concept for understanding users, optimizing experiences, and driving growth"
      accentColor="#0d9488"
      categories={categories}
    />
  );
}
