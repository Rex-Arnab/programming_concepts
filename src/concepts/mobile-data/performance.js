const performance = {
  name: "Performance & Optimization",
  icon: "⚡",
  color: "#f59e0b",
  concepts: [
    {
      id: 382,
      name: "Mobile Performance Mental Model",
      desc: `**Mobile performance** differs fundamentally from web and server performance. Battery life, thermal throttling, memory pressure, and the JavaScript-to-native communication overhead create a unique set of constraints.

**The three performance budgets:**
- **Frame time:** 16.7ms per frame for 60fps (8.3ms for 120fps). Exceed this and the app drops frames (jank)
- **Memory:** iOS kills background apps and eventually foreground apps under memory pressure. 200-500MB is a reasonable mobile app budget
- **Battery:** Sustained CPU usage, continuous GPS, or active Bluetooth drains battery noticeably. Users care about battery impact

**Mobile vs web performance mental model:** Web performance focuses on load time and interactivity. Mobile performance focuses on sustained smoothness (every frame, forever), memory efficiency (live within constraints), and CPU budget (throttling is immediate and sustained on mobile)

**Thermal throttling:** Extended CPU-intensive work heats the device. Modern iPhones and Android flagships throttle CPU/GPU significantly when hot — what performs well for 5 minutes may not perform well for 30 minutes. Test with warm devices.

**Thread model (React Native):** JS thread (your code), UI thread (native rendering), background threads (network, I/O). Never block the JS thread with synchronous expensive work. Never cross the bridge for every animation frame.

**Profile before optimizing:** Every performance optimization has a cost (complexity, maintainability, abstraction). Only optimize what you can measure. Install react-devtools profiler and Hermes CPU profiler before making optimization decisions.

**Key insight:** The most common React Native performance bottleneck is unnecessary re-renders, not slow JavaScript. Profile with React DevTools Profiler before reaching for memoization, lazy loading, or native modules. Fix the re-render problem first.`,
    },
    {
      id: 383,
      name: "Image Optimization",
      desc: `**Image optimization** is one of the highest-impact performance improvements in mobile apps. Unoptimized images cause slow downloads, high memory usage, and scroll jank — all avoidable with the right techniques.

**Format selection:**
- **WebP:** 25-35% smaller than JPEG at equivalent quality. Supported on Android and iOS 14+. Use for photos
- **HEIC/HEIF:** Apple's high-efficiency format (iPhone default since iOS 11). Smaller than JPEG, but limited server support — usually transcode to JPEG/WebP for serving
- **SVG:** Vector graphics — resolution-independent, tiny file size for icons and illustrations
- **PNG:** For images requiring transparency. For photos, JPEG or WebP is always smaller

**Responsive images:** Serve different image sizes for different screen densities. A 1x image on a 3x Retina display looks blurry; a 3x image on all screens wastes bandwidth for 1x and 2x users. Use a CDN that auto-generates size variants (Cloudinary, Imgix).

**Lazy loading:** Load images only when they're about to enter the viewport (during scroll). FlatList's virtualization handles this naturally — images in off-screen items aren't loaded. For non-list layouts, use intersection observer equivalents or manually manage loading triggers.

**Image caching:** expo-image and react-native-fast-image cache images to disk, preventing re-downloads on every render. FastImage also avoids the default RN image component's flickering on re-render. flutter's cached_network_image provides the same.

**Image placeholders:** Show a low-resolution blur hash (BlurHash) or dominant color placeholder while the full image loads. This eliminates the jarring blank-image-then-content flash that degrades scroll performance perception.

**Key insight:** Audit your app's network traffic with Flipper's network inspector. If image requests dominate (they usually do), implement CDN-based image transformation and switch to FastImage/expo-image. This single change often reduces app bandwidth usage by 40-60%.`,
    },
    {
      id: 384,
      name: "JavaScript Bundle Size",
      desc: `**Bundle size** — the size of the JavaScript code shipped to users. Larger bundles mean slower app startup (more code to parse and execute) and larger app downloads. For React Native apps, JavaScript bundle size directly affects TTI (Time to Interactive).

**Bundle analysis:** Use react-native-bundle-visualizer or Metro's --bundle flag with source maps to visualize what's in your bundle. Common surprises: moment.js (67KB), lodash (70KB), unused icon packs.

**Tree shaking limitations:** Metro doesn't tree-shake. Unlike webpack, Metro includes every imported module whether or not it's used. Avoid importing entire libraries when you need one function — use named imports and check if the library supports it.

**Large dependency culprits:**
- **moment.js:** Replace with date-fns (tree-shakeable) or dayjs (2KB)
- **lodash:** Import individual functions (lodash/pick) or use native equivalents
- **Icon libraries (react-native-vector-icons):** Only import the icon set you use
- **chart libraries:** Heavy charting libraries often add 200-500KB

**Inline requires:** Metro supports __inline_requires — defer module loading until the module is first required at runtime, rather than loading all modules at startup. Configured in Metro config. Significantly improves startup time for large apps.

**Hermes bytecode:** Hermes pre-compiles JS to bytecode, so startup time becomes less dependent on bundle parse time. Bytecode loading is faster than JS parsing — bundle size still matters (download time), but the execution startup time improvement is significant.

**Key insight:** Start tracking bundle size as a CI metric. Set a budget (e.g., "JS bundle must be under 3MB") and fail the CI build when it's exceeded. Bundle size creep is gradual and invisible without automated tracking — adding one "small" dependency at a time compounds to major startup degradation.`,
    },
    {
      id: 385,
      name: "Memory Management",
      desc: `**Memory management** in React Native and Flutter requires preventing memory leaks — cases where objects are retained in memory beyond their useful lifetime — and staying within the device's memory budget to avoid iOS/Android killing your app.

**Common React Native memory leaks:**
- **Event listeners not removed:** window.addEventListener or native event subscriptions added in useEffect without cleanup
- **Timers not cleared:** setInterval / setTimeout continued after component unmounts
- **Animations not stopped/disposed:** Animated.Value listeners not removed
- **Image cache overflow:** Too many large images cached in memory

**React Native cleanup pattern:** Return a cleanup function from useEffect. The cleanup runs before the component unmounts and before the effect runs again.

**Flutter memory leaks:**
- **StreamSubscriptions not cancelled:** Subscribe in initState(), cancel in dispose()
- **AnimationControllers not disposed:** Always dispose in State.dispose()
- **TextEditingControllers and ScrollControllers:** Must be disposed

**Measuring memory:** Flipper Memory plugin tracks heap size over time. Flutter DevTools memory view shows heap snapshots. iOS Instruments (Leaks, Allocations) and Android Studio Memory Profiler find retention paths for leaked objects.

**Object pooling:** For high-frequency allocations (particle effects, animation frames), object pools reuse objects instead of allocating new ones — reducing GC pressure. Relevant for game-like UIs.

**Key insight:** The Flipper Memory profiler's "heap snapshot diff" workflow is the fastest way to find leaks. Take a snapshot, perform the suspected leaking action (navigate to screen, navigate back, repeat), take another snapshot, compare — objects that grow with each cycle are leaking.`,
    },
    {
      id: 386,
      name: "Startup Performance",
      desc: `**App startup time** — the time from tapping the app icon to seeing the first meaningful content. This is the most impactful performance metric for user retention: 53% of mobile users abandon apps that take longer than 3 seconds to load (Google research).

**iOS startup phases:**
- **pre-main:** Dynamic linker loads and links frameworks. Minimize by reducing framework count
- **main():** iOS app delegate initialized
- **JS bundle load:** Metro bundle downloaded (dev) or read from disk (prod)
- **JS execution:** App code runs, components mount
- **First render + native layout**

**Startup optimization strategies:**
- **Hermes bytecode:** Pre-compiled — loads faster than parsing raw JS
- **Defer non-critical initialization:** Move analytics, crash SDK, and other non-essential init code to after first render using InteractionManager.runAfterInteractions()
- **Reduce required JS parsing:** Inline requires defer module loading until first use
- **Preload critical data:** Start network requests for first-screen data during JS bundle initialization

**Cold vs warm vs hot launch:**
- **Cold:** App not in memory, full initialization from scratch. Slowest
- **Warm:** App was backgrounded and killed (iOS) or in task list (Android). Some initialization reused
- **Hot:** App in memory, foreground/background switch. Fastest

**Measuring startup:** Use Xcode Instruments (App Launch template), Android Studio CPU Profiler, or custom startup timing instrumentation. Measure on low-end physical devices (iPhone SE, budget Android) — not simulators or flagship devices.

**Key insight:** The most impactful startup optimization is usually deferred initialization. Move everything that's not needed for the first screen (analytics, crash reporters, A/B testing SDKs, non-critical API calls) to after the first render. This directly reduces the visible blank screen duration.`,
    },
    {
      id: 387,
      name: "Network Performance",
      desc: `**Network performance** in mobile apps involves reducing request latency, handling connectivity changes gracefully, minimizing payload sizes, and implementing effective caching to provide a fast experience on variable-quality connections.

**Request optimization:**
- **GraphQL:** Request exactly the data fields needed (no over-fetching). Critical on mobile where bandwidth is metered
- **REST response shaping:** Server-side filtering and field selection for mobile clients
- **HTTP/2 multiplexing:** Multiple requests over a single connection. Reduces round-trip overhead for multiple concurrent requests
- **Request batching:** Combine multiple related requests into one (GraphQL batching, custom batch endpoints)

**Caching layers:**
1. **HTTP cache headers (Cache-Control, ETag):** Standard HTTP caching. Free if your CDN supports it
2. **React Query / SWR in-memory cache:** Deduplicate requests, stale-while-revalidate, background refetch
3. **Persistent cache (SQLite, MMKV):** Survive app restarts

**Connectivity handling:**
- Detect network state with react-native-netinfo / connectivity_plus (Flutter)
- Queue mutations while offline, sync on reconnect
- Show appropriate empty/error states for offline scenarios
- Use exponential backoff for retries (don't hammer a struggling server)

**Payload compression:** Most mobile HTTP clients support gzip/brotli automatically. Ensure your server sends compressed responses (Content-Encoding: gzip). For JSON APIs, brotli typically achieves 15-20% better compression than gzip.

**Key insight:** On mobile, the connection quality matters more than server latency. Test your app on 3G (150ms RTT, 1.5Mbps download) — the experience typical users in the global south or rural areas experience. Optimizations that seem irrelevant on WiFi become mandatory at 3G speeds.`,
    },
    {
      id: 388,
      name: "60fps Animation Performance",
      desc: `**Achieving 60fps animations** in mobile apps requires understanding the frame rendering pipeline, identifying what causes frame drops, and using the right tools to ensure animations run on the correct thread.

**The 16.7ms frame budget:** At 60fps, you have 16.7ms to complete all work for a frame. On 120Hz ProMotion displays (iPhone 13 Pro+, some Android flagships), this drops to 8.3ms. Exceeding the budget causes a dropped frame (jank) visible to users.

**Frame drop causes:**
- **JS thread overload:** Expensive JS operations (large data processing, heavy reconciliation) during an animation frame
- **Bridge/JSI overhead:** Animations that require JS-to-native communication on every frame
- **Layout thrashing:** Asking for layout measurements after making layout changes
- **Slow paint:** Complex visual effects (heavy blur, large shadows, complex gradients) that take too long to rasterize

**Debugging frame drops:**
- React Native performance overlay (developer menu) shows JS/UI thread frame rates as a graph
- Android GPU Profiler shows per-frame render time
- iOS Instruments (Core Animation) shows dropped frames and their causes

**Solutions:**
- Move animations to UI thread: Reanimated worklets, Animated with useNativeDriver: true
- Reduce widget rebuilds (Flutter): const constructors, RepaintBoundary, shouldRebuild
- Use GPU-accelerated properties (transform, opacity) instead of layout-triggering properties
- Simplify complex paint operations

**ProMotion / Fluid animations:** iOS ProMotion 120Hz requires explicit opt-in in React Native (CADisplayLink). Flutter supports ProMotion natively.

**Key insight:** The single most effective animation performance technique is "move it off the JS thread." Reanimated 2 worklets (RN) and Flutter's entire widget system run on the UI/render thread by default — no bridge crossing, no JS involvement, guaranteed 60fps as long as you don't bridge.`,
    },
    {
      id: 389,
      name: "App Size Optimization",
      desc: `**App size optimization** reduces the download size and install size of your app — directly affecting conversion rates from app store listings. Large apps see higher abandonment rates, especially in markets with expensive data plans.

**What contributes to app size:**
- **Native code:** Swift/Kotlin/C++ compiled code
- **JavaScript bundle:** Your JS code and dependencies
- **Assets:** Images, fonts, audio, video, 3D models
- **Frameworks:** React Native framework itself, Flutter engine, third-party SDKs

**App Thinning (iOS):** The App Store automatically delivers device-specific variants — only the binary slice for the device's CPU architecture, and only the asset catalog images for the device's screen scale. A 100MB IPA might download as 40MB on a specific device.

**Android App Bundles:** Google Play dynamically delivers only the native libraries for the device's ABI and only assets for the device's screen density. Similar to App Thinning.

**Asset optimization checklist:**
- Use WebP instead of PNG/JPEG for photos
- Use vector assets (SVGs, Lottie) instead of raster for illustrations
- Remove unused asset catalog entries
- Subset fonts to required character ranges

**Code size reduction:**
- Enable Hermes (smaller than including V8/JSC)
- Enable R8/ProGuard on Android (code shrinking, obfuscation)
- Enable Swift optimizations and strip debug symbols for release
- Audit and remove unused dependencies

**Key insight:** Track app size in every CI release build. Tools like appdiff (GitHub Action) show size deltas between builds — catching regressions before they ship. A 5MB size increase from an accidentally included debug asset or development dependency is invisible without automated tracking.`,
    },
    {
      id: 390,
      name: "Lazy Loading & Code Splitting",
      desc: `**Lazy loading** defers the initialization of code and data until it's actually needed. In mobile apps, this applies to screens (not loading code for screens the user hasn't visited), data (not loading all records upfront), and features (not initializing SDKs for rarely-used features).

**React Native lazy screen loading:** Dynamic imports (React.lazy with Suspense) work in React Native, but Hermes's bytecode model means the module is compiled at build time anyway — the main benefit is deferred JS execution at runtime, not smaller build output. Still worthwhile for rarely-visited heavy screens.

**Flutter deferred components:** For very large Flutter apps (primarily Flutter Web), deferred loading downloads dart code on demand. Less relevant for mobile-only Flutter apps where the entire app is compiled to native code.

**Data pagination:** Load data incrementally as the user scrolls rather than fetching all records upfront. FlatList's onEndReached triggers loading the next page. React Query's useInfiniteQuery manages paginated data with cursor/offset-based pagination.

**SDK lazy initialization:** Initialize analytics, push notification, and other SDKs after the first render rather than at startup. Many SDKs perform network requests during initialization — deferring this reduces time to first render.

**Feature-gated code:** Code behind feature flags can be tree-shaken if the flag is evaluated at build time. If evaluated at runtime, the code is always in the bundle — consider code splitting for large, rarely-accessed features.

**Key insight:** Lazy loading in React Native primarily pays off for large, rarely-accessed features (settings screens, onboarding, admin tools). For most screens, the JS execution overhead of lazy loading exceeds the benefit. Profile startup performance before adding lazy loading complexity.`,
    },
    {
      id: 391,
      name: "Re-render Optimization",
      desc: `**Re-render optimization** reduces unnecessary component re-renders — rebuilds triggered by parent state changes that produce identical output, causing wasted CPU cycles and potential animation jank.

**React Native re-render causes:**
- Parent component re-renders (default: all children re-render with it)
- useState or useReducer state change in any ancestor
- Context value change
- New function or object references passed as props (even if semantically identical)

**React.memo:** Wraps a component to skip re-renders when props haven't changed (shallow comparison). Effective when: the component is expensive to render, it receives the same props often, and its parent re-renders frequently.

**useCallback & useMemo:**
- useCallback: Memoize a function reference (stable reference across renders)
- useMemo: Memoize a computed value (avoid recomputing on every render)
- Both have overhead — only use when the computation or function creation is measurably expensive

**The memoization trap:** Over-memoizing adds cache maintenance overhead without benefit. React.memo on a component that always receives new props (e.g., a component rendering a different item each time) provides no benefit and adds overhead.

**Flutter equivalent (const and RepaintBoundary):**
- const constructors prevent widget recreation when parent rebuilds (widget is returned from the cache)
- RepaintBoundary creates a separate compositing layer — the widget inside repaints independently

**When re-renders actually matter:** A re-render that takes 0.1ms has no impact. A list item re-render across 100 items taking 2ms each = 200ms of wasted work per parent update. Measure before optimizing.

**Key insight:** Run the React DevTools Profiler with "Highlight updates when components render" enabled and interact with your app for 30 seconds. Everything that flashes on every keystroke or state update that doesn't need to is a re-render to investigate. Fix the top 3 — they'll cover 80% of the problem.`,
    },
  ],
};

export default performance;
