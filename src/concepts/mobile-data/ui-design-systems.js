const uiDesignSystems = {
  name: "UI & Design Systems",
  icon: "🎨",
  color: "#ec4899",
  concepts: [
    {
      id: 342,
      name: "Material Design & Cupertino",
      desc: `**Material Design** (Google) and **Human Interface Guidelines (HIG)** (Apple) are the two competing design languages for mobile. Material governs Android; HIG governs iOS. Cross-platform apps must decide: single design language or platform-adaptive?

**Material Design 3 (Material You):** Google's current design spec featuring dynamic color (theming from the user's wallpaper), expressive typography, elevated components, and M3 tokens. React Native has react-native-paper; Flutter has first-class Material 3 support.

**Apple Human Interface Guidelines:** iOS design conventions — system fonts (SF Pro), bottom navigation (Tab Bar), top-back navigation pattern, no floating action buttons, swipe-from-left to go back, Share Sheet for sharing. Apps that ignore these feel "foreign" on iOS.

**Platform adaptive design:** Two strategies:
- **Single design language:** Pick one (usually Material) and apply it everywhere. Simpler, but iOS users notice the non-native patterns
- **Platform adaptive:** Render iOS-style UI on iOS, Android-style on Android. More complex but better native feel. Flutter's Cupertino library enables this; React Native's Platform.OS conditional enables it

**Safe areas:** iPhone notch/Dynamic Island and Android device insets require SafeAreaView (RN) or SafeArea (Flutter) to prevent UI from rendering under system UI. Never hardcode padding for specific device models.

**Key insight:** For B2C consumer apps, invest in platform-adaptive UI — users notice when tabs are at the top on iOS. For B2B/enterprise tools, single Material design is usually acceptable. Your choice here signals how much you care about platform citizenship.`,
    },
    {
      id: 343,
      name: "Responsive & Adaptive Layouts",
      desc: `**Responsive design** adjusts a single layout to fit different screen sizes using flexible units and media queries. **Adaptive design** provides distinct layouts for distinct breakpoints or device classes (phone vs tablet vs foldable).

**Mobile layout constraints:** Unlike web, mobile has extreme aspect ratio variation (notched phones, foldables, tablets), orientation changes (portrait/landscape), and no hover state. Layouts must work in portrait on a small phone and landscape on a large tablet.

**LayoutBuilder (Flutter):** Provides the constraints of the parent widget. Use it to switch between compact (phone) and expanded (tablet) layouts at any point in the widget tree — more granular than global screen size checks.

**Flexible and Expanded (Flutter):** In a Row/Column, Expanded fills available space along the main axis. Flexible allows a child to take up less than the available space. These are the Flexbox fill/grow concepts in Flutter terms.

**Foldables:** Android foldables (Samsung Galaxy Fold) and dual-screen devices have complex form factors — from folded (phone-size) to unfolded (tablet-size). The Window Size Classes API (large/medium/compact) provides a stable abstraction over this complexity.

**Font scaling:** Users can set system font size to "Extra Large" for accessibility. Test your layouts with the largest system font size — text that overflows its container at large scale is an accessibility failure.

**Key insight:** Build mobile UI with the smallest common screen (iPhone SE, 375x667 points) and the largest (iPad 12.9") in mind from the start. Retrofitting adaptive layouts onto a phone-only design is painful. Use LayoutBuilder/MediaQuery from day one.`,
    },
    {
      id: 344,
      name: "Design Tokens & Theming",
      desc: `**Design tokens** — named, platform-agnostic variables for design decisions: colors, typography, spacing, border radii, shadows. They create a single source of truth between designers (Figma) and engineers (code), reducing the "that's not the right blue" back-and-forth.

**Token hierarchy:**
- **Global tokens:** Raw values — colorBrand500: #6366f1
- **Semantic tokens:** Purpose-assigned — colorPrimary: colorBrand500, colorError: colorRed600
- **Component tokens:** Component-specific — buttonBackgroundPrimary: colorPrimary

**Flutter theming:** ThemeData holds the app's design system. Access via Theme.of(context). Material 3 ColorScheme provides semantic color slots (primary, secondary, tertiary, surface, onPrimary, etc.). Extend ThemeData with ThemeExtension for custom tokens.

**React Native theming:** No built-in theme system. Options: React Context (pass theme object), react-native-paper's Provider, or a custom theme hook. StyleSheet doesn't support CSS variables — themes are plain JS objects accessed via hooks.

**Figma to code:** Design token export plugins (Style Dictionary, Tokens Studio) automate the translation from Figma variables to Dart/JavaScript token files. Keeping tokens in sync between Figma and code is an ongoing maintenance challenge — design systems teams automate this via CI.

**Dark mode:** Platform dark mode (iOS/Android system setting) should be respected. Access via PlatformDispatcher.platformBrightness (Flutter) or Appearance API / useColorScheme (RN). Map semantic tokens to light/dark values — never hardcode colors.

**Key insight:** Start with semantic tokens, not global tokens. "colorPrimary" is more resilient to rebranding than "#6366f1" scattered throughout your codebase. When the brand color changes, you update one token, not 500 hex values.`,
    },
    {
      id: 345,
      name: "Accessibility in Mobile Apps",
      desc: `**Mobile accessibility** ensures your app is usable by people with visual, motor, hearing, and cognitive disabilities — using platform features like screen readers (VoiceOver on iOS, TalkBack on Android), switch control, display accommodations, and captions.

**Screen reader support:** Every interactive element needs a semantic label. Buttons, images, and icons without text labels must have accessibilityLabel (RN) or Semantics(label:) (Flutter). Custom widgets that don't map to standard controls need full accessibility semantics.

**Minimum touch target size:** Apple HIG recommends 44x44 points; Material Design recommends 48x48 dp. Small icons (16-24dp) with small tap targets cause motor accessibility failures — and also frustrate non-disabled users on small screens.

**Color contrast:** WCAG AA requires 4.5:1 contrast ratio for text and 3:1 for large text and UI components. Test your color combinations — designers often choose aesthetically pleasing low-contrast combinations that fail accessibility requirements.

**Dynamic Type / Font Scaling:** iOS Dynamic Type and Android font scale settings allow users to enlarge text. Your layout must handle enlarged text without truncation or overflow. Use relative font sizes (sp units on Android, scaledPixels in RN) rather than fixed px.

**Focus management:** When navigation occurs (screen transition, modal open), ensure focus moves to the new screen's first meaningful element. Keyboard/switch control users depend on correct focus order.

**Testing accessibility:** Use the platform's built-in accessibility inspector (Xcode Accessibility Inspector, Android Studio Accessibility Scanner) to audit your app. Enable VoiceOver/TalkBack and navigate your entire app with eyes closed.

**Key insight:** Accessibility is not a "nice to have" for most apps — it's a legal requirement in many jurisdictions (ADA, EN 301 549) for apps serving the public. Building accessibility in from the start costs 5-10% extra time; retrofitting it costs 50-100%.`,
    },
    {
      id: 346,
      name: "Gestures & Touch Interaction",
      desc: `**Mobile gestures** — the interaction vocabulary of touchscreens: tap, double-tap, long-press, swipe, pinch-to-zoom, pan, and rotate. Cross-platform frameworks provide gesture recognizers that abstract platform-specific touch event handling.

**React Native gesture system:**
- **GestureResponder System:** The low-level built-in system (onStartShouldSetResponder, etc.) — complex and rarely used directly
- **TouchableOpacity / Pressable:** Simple tap handling with visual feedback
- **React Native Gesture Handler:** The recommended library for complex gestures. Processes on the native thread (no bridge crossing for gesture detection). Provides Pan, Tap, Swipe, Pinch, Rotation, LongPress, and Fling handlers

**Flutter gesture system:**
- **GestureDetector widget:** Wraps any widget with gesture callbacks (onTap, onLongPress, onPan, etc.). Runs on the UI thread
- **Dismissible widget:** Swipe-to-dismiss built-in
- **Draggable / DragTarget:** Drag-and-drop interactions

**Gesture conflicts:** When multiple gesture recognizers compete (e.g., a swipeable card inside a horizontal scroll), gesture disambiguation is needed. React Native Gesture Handler's gesture composition API (withSequentialGestures, withSimultaneousGestures) resolves these. Flutter's GestureArena does the same.

**Haptic feedback:** Haptics elevate gesture interactions. Use HapticFeedback.selectionClick(), lightImpact(), mediumImpact() (Flutter) or ReactNativeHapticFeedback (RN) for tactile confirmation on important actions. iOS's Taptic Engine produces significantly richer feedback than Android vibration.

**Key insight:** Process gestures on the native/UI thread whenever possible (Reanimated + Gesture Handler in RN, GestureDetector in Flutter). JS-thread gesture processing creates the perceptible "lag" between finger and UI response that makes apps feel slow.`,
    },
    {
      id: 347,
      name: "Skeleton Screens & Loading States",
      desc: `**Skeleton screens** — placeholder UI that mimics the shape of the final content during loading, providing a more comfortable loading experience than a spinner by giving users a visual preview of the incoming content structure.

**Why skeleton screens beat spinners:** A spinner communicates "something is happening" with no information about what's coming. A skeleton screen says "here's roughly what you'll see" — users parse the incoming layout while data loads, reducing perceived wait time and anxiety.

**Implementation patterns:**
- **Shimmer effect:** Animated gradient sweeping across the skeleton shape, creating a "loading" visual. react-native-skeleton-placeholder and flutter_shimmer provide this
- **Static skeleton:** Muted-color boxes/lines matching content layout, no animation. Simpler, less visually distracting for short loads
- **Gradual reveal:** Fade in actual content over the skeleton as data arrives, section by section

**Loading state hierarchy:**
- Initial load (no cached data): Show skeleton screen
- Refresh (stale data visible): Show subtle refresh indicator over existing content — don't replace content with skeleton
- Background sync: No loading indicator unless it takes >2 seconds
- Error state: Replace skeleton with error UI + retry action

**Optimistic UI:** Update the UI immediately on user action without waiting for server confirmation. Show the optimistic state, then correct it if the server returns an error. Feels instant to users; requires rollback logic on failure.

**Key insight:** Match the skeleton shape to your actual content as closely as possible. Generic rectangle skeletons feel lazy and misaligned when the actual content arrives. Invest 30 minutes in accurate skeleton shapes — the improvement in perceived quality is disproportionate.`,
    },
    {
      id: 348,
      name: "Typography in Mobile",
      desc: `**Mobile typography** involves selecting typefaces, defining type scales, handling platform system fonts, and respecting user font size preferences — all within the constraints of small screens and varying pixel densities.

**System fonts:** SF Pro (iOS), Roboto (Android) are the platform default typefaces. Using system fonts is free, renders perfectly at all sizes, supports the platform's Dynamic Type/font scaling, and feels native. Loading custom fonts adds bundle size and a flash of unstyled text risk.

**Custom fonts:** Loaded via the assets system (both RN and Flutter support font asset loading). Use variable fonts (one file, multiple weights) to reduce bundle size. Subset fonts to include only the character ranges you need.

**Type scale:** A modular type scale (base size × ratio, e.g., 1.25) ensures visual hierarchy. Common mobile scales: 12, 14, 16, 20, 24, 32, 40. Map these to semantic names (bodySmall, bodyMedium, titleMedium, headlineLarge) rather than raw sizes.

**Line height & spacing:** Mobile line heights should be 1.4-1.6× the font size for body text. Too tight (1.0-1.2) makes text hard to read on small screens. Letter-spacing adjustments for small text improve legibility; negative letter-spacing for large headings tightens visual weight.

**Pixel density (points vs pixels):** iOS and Android use density-independent units (points/dp) rather than pixels. A 16pt/dp font renders visually the same size across a Retina display (2x) and a Super Retina (3x). Never hardcode pixel sizes — always use density-independent units.

**Key insight:** Respect the system font size setting. Users who set "Extra Large" font size have a real need. Apps that clip, overflow, or truncate text at large font sizes fail these users. Test every screen at the maximum system font size before shipping.`,
    },
    {
      id: 349,
      name: "Icon Systems & Assets",
      desc: `**Icon systems** in mobile apps involve choices between icon font libraries, SVG icons, raster images (PNG), and platform-native SF Symbols/Material Icons. Each has different rendering quality, bundle size, and theming implications.

**Vector vs raster:** Vector icons (SVG, icon fonts) scale perfectly to any resolution. Raster icons (PNG) need multiple resolution variants (1x, 2x, 3x for iOS; mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi for Android). Provide both resolutions or use vector icons.

**SF Symbols (iOS):** Apple's symbol library with 5000+ icons, matching the iOS system aesthetic perfectly. Available for free, supports dynamic color, multicolor, and variable weight variants. Use via Icon Widget (Flutter) or Ionicons (which mirrors SF Symbol names in RN).

**Material Symbols (Android):** Google's equivalent — 2500+ icons with filled/outlined/rounded/sharp variants and variable font technology for smooth weight transitions. First-class support in Flutter's Icon widget.

**react-native-vector-icons / flutter's Icon widget:** Wrapper packages that include icon font libraries (FontAwesome, MaterialIcons, Ionicons, etc.) as font assets. Icons render as text characters — lightweight, crisp at all sizes, easily colored via text color properties.

**App icons:** iOS requires multiple icon sizes (1024x1024 source, then App Store generates others). Android uses adaptive icons (foreground layer + background layer) that the OS masks into different shapes (circle, rounded square, squircle). Generate from a single high-res source using tools like AppIcon.co or Expo's asset generation.

**Key insight:** Use SF Symbols on iOS and Material Symbols on Android via platform-adaptive selection. The visual quality gap between platform-native icons and third-party icon fonts is visible to users — platform icons feel "right" in a way that's hard to articulate but immediately noticeable.`,
    },
    {
      id: 350,
      name: "Bottom Sheet & Modal Patterns",
      desc: `**Bottom sheet** — a surface that slides up from the bottom of the screen, used for contextual actions, filter panels, detail views, and secondary navigation. A distinctly mobile UI pattern with no direct web equivalent.

**Modal vs bottom sheet vs full-screen modal:**
- **Alert/Dialog:** For critical decisions or errors requiring immediate attention. Blocks the UI
- **Bottom Sheet:** For contextual actions, secondary content, pickers. Dismissible by swipe-down or tapping the backdrop. Partial height (peek state) or full-screen
- **Full-screen Modal:** For complex tasks requiring dedicated attention (forms, multi-step flows). Has its own navigation bar with close/cancel

**Snap points:** Bottom sheets that can "snap" to multiple height positions (25%, 50%, 90% of screen height) provide flexible content density. User can drag to expand for more content. react-native-bottom-sheet (by Gorhom) is the gold standard for RN. Flutter's DraggableScrollableSheet provides this.

**Dismissal patterns:** Swipe-down to dismiss (universal mobile pattern), tap-outside-to-dismiss (configurable), drag handle affordance (visual indicator that the sheet is interactive). Haptic feedback on snap points improves the tactile feel.

**Sheet vs navigation:** Bottom sheets should not be navigation destinations (no back button leading back to a sheet). They're overlays for contextual content. If the content warrants full navigation history, use a proper screen push instead.

**Key insight:** Bottom sheets are overused in modern apps. Not every secondary action needs a bottom sheet — a simple dropdown menu, inline expansion, or dedicated screen is often more appropriate. Reserve bottom sheets for contextual actions that don't warrant leaving the current screen.`,
    },
    {
      id: 351,
      name: "Splash Screen & App Launch",
      desc: `**Splash screen** — the full-screen image displayed from the moment a user taps the app icon until the app is ready to show its first meaningful screen. Poor splash screen implementation is one of the most visible mobile UX failures.

**The two types of splash screen:**
- **Native splash screen:** Displayed by the OS from launch while the JS/Dart runtime initializes. This is non-negotiable — users see it. Configure in iOS LaunchScreen.storyboard and Android res/drawable splash XML
- **App splash screen (animated):** A custom animated screen shown after the runtime loads, before the main content. Optional but common in consumer apps

**expo-splash-screen:** Controls when the native splash screen is hidden. Call SplashScreen.preventAutoHideAsync() to delay hiding until your app is fully initialized (fonts loaded, auth checked), then SplashScreen.hideAsync(). Without this, the splash disappears immediately while the app is still blank.

**Launch time optimization:**
- Reduce JS bundle size (code splitting, lazy loading screens not on the critical path)
- Use Hermes (pre-compiled bytecode loads faster)
- Defer non-critical initialization until after first render (analytics, crash SDK init, prefetching)
- Show meaningful content immediately — don't wait for all data before showing any UI

**App launch metrics:** Time to Interactive (TTI) and First Meaningful Paint (FMP) are the key metrics. Measure with real devices, not simulators. Android low-end devices (1-2 GB RAM) reveal launch performance issues that don't appear on development machines.

**Key insight:** The splash screen is your app's first impression. Match its background color to your app's first screen background to create a seamless transition. Nothing breaks the launch illusion like a white flash between the splash screen and the app.`,
    },
  ],
};

export default uiDesignSystems;
