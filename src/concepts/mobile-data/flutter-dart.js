const flutterDart = {
  name: "Flutter & Dart",
  icon: "🐦",
  color: "#54c5f8",
  concepts: [
    {
      id: 320,
      name: "Widget Tree & Composition",
      desc: `**Widget Tree** — Flutter's fundamental UI model where everything is a widget. Widgets are immutable descriptions of UI — they don't render themselves, they describe what to render. The Flutter framework reconciles widget trees to determine what actually changes on screen.

**Three trees:** Flutter maintains three parallel trees:
1. **Widget tree:** Your code — immutable descriptions that rebuild on state change
2. **Element tree:** The "live" instances that persist across rebuilds, managing lifecycle and holding references to render objects
3. **Render Object tree:** The layout and painting layer — equivalent to the DOM's layout engine

**Composition over inheritance:** Flutter's design philosophy strongly favors composition (wrapping widgets inside other widgets) over inheritance. Instead of subclassing Button and overriding paint methods, you combine existing widgets. This is why the widget library is huge — there's a widget for nearly every concern (padding, alignment, clipping, semantics, gesture detection).

**Widget types:**
- **StatelessWidget:** Describes UI based entirely on its constructor arguments. Pure function of inputs → UI description
- **StatefulWidget:** Has mutable state (a State object) that can trigger rebuilds via setState()
- **InheritedWidget:** Propagates data down the tree without explicit prop drilling (the mechanism behind Provider, Theme, MediaQuery)

**The "everything is a widget" philosophy:** Even abstract concepts are widgets — Padding, SizedBox, Align, GestureDetector, FutureBuilder. This uniformity makes the framework learnable: if you know how to use one widget, the pattern applies to all.

**Key insight:** In Flutter, you don't modify widgets — you rebuild them. When state changes, Flutter calls build() again and produces a new widget tree. The framework diffs the old and new trees (using the element tree for reconciliation) and updates only what changed.`,
    },
    {
      id: 321,
      name: "StatefulWidget & State Lifecycle",
      desc: `**StatefulWidget** — a widget that can change over time, split into two classes: the StatefulWidget subclass (immutable, recreated on rebuild) and its associated State subclass (mutable, persists across rebuilds).

**Why two classes?** Widgets are immutable in Flutter — they're just descriptions. To persist mutable data across rebuilds, Flutter separates state into the State object, which lives as long as the widget is in the tree. When the parent rebuilds and passes new config to the widget, a new widget object is created but the same State object is reused.

**State lifecycle methods:**
- **initState():** Called once when the State is inserted into the tree. Initialize subscriptions, controllers, and async operations here
- **didChangeDependencies():** Called when an InheritedWidget the state depends on changes
- **build():** Called every time setState() is invoked. Should be pure — no side effects
- **didUpdateWidget():** Called when the parent passes new config (new widget of same type). Compare old vs new widget here
- **dispose():** Called when state is permanently removed. Cancel subscriptions, dispose controllers (TextEditingController, AnimationController) to prevent memory leaks

**Common mistake:** Calling setState() in build() or inside an async callback after dispose(). Check mounted before calling setState() in async methods.

**Key insight:** dispose() is the most commonly forgotten lifecycle method in Flutter — and the cause of the "setState called after dispose" error that plagues Flutter apps. Every controller you initialize in initState() must be disposed in dispose().`,
    },
    {
      id: 322,
      name: "BuildContext",
      desc: `**BuildContext** — a handle to the location of a widget in the widget tree. It's how widgets find InheritedWidgets, navigate, show dialogs, access themes, and communicate with the framework.

**What BuildContext enables:**
- Theme.of(context) — looks up the nearest Theme ancestor
- Navigator.of(context) — finds the nearest Navigator to push/pop routes
- MediaQuery.of(context) — gets screen size, padding, orientation
- Scaffold.of(context) — finds the nearest Scaffold for snackbars, drawers
- Provider.of(context) — retrieves state from the Provider ancestor

**Context scope matters:** BuildContext is a reference to a specific node in the widget tree. Using the wrong context — for example, using a context from before a Scaffold is in the tree to try to show a SnackBar — causes runtime errors. This is a common source of "Scaffold not found" errors.

**The async context problem:** After an async gap (await), the BuildContext may no longer be valid (the widget may have been disposed). Check if (context.mounted) before using context after async operations in Flutter 3.x+.

**Context lookup is O(tree depth):** Every Theme.of(context) traverses up the widget tree until it finds a Theme ancestor. Cache expensive lookups in local variables if called multiple times in build(). BuildContext.findAncestorWidgetOfExactType() is the underlying mechanism.

**Key insight:** BuildContext errors (like "No MaterialLocalizations found") almost always mean you're using a context that's above the widget providing what you're looking for. The fix is usually to extract a new widget that is a child of the required ancestor.`,
    },
    {
      id: 323,
      name: "Provider & InheritedWidget",
      desc: `**InheritedWidget** — Flutter's built-in mechanism for efficiently propagating data down the widget tree without passing it explicitly through constructors. **Provider** is the community-standard wrapper around InheritedWidget that adds lifecycle management and ChangeNotifier integration.

**InheritedWidget mechanics:** An InheritedWidget sits above the widgets that need its data in the tree. Descendant widgets call context.dependOnInheritedWidgetOfExactType<T>() (or the Of(context) shorthand) to subscribe. When the InheritedWidget's data changes, only the subscribed widgets rebuild — not the entire subtree.

**Provider package:** Provider (by Remi Rousselet) wraps InheritedWidget with a clean API:
- ChangeNotifierProvider: listens to ChangeNotifier and rebuilds consumers on notifyListeners()
- Provider: supplies an immutable value
- FutureProvider / StreamProvider: builds from async data sources
- MultiProvider: composes multiple providers at the root

**ChangeNotifier vs Riverpod:** ChangeNotifier is mutable state with explicit notifyListeners() calls. Riverpod (Provider's successor) uses immutable state, compile-time safety, and doesn't require BuildContext — enabling state access outside widget trees.

**Selector for granular rebuilds:** Provider.of<T>(context) rebuilds whenever any part of T changes. context.select<T, R>((t) => t.field) rebuilds only when the selected field changes — avoiding rebuilds when unrelated state changes.

**Key insight:** InheritedWidget is Flutter's answer to React's Context API. Provider makes it ergonomic. Riverpod makes it type-safe and testable. Choose based on your app's complexity: Provider for most apps, Riverpod for large apps with complex dependency graphs.`,
    },
    {
      id: 324,
      name: "Flutter Riverpod",
      desc: `**Riverpod** — a state management and dependency injection framework for Flutter (and pure Dart) that addresses Provider's limitations: no BuildContext required, compile-time safety, easy testability, and support for multiple providers of the same type.

**Core Riverpod concepts:**
- **Provider:** Supplies a value. Lazily initialized. Can depend on other providers
- **StateProvider:** Holds mutable state for simple use cases (counters, toggles)
- **NotifierProvider:** Replaces ChangeNotifierProvider. Business logic in a Notifier class, state is immutable
- **FutureProvider / AsyncNotifierProvider:** For async data (API calls, database queries)
- **StreamProvider:** For continuous streams (WebSocket, location updates)

**ref.watch vs ref.read vs ref.listen:**
- **watch:** Subscribe to changes, rebuild widget on change (use in build())
- **read:** Read current value without subscribing (use in callbacks, one-time reads)
- **listen:** Execute a side effect when value changes without rebuilding

**Code generation (@riverpod):** Riverpod 2.x Generator eliminates boilerplate. Annotate a function or class with @riverpod, run build_runner, and Riverpod generates the provider class. Enables refactoring without manual provider recreation.

**Testing with Riverpod:** ProviderContainer lets you override any provider with a mock for testing — no app context needed. This makes business logic fully unit-testable outside Flutter's widget framework.

**Key insight:** Riverpod's "no BuildContext" design is its core innovation. You can access and modify state in service classes, background isolates, and tests without needing a widget context — making architectures like Clean Architecture and MVVM much cleaner in Flutter.`,
    },
    {
      id: 325,
      name: "BLoC Pattern",
      desc: `**BLoC (Business Logic Component)** — an architectural pattern for Flutter that separates UI from business logic using Streams. UI dispatches Events to the BLoC; the BLoC processes events, updates internal State, and emits new State objects; the UI rebuilds in response to State changes.

**The flutter_bloc library:** Implements BLoC with a clean API using Cubit (simple BLoC without events, just methods that emit states) and Bloc (full event-driven BLoC). BlocProvider makes a BLoC available to the subtree. BlocBuilder rebuilds UI on state changes. BlocListener responds to state changes with side effects (navigation, snackbars).

**Event → State flow:**
1. User taps "Load" → UI dispatches LoadDataEvent
2. BLoC receives event in mapEventToState() (or on<LoadDataEvent>)
3. BLoC emits LoadingState
4. BLoC fetches data, emits DataLoadedState(data) or ErrorState(error)
5. BlocBuilder rebuilds UI based on new state

**Why BLoC for large teams:** Events and states are explicit, documented, and serializable. Business logic is pure Dart (no Flutter dependencies) and fully unit-testable. Large teams find the rigid structure prevents architecture drift. State transitions are auditable.

**BLoC vs Riverpod:** BLoC enforces explicit event types (good for complex flows, large teams, strict audit trails). Riverpod is more flexible and less boilerplate (good for smaller teams, faster iteration). Both are production-proven in large apps.

**Key insight:** BLoC's verbosity (creating separate event and state classes) is its feature, not its bug. Every state transition is documented as a named event class. In complex financial or healthcare apps where audit trails matter, this explicitness is worth the boilerplate cost.`,
    },
    {
      id: 326,
      name: "Flutter Navigation (Navigator 2.0 / go_router)",
      desc: `**Flutter Navigator 2.0** is a declarative navigation API that represents navigation state as a list of pages, enabling URL-driven navigation (essential for Flutter Web) and deep linking. **go_router** is the official community package that makes Navigator 2.0 usable.

**Navigator 1.0 vs 2.0:**
- **1.0 (imperative):** Navigator.push/pop. Simple, great for mobile-only apps with linear flows
- **2.0 (declarative):** Navigation state is a list of MaterialPage objects. The URL (or deep link) determines the page stack. Required for Flutter Web's browser history and complex deep linking

**go_router:** The officially recommended navigation solution. Provides URL routing, path parameters, query parameters, redirects, sub-routes, nested navigation, and deep linking in a clean declarative API. Replaces manual Navigator 2.0 boilerplate.

**Route configuration:**
- /home → HomeScreen
- /product/:id → ProductDetailScreen
- /profile/settings → nested under ProfileScreen
- Redirect guards: check auth state, redirect to /login if not authenticated

**ShellRoute:** go_router's way to nest navigators within persistent UI (e.g., a bottom navigation bar that persists across tab navigation).

**Deep linking setup:** Configure URL schemes (mobile) and web paths (Flutter Web). go_router's GoRouter.redirect() handles authentication guards — redirecting unauthenticated users to login while preserving their intended destination.

**Key insight:** For Flutter Web apps and apps with deep linking requirements, go_router is non-negotiable. For simple mobile-only apps with linear navigation, Navigator 1.0 push/pop is still perfectly fine — don't over-engineer navigation.`,
    },
    {
      id: 327,
      name: "Flutter Animation System",
      desc: `**Flutter's animation system** is built on three layers: Animation objects (values that change over time), AnimationController (drives the animation clock), and animated widgets (rebuilds as animation value changes). Higher-level APIs (AnimatedContainer, AnimatedOpacity, Hero) automate the boilerplate.

**Animation layers:**
- **AnimationController:** Drives time from 0.0 to 1.0. Forward, reverse, repeat, fling. Must be disposed
- **Tween:** Maps a 0.0-1.0 range to a domain value (e.g., Tween<double>(begin: 0, end: 300))
- **CurvedAnimation:** Wraps an animation with an easing curve (Curves.easeInOut, Curves.spring)
- **AnimatedBuilder / AnimatedWidget:** Rebuilds only its subtree on each animation frame

**Implicit animations (easy):** AnimatedContainer, AnimatedOpacity, AnimatedPadding, AnimatedPositioned automatically interpolate between old and new values when their properties change — no AnimationController needed.

**Explicit animations (powerful):** AnimationController + AnimatedBuilder gives full control over timing, sequencing, and complex multi-property animations.

**Hero animations:** Shared element transitions between routes. Tag widgets on both screens with the same Hero tag. Flutter automatically animates the tagged widget's position and size across the transition.

**Rive & Lottie:** For complex vector animations. Rive (.riv files) is interactive and state-machine driven. Lottie (.json from After Effects) plays pre-rendered animations. Both have Flutter packages.

**Key insight:** Start with implicit animations (AnimatedContainer family) — they handle 80% of app animation needs with minimal code. Graduate to explicit AnimationController only when you need precise control over timing, staggering, or physics-based motion.`,
    },
    {
      id: 328,
      name: "Flutter Platform Channels & FFI",
      desc: `**Platform Channels** let Flutter's Dart code communicate with platform-native code (Swift/ObjC on iOS, Kotlin/Java on Android). **Flutter FFI** (dart:ffi) lets Dart call C/C++ code directly without platform channel overhead.

**MethodChannel:** The most common channel type. Dart calls a named method; native code handles it and returns a result. Serializes method names and arguments via a codec (StandardMethodCodec handles common types). Async by default.

**EventChannel:** For continuous streams of data from native to Dart. Native pushes events; Dart receives them as a Stream. Used for sensor data, location updates, audio levels — any ongoing native event stream.

**BasicMessageChannel:** For arbitrary bidirectional message passing with a custom codec. Used when MethodChannel's request-response model is too rigid.

**dart:ffi (Foreign Function Interface):** Allows Dart to call C/C++ functions directly — no method channel overhead, no serialization. Useful for wrapping C SDKs (audio codecs, image processing libraries, game engines). More complex to set up but orders of magnitude faster than MethodChannel for high-frequency calls.

**Pigeon:** Code generation tool for type-safe platform channels. Define your API in a Dart file; Pigeon generates Swift, Kotlin, and Dart code from it. Eliminates string-based method names and untyped maps — reduces runtime errors from platform channel mismatches.

**Key insight:** Use Pigeon for any non-trivial platform channel interface. Hand-written platform channels with string method names and Map arguments are fragile — typos and type mismatches are silent until runtime. Pigeon catches these at compile time.`,
    },
    {
      id: 329,
      name: "Flutter Test Pyramid",
      desc: `**Flutter's test pyramid** consists of three layers: unit tests (pure Dart logic), widget tests (component rendering and interaction), and integration tests (full app on a real device/emulator). Flutter ships testing support in the SDK — no extra test runner needed.

**Unit tests:** Test pure Dart code — business logic, data transformations, repository classes, use cases. No Flutter dependencies needed. Fast (milliseconds), run headlessly, ideal for CI. Use the flutter_test package (or plain dart:test).

**Widget tests:** Test individual widgets in a simulated environment using WidgetTester. No real device needed — Flutter's test runner runs a headless Flutter engine. Pump widgets into a fake canvas, interact (tap, scroll, enter text), assert on widget state and rendered output.

**Integration tests (flutter_test / integration_test package):** Full app tests running on a real device or emulator. Drive the actual app, interact with real platform APIs, measure performance. Slower and more brittle, but catch real-world issues unit/widget tests miss.

**Golden tests (snapshot testing):** flutter_test supports golden file tests — render a widget and compare against a stored "golden" PNG. Catch unintended visual regressions. Maintained goldens require updates on intentional UI changes.

**Mockito + build_runner:** The standard mocking solution for Flutter. Generate mock classes from interfaces with @GenerateMocks annotation + build_runner. Avoids hand-writing mock implementations.

**Key insight:** Flutter's widget tests are uniquely powerful — they test the full widget lifecycle (including animation pumping, gesture simulation) without a real device. A comprehensive widget test suite catches most UI bugs before they reach CI integration tests, with near-unit-test speed.`,
    },
    {
      id: 330,
      name: "Flutter DevTools",
      desc: `**Flutter DevTools** — the official suite of performance and debugging tools for Flutter and Dart, accessible from VS Code, Android Studio, or the browser. Provides widget inspector, performance profiler, memory profiler, network monitor, and logging panel.

**Widget Inspector:** Visual tree browser that maps rendered UI back to source code. Click any UI element in the preview to see its widget class, properties, layout constraints, and position in the widget tree. Invaluable for debugging layout issues.

**Performance view:** Frame timing chart showing Flutter's build thread (Dart/CPU), raster thread (GPU), and UI thread. Each frame is a bar; red/yellow bars exceed the 16ms frame budget. Drill into slow frames to see which build/paint/composite phase is slow.

**Memory view:** Live memory usage timeline with heap snapshot support. Identify memory leaks by taking snapshots before and after an operation and comparing object counts. Essential for finding unreleased streams, animation controllers, and subscription listeners.

**CPU Profiler:** Flame graph of Dart CPU time. Shows where your app spends time on the Dart thread — build methods, JSON parsing, complex computations. Drill down to find expensive functions.

**Network tab:** HTTP/HTTPS request monitor for Flutter apps using the http package or Dio. Shows request/response headers, body, timing, and status codes.

**Key insight:** The Performance view's "track widget rebuilds" mode is the fastest way to find over-rendering. Enable it, interact with your app, and watch which widgets rebuild on each interaction — everything highlighted in red is rebuilding unnecessarily.`,
    },
    {
      id: 331,
      name: "pub.dev & Package Ecosystem",
      desc: `**pub.dev** — Dart and Flutter's package repository (equivalent to npm for JavaScript). Packages are rated by a "pub points" system considering documentation, health, maintenance, and popularity.

**Evaluating packages:** Before adding a dependency, check: pub points (out of 160), likes count, popularity (download percentages), last publish date, null safety support, platform support (iOS/Android/web/desktop), and the GitHub repository's issue tracker health.

**Essential Flutter packages:**
- **dio:** HTTP client with interceptors, retry, cancellation
- **freezed:** Code generation for immutable data classes and union types
- **json_annotation + json_serializable:** JSON serialization via code generation
- **hive / isar:** Fast local NoSQL databases
- **cached_network_image:** Image loading with cache management
- **flutter_svg:** SVG rendering
- **intl:** Internationalization and localization

**Dependency management:** pubspec.yaml uses semantic versioning with caret (^) constraints. "^1.2.3" means >=1.2.3 <2.0.0. Flutter lockfile (pubspec.lock) pins exact versions for reproducible builds.

**Monorepo local packages:** For large codebases, extract features into local packages in a packages/ directory. Reference them with path: ../packages/feature_auth in pubspec.yaml. Enables clear module boundaries without publishing to pub.dev.

**Key insight:** Prefer packages maintained by the Flutter team (flutter.dev organization), the flutter_community organization, or packages from well-known companies (Invertase, Shopify, Very Good Ventures). Abandoned packages are a technical debt risk in mobile development due to OS API changes.`,
    },
    {
      id: 332,
      name: "Flutter Web & Desktop",
      desc: `**Flutter multi-platform targets** — Flutter can compile to iOS, Android, web (HTML/WebAssembly), macOS, Windows, and Linux from a single Dart codebase, making it one of the most versatile UI frameworks in existence.

**Flutter Web:** Runs Dart in the browser via two renderers:
- **HTML renderer:** Renders using HTML, CSS, and Canvas2D. Smaller bundle, better text rendering, works on all browsers
- **CanvasKit renderer:** Embeds Skia compiled to WebAssembly. Pixel-perfect Flutter rendering in the browser, but larger download (~2MB for CanvasKit itself). Better for complex UIs
- **Web Assembly (Dart WASM):** Flutter 3.22+ supports compiling Dart to WASM for Web, with near-native performance for compute-intensive apps

**Flutter Desktop (macOS, Windows, Linux):** GA as of Flutter 3.x. Native window management, menu bars, keyboard shortcuts, system dialogs. Shared codebase with mobile means a Flutter app can ship as iOS app + Android app + macOS app + Windows app.

**Adaptive layouts:** Different screen sizes require different layouts. LayoutBuilder provides available constraints; MediaQuery provides screen dimensions. Adaptive layout patterns: show side panel on wide screens, bottom nav on narrow mobile.

**Platform-adaptive widgets:** The Cupertino widget library gives iOS-style UI; Material gives Android/desktop-style. Use the Platform.isIOS check or the adaptive constructors (Switch.adaptive()) to render platform-appropriate widgets.

**Key insight:** Flutter's multi-platform story is compelling for internal tools and enterprise apps. A single Flutter codebase can replace separate iOS, Android, web, and desktop teams — the maintenance cost reduction is substantial at scale.`,
    },
    {
      id: 333,
      name: "Flutter Flavors & Environment Config",
      desc: `**Flutter Flavors** — a mechanism for building multiple variants of a Flutter app from the same codebase (development, staging, production) with different app IDs, bundle IDs, API endpoints, feature flags, and app names.

**Why flavors:** You need to install dev and prod versions of your app simultaneously on the same device (different bundle IDs). You need different Firebase configurations for dev/prod. You want a staging app that connects to a staging API server without changing code.

**Setting up flavors:**
- **Android:** Build variants in build.gradle with different applicationId per flavor
- **iOS:** Xcconfig files per scheme, different Bundle Identifiers in Xcode targets
- **Flutter:** Dart-side configuration via --dart-define or the flutter_flavor package, reading environment at runtime

**dart-define approach:** Pass compile-time constants via --dart-define=API_URL=https://api.dev.example.com. Read in Dart with const String.fromEnvironment('API_URL'). Available at compile time without flutter_dotenv file loading overhead.

**Environment files with flutter_dotenv:** Load a .env file at app startup for runtime configuration. Simpler for teams unfamiliar with dart-define, but the .env file is bundled with the app (readable by static analysis tools).

**Secret management:** Never commit API keys, Firebase configs, or secrets to source control. Use CI/CD environment variables to inject secrets into builds. For iOS, Xcode Cloud / Fastlane handles secret injection. For Android, environment variables in Gradle build scripts.

**Key insight:** Setting up flavors correctly at project start avoids a painful retrofit later. The 2-hour investment in flavor configuration saves countless hours of "accidentally deployed dev build to production" incidents.`,
    },
  ],
};

export default flutterDart;
