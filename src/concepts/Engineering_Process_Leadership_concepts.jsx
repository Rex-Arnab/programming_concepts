import { FiUsers } from 'react-icons/fi';
import ConceptLayout from "../ConceptLayout";
import fundamentals from './engineering-process-data/fundamentals';
import sdlc from './engineering-process-data/sdlc';
import agileLean from './engineering-process-data/agile-lean';
import engineeringPractices from './engineering-process-data/engineering-practices';
import technicalDesign from './engineering-process-data/technical-design';
import codeQuality from './engineering-process-data/code-quality';
import technicalLeadership from './engineering-process-data/technical-leadership';
import engineeringManagement from './engineering-process-data/engineering-management';
import teamDynamics from './engineering-process-data/team-dynamics';
import incidentManagement from './engineering-process-data/incident-management';
import developerExperience from './engineering-process-data/developer-experience';
import engineeringStrategy from './engineering-process-data/engineering-strategy';

const categories = [
  fundamentals,
  sdlc,
  agileLean,
  engineeringPractices,
  technicalDesign,
  codeQuality,
  technicalLeadership,
  engineeringManagement,
  teamDynamics,
  incidentManagement,
  developerExperience,
  engineeringStrategy,
];

export const meta = {
  title: "Engineering Process & Leadership",
  description: "From Agile to architecture decisions — every concept for shipping great software and leading engineering teams",
  icon: FiUsers,
  color: '#7c3aed',
  conceptCount: categories.reduce((sum, cat) => sum + cat.concepts.length, 0),
};

export default function EngineeringProcessLeadershipConcepts() {
  return (
    <ConceptLayout
      title="Engineering Process & Leadership"
      subtitle="From first principles to engineering culture — every concept for building great software, leading high-performing teams, and making sound technical decisions"
      accentColor="#7c3aed"
      categories={categories}
    />
  );
}
