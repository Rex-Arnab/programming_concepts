const testingQuality = {
  name: "Testing & Quality",
  icon: "🧪",
  color: "#a78bfa",
  concepts: [
    {
      id: 402,
      name: "Mobile Testing Strategy",
      desc: `**Mobile testing strategy** must account for device fragmentation (hundreds of Android device/OS combinations), platform-specific behaviors, sensor hardware, and real-world conditions (network variability, interruptions, phone calls) that simulators don't reproduce.

**The mobile testing pyramid:**
- **Unit tests (base):** Business logic, data transformations, utilities. Pure functions with no device dependencies. Fast, deterministic, hundreds per second
- **Component/Widget tests (middle):** Individual UI components in isolation. Render component, interact, assert on output. Fast, no real device needed
- **Integration tests (top):** Full user flows on real device or emulator. Slow, brittle, essential for real-world validation

**Simulator vs real device:** Simulators miss: GPS, Bluetooth, NFC, camera, gyroscope, barcode scanner, real network conditions, thermal throttling, and push notifications (partially). Run a subset of critical tests on real devices using AWS Device Farm, Firebase Test Lab, or BrowserStack.

**Real-device testing services:** AWS Device Farm and Firebase Test Lab run your instrumented tests on physical devices in the cloud — no device lab maintenance required. Essential for Android fragmentation coverage.

**Test automation pyramid ratio:** Aim for 70% unit, 20% component/widget, 10% integration tests. Invert this ratio and you get a slow, expensive, fragile test suite that delays releases.

**Key insight:** The biggest mobile testing gap is device fragmentation — what works perfectly on an iPhone 15 Pro and a Samsung Galaxy S24 may break on a budget Android phone with Android 9. Use Firebase Test Lab to run at least smoke tests across a device matrix before every release.`,
    },
    {
      id: 403,
      name: "Jest & Testing in React Native",
      desc: `**Jest** — the standard JavaScript testing framework for React Native. Provides the test runner, assertion library, mock system, and coverage reporting in one package. Pre-configured for React Native via the jest-preset-react-native preset.

**Testing setup:** jest-preset-react-native configures Babel transforms for React Native syntax, mocks native modules, and sets up the test environment. Add @testing-library/react-native for component testing utilities.

**React Native Testing Library (RNTL):** The recommended approach for testing React Native components. Renders components into a simulated host environment and provides utilities to query the rendered output (getByRole, getByText, getByTestId) and fire user events (fireEvent.press, fireEvent.changeText).

**User-centric queries:** Prefer getByRole and getByText over getByTestId — tests that find elements the same way a user would (by visible text, by accessibility role) are more meaningful and more resilient to implementation changes.

**Mocking native modules:** React Native's native modules aren't available in Jest's Node environment. jest.mock() replaces them with JS implementations. react-native preset auto-mocks common native modules; custom native modules need manual mocks.

**Snapshot tests:** toMatchSnapshot() captures component output and fails when it changes. Useful for detecting accidental UI regressions; brittle if used for components that change frequently. Prefer explicit assertions for components that evolve.

**Key insight:** Don't test implementation details (which hook was called, which internal state was set). Test behavior from the user's perspective: render the component, interact with it, assert on the visible output. Tests that survive refactoring without changes indicate you're testing the right things.`,
    },
    {
      id: 404,
      name: "Detox & End-to-End Testing",
      desc: `**Detox** — the grey-box end-to-end testing framework for React Native, designed specifically for the React Native execution model. Unlike Appium (black-box), Detox is integrated with the JS runtime — enabling deterministic synchronization without arbitrary sleep() calls.

**Why Detox over Appium for RN:** Detox understands React Native's asynchronous nature. It waits for the JS thread to settle, for animations to complete, and for network requests to finish before interacting with elements. This makes tests reliable without sleep(2000) hacks that make tests slow and brittle.

**Detox architecture:** Detox runs tests in Node.js using Jest, communicates with the app via a WebSocket connection to a Detox client running inside the app. Test actions (tap, type text, scroll) are sent to the Detox client, which interacts with the native UI.

**Test structure:** Describe/it blocks with Detox selectors (by.id(), by.text(), by.type()) and actions (element().tap(), element().typeText(), element().scroll()). Assertions with expect(element).toBeVisible(), toHaveText(), toBeNotVisible().

**Setup:** Detox requires a debug build of your app configured for testing (mock server, test user, cleaned state). CI configuration with detox build and detox test commands. Device/simulator provisioning for CI (iOS simulators on macOS CI machines, Android emulators on Linux).

**Flutter integration tests:** Flutter's integration_test package provides the equivalent — full app tests running on real devices, synchronized with Flutter's frame rendering.

**Key insight:** Detox tests are 10x more valuable when they cover critical user paths (login, purchase, core feature) and are run in CI on every PR. 20 well-maintained critical path tests provide more confidence than 200 poorly-maintained tests that flake on every run.`,
    },
    {
      id: 405,
      name: "Crash Reporting & Error Monitoring",
      desc: `**Crash reporting** automatically captures app crashes, errors, and exceptions in production, symbolicated back to source code — enabling engineers to diagnose and fix issues without waiting for user bug reports.

**Sentry:** The most feature-rich error monitoring platform for mobile. React Native SDK captures native crashes (iOS/Android), JavaScript errors, ANRs (Application Not Responding on Android), and performance issues. Groups related crashes, tracks release versions, and shows breadcrumbs (recent user actions before the crash).

**Firebase Crashlytics:** Google's crash reporting platform, deeply integrated with the Firebase ecosystem. Strong Android crash reporting, reliable iOS coverage. Less feature-rich than Sentry for error monitoring but excellent for crash diagnostics.

**Symbolication:** Native crashes produce memory addresses, not readable stack traces. Symbolication maps memory addresses back to Swift/Kotlin/C++ function names and line numbers using debug symbol files (.dSYM for iOS, mapping files for Android). Always upload debug symbols to your crash reporter after every build.

**Source maps for JS errors:** JavaScript stack traces from minified bundles show garbled function names. Upload Hermes source maps to your crash reporter to get readable React Native JS stack traces.

**ANR detection (Android):** Application Not Responding — the app's main thread was blocked for more than 5 seconds. Common causes: synchronous disk I/O on the main thread, deadlocks, long-running operations. Sentry and Crashlytics both detect ANRs.

**Key insight:** Configure your crash reporter on day one of the project — not after launch when you're scrambling to fix production issues. You'll ship bugs regardless of how careful you are; what matters is how quickly you detect them and how easily you can diagnose them.`,
    },
    {
      id: 406,
      name: "Visual Regression Testing",
      desc: `**Visual regression testing** captures screenshots of UI components and compares them against baseline images — detecting unintended visual changes caused by code changes, CSS updates, or dependency upgrades.

**Storybook for React Native:** Storybook lets you develop and document components in isolation, and visual testing tools can capture screenshots of each story. Harder to set up on mobile than web due to the simulator/device requirement.

**Percy (BrowserStack):** Cloud screenshot comparison service. Captures screenshots on real devices, compares against baselines, highlights diffs. Integrates with CI — PRs show visual diffs for review.

**Loki (Storybook):** Open-source visual regression tool for Storybook. Captures screenshots via a headless browser (for web Storybook) and compares against goldens.

**Flutter golden tests:** Flutter's flutter_test package supports golden file tests natively — generate PNG goldens of widget renders, compare on CI. Run platform-specific goldens (iOS vs Android renders may differ slightly).

**When visual regression testing is worth the cost:** Component-driven apps with a large design system benefit most — catching accidental style regressions in shared components before they ship. The overhead (maintaining baselines, reviewing visual diffs) is significant; only adopt if your team has UI discipline issues.

**Snapshot vs visual regression:** Snapshot tests (Jest toMatchSnapshot) capture component structure (rendered JSX). Visual regression tests capture pixels. Visual regression catches graphical bugs (wrong font weight, broken icon) that snapshot tests miss. Both have value; visual regression is higher-fidelity but more expensive.

**Key insight:** Visual regression testing is most valuable for shared component libraries where one change can break hundreds of uses. For app-specific screens, manual review combined with automated component tests often provides better ROI than maintaining screenshot baselines.`,
    },
    {
      id: 407,
      name: "Performance Testing",
      desc: `**Performance testing** verifies that your app meets its performance targets under realistic conditions — covering startup time, frame rates, memory usage, and battery consumption — before shipping to users.

**Automated performance measurement:** React Native's performance API (performance.now()), Hermes profiler, and Detox's device.setURLBlacklist / device.captureViewHierarchy can be used to measure and assert on performance metrics in automated tests.

**Startup time benchmarking:** Measure TTI (Time to Interactive) consistently by launching the app from a cold start, measuring time to first interactive screen, and comparing against a baseline. Use Android systrace or iOS Instruments App Launch template for detailed startup phase analysis.

**Frame rate monitoring:** React Native's PerformanceObserver (RN 0.72+) can collect frame timing data programmatically. Detox tests can assert on frame rates during scroll interactions.

**Memory regression testing:** Take heap snapshots before and after user flows (open screen, navigate away, repeat 10x). Assert that memory doesn't grow linearly — a growing heap indicates a memory leak.

**Battery testing:** Android's Battery Historian tool analyzes wakelocks and battery drain logs. iOS Energy Organizer in Xcode shows battery usage patterns. Hard to automate — manual testing with battery drain measurement tools is more common.

**Load testing backend dependencies:** Mobile performance depends on backend response times. Load test your API under realistic concurrent user volumes before app launch. A backend that responds in 200ms for 1 user may respond in 2000ms for 10,000 concurrent users.

**Key insight:** Include performance assertions in your CI pipeline. Assert that "startup time must be under 2 seconds on the CI device," "scrolling through 100 items must maintain 50+ fps average." Performance regressions caught in CI are infinitely cheaper than performance regressions discovered after launch.`,
    },
    {
      id: 408,
      name: "Beta Testing & TestFlight",
      desc: `**Beta testing** distributes pre-release builds to real users for feedback before public App Store/Play Store release. Platform-native tools (TestFlight, Google Play Internal Testing) are the standard distribution channels for beta builds.

**TestFlight (iOS):** Apple's official beta distribution platform. Upload builds via App Store Connect or Fastlane. Invite up to 10,000 external testers by email. Testers install the TestFlight app and get notified of new builds. 90-day build expiry. External tester groups require App Review approval (24-48 hours).

**Google Play Testing Tracks:**
- **Internal testing:** Up to 100 testers, instant publishing (no review)
- **Closed testing (Alpha):** Defined tester group, faster review than production
- **Open testing (Beta):** Anyone can join via Play Store listing, still bypasses full review

**EAS Submit:** Expo's tool for submitting React Native builds to both App Store Connect and Google Play automatically — eliminating manual upload steps in CI/CD.

**Feedback collection:** Combine TestFlight/Play testing with in-app feedback tools. TestFlight has built-in screenshot feedback. Third-party tools (Instabug, Shake) add bug report capture with logs, screenshots, and device info attached automatically.

**Release candidate process:** Release candidates (RCs) should be feature-frozen. Only bug fixes between RC and release. Run RC builds through the full QA process — manual testing of critical paths, automated test suite, performance validation.

**Key insight:** Get your TestFlight / Play Internal Testing pipeline running before your MVP is feature-complete. Having beta testers from week 1 of building catches UX issues, device-specific bugs, and crashes that your development team (testing on the same few devices) consistently misses.`,
    },
    {
      id: 409,
      name: "Accessibility Testing",
      desc: `**Accessibility testing** verifies that your app is usable by people with disabilities — covering screen reader navigation, touch target sizes, color contrast, and semantic markup. Accessibility issues that aren't tested for always ship.

**Automated accessibility audits:** @axe-core/react and eslint-plugin-jsx-a11y catch common accessibility issues at build time. React Native Testing Library's accessibility queries (getByRole, getByLabelText) encourage accessibility-correct component structure.

**Manual VoiceOver / TalkBack testing:** Enable VoiceOver (iOS: Settings → Accessibility → VoiceOver) or TalkBack (Android: Settings → Accessibility → TalkBack). Navigate your entire app using only the screen reader. Every interactive element should be reachable and its purpose should be announced clearly.

**Xcode Accessibility Inspector:** Run accessibility audits from the Xcode menu (Xcode → Open Developer Tool → Accessibility Inspector). Scans for missing labels, insufficient contrast ratios, and small touch targets. Provides specific remediation suggestions.

**Android Accessibility Scanner:** The Accessibility Scanner app from Google captures your screen and suggests improvements — missing content labels, small touch targets, low contrast.

**Color contrast checking:** Use a contrast ratio checker (WebAIM, Colour Contrast Analyser) to verify text-to-background contrast ratios. WCAG AA: 4.5:1 for normal text, 3:1 for large text. This is frequently the most common automated accessibility failure.

**Key insight:** Run VoiceOver on your entire app once per sprint. Not continuously — just once, for 30 minutes. You'll find 10-15 issues per session that automated tools miss. An app that works beautifully with VoiceOver has, by definition, excellent semantic structure — which benefits all users.`,
    },
  ],
};

export default testingQuality;
