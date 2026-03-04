import { FiSmartphone } from 'react-icons/fi';
import ConceptLayout from '../ConceptLayout';
import foundations from './pwa-data/foundations';
import serviceWorkers from './pwa-data/service-workers';
import cachingStrategies from './pwa-data/caching-strategies';
import pushNotifications from './pwa-data/push-notifications';
import installation from './pwa-data/installation';
import performance from './pwa-data/performance';
import storageApis from './pwa-data/storage-apis';
import deviceApis from './pwa-data/device-apis';
import tooling from './pwa-data/tooling';
import patterns from './pwa-data/patterns';

const categories = [
  foundations,
  serviceWorkers,
  cachingStrategies,
  pushNotifications,
  installation,
  performance,
  storageApis,
  deviceApis,
  tooling,
  patterns,
];

export const meta = {
  title: "Progressive Web Apps",
  description: "From service workers and caching strategies to push notifications, offline-first architecture, and Core Web Vitals — the complete guide to building installable, fast, and reliable web apps",
  icon: FiSmartphone,
  color: '#7c3aed',
  conceptCount: categories.reduce((sum, cat) => sum + cat.concepts.length, 0),
};

export default function PWAConcepts() {
  return (
    <ConceptLayout
      title="Progressive Web Apps"
      subtitle="From service workers and caching strategies to push notifications, device APIs, and performance — everything you need to build installable, offline-capable, native-quality web apps"
      accentColor="#7c3aed"
      categories={categories}
    />
  );
}
