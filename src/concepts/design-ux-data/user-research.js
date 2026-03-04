const userResearch = {
  name: "User Research & Discovery",
  icon: "🔍",
  color: "#f97316",
  concepts: [
    {
      id: 722,
      name: "User Interviews",
      desc: `**User interviews** — a qualitative research method in which a researcher asks targeted questions to users (or potential users) to understand their needs, behaviors, motivations, attitudes, and mental models. The gold standard for discovery research — nothing else reveals the "why" behind user behavior as richly.

**Types of interviews:**
- **Structured** — fixed questions in fixed order; consistent across participants; quantitatively comparable but less exploratory
- **Semi-structured** — a guide of topics and questions, but flexible; follow interesting threads; the standard approach for UX research
- **Unstructured** — open conversation; exploratory; high insight potential but hard to analyze across participants

**Interview best practices:**
- Ask open-ended questions ("Tell me about a time when...") not yes/no
- Ask about past behavior, not hypothetical future behavior ("What would you do?" is unreliable; "What did you do?" is data)
- Follow silence — users will elaborate if you don't rush to fill pauses
- Avoid leading questions ("Don't you find X confusing?" → "How do you find X?")
- Seek stories, not opinions ("Walk me through the last time you...")

**The 5 Whys:** When users describe a behavior or problem, asking "why?" repeatedly (five levels) reveals the root motivation. Surface: "I keep spreadsheets of my projects." Why? "Because the project management tool doesn't show me what I need." Why? etc. Each layer moves from symptom to cause.

**Key insight:** The biggest interview mistake is showing your design and asking if users like it. Evaluative feedback from interviews ("Is this button clear?") is less reliable than observational data ("Tell me how you track your projects today"). Interviews are for understanding existing behavior, not validating proposed solutions — use usability testing for that.`,
    },
    {
      id: 723,
      name: "Usability Testing",
      desc: `**Usability testing** — a research method in which representative users attempt to complete specific tasks with a product (or prototype) while a researcher observes and records where they succeed, struggle, or fail. The most direct way to identify usability problems — you watch real users run into the issues you've been arguing about in design reviews.

**Moderated vs unmoderated:**
- **Moderated** — researcher is present (in person or video call); can ask clarifying questions, probe on confusion, adapt to what's happening. More insight per participant; harder to scale.
- **Unmoderated** — participants complete tasks independently, recorded by software (UserTesting, Maze, Lookback). Faster, cheaper, scalable; loses richness of live observation.

**Think-aloud protocol:** Participants verbalize their thoughts as they work ("I see this button, I'm not sure what it does... I'll try clicking here..."). Think-aloud externalizes cognitive processes that would otherwise be invisible, revealing exactly why users make the decisions they make.

**How many participants:** The famous Nielsen finding: 5 participants uncover ~85% of usability problems. Beyond 5-8 participants, you're seeing the same issues repeatedly. For quantitative data (success rates, time-on-task), you need 20+.

**Task design:** Tasks should be realistic, goal-oriented, and not hint at the answer ("Buy a pair of running shoes in size 11" — not "click the Buy button"). Scenario framing increases ecological validity.

**Key insight:** Watching one user struggle with something you designed feels terrible but is more valuable than 100 survey responses. The discomfort of watching a user fail is the signal. The correct response is not to defend the design — it is to take notes and redesign. Usability testing is the most effective tool for eliminating HiPPO-driven design decisions (Highest Paid Person's Opinion).`,
    },
    {
      id: 724,
      name: "Contextual Inquiry",
      desc: `**Contextual inquiry** — a field research method in which researchers observe and interview users in their actual work environment while they do their real work, rather than in a lab or over a screenshare. Developed by Hugh Beyer and Karen Holtzblatt. The central insight: what people say they do and what they actually do are reliably different.

**The master-apprentice model:** The researcher adopts the role of an apprentice learning from a master (the user). The user teaches the researcher their work by doing it; the researcher asks questions, requests clarification, and builds understanding in the moment. Unlike a traditional interview, data is collected during activity, not after.

**What contextual inquiry reveals:**
- Workarounds users have built to cope with product deficiencies (telling — they indicate where the product fails them)
- Environmental factors that influence use (noisy office, frequent interruptions, multiple monitors)
- Implicit knowledge users have about their domain that they wouldn't think to mention in an interview
- Actual task sequences vs. the assumed sequences that products were designed for

**Affinity diagrams from contextual inquiry:** Teams collect observations on sticky notes and cluster them (affinity diagramming) to identify patterns across participants. This synthesis process often surfaces insights that no individual session made obvious.

**When to use:** Early in product development, when redesigning existing workflows, or when building products for specialized domains you don't personally understand. Too expensive for every research question — reserve for high-stakes discovery.

**Key insight:** Every software product solves a problem in a context. If you've never been in that context (a factory floor, an emergency room, a trading desk), you are designing based on imagined context. Contextual inquiry grounds design in reality — and the gap between imagined and real contexts is almost always wider than teams expect.`,
    },
    {
      id: 725,
      name: "Surveys & Questionnaires",
      desc: `**Surveys** — structured questionnaires distributed to a large number of users to collect quantitative and qualitative data at scale. Surveys complement qualitative methods (interviews, usability testing) by providing data on prevalence — how many users have a problem, not just that the problem exists.

**Survey design principles:**
- **One concept per question** — compound questions ("Was the checkout fast and easy?") can't be answered cleanly
- **Avoid leading questions** — "Don't you think X is confusing?" presupposes the answer
- **Use rating scales consistently** — 5-point or 7-point Likert scales; define the poles; don't mix scales
- **Closed + open questions** — closed for quantification, open for explanation and unexpected insights
- **Question order** — specific questions bias answers to general questions that follow; general → specific

**Standard UX survey instruments:**
- **NPS (Net Promoter Score)** — "How likely are you to recommend?" 0-10 scale; Promoters (9-10) minus Detractors (0-6). Simple, widely understood, but lagging indicator and easily gamed.
- **SUS (System Usability Scale)** — 10 standardized questions measuring perceived usability; validated against actual usability; industry benchmark (80+ = A, above average; 68 = average; below 50 = F)
- **CSAT (Customer Satisfaction Score)** — direct satisfaction rating, usually 1-5 or 1-10

**Sample size and bias:** Online surveys suffer from response bias (people with strong opinions respond more), selection bias (only users who see the survey respond), and survivorship bias (churned users rarely appear). Large n doesn't fix systematic bias — representative sampling matters more than count.

**Key insight:** Surveys tell you what, not why. "73% of users struggle with checkout" is actionable but incomplete. Pair survey data with qualitative research to understand why users struggle before redesigning. Surveys are best used to quantify problems already identified through qualitative research, not to discover them.`,
    },
    {
      id: 726,
      name: "User Personas",
      desc: `**User personas** — fictional, composite characters created to represent distinct user types based on research. A persona synthesizes qualitative and quantitative research findings into a human-readable profile: name, photo, goals, frustrations, behaviors, and context. Used to align teams on who they're designing for.

**Research-based vs made-up personas:** Personas built from actual user research (interviews, surveys, behavioral data) represent real patterns. Personas invented in a conference room represent the team's assumptions. The former drive better decisions; the latter can actively mislead. Always question the research basis of personas before relying on them.

**What a useful persona includes:**
- Behavioral patterns (how they use the product, what they do around it)
- Goals (what they're trying to achieve) and frustrations (what gets in the way)
- Context of use (where, when, what devices, what environment)
- Mental model (how they think about the problem domain)
- NOT: demographics beyond what's actually relevant to design decisions

**Persona anti-patterns:** "Marketing personas" with demographics, income, and lifestyle information but no behavioral data — useful for targeting, not for design. "Everyone persona" — a person so generic they represent no one in particular. Personas that are never referenced in design decisions (decorative artifacts).

**Jobs-to-be-Done as an alternative:** Some practitioners prefer JTBD over personas because JTBD focuses on the goal/outcome rather than the person — "people hire products to get a job done," and the job stays stable even as demographics vary.

**Key insight:** Personas work when teams actually use them in design decisions ("Would Sarah find this step confusing? What does Marcus need to see here?"). They fail when they're posted on a wall after the discovery phase and never referenced again. A persona that doesn't change a single design decision served no purpose.`,
    },
    {
      id: 727,
      name: "Jobs To Be Done (JTBD)",
      desc: `**Jobs To Be Done (JTBD)** — a framework that focuses on the goal (the "job") that users are trying to accomplish rather than on the user's demographics or characteristics. Developed by Clayton Christensen (Harvard Business School) and popularized in product design by Bob Moesta and Chris Spiek. The core insight: people "hire" products to do a job for them — and they "fire" products when a better solution appears.

**The famous milkshake example (Christensen):** McDonald's discovered through JTBD research that people buying milkshakes in the morning were "hiring" them for a long, boring commute — they needed something to do during the drive, to not get hungry before lunch, and that wouldn't make a mess. The job was commute entertainment + satiety, not "I want something sweet." This reframing produced a completely different product improvement strategy.

**JTBD structure:**
- **Functional job** — the practical task to be accomplished ("track my project status")
- **Emotional job** — how the user wants to feel ("feel in control and confident")
- **Social job** — how the user wants to be perceived by others ("look organized to my team")
- **Job statement format** — "When [situation], I want to [motivation], so I can [expected outcome]"

**JTBD vs Personas:** Personas answer "who is the user?"; JTBD answers "what are they trying to accomplish?" JTBD is more stable — the job remains constant across demographics and over time. A 25-year-old and a 60-year-old both "hire" a spreadsheet to manage their personal budget.

**Key insight:** When you understand the job users are hiring your product to do, you can identify competitors you hadn't considered. The real competitor for a project management tool isn't other PM tools — it's email, spreadsheets, and sticky notes. Understanding that the job is "make sure nothing falls through the cracks" expands the competitive landscape and the design space.`,
    },
    {
      id: 728,
      name: "Empathy Mapping",
      desc: `**Empathy map** — a collaborative visualization tool used to articulate what is known about a particular type of user, synthesizing research into a shareable format that builds team empathy. Originally created by Dave Gray (XPLANE), the standard format divides user experience into quadrants: Says, Thinks, Does, Feels.

**The four quadrants:**
- **Says** — direct quotes and phrases from research; what users say in interviews, in surveys, in support tickets
- **Thinks** — what users are thinking but may not say aloud; inferences from behavior; beliefs and assumptions
- **Does** — observable actions and behaviors; what users actually do (vs. say they do)
- **Feels** — emotional state; frustrations, anxieties, joys, motivations; often revealed through tone, hesitation, excitement in interviews

**Goal and pain additions:** Many templates add "Goals" (what users are trying to achieve) and "Pain Points" (what's getting in the way) as explicit sections, making the map more actionable for design.

**How to use in a team:** Empathy mapping works best as a group synthesis activity after research — team members write insights on sticky notes and populate the quadrants together, discussing what they heard and observed. The process of filling in the map surfaces disagreements about user understanding.

**Empathy map vs persona:** Empathy maps capture a user's current state of experience; personas synthesize patterns across multiple users into a character. Empathy maps are faster to create and more research-grounded; personas are better communication tools for aligning broader teams.

**Key insight:** The most valuable quadrant is "Thinks" — the gap between what users say and what they actually think and feel. Users will tell you a feature is "fine" while showing body language of confusion or frustration. The thinks quadrant captures what they don't say, which is often what matters most.`,
    },
    {
      id: 729,
      name: "User Journey Mapping",
      desc: `**User journey map** — a visualization of the sequence of steps, touchpoints, emotions, and pain points a user experiences as they work toward a goal, across time and channels. Unlike a user flow (focused on UI interactions), a journey map captures the full experience — before, during, and after using the product, including offline touchpoints and emotional arc.

**Journey map components:**
- **Actor** — the persona or user type for this journey
- **Scenario** — the goal or task being mapped
- **Stages / phases** — the major phases of the journey (Awareness → Consideration → Purchase → Onboarding → Use → Support)
- **Actions** — what the user does at each stage
- **Touchpoints** — where they interact (website, email, phone, in-person, app)
- **Emotions** — emotional arc from frustrated to satisfied; usually shown as a graph line across stages
- **Pain points** — where the experience breaks down
- **Opportunities** — design opportunities identified from pain points

**Current state vs future state:** Current-state journey maps document the existing experience, exposing gaps and pain points. Future-state journey maps envision the ideal experience after design improvements.

**Service blueprints:** The extension of journey maps that includes backstage processes (what the organization does behind the scenes to enable each touchpoint). Essential for complex service design where front-stage experience depends on back-stage operations.

**Key insight:** Journey maps are most powerful when the emotional arc is taken seriously — not just "user clicks this button" but "user feels anxious about whether their order processed correctly." The emotional valleys are design opportunities. Products that address emotional pain points, not just functional ones, generate genuine loyalty.`,
    },
    {
      id: 730,
      name: "Affinity Mapping",
      desc: `**Affinity mapping** (affinity diagramming) — a technique for organizing large volumes of qualitative data (interview notes, observations, user quotes) into thematic clusters by identifying patterns and relationships. Developed by Japanese anthropologist Jiro Kawakita in the 1960s (also called the "KJ Method"). Used to synthesize unstructured research into actionable insights.

**The process:**
1. **Externalize data** — each discrete observation, quote, or insight written on a sticky note (one per note)
2. **Silent sorting** — team members individually cluster notes they perceive as related, without discussion
3. **Discussion and refinement** — discuss groupings, move notes that don't belong, split clusters that contain multiple themes
4. **Label clusters** — give each group a header that captures the insight, not just the topic ("Users lose trust when prices change at checkout" — not "Pricing")
5. **Identify priorities** — vote on clusters by significance; which themes appear most frequently or have the most impact?

**Digital vs physical:** Physical affinity mapping (sticky notes on a wall) creates spatial thinking and physical engagement that many teams find valuable. Digital tools (Miro, FigJam, MURAL) enable remote collaboration and persistent artifacts. Both work; the process matters more than the medium.

**What good cluster labels look like:** "Users want to compare options before deciding" (insight) vs "Comparisons" (topic). Insight labels encode what the data tells you; topic labels just name the data. The former directly informs design decisions.

**Key insight:** Affinity mapping is not about finding the "right" groupings — the insight emerges from the conversation between team members as they discuss why things belong together. Two researchers who independently sort the same notes will produce different but equally valid clusters. The value is in the synthesis process, not the final diagram.`,
    },
    {
      id: 731,
      name: "A/B Testing in UX",
      desc: `**A/B testing (UX context)** — a controlled experiment comparing two or more variants of a UI element or flow to determine which performs better against a defined success metric. The gold standard for validating UI changes with quantitative evidence rather than design opinion.

**How it works:** Users are randomly assigned to variant A (control) or variant B (treatment). After sufficient traffic and time, statistical analysis determines whether observed differences in conversion, engagement, or task completion are due to the design change or random variation.

**Statistical concepts:**
- **Statistical significance** — the probability that the observed difference is not due to chance; typically 95% confidence (p < 0.05)
- **Minimum detectable effect (MDE)** — the smallest improvement worth detecting; smaller MDE requires larger sample size
- **Sample size calculation** — done BEFORE running the test; under-powered tests produce inconclusive results; over-powered tests waste time
- **Test duration** — run for complete business cycles (full weeks); stop early and you amplify day-of-week effects

**What to test:** High-traffic, high-impact touchpoints — checkout flows, signup forms, onboarding, pricing pages. Low-traffic pages don't reach statistical significance in reasonable time.

**A/B testing is not UX research:** A/B testing tells you which variant performs better on the metric you chose — not why. A variant that increases signup rate but increases 7-day churn may be "winning" the test while harming the business. Pair A/B testing with qualitative research to understand the mechanisms behind results.

**Key insight:** A/B testing is the easiest tool to misuse in UX. The two most common mistakes: (1) stopping a test early because the winning variant looks obvious (regression to the mean guarantees disappointment), and (2) testing insignificant changes and celebrating small wins. Reserve A/B testing for meaningful design hypothesis tests, not button color optimization.`,
    },
    {
      id: 732,
      name: "Analytics for UX",
      desc: `**UX analytics** — the use of quantitative data from product instrumentation to understand how users interact with a product: what they do, where they get stuck, where they leave, and what paths they take. Complements qualitative research — analytics answers "what is happening at scale?"; qualitative research answers "why is it happening?".

**Core UX analytics tools:**
- **Session recording** (Hotjar, FullStory, Microsoft Clarity) — replay individual sessions to see exactly what users did; spot rage clicks, dead clicks, confusing scrolling behavior
- **Heatmaps** — aggregated click, scroll, and move maps across many sessions; where are users clicking on a page? How far do they scroll?
- **Funnel analysis** — conversion rates at each step of a multi-step flow; identifies drop-off points
- **Cohort analysis** — retention and behavior of user groups defined by signup date or first action
- **Path analysis** — actual navigation paths users take vs intended flows; surprises reveal mental model mismatches

**Instrumentation design:** Analytics only shows you what you instrument. Designing your tracking plan upfront (what events to capture, what properties to attach) determines what questions you can answer later. Retroactive instrumentation misses historical data.

**Privacy considerations:** Session recording tools must be configured to mask PII (personally identifiable information). GDPR and CCPA require consent mechanisms for tracking. Cookie consent has reduced data quality significantly for web analytics — server-side and first-party analytics approaches are increasingly important.

**Key insight:** The most actionable UX analytics insight is often the "rage click" — a user clicking the same non-interactive element repeatedly in frustration. It's a silent help ticket: "I expected this to be clickable and it isn't." Rage click maps are a quick way to find the highest-frustration points in any UI within hours of setting up session recording.`,
    },
    {
      id: 733,
      name: "Research Synthesis",
      desc: `**Research synthesis** — the process of distilling raw research data (interview notes, observations, survey responses, analytics reports) into coherent insights, patterns, and recommendations that can inform design decisions. Raw data is not insight; synthesis is the translation layer that makes research actionable.

**Synthesis methods:**
- **Thematic analysis** — identify recurring themes across data sources; code data by theme; count occurrences
- **Affinity mapping** — spatial clustering of observations to find emergent patterns
- **Jobs mapping** — organize insights around the jobs users are trying to do
- **Experience maps** — timeline-based synthesis of user experience phases

**From observations to insights to recommendations:**
- **Observation:** "Three out of six participants typed in the URL bar to navigate, not the nav menu"
- **Insight:** "Users who know what they're looking for prefer direct search over browsing navigation; the current nav doesn't support known-item searching"
- **Recommendation:** "Add a global search bar; surface it prominently in the header"

**What makes an insight actionable:** Insights should describe a user need or problem, not a solution. "Users need faster access to recent documents" is an insight. "We should add a Recent Documents button to the header" is a recommendation. Keep them separate — insights may generate multiple valid recommendation options.

**Communicating research:** Research that sits in a Google Doc nobody reads has zero impact. Effective synthesis produces deliverables teams actually use: one-page insight summaries, highlighted recordings, actionable recommendation decks. Know your audience's format preferences.

**Key insight:** The most common synthesis failure is researchers sharing data instead of insights — a deck with 47 quotes and observations but no "so what." Decision-makers need to know what to do. The researcher's job is to process raw data all the way to a recommendation, not to present data and let stakeholders draw their own conclusions.`,
    },
  ],
};

export default userResearch;
