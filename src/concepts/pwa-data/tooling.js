const tooling = {
  name: "Tooling & Ecosystem",
  icon: "🛠️",
  color: "#ef4444",
  concepts: [
    {
      id: 1213,
      name: "Vite PWA Plugin (vite-plugin-pwa)",
      desc: `**vite-plugin-pwa** — the standard Vite integration for PWA features: automatic service worker generation (via Workbox), manifest injection, and offline support. The recommended approach for adding PWA capabilities to Vite-based apps (Vue, React, Svelte, etc.).

**Setup:**
"import { VitePWA } from 'vite-plugin-pwa'; plugins: [VitePWA({ registerType: 'autoUpdate', workbox: { globPatterns: ['**/*.{js,css,html,ico,png,svg}'] }, manifest: { name: 'My App', short_name: 'MyApp', theme_color: '#ffffff', icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }] } })]"

**Register types:**
- "autoUpdate": new SW activates automatically (calls skipWaiting + clients.claim); good for simple apps
- "prompt": shows custom UI to prompt user before updating; "useRegisterSW" composable handles update state
- "autoUpdateWithPrompt": custom strategy option

**generateSW vs. injectManifest:**
- "generateSW" (default): fully auto-generated SW; Workbox handles everything
- "injectManifest": bring your own SW file; plugin injects the precache manifest into it; full control

**Dev mode:** "devOptions: { enabled: true }" enables service worker in development (uses different strategy to avoid caching issues). Useful for testing PWA features without production builds.

**Offline strategies:** configure per-route via "workbox.runtimeCaching": array of { urlPattern, handler, options } objects mapping to Workbox strategies.

**Key insight:** vite-plugin-pwa is the Vite equivalent of what create-react-app's built-in PWA template does — but better maintained and more configurable. For new Vite projects, this is the starting point for any PWA work. "injectManifest" mode is essential when you need custom background sync or push handling beyond what "generateSW" provides.`,
    },
    {
      id: 1214,
      name: "PWABuilder",
      desc: `**PWABuilder** — Microsoft's free, open-source tool at "pwabuilder.com" that analyzes a PWA URL and generates platform-specific packages: Android APK (TWA), iOS IPA, and Windows MSIX — enabling Play Store, App Store, and Microsoft Store distribution without native coding.

**Workflow:**
1. Enter your PWA URL
2. PWABuilder audits: manifest, service worker, HTTPS, installability
3. Fix reported issues (missing icons, manifest fields)
4. Download platform packages: Android (TWA APK + AAB), iOS (PWA wrapper IPA), Windows (MSIX)

**Android package:** generates a Trusted Web Activity (TWA) that passes the Digital Asset Links verification — your PWA runs full-screen in Chrome with no browser UI. Ready to submit to Google Play.

**iOS package:** wraps your PWA in a WKWebView-based iOS app; cannot fully utilize the Web Push API. iOS limitations apply. Requires Apple Developer account ($99/year) to sign and distribute.

**Windows MSIX:** packages your PWA for the Microsoft Store using Windows' native PWA support.

**PWABuilder Studio (VS Code extension):** integrates PWA development tools directly in VS Code: manifest editor, service worker templates, icon generator, Lighthouse audit runner.

**Icon generation:** upload a single high-res (512x512+) icon; PWABuilder generates all required sizes for all platforms.

**Key insight:** PWABuilder eliminates the native development barrier for Play Store distribution. Going from "PWA on the web" to "Android app in Play Store" takes about 30 minutes using PWABuilder + a free Google Play developer account. For iOS and Windows, the story is more complex, but PWABuilder still automates most of the packaging work.`,
    },
    {
      id: 1215,
      name: "Web App Manifest Generators",
      desc: `**Manifest generators & validators** — tools that help create, validate, and audit Web App Manifests without writing JSON manually. Essential for ensuring all required fields are present and icons meet all size requirements.

**Tools:**
- **PWABuilder.com:** full manifest editor with real-time preview; icon generator; platform-specific requirement checker
- **Simicart PWA Manifest Generator:** simple form → valid JSON manifest
- **pwa-asset-generator (npm):** "npx pwa-asset-generator source.png output/" — generates all icon sizes, maskable icons, and iOS splash screens from a single source image. Also injects "link" tags into HTML and "icons" into manifest.
- **Maskable.app:** interactive editor for designing maskable icons — shows how your icon looks in all adaptive icon shapes (circle, squircle, etc.) before you ship

**Required icon sizes for Chrome installability:**
- 192x192 PNG: required for install (minimum)
- 512x512 PNG: required for splash screen and store listing

**Maskable icon requirements:**
- Add "purpose": "any maskable" (or separate "any" and "maskable" entries)
- Safe zone: keep key visual content within center 80% of the icon; edges can be cropped by adaptive shapes

**Validation:** "link rel=manifest" → Chrome DevTools → Application → Manifest — shows parsed manifest, installability status, and detected issues.

**Key insight:** "pwa-asset-generator" is the one-command solution for icons. Feed it a 1024x1024 SVG or PNG and it generates every required size for Android, iOS, and desktop, plus all iOS splash screen sizes. Eliminates hours of manual image resizing that is otherwise a tedious, error-prone process.`,
    },
    {
      id: 1216,
      name: "Service Worker Testing",
      desc: `**Service Worker Testing** — the strategies and tools for testing service worker behavior, caching strategies, offline functionality, and update flows. Service workers are notoriously difficult to test due to their lifecycle and separate execution context.

**Manual testing in DevTools:**
- Application → Service Workers → "Update on reload" (forces new SW on every refresh)
- Application → Service Workers → "Bypass for network" (disables SW for comparing cached vs live)
- Network tab → "Offline" preset (simulate no connectivity)
- Application → Cache Storage (inspect what's cached)

**Unit testing service workers:** Jest + "jest-environment-jsdom" doesn't support service worker APIs. Use:
- **@jest-worker / custom environments:** mock "self", "caches", "fetch" in Jest
- **"workbox-core/testing" utilities:** mock SW globals provided by Workbox team

**Integration testing with Puppeteer/Playwright:**
"await page.setOfflineMode(true); await page.goto('/'); // verify offline page renders"

**Workbox testing:** Workbox's documentation includes testing strategies for each module. Use "workbox-precaching/testing" for precache manifest testing.

**Cypress offline testing:** Cypress has a "cy.intercept()" API that can stub all network requests — simulating offline by returning network errors from all intercepts.

**Service worker update testing:** reset the SW state before tests with DevTools "Unregister" or programmatically via "registration.unregister()".

**Key insight:** The most practical service worker testing strategy is: unit tests for pure functions (cache key logic, response building); integration tests (Playwright + "setOfflineMode") for critical offline flows (show offline page, form submission queued). Full SW lifecycle testing in automated tests is complex enough that most teams rely on manual DevTools testing for the lifecycle edge cases.`,
    },
    {
      id: 1217,
      name: "Web Vitals Library",
      desc: `**web-vitals library** — Google's official JavaScript library for measuring Core Web Vitals (LCP, INP, CLS, TTFB, FCP) in real-user browsers. Essential for gathering field performance data beyond what Lighthouse/PageSpeed Insights shows.

**Installation:** "npm install web-vitals"

**Usage:**
"import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals'; onLCP(({ name, value, rating }) => sendToAnalytics({ name, value, rating }));"

Each callback receives: metric name, value (ms or unitless), "rating" ('good'/'needs-improvement'/'poor'), attribution data (which element caused the metric).

**Attribution (v3+):** "onLCP(metric => { console.log(metric.attribution.lcpEntry.element); /* the LCP element */ });" — attribution tells you exactly what caused each metric.

**Sending to analytics:**
"function sendToAnalytics({ name, value, rating }) { navigator.sendBeacon('/analytics', JSON.stringify({ name, value, rating, url: location.href })); }"

**"navigator.sendBeacon()":** async, non-blocking HTTP POST; guaranteed to fire even when page is unloading. The right way to send analytics on page exit without delaying navigation.

**TTFB measurement:** TTFB from web-vitals is the navigation TTFB — time from navigation start to first byte of document response. More accurate than server-side TTFB logs (includes DNS + connection time).

**Key insight:** Lighthouse measures lab performance (simulated, empty browser profile, throttled network). Real users have extensions, slower CPUs, and diverse connections — field data from web-vitals is often 50-100% worse than Lighthouse. Ship the web-vitals library and collect real user data; optimize based on field percentiles (p75), not lab scores.`,
    },
    {
      id: 1218,
      name: "Lighthouse CI",
      desc: `**Lighthouse CI (LHCI)** — an open-source tool by Google that runs Lighthouse audits in CI/CD pipelines and fails builds when performance scores or PWA criteria drop below defined thresholds. Prevents performance regressions from reaching production.

**Setup in GitHub Actions:**
"- uses: treosh/lighthouse-ci-action@v9 with: urls: | https://staging.example.com budgetPath: ./budget.json uploadArtifacts: true"

**Budget configuration (budget.json):**
"[{ 'path': '/*', 'timings': [{ 'metric': 'interactive', 'budget': 5000 }], 'resourceSizes': [{ 'resourceType': 'script', 'budget': 150 }] }]"

**Assertion configuration (lighthouserc.js):**
"ci: { assert: { assertions: { 'categories:performance': ['error', { minScore: 0.9 }], 'categories:pwa': ['error', { minScore: 1 }], 'first-contentful-paint': ['warn', { maxNumericValue: 2000 }] } } }"

**LHCI server:** deploy a self-hosted LHCI server to store results and compare across PRs — shows performance trend over time.

**Pull request comments:** LHCI can post performance score changes as PR comments, making it easy to see if a PR improves or degrades performance.

**Multiple pages:** test multiple critical paths (homepage, product page, checkout) not just the root URL.

**Key insight:** Lighthouse CI is the performance safety net for shipping. Without it, a developer will add one dependency, increase bundle size by 200KB, and performance will silently degrade. With LHCI, that PR fails immediately with a clear score drop. Treat performance like correctness — it must not regress without a deliberate decision.`,
    },
  ],
};

export default tooling;
