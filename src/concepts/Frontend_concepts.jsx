import { useState } from "react";

export const meta = {
  title: "Frontend Concepts",
  description: "180 essential frontend development concepts from HTML to WebGPU",
};

const categories = [
  {
    name: "HTML & Semantics",
    icon: "◆",
    color: "#E44D26",
    concepts: [
      { id: 1, name: "HTML5 Semantic Elements", desc: "Elements with meaning: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>, <figure>. Improves accessibility, SEO, and code readability." },
      { id: 2, name: "Document Object Model (DOM)", desc: "Tree-structured representation of HTML. Browsers parse HTML into the DOM. JavaScript interacts with it to read, modify, add, and remove elements." },
      { id: 3, name: "Shadow DOM", desc: "Encapsulated DOM tree attached to an element. Styles and markup are scoped — no leaking in or out. Foundation of Web Components." },
      { id: 4, name: "Virtual DOM", desc: "In-memory representation of the real DOM (React). Changes diffed against previous state, then minimal real DOM updates applied. Batch rendering for performance." },
      { id: 5, name: "Web Components", desc: "Native browser standard for reusable components: Custom Elements, Shadow DOM, HTML Templates, ES Modules. Framework-agnostic. No build step required." },
      { id: 6, name: "Forms & Validation", desc: "Native HTML form controls, input types (email, date, number), required attribute, pattern regex, constraint validation API. Reduces JavaScript needs." },
      { id: 7, name: "Accessibility (a11y) in HTML", desc: "ARIA roles and attributes, landmark elements, alt text, label associations, tabindex, live regions. Semantic HTML is the first and best a11y layer." },
      { id: 8, name: "Meta Tags & SEO", desc: "Title, description, viewport, canonical, Open Graph, Twitter Cards, robots, structured data (JSON-LD). Control how pages appear in search and social." },
      { id: 9, name: "Content Security Policy (CSP)", desc: "HTTP header restricting which resources can load. Prevents XSS by whitelisting script sources. Inline scripts blocked unless explicitly allowed." },
      { id: 10, name: "Responsive Images", desc: "<picture> element, srcset, sizes attributes. Serve different images based on viewport, resolution, or format (WebP, AVIF). Art direction and performance." },
    ],
  },
  {
    name: "CSS & Styling",
    icon: "⬡",
    color: "#2965F1",
    concepts: [
      { id: 11, name: "CSS Box Model", desc: "Every element is a box: content → padding → border → margin. box-sizing: border-box includes padding/border in width. Foundation of all CSS layout." },
      { id: 12, name: "Flexbox", desc: "One-dimensional layout system (row or column). justify-content, align-items, flex-grow/shrink/basis, gap. Ideal for component-level layouts and alignment." },
      { id: 13, name: "CSS Grid", desc: "Two-dimensional layout system (rows and columns). grid-template, grid-area, auto-fit/auto-fill, minmax(). Ideal for page-level layouts and complex grids." },
      { id: 14, name: "CSS Specificity", desc: "How browsers decide which styles win: inline (1000) > ID (100) > class/attr/pseudo-class (10) > element (1). !important overrides all. Avoid specificity wars." },
      { id: 15, name: "CSS Cascade & Inheritance", desc: "Cascade: origin, specificity, order determine which rule applies. Inheritance: some properties (color, font) inherit from parent, others (margin, padding) don't." },
      { id: 16, name: "CSS Custom Properties (Variables)", desc: "Native CSS variables: --primary: #3B82F6; used via var(--primary). Cascade and inherit. Can be changed at runtime with JS. Theming foundation." },
      { id: 17, name: "CSS Preprocessors (Sass/Less)", desc: "Languages extending CSS with variables, nesting, mixins, functions, imports. Compiled to CSS. Sass (.scss) is the most popular. Being replaced by native CSS features." },
      { id: 18, name: "CSS-in-JS", desc: "Writing CSS in JavaScript: styled-components, Emotion, Stitches. Scoped styles, dynamic values, colocation. Trade-off: runtime cost vs DX." },
      { id: 19, name: "Utility-First CSS (Tailwind)", desc: "Composing UI from small utility classes: flex, p-4, text-lg, bg-blue-500. Tailwind CSS is the standard. Fast prototyping, consistent design, larger HTML." },
      { id: 20, name: "CSS Modules", desc: "CSS files where class names are locally scoped by default. import styles from './Button.module.css'. No global conflicts. Built into Next.js and Vite." },
      { id: 21, name: "BEM Methodology", desc: "Block-Element-Modifier naming convention: .card, .card__title, .card--featured. Predictable structure, avoids conflicts. Still relevant for large codebases." },
      { id: 22, name: "Responsive Design", desc: "Adapting layout to any screen size. Media queries, fluid typography (clamp()), container queries, relative units (rem, em, vw, vh, %), mobile-first approach." },
      { id: 23, name: "Container Queries", desc: "Style elements based on their container's size, not the viewport. @container. Component-level responsiveness. The missing piece of responsive design." },
      { id: 24, name: "CSS Animations & Transitions", desc: "Transitions: smooth property changes on state change. Animations: @keyframes for complex multi-step sequences. transform and opacity are GPU-accelerated." },
      { id: 25, name: "CSS Logical Properties", desc: "Direction-agnostic properties: margin-inline-start instead of margin-left. Supports RTL and vertical writing modes automatically." },
      { id: 26, name: "CSS :has() Selector", desc: "Parent selector: style a parent based on its children. .card:has(img) { }. Long-awaited feature. Eliminates many JS-based styling needs." },
      { id: 27, name: "CSS Layers (@layer)", desc: "Explicitly control cascade order. Define layer priority: @layer base, components, utilities. Solves specificity conflicts between libraries and custom styles." },
      { id: 28, name: "CSS Subgrid", desc: "Child grid inherits parent grid tracks. Align nested elements to the parent's grid lines. Solves card layout alignment problems." },
      { id: 29, name: "View Transitions API", desc: "Native browser API for animated transitions between page states or navigations. Smooth crossfades, morphing animations. CSS-driven, no JS animation library needed." },
    ],
  },
  {
    name: "JavaScript Core",
    icon: "⬢",
    color: "#F7DF1E",
    concepts: [
      { id: 30, name: "ES6+ Features", desc: "Arrow functions, destructuring, template literals, spread/rest, default params, classes, modules, symbols, iterators. Modern JS foundation." },
      { id: 31, name: "Closures", desc: "A function that retains access to its outer scope's variables even after the outer function has returned. Foundation of data privacy, callbacks, and currying." },
      { id: 32, name: "Promises & Async/Await", desc: "Promises: object representing eventual completion/failure. async/await: syntactic sugar for cleaner async code. try/catch for error handling." },
      { id: 33, name: "Event Loop", desc: "JS is single-threaded. The event loop processes the call stack, then microtasks (Promises), then macrotasks (setTimeout, I/O). Understanding this prevents bugs." },
      { id: 34, name: "Prototypal Inheritance", desc: "Objects inherit from other objects via prototype chain. __proto__, Object.create(), class syntax is sugar over prototypes. Different from classical OOP." },
      { id: 35, name: "this Keyword", desc: "Context-dependent reference. In methods: the object. In functions: global/undefined. Arrow functions: lexical this from enclosing scope. bind/call/apply override it." },
      { id: 36, name: "Scope & Hoisting", desc: "var: function-scoped, hoisted. let/const: block-scoped, temporal dead zone. Function declarations hoisted, expressions are not. const ≠ immutable." },
      { id: 37, name: "Modules (ESM vs CommonJS)", desc: "ESM: import/export, static, tree-shakeable, browser-native. CommonJS: require/module.exports, dynamic, Node.js original. ESM is the standard going forward." },
      { id: 38, name: "Destructuring & Spread", desc: "Destructuring: extract values from objects/arrays. Spread: expand iterables. Rest: collect remaining. const { name, ...rest } = obj; const arr = [...a, ...b];" },
      { id: 39, name: "Map, Set, WeakMap, WeakSet", desc: "Map: key-value pairs (any key type). Set: unique values. Weak variants: keys are weakly held, garbage-collectable. Useful for caches and metadata." },
      { id: 40, name: "Proxy & Reflect", desc: "Proxy: intercept object operations (get, set, delete). Reflect: standard methods for object operations. Powers Vue 3 reactivity and validation layers." },
      { id: 41, name: "Generators & Iterators", desc: "Generators: functions that yield values lazily. Iterators: objects implementing next(). for...of consumes iterables. Async generators for streaming data." },
      { id: 42, name: "Web Workers", desc: "Run JavaScript in background threads. No DOM access but can do heavy computation without blocking the UI. SharedArrayBuffer for shared memory." },
      { id: 43, name: "Service Workers", desc: "Proxy between browser and network. Enables offline support, push notifications, background sync. Foundation of Progressive Web Apps. Runs in separate thread." },
    ],
  },
  {
    name: "TypeScript",
    icon: "◈",
    color: "#3178C6",
    concepts: [
      { id: 44, name: "TypeScript Basics", desc: "Typed superset of JavaScript. Static type checking at compile time. Interfaces, enums, generics, type inference. Catches bugs before runtime." },
      { id: 45, name: "Type Inference", desc: "TS automatically infers types from assignments: const x = 5 is number. Reduces verbosity. Hover in IDE to see inferred types. Let the compiler work." },
      { id: 46, name: "Interfaces vs Types", desc: "Both define object shapes. Interfaces: extendable with extends, declaration merging. Types: unions, intersections, mapped types, conditional types. Use types for flexibility." },
      { id: 47, name: "Generics", desc: "Parameterized types: function identity<T>(arg: T): T. Enables reusable, type-safe code. Array<T>, Promise<T>, Record<K, V>. Constraints with extends." },
      { id: 48, name: "Union & Intersection Types", desc: "Union: string | number (either). Intersection: A & B (both). Discriminated unions for type narrowing: { type: 'success', data } | { type: 'error', message }." },
      { id: 49, name: "Type Guards & Narrowing", desc: "Techniques to narrow types: typeof, instanceof, in operator, custom type predicates (is), assertion functions. Makes union types safe to use." },
      { id: 50, name: "Utility Types", desc: "Built-in type transformations: Partial<T>, Required<T>, Pick<T, K>, Omit<T, K>, Record<K, V>, Readonly<T>, ReturnType<T>, Parameters<T>." },
      { id: 51, name: "Enums vs Const Assertions", desc: "Enums: named constants (numeric or string). as const: readonly literal types from objects. as const preferred — smaller bundle, no runtime code." },
      { id: 52, name: "Strict Mode", desc: "strict: true enables all strict checks: strictNullChecks, noImplicitAny, strictFunctionTypes, etc. Always enable. Non-strict TS loses most benefits." },
      { id: 53, name: "Declaration Files (.d.ts)", desc: "Type definitions for JS libraries. DefinitelyTyped (@types/react). Enables TS to understand untyped packages. Generate with tsc --declaration." },
      { id: 54, name: "Mapped & Conditional Types", desc: "Mapped: transform all properties { [K in keyof T]: boolean }. Conditional: T extends string ? A : B. Powerful for library-level type utilities." },
      { id: 55, name: "Template Literal Types", desc: "Type-level string manipulation: type Route = `/api/${string}`. Combine with unions for exhaustive route typing. Powers frameworks like tRPC and Hono." },
    ],
  },
  {
    name: "Frameworks & Libraries",
    icon: "⬣",
    color: "#61DAFB",
    concepts: [
      { id: 56, name: "React", desc: "Component-based UI library. JSX, hooks, virtual DOM, unidirectional data flow. Massive ecosystem. Most popular frontend library by far." },
      { id: 57, name: "React Hooks", desc: "Functions for state and side effects in function components: useState, useEffect, useContext, useReducer, useMemo, useCallback, useRef, useTransition." },
      { id: 58, name: "React Server Components (RSC)", desc: "Components that render on the server with zero client JS. Fetch data directly. Mixed with client components for interactivity. Next.js App Router native." },
      { id: 59, name: "Next.js", desc: "React meta-framework. App Router, Server Components, file-based routing, SSR/SSG/ISR, API routes, middleware, image optimization. The React production standard." },
      { id: 60, name: "Vue.js", desc: "Progressive framework. Composition API (ref, reactive, computed, watch), SFC (.vue files), template syntax, Pinia for state. Gentle learning curve." },
      { id: 61, name: "Nuxt", desc: "Vue meta-framework. File-based routing, SSR/SSG, auto-imports, Nitro server engine, modules ecosystem. Vue's answer to Next.js." },
      { id: 62, name: "Angular", desc: "Full-featured framework by Google. TypeScript-first, dependency injection, RxJS, signals, two-way binding, CLI, opinionated structure. Enterprise-focused." },
      { id: 63, name: "Svelte / SvelteKit", desc: "Compile-time framework — no virtual DOM. Reactive assignments, $: declarations, .svelte files. SvelteKit for full-stack. Smallest bundle sizes." },
      { id: 64, name: "Astro", desc: "Content-focused framework. Zero JS by default, Islands Architecture (partial hydration), multi-framework support. Ideal for blogs, docs, marketing sites." },
      { id: 65, name: "Solid.js", desc: "Fine-grained reactivity without virtual DOM. Looks like React (JSX, hooks-like API) but compiles to direct DOM updates. Fastest runtime benchmarks." },
      { id: 66, name: "Qwik", desc: "Resumability over hydration. Serializes application state to HTML. JS loaded lazily on interaction, not upfront. Instant interactivity for any page size." },
      { id: 67, name: "htmx", desc: "Extends HTML with attributes for AJAX, WebSockets, and SSE. hx-get, hx-post, hx-swap. Server returns HTML fragments. Simplicity-first approach." },
      { id: 68, name: "React Native / Expo", desc: "Build native mobile apps with React. Native components, not WebViews. Expo simplifies setup, builds, and deployment. Shared logic between web and mobile." },
    ],
  },
  {
    name: "State Management",
    icon: "↯",
    color: "#764ABC",
    concepts: [
      { id: 69, name: "Component State (useState)", desc: "Local state within a single component. The simplest form. useState in React, ref() in Vue, $state in Svelte. Start here, escalate when needed." },
      { id: 70, name: "Context / Provide-Inject", desc: "Share state across component tree without prop drilling. React Context, Vue provide/inject. Good for themes, auth, locale. Not ideal for frequent updates." },
      { id: 71, name: "Redux / Redux Toolkit", desc: "Centralized store with predictable state updates via actions and reducers. Redux Toolkit simplifies boilerplate. Middleware for async (thunks, sagas)." },
      { id: 72, name: "Zustand", desc: "Minimal, hook-based state management for React. No boilerplate, no providers. const useStore = create((set) => ({...})). Rapidly replacing Redux." },
      { id: 73, name: "Jotai / Recoil", desc: "Atomic state management. Each atom is an independent piece of state. Derived atoms for computed values. Bottom-up approach vs Redux's top-down." },
      { id: 74, name: "MobX / Valtio", desc: "Proxy-based reactive state. Mutate state directly, UI updates automatically. MobX (observable/action), Valtio (proxy snapshots). Feels like vanilla JS." },
      { id: 75, name: "Pinia", desc: "Vue's official state management. Stores with state, getters, actions. TypeScript-native, devtools support, hot module replacement. Replaced Vuex." },
      { id: 76, name: "Server State (TanStack Query)", desc: "Managing async server data: caching, deduplication, background refetching, stale-while-revalidate, pagination, optimistic updates. React Query / TanStack Query." },
      { id: 77, name: "URL as State", desc: "Storing UI state in the URL: search params, hash, pathname. Shareable, bookmarkable, works with back/forward. nuqs, next-usequerystate." },
      { id: 78, name: "State Machines (XState)", desc: "Modeling state as finite state machines or statecharts. Explicit states and transitions. Prevents impossible states. Complex workflows, multi-step forms." },
      { id: 79, name: "Signals", desc: "Fine-grained reactive primitives. Auto-track dependencies, update only what changed. Solid.js, Preact, Angular, Vue's ref. More efficient than virtual DOM diffing." },
      { id: 80, name: "Immutability Patterns", desc: "Never mutate state directly. Spread operator, Object.assign, structuredClone, Immer (produce). Required for React re-renders and time-travel debugging." },
    ],
  },
  {
    name: "Performance",
    icon: "⊞",
    color: "#22C55E",
    concepts: [
      { id: 81, name: "Core Web Vitals", desc: "Google's UX metrics: LCP (Largest Contentful Paint <2.5s), INP (Interaction to Next Paint <200ms), CLS (Cumulative Layout Shift <0.1). Affects SEO ranking." },
      { id: 82, name: "Code Splitting", desc: "Breaking bundles into smaller chunks loaded on demand. Route-based splitting, dynamic import(), React.lazy(). Users download only what they need." },
      { id: 83, name: "Lazy Loading", desc: "Deferring loading of non-critical resources. Images: loading='lazy'. Components: React.lazy() + Suspense. Routes: dynamic imports. Reduces initial load." },
      { id: 84, name: "Tree Shaking", desc: "Dead code elimination during bundling. Removes unused exports. Requires ES modules (import/export). Webpack, Rollup, esbuild all support it." },
      { id: 85, name: "Bundle Analysis", desc: "Visualizing what's in your JavaScript bundles. webpack-bundle-analyzer, source-map-explorer, bundlephobia. Find and eliminate bloat. Import cost matters." },
      { id: 86, name: "Image Optimization", desc: "Modern formats (WebP, AVIF), responsive sizes (srcset), lazy loading, CDN delivery, blur placeholders, next/image component. Images are often the biggest bottleneck." },
      { id: 87, name: "Font Optimization", desc: "font-display: swap, preloading critical fonts, subsetting, variable fonts, system font stacks, local() fallbacks. Fonts cause layout shifts and render blocking." },
      { id: 88, name: "Memoization (useMemo / useCallback)", desc: "Caching expensive computations (useMemo) or function references (useCallback) between renders. Avoid premature optimization — profile first." },
      { id: 89, name: "React.memo & shouldComponentUpdate", desc: "Skip re-rendering components when props haven't changed. React.memo for function components. Shallow comparison by default. Custom comparator for deep." },
      { id: 90, name: "Virtualization (Windowing)", desc: "Rendering only visible items in long lists/tables. react-window, react-virtuoso, TanStack Virtual. Renders 50 items instead of 10,000. Massive perf win." },
      { id: 91, name: "Debouncing & Throttling", desc: "Debounce: delay execution until input stops (search). Throttle: execute at most once per interval (scroll). Reduce expensive function calls." },
      { id: 92, name: "requestAnimationFrame", desc: "Schedule work before the next repaint (~60fps). Smooth animations, efficient DOM reads/writes. Prefer over setTimeout for visual updates." },
      { id: 93, name: "Resource Hints", desc: "preload (fetch now), prefetch (fetch later), preconnect (establish connection), dns-prefetch. Tell the browser what's coming next." },
      { id: 94, name: "Critical Rendering Path", desc: "Steps browser takes to render: parse HTML → build DOM → parse CSS → CSSOM → render tree → layout → paint. Optimize each stage for faster first render." },
      { id: 95, name: "Hydration & Partial Hydration", desc: "Hydration: attaching JS to server-rendered HTML. Expensive for large apps. Partial/progressive hydration: only hydrate interactive parts. Islands Architecture." },
      { id: 96, name: "Streaming SSR", desc: "Server sends HTML in chunks as it's generated. User sees content progressively. React renderToPipeableStream, Next.js streaming. Reduces TTFB." },
    ],
  },
  {
    name: "Rendering & Architecture",
    icon: "⟐",
    color: "#A855F7",
    concepts: [
      { id: 97, name: "Client-Side Rendering (CSR)", desc: "Browser downloads minimal HTML + JS bundle, renders everything client-side. Fast navigations after initial load. Slower first paint, poor SEO without workarounds." },
      { id: 98, name: "Server-Side Rendering (SSR)", desc: "Server generates full HTML for each request. Fast first paint, good SEO. Higher server cost, full page re-renders unless combined with client hydration." },
      { id: 99, name: "Static Site Generation (SSG)", desc: "Pages pre-built at build time as static HTML. Fastest possible delivery (CDN-served). Ideal for content that doesn't change per-request. Gatsby, Astro, Next.js." },
      { id: 100, name: "Incremental Static Regeneration (ISR)", desc: "Static pages rebuilt in the background after a revalidation period. Combines SSG speed with dynamic freshness. Next.js revalidate option." },
      { id: 101, name: "Islands Architecture", desc: "Static HTML page with interactive 'islands' that hydrate independently. Rest of the page stays static HTML. Astro pioneered this. Minimal JS shipped." },
      { id: 102, name: "Single-Page Application (SPA)", desc: "One HTML page, JS handles all routing and rendering. No full page reloads. React Router, Vue Router. Fast UX but initial load can be heavy." },
      { id: 103, name: "Multi-Page Application (MPA)", desc: "Traditional model: each route is a separate HTML page from the server. Full page reloads. Simple, good SEO, no JS required. htmx, Rails, Django." },
      { id: 104, name: "Micro-Frontends", desc: "Splitting frontend into independently deployable pieces owned by different teams. Module Federation, single-spa, iframe-based. Like microservices for the frontend." },
      { id: 105, name: "Jamstack", desc: "JavaScript + APIs + Markup. Pre-rendered frontends with dynamic features via APIs. CDN-first, decoupled architecture. Vercel, Netlify ecosystem." },
      { id: 106, name: "Component-Driven Development", desc: "Building UIs from the bottom up: atoms → molecules → organisms → templates → pages. Storybook for development. Isolated, reusable, testable components." },
      { id: 107, name: "Monorepo Frontend", desc: "Multiple packages/apps in one repo. Turborepo, Nx, pnpm workspaces. Shared components, consistent tooling, atomic commits across projects." },
      { id: 108, name: "Design Systems", desc: "Shared library of reusable components, tokens, and guidelines. Material UI, Radix, shadcn/ui, Chakra. Ensures consistency and accelerates development." },
    ],
  },
  {
    name: "Tooling & Build",
    icon: "⟡",
    color: "#EAB308",
    concepts: [
      { id: 109, name: "Package Managers (npm/yarn/pnpm)", desc: "Install and manage dependencies. npm: default. yarn: deterministic, workspaces. pnpm: fastest, disk-efficient symlinks, strict by default. Lock files are critical." },
      { id: 110, name: "Bundlers (Webpack/Vite/esbuild)", desc: "Transform and bundle source code for browsers. Webpack: mature, configurable. Vite: fast dev server (ESM), Rollup for prod. esbuild: Go-based, blazing fast." },
      { id: 111, name: "Vite", desc: "Next-gen build tool. Instant dev server via native ESM, HMR in milliseconds, Rollup-based production builds. Default for Vue, Svelte, and increasingly React." },
      { id: 112, name: "Transpilers (Babel/SWC)", desc: "Convert modern JS/TS to browser-compatible JS. Babel: mature, plugin ecosystem. SWC: Rust-based, 20–70x faster. Next.js uses SWC by default." },
      { id: 113, name: "Linters (ESLint / Biome)", desc: "Static analysis for code quality and consistency. ESLint: most popular, plugin-rich. Biome: all-in-one Rust-based linter + formatter. Catch bugs and enforce style." },
      { id: 114, name: "Formatters (Prettier / Biome)", desc: "Opinionated code formatting. Prettier: standard, supports many languages. Biome: faster alternative. Format on save eliminates style debates." },
      { id: 115, name: "Hot Module Replacement (HMR)", desc: "Update modules in the browser without full page reload. Preserves application state during development. Vite and Webpack both support it." },
      { id: 116, name: "Source Maps", desc: "Map bundled/minified code back to original source. Essential for debugging in production. devtool options control quality vs build speed trade-off." },
      { id: 117, name: "Module Federation", desc: "Webpack 5 feature for sharing code between independently deployed apps at runtime. Foundation of micro-frontends. Dynamic remote modules." },
      { id: 118, name: "Turbopack / Rspack", desc: "Next-gen Rust-based bundlers. Turbopack (Vercel/Next.js): incremental computation. Rspack: Webpack-compatible but much faster. Replacing JS-based tooling." },
      { id: 119, name: "Storybook", desc: "Component workshop for building UI in isolation. Stories document component states. Visual testing, accessibility checks, interaction tests. Living documentation." },
      { id: 120, name: "Monorepo Tools (Turborepo / Nx)", desc: "Orchestrate builds across packages. Caching, task pipelines, affected detection, parallel execution. Turborepo: simple. Nx: feature-rich, generators." },
    ],
  },
  {
    name: "Routing & Data Fetching",
    icon: "◎",
    color: "#F43F5E",
    concepts: [
      { id: 121, name: "Client-Side Routing", desc: "JavaScript-managed navigation without page reloads. React Router, Vue Router, TanStack Router. History API (pushState) or hash-based. SPA foundation." },
      { id: 122, name: "File-Based Routing", desc: "File system determines routes. pages/about.tsx → /about. Next.js, Nuxt, SvelteKit, Remix. Convention over configuration. Layouts via nested folders." },
      { id: 123, name: "Nested Layouts & Routes", desc: "Routes compose with shared layouts. Parent layout persists while child route changes. Outlet in React Router, slot in SvelteKit. Preserves state." },
      { id: 124, name: "Dynamic Routes & Params", desc: "Route segments as variables: /users/[id], /blog/[...slug]. Params accessible in components. Catch-all routes for flexible URL patterns." },
      { id: 125, name: "Route Guards / Middleware", desc: "Logic that runs before navigation: auth checks, redirects, data loading. Next.js middleware, Vue navigation guards, React Router loaders." },
      { id: 126, name: "fetch API", desc: "Native browser API for HTTP requests. Promise-based, supports streaming, AbortController for cancellation. Replaced XMLHttpRequest. Works in Node 18+." },
      { id: 127, name: "Axios / ky / ofetch", desc: "HTTP client libraries with better DX than raw fetch. Interceptors, automatic retries, timeout, response transforms. Axios most popular, ky is lighter." },
      { id: 128, name: "TanStack Query (React Query)", desc: "Server state management: caching, deduplication, background refetching, stale-while-revalidate, pagination, infinite scroll, optimistic updates, mutations." },
      { id: 129, name: "SWR", desc: "Vercel's data fetching library. stale-while-revalidate strategy. Lightweight alternative to React Query. Built-in cache, revalidation, focus tracking." },
      { id: 130, name: "tRPC", desc: "End-to-end type-safe APIs without schema or code generation. Define API on server, call from client with full TypeScript inference. Pairs with TanStack Query." },
      { id: 131, name: "Server Actions", desc: "Functions that run on the server, called from client components. Next.js 'use server'. Progressive enhancement: works without JS. Form-based mutations." },
      { id: 132, name: "GraphQL Client (Apollo / urql)", desc: "Query exactly the data you need from GraphQL APIs. Apollo: feature-rich, normalized cache. urql: lighter, exchangeable. Codegen for type safety." },
    ],
  },
  {
    name: "Accessibility & UX",
    icon: "⛉",
    color: "#0EA5E9",
    concepts: [
      { id: 133, name: "WCAG Guidelines", desc: "Web Content Accessibility Guidelines. Four principles: Perceivable, Operable, Understandable, Robust (POUR). Conformance levels: A, AA (standard target), AAA." },
      { id: 134, name: "ARIA (Accessible Rich Internet Apps)", desc: "Attributes adding accessibility info to HTML: role, aria-label, aria-expanded, aria-live, aria-hidden. Use semantic HTML first; ARIA supplements." },
      { id: 135, name: "Keyboard Navigation", desc: "All interactive elements reachable and operable via keyboard. Tab order, focus management, skip links, focus trapping in modals, roving tabindex." },
      { id: 136, name: "Screen Reader Compatibility", desc: "Testing with VoiceOver (Mac), NVDA/JAWS (Windows), TalkBack (Android). Announce content correctly, manage focus, use live regions for dynamic content." },
      { id: 137, name: "Color Contrast & Visual Design", desc: "WCAG AA: 4.5:1 for normal text, 3:1 for large text. Don't rely on color alone for meaning. Support prefers-color-scheme, prefers-reduced-motion." },
      { id: 138, name: "Focus Management", desc: "Programmatically moving focus for SPAs: after navigation, modal open/close, dynamic content. useRef + focus(), tabindex='-1' for non-interactive elements." },
      { id: 139, name: "Accessible Components", desc: "Headless UI libraries (Radix, Headless UI, React Aria, Ark UI) provide accessible primitives: dialogs, dropdowns, tabs, comboboxes. You style, they handle a11y." },
      { id: 140, name: "Progressive Enhancement", desc: "Start with basic HTML that works everywhere. Layer on CSS for styling, JS for interactivity. Core functionality available without JavaScript." },
      { id: 141, name: "Internationalization (i18n)", desc: "Supporting multiple languages/locales: string extraction, pluralization, date/number formatting, RTL layout. Libraries: react-intl, i18next, vue-i18n." },
      { id: 142, name: "Skeleton Screens & Loading States", desc: "Show content-shaped placeholders during loading instead of spinners. Reduces perceived wait time. Skeleton, shimmer, progressive image loading." },
    ],
  },
  {
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
  },
  {
    name: "Testing (Frontend-Specific)",
    icon: "◉",
    color: "#84CC16",
    concepts: [
      { id: 158, name: "Testing Library", desc: "Test components from user's perspective. Query by role, text, label — not implementation details. @testing-library/react, vue, svelte. The standard for component tests." },
      { id: 159, name: "Vitest", desc: "Vite-native test runner. Jest-compatible API, native ESM, TypeScript support, fast HMR-like watch mode. Replacing Jest for Vite projects." },
      { id: 160, name: "Jest", desc: "Meta's test framework. Snapshot testing, mocking, coverage, watch mode. Mature ecosystem. Slower startup than Vitest due to CommonJS transforms." },
      { id: 161, name: "Playwright", desc: "Cross-browser E2E testing: Chromium, Firefox, WebKit. Auto-wait, codegen, trace viewer, network interception. TypeScript-first. Modern Selenium replacement." },
      { id: 162, name: "Cypress", desc: "E2E testing that runs in the browser. Time-travel debugging, automatic waiting, network stubbing, component testing mode. JavaScript-only. Single origin limitation." },
      { id: 163, name: "Visual Regression Testing", desc: "Screenshot comparison to detect unintended UI changes. Chromatic (Storybook), Percy, Applitools. Catches CSS regressions that unit tests can't." },
      { id: 164, name: "MSW (Mock Service Worker)", desc: "API mocking at the network level using Service Workers. Same mocks for tests, Storybook, and development. Intercepts requests, returns mock responses." },
      { id: 165, name: "Accessibility Testing Tools", desc: "axe-core (automated a11y checks), Lighthouse, pa11y, Storybook a11y addon. Catch WCAG violations in CI. Manual testing still needed for full coverage." },
    ],
  },
  {
    name: "Advanced & Emerging",
    icon: "✦",
    color: "#D946EF",
    concepts: [
      { id: 166, name: "AI-Assisted Development", desc: "Copilot, Cursor, Claude Code for code generation, refactoring, and debugging. v0 and Bolt for UI generation. AI is a tool, not a replacement for understanding." },
      { id: 167, name: "Edge Runtime", desc: "Running JS at CDN edge locations. Cloudflare Workers, Vercel Edge Functions, Deno Deploy. Lowest latency, limited APIs (no Node.js fs). V8 Isolates." },
      { id: 168, name: "WebAssembly (Wasm)", desc: "Binary instruction format running near-native speed in browsers. C/C++/Rust compiled to Wasm. Used for: Figma, Photoshop, game engines, codecs." },
      { id: 169, name: "Streaming & Suspense", desc: "React Suspense: show fallback UI while async content loads. Streaming SSR sends HTML progressively. Combined: fast TTFB with progressive rendering." },
      { id: 170, name: "React Compiler", desc: "Automatic memoization at compile time. Eliminates need for useMemo, useCallback, React.memo. Compiler optimizes re-renders that developers forget to handle." },
      { id: 171, name: "Type-Safe Full Stack", desc: "End-to-end type safety from DB to UI. Prisma → tRPC → React, or Drizzle → Hono → client. One TypeScript type flows everywhere. Catches API mismatches at build time." },
      { id: 172, name: "Offline-First Architecture", desc: "App works without network, syncs when connected. IndexedDB, Service Workers, CRDTs for conflict resolution. Critical for mobile and unreliable networks." },
      { id: 173, name: "Headless CMS", desc: "Content management without frontend rendering. API-first: Contentful, Sanity, Strapi, Payload. Developers control the presentation layer entirely." },
      { id: 174, name: "Feature Flags (Frontend)", desc: "Toggle features per user segment, percentage, or environment. LaunchDarkly, Statsig, Flagsmith, Vercel Flags. Decouple deploy from release. A/B testing built-in." },
      { id: 175, name: "Performance Budgets", desc: "Hard limits on bundle size, LCP, INP, CLS. Enforce in CI: fail builds that exceed budgets. bundlesize, Lighthouse CI. Prevent gradual performance degradation." },
      { id: 176, name: "Privacy-First Frontend", desc: "Consent management, cookieless analytics (Plausible, Fathom), server-side tracking, fingerprint resistance. GDPR/CCPA compliance baked into architecture." },
      { id: 177, name: "Motion & Animation Libraries", desc: "Framer Motion (React), GSAP (universal), Motion One, AutoAnimate, Lottie for vector animations. Orchestrated, physics-based, and gesture-driven motion." },
      { id: 178, name: "3D on the Web", desc: "Three.js, React Three Fiber (R3F), Babylon.js. WebGL/WebGPU rendering. 3D product configurators, data visualization, immersive experiences." },
      { id: 179, name: "WebGPU", desc: "Next-gen graphics and compute API replacing WebGL. Direct GPU access, compute shaders, better performance. Chrome shipped, others following. Powers AI in the browser." },
      { id: 180, name: "Bun Runtime", desc: "All-in-one JavaScript runtime: bundler, transpiler, package manager, test runner. Zig-based, faster than Node. Drop-in Node replacement for many use cases." },
    ],
  },
];

const totalConcepts = categories.reduce((sum, c) => sum + c.concepts.length, 0);

export default function FrontendConcepts() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      concepts: cat.concepts.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.desc.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.concepts.length > 0);

  const displayCategories = activeCategory
    ? filteredCategories.filter((c) => c.name === activeCategory)
    : filteredCategories;

  const matchCount = filteredCategories.reduce(
    (sum, c) => sum + c.concepts.length,
    0
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050609",
        color: "#C8C8DE",
        fontFamily: "'Geist Mono', 'SF Mono', 'JetBrains Mono', monospace",
      }}
    >
      <div
        style={{
          padding: "40px 32px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.035)",
          background:
            "linear-gradient(180deg, rgba(97,218,251,0.04) 0%, transparent 100%)",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#61DAFB", fontWeight: 600 }}>
              Reference Guide
            </span>
            <span style={{ fontSize: 10, background: "rgba(97,218,251,0.1)", color: "#61DAFB", padding: "2px 8px", borderRadius: 3, letterSpacing: 1 }}>
              {totalConcepts} CONCEPTS
            </span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: "8px 0 6px", color: "#F5F5FF", letterSpacing: -0.5, fontFamily: "'Geist', 'Inter', system-ui, sans-serif" }}>
            Frontend Development Concepts
          </h1>
          <p style={{ fontSize: 13, color: "#505068", margin: 0, lineHeight: 1.5 }}>
            HTML to WebGPU — everything a modern frontend engineer needs to know
          </p>

          <div style={{ marginTop: 20, position: "relative" }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search concepts..."
              style={{
                width: "100%", padding: "10px 16px 10px 36px",
                background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: 8, color: "#C8C8DE", fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box",
              }}
            />
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#333", fontSize: 14 }}>⌕</span>
            {search && (
              <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#505068", fontSize: 11 }}>
                {matchCount} results
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
            <button
              onClick={() => setActiveCategory(null)}
              style={{
                padding: "5px 12px", fontSize: 11, borderRadius: 4, border: "1px solid",
                borderColor: !activeCategory ? "rgba(97,218,251,0.4)" : "rgba(255,255,255,0.05)",
                background: !activeCategory ? "rgba(97,218,251,0.08)" : "transparent",
                color: !activeCategory ? "#61DAFB" : "#505068",
                cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3, transition: "all 0.15s",
              }}
            >All</button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
                style={{
                  padding: "5px 12px", fontSize: 11, borderRadius: 4, border: "1px solid",
                  borderColor: activeCategory === cat.name ? `${cat.color}66` : "rgba(255,255,255,0.05)",
                  background: activeCategory === cat.name ? `${cat.color}10` : "transparent",
                  color: activeCategory === cat.name ? cat.color : "#505068",
                  cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3, transition: "all 0.15s",
                }}
              >
                <span style={{ marginRight: 4 }}>{cat.icon}</span>
                {cat.name}
                <span style={{ marginLeft: 4, opacity: 0.5 }}>{cat.concepts.length}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 32px 60px" }}>
        {displayCategories.map((cat) => (
          <div key={cat.name} style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${cat.color}14` }}>
              <span style={{ color: cat.color, fontSize: 16 }}>{cat.icon}</span>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: cat.color, margin: 0, letterSpacing: 0.5, fontFamily: "'Geist', system-ui, sans-serif" }}>
                {cat.name}
              </h2>
              <span style={{ fontSize: 10, color: "#2A2A3A", marginLeft: "auto" }}>{cat.concepts.length} concepts</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {cat.concepts.map((concept) => {
                const isExpanded = expandedId === concept.id;
                return (
                  <div
                    key={concept.id}
                    onClick={() => setExpandedId(isExpanded ? null : concept.id)}
                    style={{
                      padding: isExpanded ? "12px 16px" : "9px 16px",
                      background: isExpanded ? `${cat.color}05` : "rgba(255,255,255,0.007)",
                      border: "1px solid",
                      borderColor: isExpanded ? `${cat.color}20` : "rgba(255,255,255,0.02)",
                      borderRadius: 6, cursor: "pointer", transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 9, color: "#2A2A3A", minWidth: 24, fontVariantNumeric: "tabular-nums" }}>
                        {String(concept.id).padStart(3, "0")}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: isExpanded ? "#F5F5FF" : "#9090A8", flex: 1 }}>
                        {concept.name}
                      </span>
                      <span style={{ fontSize: 10, color: "#1E1E2E", transform: isExpanded ? "rotate(90deg)" : "none", transition: "transform 0.15s" }}>▸</span>
                    </div>
                    {isExpanded && (
                      <div style={{ marginTop: 10, marginLeft: 34, fontSize: 12, lineHeight: 1.7, color: "#686888", borderLeft: `2px solid ${cat.color}20`, paddingLeft: 12 }}>
                        {concept.desc}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
