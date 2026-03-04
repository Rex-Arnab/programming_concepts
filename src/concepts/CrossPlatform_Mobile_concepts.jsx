import { FiSmartphone } from 'react-icons/fi';
import ConceptLayout from "../ConceptLayout";
import foundations from './mobile-data/foundations';
import reactNative from './mobile-data/react-native';
import flutterDart from './mobile-data/flutter-dart';
import otherFrameworks from './mobile-data/other-frameworks';
import uiDesignSystems from './mobile-data/ui-design-systems';
import navigationRouting from './mobile-data/navigation-routing';
import stateManagement from './mobile-data/state-management';
import nativeApis from './mobile-data/native-apis';
import performance from './mobile-data/performance';
import networkingData from './mobile-data/networking-data';
import testingQuality from './mobile-data/testing-quality';
import deployment from './mobile-data/deployment';
import architecturePatterns from './mobile-data/architecture-patterns';
import advancedEmerging from './mobile-data/advanced-emerging';

const categories = [
  foundations,
  reactNative,
  flutterDart,
  otherFrameworks,
  uiDesignSystems,
  navigationRouting,
  stateManagement,
  nativeApis,
  performance,
  networkingData,
  testingQuality,
  deployment,
  architecturePatterns,
  advancedEmerging,
];

export const meta = {
  title: "Cross-Platform Mobile",
  description: "From React Native to Flutter — every concept for building world-class mobile apps",
  icon: FiSmartphone,
  color: '#0ea5e9',
  conceptCount: categories.reduce((sum, cat) => sum + cat.concepts.length, 0),
};

export default function CrossPlatformMobileConcepts() {
  return (
    <ConceptLayout
      title="Cross-Platform Mobile"
      subtitle="From first principles to production — every tool, pattern, and platform concept for modern mobile development"
      accentColor="#0ea5e9"
      categories={categories}
    />
  );
}
