const designSystems = {
  name: "Design Systems",
  icon: "🧩",
  color: "#8b5cf6",
  concepts: [
    {
      id: 700,
      name: "What Is a Design System",
      desc: `**Design system** — a collection of reusable components, patterns, guidelines, and tokens governed by clear standards that enable teams to build products consistently and efficiently. A design system is not a component library (that's part of it), not a style guide (also part of it), and not a Figma file (also part of it) — it is the sum of all three, plus the process, tooling, and culture that keeps them coherent over time.

**The three layers of a design system:**
1. **Design language** — the visual and interaction principles: color palette, typography scale, spacing, iconography, tone of voice
2. **Component library** — the coded (and Figma) implementations of reusable UI components
3. **Documentation** — usage guidelines, accessibility notes, do's and don'ts, code examples

**Why design systems exist:** Without one, every team reinvents every component — 12 different button styles, 7 different modal implementations, inconsistent spacing across products. Design systems amortize design and development work across every future product surface, enforce brand consistency, and bake in accessibility.

**The cost tradeoff:** Design systems require significant upfront investment (building the system) for downstream savings (every subsequent feature builds faster and more consistently). Premature systemization is expensive — build a system after you have enough components to know what the patterns are, not before.

**Key insight:** A design system is a product for your internal teams. It needs a product manager (or design ops owner), versioning, a roadmap, and adoption metrics — otherwise it drifts out of sync with the products it's supposed to govern. The graveyard of stale design systems built with enthusiasm and abandoned without ownership is vast.`,
    },
    {
      id: 701,
      name: "Design Tokens",
      desc: `**Design tokens** — the atomic, named values that form the foundation of a design system: colors, spacing, typography, border radius, shadows, and other visual properties stored as named constants rather than hardcoded values. The term was popularized by Salesforce's Lightning Design System.

**Why tokens matter:** Without tokens, a color like "brand blue" exists as "#0066CC" scattered throughout CSS files, Figma components, and native app code. Change the shade of blue and you touch hundreds of files. With tokens, "color-brand-primary" maps to "#0066CC" in one place — change it once, update everywhere.

**Token categories:**
- **Global tokens** — raw values with descriptive names: "color-blue-500: #3b82f6"
- **Semantic tokens** — purpose-based aliases of global tokens: "color-action-primary: {color-blue-500}"
- **Component tokens** — component-specific overrides: "button-background-default: {color-action-primary}"

**Token formats and tooling:** Style Dictionary (Amazon) is the most widely used tool for transforming tokens from a source format (JSON, YAML) into platform outputs: CSS custom properties, iOS Swift constants, Android XML values, Sass variables. This enables one source of truth across web, iOS, and Android.

**Figma Variables (2023):** Figma's Variables feature implements design tokens natively in design files, enabling designers and developers to share the same token values and preview theming in design.

**Key insight:** The power of design tokens is not just "colors in one place" — it is the separation of design intent from implementation. A semantic token like "color-feedback-error" can be evaluated, changed, and themed independently of the specific hex value. This is the foundation of theming (including dark mode) and multi-brand design systems.`,
    },
    {
      id: 702,
      name: "Atomic Design",
      desc: `**Atomic Design** — a methodology for creating design systems developed by Brad Frost in 2013, inspired by chemistry. It describes UI as being composed of five hierarchical levels: Atoms, Molecules, Organisms, Templates, and Pages — from smallest indivisible unit to complete page.

**The five levels:**
1. **Atoms** — the smallest building blocks: HTML elements and design tokens (button, input, label, color, typography)
2. **Molecules** — combinations of atoms that form simple, functional units (search form: input + button + label)
3. **Organisms** — relatively complex UI components composed of molecules and atoms (header: logo + navigation + search form)
4. **Templates** — page-level components showing layout and structure with placeholder content (no real data)
5. **Pages** — specific instances of templates with real representative content

**Value of the framework:** Atomic Design provides a shared vocabulary for discussing components at appropriate levels of granularity. "Should this be an organism or a template?" forces useful discussions about composition and scope. It also reveals when a component is doing too much (organism-level complexity in a molecule slot).

**Criticisms and adaptations:** The chemistry metaphor breaks down — not all atoms combine into molecules; the template/page distinction is often unclear. Many teams adapt the vocabulary: "primitives, components, patterns, layouts" or "tokens, elements, components, modules." The underlying principle — build from small reusable pieces — remains sound.

**Key insight:** Atomic Design's most valuable contribution is not the specific hierarchy labels — it's the mental shift from designing pages to designing systems. When you think in atoms, molecules, and organisms, you automatically ask "where does this reusable piece belong in the system?" instead of designing everything as a one-off.`,
    },
    {
      id: 703,
      name: "Component Libraries",
      desc: `**Component library** — the coded implementation of a design system's UI components: interactive, accessible, documented, and production-ready components that product teams use to build interfaces. Distinct from a Figma file (design source) and a style guide (documentation) — a component library is what engineers actually import and use.

**What a good component library provides:**
- Accessible markup (ARIA roles, keyboard navigation, focus management) built in
- Theme-able via design tokens or CSS custom properties
- Comprehensive variant support (button: primary/secondary/danger/ghost, size: sm/md/lg, state: default/hover/active/disabled/loading)
- Documented API with prop/slot references and usage examples
- Version history and migration guides

**Building vs adopting:** Radix UI (headless), shadcn/ui, and Headless UI provide accessible, unstyled component primitives that teams style to their brand — reducing the accessibility and interaction engineering burden without sacrificing visual customization. MUI, Chakra, Ant Design provide styled components but may conflict with brand requirements. The choice: build from primitives if brand differentiation is high; adopt a styled system if delivery speed is the priority.

**Storybook** is the de facto standard for developing and documenting component libraries — each component is developed and tested in isolation, with interactive stories that document every variant and state.

**Adoption challenges:** A component library only delivers value if teams use it. Undocumented components, missing variants, or frequent breaking changes drive teams to build their own versions (shadow design systems). Component library maintainers must treat their consumers as customers.

**Key insight:** The ROI of a component library is measured in developer hours saved and accessibility regressions prevented — not in how many components it contains. Twenty components that are used everywhere deliver more value than two hundred components that engineers avoid because they're too rigid or too hard to customize.`,
    },
    {
      id: 704,
      name: "Style Guides",
      desc: `**Style guide** — documentation that captures the visual, verbal, and interaction standards of a product or brand. It communicates design decisions, establishes norms for future work, and aligns cross-functional teams on how the product should look, sound, and behave.

**What a UI style guide covers:**
- **Brand foundations** — logo usage, color palette with usage guidelines, typography system
- **Iconography** — icon set, sizing rules, when to use icons with vs without labels
- **Voice and tone** — how the product speaks to users; formal vs casual, empathetic vs transactional
- **Component usage guidelines** — when to use a button vs a link, when to use a destructive red variant, modal vs drawer
- **Accessibility standards** — contrast requirements, motion guidelines, alt text standards

**Style guide vs design system vs brand guidelines:**
- **Brand guidelines** — how the brand presents to the world (advertising, logo, color); often created by marketing
- **Style guide** — implementation-level design standards for product teams
- **Design system** — the full system including components, tokens, code, and process

**Living style guides:** Tools like Storybook, Zeroheight, and Supernova generate style guides from component documentation, keeping design and code documentation in sync. Static PDF style guides go stale within months.

**Key insight:** Style guides exist to answer "what should we do here?" without requiring a design review for every decision. A style guide that can't answer the most common questions about spacing, color usage, and component selection hasn't been written with real design decisions in mind — it's documentation theater.`,
    },
    {
      id: 705,
      name: "Design System Governance",
      desc: `**Design system governance** — the structure of ownership, decision-making, contribution, and maintenance that keeps a design system alive, consistent, and useful as the organization grows. Without governance, design systems either become dictatorships (one team controls everything, nothing gets contributed) or anarchies (anyone can change anything, consistency erodes).

**Governance models:**
- **Centralized** — a dedicated design system team owns all components; other teams request additions and changes. High consistency; slower velocity; risk of becoming a bottleneck.
- **Federated** — a core team owns the system; embedded contributors from product teams add to it. Balances consistency with velocity; requires clear contribution guidelines.
- **Distributed** — product teams own their components; the design system is a shared library of genuinely common patterns. High velocity; consistency is harder to maintain.

**The contribution model:** Who can add a new component? Typically: if a component is used in 3+ places across products, it becomes a candidate for the design system. Below that threshold, it lives in the product repo.

**Versioning and breaking changes:** SemVer (major.minor.patch) applies to design systems. Breaking changes (removing a component, changing prop names) require major version bumps, migration guides, and deprecation periods. Teams blocked on major version upgrades signals governance failure.

**Key insight:** The biggest design system failure mode is not technical — it is organizational. A system maintained by one person as a side project, with no process for surfacing needs from product teams, will serve only the needs the maintainer happens to be aware of. Design systems need dedicated ownership, clear processes, and product team feedback loops to stay relevant.`,
    },
    {
      id: 706,
      name: "Design-Dev Handoff",
      desc: `**Design-dev handoff** — the process of transferring design artifacts and specifications from designers to developers so the design can be accurately implemented. Historically a waterfall process (design throws specs over the wall, devs implement); modern practice emphasizes collaboration rather than handoff.

**Traditional handoff tooling:**
- **Figma Inspect panel / Dev Mode** — developers see exact CSS properties, spacing, typography, assets directly in Figma without needing a designer present
- **Zeplin** — early handoff tool; generates specs, assets, and styleguide from design files
- **Avocode / Sympli** — similar inspection-focused tools

**The handoff problem:** "Pixel-perfect implementation" is a flawed goal when designs haven't accounted for all component states, responsive behavior, error states, and accessibility requirements. Good handoff includes not just the happy-path design but all edge cases.

**Design tokens as handoff:** When design tokens are shared between Figma (Variables) and the codebase (via Style Dictionary or a tokens JSON file), much of the handoff becomes automated — developers consume token names that map directly to Figma variable names. The design and code speak the same language.

**Moving toward collaboration:** Embedded designers and engineers working together (design pairing) reduces handoff friction dramatically — issues are caught during design, not discovered during implementation. The best teams don't have a "handoff moment" — design and engineering co-create throughout.

**Key insight:** The measure of a good handoff is not whether the developer received a comprehensive spec — it's whether they can build an accurate implementation without asking the designer for clarification on every edge case. Handoff success requires designers to think through component states, not just the ideal-state screenshot.`,
    },
    {
      id: 707,
      name: "Storybook",
      desc: `**Storybook** — an open-source frontend workshop for building, documenting, and testing UI components in isolation, outside of any application context. Originally created at Kadira (2016), now the industry standard for component development. Each "story" captures a specific state or variant of a component.

**Core Storybook workflow:**
1. **Develop components in isolation** — build the component and its variants without needing the full app context or API data
2. **Document via stories** — each story is a named, interactive example of a component state: "Button/Primary", "Button/Disabled", "Button/Loading"
3. **Test** — addon ecosystem enables visual regression tests (Chromatic), accessibility checks (axe via @storybook/addon-a11y), and interaction tests
4. **Publish** — Storybook can be deployed as a static site, serving as living documentation for the design system

**For designers and non-engineers:** Published Storybooks allow designers, PMs, and QA to review component behavior without setting up a dev environment. Components are inspectable, interactive, and documented in one place.

**Storybook addons ecosystem:**
- **Controls** — live prop editing in the browser UI
- **Actions** — logs event callbacks (onClick, onChange)
- **Viewport** — test at different screen sizes
- **a11y** — automated accessibility audit per story
- **Chromatic** — visual regression testing CI integration

**Storybook vs the app:** A common mistake is building components that only work inside the app — they have implicit dependencies on global state, routing, or providers. Writing Storybook stories forces components to be self-contained and composable, which is a design quality forcing function.

**Key insight:** Storybook is the documentation that actually gets updated — because it is generated from the live component code, not written separately. The moment the component changes, the story reflects it. This makes it the only form of component documentation that reliably stays current.`,
    },
    {
      id: 708,
      name: "Figma Component Architecture",
      desc: `**Figma component architecture** — the structure of reusable components within Figma, using features like Auto Layout, Variants, Component Properties, and nested components to create scalable, maintainable design assets that mirror a code component library.

**Core Figma component features:**
- **Components & Instances** — master components defined once; instances used throughout files; updating the master propagates to all instances
- **Auto Layout** — Figma's layout engine (similar to CSS Flexbox); components that resize, reflow, and handle content overflow correctly
- **Variants** — multiple states of a component organized as a variant set: Button has variants for [primary/secondary/danger] × [sm/md/lg] × [default/hover/active/disabled]
- **Component Properties** — allow instance customization (swap text, swap icon, toggle visibility) without breaking the component relationship

**Building towards code parity:** The best Figma component architecture mirrors the coded component's props. If the Button component in code has "variant: primary | secondary | danger" and "size: sm | md | lg", the Figma variant group should match exactly. This enables accurate handoff — developers see the same conceptual structure in design and code.

**Base components + composition:** Similar to code, build base (primitive) components first, then compose them into more complex organisms. Avoid duplicating properties in composed components — if the icon inside a button needs updating, update the Icon base component.

**Key insight:** A well-architected Figma component library should feel like a Lego set — each piece is designed to combine with others in predictable ways. A poorly architected one feels like a puzzle — you can technically get the right picture, but every combination requires manual adjustment. Auto Layout is the single feature that separates "looks good in screenshots" from "actually works as a design system."`,
    },
    {
      id: 709,
      name: "Accessibility in Design Systems",
      desc: `**Accessibility in design systems** — the practice of building WCAG compliance and inclusive design directly into design system components, so that every product built from the system inherits accessibility by default rather than having to re-implement it.

**What it means to bake in accessibility:**
- Buttons have keyboard focus styles by default (not removed with "outline: none")
- Color tokens maintain WCAG AA contrast ratios across all themes (including dark mode)
- Form components include proper label associations, error message connections, and ARIA attributes
- Modal and dialog components manage focus trapping and restoration automatically
- Accessible names (aria-label, aria-labelledby) are built into component APIs
- Motion-sensitive components respect "prefers-reduced-motion"

**The systemic advantage:** When accessibility is in the component, every team that uses the component gets it for free. Without a design system, each team independently (and often incorrectly) handles focus management, ARIA, and keyboard navigation. With a design system, these decisions are made once by specialists and inherited everywhere.

**Testing accessibility in components:** axe-core (via Storybook's a11y addon or jest-axe) runs automated accessibility checks per component story. Keyboard navigation should be manually tested; screen reader testing (NVDA + Firefox, JAWS + Chrome, VoiceOver + Safari) should be part of component acceptance criteria.

**The limitation:** Design systems can't guarantee full product accessibility. WCAG violations also occur in how components are composed, what content they contain, and what interaction flows they support. The system removes the low-level barriers; product teams must address the high-level ones.

**Key insight:** Accessibility in a design system is a multiplier — fixing one component fixes every product that uses it. Failing to build it in is also a multiplier — every team that builds without accessible foundations ships inaccessible products. The design system is the highest-leverage place to invest in accessibility.`,
    },
    {
      id: 710,
      name: "Design System Adoption",
      desc: `**Design system adoption** — the process of getting product teams to consistently use the design system rather than building custom components or reverting to old patterns. Adoption is the most overlooked — and most important — measure of a design system's success. A system unused is a system failed.

**Adoption barriers:**
- Missing components — teams build their own because the system doesn't have what they need
- Poor documentation — teams can't figure out how to use components correctly
- Frequent breaking changes — upgrading the dependency breaks their product unpredictably
- Performance overhead — adopting a heavy component library slows their app
- Inflexibility — components can't be customized enough for the product's needs

**Adoption strategies:**
- **Embed in core dependencies** — make it the default for new projects, not an opt-in
- **Champion program** — trained advocates in each product team who answer questions and advocate for the system
- **Component bounty** — when teams build something not in the system, work with them to contribute it upstream
- **Adoption metrics** — track component usage via tooling (import counts, bundle analysis); know where shadow components exist
- **Office hours and support** — design system team available to help integration problems

**Shadow design systems:** When teams don't adopt the system, they build their own parallel component set — a "shadow design system." This is the death signal. The correct response is not to mandate adoption (resentment) but to understand why teams went around the system and address those root causes.

**Key insight:** Adoption is a product problem, not a communication problem. Teams don't fail to use design systems because they don't know they exist — they fail because the system doesn't solve their problem as well as building it themselves would. Design systems earn adoption by being genuinely better to use than the alternative.`,
    },
    {
      id: 711,
      name: "Multi-Brand & Theming",
      desc: `**Multi-brand design systems** — design systems architected to serve multiple brands, products, or white-label clients using a single component library with different visual themes. Common in enterprise product suites, agency work, and SaaS platforms with white-labeling.

**The layered token architecture for theming:**
- **Global tokens** — raw values ("blue-500: #3b82f6") — never referenced in components directly
- **Semantic tokens** — purpose aliases ("color-action-primary: {blue-500}") — what components use
- **Brand/theme tokens** — brand-specific semantic overrides ("color-action-primary: {brand-green-600}") — what changes between themes

Swapping a theme means changing only the brand/semantic token layer; component code and Figma components remain unchanged.

**Dark mode as a theme:** Dark mode is the simplest multi-theme example — it overrides semantic color tokens to map to dark-appropriate values. The same architecture scales to full brand themes.

**Technical implementation:** Style Dictionary's "platforms" and "transforms" support outputting theme variants. CSS custom properties enable runtime theme switching without re-bundling. Class-based theming ("data-theme='brand-b'" on root) or CSS cascade layers scope themes cleanly.

**Design considerations:** Themes share structure (spacing, typography scale, component architecture) but differ in color and potentially type. Fonts are often the most complex theming dimension — different brands use different typefaces, affecting line height, spacing, and overall density.

**Key insight:** Multi-brand systems are about 10× harder to design and maintain than single-brand systems. Adopt this architecture only if you genuinely have multiple brands to serve. The most common mistake is over-engineering a theming system for a product that will never need it — YAGNI applies to design systems too.`,
    },
  ],
};

export default designSystems;
