import { Routes, Route, Link } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiSun, FiMoon, FiChevronLeft, FiArrowRight } from 'react-icons/fi';
import concepts from './concepts';
import './App.css';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="theme-toggle"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo">{'</>'}</span>
          <span className="navbar-title">Programming Concepts</span>
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="home-container">
      <div className="hero">
        <div className="hero-label">
          <span className="hero-label-dot" />
          Open Source Learning
        </div>
        <h1 className="hero-title">Programming Concepts</h1>
        <p className="hero-subtitle">
          Interactive reference guides for core engineering topics.
          Pick a concept and start building your understanding.
        </p>
        <div className="hero-stats">
          <span className="hero-stat">{concepts.length} topics</span>
          <span className="hero-stat">Interactive guides</span>
        </div>
      </div>

      <div className="card-grid">
        {concepts.map((c) => (
          <Link
            key={c.slug}
            to={`/concept/${c.slug}`}
            className="concept-card"
            style={{ '--card-color': c.color }}
          >
            {/* Header: Icon + Badge */}
            <div className="card-header">
              <div className="card-icon">
                {c.icon ? <c.icon size={26} /> : <span>📄</span>}
              </div>
            </div>

            {/* Body: Title + Description */}
            <div className="card-body">
              <h2 className="card-title">{c.title}</h2>
              {c.description && <p className="card-desc">{c.description}</p>}
            </div>

            {/* Footer: Explore link */}
            <div className="card-footer">
              <span className="card-explore">
                Explore topic
                <FiArrowRight className="card-arrow" size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ConceptPage({ Component }) {
  return (
    <div className="concept-wrapper">
      <div className="concept-back-row">
        <Link to="/" className="back-link">
          <FiChevronLeft size={16} />
          Back to topics
        </Link>
      </div>
      <Component />
    </div>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
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
      </main>
    </div>
  );
}
