const uiFrontendTesting = {
  name: "UI & Frontend Testing",
  icon: "⬣",
  color: "#06B6D4",
  concepts: [
    { id: 94, name: "Browser Automation", desc: "Programmatically controlling a web browser to simulate user interactions. Clicking, typing, navigating, scrolling. Foundation of E2E and UI testing." },
    { id: 95, name: "Cypress", desc: "Modern E2E testing framework. Runs in the browser, auto-waits, time-travel debugging, network stubbing. JavaScript-only. Great DX but single-browser origin." },
    { id: 96, name: "Playwright", desc: "Microsoft's cross-browser automation tool. Chromium, Firefox, WebKit. Auto-wait, codegen, tracing, parallel execution. TypeScript/JS/Python/Java/.NET." },
    { id: 97, name: "Selenium", desc: "Original browser automation tool. WebDriver protocol. Supports all browsers and languages. Mature ecosystem but verbose API and no auto-waiting." },
    { id: 98, name: "Visual Regression Testing", desc: "Screenshot comparisons to detect unintended UI changes. Pixel-by-pixel diff or perceptual diff. Percy, Chromatic, Applitools, BackstopJS." },
    { id: 99, name: "Snapshot Testing", desc: "Capturing a serialized output (DOM, component tree, API response) and comparing against saved snapshot. Jest snapshots. Detects unexpected changes." },
    { id: 100, name: "Component Testing (Frontend)", desc: "Testing UI components in isolation with real rendering. React Testing Library, Vue Test Utils, Storybook interaction tests. Verify behavior, not implementation." },
    { id: 101, name: "Storybook Testing", desc: "Storybook for visual development + interaction tests, accessibility checks, and visual regression. Component documentation doubles as test suite." },
    { id: 102, name: "Testing Library Philosophy", desc: "Testing from the user's perspective: query by role, text, label — not by CSS selectors or test IDs. 'The more your tests resemble usage, the more confidence.'" },
    { id: 103, name: "Cross-Browser Testing", desc: "Verifying functionality across Chrome, Firefox, Safari, Edge. BrowserStack, LambdaTest, Sauce Labs for cloud testing. Playwright covers engines natively." },
    { id: 104, name: "Responsive / Device Testing", desc: "Testing across screen sizes, orientations, and device types. Viewport emulation, real device labs. Mobile-first testing is increasingly critical." },
    { id: 105, name: "Headless Browser Testing", desc: "Running browsers without a GUI for faster CI execution. Headless Chrome, Firefox, WebKit. Default mode for CI pipelines. Playwright, Puppeteer." },
    { id: 106, name: "DOM Testing", desc: "Testing the Document Object Model directly using JSDOM or happy-dom. Faster than browser testing but less realistic. Good for unit-testing components." },
  ],
};
export default uiFrontendTesting;
