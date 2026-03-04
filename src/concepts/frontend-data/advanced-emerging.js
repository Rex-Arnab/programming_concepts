const advancedEmerging = {
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
};
export default advancedEmerging;
