const foundations = {
  name: "Foundations & Core Concepts",
  icon: "📱",
  color: "#6366f1",
  concepts: [
    {
      id: 296,
      name: "Native vs Hybrid vs Cross-Platform",
      desc: `**Native development** builds apps specifically for one platform using its official SDK (Swift/Obj-C for iOS, Kotlin/Java for Android). **Hybrid** wraps web content in a WebView. **Cross-platform** compiles or bridges to native components from a shared codebase.

**The spectrum of trade-offs:**
- **Native:** Best performance, full platform API access, platform-idiomatic UX — but double the codebase, teams, and release cycles
- **Hybrid (Ionic/Cordova):** Write once in HTML/CSS/JS, max code reuse — but WebView performance ceiling, non-native feel, limited access to cutting-edge APIs
- **Cross-platform (React Native, Flutter):** Near-native performance, shared business logic, native UI components — the sweet spot for most teams

**When to go native:** Games, AR/VR, high-performance graphics, apps that need every new OS API on day one (e.g., Apple Watch complications, widgets), or when platform-specific UX is a brand differentiator.

**When cross-platform wins:** SaaS apps, enterprise tools, MVPs, teams without separate iOS/Android expertise, apps where business logic dominates over platform-specific UI.

**Key insight:** The "write once, run everywhere" dream is a myth — every cross-platform app still needs platform-specific polish. The real win is sharing 70-90% of code while investing 10-30% on each platform's nuances.`,
    },
    {
      id: 297,
      name: "JavaScript Bridge Architecture",
      desc: `**JavaScript Bridge** — the communication layer in older cross-platform frameworks (React Native classic, Cordova) where JavaScript code and native code run in separate threads and exchange serialized JSON messages asynchronously.

**How it works:** The JS thread (running V8/JavaScriptCore) sends JSON-serialized instructions across a bridge to the native thread, which executes them and returns results. Every UI update, API call, and gesture event crosses this bridge.

**The bridge bottleneck:** Serializing/deserializing JSON and marshaling data across the bridge adds latency. Rapid UI updates (animations, scroll events, gestures) that cross the bridge 60+ times per second can cause frame drops and jank — the classic React Native performance problem.

**Bridge elimination (JSI):** React Native's new architecture replaces the asynchronous JSON bridge with JSI (JavaScript Interface) — a C++ layer that lets JS hold direct references to native objects without serialization, enabling synchronous calls and eliminating the bottleneck.

**Why this matters architecturally:** Bridge architecture forced developers to minimize cross-thread communication — batch updates, avoid passing large objects, use Animated API's native driver. Understanding the bridge explains why certain React Native patterns exist and why the new architecture is such a step change.

**Key insight:** Every React Native performance tip from 2015-2022 is essentially "minimize bridge traffic." The new architecture (JSI, Fabric, TurboModules) makes those tips less necessary — but knowing why they existed makes you a better mobile engineer.`,
    },
    {
      id: 298,
      name: "React Native Architecture (New)",
      desc: `**React Native's New Architecture** — a ground-up redesign shipping stable in RN 0.74+ that replaces the asynchronous JSON bridge with three core primitives: JSI (JavaScript Interface), Fabric (new renderer), and TurboModules (new native modules system).

**Three pillars:**
- **JSI (JavaScript Interface):** A C++ abstraction layer that allows JavaScript to hold direct references to native C++ host objects. No more serialization — JS can call native synchronously or asynchronously without JSON overhead
- **Fabric:** The new concurrent-mode aware UI renderer. Built on JSI, it moves UI management to C++ and enables synchronous layout measurements and direct host component manipulation
- **TurboModules:** Lazy-loaded native modules accessed via JSI. Only modules actually used are initialized — improving startup time and enabling synchronous native calls

**Concurrent React support:** The new architecture enables React 18's concurrent features (Suspense, startTransition) in React Native — previously impossible because the bridge couldn't handle React's synchronous priority model.

**Migration path:** Most React Native 0.74+ apps run in interop mode — new and old architecture coexist. Libraries must update to use the new native module system, but user-space code changes are minimal.

**Key insight:** The new architecture doesn't change how you write React Native — it changes what's possible. Animations run on the UI thread without the bridge, layout can be measured synchronously, and the path to WebAssembly and other runtimes is now open.`,
    },
    {
      id: 299,
      name: "Flutter's Rendering Model",
      desc: `**Flutter's rendering model** is fundamentally different from every other cross-platform framework: instead of mapping to platform UI components, Flutter owns its own pixel canvas and draws every UI element using Skia (or the newer Impeller renderer) — bypassing platform widgets entirely.

**How it works:** Flutter's framework (written in Dart) builds a widget tree, which produces an element tree and a render object tree. The render objects are laid out and painted using Flutter's own GPU-accelerated 2D canvas, producing identical pixels on iOS, Android, web, and desktop.

**The key distinction:** React Native maps JSX components to native UIViews/Android Views. Flutter draws its own UIView-equivalent from scratch. This means Flutter apps look identical on all platforms (by default) but don't automatically inherit platform-specific component behavior.

**Trade-offs:**
- **Pro:** Pixel-perfect consistency, no bridge, 60/120fps animations, full control over every pixel
- **Con:** Apps feel "Flutter-like" rather than "iOS-like" or "Android-like" unless you deliberately implement platform conventions; larger binary size; some accessibility features require explicit implementation

**Impeller:** Flutter's new rendering engine (replacing Skia) pre-compiles shaders at build time, eliminating the "shader compilation jank" that affected Skia-based Flutter apps in their first run.

**Key insight:** Flutter is essentially a game engine for app UIs. If you've ever wondered why Flutter apps always look smooth and consistent, it's because Flutter is doing the same thing Unity does — rendering every frame fresh from scratch using the GPU.`,
    },
    {
      id: 300,
      name: "Dart Language Fundamentals",
      desc: `**Dart** — Google's optionally-typed, garbage-collected language designed for client-side development. It compiles to native ARM/x86 machine code (AOT compilation for production), to JavaScript (for web), and runs in a JIT VM during development for hot reload.

**Why Flutter chose Dart:**
- **AOT + JIT:** Dart's ahead-of-time compilation produces fast, small native binaries. JIT enables development-time hot reload (sub-second code updates without losing state)
- **Single-threaded with isolates:** Dart's concurrency model uses isolates (like Web Workers) — each isolate has its own memory and communicates via message passing, avoiding shared-state concurrency bugs
- **Sound null safety:** Dart's null safety system (introduced in Dart 2.12) distinguishes nullable and non-nullable types at compile time — "if it compiles, it won't throw null errors at runtime"

**Key language features:** async/await for asynchronous code, Streams for reactive data, extension methods, mixins for composing behaviors, and a rich generics system.

**Learning curve:** For JavaScript developers, Dart feels familiar but stricter. For Java/C# developers, it's a lighter, more expressive version of what they know. The biggest shift is embracing Dart's "everything is an object" model and its immutable-by-default philosophy in Flutter.

**Key insight:** Dart was purpose-built for Flutter's use case. The JIT/AOT duality — fast hot reload in development, fast execution in production — is why Flutter's developer experience is consistently rated as one of the best in mobile development.`,
    },
    {
      id: 301,
      name: "Expo vs Bare React Native",
      desc: `**Expo** — a managed platform layered on top of React Native that provides a curated SDK of native APIs, a build infrastructure (EAS Build), over-the-air update delivery (EAS Update), and a streamlined developer experience — at the cost of some flexibility.

**The spectrum:**
- **Expo Managed Workflow:** No Xcode or Android Studio required. Write JavaScript only. Expo handles native builds in the cloud. Limited to Expo SDK APIs — if a native library isn't in the Expo SDK, you can't use it
- **Expo Bare Workflow:** Full native project (Xcode + Android Studio) with Expo's toolchain (EAS Build, EAS Update, Expo Router) layered on top. Best of both worlds
- **Bare React Native:** Maximum flexibility and access, full control, but no managed infrastructure

**Expo Router:** File-based routing system for React Native (like Next.js for mobile). Generates navigation from the file structure, enabling deep linking automatically and making navigation state shareable via URLs.

**EAS (Expo Application Services):** Cloud build infrastructure for React Native apps. Avoids the need to maintain Mac CI machines for iOS builds — critical for Android-only developer teams building iOS apps.

**When to use Expo Managed:** MVPs, teams without native expertise, apps that fit within Expo's SDK coverage (~90% of common use cases). When to use Bare: when you need a specific native library, custom native code, or granular control over the native layer.

**Key insight:** Expo has evolved from "training wheels for React Native" to the officially recommended starting point. Even if you eventually eject to bare workflow, starting with Expo saves weeks of native configuration boilerplate.`,
    },
    {
      id: 302,
      name: "Platform Channels (Flutter) / Native Modules (RN)",
      desc: `**Platform Channels** (Flutter) and **Native Modules** (React Native) are the escape hatches that let you call platform-specific native code from your cross-platform codebase — enabling access to any iOS/Android API not already wrapped by the framework.

**Flutter Platform Channels:** A MethodChannel lets Dart code call Swift/Kotlin methods and receive results asynchronously. You define a channel name, call methods from Dart using the channel API, and implement handlers in the native platform code. EventChannels stream continuous data (sensor readings, location updates) from native to Dart.

**React Native Native Modules:** A native module is a Swift/Objective-C or Kotlin/Java class that exposes methods to JavaScript via the bridge (or JSI with TurboModules). Methods can be called synchronously (JSI only) or return Promises to JS. Native UI components (UI Views) can also be exposed as React Native components.

**When you need them:** Bluetooth LE protocols, proprietary SDKs (payment terminals, custom hardware), platform APIs added after the framework's last SDK update, deeply platform-specific behavior (Face ID, App Clips, Android App Bundles features).

**The alternative:** First check existing community packages (react-native-community, pub.dev) — someone has almost certainly already wrapped the API you need. Writing native modules is a last resort, not a first choice.

**Key insight:** The existence of platform channels/native modules is what makes cross-platform viable for serious apps. The "escape hatch" means you're never truly stuck — you can always drop down to native when needed.`,
    },
    {
      id: 303,
      name: "Code Sharing Strategy",
      desc: `**Code sharing strategy** — the deliberate architectural decision about which parts of your cross-platform app are shared vs platform-specific. The goal isn't 100% code sharing; it's sharing the right code.

**What should be shared (platform-agnostic):**
- Business logic, data models, API calls, state management, utility functions
- Routing/navigation configuration (with platform-appropriate transitions)
- Most UI components (with platform-aware styling)
- Test suites for business logic

**What should be platform-specific:**
- Native modules/platform channels for OS-specific APIs
- Platform conventions (iOS large titles vs Android app bars, tab position)
- App Store metadata, icons, splash screens
- Push notification certificate configuration

**Monorepo for multi-target apps:** When shipping iOS + Android + web from one codebase (possible with React Native Web or Flutter Web), monorepo tools (Nx, Turborepo) manage shared packages and platform-specific packages in one repo.

**The 80/20 rule in practice:** On a well-architected React Native or Flutter app, expect 80-85% shared code across iOS and Android — rising to 95%+ for the business logic layer, and dropping to 60-70% for the UI layer when you invest in platform-specific polish.

**Key insight:** Measure code sharing by value delivered, not lines of code. Sharing 100 lines of business logic (validated once, not twice) is more valuable than sharing 1000 lines of boilerplate UI code that could have been platform-native.`,
    },
    {
      id: 304,
      name: "App Bundle vs APK",
      desc: `**APK (Android Package)** is the traditional Android distribution format — a single archive containing all native code, resources, and assets for all device configurations. **AAB (Android App Bundle)** is the modern format where Google Play assembles device-optimized APKs dynamically, delivering only what each device needs.

**Why AABs win:** A typical APK bundles assets for all screen densities (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi) and all CPU architectures (arm64, armeabi-v7a, x86_64). An AAB lets Google Play serve a device-specific APK containing only the resources and ABI for that device — reducing install size by 15-50%.

**iOS equivalent:** App Store Connect uses a similar optimization — the uploaded IPA contains all assets, but the App Store delivers a thinned version (App Thinning) with only the relevant assets for each device.

**Cross-platform build output:**
- React Native + EAS: generates AAB for Google Play, IPA for App Store
- Flutter: flutter build appbundle, flutter build ipa
- Both support split APKs for direct distribution (outside Play Store)

**Dynamic Feature Modules (Android):** AABs support on-demand feature delivery — large features (AR modules, offline maps) can be downloaded only when needed, keeping the initial install small.

**Key insight:** Always submit AABs to Google Play (required since 2021 for new apps). The 15-50% size reduction is free performance — smaller installs mean higher conversion rates from the Play Store listing.`,
    },
    {
      id: 305,
      name: "Hot Reload vs Hot Restart vs Full Rebuild",
      desc: `**Hot Reload** injects updated source code into the running app without restarting the runtime — preserving app state. **Hot Restart** restarts the app from scratch (losing state) but faster than a full rebuild. **Full Rebuild** recompiles native code and reinstalls the binary.

**Flutter's hot reload:** Flutter's JIT compiler patches the running Dart VM with the new version of your code and triggers a widget rebuild. Changes to widget build methods appear in under a second with state preserved. Works for UI changes, logic changes, and most additions.

**Hot reload limitations:** Doesn't work for changes to app initialization code (main()), StatefulWidget's initState(), enum additions, native code changes, or changes to const values that are already compiled. These require hot restart.

**React Native's Fast Refresh:** RN's equivalent (introduced in RN 0.61) combines the best of hot reload and live reload. It preserves component state when possible and automatically recovers from errors, making the edit-and-see-result cycle very tight.

**Why this matters:** A full Xcode build for an iOS app can take 2-5 minutes. Hot reload brings the iteration loop to under 1 second. This 100-300x speedup is one of the most cited reasons developers prefer cross-platform frameworks for UI iteration.

**Key insight:** Design your app to be hot-reload-friendly: keep initialization side effects minimal, use const constructors (Flutter) aggressively, and structure state so most changes only affect widget tree leaves rather than forcing full restarts.`,
    },
  ],
};

export default foundations;
