const interactionDesign = {
  name: "Interaction Design",
  icon: "🖱️",
  color: "#ec4899",
  concepts: [
    {
      id: 734,
      name: "Interaction Design Fundamentals",
      desc: `**Interaction Design (IxD)** — the practice of designing the interactive behavior of products: how users interact with them, how the product responds, and how the interaction achieves user goals. Alan Cooper (father of Visual Basic, author of "The Inmates Are Running the Asylum") is widely credited with formalizing the discipline and distinguishing it from graphic design and software engineering.

**IxD dimensions (Gillian Crampton Smith + Philip Tabor):**
1. **Words** — labels, button text, instructions; the verbal dimension
2. **Visual representations** — icons, images, typography, layout
3. **Physical objects / space** — hardware, spatial relationships, device form factor
4. **Time** — motion, animation, sequence, state changes over time
5. **Behavior** — the system's response to user actions; rules and algorithms

**IxD vs UX vs UI:**
- IxD focuses specifically on the dynamic behavior of interfaces — the what-happens-when layer
- UX is broader — includes research, IA, strategy, and overall experience
- UI is the static visual layer — what it looks like when nothing is happening

**Core IxD goals:** Reduce error; make the right action obvious; provide meaningful feedback; make interaction feel natural and responsive; support user goals without requiring users to think about the interaction itself.

**Key insight:** Interaction design is fundamentally about bridging the gap between user intent and system behavior. Every time a user does something unexpected (uses the back button instead of the in-app navigation, double-clicks when a single click was expected), the interaction design has failed to match their mental model. Closing that gap is the entire discipline.`,
    },
    {
      id: 735,
      name: "Feedback & System Status",
      desc: `**Feedback** — the system's response to user actions that communicates what happened, whether it succeeded, and what the current state is. Nielsen's first usability heuristic: "Visibility of system status." Users should always know what is going on. Lack of feedback is one of the most common and most damaging interaction design failures.

**Types of feedback:**
- **Immediate feedback** — confirms an action was received (button press animation, click sound); should be < 100ms
- **Progress feedback** — for operations taking > 1 second; shows the system is working (spinner, progress bar)
- **Outcome feedback** — confirms the operation completed and what the result was ("Email sent" toast)
- **Error feedback** — explains what went wrong and how to fix it

**Response time guidelines (Miller/Card):**
- < 100ms — feels instantaneous; no feedback needed beyond the visual press state
- 100ms–1s — noticeable delay; a spinner or visual change reassures the user
- 1s–10s — perceptible wait; show a progress indicator
- > 10s — show a progress bar with estimated time, or break the operation

**The silent failure anti-pattern:** Users submit a form, nothing visible happens, and the form isn't submitted (network error, validation failure). Users re-submit (creating duplicates), wait indefinitely, or abandon. Every action must produce visible feedback.

**Key insight:** Optimistic UI — updating the interface immediately as if the action succeeded, then reverting if it fails — is the most effective pattern for fast-feeling interactions. Twitter's like animation updates immediately without waiting for server confirmation. The key: have a believable revert pattern for failures, and the action must be reversible.`,
    },
    {
      id: 736,
      name: "Error Prevention & Recovery",
      desc: `**Error prevention** — designing interfaces that make it difficult or impossible for users to make mistakes in the first place, rather than relying on error messages to fix them after the fact. Nielsen's heuristic #5: "Error prevention." Better still: error prevention > good error messages.

**Error prevention strategies:**
- **Constraints** — limit what users can do to valid actions; date pickers prevent invalid dates; phone number fields accept only digits
- **Defaults** — pre-fill reasonable values; users who need defaults taken care of get them; users who need custom values override them
- **Confirmation dialogs** — for destructive or irreversible actions; "Are you sure you want to delete this?" (use sparingly — overused, they become click-through noise)
- **Undo over confirm** — instead of "Are you sure?", provide an undo action after the fact; less interruption, same safety

**Error message design (when prevention fails):**
- **Be specific** — "Email address is invalid" vs "Invalid input"; tell them exactly what's wrong
- **Be actionable** — tell users how to fix it, not just that it's broken
- **Be human** — no jargon, no blame; "Something went wrong" is not helpful; "We couldn't save your changes — please check your internet connection" is
- **Place errors near the problem** — inline field errors, not just a banner at the top

**Slips vs mistakes:** Reason's taxonomy: slips are execution errors (user knows what to do but does the wrong thing); mistakes are planning errors (user has the wrong goal). Design can prevent many slips (constraints, confirmations); mistakes require better onboarding and documentation.

**Key insight:** "Are you sure?" dialogs are a design failure, not a design feature. They're added when designers are worried users will make a mistake but haven't done the work to make the action safer. The alternative: design the interaction so the action is reversible, so no confirmation is needed.`,
    },
    {
      id: 737,
      name: "Form Design",
      desc: `**Form design** — the design of input interfaces for collecting user data. Forms are among the most critical and most often poorly designed UI elements — they stand between users and what they want (completing a purchase, signing up, filing a request). Every friction point in a form is a drop-off point.

**Core form design principles:**
- **Labels above fields** — eye-tracking research (Matteo Penzo, 2006): labels above fields are read as a unit with the field; labels beside fields require more eye movement; placeholders as labels disappear on focus and reduce working memory
- **One column layout** — multi-column forms require horizontal scanning that disrupts form flow; use one column except for short, related fields (First / Last name)
- **Input field width signals expected length** — a narrow field for a ZIP code, a wide field for an address; the field width is a visual affordance
- **Inline validation** — validate after the user leaves a field (on blur), not while typing; mid-typing errors frustrate users

**Field ordering:** Ask for easy, low-resistance information first (name before payment details); front-load trust by earning it through a good experience before asking for sensitive data; never ask for information you don't need.

**Progress indicators for multi-step forms:** Show users how many steps there are and where they are. Users abandon long forms more often when they don't know how much is left. Breaking a long form into steps with a progress bar reduces apparent length.

**Submit button design:** Label the submit button with the action being taken ("Create account", "Place order", "Send message") not a generic "Submit". Generic submit buttons create uncertainty about what will happen.

**Key insight:** The single highest-ROI form improvement in most products is making all required fields obvious, putting labels above fields (not inside them as placeholders), and providing inline validation. These three changes alone typically reduce form abandonment by 20-30% without changing the business logic at all.`,
    },
    {
      id: 738,
      name: "Loading States & Skeleton Screens",
      desc: `**Loading states** — visual feedback that communicates a system is working and data is being fetched. Every non-instantaneous operation needs a loading state. How you handle loading determines whether waiting feels acceptable or intolerable.

**Loading state options:**
- **Spinner / loading indicator** — generic; communicates "waiting" but not how long or how much
- **Progress bar** — communicates progress toward completion; reduces perceived wait time; requires actual progress data
- **Skeleton screens** — placeholder layouts that mimic the structure of the content that will load; the most effective for reducing perceived wait time
- **Optimistic UI** — show the final state immediately, render the actual data when it arrives (if they match well enough)

**Why skeleton screens work:** Lincoln Murphy and Facebook's research showed skeleton screens feel faster than spinners even when actual load time is identical. The reason: skeleton screens communicate "your content is coming" and show the shape of the information space, reducing uncertainty and making the wait purposeful.

**Perceived vs actual performance:** Research consistently shows that perceived performance matters as much as actual performance. A 3-second load with a skeleton screen is perceived as faster than a 2-second blank screen followed by a spinner. Design perceived performance, not just actual performance.

**Progressive loading:** Load critical content first (above the fold, primary data) and render progressively as secondary data arrives. Users can begin interacting with available content rather than waiting for the full page.

**Key insight:** The worst loading experience is a blank white screen with no feedback. The second worst is a spinner with no progress indication for operations that take more than 5 seconds. If an operation takes more than 5 seconds, you owe users an estimate. "This usually takes about 30 seconds" is more reassuring than an indefinite spinner.`,
    },
    {
      id: 739,
      name: "Empty States",
      desc: `**Empty states** — the UI displayed when a container or list has no content to show. Not a design edge case — it's often the first experience new users encounter, the state users see after completing a flow, and the state that drives onboarding conversions. Empty states are consistently undertreated and represent high-leverage design opportunities.

**Types of empty states:**
- **First-run / onboarding empty state** — user has just signed up; no data yet; the first impression of the core product ("You have no projects yet — create your first one")
- **User-cleared empty state** — user has intentionally removed all content ("Your inbox is empty" / "Nothing here but cobwebs")
- **Search/filter empty state** — no results match the current query ("No results for 'spaceship repair'")
- **Error empty state** — content exists but failed to load ("Couldn't load your projects — try again")

**What good empty states include:**
- An explanation of why the state is empty (not just "Nothing here")
- A clear call to action (the obvious next step to create content or change the filter)
- An illustration or icon (makes the state feel warm, not like a broken UI)
- Appropriate tone (onboarding empty states should be encouraging; error empty states should be honest)

**The first-run empty state is product marketing:** If a user's first experience with your core feature is a blank screen with no guidance, they may never return. The first-run empty state should demonstrate the product's value proposition even before the user has any data — through sample content, illustrations that communicate the product's purpose, or guided first steps.

**Key insight:** An empty state that makes users feel capable and motivated is a design asset. An empty state that makes users feel lost or like the product is broken is a churn driver. Search "No results for X" is a particularly brutal empty state — it needs to suggest alternatives, broader search terms, or a path forward.`,
    },
    {
      id: 740,
      name: "Onboarding UX",
      desc: `**Onboarding UX** — the design of the experience that transitions new users from sign-up to successfully using the product's core value for the first time. Onboarding is arguably the most important UX investment in a product: a user who doesn't reach the "aha moment" never sees the product's value and churns.

**Onboarding patterns:**
- **Guided tour / product walkthrough** — step-by-step tooltips highlighting UI elements (Shepherd.js, Intro.js, UserGuiding). Overused and often skipped; works only when the interaction is genuinely novel.
- **Progressive onboarding** — drip features as users need them; don't show everything at once; surface the next feature when users would naturally encounter it
- **Blank canvas onboarding** — start users with sample content or templates they can explore and modify, rather than an empty state
- **Checklist-driven onboarding** — a visible list of setup steps with progress; provides direction and creates completion motivation (Zeigarnik effect: people remember uncompleted tasks more than completed ones)

**The "aha moment":** The moment a user first experiences the core value of the product (Slack's "aha moment" was identified as sending 2000 messages within a team; Twitter's was following 30 people). Onboarding should be designed around minimizing friction to reach this moment as quickly as possible.

**Time-to-value (TTV):** The metric for onboarding effectiveness: how long from signup to first time user gets core value. Shorter TTV correlates directly with retention.

**Key insight:** The biggest onboarding mistake is front-loading everything you want users to know about the product. Users don't care about your features — they care about their goals. Onboarding should ask "what is the user trying to accomplish right now?" and give them exactly what they need to accomplish it, nothing more.`,
    },
    {
      id: 741,
      name: "UI States (Default / Loading / Error / Empty / Success)",
      desc: `**UI states** — the distinct visual conditions a UI component or screen can exist in, each requiring a specific design treatment. Designing only the default (happy path) state is the most common gap in UI design. Every dynamic UI element has multiple states that must all be designed.

**The five essential states:**
1. **Default** — the normal, data-loaded, no-errors state (the one in the mockup)
2. **Loading** — data is being fetched; user is waiting; show a skeleton, spinner, or progress indicator
3. **Empty** — no data to display; first-run, user-cleared, or search-no-results; provide guidance and a CTA
4. **Error** — something went wrong; be specific, be actionable, be honest about what failed and how to fix it
5. **Success** — action completed successfully; confirm what happened; set up the next step

**Additional states for interactive elements:**
- **Hover** — cursor over an interactive element; provides affordance confirmation
- **Active/pressed** — element is being clicked or tapped
- **Focus** — keyboard focus; required for accessibility
- **Disabled** — action not available; make clear why (tooltip) and consider whether to show it at all
- **Partial / indeterminate** — checkbox that represents mixed selection; progress that is "in progress" but unquantifiable

**The consequences of missing states:** A button with no loading state during async operations gets clicked multiple times (double-submission). A card with no error state shows a broken broken experience. A form with no success state leaves users uncertain if their submission worked.

**Key insight:** Designing all states is not optional — it is the completion criterion for a UI design. A component design that only shows the default state is 20% complete. Designers who skip states create debt that developers discover during implementation or, worse, that users discover in production.`,
    },
    {
      id: 742,
      name: "Gesture Design",
      desc: `**Gesture design** — the design of touch and motion-based interactions for touchscreen and sensor-based devices: swipe, pinch, long-press, drag, scroll, shake, and more complex multi-touch gestures. Gestures are powerful but invisible — discoverability is the fundamental challenge.

**Common touch gesture vocabulary:**
- **Tap** — single touch; primary selection action
- **Long press** — contextual action menu, drag initiation; low discoverability (users must discover by accident)
- **Swipe** — horizontal: navigate between views (cards, pages); vertical: scroll
- **Pull-to-refresh** — pull down on a scrollable list to refresh content; invented by Loren Brichter for Tweetie (2008)
- **Pinch / spread** — zoom out / in; universal on touchscreens
- **Swipe to delete / dismiss** — common in iOS mail, messaging apps; must be revealed through affordance (hint animation or documentation)

**Discoverability problem:** Unlike mouse-hover which reveals hover states, gestures are completely invisible. Users must be taught, discover them accidentally, or infer from other apps. Solutions: tutorial hints, animation cues that suggest the gesture (slight bounce animation indicating drag), or reverting to visible buttons for less common gestures.

**Platform conventions:** iOS and Android have established gesture vocabularies that apps should follow. iOS: back swipe from left edge, swipe-up to go home, long-press for haptic quick actions. Android: back gesture from left/right edge, swipe up from bottom for app drawer. Deviating from platform gestures creates muscle memory conflicts.

**Key insight:** Don't replace visible controls with gestures for critical paths. Gestures are appropriate for power users and shortcuts — they should augment visible controls, not replace them. The user who discovers that swiping a row reveals a delete button is delighted; the user who can only delete by swiping (with no visible button) and doesn't know the gesture is frustrated.`,
    },
    {
      id: 743,
      name: "Undo & Reversibility",
      desc: `**Undo and reversibility** — design patterns that allow users to reverse actions, reducing the cost of mistakes and giving users the confidence to explore and experiment. Nielsen's heuristic #3: "User control and freedom." The availability of undo changes how users interact with software — they take more action, learn faster, and recover from errors without anxiety.

**Undo patterns:**
- **Traditional undo/redo** — Ctrl+Z / Cmd+Z; linear or tree-based history; standard in creative tools (Figma, Photoshop, Word)
- **Toast with undo action** — "Message deleted. Undo" — provides a short window (5-10 seconds) to reverse a soft deletion; better than a confirmation dialog because it doesn't interrupt the workflow
- **Soft delete / trash** — deleted items go to trash first, are permanently deleted after a delay (30 days); email, Google Drive; longest-duration undo pattern
- **Version history** — documents, files, databases maintain history of changes; infinite undo across sessions (Google Docs, Git)
- **Autosave + restore** — continuous saving with the ability to restore to any saved state

**The confirmation dialog alternative:** Instead of "Are you sure you want to delete?", delete immediately and offer undo via a toast notification. This is faster for the common case (user actually wants to delete), has no increased risk for mistakes (undo is available), and eliminates the cognitive interruption of a modal.

**Irreversible actions still need guards:** Some actions are genuinely irreversible — deleting a paid account, publishing to production, sending to thousands of users. For these, confirmation dialogs are appropriate, potentially with typed confirmation ("Type 'DELETE' to confirm") to increase friction for high-stakes operations.

**Key insight:** The presence of undo changes user psychology. Users who know they can undo explore more, try things, and take action. Users who fear irreversibility hesitate, second-guess, and disengage. Investing in undo patterns pays dividends in user confidence and product engagement, not just error recovery.`,
    },
  ],
};

export default interactionDesign;
