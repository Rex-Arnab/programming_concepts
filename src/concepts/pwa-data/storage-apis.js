const storageApis = {
  name: "Storage & Data APIs",
  icon: "🗄️",
  color: "#06b6d4",
  concepts: [
    {
      id: 1197,
      name: "IndexedDB",
      desc: `**IndexedDB** — a low-level, transactional, key-value database built into browsers, capable of storing structured data (JS objects, files, blobs) in large quantities. The primary client-side database for PWAs needing offline data persistence.

**Key characteristics:**
- Asynchronous: all operations are async (Promises or event callbacks); never blocks the main thread
- Transactional: ACID transactions; reads and writes within a transaction are atomic
- Structured data: store JS objects, TypedArrays, Blobs, Files — not just strings
- Large storage: quota typically up to 50% of disk space (vs. localStorage's 5MB)
- Indexes: create secondary indexes for efficient querying by non-key fields
- Same-origin: scoped to origin; inaccessible from other origins

**API complexity:** the raw IndexedDB API is notoriously verbose (event-based, no async/await natively). Use wrappers:
- **"idb" library (Jake Archibald):** Promises + async/await wrapper around IndexedDB — minimal, battle-tested
- **Dexie.js:** higher-level ORM-like API with queries, relationships, and migration management
- **PouchDB:** CouchDB-compatible, built-in sync protocol for offline-first apps

**Common use cases:** offline data for todo/notes apps, product catalog cache, form drafts, user preferences, offline media library.

**Object stores and indexes:** "db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true }); store.createIndex('status', 'status', { unique: false });" — enables "db.transaction('todos').store.index('status').getAll('pending')".

**Key insight:** Don't fight IndexedDB's complexity with raw event-based code — that path leads to callback hell. Use "idb" (2KB) for simple cases or Dexie (30KB) for complex querying. The abstraction cost is minimal; the maintainability gain is enormous.`,
    },
    {
      id: 1198,
      name: "localStorage & sessionStorage",
      desc: `**localStorage & sessionStorage** — simple synchronous key-value stores (strings only) built into browsers. Familiar and easy to use, but have significant limitations that make them unsuitable for PWA data storage beyond preferences and tiny state.

**localStorage:**
- Persists until explicitly cleared (survives tab/window/browser restarts)
- 5-10MB quota (browser-dependent)
- Synchronous: "localStorage.setItem()" blocks the main thread
- Same-origin scoped
- Use for: user preferences (theme, language), small config values, "remember me" flags

**sessionStorage:**
- Cleared when the browser tab is closed
- Each tab has its own sessionStorage (not shared across tabs)
- Use for: temporary per-tab state, single-session data

**Why not for PWA data:**
- Synchronous I/O: reading/writing large data blocks the main thread, causing jank
- 5MB limit: far too small for offline catalog, media, or complex app data
- Strings only: serializing/deserializing JSON adds CPU overhead and loses type information
- No transactions: no atomicity; partial writes can corrupt state

**When localStorage is fine:** simple key-value settings ("theme": "dark", "language": "en") — tiny data, infrequently written, string-compatible. Perfect fit.

**"navigator.storage.persist()":** request persistent storage (prevents browser eviction under storage pressure). Critical for offline-first apps: "navigator.storage.persist().then(granted => { if (granted) console.log('Data will not be evicted'); });"

**Key insight:** localStorage is an excellent tool for its use case — simple user preferences. The mistake is using it as a general-purpose database. Once you need to store more than a few KB of structured data, IndexedDB is the correct tool.`,
    },
    {
      id: 1199,
      name: "Cache Storage API",
      desc: `**Cache Storage** — the browser's persistent storage for Request/Response pairs, used exclusively by service workers (and accessible from the page via "caches" global). Stores cached HTTP responses — not arbitrary app data.

**Hierarchy:**
- "caches": the global CacheStorage interface (access from page or service worker)
- "caches.open('name')": opens a named cache (created if doesn't exist)
- Each named cache holds Request → Response pairs

**vs. IndexedDB:** Cache Storage stores HTTP Responses (headers + body); IndexedDB stores arbitrary JS objects. Use Cache Storage for network responses; IndexedDB for app data. They're complementary, not interchangeable.

**"caches.match(request, options)":** match a request across ALL named caches:
"const response = await caches.match(event.request);" — searches all open caches in creation order.

**Cache Storage from page code:** you can read Cache Storage from regular page JavaScript:
"const cache = await caches.open('images'); const response = await cache.match('/photo.jpg');" — useful for showing cached images before the service worker fetches updates.

**Storage quota:** shared with IndexedDB and Origin Private File System. Check usage: "navigator.storage.estimate().then(({usage, quota}) => console.log(usage, quota));"

**Debugging:** Chrome DevTools → Application → Cache Storage — browse all caches and individual cached responses.

**Key insight:** Cache Storage is specifically designed for HTTP responses — it understands HTTP semantics (headers, methods, CORS). This specialization makes it perfect for service worker caching but not for storing user data. The naming confusion (it's not the HTTP cache) trips up developers new to service workers — it's a separate, programmatically-controlled store.`,
    },
    {
      id: 1200,
      name: "Origin Private File System (OPFS)",
      desc: `**Origin Private File System (OPFS)** — a high-performance file system API accessible to web apps that provides a sandboxed, origin-scoped private directory for storing and manipulating files. Designed for use cases requiring fast, file-like access (SQLite, game assets, large media files).

**Key advantages:**
- **Performance:** synchronous file access available in Web Workers (the only synchronous Storage API) — critical for SQLite compiled to WASM (wa-sqlite, sql.js)
- **Large files:** no practical size limit beyond device storage quota
- **Native FS operations:** read, write, seek, truncate — byte-level file access

**Access model:**
"const root = await navigator.storage.getDirectory(); const fileHandle = await root.getFileHandle('db.sqlite', { create: true }); const writable = await fileHandle.createSyncAccessHandle();" (in Worker)

**WASM SQLite via OPFS:** "wa-sqlite" and SQLite compiled to WASM use OPFS as its storage backend — gives you full SQL querying capability in the browser with near-native performance.

**vs. File System Access API:** OPFS is private (no user file picker needed, no OS file system visibility); File System Access API lets users pick real OS files.

**Browser support:** Chrome 86+ (with full synchronous access in Workers: Chrome 102+), Firefox 111+, Safari 15.2+.

**Key insight:** OPFS is the missing piece for SQLite-in-browser use cases. Before OPFS, WASM SQLite was limited by IndexedDB's asynchronous constraint. With OPFS synchronous file handles in Workers, you can run a full relational database with complex queries client-side — a paradigm shift for offline-first apps.`,
    },
    {
      id: 1201,
      name: "Storage Quota & Persistence",
      desc: `**Storage Quota & Persistence** — managing the browser's storage limits for web apps (IndexedDB, Cache Storage, OPFS) and ensuring data isn't silently evicted by the browser under storage pressure.

**Storage estimation:** "const { usage, quota } = await navigator.storage.estimate();" — returns bytes used and available quota. Run this to check if you're approaching limits.

**Typical quotas:**
- Desktop Chrome: 60% of disk space
- Mobile Chrome: up to 60% of available disk
- Firefox: lesser of 50% of free disk or 2GB
- Safari: 1GB origin limit; stricter eviction policies

**Eviction policies:** browsers evict storage under disk pressure using LRU (Least Recently Used) — origins that haven't been visited recently lose data first. This is the silent data loss risk for PWAs.

**Requesting persistence:** "navigator.storage.persist().then(granted => ...)" — requests "persistent" storage that won't be evicted automatically. Chrome grants this if the user has installed the PWA or has "Allow" notifications permission or has visited the site frequently.

**Storage categories:**
- "best-effort" (default): can be evicted under pressure without warning
- "persistent": retained until user explicitly clears site data

**User-facing storage limits:** iOS Safari limits each origin to 1GB and aggressively evicts storage for sites not visited in 7 days (ITP — Intelligent Tracking Prevention). This is a known PWA limitation on iOS.

**Key insight:** Storage persistence is the offline app's foundation — if the browser silently evicts your IndexedDB data while the user is offline, the app becomes non-functional. Always call "navigator.storage.persist()" for offline-capable apps and communicate clearly if persistence isn't granted.`,
    },
    {
      id: 1202,
      name: "Sync Strategies with the Server",
      desc: `**Client-server sync strategies** — the patterns for keeping client-side (IndexedDB) data in sync with the server when the user is intermittently connected. This is the hardest problem in offline-first development.

**Strategies:**

**1. Full sync on reconnect:** on network restoration, fetch all data from server and replace local store. Simple but doesn't scale (large data sets); loses offline mutations.

**2. Delta sync:** server tracks "last modified" timestamps or sequence numbers. Client sends "last_sync_at"; server returns only changed records since that timestamp. Efficient for large datasets.

**3. Event sourcing / operation log:** record all mutations as events (create, update, delete) in an operations queue. On sync, replay the queue against the server. Enables conflict detection.

**4. CRDTs (Conflict-Free Replicated Data Types):** data structures that merge automatically without conflicts. Counters (increment from multiple clients), LWW-Register (Last Write Wins), OR-Set (add wins over remove). Used by Figma, Notion, and linear for collaborative offline editing.

**5. Optimistic updates:** apply mutations to local state immediately, sync to server in background, roll back on server rejection. Provides instant UI feedback; requires conflict resolution on failure.

**Conflict resolution approaches:**
- Last write wins (LWW): simple, loses concurrent edits
- Three-way merge: merge base version + two conflicting edits (Git-style)
- User-resolves: present conflicting versions, let user choose
- Operational Transform (OT): complex, used in Google Docs

**Key insight:** Most PWAs need delta sync + operation log — not full CRDTs. CRDTs solve a hard problem (concurrent offline edits by multiple users) that most apps don't have. Start with optimistic updates + server-wins conflict resolution; escalate to CRDTs only when you have the concurrent-editing use case.`,
    },
    {
      id: 1203,
      name: "Web Locks API",
      desc: `**Web Locks API** — a browser primitive for coordinating access to shared resources across multiple tabs/workers/service workers of the same origin. Prevents race conditions when multiple contexts try to access the same IndexedDB data simultaneously.

**The problem it solves:** multiple browser tabs running the same PWA share IndexedDB. Without locking, concurrent writes from Tab A and Tab B can corrupt data. Web Locks provides mutual exclusion.

**Basic usage:** "navigator.locks.request('sync-lock', async (lock) => { await performSync(); /* lock released when async fn completes */ });"

The callback receives the lock and holds it until the returned promise resolves. Other requestors for the same lock name wait in queue.

**Lock modes:**
- "exclusive" (default): only one holder at a time — mutual exclusion for writes
- "shared": multiple readers can hold simultaneously — concurrent reads, exclusive writes (reader-writer lock pattern)

**Lock options:**
- "{ ifAvailable: true }": acquire only if immediately available; callback called with "null" if locked — non-blocking check
- "{ steal: true }": take the lock from current holder — for recovery scenarios
- "{ signal: abortSignal }": cancel the lock request

**Service worker coordination:** service workers can use Web Locks to coordinate with page scripts — e.g., only one SW background sync runs while the page isn't modifying the same data.

**Key insight:** Web Locks is the correct solution for multi-tab data access coordination — not "try-catch around IndexedDB writes and hope for the best." Any offline-first app with shared mutable state accessed from multiple tabs should use Web Locks around mutation operations.`,
    },
  ],
};

export default storageApis;
