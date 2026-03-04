const patterns = {
  name: "Patterns & Best Practices",
  icon: "✨",
  color: "#ec4899",
  concepts: [
    {
      id: 1219,
      name: "Progressive Enhancement for PWA",
      desc: `**Progressive Enhancement** — the foundational PWA philosophy: build a core experience that works everywhere, then layer on advanced features (service workers, push, installation) for browsers that support them. No user is left with a broken experience.

**Layers of enhancement:**
1. **Base layer:** semantic HTML, works in any browser, any network condition
2. **Enhanced layer:** CSS animations, responsive design — works in modern browsers
3. **PWA layer:** service worker (offline), manifest (installability), push — works where APIs are supported

**Feature detection pattern:** "if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js'); } if ('Notification' in window) { /* show notification opt-in */ } if ('PushManager' in window) { /* enable push subscription */ }"

**Never assume:** don't assume service workers are active; don't assume the app is installed; don't assume the user is online. Always check "navigator.onLine", feature detect APIs, and provide fallbacks.

**Graceful degradation vs. progressive enhancement:**
- Graceful degradation: build for modern browsers, add fallbacks for older
- Progressive enhancement: build for lowest common denominator, enhance upward
PWA is naturally progressive enhancement — the baseline is a working web app; service workers make it better.

**Testing progressive enhancement:** disable JavaScript entirely — does your critical content still appear? Block the service worker — does the app still work (just without offline)?

**Key insight:** Progressive enhancement is why PWAs are superior to native apps for reach. A native app that can't download is nothing. A PWA without service workers is still a web app. Build from the baseline up; every layer of enhancement is additive.`,
    },
    {
      id: 1220,
      name: "Offline-First UX Patterns",
      desc: `**Offline-First UX Patterns** — the user interface patterns that make offline states feel intentional, not broken. The technical capability (service worker caching) must be paired with clear UX to be useful.

**Optimistic UI:** apply user actions to the local state immediately and sync to server in background. The user sees instant feedback; the network delay is invisible. Show a subtle "syncing..." indicator, not a loading spinner that blocks interaction.

**Offline indicator:** a non-intrusive banner when offline: "You're offline — changes will sync when reconnected." Don't block the UI; let users continue working. The indicator disappears automatically when connection returns.

**Conflict notification:** when a sync fails due to a conflict (someone else edited the same record), show a clear comparison: "Your version | Server version | Which do you want to keep?"

**Stale data indicators:** show "Last updated 2 hours ago" timestamps on cached data. Don't silently serve stale data without context — users need to know freshness.

**Offline-capable actions:** clearly indicate what works offline (create a note, view cached items) vs. what requires connectivity (make a payment, upload a photo). Don't let users start a flow offline that can't complete.

**Queued actions feedback:** "1 message waiting to send" — show users what's queued for sync so they trust the app isn't losing their data.

**Key insight:** Offline capability without UX communication is worse than no offline support — users think the app is broken rather than offline-capable. The UX layer is not optional. The best offline UX is invisible: actions complete instantly (optimistic), sync happens silently, users rarely know they were offline.`,
    },
    {
      id: 1221,
      name: "PWA Update Strategy",
      desc: `**PWA Update Strategy** — the approach for delivering new versions of your PWA to users reliably and without disrupting their experience. Unlike native apps (explicit update in App Store), PWA updates happen automatically but require the service worker lifecycle to complete.

**The update UX problem:** new service worker waits for all tabs to close before activating → users on long sessions never see updates → some users run weeks-old versions.

**Strategy 1 — Silent auto-update:** "skipWaiting()" + "clients.claim()" → new SW activates immediately. Works for most sites; risk: mid-session page may have stale JS/CSS cached from old version out of sync with new SW. Mitigate by using content-hashed asset filenames (new deploy = new URLs = no stale asset issue).

**Strategy 2 — User-prompted update:** detect new SW waiting (via "updatefound" event), show toast "Update available — click to reload". User controls timing. Best for apps where mid-session disruption matters (form-heavy flows, multi-step wizards).

**Strategy 3 — Forced update for critical versions:** server sends a "minimum-version" header with API responses; client compares with current version; if behind, force reload to update. Emergency exit for critical security fixes.

**Version tracking:** include app version in the SW file name or as a cache name suffix ("app-cache-v1.4.2"). Log current version to console on startup. Monitor which versions are active in the field.

**Communication:** pair SW update detection with user notification. "workbox-window"s "useRegisterSW" hook in Vue/React makes this trivial.

**Key insight:** The "correct" update strategy depends on your app. A news reader can safely use silent auto-update. A complex multi-step booking flow should use prompted update to avoid losing user state mid-process. Design the strategy per app, not per convention.`,
    },
    {
      id: 1222,
      name: "Security Best Practices for PWAs",
      desc: `**PWA Security Best Practices** — the security considerations specific to PWAs on top of standard web security (HTTPS, CSP, XSS prevention). Service workers introduce new attack surface and security model requirements.

**Service worker attack surface:**
- Malicious SW injection: an XSS vulnerability that injects a malicious service worker can intercept all requests, exfiltrate credentials, and persist indefinitely (even after the XSS is fixed — service workers survive page navigations)
- Mitigation: strict CSP ("script-src 'self'" blocks inline scripts that could register malicious SWs); subresource integrity (SRI) on SW scripts

**Cache poisoning:** if an attacker can influence what gets cached (via a MITM attack before HTTPS upgrade), they could cache malicious responses. HTTPS prevents this for new requests; HSTS ensures upgrade immediately.

**Service worker scope restriction:** serve SW files from the root scope only when needed. A service worker at "/user-uploads/sw.js" would require "Service-Worker-Allowed" to widen scope — the default restriction is a security feature.

**Content Security Policy for PWAs:** CSP must account for service worker registration. "worker-src 'self'" (or include in "script-src") allows service workers to run.

**Sensitive data in caches:** never cache authentication tokens, session cookies, or PII in Cache Storage. Caches are accessible to page JavaScript ("caches.match()") — any XSS attack can exfiltrate cached sensitive data.

**Notification permission abuse:** don't request notification permission to send spam. Users can revoke — and browser-wide "block push from abusive sites" can block your entire domain.

**Key insight:** The #1 PWA-specific security risk is an XSS vulnerability combined with service worker registration — the attacker gets persistent, offline, full-request-interception access. XSS prevention (proper output encoding, CSP) is more critical in PWAs than in traditional web apps. A standard web XSS attack is contained to the session; a PWA XSS that registers a malicious SW persists across sessions.`,
    },
    {
      id: 1223,
      name: "Accessibility in PWAs",
      desc: `**Accessibility in PWAs** — ensuring that the installable, offline, and device-integration features of a PWA work correctly for users with disabilities. The app-like nature of PWAs introduces specific a11y considerations beyond standard web accessibility.

**Focus management:** in SPAs (common PWA architecture), route transitions don't naturally move focus. After navigation, programmatically move focus to the new page heading: "document.querySelector('h1').focus()". Announce page changes to screen readers using "aria-live" regions or the "@announcer" pattern.

**Offline error states:** offline fallback pages and "you're offline" banners must be accessible: use "role=alert" for automatic announcement; "aria-live=polite" for status updates; ensure keyboard access to retry buttons.

**Notification permission prompt:** custom permission prompts (before the browser native dialog) must be keyboard accessible and announced by screen readers. Don't use non-interactive elements as buttons.

**Touch target sizes:** PWA on mobile requires minimum 44x44px touch targets (WCAG 2.5.5). App-like UIs with tight spacing often violate this — prioritize larger tap targets.

**Color contrast:** app-shell UIs with custom brand colors often fail WCAG 4.5:1 contrast ratio. Use the browser's built-in contrast checker (DevTools → Accessibility panel) to audit.

**Testing:** VoiceOver (iOS/macOS), TalkBack (Android), NVDA/JAWS (Windows) — test with real screen readers, not automated tools alone. Axe DevTools extension for automated audit baseline.

**Key insight:** PWA features (install prompt, update notification, offline status) introduce new UI components that are often not accessibility-tested because they're added late in development. Schedule accessibility testing for these components specifically — they're your app's most "native-feeling" moments and must work for all users.`,
    },
    {
      id: 1224,
      name: "Analytics for PWAs",
      desc: `**Analytics for PWAs** — tracking user behavior, installation events, push notification engagement, and offline usage in a Progressive Web App. Standard analytics implementations need PWA-specific extensions to capture the full picture.

**Tracking installation:**
"window.addEventListener('beforeinstallprompt', () => { trackEvent('pwa_installable'); }); installButton.click → deferredPrompt.userChoice → outcome === 'accepted' → trackEvent('pwa_installed');"

Track the funnel: Installable → Prompt shown → Accepted → Opened from home screen.

**Detecting launch source:** add "?utm_source=pwa_homescreen" to "start_url" in the manifest — analytics distinguishes PWA installed sessions from browser sessions. Or detect "window.matchMedia('(display-mode: standalone)').matches".

**Offline analytics:** analytics requests fail when offline. Use Background Sync to queue analytics events and replay them when online. Google Analytics 4 supports offline measurement with its own SW integration.

**Push notification analytics:**
- Notification shown: track in "push" event handler
- Notification clicked: track in "notificationclick" handler (append UTM to notification URL)
- Notification dismissed: use "notificationclose" event

**A2HS rate (Add to Home Screen rate):** the percentage of installable sessions that result in installation. Industry baseline: 1-5% of eligible sessions. Optimize prompt timing and context to improve.

**Real User Monitoring (RUM):** use the "web-vitals" library to send Core Web Vitals to your analytics. Segment by: standalone vs. browser, connection type, device type — PWA installs often have different performance characteristics than browser sessions.

**Key insight:** Without PWA-specific analytics, you're flying blind on what percentage of your users are benefiting from your PWA investments. Track the full installation funnel, push notification engagement, and offline usage separately. These metrics justify (or challenge) continued PWA investment to stakeholders.`,
    },
    {
      id: 1225,
      name: "Cross-Browser PWA Compatibility",
      desc: `**Cross-browser PWA compatibility** — the reality that PWA API support varies significantly across browsers and platforms, requiring careful feature detection, graceful degradation, and platform-specific workarounds.

**Browser PWA support matrix (2026):**

| Feature | Chrome Android | Safari iOS | Firefox Android | Samsung Internet |
|---|---|---|---|---|
| Service Workers | ✓ | ✓ (iOS 11.3+) | ✓ | ✓ |
| Push Notifications | ✓ | ✓ (iOS 16.4+ installed) | ✓ | ✓ |
| Background Sync | ✓ | ✗ | ✗ | ✓ |
| Install Prompt | ✓ | ✗ (manual only) | ✗ | ✓ |
| Web Share | ✓ | ✓ | ✗ | ✓ |
| Badging API | ✓ | ✗ | ✗ | ✓ |
| Web Bluetooth | ✓ | ✗ | ✗ | ✓ |

**Safari-specific considerations:**
- No "beforeinstallprompt" — show manual "Tap Share → Add to Home Screen" instructions for iOS users
- Push requires installation (iOS 16.4+)
- 7-day storage eviction for inactive PWAs (ITP)
- No Background Sync or Periodic Background Sync

**Firefox:** service workers supported; no install prompt; no push on desktop (mobile: works).

**Testing strategy:** test on physical devices, not just simulators. The most important combination: Chrome on Android + Safari on iPhone (these cover 95% of mobile market).

**Key insight:** Design your core PWA features against the lowest common denominator (Chrome + Safari support). Treat Background Sync, push on iOS, and install prompt as progressive enhancements — gracefully degraded for unsupported browsers. Never gate critical app functionality on PWA-only APIs.`,
    },
    {
      id: 1226,
      name: "PWA for E-commerce",
      desc: `**PWA for E-commerce** — the application of PWA techniques specifically for retail and marketplace web apps, where performance directly impacts revenue. A 100ms improvement in load time → 1% increase in conversion rate (Google/Deloitte data).

**Critical e-commerce PWA optimizations:**

**Product listing pages:** stale-while-revalidate for product catalog (instant cache + background refresh); virtual scrolling for infinite product grids; pre-cache next page of products.

**Product detail pages:** preload high-priority product images; server-side render (SSR) for SEO and LCP; critical CSS inline; progressive image enhancement (low-quality placeholder → full image).

**Checkout:** network-only for all checkout API calls (never cache prices, inventory, payment — always fresh); Background Sync for abandoned cart recovery messages.

**Shopping cart:** IndexedDB for guest cart persistence (survives browser close, persists across pages); optimistic add-to-cart (instant UI response, background sync to server).

**Offline catalog:** pre-cache browsed products for offline viewing (runtime caching with reasonable TTL); show "You browsed this offline" for cached products with staleness indicator.

**Push notifications:** order status updates (confirmed, shipped, out for delivery, delivered) — highest-value push use case in e-commerce (directly relevant, time-sensitive, personal).

**Performance data (real examples):** AliExpress PWA: 82% increase in conversion for new users; 74% increase in time-on-site. Flipkart Lite: 70% increase in conversions from home screen. The performance → revenue correlation in e-commerce is the clearest business case for PWA investment.

**Key insight:** E-commerce is where PWA ROI is most clearly measurable. Every 100ms of load time removed = measurable revenue increase. Lighthouse score improvements translate directly to A/B test conversion wins. Use this to justify PWA investment to business stakeholders: it's not a tech initiative, it's a revenue initiative.`,
    },
  ],
};

export default patterns;
