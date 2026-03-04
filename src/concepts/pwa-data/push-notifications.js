const pushNotifications = {
  name: "Push Notifications",
  icon: "🔔",
  color: "#f97316",
  concepts: [
    {
      id: 1174,
      name: "Web Push Protocol",
      desc: `**Web Push Protocol** — the standardized system (RFC 8030) for sending push notifications to browsers. It involves three parties: your application server, a push service (browser-vendor-operated: FCM for Chrome, APNs for Safari), and the service worker that receives and displays the notification.

**End-to-end flow:**
1. User grants notification permission in browser
2. Browser subscribes to the push service → returns a "PushSubscription" object (endpoint URL + encryption keys)
3. App stores the subscription on your server
4. Server sends encrypted push message to the push service endpoint
5. Push service delivers to the browser (even when the app is closed)
6. Browser wakes the service worker's "push" event handler
7. Service worker displays the notification via "self.registration.showNotification()"

**Key components:**
- Push endpoint: unique URL per browser/device provided by the push service
- VAPID (Voluntary Application Server Identification): public/private key pair that identifies your server to the push service; prevents unauthorized message sending
- Message encryption: messages are encrypted end-to-end using the keys in the PushSubscription

**Libraries:** web-push (Node.js) handles VAPID signing and message encryption for you. "webpush.sendNotification(subscription, JSON.stringify(payload), options);"

**Key insight:** Web Push is browser-vendor-agnostic by spec — but Chrome routes through Google's FCM servers and Safari through APNs. Your VAPID keys identify your server; the push service verifies them before delivering. This architecture means push messages always transit through a third-party — design your payloads accordingly (keep them small, don't include sensitive data).`,
    },
    {
      id: 1175,
      name: "Notification Permission",
      desc: `**Notification Permission** — the browser permission gate that users must grant before your app can display notifications or subscribe to push. Getting permission UX right dramatically affects opt-in rates.

**Requesting permission:** "const result = await Notification.requestPermission();" — returns "granted", "denied", or "default". "denied" means the user blocked notifications; you cannot request again.

**Permission states:**
- "default": never asked; can prompt
- "granted": user approved; can show notifications and subscribe to push
- "denied": user blocked; cannot show or re-prompt — send users to browser settings to re-enable

**UX best practices:**
- Never ask on page load ("permission spam" → 90% deny rate)
- Ask only after the user has demonstrated intent (opted into a newsletter, started a live event)
- Explain the value before requesting: "Get notified when your order ships" → [Allow Notifications] button
- Use a pre-permission prompt (custom UI explaining the benefit) before triggering the browser's native prompt — lets you filter out uninterested users without burning the native prompt

**Notification permission vs. push subscription:** granting notification permission is separate from subscribing to push. Users can grant permission but you still need to call "registration.pushManager.subscribe()" to get an endpoint.

**Key insight:** Notification permission is a one-shot opportunity — once denied, you cannot re-prompt programmatically. The industry average opt-in rate is 5-15% for immediate prompts; context-driven prompts can reach 30-50%. Never waste the prompt on a cold, first-time visitor.`,
    },
    {
      id: 1176,
      name: "Push Subscription & VAPID",
      desc: `**Push Subscription** — the browser-generated object containing the push endpoint URL and encryption keys needed to send a push message to a specific user's browser. VAPID (Voluntary Application Server Identification) is the protocol for authenticating your server to the push service.

**Creating a subscription:**
"const sub = await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) });"
- "userVisibleOnly: true" — Chrome requires push to always show a visible notification (no silent background push in Chrome without notification)
- "applicationServerKey" — your VAPID public key; binds the subscription to your server

**Subscription object:**
- "sub.endpoint" — the push service URL (unique per user/device/browser)
- "sub.getKey('p256dh')" — user's encryption public key
- "sub.getKey('auth')" — authentication secret

**VAPID keys:** generate once with "npx web-push generate-vapid-keys". Private key stays on your server; public key is shipped to the client. VAPID headers sign your push request, proving to the push service that the request comes from your server.

**Subscription storage:** store the full subscription JSON ("JSON.stringify(sub)") in your database associated with the user. Subscriptions expire or become invalid (user uninstalls app, clears site data) — implement endpoint validation and deletion of invalid subscriptions.

**Key insight:** Treat push subscriptions like sensitive user data — they're persistent, user-specific identifiers. Link them to your user accounts securely. Implement subscription re-registration logic when "pushManager.getSubscription()" returns null (subscription expired or cleared).`,
    },
    {
      id: 1177,
      name: "Push Event Handler",
      desc: `**Push event handler** — the service worker event listener that fires when a push message arrives from the push service. Since the service worker handles it (not the page), notifications can appear even when the app is closed or the user isn't actively using the device.

**Basic handler:**
"self.addEventListener('push', event => { const data = event.data.json(); event.waitUntil( self.registration.showNotification(data.title, { body: data.body, icon: '/icon-192.png', badge: '/badge-72.png', data: { url: data.url } }) ); });"

**"event.waitUntil()":** extends the push event until the promise resolves. Chrome will terminate the service worker if it doesn't show a notification within the push event — "userVisibleOnly: true" enforces this.

**Notification options:**
- "icon": 192x192 app icon shown in the notification
- "badge": 72x72 monochrome icon shown in notification tray (Android)
- "image": larger image shown in expanded notification
- "actions": up to 2 buttons (e.g., "View", "Dismiss")
- "tag": groups notifications with the same tag (new notification replaces old)
- "requireInteraction": keeps notification visible until user interacts (desktop)
- "vibrate": vibration pattern array (mobile)

**"data" field:** pass arbitrary data in the notification; retrieved in the "notificationclick" handler via "event.notification.data".

**Key insight:** Always show a meaningful notification in the push event. Chrome actively monitors PWAs for "empty" push messages that don't show notifications — repeatedly doing so can result in the push subscription being silently revoked. The "no silent push" limitation is a user privacy and battery protection measure.`,
    },
    {
      id: 1178,
      name: "Notification Click & Deep Linking",
      desc: `**notificationclick event** — fires in the service worker when the user clicks a notification or a notification action button. The handler is responsible for: dismissing the notification, opening the correct page, and focusing an already-open tab if one exists.

**Handler pattern:**
"self.addEventListener('notificationclick', event => { event.notification.close(); const url = event.notification.data.url; event.waitUntil( clients.matchAll({ type: 'window' }).then(clientList => { for (const client of clientList) { if (client.url === url && 'focus' in client) return client.focus(); } return clients.openWindow(url); }) ); });"

This pattern: closes the notification, checks if the target URL is already open in a tab (and focuses it), or opens a new window.

**Action buttons:** "event.action" contains the clicked action ID:
"if (event.action === 'reply') { /* open reply UI */ } else { /* default click */ }"

**Deep linking:** the "data.url" can be any URL in your app — link directly to the relevant content (specific order, new message, offer page). Deep linking turns notifications from interruptions into contextual shortcuts.

**Tracking:** append UTM parameters to the URL for analytics: "data.url = '/order/123?utm_source=push&utm_medium=notification'". Track notification → conversion rates to measure engagement effectiveness.

**Key insight:** The notificationclick handler is your opportunity to take the user exactly where they need to go. A notification that opens the home page instead of the relevant content is a wasted touchpoint. Invest in deep link routing — it's what separates professional push implementations from amateur ones.`,
    },
    {
      id: 1179,
      name: "Push Notification Best Practices",
      desc: `**Push notification best practices** — the UX and technical principles that determine whether push notifications drive engagement or drive users to revoke permission. The difference between a useful notification system and spam is permission respect, relevance, and timing.

**Content principles:**
- **Relevance:** only send notifications the user cares about (order updates, direct messages, personalized alerts — not promotional spam)
- **Timeliness:** send when the event happens, not batched hours later
- **Actionable:** every notification should have a clear next action
- **Short:** title < 50 characters, body < 100 characters (longer is truncated on most devices)

**Frequency:** more is not better. High-frequency irrelevant notifications → permission revocation. Measure notification → click-through rates and unsubscribe rates by category.

**Segmentation:** don't blast all users with every notification. Segment by user preferences, behavior, and timezone (don't notify at 3am).

**Opt-out management:** provide granular per-category opt-out within your app (not just browser-level revocation). "Notify me about: [x] Orders  [ ] Promotions  [x] Messages" — users who can tune notifications are more likely to keep them on.

**Handling notification failure:** push endpoints go stale. Implement server-side handling for 410 Gone responses from push services (delete the subscription) and 429 Too Many Requests (exponential backoff).

**Key insight:** Push notification abuse is the fastest way to destroy user trust. Industry data: 60% of users who enable push notifications disable them within 3 months. The leaders in push (airlines, delivery apps) keep rates above 50% retention by sending only high-value, timely, personalized messages.`,
    },
    {
      id: 1180,
      name: "iOS PWA Notifications (iOS 16.4+)",
      desc: `**iOS PWA Push Notifications** — Apple added Web Push support for installed PWAs in iOS 16.4 (released March 2023), bringing parity with Android for the first time. However, iOS PWA push has significant restrictions compared to Android.

**Requirements for iOS push:**
- PWA must be installed to home screen (push is unavailable in Safari browser tabs)
- User must grant notification permission after installation
- Standard Web Push API with VAPID
- Must show a visible notification (no silent push)

**iOS limitations vs Android:**
- Push only works when app is installed — no browser-tab push
- Cannot use "actions" in notifications (no action buttons on iOS)
- "badge" count not supported
- Background sync still not supported (2026)
- Periodic Background Sync: not supported
- Web Share Target: not supported

**Checking if installed on iOS:** "window.navigator.standalone === true" — true when running as installed PWA (not in Safari browser tab). Use to gate push subscription requests.

**Historical context:** before iOS 16.4, iOS was the largest holdout against PWA capabilities — no push, no background sync, no install prompt. iOS 16.4+ changed this fundamentally, though iOS still lags Android in PWA API surface.

**Key insight:** With iOS 16.4+, you can build a unified push strategy for both iOS and Android — but you must still account for the install requirement. On iOS, push is a post-install feature, not a feature that drives installation. Design your iOS onboarding to get users to install first.`,
    },
  ],
};

export default pushNotifications;
