const coreWebVitals = {
  name: "Core Web Vitals & Metrics",
  icon: "📊",
  color: "#6366f1",
  concepts: [
    {
      id: 1315,
      name: "Core Web Vitals",
      desc: `**Core Web Vitals** — Google's three user-centric performance metrics (LCP, INP, CLS) that directly measure the quality of real-world user experience and factor into Google Search ranking since 2021.

The three pillars map to three user questions: "Is it happening?" (LCP — is content loading?), "Is it responsive?" (INP — does it respond to my input?), "Is it stable?" (CLS — is the layout stable?). Together they capture the most impactful dimensions of perceived performance.

**Why they matter:** Core Web Vitals are the rare case where performance metrics directly affect business outcomes — SEO ranking, bounce rate, conversion rate. Google's data shows pages hitting "Good" thresholds have 24% fewer abandonment events.

**Thresholds:** each metric has three zones: Good (green) / Needs Improvement (yellow) / Poor (red). Google evaluates the 75th percentile of field data from CrUX — meaning you need 75% of real users to have a "Good" experience, not just the average.

**Key insight:** Core Web Vitals shifted web performance from "can I make this fast?" to "are real users experiencing this as fast?" Lab tools tell you what's possible; CrUX tells you what's actually happening.`,
    },
    {
      id: 1316,
      name: "Largest Contentful Paint (LCP)",
      desc: `**Largest Contentful Paint (LCP)** — measures the time from when the page starts loading to when the largest image or text block visible in the viewport is rendered. Target: < 2.5s (Good), 2.5–4s (Needs Improvement), > 4s (Poor).

LCP answers "when does the page feel loaded?" — users perceive a page as loaded when they can see and read the main content, not when the DOM fires "load". The LCP element is determined dynamically as the page loads — an image that's large on desktop may not be the LCP element on mobile.

**Common LCP elements:** hero images, above-the-fold images, large text blocks, video poster frames. The element must be visible in the viewport.

**LCP killers:**
- Slow server response (TTFB > 600ms eats LCP budget)
- Render-blocking CSS/JS delaying paint
- LCP image not preloaded (discovered late in waterfall)
- LCP image not sized/served efficiently (wrong format, no compression)

**Fix pattern:** identify LCP element in DevTools Performance tab → check it has "fetchpriority=high" or a "rel=preload" link → ensure it's server-side rendered (not JS-injected) → serve optimized WebP/AVIF format.

**Key insight:** The single highest-ROI LCP fix is almost always adding "fetchpriority=high" to the LCP image or a "rel=preload" link in the head. Browsers otherwise discover the LCP image too late in the waterfall.`,
    },
    {
      id: 1317,
      name: "Interaction to Next Paint (INP)",
      desc: `**Interaction to Next Paint (INP)** — measures the latency of all user interactions (clicks, taps, keyboard presses) during a page visit and reports the worst-case (near-worst: 98th percentile). Target: < 200ms (Good), 200–500ms (Needs Improvement), > 500ms (Poor). Replaced First Input Delay (FID) in March 2024.

**Why INP is harder than FID:** FID only measured the delay of the first interaction. INP measures ALL interactions throughout the session — if your product page is fast but the cart drawer is slow, INP captures it.

**INP breakdown:** Interaction latency = input delay (busy main thread when user clicks) + processing time (your event handlers) + presentation delay (time to next frame after handlers run). Most INP problems are in processing time — slow event handlers.

**Common INP killers:**
- Large event handlers (synchronous DOM manipulation, loops)
- Third-party scripts congesting the main thread
- Long tasks blocking the thread when user clicks
- Expensive re-renders in React (not using transitions, missing memo)

**Fix pattern:** identify slow interaction in Chrome DevTools Performance panel → look at the event handler duration in the flame chart → break long synchronous work into smaller chunks using "scheduler.yield()" or "setTimeout" → defer non-critical work.

**Key insight:** INP is the most actionable Core Web Vital for JavaScript-heavy frameworks. The fix is almost always: defer non-critical work, break up long event handlers, and use "startTransition" in React to mark expensive state updates as non-urgent.`,
    },
    {
      id: 1318,
      name: "Cumulative Layout Shift (CLS)",
      desc: `**Cumulative Layout Shift (CLS)** — measures the sum of all unexpected layout shift scores during the entire page lifetime. Layout shift score = impact fraction × distance fraction. Target: < 0.1 (Good), 0.1–0.25 (Needs Improvement), > 0.25 (Poor).

CLS captures the frustrating experience of content jumping around while the page loads — text you're reading suddenly moves because an image above it loaded and wasn't sized, or a cookie banner injected into the DOM.

**Layout shift score formula:** if an unstable element moves from occupying 50% of the viewport to 75% (impact fraction = 75%) and moves 25% of the viewport height (distance fraction = 25%), the shift score = 0.75 × 0.25 = 0.1875.

**Common CLS causes:**
- Images/videos without explicit "width" and "height" attributes (browser doesn't reserve space)
- Ads, embeds, or iframes injected without reserved dimensions
- Web fonts causing FOUT (Flash of Unstyled Text) that changes text size
- Dynamically injected content above existing content (cookie banners, notifications)
- Late-loading custom fonts that change element size

**Fix patterns:** always set explicit "width" and "height" on images (CSS "aspect-ratio: attr(width) / attr(height)"); use "font-display: optional" or size-adjusted fallback fonts; reserve space for ads/embeds with min-height; avoid inserting content above the fold after load.

**Key insight:** CLS is uniquely session-long — a layout shift on a modal that opens 30 seconds in still counts. Use the "session window" algorithm (Chrome 91+) which groups shifts 1s apart up to 5s — fixing early-page shifts often solves 80% of CLS.`,
    },
    {
      id: 1319,
      name: "First Contentful Paint (FCP)",
      desc: `**First Contentful Paint (FCP)** — measures the time from when the page starts loading to when any text, image, non-white canvas, or SVG is rendered to the screen. Target: < 1.8s (Good), 1.8–3s (Needs Improvement), > 3s (Poor).

FCP answers "is anything happening?" — it's the moment users see the first visible signal that the page is loading. Unlike LCP which focuses on main content, FCP fires on the first pixel of content, even if it's a loading spinner.

**FCP vs LCP:** FCP can be deceptively fast if you show a spinner immediately, but LCP might be slow because the actual content loads later. A great FCP with poor LCP means "something showed fast but main content was still slow."

**FCP killers:** render-blocking stylesheets in the head (browser can't paint until CSSOM is built), render-blocking synchronous scripts before the body content, slow server responses (TTFB directly delays FCP).

**Fix pattern:** eliminate render-blocking resources → inline critical CSS above the fold → defer non-critical CSS → move scripts to end of body or add "async"/"defer" → improve server TTFB.

**Key insight:** FCP and TTFB are tightly linked — FCP = TTFB + time to parse HTML and render first content. If TTFB is 1.5s, FCP cannot be below 1.5s. Server performance and CDN proximity set the floor for all paint metrics.`,
    },
    {
      id: 1320,
      name: "Time to First Byte (TTFB)",
      desc: `**Time to First Byte (TTFB)** — measures the time between the browser sending an HTTP request and receiving the first byte of the server response. Target: < 800ms (Good), 800ms–1.8s (Needs Improvement), > 1.8s (Poor).

TTFB = DNS lookup + TCP handshake + TLS negotiation + server processing + network transit back. It's the cost of the entire round-trip before a single byte of your page loads. Since every other metric starts after TTFB, a slow TTFB is a performance tax on everything.

**TTFB components in DevTools Network tab:** hover over any request bar to see the timeline breakdown: "Queued at", "Stalled", "DNS Lookup", "Initial connection", "SSL", "Request sent", "Waiting (TTFB)", "Content Download". The "Waiting" time is the server processing time.

**TTFB optimization:**
- CDN edge caching: server response from 10ms away vs 150ms away
- Server-side caching: Redis/Memcached for DB-heavy pages
- Database query optimization: explain slow queries
- Server-Sent responses: streaming HTML (flush head/critical section first)
- HTTP/3 (QUIC): eliminates TCP + TLS round-trips with 0-RTT reconnection

**Key insight:** A CDN is the single biggest TTFB improvement for most sites — it moves the "server" geographically close to each user. TTFB of 50ms (CDN cache hit) vs 600ms (origin server in another country) is a 550ms gift to every subsequent metric.`,
    },
    {
      id: 1321,
      name: "Total Blocking Time (TBT)",
      desc: `**Total Blocking Time (TBT)** — measures the total time between FCP and TTI (Time to Interactive) where the main thread was blocked for more than 50ms. For each long task, TBT += (task duration - 50ms). Target: < 200ms (Good), 200–600ms (Needs Improvement), > 600ms (Poor).

TBT is the lab-data proxy for INP. Since INP requires real user interactions (no interactions happen in Lighthouse's headless browser), Lighthouse uses TBT as the best lab-measurable predictor of interaction responsiveness. High TBT means the main thread is busy when users try to interact.

**Long task math:** a 250ms task contributes 200ms to TBT (250 - 50). Three 100ms tasks contribute 150ms to TBT (3 × 50ms). A single 250ms monolith is as bad as three 100ms tasks from a TBT perspective, but much worse for INP because it completely blocks the thread.

**TBT and JavaScript:** TBT primarily measures JavaScript execution time. Third-party scripts, large bundle parsing, and long event handler chains are the main culprits. The "Performance" Lighthouse audit lists the long tasks contributing most to TBT.

**Fix pattern:** Lighthouse "Reduce JavaScript execution time" and "Minimize main thread work" audits → identify heaviest scripts → code-split, defer non-critical, or remove unnecessary third parties.

**Key insight:** TBT correlates strongly with real-world INP. Fixing TBT in lab data almost always improves INP in field data. Use Lighthouse TBT as your day-to-day performance proxy; monitor CrUX INP for field confirmation.`,
    },
    {
      id: 1322,
      name: "Speed Index",
      desc: `**Speed Index** — measures how quickly content is visually populated during page load. It captures the average time at which visible parts of the page are displayed, calculated by integrating the visual completeness curve over time. Target: < 3.4s (Good), 3.4–5.8s (Needs Improvement), > 5.8s (Poor).

Speed Index is computed from a video of the page loading. At each frame, Lighthouse measures "visual completeness" (what % of the final pixels are visible). Speed Index = area above the visual completeness curve — a page that shows content gradually has a lower SI than one that shows nothing then everything at once.

**Speed Index vs LCP:** LCP measures when the single largest element appears; Speed Index measures how quickly the entire above-the-fold area fills in. A page with many small images loading progressively can have a good Speed Index but a slow LCP if the main hero image loads last.

**Improving Speed Index:** remove render-blocking resources (the same fixes as FCP); server-side render critical content; ensure CSS is not render-blocking; avoid large JavaScript bundles that delay any visible content.

**When Speed Index misleads:** pages with many asynchronous components that load gradually can look good in Speed Index even if the actual important content loads late. LCP is usually the more actionable metric.

**Key insight:** Speed Index is most useful as a supplementary metric when diagnosing pages with many loading states. For most optimization work, focus on LCP and FCP — they're more directly tied to user perception of "is the main content here?"`,
    },
    {
      id: 1323,
      name: "Time to Interactive (TTI)",
      desc: `**Time to Interactive (TTI)** — measures the time from when the page starts loading until it is reliably interactive: the main thread has been quiet for at least 5 seconds, there are no more than 2 in-flight network requests, and there are no long tasks.

**Why TTI matters:** a page can look interactive (content is visible, buttons are rendered) but not be interactive — click handlers haven't been attached yet because JavaScript is still loading and executing. TTI marks the moment when the browser is truly ready to handle user input reliably.

**TTI calculation:** find the last long task in a 5-second quiet window before load ends. The end of that long task is TTI. This means TTI can be very sensitive to late-loading JavaScript.

**TTI vs INP:** TTI is a lab metric (Lighthouse); INP is a field metric (real users). Google has moved away from TTI as a Core Web Vital precisely because INP better captures real interaction responsiveness. TTI assumes users interact only after the page "loads" — real users click during loading.

**Improving TTI:** reduce JavaScript bundle size → code-split so less JS executes at startup → defer non-critical scripts → move third-party scripts to "async" → reduce long tasks in the initial load sequence.

**Key insight:** TTI has been largely superseded by TBT and INP as the actionable metrics for interactivity. But the concept — "page looks interactive but isn't" — remains important for understanding loading performance. SSR + hydration problems (React, Next.js) are the most common TTI issues in modern frameworks.`,
    },
    {
      id: 1324,
      name: "Performance Budget",
      desc: `**Performance Budget** — a set of limits on metrics (LCP < 2.5s, TBT < 200ms) or resource sizes (JS bundle < 200KB, total page weight < 1MB) that define acceptable performance standards, enforced automatically in CI/CD to prevent regressions.

**Why budgets work:** without a budget, performance regressions happen silently — "just add one more analytics script," "this image is fine," until the page is unusably slow. A budget makes performance a concrete engineering constraint rather than a subjective wish.

**Budget types:**
- **Metric budgets:** "LCP must be < 2.5s, TBT < 200ms in Lighthouse CI"
- **Resource budgets:** "Total JS < 300KB gzipped, total page weight < 2MB"
- **Request budgets:** "No more than 50 requests on initial load"
- **Rule budgets:** "Lighthouse performance score ≥ 80"

**Enforcement tools:**
- **Lighthouse CI:** "assert: metrics.largest-contentful-paint.numericValue < 2500"
- **bundlesize:** check bundle sizes in CI against configured limits
- **Size Limit:** enforce JS bundle size in GitHub PR checks
- **webpack-bundle-analyzer / vite-bundle-visualizer:** visualize what's in the bundle

**Budget-setting approach:** start with current baseline → set budget 20% better than current → improve incrementally. Don't set aspirational budgets you can't currently meet — they'll be ignored.

**Key insight:** A performance budget without CI enforcement is just a wish. The budget only works when the build fails if it's exceeded. Treat performance regressions exactly like broken tests — they must be fixed before merging.`,
    },
  ],
};

export default coreWebVitals;
