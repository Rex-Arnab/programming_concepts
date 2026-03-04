const uxFoundations = {
  name: "UX Foundations & Principles",
  icon: "🧠",
  color: "#6366f1",
  concepts: [
    {
      id: 678,
      name: "User Experience (UX) Design",
      desc: `**User Experience (UX) Design** — the discipline of designing products so they are useful, usable, and desirable to the people who use them. Don Norman coined the term at Apple in 1993 to describe a holistic view of human-centered design that extends beyond the interface to every touchpoint a person has with a product, service, or organization.

UX is not a single skill — it is a practice that draws on psychology, information architecture, visual design, interaction design, and research. A UX designer's primary job is to reduce friction between a user's goals and their ability to achieve them.

**What UX is NOT:** UX is not graphic design (making things look pretty), not UI (the specific visual interface layer), not "making users happy" (good UX sometimes requires delivering bad news clearly — like an error message). UX is about effectiveness, efficiency, and satisfaction.

**The three pillars of good UX:** (1) Utility — does it do what users need? (2) Usability — can users accomplish it without frustration? (3) Desirability — do they want to come back?

**Key insight:** The best UX is often invisible. When users accomplish their goals without noticing the interface — when the design gets out of the way — the UX has succeeded. The goal is not to impress; it is to serve.`,
    },
    {
      id: 679,
      name: "UX vs UI Design",
      desc: `**UX vs UI Design** — two related but distinct disciplines that are frequently confused. **UX (User Experience)** is the overall experience a person has using a product — how it feels, whether it works logically, and whether it achieves their goals. **UI (User Interface)** is the specific visual and interactive layer through which users interact — buttons, menus, typography, color, layout.

Mental model: think of a car. UX is the driving experience — ergonomics, instrumentation clarity, how intuitive the controls are, how comfortable the seat is. UI is the specific design of the dashboard — the fonts on the speedometer, the color of the indicator lights, the layout of the controls.

**Why the distinction matters in practice:** A beautiful UI with broken UX drives users away (apps with stunning aesthetics but confusing flows). Good UX with a mediocre UI is better — but both together is the goal. UX typically comes first: user research → information architecture → interaction flows → wireframes → then visual UI design.

**Common career confusion:** "UI/UX Designer" is a common job title that blurs the distinction. In large organizations, the roles split: UX researchers handle discovery, UX designers handle flows and wireframes, UI designers handle visual design. In smaller companies, one person often does all three.

**Key insight:** You can learn UI skills in weeks. UX thinking takes years to develop because it requires deep empathy and the discipline to validate assumptions with real users instead of designing for yourself.`,
    },
    {
      id: 680,
      name: "User-Centered Design (UCD)",
      desc: `**User-Centered Design (UCD)** — a design philosophy and iterative process that places the needs, goals, and limitations of end users at the center of every stage of the design process. Formalized by Donald Norman in his 1986 book "User Centered System Design," UCD is the antithesis of technology-centered design ("we built this feature, now get users to use it").

**The UCD process (ISO 9241-210):**
1. **Understand context of use** — who are the users, what are they trying to do, in what environment?
2. **Specify user requirements** — what must the design achieve for users?
3. **Produce design solutions** — wireframes, prototypes, mockups
4. **Evaluate against requirements** — usability testing, feedback collection
5. **Iterate** — refine based on evaluation; repeat until requirements are met

**UCD vs Human-Centered Design (HCD):** HCD (IDEO/Stanford d.school) is broader — it includes stakeholders, society, and business needs alongside users. UCD focuses specifically on the user. In practice, the terms are used interchangeably.

**The failure mode:** UCD done badly produces "design by committee" where every user complaint gets addressed in isolation without systemic thinking. UCD done well synthesizes user needs into coherent design decisions — it doesn't mean giving users everything they ask for.

**Key insight:** Users are experts in their own problems, but not in solutions. When Henry Ford asked customers what they wanted, they said "faster horses." UCD means listening deeply to the problem — not just implementing the first solution users suggest.`,
    },
    {
      id: 681,
      name: "Design Thinking",
      desc: `**Design Thinking** — a human-centered, iterative problem-solving framework popularized by IDEO and the Stanford d.school. It reframes problems from a user empathy perspective before jumping to solutions, and emphasizes rapid prototyping and testing over extensive upfront planning.

**The five stages (non-linear, often revisited):**
1. **Empathize** — research and understand users deeply: observe, interview, immerse
2. **Define** — synthesize findings into a clear problem statement ("How might we...")
3. **Ideate** — generate many ideas without judgment; diverge before converging
4. **Prototype** — build low-fidelity representations of ideas to test assumptions
5. **Test** — put prototypes in front of real users, learn, iterate

**Design Thinking vs Agile:** Agile addresses how to build things; Design Thinking addresses what to build and for whom. They're complementary — Design Thinking informs what goes in the backlog; Agile delivers it.

**The "How Might We" (HMW) technique:** Converts problem observations into opportunity questions. "Users can't find the checkout button" → "How might we make the path to purchase more obvious?" HMW frames problems as opportunities without prescribing solutions.

**When NOT to use it:** Design Thinking is a discovery tool, not an execution framework. Applying it to well-understood execution problems wastes time. It's most valuable when the problem itself is unclear or assumed.

**Key insight:** The most valuable stage is Empathize, and it's the one most often skipped. Teams jump to Define ("we know the problem") and Ideate ("let's brainstorm solutions") before they've done real user research. The insights that change products come from actual observation — not assumptions.`,
    },
    {
      id: 682,
      name: "Hick's Law",
      desc: `**Hick's Law** — a psychology principle stating that the time it takes to make a decision increases logarithmically with the number of choices available. Formally: reaction time = a + b * log2(n+1), where n is the number of choices. Named after psychologists William Edmund Hick and Ray Hyman who independently identified the relationship in the 1950s.

**Practical UX applications:**
- Reduce navigation menu items: fewer choices = faster orientation
- Break long forms into steps: present one decision at a time
- Remove rarely-used features from primary views: progressive disclosure
- Simplify onboarding: don't present 15 options on the first screen

**The paradox of choice:** Barry Schwartz's research shows that beyond a threshold, more choices cause paralysis and dissatisfaction — users make worse decisions and feel worse about them. Jam study (Iyengar & Lepper, 2000): 24 jam varieties generated more interest but 6 varieties generated more purchases (10× more).

**When more choices are appropriate:** Expert users often want more options. Complex tools (Photoshop, IDEs) serve expert users who benefit from comprehensive option sets. The key is hiding advanced options from beginners via progressive disclosure.

**Key insight:** Every extra option in your UI is a micro-tax on users' cognitive budget. They pay it every time they make a choice. Eliminating unnecessary options doesn't reduce power — it reduces cognitive overhead. Good product design is as much about what to remove as what to add.`,
    },
    {
      id: 683,
      name: "Fitts's Law",
      desc: `**Fitts's Law** — a predictive model of human movement that states the time to reach a target is a function of the distance to the target divided by the size of the target. The smaller or further a target, the longer it takes to click/tap. Formulated by psychologist Paul Fitts in 1954; one of the most robustly validated laws in human factors research.

**UI design implications:**
- **Make interactive elements large enough** — especially on touch: minimum 44×44px (iOS HIG) or 48×48dp (Material Design)
- **Place frequently used controls near common cursor positions** — macOS puts the menu bar at the top edge (infinite height = easy to hit) deliberately
- **Screen edges and corners are fast targets** — a target pinned to a screen edge can be hit without precision aiming, since the cursor can't overshoot
- **Keep related actions close together** — distance between confirmation modal buttons matters

**The Steering Law (extension):** Related to Fitts's Law; the time to move through a constrained path (like a cascading dropdown menu) depends on the path's width and length. Explains why nested menus are cognitively taxing — users must steer through narrow corridors.

**Mobile implications:** Thumb reach zones (Hoober's research) + Fitts's Law together drive bottom navigation placement on mobile — bottom edges are both large targets and in the natural thumb reach zone.

**Key insight:** Most developers design clickable areas to exactly match their visual bounding boxes. Adding padding to clickable areas (invisible hit area extension) significantly improves usability, especially on mobile, at virtually zero visual cost.`,
    },
    {
      id: 684,
      name: "Gestalt Principles",
      desc: `**Gestalt Principles** — a set of visual perception laws from early 20th-century German psychology that describe how humans instinctively group and organize visual information. From the German word for "shape/form." These are the unconscious rules your brain uses to make sense of visual input — designers use them deliberately to create clear, intuitive layouts.

**The core principles:**
- **Proximity** — elements close together are perceived as related. Group related form fields; separate unrelated sections with space.
- **Similarity** — elements that look alike are perceived as part of the same group. Consistent button styles signal "these are all actions."
- **Continuity** — the eye follows smooth lines and curves. Carousel arrows leverage this; so do breadcrumbs.
- **Closure** — the brain fills in gaps to complete familiar shapes. Logos and icons often rely on this.
- **Figure-Ground** — we perceive elements as either foreground (figure) or background (ground). Modal overlays create strong figure-ground separation.
- **Common Region** — elements enclosed in the same bounded area are perceived as grouped. Cards and panels use this.
- **Symmetry** — symmetric layouts feel stable and organized.

**Why they matter in UI:** Violating Gestalt principles creates visual confusion that users can't always articulate — they just feel like something is "off." A form where related and unrelated fields are spaced equally feels harder to parse than one where proximity groups related fields.

**Key insight:** Gestalt principles operate below conscious awareness. Users won't say "the proximity grouping is unclear" — they'll say "this form is confusing." Mastering these principles lets you diagnose and fix visual confusion at the perceptual level.`,
    },
    {
      id: 685,
      name: "Jakob's Law",
      desc: `**Jakob's Law** — formulated by UX researcher Jakob Nielsen: users spend most of their time on other sites, not yours. This means they expect your site to work the same way as all the other sites they already know. Familiarity reduces learning curve; novelty creates friction.

**Design implications:**
- Follow established conventions for common UI patterns: shopping carts use cart icons, search bars are at the top right, logos link to home, navigation is at the top or left
- When you deviate from convention, you're forcing users to learn — they'll pay that learning cost once, but they'll resent it every time
- Innovation in interaction design is most valuable at the core differentiating experience; use conventions everywhere else

**The tension with innovation:** Jakob's Law can be misread as "never innovate in UI." The nuance: innovate where it creates genuine user value; use conventions where convention is sufficient. The iPhone's swipe navigation was genuinely novel and created value. A novel way to add items to a cart creates confusion with no payoff.

**Mental models and convention:** Jakob's Law is really about mental models — users arrive at your product with pre-existing mental models about how things work. When your design matches their mental model, they can use it immediately. When it doesn't, you're asking them to update their mental model — which takes effort and creates frustration.

**Key insight:** The competitive advantage of your product should come from what it does, not from how unusual the interface is. The interface should be invisible — a transparent layer between the user and the value. Unusual interfaces are memorable for the wrong reasons.`,
    },
    {
      id: 686,
      name: "Mental Models in UX",
      desc: `**Mental models** — the internal representations users build of how a system works based on their past experience, prior knowledge, and expectations. Users interact with systems based on their mental model — not based on how the system actually works. When the design's "system image" (what the UI communicates) doesn't match the user's mental model, confusion and errors follow.

**Don Norman's three mental model components:**
1. **Designer's model** — how the designer intended the system to work
2. **System image** — what the product communicates to users through its UI, documentation, and behavior
3. **User's model** — what users actually believe about how the system works

The designer never communicates directly with the user — only through the system image. If the system image is incomplete or misleading, user models diverge from designer intent.

**Example:** Early desktop computers used the "desktop" metaphor — files, folders, wastebaskets — because users already had a mental model of physical desktops. This dramatically lowered the learning curve. Cloud storage broke this when "sync" behavior didn't match physical metaphors — hence years of user confusion about what "on this device" vs "in the cloud" means.

**Designing for mental models:** Research what mental models users already have; design to match them wherever possible; when you must break them, invest heavily in onboarding and signifiers to help users build a new model.

**Key insight:** You can't change users' mental models by writing better documentation or adding more tooltips. You change them by changing what the system does and how it responds — the system image is the teacher.`,
    },
    {
      id: 687,
      name: "Cognitive Load in UX",
      desc: `**Cognitive load** — the mental effort required to use a product. Cognitive psychologist John Sweller identified three types: **intrinsic load** (complexity of the task itself), **extraneous load** (unnecessary complexity introduced by poor design), and **germane load** (mental effort that actually builds understanding). Good UX minimizes extraneous load and doesn't increase intrinsic load unnecessarily.

**Working memory limits:** Humans can hold roughly 7 +/- 2 items (Miller's Law) in working memory at once. Cognitive load theory explains why: when UI requires users to hold too many things in mind simultaneously, errors and abandonment increase.

**High cognitive load patterns to eliminate:**
- Requiring users to remember information from one screen to use on another (recognition > recall)
- Dense forms with no visual grouping — every field draws on working memory
- Jargon or acronyms that require users to decode meaning
- Inconsistent patterns that prevent automation of repeated tasks

**Cognitive load reduction techniques:**
- Chunk information into meaningful groups (proximity grouping)
- Use progressive disclosure — show details only when needed
- Provide defaults that are right for most users
- Use recognition over recall — show options rather than requiring memorization

**Key insight:** Cognitive load is invisible but measurable — users don't say "I'm experiencing high extraneous cognitive load," they say "this is confusing" or they abandon. Usability testing is the most reliable way to detect it. The goal is to make every user action feel effortless, not just possible.`,
    },
  ],
};

export default uxFoundations;
