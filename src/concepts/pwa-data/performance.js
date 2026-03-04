const performance = {
  name: "Performance & Core Web Vitals",
  icon: "⚡",
  color: "#f59e0b",
  concepts: [
    {
      id: 1188,
      name: "Core Web Vitals",
      desc: `**Core Web Vitals (CWV)** — Google's set of real-world performance metrics that measure actual user experience: loading, interactivity, and visual stability. CWVs are used as a ranking signal in Google Search and are the primary performance KPIs for PWAs.

**The three Core Web Vitals (2025):**
- **LCP (Largest Contentful Paint):** time until the largest visible element loads. Good: < 2.5s | Needs improvement: 2.5-4s | Poor: > 4s. The primary "did it load?" metric.
- **INP (Interaction to Next Paint):** responsiveness — measures the full event duration from user interaction (click, key press) to next paint. Replaced FID in March 2024. Good: < 200ms | Poor: > 500ms.
- **CLS (Cumulative Layout Shift):** visual stability — measures unexpected layout shifts (elements jumping around). Good: < 0.1 | Poor: > 0.25.

**Measurement:** Chrome User Experience Report (CrUX) — real user data from Chrome browsers. PageSpeed Insights shows both lab data (Lighthouse) and field data (CrUX).

**CWV in Search ranking:** Google's Page Experience signal uses CWV. Sites with good CWV get a small ranking boost vs. equivalent sites with poor CWV. Not a silver bullet for ranking, but a tiebreaker.

**Key insight:** CWV are measured on real users in the field — not in a lab. Lab tools (Lighthouse) correlate with field data but are not identical. Focus on improving field CWV: use tools like "web-vitals" npm library to send real user measurements to your analytics.`,
    },
    {
      id: 1189,
      name: "Largest Contentful Paint (LCP)",
      desc: `**Largest Contentful Paint (LCP)** — measures when the largest content element visible in the viewport (image, video poster, block-level text) finishes rendering. It's the user's perception of "when did the page load?" — the moment main content appears.

**Common LCP elements:** hero image, product image, above-the-fold heading, video thumbnail. Always identify your LCP element and optimize it specifically.

**LCP optimization techniques:**
- **Preload LCP image:** "link rel=preload as=image href=/hero.webp" in the HTML "head" — tells browser to fetch it before the CSS/JS parser discovers it
- **Eliminate render-blocking resources:** defer non-critical JS; inline critical CSS
- **Fast TTFB (Time to First Byte):** LCP can't paint before HTML arrives. CDN caching + edge computing + fast server response = better TTFB → better LCP
- **Image optimization:** serve modern formats (WebP, AVIF); use srcset/sizes; serve correct dimensions (don't load 2000px image for a 400px slot)
- **No lazy-loading the LCP image:** "loading=lazy" delays the LCP image. Only lazy-load below-the-fold images.
- **Font optimization:** use "font-display: swap" or "optional" to prevent text from being LCP-blocked by font loading

**Diagnostic:** Chrome DevTools → Performance tab → LCP marker shows exactly which element and when it painted. Use "web-vitals" library to measure LCP in production.

**Key insight:** 75% of LCP problems come from render-blocking resources, slow TTFB, or unoptimized LCP images. Fix the LCP element specifically — don't optimize random images when the problem is a 3MB hero image with no preload hint.`,
    },
    {
      id: 1190,
      name: "Interaction to Next Paint (INP)",
      desc: `**INP (Interaction to Next Paint)** — measures the overall responsiveness of a page across all user interactions (clicks, taps, key presses). INP is the 98th percentile interaction duration over the entire session — the "worst typical interaction." Replaced FID (First Input Delay) as a Core Web Vital in March 2024.

**Why INP over FID:** FID only measured the delay before the browser starts processing the first interaction. INP measures the full duration — from input to next visual update — and includes ALL interactions, not just the first.

**INP breakdown:** Input Delay + Processing Time + Presentation Delay. Each phase is optimizable.
- **Input delay:** work on the main thread blocking event handlers from starting (long tasks)
- **Processing time:** JS execution in the event handler itself
- **Presentation delay:** rendering, layout, and paint after handler runs

**Optimization strategies:**
- Break up Long Tasks (> 50ms) with "setTimeout(fn, 0)" or "scheduler.yield()" — yields control to the browser
- Avoid synchronous DOM reads during event handlers (causes forced reflow)
- Debounce/throttle high-frequency events (scroll, resize, input)
- Move computation off main thread via Web Workers
- Virtualize long lists (React Virtualized, TanStack Virtual)
- Avoid expensive CSS selectors and layout-triggering style changes in handlers

**Measurement:** "new PerformanceObserver((list) => { for (const entry of list.getEntries()) { if (entry.interactionId) console.log('INP candidate:', entry.duration); } }).observe({ type: 'event', buffered: true, durationThreshold: 16 });"

**Key insight:** Poor INP is usually caused by Long Tasks on the main thread — JavaScript that runs for > 50ms without yielding. The fix is almost always task splitting. Use Chrome's Performance Insights panel (Long Tasks overlay) to find the culprits.`,
    },
    {
      id: 1191,
      name: "Cumulative Layout Shift (CLS)",
      desc: `**CLS (Cumulative Layout Shift)** — measures unexpected visual instability: elements moving on screen after initial render. A score of 0 = perfectly stable; any positive score reflects shifts. Target: < 0.1. Calculated as: impact fraction × distance fraction per layout shift event, summed over the page lifetime.

**CLS culprits:**
- Images without explicit width/height: browser doesn't know space to reserve; image loads and pushes content down
- Ads and embeds without reserved space: late-loading ad slots
- Dynamically injected content above existing content (banners, cookie consent)
- Web fonts causing FOIT/FOUT: invisible text → text with font → layout recalculation
- Animations that trigger layout (avoid animating "width", "height", "top", "left" — use "transform: translate()" instead)

**Fixes:**
- Always set "width" and "height" attributes on images and videos (or use "aspect-ratio" CSS)
- Reserve ad slot space: "min-height: 250px" on ad containers
- Inject new content below the fold, not above
- Use "font-display: optional" to prevent font swap shifts
- Use CSS "transform" and "opacity" for animations — GPU-composited, no layout recalculation

**"Expected" shifts don't count:** CLS only counts unexpected shifts — shifts in response to user interaction (clicking a "Load More" button, typing in a search box) are excluded from the score.

**Key insight:** CLS is almost entirely preventable with disciplined HTML and CSS practices. The single biggest win: always set explicit dimensions on images. "img { aspect-ratio: 16/9; width: 100%; }" reserves space before the image loads, eliminating the most common CLS source.`,
    },
    {
      id: 1192,
      name: "Time to First Byte (TTFB)",
      desc: `**TTFB (Time to First Byte)** — the time from the browser making an HTTP request to receiving the first byte of the response. It's a foundational metric because everything else (LCP, FCP) depends on the server responding quickly.

**TTFB breakdown:** DNS lookup + TCP connection + TLS handshake + Server processing + Network transit. Server processing is usually the controllable variable.

**Good TTFB targets:** < 200ms for local users; < 600ms for global users on CDN edge.

**TTFB optimization:**
- **CDN:** serve from edge nodes close to users → eliminates most of the network transit latency
- **Edge caching:** cache HTML responses at CDN edge for static or low-personalization pages
- **Server-side optimization:** database query optimization, server-side caching (Redis), efficient ORM usage
- **Keep-Alive connections:** reuse TCP connections between requests (default in HTTP/1.1; mandatory in HTTP/2)
- **HTTP/2 and HTTP/3:** multiplexed connections, header compression, QUIC (HTTP/3) eliminates TCP handshake latency
- **Early Hints (103):** server sends "link rel=preload" hints before the full response is ready — browser starts fetching resources while server prepares the HTML

**TTFB in PWAs:** service worker startup adds to TTFB for the first navigation. Use Navigation Preload to eliminate SW startup penalty from navigation TTFB.

**Key insight:** TTFB is the ceiling on all other performance metrics. No amount of JS optimization or lazy loading will compensate for a 2-second server response time. Fix TTFB first — CDN and server-side caching give the highest ROI improvements in the shortest time.`,
    },
    {
      id: 1193,
      name: "Resource Hints (Preload, Prefetch, Preconnect)",
      desc: `**Resource Hints** — HTML attributes and link tags that tell the browser to proactively fetch or connect to resources before they're explicitly needed, eliminating network round-trip delays and improving perceived performance.

**Preload ("link rel=preload"):** fetch a resource immediately at high priority; browser would normally discover it later. Use for: LCP images, critical fonts, above-the-fold CSS not in the main stylesheet.
"link rel=preload href=/hero.webp as=image"
"link rel=preload href=/font.woff2 as=font crossorigin"

**Prefetch ("link rel=prefetch"):** fetch a resource at low priority for future navigation — browser fetches it during idle time. Use for: next-page likely resources (next article, checkout page).
"link rel=prefetch href=/checkout.js as=script"

**Preconnect ("link rel=preconnect"):** establish TCP + TLS connection to a third-party origin early, before the resource is requested. Use for: Google Fonts, CDN origins, API domains.
"link rel=preconnect href=https://fonts.googleapis.com crossorigin"

**dns-prefetch:** resolve DNS for a domain without full connection establishment. Lower cost than preconnect; use when you need many third-party domains.

**Prerender ("speculation rules"):** modern replacement for "link rel=prerender" — renders the next page in a hidden tab. Expensive but delivers instant navigation. Use sparingly (only most likely next page).

**Key insight:** "link rel=preload" for the LCP image is consistently the single highest-ROI resource hint — it moves the LCP image discovery from late (after CSS parse + background-image parse) to immediate (in the HTML head), often saving 500ms+ on LCP. It's a one-line addition with outsized impact.`,
    },
    {
      id: 1194,
      name: "Code Splitting & Lazy Loading",
      desc: `**Code Splitting** — breaking your JavaScript bundle into smaller chunks that are loaded on demand rather than all at once. Combined with lazy loading (deferring non-critical resources), it dramatically improves initial page load time.

**Route-based code splitting (React):**
"const Checkout = React.lazy(() => import('./Checkout'));"
"Suspense fallback={loading...}" wraps lazy components.

Vite and webpack automatically split at dynamic import boundaries. Route-based splitting (each page/route is its own chunk) is the minimum viable split.

**Component-based splitting:** split large components that aren't needed immediately — modals, charts, rich text editors. Load them when the user triggers their display.

**Preloading chunks on hover:** for navigation links, start fetching the next page's chunk on hover/focus — by the time the user clicks, the chunk is downloaded.

**Image lazy loading:** "img loading=lazy" — native browser lazy loading. Images outside the viewport aren't loaded until they scroll near. Performance win with zero JavaScript.

"IntersectionObserver" for custom lazy loading: load any resource (comments, ads, embeds) when their container scrolls into view.

**Third-party scripts:** load analytics, chat widgets, and ads with "async" or "defer"; move them to load after critical content. Third-party scripts are often the largest contributor to INP and LCP degradation.

**Key insight:** The average web page loads 400KB+ of JavaScript — most of which is not needed for the initial render. A well-split React app loads the shell (< 50KB gzipped) instantly; routes load on demand. Every 100KB of JS removed from the initial bundle translates to ~1 second faster load on mid-range mobile devices.`,
    },
    {
      id: 1195,
      name: "Image Optimization",
      desc: `**Image Optimization** — the combination of format selection, compression, sizing, and delivery techniques that reduce image payload while maintaining visual quality. Images are typically 50-70% of total page weight — the single largest optimization opportunity.

**Modern image formats:**
- **WebP:** 25-35% smaller than JPEG at equivalent quality; widely supported (all modern browsers)
- **AVIF:** 50% smaller than JPEG; next-generation; good support (Chrome, Firefox, Safari 16+); slower encoding
- **PNG:** for images requiring transparency; large size for photos
- **SVG:** for logos and icons; resolution-independent; tiny file size

**"picture" element with fallback:**
"picture: source srcset=img.avif type=image/avif, source srcset=img.webp type=image/webp, img src=img.jpg alt=description"

**Responsive images:**
- "srcset": provide images at multiple resolutions; browser picks best based on device DPR and viewport
- "sizes": tells browser how wide the image will render at different viewport widths — critical for correct srcset selection

**Compression:** use lossy compression at quality 75-85 for photos (Squoosh, ImageMagick, Sharp). The human eye can't perceive quality loss below a certain threshold.

**Lazy loading:** "loading=lazy" on below-the-fold images; "loading=eager" (default) on LCP image and above-fold images.

**Image CDN:** Cloudinary, Imgix, Cloudflare Images — transform on-demand, serve correct format/size per device, global CDN delivery. Eliminates all manual image optimization.

**Key insight:** Serving a 4000x3000px photo (5MB) for a 400x300px thumbnail is the most common image mistake. Always serve images at the rendered size. An Image CDN that auto-resizes and converts to AVIF/WebP delivers more value per dollar than almost any other web performance investment.`,
    },
    {
      id: 1196,
      name: "Font Loading Optimization",
      desc: `**Font Loading Optimization** — minimizing the impact of web fonts on Core Web Vitals, specifically LCP (fonts block text rendering) and CLS (font swap causes layout shift).

**Font loading stages:**
1. Browser parses CSS, discovers "@font-face" declaration
2. Browser checks if the font is needed for visible text
3. Browser fetches the font file (200-500ms on fast connection)
4. Font renders; text may reflow (FOUT — Flash of Unstyled Text)

**"font-display" property:**
- "swap": show fallback font immediately; swap to web font when loaded (FOUT — causes CLS)
- "optional": use web font only if available in cache; fallback font otherwise (no CLS, may not show web font on first visit)
- "block": invisible text for up to 3s (FOIT — Flash of Invisible Text; never use for body text)
- "fallback": 100ms block period, then swap if loaded within 3s

**Preloading fonts:** "link rel=preload href=/font.woff2 as=font crossorigin" — starts fetching immediately on HTML parse; reduces font delay from 600ms to ~200ms.

**WOFF2:** always use WOFF2 format (Brotli-compressed binary; 30% smaller than WOFF).

**Subset fonts:** load only the character sets you use. Google Fonts does this via "text=" parameter. Tools: Glyphhanger, FontSquirrel.

**System font stack fallback:** calibrate your fallback font to match the web font's metrics (x-height, cap height, line height). "size-adjust", "ascent-override", "descent-override" CSS properties minimize layout shift on font swap.

**Key insight:** "font-display: optional" is the zero-CLS font strategy — users on first visit get a system font; returning users get the web font (loaded from cache). If your web font is critical to brand identity, "font-display: swap" + size-adjust calibration is the right tradeoff.`,
    },
  ],
};

export default performance;
