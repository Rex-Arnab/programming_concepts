const reactNative = {
  name: "React Native",
  icon: "⚛️",
  color: "#61dafb",
  concepts: [
    {
      id: 306,
      name: "React Native Core Components",
      desc: `**React Native Core Components** — the set of built-in UI primitives that map to native platform widgets: View (maps to UIView/android.view.View), Text, Image, TextInput, ScrollView, FlatList, TouchableOpacity, and more.

**The critical distinction from the web:** React Native has no DOM. There's no div, span, p, or button. Everything is a React component that compiles to native widgets. View is your div. Text is your p or span. StyleSheet replaces CSS (with significant differences — no cascade, no inheritance).

**Core layout engine:** React Native uses Yoga — a cross-platform C++ implementation of the CSS Flexbox algorithm. Flexbox is the only layout model (no Grid, no float, no position: fixed). The default flex direction is column (not row as in CSS), and flexShrink defaults to 1.

**Pressable vs TouchableOpacity:** Prefer Pressable (introduced in RN 0.63) for all interactive elements. It's more flexible (style callbacks based on press state, hitSlop, delayLongPress) and is the modern API. TouchableOpacity is legacy.

**FlatList vs ScrollView:** Never use ScrollView for long lists — it renders all items at once. FlatList virtualizes rendering (only visible items + buffer), making long lists performant. SectionList adds grouped sections with headers.

**Key insight:** React Native's component model forces you to think in terms of native UI primitives rather than HTML elements. This is a mental shift, not a limitation — you're writing UI closer to the metal than web developers typically work.`,
    },
    {
      id: 307,
      name: "StyleSheet API",
      desc: `**StyleSheet** — React Native's CSS-inspired styling system that uses JavaScript objects instead of CSS files. Styles are defined as plain JS objects, validated at creation time, and passed as props to components.

**Key differences from CSS:**
- No cascade: styles don't inherit automatically (except Text inside Text for some properties)
- No selectors: styles are scoped to the component you apply them to
- camelCase properties: backgroundColor, not background-color
- Numbers, not strings: fontSize: 16 not "16px" (except borderRadius which accepts strings in some cases)
- Flexbox only: no grid, float, or table layout; flexDirection defaults to 'column'

**StyleSheet.create() vs plain objects:** StyleSheet.create() validates your styles in development (catches typos and invalid values) and, in older RN, sent styles to native once and referenced them by ID. With the new architecture, the performance difference is minimal — but StyleSheet.create() still provides dev-time validation.

**Platform-specific styles:** Platform.OS === 'ios' / 'android' inline conditionals, Platform.select({ ios: {...}, android: {...} }), or platform-specific file extensions (.ios.js / .android.js).

**Inheritance exception:** Text components inherit text-related styles (fontFamily, fontSize, color) from parent Text components — the only form of cascading in React Native.

**Key insight:** The lack of CSS cascade is a feature, not a bug. Scoped styles eliminate the "specificity wars" and unexpected inheritance that plague large CSS codebases. Every component's appearance is explicit and self-contained.`,
    },
    {
      id: 308,
      name: "Hermes Engine",
      desc: `**Hermes** — Meta's JavaScript engine built specifically for React Native, designed to improve startup performance and reduce memory usage compared to JavaScriptCore (JSC) and V8.

**How Hermes improves performance:** Instead of loading a JS bundle and JIT-compiling on device (which takes time and memory), Hermes pre-compiles JavaScript to bytecode at build time. The device loads pre-compiled bytecode — no JIT warmup, faster Time to Interactive (TTI), lower peak memory.

**The metrics:** Meta reports Hermes reduces app TTI by 40-60% on low-end Android devices compared to JSC, and cuts memory usage significantly. For apps where startup time directly affects user retention, this is a meaningful win.

**Hermes + New Architecture:** Hermes is the only officially supported JS engine for RN's new architecture (JSI requires tight integration with the JS engine). JSC and V8 (via V8-jsi) are still usable but with more integration effort.

**Debugging with Hermes:** Hermes supports Chrome DevTools Protocol for debugging — enabling the React Native Debugger and direct Chrome debugging of RN apps. Flipper integrates with Hermes for memory profiling and heap snapshots.

**When it matters most:** Hermes is most impactful on low-end Android devices (2GB RAM, budget chipsets) — the majority of the global Android market. On high-end iPhones, the difference is less dramatic. Enable Hermes for Android builds; iOS has had Hermes by default since RN 0.70.

**Key insight:** Hermes is a free performance win. Enable it (it's now the default), and you'll see TTI improvements especially on Android — without any code changes.`,
    },
    {
      id: 309,
      name: "Animated API & Reanimated",
      desc: `**Animated API** — React Native's built-in animation library that moves animated values between states, interpolating styles to create smooth transitions. **React Native Reanimated 2+** is the community library that runs animations entirely on the UI thread, enabling truly jank-free 60/120fps animations.

**Animated API's limitation:** The classic Animated API runs on the JS thread by default. Each frame, JS computes the new value, sends it across the bridge to native, and the UI updates. Under heavy JS load, bridge congestion causes frame drops — animations stutter while the CPU is busy.

**Animated with native driver:** Setting useNativeDriver: true offloads the animation to the native thread. No bridge crossing per frame — the native side drives the interpolation. Limitations: only works for non-layout properties (transform, opacity) — not width, height, left, top, or backgroundColor.

**React Native Reanimated 2+:** Animations and gesture handlers run exclusively on the UI thread using worklets (small JS functions compiled to native code). No bridge, no frame drops, even during heavy JS thread work. Enables:
- Spring animations with physics
- Gestures directly coupled to animations (scroll-driven animations)
- Shared element transitions
- Complex interactive animations (swipe-to-delete, pull-to-refresh)

**Reanimated + Gesture Handler:** The canonical combination. React Native Gesture Handler processes gestures on the native thread; Reanimated responds on the UI thread. Zero JS thread involvement for the interaction → zero jank.

**Key insight:** If you're building animations that feel "heavy" or "laggy," you're running them on the JS thread. Move to Reanimated 2+ worklets and the transformation is immediate — those same animations feel native.`,
    },
    {
      id: 310,
      name: "React Navigation",
      desc: `**React Navigation** — the de-facto standard navigation library for React Native, providing stack, tab, drawer, and modal navigators as composable React components with full TypeScript support and deep linking.

**Navigation primitives:**
- **Stack Navigator:** Screens pushed onto a stack; back gesture/button pops. Default for drill-down navigation (list → detail)
- **Tab Navigator (Bottom Tabs, Material Top Tabs):** Persistent tabs at bottom (iOS) or top (Android). Each tab maintains its own navigation stack
- **Drawer Navigator:** Side menu (hamburger menu). Common in enterprise apps
- **Modal presentation:** Screens presented over the current context, often for forms or confirmations

**Navigation state:** React Navigation stores navigation state in a JS object tree. State can be inspected, serialized to a URL (for deep linking), or restored (for background app resume). The state structure mirrors your navigator hierarchy.

**Deep linking:** React Navigation's linking config maps URL paths to screen names, enabling external URLs to open specific screens with parameters. Universal Links (iOS) and App Links (Android) let web URLs open the app instead of the browser.

**Type safety:** React Navigation provides full TypeScript generics for route params — you can type the params each screen expects and callers are type-checked. The useNavigation and useRoute hooks are typed.

**Key insight:** React Navigation's composability is its superpower. Complex navigation hierarchies (tab inside modal inside stack) are expressed as nested navigator components — the same mental model as composing React UI components.`,
    },
    {
      id: 311,
      name: "Metro Bundler",
      desc: `**Metro** — React Native's JavaScript bundler, developed by Meta. Metro transforms, bundles, and serves JS code during development (via hot reload server) and produces production bundles for release builds.

**What Metro does:** Traverses your JS module graph starting from index.js, transforms each file (TypeScript → JS, JSX → React.createElement calls), and bundles them into a single JS file (or split bundles for RAM bundles). During development, Metro serves a live-reloading server.

**Metro config:** metro.config.js allows customizing transformer (for non-JS assets, custom transforms), resolver (module resolution, aliasing, monorepo support), and server options. Common customizations: NativeWind (Tailwind for RN) uses a custom Metro transformer.

**Symbol maps:** Metro generates source maps for production bundles, enabling Sentry, Crashlytics, and other error trackers to de-obfuscate stack traces back to your original TypeScript source.

**RAM Bundles (legacy):** An optimization where the bundle is split into modules loaded lazily. Replaced by Hermes (which achieves the same goal via AOT bytecode) in modern RN apps.

**Compared to webpack/Vite:** Metro is simpler and React-Native-specific. It doesn't do tree-shaking (all imported code is included), which is why bundle size analysis matters for RN apps. Metro Focus on fast transforms and module resolution optimized for large mobile codebases.

**Key insight:** Metro is almost entirely invisible until something breaks. When it does (cache corruption, transform errors), knowing to run "npx react-native start --reset-cache" solves 80% of mysterious bundling issues.`,
    },
    {
      id: 312,
      name: "FlatList & Virtualization",
      desc: `**FlatList** — React Native's virtualized list component that renders only the items currently visible (plus a configurable buffer), enabling smooth 60fps scrolling through thousands of items without memory overflow.

**Why virtualization is mandatory:** A ScrollView renders all its children immediately. For 1000 list items, that's 1000 native views created in memory — causing slow initial render, high memory usage, and janky scrolling. FlatList renders ~20 items at a time (visible window + buffer), recycling views as the user scrolls.

**Key props:**
- **data:** Array of items
- **renderItem:** Function returning the JSX for each item
- **keyExtractor:** Function returning a stable unique key per item (critical for reconciliation)
- **initialNumToRender:** Items rendered in the first render (affects TTI)
- **windowSize:** Multiplier for the visible window (default 21 = 10 screens above + visible + 10 below)
- **getItemLayout:** Pre-computed item heights — enables VirtualizedList to jump to arbitrary offsets without measuring everything

**Common performance mistakes:**
- Anonymous arrow functions in renderItem (creates new function each render, breaks item memoization)
- Not using keyExtractor or using index as key (causes wrong reconciliation)
- Expensive renderItem components not wrapped in React.memo
- Not using getItemLayout for fixed-height lists

**FlashList:** Shopify's drop-in FlatList replacement (from @shopify/flash-list) that uses a recycler approach instead of React key-based reconciliation — typically 5-10x faster than FlatList for complex items.

**Key insight:** Wrap your renderItem component in React.memo with a proper comparison function. This is the single highest-impact FlatList optimization — it prevents re-rendering unchanged items during scroll.`,
    },
    {
      id: 313,
      name: "AsyncStorage & Local Persistence",
      desc: `**AsyncStorage** — React Native's simple key-value storage API (analogous to localStorage in browsers) that persists data across app restarts. It's unencrypted, async, and backed by the platform's native persistence layer (SQLite on Android, NSUserDefaults on iOS).

**AsyncStorage limitations:** Not suitable for sensitive data (no encryption), not designed for large datasets (no querying, no indexing), and the official RN AsyncStorage was deprecated and moved to the community package @react-native-async-storage/async-storage.

**Storage options by use case:**
- **AsyncStorage:** User preferences, session tokens, feature flags — small, non-sensitive config data
- **react-native-mmkv:** High-performance key-value storage (10x faster than AsyncStorage). Uses Tencent MMKV, a memory-mapped key-value framework. Supports encryption
- **WatermelonDB:** High-performance reactive database for complex relational data. Observes query results and re-renders only affected components
- **SQLite (via expo-sqlite):** Full SQL database. Good for offline-first apps with complex querying needs
- **react-native-keychain:** Secure storage using Keychain (iOS) / Keystore (Android) for sensitive data (auth tokens, passwords)

**Secure storage:** Never store auth tokens or passwords in AsyncStorage. Use react-native-keychain or expo-secure-store — they use the platform's encrypted key storage, protected by biometrics or device passcode.

**Key insight:** Choose your persistence layer based on your data's sensitivity and query complexity. AsyncStorage for config, Keychain for secrets, SQLite/WatermelonDB for relational data. Using AsyncStorage for everything is a common beginner mistake that causes performance and security issues.`,
    },
    {
      id: 314,
      name: "Push Notifications (APNs & FCM)",
      desc: `**Push notifications** reach users outside the app via Apple Push Notification service (APNs) for iOS and Firebase Cloud Messaging (FCM) for Android. Cross-platform frameworks abstract these APIs but the underlying infrastructure is platform-specific.

**The notification stack:**
1. Your app registers with APNs/FCM and receives a device token
2. Device token is sent to your backend server
3. Your server sends a notification payload to APNs or FCM with the device token
4. The platform delivers the notification to the device

**expo-notifications vs @notifee/react-native:** expo-notifications is the Expo-managed solution with a unified API. Notifee is a more powerful community library with full support for Android notification channels, rich media, and iOS critical alerts.

**Local vs remote notifications:**
- **Remote:** Sent from your server via APNs/FCM — the most common use case (chat messages, alerts)
- **Local:** Scheduled directly from the app — no server needed (reminders, alarms, on-device triggers)

**Notification handling states:** Foreground (app open), Background (app backgrounded), and Quit state (app terminated) each require different handling. Background and quit notifications can wake your app with a data payload for silent updates.

**iOS permissions:** iOS requires explicit user permission to show notifications. Request at the right moment (after demonstrated value, not on first launch). Permission denial rates drop dramatically when context is provided.

**Key insight:** Build your push notification system with a notification preferences screen from day one. Letting users control which notification categories they receive reduces opt-out rates and builds trust.`,
    },
    {
      id: 315,
      name: "Flipper & React Native Debugger",
      desc: `**Flipper** — Meta's extensible desktop debugging platform for mobile apps, providing network inspection, layout inspection, Redux DevTools, Hermes debugger, and crash log inspection in one app.

**What Flipper provides out of the box:**
- **Network inspector:** Inspect HTTP/HTTPS requests and responses (requires network plugin setup for HTTPS)
- **Layout inspector:** Interactive view hierarchy — click UI elements to see their React component, props, and layout measurements
- **Hermes Debugger:** JavaScript debugger with breakpoints, stepping, heap snapshots, and profiling
- **Logs:** Filterable device log viewer (replaces adb logcat / Console.app for most use cases)
- **Crash reporter:** Symbolicated crash reports for both JS and native crashes

**React Native Debugger (standalone):** Before Flipper, the standard tool. Still used by many teams. Bundles Chrome DevTools + Redux DevTools + React DevTools in one Electron app. Works by connecting to React Native's remote debug mode.

**Chrome DevTools (Hermes):** Direct debugging via Chrome at chrome://inspect with Hermes enabled. Lower overhead than React Native Debugger's remote debug mode (which slows JS execution significantly).

**The debugging caveat:** React Native's remote JavaScript debugging mode (running JS in Chrome V8 instead of Hermes) produces timing behavior different from production. For performance profiling, always use on-device profiling, not remote debugging.

**Key insight:** Use Flipper for layout and network inspection. Use Chrome DevTools via Hermes for JS debugging. Never use remote debug mode for performance profiling — it runs on V8, not Hermes, producing misleading results.`,
    },
    {
      id: 316,
      name: "Expo Router",
      desc: `**Expo Router** — a file-based routing system for React Native and web (built on React Navigation) that generates navigation structure from your file system, enabling universal links, deep links, and web-compatible URLs automatically.

**How it works:** Files in the app/ directory map to routes. app/index.tsx is the root route. app/profile/[id].tsx creates a dynamic route. Nested directories create nested navigators. Layout files (_layout.tsx) define the navigator wrapping child routes.

**File conventions:**
- app/index.tsx → "/" (root)
- app/settings.tsx → "/settings"
- app/user/[id].tsx → "/user/123"
- app/(tabs)/_layout.tsx → Tab navigator for all routes in the (tabs) group
- app/_layout.tsx → Root layout (Stack, Tabs, Drawer wrapping everything)

**Universal links out of the box:** Every route is automatically a deep link URL. Share a link to app/post/[id] and the OS opens the app directly to that post. On web builds, the same URL works as a proper web page URL.

**Benefits over manual navigation setup:**
- No manual route registration
- URL is the single source of truth for navigation state
- Simpler code splitting (each route is a separate chunk on web)
- Strongly typed routing with TypeScript auto-generation

**Compared to Next.js:** Expo Router is heavily inspired by Next.js App Router. If you know Next.js file routing, Expo Router is immediately familiar.

**Key insight:** Expo Router eliminates the tedious mapping between screens and navigation configuration. As your app grows, file-based routing scales naturally — adding a screen is as simple as creating a file.`,
    },
    {
      id: 317,
      name: "React Native Web",
      desc: `**React Native Web** — a library (react-native-web) by Nicolas Gallagher that implements React Native's component API using web DOM elements, enabling the same React Native code to run in a web browser.

**How it works:** React Native Web maps View → div, Text → span, Image → img, and implements the StyleSheet API on top of CSS. Your React Native app code imports from 'react-native' as usual; webpack/Vite resolves those imports to react-native-web equivalents.

**What works and what doesn't:** Most core components translate cleanly. Animations (Animated API) work. Platform-specific components (anything using native modules) don't work on web unless there's a web-compatible fallback. Complex gesture interactions may behave differently.

**The universal app pattern:** Expo's default monorepo template ships with iOS, Android, and web targets from a single codebase. Expo Router enables this — every route is a deep link URL that works on web.

**Twitter/X is built with RN Web:** The Twitter web app uses react-native-web, demonstrating that it can power high-traffic production applications. The performance is competitive with hand-written web apps.

**When to use:** Teams that want to ship mobile + web from one codebase. Good for apps where the UI is content-driven (feeds, profiles, settings). Less ideal for complex web-specific UX (hover states, complex CSS layouts, SEO-critical pages).

**Key insight:** React Native Web's value proposition is not "free web app" — it's "shared component system across platforms." Expect to write some platform-specific code for web-specific behaviors, but share the majority of logic and UI structure.`,
    },
    {
      id: 318,
      name: "React Native Performance Profiling",
      desc: `**Performance profiling** in React Native involves identifying bottlenecks in JS thread work, UI thread work, and bridge/JSI communication using platform tools and the in-app performance monitor.

**The two threads to watch:**
- **JS Thread:** Executes JavaScript — React reconciliation, state updates, business logic. Target: stays under 16ms per frame (60fps). Monitored with Chrome DevTools / Hermes profiler
- **UI Thread:** Executes native rendering. Driven by JS thread instructions. Should never be blocked by JS work. React Native Reanimated worklets run here

**Profiling tools:**
- **React DevTools Profiler:** Records React renders and shows which components re-rendered and why (props/state/context changes). Identifies unnecessary re-renders
- **Hermes Sampling Profiler:** CPU flame graph showing JS thread activity. Identifies hot functions and expensive computations
- **Android Systrace / iOS Instruments:** Low-level platform profilers showing native thread activity, GPU usage, and frame timing
- **Flipper Performance Plugin:** Real-time frame rate monitoring and JS/UI thread utilization

**The React.memo + useMemo + useCallback triad:** Over-using memoization adds overhead. Under-using it causes unnecessary re-renders. Profile first, then memoize components that are expensive to render and receive the same props frequently.

**InteractionManager:** Defer non-critical work until after transitions and animations complete using InteractionManager.runAfterInteractions(). Prevents animation jank caused by expensive initialization code.

**Key insight:** Most React Native performance issues are caused by unnecessary re-renders, not slow native code. Profile with React DevTools Profiler first — if a component tree re-renders 50 times during a scroll, that's your culprit.`,
    },
    {
      id: 319,
      name: "Code Push & OTA Updates",
      desc: `**Over-the-Air (OTA) Updates** let you push JavaScript and asset changes to users' installed apps without going through the App Store/Play Store review process — because only the JS bundle changes, not the native binary.

**EAS Update (Expo):** The modern solution for OTA updates in React Native/Expo apps. Updates are deployed via the EAS CLI, versioned by runtime version, and delivered to devices via the Expo Updates library. Apps check for updates on launch and can apply them immediately or on next restart.

**Microsoft CodePush (AppCenter):** The older solution, broadly used in bare React Native apps. Microsoft announced deprecation of AppCenter in 2025, making EAS Update the primary option going forward.

**What can be OTA updated:** JavaScript code, JavaScript assets (images, fonts bundled in JS), and anything in the Metro bundle. What cannot: native code (Swift, Kotlin, C++), native modules, changes to the iOS/Android project configuration.

**App Store compliance:** Apple's App Store guidelines allow OTA updates of interpreted code (JavaScript) as long as the app's purpose and functionality don't change materially. You cannot ship new features that "expand the app beyond its approved purpose" via OTA — this is a gray area that Apple enforces inconsistently.

**Release channels:** Use separate update channels for production, staging, and development. A/B test updates by targeting specific user segments. Rollback by publishing a previous update.

**Key insight:** OTA updates are most valuable for bug fixes and content updates. For any change that touches native code, you still need a full app store release. Build your deployment workflow expecting to need both paths regularly.`,
    },
  ],
};

export default reactNative;
