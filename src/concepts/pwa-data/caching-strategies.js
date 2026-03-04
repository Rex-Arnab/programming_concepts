const cachingStrategies = {
  name: "Caching Strategies",
  icon: "💾",
  color: "#8b5cf6",
  concepts: [
    {
      id: 1164,
      name: "Cache-First Strategy",
      desc: `**Cache-First (Cache Falling Back to Network)** — the service worker checks the cache first; if a cached response exists, it's returned immediately without touching the network. Only on a cache miss does it fetch from the network (and optionally cache the result).

Mental model: a library where books are checked out from the shelf (cache) first — only if the book isn't there do you request it from the warehouse (network). Fastest possible response for cached resources.

**Implementation:** "event.respondWith(caches.match(request).then(cached => cached || fetch(request)));"

**Best for:**
- Static assets with hashed filenames (app.a3f9d.js, logo.png) — content-addressable, safe to cache forever
- App shell HTML (layout that doesn't change between deploys)
- Fonts and icons

**Not suited for:** API responses, user-specific data, any content that changes without a URL change.

**Cache invalidation:** the classic problem. Cache-first assumes the URL changing means content changed. Content-addressed URLs (hash in filename) solve this perfectly — new content = new URL = automatic cache miss. Non-hashed URLs require explicit cache deletion or versioning.

**Key insight:** Cache-first is the fastest strategy for the right resources. The contract is: "if this URL is in cache, return it, forever." Only use cache-first for immutable resources or resources with content-addressed URLs. Using it for mutable resources leads to users seeing stale content indefinitely.`,
    },
    {
      id: 1165,
      name: "Network-First Strategy",
      desc: `**Network-First (Network Falling Back to Cache)** — tries the network first; if the request succeeds, returns the fresh response (and updates the cache); if the network fails (offline/timeout), falls back to the cached version.

Mental model: you always try to read today's newspaper (network) — but if the delivery fails (offline), you read yesterday's paper (cache). Fresh when possible; stale-but-functional when not.

**Implementation:** "event.respondWith(fetch(request).then(response => { cache.put(request, response.clone()); return response; }).catch(() => caches.match(request)));"

Note: "response.clone()" — a Response body can only be consumed once. Clone before caching so you can both cache it and return it.

**Best for:**
- API responses where freshness matters (news feeds, product listings, social media)
- HTML documents in multi-page apps (always want latest version)

**Timeout consideration:** network-first with no timeout means offline users wait for the full request timeout before seeing the cache fallback (30+ seconds). Add a race with a timeout promise to fall back to cache faster.

**Not suited for:** static assets (slower than needed, network overhead); offline-only workflows.

**Key insight:** Network-first with a timeout (e.g., 3 seconds) is the sweet spot for most API calls. Users get fresh data when online and a fast cache fallback when offline — not a 30-second spinner followed by an error. Always pair with cache population on network success.`,
    },
    {
      id: 1166,
      name: "Stale-While-Revalidate",
      desc: `**Stale-While-Revalidate** — returns the cached response immediately (stale) while simultaneously fetching a fresh version from the network in the background. The cache is updated with the fresh response for the next request.

Mental model: you hand a customer yesterday's menu (cache hit = instant) while printing today's menu in the back (background fetch). Next customer gets today's menu.

**Implementation:** "event.respondWith(caches.open(CACHE).then(cache => cache.match(request).then(cached => { const fetchPromise = fetch(request).then(fresh => { cache.put(request, fresh.clone()); return fresh; }); return cached || fetchPromise; })));"

**Best for:**
- Frequently updated content where slight staleness is acceptable (weather, news, profile data)
- Any response where you want instant load AND eventual freshness
- Fonts and third-party resources (get cached fast, silently updated)

**Staleness window:** the user always sees data from "last time the network succeeded." On first visit (no cache), it's network-first. On repeat visits, it's cache-first with a background refresh. The user never waits.

**vs. Network-First:** stale-while-revalidate always responds from cache (fast); network-first always tries network first (fresher but slower when online). Choose based on whether your users need the absolute latest data or fast responses.

**Key insight:** Stale-while-revalidate is often the best default strategy for content APIs. Users get instant perceived performance; the background refresh keeps data eventually fresh. The only case it fails: when a user must see the latest data before acting (e.g., inventory count before checkout).`,
    },
    {
      id: 1167,
      name: "Cache-Only Strategy",
      desc: `**Cache-Only** — only looks in the cache; never makes a network request. If the resource isn't in the cache, the fetch fails. Useful for resources that were pre-cached during install and should never change.

Implementation: "event.respondWith(caches.match(request));"

**Best for:** resources pre-cached in the install event (app shell) that you know are in cache. Guarantees zero network requests for those resources — the fastest possible load.

**Rarely used standalone:** cache-only is typically used as a fallback route in a router pattern, not as the global strategy. Workbox's "CacheOnly" strategy is applied to specific URL patterns (e.g., "/offline.html" which is always pre-cached).

**Danger:** if a resource isn't in cache, "caches.match()" returns undefined and "respondWith(undefined)" throws — the fetch fails with a network error. Always pre-cache everything the cache-only route covers.

**Key insight:** Cache-only is the "trust the cache completely" strategy. It makes sense for version-controlled, pre-cached assets where you're 100% certain they're in cache. Combining cache-only for the shell with network-first or stale-while-revalidate for content is a clean architecture.`,
    },
    {
      id: 1168,
      name: "Network-Only Strategy",
      desc: `**Network-Only** — bypasses the cache entirely; always fetches from the network. The service worker passes the request through without any caching logic.

Implementation: "event.respondWith(fetch(request));" — or simply don't call "respondWith()" and let the request proceed normally.

**Best for:**
- Non-idempotent requests (POST, PUT, DELETE) — you don't want to accidentally return a cached checkout response
- Real-time data (stock prices, live sports scores) where stale data is worse than no data
- Analytics and logging endpoints — you want the actual network request to fire
- Authentication endpoints (login, token refresh)

**Not a "do nothing" strategy:** it explicitly passes the request to the network, bypassing any other cached responses. If you have a global cache-first strategy but want to exclude API mutations, apply network-only to those routes.

**Combining strategies:** a well-designed PWA uses different strategies per URL pattern: cache-first for "*.js", "*.css"; stale-while-revalidate for "/api/news"; network-only for "/api/checkout".

**Key insight:** Network-only is the correct default for any request that changes state on the server. Caching POST responses is almost always wrong — returning a cached "order confirmed" response for a new checkout attempt would be disastrous. Be explicit: opt these routes into network-only.`,
    },
    {
      id: 1169,
      name: "Cache Expiration & TTL",
      desc: `**Cache Expiration (TTL in service worker caches)** — the practice of automatically removing cached entries that are too old or exceed a maximum count. Unlike HTTP cache headers (which the browser manages), service worker cache expiration is implemented in your code (or via Workbox plugins).

**Why needed:** Cache Storage doesn't auto-expire. Pre-cached news articles from 6 months ago will sit in cache forever unless explicitly removed. This wastes storage and serves stale data.

**Workbox ExpirationPlugin:** "new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 })" — limits a cache to 50 entries (LRU eviction) and expires entries older than 30 days.

**Manual expiration:** store a timestamp alongside each cached response (in cache metadata or a separate IndexedDB store). On cache retrieval, check if "Date.now() - timestamp > TTL"; if so, delete and fetch fresh.

**Browser eviction vs. manual TTL:** browsers evict cache storage under storage pressure (LRU, no guaranteed behavior). Don't rely on browser eviction for freshness — implement TTL explicitly for content that goes stale.

**HTTP Expires / Cache-Control headers in cached responses:** the original HTTP headers are stored with the cached response, but service workers don't automatically respect them — you must implement TTL checking yourself (Workbox does this via the CacheExpiration module).

**Key insight:** Cache expiration is frequently overlooked until users report seeing 6-month-old news articles. Design TTLs per resource type: static assets = 1 year (but hashed URLs make TTL moot); API responses = 1 hour to 1 day; user profile data = 15 minutes.`,
    },
    {
      id: 1170,
      name: "Offline Fallback Page",
      desc: `**Offline Fallback Page** — a custom HTML page served from the cache when a navigation request fails (user is offline or network error). Instead of the browser's default "No internet connection" error, users see a branded, helpful offline page.

**Implementation:**
1. Pre-cache "/offline.html" in the install event
2. In the fetch handler, catch navigation request failures and return the offline page:
"event.respondWith(fetch(request).catch(() => caches.match('/offline.html')));"
3. Only apply to navigation requests: "event.request.mode === 'navigate'"

**What to include on the offline page:**
- Clear messaging: "You're offline. Check your connection."
- Navigation to previously visited pages (list from Cache Storage)
- Games or content (chess, sudoku) for entertainment while waiting
- Auto-retry logic (periodically attempt reconnection, reload on success)

**Offline fallback for images:** return a placeholder SVG when an image can't be loaded offline: "if (event.request.destination === 'image') return new Response(svgPlaceholder, { headers: { 'Content-Type': 'image/svg+xml' } });"

**Testing offline UX:** DevTools → Network tab → "Offline" throttle preset. Test that all main flows either work from cache or degrade to helpful offline state — never a blank page.

**Key insight:** The offline page is your brand's representation in degraded mode. A well-designed offline page with a "you're offline" illustration, a list of cached pages, and auto-retry logic transforms an error state into a managed experience. It's a small investment that signals quality to users.`,
    },
    {
      id: 1171,
      name: "Runtime Caching",
      desc: `**Runtime caching** — caching resources dynamically as they're requested (at runtime), as opposed to pre-caching resources explicitly at install time. The cache is populated lazily: first request hits the network, subsequent requests are served from cache.

**How it works:** in the fetch event handler, after fetching from the network, "cache.put(event.request, response.clone())" saves the response. The next request for the same URL hits cache.

**Runtime caching vs. pre-caching:**
- Pre-cache: known list of critical resources, cached on SW install, always available offline
- Runtime cache: discovered resources cached on first access, grows over time, eventually available offline

**Workbox's "registerRoute()":** the idiomatic way to set up runtime caching:
"registerRoute(({ url }) => url.pathname.startsWith('/api/'), new StaleWhileRevalidate({ cacheName: 'api-cache', plugins: [new ExpirationPlugin({ maxEntries: 100 })] }));"

**Cache growth:** runtime caches grow unbounded without expiration policies. Always pair runtime caching with "ExpirationPlugin" (max entries, max age) to prevent disk bloat.

**Request deduplication:** if two fetches for the same URL are in-flight simultaneously, the second one should wait for the first rather than making a redundant request. Workbox handles this automatically.

**Key insight:** Pre-caching handles the known unknown (your app shell files); runtime caching handles the unknown unknown (user navigation patterns, API responses). Together they cover offline support comprehensively without bloating the initial install payload.`,
    },
    {
      id: 1172,
      name: "Workbox Overview",
      desc: `**Workbox** — Google's production-grade JavaScript library for service worker authoring. It abstracts the complex, error-prone service worker boilerplate (caching strategies, pre-caching, background sync, expiration) into a clean, composable API.

**Why Workbox:** writing a correct service worker from scratch requires handling edge cases most developers don't know exist (response cloning, opaque responses, cache versioning, correct cleanup). Workbox handles all of this correctly and is battle-tested at scale.

**Core modules:**
- "workbox-routing": route matchers (URL pattern → strategy)
- "workbox-strategies": CacheFirst, NetworkFirst, StaleWhileRevalidate, CacheOnly, NetworkOnly
- "workbox-precaching": pre-cache manifest management with revision hashing
- "workbox-expiration": TTL and max-entries enforcement
- "workbox-background-sync": automatic Background Sync with IndexedDB queue
- "workbox-broadcast-update": notify pages when cached content updates
- "workbox-window": page-side library for SW registration, update detection, messaging

**Integration:** Workbox integrates with Vite ("vite-plugin-pwa"), webpack ("workbox-webpack-plugin"), and create-react-app. Generates the precache manifest from your build output automatically.

**InjectManifest vs. generateSW mode:** "generateSW" auto-generates a complete service worker (good for most projects); "InjectManifest" injects the precache manifest into your custom SW file (full control, recommended for complex projects).

**Key insight:** Use Workbox for any production PWA. The alternative — hand-crafting service workers — is a correctness and maintenance trap. Workbox is developed by the Chrome team and incorporates years of real-world production learnings. The abstraction cost is zero; the bug prevention value is enormous.`,
    },
    {
      id: 1173,
      name: "Opaque Responses & CORS in Caching",
      desc: `**Opaque responses** — cross-origin "no-cors" fetch responses where the browser hides the status code, headers, and body to prevent data leakage. They're still cacheable, but you can't inspect them — and this creates subtle bugs in service worker caching.

**Why opaque responses are dangerous:**
- Status code is always 0 — you can't tell if the request succeeded or failed (an HTTP 404 looks identical to HTTP 200)
- Browsers pad opaque response sizes to prevent timing-based data leakage — a tiny error response (150 bytes) might be stored as 7MB, rapidly filling storage quota
- "cache.put()" with an opaque response will succeed even for failed requests — you cache 404s silently

**Safe handling:**
- "fetch(request, { mode: 'cors' })" + proper CORS headers on the server: converts opaque to transparent response — cacheable and inspectable
- For truly opaque resources (third-party APIs with no CORS): cache with caution, always check "response.ok" before caching, but you can't actually do that for opaque responses. Solution: avoid caching opaque responses unless you control the server and can add CORS.

**Workbox protection:** Workbox's strategies automatically skip caching opaque responses with non-ok status (using the "cacheableResponsePlugin" by default).

**Key insight:** Opaque responses are the #1 source of mysterious "cache filled up" bugs in PWAs. If you're using runtime caching for any cross-origin resource (Google Fonts, CDN assets), verify CORS is enabled on the server so you get transparent responses. Never blindly cache opaque responses from "no-cors" fetches.`,
    },
  ],
};

export default cachingStrategies;
