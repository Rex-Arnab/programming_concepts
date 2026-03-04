const navigationRouting = {
  name: "Navigation & Routing",
  icon: "🧭",
  color: "#10b981",
  concepts: [
    {
      id: 352,
      name: "Stack Navigation",
      desc: `**Stack navigation** — the fundamental mobile navigation pattern where screens are pushed onto a stack (forward navigation) and popped off (backward navigation), matching users' mental model of "going deeper" into content and "going back."

**Platform conventions:**
- **iOS:** New screens slide in from the right. Back gesture swipes from the left edge. Back button with title of the previous screen in the navigation bar
- **Android:** New screens slide up from the bottom (Material 3) or from the right (legacy). System back button or gesture (swipe from left edge or bottom) pops the stack

**Stack in React Navigation:** createNativeStackNavigator uses the platform's native navigation transition (UINavigationController on iOS, FragmentManager on Android) — more performant than the JS-animated alternative. Supports header customization, transparent headers, and per-screen gesture configuration.

**Stack in Flutter:** Navigator.push() and Navigator.pop() for imperative navigation. With go_router: GoRouter.go() replaces the stack, GoRouter.push() adds to it.

**Modal stack:** Screens can be presented as modals (covering the bottom of the screen upward) rather than pushed (sliding from the right). Used for forms, confirmations, and secondary flows that shouldn't feel like forward navigation.

**Navigation params:** Data passed to the destination screen (product ID, user object, etc.). In React Navigation, typed via TypeScript generics. In go_router, passed as path params or query params. Prefer passing IDs over full objects — the destination fetches fresh data rather than receiving stale data.

**Key insight:** Don't manage a global navigation history yourself — use the framework's navigator as the single source of truth for navigation state. Multiple imperative push/pop calls that try to manage a custom history always diverge from the framework's actual state.`,
    },
    {
      id: 353,
      name: "Tab Navigation",
      desc: `**Tab navigation** — persistent tabs (usually 3-5) that provide quick access to the app's primary sections. Tabs are always visible, maintain their own navigation stacks, and represent the top-level structure of the app.

**Platform placement conventions:**
- **iOS:** Tabs at the bottom (Tab Bar). Each tab has an icon + label. Active tab icon is filled; inactive is outlined. This is non-negotiable on iOS — top tabs feel wrong
- **Android:** Material Design supports both bottom navigation (primary) and top tabs with Material Top Tab Bar (for switching between related views within a section). Bottom navigation is preferred for 3-5 primary destinations

**State preservation:** Each tab maintains its own navigation stack independently. Switching tabs doesn't clear the other tab's navigation history. Tapping the active tab's icon scrolls to the top (iOS convention).

**Tab limits:** 3-5 tabs maximum. More than 5 primary tabs requires a different information architecture (drawer, overflow menu). Each tab should represent a genuinely distinct section with high discoverability.

**Badge counts:** Notification badges on tab icons indicate unread items (chat, notifications). Implement with care — excessive badging causes notification fatigue.

**Nested navigators:** Each tab can contain its own Stack navigator. The tab navigator wraps multiple stack navigators. This is the most common navigation structure for mobile apps (Tab Navigator containing Stack Navigators containing individual screens).

**Key insight:** The number of tabs is an information architecture decision, not a UI decision. Each tab should answer the question "what primary task does a user come to this app to accomplish?" If you need more than 5 tabs, you likely need to re-evaluate your navigation structure.`,
    },
    {
      id: 354,
      name: "Deep Linking & Universal Links",
      desc: `**Deep links** allow external URLs to open specific screens inside an app with pre-populated state. **Universal Links** (iOS) and **App Links** (Android) enable web URLs to open the app instead of a browser when the app is installed.

**URL Scheme deep links:** App registers a custom URL scheme (myapp://product/123). Any app can trigger this scheme. No validation — other apps can also trigger your scheme. Lower trust, simpler setup. Used for inter-app communication and basic deep linking.

**Universal Links (iOS) / App Links (Android):** Your domain serves an apple-app-site-association (iOS) or assetlinks.json (Android) file that cryptographically associates your domain with your app. The OS validates this, then routes matching URLs (https://myapp.com/product/123) to the app. More secure, works as web fallback when app isn't installed.

**Deferred deep links:** User clicks a link before installing the app. After installing and opening the app for the first time, the app handles the original link destination. Requires a deferred deep link provider (Branch.io, Firebase Dynamic Links) that bridges the pre-install click to the post-install session.

**Testing deep links:** Use adb am start with an intent (Android) or xcrun simctl openurl (iOS simulator) to test deep links without a real server setup. Essential for QA of notification deep links.

**go_router / Expo Router deep linking:** Both provide declarative linking configuration — define the URL structure once, and the router handles both initial launch from a URL and in-app URL navigation.

**Key insight:** Universal Links (not custom URL schemes) should be your default for marketing-driven deep links. They work seamlessly on web and mobile, validate cryptographically, and don't cause the "Open in MyApp?" confirmation dialog that custom schemes sometimes trigger.`,
    },
    {
      id: 355,
      name: "Navigation State Management",
      desc: `**Navigation state** in mobile apps represents the current stack of screens and their parameters. Managing it correctly is critical for back-button behavior, deep linking restoration, and background app resume.

**Declarative vs imperative navigation:**
- **Imperative:** Navigator.push(screen). Tell the navigator what to do. Simple, but navigation state is implicit — it's in the navigator, not in your state management layer
- **Declarative:** Navigation state is data (a list of route names + params). UI is derived from that state. Back button behavior and deep linking work correctly because state is explicit and can be restored

**URL as navigation state:** In Expo Router and go_router, the URL IS the navigation state. Bookmark it, share it, restore it — the app navigates to the exact screen from any URL. This is the gold standard for navigation state management on mobile.

**Auth-gated navigation:** Navigation guards check auth state before allowing navigation to protected screens. Common patterns: redirect to login if unauthenticated, redirect to onboarding if new user, redirect to email verification if unverified.

**Back handling:** Android's back button / back gesture should pop the navigation stack. If the user back-navigates to the root and presses back again, the app should prompt to exit. Implement custom back handlers for screens where back shouldn't navigate (confirm unsaved changes dialogs).

**Screen focus/blur events:** React Navigation's useIsFocused(), useFocusEffect(), and Flutter's RouteObserver detect when a screen gains or loses focus. Use to start/stop background work (refresh data on focus, pause video on blur).

**Key insight:** Navigation state and app state are separate concerns. Navigation state tells you "where the user is." App state tells you "what the user is looking at." Keep them decoupled — don't embed navigation logic in your business logic layer.`,
    },
    {
      id: 356,
      name: "Drawer Navigation",
      desc: `**Drawer navigation** — a panel that slides in from the side (usually left) containing navigation links, user profile info, and settings. Common in enterprise and information-dense apps; less common in modern consumer apps.

**When to use drawers:** Apps with 5+ primary sections where a bottom tab bar would be overcrowded, or apps where the navigation hierarchy is secondary to the main content area (Google Maps, Gmail on tablet). Drawers are often combined with bottom tabs — tabs for primary navigation, drawer for secondary/settings navigation.

**The hamburger menu debate:** Research shows drawer navigation has discoverability problems — users don't explore menu items they can't see. Bottom tab navigation consistently outperforms drawer navigation for task completion rates in UX studies. Use drawers for secondary navigation only.

**Persistent vs modal drawers:** On large screens (tablets), drawers can be persistent (always visible in a side column). On small phones, drawers overlay the main content as a modal (semi-transparent backdrop behind the drawer). Flutter's Scaffold.drawer handles this automatically; React Navigation's Drawer.Navigator provides both modes.

**Drawer content:** Standard drawer content: user avatar + name at top, navigation items in the middle, app version + settings at the bottom. Destructive actions (logout, delete account) at the bottom with clear visual distinction.

**Key insight:** If you're using a drawer as the primary navigation, ask whether your information architecture is right. Modern mobile UX strongly favors bottom tabs or top tabs for primary navigation. Drawers are best reserved for secondary utilities (account settings, help, app info) that don't need to be always visible.`,
    },
    {
      id: 357,
      name: "Transitions & Screen Animations",
      desc: `**Navigation transitions** — the animations that play when navigating between screens. They provide spatial context ("I went deeper," "I went back," "this is a modal"), communicate the relationship between screens, and contribute significantly to perceived app quality.

**Platform-default transitions:**
- **iOS Stack push:** Slide from right + slight scale/fade of departing screen
- **iOS Modal presentation:** Slide up from bottom
- **Android (Material 3):** Fade-through for root transitions, shared axis (horizontal, vertical, or Z) for related transitions, container transform for element-to-screen transitions

**Custom transitions in React Navigation:** Provide a custom cardStyleInterpolator (RN's JS navigator) or screenOptions.animation (native stack navigator). Native stack supports fade, slide_from_right, slide_from_bottom, and platform default.

**Hero transitions (Flutter) / Shared Element Transitions (RN):** A UI element (product image, avatar) animates from its position in the list to its position on the detail screen. In Flutter, Hero widget handles this automatically. In React Native, react-native-shared-element provides the same.

**Performance:** Complex JS-animated transitions can drop frames on lower-end devices. Prefer native stack navigator transitions (runs entirely on the native side) over JS-animated transitions for screen-to-screen navigation.

**Transition timing:** Transitions should be fast (250-350ms for pushes, 300-500ms for modals). Slow transitions feel sluggish; instant transitions feel disorienting. Match platform conventions unless intentionally differentiating.

**Key insight:** Navigation transitions are the most impactful "free" quality signal in a mobile app. Apps that use default transitions feel polished; apps that fight against platform conventions or use janky custom transitions feel amateurish. Get transitions right before adding custom animations.`,
    },
    {
      id: 358,
      name: "Tab-to-Tab Navigation & Reset",
      desc: `**Tab navigation state management** — handling the edge cases in tab navigation: double-tap to scroll to top, deep navigation within a tab, navigating programmatically between tabs, and resetting a tab's navigation stack.

**Double-tap scroll to top:** iOS convention: tapping the active tab's icon scrolls the tab's content to the top. React Navigation implements this automatically for screens using the useScrollToTop hook. Flutter requires manual implementation via ScrollController.

**Reset on tab switch:** Some apps reset a tab's stack when switching to it (stateless tabs). Others preserve stack state (stateful tabs — the default in React Navigation). Stateful tabs let users switch to the notifications tab and back without losing their deep navigation position.

**Programmatic tab switching:** Navigate to a specific tab programmatically using navigation.navigate('TabName') in React Navigation or go_router's GoRouter.go('/tab-path') in Flutter. Common use case: deep link opens a specific tab, or a notification action navigates to the notifications tab.

**Nested tab navigation:** A tab can contain its own tabs (sub-tabs or segmented control). Keep nesting to two levels maximum — deeper nesting confuses the user's mental model of where they are.

**Tab persistence with React Navigation:** tabBarButton.onPress can be overridden to add custom behavior on tab press (trigger a confirmation dialog, badge reset, analytics event).

**Key insight:** State-preserving tabs are the right default. Users build context within a tab (scrolled to a specific position, expanded a section). Destroying that context on tab switch is the mobile equivalent of refreshing the page when the user switches browser tabs.`,
    },
    {
      id: 359,
      name: "Onboarding & Auth Flows",
      desc: `**Onboarding flows** introduce new users to the app's value and collect initial setup data. **Auth flows** handle login, registration, password reset, and session management. Both require careful navigation architecture to ensure users reach the right screen at every app launch.

**Auth state machine:** On every app launch, the app checks auth state (stored token, session validity) and navigates to the appropriate root: onboarding (new user), auth (signed out), or main app (authenticated). This check should happen before the splash screen hides.

**Conditional root navigation:** React Navigation's navigation structure can conditionally render different root navigators based on auth state. When the user signs in, the navigator switches from AuthStack to MainTabNavigator — the transition is handled cleanly without explicit navigation calls.

**Onboarding best practices:**
- Show the most compelling value proposition first
- Minimize required sign-up fields (email + password minimum; add more later)
- Offer social auth (Sign in with Apple required for iOS when other social login is offered)
- Show onboarding only once (skip if user has seen it)
- Allow skipping non-critical steps

**Sign in with Apple (required):** Apple App Store guidelines require "Sign in with Apple" if your app supports any third-party sign-in (Google, Facebook, etc.). It provides privacy-protecting email relay and biometric authentication.

**Session management:** Access tokens expire; refresh tokens enable silent re-authentication. Handle 401 responses by attempting token refresh, then re-queuing failed requests. If refresh fails, redirect to login screen without losing the user's intended destination (redirect back after login).

**Key insight:** Auth flow is your app's first impression for returning users. Invest in instant, frictionless auth: biometric authentication for returning users, magic link email for new users (eliminates password frustration), and smart auto-fill support for password managers.`,
    },
  ],
};

export default navigationRouting;
