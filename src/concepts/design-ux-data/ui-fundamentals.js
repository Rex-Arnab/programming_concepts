const uiFundamentals = {
  name: "UI Design Fundamentals",
  icon: "🎨",
  color: "#3b82f6",
  concepts: [
    {
      id: 688,
      name: "Visual Hierarchy",
      desc: `**Visual hierarchy** — the arrangement and presentation of design elements in a way that implies importance, guiding the viewer's eye in a deliberate sequence. Well-designed visual hierarchy means users always know what to look at first, second, and third — without thinking about it.

**The tools of hierarchy:**
- **Size** — larger elements command more attention; headlines are larger than body text for this reason
- **Weight** — bold text signals importance; light text recedes
- **Color & contrast** — high-contrast elements pop forward; low-contrast elements recede
- **Position** — top-left is scanned first in left-to-right cultures (F-pattern and Z-pattern eye-tracking research)
- **Whitespace** — elements surrounded by space attract more attention; cramped elements blur together
- **Proximity & grouping** — elements grouped together are read as related

**The F-pattern and Z-pattern:** Eye-tracking studies (Nielsen) show that users scan web pages in an F-shape — scanning horizontally across the top, then a shorter horizontal scan below, then vertically down the left side. Content-sparse layouts generate Z-shaped scanning. Design with these patterns; place critical CTAs where the eye lands.

**Common violations:** Equal visual weight on everything (no hierarchy = no direction), primary CTA styled same as secondary links, important error messages in low-contrast text.

**Key insight:** Visual hierarchy is the designer's way of writing a script for the user's attention. If you don't direct attention deliberately, users write their own script — and it may not surface your most important content.`,
    },
    {
      id: 689,
      name: "Typography in UI",
      desc: `**Typography in UI** — the craft of selecting, arranging, and sizing typefaces to create clear, readable, and hierarchy-supporting text in interfaces. Typography accounts for ~95% of web design content (Itten), yet it's often treated as an afterthought.

**Core typography concepts for UI:**
- **Type scale** — a harmonious set of font sizes (e.g., 12/14/16/20/24/32/48px) derived from a ratio; creates visual coherence across the UI
- **Line height (leading)** — the vertical space between lines of text; 1.4–1.6× the font size for body text is typically comfortable for reading
- **Line length (measure)** — 50–75 characters per line is optimal for readability; too short is choppy, too long is tiring
- **Pairing** — one high-personality display font + one neutral, readable body font is a reliable approach
- **Weight contrast** — use weight (bold/regular/light) to create hierarchy within the same typeface; avoids the visual noise of multiple fonts

**System fonts vs custom fonts:** System fonts (San Francisco, Segoe UI, Roboto) load instantly, match the OS aesthetic, and require no font loading. Custom fonts establish brand identity but add HTTP requests and cumulative layout shift risk if not loaded carefully (font-display: swap).

**Accessibility:** WCAG requires 4.5:1 contrast ratio for normal text (3:1 for large text). Font size below 16px on mobile is a usability issue, not just aesthetics.

**Key insight:** Bad typography is invisible until it isn't. Users don't consciously notice good typography — they just read without fatigue. When typography is bad, reading becomes work. The single highest-ROI typography decision is usually line-height: increasing it from the default (1.2) to 1.5 transforms readability with zero effort.`,
    },
    {
      id: 690,
      name: "Color Theory for UI",
      desc: `**Color theory for UI** — the application of color psychology and visual design principles to create interfaces that communicate clearly, establish hierarchy, convey meaning, and respect accessibility constraints. Unlike fine art, UI color is primarily functional: color carries semantic meaning and must work for all users, including those with color vision deficiencies.

**UI-specific color concepts:**
- **Primary / secondary / tertiary palette** — the core brand colors + supporting neutrals + semantic colors (success green, error red, warning yellow, info blue)
- **Semantic color** — color that carries consistent meaning: red = error/destructive, green = success/positive, yellow/orange = warning, blue = informational/neutral action
- **Tints and shades** — lighter tints for backgrounds and disabled states; darker shades for hover and pressed states; create a full color scale (50–900) for each brand color
- **60-30-10 rule** — 60% dominant neutral background, 30% secondary color for sections/cards, 10% accent for CTAs and highlights

**Color accessibility:** ~8% of males have red-green color blindness (deuteranopia). Never rely on color alone to convey information — pair color with icons, labels, or patterns.

**Contrast requirements (WCAG AA):** Normal text: 4.5:1 minimum. Large text (18px+ bold or 24px+): 3:1 minimum. UI components: 3:1.

**Key insight:** The most common UI color mistake is using too many accent colors, which dilutes their meaning. If everything is blue, nothing stands out. Your primary action color should be rare enough that users notice it immediately — if it appears 40 times on a page, it's no longer an accent.`,
    },
    {
      id: 691,
      name: "Spacing & Whitespace",
      desc: `**Whitespace** (negative space) — the empty space between and around elements in a design. Counterintuitively, whitespace is not "wasted space" — it is the primary tool for creating visual breathing room, grouping, hierarchy, and elegance. Designs that feel cluttered are almost always lacking whitespace.

**The 8-point grid system:** Most modern UI design systems use an 8-point (or 4-point) base unit for all spacing decisions — margins, padding, gaps. This creates visual rhythm and consistency: instead of ad-hoc values (7px, 11px, 22px), all spacing is a multiple of 8 (8, 16, 24, 32, 48, 64...). Fractional values (4, 12) are permitted for fine adjustments.

**Types of whitespace:**
- **Macro whitespace** — large spaces between major sections and layout areas; creates breathing room and section separation
- **Micro whitespace** — small spaces between text lines, list items, and inline elements; controls readability and density
- **Active whitespace** — deliberately placed to guide the eye or create emphasis (the space around a hero CTA)
- **Passive whitespace** — the natural margins and padding that prevent crowding

**Density spectrum:** Products exist on a spectrum from sparse (consumer apps: much whitespace) to dense (professional tools: information-dense, less whitespace). Both are valid — the key is intentional, consistent density choices.

**Key insight:** When a design "feels amateur," excessive density is usually the cause. The reflex to add more content, more features, more information to every screen fights against usability. White space is confidence — it says "this element is important enough to stand alone."`,
    },
    {
      id: 692,
      name: "Grid Systems",
      desc: `**Grid systems** — underlying structural frameworks that organize UI content into consistent, aligned columns and rows. Grids solve the fundamental layout problem: how to place elements predictably so the result is visually ordered rather than arbitrary.

**Column grids:** The most common UI grid is a 12-column grid (Bootstrap, Tailwind, design tools). 12 divides evenly into 2, 3, 4, or 6 columns — enabling flexible layouts without breakpoints. Columns have a fixed width; gutters (gaps between columns) separate them; margins bookend the grid.

**8pt grid vs column grid:** The 8pt spacing system governs micro-spacing (padding, margins between elements); the column grid governs macro-layout (how content areas divide across the screen). Both can coexist; they solve different problems.

**Baseline grid:** Aligns all text elements to a shared vertical rhythm based on the line-height of body text (usually 4px or 8px increments). Creates vertical visual harmony. More common in editorial and marketing design than in functional UI.

**Responsive grids:** Column counts change at breakpoints — typically 4 columns on mobile, 8 on tablet, 12 on desktop. Content spans different column counts at different breakpoints.

**Auto layout and CSS Grid:** CSS Grid and Flexbox (+ Figma's Auto Layout) have made grid implementation more powerful and less prescriptive than the fixed column systems of the Bootstrap era. Container queries bring grid behavior relative to parent size rather than viewport.

**Key insight:** Grids aren't constraints — they're creative scaffolding. Designers who resist grids spend time debating arbitrary spacing decisions; designers who embrace grids make decisions faster and produce more cohesive results. The grid becomes invisible in the final design, which is exactly right.`,
    },
    {
      id: 693,
      name: "Iconography",
      desc: `**Iconography** — the design, selection, and use of icons in UI as visual shorthand for concepts, actions, and objects. Icons reduce the visual weight of labels, cross language barriers, and can make dense interfaces more scannable — but only when used correctly.

**When icons work:** Icons that have near-universal recognition: save (floppy disk — vestigial but persistent), search (magnifying glass), home, settings (gear), delete (trash). These work without labels because of decades of convention.

**When icons fail:** Abstract metaphors ("what does this hamburger-stack icon do?"), icons used without labels for non-standard actions, icon-only navigation in B2B apps where users are learning new workflows. Research consistently shows that labeled icons outperform icon-only navigation in findability.

**Icon systems:** Icons within a product should share visual weight, stroke width, corner radius, and perspective (outline vs filled). Mixing icon styles from different sets creates visual incoherence. Common: Feather Icons, Material Icons, Heroicons, Phosphor Icons.

**SVG vs icon fonts:** SVGs are the current standard — they're scalable, accessible (can include "title" tags for screen readers), individually styleable with CSS, and don't require a full font file download. Icon fonts (Font Awesome) are largely deprecated in modern design systems.

**Size and touch targets:** Icons used as buttons must have a touch target of at least 44×44px even if the icon itself is 24×24px — achieved via padding on the clickable area.

**Key insight:** If you need a tooltip to explain what an icon means, the icon has failed. Either use a more recognizable icon, add a visible label, or replace the icon with a text label entirely. Icon-only interfaces feel clever to designers and frustrating to users.`,
    },
    {
      id: 694,
      name: "Contrast & Accessibility",
      desc: `**Contrast** — the difference in luminance or color between foreground (text, icons) and background. Sufficient contrast is what makes text legible for users with low vision, in bright sunlight, or on low-quality displays. It is one of the most critical and most frequently violated accessibility requirements.

**WCAG contrast ratios:**
- Normal text (< 18px regular or < 14px bold): 4.5:1 minimum (AA), 7:1 (AAA)
- Large text (18px+ regular or 14px+ bold): 3:1 minimum (AA)
- UI components and graphical objects: 3:1 minimum (AA)
- Decorative elements and disabled controls: no requirement

**How to measure:** Tools like the WebAIM Contrast Checker, Figma's Contrast plugin, or browser DevTools Accessibility panel calculate contrast ratios from hex colors.

**Common violations:** Light gray text on white backgrounds (very common in "clean" designs), white text on medium-saturation colored buttons, placeholder text styled at low opacity.

**Beyond text contrast:** Focus indicators (keyboard navigation) need 3:1 contrast with adjacent colors. Links that are differentiated from body text only by color (no underline) need 3:1 contrast between link and body text color.

**The design-accessibility conflict:** Many "modern, elegant" design trends — light gray text, low-contrast placeholder text, muted color palettes — directly reduce accessibility. The solution is to treat accessibility as a design constraint (like mobile breakpoints), not an afterthought.

**Key insight:** A design that fails WCAG AA contrast is unusable for an estimated 1.3 billion people with visual impairments — and for everyone else in challenging lighting conditions. Contrast is not an accessibility "nice to have"; it is the baseline of legibility.`,
    },
    {
      id: 695,
      name: "Responsive Design Principles",
      desc: `**Responsive design** — the approach of building interfaces that adapt fluidly to different screen sizes, resolutions, and orientations, providing an optimal experience on every device. Coined by Ethan Marcotte in 2010, responsive design uses fluid grids, flexible images, and CSS media queries to adapt layout without serving separate versions of a site.

**Core technical tools:**
- **Fluid grids** — widths in percentages, not pixels; columns that stretch proportionally
- **Flexible images** — "max-width: 100%" prevents images from overflowing their containers
- **Media queries** — CSS rules that apply at specific viewport widths (breakpoints)
- **Viewport meta tag** — "width=device-width, initial-scale=1" essential for mobile rendering

**Responsive vs Adaptive:** Responsive layouts flow continuously; adaptive layouts snap between fixed layouts at specific breakpoints. Responsive is more flexible and future-proof; adaptive is sometimes better for complex layouts where specific breakpoints need dramatically different structure.

**Mobile-first approach:** Write CSS for mobile first, then add media queries that enhance layout for larger screens ("min-width" queries). Contrast with desktop-first (writing for large screens, then overriding with "max-width" queries). Mobile-first produces leaner CSS and forces content prioritization.

**Content strategy for responsive:** On mobile, you don't hide desktop content — you prioritize it. "Mobile first" also means mobile-first content strategy: what's most important to show when space is limited?

**Key insight:** Responsive design is not just "does it fit on a phone?" — it's "does it work on a phone?" Fitting a desktop information architecture into a small screen by shrinking everything creates a terrible mobile UX. Mobile-first forces a rethinking of hierarchy and content priority that improves the desktop experience too.`,
    },
    {
      id: 696,
      name: "Dark Mode Design",
      desc: `**Dark mode** — a display setting that uses dark backgrounds with light text, reducing eye strain in low-light environments, potentially reducing battery consumption on OLED screens, and providing an alternative aesthetic preference. Implementing true dark mode is significantly more complex than inverting colors.

**Why you can't just invert:** Simple color inversion creates unnatural colors (photos look like negatives, brand colors become strange), doesn't account for different darkness levels needed for layered surfaces, and can cause WCAG contrast failures for elements designed only for light mode.

**Surface elevation in dark mode:** Google Material Design's approach: instead of shadows (which disappear on dark backgrounds), elevated surfaces in dark mode get lighter overlays. A surface at elevation 1dp is slightly lighter than the base surface; elevation 24dp is noticeably lighter. This communicates depth without shadows.

**Color palette adjustments:**
- Saturated colors need to be desaturated in dark mode — on a dark background, fully saturated colors feel harsh and vibrate visually
- Avoid pure black (#000000) backgrounds — dark gray (#121212 in Material Design) creates less extreme contrast that is more comfortable
- Ensure all text and UI components still meet WCAG contrast ratios in dark mode

**CSS implementation:** "prefers-color-scheme: dark" media query detects system preference; CSS custom properties (variables) make theming manageable — change variable values, not every individual color declaration.

**Key insight:** The most common dark mode mistake is treating it as an aesthetic toggle rather than a full design system. Every color, illustration, shadow, image overlay, and state color needs dark-mode-specific values. Dark mode is not a feature — it's a second design system that runs in parallel.`,
    },
    {
      id: 697,
      name: "Microinteractions",
      desc: `**Microinteractions** — small, single-purpose interactions that accomplish a specific task or communicate a specific piece of feedback. Coined and analyzed by Dan Saffer in his 2013 book "Microinteractions." Examples: the Facebook Like animation, the toggle switch that smoothly slides, the pull-to-refresh spinning indicator, the satisfying "check" when a to-do is completed.

**Saffer's four parts of a microinteraction:**
1. **Trigger** — initiates the microinteraction (user action or system condition)
2. **Rules** — what happens and in what order
3. **Feedback** — what the user sees/hears/feels in response
4. **Loops and modes** — does it repeat? Does it change over time (e.g., after N uses)?

**What microinteractions accomplish:**
- Communicate system status ("loading" spinner, progress bar)
- Provide feedback for actions ("added to cart" animation)
- Prevent errors ("shake" animation on wrong password)
- Guide users (subtle directional hints in onboarding)
- Create delight and brand personality (Slack loading screen tips)

**Animation principles for microinteractions:** Duration 100–300ms for feedback; easing out (fast start, slow end) for elements entering; easing in for elements leaving; spring physics for elements that feel physical. Anything over 500ms feels slow; under 100ms feels imperceptible.

**When microinteractions become anti-features:** Excessive animations slow down experienced users (they've seen the animation 500 times), increase cognitive load, and create accessibility issues (motion sensitivity: "prefers-reduced-motion").

**Key insight:** Microinteractions are the difference between software that feels alive and software that feels like machinery. They're the gap between "functional" and "delightful" — and they're implemented in the last 5% of build time but noticed in 100% of interactions.`,
    },
    {
      id: 698,
      name: "Affordance & Signifiers",
      desc: `**Affordance** — a property of an object or interface element that indicates how it can be used. A door handle affords pulling; a flat plate affords pushing. Introduced to design by Don Norman, who initially used Gibson's ecological psychology concept and later clarified the distinction between affordances and signifiers.

**Affordance vs Signifier (Norman's distinction):**
- **Affordance** — the actual relationship between object and user (a button can be pressed; a link can be clicked)
- **Signifier** — a perceptual signal that communicates the affordance (a button looks raised and clickable; a link is underlined in blue)

The problem Norman identified: affordances are often invisible. What makes a button a button — what signals "press me" — is the signifier. Poor UI design has affordances without signifiers (flat buttons that don't look clickable) or false signifiers (underlined text that isn't a link).

**Design implications:**
- Interactive elements must be visually distinguishable from non-interactive ones — button styling, hover states, cursor changes (pointer cursor on hover)
- Links in body text should look like links (traditionally: blue + underline)
- Input fields need visible boundaries (outline, underline, or background change)

**The flat design affordance problem:** Early iOS 7 and "flat design" movement removed visual depth cues (shadows, bevels) that signaled interactivity. Research showed significant usability regressions — buttons didn't look pressable, interactive elements were indistinguishable from decorative ones. "Ghost buttons" (border only, no fill) suffer from low discoverability.

**Key insight:** "Make it look like a button" is never just an aesthetic choice. It is a functional requirement. Every interaction in your UI requires a visible signifier — if users can't see that something is interactive, they won't interact with it, no matter how powerful the feature behind it.`,
    },
    {
      id: 699,
      name: "Motion & Animation in UI",
      desc: `**Motion design in UI** — the deliberate use of animation, transitions, and movement to communicate state changes, establish spatial relationships, provide feedback, and guide user attention. Good motion makes interfaces feel natural and coherent; bad motion is decorative noise that slows users down.

**Disney's 12 animation principles applied to UI:**
- **Easing (slow-in, slow-out)** — natural motion accelerates and decelerates; linear motion feels mechanical
- **Anticipation** — small movement before main action (button dip before launch) prepares users
- **Squash and stretch** — used in "bouncy" UI elements for playfulness (not appropriate for professional tools)
- **Staging** — focus attention on the action; animate only what matters

**Functional motion categories:**
- **Feedback** — button press states, form submission confirmation (100–200ms)
- **Transition** — page/screen transitions that orient users in information space (200–400ms)
- **Loading** — skeleton screens and progress indicators that communicate wait time
- **Tutorial** — animated walkthroughs that teach interaction patterns

**Accessibility — prefers-reduced-motion:** ~35% of users have vestibular disorders that make excessive motion nauseating (CSS Media Queries Level 5). Implement: "@media (prefers-reduced-motion: reduce)" to disable or minimize animations for users who've requested reduced motion. This is not optional — it's an accessibility requirement.

**Performance considerations:** CSS transitions and transforms (translate, scale, opacity) are GPU-accelerated and smooth. Animating layout properties (width, height, margin) triggers reflow and is janky. The "FLIP" technique (First, Last, Invert, Play) enables smooth layout animations using only transforms.

**Key insight:** The best motion is motion users don't consciously notice. If a user says "nice animation," you've made it too prominent — it's now decoration. If they say "wow, that was smooth," the motion is doing its job: communicating spatial relationships and state changes without calling attention to itself.`,
    },
  ],
};

export default uiFundamentals;
