const deviceApis = {
  name: "Device & Platform APIs",
  icon: "📡",
  color: "#84cc16",
  concepts: [
    {
      id: 1204,
      name: "Web Share API",
      desc: `**Web Share API** — allows PWAs to trigger the native OS share dialog, letting users share content (URLs, text, files) to any other app on their device (messages, email, social apps). Removes the need to implement custom share buttons per platform.

**Usage:** "navigator.share({ title: 'Check this out', text: 'Interesting article', url: 'https://example.com' }).then(() => console.log('Shared!')).catch(console.error);"

**File sharing:** "navigator.share({ files: [new File([blob], 'image.jpg', { type: 'image/jpeg' })], title: 'My Photo' });" — share files (images, documents) to native apps.

**Feature detection:** "if (navigator.canShare && navigator.canShare(data)) { /* show share button */ }" — check if the API is available AND if the specific data can be shared (file types vary by platform).

**Browser support (2026):** Chrome for Android, Safari (iOS + macOS), Edge. Not supported in desktop Firefox or desktop Chrome (limited to mobile and desktop Safari/Edge).

**Must be user-triggered:** "navigator.share()" must be called from a user gesture (click, touch) — not programmatically on page load. Throws if called without a gesture.

**Key insight:** Web Share is one of the most impactful PWA APIs for mobile apps — it gives you access to the full OS share sheet with one API call. Without it, PWAs show custom share button grids (Twitter, Facebook, WhatsApp icons) that are always incomplete. With it, users can share to any app installed on their phone, past, present, and future.`,
    },
    {
      id: 1205,
      name: "Geolocation API",
      desc: `**Geolocation API** — provides access to the user's physical location (latitude, longitude, altitude, accuracy) via GPS, WiFi triangulation, or IP geolocation. Standard web API available in all browsers (with permission).

**Usage:** "navigator.geolocation.getCurrentPosition(position => { const { latitude, longitude, accuracy } = position.coords; }, error => { /* handle PermissionDenied, PositionUnavailable, Timeout */ }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });"

**Watching position:** "const watchId = navigator.geolocation.watchPosition(handler);" — continuous updates as user moves. Stop with "navigator.geolocation.clearWatch(watchId)".

**Options:**
- "enableHighAccuracy: true" — requests GPS (slower, battery intensive) vs. WiFi/IP (faster, less accurate)
- "timeout": max ms to wait for a position
- "maximumAge": accept a cached position no older than N ms

**Permission:** user must grant location permission. Once denied, cannot re-request programmatically.

**Accuracy considerations:**
- GPS: 3-5 meters (best, outdoors, requires hardware)
- WiFi triangulation: 10-50 meters
- Cell tower: 100-1000 meters
- IP geolocation: city-level (1-50km)

**PWA consideration:** geolocation in service workers is not available (service workers have no concept of "current position"). Location logic must be in page code.

**Key insight:** Always request location at the moment it's needed (not on page load) with a clear explanation of why. "Find restaurants near me" → user understands why location is requested. Requesting on first page load → immediate deny. The context of the request is everything for permission grant rates.`,
    },
    {
      id: 1206,
      name: "Camera & Media Capture",
      desc: `**Media Capture APIs** — the browser APIs for accessing device cameras, microphones, and screen for video/audio capture. Core to photo-taking, video recording, scanning (QR, barcodes), and video calling in PWAs.

**getUserMedia:** "const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });" — accesses the device camera (environment = back camera). Returns a MediaStream for display in a "video" element.

**Capturing photos:** render camera to "video" element, draw frames to "canvas", export as Blob:
"ctx.drawImage(videoElement, 0, 0); canvas.toBlob(blob => { /* upload blob */ }, 'image/jpeg', 0.9);"

**"capture" attribute on file input:** "input type=file accept=image/* capture=environment" — on mobile, this opens the native camera directly without needing getUserMedia. Simpler but less control.

**getDisplayMedia:** "navigator.mediaDevices.getDisplayMedia({ video: true })" — screen sharing/capture. Requires user to select a screen/window.

**MediaRecorder:** records a MediaStream to a file:
"const recorder = new MediaRecorder(stream); recorder.ondataavailable = (e) => chunks.push(e.data); recorder.onstop = () => { const blob = new Blob(chunks, { type: 'video/webm' }); };"

**Image Capture API:** "const imageCapture = new ImageCapture(videoTrack); const blob = await imageCapture.takePhoto();" — take single high-res photos using advanced camera controls (flash, zoom).

**Key insight:** The combination of "getUserMedia" + "canvas" gives PWAs full photo/video capture capability — the same as native apps. The "capture" file input attribute is the 2-line shortcut for basic photo taking; use it when you don't need live preview or custom controls.`,
    },
    {
      id: 1207,
      name: "Vibration API",
      desc: `**Vibration API** — a simple API to trigger the device vibration motor from a web app. Used for haptic feedback on user interactions, notifications, and game events.

**Usage:** "navigator.vibrate(200);" — vibrate for 200ms.
"navigator.vibrate([100, 50, 100]);" — vibrate 100ms, pause 50ms, vibrate 100ms (pattern).
"navigator.vibrate(0);" — stop vibration.

**Browser support:** Chrome for Android, Firefox for Android. Not supported on iOS (Apple doesn't expose the vibration motor to web APIs).

**Use cases:** form submission confirmation, game collision feedback, notification arrival emphasis, error shake (vibrate [50, 30, 50, 30, 50] for an error pattern).

**User gesture requirement:** vibration must be triggered from a user gesture (tap, click) in most browsers. Cannot vibrate on page load.

**Accessibility consideration:** vibration can be annoying and physically discomforting for some users. Always make it optional or off by default. Check "navigator.vibrate" before calling (feature detection).

**Key insight:** Vibration is a minor enhancement, not a core PWA feature. Its lack on iOS limits cross-platform utility. Use it as a subtle polish layer for interactions (button press feedback) rather than as a primary notification mechanism. On Android, short (50-100ms) patterns feel more native than long buzzes.`,
    },
    {
      id: 1208,
      name: "Web Bluetooth API",
      desc: `**Web Bluetooth API** — allows PWAs to connect to and communicate with nearby Bluetooth Low Energy (BLE) devices directly from the browser. Enables web apps to interact with IoT devices, wearables, medical devices, and peripherals.

**Connection flow:** "const device = await navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] }); const server = await device.gatt.connect(); const service = await server.getPrimaryService('heart_rate'); const characteristic = await service.getCharacteristic('heart_rate_measurement'); await characteristic.startNotifications(); characteristic.addEventListener('characteristicvaluechanged', handler);"

**GATT protocol:** Web Bluetooth uses the GATT (Generic Attribute Profile) protocol structure: Device → GATT Server → Services → Characteristics. Each characteristic is identified by a UUID and supports read, write, or notify operations.

**Use cases:**
- Fitness wearables (heart rate monitors, step counters)
- Smart home devices (lights, locks, thermostats)
- Medical devices (glucose monitors, blood pressure cuffs)
- Industrial sensors and controllers
- Custom hardware prototypes

**Browser support:** Chrome, Edge on desktop and Android. Not supported on iOS (Apple blocks Web Bluetooth; native BLE requires WKWebView bypass). Firefox has no support.

**Security:** must be triggered by user gesture; requires HTTPS; user must explicitly select the device (no silent auto-pairing).

**Key insight:** Web Bluetooth unlocks a category of hardware interaction previously requiring native apps — configuring IoT devices, reading sensors, custom hardware interfaces. It's particularly powerful for enterprise tools (medical, industrial) where deploying native apps is costly and web distribution is preferred.`,
    },
    {
      id: 1209,
      name: "Screen Wake Lock API",
      desc: `**Screen Wake Lock API** — prevents the device screen from dimming or locking while a PWA is in use. Critical for apps where the user needs to keep viewing the screen without touching it: recipes, navigation, presentations, workout timers.

**Usage:** "const wakeLock = await navigator.wakeLock.request('screen'); // ... user taps "I'm done" wakeLock.release();"

**Automatic release:** the wake lock is automatically released when: the tab loses visibility (user switches tabs), the page goes to background, the screen is locked. You must re-acquire on "visibilitychange" to restore it:
"document.addEventListener('visibilitychange', async () => { if (document.visibilityState === 'visible') { wakeLock = await navigator.wakeLock.request('screen'); } });"

**Browser support:** Chrome, Edge, Safari 16.4+, Firefox (via flag). Good modern browser coverage.

**Battery consideration:** screen wake lock drains battery faster. Use it only when specifically needed (user started a recipe timer, started navigation, started a presentation). Provide a clear UI indicator when active and an easy way to cancel.

**Use case examples:**
- Recipe apps: screen stays on while user follows cooking steps
- Navigation/maps: screen stays on during a route
- Fitness apps: timer stays visible during workout
- Presentation/slideshow apps

**Key insight:** The Screen Wake Lock API eliminates one of the most annoying mobile UX problems — screen dimming mid-task. It's a small API with a big UX impact for specific apps. The key discipline: acquire it only for the duration of the user's active task, not indefinitely.`,
    },
    {
      id: 1210,
      name: "Badging API",
      desc: `**Badging API** — allows installed PWAs to set a badge (notification count or indicator dot) on the app icon in the OS, without showing a full notification. Provides at-a-glance status information like a native app.

**Usage:** "navigator.setAppBadge(5);" — shows badge with count "5".
"navigator.setAppBadge();" — shows badge without count (just a dot).
"navigator.clearAppBadge();" — removes badge.

**When to use:** unread message count, pending action count, new item count. Update the badge whenever the underlying count changes (on notification push, on background sync).

**Platform behavior:**
- Android: badge shown on app icon in the launcher
- Windows: badge shown in taskbar and Start menu
- macOS: badge shown in the Dock
- iOS: not supported

**Browser support:** Chrome/Edge (desktop and Android) when PWA is installed. Safari: not supported.

**Badge vs. Push notification:** badges are silent — they update without showing a notification. Appropriate for counts that update frequently (new emails) where a notification for each would be noisy. Reserve push notifications for high-priority items needing immediate attention.

**Setting from service worker:** "self.registration.setAppBadge(count);" — update the badge from a push event or background sync, even when the app isn't open.

**Key insight:** The Badging API is the difference between a PWA that feels integrated with the OS and one that feels like a pinned website. When combined with push notifications, it creates the full native app notification system: push notification for important events + badge for running count.`,
    },
    {
      id: 1211,
      name: "Network Information API",
      desc: `**Network Information API** — exposes information about the user's network connection: connection type (4g, 3g, wifi, bluetooth), effective connection type, downlink speed estimate, and round-trip time. Allows apps to adapt behavior based on network quality.

**Properties:** "const { effectiveType, downlink, rtt, saveData } = navigator.connection;"
- "effectiveType": "slow-2g" | "2g" | "3g" | "4g"
- "downlink": estimated downlink speed in Mbps
- "rtt": estimated round-trip time in ms
- "saveData": true if user has data-saver mode enabled

**Adaptive loading patterns:**
- "effectiveType === '4g'": load high-res images, autoplay video
- "effectiveType === '3g'": load medium-res images, no autoplay
- "effectiveType === 'slow-2g' || '2g'": load placeholder images, reduce data
- "saveData === true": honor user preference — serve minimal assets

**"change" event:** "navigator.connection.addEventListener('change', updateForConnectionType);" — called when network conditions change.

**Browser support:** Chrome, Edge, Opera. Not supported in Firefox (by policy — privacy concerns about fingerprinting). Safari: no support.

**Privacy concern:** Connection information can be used for fingerprinting — Firefox's decision to not implement it is a principled privacy stance. Don't over-rely on it; use it as progressive enhancement.

**Key insight:** "saveData: true" is the most actionable signal — it's an explicit user preference to minimize data usage. Always respect it: skip autoplay, load lower-res images, defer non-critical fetches. Ignoring "saveData: true" is both a user experience failure and a waste of user money on metered connections.`,
    },
    {
      id: 1212,
      name: "Web NFC",
      desc: `**Web NFC** — allows Chrome for Android PWAs to read from and write to NFC (Near Field Communication) tags. Enables interactive experiences with physical objects tagged with NFC chips.

**Reading NFC tags:** "const reader = new NDEFReader(); await reader.scan(); reader.addEventListener('reading', ({ message, serialNumber }) => { for (const record of message.records) { console.log(record.recordType, new TextDecoder().decode(record.data)); } });"

**Writing NFC tags:** "const writer = new NDEFReader(); await writer.write('Hello NFC World!');" or write structured NDEF records (URLs, contacts, custom payloads).

**Browser support:** Chrome for Android only (2026). Extremely limited — not available on iOS, desktop, or other browsers.

**Use cases:**
- Museum exhibits: tap NFC tag → PWA shows exhibit details
- Loyalty cards: tap physical card → open loyalty app
- Business cards: tap → add to contacts
- Manufacturing: tap component → view part data
- Inventory: tap shelf label → update stock count

**Permission:** user must grant "nfc" permission; only available when page is visible (foreground); HTTPS required.

**NDEF format:** NFC Data Exchange Format — the standardized data structure for NFC tag content. Records have types: "text", "url", "absolute-url", "mime", "smart-poster", "unknown".

**Key insight:** Web NFC is a niche but powerful API for apps that bridge the physical and digital worlds. Its Chrome-for-Android-only limitation restricts adoption, but for enterprise and industrial use cases (inventory management, logistics, manufacturing) where Android is the standard device, it enables web apps to replace native NFC apps entirely.`,
    },
  ],
};

export default deviceApis;
