const advancedEmerging = {
  name: "Advanced & Emerging",
  icon: "🔮",
  color: "#8b5cf6",
  concepts: [
    {
      id: 426,
      name: "On-Device ML & AI",
      desc: `**On-device machine learning** runs AI inference directly on the device CPU/GPU/NPU (Neural Processing Unit) rather than sending data to a server — enabling private, offline, low-latency AI features in mobile apps.

**Core ML (iOS):** Apple's on-device ML framework. Run pre-trained models (image classification, text embedding, speech recognition, object detection) efficiently on the Apple Neural Engine. Models converted to .mlmodel format. Create ML app enables training custom models without code.

**TensorFlow Lite:** Google's cross-platform on-device ML runtime. Deploy TensorFlow models quantized to TFLite format on both iOS and Android. Used for image classification, text classification, pose estimation, and more.

**MediaPipe:** Google's cross-platform ML framework optimized for real-time, device-edge inference. Hand tracking, face mesh, pose estimation, object detection — all in real-time at 30fps on mobile CPUs. Available for React Native (via Expo camera) and Flutter.

**LLMs on device (iOS 18+):** Apple Intelligence introduced on-device LLM inference on iPhone 16 Pro and M-series iPads. Private processing in the Secure Enclave with no data leaving the device. APIs for Writing Tools, Siri, and developer-accessible LLM features.

**MLKit (Firebase):** Google's mobile ML SDK with pre-built APIs for text recognition, barcode scanning, face detection, image labeling, language detection, and translation — no model management required.

**Use cases:** Real-time image filters, offline translation, voice commands without internet, personalized recommendations, document scanning, accessibility features (visual AI descriptions), health monitoring from sensor data.

**Key insight:** On-device ML is the privacy-respecting alternative to cloud AI. For features where user data is sensitive (health, financial documents, personal photos), on-device ML eliminates the server-side privacy risk entirely. The quality gap between on-device and cloud ML is narrowing rapidly.`,
    },
    {
      id: 427,
      name: "AR on Mobile (ARKit & ARCore)",
      desc: `**Augmented Reality** overlays digital content on the real world using the device camera. **ARKit** (iOS) and **ARCore** (Android) provide the platform foundations — SLAM (Simultaneous Localization and Mapping), plane detection, light estimation, and object anchoring.

**ARKit capabilities:** World tracking (tracks device position in 3D space), plane detection (finds horizontal/vertical surfaces), face tracking (tracks facial expressions with front camera), body tracking, image tracking (tracks physical images as anchors), lidar scanning (iPhone 12 Pro+, iPad Pro).

**ARCore capabilities:** World tracking, plane detection, cloud anchors (multi-user AR via shared anchor IDs), augmented images, environmental HDR lighting estimation. Supports 1 billion+ Android devices.

**React Native AR:** ViroReact (maintained) and Viro AR provide declarative AR scene graphs for React Native. Less mature ecosystem than native, but enables shared codebase AR experiences.

**Flutter AR:** ar_flutter_plugin provides a Flutter interface to ARKit (iOS) and ARCore (Android). Allows placing 3D models on surfaces, image recognition, and basic world tracking from Flutter code.

**Reality Composer / Spline (iOS):** Drag-and-drop AR content creation without code. Export .usdz or .reality files for use in ARKit experiences. Reality Composer Pro (with Xcode 15) enables interactive AR experiences with physics and behaviors.

**Practical AR use cases:** Furniture placement (IKEA), virtual try-on (glasses, makeup), navigation overlays, product visualization, educational models, game environments, QR code scanning with contextual information.

**Key insight:** AR's biggest challenge isn't the technology — it's the UX. Users need to be guided into pointing the camera at a surface, waiting for plane detection, then placing content. The first 10 seconds of an AR experience determine whether the user ever places content. Invest heavily in onboarding tutorials and loading states.`,
    },
    {
      id: 428,
      name: "React Native Skia",
      desc: `**React Native Skia** — a React Native library that gives access to the Skia Graphics Library (the same GPU-accelerated 2D graphics engine powering Flutter, Chrome, and Android) directly from JavaScript, enabling complex custom graphics, drawings, and effects at native performance.

**What Skia enables beyond React Native's standard UI:** Custom 2D drawing (paths, curves, gradients, blend modes), real-time particle systems, custom chart renderings, waveform visualizations, game-like UI effects, image filters (blur, color matrix, displacement), text on path, and SVG-like primitives — all GPU-accelerated and running on the UI thread.

**Integration with Reanimated:** Skia + Reanimated is one of the most powerful combinations in modern React Native. Shared values drive Skia canvas properties directly on the UI thread — zero JS involvement for GPU-accelerated animated graphics.

**Key components:** Canvas (the drawing surface), Path, Circle, Rect, RoundedRect, Text, Image, Shader (custom GLSL fragment shaders for effects like liquid metal, noise patterns, gradients).

**Performance model:** Skia canvas renders entirely on the GPU — no JS bridge, no React reconciliation for the canvas content. Complex animations that would crush the JS thread (particle systems, real-time wave forms) run smoothly because they're GPU operations.

**When to use:** Custom chart libraries (instead of SVG-based charting), photo editing effects, game-like interactions, signature capture, creative drawing tools, animated illustrations, and any UI where the standard View/Text components aren't expressive enough.

**Key insight:** React Native Skia is one of the most significant capability expansions for React Native since Reanimated 2. It brings Flutter's rendering capability to React Native — custom GPU-accelerated graphics with the ergonomics of declarative React components.`,
    },
    {
      id: 429,
      name: "Flutter Impeller Renderer",
      desc: `**Impeller** — Flutter's new rendering engine, replacing Skia, designed to eliminate shader compilation jank and enable consistent 60/120fps rendering. It became the default on iOS in Flutter 3.10 and Android in Flutter 3.16.

**The shader compilation jank problem:** Skia generates GPU shader programs on-the-fly the first time it encounters a new rendering operation. Shader compilation is CPU-intensive and takes 1-16ms — causing visible frame drops ("jank") on the first render of an animation or a complex widget. Users see this as a stutter on the first use of animated UI.

**How Impeller solves it:** Impeller pre-compiles all shaders at build time into Metal (iOS) or Vulkan/OpenGL (Android) shaders. By the time the app runs, all shaders are compiled — zero runtime shader compilation, zero compilation jank. The first frame of every animation is as smooth as subsequent frames.

**Impeller's rendering pipeline:** Impeller uses modern GPU APIs — Metal on iOS (directly, not via abstraction), Vulkan on Android. This enables better hardware utilization, lower GPU driver overhead, and future features like multi-threaded rendering.

**Current limitations:** Impeller's shader pre-compilation means some advanced rendering features (custom fragment shaders, certain Skia-specific effects) required migration or workarounds. Most apps see identical or better rendering quality; apps relying on advanced Skia features may need adjustment.

**Platform support:** Impeller is the default on iOS and Android in current Flutter. Flutter Web and desktop use Skia for now (Impeller web/desktop development ongoing).

**Key insight:** Impeller is why Flutter 3.10+ feels measurably smoother on iOS than earlier Flutter versions — the "jank on first animation" complaint that appeared in iOS Flutter app reviews is specifically caused by shader compilation. Impeller eliminates it entirely.`,
    },
    {
      id: 430,
      name: "Internationalization & Localization",
      desc: `**Internationalization (i18n)** is the process of designing an app to support multiple languages. **Localization (l10n)** is the process of adapting the app for a specific locale — translating strings, formatting dates/numbers/currency, and adapting layouts for RTL languages.

**React Native i18n:** react-i18next and i18n-js are the standard libraries. Store translation strings in JSON files per locale (en.json, fr.json, ar.json). Load the appropriate file based on the device locale. Use interpolation for dynamic values.

**Flutter l10n:** Flutter's official localization package (flutter_localizations + intl) generates Dart code from ARB (Application Resource Bundle) files — one .arb file per locale. Build-time generation ensures missing translations are compile-time errors, not runtime failures.

**RTL (Right-to-Left) support:** Arabic, Hebrew, Farsi, Urdu read right-to-left. The entire app layout should mirror for RTL: left-aligned text becomes right-aligned, back buttons move to the right, images may need mirroring. Flutter's Directionality widget handles RTL propagation. React Native requires wrapping with RTL support.

**Number, date, and currency formatting:** Never hardcode number formats ("1,000.00") or date formats ("MM/DD/YYYY"). Use the Intl API (RN) or the intl package (Flutter) to format based on locale — "1.000,00" in German, "2024年12月15日" in Japanese.

**Pluralization:** Different languages have different plural rules. English has two (1 item vs N items). Russian has four. Arabic has six. The intl library handles this with structured plural messages — don't handle plurals with ternary operators.

**Key insight:** Design for localization from the start, not as a retrofit. Key requirements: all user-visible strings externalized to translation files (no hardcoded English), flexible layouts (German words are 30-40% longer than English equivalents), and RTL layout support. Retrofitting any of these costs 10x more than doing them from the start.`,
    },
    {
      id: 431,
      name: "Wearables & Extensions",
      desc: `**Wearable device integration** connects your mobile app to Apple Watch (watchOS), Android Wear (Wear OS), and fitness bands — providing glanceable information and quick interactions on the user's wrist.

**Apple Watch connectivity:** WatchConnectivity framework enables message passing between iPhone app and Watch app. Background transfers and live message sending keep data synchronized. Watch apps are separate targets (SwiftUI) that the iPhone app's extension communicates with.

**Wear OS:** Android's wearable platform. Wear apps run directly on the watch (with their own process and lifecycle). Data Layer API syncs data between phone and watch. Jetpack Compose for Wear OS provides Material Design wearable-specific components.

**HealthKit / Health Connect bridge:** Watch apps can read health data (heart rate during workout) and write to HealthKit directly. The iPhone app can then query HealthKit for data the Watch recorded — the health store is the integration layer.

**React Native / Flutter limitations:** Native watchOS and Wear OS apps must be written natively (SwiftUI/Kotlin Compose). React Native and Flutter apps communicate with the watch via the WatchConnectivity/Data Layer APIs from their respective companion app extension, but the watch UI itself is always native.

**Complications (watchOS):** Glanceable widgets on the watch face. Display live data (next calendar event, weather, workout stats, step count). WidgetKit complications are updated via background transfers from the iPhone app or directly from a Watch Extension.

**Key insight:** Wearable integrations almost always require native development work even if the main app is cross-platform. Budget separately for watchOS/Wear OS development. The most impactful wearable features are usually simple: a step count complication, workout detection, or notification mirroring.`,
    },
    {
      id: 432,
      name: "CarPlay & Android Auto",
      desc: `**CarPlay** (Apple) and **Android Auto** extend compatible apps to vehicle infotainment systems, enabling navigation, audio playback, messaging, and EV charging on the car's built-in display.

**Supported app categories:** CarPlay and Android Auto only allow specific app categories in vehicles for safety: audio (music, podcasts), navigation/maps, messaging (voice-only responses), EV charging (find and pay), fueling, parking, quick food ordering. General apps are not permitted — car safety regulations prohibit complex UI in vehicles.

**CarPlay architecture:** CarPlay apps are native iOS app extensions (not React Native) that use CarPlay-specific templates (CPListTemplate, CPTabBarTemplate, CPNowPlayingTemplate). The extension communicates with your main app process for data. CarPlay drives the UI templates; you provide data.

**Android Auto:** Similar template-based model using the Android Auto API. Kotlin-based extensions. Media apps use MediaBrowserService; messaging apps use CarAppService. No custom UI — you fill in Google's templates with your data.

**React Native / Flutter CarPlay:** Native extensions are required. The main React Native or Flutter app can share data with the CarPlay/Auto extension, but the extension code is native Swift/Kotlin. Some community packages (react-native-carplay) provide thin wrappers.

**Safety requirements:** CarPlay and Android Auto APIs are designed to minimize driver distraction. Text input is restricted, lists are limited in length, and complex interactions are prevented by the framework. These constraints are non-negotiable — design your CarPlay/Auto experience around them, not against them.

**Key insight:** CarPlay and Android Auto are high-value differentiators for navigation, podcast, and music apps — users expect their apps in their car. Budget for native extension development and test on real CarPlay head units or Xcode's CarPlay Simulator, not just the simulator.`,
    },
    {
      id: 433,
      name: "Mobile Security Best Practices",
      desc: `**Mobile security** encompasses protecting user data, preventing reverse engineering, securing communication, and defending against common mobile attack vectors — OWASP Mobile Top 10 provides the threat framework.

**Certificate pinning:** Prevents man-in-the-middle attacks by refusing to connect to servers unless the SSL certificate matches a known good certificate (or public key). Implemented in OkHttp (Android), URLSession (iOS), and cross-platform with Dio/axios interceptors. Caveat: pins must be updated when certificates rotate.

**Reverse engineering protection:** Mobile apps can be decompiled. Sensitive logic (license validation, cryptographic operations) should run on the server, not in the app. React Native's JS bundle is particularly easy to read — don't put secrets in JS code.

**Jailbreak / root detection:** Jailbroken iOS and rooted Android devices bypass the OS security model. Apps handling financial transactions or sensitive health data should detect jailbreak/root and restrict functionality. React Native has react-native-jailbreak-detector; Flutter has flutter_jailbreak_detection.

**OWASP Mobile Top 10 (2024):**
1. Improper credential usage (hardcoded API keys, tokens in code)
2. Inadequate supply chain security (third-party SDK vulnerabilities)
3. Insecure authentication/authorization (no session expiry, weak tokens)
4. Insufficient input/output validation (injection vulnerabilities)
5. Insecure communication (no certificate pinning, plain HTTP)
6. Inadequate privacy controls (over-collection, improper data storage)
7. Insufficient binary protections (no obfuscation, debug builds in production)
8. Security misconfiguration (debug flags enabled, verbose error messages)
9. Insecure data storage (sensitive data in AsyncStorage, logs, backups)
10. Insufficient cryptography (weak algorithms, hardcoded keys)

**Key insight:** 90% of mobile security vulnerabilities are in the top 3 categories: hardcoded credentials, insecure storage, and insecure communication. Fix these first. A comprehensive security audit can wait; fixing "API_KEY=..." in source code cannot.`,
    },
  ],
};

export default advancedEmerging;
