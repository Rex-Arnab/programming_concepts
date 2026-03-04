const rendering = {
  name: "Rendering & Paint",
  icon: "🎨",
  color: "#ec4899",
  concepts: [
    {
      id: 1353,
      name: "Critical Rendering Path",
      desc: `**Critical Rendering Path (CRP)** — the sequence of steps a browser must complete before it can display anything on screen: Parse HTML → Build DOM → Parse CSS → Build CSSOM → Combine into Render Tree → Layout → Paint → Composite. The CRP is why render-blocking resources delay FCP and LCP.

**Step-by-step:**
1. **HTML Parsing → DOM:** browser parses HTML bytes into tokens, builds the Document Object Model tree
2. **CSS Parsing → CSSOM:** every "link rel=stylesheet" or "style" block is parsed into the CSS Object Model
3. **Render Tree:** DOM + CSSOM combined — only visible nodes with computed styles
4. **Layout (Reflow):** browser calculates the exact position and size of every render tree node
5. **Paint (Raster):** drawing commands for each layer are recorded
6. **Composite:** layers are assembled by the GPU and displayed

**Why CSS blocks rendering:** the browser cannot build the Render Tree until the CSSOM is complete. Any CSS file in "link rel=stylesheet" in the head blocks the entire rendering pipeline until downloaded and parsed. This is why "move CSS to head" and "inline critical CSS" are valid optimizations.

**Why scripts block HTML parsing:** "script" tags without "async" or "defer" pause HTML parsing while the script downloads and executes (because scripts can use "document.write" to modify the DOM). "defer" runs scripts after parsing; "async" runs them as soon as downloaded.

**Optimizing the CRP:**
- Inline critical CSS (above-the-fold styles) → eliminate the CSSOM blocking request
- Add "defer" or "async" to scripts
- Preload the LCP image → discovered earlier, starts downloading sooner
- Use "rel=preconnect" for critical third-party domains

**Key insight:** every render-blocking resource in the head is a serialized dependency in the critical path. "link rel=stylesheet" for a 50KB CSS file adds: DNS + TCP + TLS + TTFB + download time to your FCP. Inlining above-the-fold styles and loading full CSS asynchronously eliminates this wait.`,
    },
    {
      id: 1354,
      name: "Reflow vs Repaint",
      desc: `**Reflow (Layout)** — the browser recalculates the positions and sizes of elements on the page. Triggered by any change that affects geometry: adding/removing DOM elements, changing "width", "height", "padding", "margin", "font-size", "border", or "display". Expensive because it may cascade — a parent element's size change can force re-layout of all children.

**Repaint** — the browser redraws pixels for a layer after a visual change that doesn't affect layout: changing "color", "background-color", "visibility", "outline", "box-shadow". Cheaper than reflow because positions don't change, but still requires rasterization.

**Cost hierarchy (cheapest to most expensive):**
1. **Composite only:** "transform" and "opacity" changes → GPU handles it, no CPU rendering
2. **Paint + Composite:** "color", "background-color" → pixels repainted, then composited
3. **Layout + Paint + Composite:** "width", "height", "top", "left" → everything recalculates

**Layout thrashing:** reading a layout property ("offsetWidth", "getBoundingClientRect", "scrollTop") after writing to the DOM forces a synchronous layout before the browser intended to batch it.

"// BAD — layout thrashing
items.forEach(item => {
  item.style.width = container.offsetWidth + 'px';  // Read forces layout, then write, repeat
});

// GOOD — batch reads before writes
const w = container.offsetWidth;  // Read once
items.forEach(item => { item.style.width = w + 'px'; });  // Write only"

**CSS properties that trigger layout:** caniuse.com/css-triggers (also "CSS Triggers" reference) lists every CSS property and which rendering phase it triggers.

**Key insight:** "animate with transform, not position" is the most impactful single rendering rule. "left: 100px" triggers layout → paint → composite on every animation frame. "transform: translateX(100px)" triggers only composite. The difference between a janky 15fps animation and a smooth 60fps one often comes down to this single property choice.`,
    },
    {
      id: 1355,
      name: "GPU Compositing & Layers",
      desc: `**GPU Compositing** — the final rendering stage where the GPU assembles pre-painted layer bitmaps into the final frame, without CPU involvement. The compositor thread runs independently of the main thread, meaning compositing continues even when the main thread is blocked by JavaScript.

**Why compositing matters for animation:** if an animation only changes "transform" or "opacity", the compositor can handle every frame without ever involving the main thread. Result: animations that stay at 60fps even when JavaScript is running long tasks.

**Promoting elements to their own layer (layer promotion):**
- "transform: translateZ(0)" or "translate3d(0,0,0)": the "null transform hack" — promoted to compositor layer even with no visible 3D effect
- "will-change: transform": the modern, semantic hint to the browser to prepare a layer in advance
- "position: fixed" elements automatically get their own layer (must move independently as user scrolls)
- "video", "canvas" elements
- Elements with CSS "filter" or "clip-path"

**Layer memory cost:** each compositor layer requires: width × height × 4 bytes of GPU memory (RGBA). A 1920×1080 layer = ~8MB. Promote layers sparingly — 20 promoted elements on a mobile device can consume 160MB of GPU memory, causing crashes.

**will-change best practices:**
- Add "will-change: transform" just before an animation starts (via JS class)
- Remove it after the animation ends
- Do NOT apply it globally in CSS to static elements "just in case" — you're creating permanent GPU layers

**Key insight:** the insight that made modern web animations fast is separating "what changes" from "how the browser handles change." Compositing separates rendering work onto a GPU thread. Animations that stay in the compositor lane are guaranteed smooth; animations that fall into the layout/paint lane are inherently jank-prone.`,
    },
    {
      id: 1356,
      name: "CSS Containment",
      desc: `**CSS Containment** — a CSS property ("contain") that allows you to isolate a DOM subtree from the rest of the document, telling the browser that changes inside the contained element cannot affect elements outside it. This enables the browser to skip re-layout and repaint of the rest of the page.

**"contain" values:**
- "contain: layout": changes inside don't affect external layout. The browser can independently lay out this subtree without considering the rest of the document.
- "contain: paint": the element's contents don't paint outside its bounds. Browser can skip painting this element when it's off-screen.
- "contain: size": the element's size doesn't depend on its children (you must set explicit width/height). Enables rendering optimizations.
- "contain: strict": applies layout + paint + size together — maximum isolation
- "contain: content": applies layout + paint (most practical choice; doesn't require explicit size)

**"content-visibility: auto"** — more powerful than "contain": the browser completely skips rendering off-screen elements (with "contain: strict" automatically applied when off-screen). Dramatic scroll performance improvement for long pages.

"/* Large list optimization: skip rendering off-screen items */
.card { content-visibility: auto; contain-intrinsic-size: 0 300px; }"

"contain-intrinsic-size" gives the browser a size estimate for layout purposes before the element renders — prevents layout shifts when items come into view.

**Real-world impact:** Google found that "content-visibility: auto" on long article pages reduced initial rendering time by 50–400ms. For pages with thousands of DOM elements, containment is the most impactful single CSS performance technique.

**Key insight:** CSS Containment is the specification-level answer to "how does the browser know that changing one component doesn't require re-laying out the entire page?" Without containment, any DOM change is potentially global. With containment, the browser can do minimum-scope recalculations, making complex component-heavy pages significantly faster.`,
    },
    {
      id: 1357,
      name: "Rendering Panel & Paint Flashing",
      desc: `**Rendering Panel** — Chrome DevTools overlay tools (More Tools → Rendering, or Cmd+Shift+P → "Rendering") that visualize browser rendering behavior in real time on the live page. Provides overlays for paint, layers, scroll performance, frame rate, and more.

**Key rendering overlays:**
- **Paint flashing (green overlay):** highlights which areas of the page are being repainted in each frame. Scroll the page — static content should NOT flash green (it's composited). If the entire page flashes green during scroll, an element is forcing a full repaint on every scroll frame (often caused by a "box-shadow" or non-composited "position: fixed" element).
- **Layer borders (orange/blue borders):** shows compositor layer boundaries. Orange = layer promoted to its own texture. Blue = scroll container. Use to verify that promoted elements have layers and identify unexpected layer proliferation.
- **FPS meter:** real-time frame rate and GPU memory gauge in the top-right corner
- **Scrolling performance issues (teal overlay):** highlights scroll event listeners that may block scrolling (non-passive scroll listeners). Modern Chrome warns about this; the overlay makes it visual.
- **Core Web Vitals overlay:** shows real-time LCP, CLS, FID/INP values on the live page — useful for testing during development without running Lighthouse

**Frame Rendering Stats:** more detailed than FPS meter — shows GPU memory, current frame rate, and a rolling histogram of frame durations.

**"Emulate CSS media features":** simulate prefers-color-scheme (dark/light), prefers-reduced-motion, forced-colors, prefers-contrast — without changing system settings.

**Key insight:** paint flashing is the fastest visual diagnostic for "why is my animation janky?" If you see the entire viewport flashing green when only a small element should be animating, you have a paint containment problem. The fix is usually either "will-change: transform" on the animating element or converting a "background-color" animation to an "opacity" animation on a child element.`,
    },
    {
      id: 1358,
      name: "Layout Instability & CLS Debugging",
      desc: `**Layout Instability API** — a browser API that reports unexpected layout shifts to JavaScript, providing the shifted elements, their impact fractions, and the shift's source (what caused it). The foundation of the CLS metric measurement.

**PerformanceObserver for layout shifts:**
"const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {  // Only count unexpected shifts
      console.log('Layout shift:', entry.value, 'Sources:', entry.sources);
      entry.sources.forEach(src => console.log(' Shifted:', src.node, 'from', src.previousRect, 'to', src.currentRect));
    }
  }
});
observer.observe({ type: 'layout-shift', buffered: true });"

**CLS debugging workflow in DevTools:**
1. Performance panel → record page load
2. Look for "Layout Shift" markers (red triangles) in the Experience row
3. Click a Layout Shift event → Details panel shows the shifted elements and their coordinates
4. Identify the cause: was it an image loading? A font swap? Dynamic content injection?

**Common CLS patterns and fixes:**
- Image without width/height → Add "width" and "height" attributes matching intrinsic dimensions
- Font swap (FOUT) changing text size → Use "font-display: optional" or size-adjust fallback fonts
- Late-injected banner/ad → Reserve space with a min-height container before injection
- Content inserted above the fold → Use "transform: translateY" insertion (compositor-only, no layout shift)

**"hadRecentInput" flag:** layout shifts caused by user input (typing, clicking) are excluded from CLS score. Only "unexpected" shifts count — shifts the user didn't cause within 500ms of interaction.

**Key insight:** CLS debugging without the Layout Instability API is like debugging a race condition without logging — you see the result but not the cause. The API's "sources" array tells you exactly which element shifted and by how much, turning a "the page jumps somewhere on load" mystery into a "the hero image at #main shifts 180px downward when the font loads" actionable finding.`,
    },
    {
      id: 1359,
      name: "requestAnimationFrame & Animation Performance",
      desc: `**requestAnimationFrame (rAF)** — browser API for scheduling visual updates synchronized with the browser's rendering cycle. "requestAnimationFrame(callback)" runs the callback before the next frame is painted, ensuring animations are smooth and efficient.

**Why use rAF instead of setTimeout:**
- "setTimeout(fn, 0)" fires when the call stack is empty — could be 17ms after the last frame, or 33ms, causing frame skips
- "rAF" fires exactly once per frame, at the optimal time before the browser paints
- "rAF" is automatically throttled in background tabs (saving CPU/battery)
- "rAF" receives a "DOMHighResTimeStamp" argument for frame-accurate animation calculations

**Animation loop pattern:**
"function animate(timestamp) {
  const elapsed = timestamp - startTime;
  element.style.transform = 'translateX(' + (elapsed * 0.1) + 'px)';
  if (elapsed < duration) requestAnimationFrame(animate);
}
requestAnimationFrame(animate);"

**FLIP animation technique (First, Last, Invert, Play):**
1. Record element's starting position ("getBoundingClientRect")
2. Instantly apply the final state (CSS class change)
3. Record ending position
4. Invert: apply a "transform" that makes it look like the starting position
5. Play: remove the inverted transform (animates via "transform" only)

This technique allows animating layout properties (height, position) using only compositor-safe "transform", completely avoiding layout triggers during animation.

**CSS vs JS animations:** CSS transitions/animations run on the compositor thread when they only change "transform"/"opacity". JS animations via rAF can also run compositor-only if they only modify these properties. "Web Animations API" is the modern programmatic alternative to both.

**Key insight:** the FLIP technique is the key to animating layout changes smoothly. You cannot smoothly animate "height: 0 → auto" or "position" changes directly — they trigger layout every frame. FLIP pre-computes the positions and converts the animation into a "transform" animation (compositor-only), enabling smooth 60fps transitions of what appears to be layout changes.`,
    },
    {
      id: 1360,
      name: "Virtual DOM & Reconciliation Performance",
      desc: `**Virtual DOM (vDOM)** — a JavaScript representation of the actual DOM tree, maintained in memory by frameworks like React and Vue. On state change, the framework diffs the new vDOM against the previous one ("reconciliation") and batches the minimum set of actual DOM mutations.

**Why it helps:** direct DOM manipulation (appending/removing nodes, changing styles) is expensive. By diffing JavaScript objects first, frameworks minimize expensive DOM operations. The vDOM itself isn't faster than the DOM — the batching and minimization strategy is the optimization.

**React reconciliation (Fiber):** React 16+ uses "Fiber" — a reconciler that can pause, abort, or reuse work. Key insights:
- "key" prop is critical for list reconciliation — without it, React re-renders all list items on any change; with stable keys, it only updates changed items
- Component trees that don't change shouldn't re-render — use "React.memo", "useMemo", "useCallback" to prevent unnecessary reconciliation

**React Profiler:** DevTools "Profiler" tab (React DevTools extension) shows which components re-rendered, why, and for how long. The flame chart shows component render durations — essential for finding unnecessary re-renders.

**Common reconciliation bottlenecks:**
- Long lists without virtualization (React Virtualized, TanStack Virtual): 1000 DOM nodes all re-rendering vs only 20 visible viewport nodes
- Deep component trees re-rendering from root state changes
- Inline object/function props breaking memo ("value={{a: 1}}" creates new object every render)

**Signals-based frameworks (Solid.js, Preact Signals):** no vDOM diff — components are compiled to targeted DOM updates at the signal level. Avoids reconciliation cost entirely for fine-grained reactive updates.

**Key insight:** React re-renders happen silently, frequently, and often unnecessarily. Install React DevTools, open the Profiler tab, enable "Highlight updates when components render," then interact with your app. Seeing which components flash on a simple click often reveals that 80% of re-renders are unnecessary — fixable with memo or state restructuring.`,
    },
    {
      id: 1361,
      name: "Back/Forward Cache (bfcache)",
      desc: `**Back/Forward Cache (bfcache)** — a browser optimization that stores a complete in-memory snapshot of a page (including JavaScript heap) when the user navigates away, enabling instant restoration (typically < 100ms) when they press Back or Forward.

**Why it's a huge performance win:** standard back navigation requires a full page load (network + HTML parse + JS execute + render). bfcache makes it instantaneous — the frozen page is thawed and displayed. Google data shows bfcache reduces back-navigation load time from 2+ seconds to under 100ms.

**bfcache eligibility requirements:** a page is disqualified from bfcache if it:
- Has an "unload" event listener (the most common disqualifier — avoid "unload", use "pagehide" instead)
- Uses "Cache-Control: no-store" on the main document
- Has an open IndexedDB transaction
- Has an open WebSocket or WebRTC connection at navigation time
- Has registered "window.opener" relationship (popup)
- Has certain "cross-origin iframes" that are not bfcache eligible

**Testing bfcache eligibility:** Application tab → Back/forward cache → click "Test back/forward cache" → Chrome navigates away and back, then reports pass/fail with specific disqualification reasons.

**Page lifecycle events for bfcache:**
- "pagehide" event: fires when page is hidden (may be going to bfcache — check "event.persisted === true")
- "pageshow" event: fires when page is shown (may be from bfcache — check "event.persisted === true")
- "freeze"/"resume" events (newer): more explicit bfcache lifecycle hooks

**Key insight:** removing a single "window.addEventListener('unload', handler)" is often the highest-ROI performance change for content-heavy sites with high back-navigation rates (news, docs, e-commerce). Replace "unload" with "pagehide" and gain instant back navigation for all users — free performance.`,
    },
    {
      id: 1362,
      name: "Speculative Loading & Prerendering",
      desc: `**Speculative Loading** — the browser fetching or fully rendering pages the user is likely to navigate to next, before they actually navigate. When the prediction is correct, navigation is instant. Managed via the Speculation Rules API or legacy "rel=prefetch/prerender" hints.

**Speculation Rules API (Chrome 108+):** declare navigation predictions in JSON embedded in the page:
"script type='speculationrules'
{ 'prerender': [{ 'source': 'list', 'urls': ['/product/123', '/checkout'] }] }
/script"

**Prerender vs prefetch:**
- "prefetch": download the resource (HTML, CSS, JS) and cache it — navigating to the URL still requires parse + render, but network cost is eliminated
- "prerender": fully render the page in a hidden background tab (including JavaScript execution) — navigation is truly instant as the complete rendered page is swapped in

**Debugging speculative loads:** Application tab → Background services → Speculative loads → shows each speculation rule, its status (pending/running/success/failure), and the prerendered page's resource loading.

**Prediction strategies:**
- **List-based:** hardcode URLs you know users will visit (checkout flow, next article)
- **Document rules:** "source: 'document'" with URL pattern matching — browser speculatively prerenders links matching the pattern as user hovers
- Hover-based heuristics (via libraries like Quicklink, guess.js)

**Cost of mispredictions:** prefetch mispredictions waste bandwidth. Prerender mispredictions waste CPU and memory. Use prerender for high-confidence next steps (checkout, login after cart); use prefetch for medium-confidence predictions.

**Key insight:** prerendering is the ultimate loading performance optimization — it eliminates all perceived navigation latency for predicted routes. A prerendered checkout page appears to load in 0ms. The Speculation Rules API is the modern, controllable version of what libraries like Instant.page have been doing for years, now natively supported by Chrome.`,
    },
  ],
};

export default rendering;
