const networkingData = {
  name: "Networking & Data Persistence",
  icon: "🌐",
  color: "#84cc16",
  concepts: [
    {
      id: 392,
      name: "HTTP Clients in Mobile",
      desc: `**HTTP clients** are the libraries that handle API communication in mobile apps — managing requests, responses, headers, serialization, interceptors, and error handling. The choice of HTTP client shapes your entire API integration pattern.

**React Native HTTP options:**
- **fetch API:** Built into React Native (global fetch). Minimal, no interceptors, no retry built-in. Good for simple apps
- **axios:** Feature-rich HTTP client with interceptors, automatic JSON serialization, request/response transformation, and timeout support. The most popular choice
- **ky:** Modern fetch wrapper with retry, timeout, and hooks. Lighter than axios
- **tanstack-query / React Query:** Not an HTTP client but pairs with any of the above to add caching, background refetch, and loading states

**Flutter HTTP options:**
- **http package:** Official, simple, low-level. Good for basic REST calls
- **Dio:** Feature-rich, similar to axios — interceptors, form data, file upload/download progress, cancellation. The standard choice for production Flutter apps

**Interceptors:** Middleware for requests and responses. Common uses: inject auth headers on every request, log requests in development, handle 401 responses by refreshing tokens and retrying, show/hide loading indicator.

**Request cancellation:** Cancel in-flight requests when the user navigates away (cancels a search query mid-type, navigates away from a loading screen). Axios uses CancelToken; Dio uses CancelToken; fetch uses AbortController.

**Key insight:** Structure your HTTP client with a single instance (singleton) configured at app startup with base URL, default headers, and interceptors. Scattered per-screen API configurations make auth changes, endpoint changes, and error handling inconsistent across the app.`,
    },
    {
      id: 393,
      name: "REST API Integration Patterns",
      desc: `**REST API integration** in mobile requires structuring API calls, handling authentication, managing loading states, dealing with errors, and keeping the UI in sync with server state — patterns that separate well-architected apps from spaghetti codebases.

**Repository pattern:** Abstract API calls behind a repository interface. UI components call repository methods, not API URLs directly. Benefits: testability (mock the repository), flexibility (swap the API implementation), and maintainability (all API changes in one place).

**Error handling hierarchy:**
- **Network errors:** No connectivity, timeout. Show "Check your connection" message with retry
- **Server errors (5xx):** "Something went wrong" with retry. Log to crash reporter
- **Client errors (4xx):** 401 → refresh auth or redirect to login. 404 → show empty state. 422 → show validation errors on form fields
- **Business errors:** Custom error codes in the response body for domain-specific failures

**Pagination patterns:**
- **Offset/Limit:** page=1&limit=20. Simple but has "shifting results" problem on live feeds
- **Cursor-based:** after=last_item_id. Stable — items don't shift as new content is added. Preferred for social feeds

**Data normalization:** Flattening nested API responses into a normalized shape (entity dictionaries keyed by ID) prevents duplicate data storage and makes updates simpler. Redux Toolkit's createEntityAdapter or custom normalization.

**Optimistic updates:** Immediately update the UI with the expected result of a mutation, then reconcile with the actual server response. useOptimisticMutation (React Query) or manual cache manipulation.

**Key insight:** Define API error handling at the HTTP client layer (interceptors), not in every component. One place to handle 401 token refresh, 503 service unavailable, and network errors means one place to fix them — not 50 scattered try/catch blocks.`,
    },
    {
      id: 394,
      name: "GraphQL in Mobile",
      desc: `**GraphQL** enables mobile clients to request exactly the data fields they need, reducing over-fetching (receiving more data than needed) and under-fetching (needing multiple requests to gather related data) — problems especially impactful on constrained mobile connections.

**Apollo Client:** The dominant GraphQL client for React and React Native. Provides caching (InMemoryCache), optimistic UI, subscriptions (via WebSocket), and normalized store. Apollo's normalized cache ensures that the same object (fetched in multiple queries) is stored once and updated consistently.

**URQL:** A smaller, more modular GraphQL client. Lighter than Apollo, with exchanges (middleware) for customizing behavior. Better for apps that don't need Apollo's full feature set.

**gql.tada and Relay:** gql.tada provides end-to-end type safety for GraphQL queries from the schema. Relay (Meta's GraphQL client) is highly opinionated and high-performance, used in production at Meta, but has a steep learning curve.

**Fragment co-location:** Each component declares the data it needs in a GraphQL fragment. The parent query composes fragments from child components. Benefits: components own their data requirements, type safety per component, easily auditable.

**Subscriptions for real-time:** GraphQL subscriptions stream real-time data over WebSocket. Chat messages, live sports scores, collaborative editing — subscriptions eliminate polling. Apollo Client and URQL both support subscriptions with the graphql-ws protocol.

**Flutter GraphQL:** graphql_flutter provides the same Apollo-like experience for Dart — Client, Query, Mutation, and Subscription widgets, normalized cache.

**Key insight:** GraphQL's biggest mobile benefit is bandwidth reduction, not developer ergonomics. On a 3G connection, fetching 2KB of relevant data vs 20KB of a full REST response endpoint is a 10x network efficiency gain. Measure payload sizes before and after migrating to GraphQL.`,
    },
    {
      id: 395,
      name: "WebSockets & Real-Time",
      desc: `**WebSockets** provide a persistent, full-duplex communication channel between the app and server — enabling real-time features like chat, collaborative editing, live updates, and push without HTTP polling overhead.

**WebSocket basics:** After an HTTP upgrade handshake, the connection stays open. Both client and server can send messages at any time. Low latency (no new connection overhead), low overhead (no HTTP headers on each message), bidirectional.

**React Native WebSocket API:** Built-in WebSocket API (same as browser API). Create with new WebSocket(url), listen with onmessage/onopen/onclose/onerror, send with ws.send(). Works on both iOS and Android.

**Reconnection strategy:** WebSocket connections drop (network change, server restart, proxy timeouts). Implement automatic reconnection with exponential backoff. Libraries like reconnecting-websocket or Phoenix Socket handle this.

**Real-time state management:** WebSocket messages arrive as events and must update app state. Patterns: dispatch Redux actions from WebSocket message handlers, emit events to a pub/sub bus, or use Zustand actions from message handlers.

**Socket.IO:** Higher-level abstraction over WebSocket with automatic reconnection, room support, event namespacing, and fallback to long-polling when WebSocket isn't available. socket.io-client works in React Native.

**Supabase Realtime / Firebase:** Backend-as-a-service real-time solutions. Supabase Realtime streams Postgres change events. Firebase Realtime Database and Firestore provide document-level real-time subscriptions. Eliminates building a WebSocket server.

**Key insight:** Before building a WebSocket system, evaluate whether Server-Sent Events (SSE) suffices for your use case. SSE is unidirectional (server to client), but for read-only real-time updates (live feeds, notifications), it's simpler than full WebSocket — one HTTP connection, no special protocol.`,
    },
    {
      id: 396,
      name: "SQLite & WatermelonDB",
      desc: `**SQLite** is the built-in relational database on iOS and Android — available without any network dependency, with full SQL querying capabilities. **WatermelonDB** is a high-performance SQLite ORM for React Native and web with a reactive query API.

**expo-sqlite (React Native):** Expo's SQLite implementation for React Native. Runs SQLite in a separate thread (non-blocking), supports migrations, and provides async query execution. The go-to for structured local data in Expo apps.

**WatermelonDB:** Built on SQLite, designed for large datasets that need reactive UI updates. The key feature: Observable queries — subscribe to a query, and the UI re-renders automatically when any matching record changes. Used in Hey.com (email app) and other high-record-count apps.

**SQLDelight (Kotlin Multiplatform):** Write SQL queries in .sq files; SQLDelight generates type-safe Kotlin wrappers. Used in KMM to share database access between iOS and Android.

**When to use SQLite vs other storage:**
- **SQLite:** Relational data (messages, transactions, products), complex queries, relationships between entities, offline-first sync with large datasets
- **MMKV / AsyncStorage:** Simple key-value config, small amounts of data, no querying needed
- **Hive/Isar (Flutter):** NoSQL with Dart object persistence and excellent query performance

**Migration strategy:** Schema changes between app versions require migrations. SQLite runs migrations in a transaction — if migration fails, rollback to the previous version. WatermelonDB has a first-class migration API.

**Key insight:** WatermelonDB's reactive query model is its killer feature. Instead of manually refreshing the UI after data mutations (the common SQLite pattern), subscribe to queries and the UI updates automatically — eliminating an entire category of stale data bugs.`,
    },
    {
      id: 397,
      name: "Secure Storage & Keychain",
      desc: `**Secure storage** uses the platform's hardware-backed key storage to protect sensitive data (auth tokens, passwords, encryption keys) from unauthorized access — even if the device is compromised.

**iOS Keychain:** iOS's secure credential storage backed by the Secure Enclave (hardware). Items can be configured to:
- Require device unlock to access
- Require biometric authentication
- Sync via iCloud Keychain (or not)
- Be accessible only when device is unlocked and not after restart until unlocked

**Android Keystore:** Hardware-backed key storage on Android 6.0+. Encryption keys stored in the Keystore are non-exportable — the private key material never leaves secure hardware. Used to encrypt data stored in regular storage.

**react-native-keychain (RN):** Unified API for iOS Keychain and Android Keystore. Supports biometric-protected credentials, service-scoped storage, and multiple credential entries.

**expo-secure-store:** Expo's managed equivalent. Simpler API, sufficient for most use cases. Backed by iOS Keychain and Android EncryptedSharedPreferences.

**flutter_secure_storage:** Flutter equivalent. iOS: Keychain, Android: EncryptedSharedPreferences (wraps Android Keystore).

**What to store where:**
- **Keychain/Secure Storage:** JWT tokens, refresh tokens, passwords, API keys, encryption keys
- **AsyncStorage/MMKV (NOT secure):** User preferences, display settings, non-sensitive cached data
- **Never:** Credit card numbers, social security numbers, health records (use encrypted database or dedicated secure backends)

**Key insight:** The most common mobile security vulnerability is storing auth tokens in AsyncStorage (unencrypted, accessible if device storage is read). The fix is one line: replace AsyncStorage with react-native-keychain. This should be the default, not an afterthought.`,
    },
    {
      id: 398,
      name: "Authentication Flows",
      desc: `**Mobile authentication** encompasses JWT-based sessions, OAuth social login, biometric authentication, magic link email, and platform-native options like Sign in with Apple and Google. The right combination balances security, UX friction, and implementation complexity.

**JWT + refresh token pattern:** Short-lived access tokens (15-60 min) + long-lived refresh tokens (weeks-months). Store access token in memory (lost on app kill), refresh token in Keychain. On 401, automatically use refresh token to get new access token. On refresh failure, redirect to login.

**Social OAuth (Google, Facebook, Apple):**
- react-native-google-signin / google_sign_in (Flutter): Integrates Google's native sign-in SDK
- react-native-fbsdk-next: Facebook Login
- expo-auth-session: Generic OAuth 2.0 handler using the system browser (most secure — credentials never pass through your app)

**Sign in with Apple (mandatory on iOS):** Required by App Review when any third-party social login is offered. Provides privacy-first login with option to hide real email. Returns user identifier stable across apps from the same developer team.

**Magic link / passwordless:** Send a one-time link to the user's email. Click opens the app at the authenticated state. Expo Linking handles the deep link; your backend validates the token. Eliminates password management for both user and server.

**Token storage security:** Access tokens in memory (React state, Zustand). Refresh tokens in Keychain. Never AsyncStorage for tokens.

**Key insight:** Implement biometric authentication as a secondary layer on top of your primary auth — not a replacement for it. Face ID/Touch ID provides a fast path for returning users, while the primary auth (password, social login) handles new sessions and account recovery.`,
    },
    {
      id: 399,
      name: "File System & Downloads",
      desc: `**File system access** enables apps to read/write files, manage documents, download content, and interact with the platform's document picker — essential for productivity, offline media, and document management apps.

**expo-file-system (React Native):** Comprehensive file system API for reading, writing, copying, moving, deleting files and directories. Provides app-specific cache directory, document directory, and external storage access on Android.

**Download manager:** expo-file-system's downloadAsync downloads files to disk with progress callbacks. For large files (videos, offline maps), use Background Transfer (iOS NSURLSession background tasks) via expo-file-system's createDownloadResumable — survives app termination.

**Document picker:** expo-document-picker (RN) and file_picker (Flutter) open the system document picker, allowing users to select files from Files (iOS), Drive, Dropbox, and other document providers. Returns a URI to the selected file.

**Sharing files:** expo-sharing (RN) and share_plus (Flutter) invoke the system Share Sheet, allowing users to send files to Messages, AirDrop, email, or other apps.

**Directory structure:**
- **Cache directory:** App-managed cache; the OS may clear this under storage pressure. Suitable for downloaded media, thumbnails
- **Documents directory:** Permanent app storage; backed up via iCloud/Google Drive. Suitable for user-created documents
- **External storage (Android):** Requires runtime permission on Android 10 and below; scoped storage model on Android 11+

**Key insight:** Never assume file system paths are stable between app versions or operating system updates. Store relative paths from the app's directory root, not absolute paths. Absolute paths change (e.g., when iOS updates the app container path).`,
    },
    {
      id: 400,
      name: "Caching Strategies",
      desc: `**Caching strategies** determine how and when app data is stored locally to reduce network requests, improve perceived performance, and enable offline functionality. The right caching strategy depends on data freshness requirements and storage constraints.

**Cache invalidation strategies:**
- **Time-based (TTL):** Cache entries expire after a fixed duration (e.g., user profile: 1 hour, product catalog: 1 day). Simple, may show stale data near expiry
- **Event-based:** Cache is invalidated when a mutation occurs (update cart → invalidate cart cache). Used by React Query's invalidateQueries
- **Stale-while-revalidate:** Show cached (potentially stale) data immediately, fetch fresh data in background, update UI when fresh data arrives. Best UX for non-critical staleness

**HTTP caching:** Cache-Control headers instruct clients and CDNs how long to cache responses. max-age=3600 caches for 1 hour. no-cache validates with server before using cached response (fast if ETag matches). no-store disables caching entirely (for sensitive data).

**Image caching:** Images are the largest caching win in mobile apps. FastImage (RN) and cached_network_image (Flutter) cache images to disk with LRU eviction. Without image caching, every scroll of an image-heavy feed re-downloads images.

**Offline cache persistence:** React Query's persistQueryClient saves the query cache to AsyncStorage/MMKV between sessions. On next launch, cached data is immediately available — no loading spinner while refetching.

**Cache size management:** Unbounded caches eventually fill device storage. Set max cache sizes and implement LRU (Least Recently Used) eviction. expo-file-system.deleteAsync clears the cache directory during low-storage cleanup.

**Key insight:** The order of operations for any data fetch should be: (1) display cached data immediately, (2) trigger background network request, (3) update UI with fresh data when available. Users should never wait for network before seeing any content if any cached version exists.`,
    },
    {
      id: 401,
      name: "Background Sync & Data Integrity",
      desc: `**Background sync** enables the app to synchronize local data with the server when connectivity is restored after offline periods, ensuring data integrity across the client-server boundary.

**Sync queue pattern:** Mutations made while offline are queued in local storage (SQLite, MMKV). When connectivity is restored, the queue is processed in order. Each queue item includes the operation type, payload, timestamp, and retry count.

**Conflict resolution strategies:**
- **Last-write-wins:** The most recent timestamp wins. Simple, but can overwrite valid changes
- **Server-wins:** Server state always takes precedence. Safe but may discard valid local changes
- **Client-wins:** Local changes always apply. Risk of overwriting valid remote updates
- **Merge:** Intelligent field-level or operational-transform merging. Complex but preserves both changes (used by collaborative editors like Figma, Notion)

**Idempotent operations:** Design sync operations to be safe to retry. POST /message with an idempotency key ensures that retrying a failed request doesn't create duplicate messages. The server returns the same response if the same idempotency key is seen again.

**Sync status visibility:** Show users the sync state (synced, syncing, pending changes, conflict). Apps that silently fail to sync and lose user data are the worst-case scenario. At minimum, show a "pending sync" indicator for offline-created content.

**React Query's onlineManager:** Automatically pauses mutations and queries when offline, resumes when online. Combine with the persistQueryClient and the app has basic offline support with minimal code.

**Key insight:** Design sync protocols around idempotency from the start. If every mutation is safe to retry, background sync becomes simple: try, retry on failure, success clears queue. Without idempotency, retries create duplicate data and your sync logic becomes exponentially more complex.`,
    },
  ],
};

export default networkingData;
