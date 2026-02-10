import { Routes, Route, Link } from 'react-router-dom';
import concepts from './concepts';
import './App.css';

function Home() {
  return (
    <div className="home">
      <h1>Programming Concepts</h1>
      <ul className="concept-list">
        {concepts.map((c) => (
          <li key={c.slug}>
            <Link to={`/concept/${c.slug}`}>
              <strong>{c.title}</strong>
              {c.description && <span> — {c.description}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ConceptPage({ Component }) {
  return (
    <div className="concept-page">
      <Link to="/" className="back-link">← Back</Link>
      <Component />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {concepts.map((c) => (
        <Route
          key={c.slug}
          path={`/concept/${c.slug}`}
          element={<ConceptPage Component={c.Component} />}
        />
      ))}
    </Routes>
  );
}
