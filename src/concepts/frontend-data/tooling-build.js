const toolingBuild = {
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
};
export default toolingBuild;
