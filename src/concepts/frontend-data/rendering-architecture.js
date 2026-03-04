const renderingArchitecture = {
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
};
export default renderingArchitecture;
