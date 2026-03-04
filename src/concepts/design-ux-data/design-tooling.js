const designTooling = {
  name: "Design Tooling & Workflow",
  icon: "🛠️",
  color: "#84cc16",
  concepts: [
    {
      id: 764,
      name: "Figma",
      desc: `**Figma** — the dominant browser-based interface design tool, launched in 2016. Figma's defining advantages: real-time multiplayer collaboration (like Google Docs for design), browser-based (no installs, cross-platform), and a powerful component/autolayout system that enables scalable design systems.

**Core Figma capabilities:**
- **Frames & Auto Layout** — frames are the fundamental container; Auto Layout enables Flexbox-like responsive layout in design, replacing manual positioning
- **Components & Variants** — master components with instance overrides; variant sets for component states
- **Prototyping** — interactive flows with transitions, scroll behavior, overlays; shareable prototype links for user testing
- **Variables (tokens)** — design tokens for colors, spacing, typography natively in Figma (2023)
- **Dev Mode** — code inspection, design token mapping, asset export for developers

**Figma vs Sketch vs Adobe XD:** Figma has largely won the design tool market. Sketch is macOS-only and lacks native real-time collaboration. Adobe XD was discontinued in 2023. Figma's browser-based + real-time collaboration combination proved decisive.

**Figma's prototyping limitations:** Figma prototypes don't support real data, conditional logic, or complex interactions. For high-fidelity code prototypes, tools like Framer, ProtoPie, or actual code (React + Framer Motion) are needed.

**Key insight:** Figma democratized design collaboration in the same way GitHub democratized code collaboration. Designs are now living documents — visible to the whole team, version-controlled (via branches), and inspectable by developers without intermediary handoff steps. The shift from "design files emailed as PDFs" to "everyone on the team has a Figma link" is a genuine step function improvement in design-team collaboration.`,
    },
    {
      id: 765,
      name: "Wireframing & Prototyping",
      desc: `**Wireframe** — a low-fidelity, schematic representation of a UI layout showing content structure, navigation, and element placement without visual styling. **Prototype** — an interactive simulation of a product, at varying levels of fidelity, used to test and communicate design ideas.

**Fidelity spectrum:**
- **Paper sketches** — lowest fidelity; fastest to produce and discard; good for initial concept exploration; excellent in participatory design with users
- **Digital wireframes** — lo-fi grayscale layouts in Figma, Balsamiq, or Whimsical; shows layout and structure without implying finality; reduces "but the color is wrong" feedback
- **Clickable wireframe prototype** — lo-fi with interactive flows; tests navigation and task flow without investing in visual design
- **High-fidelity prototype** — visually complete mockup with interactions; Figma, ProtoPie, Framer; tests the full experience before development
- **Coded prototype** — HTML/React implementation; highest fidelity; tests technical feasibility and real interaction

**When to use each:**
- Paper: early exploration, participatory sessions, team brainstorms
- Lo-fi digital: aligning team and stakeholders on structure before visual design
- Clickable prototype: usability testing of flows
- Hi-fi prototype: stakeholder reviews, final approval before development
- Coded: complex animations, performance testing, technical validation

**The fidelity trap:** Spending too much time in hi-fi before validating structure wastes effort — structural changes after polished design work are expensive. Validate structure in lo-fi, then invest in visual polish only after the flow is confirmed.

**Key insight:** The right fidelity is the minimum that answers your current question. If you're testing whether users understand the navigation structure, a lo-fi wireframe with clickable links is sufficient and much faster to build than a polished mockup. Match fidelity to purpose, not to presentation quality.`,
    },
    {
      id: 766,
      name: "Design Handoff",
      desc: `**Design handoff** — the process of transferring a completed design to the engineering team for implementation. In modern workflows, "handoff" increasingly means "developer access to design in Figma" rather than a discrete moment in a waterfall process.

**Figma Dev Mode:** Launched in 2023, Dev Mode converts Figma frames into a code-inspection view: CSS properties, auto-generated code snippets, design token references, and asset export. Developers can inspect any element to see exact measurements, spacing, typography, and colors without requiring a designer to extract them.

**What good handoff includes (beyond visual specs):**
- All component states (hover, active, disabled, loading, error, empty)
- Responsive behavior (how the design adapts at each breakpoint)
- Animation and transition specs (timing, easing, trigger)
- Interaction notes (what happens on click, what the error message says, what the tooltip text is)
- Edge cases (what does the card look like with a 200-character title? 0 items? A very long email address?)

**The annotated spec approach:** For complex components, designers add annotation layers in Figma documenting interaction intent, accessibility notes, and edge case handling. Annotations make implicit design decisions explicit and reduce implementation questions.

**Moving beyond handoff:** The best teams reduce the handoff moment by embedding designers and engineers together throughout the process. Designers can spec implementation details in real-time; engineers raise implementation questions during design. The result is fewer surprises at implementation time.

**Key insight:** The most common cause of implementation-design mismatch is not developer carelessness — it's incomplete design specifications. Designers who spec only the happy-path, ideal-state screen leave all edge case decisions to developers, who make them based on implementation convenience, not UX intent.`,
    },
    {
      id: 767,
      name: "Version Control for Design",
      desc: `**Version control for design** — systems and practices for tracking changes to design files over time, enabling rollback, branching for experiments, and change review. Design version control has historically been far behind code version control — the consequences of "accidental overwrites" and "which version is this?" are familiar to every designer.

**Figma's approach:**
- **Version History** — auto-saves and manual named versions of Figma files; rollback to any previous state
- **Branches** — create a branch of a file to work on without affecting the main file; merge changes back when ready; closest thing to Git branching in design

**Abstract and Plant (Sketch-era tools):** Built Git-like version control for Sketch files (binary format — like files, not text). Largely superseded by Figma's built-in collaboration, but established the concept of commit history and PR-style reviews for design.

**Limitations of design version control vs. code:**
- Binary files (in non-Figma tools) can't be diff-ed — you can compare versions visually but not line-by-line
- Merge conflicts in design are complex — two designers editing the same component in parallel requires manual reconciliation
- Semantic versioning (major/minor/patch) isn't standard practice in design teams

**Naming conventions as version control:** In the absence of robust tooling, naming conventions ("Homepage_v3_final_FINAL2") are the practical reality for many teams. Design systems should use explicit version numbers for component file milestones to align with code library versioning.

**Key insight:** Design version control solves two problems: preventing accidental loss (rollback) and enabling parallel work (branching). The rollback problem is well-solved by Figma's version history. The branching/merging problem for complex component systems is still largely unsolved — it's the frontier of design tooling.`,
    },
    {
      id: 768,
      name: "DesignOps",
      desc: `**DesignOps** — the practice of optimizing design team operations, tools, processes, and workflows to increase design capacity, quality, and impact. Analogous to DevOps for engineering teams: DesignOps addresses the operational layer of design so designers can focus on the work itself.

**DesignOps responsibilities:**
- Design system tooling, maintenance, and contribution processes
- Research operations (recruitment pipelines, tooling, repository management)
- Onboarding of new designers (access to tools, file organization, process documentation)
- Design critique and review processes
- Asset management (icon libraries, photography, illustration standards)
- Cross-team workflows (how design coordinates with engineering, product, marketing)
- Tools evaluation and procurement (Figma licenses, prototyping tools, research tools)

**When DesignOps becomes necessary:** Small design teams (1-5 people) can manage operationally informally. When a team grows beyond ~10 designers, process friction becomes a significant productivity drain — inconsistent file organization, no research repository, no shared component library, redundant tool licenses. DesignOps addresses these systematically.

**The "design ops team" vs "design ops role":** In large organizations (Airbnb, Google, IBM), dedicated DesignOps teams exist. In smaller organizations, DesignOps responsibilities may be distributed across a design systems lead and a design manager. The function matters; the dedicated team is only justified at scale.

**Key insight:** DesignOps makes design scalable. Without it, design quality and process consistency degrades as team size grows — each new designer reinvents processes, creates inconsistent file structures, and duplicates work. DesignOps provides the operational infrastructure that lets design teams maintain quality as they scale.`,
    },
    {
      id: 769,
      name: "Design Critique",
      desc: `**Design critique** — a structured review process where designers present work and receive feedback from peers and stakeholders. Distinct from approval — critique is about improving the work, not deciding whether to approve it. The culture of how critique is conducted has an enormous impact on design quality and team dynamics.

**Structured critique framework:**
1. **Presenter sets context** — the design goal, the user problem, the constraints
2. **Observers review silently** — look at the work before discussion to form independent opinions
3. **Presenter asks specific questions** — "Does this navigation make sense for first-time users?" not "What do you think?"
4. **Feedback is constructive and specific** — referencing design principles, user needs, and specific observations, not personal taste
5. **Presenter clarifies and responds** — the presenter can explain decisions; discussion converges on specific issues

**Feedback categories:**
- **Blocking** — must change before proceeding; design fails to solve the problem
- **Recommendation** — important improvement, not blocking
- **Nit** — small style preference; author's call

**Avoiding "I like / I don't like" critique:** Preference-based feedback ("I don't like that shade of blue") is not critique — it's taste expression. Effective critique grounds feedback in user needs ("Will users in a hurry miss this CTA because it doesn't contrast enough with the background?") or design principles.

**Key insight:** The ability to give and receive critique effectively is the most important professional skill in design, and the one most rarely taught. Designers who can articulate specific, principle-based feedback improve their team's work; designers who can receive feedback without defensiveness grow faster than anyone else. Critique culture is design culture.`,
    },
    {
      id: 770,
      name: "Asset Optimization for Design",
      desc: `**Asset optimization** — preparing images, icons, and other visual assets for use in web and mobile products in the most efficient format and size, minimizing file size without compromising visual quality. Unoptimized assets are one of the most common causes of slow web performance.

**Image formats:**
- **JPEG** — lossy compression; best for photographs and complex images; not suitable for sharp edges or transparency
- **PNG** — lossless; supports transparency; larger files than JPEG for photos; good for illustrations, icons with transparency
- **SVG** — vector; infinitely scalable; best for icons and simple illustrations; can be styled with CSS; not suitable for complex photos
- **WebP** — Google's modern format; better compression than JPEG/PNG with comparable quality; broad browser support (2023); use as primary format with JPEG/PNG fallback
- **AVIF** — next-gen format; better compression than WebP; excellent quality; growing browser support

**SVG vs icon fonts vs PNG sprites:**
- SVGs: individually styleable, accessible, lightweight; the current standard for icons
- Icon fonts: poor accessibility, rendering issues, single-color only; largely deprecated
- PNG sprites: obsolete; solved HTTP/1.1 request limits that HTTP/2 makes irrelevant

**Optimization workflow:**
- Export SVGs and run through SVGO (removes metadata, shortens paths)
- Export images in WebP; compress via Squoosh, ImageOptim, or Cloudinary
- Use responsive images ("srcset", "sizes") to serve appropriately-sized images per screen
- Lazy load below-the-fold images

**Key insight:** A single unoptimized hero image (3MB JPEG) can dwarf the total size of all HTML, CSS, and JavaScript on a page. Image optimization consistently produces the largest performance gains per hour of engineering effort of any optimization technique. It's also entirely automated with modern pipelines.`,
    },
    {
      id: 771,
      name: "Design-Engineering Collaboration",
      desc: `**Design-engineering collaboration** — the working relationship between product designers and software engineers through the design-to-implementation process. The quality of this collaboration determines how faithfully designs are implemented and how quickly the team ships.

**Collaboration models:**
- **Waterfall handoff** — design completes, throws specs over the wall, engineers implement; slow, high rework, misaligned expectations
- **Embedded designer** — one designer paired with one or two engineers; high communication fidelity; designers understand implementation constraints; engineers understand design intent; fast iteration
- **Design eng role** — engineers who design or designers who code; reduces handoff entirely for specific work types

**Common friction points:**
- Designs don't account for technical constraints (animation requiring custom physics, layout that can't be achieved in CSS)
- Engineers implement literally rather than understanding intent (pixel-perfect on desktop; broken on mobile they didn't test)
- Missing states in designs discovered during implementation
- Design changes during implementation without engineering visibility

**Collaboration practices:**
- **Design reviews with engineers** — engineers present in design critiques; catch feasibility issues before implementation
- **Implementation reviews with designers** — designers review the implemented design in a browser; catch divergence before merge
- **Shared vocabulary** — designers understand basic frontend concepts; engineers understand basic design principles
- **Joint definition of done** — design acceptance criteria are part of the engineering ticket, not an afterthought

**Key insight:** The most productive design-engineering relationships are built on mutual respect for each other's craft. Designers who dismiss engineering constraints as "not my problem" produce designs that can't be built. Engineers who dismiss design decisions as "just aesthetics" produce products that are technically correct and experientially broken. The best products come from teams that genuinely understand and respect both crafts.`,
    },
    {
      id: 772,
      name: "Prototyping with Code",
      desc: `**Code prototyping** — building interactive prototypes using actual code (HTML/CSS/JS, React, SwiftUI) rather than design-tool prototypes. The highest-fidelity form of prototyping; appropriate when behavior, animation, or technical integration can't be accurately simulated in Figma or ProtoPie.

**When code prototypes are justified:**
- Complex animations that require physics or real-time interaction (impossible in Figma)
- Data-driven behavior (how does the component look with 1 item? 100 items? 0 items?)
- Performance validation (does the animation run at 60fps on a mid-range device?)
- Genuine technical uncertainty (does this database query return fast enough to support this UX pattern?)

**Prototyping tools and frameworks:**
- **Framer** — React-based design tool with code escape hatches; the bridge between Figma and coded prototypes
- **ProtoPie** — high-fidelity interaction design without coding; handles complex conditional interactions
- **CodeSandbox / StackBlitz** — instant browser-based React/Vue/vanilla JS environments for quick code prototypes
- **Next.js / Vite** — for prototypes that will be turned into production code

**The prototype-to-production temptation:** Prototype code is often messy by design — quick to build, not maintainable. The discipline is to throw away the prototype and build clean production code, not to "just ship the prototype." Prototype code that becomes production code accumulates technical debt rapidly.

**Key insight:** The decision between a Figma prototype and a code prototype should be driven by what question you're trying to answer. If the question is "will users understand this navigation?" — Figma is faster and sufficient. If the question is "does this animation feel right?" or "does the AI response time support this interaction pattern?" — code is the only honest answer.`,
    },
    {
      id: 773,
      name: "Design Documentation",
      desc: `**Design documentation** — written and visual artifacts that capture design decisions, component usage guidelines, interaction patterns, and rationale. Good documentation enables consistent implementation, accelerates onboarding, and preserves institutional knowledge that would otherwise leave when a designer does.

**Types of design documentation:**
- **Component documentation** — how to use a component, when to use it, variants, props, dos and don'ts, accessibility notes (Storybook, Zeroheight)
- **Pattern documentation** — when to use a modal vs a drawer vs a toast; how to handle empty states; form validation conventions
- **Decision logs** — why was this approach chosen over alternatives; useful context for future redesigns
- **Design principles** — the product's design philosophy; what "good" means in this context
- **Brand guidelines** — logo usage, color, typography, imagery style

**Documentation quality standards:**
- **Show, don't tell** — interactive examples and screenshots, not just prose descriptions
- **Include the don'ts** — "don't do this" with examples of wrong usage prevents common mistakes
- **Explain why, not just what** — the rationale for a decision helps teams apply the principle in new situations
- **Keep it current** — stale documentation is worse than no documentation (false confidence)

**Documentation as design system adoption driver:** Well-documented components with clear examples, copy-able code snippets, and explicit guidance dramatically increase adoption. Poorly documented components get abandoned and duplicated in shadow design systems.

**Key insight:** Documentation is the tax that makes design decisions compound. An undocumented component decision is remade by every team that encounters the same situation. A documented decision propagates the insight to every future team — it's the highest-leverage form of design knowledge sharing.`,
    },
  ],
};

export default designTooling;
