const foundations = {
  name: "PWA Foundations",
  icon: "🌐",
  color: "#6366f1",
  concepts: [
    {
      id: 1142,
      name: "What is a Progressive Web App",
      desc: `**Progressive Web App (PWA)** — a web application that uses modern browser APIs to deliver app-like experiences: installable on the home screen, works offline, receives push notifications, and loads fast — all built with standard web technologies (HTML, CSS, JavaScript).

The term "progressive" means it works for every user regardless of browser support — a basic browser gets a basic web page; a modern browser gets the full native-app experience. PWAs are not a single technology but a collection of techniques and APIs assembled to close the gap between web and native apps.

**Three pillars of PWA:**
- **Reliable:** loads instantly and works offline or on poor connections (service workers + caching)
- **Fast:** responds quickly to user interactions; smooth animations (performance budget + optimized assets)
- **Engaging:** installable, re-engageable via push notifications, feels like a native app (Web App Manifest + service worker)

**Why PWAs won:** Twitter Lite saw 65% increase in pages per session; Pinterest PWA grew engagement 60%; Starbucks PWA is 99.84% smaller than its iOS app. Native app install friction (30-40% drop-off) is eliminated — users just tap "Add to Home Screen."

**Key insight:** PWA is not an either/or vs native — it's a spectrum. Many companies ship both a PWA and native apps. The PWA captures users who would never install the native app.`,
    },
    {
      id: 1143,
      name: "HTTPS Requirement",
      desc: `**HTTPS requirement** — PWA features (service workers, push notifications, installation) are restricted to HTTPS origins (plus "localhost" for development). This security baseline prevents service workers from being injected by network attackers.

Service workers can intercept and modify any network request from a page — they are extraordinarily powerful. Without HTTPS, a man-in-the-middle attacker could serve a malicious service worker that intercepts credentials, modifies responses, or exfiltrates data permanently. HTTPS guarantees the service worker code is authentic and unmodified.

**Practical implications:**
- All production PWAs must serve over HTTPS — no exceptions
- HTTP → HTTPS redirects: configure on server; CDN (Cloudflare, Fastly) provides free TLS
- Self-signed certificates: rejected by browser (use "localhost" for dev or mkcert for local dev with custom domains)
- Mixed content: even one HTTP resource on an HTTPS page blocks service worker registration

**Free TLS options:** Let's Encrypt (90-day auto-renewing), Cloudflare Universal SSL, AWS Certificate Manager (free for CloudFront/ALB).

**Key insight:** HTTPS is table stakes for any modern web app — not just PWAs. The service worker restriction is a feature, not a bug: it's what makes it safe to give service workers the power to intercept all network traffic.`,
    },
    {
      id: 1144,
      name: "Web App Manifest",
      desc: `**Web App Manifest** — a JSON file (linked via "link rel=manifest") that tells the browser metadata about your PWA: name, icons, theme color, display mode, start URL, and orientation. It's what enables "Add to Home Screen" and controls how the app appears when installed.

The manifest is the identity card of your PWA. Without it, browsers won't offer installation. With it, your app gets a home screen icon, a splash screen, and can run in "standalone" mode (no browser chrome — looks exactly like a native app).

**Key manifest fields:**
- "name" / "short_name": full name and abbreviated version for tight spaces
- "icons": array of icons at multiple sizes (at minimum: 192x192 and 512x512 PNG); maskable icons for adaptive icon shapes (Android)
- "start_url": URL opened when app launches from home screen (often "/?source=pwa" for analytics)
- "display": "standalone" (no browser UI), "fullscreen", "minimal-ui", or "browser"
- "theme_color": status bar and browser chrome color
- "background_color": splash screen background while app loads
- "scope": URL scope the app can navigate within; navigating outside opens the browser

**Maskable icons:** the "maskable" purpose means the icon can be cropped to any shape (circle, rounded square). Always include both "any" and "maskable" purpose icons.

**Key insight:** The "display": "standalone" mode is the magic that makes PWAs feel native — users have no idea they're in a browser. Ship a carefully designed icon at all required sizes; a pixelated home screen icon undermines the entire premium feel you're building.`,
    },
    {
      id: 1145,
      name: "Service Worker Overview",
      desc: `**Service Worker** — a JavaScript file that runs in a background thread (separate from the main page thread), acts as a programmable network proxy, and persists beyond the page lifecycle. It's the core technology enabling offline support, background sync, and push notifications.

Mental model: a service worker is like a smart router living between your app and the network. Every fetch request from your page goes through the service worker first. It can: serve a cached response immediately, fetch from the network and cache the result, or return a fallback when offline — all programmatically.

**Key characteristics:**
- Runs in a Worker context: no DOM access, no "window" — communicates with pages via "postMessage"
- Event-driven: only wakes up in response to events (fetch, push, sync, message)
- Persists after page close: browser can wake it for background tasks
- HTTPS-only (plus localhost)
- Cannot be registered from iframes; one service worker per scope

**Service worker scope:** controls which pages the service worker intercepts. Default scope = directory containing the SW file. "sw.js" at root intercepts all pages; "sw.js" at "/app/" only intercepts "/app/**".

**Key insight:** Service workers are the hardest PWA concept to master because they introduce a new execution environment with its own lifecycle, a new mental model for network requests, and subtle update behavior. Master the lifecycle first — everything else flows from that understanding.`,
    },
    {
      id: 1146,
      name: "App Shell Architecture",
      desc: `**App Shell Architecture** — a design pattern where the minimal HTML, CSS, and JavaScript needed to render the UI shell (header, navigation, skeleton) is cached offline and loaded instantly from the cache, while dynamic content (user data, news feed) is fetched from the network.

Mental model: think of a newspaper. The printing press (layout, structure, fonts) is always ready and cached locally. The news stories (content) arrive fresh from the network each time. Users see the shell instantly (< 100ms from cache), then content loads in.

**What belongs in the shell:**
- Navigation bar, sidebar, header
- Loading skeleton / placeholder UI
- Core CSS framework
- Critical JavaScript for rendering the shell

**What does NOT belong in the shell:**
- User-specific data (profile info, feeds, notifications)
- Frequently updated content (prices, availability)

**Implementation:** cache the shell assets on service worker install; on "fetch" events, return the shell from cache, then fetch and inject dynamic content. React, Vue, and Angular's code-splitting naturally maps to this pattern.

**vs. SSR/MPA:** App Shell is a SPA-centric pattern. Server-side rendered multi-page apps have a different caching strategy — each page is a document and can be cached individually.

**Key insight:** The shell is your app's skeleton. Get it right and users see "instant" load even on 3G. The psychological impact of zero blank-screen time is enormous — it's what makes PWAs feel native.`,
    },
    {
      id: 1147,
      name: "PWA Installability Criteria",
      desc: `**PWA installability criteria** — the minimum requirements a browser enforces before offering the "Add to Home Screen" / install prompt. Different browsers have slightly different bars; meeting all criteria ensures cross-browser installability.

**Chrome/Edge installability requirements (Chromium-based):**
1. Served over HTTPS (or localhost)
2. Has a Web App Manifest with: "name" or "short_name", "start_url", "icons" (192x192 + 512x512 PNG)
3. Has a registered service worker (with a "fetch" event handler)
4. User has engaged with the site (Chrome's heuristic: domain visited twice in 2+ different sessions within 2 weeks)

**Safari (iOS):** no automatic install prompt — users must tap the Share button → "Add to Home Screen" manually. iOS PWAs have many limitations vs Android: no push notifications (added in iOS 16.4+), no background sync, stricter storage limits.

**Firefox:** uses its own criteria; no install prompt on desktop but supports PWA installation via address bar.

**beforeinstallprompt event:** Chrome fires this event when installability criteria are met. Capture it, defer it, and show a custom install button at the right moment (not immediately on page load — that's annoying).

**Key insight:** "Installable" and "installed" are different outcomes. Optimize for the right moment to prompt — after the user has experienced value (completed a task, returned a second time). Pinterest improved install rates by showing the prompt only after a user pinned their first item.`,
    },
    {
      id: 1148,
      name: "Fetch Event & Network Interception",
      desc: `**Fetch event** — the core service worker event, fired for every network request made from pages in the service worker's scope. By adding a "fetch" event listener in the service worker, you intercept all requests and decide how to respond: from cache, from network, or a combination.

Every HTTP request (HTML documents, API calls, images, fonts, CSS) triggers "fetch". The service worker "respondWith()" method takes over the response — if you don't call it, the request proceeds normally to the network.

**Basic pattern:**
"event.respondWith()" takes a Promise that resolves to a Response. Return "caches.match(request)" for cache-first, or "fetch(request)" for network passthrough, or build a custom Response.

**Request filtering:** check "event.request.url", "event.request.method", "event.request.destination" to apply different strategies to different request types — cache images aggressively, always fetch API calls fresh, etc.

**"destination" property:** identifies what kind of resource is being fetched: "document", "script", "image", "font", "fetch" (XHR/fetch API calls), "style". Allows fine-grained strategy per resource type.

**Key insight:** The fetch event is where all the magic happens. A single "fetch" listener with conditional logic per URL pattern is the heart of your caching strategy. Libraries like Workbox abstract this into readable route matchers — but understanding the raw fetch event is essential for debugging production service workers.`,
    },
    {
      id: 1149,
      name: "Offline-First vs Offline-Capable",
      desc: `**Offline-first** — designing your app so that the default path always reads from local storage/cache, then syncs with the network when available. **Offline-capable** — an app that gracefully handles being offline but still prefers the network.

The distinction matters for architecture. Offline-first apps: always read from a local database (IndexedDB, PouchDB), optimistically update UI before confirming with server, queue mutations and sync when online. Offline-capable apps: show cached content when offline but require network for fresh data.

**Offline-first is hard because:**
- Conflict resolution: user A edits record offline while user B edits same record online — who wins?
- Consistency: local cache can be stale; how stale is acceptable?
- Sync complexity: queuing mutations, replaying in order, handling server-side validation failures on sync

**When to choose offline-first:** note-taking apps (Notion-like), field service apps used in areas with poor connectivity, mobile apps where offline = basic expectation.

**When offline-capable is sufficient:** e-commerce (showing slightly stale product listings is fine; checkout needs network), dashboards (stale data shown with timestamp), news readers.

**Key insight:** Most PWAs don't need full offline-first architecture — they need an offline fallback page and cached assets. Save the complexity of offline-first for apps where being offline is part of the core use case.`,
    },
    {
      id: 1150,
      name: "PWA vs Native App Trade-offs",
      desc: `**PWA vs native app trade-offs** — PWAs excel at distribution (no app store) and web reach but trail native in hardware API access, performance, and platform integration. Understanding where each wins guides the build-both, PWA-first, or native-first decision.

**PWA advantages:**
- No app store: no 30% cut, no review process, instant updates (users always get the latest version on next visit)
- Single codebase: one web app for all platforms
- Discoverability: indexed by search engines; link directly to any screen
- Frictionless acquisition: no install required to try the app
- Update model: deploy once, all users updated instantly (unlike native where many users run old versions)

**Native advantages:**
- Full hardware API access: ARKit, advanced Bluetooth, NFC, accelerometer, haptic feedback, health data
- Background execution: truly persistent background tasks, complex background audio/video
- App Store trust & discovery: App Store and Play Store are where many users discover apps
- Performance: native rendering, no JS overhead for complex animations
- iOS limitations: PWAs on iOS have historically lagged (no push notifications until iOS 16.4, storage limits, no background sync)

**Hybrid reality:** Starbucks, Pinterest, Uber, and Airbnb all ship both — the PWA captures the long tail of users; the native app serves power users.

**Key insight:** The frame of "PWA vs native" is increasingly obsolete. The question is: "what's the fastest path to reaching users in your context?" For emerging markets (lower-end Android devices), a well-optimized PWA often outperforms a bloated native app.`,
    },
    {
      id: 1151,
      name: "PWA Lighthouse Audit",
      desc: `**Lighthouse PWA audit** — Google's open-source automated tool (built into Chrome DevTools) that audits web apps for PWA compliance, performance (Core Web Vitals), accessibility, SEO, and best practices. The PWA checklist in Lighthouse is the authoritative guide to PWA requirements.

Run via: DevTools → Lighthouse tab → select "Progressive Web App" category → Generate report. Also available as CLI ("npm install -g lighthouse") for CI/CD integration.

**Lighthouse PWA categories:**
- Fast and reliable: page loads on mobile, offline fallback works, critical requests aren't slow
- Installable: HTTPS, valid manifest with correct icons, service worker registered
- PWA optimized: splash screen, themed address bar, content sized for viewport

**Lighthouse score vs PWA badge:** Lighthouse doesn't give a single "PWA score" — it gives a checklist. Meeting all items earns the PWA badge in Chrome DevTools. Performance score (0-100) is separate and measures Core Web Vitals.

**In CI/CD:** use "lighthouse-ci" (LHCI) to run audits on every PR and fail builds if scores drop below thresholds. Prevents performance regressions from shipping.

**Key insight:** Lighthouse is essential but not sufficient — it audits technical requirements, not user experience quality. A PWA can pass all Lighthouse checks and still be slow on real devices. Always test on physical low-end Android devices on throttled connections alongside Lighthouse.`,
    },
  ],
};

export default foundations;
