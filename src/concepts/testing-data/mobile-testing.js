const mobileTesting = {
  name: "Mobile Testing",
  icon: "⟐",
  color: "#A855F7",
  concepts: [
    { id: 118, name: "Mobile Testing (Overview)", desc: "Testing native, hybrid, and mobile web apps. Unique challenges: device fragmentation, OS versions, network conditions, gestures, permissions, battery." },
    { id: 119, name: "Appium", desc: "Open-source cross-platform mobile automation. Uses WebDriver protocol. Supports iOS, Android, Flutter. Write tests in any language. Industry standard." },
    { id: 120, name: "XCUITest / Espresso", desc: "Native mobile testing frameworks. XCUITest for iOS (Swift/ObjC), Espresso for Android (Kotlin/Java). Faster and more reliable than cross-platform tools." },
    { id: 121, name: "Detox", desc: "React Native E2E testing framework. Gray-box testing with automatic synchronization. Handles animations, network, and async operations natively." },
    { id: 122, name: "Device Farm Testing", desc: "Running tests on real physical devices in the cloud. AWS Device Farm, Firebase Test Lab, BrowserStack, Sauce Labs. Catches device-specific issues." },
    { id: 123, name: "Emulator vs Simulator vs Real Device", desc: "Emulator: mimics hardware+software (Android). Simulator: mimics software only (iOS). Real device: most accurate. Use all three strategically." },
    { id: 124, name: "Network Condition Testing", desc: "Simulating 2G, 3G, 4G, offline, and flaky connections. Tests timeout handling, retry logic, offline mode, and data sync behavior." },
    { id: 125, name: "App Distribution Testing (TestFlight / Play Console)", desc: "Beta distribution to testers before public release. TestFlight (iOS), Google Play Internal/Closed Testing. Collects crash reports and feedback." },
  ],
};
export default mobileTesting;
