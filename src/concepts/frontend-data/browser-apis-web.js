const browserApisWeb = {
  name: "Browser APIs & Web Platform",
  icon: "⬟",
  color: "#F97316",
  concepts: [
    { id: 143, name: "Local Storage / Session Storage", desc: "Key-value storage in the browser. localStorage persists across sessions. sessionStorage clears on tab close. Synchronous, 5–10MB limit, strings only." },
    { id: 144, name: "IndexedDB", desc: "Client-side NoSQL database. Stores large amounts of structured data including files/blobs. Async API. Used for offline-first apps. Dexie.js simplifies usage." },
    { id: 145, name: "Cookies", desc: "Small data stored by the browser, sent with every request. HttpOnly, Secure, SameSite flags. Session management, tracking. Being replaced by modern storage for most uses." },
    { id: 146, name: "Service Workers & PWA", desc: "Proxy between browser and network for offline support, push notifications, background sync. Progressive Web Apps installable on devices. Workbox simplifies caching." },
    { id: 147, name: "Intersection Observer", desc: "Detect when elements enter/exit the viewport. Lazy loading images, infinite scroll, scroll-triggered animations, analytics impressions. Efficient, no scroll listeners." },
    { id: 148, name: "Resize Observer", desc: "Watch element size changes. Responsive components without media queries. Debounced callbacks when elements resize. Foundation for container queries polyfill." },
    { id: 149, name: "Mutation Observer", desc: "Watch DOM changes: added/removed nodes, attribute changes, text changes. Used by libraries for dynamic content observation. Replaced mutation events." },
    { id: 150, name: "Web Animations API (WAAPI)", desc: "Programmatic CSS animation control in JavaScript. element.animate(). Play, pause, reverse, seek. Better performance than JS animation loops." },
    { id: 151, name: "Canvas & WebGL", desc: "Canvas: 2D drawing API for graphics, games, charts. WebGL/WebGL2: GPU-accelerated 3D rendering. Three.js, PixiJS abstract complexity." },
    { id: 152, name: "WebSocket API", desc: "Full-duplex communication. Real-time chat, live data, collaborative editing. Socket.IO for fallbacks, Partykit for serverless. ws:// and wss:// protocols." },
    { id: 153, name: "WebRTC", desc: "Peer-to-peer real-time communication: video, audio, data. No server relay needed. Used in video conferencing, screen sharing, file transfer." },
    { id: 154, name: "Geolocation API", desc: "Access user's geographic position. navigator.geolocation. Requires user permission. Used for maps, local content, location-based features." },
    { id: 155, name: "Clipboard API", desc: "Read from and write to clipboard. navigator.clipboard.writeText(). Permission-based. Copy buttons, paste handling. Replaced document.execCommand." },
    { id: 156, name: "Web Share API", desc: "Native share dialog on mobile devices. navigator.share(). Share URLs, text, files. Falls back to custom share UI on unsupported platforms." },
    { id: 157, name: "AbortController", desc: "Cancel async operations: fetch requests, event listeners, custom async tasks. const controller = new AbortController(); signal passed to fetch. Essential for cleanup." },
  ],
};
export default browserApisWeb;
