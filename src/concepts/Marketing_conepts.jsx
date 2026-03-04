import { FiTrendingUp } from 'react-icons/fi';
import ConceptLayout from "../ConceptLayout";
import fundamentals from './marketing-data/fundamentals';
import digitalMarketing from './marketing-data/digital-marketing';
import contentSeo from './marketing-data/content-seo';
import funnelsCustomerJourney from './marketing-data/funnels-customer-journey';
import analyticsMetrics from './marketing-data/analytics-metrics';
import growthAcquisition from './marketing-data/growth-acquisition';
import pricingRevenue from './marketing-data/pricing-revenue';
import brandingPsychology from './marketing-data/branding-psychology';
import emailAutomation from './marketing-data/email-automation';
import socialMediaCommunity from './marketing-data/social-media-community';
import strategyPlanning from './marketing-data/strategy-planning';
import emergingAdvanced from './marketing-data/emerging-advanced';
import b2bAbm from './marketing-data/b2b-abm';
import productMarketing from './marketing-data/product-marketing';
import ecommerceMarketing from './marketing-data/ecommerce-marketing';
import eventPartnerships from './marketing-data/event-partnerships';

const categories = [
  fundamentals, digitalMarketing, contentSeo, funnelsCustomerJourney,
  analyticsMetrics, growthAcquisition, pricingRevenue, brandingPsychology,
  emailAutomation, socialMediaCommunity, strategyPlanning, emergingAdvanced,
  b2bAbm, productMarketing, ecommerceMarketing, eventPartnerships,
];

export const meta = {
  title: "Marketing Concepts",
  description: "Essential marketing concepts and strategies",
  icon: FiTrendingUp,
  color: '#f43f5e',
  conceptCount: categories.reduce((sum, cat) => sum + cat.concepts.length, 0),
};

export default function MarketingConcepts() {
  return (
    <ConceptLayout
      title="Marketing Concepts"
      subtitle="From fundamentals to growth hacking — every concept a modern marketer needs"
      accentColor="#FF6B35"
      categories={categories}
    />
  );
}
