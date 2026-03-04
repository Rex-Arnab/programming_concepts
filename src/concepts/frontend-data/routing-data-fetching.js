const routingDataFetching = {
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
};
export default routingDataFetching;
