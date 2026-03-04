const deployment = {
  name: "Deployment & App Stores",
  icon: "🚀",
  color: "#3b82f6",
  concepts: [
    {
      id: 410,
      name: "App Store Submission (iOS)",
      desc: `**App Store submission** is the process of packaging, signing, uploading, and getting Apple's approval to distribute your iOS app to users worldwide. The process involves multiple layers of code signing, metadata, and review.

**App Store Connect:** Apple's developer portal for app management — uploading builds, managing app metadata, screenshots, pricing, and App Store listings. Access via Transporter, Xcode Organizer, or CI/CD automation (Fastlane, EAS Submit).

**App review process:** Apple manually reviews apps for compliance with App Store guidelines — typically 24-48 hours for initial submissions, faster for updates of existing apps. Common rejection reasons: missing privacy permission descriptions, misleading screenshots, incomplete functionality, in-app purchase issues, and guideline violations.

**Required metadata:** App name, subtitle, description, keywords, screenshots (required for iPhone 6.5" and 5.5", iPad if supported), App Privacy disclosure (data practices), age rating, support URL, and privacy policy URL (required for any app collecting user data).

**Code signing:** iOS requires cryptographic signing of all app code. Provisioning profiles associate your app ID, signing certificate, and device UDIDs. Distribution profiles are used for App Store builds; development profiles for testing. App Store Connect manages certificates; Xcode or Fastlane match automates provisioning.

**TestFlight for staging:** Upload pre-release builds to TestFlight for beta testing before App Store submission. External TestFlight builds require a lighter App Review (~1 day). Use TestFlight as your staging environment.

**Key insight:** App Store review is a fixed cost, not a variable one — it takes ~24-48 hours regardless of how large or small your update is. Plan your release schedule accounting for review time. Critical bug fixes can request expedited review via App Store Connect (typically 12-24 hours, not guaranteed).`,
    },
    {
      id: 411,
      name: "Google Play Submission",
      desc: `**Google Play submission** is typically faster and more automated than Apple's App Store review, with a faster review process and more flexible distribution tracks. However, Google Play has its own requirements and rejection patterns.

**Google Play Console:** The developer portal for Android app management. Supports internal testing, closed alpha, open beta, and production release tracks with independent versioning and staged rollouts.

**Staged rollouts:** Google Play supports percentage-based rollouts — release to 5%, monitor crash rates and ratings, then expand to 20%, 50%, 100%. Apple's App Store does not natively support staged rollouts (requires feature flags or remote config).

**Play App Signing:** Google manages the final signing key for your app, which is different from your upload key. You sign the AAB with your upload key; Google re-signs with the app signing key before distributing to devices. This provides key rotation capability if your upload key is compromised.

**Play Store requirements:**
- Target API level must meet current Google Play requirements (usually within 1 year of latest Android release)
- AAB format required for new apps (APK accepted for updates of existing apps)
- Privacy policy required for apps requesting permissions or collecting data
- Data safety section must accurately reflect data practices

**Review timeline:** Google Play review typically takes hours to a couple of days for updates to established apps. New apps may take longer. Policy violations trigger delayed review or suspension.

**Key insight:** Use Play Console's pre-launch report — Google automatically runs your APK through Firebase Test Lab on a set of real devices before production release. It catches crashes and ANRs on device configurations you haven't tested. This free automated testing is one of Play Console's most underused features.`,
    },
    {
      id: 412,
      name: "CI/CD for Mobile (Fastlane & EAS)",
      desc: `**Fastlane** is the open-source automation platform for iOS and Android build, test, and release workflows. **EAS (Expo Application Services)** is Expo's cloud-based equivalent — providing managed build, submit, and update infrastructure specifically for React Native and Expo apps.

**Fastlane lanes:** A Fastfile defines lanes — sequences of Fastlane actions (plugins). Common lanes: test (run unit + integration tests), beta (build + TestFlight upload + notify Slack), release (build + App Store submission + create GitHub release).

**Fastlane match:** Manages iOS code signing certificates and provisioning profiles in a git repository, encrypted with a passphrase. Enables any CI machine or team member to set up signing consistently. Solves the "works on my Mac but not CI" code signing problem.

**EAS Build:** Expo's cloud build service. Runs builds on managed macOS (for iOS) and Linux (for Android) workers without maintaining your own CI infrastructure. Supports all React Native apps (not just Expo) via eas.json configuration.

**EAS Submit:** Automated App Store Connect and Google Play submission from CI. Reads credentials from EAS secrets, uploads the built binary, and can submit for review. Eliminates manual upload steps.

**Bitrise / GitHub Actions for mobile:** Self-managed CI/CD alternatives. GitHub Actions has macOS runners for iOS builds (billed per minute). Bitrise provides mobile-specific workflows with hardware devices for testing.

**Key insight:** The most valuable CI/CD investment for mobile is automating TestFlight uploads. Every build that gets to testers faster means faster feedback. Configure your CI to automatically upload every main branch build to TestFlight internal testing — your QA team always has the latest build available without asking a developer.`,
    },
    {
      id: 413,
      name: "App Versioning & Release Strategy",
      desc: `**App versioning** uses two version numbers: a user-visible version string (1.2.3) and an internal build number that increments with every submitted build. Both must be managed carefully for app store compliance and user communication.

**Version number semantics:**
- **Major (1.x.x):** Breaking changes, major feature redesigns, significant platform pivots
- **Minor (x.1.x):** New features, significant improvements. Most regular releases
- **Patch (x.x.1):** Bug fixes, minor improvements, performance updates

**iOS versioning:** CFBundleShortVersionString (user-visible: "1.2.3") and CFBundleVersion (build number: "123" or "20241215.1"). Build numbers must increment monotonically per App Store Connect.

**Android versioning:** versionName (user-visible string) and versionCode (integer, must increment monotonically). Google Play rejects uploads with a versionCode lower than or equal to the current production build.

**Automating version bumps:** Fastlane's increment_version_number and increment_build_number actions. EAS's auto-increment build number in eas.json. Prevents manual version management errors.

**Release notes:** App Store and Play Store release notes directly impact update adoption rates. Specific, user-benefit-focused notes ("Added dark mode for easier reading at night") outperform generic notes ("Bug fixes and performance improvements"). Updates with specific notes see 20-30% higher adoption rates.

**Key insight:** Never ship "Bug fixes and performance improvements" as your entire release note. Users decide whether to update based on release notes. A specific, honest description of what changed builds trust and communicates the value of keeping the app updated.`,
    },
    {
      id: 414,
      name: "App Store Optimization (ASO)",
      desc: `**App Store Optimization (ASO)** — the process of improving an app's visibility and conversion rate in the App Store and Google Play through optimized metadata, screenshots, and ratings — the mobile equivalent of SEO.

**Key ASO factors:**
- **App title and subtitle:** Include primary keywords naturally. Title carries more ranking weight
- **Keywords field (iOS only):** 100 characters of comma-separated keywords. Don't repeat words from the title
- **Description (Play Store matters more for search):** Apple's App Store doesn't index the description for search; Play Store does. Include long-tail keywords naturally
- **Ratings and reviews:** Higher ratings = higher ranking. Reviews mentioning keywords improve search ranking. Respond to reviews (especially negative ones)

**Screenshots and preview video:** These are the primary conversion drivers — users decide to install based on visuals. Screenshots should tell a story, not just show features. A/B test screenshot sets (App Store supports page experiments on iOS 15+).

**App ratings prompt:** Use SKStoreReviewRequest (iOS) and ReviewManager (Android) to request ratings at the right moment — after the user achieves a goal (completes a task, finishes a workout, makes a successful purchase). Never prompt on first launch.

**Ratings management:** Negative reviews hurt conversion rates and rankings. Monitor via App Store Connect notifications. Respond professionally to negative reviews; common complaints often reveal legitimate UX issues.

**Localization:** Localizing your app store listing (not just the app) to multiple languages dramatically improves rankings in non-English markets. Even basic title and description localization for top 10 markets increases downloads significantly.

**Key insight:** Screenshots are your most impactful ASO lever. A/B test them continuously via App Store product page optimization (iOS) or Play Store experiments. Changing screenshots has caused some apps to see 40-60% improvement in install conversion rates with no code changes.`,
    },
    {
      id: 415,
      name: "Enterprise Distribution (MDM)",
      desc: `**Mobile Device Management (MDM)** is the infrastructure for distributing, managing, and securing apps on employee devices in enterprise environments — bypassing the public App Store for internal apps.

**Apple Business Manager (ABM):** Apple's enterprise program for purchasing and distributing apps and devices. Apps distributed through ABM can be pushed silently to devices without user interaction. Works with MDM solutions (Jamf, Microsoft Intune, VMware Workspace ONE).

**iOS Enterprise Distribution:** Apps signed with an Apple Developer Enterprise Program certificate can be distributed internally without App Store review. Direct install via URL. Requires a trust prompt on first install. Apple audits enterprise certificates; misuse for public distribution leads to certificate revocation.

**Android MDM:** Google's Android Enterprise program enables managed work profiles on personal devices (BYOD), fully managed corporate devices, and dedicated kiosk devices. Apps can be distributed via Managed Google Play or as APKs pushed via MDM.

**MDM capabilities:**
- Push apps silently to all enrolled devices
- Enforce security policies (screen lock, encryption, VPN)
- Remote wipe lost/stolen devices
- Restrict access to certain apps or features
- Push configuration profiles (Wi-Fi, VPN, email settings)

**TestFlight for enterprise:** Apple allows up to 10,000 TestFlight testers — sufficient for enterprise internal testing without requiring full MDM setup for beta testing.

**Key insight:** Enterprise apps for internal employee use don't need App Store submission — use Enterprise Distribution (iOS) or Managed Google Play (Android) to distribute internal tools without App Review delays. This is the right approach for HR apps, internal dashboards, and tools used only by employees.`,
    },
    {
      id: 416,
      name: "Release Rollbacks & Hotfixes",
      desc: `**Release rollbacks** undo a bad production release. **Hotfixes** are emergency patches for critical production bugs. Mobile platforms have different rollback and hotfix capabilities than web, where rollback is instant.

**OTA updates as hotfixes:** For React Native / Flutter apps with OTA update capability (EAS Update, CodePush), JavaScript-level bug fixes can be deployed as OTA updates without going through app review. This is the fastest path for hotfixing JS-level bugs in React Native.

**Google Play staged rollout rollback:** If a release is deployed as a staged rollout (e.g., 20%), you can halt the rollout or roll back to a previous version from Play Console. Google Play allows pushing a previous version's APK to "roll back."

**iOS rollback limitation:** Apple does not allow re-submitting a previous version to the App Store. You must submit a new build (with a higher build number) that reverts the changes. Expedited review can be requested for critical regressions.

**Prevention over recovery:** Staged rollouts, beta testing, and feature flags are more effective than rollback. Feature flags (Firebase Remote Config, LaunchDarkly) let you disable a buggy feature server-side without a code release.

**Hotfix branch strategy:** Maintain a hotfix branch workflow (cherry-pick fixes from main to a release branch, build from the release branch). CI pipeline for release builds should be independent from main development pipeline.

**Key insight:** The inability to instantly roll back on iOS makes prevention critical. Every significant release should go through staged rollout (Android) or extended TestFlight testing (iOS) before full production deployment. Feature flags for risky features are not optional in large production apps.`,
    },
    {
      id: 417,
      name: "Monitoring & Observability in Production",
      desc: `**Production monitoring** for mobile apps spans crash tracking, performance monitoring, user behavior analytics, and infrastructure health — providing the visibility needed to detect and diagnose issues before users file support tickets.

**The observability stack for mobile:**
- **Crash reporting:** Sentry / Firebase Crashlytics — know when the app crashes, which version, which device
- **Performance monitoring:** Sentry Performance / Firebase Performance — track startup time, network request latency, slow renders
- **Analytics:** Amplitude / Mixpanel / Firebase Analytics — understand user behavior, feature adoption, funnel conversion
- **User session replay:** Smartlook, UXCam — record anonymized user sessions to understand how real users interact with the app

**Alerting:** Configure crash rate alerts (alert when new crash rate exceeds X per hour), ANR rate alerts, and p95 response time alerts. Alerting to Slack/PagerDuty enables immediate response to production incidents.

**Feature flag observability:** Log feature flag assignments and track metrics per variant. If a feature flag increases crash rate or reduces engagement, the data should be immediately visible.

**Release health dashboard:** Track crash-free user rate, ANR rate, and user-reported issues per release version. A sudden drop in crash-free rate after a release is your primary signal to investigate.

**Key insight:** Set up your production monitoring before launch, not after the first crash. The first production crash will happen within 24 hours of launch — and you want a symbolicated stack trace and device context waiting for you, not a user complaint with no diagnostic data.`,
    },
  ],
};

export default deployment;
