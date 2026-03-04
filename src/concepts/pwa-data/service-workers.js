const serviceWorkers = {
  name: "Service Workers",
  icon: "⚙️",
  color: "#3b82f6",
  concepts: [
    {
      id: 1152,
      name: "Service Worker Lifecycle",
      desc: `**Service Worker Lifecycle** — the sequence of states a service worker passes through: Download → Parse → Install → Activate → Idle → Terminated. Understanding the lifecycle is essential because it determines when the service worker takes control of pages and how updates propagate.

**Stages:**
1. **Registration:** "navigator.serviceWorker.register('/sw.js')" downloads and parses the file
2. **Installing:** "install" event fires; typically cache static assets here with "event.waitUntil()"
3. **Waiting:** new service worker installed but can't activate while old SW still controls open tabs — it sits in the "waiting" state
4. **Activating:** old SW released; "activate" event fires; clean up old caches here
5. **Active:** service worker controls pages, handles fetch/push/sync events
6. **Idle/Terminated:** browser terminates idle service workers to save memory; they wake on next event

**The waiting state problem:** if a user has your app open in multiple tabs, a new service worker waits indefinitely until all tabs are closed or refreshed. This is why updates feel slow. Solutions: "skipWaiting()" (activates immediately, risks version mismatch mid-session), show "Update available — click to reload" UI.

**"waitUntil()":** extends the install/activate event until the provided promise resolves. Without it, the browser might terminate the service worker before caching completes.

**Key insight:** The lifecycle is designed for correctness — you'd never want two different service worker versions controlling different tabs of the same app simultaneously. The waiting state is a safety net. The UX challenge is communicating updates gracefully rather than forcing refreshes.`,
    },
    {
      id: 1153,
      name: "Registering a Service Worker",
      desc: `**Service Worker registration** — the process of telling the browser about your service worker file via "navigator.serviceWorker.register()". Done in your main JavaScript (app entry point), this is the bridge between the page and the service worker.

**Basic registration:**
"if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js').then(reg => ...).catch(err => ...); }"

Check feature support first — "serviceWorker" in navigator — for graceful degradation in unsupported browsers (Safari < 11.1, IE).

**Registration options:**
- "scope": override the default scope (can only narrow, not widen beyond the SW file location)
- "updateViaCache": "none" (always fetch the SW file fresh, bypassing HTTP cache — recommended)

**Update check:** browser checks for a new SW file on every navigation within scope (byte-for-byte comparison). If even 1 byte changed, the new SW enters the install phase. HTTP cache can delay update detection — use "updateViaCache: 'none'" to fetch sw.js fresh every time.

**Detecting updates in the page:**
"reg.addEventListener('updatefound', () => { const newSW = reg.installing; newSW.addEventListener('statechange', ...) })" — use this to show an "Update available" toast.

**Key insight:** Register your service worker unconditionally on every page load — the browser is smart enough to skip re-registration if the same script is already active. Conditional registration (e.g., only on homepage) creates scope coverage gaps.`,
    },
    {
      id: 1154,
      name: "Install Event & Pre-caching",
      desc: `**Install event** — the first lifecycle event fired in a service worker, used to pre-cache static assets that the app needs to function. Opened once when the service worker is first installed, this is your opportunity to populate the cache with the app shell.

**Pattern:**
"self.addEventListener('install', event => { event.waitUntil( caches.open('v1').then(cache => cache.addAll(['/index.html', '/styles.css', '/app.js', '/offline.html'])) ); });"

"cache.addAll()" is atomic — if any resource fails to fetch, the entire install fails and the service worker won't activate. This ensures a complete, consistent cache or none at all.

**Versioning caches:** name caches with version ("app-v2") so old caches can be identified and deleted in the activate event.

**"skipWaiting()" in install:** calling "self.skipWaiting()" during install forces the new service worker to activate immediately without waiting for old tabs to close. Useful during development; risky in production (can cause version mismatch).

**Pre-cache hygiene:** don't pre-cache too much. Aggressively pre-caching large assets wastes bandwidth (user pays for it on first visit). Cache only the app shell (HTML, critical CSS/JS). Let the runtime caching handle the rest.

**Key insight:** The install event is your one guaranteed opportunity to set up the cache. But restraint matters — pre-caching 10MB of assets on first visit will spike your bounce rate. Cache just enough for offline functionality; runtime caching handles the rest.`,
    },
    {
      id: 1155,
      name: "Activate Event & Cache Cleanup",
      desc: `**Activate event** — fires after the service worker enters the "activating" state (old service worker released). The canonical place to delete stale caches from previous versions, preventing unbounded disk growth.

**Pattern:**
"self.addEventListener('activate', event => { const currentCaches = ['app-v2', 'runtime-v1']; event.waitUntil( caches.keys().then(keys => Promise.all( keys.filter(key => !currentCaches.includes(key)).map(key => caches.delete(key)) )) ); });"

Without cleanup, every deployment adds a new cache while old ones accumulate — browsers will eventually evict them (storage pressure), but proactive cleanup is better practice.

**"clients.claim()":** calling "self.clients.claim()" in the activate event makes the new service worker immediately control all open pages (not just new ones). Combined with "skipWaiting()", ensures the new SW controls everything immediately.

**Activate timing:** the activate event fires when there are no more pages being controlled by the previous service worker. If users have the app open, activate is deferred. "clients.claim()" makes the activated SW take control of existing clients.

**Key insight:** activate is cleanup time — it's safe because the old service worker is gone. Always pair cache versioning (in install) with cache cleanup (in activate). Without this, you'll leak disk space with every deployment.`,
    },
    {
      id: 1156,
      name: "Caching API (Cache Storage)",
      desc: `**Cache Storage API** — a key-value store for Request/Response pairs, accessible from both service workers and regular pages. Unlike HTTP cache (browser-managed), Cache Storage is programmatically controlled — you decide what goes in, what comes out, and when to delete it.

**Core methods:**
- "caches.open(name)": opens (or creates) a named cache, returns CacheStorage object
- "cache.put(request, response)": add a request-response pair
- "cache.match(request)": retrieve a cached response (or undefined if not found)
- "cache.add(url)": fetch a URL and put result in cache (convenience wrapper)
- "cache.addAll(urls)": fetch all URLs and cache (atomic)
- "cache.delete(request)": remove an entry
- "caches.delete(cacheName)": delete an entire named cache

**Cache matching options:** "cache.match(request, { ignoreSearch: true })" ignores query strings; "ignoreVary: true" ignores Vary headers — useful for cached responses that vary by Accept-Encoding but you want to serve from cache regardless.

**Storage quota:** Cache Storage shares quota with IndexedDB and origin-private file system. Use "navigator.storage.estimate()" to check usage and quota. Eviction policy: browsers evict by LRU when under storage pressure.

**Key insight:** Think of Cache Storage as a persistent HTTP cache you control. The key mental shift: you're not caching files, you're caching Request-Response pairs. The same URL fetched with different headers is a different cache entry — which matters when APIs use Accept or Authorization headers.`,
    },
    {
      id: 1157,
      name: "Background Sync",
      desc: `**Background Sync** — a service worker API that lets you defer network requests until the user has a reliable connection, even if the page is closed. The browser will wake the service worker and retry the sync when connectivity is restored.

Mental model: a postal worker that holds your letter (failed network request) and delivers it when the post office (network) opens. Your app queues actions locally; the service worker delivers them when online.

**How it works:**
1. User performs an action (submits a form) while offline
2. App stores the request data in IndexedDB
3. App calls "navigator.serviceWorker.ready.then(sw => sw.sync.register('send-message'))"
4. When connectivity returns, browser fires "sync" event in service worker
5. Service worker reads from IndexedDB and retries the request

**Service worker sync handler:** "self.addEventListener('sync', event => { if (event.tag === 'send-message') event.waitUntil(sendQueuedMessages()); });"

**Retry behavior:** if the sync fails (request throws), the browser retries with exponential backoff (up to 3 days by default for "last-chance" events).

**Browser support:** Chrome, Edge, and Android browsers support Background Sync. Safari and Firefox: limited/no support (2026). Use as progressive enhancement.

**Key insight:** Background Sync is the correct solution for "user took an action while offline" — not polling on reconnection. It's event-driven, battery-efficient, and works even when the tab is closed. Always store the user's intent in IndexedDB before registering the sync.`,
    },
    {
      id: 1158,
      name: "Periodic Background Sync",
      desc: `**Periodic Background Sync** — an API that lets a PWA wake its service worker periodically in the background to refresh content (news, weather, email) — even when the app isn't open. The browser respects battery and network constraints when deciding when to fire the periodic sync.

Think of it as a controlled cron job for your web app. Instead of the user opening the app and waiting for fresh content, the app pre-fetches content in the background so it's ready instantly.

**Registration:** "registration.periodicSync.register('update-news', { minInterval: 24 * 60 * 60 * 1000 });" — registers a tag with a minimum interval (24 hours). The browser decides actual timing based on: device charging, network quality, site engagement.

**Handler:** "self.addEventListener('periodicsync', event => { if (event.tag === 'update-news') event.waitUntil(fetchAndCacheLatestNews()); });"

**Permission model:** users must grant permission (Chrome: prompted when the app is installed); browser only fires periodic sync for sites with sufficient engagement (visit frequency heuristic).

**Limitations:** minimum interval is a hint, not a guarantee — browser may fire less frequently. Can't run code on a rigid schedule (use server push notifications for that).

**Browser support:** Chrome/Edge on Android only (2026). Not supported on iOS, Firefox, or desktop Chrome.

**Key insight:** Periodic Background Sync is perfect for content-driven apps (news, email) where freshness matters but exact timing doesn't. It's battery and data conscious by design — the browser optimizes for user battery life, which means your sync runs opportunistically rather than on a strict schedule.`,
    },
    {
      id: 1159,
      name: "Message Passing (postMessage)",
      desc: `**postMessage in Service Workers** — the communication channel between the service worker and the page(s) it controls. Since service workers run in a separate thread with no DOM access, "postMessage" is the bridge for bidirectional communication.

**Page to Service Worker:** "navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });" — page sends a message to the active service worker.

**Service Worker to Page:** "self.clients.matchAll().then(clients => clients.forEach(client => client.postMessage({ type: 'CACHE_UPDATED' })));'" — service worker broadcasts to all controlled pages.

**Receiving in service worker:** "self.addEventListener('message', event => { if (event.data.type === 'SKIP_WAITING') self.skipWaiting(); });"

**Receiving in page:** "navigator.serviceWorker.addEventListener('message', event => { if (event.data.type === 'CACHE_UPDATED') showRefreshNotification(); });"

**MessageChannel:** for two-way communication in a single message, pass a "MessageChannel" port: "const { port1, port2 } = new MessageChannel(); sw.postMessage(msg, [port2]); port1.onmessage = (e) => ...;"

**Common use cases:** triggering "skipWaiting" on user confirmation, notifying pages of cache updates, syncing state between SW and page, streaming data from background sync.

**Key insight:** postMessage is simple but requires discipline. Define a clear message protocol (type field + payload) and document it — undocumented message types between SW and page are a maintenance nightmare. Consider a small pub/sub wrapper rather than raw postMessage.`,
    },
    {
      id: 1160,
      name: "Service Worker Update Flow",
      desc: `**Service Worker Update Flow** — the complete sequence from deploying a new service worker to users running the updated version. Getting this right is critical for delivering updates reliably without confusing users.

**What triggers an update check:** every navigation within the SW scope, every "register()" call, every push event — browser checks for a new SW file (byte comparison). With "updateViaCache: 'none'", this always bypasses HTTP cache.

**Update states:**
1. Browser detects new SW file (different bytes)
2. New SW installs alongside old (runs install event)
3. New SW enters "waiting" state (old SW still active for open tabs)
4. All tabs closed → old SW released → new SW activates

**Common patterns for update UX:**
- **Force update (skipWaiting):** page sends "SKIP_WAITING" message → SW calls "self.skipWaiting()" → SW activates → page reloads. Risk: mid-session update can break in-flight requests.
- **User-prompted update:** detect waiting SW (via "updatefound" event), show "New version available — reload" toast, activate on user click.
- **Silent update:** let the browser handle it naturally (next time user opens a fresh tab).

**Workbox's "workbox-window"** handles update detection and user notification with minimal boilerplate.

**Key insight:** Force-updating with "skipWaiting()" without page reload is the worst of both worlds — new SW active but page has stale cached assets from old version. Always pair "skipWaiting()" with "clients.claim()" and a page reload. Or better: show a non-intrusive toast and let users choose.`,
    },
    {
      id: 1161,
      name: "Service Worker Debugging",
      desc: `**Service Worker Debugging** — the set of DevTools techniques and patterns for inspecting, testing, and troubleshooting service worker behavior. Service workers are notoriously difficult to debug due to their async lifecycle and separate thread.

**Chrome DevTools → Application panel:**
- Service Workers tab: see registered SWs, their status (installing/waiting/active), force update/skip waiting/unregister
- Cache Storage: inspect what's in each named cache, check individual entries
- Background Sync and Periodic Sync: inspect registered sync tags
- Storage: check quota usage per origin

**Common debugging techniques:**
- "Update on reload" checkbox: forces SW update check on every refresh during development (bypasses waiting state)
- "Bypass for network" (Network tab): skips service worker for individual requests to compare cached vs live
- Console in SW context: select the service worker context from the DevTools JS context selector to run commands in the SW global scope
- Breakpoints in SW: set breakpoints in sw.js just like any other JS file

**Stale cache debugging:** "Network" tab → check "from ServiceWorker" in response headers — confirms the SW handled the request. Cache-Control response header shows the original network response headers (not the cache retrieval headers).

**Production debugging:** use "workbox-broadcast-update" to notify pages when cached responses are stale; use custom logging middleware in the fetch handler.

**Key insight:** "Update on reload" in DevTools is your lifesaver during development — without it, every change to your service worker requires closing all tabs and reopening. Keep it checked during development; understand why it must not be enabled in production.`,
    },
    {
      id: 1162,
      name: "Service Worker Scope & Multiple SWs",
      desc: `**Service Worker Scope** — a URL prefix that determines which pages a service worker controls. Only requests from pages within the scope are intercepted by the service worker's fetch handler. Multiple service workers can coexist on the same origin, each with a different scope.

**Scope rules:**
- Default scope: the directory containing the service worker file. "/sw.js" → scope "/"; "/app/sw.js" → scope "/app/"
- Scope can be set explicitly: "register('/sw.js', { scope: '/app/' })" — but you cannot set scope wider than the SW file location (security constraint)
- A page is controlled by at most one service worker (the most specific scope wins)

**Service-Worker-Allowed header:** to use a scope wider than the SW file location, the server must send the "Service-Worker-Allowed" header with the desired scope.

**Multiple SWs on one origin:** a complex app can have multiple SWs — one at "/blog/sw.js" for the blog, one at "/app/sw.js" for the app. Each manages its own caches and fetch interception independently. Useful for monorepos serving multiple apps from one domain.

**Scope pitfall:** placing your service worker at "/app/sw.js" means it cannot intercept requests for "/index.html" (root path). Always place SW at the highest scope needed, typically the root.

**Key insight:** Scope is where most "why isn't my service worker intercepting requests?" bugs come from. When your fetch handler isn't firing, check scope first. The DevTools Application panel shows the exact scope and which pages are controlled.`,
    },
    {
      id: 1163,
      name: "Service Worker Performance Overhead",
      desc: `**Service Worker Performance Overhead** — the startup latency added when a browser needs to wake a terminated service worker before it can handle a fetch event. Understanding this overhead is key to designing caches that improve, rather than worsen, perceived performance.

**SW startup cost:** a terminated service worker takes 10-50ms to boot before handling its first fetch event. For cold navigations where the SW is terminated, this adds latency before any network requests can be intercepted.

**"respondWith" must be called synchronously:** if you decide to respond with the cache, "event.respondWith()" must be called synchronously in the fetch event handler — you cannot await something first and then call it. The caching logic must be immediate.

**Navigation preload:** "NavigationPreloadManager" API allows the browser to send the navigation request to the network simultaneously with starting the service worker, parallelizing SW boot and network request. Eliminates SW startup latency from page navigation: "self.addEventListener('activate', event => event.waitUntil(self.registration.navigationPreload.enable()));"

**Service worker memory:** active service workers consume memory. Complex SWs with large in-memory state add to page memory pressure. Keep service workers lean — store state in Cache Storage/IndexedDB, not in-memory.

**Key insight:** Navigation preload is a must-have optimization for any PWA that caches HTML documents. Without it, every page navigation incurs the SW startup latency. It's a 3-line change that can shave 30-50ms from Time to First Byte on repeat visits.`,
    },
  ],
};

export default serviceWorkers;
