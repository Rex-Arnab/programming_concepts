const resourceOptimization = {
  name: "Network & Resource Optimization",
  icon: "🚀",
  color: "#10b981",
  concepts: [
    {
      id: 1372,
      name: "HTTP/2 & HTTP/3 (QUIC)",
      desc: `**HTTP/2** — the second major version of HTTP that replaced HTTP/1.1's serial request model with multiplexing: multiple requests and responses are interleaved over a single TCP connection, eliminating the "head-of-line blocking" problem where one slow request blocked all subsequent ones.

**HTTP/1.1 vs HTTP/2:**
- **HTTP/1.1:** browsers open 6 parallel connections per origin; each connection handles one request at a time. "Domain sharding" was a hack to get 12+ connections. Image sprites, JS concatenation were mandatory workarounds.
- **HTTP/2:** one connection handles hundreds of concurrent streams. Domain sharding is harmful (creates extra TCP/TLS handshakes). Concatenating all CSS/JS into one file is unnecessary (and harmful for cache granularity).

**HTTP/2 features:** multiplexing (concurrent streams), header compression (HPACK), server push (preemptively send resources before client asks — rarely used in practice due to caching issues), stream prioritization.

**HTTP/3 (QUIC):** replaces TCP with QUIC (UDP-based protocol). Key improvement: eliminates TCP's "head-of-line blocking" at the transport layer. In HTTP/2, packet loss on the single TCP connection stalls all streams. QUIC multiplexes at the UDP level — one lost packet only stalls its own stream.

**HTTP/3 performance gains:** primarily on mobile and lossy networks where packet loss is common. 0-RTT connection resumption (reconnect without handshake on second visit). Sub-millisecond latency improvement over HTTP/2 for established connections.

**Checking HTTP version:** Network tab → Protocol column (right-click column headers to add it). "h2" = HTTP/2, "h3" = HTTP/3, "http/1.1" = legacy.

**Key insight:** if your server still runs HTTP/1.1 in 2025, upgrading to HTTP/2 is a significant free performance win. Most CDNs (Cloudflare, CloudFront, Fastly) have been HTTP/2/3 for years. The biggest wins are for pages with 30+ resources — HTTP/2 multiplexing eliminates the queuing delay that HTTP/1.1 creates for them.`,
    },
    {
      id: 1373,
      name: "Compression: gzip & Brotli",
      desc: `**HTTP Compression** — compressing response bodies on the server before transmission, reducing bytes transferred over the network. The browser sends "Accept-Encoding: gzip, deflate, br" to indicate supported compression algorithms; the server responds with "Content-Encoding: gzip" (or "br" for Brotli).

**gzip vs Brotli:**
- **gzip:** widely supported, fast to compress/decompress. Typically 60-75% compression ratio for text assets (HTML, CSS, JS, JSON).
- **Brotli (br):** Google's newer algorithm, supported in all modern browsers. 15-25% better compression ratio than gzip. Slightly slower to compress (acceptable for pre-compressed static assets), similar decompression speed.

**Practical compression results for JS:**
- Raw: 500KB
- gzip: ~150KB (70% reduction)
- Brotli level 11: ~120KB (76% reduction)

**Pre-compression strategy:** for static assets (JS, CSS, HTML, fonts), pre-compress at build time (both gzip and Brotli) and serve the pre-compressed file directly. No runtime compression overhead. Vite and webpack can generate ".gz" and ".br" files with plugins.

**Compression check in DevTools:** Network tab → click any resource → Response Headers → look for "Content-Encoding: br" or "Content-Encoding: gzip". Under the Headers tab, compare "Content-Length" (compressed size) to "x-original-content-length" (if server sends it). Also check Size column in Network tab — shows "X KB (Y KB transferred)".

**What to compress:** text-based assets (HTML, CSS, JS, JSON, SVG, XML, fonts). Do NOT compress: already-compressed formats (JPEG, PNG, WebP, AVIF, WOFF2, ZIP, MP4 — re-compressing wastes CPU for zero gain or even size increase).

**Key insight:** enabling Brotli instead of gzip on static assets is a free bandwidth reduction of 15-25% with no trade-offs for pre-compressed files. If you're on a CDN that supports Brotli (all major ones do), simply enabling it in your CDN settings immediately reduces your JS/CSS transfer sizes with zero code changes.`,
    },
    {
      id: 1374,
      name: "Image Optimization",
      desc: `**Image Optimization** — reducing the byte cost of images (typically the largest resource on web pages) through format selection, compression, responsive sizing, and lazy loading. Images account for 40-60% of page weight on average.

**Modern image formats (in order of preference):**
- **AVIF:** best compression (50-70% smaller than JPEG at same quality). Chrome, Firefox, Safari 16+ support. Use via "picture" element with WebP/JPEG fallback.
- **WebP:** 25-35% smaller than JPEG/PNG. All modern browsers support it. Excellent default format for most images.
- **JPEG:** battle-tested for photos. Use "quality 75-85" for a good size/quality balance.
- **PNG:** lossless; only for images requiring transparency or pixel-perfect quality (icons, logos). Use SVG instead where possible.
- **SVG:** vectors — scales infinitely, tiny file size, resolution-independent. Perfect for logos, icons, illustrations.

**Responsive images:**
"img src='hero-800.webp'
     srcset='hero-400.webp 400w, hero-800.webp 800w, hero-1600.webp 1600w'
     sizes='(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px'
     loading='lazy' alt='Hero'"

Browser selects the smallest image that's larger than the displayed size. A mobile user at 400px width doesn't download the 1600px version.

**Lazy loading:** "img loading='lazy'" — browser defers loading below-fold images until user scrolls near them. Native, no JavaScript needed. Only omit on LCP candidate images (add "loading='eager'" and "fetchpriority='high'" instead).

**Build-time image processing tools:** Sharp (Node.js), "imagemin" (webpack), "@astrojs/image", Cloudinary, Imgix (CDN-based transformation).

**Key insight:** the single biggest image optimization insight is "serve the right size image." A 4K photo served to a 390px mobile screen is 10-20x more bytes than needed. Responsive images with "srcset" solve this; but most sites still serve one size for all devices — it's easy to miss and has enormous impact.`,
    },
    {
      id: 1375,
      name: "Resource Hints: preload, prefetch, preconnect",
      desc: `**Resource Hints** — HTML link attributes that tell the browser about resources it will need soon, allowing it to start network operations before those resources are discovered in the normal parse flow.

**The four resource hints:**

"link rel='preconnect' href='https://fonts.googleapis.com'" — Establish TCP+TLS connection to the origin immediately. No resource downloaded yet — just the connection. Use for: critical third-party origins (fonts, APIs, CDNs) whose resources will be needed within 3 seconds of page load.

"link rel='dns-prefetch' href='https://third-party.com'" — Resolve DNS for the domain. Cheaper than preconnect (no TCP). Use for: lower-priority third-party origins where DNS lookup is the main cost.

"link rel='preload' href='font.woff2' as='font' crossorigin" — Fetch the resource at HIGH priority now, but don't execute it. Must specify "as" attribute for correct priority and caching. Use for: LCP image, critical font, critical CSS that's discovered late (in another stylesheet).

"link rel='prefetch' href='/checkout.js' as='script'" — Fetch the resource at LOW priority during idle time, cache for future use. Use for: resources needed on the likely next page (predictive navigation).

**fetchpriority attribute (not a rel= hint but related):** "img fetchpriority='high'" — boost or lower browser-assigned network priority. Use "fetchpriority='high'" on the LCP image (more targeted than preload).

**Common resource hint mistakes:**
- Preloading but not using within 3s: Lighthouse warning "Preload link not used in 3s" — wastes bandwidth
- Preloading too many things (defeats purpose — creates priority contention)
- Using preload for fonts without "crossorigin": "link rel='preload' as='font'" MUST have "crossorigin" attribute (even for same-origin fonts) due to CORS requirements

**Key insight:** "preconnect" + "dns-prefetch" for Google Fonts is a free ~100-300ms improvement:
"link rel='preconnect' href='https://fonts.gstatic.com' crossorigin"
This eliminates the DNS + TCP + TLS establishment time for the font download connection.`,
    },
    {
      id: 1376,
      name: "Font Loading Optimization",
      desc: `**Font Loading Optimization** — strategies to minimize the performance impact of web fonts: the blank text (FOIT), unstyled text flash (FOUT), and layout shifts (FOCS/CLS) caused by late-loading or swapping font files.

**font-display descriptor:**
- "font-display: auto": browser default — usually FOIT (invisible text for up to 3s then swap)
- "font-display: swap": shows fallback font immediately, swaps when custom font loads (FOUT). Good for body text where readability > perfect appearance.
- "font-display: optional": if font isn't available within first frame, uses fallback for the entire page visit. No layout shift, no FOUT. Best for CLS if you can accept occasional fallback font use.
- "font-display: fallback": 100ms block, 3s swap window, then stays with fallback
- "font-display: block": 3s invisible block (worst for LCP/UX)

**Self-hosting vs Google Fonts:**
- Google Fonts adds 2 connections (fonts.googleapis.com → fonts.gstatic.com), a CSS file, then the font files — a 3-level request chain
- Self-hosting: one connection, font files served from your CDN, preloadable, HTTP/2 multiplexed

**Font subsetting:** web fonts often include characters for many languages. Subset to only the characters you use. Google Fonts does this via "text=" parameter. Tools: "glyphhanger", "pyftsubset". A Latin-only subset can be 10-30KB instead of 100KB+.

**Size-adjust for zero CLS:** CSS Font Loading API (2022): "size-adjust" in "@font-face" adjusts the fallback font's em size to match the custom font, minimizing layout shift during swap. Tools: "fontaine" library, Fontpie tool.

**Variable fonts:** one font file for all weights/styles instead of separate files per weight. "Inter Variable" = 1 file for all 100-900 weights. Saves multiple HTTP requests and significant bytes.

**Key insight:** the combination of "font-display: optional" + size-adjusted fallback font achieves zero CLS from fonts, with the custom font loading silently in the background and applying on the next page view. This is the gold standard for font performance — users see text immediately, with no layout shift, and the custom font appears on second visit.`,
    },
    {
      id: 1377,
      name: "Lazy Loading Patterns",
      desc: `**Lazy Loading** — deferring the loading of resources (images, scripts, components, routes) until they are needed, rather than loading everything upfront. Reduces initial page weight, speeds up LCP and FCP, and conserves bandwidth on mobile.

**Native image lazy loading:**
"img src='product.webp' loading='lazy' alt='Product'" — browser loads the image only when it's near the viewport (typically within 1200px). No JavaScript. Works in all modern browsers. Do NOT use on LCP images — they need "loading='eager'" (or omit "loading" attribute — default is eager for images).

**IntersectionObserver (custom lazy loading):** observe elements and load content when they enter the viewport:
"const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
  });
}, { rootMargin: '200px' });

document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));"

**Component-level lazy loading (React):**
"const HeavyChart = React.lazy(() => import('./HeavyChart'));
// Renders only when route/condition is met — chunk loads on demand"

**Lazy loading iframes:**
"iframe src='https://youtube.com/embed/...' loading='lazy'" — defers iframe initialization until near viewport. Huge savings for YouTube/Vimeo embeds (typically 300-500KB each).

**Below-the-fold CSS:** load non-critical CSS asynchronously:
"link rel='stylesheet' href='print.css' media='print'" — loads asynchronously (never blocks rendering for non-print pages)

**When NOT to lazy load:** LCP candidate images, critical above-the-fold content, resources needed for interaction on initial page (payment forms, primary CTAs). Lazy loading these delays exactly the content users need first.

**Key insight:** "loading='lazy'" on all images except the LCP candidate is a no-config, one-attribute bandwidth optimization. A page with 40 product images only loads the visible ones on initial paint — typically 3-5 images instead of 40. Bandwidth savings of 70-90% for image-heavy pages.`,
    },
    {
      id: 1378,
      name: "CDN & Edge Caching",
      desc: `**Content Delivery Network (CDN)** — a geographically distributed network of servers (Points of Presence, PoPs) that cache and serve static assets from the location closest to the user, reducing latency from hundreds of milliseconds (origin server) to single-digit milliseconds (edge node).

**How CDNs work:** a user in Tokyo requests "https://example.com/app.js". Without CDN: request travels to the origin server (e.g., AWS us-east-1, 200ms away). With CDN (Cloudflare, CloudFront, Fastly): request hits the Tokyo PoP (5ms away) — if cached, served immediately. If not cached, CDN fetches from origin once and caches for future Tokyo users.

**Cache-Control for CDN:**
"Cache-Control: public, max-age=31536000, immutable" — CDN and browser cache for 1 year. "immutable" tells the browser never to revalidate (resource URL changes on new deploy — content-addressed file names like "app.a1b2c3.js").
"Cache-Control: s-maxage=86400, stale-while-revalidate=86400" — CDN caches for 1 day, serves stale for another day while revalidating in background. "s-maxage" is CDN-specific (overrides "max-age" for shared caches).

**CDN cache invalidation:**
- **Cache-busted filenames:** "app.abc123.js" changes hash when file changes — old URL stays cached (correct), new URL immediately populates. Best approach.
- **"Purge" API calls:** Cloudflare/CloudFront provide APIs to purge specific URLs or tags. Use for HTML and API responses.
- **Cache tags/surrogate keys:** group resources by tag (e.g., "product-123") and purge all tagged entries when the product changes.

**CDN selection considerations:** Cloudflare (global PoP density, integrated security, Workers for edge compute), CloudFront (AWS integration), Fastly (programmable edge, sub-second purge), Akamai (enterprise, most mature). For startups: Cloudflare free tier is an excellent starting point.

**Key insight:** CDN is the highest-leverage single infrastructure investment for web performance. It simultaneously reduces TTFB (proximity), increases throughput (edge capacity), provides DDoS protection, and can terminate TLS at the edge (faster TLS handshakes). The TTFB improvement from "origin in Virginia" to "edge in Singapore" for an Asian user is 150-300ms — directly improving every downstream metric.`,
    },
    {
      id: 1379,
      name: "Cache-Control Headers",
      desc: `**Cache-Control** — the HTTP response header that instructs browsers and CDN/proxy caches how long to cache a response and under what conditions. The single most important header for performance caching strategy.

**Key directives:**
- "max-age=N": cache for N seconds. After N seconds, must revalidate with server.
- "s-maxage=N": same as max-age but only for shared caches (CDNs). Overrides max-age for CDNs.
- "public": response may be cached by any cache (browser + CDN + proxies)
- "private": response may only be cached by the browser (not shared caches — for user-specific content)
- "no-cache": MUST revalidate before serving from cache (validates with server; returns 304 if unchanged)
- "no-store": never cache (sensitive data — login pages, banking, PII)
- "immutable": content at this URL never changes — browser skips revalidation even on forced reload
- "stale-while-revalidate=N": serve stale cache for up to N seconds while fetching fresh version in background (great for HTML)

**The two-tier strategy (most apps):**
- **Versioned static assets** (app.abc123.js, hero.a1b2c3.webp): "Cache-Control: public, max-age=31536000, immutable" — 1 year, immutable. Hash changes on deploy = new URL = new cache entry. Zero revalidation overhead.
- **HTML documents** (index.html, /api/products): "Cache-Control: no-cache" or "Cache-Control: public, max-age=0, must-revalidate" — always revalidate to serve the latest deploy. With ETags, server returns 304 Not Modified if unchanged (fast and bandwidth-efficient).

**ETag conditional requests:** server sends "ETag: 'abc123'" with response. Browser sends "If-None-Match: 'abc123'" on next request. Server returns 304 Not Modified (no body, just headers) if unchanged. Saves bandwidth for large JSON/HTML responses.

**Key insight:** the cache-busted filename strategy ("app.a1b2c3.js") is the foundation of a correct caching setup. It lets you cache static assets indefinitely (max-age=31536000) while also ensuring updated assets are fetched immediately on new deploys. Without content-addressed filenames, you're forced to use short max-age values — paying the revalidation cost on every page view.`,
    },
    {
      id: 1380,
      name: "Third-Party Script Management",
      desc: `**Third-Party Scripts** — JavaScript loaded from external domains (analytics, ads, chat widgets, A/B testing, social embeds, tag managers) that developers don't control but that execute on every page. The leading cause of LCP and TBT degradation on real-world websites.

**Performance impact of common third parties:**
- Google Tag Manager: adds 1 extra round-trip + 20-80ms TBT just for the tag manager container; each tag inside adds more
- Intercom chat widget: ~300-500KB of JS, often blocking
- Heap/FullStory session recording: 50-100ms TBT on main thread
- Facebook Pixel: ~100KB, often render-blocking if not deferred

**Measuring third-party impact:**
1. Network tab → sort by Domain → identify third-party domains
2. DevTools Request Blocking → block the domain → run Lighthouse → compare TBT (quantifies the cost)
3. Lighthouse "Third-party usage" audit — lists all third parties with byte sizes and main thread time

**Mitigation strategies:**
- "async" / "defer" on all third-party scripts (never synchronous)
- "rel=preconnect" for critical third-party origins (eliminates DNS+TCP cost for their requests)
- Load non-critical third parties "on interaction" (analytics fire on first click, not page load)
- "Facade pattern": embed a lightweight placeholder (YouTube thumbnail) that loads the real embed only on user click. Eliminates YouTube's ~500KB iframe cost for unplayed videos.
- Tag Manager hygiene: audit GTM quarterly — remove tags for discontinued tools

**Web Worker for third-party scripts (Partytown):** Partytown library executes third-party scripts in a Web Worker, completely off the main thread. Analytics and marketing pixels in a worker instead of the main thread.

**Key insight:** tag managers are performance anti-patterns disguised as conveniences. A GTM container with 25 tags can add 1-2 seconds of TBT from scripts that weren't in the original performance budget. Every new tag should require a performance review — "what does adding this tag cost in TBT, and is the business value worth it?"`,
    },
    {
      id: 1381,
      name: "Critical CSS & Render-Blocking CSS",
      desc: `**Critical CSS** — the minimal subset of CSS rules needed to style above-the-fold content visible in the initial viewport. Inlining critical CSS in the document head eliminates the render-blocking CSS file request, enabling faster FCP and LCP.

**The problem:** "link rel='stylesheet' href='styles.css'" is render-blocking — the browser cannot display any content until the stylesheet is downloaded and parsed. On a 3G connection with a 200KB stylesheet, this can add 2+ seconds to FCP.

**Critical CSS inlining approach:**
"head
  style
    /* Inlined critical CSS for above-fold content */
    body { margin: 0; font-family: system-ui; }
    .header { height: 60px; background: #fff; }
    .hero { min-height: 400px; }
  /style
  link rel='preload' href='styles.css' as='style' onload='this.onload=null;this.rel=\"stylesheet\"'
  noscript link rel='stylesheet' href='styles.css' /noscript
/head"

The preload + "onload" trick loads the full stylesheet asynchronously.

**Critical CSS generation tools:**
- **Critical** (npm): extracts critical CSS for specified viewport dimensions from a URL
- **Critters** (webpack plugin, used by Angular): inline critical CSS during build
- **Penthouse:** headless Chrome-based critical CSS extraction
- **Astro / Next.js:** built-in critical CSS inlining in modern frameworks

**CSS media queries for non-critical CSS:** "link rel='stylesheet' href='print.css' media='print'" — browser downloads but does NOT block rendering for non-matching media queries.

**CSS-in-JS critical path:** CSS-in-JS (styled-components, Emotion) can inline only the styles used by rendered components — natural critical CSS extraction. Downside: runtime style injection can affect INP.

**Key insight:** inlining 10-15KB of critical CSS and asynchronously loading the full stylesheet is one of the most effective FCP optimizations for large, legacy CSS codebases. It trades a small HTML payload increase (the inline styles) for eliminating an entire render-blocking resource request from the critical path.`,
    },
  ],
};

export default resourceOptimization;
