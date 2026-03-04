const accessibilityUx = {
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
};
export default accessibilityUx;
