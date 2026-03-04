const architecturePatterns = {
  name: "Architecture & Patterns",
  icon: "🏗️",
  color: "#ef4444",
  concepts: [
    {
      id: 418,
      name: "Clean Architecture in Mobile",
      desc: `**Clean Architecture** (Robert C. Martin) organizes mobile apps into concentric layers where dependencies point inward — outer layers (UI, frameworks) depend on inner layers (business logic, entities), but not vice versa.

**The three layers:**
- **Presentation layer:** UI components, ViewModels/Presenters, state management. Depends on domain layer
- **Domain layer:** Use cases (application business rules), entities (enterprise business rules), repository interfaces. Has no dependencies — pure Dart/TS/Kotlin/Swift
- **Data layer:** Repository implementations, data sources (API clients, local databases), data models, mappers

**Dependency inversion in practice:** The domain layer defines a UserRepository interface. The data layer implements it with UserRepositoryImpl. The presentation layer depends on the interface, not the implementation. This enables swapping data sources (real API ↔ mock) without changing business logic.

**Use cases (interactors):** Single-responsibility classes that encapsulate one business operation. GetUserProfileUseCase fetches and transforms user data. LoginUseCase handles authentication and session management. Use cases are the most testable layer — pure functions/classes with no platform dependencies.

**Trade-offs:** Clean Architecture adds significant boilerplate for simple CRUD apps. The "right" architecture depends on complexity — a 3-screen utility app needs different architecture than a 100-screen enterprise app. Don't apply Clean Architecture unless the app is complex enough to benefit.

**Key insight:** The domain layer is the heart of Clean Architecture. If it contains no imports from any platform framework, no UI code, and no database code — just pure business logic — you've achieved the key goal. Everything else (UI frameworks, databases, APIs) becomes a swappable detail.`,
    },
    {
      id: 419,
      name: "MVVM Pattern",
      desc: `**MVVM (Model-View-ViewModel)** — an architectural pattern where the ViewModel contains the UI state and business logic, the View (component/widget) observes the ViewModel and renders state, and the Model handles data access.

**Why MVVM for mobile:** Separates UI code (Views) from business logic (ViewModels). ViewModels are pure Dart/JS/Swift/Kotlin with no UI imports — fully testable without a simulator. Views become thin: observe state, render it, dispatch user events.

**ViewModel in React Native:** Typically implemented with a custom hook (useProductViewModel) that encapsulates state (product data, loading, error), side effects (API calls), and actions (addToCart, refresh). The component calls the hook and renders the returned state.

**ViewModel in Flutter (with Riverpod):** NotifierProvider creates a Notifier class that serves as the ViewModel. The widget watches the provider and rebuilds when state changes. The Notifier contains all the business logic.

**MVVM vs BLoC:** MVVM is less opinionated about how events and state flow — a ViewModel can expose methods directly. BLoC enforces the Event → State stream pattern, adding structure at the cost of boilerplate. MVVM is more flexible; BLoC is more auditable.

**Testing ViewModels:** ViewModels are the most testable part of an MVVM app. Instantiate the ViewModel with a mock repository, call actions, assert on state. No widget rendering required — pure unit tests.

**Key insight:** The ViewModel hook pattern (useProductViewModel returning {product, isLoading, error, addToCart}) is the most pragmatic MVVM implementation for React Native. It's the same code you'd write in a component, extracted to a separate hook — low ceremony, high testability benefit.`,
    },
    {
      id: 420,
      name: "Monorepo for Mobile",
      desc: `**Monorepo for mobile** — a single repository containing multiple related packages: the mobile app, shared utilities, backend API, web app, and any shared UI components. Enables code sharing and atomic commits across the full stack.

**Turborepo for React Native:** Turborepo's build caching and parallel task execution optimize monorepo CI for JS/TS workspaces. A typical React Native monorepo has: apps/mobile (RN app), apps/web (React web), packages/api-client (generated types), packages/utils (shared business logic), packages/ui (shared React components for web).

**Nx for large monorepos:** More feature-rich than Turborepo — affected command (run tests only for changed packages), architectural enforcement (define which packages can import which), and code generation. Better for very large organizations.

**React Native Monorepo setup:** Uses yarn/npm/pnpm workspaces. Metro bundler requires configuration to resolve packages from the workspace root. Haste module system setup in metro.config.js for non-standard resolution paths.

**Shared code across mobile and web (React Native Web):** With React Native Web, components in packages/ui can render on both mobile and web. Ensure components use platform-agnostic styles and don't import native-only modules.

**Challenges:** Metro bundler's module resolution was not designed for monorepos — requires additional configuration. Symlinks in node_modules cause issues. Each new package requires Metro config updates. The developer experience is improving but still requires more setup than a single-package project.

**Key insight:** Monorepos provide the most value when you have genuine code sharing requirements (mobile + web + backend types all from one schema). For a mobile-only app, the monorepo overhead isn't justified — it adds complexity without the benefit of cross-app sharing.`,
    },
    {
      id: 421,
      name: "Feature Flags & Remote Config",
      desc: `**Feature flags** (feature toggles) enable you to deploy code to production that's disabled by default, then enable it for specific users, percentages, or conditions — decoupling deployment from release.

**Why feature flags in mobile:** Mobile releases have a review delay (1-2 days for iOS) and users don't all update immediately. Feature flags let you:
- Gradually roll out features to a percentage of users
- A/B test UI variants without separate code submissions
- Kill switches for problematic features without emergency releases
- Enable features for beta users before general availability
- Target features to specific user segments (premium users, specific markets)

**Firebase Remote Config:** Google's free feature flag and configuration service. Key-value store with JSON support, user targeting, A/B testing experiments, and instant fetch/activate lifecycle. The standard choice for React Native and Flutter apps.

**LaunchDarkly:** Enterprise-grade feature flag management. More powerful targeting rules, full audit trail, robust SDK with caching and local evaluation, and team workflow features. Worth the cost for large engineering teams.

**Implementation pattern:** Check the flag value at the usage point (not at app startup). Feature flag checks are fast (in-memory lookup after initial fetch). Wrap flags in abstraction (getFeatureFlag('new_checkout')) rather than directly referencing the flag service in UI code.

**Flag lifecycle:** Flags accumulate technical debt. Add a cleanup task for every flag you create — when the rollout is complete, remove the flag and the old code path. Accumulated flags create a combinatorial explosion of untestable code paths.

**Key insight:** "Deploy, don't release" is the feature flag mindset. Code can be in production (deployed) but invisible to users until the flag is enabled (released). This decoupling makes deployment routine and boring — exactly how it should be.`,
    },
    {
      id: 422,
      name: "Micro-Frontends on Mobile",
      desc: `**Micro-frontends on mobile** — architectural patterns for splitting large mobile apps into independently deployable, independently developed feature modules. Less mature than the web equivalent, but relevant for very large team/app combinations.

**Module federation for React Native:** Webpack Module Federation principles applied to React Native. Multiple separate RN apps/bundles that can load components from each other at runtime. Experimental, complex to set up, but enables independent team deployments.

**Native module as micro-app (super app):** The "super app" model (WeChat, Grab, Gojek) hosts mini-apps from multiple teams/companies within one shell app. Mini-apps load dynamically, run in sandboxed environments, and are independently deployed.

**Feature modules in practice:** Most "micro-frontend" needs on mobile are satisfied by well-structured feature packages in a monorepo — not runtime module loading. A Checkout feature package with its own state, components, and tests provides team independence without the complexity of runtime federation.

**Code splitting at the feature level:** React.lazy + dynamic import can split RN code at feature boundaries. The feature's code loads only when first accessed — reducing startup cost for features used by a minority of users.

**When micro-frontends are appropriate:** Apps with 20+ feature teams, each shipping independently. Super apps with third-party mini-apps. Apps requiring different tech stacks per feature. For most apps (under 5 feature teams), well-structured packages in a monorepo are a better architectural choice.

**Key insight:** Micro-frontend complexity scales faster than team count. For 10 teams, a monorepo with strong package boundaries is almost always better than runtime module federation. True micro-frontends on mobile are a solution for the top 0.1% of app complexity. Don't adopt the pattern because it sounds modern.`,
    },
    {
      id: 423,
      name: "Dependency Injection in Mobile",
      desc: `**Dependency injection (DI)** — providing objects with their dependencies from outside rather than having them create dependencies themselves. Enables testability (inject mocks), flexibility (swap implementations), and maintainability (explicit dependencies).

**DI in React Native:** React Context is the built-in DI mechanism for React components — inject services, repositories, and configuration through the component tree. For non-component code, use module-level singletons or a container library.

**tsyringe / InversifyJS:** TypeScript DI containers for React Native. Decorate classes with @injectable, define containers, and inject dependencies via constructor. Heavier than React Context but useful for complex service dependency graphs.

**Riverpod as DI (Flutter):** Riverpod is as much a DI system as a state management library. Providers define the dependency graph. ProviderScope.overrides in tests allow injecting mock implementations. Clean Architecture's repository interfaces are expressed as Riverpod providers.

**get_it (Flutter):** A simple service locator (not true DI, but achieves similar goals). Register implementations once at app startup, retrieve anywhere without context. Used for services that aren't naturally part of the widget tree.

**Mock injection in tests:** The primary benefit of DI is testability. A screen that receives its repository via constructor/provider can be tested with a MockRepository that returns controlled data. Without DI, tests must either use real network calls or monkey-patch module imports.

**Key insight:** Don't over-engineer DI. React Context for component-level dependencies, module-level singletons for services, and a test override mechanism for mocks covers 90% of mobile app DI needs without a dedicated DI container.`,
    },
    {
      id: 424,
      name: "Error Boundary & Error Handling",
      desc: `**Error boundaries** (React) and Flutter's ErrorWidget catch rendering errors and display fallback UI instead of crashing the entire app. Robust error handling is the difference between "white screen of death" and a graceful degradation.

**React Native Error Boundary:** A React class component that implements componentDidCatch() and getDerivedStateFromError(). Wraps any part of the component tree — if a rendering error occurs inside, the boundary catches it and renders fallback UI instead.

**Placement strategy:** Nest error boundaries at different granularities:
- App-level boundary: Catches catastrophic errors, shows "Something went wrong, restart the app"
- Screen-level boundary: Catches errors in a specific screen, allows other screens to still work
- Component-level boundary: For critical-path components that might fail with bad data

**React Native global error handler:** ErrorUtils.setGlobalHandler catches errors that escape error boundaries (e.g., async errors). Use to log to Sentry before re-throwing or showing an error screen.

**Flutter ErrorWidget:** Customize Flutter's default red error screen with ErrorWidget.builder = (details) => MyErrorWidget(details). Catches widget build errors.

**Flutter runZonedGuarded:** Wraps app execution in a Zone that catches all uncaught async errors. Essential for Flutter apps — async errors that aren't caught by Flutter's framework would otherwise be swallowed silently.

**Error recovery patterns:** Error boundaries should offer recovery actions — "Retry" (re-triggers the data fetch), "Go back" (navigate away from the broken screen), "Restart" (for catastrophic errors). Silent failures with no recovery path frustrate users.

**Key insight:** Add an app-level error boundary on day one. The first time your app renders undefined.map() on a production device with bad server data and crashes silently, you'll wish you had a visible error boundary showing "Something went wrong" with a retry button instead of a blank screen.`,
    },
    {
      id: 425,
      name: "Analytics Architecture",
      desc: `**Analytics architecture** determines how user behavior data flows from your mobile app to analytical systems — covering event design, implementation patterns, privacy compliance, and team workflows around data.

**Event-driven analytics model:** Every meaningful user action is an event: screen_viewed (with screen_name), button_tapped (with button_id and context), purchase_completed (with product_id, amount, currency). Each event has properties that enable segmentation and filtering.

**Analytics providers:**
- **Firebase Analytics:** Free, Google ecosystem, deep Google Ads integration, automatic event tracking (app_open, session_start, purchases)
- **Amplitude:** Product analytics focused — funnel analysis, retention cohorts, behavioral analytics. Strong product team tooling
- **Mixpanel:** Similar to Amplitude, strong query interface, good for real-time data

**Privacy-compliant analytics:** GDPR (EU) and CCPA (California) require user consent for tracking. iOS 14.5+ App Tracking Transparency requires permission to track users across apps/websites. Build consent management into your analytics pipeline — don't track until consent is granted.

**Analytics abstraction layer:** Don't call analytics SDKs directly in components. Create an analytics service (logEvent, logScreen) that the app calls. This enables: adding/removing providers without touching all call sites, mocking in tests, consent management in one place.

**Session replay and heatmaps:** Tools like Smartlook and UXCam record real user sessions (with PII masking). Heatmaps show where users tap, rage-tap (multiple rapid taps indicating frustration), and where they stop scrolling. Qualitative complement to quantitative analytics.

**Key insight:** Instrument the critical user paths (sign up, activation, purchase, churn events) first — these answer the questions that matter to the business. Comprehensive instrumentation of every button tap is noise until the critical path data is clean and actionable.`,
    },
  ],
};

export default architecturePatterns;
