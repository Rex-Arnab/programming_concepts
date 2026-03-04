const engineeringManagement = {
  name: "Engineering Management",
  icon: "👥",
  color: "#ef4444",
  concepts: [
    {
      id: 624,
      name: "Engineering Manager Role",
      desc: `**Engineering Manager (EM)** — a people leader responsible for the health, performance, and growth of an engineering team. Unlike the Tech Lead (who owns technical direction), the EM owns team dynamics, hiring, performance management, career development, process, and the team's relationship with the broader organization.

**Core EM responsibilities:**
- **People:** career development, performance feedback, coaching, hiring, and (rarely) managing out underperformers
- **Team health:** psychological safety, team dynamics, conflict resolution, trust
- **Process:** helping the team work effectively — not micromanaging, but removing systemic impediments
- **Communication:** representing the team to leadership; representing organizational context to the team
- **Staffing:** anticipating growth needs, hiring, onboarding, managing headcount

**What EMs do NOT own (and shouldn't):** The technical direction (that's the Tech Lead or senior engineers). The product roadmap (that's the Product Manager). The sprint tasks (that's the team).

**The manager transition:** The most common failure mode for new EMs is staying in the engineering mindset — jumping in to solve technical problems, reviewing code extensively, taking tasks from the sprint. This signals distrust in the team, limits their growth, and doesn't leave time for management work. The transition to EM requires genuinely letting go of execution and finding satisfaction in enabling others.

**Measuring EM effectiveness:** Not by personal output but by team output, team retention, team growth, and team health. An EM's job is to make the team increasingly capable without needing to be a bottleneck.

**Key insight:** The best EMs create conditions where engineers can do their best work: clear context about goals and priorities, psychological safety to take risks and admit mistakes, growth opportunities that stretch capabilities, and removal of organizational friction. These conditions, not the EM's direct contribution, produce team performance.`,
    },
    {
      id: 625,
      name: "IC vs. Management Track",
      desc: `**Career track decision** — the choice engineering professionals make (often around Senior Engineer level) between continuing as an Individual Contributor (IC) specialist or transitioning to the Engineering Management (EM) track. Both tracks lead to senior, high-impact roles. Neither is inherently better; both require fundamentally different skills and find meaning in different activities.

**IC track (Senior → Staff → Principal → Distinguished/Fellow):** Impact through technical excellence, architectural leadership, cross-organizational influence, and deep domain expertise. Work is primarily technical: design, code, review, mentor. Satisfaction comes from solving hard technical problems and building lasting systems.

**Management track (Engineering Manager → Senior EM → Director → VP → CTO):** Impact through developing people, building teams, and organizational effectiveness. Work is primarily human: coaching, hiring, strategy, communication, conflict resolution. Satisfaction comes from watching people grow and teams succeed.

**Common misconceptions:**
- Management is not a promotion from IC — it's a lateral move to a different job with different skills
- ICs can be as impactful and as well-compensated as managers in mature organizations
- Managers don't have more power or security than ICs — they have different responsibilities
- You can't "try management and go back" without friction — the IC market and skills gap after 2-3 years of management creates real re-entry challenges

**The false dichotomy:** Many engineers don't need to choose. Tech Leads combine technical and organizational leadership without a formal people-management role. Staff Engineers influence without reporting lines. The IC/EM binary is organizational convention, not fundamental.

**Key insight:** The most common reason engineers choose management for wrong reasons: "I want more impact" (IC Staff can have enormous impact), "I want more money" (well-run orgs pay ICs comparably), or "I want to stop dealing with annoying parts of engineering" (management has its own annoying parts). Choose management because you genuinely find satisfaction in developing people — not as an escape from code.`,
    },
    {
      id: 626,
      name: "One-on-Ones (1:1s)",
      desc: `**One-on-one (1:1)** — a recurring private meeting between a manager and a direct report, typically 30-60 minutes weekly or biweekly. The single most important management practice for building trust, understanding team health, and providing individual development. Canceling 1:1s signals that the people on your team are not your priority.

**What 1:1s are for:** The report's agenda, not the manager's. Status updates don't belong in 1:1s — those should happen through async standups, shared dashboards, or sprint ceremonies. The 1:1 is for: career development, challenges and blockers, feedback in both directions, context and alignment, and building trust.

**Effective 1:1 structure:**
- Report brings topics — manager's questions are exploratory ("what's on your mind?"), not interrogating
- Career conversation regularly — not only at review time
- Feedback that's timely, specific, and actionable — not saved for quarterly review
- Manager shares organizational context the report can benefit from
- Open questions: "What's frustrating you?" "What could I do differently to support you better?"

**Common 1:1 failures:**
- Status report meeting disguised as a 1:1
- Manager always with the agenda; report passive
- Feedback withheld to avoid awkwardness and then surfaced only in performance review
- Irregular scheduling that signals low priority
- Manager distracted (phone, laptop)

**Skip-level 1:1s:** Managers of managers should have occasional 1:1s with their directs' reports — to understand team health unfiltered, identify management issues, and develop connection across the organization. These are not for delivering feedback or going around the manager.

**Key insight:** The quality of 1:1s is the strongest leading indicator of a team's psychological safety and retention. Managers who know what each team member is struggling with, what they care about developing, and what's frustrating them — will catch problems early and build the trust that makes hard conversations possible. Teams with low 1:1 quality have high surprise turnover.`,
    },
    {
      id: 627,
      name: "Performance Reviews",
      desc: `**Performance reviews** — formal evaluations of an engineer's work quality, impact, collaboration, and growth against expectations for their level and role, typically conducted annually or semi-annually. The review outcome typically affects compensation, promotion decisions, and in poor performance cases, improvement plans or termination.

**What makes performance reviews work:**
- **No surprises:** every piece of feedback in a performance review should have been delivered informally during the year. A surprising negative review is a management failure.
- **Evidence-based:** specific examples of behaviors and outcomes, not general impressions. "Ali demonstrated strong technical judgment when they identified the security risk in the payment flow redesign and raised it before implementation" > "Ali has good technical judgment."
- **Level calibration:** assessment against the expectations for the level and role, not against other individuals
- **Calibration across managers:** cross-manager calibration sessions ensure consistent evaluation standards across teams (prevents both star inflation and unwarranted leniency)

**Common failure modes:**
- **Recency bias:** over-weighting the last 2-3 months and under-weighting the full review period
- **Halo/horn effect:** one strong (or weak) impression coloring evaluation of all dimensions
- **Narrative without evidence:** impressions without specific examples aren't actionable and can't be defended
- **Managing to the rating:** gaming the evaluation system rather than honestly assessing and communicating

**The performance review ≠ the performance relationship:** Annual reviews formalize what should be an ongoing conversation. Quarterly check-ins, regular 1:1 feedback, and mid-year informal assessments prevent the "surprise" problem and make annual reviews administrative rather than revelatory.

**Key insight:** Performance reviews are primarily useful for two things: formal advancement decisions (promotions require calibrated, documented evidence) and addressing persistent underperformance where documentation creates accountability and a paper trail. For the 80% of engineers who are solid performers, well-delivered continuous feedback is more developmentally valuable than a once-a-year summary.`,
    },
    {
      id: 628,
      name: "Engineering Career Ladders",
      desc: `**Career ladder (engineering ladder)** — a structured framework that defines engineering roles, levels, and expectations within an organization. It answers "what does it mean to be a Senior Engineer here?" and "what do I need to demonstrate to be promoted to Staff?" Typically covers dimensions like technical skill, scope of impact, communication, leadership, and team contribution.

**Why career ladders matter:**
- Alignment: everyone understands what's expected at each level
- Fairness: consistent standards across teams prevent "the standards here depend on who your manager is"
- Motivation: engineers understand what they're working toward
- Hiring calibration: "Senior Engineer" means the same thing across the company

**Common dimensions in engineering ladders:**
- **Technical skill:** complexity of problems solved, breadth/depth of knowledge, code quality
- **Scope:** individual task → team → team-of-teams → org → company
- **Autonomy:** requires close direction → works independently → defines work for others
- **Impact:** individual contribution → team outcomes → organizational outcomes
- **Communication and influence:** individual contributor → team communicator → cross-team influencer

**What good ladders avoid:**
- Pure years-of-experience requirements (seniority is not tenure)
- Ladders that describe only technical skills (collaboration, communication, and leadership matter at every level)
- Promotion criteria that change retrospectively
- Ladders too vague to use ("demonstrates excellent judgment" without examples)

**Key insight:** The hardest gap to articulate in any career ladder is the Senior → Staff transition, because it's qualitatively different: from personal execution excellence to organizational influence. The best ladder documents for this transition include concrete examples: "A Staff Engineer has authored a technical standard that two or more teams have adopted" rather than "A Staff Engineer has broad impact across the organization."`,
    },
    {
      id: 629,
      name: "Hiring & Recruiting",
      desc: `**Engineering hiring** — the process of identifying, attracting, evaluating, and closing engineering candidates. Hiring is one of the highest-leverage activities an engineering manager does — the right hire accelerates the team; the wrong hire can take 12-18 months to course-correct. Most organizations under-invest in hiring quality relative to its importance.

**The pipeline:**
1. **Sourcing:** inbound (job posts, careers page), outbound (recruiter reach-out, employee referrals), event networking. Employee referrals typically produce the highest-quality candidates and best retention.
2. **Screening:** recruiter screen (experience, expectations, basic fit), technical screen (assess baseline competence, usually 30-60 min)
3. **On-site/virtual loop:** multi-round evaluation by multiple interviewers covering different dimensions
4. **Debrief:** structured evaluation discussion before reference checks; independent assessments from each interviewer
5. **Offer and close:** compensation, role scope, growth trajectory

**Standardization and rubrics:** Define clear evaluation rubrics before running the loop. "Strong Hire / Hire / No Hire / Strong No Hire" with criterion-based evidence. Prevent "vibes" and informal consensus from driving decisions.

**The cost of a bad hire:** Orientation, training, and productivity ramp for any hire takes 3-6 months. A poor hire who needs to be managed out occupies 6-18 additional months of management attention, creates team morale impact, and delays the role being filled by the right person.

**Employer brand:** Top engineers choose teams based on the people they'll work with, the technical problems they'll solve, and the growth opportunities available — not primarily on salary (beyond market rate). An engineering blog, open source contributions, talks at conferences, and authentic culture communication are higher ROI investments than job ad copy.

**Key insight:** The best hiring teams are always hiring — not reactively when a position is open, but continuously building relationships with great engineers, maintaining a warm pipeline, and meeting people at events. When a role opens, reactive hiring takes 3-6 months; a warm pipeline can move in weeks.`,
    },
    {
      id: 630,
      name: "Onboarding New Engineers",
      desc: `**Engineering onboarding** — the structured process of integrating new engineers into the team, codebase, processes, and culture so they're productive and engaged as quickly as possible. A well-designed onboarding shortens time-to-productivity from months to weeks, prevents early attrition, and establishes the quality standards and team norms new engineers will carry forward.

**Structured onboarding stages:**
- **Week 1:** environment setup, codebase orientation, meet the team, ship something small (even trivial) to establish the deployment pipeline
- **Weeks 2-4:** progressively more complex tasks with guidance; pair programming with experienced team members; understand team process (sprints, reviews, standups)
- **Month 2-3:** independent contribution with review support; deeper architectural understanding; customer context and product understanding
- **Month 3-6:** fully independent contributor; ownership of a meaningful component

**The "ship something on day one" principle:** Getting a new engineer through the full deploy pipeline — even for a trivial change — on their first day has enormous psychological value. It establishes agency, identifies environment issues early, and creates an immediate contribution.

**Onboarding materials that work:**
- An honest, up-to-date "start here" document (not a 5-year-old wiki page)
- Annotated architecture diagram: what are the main components and how do they interact?
- A curated list of "good first issues" — small, isolated, well-specified, with mentor support available
- Team norms document: how do we review code? What goes in a PR description? How do we handle incidents?

**The onboarding buddy:** Assign a dedicated peer (not the manager) who can answer the informal questions — "is it normal that this takes so long?" "who should I ask about this?" — that new hires hesitate to escalate.

**Key insight:** Onboarding quality is a strong signal of organizational health. A team that can onboard a new engineer efficiently has clear processes, documented architecture, good test coverage (new engineers can change things without fear), and a welcoming culture. Teams that can't onboard effectively are usually struggling with the same issues that make them hard to work in generally.`,
    },
    {
      id: 631,
      name: "Team Topologies & Structure",
      desc: `**Team design** — the organizational decisions about how to group engineers, what boundaries teams own, and how teams interact. Poor team design creates coordination overhead, reduces autonomy, and produces architectures that mirror organizational friction. Good team design gives each team a clear mission, end-to-end ownership, and minimal blocking dependencies on other teams.

**Team Topologies model (Skelton & Pais):**
- **Stream-aligned teams:** own and deliver end-to-end value in a product stream; the primary type. Own customer value delivery.
- **Platform teams:** build and maintain internal platforms (dev tools, deployment infrastructure, data pipelines) that reduce cognitive load on stream-aligned teams
- **Enabling teams:** temporary specialists who help stream-aligned teams adopt new capabilities (security, ML, accessibility); dissolve when capability is embedded
- **Complicated-subsystem teams:** own domains with deep specialist knowledge required (recommendation engine, video processing, financial calculation engine)

**The cognitive load constraint:** Teams can only maintain full ownership of systems they can fully understand. When team cognitive load exceeds capacity, quality degrades. Right-sizing the scope of team ownership to team cognitive capacity is the core design principle.

**Interaction modes:**
- **Collaboration:** two teams work closely together (expensive; used for short periods to build capability)
- **X-as-a-service:** one team provides a capability as a service to another; minimal interaction required
- **Facilitating:** one team helps another develop a capability; relationship ends when capability is established

**Team size:** Two-pizza teams (6-10) are a practical guideline. Below 5: insufficient diversity of skills and resilience to absences. Above 12: coordination overhead outweighs collaboration benefits; communication bandwidth degrades.

**Key insight:** The hardest team design decision is when to split a large team into smaller ones. The trigger: if the team can't independently deliver its mission without significant coordination with other teams, either the mission should be redefined or the team should be reorganized to match the actual dependency structure.`,
    },
    {
      id: 632,
      name: "Delegation & Accountability",
      desc: `**Delegation** — the transfer of responsibility for a task, decision, or outcome from a manager to a team member, with appropriate authority to fulfill that responsibility. Effective delegation develops engineers, creates organizational capacity, and frees managers for high-leverage work. Ineffective delegation is either micromanagement (authority without trust) or abdication (responsibility without support).

**The delegation levels (Oncken & Wass, Management Time):**
1. Wait to be told
2. Ask what to do
3. Recommend, then take resulting action
4. Act, but advise at once
5. Act on own, report routinely

**Moving engineers up the delegation ladder:** New engineers start at Level 1-2; the goal is to reach Level 4-5 for areas in their scope. Each level requires more trust, context, and demonstrated judgment. The manager's job is to provide context and coaching that enables the engineer to act at higher autonomy levels.

**Accountability ≠ blame:** When a delegated task goes wrong, the manager shares accountability — they delegated to someone without adequate support, context, or check-ins. Creating a culture where accountability means "I own the outcome and will learn from failure" rather than "I'll be punished if this goes wrong" is what makes delegation safe.

**Delegation anti-patterns:**
- **Seagull management:** swooping in, making a mess, flying away — showing up only when things go wrong, then micromanaging
- **Delegating without context:** handing off a task without explaining why it matters, what success looks like, or what constraints apply
- **Delegating without authority:** assigning responsibility without the budget, access, or organizational standing to succeed

**Key insight:** The engineers who grow fastest are those whose managers delegate the hardest tasks appropriate to their growth edge — not the safe tasks, but the stretch tasks with adequate support. "I know you haven't done this before, and I'll support you through it" is the most developmental thing a manager can say.`,
    },
    {
      id: 633,
      name: "Managing Up",
      desc: `**Managing up** — the set of skills for building effective working relationships with your manager and leadership above them, ensuring they have the context they need to support your team, clearing organizational blockers, and influencing decisions before they're made rather than after. Not manipulation or politics — the legitimate practice of good organizational communication upward.

**What managing up accomplishes:**
- Your team's work is visible and understood by those who make resource and priority decisions
- Organizational decisions that affect your team are made with accurate information
- Blockers that can only be removed at a higher level are actually removed
- Your own career growth is supported by advocates who understand your work

**Techniques:**
- **Regular status communication:** brief written updates on team progress, risks, and decisions needed — before your manager has to ask
- **Framing risks early:** surface problems as soon as they're visible, with your recommended approach — don't bring surprises; bring analyzed situations
- **Speaking in outcomes:** "we're behind on X because of Y, and here's what we need to get back on track" — not just status reports
- **Understanding their context:** what is your manager trying to accomplish? What pressure are they under? What does success look like from their vantage point?
- **Asking for input, not just approval:** "here's our plan — what risks do you see?" builds trust and surfaces information you might have missed

**When your manager is wrong:** This happens. The skillful response is to present your analysis and concerns directly and specifically, to listen genuinely to their perspective, and to advocate persistently for what you believe is right before accepting the decision. Once the decision is made, implement it with full commitment.

**Key insight:** Engineers who manage up effectively are not being political — they're being professional. Your manager cannot advocate for your team, remove your blockers, or make good decisions about your domain if they don't have accurate, timely information. Treating upward communication as beneath you leaves your team under-resourced and over-constrained.`,
    },
    {
      id: 634,
      name: "Handling Underperformance",
      desc: `**Managing underperformance** — the management responsibility of addressing situations where an engineer is not meeting the expectations of their role, through a structured process of feedback, support, and if necessary, formal improvement plans or role transitions. Avoiding underperformance conversations is one of the most common and damaging management failures.

**The spectrum of underperformance:**
- **Skill gap:** the engineer lacks the technical or communication skills the role requires — addressable through coaching, training, pair programming, mentoring
- **Will gap:** the engineer has the ability but not the motivation — requires deeper conversation about role fit, personal circumstances, or engagement
- **Fit gap:** the engineer's strengths and interests are misaligned with the role — role change, team change, or departure may be appropriate
- **Context gap:** the engineer doesn't have adequate context, clarity, or tools to perform — a management failure, not an engineer failure

**The feedback escalation process:**
1. Informal, specific, timely feedback at the first sign of a pattern
2. More structured feedback conversation: "I've noticed this pattern across X instances, it's creating Y impact, and I need to see Z change"
3. Documented verbal performance warning: explicit about severity, impact, and expected change
4. Performance Improvement Plan (PIP): formal documented plan with clear criteria, support provided, and consequences of not meeting criteria
5. Termination if PIP criteria aren't met

**Why managers avoid this:** Fear of conflict, discomfort with difficult conversations, hope that the problem will resolve itself. It rarely does. Early intervention is kinder (gives the engineer time to improve or find a better fit) and cheaper (avoids compounding team impact) than delayed confrontation.

**Key insight:** Tolerating persistent underperformance is unfair to three parties: the engineer (who deserves honest feedback and the chance to improve), the team (who carry extra load and lose trust in fairness), and the manager (who accumulates a growing problem). The hardest part of this conversation — the first one — is almost always less bad than the manager feared. Managers who give hard feedback early and with care develop the highest-trust teams.`,
    },
    {
      id: 635,
      name: "Engineering Culture Building",
      desc: `**Engineering culture** — the shared values, behaviors, norms, and practices that characterize how an engineering organization works together. Culture is not what's written on the walls or in company handbooks — it's what actually happens when decisions are made under pressure. Culture is built through consistent behavior from leaders, not through statements of values.

**The culture ↔ behavior ↔ outcome loop:** Desired outcomes (high quality, fast delivery, safety) require specific behaviors (code review discipline, writing tests, honest postmortems). Specific behaviors require cultural norms that make those behaviors feel normal and expected. Cultural norms are shaped primarily by what leaders model and what gets rewarded or tolerated.

**Culture-building practices:**
- **Model the norms yourself:** if you want honest postmortems, be genuinely blameless when your own decisions lead to incidents
- **Celebrate what you want to see more of:** public recognition of the right behaviors (good design doc, thorough review, early risk escalation) reinforces them
- **Address what violates the culture:** tolerating a behavior signals that the stated values don't apply under pressure
- **Hire for culture add:** people who share core values but bring diversity of perspective and background
- **Make norms explicit:** documented, not implicit — new engineers can't read minds

**Culture doesn't travel automatically:** The culture of a 20-person team doesn't automatically scale to 200. As teams grow, culture requires more deliberate maintenance — documentation, onboarding emphasis, manager training, consistent enforcement.

**Key insight:** The fastest way to identify a team's actual culture (vs. the stated culture) is to look at what behaviors are tolerated. A team that says it values quality but merges PRs without review whenever deadlines approach has a deadline culture, not a quality culture. Stated culture is aspirational; behavioral culture is real. The gap between the two is the first thing to address.`,
    },
  ],
};

export default engineeringManagement;
