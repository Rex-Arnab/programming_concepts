const networkTab = {
  name: "DevTools: Network Tab",
  icon: "🌐",
  color: "#3b82f6",
  concepts: [
    {
      id: 1325,
      name: "Network Waterfall",
      desc: `**Network Waterfall** — the visual timeline in Chrome DevTools Network tab showing all HTTP requests as horizontal bars, stacked vertically in order of initiation. Each bar shows DNS, TCP, SSL, TTFB, and content download phases as colored segments.

**Reading the waterfall:** time flows left to right. Bars start where the request was initiated. Long "Waiting (TTFB)" segments mean slow server responses. A staircase pattern (each request waiting for the previous) means requests are waterfall-chained and could be parallelized. Diagonal patterns are normal (many requests firing in sequence) — flat vertical patterns indicate parallel loading.

**Key patterns to spot:**
- **Request chains:** A → B → C, each waiting on the previous (look for diagonal steps). Common with: render-blocking CSS, blocking scripts, server-side includes.
- **Thin bar followed by large gap:** DNS lookup or TCP connection taking time. Fix with "preconnect" hints.
- **Large TTFB (green segment):** slow server processing. Check server-side caching or DB queries.
- **Large download bar (blue):** large response body. Check if it's image, JS, or video that needs optimization.

**Filtering:** filter by type (JS, CSS, Img, XHR/Fetch, Doc, WS) to focus on specific resource categories. The "Initiator" column shows what triggered each request.

**Key insight:** the waterfall reveals the critical path — the sequence of dependent requests that determines page load time. Shortening the critical path (by eliminating, parallelizing, or preloading critical resources) is the most direct way to improve load time metrics.`,
    },
    {
      id: 1326,
      name: "Resource Timing API",
      desc: `**Resource Timing API** — a browser API that exposes detailed network timing data for all resources (scripts, images, stylesheets, fetch calls) loaded by the page. Available via "performance.getEntriesByType('resource')" and "PerformanceObserver".

**Timing attributes:** each PerformanceResourceTiming entry includes: "startTime", "fetchStart", "domainLookupStart/End", "connectStart/End", "secureConnectionStart", "requestStart", "responseStart" (TTFB), "responseEnd", "transferSize", "encodedBodySize", "decodedBodySize", "initiatorType" (script/img/css/fetch/etc).

**Practical uses:**
- Real User Monitoring: send resource timing data to analytics to track real-world loading performance in production
- Finding slow third-party resources: sort by "responseEnd - fetchStart" to find the slowest resources
- Cache hit detection: "transferSize === 0" means the resource was served from cache (304 or disk cache)
- CDN effectiveness: compare "connectEnd" across different CDN PoPs

**Example:**
"const entries = performance.getEntriesByType('resource');
const slowest = entries.sort((a, b) => (b.responseEnd - b.startTime) - (a.responseEnd - a.startTime)).slice(0, 5);"

**Key insight:** Resource Timing is the foundation of client-side RUM (Real User Monitoring). Unlike Lighthouse (synthetic), Resource Timing captures what real users actually experience. Use it to validate that CDN caching is working ("transferSize === 0" for static assets) and to catch third-party resources that are consistently slow.`,
    },
    {
      id: 1327,
      name: "Request & Response Headers",
      desc: `**Request & Response Headers** — the metadata exchanged between browser and server with every HTTP request. Inspecting headers in DevTools Network tab reveals caching policy, content type, authentication, CORS, compression, and more.

**Performance-critical headers to inspect:**
- "Cache-Control: max-age=31536000, immutable" — static assets cached for 1 year (immutable tells browser never to revalidate)
- "ETag" + "If-None-Match" — conditional requests returning 304 Not Modified when content unchanged
- "Content-Encoding: gzip" or "br" — verify Brotli/gzip compression is active (check response body size vs transfer size)
- "Vary: Accept-Encoding" — server returns different encodings; CDNs must cache per encoding
- "Timing-Allow-Origin: *" — required for third-party resources to expose Resource Timing data

**Debugging headers:**
- "X-Cache: HIT" / "MISS" — CloudFront/Cloudflare cache hit indicator
- "CF-Cache-Status: HIT" — Cloudflare serving from edge cache
- "X-Served-By" — which CDN PoP served the response
- "Age: 3600" — resource has been in CDN cache for 3600 seconds
- "Strict-Transport-Security" — HTTPS enforcement (look for "max-age=31536000; includeSubDomains")

**CORS debugging:** if a fetch fails with CORS error, check: is "Access-Control-Allow-Origin" present on the response? Is "Origin" header sent on the request? Is the preflight OPTIONS request succeeding?

**Key insight:** response headers are the contract between server and browser for how resources are handled. Misconfigured "Cache-Control" headers (no-cache on static assets) are one of the most common and costly performance mistakes — every page load pays the network cost even when content hasn't changed.`,
    },
    {
      id: 1328,
      name: "Network Throttling",
      desc: `**Network Throttling** — DevTools feature that simulates slower network conditions (3G, 4G, offline) to test how your page performs for users with poor connectivity. Found in Network tab toolbar dropdown ("No throttling" → choose preset or create custom profile).

**Built-in presets:**
- "Slow 3G": 400kbps download, 400kbps upload, 200ms latency
- "Fast 3G": 1.5Mbps download, 750kbps upload, 562.5ms latency
- Custom: set any bandwidth/latency combination

**CPU throttling (Performance tab):** separate from network throttling — simulates slower devices. "4x slowdown" approximates a mid-range Android phone. Use "6x slowdown" for low-end device simulation. Critical for testing INP and JavaScript performance.

**Why throttle:** developers work on fast laptop/desktop/WiFi; users on mobile are often on 3G/4G with high latency. A page that "feels fast" on your machine may be unusable on a 3G connection. Throttling forces you to experience what users experience.

**Testing approach:** enable "Fast 3G" + "4x CPU slowdown" → reload page → measure LCP, observe waterfall. This is a reasonable simulation of a mid-range mobile user experience. The performance experience delta between your machine and this setting is often shocking.

**Offline testing:** "Offline" preset tests Service Worker caching — does your app work offline? What does the user see if they lose connectivity mid-session?

**Key insight:** always test with throttling before shipping a performance fix. A "fast" page on your 1Gbps office WiFi can be a 12-second LCP disaster on "Fast 3G". The Chrome DevTools throttling preset that best approximates "typical user" is the one that most surprises developers who haven't used it.`,
    },
    {
      id: 1329,
      name: "HAR Export & Import",
      desc: `**HAR (HTTP Archive)** — a JSON-based file format that records all HTTP transactions made during a browser session, including timing, headers, cookies, query strings, and response bodies. Export via Network tab → right-click → "Save all as HAR with content".

**What HAR captures:**
- Every request URL, method, status code, and timing breakdown
- Request and response headers
- Request body (POST data)
- Response body content (if enabled)
- Browser version and page info

**HAR use cases:**
- **Debugging with external developers/support teams:** share the HAR file instead of screenshotting DevTools — they get full timing data
- **Performance regression investigation:** compare HAR from before/after a deploy
- **Third-party audit:** send HAR to a performance consultant for analysis
- **WebPageTest HAR:** download HAR from WebPageTest for offline analysis

**HAR analysis tools:**
- **har.tech / Google HAR Analyzer:** web-based HAR visualizer
- **Charles Proxy:** import HAR for visual analysis
- **fiddler:** import and inspect HAR recordings
- **har2fnc:** convert HAR to load testing scripts

**Security warning:** HAR files contain cookies, authentication tokens, and potentially session data. Sanitize HAR files before sharing publicly — remove "Set-Cookie" headers and authorization headers. DevTools prompts "Are you sure?" for this reason.

**Key insight:** HAR files are the performance equivalent of a flight data recorder. When a user reports "the page was slow" — ask them to record a HAR and share it. You get exact timing for every request from their actual connection and location, far more diagnostic than a Lighthouse run on your machine.`,
    },
    {
      id: 1330,
      name: "Resource Priority & fetchpriority",
      desc: `**Resource Priority** — the browser's internal priority assigned to each resource (Highest, High, Medium, Low, Lowest) that determines the order of network fetches. Visible in the Network tab "Priority" column. Controllable via the "fetchpriority" attribute and "rel=preload".

**Browser default priorities:**
- HTML document: Highest
- Render-blocking CSS: Highest
- Synchronous scripts in head: High
- In-viewport images: High (browser heuristic — above-fold images get boosted)
- Below-fold images: Low
- Async scripts: Low
- "rel=prefetch" resources: Lowest

**fetchpriority attribute (2022):** explicit hint to the browser — "fetchpriority=high" for LCP image, "fetchpriority=low" for non-critical images.

Example:
"img src='hero.webp' fetchpriority='high' — the browser gives this image high network priority immediately, even before the browser's own heuristics kick in.

**rel=preload:** tell the browser to fetch a resource immediately, at high priority, before it would normally discover it. "link rel='preload' href='font.woff2' as='font' crossorigin" — fonts are normally low priority until the CSSOM is built; preloading them eliminates FOUT.

**Priority pitfalls:** "rel=preload" without using the resource within 3s is a warning (wasted bandwidth). Preloading too many resources defeats the purpose — only preload the 1-2 most critical resources.

**Key insight:** "fetchpriority=high" on the LCP image is often the highest-ROI single HTML attribute change for performance. It costs nothing (no new request, no new resource) and can improve LCP by 100-400ms by telling the browser "this image is the most important thing to load first."`,
    },
    {
      id: 1331,
      name: "Request Blocking",
      desc: `**Request Blocking** — DevTools feature that lets you block specific URLs or patterns from loading, so you can measure the performance impact of individual resources without removing them from code. Available in Network tab → right-click a request → "Block request URL" / "Block request domain", or via the dedicated "Network request blocking" panel.

**Practical uses:**
- **Third-party impact testing:** block your analytics/ad/chat widget script → run Lighthouse → compare TBT before/after to quantify the performance tax of that third party
- **Testing without fonts:** block Google Fonts to see how fast the page would be with system fonts
- **A/B resource testing:** block the old version of a resource to test a new one
- **Debugging waterfalls:** block a slow resource to confirm it's the bottleneck

**Pattern-based blocking:** you can block entire domains ("google-analytics.com") or specific paths ("/api/v1/tracking"). Useful for blocking all requests to a third-party CDN to measure its combined impact.

**Request blocking panel:** View → Developer Tools → Network Request Blocking (or Cmd+Shift+P → "Show Network request blocking"). Add patterns, check/uncheck to toggle. Patterns support "*" wildcards.

**Measuring third-party impact:** the recommended workflow is: baseline Lighthouse run → block third-party script domain → Lighthouse run with block → delta TBT and LCP reveals exactly how much that script costs.

**Key insight:** third-party scripts are often the biggest LCP and TBT killers, yet they're invisible in your own bundle analysis. Request blocking is the fastest way to quantify "how much does removing this tag manager / chat widget / A/B testing script save?" Use this before advocating for script removal.`,
    },
    {
      id: 1332,
      name: "WebSocket Frames Inspector",
      desc: `**WebSocket Frames Inspector** — the Network tab view for WebSocket connections, showing each frame (message) sent and received in real time, with payload content, timestamp, and direction. Click a WS request → "Messages" tab.

**What it shows:** each row is a WebSocket frame — outgoing frames (arrow up, green) and incoming frames (arrow down, white). Columns: data (payload), length (bytes), time. Click a frame to see the full content.

**Debugging use cases:**
- **Verify messages are being sent:** confirm your WebSocket client is sending the expected messages after user actions
- **Inspect server push messages:** see what data the server is pushing and verify it's correct
- **Debug reconnection logic:** watch for disconnect frames and reconnect handshakes
- **Measure message frequency:** check if a real-time feature is sending too many updates (can be CPU/battery intensive)
- **Protocol inspection:** Socket.io uses a specific encoding ("42[event, data]") — verify protocol compliance

**Filtering frames:** filter by text content to find specific message types in a noisy stream.

**Binary frames:** binary WebSocket messages show as "(Binary data)" — right-click → "Save as" to download and inspect.

**Performance considerations:** large WebSocket messages or high-frequency updates can cause main thread jank (parsing JSON, triggering React re-renders). The Frames tab helps identify unexpectedly large payloads that should be compressed or batched.

**Key insight:** WebSocket debugging in DevTools is often overlooked because developers assume "if the feature works, the socket is fine." But examining actual message payloads reveals over-fetching (server sending too much data), redundant updates, and protocol inefficiencies that affect performance and battery on mobile.`,
    },
    {
      id: 1333,
      name: "Service Worker in Network Tab",
      desc: `**Service Worker Network Interception** — the Network tab shows whether each request was intercepted by a Service Worker (SW), served from Cache Storage, or fetched from the network. The "Size" column shows "ServiceWorker" for SW-served responses; the "Initiator" shows "service-worker.js".

**What to look for:**
- "from ServiceWorker" in the Size column — request intercepted and responded to by the SW (could be cache hit or network fetch from within SW)
- "(from cache)" or "disk cache" — browser HTTP cache (not SW cache)
- "from memory cache" — cached in memory for the session
- Normal size bytes — real network fetch

**Debugging SW caching:** when troubleshooting "why isn't the cache working?", the Network tab reveals: (1) is the SW registering and intercepting? (2) is the "fetch" event handler running? (3) is it returning a cached response or falling through to network?

**"Bypass for network" checkbox:** Network tab → gear icon → check "Disable cache" → does NOT disable SW interception. Must go to Application tab → Service Workers → check "Bypass for network" to force all requests through the network, bypassing SW.

**Network tab + Application tab workflow:** use Network tab to see which requests are SW-served; switch to Application tab → Cache Storage to inspect what's stored; Application tab → Service Workers to force update or check registration status.

**Key insight:** "Disable cache" in DevTools only disables the browser HTTP cache — it does NOT bypass Service Worker caches. This confuses developers debugging offline functionality. Always use "Bypass for network" in the Application tab's Service Workers panel when you want true cache-disabled behavior for SW-controlled pages.`,
    },
    {
      id: 1334,
      name: "Initiator & Request Chains",
      desc: `**Initiator Column** — the Network tab column showing what triggered each request: the HTML parser, a specific JavaScript file with line number, a stylesheet, or a user action. Hovering over the initiator shows the full request initiation stack trace.

**Initiator types:** "parser" (HTML document parser found the resource), "script" (JavaScript code made the request — hover to see exact file:line), "other" (usually a Service Worker or extension), "redirect" (another request redirected here).

**Request chains (dependency chains):** a sequence where one resource must load before the next begins. Lighthouse "Critical Request Chains" audit identifies these. Common patterns:
- HTML → render-blocking CSS → CSS loads font → font download (3 chained requests)
- HTML → blocking script → script makes fetch request (could be parallelized)
- Redirect chains: original URL → 301 → 301 → 301 → final URL (each hop adds TTFB latency)

**Breaking request chains:** the goal is to eliminate unnecessary chaining. Techniques:
- "rel=preload" for resources discovered late in chains
- Self-host fonts instead of Google Fonts (eliminates cross-origin connection + chain)
- Inline critical CSS (eliminates CSS file → font cascade)
- Eliminate redirect chains (fix 301s at the source)

**Link rel=modulepreload:** for ES modules that form chains (module A imports module B imports module C), "rel=modulepreload" for all modules in the chain flattens the waterfall.

**Key insight:** request chains are invisible until you look at the initiator column and waterfall together. A "fast server" but slow LCP often has a cascade: the LCP image's URL is only known after JavaScript loads, which only loads after CSS loads — a 3-deep chain where preloading or SSR would eliminate 2 round-trips.`,
    },
  ],
};

export default networkTab;
