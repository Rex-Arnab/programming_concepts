import { FiShield } from 'react-icons/fi';
import ConceptLayout from '../ConceptLayout';
import appsecOwasp from './security-data/appsec-owasp';
import cryptography from './security-data/cryptography';
import identityAccess from './security-data/identity-access';
import networkSecurity from './security-data/network-security';
import cloudSecurity from './security-data/cloud-security';
import threatModeling from './security-data/threat-modeling';
import penetrationTesting from './security-data/penetration-testing';
import devsecops from './security-data/devsecops';
import securityOperations from './security-data/security-operations';
import advancedEmerging from './security-data/advanced-emerging';

const categories = [
  appsecOwasp,
  cryptography,
  identityAccess,
  networkSecurity,
  cloudSecurity,
  threatModeling,
  penetrationTesting,
  devsecops,
  securityOperations,
  advancedEmerging,
];

export const meta = {
  title: "Security",
  description: "From OWASP Top 10 and cryptography fundamentals to Zero Trust, DevSecOps, penetration testing, and cloud security — the complete application and infrastructure security reference",
  icon: FiShield,
  color: '#ef4444',
  conceptCount: categories.reduce((sum, cat) => sum + cat.concepts.length, 0),
};

export default function SecurityConcepts() {
  return (
    <ConceptLayout
      title="Security"
      subtitle="From SQL injection and XSS to Zero Trust, threat modeling, and supply chain attacks — every concept for building and defending secure systems"
      accentColor="#ef4444"
      categories={categories}
    />
  );
}
