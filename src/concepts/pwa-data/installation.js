const installation = {
  name: "Installation & App Experience",
  icon: "📱",
  color: "#10b981",
  concepts: [
    {
      id: 1181,
      name: "beforeinstallprompt Event",
      desc: `**beforeinstallprompt event** — a browser event fired on Chrome/Edge (Android and desktop) when the PWA meets installability criteria and the browser is ready to show an install prompt. Capturing this event lets you defer and control when the install prompt appears.

**Pattern:**
"let deferredPrompt; window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; showInstallButton(); });"

"e.preventDefault()" suppresses the default browser prompt (the mini-infobar on Android). Storing "deferredPrompt" lets you trigger the native install dialog on your own terms.

**Triggering the prompt:**
"installButton.addEventListener('click', async () => { deferredPrompt.prompt(); const { outcome } = await deferredPrompt.userChoice; if (outcome === 'accepted') trackInstall(); deferredPrompt = null; });"

**Mini-infobar (Android):** even after "preventDefault()", Chrome shows a subtle bottom mini-infobar after some time. This is separate from your custom prompt — consider it a fallback.

**Desktop install:** "beforeinstallprompt" also fires on desktop Chrome/Edge. Desktop installs appear in the OS application launcher / taskbar. The install button should appear in your app's header/menu on desktop.

**Key insight:** Show the install prompt at the moment of demonstrated value — after a user completes a purchase, creates their first item, or returns for a second visit. Show it on page 1 and users dismiss it; show it after value delivery and acceptance rates jump 3-4x. Instagram shows the prompt only to users who've visited 5+ times.`,
    },
    {
      id: 1182,
      name: "App Installation Flow",
      desc: `**App installation flow** — the full user journey from first web visit to having the PWA on their home screen. Optimizing each step increases install rate, which drives retention (installed users have 3x higher retention than non-installed web users).

**Installation channels:**
- "beforeinstallprompt" → custom install button (best UX, highest control)
- Browser address bar install icon (Chrome desktop: install icon in omnibar when installable)
- Browser menu → "Add to Home Screen" (fallback for all browsers)
- App Store distribution (iOS: App Store wrapping a PWA via PWABuilder; Android: TWA — Trusted Web Activity)

**Install rate optimization:**
1. Meet all installability criteria (HTTPS, manifest, SW with fetch handler)
2. Use appropriate timing (not on first page view)
3. Explain the benefit ("Works offline, no storage to install, faster launch")
4. Provide clear instructions for browsers without "beforeinstallprompt" (iOS, Firefox)

**iOS instructions:** since iOS has no install prompt API, display instructions UI: "Tap the Share button → Add to Home Screen" with a screenshot walkthrough. Show this for iOS Safari detected via "navigator.userAgent".

**Post-install experience:** detect when running as installed app ("display-mode: standalone" media query) and customize UX — hide browser-specific UI, show native-like back navigation, add OS-level shortcuts.

**Key insight:** Installation rate is a vanity metric if retention doesn't follow. Focus on getting the right users to install (engaged users who will use the app regularly), not maximizing install count. A 5% install rate among highly engaged users is worth more than 20% from casual visitors.`,
    },
    {
      id: 1183,
      name: "Splash Screen",
      desc: `**Splash Screen** — the full-screen loading screen shown while a PWA is launching from the home screen, before the first paint. On Android, Chrome auto-generates a splash screen from the Web App Manifest fields: background_color, theme_color, name, and the largest icon.

**Android splash screen generation (Chrome):**
- Background: "background_color" from manifest
- Icon: largest icon in the "icons" array (typically 512x512)
- App name: "name" from manifest
- No code required — just a well-configured manifest

**iOS splash screen ("apple-touch-startup-image"):** iOS does not auto-generate splash screens for PWAs. You must define them explicitly with "link" tags for every device size and orientation:
"link rel=apple-touch-startup-image media=(device-width: 390px) href=/splash-390x844.png"
This requires dozens of image variants for all iPhone/iPad sizes — a maintenance burden. Libraries like "pwa-asset-generator" automate generation.

**What makes a good splash screen:**
- Fast: should display for < 1 second before the app shell appears
- Branded: matches app icon and color scheme
- No loading spinner: if the app loads fast enough (< 300ms from cache), users barely see it

**Adaptive icons (Android):** use "purpose": "maskable" in your icon declaration. Maskable icons are designed to fill the adaptive icon shape (circle, squircle, teardrop — varies by device). Without maskable icons, your icon will have a white background box in adaptive shapes.

**Key insight:** The splash screen is the first impression of your "native" PWA. A blank white flash while your app loads undermines the native illusion. Set a matching "background_color", use a well-prepared maskable icon, and optimize Time to First Paint so users barely see it.`,
    },
    {
      id: 1184,
      name: "Display Modes",
      desc: `**PWA Display Modes** — the "display" field in the Web App Manifest controls how much browser UI surrounds your app when running as an installed PWA. Choosing the right mode shapes whether your app feels web-native or truly native.

**Display mode options:**
- "browser": runs in full browser UI (tabs, address bar, navigation). Effectively not installed-looking.
- "minimal-ui": shows minimal browser controls (back/forward, reload, address). Some browser UI remains.
- "standalone": no browser chrome — just your app content + device status bar. The default choice for most PWAs. Looks exactly like a native app.
- "fullscreen": covers the entire screen including status bar. For games and immersive experiences.
- "window-controls-overlay": desktop-only; title bar integrates with your app UI; CSS variables expose title bar geometry.

**Detecting current display mode in JS:**
"window.matchMedia('(display-mode: standalone)').matches" — true when running as installed PWA in standalone mode.

**In CSS:**
"@media (display-mode: standalone) { .install-banner { display: none; } }" — hide install prompts when already running as installed app.

**Fallback chain:** if the specified mode isn't supported, browser falls back: fullscreen → standalone → minimal-ui → browser.

**"display_override":** newer manifest field that specifies an ordered list of preferred modes: "display_override": ["window-controls-overlay", "standalone"] — tries WCO first, falls back to standalone.

**Key insight:** "standalone" is the right choice for almost all PWAs. It's what creates the "is this a native app?" illusion. "Fullscreen" is only appropriate for games; "minimal-ui" is rarely the right choice — it's the worst of both worlds (some browser UI but not the full browser).`,
    },
    {
      id: 1185,
      name: "App Shortcuts",
      desc: `**App Shortcuts** — a Web App Manifest feature that defines quick-action menu items shown when the user long-presses (Android) or right-clicks (desktop) the app icon. Shortcuts provide direct navigation to key sections of the app without opening the home page first.

**Manifest configuration:**
"shortcuts": [ { "name": "New Message", "short_name": "Message", "url": "/compose?source=shortcut", "icons": [{ "src": "/icons/compose-96.png", "sizes": "96x96" }] }, { "name": "My Orders", "url": "/orders" } ]

**Properties:**
- "name": full label shown in the context menu
- "short_name": abbreviated label if space is tight
- "url": destination URL (within the app scope)
- "icons": shortcut-specific icon (monochrome icons for some platforms)
- Maximum 4 shortcuts (Chrome enforces this limit)

**Platform behavior:**
- Android: long-press app icon → shows shortcuts in a card above the icon
- Windows: right-click taskbar icon → shows shortcuts as jump list items
- iOS: 3D Touch/Haptic Touch → not yet supported for web apps

**Use cases:** "New message", "Open camera", "Go to inbox", "My account", "Today's orders" — common quick actions that bypass the home page.

**Key insight:** Shortcuts are the detail that turns a good PWA into a great one. Power users who long-press expecting native-app shortcuts will be delighted if you have them configured. It takes 10 minutes to add to the manifest but signals attention to platform craft.`,
    },
    {
      id: 1186,
      name: "Share Target API",
      desc: `**Web Share Target API** — allows an installed PWA to register as a share destination in the OS native share sheet. When the user shares a URL, image, or text from another app, your PWA appears as a recipient alongside native apps like email, messages, and social apps.

**Manifest registration:**
"share_target": { "action": "/share", "method": "GET", "params": { "title": "title", "text": "text", "url": "url" } }

For files: "method": "POST", "enctype": "multipart/form-data", "params": { "files": [{ "name": "file", "accept": ["image/*"] }] }

**How it works:** when user shares something, OS shows your PWA in the share sheet. User selects your app → browser navigates to "action" URL with the shared data as query params (GET) or form data (POST).

**Handler in your app:** read "new URL(location.href).searchParams.get('url')" for shared URLs; read "FormData" from a POST request for files.

**Android support:** works on Chrome for Android when PWA is installed. Desktop Chrome (Windows) support added later. iOS: not yet supported.

**Use cases:** share a URL to bookmark it in your app, share a photo to post it, share text to add as a note — any workflow that starts with content in another app.

**Key insight:** Share Target transforms your PWA from "destination you navigate to" into "destination you share to" — it's part of the OS sharing ecosystem instead of outside it. For apps where users receive and process external content (bookmarking, social posting, file management), Share Target is a high-value feature that native apps have always had and the web rarely matches.`,
    },
    {
      id: 1187,
      name: "Trusted Web Activity (TWA)",
      desc: `**Trusted Web Activity (TWA)** — an Android mechanism for distributing a PWA through the Google Play Store, packaged as an Android app that renders the PWA using the device's Chrome browser in a special frameless mode. The "app" is essentially a shell that opens your PWA URL at full screen.

**How TWA works:** a small Android APK (< 1MB) registers a trust relationship with your domain (via Digital Asset Links — "assetlinks.json" file on your server). Chrome verifies the relationship and renders your site without browser chrome — indistinguishable from a native app.

**Why TWA:**
- Play Store distribution: reach users who browse Play Store, not just web
- Play billing: accept payments through Google Play billing (required for some app categories)
- Android-specific features: background geolocation, more hardware APIs
- Discoverability: Play Store search and recommendations

**Digital Asset Links:** "/.well-known/assetlinks.json" associates your domain with your Android app's signing key. Without this, Chrome adds an address bar overlay to verify the user is on the correct site.

**PWABuilder:** Microsoft's free tool at "pwabuilder.com" generates the TWA APK (and iOS IPA wrapper) from your PWA URL with no Android coding required.

**Limitations:** TWA requires Chrome on the user's device (Chrome is the browser engine); the app version is always the live website (no separate version from the Play Store).

**Key insight:** TWA closes the last gap between PWA and native in the Play Store distribution channel. For apps already built as PWAs, TWA is the zero-overhead path to Play Store presence — same code, same infrastructure, just a tiny APK that registers trust with your domain.`,
    },
  ],
};

export default installation;
