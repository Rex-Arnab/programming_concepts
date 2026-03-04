const performanceTab = {
  name: "DevTools: Performance Tab",
  icon: "🔥",
  color: "#f97316",
  concepts: [
    {
      id: 1335,
      name: "Performance Recording",
      desc: `**Performance Recording** — the act of capturing a Chrome DevTools performance profile: a timestamped trace of everything the browser does (JS execution, layout, paint, network, GPU) during a recorded interaction. Press Cmd+Shift+P → "Start profiling and reload page" or click the record button → interact → stop.

**Recording modes:**
- "Record" button: captures user interactions from a fixed point. Use for diagnosing INP — click record → perform the slow interaction → stop.
- "Start profiling and reload page": captures the full page load including network, parse, initial render. Use for diagnosing LCP and startup performance.
- "Cmd+Shift+P → Performance panel": keyboard shortcut.

**Before recording, always:**
- Use an Incognito window (no extensions affecting performance)
- Enable CPU throttling (4x or 6x for mobile simulation)
- Enable network throttling (Fast 3G for mobile)
- Close other tabs (reduces noise)
- Disable "Disable cache" unless testing with a cold cache — real users have caches

**Profile duration:** keep recordings short (5-10 seconds). Long recordings produce enormous trace files that are hard to analyze and slow to load in DevTools.

**Exporting profiles:** "Save profile" (Cmd+S) saves the JSON trace file. Share it or re-open later with "Load profile". chromium.googlesource.com/catapult has trace_viewer for offline analysis.

**Key insight:** a performance recording is the ground truth for diagnosing performance problems. It shows exactly what the browser did, in what order, for how long. No other tool gives you this level of detail. When Lighthouse flags "reduce main thread work," a recording tells you exactly which script and which function is responsible.`,
    },
    {
      id: 1336,
      name: "Flame Chart & Main Thread",
      desc: `**Flame Chart** — the visual representation of the JavaScript call stack over time in the Performance tab. Each horizontal bar is a function call; bars below are functions called by the one above (children). Width = duration. The "Main" thread row shows all JS execution, style recalculation, layout, and paint tasks.

**Reading the flame chart:**
- **Wide bars at the top:** long-running parent functions — good starting point for investigation
- **Tall stacks:** deeply nested calls — can indicate recursive algorithms or framework overhead
- **Red triangles:** warnings (long task, forced reflow, etc.)
- **Gray areas:** browser-internal tasks (style recalculation, layout, composite)
- **Color coding:** yellow = JavaScript, purple = rendering (style/layout), green = paint, cyan = loading/parsing

**Zooming and navigation:**
- Scroll with mouse wheel to zoom in/out on the time axis
- Click + drag to select a time range — details panel below updates to show only that period
- "W/A/S/D" keyboard shortcuts for zoom and pan
- Click a bar to see the function name, file, line number, duration, and self-time in the bottom Details panel

**Self time vs total time:** "Total time" includes all child calls; "self time" is time spent in that function's own code. A function with 500ms total time but 2ms self time is just an orchestrator — look at the expensive children.

**Key insight:** flame chart is where you identify the specific function causing a long task. Lighthouse says "reduce main thread work" — the flame chart says "the 'processCartItems' function at cart.js:247 is running for 340ms every time the user clicks Add to Cart." You can't fix what you can't identify; the flame chart identifies it.`,
    },
    {
      id: 1337,
      name: "Long Tasks",
      desc: `**Long Tasks** — JavaScript tasks that take more than 50ms to complete, blocking the browser's main thread and preventing the browser from responding to user input. Shown in the Performance timeline as red-striped bars labeled "Long Task" in the "Main" row.

**Why 50ms:** the browser targets a 60fps frame budget of 16.7ms per frame. But browsers also need time for rendering, compositing, and responding to input. Google's RAIL model defines "respond in < 100ms" — tasks longer than 50ms leave < 50ms buffer for response, risking visible delays.

**Long task anatomy in the flame chart:** a long task shows as a gray bar with a red triangle in the top-right corner. Inside it, the flame chart shows all the JavaScript calls that made up that task. The "Attribution" section in the Details panel shows the script responsible.

**Finding long tasks programmatically:**
"const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    if (entry.duration > 50) {
      console.log('Long task:', entry.duration, 'ms at', entry.startTime);
    }
  });
});
observer.observe({ entryTypes: ['longtask'] });"

**Fixing long tasks:**
- Break large tasks into smaller chunks using "scheduler.yield()" (Chrome 115+) or "setTimeout(() => nextChunk(), 0)"
- Defer non-critical work using "requestIdleCallback"
- Move heavy computation to Web Workers
- Code-split large JavaScript bundles (parsing cost of large files is itself a long task)

**Key insight:** every long task is a potential bad INP. If a long task runs for 300ms exactly when a user clicks a button, that click won't register for 300ms — resulting in an INP of 300ms+ (Poor). Eliminating long tasks and breaking remaining ones below 50ms is the direct path to a "Good" INP.`,
    },
    {
      id: 1338,
      name: "Layout & Paint Events",
      desc: `**Layout & Paint Events** — browser rendering work visible in the Performance timeline as purple (style/layout) and green (paint) bars. Layout calculates positions and sizes of all elements; paint rasterizes pixels; composite assembles layers.

**Event types in timeline:**
- "Recalculate Style" (purple): CSS style changes triggered recomputation of computed styles for affected elements. Duration scales with number of affected elements.
- "Layout" (purple): position/size of elements recalculated due to DOM changes that affect geometry (adding elements, changing width, font-size, padding, etc.)
- "Update Layer Tree" (purple): browser updates its internal layer list
- "Paint" (green): recording of draw commands for a layer
- "Composite Layers" (cyan-green): assembling layers on the GPU

**Layout thrashing (forced synchronous layouts):** calling "element.offsetHeight" after DOM mutations forces the browser to complete layout synchronously before the script can continue. The Performance panel marks this as a red triangle labeled "Forced reflow." Pattern:

"el.style.height = newHeight + 'px';  // Write
const h = el.offsetHeight;            // Read — forces synchronous layout! (Layout thrashing)"

**Fix:** batch reads before writes, or use "requestAnimationFrame" to separate write frames.

**Paint storm:** many small paint events across the page often indicate that an animation is triggering full-page repaints instead of compositor-only animations. Fix: animate only "transform" and "opacity" (compositor-safe properties).

**Key insight:** purple layout events are expensive in proportion to the number of affected DOM nodes. A "Recalculate Style" taking 80ms on a page with 3,000 DOM nodes is a signal to reduce DOM size or scope style changes with CSS containment.`,
    },
    {
      id: 1339,
      name: "JavaScript Profiling in Performance Panel",
      desc: `**JavaScript Profiling** — using the Performance panel's call tree and flame chart to identify hotspot functions consuming disproportionate CPU time. The "Bottom-Up" and "Call Tree" tabs in the Details pane provide aggregated views of where time was spent.

**Three analysis views:**
- **Flame Chart (top):** chronological call stack — shows when functions ran
- **Call Tree (Details panel):** hierarchical view grouped by call path, sorted by "Total Time" — shows what called what
- **Bottom-Up (Details panel):** list of functions sorted by "Self Time" (time in own code, excluding children) — the most direct view of which functions to optimize

**Self time is the key metric for optimization:** a function at the top of the Bottom-Up list with high self time is doing expensive work itself. A function with high total time but low self time is just calling expensive children — optimize the children.

**Heavy JavaScript patterns to look for:**
- String concatenation in loops (use array + join)
- Deeply nested object traversal on every render
- Regex matching on large strings repeatedly
- Sorting large arrays on every render (should be memoized)
- Event listeners processing more data than needed

**"Disable JavaScript samples" in recording settings:** unchecking this (it's checked by default) gives you JS stack traces in profiles. Without it, JS execution shows as opaque blocks with no function-level detail.

**Key insight:** the Bottom-Up tab with "self time" sorting is the fastest way to find which function to optimize. Paste the function name into your codebase search and you've found the exact line to optimize. Unlike Lighthouse which gives categories, the Performance panel gives you file:line precision.`,
    },
    {
      id: 1340,
      name: "Layers & Compositing",
      desc: `**Compositor Layers** — sections of the page that are painted into separate bitmap images (textures) and assembled by the GPU compositor thread, independently of the main thread. Layers enable smooth animations because moving/fading a layer doesn't require re-layout or re-paint — just repositioning the texture.

**How layers form:** the browser promotes elements to their own layer when it detects: a CSS "transform" or "opacity" animation, "will-change: transform", a "position: fixed" or "sticky" element, a "video", "canvas", or "iframe" element, or any element with "overflow: scroll" with 3D transforms.

**Layers panel (DevTools):** View → Layers (or Cmd+Shift+P → "Show Layers"). Shows a 3D visualization of all compositor layers. You can rotate and inspect the layer tree. Each layer shows its reason for promotion and memory cost.

**Layer explosion anti-pattern:** overusing "will-change: transform" or "transform: translateZ(0)" creates hundreds of layers, each consuming GPU memory (often 4 bytes per pixel × layer dimensions). 100 layers × 1920×1080 = hundreds of MB of GPU memory — causing janky animations and crashes on mobile.

**Good layer use (compositor animations):**
"/* Only animates on compositor — no layout or paint triggered */
.animating { transform: translateX(100px); opacity: 0; transition: transform 0.3s, opacity 0.3s; }"

**Rendering tab overlay:** Chrome menu → More Tools → Rendering → enable "Layer borders" to see layer boundaries overlaid on the live page.

**Key insight:** animations that only change "transform" and "opacity" run on the compositor thread — completely independent of the main thread. Even if your JavaScript is running a long task, these animations stay smooth at 60fps. This is the difference between "jank-free" and "jank" for CSS animations.`,
    },
    {
      id: 1341,
      name: "FPS Meter & Frame Rate",
      desc: `**FPS Meter** — real-time display of the browser's rendering frame rate, visible via Chrome DevTools → More Tools → Rendering → "Frame Rendering Stats". Shows current FPS, GPU memory usage, and a rolling FPS histogram.

**60fps target:** browsers target 60 frames per second (16.67ms per frame) for smooth animations. At 60fps, animations appear fluid. Below 30fps feels janky; 15fps and below is visually painful. The 16.67ms budget must cover: JavaScript execution, style recalculation, layout, paint, and composite.

**Frame budget breakdown (16.67ms total):**
- ~1-2ms: JavaScript event handling
- ~3-4ms: style recalculation
- ~2-3ms: layout
- ~2-3ms: paint
- ~1ms: composite
- Remaining: buffer

**Dropped frames:** when a frame takes longer than 16.67ms, the browser drops it (skips to the next one). The FPS meter shows this as a dip. Occasional drops are invisible; consistent drops at 30fps feel sluggish.

**120fps displays:** modern phones and laptops (ProMotion displays) support 120Hz refresh. Browsers are beginning to target 120fps for smooth scrolling. At 120fps, the frame budget is only 8.3ms — much tighter.

**Animation frame timeline in Performance panel:** the "Frames" row at the top of the Performance timeline shows each rendered frame as a bar. Height indicates duration; bars above the 16.67ms line are dropped frames (shown in red).

**Key insight:** the FPS Meter is the fastest feedback loop for animation performance. If a CSS animation causes a dip from 60fps to 30fps, check: is it animating "transform"/"opacity" only? (compositor-safe) or "width"/"height"/"margin"? (triggers layout every frame — expensive). Switching to transform-only animations is often a one-line fix.`,
    },
    {
      id: 1342,
      name: "Memory Panel & Heap Snapshots",
      desc: `**Memory Panel** — Chrome DevTools panel for diagnosing JavaScript memory issues: memory leaks, excessive allocation, and retained object references. Provides three profiling tools: Heap Snapshot, Allocation Instrumentation on Timeline, and Allocation Sampling.

**Heap Snapshot:** captures the current state of JS heap memory. Shows every object in memory with: constructor type, count, shallow size (size of object itself), retained size (total memory freed if object were garbage collected). Compare two snapshots to find leaked objects.

**Finding memory leaks:** (1) take baseline snapshot, (2) perform the "leaky" action (open/close a modal, navigate to route, etc.), (3) force garbage collection (trash icon in Memory panel), (4) take second snapshot. Switch to "Comparison" view — objects in "Delta" column that are positive didn't get cleaned up.

**Common leak patterns:**
- Event listeners not removed when components unmount ("window.addEventListener" without "removeEventListener")
- Closures holding references to large objects
- Detached DOM nodes (removed from DOM but still referenced in JS — visible as "Detached HTMLDivElement" in snapshot)
- Timers/intervals not cleared ("setInterval" without "clearInterval")

**Allocation Timeline:** records memory allocation over time — shows which functions are allocating the most memory per second. Good for diagnosing excessive GC churn (frequent small allocations causing frequent GC pauses).

**Key insight:** detached DOM nodes are the most common leak in SPA frameworks. They appear as "Detached HTMLElement" in heap snapshots. Cause: event listener or timer holds a reference to a DOM node after it's been removed from the document, preventing GC. React and Vue have mitigated this for component-level events, but imperative DOM manipulation can still leak.`,
    },
    {
      id: 1343,
      name: "Web Vitals in Performance Panel",
      desc: `**Web Vitals Overlay in Performance Panel** — Chrome DevTools Performance panel shows LCP, CLS, and INP markers directly overlaid on the performance timeline, allowing you to see exactly what was happening (JS execution, layout events, network) at the moment each Core Web Vital was recorded.

**How to see them:** record a performance profile with "Start profiling and reload page" → LCP marker appears as a green vertical line on the timeline with a diamond label → click the LCP marker → the Details panel shows which element was the LCP element, its size, and the timestamp breakdown (TTFB, load delay, load duration, render delay).

**LCP breakdown in timeline:**
- "TTFB" delay: time until server started responding
- "Load delay": from TTFB to when the LCP resource started loading (could be late discovery)
- "Load duration": actual image download time
- "Render delay": from download complete to first paint (could be render-blocking work)

**INP in Performance panel:** Chrome 115+ shows INP interactions as markers. Click an interaction marker → see: input delay (what was blocking when the click happened), processing time (event handler duration), and presentation delay (time from handler to paint).

**CLS markers:** layout shift events appear on the timeline. Click one to see: which elements shifted, by how much, and what caused the shift (e.g., "image loaded without dimensions").

**Performance Insights panel:** Chrome's newer dedicated panel (Cmd+Shift+P → "Show Performance Insights") presents the same data with guided suggestions rather than raw timeline data — easier for developers less familiar with flame charts.

**Key insight:** the LCP breakdown in DevTools is uniquely valuable for isolating which phase is responsible for a slow LCP. If "render delay" is 800ms, the image downloaded fine but the main thread was busy doing something else before the browser could paint it. That's a long task blocking rendering, not a network problem.`,
    },
    {
      id: 1344,
      name: "Performance Insights Panel",
      desc: `**Performance Insights Panel** — Chrome DevTools' guided performance analysis panel (2022+) that presents recorded performance data as actionable insights with specific recommendations, rather than raw flame charts. Accessible via Cmd+Shift+P → "Show Performance Insights" or More Tools → Performance Insights.

**How it differs from Performance panel:** the standard Performance panel shows the raw trace and requires expertise to interpret. Performance Insights processes the same trace and surfaces specific issues: "LCP took 3.2s — render-blocking resources delayed rendering by 800ms" with a link to the offending resource.

**Insights provided:**
- **LCP breakdown:** shows TTFB, load delay, load duration, render delay with time attribution for each phase
- **Render-blocking requests:** lists CSS/JS files that blocked rendering, with their duration
- **Forced reflows:** highlights forced synchronous layouts with the offending function and line number
- **Long tasks:** lists long tasks by duration with attribution to specific scripts
- **Third-party impact:** groups third-party requests by domain and shows their total main thread impact

**Annotations:** you can add annotations (notes) to timeline events directly in the panel — useful for team performance debugging (annotate what the user was doing at each point).

**Interaction recording:** interact with the page while recording → Performance Insights shows each interaction's INP breakdown (input delay, processing time, presentation delay) inline.

**When to use which:** use Performance Insights for a quick guided audit ("what's wrong with this page?") and the standard Performance panel for deep debugging once you know which specific function or event to investigate.

**Key insight:** Performance Insights is designed for developers who find the flame chart overwhelming. It answers "what should I fix first?" directly. Start here for any new performance investigation — if the issue is simple, Insights provides the answer. If deeper investigation is needed, switch to the Performance panel with context from Insights.`,
    },
  ],
};

export default performanceTab;
