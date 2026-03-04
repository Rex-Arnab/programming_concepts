const productAnalytics = {
  name: "Product Analytics",
  icon: "🔬",
  color: "#8b5cf6",
  concepts: [
    {
      id: 456,
      name: "Product Analytics Platforms",
      desc: `**Product analytics platforms** — dedicated tools for understanding how users interact with your product at a granular behavioral level. Unlike web analytics (which focuses on traffic and sessions), product analytics focuses on feature usage, user journeys, and retention — the "product health" layer of measurement.

**The major platforms:**
- **Amplitude:** industry-leading product analytics with powerful behavioral cohorting, funnel analysis, retention charts, and user path analysis. Strong enterprise offering with governance features
- **Mixpanel:** similar to Amplitude with strong real-time reporting, intuitive query builder, and a generous free tier. Historically popular with early-stage startups
- **PostHog:** open-source product analytics that can be self-hosted — full control over data, no sampling. Includes session recordings, feature flags, and A/B testing in one platform
- **Heap:** "autocapture" model — retroactively define events from any historical user interaction without requiring pre-planned instrumentation. Useful for retroactive analysis but can create data noise

**Web analytics vs. product analytics:** Google Analytics tells you how users arrive and what pages they visit. Product analytics tells you which features they use, how often, in what sequence, and whether they come back. Both are necessary; neither replaces the other.

**Choosing a platform:** For early-stage companies, the free tier of Amplitude or Mixpanel is sufficient. For companies with complex B2B SaaS or significant self-serve PLG motion, Amplitude's enterprise governance and cohorting capabilities are worth the cost.

**Key insight:** The most common product analytics mistake is firing too many events with too few consistent properties. Start with 20 well-defined events with rich properties rather than 200 events with minimal context. You can always add more events; fixing retroactive data quality requires re-instrumentation.`,
    },
    {
      id: 457,
      name: "Event Schema & Taxonomy Design",
      desc: `**Event taxonomy** — the organized system of event names, property schemas, and naming conventions that governs all product instrumentation. A well-designed taxonomy makes analytics intuitive and reliable; a poor taxonomy produces data that's technically collected but practically unusable for cross-event analysis.

**Naming conventions:**
- Use a consistent case (snake_case is standard: purchase_completed, not purchaseCompleted or PurchaseCompleted)
- Use object-action format: [object]_[action] — button_clicked, form_submitted, video_started, modal_closed
- Use past tense for completed actions, present tense for states: user_signed_up, user_subscription_active
- Avoid abbreviations (acq → acquisition) and keep names interpretable without documentation

**Property consistency:** Define a set of global properties that appear on every event (user_id, session_id, platform, app_version, experiment_assignments) and object-specific properties that appear on relevant events (product_id, product_category, price for purchase events; video_title, video_duration for video events).

**The tracking plan as source of truth:** A tracking plan (spreadsheet, Notion, or specialized tools like Avo) documents every event, its properties, data types, which team owns it, and which analytics questions it answers. The tracking plan prevents instrumentation drift as different teams add events over time.

**Schema versioning:** Products evolve and events change. When event schemas change (a property is renamed, a new property is added, an event is deprecated), version the change clearly. Old events and new events shouldn't be naively aggregated in funnels — the definitions may have changed.

**Key insight:** The first sign of taxonomy breakdown is when two analysts run the same query and get different numbers. This almost always means either event names or property values are inconsistent across parts of the product. A taxonomy audit — comparing event schemas across all major product areas — typically reveals 5-15 categories of inconsistency that, once fixed, dramatically improve trust in the analytics data.`,
    },
    {
      id: 458,
      name: "Funnel Analysis (Product)",
      desc: `**Product funnel analysis** — tracking the sequential flow of users through a defined series of product steps and measuring conversion and dropout at each step. Funnels are the most direct tool for identifying where users are failing to reach value in your product.

**Funnel types:**
- **Ordered funnel:** steps must occur in sequence (sign_up → complete_profile → invite_teammate → first_collaboration)
- **Unordered funnel:** any order counts — measures whether users complete all steps, regardless of sequence
- **Conversion window:** the time allowed between the first and last funnel step. A 7-day window for a 5-step onboarding funnel captures most users; a 1-day window may miss users who take multiple sessions to complete

**The onboarding funnel as highest-leverage analysis:** The onboarding funnel — from sign-up to the "aha moment" — is typically the highest-leverage funnel in a SaaS or consumer product. Users who don't activate churn within days; users who reach the aha moment have dramatically higher long-term retention. Every percentage point of activation improvement compounds over the entire user acquisition base.

**Friction vs. intention:** High funnel dropout doesn't always mean friction — some users intentionally don't continue (wrong product fit, wrong timing). Segment dropouts by: users who returned after dropping off vs. never returned. Users who came back are friction cases; users who never returned may be intent or fit cases.

**Comparing funnels across segments:** The most valuable funnel insight is usually a segment comparison. If users acquired via organic search convert through onboarding at 45% while paid social users convert at 15%, the funnel isn't the problem — the acquisition targeting is.

**Key insight:** Build your critical funnels before you need them. You can't retroactively add steps to a funnel if the events weren't instrumented. Define your key activation funnel at product launch, instrument it completely, and build the analysis immediately — so that the first cohort of users provides activation data you can act on.`,
    },
    {
      id: 459,
      name: "Retention Analysis",
      desc: `**Retention analysis** — measuring what percentage of users return to your product over time after their initial visit or sign-up. Retention is the foundation of sustainable growth: acquisition fills the top of the bucket; retention determines how much stays.

**The retention curve:** Plot the percentage of a cohort still active at Day 1, 7, 14, 30, 60, and 90 after their first use. Healthy retention curves flatten at a non-zero level — there's a segment of users who form a habit and keep returning. Curves that continue declining toward zero indicate the product hasn't found its retained core audience.

**Retention definitions:**
- **N-day retention:** did the user return on exactly day N? (Day 7 retention = returned on day 7)
- **Range retention:** did the user return within a day range? (Week 2 retention = any activity in days 8-14)
- **Rolling retention:** is the user still active at any point after day N? (Measures "ever came back" rather than "returned specifically on that day")

**Retention by segment reveals product truth:** Aggregate retention hides which users your product works for. Segment retention by acquisition source, user industry, company size, or feature usage. Often you'll find a segment with 40-50% Day-30 retention alongside a segment with 5% — revealing the product's true target audience and the gap between that audience and who you're currently acquiring.

**The activation-retention connection:** Users who reach specific activation milestones in the first session have dramatically higher long-term retention. Slack's "2,000 messages sent" and Facebook's "7 friends in 10 days" are famous examples of activation milestones that predict long-term retention. Find your equivalent by plotting Day-30 retention rates against Day-1 activation milestones.

**Key insight:** Retention is the most important metric in consumer and SaaS products, and the one most often deprioritized relative to acquisition. Before investing in growth campaigns, plot your retention curve. If Day-30 retention is below 10% for a daily-use product, growth investment produces a leaky bucket — users arrive and leave faster than they can be replaced.`,
    },
    {
      id: 460,
      name: "DAU, WAU, MAU & Stickiness",
      desc: `**DAU/WAU/MAU** (Daily/Weekly/Monthly Active Users) — engagement frequency metrics that measure how many unique users actively use a product within a given time window. These are the primary health metrics for consumer apps and products where habit formation determines success.

**Active user definitions:** The definition of "active" varies by product and must be set intentionally. For a social app, active might mean any session. For a project management tool, active might require completing a task. For a communication tool, active might require sending a message. The definition should capture the minimum meaningful usage — not just opening the app.

**DAU/MAU ratio (stickiness):** Dividing DAU by MAU gives a "stickiness" percentage — what fraction of monthly users engage daily. A 50% stickiness means half of monthly users come back every day. Benchmarks by app category:
- Social/messaging (WhatsApp, Instagram): 50-70%
- Productivity (Slack, Notion): 25-40%
- E-commerce: 5-15%
- Gaming: 20-40%

**WAU as middle ground:** For products used a few times per week (not daily but more than monthly), WAU/MAU is a more appropriate stickiness measure. A project management tool expected to be used 3x/week should target WAU/MAU in the 60-70% range rather than measuring against daily benchmarks.

**The L7/L30 distribution:** Rather than just counting active users, the L7 (events in last 7 days) and L30 distributions show engagement depth — what percentage of users logged in 1, 2, 3, 4, 5, 6, or 7 times in the last week. This reveals whether your "daily active users" are genuinely daily or just visiting once and being counted as active.

**Key insight:** Rising MAU with falling DAU/MAU ratio is a warning sign — monthly users are growing (perhaps from marketing) but the product isn't retaining daily engagement. This pattern frequently precedes user base decline as monthly-active-but-not-habitual users eventually don't renew or uninstall. Stickiness is the leading indicator that MAU growth is durable.`,
    },
    {
      id: 461,
      name: "Feature Adoption Analytics",
      desc: `**Feature adoption analytics** — measuring how many users discover, try, and continue using a specific product feature. It closes the gap between "we shipped the feature" and "users are getting value from the feature" — two very different outcomes that aggregate engagement metrics don't distinguish.

**The adoption funnel for features:**
1. **Awareness:** user was exposed to the feature (saw it in UI, received an in-app prompt)
2. **Adoption:** user tried the feature at least once
3. **Activation:** user completed the primary action the feature was designed for
4. **Retention:** user returned to the feature in subsequent sessions
5. **Habitual use:** feature appears in user's regular workflow

**Breadth vs. depth metrics:**
- **Breadth:** what percentage of the user base has tried the feature? (adoption rate)
- **Depth:** of those who tried it, how often do they use it? (average weekly uses among adopters)

**Feature engagement scoring:** Assign features a score based on usage frequency × breadth × retention among users who've adopted. Features with high scores are core to the product. Features with high adoption but low retention were tried and rejected. Features with low adoption but high retention among a small segment may be a niche value prop worth surfacing to more users.

**Leading indicators of NRR:** In B2B SaaS, feature adoption breadth within accounts predicts expansion and renewal. Accounts where >70% of users have adopted 3+ features renew at dramatically higher rates than accounts where only the admin user is actively using the product. Feature adoption analytics is therefore a leading indicator of revenue retention.

**Key insight:** The most valuable post-launch analysis for any feature is comparing the retention of users who adopted it versus users who didn't. If users who adopted the feature have 30% higher Day-90 retention, you have a retention driver worth aggressively promoting. If adoption makes no difference to retention, the feature may not be delivering the value it was designed to provide.`,
    },
    {
      id: 462,
      name: "User Path Analysis",
      desc: `**User path analysis** — visualizing the actual sequences of screens or actions users take through a product, rather than the intended sequences defined by a funnel. Where funnel analysis tests a hypothesis about what users do, path analysis is exploratory — revealing what users actually do without a predetermined hypothesis.

**Path analysis reveals:**
- The most common paths to conversion (which feature sequences predict purchase?)
- Unexpected navigation patterns (users doing X → Y → Z instead of the intended X → Y → complete)
- Dead ends (pages or states users reach from which they don't progress)
- Unexpected entry points (users arriving at a deep feature without completing standard onboarding)
- Backtracking patterns (users returning to an earlier step repeatedly — a sign of confusion)

**How to run path analysis:** Set a starting point (sign-up complete) and analyze the distribution of next actions. Then from the top next actions, look at subsequent steps. Most platforms (Amplitude, Mixpanel) provide visual Sankey diagrams for path analysis that show branching frequency.

**Paths leading to conversion vs. churn:** Compare the path profile of users who converted (purchased, activated) vs. those who churned. Feature sequences that appear in converter paths but not churner paths are activation candidates — these are the features that predict success, worth surfacing earlier in onboarding.

**Limitations:** Path analysis produces large amounts of data that require interpretation. With many possible events, users will take thousands of unique paths — the analysis requires focusing on high-volume paths and having a hypothesis about what you're looking for. Purely exploratory path analysis with no guiding question often produces interesting but inconclusive findings.

**Key insight:** Path analysis is most valuable as a follow-up investigation tool, not a primary analytics method. When funnel analysis reveals a high-dropout step, use path analysis to understand where those users went instead of completing the funnel step — often revealing an alternative user intent you hadn't considered, which may represent a product opportunity.`,
    },
    {
      id: 463,
      name: "Activation Metrics & Aha Moment",
      desc: `**The activation moment (aha moment)** — the specific point in a user's journey where they first experience the core value your product promises. Users who reach this moment have dramatically higher long-term retention than those who don't. Finding your product's aha moment and optimizing onboarding to deliver it faster is among the highest-ROI product investments available.

**Famous aha moments:**
- Twitter: following 30+ accounts (users who follow 30+ retain at much higher rates)
- Facebook: 7 friends in 10 days
- Slack: 2,000 messages sent within an organization
- Dropbox: storing one file in the Dropbox folder and seeing it sync
- LinkedIn: 5 connections

**How to find your aha moment:** Run a correlation analysis between early activation milestones (completed first project, connected first integration, invited first teammate) and long-term retention (Day-30 or Day-90 active). The milestone most strongly correlated with retention is your aha moment hypothesis — validate by testing whether onboarding changes that drive users to that milestone earlier improve retention.

**Activation rate as the primary onboarding KPI:** Define a binary activation event (user has reached the aha moment milestone within their first session or first week). Track activation rate by cohort. Onboarding optimization should be measured by whether it moves activation rate — not by secondary metrics like step completion or time-in-app.

**Time-to-activation:** Not just whether users activate but how fast. Users who reach the aha moment within 5 minutes retain better than those who take 30 minutes, who retain better than those who take 3 days. Reducing time-to-activation is an onboarding design goal as important as increasing activation rate.

**Key insight:** Activation is the leverage point in growth. A 5% improvement in activation rate delivers more long-term revenue than a 5% improvement in acquisition at most stages of company growth — because activation improvement compounds across every user who ever signs up, while acquisition improvement only benefits the marginal user acquired. Invest in activation before investing in additional acquisition.`,
    },
    {
      id: 464,
      name: "Product-Led Growth (PLG) Analytics",
      desc: `**Product-Led Growth (PLG) analytics** — the measurement framework for companies where the product itself is the primary acquisition, activation, and expansion channel. In PLG, users self-onboard via free trials or freemium, experience value before paying, and convert when the product has demonstrated enough value. Analytics must capture the full self-serve journey.

**PLG-specific metrics:**
- **Product Qualified Lead (PQL):** a free/trial user who has reached a usage threshold that correlates with conversion to paid. More predictive of sales success than MQL criteria based purely on company fit
- **Time to first value (TTFV):** how long from sign-up to the user's first aha moment — the primary onboarding health metric
- **Activation rate:** percentage of sign-ups who reach the aha moment within a defined window (typically first session or first week)
- **Free-to-paid conversion rate:** the primary monetization metric; typically 2-5% for freemium, 15-25% for free trials
- **Expansion revenue rate:** revenue growth from existing accounts (upsell, seat expansion) as a % of beginning ARR

**Usage-based PQL scoring:** A PQL model scores free users on usage depth, frequency, breadth of feature adoption, and team size. High-scoring PQLs are routed to sales or triggered with in-product upgrade prompts. Figma's model — where design files shared externally expose the product to non-users, who then sign up — is a PLG viral loop instrumented at the PQL level.

**Viral coefficient in PLG:** PLG products often have built-in virality (sharing a Notion page, collaborating in Figma, receiving a Calendly link). Instrument every viral loop to measure K-factor: viral invites sent per new user × acceptance rate. K-factor above 1 means organic growth exceeds churn.

**Key insight:** The biggest PLG analytics gap in most companies is the connection between product usage and revenue. PQL definition — "which product behaviors predict paid conversion?" — requires a correlation analysis between usage patterns and payment events. Running this analysis and defining data-driven PQL criteria is one of the first PLG analytics investments that directly moves conversion rates.`,
    },
    {
      id: 465,
      name: "Behavioral Cohort Analysis",
      desc: `**Behavioral cohort analysis** — grouping users by a shared behavior (not just sign-up date) and comparing their subsequent engagement, retention, and conversion patterns. Where time-based cohorts answer "are users acquired in January retaining better than February users?", behavioral cohorts answer "do users who invite a teammate in week 1 retain better than those who don't?"

**Behavioral cohort examples:**
- Users who completed onboarding checklist vs. didn't
- Users who watched the product tour vs. skipped it
- Users who adopted 3+ features vs. 1-2 features
- Users who were invited by an existing user vs. signed up organically
- Users who reached activation within Day 1 vs. Day 3 vs. never

**Why behavioral cohorts drive product decisions:** Time-based cohorts tell you whether product quality is improving over time (trending cohort retention curves). Behavioral cohorts tell you what behaviors drive long-term value — and therefore what your onboarding and growth teams should engineer more users to do.

**Correlation vs. causation caveat:** Behavioral cohort analysis shows correlation — "users who did X retained better." It doesn't prove that doing X caused better retention; users who do X may be fundamentally more engaged users who would have retained regardless. Validate correlations with A/B tests that specifically encourage the behavior in question and measure retention impact.

**Implementation in Amplitude/Mixpanel:** Both platforms support behavioral cohorts natively. Define a cohort as "users who performed event X within Y days of sign-up" and then analyze their retention, conversion, and revenue curves against a control cohort. The comparison chart immediately shows whether the behavior is associated with better outcomes.

**Key insight:** The correlation analysis between specific Day-1 or Week-1 behaviors and Day-30 retention is the most valuable single analysis in product analytics. Run it across your 20 most common onboarding actions, rank them by retention correlation coefficient, and the results directly inform your onboarding optimization roadmap.`,
    },
  ],
};

export default productAnalytics;
