const accessibility = {
  name: "Accessibility & Inclusive Design",
  icon: "♿",
  color: "#06b6d4",
  concepts: [
    {
      id: 744,
      name: "WCAG (Web Content Accessibility Guidelines)",
      desc: `**WCAG** — the Web Content Accessibility Guidelines, published by the W3C's Web Accessibility Initiative (WAI), providing the international standard for making web content accessible to people with disabilities. WCAG 2.1 is the current widely-adopted version; WCAG 2.2 adds further criteria; WCAG 3.0 is in development.

**The four POUR principles:**
1. **Perceivable** — information must be presentable to users in ways they can perceive (text alternatives for non-text content, captions for audio, sufficient contrast)
2. **Operable** — UI components and navigation must be operable (keyboard accessible, no seizure-inducing content, sufficient time to complete tasks)
3. **Understandable** — information and UI operation must be understandable (readable text, predictable behavior, input assistance)
4. **Robust** — content must be robust enough to be interpreted by assistive technologies (valid HTML, compatible with current and future AT)

**Conformance levels:**
- **Level A** — minimum; removing the most severe barriers
- **Level AA** — the target for most legal compliance requirements; the "commercial standard"
- **Level AAA** — highest; not achievable for all content; aspirational

**Legal context:** Many jurisdictions mandate WCAG 2.1 AA compliance: ADA in the US (through court precedent), Section 508 (US federal agencies), EN 301 549 (EU), and the European Accessibility Act (2025). Legal risk is real — major retailers, universities, and banks have faced class-action ADA lawsuits over inaccessible websites.

**Key insight:** WCAG compliance is a floor, not a ceiling. Meeting AA criteria means your product isn't actively excluding people with disabilities — it doesn't mean it's a good experience for them. Actual accessibility requires user research with disabled users, not just automated audit passes.`,
    },
    {
      id: 745,
      name: "ARIA (Accessible Rich Internet Applications)",
      desc: `**ARIA** — a set of HTML attributes (roles, states, and properties) that allow developers to make complex, dynamic web applications accessible to assistive technologies like screen readers. ARIA tells screen readers what something is, what state it's in, and how it behaves — information that semantic HTML communicates automatically for simple elements but not for custom components.

**The three categories of ARIA attributes:**
- **Roles** — what an element is: "role=button", "role=dialog", "role=navigation", "role=tabpanel"
- **States** — dynamic conditions: "aria-expanded=true", "aria-checked=true", "aria-selected=false", "aria-busy=true"
- **Properties** — characteristics: "aria-label='Close dialog'", "aria-labelledby='heading-id'", "aria-describedby='error-message-id'", "aria-required=true"

**The first rule of ARIA:** Don't use ARIA if you can use native HTML. A "<button>" element has built-in keyboard behavior, click handling, and accessibility semantics. A "<div role=button>" requires you to re-implement all of that with JavaScript and ARIA. Always use the most semantic HTML element first.

**Critical ARIA patterns:**
- **Live regions** ("aria-live") — announce dynamic content changes to screen readers (notifications, search results, form validation)
- **Focus management** — when a modal opens, move focus into it; when it closes, return focus to the trigger element
- **Labeling** — every form input needs a visible label connected via "for/id" or "aria-labelledby"; icon buttons need "aria-label"

**Key insight:** Bad ARIA is worse than no ARIA. Incorrect roles, stale states, or duplicate announcements actively confuse screen reader users. ARIA only fixes accessibility if it's implemented correctly and tested with actual screen readers — automated tools catch some issues but miss most ARIA implementation errors.`,
    },
    {
      id: 746,
      name: "Keyboard Navigation",
      desc: `**Keyboard navigation** — the ability to operate all functionality of a web product using only a keyboard, without a mouse or touch input. Required by WCAG 2.1 AA (criterion 2.1.1) and essential for users with motor disabilities, power users, and anyone who prefers keyboard workflows.

**Core keyboard expectations:**
- **Tab** — move focus to the next focusable element in DOM order
- **Shift + Tab** — move focus to the previous focusable element
- **Enter / Space** — activate the focused element (buttons, links, checkboxes)
- **Arrow keys** — navigate within components (dropdown menus, radio groups, tabs, sliders)
- **Escape** — close modals, dropdowns, popovers; cancel actions

**Focus management requirements:**
- **Visible focus indicator** — the focused element must be visually obvious at all times; "outline: none" in CSS is an accessibility violation that should never be applied globally
- **Logical tab order** — tab order should follow visual reading order; DOM order should match visual order
- **Focus trapping** — when a modal is open, Tab should cycle only within the modal, not the page behind it
- **Skip links** — "Skip to main content" links allow keyboard users to bypass navigation blocks; must be visible on focus

**Custom component keyboard requirements:** Each interactive component type has expected keyboard conventions (ARIA Authoring Practices Guide — APG): tabs, accordions, menus, date pickers, carousels, sliders. Implementing custom components without following these conventions creates confusing keyboard experiences.

**Key insight:** The fastest way to find keyboard accessibility issues: unplug your mouse and try to complete your product's core user flows. Every place you get stuck is a bug. Most developers never do this, which is why keyboard navigation is the most commonly broken accessibility criterion.`,
    },
    {
      id: 747,
      name: "Screen Reader Design",
      desc: `**Screen readers** — assistive technology that converts digital text and UI information into synthesized speech or Braille output for users who are blind or have severe visual impairments. Major screen readers: NVDA + Firefox (Windows, free), JAWS + Chrome/Edge (Windows, widely used in enterprise), VoiceOver (iOS + macOS, built-in), TalkBack (Android, built-in).

**How screen readers consume web content:**
- They read the accessibility tree — a parsed representation of the DOM with semantic information (roles, names, states, values)
- Users navigate by headings (H1, H2... hierarchy), landmarks (header, main, nav, footer), links, form controls, and other element types
- Content should be comprehensible when read linearly from top to bottom in DOM order
- Visual layout is invisible — visual-only information (icons, color, position) must have text equivalents

**Screen reader-specific design requirements:**
- **Descriptive link text** — "Click here" is meaningless out of context; "Download the 2025 Annual Report" describes the destination
- **Alt text for images** — convey the information content, not "photo of..."; decorative images: alt=""
- **Form labels** — every input must have an accessible label; "aria-labelledby" or "for/id" connections
- **Heading hierarchy** — headings should form a logical outline; don't skip levels (H1 → H3); don't use headings for visual size

**Testing with screen readers:** Automated tools catch ~30% of WCAG violations. The other 70% requires manual testing with actual screen readers. Even basic testing — navigating by headings, completing a form, using a modal — catches most critical issues.

**Key insight:** The most damaging screen reader issue is also the most common: meaningful images with empty or absent alt attributes. Screen readers skip them entirely or announce "image" — conveying no information. Test alt text by reading it aloud without seeing the image: does it communicate everything the visual conveys?`,
    },
    {
      id: 748,
      name: "Color Accessibility",
      desc: `**Color accessibility** — designing interfaces that work for users with color vision deficiencies (color blindness) and low vision, and that don't rely on color alone to convey information. ~8% of males and ~0.5% of females have some form of color vision deficiency; total: over 300 million people worldwide.

**Types of color vision deficiency:**
- **Deuteranopia / Deuteranomaly** — red-green blindness (most common); green appears more similar to red
- **Protanopia / Protanomaly** — red-green blindness; red appears darker, merges with green
- **Tritanopia** — blue-yellow blindness (rare)
- **Achromatopsia** — complete color blindness; sees only grayscale (very rare)

**WCAG rule: Don't use color alone.** Color can supplement information but never be the only conveyor. A red "Error" banner must also use a text label or icon. A green "Active" badge must also have a text label. Status indicators must not rely solely on red vs. green.

**Practical checks:**
- View your design in grayscale — does it still communicate all necessary information?
- Use a color blindness simulator (Figma plugin, browser extension) to see your design through affected eyes
- Ensure charts and data visualizations use color + pattern, color + shape, or color + label combinations

**Contrast requirements:** WCAG AA: 4.5:1 for normal text; 3:1 for large text; 3:1 for UI components. Check foreground/background pairs — not just main text, but button labels, error messages, and placeholder text.

**Key insight:** The most common color accessibility violation is using red and green as the only differentiators for status or data. Red and green are exactly the colors most affected by the most common color vision deficiencies. Adding a shape indicator (circle vs. triangle) or text label ("Pass" vs. "Fail") alongside color costs almost nothing and serves millions of users.`,
    },
    {
      id: 749,
      name: "Motor Accessibility",
      desc: `**Motor accessibility** — designing products that are operable for users with motor impairments affecting fine motor control, strength, or range of motion. Users with motor disabilities may use keyboards, head pointers, mouth sticks, eye-gaze systems, switch access, or voice control software (Dragon NaturallySpeaking) instead of a mouse.

**Touch target sizing:** WCAG 2.5.5 (AAA) recommends 44×44px; 2.5.8 (AA in 2.2) requires 24×24px minimum. iOS HIG: 44pt; Material Design: 48dp. The target size requirement accounts for imprecision in pointer control — small targets are difficult for tremor-affected users.

**Pointer precision demands:**
- Eliminate small close/dismiss buttons in corners (the "X" icon at 16×16px)
- Don't require hover to reveal actions (hover requires sustained pointer position)
- Don't require drag-and-drop as the only way to reorder (provide arrow buttons as alternative)
- Don't require double-click as the primary action trigger

**Timeout and time limits:** Users with motor disabilities may take longer to complete interactions. WCAG 2.2.1 requires that time limits either not exist, be extensible, or be at least 20 hours. Autosave is critical — form data lost due to session timeout is a motor accessibility issue.

**Voice control considerations:** Voice control users (Dragon NaturallySpeaking) speak element names or link text to navigate. Unique, descriptive labels are essential — "Learn more" links that all say "Learn more" with different content are indistinguishable by voice command.

**Key insight:** Motor accessibility and keyboard accessibility are deeply connected — most assistive technology for motor impairments produces keyboard events. Ensuring full keyboard accessibility covers the vast majority of motor accessibility requirements. The incremental investment beyond keyboard accessibility is primarily about touch target sizes and removing fine-motor-demanding interactions.`,
    },
    {
      id: 750,
      name: "Cognitive Accessibility",
      desc: `**Cognitive accessibility** — designing products that are usable by people with cognitive, learning, and neurological disabilities: dyslexia, ADHD, autism spectrum conditions, memory impairments, intellectual disabilities, and acquired brain injuries. The most underaddressed dimension of accessibility — automated tools can't detect cognitive accessibility issues, and they affect a large population.

**WCAG 2.1 cognitive criteria:**
- 1.4.8: Readable text (line length, spacing, contrast)
- 2.4.6: Clear headings and labels
- 3.1.3: Unusual words defined
- 3.1.4: Abbreviations expanded
- 3.2.1: On focus, no unexpected context change
- 3.3.1: Error identification — be specific
- 3.3.2: Labels and instructions provided

**Cognitive accessibility practices:**
- **Plain language** — clear, simple language; short sentences; common words; active voice; tested with plain language guidelines (Flesch-Kincaid, Hemingway App)
- **Consistent navigation** — same navigation in same position on every page
- **Clear heading structure** — users with cognitive difficulties often navigate by headings
- **No unexpected changes** — opening new windows, sudden focus changes, automatic refreshes disrupt working memory
- **Error recovery support** — specific error messages + clear instructions + the ability to review and correct before submitting

**The COGA (Cognitive and Learning Disabilities Accessibility) task force** has produced extensive research on cognitive accessibility. WCAG 3.0 is expected to significantly expand cognitive accessibility criteria.

**Key insight:** Many cognitive accessibility improvements benefit all users — plain language, clear error messages, consistent navigation, and logical structure are simply good design. The cognitive accessibility "tax" is actually negative — fixing cognitive accessibility almost always improves usability across the entire user base.`,
    },
    {
      id: 751,
      name: "Inclusive Design Principles",
      desc: `**Inclusive design** — a design methodology that enables and draws on the full range of human diversity, with the goal of creating products and services that work well for people across the spectrum of ability, age, language, culture, and context. Developed extensively by Microsoft's Inclusive Design team and promoted through their Inclusive Design Toolkit.

**Microsoft's three principles:**
1. **Recognize exclusion** — identify who is being excluded and why; exclusion happens when design solves for the average
2. **Solve for one, extend to many** — constraints and limitations faced by people with disabilities generate solutions that benefit broader populations (curb cuts, OXO Good Grips, text messaging)
3. **Learn from diversity** — include people with diverse abilities as collaborators and researchers, not just as test subjects

**The curb cut effect:** Curb cuts (ramp from sidewalk to street) were required for wheelchair users but are used by parents with strollers, delivery workers with carts, cyclists, and elderly pedestrians. Solving for the constrained case produces a better design for everyone.

**Situational limitations:** A person with a permanent disability, a person with a temporary disability (broken arm), and a person with a situational impairment (holding a baby) all benefit from the same design solutions. Inclusive design serves all three.

**Inclusive design vs universal design:** Universal design aims to create one design solution for all; inclusive design acknowledges that one solution can't serve everyone and designs multiple solutions or flexible solutions that can be customized. Both oppose exclusionary design.

**Key insight:** Inclusive design is not charity or compliance — it is commercial intelligence. 1 in 4 adults in the US has some disability; 2.5 billion people use a mobile device one-handed; 1.3 billion people live with some form of vision impairment. Inclusive products reach larger markets. Exclusive products voluntarily reduce their total addressable market.`,
    },
    {
      id: 752,
      name: "Accessibility Testing",
      desc: `**Accessibility testing** — the process of evaluating a product against WCAG criteria and usability standards for users with disabilities. Requires multiple approaches: automated tools catch structural issues; manual testing catches interaction issues; user testing with disabled users catches usability issues automated tools can't detect.

**Automated testing tools:**
- **axe-core** — the most widely used accessibility engine; available as a browser extension (axe DevTools), Jest integration (jest-axe), Storybook addon (@storybook/addon-a11y), and Playwright/Cypress plugin
- **Lighthouse** (Google) — accessibility audit built into Chrome DevTools and CI pipelines
- **WAVE** (WebAIM) — visual feedback on page; highlights errors in context
- **Deque's axe DevTools** — enterprise-grade axe with guided tests for manual testing

**What automated tools catch (~30-40% of issues):**
- Missing alt attributes, empty links, missing form labels, insufficient contrast, invalid ARIA, document structure issues (heading order, landmark roles)

**What requires manual testing (~60-70%):**
- Keyboard navigation flow and focus management
- Screen reader experience (announcement order, semantic coherence)
- Meaningful alt text (automated tools verify its presence, not its quality)
- Cognitive load, plain language, consistent navigation
- Dynamic content and complex interactions

**Testing workflow:**
1. Automated audit (axe, Lighthouse) — catch structural issues early and continuously
2. Keyboard-only audit — unplug mouse, test all user flows
3. Screen reader testing — NVDA+Firefox, VoiceOver+Safari for critical flows
4. User testing with disabled users — the only way to validate the full experience

**Key insight:** 30% automated + 70% manual is the honest breakdown. Teams that claim accessibility compliance based solely on automated scans are not actually compliant — they've addressed the easy issues and missed the hard ones. The hard ones are what disabled users actually encounter.`,
    },
    {
      id: 753,
      name: "The Business Case for Accessibility",
      desc: `**The business case for accessibility** — the argument that investing in accessibility delivers measurable returns: larger addressable market, reduced legal risk, improved SEO, better overall usability, and stronger brand reputation. The common framing of accessibility as "charity" misses its commercial logic.

**The numbers:**
- 1.3 billion people worldwide live with a disability (WHO)
- In the US: 1 in 4 adults has a disability (CDC)
- Global disability market: $490+ billion annual disposable income (Accenture)
- Family and friends of disabled people represent $6.9 trillion in disposable income (Microsoft)

**Legal risk:** ADA Title III web accessibility lawsuits have increased every year since 2015. In 2023, over 4,600 lawsuits were filed in the US. Average settlement: $25,000-$250,000 plus legal fees and remediation costs. Proactive accessibility is dramatically cheaper than reactive remediation under legal pressure.

**SEO benefits:** Accessibility practices overlap heavily with SEO best practices: semantic HTML, descriptive link text, alt attributes, heading structure, page titles, structured data. Accessible sites tend to rank better because search engines index content similarly to how screen readers consume it.

**The retrofit cost:** Accessibility retrofitted after development costs 10-100× more than accessibility designed in from the start. A button without an accessible label costs $0 to fix during design, $10 to fix during development, and potentially thousands in legal fees if discovered in a complaint.

**Key insight:** The framing of accessibility as a cost center is factually wrong. It's a market expansion strategy, a risk reduction investment, and a quality improvement program that happens to benefit a billion people. Products built accessibly serve more people, have fewer bugs, and expose organizations to less legal risk — all positive business outcomes.`,
    },
  ],
};

export default accessibility;
