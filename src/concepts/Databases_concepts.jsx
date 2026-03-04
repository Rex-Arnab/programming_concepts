import { FiDatabase } from 'react-icons/fi';
import ConceptLayout from '../ConceptLayout';
import dbFundamentals from './databases-data/db-fundamentals';
import sqlRelational from './databases-data/sql-relational';
import nosql from './databases-data/nosql';
import newsqlDistributed from './databases-data/newsql-distributed';
import dataModeling from './databases-data/data-modeling';
import queryPerformance from './databases-data/query-performance';
import dataEngineering from './databases-data/data-engineering';
import dataWarehousing from './databases-data/data-warehousing';
import bigDataStreaming from './databases-data/big-data-streaming';
import dataScienceAnalytics from './databases-data/data-science-analytics';
import dbOperations from './databases-data/db-operations';
import advancedEmerging from './databases-data/advanced-emerging';

const categories = [
  dbFundamentals,
  sqlRelational,
  nosql,
  newsqlDistributed,
  dataModeling,
  queryPerformance,
  dataEngineering,
  dataWarehousing,
  bigDataStreaming,
  dataScienceAnalytics,
  dbOperations,
  advancedEmerging,
];

export const meta = {
  title: "Databases",
  description: "From ACID and SQL fundamentals to NoSQL, NewSQL, data warehousing, big data, and ML-powered databases — the complete data platform reference",
  icon: FiDatabase,
  color: '#6366f1',
  conceptCount: categories.reduce((sum, cat) => sum + cat.concepts.length, 0),
};

export default function DatabasesConcepts() {
  return (
    <ConceptLayout
      title="Databases"
      subtitle="From B-Trees and ACID to Kafka, Spark, and vector search — every concept for designing, building, and operating data systems at scale"
      accentColor="#6366f1"
      categories={categories}
    />
  );
}
