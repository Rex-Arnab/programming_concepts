const monitoring = {
  name: "Performance Monitoring & RUM",
  icon: "📡",
  color: "#84cc16",
  concepts: [
    {
      id: 1389,
      name: "Real User Monitoring (RUM)",
      desc: `**Real User Monitoring (RUM)** — collecting performance metrics from actual users' browsers as they interact with your site in production, providing field data that reflects the true diversity of devices, networks, geographies, and usage patterns that synthetic lab testing cannot capture.

**RUM vs Synthetic monitoring:**
- **RUM:** real users, real devices, real networks, real data. Shows what's actually happening to your users. Requires traffic (no data for new features). Delayed insight (data collected after fact).
- **Synthetic:** scripted bots from fixed locations, controlled conditions. Repeatable and comparable. Good for CI/regression detection. Doesn't reflect user diversity.

**What RUM collects:** Core Web Vitals (LCP, INP, CLS, FCP, TTFB) per page visit, resource timing for all loaded assets, navigation timing for page loads, long task counts, custom marks and measures.

**RUM implementation with web-vitals:**
"import { onLCP, onINP, onCLS } from 'web-vitals';
const send = ({ name, value, rating, id }) =>
  fetch('/rum', { method: 'POST', keepalive: true,
    body: JSON.stringify({ name, value, rating, url: location.href,
      device: navigator.userAgentData?.mobile ? 'mobile' : 'desktop' }) });
onLCP(send); onINP(send); onCLS(send);"

**"keepalive: true" on fetch:** ensures the beacon is sent even if the user navigates away (page is unloaded). Same as Beacon API ("navigator.sendBeacon('/rum', data)").

**RUM data segmentation (the key to actionability):** raw p75 LCP for the whole site is less useful than LCP segmented by: page template (homepage vs product vs checkout), device type (mobile vs desktop), geographic region, connection type (4G vs WiFi), and deployment version. Finding "mobile users in Southeast Asia have a 6s LCP on the product page" is the level of specificity needed to fix the issue.

**Key insight:** RUM is the difference between "we think our site is fast" and "we know that 12% of our users experience poor LCP, primarily on Android devices in India on 4G connections." Without RUM, performance optimization is guesswork. With RUM, you fix the specific combination of page × device × network × geography that affects real revenue.`,
    },
    {
      id: 1390,
      name: "Performance Observer API",
      desc: `**PerformanceObserver** — the browser API for observing performance entries asynchronously, without polling. Replaces the older "performance.getEntries()" approach with a callback-based system that fires when specific performance events occur.

**Supported entry types:**
- "navigation": full page load timing (domContentLoaded, load event, TTFB)
- "resource": individual resource load timing (images, scripts, CSS, fetch calls)
- "paint": FCP and FP (First Paint) events
- "largest-contentful-paint": LCP candidates as they're identified
- "layout-shift": CLS shifts as they occur
- "longtask": tasks exceeding 50ms on the main thread
- "event": interaction events for INP measurement
- "mark" and "measure": custom user timing marks

**Usage pattern:**
"const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry.entryType, entry.name, entry.startTime, entry.duration);
  }
});
observer.observe({ type: 'largest-contentful-paint', buffered: true });
observer.observe({ type: 'layout-shift', buffered: true });
observer.observe({ type: 'longtask', buffered: true });"

**"buffered: true":** important — without this, PerformanceObserver only sees entries from after the observer was registered. "buffered: true" includes entries that occurred before the observer was created (e.g., FCP that happened during page load before your analytics script ran).

**Custom user timing:**
"performance.mark('checkout-start');
await processPayment();
performance.mark('checkout-end');
performance.measure('checkout-duration', 'checkout-start', 'checkout-end');
// Observable via PerformanceObserver with type: 'measure'"

**Key insight:** PerformanceObserver is the building block under every serious web performance tool — the web-vitals library, Lighthouse, and all RUM SDKs use it internally. Understanding it directly allows you to build custom, lightweight RUM that collects exactly the data you need without a third-party SDK dependency.`,
    },
    {
      id: 1391,
      name: "Navigation Timing API",
      desc: `**Navigation Timing API** — provides detailed timing information for the full page load lifecycle, from the start of the navigation to the complete rendering. Available via "performance.getEntriesByType('navigation')[0]" (Level 2) or the legacy "performance.timing" object.

**Timing breakdown (in chronological order):**
1. "startTime" (0): navigation start
2. "domainLookupStart/End": DNS resolution
3. "connectStart/End": TCP connection establishment
4. "secureConnectionStart": TLS handshake start
5. "requestStart": first byte of request sent
6. "responseStart": first byte of response received (TTFB = responseStart - requestStart)
7. "responseEnd": last byte received (HTML fully downloaded)
8. "domInteractive": HTML parsed, DOM built (DOMContentLoaded without blocking resources)
9. "domContentLoadedEventStart/End": DOMContentLoaded event
10. "domComplete": all subresources loaded
11. "loadEventStart/End": window.onload event fired

**Derived metrics you can compute:**
"const nav = performance.getEntriesByType('navigation')[0];
const ttfb = nav.responseStart - nav.startTime;
const domContentLoaded = nav.domContentLoadedEventEnd - nav.startTime;
const fullyLoaded = nav.loadEventEnd - nav.startTime;
const htmlDownload = nav.responseEnd - nav.responseStart;
const tlsHandshake = nav.connectEnd - nav.secureConnectionStart;"

**Redirect timing:** "redirectStart/End" measures time for any HTTP redirects. A 3-redirect chain adds 3 × (DNS + TCP + TTFB) to the total navigation time — measure and eliminate redirects.

**Navigation type:** "nav.type" returns "navigate", "reload", "back_forward", or "prerender". "back_forward" with instant load time means bfcache hit — track this as a separate performance bucket.

**Key insight:** Navigation Timing is how you measure TTFB in production for real users. Unlike Lighthouse (which measures TTFB under simulation), Navigation Timing API gives you the actual TTFB for every page load across your entire user base — segmentable by geography, connection speed, and device to identify exactly where server or CDN performance is poor.`,
    },
    {
      id: 1392,
      name: "Server-Timing Header",
      desc: `**Server-Timing Header** — an HTTP response header that lets the server expose timing information about its processing stages to the browser's DevTools, making server-side performance visible in the client-side Network tab timeline.

**Header format:**
"Server-Timing: db;dur=53.2;desc='Database query', cache;dur=1.1;desc='Cache lookup', render;dur=89.0;desc='Template render'"

**How it looks in DevTools:** Network tab → click the request → Timing tab → at the bottom, a "Server Timing" section appears with each named metric as a horizontal bar, scaled to its duration. Clicking "Response Headers" also shows the raw header.

**Server-side implementation examples:**
"// Express.js middleware
app.use((req, res, next) => {
  const start = Date.now();
  const timings = [];
  res.startTimer = (name) => ({ name, start: Date.now() });
  res.endTimer = (t) => timings.push(t.name + ';dur=' + (Date.now() - t.start));
  res.on('finish', () => {
    timings.push('total;dur=' + (Date.now() - start));
    res.setHeader('Server-Timing', timings.join(', '));
  });
  next();
});"

**Practical debugging use:** when a page has a slow TTFB (2s), Server-Timing breaks it down: "db;dur=1800ms, template;dur=180ms" → the database query took 1.8s of the 2s TTFB. Without Server-Timing, server-side timing is a black box to the frontend.

**Privacy consideration:** Server-Timing exposes internal implementation details. Use "Timing-Allow-Origin" header to control cross-origin access. In production, consider disabling detailed Server-Timing for public endpoints (only expose to authenticated users or internal IPs).

**Key insight:** Server-Timing bridges the backend/frontend performance divide. Frontend developers can see exactly how the server spent its time for each request without requiring server-side profiler access. This makes TTFB optimization collaborative — when "db;dur=800ms" is visible in the Network tab, it's immediately clear that the database is the bottleneck, not the template engine or the network.`,
    },
    {
      id: 1393,
      name: "Synthetic Monitoring & Uptime",
      desc: `**Synthetic Monitoring** — automated, scheduled performance testing that runs scripted browser sessions against your site from fixed locations at regular intervals (every 1-5 minutes), regardless of real user traffic. Detects regressions and outages before users report them.

**Synthetic vs RUM:**
- Synthetic: "is the site up and fast right now?" — immediate detection, no user traffic needed, comparable baselines
- RUM: "what are real users actually experiencing?" — reflects device diversity, captures edge cases, shows actual business impact

**Synthetic monitoring tools:**
- **Datadog Synthetics:** browser tests that run real Chrome scenarios on schedule; Lighthouse-powered performance metrics; alert on regressions
- **SpeedCurve:** continuous LH/WebPageTest runs, trend charts, deployment annotations, budget alerts
- **Calibre:** performance monitoring with Lighthouse CI integration, team dashboards, slack alerts
- **Checkly:** Playwright-based monitoring with code-first test definitions; API + browser checks
- **Uptime Robot + WebPageTest API:** DIY synthetic monitoring for small teams

**What to monitor:**
- Critical user paths: homepage, product page, checkout, login
- Multiple geographic regions: US East, EU West, Asia Pacific
- Mobile and desktop separately
- Performance on deploy (compare pre/post deploy automatically)

**Alert thresholds:**
- LCP regression > 500ms from baseline → Slack alert
- Performance score drops below 75 → PagerDuty
- Page unavailable (5xx or timeout) → immediate incident alert

**Deployment annotations:** mark deployment events on performance trend charts. A performance degradation that starts exactly at a deploy timestamp is almost always caused by that deploy — instant RCA.

**Key insight:** synthetic monitoring catches the performance regression before it reaches users. Without it, a deploy that worsens LCP from 1.8s to 4.5s is discovered by users complaining and a 15% conversion drop — hours or days after the fact. With synthetic monitoring, the alert fires 5 minutes after deploy, the engineer reverts, and no user is affected.`,
    },
    {
      id: 1394,
      name: "Performance Dashboards & Alerting",
      desc: `**Performance Dashboards** — centralized, continuously updated visualizations of performance metrics from both synthetic and real-user data, making performance health visible to the entire team and enabling quick detection of regressions.

**Effective dashboard components:**
- **Core Web Vitals trend chart:** LCP/INP/CLS over time for key pages (30-day view)
- **p75 vs p95 split:** p75 (the "Good" threshold) and p95 (catches severe outliers)
- **Device breakdown:** mobile vs desktop side-by-side (mobile is almost always worse)
- **Top pages by traffic weighted poor experience:** pages where the most users have poor CWVs
- **Deploy annotations:** vertical lines when new versions deploy
- **Performance score trend:** Lighthouse score history from CI

**Alerting strategy — tiered by severity:**
- **P1 (immediate page):** LCP > 6s, site unavailable, performance score drops 20+ points (deploy gone wrong)
- **P2 (Slack alert):** LCP p75 regresses 1s vs 7-day baseline, TBT > 500ms
- **P3 (weekly digest):** slow degradation trend, CLS above threshold on specific pages

**Tools for dashboards:**
- **Grafana + PromQL:** plot RUM data from your analytics store
- **SpeedCurve:** best-in-class performance trend charts and historical comparisons
- **Google Looker Studio + CrUX API:** free dashboard from Chrome's field data
- **Datadog:** if already using Datadog for infrastructure, add web performance panels

**CrUX API for dashboards:** free Google API providing 28-day rolling p75 Core Web Vitals for any URL. "https://chromeuxreport.googleapis.com/v1/records:queryRecord" — pull into BigQuery or Grafana for trend visualization.

**Key insight:** performance dashboards make the invisible visible. Without dashboards, performance is a point-in-time concern ("we ran Lighthouse last month"). With dashboards, performance becomes an ambient signal — engineers notice the LCP trend line drifting upward over the past 2 weeks and investigate before it becomes a problem. The dashboard is the performance team's heartbeat monitor.`,
    },
  ],
};

export default monitoring;
