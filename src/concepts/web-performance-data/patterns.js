const patterns = {
  name: "Patterns & Best Practices",
  icon: "🧠",
  color: "#ef4444",
  concepts: [
    {
      id: 1395,
      name: "RAIL Performance Model",
      desc: `**RAIL Model** — Google's user-centric performance model that frames performance around four key user interaction types and defines response time goals for each: Response, Animation, Idle, Load. RAIL answers "fast enough for what?"

**RAIL breakdown:**
- **R — Response (user interaction feedback):** < 100ms. When a user clicks, taps, or presses a key, the response must begin within 100ms to feel instantaneous. The "100ms rule" comes from human perception — delays under 100ms feel like direct cause-and-effect; delays over 100ms break the illusion.
- **A — Animation (visual continuity):** 16ms per frame (60fps). Animations, scrolling, and drag operations must render a new frame every 16.67ms. Beyond 60fps, humans can't perceive the improvement.
- **I — Idle (background work):** use idle time wisely. When the user isn't interacting, use "requestIdleCallback" for non-critical work (prefetching, analytics processing). Break work into < 50ms chunks so the browser can respond to interactions between tasks.
- **L — Load (page ready for interaction):** < 1 second (first meaningful content). Users expect content within 1 second on mobile networks. Full interactivity within 5 seconds on mid-range mobile on 3G.

**RAIL vs Core Web Vitals:** RAIL is a mental model for engineers. Core Web Vitals are specific, measurable, automatically collected field metrics. CWV thresholds are derived from RAIL principles: LCP < 2.5s (Load), INP < 200ms (Response), CLS < 0.1 (Animation/visual stability).

**Key insight:** RAIL's enduring value is the "response time" hierarchy: < 100ms (feels instant), 100ms-1s (feels fast), 1-3s (noticeable delay, tolerable), 3-5s (likely bounce), > 5s (rage quit). Every performance optimization can be framed: "what threshold does this bring us under, and what does that mean for user perception?"`,
    },
    {
      id: 1396,
      name: "Perceived Performance",
      desc: `**Perceived Performance** — how fast a web experience feels to users, independent of actual measured load times. A page can be technically faster (lower LCP) but feel slower, or feel fast while being technically slow. Perceived performance is ultimately what drives user satisfaction and business metrics.

**Techniques that improve perception without changing actual metrics:**

**Skeleton screens:** render gray placeholder shapes matching the content layout before data loads. Users see structure immediately — the page "looks active" and loading feels shorter than a blank white screen. Facebook, LinkedIn use this pattern.

**Optimistic UI:** reflect user actions immediately in the UI before server confirmation. "Item added to cart" appears instantly; the API call happens in background. If it fails, rollback. Makes interactions feel instantaneous even on slow connections.

**Progressive loading:** show low-quality/blurred image placeholders (LQIP — Low Quality Image Placeholder), then replace with full resolution when loaded. The image appears immediately (even at low quality); full quality loads progressively.

**Progress indicators:** for operations taking 2-5 seconds, a progress bar (even a fake one) makes the wait feel shorter than a spinner, which feels shorter than a blank screen.

**Instant navigation (client-side routing):** SPA routing feels instant because only data changes, not the full page. Perceived as much faster than MPA full-page navigation even with similar data transfer.

**Hover-triggered preloading:** start preloading the next page when user hovers a link (50-100ms head start). By click time, prefetch has already started.

**Key insight:** users overestimate wait times by 36% on average when they have nothing to look at. The same actual wait time feels 33% shorter with a skeleton screen than with a blank page. Perceived performance optimizations often have higher ROI per effort than raw metric improvements — a skeleton screen takes 30 minutes to implement and makes every page load "feel" faster to every user.`,
    },
    {
      id: 1397,
      name: "Adaptive Loading",
      desc: `**Adaptive Loading** — serving different experiences based on the user's device capabilities, network conditions, or user preferences, ensuring that low-end users get a functional, fast experience rather than a degraded version of a desktop experience.

**Detection APIs:**
- "navigator.connection.effectiveType": "slow-2g", "2g", "3g", "4g" — estimated connection speed
- "navigator.connection.saveData": "true" if user has "Save Data" mode enabled (reduce data usage)
- "navigator.deviceMemory": device RAM in GB (0.25, 0.5, 1, 2, 4, 8)
- "navigator.hardwareConcurrency": number of CPU cores (proxy for CPU performance)

**Adaptive loading patterns:**

"// Serve lighter images on slow connections
const conn = navigator.connection;
if (conn?.effectiveType === '4g' && !conn?.saveData) {
  loadHighQualityImages();
} else {
  loadLowQualityImages();
}

// Skip non-critical features on low-memory devices
if (navigator.deviceMemory > 2) {
  loadRichAnimation();  // High-end only
}"

**React Adaptive Hooks:** the "react-adaptive-hooks" library provides: "useNetworkStatus", "useMemoryStatus", "useHardwareConcurrency" for component-level adaptive rendering.

**Server-side adaptation:** "Client-Hints" HTTP headers send device info with requests:
"Accept-CH: Sec-CH-UA, Sec-CH-UA-Mobile, Sec-CH-Device-Memory, Downlink"
Server can serve a lighter HTML response for mobile/low-memory devices.

**Save Data header:** "Save-Data: on" request header when user has data-saver mode. Serve reduced images, skip autoplay video, omit non-essential resources.

**Key insight:** a single experience optimized for the median user fails the long tail of lower-end devices. The 2nd and 3rd billion internet users often use sub-$100 Android phones on 2G/3G connections. Adaptive loading is the engineering practice that makes "web for everyone" real rather than aspirational — serving what each device can handle instead of what the developer's MacBook Pro handles.`,
    },
    {
      id: 1398,
      name: "Performance Anti-Patterns",
      desc: `**Performance Anti-Patterns** — recurring mistakes that consistently cause poor web performance. Recognizing these patterns allows teams to avoid them proactively rather than diagnosing them after the fact.

**The most common anti-patterns:**

**1. Unoptimized images (most impactful):** serving PNG where WebP would be 70% smaller; missing "width"/"height" (CLS); "loading='lazy'" on LCP image (delays the most important content); serving 2000px images to mobile at 390px width.

**2. Render-blocking resources:** "link rel=stylesheet" for non-critical CSS in the head; "script" without "defer/async" in the head; third-party scripts loading synchronously.

**3. No CDN for static assets:** serving JS/CSS/images from an origin server in one geographic region. Users 10,000km away pay the network latency on every asset.

**4. Layout thrashing:** alternating DOM reads and writes in a loop, forcing the browser to recalculate layout on every read. "Reading offsetHeight after writing to DOM" in a loop.

**5. Excessive DOM size:** > 1500 DOM nodes is a Lighthouse warning; > 10,000 nodes causes measurable slowdown. Long lists without virtualization; unnecessary wrapper divs; keeping off-screen content in the DOM.

**6. Third-party scripts without async/defer:** every synchronous third-party tag in the head serializes page load. One slow analytics beacon stalls FCP.

**7. Animating layout properties:** "width", "height", "margin", "top", "left" on every animation frame triggers full layout + paint. Animate "transform" and "opacity" only.

**8. Not measuring real users:** optimizing based only on Lighthouse, never checking CrUX field data. Page "looks fast" in lab but 40% of real mobile users have poor experience.

**9. Large bundles from monorepo shared libraries:** internal "utils" packages imported for 1 function but bundled entirely (missing tree shaking, often CommonJS).

**Key insight:** most web performance problems are caused by the same 5-10 anti-patterns, repeated across different sites. The good news: fixing these anti-patterns is well-understood, doesn't require specialized knowledge, and delivers significant improvements. A first performance audit on a mature product almost always finds at least three of these patterns active simultaneously.`,
    },
    {
      id: 1399,
      name: "Performance Culture",
      desc: `**Performance Culture** — the organizational practices, incentive structures, and engineering norms that make web performance a sustained team priority rather than a one-time project. Without culture, performance improvements regress; with culture, performance improves continuously.

**What performance culture looks like:**
- Performance regression blocks merges (Lighthouse CI enforced in CI/CD)
- Weekly performance dashboards shared with engineering and product
- Performance is a "definition of done" criteria for new features
- Performance review as part of design review for new pages
- A performance champion (dedicated engineer or rotation) who owns the dashboards and educates teammates
- Business metrics (conversion rate, bounce rate, revenue) correlated with performance metrics to quantify impact

**The business case (data from Google/Deloitte studies):**
- Each 100ms improvement in page load reduces bounce rate by 1%
- Pinterest reduced wait times by 40%, increased sign-ups by 15%
- BBC found they lost 10% of users for every additional second of page load
- Walmart found 1s improvement in page load increased revenue by 2%

**Performance regression root causes:** lack of monitoring (regressions are invisible), missing CI enforcement (no automated guardrails), scope creep (features added without performance review), third-party accumulation (each team adds a script without evaluating cumulative cost).

**Performance champions:** appointing one engineer per team as "performance DRI" who: reviews PRs for performance implications, maintains the dashboard, presents weekly trends, and investigates regressions. The champion doesn't own all performance work — they create accountability.

**Key insight:** "we did a performance project last quarter" is not performance culture. Performance culture is the state where performance regressions are caught automatically, cause a response, and are fixed before reaching users — without requiring a dedicated project. The technical infrastructure (LHCI, RUM dashboards, alerting) is the enabler; team norms and accountability are the culture.`,
    },
    {
      id: 1400,
      name: "Field Data vs Lab Data",
      desc: `**Field Data vs Lab Data** — the fundamental distinction in web performance measurement between data collected from real users (field) and data collected in controlled synthetic conditions (lab). Both are necessary; neither is sufficient alone.

**Lab data characteristics:**
- Source: Lighthouse, WebPageTest, CI
- Environment: controlled (fixed CPU, network, location, browser)
- Reproducibility: comparable run-to-run (±5% variability)
- Latency: immediate — run any time, get results instantly
- Best for: catching regressions, testing fixes before deploy, performance budgets, specific debugging

**Field data characteristics:**
- Source: CrUX, RUM (web-vitals library, analytics), Navigation Timing API
- Environment: real users — diverse devices (from iPhone 15 to $80 Android), diverse networks (5G to slow 2G), diverse geographies
- Reproducibility: varies naturally; requires statistical aggregation (p75, median)
- Latency: CrUX updates daily/monthly; RUM aggregates in near-real-time
- Best for: understanding actual user experience, confirming production impact, business correlation

**The "lab is fast but field is slow" problem:** common causes:
- Your users are primarily mobile (Lighthouse desktop defaults are misleading)
- Your users are in geographies far from your server
- Your page depends on personalized content (not testable in lab)
- Your third-party scripts behave differently under real network conditions
- Your page has content that only loads after user interactions

**Reconciliation strategy:** when lab says Good but field says Poor:
1. Run Lighthouse on mobile preset (matches more users)
2. Check geographic distribution of your users vs your CDN coverage
3. Instrument with web-vitals and segment by device/network/location
4. Use WebPageTest from the regions where field data is worst

**Key insight:** the gap between lab and field data is always informative. It tells you something about your users that your local testing environment doesn't capture. Treating lab data as the ground truth is how performance teams spend months fixing scores that don't move real user metrics. The field is the truth; the lab is the diagnostic tool.`,
    },
  ],
};

export default patterns;
