const agileLean = {
  name: "Agile & Lean Methods",
  icon: "⚡",
  color: "#8b5cf6",
  concepts: [
    {
      id: 570,
      name: "Agile Manifesto & Principles",
      desc: `**Agile Manifesto** — a 2001 document signed by 17 software practitioners articulating four core values and twelve supporting principles as a reaction to heavyweight, documentation-driven processes. The four values: "Individuals and interactions over processes and tools; Working software over comprehensive documentation; Customer collaboration over contract negotiation; Responding to change over following a plan." The right side of each pairing has value — "there is value in the items on the right" — but the left side is valued more.

**The twelve principles distill to:**
- Deliver working software frequently, in short cycles
- Business people and developers work together daily
- Build projects around motivated individuals; give them the environment and trust they need
- The most efficient information transfer is face-to-face conversation
- Working software is the primary measure of progress
- Agile processes promote sustainable development — you can't sprint forever
- Continuous attention to technical excellence enhances agility
- Simplicity — maximizing the amount of work NOT done — is essential
- Self-organizing teams produce the best architectures and designs
- Regularly reflect and adjust behavior

**What Agile is not:** Agile is not "we have standup meetings." Not "we use Jira." Not "we do sprints." Not "we can change requirements whenever we want" (that's chaos). Agile is a values system for working with uncertainty through iteration, collaboration, and frequent delivery.

**Key insight:** The 2001 Agile manifesto was written by practitioners reacting against excessive process. The irony is that "Agile" has since accumulated more process than most practitioners find helpful — SAFe alone has a 400-page book. When your Agile process feels like waterfall in two-week chunks, you've lost the manifesto's intent.`,
    },
    {
      id: 571,
      name: "Scrum Framework",
      desc: `**Scrum** — a lightweight framework (not a methodology) for developing complex products, consisting of three roles, five events, and three artifacts. Ken Schwaber and Jeff Sutherland formalized it in the early 1990s; the Scrum Guide (scrum.org) is the canonical reference.

**Three roles:**
- **Product Owner (PO):** maximizes product value; owns and orders the product backlog; single accountable person for "what"
- **Scrum Master:** servant-leader who ensures the framework is understood and enacted; removes impediments; coaches the team
- **Developers (the team):** cross-functional, self-organizing group that does the work; typically 3-9 people

**Five events (timeboxed):**
- **Sprint:** 1-4 week fixed-length iteration (the container for all other events)
- **Sprint Planning:** what can be done this sprint? How will it be done?
- **Daily Scrum (standup):** 15-minute daily synchronization for the team
- **Sprint Review:** inspect the increment with stakeholders; adapt the backlog
- **Sprint Retrospective:** inspect the team's process; adapt for the next sprint

**Three artifacts:**
- **Product Backlog:** ordered list of everything that might be needed, owned by the PO
- **Sprint Backlog:** the sprint goal, selected backlog items, and a plan for delivering the increment
- **Increment:** the sum of all completed backlog items; must be usable and potentially shippable

**Key insight:** Scrum's value is in its forcing functions — the sprint boundary creates urgency and scope discipline; the daily standup surfaces blockers before they become crises; the retrospective creates a structured space for process improvement. Teams that skip events gradually lose these forcing functions and slide into undisciplined development.`,
    },
    {
      id: 572,
      name: "Kanban Method",
      desc: `**Kanban** (Japanese for "signboard" or "visual card") — a method for managing and improving work through visualization, limiting work-in-progress (WIP), and optimizing flow. Originated in Toyota's manufacturing system; adapted for software by David Anderson around 2007. Unlike Scrum, Kanban doesn't prescribe roles or timeboxes — it's an evolutionary change method applied to existing processes.

**Core practices (David Anderson's formulation):**
1. Visualize the workflow on a board (columns for each stage: Backlog → Analysis → Development → Review → Done)
2. Limit Work In Progress (WIP) — set explicit limits per column to prevent overloading and surface bottlenecks
3. Manage flow — focus on items flowing through the system, not people being busy
4. Make policies explicit — document and agree on how work moves between stages
5. Implement feedback loops — regular cadences to inspect and adapt
6. Improve collaboratively, evolve experimentally

**The WIP limit as the key lever:** When a WIP limit is hit, team members must help clear the bottleneck before pulling new work. This forces collaboration at the constraint, reveals why items are stuck, and motivates improving the blocked stage rather than starting new work.

**Kanban vs. Scrum:** Kanban suits teams with variable, unpredictable work patterns (ops/support/maintenance) where Scrum sprints create awkward commitments. Scrum suits teams doing product development with enough planning horizon to fill a sprint. Scrumban — Kanban boards within Scrum sprints — is a common hybrid.

**Key insight:** A Kanban board without WIP limits is just a task tracker, not Kanban. The WIP limit is what makes Kanban a flow optimization tool. Most teams set WIP limits too high initially — start with the number of team members in a column and adjust based on observed flow data.`,
    },
    {
      id: 573,
      name: "Lean Software Development",
      desc: `**Lean Software Development** — the application of Lean manufacturing principles (derived from the Toyota Production System) to software, articulated by Mary and Tom Poppendieck. The seven principles map Toyota's waste-elimination focus to software development contexts.

**The seven principles:**
1. **Eliminate waste:** anything that doesn't add value to the customer — unnecessary features, waiting time, excessive handoffs, rework, partially-done work
2. **Amplify learning:** fast feedback loops, short iterations, working prototypes over documentation
3. **Decide as late as possible:** defer irreversible decisions to maximize information; build in optionality
4. **Deliver as fast as possible:** speed reveals problems, compresses feedback loops, and reduces cost of delay
5. **Empower the team:** decision-making at the level with the most context, not at management levels
6. **Build integrity in:** internal quality (clean architecture, tests) enables external quality (reliable user experience)
7. **See the whole:** optimize the system, not local components; don't make one team faster at the expense of end-to-end flow

**Lean vs. Agile:** Lean is a philosophy and value system; Agile is a development methodology. Lean thinking informs why Agile practices exist — sprint retrospectives eliminate process waste; short iterations amplify learning; WIP limits in Kanban optimize flow.

**Key insight:** The most impactful Lean principle in software is "eliminate waste." The largest waste in most software organizations is not slow coding — it's partially done work waiting in queues, handoffs between specialists, unclear requirements causing rework, and features built that no one uses. Mapping the value stream from idea to production and measuring wait time at each stage exposes waste that feels invisible from inside the process.`,
    },
    {
      id: 574,
      name: "Sprint Planning",
      desc: `**Sprint Planning** — the event that kicks off each Scrum sprint, where the team decides what to work on and how they'll do it. A typical sprint planning for a two-week sprint is timeboxed to 4 hours. It produces the Sprint Goal (the sprint's purpose) and the Sprint Backlog (the selected items and a plan for delivering them).

**Two questions sprint planning answers:**
1. **What can be done this sprint?** — The PO proposes backlog items; the team forecasts how much they can complete, guided by velocity (historical throughput) and capacity (who's available)
2. **How will the selected work be done?** — The team decomposes stories into tasks, identifies dependencies, and creates a plan for delivering the sprint goal

**Velocity vs. story points:** Velocity is the team's average throughput in story points per sprint, used for forecasting. Story points are relative complexity estimates, not hours. A critical nuance: story point estimates are useful for planning; they're dangerous when used as performance metrics. Comparing velocity between teams is essentially meaningless.

**Capacity planning:** Account for meetings, PTO, onboarding, and support rotations. A 5-person team with 2 weeks × 40 hours = 400 theoretical hours is realistically 60-70% of that (240-280 hours) on sprint work due to overhead.

**Sprint goal as north star:** The Sprint Goal is a single sentence capturing the sprint's value — not a list of tickets. "Enable users to recover their account via email" is a goal; "complete AUTH-23, AUTH-24, and AUTH-25" is a ticket list. Goals allow scope flexibility when reality diverges from the plan.

**Key insight:** The sprint goal is the most underused tool in Scrum. Teams that plan tickets without a goal lose flexibility — if AUTH-23 is blocked, there's nothing to do. Teams with a clear goal can substitute or sequence differently to still deliver the goal's value. Always start sprint planning with the goal.`,
    },
    {
      id: 575,
      name: "Daily Standup",
      desc: `**Daily Standup (Daily Scrum)** — a 15-minute daily synchronization event for the development team to inspect progress toward the sprint goal and adapt the plan as needed. The Scrum Guide's original three questions ("What did I do yesterday? What will I do today? Any impediments?") are a starting format, not a rule — the goal is coordination, not status reporting.

**The status-report antipattern:** When the standup becomes a report to the Scrum Master (or manager), it loses its purpose. Each team member reporting serially to a central figure creates a hub-and-spoke information flow that doesn't surface coordination needs. The standup should be the team talking to each other, not individuals reporting up.

**What good standups surface:**
- "I'm working on the same component you were touching — let's sync after this"
- "I've hit a blocker that's been stuck for a day — I need help from the team"
- "We're three days in and this sprint goal looks at risk — we need to triage"
- "I'm ahead of schedule — can I help anyone else?"

**Remote standup adaptations:** Async standups (written updates in Slack, tools like Geekbot) work well for distributed teams across time zones. Hybrid (some async, some in video) often serves distributed teams better than forcing synchronous meetings across 12-hour time zone differences.

**When to make them shorter (or skip them):** A team that communicates continuously through the day, pair-programs, or sits together often gets the coordination benefit without a formal standup. Don't have a standup because the process says to; have it because it serves coordination.

**Key insight:** The best standup takes 5 minutes because the team is already well-coordinated. If standups consistently run 30 minutes or generate the same blockers week after week, it's a signal about the team's coordination health and impediment-resolution culture — not that standup should be longer.`,
    },
    {
      id: 576,
      name: "Sprint Retrospective",
      desc: `**Sprint Retrospective** — a structured event at the end of each sprint where the team reflects on how they worked (not what they built) and identifies improvements to implement in the next sprint. Timeboxed to 3 hours for a one-month sprint. The most consistently skipped Scrum event — and the one that delivers the longest-term value.

**The core structure (Derby & Larsen's "Agile Retrospectives"):**
1. Set the stage — check in, establish psychological safety
2. Gather data — what happened? (facts, events, feelings)
3. Generate insights — why did it happen? What patterns emerge?
4. Decide what to do — specific, owned action items
5. Close — appreciation, commitment

**Common formats:**
- Start / Stop / Continue — simple, fast, actionable
- 4Ls: Liked, Learned, Lacked, Longed For
- Mad / Sad / Glad — surfaces emotional context
- Lean Coffee — team-driven agenda of topics

**Making retrospective actions stick:** Action items must be: specific (not "improve communication"), owned by a named person, small enough to complete in one sprint, and tracked in the next retrospective. "We'll work on improving test quality" dies; "Ali will add lint rules for test coverage and document it in our contributing guide by Wednesday" survives.

**Prime Directive:** "Regardless of what we discover, we understand and truly believe that everyone did the best job they could, given what they knew at the time, their skills and abilities, the resources available, and the situation at hand." — Norm Kerth. Retrospectives require psychological safety; blame kills learning.

**Key insight:** The ROI of retrospectives is asymmetric — one well-facilitated retrospective that surfaces and fixes a systemic bottleneck (unclear requirements causing rework, a slow build that disrupts flow) can save hundreds of engineering hours. Teams that skip retros are implicitly choosing to pay recurring costs that could be fixed once.`,
    },
    {
      id: 577,
      name: "Story Points & Estimation",
      desc: `**Story points** — relative effort estimates assigned to product backlog items, representing complexity, uncertainty, and effort combined into a single abstract unit. They're deliberately not hours: "This story is twice as complex as that one" is often more accurately estimated than "this story will take 8 hours."

**Common scales:** Modified Fibonacci (1, 2, 3, 5, 8, 13, 21) — the increasing gaps reflect increasing uncertainty at higher complexity. T-shirt sizes (XS/S/M/L/XL) work for coarse-grained estimation. Both avoid false precision.

**Planning Poker:** a consensus-based estimation technique where each team member simultaneously reveals their estimate. Divergence triggers discussion and learning — if one person estimates 3 and another estimates 21, the 21 estimator likely knows about complexity the 3 estimator missed.

**The estimation trap:** Story points are a planning tool, not a performance metric. Using velocity targets as performance goals creates incentive to inflate estimates (velocity goes up; output doesn't), destroy trust, and game the process. A team that ships 80 points/sprint is not "better" than one that ships 40 — the point scales are incomparable.

**Alternatives to story points:** No estimates (#NoEstimates movement) — track count of completed stories instead; trust that story sizes are roughly similar. Flow-based forecasting — use cycle time data to answer "how long will 20 backlog items take?" statistically. These work well for stable, mature teams.

**Key insight:** The value of estimation is in the conversation, not the number. When a team debates whether a story is a 5 or an 8, they're surfacing unstated complexity, missing requirements, and technical risks. The number on the sticky note is far less valuable than the alignment built during that discussion.`,
    },
    {
      id: 578,
      name: "Backlog Refinement",
      desc: `**Backlog Refinement** (formerly "grooming") — the ongoing activity of reviewing, clarifying, estimating, and ordering product backlog items so the team always has enough ready, well-understood work to plan the next sprint without having to understand it from scratch during Sprint Planning.

**What "ready" means:** A backlog item is sprint-ready when: acceptance criteria are clear (team knows what "done" means), dependencies are identified and addressed, it's estimated (or unestimable items are split), and it fits within a single sprint. Some teams formalize this as a "Definition of Ready" (the complement to the Definition of Done).

**Refinement cadence:** Typically 1-2 hours per week, separate from sprint planning. Enough refined work for 1-2 sprints ahead. Too far ahead is wasted effort — requirements change, priorities shift, and heavily refined items from three months ago are often stale by the time they're worked.

**Who attends:** Product Owner (brings context, clarifies requirements), developers (raise technical questions, estimate), and often the Scrum Master (facilitates). Users or stakeholders for complex functional requirements.

**The splitting discipline:** Large stories (epics) that don't fit in a sprint must be split. Splitting by technical layers (front end / back end / tests) is the most common but worst approach — it creates incomplete, unshippable increments. Better splits: by user workflow steps, by data inputs, by different user types, by happy path vs. edge cases.

**Key insight:** Teams that skip refinement pay the cost during sprint planning — stories are vague, estimates are guesses, and the team spends the first two days of the sprint understanding what they committed to instead of doing it. Refinement is an investment in sprint planning and sprint execution quality.`,
    },
    {
      id: 579,
      name: "Definition of Done",
      desc: `**Definition of Done (DoD)** — a shared, explicit list of criteria that every backlog item must meet before it can be considered "done." Not task completion, not feature completion — the full set of quality gates including code, tests, documentation, deployment, monitoring, and sign-off requirements. A formal guarantee of quality that applies to every increment.

**Why it matters:** Without a DoD, "done" means different things to different people. To a developer it means code is written; to a QA it means tests pass; to the PO it means the story's acceptance criteria are met; to an ops engineer it means it's in production with monitoring. Undone work accumulates as hidden debt.

**Example DoD criteria:**
- Unit and integration tests written and passing
- Code reviewed and approved
- Acceptance criteria verified (against staging or equivalent)
- No new critical or high-severity bugs introduced
- Performance within defined thresholds
- Feature flagged (if applicable) and flag documented
- Monitoring/alerting configured for new functionality
- Deployed to staging; marked for production release

**DoD vs. Acceptance Criteria:** Acceptance criteria are story-specific — they define what the feature must do. The DoD applies universally to all stories — it's the baseline quality contract. A story can meet all its acceptance criteria and still not be Done if the DoD isn't satisfied.

**DoD as a living document:** The DoD should expand as the team's quality practices improve. Adding "integration tests for all new API endpoints" to the DoD after a production incident caused by an untested edge case is how teams improve quality systematically rather than relying on individual discipline.

**Key insight:** The DoD is the team's quality contract with itself. Teams that have an implicit DoD (everyone "knows" what done means) inevitably find that different people know different things. Making it explicit, displaying it, and enforcing it in sprint reviews is what turns quality into a team norm rather than an individual responsibility.`,
    },
    {
      id: 580,
      name: "Scaled Agile (SAFe, LeSS)",
      desc: `**Scaled Agile** — frameworks for applying Agile principles to large organizations with multiple teams working on connected products. Single-team Agile (Scrum, Kanban) doesn't address cross-team dependencies, portfolio management, or enterprise governance. Scaled frameworks attempt to.

**Major frameworks:**
- **SAFe (Scaled Agile Framework):** the most widely adopted; complex, prescriptive. Organizes teams into Agile Release Trains (ARTs) of 50-125 people, synchronized through Program Increments (PI) — quarterly planning cycles. Has configurations from Essential SAFe (lean) to Full SAFe (enterprise).
- **LeSS (Large-Scale Scrum):** simpler than SAFe; extends single-team Scrum principles to multiple teams. Fewer roles, fewer ceremonies, more emphasis on cross-team self-organization.
- **Spotify Model:** not a formal framework — a case study of how Spotify organized teams into Squads, Tribes, Chapters, and Guilds. Often cargo-culted without understanding the cultural context that made it work.

**The coordination tax:** Every scaling framework imposes coordination overhead. Dependencies between teams create wait time, negotiation, and synchronization cost. High-performing large organizations minimize cross-team dependencies through good architecture — Conway's Law in action.

**SAFe criticism:** SAFe often feels like waterfall in quarterly increments. PI planning sessions where 100 people spend two days planning a quarter can replace nimble response with bureaucratic ceremony. Its complexity also creates a cottage industry of certifications that organizations mistake for capability.

**Key insight:** Scaling problems in Agile are usually architectural problems in disguise. If multiple teams can't work independently without coordinating every two weeks, the system's component boundaries don't match the team boundaries. Fix the architecture first; scale the process second.`,
    },
    {
      id: 581,
      name: "Shape Up (Basecamp Method)",
      desc: `**Shape Up** — a product development methodology developed at Basecamp (described in Ryan Singer's book), designed as an alternative to Scrum for product teams. It operates on 6-week cycles with small teams, rejects backlogs and story points, and gives teams full autonomy within a "shaped" problem.

**Three phases:**
1. **Shaping:** senior product/engineering people spend 1-2 weeks defining the scope, risks, and solution concept for a project. Output is a "pitch" — a shaped problem with rough solution ideas, not a spec. Key constraint: "appetite" replaces estimate. Not "how long will this take?" but "how much time are we willing to spend?"
2. **Betting:** a small group reviews pitches and "bets" 6-week cycles on the ones worth building. Nothing goes into a backlog; unbet pitches are simply abandoned.
3. **Building:** 2-3 person teams (designer + developer) build the project with full autonomy to make implementation decisions within the shaped scope. No interruptions, no daily standups — the team self-manages.

**After the 6 weeks:** Projects don't get automatic extensions — they ship what they have or they don't ship. The fixed time and variable scope prevents the "90% done forever" problem.

**Cooldown:** Two weeks between cycles where teams fix bugs, explore ideas, and choose what they want to work on next.

**Key insight:** Shape Up's core insight is that the backlog is a monument to indecision. Items that "must be done someday" sit in backlogs for years, consuming grooming time and creating false urgency. Shape Up replaces the backlog with appetite: "If we can't get excited enough about this to bet 6 weeks on it now, it probably shouldn't be built."`,
    },
  ],
};

export default agileLean;
