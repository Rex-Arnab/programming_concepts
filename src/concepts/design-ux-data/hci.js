const hci = {
  name: "Human-Computer Interaction (HCI)",
  icon: "🧬",
  color: "#f59e0b",
  concepts: [
    {
      id: 754,
      name: "HCI Overview & History",
      desc: `**Human-Computer Interaction (HCI)** — the academic and applied discipline studying how people interact with computers and other technology, with the goal of designing interactions that are more efficient, effective, safe, and satisfying. HCI draws from computer science, cognitive psychology, ergonomics, and design.

**Historical milestones:**
- **1945** — Vannevar Bush describes the "memex" in "As We May Think" — the conceptual ancestor of hypertext
- **1963** — Ivan Sutherland's "Sketchpad" — the first interactive graphical computer
- **1968** — Douglas Engelbart's "Mother of All Demos" — mouse, hypertext, video conferencing, real-time collaborative editing — 50 years ahead of mainstream adoption
- **1970s-80s** — Xerox PARC develops the GUI, desktop metaphor, and mouse-driven interaction
- **1984** — Apple Macintosh brings GUI to mass market; "ease of use" as a commercial differentiator
- **1980** — Donald Norman joins Apple; publishes "The Design of Everyday Things" (1988); shifts HCI from efficiency to human-centeredness
- **2007** — iPhone introduces multitouch and capacitive screen interaction at scale

**The ACM CHI conference** is the premier academic venue for HCI research. Much foundational HCI research (click models, reading patterns, color perception, attention) originates here and informs modern product design.

**Key insight:** HCI exists because software engineers initially designed for computers, not for people. The discipline emerged when it became obvious that technically correct systems were being abandoned because they were unusable. The field's entire purpose is to close the gap between what computers can do and what humans can comfortably ask them to do.`,
    },
    {
      id: 755,
      name: "Gulf of Execution & Evaluation",
      desc: `**Gulf of Execution and Gulf of Evaluation** — Don Norman's framework from "The Design of Everyday Things" (1988) describing two fundamental gaps in human-system interaction.

**Gulf of Execution:** The gap between what a user wants to do and what actions the system makes available. The user has a goal; they must figure out which system action achieves it. Wide gulf: users can't figure out how to do what they want ("how do I do this?"). Narrow gulf: the mapping from goal to action is obvious.

**Gulf of Evaluation:** The gap between what the system produces and what the user can perceive and interpret. After acting, the user must evaluate whether the system is in their desired state. Wide gulf: users can't tell if their action worked or what the current state is ("did that work?"). Narrow gulf: feedback is immediate and interpretable.

**Norman's 7 Stages of Action:**
1. Form a goal
2. Form an intention (what to do)
3. Specify the action
4. Execute the action
5. Perceive the system state
6. Interpret the system state
7. Evaluate whether the goal was achieved

Stages 1-4 cross the Gulf of Execution; Stages 5-7 cross the Gulf of Evaluation.

**Design implications:** Narrow the execution gulf with good affordances and visibility of available actions. Narrow the evaluation gulf with clear, immediate feedback. When both gulfs are narrow, interaction feels intuitive. When either is wide, users feel confused or uncertain.

**Key insight:** Most "confusing" software has wide gulfs in predictable places — complex settings panels where the relationship between option and outcome is unclear (wide evaluation gulf), or buried actions that users can't find (wide execution gulf). Diagnosing which gulf is the problem directs the solution.`,
    },
    {
      id: 756,
      name: "GOMS Model",
      desc: `**GOMS** — a cognitive modeling technique for predicting the time and sequence of actions required to accomplish a task with a specific interface. Stands for Goals, Operators, Methods, and Selection rules. Developed by Card, Moran, and Newell in "The Psychology of Human-Computer Interaction" (1983). One of the most influential formalisms in HCI.

**Components:**
- **Goals** — the objective the user is trying to accomplish (at multiple levels: "send an email," "type recipient address," "click Send")
- **Operators** — the basic actions available (keystroke, mouse movement, click, mental operation)
- **Methods** — sequences of operators that accomplish a goal (subprocedures)
- **Selection rules** — rules for choosing between alternative methods when multiple methods accomplish the same goal

**The Keystroke Level Model (KLM)** — the practical derivative of GOMS; assigns time values to basic operations: Keystroke (0.2s), Point (mouse movement, variable), Home (move hand between keyboard and mouse, 0.4s), Mental preparation (1.35s), System Response (variable). Sum these to predict task completion time.

**When GOMS is useful:**
- Comparing competing interface designs for efficiency (before building either)
- Evaluating tradeoffs between mouse-driven and keyboard-driven workflows
- Understanding where interface workflows create excessive "homing" (switching between keyboard and mouse)

**GOMS limitations:** Models an expert, error-free user. Doesn't account for novices, errors, learning, or emotional states. Predicts efficiency but not user satisfaction or learnability.

**Key insight:** GOMS analysis reveals the hidden cost of forcing users to switch between keyboard and mouse ("homing"). Every hand-move between keyboard and mouse costs ~0.4 seconds. In a task repeated 50 times per day, eliminating two such switches saves 400 seconds per day — 28 hours per year. Keyboard shortcuts aren't a luxury; they're a multiplier for productivity tools.`,
    },
    {
      id: 757,
      name: "Direct Manipulation",
      desc: `**Direct manipulation** — an interaction style introduced by Ben Shneiderman (1983) where users interact with visual representations of objects, using physical actions that are analogous to real-world actions. The opposite of command-line interfaces where users manipulate abstract representations through syntax.

**The three principles of direct manipulation:**
1. **Continuous representation of objects** — the objects of interest are always visible; the system's current state is always represented on screen
2. **Physical actions instead of syntax** — actions are applied directly to visible objects (drag, drop, click, resize) rather than typed commands
3. **Rapid, incremental, reversible operations** — actions produce immediate visible feedback; effects are undoable

**Why direct manipulation feels natural:** It mirrors physical world interactions. Dragging a file to a trash can to delete it maps to a physical mental model. Moving a shape on a canvas by clicking and dragging maps to physical manipulation. This leverages existing motor skills and mental models rather than requiring new abstractions.

**The visual programming insight:** WYSIWYG editors, spreadsheets, design tools, and CAD software owe their usability to direct manipulation. Before WYSIWYG word processors, editing required commands ("bold from character 15 to 45 on line 3") and mental simulation of the result. Direct manipulation made the result the interface.

**Limits of direct manipulation:** Not all domains have natural physical analogues. Configuration, data transformation, and complex workflows often don't map to physical manipulation. Command languages and code remain superior for automation, precision, and operating on many objects simultaneously.

**Key insight:** Direct manipulation works because it shifts cognitive load from working memory to perception. Instead of building a mental model of the system state, users can see it. This is one of the most powerful human factors principles: externalize cognition — put information in the world, not in the head.`,
    },
    {
      id: 758,
      name: "Distributed Cognition",
      desc: `**Distributed cognition** — a theoretical framework (Edwin Hutchins, "Cognition in the Wild," 1995) arguing that cognitive processes are not confined to individual minds but are distributed across people, artifacts, and the environment. Pilots navigating a plane, surgeons in an operating room, and traders on a stock exchange are cognitive systems that span minds, instruments, and social structures.

**Why it matters for design:** If cognition is distributed, then the interface is not just "how users interact with the computer" but part of the cognitive system. Designing an interface means designing how cognitive work is allocated between the human and the system — what the human must remember vs. what the system tracks; what the human must compute vs. what the system calculates.

**Design implications:**
- **Externalization** — provide visual representations that replace working memory load ("seeing" the current state instead of remembering it)
- **Artifacts as memory** — checklists, status displays, and undo history extend human memory into the environment
- **Collaborative interfaces** — design for how multiple people's cognition will be coordinated (multi-user tools, dashboards, control rooms)
- **Representation matches task** — the interface representation should match the cognitive operations required by the task; a flight status map is better than a table of departure times for spatial reasoning about aircraft positions

**Connection to HCI practice:** Distributed cognition informs the design of complex operational interfaces — air traffic control, surgical dashboards, collaborative workspaces. But the principles also apply to everyday products: an order confirmation page with all order details visible is a cognitive artifact that extends the user's memory.

**Key insight:** Every time a user has to remember something between steps in a workflow, the interface is failing to support distributed cognition. Good design offloads memory from the user onto the system — persistence, history, undo, and visible state are not features; they are cognitive extensions.`,
    },
    {
      id: 759,
      name: "Input Modalities",
      desc: `**Input modalities** — the different ways users can provide input to a computer system: mouse, keyboard, touch, pen/stylus, voice, gaze, gesture, brain-computer interface. The choice of modality shapes the entire interaction design and determines who can use the product and how efficiently.

**Mouse:** High precision; enables hover states; requires dedicated surface; unsuitable for mobile, accessibility users relying on touch or keyboards. Standard for desktop productivity applications.

**Touch:** Low precision (finger tip ~10mm); no hover state; portable; natural for phones and tablets; unsuitable for precise editing tasks without a stylus; enables gestures.

**Keyboard:** Fastest for text input; enables powerful shortcuts for expert users; requires motor ability in hands; critical for accessibility.

**Pen/stylus:** High precision on touch surfaces; enables pressure sensitivity and tilt; natural for drawing, annotation, and note-taking; limited to specialized use cases.

**Voice:** Hands-free; low precision; excellent for dictation and command execution; problematic in noisy environments or shared spaces; high error rate for complex or specialized vocabulary.

**Gaze (eye-tracking):** Emerging; high-value for accessibility (users with limited motor control); also used in research, gaming, and automotive. Consumer-grade gaze tracking (Meta Quest, Tobii) is improving rapidly.

**Multi-modal interaction:** Most modern devices support multiple input modalities simultaneously. A tablet user may switch between touch, stylus, and keyboard within a single session. Design for modality-agnostic interactions where possible: the same task should be completable via different input methods.

**Key insight:** Input modality assumption is the source of many "platform-specific" UX failures. Hover states (mouse only), drag-and-drop (mouse/touch with limits), right-click context menus (mouse only) — features designed for one modality fail for others. Design for the target input mode first, then consider other modes as progressive enhancements.`,
    },
    {
      id: 760,
      name: "Attention & Flow State",
      desc: `**Attention in HCI** — the cognitive resource that determines what users process and what they ignore. Human attention is selective, limited, and serial — users can deeply attend to one thing at a time. Interface design that competes for attention fragments it; design that channels attention effectively enables focus.

**Attentional models relevant to HCI:**
- **Change blindness** — users often fail to notice significant changes in a scene if they occur during a saccade or distraction; explains why UI changes users "should" notice go unobserved
- **Inattentional blindness** — when focused on a task, users fail to notice unexpected stimuli; "banner blindness" is an example — users trained to ignore banner-ad-shaped regions miss actual notifications placed there
- **Attentional spotlight** — attention functions like a spotlight that can be narrowed for detail or widened for overview

**Flow state and interface design:** Csikszentmihalyi's flow theory: the optimal experience state where challenge matches skill, and attention is completely absorbed in the task. UX that supports flow: uninterrupted task continuity, appropriate challenge, immediate feedback, clear goals, minimal distractions.

**Disruptions to flow:** Unnecessary notifications, required context-switches, modal interruptions, slow response times (each delay breaks the attentional focus), and excessive cognitive load. SaaS tools with notification overload are chronic flow destroyers.

**Notification design:** Notifications are interruptions. Research shows that recovering full focus after an interruption takes 23 minutes (Gloria Mark, UC Irvine). Notification design should minimize interruptions to high-value moments and batch low-priority information.

**Key insight:** The most valuable thing productivity software can do is protect user flow state. Every modal, notification, required navigation, and waiting spinner is a potential flow breaker. The ROI of performance optimization and reduced interruptions is not just UX quality — it's the user's ability to do deep work.`,
    },
    {
      id: 761,
      name: "Tangible & Embodied Interaction",
      desc: `**Tangible user interfaces (TUIs)** — physical, graspable interfaces where digital information is represented in physical form and manipulated through physical action. Pioneered by Hiroshi Ishii (MIT Media Lab) and Brygg Ullmer. Examples: physical blocks that represent digital objects, tangible building tools where assembling physical pieces creates digital structures.

**Embodied interaction (Paul Dourish):** The theory that interaction is fundamentally physical and social — not just information exchange between a brain and a computer. "Embodied interaction" argues that our bodily experience of the physical world shapes all cognition, and that the best interfaces leverage bodily knowledge rather than fighting it.

**Design implications:**
- Interfaces that map to physical skills (grip, rotation, weight, texture) reduce learning curve
- Physical affordances (buttons that feel like they do something) leverage prior physical knowledge
- Spatial memory is powerful — the physical location of controls is remembered more reliably than their abstract label
- Wearables and IoT devices must be designed for embodied interaction — the interface is in the world, not on a screen

**AR/VR embodied interaction:** Mixed reality brings digital objects into physical space. Interaction design for XR must account for physical laws (reaching distance, natural hand positions, fatigue from extended arm use), body awareness, and the psychological difference between touching a virtual object and manipulating a 2D interface.

**Key insight:** The most natural interfaces are the ones that make us forget we're using a computer. Swipe gestures, touchscreens, physical game controllers — these leverage our bodies' existing motor skills. The design goal is to reduce the cognitive translation layer between body action and digital effect to near zero.`,
    },
    {
      id: 762,
      name: "Adaptive & Personalized Interfaces",
      desc: `**Adaptive interfaces** — systems that automatically modify their behavior, layout, or content based on user behavior, context, or explicit preferences. **Personalized interfaces** — systems that present user-specific content, settings, or experiences based on individual profiles, history, or preferences.

**Types of adaptation:**
- **Rule-based** — if the user is on mobile, show simplified navigation; if the user is an admin, show admin controls
- **Behavior-based** — surface recently used features prominently; hide features never used after N sessions
- **ML-driven** — recommend content, predict next actions, adapt UI based on behavioral patterns

**The personalization paradox:** Users want relevance (show me what I care about) but resist the feeling of being profiled (don't be creepy). Personalization that feels helpful ("You might also like...") is well-received; personalization that reveals invasive data collection is unsettling. The distinction: personalization based on in-product behavior is acceptable; personalization based on data users didn't know was collected is not.

**Feature discovery vs feature recommendation:** Adaptive interfaces that hide rarely-used features reduce cognitive load but can make feature discovery impossible. Users who never see a feature can never decide to use it. Balance: adapt defaults while keeping a path to full feature access.

**Progressive disclosure as adaptation:** Showing beginner-appropriate UI by default and progressively unlocking advanced features as users demonstrate competence is a form of adaptation. Duolingo, Notion, and Figma all do this — the complexity of the tool is revealed as the user is ready for it.

**Key insight:** The best adaptive interfaces adapt to behavior, not demographics. Showing "advanced" features to users over 30 and "simple" UI to users under 25 is both discriminatory and inaccurate. Adapting to actual usage patterns — what features a specific user actually uses, how often, and in what context — produces interfaces that genuinely improve over time.`,
    },
    {
      id: 763,
      name: "Multisensory Design",
      desc: `**Multisensory design** — the design of interactions that engage multiple sensory channels: visual, auditory, haptic (touch/vibration), and potentially olfactory or taste (rare in digital products). Most digital product design is almost entirely visual; incorporating sound and haptics creates richer, more informative, and more engaging interactions.

**Haptic feedback:** Vibration and force feedback that communicates information through touch. iPhone Taptic Engine provides distinguishable tactile patterns for different events: notifications, haptic keyboards, physical button simulations, error buzzes. Good haptic design matches the tactile sensation to the semantic meaning (a light tap for confirmation; a warning buzz for errors).

**Audio in UI:**
- **Functional audio** — notification sounds, error sounds, success chimes; must have visual equivalents for deaf users
- **Ambient audio** — background music and soundscapes (Headspace, productivity apps); can establish mood and reduce intrusive notifications
- **Sonification** — encoding data as sound (accessibility tool for visualizations; radar-style audio for navigation)

**The multimodal advantage:** Multimodal feedback can communicate more information than visual feedback alone. A phone that shows a spinning indicator, vibrates to indicate progress milestones, and plays a completion sound provides three redundant completion signals — reducing error and increasing satisfaction.

**Design constraints:**
- All auditory and haptic feedback must have visual equivalents (WCAG 1.1)
- Audio must be optional and mutable (many users keep phones on silent)
- Haptic feedback must not be disruptive in public contexts
- "Haptic fatigue" — excessive haptic feedback becomes annoying, not informative

**Key insight:** The most underused sensory channel in digital product design is haptics. Touch devices are everywhere; haptic engines are built into most phones; yet almost no products use haptics beyond the default system notification buzz. Thoughtfully designed haptic feedback creates a physical confidence in interactions — a tactile confirmation that bridges the gulf of evaluation.`,
    },
  ],
};

export default hci;
