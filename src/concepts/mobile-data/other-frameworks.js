const otherFrameworks = {
  name: "Other Cross-Platform Frameworks",
  icon: "🔧",
  color: "#8b5cf6",
  concepts: [
    {
      id: 334,
      name: "Ionic & Capacitor",
      desc: `**Ionic** — a UI component library for building mobile apps with web technologies (HTML, CSS, JavaScript/TypeScript). **Capacitor** is Ionic's modern native runtime that wraps web apps in a native shell and provides access to native APIs.

**The Ionic/Capacitor model:** You build a standard web app (with any framework — React, Vue, Angular, or plain JS). Capacitor wraps it in a native iOS/Android shell with a WebView. Capacitor's plugin system gives the web app access to native APIs (camera, filesystem, push notifications) via JavaScript bridge.

**Ionic components:** Pre-built, platform-adaptive UI components (ion-button, ion-input, ion-tabs, ion-modal) that automatically adopt iOS or Android visual styles based on the platform. Covers the majority of a typical app's UI needs.

**Capacitor vs Cordova:** Capacitor is the modern successor to Cordova. Key differences: full native project control (you can modify iOS/Android projects), web-first (no device required for development), live reload on device, and a better plugin API. Cordova's plugin ecosystem (thousands of plugins) is largely compatible via a compatibility adapter.

**When Ionic/Capacitor makes sense:** Existing web teams building a mobile app, apps where web tech (progressive enhancement, SEO) matters, or apps that are primarily content-display with occasional native API access. Web tech limitations still apply — no native thread execution, limited background tasks, WebView rendering performance ceiling.

**Key insight:** Ionic's real superpower in 2025 is Progressive Web App (PWA) parity. The same codebase ships as an iOS app, Android app, and PWA. For internal enterprise tools and content-heavy apps, this "one code, three platforms" approach (including the web) is compelling.`,
    },
    {
      id: 335,
      name: "Kotlin Multiplatform Mobile (KMM)",
      desc: `**Kotlin Multiplatform Mobile (KMM)** — JetBrains' approach to code sharing that shares only the business logic layer across iOS and Android (in Kotlin), while keeping native UI on each platform. Now branded as **Kotlin Multiplatform (KMP)** with broader platform support.

**KMM's philosophy:** Unlike React Native and Flutter which share UI, KMM shares only the data layer, domain layer, and business logic. iOS keeps SwiftUI; Android keeps Jetpack Compose. The "compromise" is deliberate — native UI means 100% platform-idiomatic experience.

**The shared code scope:** Network calls, data models, JSON parsing, local database logic (via SQLDelight), business rules, and utilities are written once in Kotlin. iOS consumes these as a compiled framework (via Kotlin/Native); Android consumes them as standard Kotlin code.

**SQLDelight:** The recommended database for KMM. Write SQL queries in .sq files; SQLDelight generates type-safe Kotlin code for both Android (SQLite) and iOS (SQLite via native driver). The same queries run on both platforms.

**ktor:** The recommended HTTP client for KMM — works on both Android and iOS from shared Kotlin code. Coroutines-based async, plugin architecture for serialization, logging, and auth.

**Adoption:** Adopted by major companies (Netflix, Touchlab clients) as a lower-risk alternative to full cross-platform — teams keep their native expertise while reducing duplicate business logic. JetBrains reports strong growth in enterprise adoption.

**Key insight:** KMM is the right choice when your team has strong native iOS/Android expertise and isn't willing to compromise on native UI quality. You get 40-60% code sharing (the business logic layer) without the "but it doesn't feel native" criticism.`,
    },
    {
      id: 336,
      name: ".NET MAUI & Xamarin",
      desc: `**.NET MAUI (Multi-platform App UI)** — Microsoft's cross-platform framework that replaced Xamarin.Forms. Write C# and XAML once; run on iOS, Android, macOS, and Windows. The successor to Xamarin in the .NET 6+ ecosystem.

**Xamarin vs MAUI:** Xamarin was Microsoft's original cross-platform approach (acquired from Xamarin Inc.). Xamarin.Forms added a shared UI layer. MAUI is the complete rewrite — unified project structure, single target framework, Blazor Hybrid support, and modern .NET tooling throughout.

**MAUI architecture:** Similar to React Native's model — XAML defines UI components that map to native controls on each platform. Handlers replace Xamarin's renderer pattern, making it easier to customize native control behavior.

**Blazor Hybrid:** MAUI's unique feature — embed Blazor (C# web UI framework) components inside a native MAUI shell. Reuse web components on mobile without a full WebView app, and share code between ASP.NET web and MAUI mobile apps.

**The .NET ecosystem advantage:** Full access to the .NET ecosystem — NuGet packages, Entity Framework, LINQ, SignalR, Azure SDKs, and Microsoft enterprise tooling. For teams already invested in the C# / .NET stack, MAUI eliminates the JavaScript/Dart learning curve.

**Who should use MAUI:** Enterprise teams with existing .NET expertise building line-of-business apps targeting iOS, Android, and Windows (the Windows target is a significant differentiator over React Native and Flutter). Not the first choice for consumer apps targeting primarily mobile.

**Key insight:** MAUI's strongest selling point is Windows desktop support combined with iOS/Android in one project — targeting enterprise scenarios where employees use both corporate Windows desktops and mobile devices.`,
    },
    {
      id: 337,
      name: "NativeScript",
      desc: `**NativeScript** — an open-source framework for building native iOS and Android apps using JavaScript/TypeScript or Angular/Vue, where JS code calls native APIs directly without a WebView layer.

**How NativeScript differs from Ionic:** Ionic renders in a WebView (web HTML/CSS). NativeScript maps JavaScript UI components directly to native UI controls via a JS-to-native runtime bridge. There's no WebView — native performance, native feel.

**NativeScript vs React Native:** Similar concept, different ecosystem. RN uses React and a JS bridge (being replaced by JSI). NativeScript uses its own metadata-based reflection system that exposes 100% of the platform's native APIs to JavaScript — no plugin wrapping needed.

**The 100% API access claim:** NativeScript's runtime uses platform metadata to expose every native class and method to JavaScript directly. In theory, any iOS or Android API is accessible from JS without writing a native module — just call it directly from JavaScript.

**Market position:** NativeScript has a smaller ecosystem and community than React Native and Flutter. It sees adoption in Angular and Vue communities where developers want native mobile without adopting React or Dart.

**When to consider NativeScript:** Teams with strong TypeScript/Angular expertise who want native mobile performance without learning React (for RN) or Dart (for Flutter). Also useful when needing rapid access to obscure native APIs without writing native modules.

**Key insight:** NativeScript's full native API access is genuinely distinctive — you can call newly released iOS/Android APIs from JavaScript before any plugin wraps them. This is valuable for apps targeting cutting-edge platform features.`,
    },
    {
      id: 338,
      name: "Progressive Web Apps (PWA)",
      desc: `**Progressive Web App (PWA)** — a web application that uses modern browser APIs to provide app-like experiences: offline functionality (via Service Workers), installability (Add to Home Screen), push notifications, and access to some device APIs.

**The four PWA capabilities:**
- **Service Worker:** JavaScript proxy between the browser and network. Caches assets and API responses for offline use. Enables background sync and push notifications
- **Web App Manifest:** JSON file declaring the app's name, icons, start URL, and display mode (standalone hides the browser UI)
- **HTTPS:** Required for service workers and many device APIs
- **Responsive design:** Works across screen sizes

**PWA vs native app trade-offs:**
- **Pros:** No app store submission, instant updates (serve new code, users get it immediately), single URL for web + mobile, no install friction
- **Cons:** No App Store discoverability, limited background execution, no access to Bluetooth LE, NFC, or many sensor APIs, Push notification permission rates lower than native, weaker iOS support (Apple restricts PWA capabilities)

**iOS PWA limitations:** Apple has historically limited PWA capabilities on iOS — no push notifications until iOS 16.4, no share sheet, limited background sync. These restrictions are primarily competitive, not technical.

**When PWA is the right answer:** Content-driven apps (news, blogs, e-commerce), internal enterprise tools, apps targeting markets with limited storage (PWAs are tiny compared to native installs), or projects needing a mobile presence without native app investment.

**Key insight:** PWAs are often the right MVP choice — iterate on the web, measure demand, and build a native app only when PWA limitations actually matter to your users. Many "need a mobile app" requirements can be satisfied with a high-quality PWA.`,
    },
    {
      id: 339,
      name: "Choosing the Right Framework",
      desc: `**Framework selection** is a strategic decision, not a technical one. The "best" framework is the one that matches your team's skills, your app's requirements, and your organization's long-term maintenance capacity.

**Decision framework:**

**Choose React Native when:**
- Your team has strong React/JS/TS expertise
- You're already using Expo/EAS for rapid iteration
- You want the largest community and plugin ecosystem for cross-platform
- Web compatibility (React Native Web) is a requirement
- You're building a consumer app needing deep platform integration

**Choose Flutter when:**
- You want pixel-perfect UI consistency across platforms
- Your team is open to learning Dart (low barrier from Java/Kotlin/C#)
- You need web + desktop + mobile from one codebase
- High-performance animations are central to the product
- You want the best hot reload developer experience

**Choose KMM when:**
- Strong native iOS/Android teams exist and won't be combined
- Native UI quality is non-negotiable
- You want to reduce business logic duplication without changing UI teams
- C# / Kotlin expertise is the team's core competency

**Choose Ionic/PWA when:**
- The team is web-first (no native expertise)
- The app is content-heavy with minimal native API needs
- Budget constraints make two native codebases impossible
- PWA (no app store) is acceptable

**Key insight:** Benchmark your specific use cases, not synthetic demos. Test the framework on your actual UI complexity, data volumes, and animation requirements before committing. "Works great for Twitter" doesn't mean it works for your AR try-on feature.`,
    },
    {
      id: 340,
      name: "Capacitor Plugins",
      desc: `**Capacitor Plugins** — the bridge between the web code in an Ionic/Capacitor app and native platform APIs. Plugins are TypeScript/JavaScript APIs that have platform implementations in Swift (iOS) and Kotlin (Android).

**Official Capacitor plugins (@capacitor/*):** The Capacitor team maintains a curated set of core plugins for the most common native APIs: Camera, Filesystem, Geolocation, Haptics, Keyboard, Motion, Network, Preferences (key-value storage), Push Notifications, Share, Splash Screen, Status Bar, and more.

**Community plugins:** The Capacitor community maintains additional plugins through @capacitor-community. Coverage is broad but quality varies — check maintenance status and issue tracker before adopting.

**Writing custom plugins:** When existing plugins don't cover a native SDK, write a custom plugin. The plugin project structure is a standard iOS Swift Package / Android Gradle module with a generated TypeScript interface. Capacitor's CLI scaffolds the project.

**Cordova plugin compatibility:** Many Cordova plugins work in Capacitor via @capacitor/cordova-plugin-compat. This gives Capacitor access to Cordova's ecosystem of thousands of plugins while transitioning from Cordova to Capacitor.

**Plugin versioning:** Capacitor 5 and 6 have different plugin APIs. Pin plugin versions that match your Capacitor major version to avoid breaking changes. Major Capacitor version upgrades require updating all plugins.

**Key insight:** The quality of your Ionic/Capacitor app is bounded by the quality of its plugins. Evaluate plugins' iOS and Android implementations separately — a plugin might have excellent Android code and buggy iOS code, or vice versa.`,
    },
    {
      id: 341,
      name: "Tauri Mobile",
      desc: `**Tauri** — a framework for building desktop and mobile apps using web technologies for the UI (HTML/CSS/JavaScript) and Rust for the backend/native layer. Tauri 2.0 added iOS and Android targets, making it a cross-platform option for teams with Rust expertise.

**Tauri vs Electron:** Electron bundles Chromium and Node.js (large binary, high memory). Tauri uses the platform's native WebView (WKWebView on macOS/iOS, WebView2 on Windows, WebKitGTK on Linux) — resulting in much smaller binary sizes (often under 10MB vs 150MB+ for Electron) and lower memory usage.

**Tauri mobile model:** On mobile, Tauri renders the app in a WebView (like Capacitor/Ionic). The Rust backend communicates with the WebView via a message-passing API, and can call native APIs via Rust plugins.

**When Tauri mobile makes sense:** Teams already using Tauri for desktop who want to extend to mobile. Apps where the Rust backend provides significant business logic that would otherwise need to be duplicated for mobile. Security-conscious apps (Rust's memory safety + minimal attack surface).

**Limitations:** Smaller community than React Native/Flutter for mobile specifically. WebView rendering limitations apply (same as Ionic/Capacitor). Rust expertise required for native plugins and backend code — a high skill bar.

**Key insight:** Tauri's primary strength remains desktop (where it genuinely beats Electron). Its mobile story is compelling for existing Tauri desktop apps that want mobile companions, but it's not a primary recommendation for teams starting mobile-first.`,
    },
  ],
};

export default otherFrameworks;
