import { Routes, Route, Link } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiSun, FiMoon, FiChevronLeft, FiArrowRight } from 'react-icons/fi';
import concepts from './concepts';
import './App.css';

// ── Count-up animation hook ──
function useCountUp(target, duration = 900) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

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

// ── Scroll progress bar for concept pages ──
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}

function Navbar({ showProgress = false }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo">
            {'<'}
            <span className="navbar-cursor">/</span>
            {'>'}
          </span>
          <span className="navbar-title">Programming Concepts</span>
        </Link>
        <ThemeToggle />
      </div>
      {showProgress && <ScrollProgress />}
    </nav>
  );
}

function Home() {
  const totalConceptCount = concepts.reduce((sum, c) => sum + (c.conceptCount || 0), 0);
  const animatedCount = useCountUp(totalConceptCount, 1000);
  const domainCount = useCountUp(concepts.length, 600);

  return (
    <div className="home-container">
      <div className="hero">
        <div className="hero-label">
          <span className="hero-cursor-block" aria-hidden="true" />
          Open Source Learning
        </div>
        <h1 className="hero-title">
          <span style={{ color: 'var(--color-accent)' }}>Programming</span> Concepts
        </h1>
        <p className="hero-subtitle">
          Interactive reference guides for core engineering topics.
          Pick a concept and start building your understanding.
        </p>
        <div className="hero-stats">
          <span className="hero-stat">
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800 }}>
              {domainCount}
            </span>
            {' '}topic areas
          </span>
          <span className="hero-stat">
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800 }}>
              {animatedCount.toLocaleString()}
            </span>
            {' '}concepts
          </span>
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
            {/* Colored header band */}
            <div className="card-band">
              <div className="card-icon">
                {c.icon ? <c.icon size={26} /> : <span>📄</span>}
              </div>
              {c.conceptCount > 0 && (
                <span className="card-count-badge">{c.conceptCount}</span>
              )}
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
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main className="main-content">
                <Home />
              </main>
            </>
          }
        />
        {concepts.map((c) => (
          <Route
            key={c.slug}
            path={`/concept/${c.slug}`}
            element={
              <>
                <Navbar showProgress />
                <main className="main-content">
                  <ConceptPage Component={c.Component} />
                </main>
              </>
            }
          />
        ))}
      </Routes>
    </div>
  );
}
