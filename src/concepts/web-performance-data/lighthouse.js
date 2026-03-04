const lighthouse = {
  name: "Lighthouse & Auditing Tools",
  icon: "🔦",
  color: "#06b6d4",
  concepts: [
    {
      id: 1382,
      name: "Lighthouse Overview",
      desc: `**Lighthouse** — Google's open-source automated auditing tool that analyzes web pages for Performance, Accessibility, Best Practices, SEO, and Progressive Web App (PWA) criteria, producing a 0-100 score and actionable recommendations for each category.

**Running Lighthouse:**
- **DevTools:** F12 → Lighthouse tab → select categories → "Analyze page load"
- **CLI:** "npx lighthouse https://example.com --output html --output-path report.html"
- **Chrome Extension:** for quick one-click audits
- **PageSpeed Insights:** lighthouse.google.com — runs Lighthouse remotely plus real CrUX field data
- **CI:** Lighthouse CI for automated regression testing

**What Lighthouse measures (lab data):** Lighthouse runs in a headless Chrome with simulated "Moto G4 on Fast 3G" conditions (CPU 4x slowdown, 1.6Mbps network). This is controlled, repeatable, but not identical to real user experience.

**Performance score formula (approximate weights):**
- LCP: 25%
- TBT: 30% (proxy for INP in lab)
- CLS: 15%
- FCP: 10%
- Speed Index: 10%
- TTI: 10% (being phased out)

**Lighthouse audits vs metrics:** metrics (LCP, TBT, CLS) compute the score. Audits (diagnostic opportunities) — like "Eliminate render-blocking resources," "Reduce unused JavaScript," "Properly size images" — explain what to fix. Focus on the metric values; use audits to identify causes.

**Score variability:** Lighthouse scores vary by ±5 points between runs due to CPU and network noise in the simulation. Run 3-5 times and median the results for stable comparisons. Lighthouse CI uses median of multiple runs automatically.

**Key insight:** Lighthouse is a development and CI tool, not a production monitoring tool. A "100" Lighthouse score on your laptop doesn't mean 100% of users have a good experience — only CrUX field data tells you that. Use Lighthouse to identify and fix issues; use CrUX to confirm the fixes improved real user experience.`,
    },
    {
      id: 1383,
      name: "Lighthouse CI",
      desc: `**Lighthouse CI (LHCI)** — a set of tools that run Lighthouse audits automatically in CI/CD pipelines, compare results against baselines, and block merges when performance regressions occur. The automated layer that makes performance budgets enforceable.

**Setup (GitHub Actions):**
".github/workflows/lhci.yml:
  - uses: actions/checkout
  - run: npm ci && npm run build
  - uses: treosh/lighthouse-ci-action@v11
    with:
      uploadArtifacts: true
      temporaryPublicStorage: true"

**lighthouserc.js configuration:**
"module.exports = {
  ci: {
    collect: { url: ['http://localhost:4173/'], startServerCommand: 'npm run preview' },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],  // Fail if score < 80
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],  // Warn if LCP > 2.5s
        'total-blocking-time': ['error', { maxNumericValue: 200 }],  // Fail if TBT > 200ms
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
    upload: { target: 'temporary-public-storage' },
  },
};"

**LHCI server:** self-hosted server (Docker) that stores audit history, generates trend charts, provides PR comments with score diffs. Connects to your CI via "LHCI_TOKEN".

**Status checks in PRs:** LHCI posts a GitHub status check with the scores for each audited URL. PRs that regress LCP by 500ms or drop the score below the threshold are blocked.

**Running LHCI locally:** "lhci autorun" — same as CI, runs locally against your dev build. Catch regressions before pushing.

**Key insight:** LHCI converts performance from "we care about it" to "we can't merge without it." The workflow: developer adds a feature → LHCI runs → TBT is now 350ms (was 150ms) → PR is blocked → developer investigates the new code that added 200ms of main thread work → fixes before merging. This prevents the gradual performance degradation that plagues every long-lived web app.`,
    },
    {
      id: 1384,
      name: "PageSpeed Insights & CrUX",
      desc: `**PageSpeed Insights (PSI)** — Google's web tool (pagespeed.web.dev) that combines two data sources: Lighthouse lab data (run against your URL) and Chrome UX Report (CrUX) field data (real user measurements from Chrome users who visited your page).

**Lab data vs Field data:** this is the most important distinction in web performance:
- **Lab data (Lighthouse):** controlled simulation. Reproducible. Run on your demand. Doesn't reflect real users' devices, networks, or locations. Good for: identifying issues, testing fixes.
- **Field data (CrUX):** real user measurements from the Chrome browser. Reflects actual devices, networks, and geographic distribution of your users. Updated monthly (main CrUX dataset) or daily (CrUX API). Good for: understanding real user experience, confirming fixes worked in production.

**Why they differ:** your users may be mostly on mobile (worse performance than Lighthouse desktop simulation), your server may be fast in the US but slow in Europe (affects field TTFB), or your page has content that only loads after user interaction (Lighthouse doesn't interact).

**CrUX data requirements:** PSI shows field data only if your URL has sufficient traffic (minimum threshold of Chrome users for privacy). Low-traffic pages show "The Chrome User Experience Report does not have sufficient real-world speed data for this page."

**Origin-level vs URL-level data:** PSI can show data for the entire origin (all pages on example.com) or a specific URL. Origin-level is more likely to have sufficient data.

**CrUX API:** "https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=API_KEY" — programmatic access to field data for any public URL. Returns p75 values for all Core Web Vitals with "GOOD"/"NEEDS_IMPROVEMENT"/"POOR" classifications.

**Key insight:** a Lighthouse score of 90 with CrUX data showing "Poor" LCP for 40% of users is more informative than either metric alone. It means: the issue doesn't reproduce in lab conditions (fast machine, single location) but is real for users — likely caused by geographic server latency, diverse device performance, or interaction-dependent content loading.`,
    },
    {
      id: 1385,
      name: "WebPageTest",
      desc: `**WebPageTest (webpagetest.org)** — an advanced web performance testing tool that provides detailed waterfall charts, filmstrip views, video comparisons, scripted testing, and testing from real browsers on real devices at various locations worldwide. More powerful than Lighthouse for deep performance analysis.

**Key differentiators from Lighthouse:**
- **Real browsers on real hardware:** test from a Moto G4 on 3G in Mumbai, or a Pixel 7 on LTE in Tokyo — not simulated
- **Multiple global test locations:** pick from 40+ real geographic locations to understand regional performance differences
- **Filmstrip view:** frame-by-frame video of the page loading — visually identifies exactly when content appears
- **Connection view (waterfall):** more detailed than DevTools — shows TCP streams, SSL handshakes, connection reuse
- **Scripted testing:** automate multi-step flows (login → navigate to product → add to cart) and measure the whole flow

**WebPageTest features:**
- "First View" vs "Repeat View": cold cache vs warm cache performance comparison (shows browser caching effectiveness)
- "Compare" view: A/B compare two URLs or configurations side-by-side in a synchronized video
- "Opportunities & Experiments": AI-powered suggestions with estimated improvement for each
- "Core Web Vitals" timeline: shows exactly when LCP/CLS/INP events occurred with filmstrip context
- API access: automate WebPageTest runs from CI via their REST API

**WebPageTest vs Lighthouse:** use Lighthouse for quick audits and CI; use WebPageTest for deep investigation of specific performance issues, especially when: LCP is slow in field but not in Lighthouse, performance varies by region, or you need to test a multi-step user flow.

**Key insight:** the WebPageTest filmstrip is uniquely valuable for diagnosing perceived performance. It shows the actual user experience: "the page was blank for 2.1s, then showed a skeleton screen at 2.3s, then main content at 3.8s." This visual timeline communicates the user experience problem in a way that metric numbers alone cannot, and is extremely effective for making the business case for performance investment.`,
    },
    {
      id: 1386,
      name: "web-vitals Library",
      desc: `**web-vitals library** — Google's official JavaScript library for measuring Core Web Vitals (LCP, INP, CLS) and diagnostic metrics (FCP, TTFB) in real user browsers with the same measurement methodology used by Chrome and CrUX. The standard foundation for custom RUM.

**Installation and usage:**
"import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // metric: { name, value, rating ('good'|'needs-improvement'|'poor'), delta, id }
  fetch('/analytics', { method: 'POST', body: JSON.stringify(metric) });
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
onFCP(sendToAnalytics);
onTTFB(sendToAnalytics);"

**Metric reporting timing:**
- "onLCP": fires when LCP is finalized (on page hide/beforeunload, or when a user interaction occurs after initial load)
- "onINP": fires on page hide with the final INP value (worst interaction during the session)
- "onCLS": fires on page hide with the session window CLS score
- "onFCP", "onTTFB": fire on measurement, early in page load

**"reportAllChanges" option:** "onCLS(fn, { reportAllChanges: true })" reports CLS updates in real time as layout shifts accumulate. Useful for debugging specific interactions that cause CLS.

**Attribution build ("web-vitals/attribution"):** provides additional debugging data — for LCP, includes the element, loadStart, loadEnd, renderTime; for CLS, includes shifted elements; for INP, includes the interaction event type and element.

**Integration with analytics:** send web-vitals data to Google Analytics 4 (GA4 has built-in Core Web Vitals events), or any custom analytics endpoint. Segment by device type, page template, user cohort to identify which users have poor experiences.

**Key insight:** web-vitals is the missing link between Lighthouse (what could happen) and CrUX (what happened in aggregate). It lets you measure the exact Core Web Vital experience of each individual user, attribute it to specific pages, user cohorts, or deployment changes, and build a RUM dashboard that answers "which page has the worst real LCP, and for which users?"`,
    },
    {
      id: 1387,
      name: "Performance Score Methodology",
      desc: `**Lighthouse Performance Score** — a single number (0-100) computed as a weighted median of performance metric scores. Each metric is normalized to a 0-1 scale based on its distribution across real websites, then weighted and combined.

**Metric weights (approximate, v12):**
- Total Blocking Time: 30%
- Largest Contentful Paint: 25%
- Cumulative Layout Shift: 15%
- First Contentful Paint: 10%
- Speed Index: 10%

**Metric scoring curves:** each metric has a non-linear scoring curve. LCP of 1.0s scores ~99; LCP of 2.5s scores ~50; LCP of 4.0s scores ~20. The curves are derived from HTTP Archive data of real website performance distributions — a score of 50 means you're at the 50th percentile of the web.

**Score color zones:**
- 0-49 (red): Poor
- 50-89 (orange): Needs Improvement
- 90-100 (green): Good

**Why the score is not perfectly reproducible:** Lighthouse simulates a throttled CPU and network, but timing is inherently variable (OS scheduling, V8 JIT behavior). Scores can vary ±5-8 points between identical runs. Use "median of 5 runs" for reliable comparison.

**Score vs metric values:** optimizing for the score can lead to gaming the metrics. Optimize for metric values (LCP < 2.5s, TBT < 200ms, CLS < 0.1) — the score follows. A "Performance 78" is less actionable than "LCP = 3.8s, TBT = 450ms."

**Score evolution:** Lighthouse v1-v12 has changed metric weights and scoring curves multiple times. Compare scores only within the same Lighthouse version. CI baselines should pin Lighthouse version.

**Key insight:** the Lighthouse score is a useful summary for communication ("we improved from 45 to 78") but poor for debugging. Always focus on individual metric values and the specific audit recommendations. Two pages can score 65 for very different reasons — one with poor LCP, one with poor TBT — requiring completely different fixes.`,
    },
    {
      id: 1388,
      name: "Performance Auditing Workflow",
      desc: `**Performance Auditing Workflow** — a systematic, repeatable process for diagnosing web performance issues, prioritizing fixes by impact, implementing and verifying improvements, and preventing future regressions.

**Step 1 — Establish baseline:** run Lighthouse 3-5 times on mobile preset (Incognito, no extensions) and take the median score. Check PSI for CrUX field data. Note the worst metrics.

**Step 2 — Identify the bottleneck:** different metrics require different tools:
- Slow LCP → Network tab waterfall (is the LCP resource discovered late? slow to download?); Performance panel (what's the LCP element? what caused render delay?)
- High TBT → Performance panel flame chart (which long tasks? which scripts?)
- High CLS → Performance panel Layout Shift events (which elements? what caused them?)
- Slow TTFB → Network tab request timing (DNS? TCP? SSL? server processing?)

**Step 3 — Hypothesize a fix:** pick the highest-impact audit from Lighthouse. Form a specific hypothesis: "Adding 'fetchpriority=high' to the hero image will reduce LCP render delay from 800ms to <200ms."

**Step 4 — Implement and measure locally:** make the change → run Lighthouse 3x → compare medians. Did the target metric improve? By how much?

**Step 5 — Deploy to staging and measure:** run WebPageTest or Lighthouse CI against staging. Confirm improvement in a more production-like environment.

**Step 6 — Deploy to production and verify in field data:** deploy → wait 28 days (CrUX dataset cycle) or use daily CrUX API → confirm real user CrUX p75 improved.

**Anti-patterns in performance work:**
- Making multiple changes at once (can't attribute which change helped)
- Measuring only on your fast machine (doesn't reflect users)
- Focusing on the score number instead of user-facing metrics
- Fixing issues once and considering it done (performance degrades over time without monitoring)

**Key insight:** the most common performance auditing mistake is fixing Lighthouse warnings without understanding whether they affect the metrics that matter (LCP, INP, CLS). Lighthouse shows 50 potential improvements; the right workflow is: identify the worst metric → find its root cause → fix the root cause → verify improvement in field data. Fix the metric, not the audit.`,
    },
  ],
};

export default lighthouse;
