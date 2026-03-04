const nativeApis = {
  name: "Native APIs & Device Features",
  icon: "📡",
  color: "#06b6d4",
  concepts: [
    {
      id: 370,
      name: "Camera & Photo Library",
      desc: `**Camera access** enables apps to capture photos and videos using the device camera. **Photo library access** reads and saves media to the user's photo roll. Both require explicit permissions and careful handling of large binary data.

**Permission model:** iOS requires NSCameraUsageDescription and NSPhotoLibraryUsageDescription in Info.plist. Android requires CAMERA and READ_EXTERNAL_STORAGE / READ_MEDIA_IMAGES permissions. Request permissions at the moment of use with context — not on app launch.

**Implementation options:**
- **expo-image-picker:** The simplest cross-platform API. Launches the system camera or photo picker UI. Returns a URI to the captured/selected media
- **react-native-camera / react-native-vision-camera:** Full camera control — continuous preview, barcode scanning, custom UI, real-time frame processing (Vision Camera V3 with frame processors)
- **image_picker (Flutter):** Official Flutter plugin for camera capture and gallery selection
- **camera (Flutter):** Low-level camera control with preview, multiple cameras, zoom, flash

**Media handling:** Camera photos can be 5-15MB. Resize and compress before upload (expo-image-manipulator, flutter_image_compress). Never upload raw camera files to a backend without processing — it causes slow uploads and high storage costs.

**Photo picker vs camera permissions:** iOS 14+ PHPickerViewController (system photo picker) lets users grant access to specific photos without giving the app full photo library access. Prefer this over full photo library permission where possible.

**Key insight:** Use the system camera/picker UI instead of building a custom camera view whenever possible. The system camera handles HDR, Live Photos, Smart HDR, Night mode, and all the complex platform camera modes automatically. Custom camera UIs miss these features and require ongoing maintenance as the OS adds new camera capabilities.`,
    },
    {
      id: 371,
      name: "Location & GPS",
      desc: `**Location services** provide the device's geographic position via GPS, Wi-Fi positioning, and cell tower triangulation. Mobile location APIs offer different accuracy levels, power consumption profiles, and permission tiers.

**iOS location permissions:**
- **When In Use (WhenInUse):** Location available only while app is in the foreground
- **Always:** Location available in background (used for fitness tracking, geofencing). Requires additional justification in App Store review
- **Provisional (iOS 13+):** Temporary precise access that expires; user must choose WhenInUse or Always later

**Android location permissions:**
- **ACCESS_COARSE_LOCATION:** City-block accuracy (~100m), uses Wi-Fi/cell
- **ACCESS_FINE_LOCATION:** GPS accuracy (~10m)
- **ACCESS_BACKGROUND_LOCATION:** Background access (requires separate, prominent disclosure)

**Accuracy vs battery:** GPS (precise) drains battery significantly. For most use cases (showing nearby restaurants, delivery tracking), Wi-Fi/cell positioning with accuracy of 100-300m is sufficient and far more power-efficient. Request the minimum accuracy your feature requires.

**Geofencing:** Trigger events when the device enters or leaves a defined geographic region. Both iOS (CLLocationManager) and Android (Geofencing API) provide background geofencing without continuous GPS — the OS monitors region boundaries efficiently.

**Real-time tracking:** Background location for ride-sharing, delivery tracking, run tracking — requires background permission justification in app review and clear user communication about why background location is needed.

**Key insight:** Most app store rejections related to location are for requesting Always permission when When In Use is sufficient. Request the minimum necessary permission. Apple scrutinizes location permission requests heavily — prepare your NSLocationAlwaysAndWhenInUseUsageDescription carefully with a genuine user benefit explanation.`,
    },
    {
      id: 372,
      name: "Biometric Authentication",
      desc: `**Biometric authentication** uses fingerprint (Touch ID, Android Fingerprint) or face recognition (Face ID, Android Face Unlock) to authenticate users, providing a fast, secure alternative to password entry.

**Implementation in React Native:** react-native-biometrics (RN) and local_auth (Flutter) provide unified biometric APIs that abstract the platform differences. Check biometric availability, request authentication, handle success/failure.

**Fallback to device passcode:** Always provide fallback to device PIN/password when biometrics aren't available (device not enrolled, biometric scan fails 3 times, Face ID obscured). The platform handles this gracefully if configured.

**What biometrics authenticate:** Biometrics prove "the device owner is present" — they verify identity locally on-device. They don't send biometric data to servers (unlike passwords). Biometric authentication should unlock a locally-stored credential (keychain item, encryption key) rather than authenticating directly with your backend.

**Secure Enclave / Keystore:** Private keys used for authentication can be stored in the device's Secure Enclave (iOS) or Android Keystore — hardware-backed secure storage. These keys can require biometric authentication before use, ensuring credentials are only accessible to authenticated device owners.

**Re-authentication flows:** For sensitive actions (payment confirmation, account deletion, viewing full card numbers), prompt biometric re-authentication even if the user is already logged in. This secondary auth confirms intent and authorization.

**Key insight:** Biometric authentication dramatically increases conversion on actions that previously required password re-entry. Payment confirmation with Face ID (0.5 seconds) vs typing a password (5-10 seconds) produces measurable conversion improvements. Implement it for any high-stakes confirmation step.`,
    },
    {
      id: 373,
      name: "Push Notifications Architecture",
      desc: `**Push notification architecture** spans four layers: your app server, platform notification services (APNs/FCM), the device OS, and your app — each with distinct responsibilities for notification delivery, handling, and user experience.

**End-to-end flow:**
1. App registers with APNs/FCM, receives device token
2. App sends device token + user ID to your backend
3. Your backend stores the token associated with the user
4. An event triggers a notification (new message, order update)
5. Backend sends notification payload to APNs/FCM with the token
6. OS delivers notification to device; user sees it in notification center
7. User taps notification; app opens at the relevant screen (via deep link in payload)

**Notification payload:** Contains title, body, badge count, sound, and custom data (notification type, entity ID for deep linking). APNs supports rich notifications (images, videos, action buttons via notification extensions).

**Notification categories (iOS):** Define interactive notification actions — "Reply," "Mark as Read," "Accept/Decline" buttons visible in the notification without opening the app. Requires registering notification categories with the OS.

**Silent push (background refresh):** APNs/FCM support "data-only" notifications that wake the app silently to process data without showing a visible notification. Used for background sync, content prefetching, badge count updates.

**Notification analytics:** Track delivery rate (sent vs delivered), open rate (notifications vs taps), and time-to-open. Most push providers (Firebase, OneSignal, Braze) provide this automatically. Low open rates signal notification fatigue — reduce volume or improve relevance.

**Key insight:** Notification relevance directly determines permission retention rate. Users who receive irrelevant notifications revoke permission. Build notification preference management from day one — let users control exactly which notification types they receive.`,
    },
    {
      id: 374,
      name: "Background Tasks & Execution",
      desc: `**Background execution** allows apps to perform work when not in the foreground — syncing data, downloading files, processing uploads, responding to push notifications. Both iOS and Android heavily restrict background execution to conserve battery.

**iOS background modes:**
- **Background Fetch:** OS wakes app periodically (every few hours, OS-controlled) to fetch content. Not guaranteed, not predictable
- **Remote Notifications:** Silent push wakes app to process notification data
- **Background Transfer (NSURLSession):** Downloads and uploads continue after app is backgrounded. Survives app termination
- **Long-running tasks (BGTaskScheduler):** App registers background task handlers; OS runs them during device idle time. Required for background sync, ML model updates

**Android background:**
- **WorkManager:** The recommended Android background work API. Guarantees execution even after app restart. Supports periodic work, constraints (require network, require charging), and chaining
- **Foreground Service:** For work requiring ongoing execution and user awareness (music playback, active navigation, file upload). Shows persistent notification
- **Background restrictions:** Android increasingly restricts background battery usage. Apps in "restricted" battery bucket get almost no background time

**Expo Task Manager / BackgroundFetch:** Unified RN API for background work. Wraps iOS BGTaskScheduler and Android WorkManager. For battery-intensive backgrounds, prefer Expo BackgroundFetch with minimum 15-minute intervals.

**Key insight:** Don't fight background execution restrictions — design around them. Use push notifications (silent push or data messages) to trigger background work rather than relying on periodic background fetch. Push is more reliable and efficient than polling.`,
    },
    {
      id: 375,
      name: "In-App Purchases & Subscriptions",
      desc: `**In-App Purchases (IAP)** enable selling digital content, features, and subscriptions within mobile apps via the App Store (StoreKit) and Google Play Billing. Both platforms take a 15-30% commission on transactions.

**IAP types:**
- **Consumable:** One-time use items (game currency, credits). Purchased repeatedly. Not restored on new device
- **Non-consumable:** Permanent purchases (unlock ad-free, premium features). Restored when user reinstalls
- **Auto-renewable subscriptions:** Recurring billing (monthly, annual). Managed by the platform (renewals, cancellations, grace periods, billing retry)
- **Non-renewing subscriptions:** Fixed duration subscriptions managed entirely by your backend

**Implementation:** react-native-iap (RN) or in_app_purchase (Flutter) wrap StoreKit 2 and Google Play Billing. For production apps, use a higher-level service (RevenueCat, Adapty) that handles receipt validation, subscription management, webhook processing, and cross-platform analytics.

**RevenueCat:** The de-facto standard subscription management platform. Validates receipts server-side, provides a unified product API across iOS and Android, handles promotional offers, winback campaigns, and provides cohort analytics. Worth the revenue share for most apps.

**Server-side receipt validation:** Never trust client-side receipt validation — it can be spoofed. Send the receipt to your backend (or RevenueCat) which validates with Apple/Google servers. Grant access only after server-side validation.

**Key insight:** Subscription economics require monitoring cancellations (churn), trial conversions, and renewal rates as closely as new user acquisition. RevenueCat's dashboard makes these metrics instantly visible without custom analytics work.`,
    },
    {
      id: 376,
      name: "Sensors & Accelerometer",
      desc: `**Device sensors** include the accelerometer (linear acceleration), gyroscope (rotational rate), magnetometer (compass), barometer (altitude), and proximity sensor (near/far). Cross-platform frameworks expose these via sensor APIs.

**Accelerometer use cases:** Shake to refresh/undo (detected by high acceleration spike), step counting (pedometer APIs use accelerometer data), game tilt controls, auto-rotate detection enhancement.

**Gyroscope:** Rotational rate around three axes. Combined with accelerometer in device motion (CoreMotion/SensorManager) for orientation tracking, AR overlays, game controls.

**Compass (magnetometer):** Heading relative to magnetic north. Used in map orientation, AR direction indicators. Subject to magnetic interference from the device and environment.

**Expo Sensors:** Provides unified React Native API for Accelerometer, Gyroscope, Magnetometer, Barometer, DeviceMotion (combines accelerometer + gyroscope for orientation in Earth coordinates), and Pedometer.

**Pedometer:** Step counting via on-device Motion Coprocessor (iOS M-series chip) or Android Step Counter sensor. Much more battery-efficient than continuous accelerometer sampling — the coprocessor handles step detection in hardware.

**Sampling rate:** Sensor sampling rates consume battery proportionally. Use the slowest acceptable rate for your use case. Pause sensor subscriptions when the app is backgrounded. On iOS, requestMotionActivityAuthorization is required for motion/fitness data.

**Key insight:** Device motion (combining accelerometer + gyroscope with device orientation correction) is far more useful than raw accelerometer data for most UI interactions. Raw accelerometer includes gravity; device motion removes gravity automatically, giving you true linear acceleration.`,
    },
    {
      id: 377,
      name: "Bluetooth & NFC",
      desc: `**Bluetooth Low Energy (BLE)** enables communication with peripheral devices (fitness trackers, IoT sensors, medical devices, beacons). **NFC** enables contactless data exchange (tap to pay, NFC tags, transit cards). Both have platform-specific APIs and permission requirements.

**BLE fundamentals:** BLE devices advertise with a UUID. Central devices (phones) scan for peripherals, connect, and discover services/characteristics. Reading/writing characteristics is how data is exchanged. Connection state management (disconnect, reconnect, background operation) is complex.

**react-native-ble-plx:** The most-used BLE library for React Native. Wraps CoreBluetooth (iOS) and Android BLE API. Manages scanning, connection, GATT service/characteristic discovery, and read/write operations.

**flutter_blue_plus:** The Flutter equivalent for BLE. Streams for scanning results, connection state, and characteristic notifications.

**iOS BLE permissions:** NSBluetoothAlwaysUsageDescription required in Info.plist. iOS 13+ requires explicit CBCentralManager authorization. Apps can scan in background mode (with background mode entitlement) for connected devices.

**NFC:** iOS NFC read (Core NFC) is available for NDEF reading; writing requires specific entitlements. Android supports full NDEF read/write and host card emulation (HCE) for payment/access card simulation. react-native-nfc-manager and nfc_manager (Flutter) provide cross-platform NFC APIs.

**Key insight:** BLE in mobile apps is significantly more complex than it appears. Connection stability across iOS and Android, reconnection logic, background operation differences, and Android BLE stack bugs (notorious on many devices) make BLE a substantial engineering investment. Budget 3-5x more time than expected for BLE integration.`,
    },
    {
      id: 378,
      name: "Haptic Feedback",
      desc: `**Haptic feedback** uses the device's vibration motor to provide tactile responses to user interactions. Done well, haptics make an app feel more physical and responsive; done poorly, they're annoying and drain battery.

**iOS Taptic Engine:** Apple's sophisticated linear actuator provides distinct tactile patterns (impact, notification, selection) at multiple intensities. Much more nuanced than traditional vibration. Core Haptics (iOS 13+) enables custom haptic patterns with arbitrary timing and intensity curves.

**iOS haptic types:**
- **Selection feedback:** Light tap for UI selection changes (slider movement, picker scroll)
- **Impact feedback:** Light/medium/heavy for tapping interactive elements
- **Notification feedback:** Success (double bump), warning (single stronger bump), error (triple bump)

**Android haptic:**
- **VibrationEffect:** Millisecond-duration vibration patterns. Less nuanced than iOS Taptic Engine
- **HapticFeedbackConstants:** Standard constants for virtual key press, keyboard tap, long press, confirm, reject

**Implementation in React Native:** Vibration API (basic), expo-haptics (Expo-quality haptics with iOS patterns), or react-native-haptic-feedback (more granular iOS haptic categories).

**Flutter:** HapticFeedback class with lightImpact, mediumImpact, heavyImpact, selectionClick, vibrate.

**When to use haptics:** Confirm completion (success haptic on form submit), warn about an error (error haptic), acknowledge selection (selection haptic on checkbox toggle, slider change). Don't haptic-ify every touch — reserve for meaningful moments.

**Key insight:** Haptics are one of the few app features that can genuinely surprise and delight users without visual complexity. A subtle success haptic on completing a payment or finishing an onboarding step elevates the emotional quality of the experience measurably. iOS haptics are significantly better than Android — invest in them for iOS.`,
    },
    {
      id: 379,
      name: "App Widgets & Extensions",
      desc: `**App Widgets** (Android) and **Widgets + App Extensions** (iOS) allow apps to show content and functionality on the home screen and lock screen without opening the app — increasing engagement and utility.

**iOS Widgets (WidgetKit):** Written in SwiftUI (not React Native or Flutter — no cross-platform support). Display static snapshots that update via timelines. Widgets cannot be interactive (except button taps with App Intents in iOS 17+). Sizes: small, medium, large, extra-large. Require a separate native build target.

**Android App Widgets:** Can be interactive (buttons, forms). Written in native Android views or Jetpack Compose. Defined in XML with RemoteViews. React Native has no official widget support — requires native Android code.

**Lock screen widgets (iOS 16+):** Small circular widgets on the iPhone lock screen. Written in SwiftUI with WidgetKit. Extremely high visibility — appear even when the device is locked.

**iOS App Extensions:** Background processes for notifications, share extension (appear in the system share sheet), document provider (files integration), custom keyboard, and more. All written in native Swift — not accessible from React Native or Flutter directly.

**Dynamic Island (iOS 16+):** Live Activities — real-time updates in the Dynamic Island and lock screen for in-progress activities (food delivery, sports scores, workout progress). Implemented via ActivityKit in native Swift. No cross-platform support.

**Key insight:** Platform widgets and extensions require native code — there's no cross-platform abstraction. Budget this as native development work. For React Native apps, consider hiring a Swift/Kotlin contractor specifically for extensions while your main team focuses on the cross-platform app.`,
    },
    {
      id: 380,
      name: "Contact & Calendar Integration",
      desc: `**Contacts integration** allows apps to read the device address book for features like friend finding, sharing contacts, and auto-filling. **Calendar integration** enables scheduling, event creation, and conflict detection directly in the system calendar.

**Contacts permission:** CNContactStore (iOS) and ContactsContract (Android) provide contact access. Full contact access requires sensitive permissions — users are increasingly reluctant to grant it. iOS 18 provides limited contact selection (similar to limited photo access).

**Contact access patterns:**
- **Find friends:** Import contacts to match against user database. Hash phone numbers/emails before sending to server for privacy
- **Contact picker:** Let user select a specific contact without granting full contact access (CNContactPickerViewController on iOS)
- **Share contact:** Show a contact card for sharing via AirDrop, Messages, or copy

**Calendar events:** EventKit (iOS) and CalendarProvider (Android) enable reading and writing calendar events. expo-calendar provides a cross-platform API for both.

**Permission best practices:** Request contacts/calendar permission at the moment the feature is needed with clear context. Explain what you'll do with the data. The permission dialog has no context — your UI must provide it before the dialog appears.

**Privacy considerations:** Contact data is highly sensitive — it reveals the user's social graph. Most platforms now require App Privacy Report disclosures when using contacts. Handle contact data with the same care as health data: encrypt in transit, don't log, honor deletion requests.

**Key insight:** Never require contacts permission for core functionality. Make it an opt-in enhancement (find friends, auto-fill). Apps that require contacts permission for sign-up see dramatically higher abandonment rates — users view contact access as an invasion of privacy for a first-run app.`,
    },
    {
      id: 381,
      name: "Health & Fitness APIs",
      desc: `**HealthKit** (iOS) and **Health Connect** (Android 14+) are centralized health data repositories storing fitness, medical, and biometric data from multiple apps. Apps can read from and write to these stores with user permission.

**HealthKit data types:** Steps, heart rate, sleep analysis, blood glucose, blood pressure, weight, workouts, mindfulness sessions, ECG readings, cycle tracking, and hundreds more. All data is stored in HKHealthStore and apps request read/write access per data type.

**HealthKit permissions:** Per-data-type authorization. Granular — an app can have read access to steps but not to blood glucose. Users control each type independently. HealthKit data cannot leave the device in plaintext — apps must protect it under their own encryption.

**Health Connect (Android):** Introduced in Android 14 as the unified health data platform (equivalent to HealthKit). Before Health Connect, Android health data was fragmented across Google Fit, Samsung Health, and other proprietary stores.

**Workout tracking:** Start/stop workout sessions (HKWorkoutSession on iOS). Record GPS route, heart rate, calories. Write workout records to HealthKit/Health Connect so they appear in the system Health app and are accessible to other health apps.

**HIPAA considerations:** If your app handles Protected Health Information (PHI) — individually identifiable health data — HIPAA compliance is required (for US). This affects data storage, transmission encryption, audit logging, and business associate agreements with cloud providers.

**Key insight:** HealthKit and Health Connect are permission-heavy but the user consent process is well-designed — users trust these APIs because Apple and Google manage the privacy model. Apps with genuine health value can access rich biometric data that users explicitly consent to share.`,
    },
  ],
};

export default nativeApis;
