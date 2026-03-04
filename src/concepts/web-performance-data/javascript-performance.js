const javascriptPerformance = {
  name: "JavaScript Performance",
  icon: "⚡",
  color: "#f59e0b",
  concepts: [
    {
      id: 1363,
      name: "V8 Engine & JIT Compilation",
      desc: `**V8 Engine** — Chrome and Node.js's JavaScript engine that compiles JavaScript to native machine code at runtime using Just-In-Time (JIT) compilation, making JS execution orders of magnitude faster than interpretation.

**JIT compilation pipeline:**
1. **Parse:** source code → AST (Abstract Syntax Tree)
2. **Ignition (interpreter):** AST → bytecode, executes immediately
3. **Sparkplug (baseline compiler):** hot code → lightly optimized machine code without analysis
4. **Maglev (mid-tier JIT):** typed bytecode → optimized machine code
5. **TurboFan (optimizing JIT):** hottest code → highly optimized machine code with type specialization

**Hidden classes:** V8 creates internal "hidden classes" (shapes) for objects to enable inline caching. Objects with the same property keys added in the same order share a hidden class, enabling fast property access. Violating this:
"// BAD: two different hidden classes
const a = { x: 1, y: 2 };
const b = { y: 2, x: 1 };  // Different property order = different hidden class

// GOOD: consistent property order
const a = { x: 1, y: 2 };
const b = { x: 3, y: 4 };  // Same hidden class — V8 can optimize"

**Deoptimization:** when V8's type assumptions are invalidated (a function called with "number" is suddenly called with "string"), TurboFan deoptimizes — throws away the optimized code and falls back to bytecode. Visible in DevTools Performance profiler as a "Deoptimize" event.

**Monomorphic vs polymorphic calls:** a function called with arguments of the same type every time (monomorphic) is optimized more aggressively than one called with multiple types (polymorphic/megamorphic).

**Key insight:** writing "type-stable" JavaScript — functions that always receive the same argument types, objects with consistent shapes — helps V8 generate and retain optimized machine code. The performance difference between well-optimized V8 code and unoptimized bytecode can be 10-100x.`,
    },
    {
      id: 1364,
      name: "JavaScript Parsing & Compile Cost",
      desc: `**JavaScript Parse & Compile Cost** — the time the browser spends parsing (reading source code, building AST) and compiling (bytecode generation) JavaScript before any of it can execute. On low-end devices, this can consume 30-50% of the total JS processing time.

**Parse cost scales with bytes:** 200KB of JS takes ~2-5ms to parse on a fast laptop but 15-30ms on a mid-range Android phone. 1MB of JS can take 50-100ms just to parse — before a single line of business logic runs.

**Eager vs lazy parsing:** V8 uses a "pre-parser" to quickly scan functions it hasn't executed yet (marking them for later full parsing when called). Functions that are immediately invoked (IIFE, module top-level code) are eagerly parsed. Functions only called on user interaction are lazily parsed. This is why "wrapping code in closures" or "using ES modules" can improve startup time.

**DevTools measurement:** Performance panel → record page load → look at "Parse Script" events in the flame chart (yellow). Sum their durations. "Evaluate Script" events are execution. A 400ms parse time for a 2MB bundle is not uncommon.

**Reducing parse cost:**
- **Code splitting:** instead of one 2MB bundle, split into 200KB initial bundle + lazy-loaded chunks. Parse only the initial chunk on load.
- **Tree shaking:** unused code that isn't parsed isn't bundled at all
- **Native ES modules in production (limited):** each module is independently parseable; some browsers cache compiled bytecode per module
- **V8 code caching:** Chrome caches compiled bytecode after first visit — subsequent page loads skip parsing for unchanged scripts

**Key insight:** JavaScript has a "double tax" compared to other assets: a 200KB JS file and a 200KB image both cost the same to transfer, but the JS file also costs parse + compile + execute time. 200KB of gzipped JS is ~800KB uncompressed — that's the actual parse cost. Treat JS bytes as 3-5x more expensive than equivalent bytes of other asset types.`,
    },
    {
      id: 1365,
      name: "Web Workers",
      desc: `**Web Workers** — a browser API for running JavaScript in a background thread, completely separate from the main thread. Workers can't touch the DOM, but they can perform CPU-intensive computations without blocking user interactions.

**What workers can do:** heavy mathematical computation (image processing, data transformation, encryption), JSON parsing of large payloads, sorting/filtering large datasets, running WASM modules, SharedArrayBuffer operations.

**What workers CANNOT do:** access the DOM, call "document" or "window" APIs, use "localStorage", make synchronous "XMLHttpRequest". Communication is exclusively via message passing.

**Basic pattern:**
"// main.js
const worker = new Worker('/worker.js');
worker.postMessage({ data: largeArray });
worker.onmessage = (e) => { console.log('Result:', e.data); };

// worker.js
self.onmessage = (e) => {
  const result = processHeavily(e.data.data);
  self.postMessage(result);
};"

**Transferable objects:** "postMessage" with structured clone copies data — expensive for large arrays. Use "transferable" objects to transfer ownership (zero-copy):
"worker.postMessage(arrayBuffer, [arrayBuffer]);  // Transfer, not copy"

**SharedArrayBuffer:** shared memory between main and worker threads — enables true zero-copy sharing. Requires "Cross-Origin-Opener-Policy: same-origin" and "Cross-Origin-Embedder-Policy: require-corp" headers.

**Worker threads in Node.js:** "worker_threads" module for the same pattern server-side. Essential for CPU-bound Node.js workloads (same event loop blocking problem as browser main thread).

**Key insight:** the rule of thumb — if a synchronous operation takes more than 50ms, it belongs in a Web Worker. Image manipulation, PDF parsing, data science computations, complex search/filter on large datasets — all of these are natural Web Worker candidates. The main thread is for UI. The worker is for everything else.`,
    },
    {
      id: 1366,
      name: "Memory Leaks & Garbage Collection",
      desc: `**JavaScript Memory Leaks** — situations where allocated memory is never released because a reference to the object persists, preventing the garbage collector from collecting it. In long-running SPAs, leaks accumulate over time, causing slowdowns and eventual tab crashes.

**Garbage Collection (GC):** V8 uses a generational garbage collector:
- **Minor GC (Scavenger):** fast collection of young-generation objects (recently allocated, short-lived). Runs frequently, typically < 1ms.
- **Major GC (Mark-Compact):** collects old-generation objects (survived multiple minor GCs). Can cause 10-100ms pauses. Triggered when old-gen heap grows too large.

**Common leak patterns:**
1. **Forgotten event listeners:** "window.addEventListener('resize', handler)" without "removeEventListener" on component unmount. Even if the component is destroyed, the handler (and its closure scope) stays in memory.
2. **Timers not cleared:** "setInterval(fn, 100)" without "clearInterval" — runs forever, keeping closure alive
3. **Closures over large objects:** a small callback that closes over a large object prevents the large object from being collected
4. **Detached DOM nodes:** "const el = document.getElementById('foo'); container.removeChild(el);" but "el" reference kept in JS — the DOM node can't be GC'd
5. **Growing caches without size limits:** "const cache = {}; cache[key] = response" — cache grows unboundedly

**DevTools diagnosis:** Memory panel → Heap Snapshot → take two snapshots before and after the "leaky" action → Comparison view → filter by positive "Delta" count → Objects that grew are the leak.

**Key insight:** the three-snapshot technique (baseline → action → GC → snapshot → repeat action → GC → snapshot) is the gold standard for proving a leak. If the third snapshot has significantly more objects than the first, the action leaks. If counts stabilize between snapshots 2 and 3, the GC is working and there's no leak.`,
    },
    {
      id: 1367,
      name: "Code Splitting",
      desc: `**Code Splitting** — breaking a JavaScript bundle into smaller chunks that are loaded on demand (lazily) rather than all upfront. Instead of a single 2MB app.js, the user downloads only the code needed for the current route/feature, loading additional chunks when needed.

**Dynamic import (the mechanism):**
"// Static import — always bundled in main chunk
import { heavyModule } from './heavy';

// Dynamic import — creates a separate chunk, loaded on demand
const { heavyModule } = await import('./heavy');
button.addEventListener('click', async () => {
  const { openModal } = await import('./modal');
  openModal();
});"

**Route-based code splitting (React):**
"const ProductPage = React.lazy(() => import('./ProductPage'));
const CheckoutPage = React.lazy(() => import('./CheckoutPage'));

// Each route loads its own chunk only when visited"

**What to split:**
- Routes/pages: each page is a separate chunk
- Large third-party libraries: "import('chart.js')" only when charts are shown
- Below-the-fold features: editor, image cropper, PDF viewer
- Admin/settings sections: rarely-used features in separate chunks

**Bundle analysis before splitting:** "webpack-bundle-analyzer" or "vite-bundle-visualizer" visualizes which modules are largest. Sort by size — the largest modules are the best code-splitting candidates.

**Preloading split chunks:** after code splitting, next-route chunks can be prefetched during idle time:
"import(/* webpackPrefetch: true */ './CheckoutPage')"  — downloaded with low priority after main bundle, making subsequent navigation instant.

**Key insight:** code splitting is the single highest-ROI bundling optimization for large applications. An app with 2MB of bundled JS that reduces initial load to 300KB (splitting the rest into lazy chunks) immediately improves FCP, TTI, and LCP. The user pays only for code they actually use.`,
    },
    {
      id: 1368,
      name: "Tree Shaking",
      desc: `**Tree Shaking** — a build-time optimization that eliminates "dead code" — JavaScript modules or exports that are imported but never actually used in the application. Named after the metaphor of shaking a tree to make dead leaves fall off. Relies on ES module static analysis.

**Why ES modules enable tree shaking:** "import/export" statements are static — the bundler can analyze them at build time without executing code. CommonJS "require()" is dynamic, making dead code elimination impossible.

"// library/index.js
export function usedFunction() { ... }
export function neverUsedFunction() { ... }  // Will be tree-shaken out

// app.js
import { usedFunction } from 'library';  // Only usedFunction bundled"

**Why tree shaking fails (common pitfalls):**
- **Side effects:** if a module has side effects (modifies globals, has top-level "console.log"), bundlers can't safely remove it. Mark pure modules in "package.json": "sideEffects: false" or "sideEffects: ['*.css']"
- **CommonJS dependencies:** if your dependency uses "module.exports", its tree is opaque. Result: the entire library is bundled even if you use one function.
- **"import * as foo from":** importing the entire namespace prevents tree shaking
- **"export default" with objects:** "export default { a, b, c }" — the whole object is bundled even if you only use "a"

**Verifying tree shaking works:** bundle with source maps → use "webpack-bundle-analyzer" or "source-map-explorer" → verify unused exports from large libraries (e.g., lodash) are absent. If lodash is in the bundle despite only using "_.debounce", switch to "lodash-es" and named imports.

**Key insight:** most applications bundle 30-60% more JavaScript than they use because tree shaking is silently disabled by CommonJS dependencies or missing "sideEffects: false" declarations. The bundle visualizer is the fastest way to find which libraries are being fully included when only a fraction is used.`,
    },
    {
      id: 1369,
      name: "Script Loading Strategies",
      desc: `**Script Loading Strategies** — the HTML attributes and patterns that control when scripts are downloaded, parsed, and executed relative to HTML parsing and page rendering. The wrong strategy blocks the critical rendering path; the right one maximizes parallelism.

**The four loading strategies:**

"script src='app.js'" — **(Blocking):** parser stops, waits for download + execution. Worst for performance. Never use in head without async/defer.

"script src='app.js' async" — **(Async):** downloads in parallel with HTML parsing; executes as soon as downloaded (pauses parsing briefly). No guaranteed execution order between async scripts. Good for: independent scripts (analytics, ads) that don't depend on DOM or other scripts.

"script src='app.js' defer" — **(Deferred):** downloads in parallel with HTML parsing; executes after HTML is parsed, in document order. Guaranteed execution order between defer scripts. Good for: all application code that depends on DOM or script order.

"type='module'" — **(Module):** deferred by default + enables ES module semantics + always strict mode. Use for modern application bundles.

**Modern best practice:**
- Main application bundle: "defer" or "type=module"
- Analytics/tracking: "async" (independent, order doesn't matter)
- Critical scripts that must run early: inline in head (no network request)
- Large libraries needed for first interaction: "defer" + "rel=modulepreload"

**Render-blocking resource detection:** Lighthouse "Eliminate render-blocking resources" audit lists every blocking script/stylesheet.

**Key insight:** adding "defer" to all scripts in the head is one of the safest, highest-ROI HTML changes for any existing page. It converts blocking sequential downloads into parallel downloads with deferred execution — eliminating the HTML parsing pause with no behavior change for scripts that don't use "document.write".`,
    },
    {
      id: 1370,
      name: "Bundle Analysis & Optimization",
      desc: `**Bundle Analysis** — examining the composition of JavaScript bundles to identify bloat: oversized dependencies, duplicated packages, accidentally included dev-only code, and poor tree shaking. The prerequisite for informed bundle optimization.

**Analysis tools:**
- **webpack-bundle-analyzer:** interactive treemap visualizing every module in every chunk. "npx webpack-bundle-analyzer stats.json" — stats.json generated with "webpack --json > stats.json"
- **vite-bundle-visualizer:** "npx vite-bundle-visualizer" in a Vite project → interactive HTML treemap
- **Rollup Visualizer:** plugin for Rollup and Vite ("rollup-plugin-visualizer")
- **source-map-explorer:** analyzes bundle using source maps — "npx source-map-explorer dist/app.js" → which original files contribute how many bytes
- **bundlephobia.com:** check any npm package's bundle size before installing it

**Common findings:**
- "moment.js" included at 230KB when "date-fns" would be 5KB
- All of "lodash" bundled when only 3 functions are used (switch to "lodash-es" + named imports)
- "react-icons" entire icon library bundled (use named imports: "import { FiZap } from 'react-icons/fi'")
- Duplicated React versions from incompatible peer dependency trees
- Development-only code (test utilities, Storybook stories) accidentally bundled

**Bundle size budgets:** "size-limit" package enforces bundle size in CI:
"[{ 'limit': '200 kB', 'path': 'dist/app.js' }]"  — builds fail if app.js exceeds 200KB.

**Differential serving:** ship modern ES2020+ syntax to modern browsers (smaller, no transpilation) and ES5 bundles to legacy browsers. Vite does this automatically with "vite build --target es2020".

**Key insight:** the bundle treemap almost always reveals a surprise: one library that accounts for 30% of the bundle that could be replaced by a lighter alternative or removed entirely. One hour with webpack-bundle-analyzer typically reveals 20-40% bundle size reduction opportunities that would otherwise remain invisible.`,
    },
    {
      id: 1371,
      name: "scheduler.yield & Task Yielding",
      desc: `**scheduler.yield()** — a browser API (Chrome 129+, origin trial earlier) that provides an ergonomic way for long tasks to yield back to the browser mid-execution, allowing pending user inputs and rendering to be processed before the task continues. The successor to "setTimeout(fn, 0)" yielding hacks.

**The problem it solves:** a 500ms function blocks the main thread for 500ms — any click, keypress, or frame paint during that time is queued and delayed. Breaking it into chunks that yield in between allows the browser to interleave rendering and input handling.

"// Old pattern: yield with setTimeout (imprecise, always yields even when not needed)
async function processLargeList(items) {
  for (let i = 0; i < items.length; i++) {
    processItem(items[i]);
    if (i % 100 === 0) await new Promise(r => setTimeout(r, 0));
  }
}

// New pattern: scheduler.yield (yields only when needed, higher priority)
async function processLargeList(items) {
  for (const item of items) {
    processItem(item);
    await scheduler.yield();  // Browser decides if yielding is needed
  }
}"

**Priority scheduling API:** "scheduler.postTask(fn, { priority: 'user-blocking' | 'user-visible' | 'background' })" — schedule tasks at different priorities. "user-blocking" runs before rendering; "background" runs during idle time.

**isInputPending():** "navigator.scheduling.isInputPending()" — returns true if there are pending input events (click, keydown, etc.) in the queue. Use to yield only when input is waiting, avoiding unnecessary yielding overhead.

**Scheduler polyfills:** the "scheduler-polyfill" npm package polyfills "scheduler.yield" and "scheduler.postTask" for browsers that don't yet support them natively.

**Key insight:** "scheduler.yield()" is the correct long-term fix for INP. The pattern is: identify the long task causing INP via DevTools → break it into logical chunks → add "await scheduler.yield()" between chunks. The browser gets to process pending inputs between chunks, reducing INP from "entire task duration" to "single chunk duration."`,
    },
  ],
};

export default javascriptPerformance;
