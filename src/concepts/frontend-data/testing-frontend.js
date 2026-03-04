const testingFrontend = {
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
};
export default testingFrontend;
