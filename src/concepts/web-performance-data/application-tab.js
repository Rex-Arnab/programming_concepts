const applicationTab = {
  name: "DevTools: Application Tab",
  icon: "🗄️",
  color: "#8b5cf6",
  concepts: [
    {
      id: 1345,
      name: "Application Tab Overview",
      desc: `**Application Tab** — Chrome DevTools panel for inspecting and debugging everything related to a web app's stored data, service workers, PWA manifest, and background services. The sidebar structure mirrors the browser's storage model: Application (manifest/SW), Storage (all data stores), Background Services, and Frames (resource inspector).

**Main sections (matching the DevTools sidebar):**
- **Application:** Manifest (PWA installability), Service Workers (registration/lifecycle debugging)
- **Storage:** Local storage, Session storage, Extension storage, IndexedDB, Cookies, Private state tokens, Interest groups, Shared storage, Cache storage, Storage buckets
- **Background services:** Back/forward cache, Background fetch, Background sync, Bounce tracking mitigations, Notifications, Payment handler, Periodic background sync, Speculative loads, Push messaging, Reporting API
- **Frames:** Top-level frame and subframes, with nested CSS, Font, and JavaScript resource lists

**"Storage" quota widget:** at the bottom of the Application sidebar, shows total storage used vs available quota for the origin, broken down by: IndexedDB, Cache Storage, Service Workers, Local Storage. Essential for diagnosing storage quota issues in PWAs.

**"Clear site data" button:** wipe all storage, cookies, caches, and service worker registration for the current origin in one click. The fastest way to reset to a clean state for testing.

**Key insight:** the Application tab is the complete interface for everything that persists beyond a page refresh. If you're debugging "why does the cached version still show?" or "why is my SW not updating?" or "where is this stale data coming from?" — the Application tab has the answer.`,
    },
    {
      id: 1346,
      name: "Manifest & PWA Installability",
      desc: `**Manifest Panel** — Application tab → Manifest. Displays the parsed contents of the "manifest.json" (Web App Manifest) and runs installability checks, showing why a PWA can or cannot be installed.

**What it shows:**
- Parsed manifest fields: "name", "short_name", "start_url", "display", "theme_color", "background_color", "icons"
- Icon previews at each declared size
- Installability checklist: pass/fail for each PWA install requirement
- Identity section: app name and icon as they'll appear in the OS
- Presentation: display mode, orientation, theme color
- Protocol Handlers: any custom protocol registrations

**Installability requirements (Chrome):**
- Has a web app manifest with "name" or "short_name"
- Has a 192px and 512px icon
- "start_url" is valid
- "display" is "standalone", "fullscreen", "minimal-ui", or "browser"
- Served over HTTPS (or localhost)
- Has a registered Service Worker with a "fetch" event handler

**Common installability failures shown in panel:**
- "Page does not work offline" — SW "fetch" handler not returning a response for offline requests
- "No matching service worker detected" — SW not registered or not controlling the page
- "Manifest does not contain a suitable icon" — missing 192px icon

**Debugging HTTPS in development:** Manifest panel shows installability issues in dev too. Use "localhost" (treated as secure) or set up a local HTTPS cert (mkcert) to test installability locally.

**Key insight:** the Manifest panel is the single pane for PWA installability debugging. It tells you exactly which criteria are failing, with a human-readable message. The most common missed requirement is a Service Worker with a "fetch" handler that works offline — not just a registered SW.`,
    },
    {
      id: 1347,
      name: "Service Workers Panel",
      desc: `**Service Workers Panel** — Application tab → Service Workers. Shows all registered service workers for the origin, their lifecycle status (activating/activated/waiting/stopped), and provides controls to debug, update, and manipulate them.

**Panel controls:**
- **"Update on reload":** forces the SW to update on every reload (bypasses the 24-hour update check). Essential for development — without it, your SW changes may not be picked in testing.
- **"Bypass for network":** all requests go straight to the network, bypassing SW interception. Different from "Disable cache" in Network tab — this bypasses SW entirely. Use to confirm a SW is causing a bug.
- **"Offline" checkbox:** simulates offline condition at the SW level (only affects SW-controlled fetches, not DevTools itself).
- **"Update" button:** manually trigger a SW update check.
- **"Unregister" link:** remove the SW registration entirely (resets to no SW).

**Lifecycle states visible:** "Installed/waiting" (new SW downloaded, waiting for old one to stop), "Activating", "Activated and is running", "Stopped". If you see "waiting" after a code change, the old SW is still alive in other tabs.

**skipWaiting shortcut:** clicking "skipWaiting" in the panel triggers the SW's "self.skipWaiting()" — activates the new SW immediately without closing all tabs. Useful for development.

**Push testing:** the panel has a "Push" button (with optional payload) to test push notification handling without a real push server. Also buttons for "Sync" (test background sync) and "Periodic Sync".

**Key insight:** "SW is cached, my updates aren't showing" is the most common PWA development frustration. Solution: check "Update on reload" in this panel during development. In production, use "self.skipWaiting() + clients.claim()" in the SW activation event to immediately activate new versions.`,
    },
    {
      id: 1348,
      name: "Storage: Local, Session & IndexedDB",
      desc: `**Web Storage (Local & Session)** — key-value stores accessible via "localStorage" and "sessionStorage". Application tab → Storage section shows all keys and values with the ability to add, edit, and delete entries in real time.

**localStorage vs sessionStorage:**
- "localStorage": persists indefinitely (until cleared by user or code); shared across tabs of the same origin; ~5-10MB limit
- "sessionStorage": persists only for the current browser tab session (cleared on tab close); not shared across tabs; same size limit

**Debugging localStorage:** Application → Local storage → click the origin → key-value table loads. Right-click a row to delete it. Click a value cell to edit inline. Useful for manually resetting auth tokens, feature flags, or cached user preferences during debugging.

**IndexedDB** — a full transactional database in the browser for structured data storage. No size limit (prompt-based beyond ~50MB). Application → IndexedDB → expand the database → expand an object store → see individual records.

**IDB debugging in DevTools:** browse records, see indexes, filter by key range, delete individual records or the entire database. IDB stores are shown as a tree: database name → object store → records. Essential for debugging complex offline-first applications.

**Shared Storage** — new (Chrome 117+) privacy-preserving cross-site storage for use cases like A/B testing and measurement without user-level tracking across sites. Application → Shared Storage shows entries for the current origin.

**Storage Buckets** — partitioned storage buckets (Chrome 122+) allowing origin to organize its storage into named buckets with different eviction policies and storage persistence settings.

**Key insight:** always check localStorage and sessionStorage when debugging "stale data" bugs — old cached responses, auth state mismatches, or feature flag values can persist across deploys if not cleared. The Application tab lets you inspect and manually clear these without writing console code.`,
    },
    {
      id: 1349,
      name: "Cache Storage Inspector",
      desc: `**Cache Storage Inspector** — Application tab → Storage → Cache storage. Displays all caches created by Service Workers via the Cache API, showing cache names, stored request URLs, response headers, and response bodies.

**Cache API structure:** each Service Worker origin can have multiple named caches (e.g., "precache-v1", "runtime-cache", "api-cache"). Inside each cache, entries are keyed by Request object (URL + method + headers) and store a Response object.

**Debugging cache hits:** when a user reports "I'm seeing an old version of the page," check Cache Storage → find the cache containing HTML or JS files → inspect the cached response → check the cached content and the response headers ("Cache-Control", date).

**Cache versioning:** check cache names — "precache-v1" vs "precache-v2" indicates version bumps. Old caches should be deleted on SW activation. If you see multiple versions of the same cache, the cleanup code in the SW "activate" event may not be running.

**Manually deleting cache entries:** right-click a cache entry → Delete. Or right-click the cache name → Delete to clear all entries in that cache. Use this to force a fresh fetch for testing.

**Cache Storage vs HTTP Cache:** Cache Storage is SW-controlled (explicitly populated via "cache.put()"). HTTP Cache ("from disk cache" in Network tab) is browser-managed based on response headers. They're independent — a response can be in both, or either, or neither.

**Cache size quota:** Cache Storage counts toward the origin's storage quota (shown in the Storage usage widget). Large image caches or API response caches can exhaust quota on low-storage devices. Lighthouse "Application Cache" audit flags oversized or inefficient caches.

**Key insight:** Cache Storage is transparent — you can see exactly what your Service Worker has stored, what URLs map to what responses, and whether responses are fresh or stale. This makes PWA caching bugs much easier to diagnose than traditional HTTP cache issues, which are nearly invisible.`,
    },
    {
      id: 1350,
      name: "Cookies Panel & Debugging",
      desc: `**Cookies Panel** — Application tab → Storage → Cookies → click the origin. Lists all cookies for the current origin in a table with columns: Name, Value, Domain, Path, Expires/Max-Age, Size, HttpOnly, Secure, SameSite, Partition Key, Priority.

**Column meanings for security/performance:**
- "HttpOnly" (checkbox): cookie not accessible via "document.cookie" — prevents XSS theft. Always checked for session cookies.
- "Secure" (checkbox): cookie only sent over HTTPS. Essential for any sensitive cookie.
- "SameSite" (Strict/Lax/None): controls cross-site sending. "Strict" never sent cross-site; "Lax" sent on top-level navigation; "None" sent everywhere (requires "Secure"). Important for CSRF defense.
- "Partitioned" (CHIPS): cookie partitioned by top-level site — new privacy-preserving pattern for third-party cookies.

**Debugging cookie issues:**
- Cookie not being sent? Check: correct domain/path, not expired, "Secure" flag requiring HTTPS, "SameSite" blocking cross-site requests
- Auth not persisting? Check: cookie's "Expires" value, whether "HttpOnly" is set (can't read with JS — that's correct), whether the domain matches exactly
- Third-party cookie blocked? Chrome shows a warning icon on blocked cookies — hover to see the reason (e.g., "SameSite=None requires Secure attribute")

**Editing cookies:** double-click a value to edit inline. Right-click → Delete to remove. Use the "+" button to create a new cookie — useful for testing auth flows without a real login.

**Private State Tokens** (formerly Trust Tokens): Application → Private State Tokens — cryptographic anti-fraud mechanism. Interest Groups: FLEDGE/Protected Audiences API for privacy-preserving interest-based advertising (replaces third-party cookies for ads).

**Key insight:** the Cookies panel is where "why isn't my login persisting?" gets answered. The most common cause: missing "SameSite" attribute being defaulted to "Lax" by Chrome, preventing the session cookie from being sent on cross-origin fetch requests from the frontend to the API.`,
    },
    {
      id: 1351,
      name: "Background Services Inspector",
      desc: `**Background Services Panel** — Application tab → Background services section. Provides logging and inspection for background browser APIs: Back/forward cache, Background fetch, Background sync, Bounce tracking mitigations, Notifications, Payment handler, Periodic background sync, Speculative loads, Push messaging, and Reporting API.

**Back/forward cache (bfcache):** Application → Back/forward cache → click "Test back/forward cache" → see if the page is bfcache-eligible. If not, the panel shows the exact reasons (e.g., "Page has an unload event listener," "Document has an open IndexedDB transaction," "Page has cache-control: no-store header"). bfcache allows instant back/forward navigation — pages restored from bfcache load in ~0ms instead of full page load.

**Background fetch log:** each Background Fetch operation (downloading large files in the background) appears in the log with status, progress, and response. Enable "Record" to capture events.

**Background sync log:** Background Sync events (sync tags triggered when connectivity restored) are logged here. Essential for debugging offline-first PWA sync flows.

**Push messaging log:** records push events received by the SW. Shows the payload and whether the notification was shown. Use with the "Push" button in the Service Workers panel to test push handling without a real server.

**Speculative loads:** Application → Speculative loads — shows prerender and prefetch operations triggered by the page (via "rel=speculationrules"). Lets you see which navigations are being speculated and whether prerendering succeeded. Successful prerendering makes next-page navigation instantaneous.

**Notifications log:** shows each notification request (granted/denied) and each displayed notification — useful for debugging notification permission flows and service worker push handling.

**Key insight:** the Background Services panel is the only place to debug bfcache eligibility, which is one of the most impactful and most overlooked performance improvements for multi-page websites. A page eligible for bfcache gets instant back navigation — users experience it as native-app-like. One "unload" event listener disqualifies the entire page.`,
    },
    {
      id: 1352,
      name: "Frames Resource Inspector",
      desc: `**Frames Panel** — Application tab → Frames section. Shows a tree of all frames on the page (top-level frame and iframes), with each frame's loaded resources organized by type: CSS, Fonts, Images, Scripts, SVG, Media, Service Workers, and Web Assembly.

**Resource organization:** under "Frames → top → CSS" you see all stylesheets loaded by the top frame. Under "Fonts" you see every font file loaded (e.g., "UcC73FwrK3iLTeHuS_nV..." for a Google Font). Under "JavaScript" you see all scripts with their URLs.

**Practical uses:**
- **Font audit:** Frames → top → Font lists every font file loaded. If you see 12 font files for a page that only uses 2 fonts, you're over-loading fonts — check for unused font-weight/style variants.
- **Third-party script inventory:** Frames → JavaScript shows every script URL — useful for auditing which third parties are loaded.
- **iframe inspection:** each iframe appears as a child frame with its own resource tree. Essential for debugging cross-origin embed performance.
- **Resource URL verification:** confirm that a CSS file or font is actually loading from the expected CDN URL (not falling back to an origin server).

**CSS resource details:** clicking a CSS file in the Frames panel shows: URL, encoding, MIME type, last modified, content preview. Useful for confirming a stylesheet was served compressed ("Content-Encoding: br").

**Font format verification:** in Frames → Font, click a font file to see its MIME type ("font/woff2" is correct) and size. Multiple "text/css" entries under Fonts often means fonts loaded via CSS @import (slower than direct "rel=preload").

**Key insight:** the Frames panel is the most complete inventory of everything a page loaded. For performance auditing, the Font subtree is particularly valuable — discovering 15 Google Font variants being loaded when only 2 are used (because the font import wasn't pruned) is a common 200-500KB bandwidth finding.`,
    },
  ],
};

export default applicationTab;
