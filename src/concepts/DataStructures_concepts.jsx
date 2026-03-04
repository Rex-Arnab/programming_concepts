import { FiCpu } from 'react-icons/fi';
import ConceptLayout from '../ConceptLayout';
import foundations from './dsa-data/foundations';
import arraysStrings from './dsa-data/arrays-strings';
import linkedLists from './dsa-data/linked-lists';
import stacksQueues from './dsa-data/stacks-queues';
import trees from './dsa-data/trees';
import heaps from './dsa-data/heaps';
import hashTables from './dsa-data/hash-tables';
import graphs from './dsa-data/graphs';
import sortingSearching from './dsa-data/sorting-searching';
import dynamicProgramming from './dsa-data/dynamic-programming';
import greedy from './dsa-data/greedy';
import advancedDs from './dsa-data/advanced-ds';

const categories = [
  foundations,
  arraysStrings,
  linkedLists,
  stacksQueues,
  trees,
  heaps,
  hashTables,
  graphs,
  sortingSearching,
  dynamicProgramming,
  greedy,
  advancedDs,
];

export const meta = {
  title: "Data Structures & Algorithms",
  description: "From Big O and arrays to graphs, dynamic programming, and advanced data structures — the complete reference for algorithmic thinking, interview prep, and systems design",
  icon: FiCpu,
  color: '#6366f1',
  conceptCount: categories.reduce((sum, cat) => sum + cat.concepts.length, 0),
};

export default function DataStructuresConcepts() {
  return (
    <ConceptLayout
      title="Data Structures & Algorithms"
      subtitle="From Big O notation and fundamental data structures to advanced graph algorithms, dynamic programming, and the structures that power production systems — your career-long DSA reference"
      accentColor="#6366f1"
      categories={categories}
    />
  );
}
