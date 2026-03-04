const b2bAbm = {
  name: "B2B & Account-Based Marketing",
  icon: "🎯",
  color: "#6366F1",
  concepts: [
    {
      id: 151,
      name: "Ideal Customer Profile (ICP)",
      desc: `The ICP is a detailed description of the company (not person) that gets the most value from your product and is most likely to buy, renew, and expand. It's the B2B equivalent of a target market — but more precise, built from actual customer data rather than assumptions.

**How it works:** ICP is defined by firmographic and technographic attributes:
- **Firmographic:** industry, company size (headcount and revenue), geography, funding stage, business model
- **Technographic:** existing tech stack (e.g., "uses Salesforce and HubSpot"), digital maturity, infrastructure complexity
- **Behavioral:** buys on a certain sales cycle, responds to specific channels, has an internal champion in a specific role

Build the ICP by analyzing your 20 best customers: what do they have in common? What were the fastest deals? Highest NPS? Lowest churn? The ICP comes from data — not from who you wish would buy from you.

**ICP vs. Buyer Persona:** The ICP is the *company*; the persona is the *person* within that company. You can have one ICP with three personas (economic buyer, technical evaluator, end user). Both are needed — the ICP tells your sales team *which* accounts to pursue; the persona tells them *who* to talk to and what to say.

**Real-world example:** Intercom's initial ICP was: B2B SaaS companies, 10–200 employees, product-led growth motion, English-speaking markets, using Stripe + Segment. This hyper-specific definition let a small sales team focus on a tight universe of accounts where win rates were 3x higher than the broader market. Expanding the ICP too early is the most common mistake — it dilutes sales focus without increasing win rates.

**Key takeaway:** A well-defined ICP doesn't limit your market — it concentrates your resources on the segment where you win. An ICP that describes 50,000 companies is still an ICP; one that describes 2 million is just "everyone who could theoretically buy."`,
    },
    {
      id: 152,
      name: "Account-Based Marketing (ABM)",
      desc: `ABM flips the traditional funnel upside down. Instead of casting a wide net and filtering leads, you identify specific high-value accounts first, then build personalized marketing and sales motions tailored to each. One-to-one relationships, not one-to-many campaigns.

**How it works:** ABM operates at three levels of personalization vs. scale:
- **1:1 (Strategic ABM):** Highly personalized campaigns for 5–50 named accounts. Custom content, executive gifts, bespoke events, dedicated sales resources. Used for enterprise accounts worth $1M+ ACV.
- **1:Few (ABM Lite):** Personalized by industry cluster or market segment. Tailored messaging for a vertical (e.g., "ABM for healthcare systems"), not individual companies. 50–500 accounts.
- **1:Many (Programmatic ABM):** Technology-driven personalization at scale — dynamic ads, personalized landing pages, targeted content — for 500–5,000 accounts. Lower touch but account-specific.

**The four pillars:** (1) Account selection (who, based on ICP + intent signals), (2) Account insight (what matters to them — their business priorities, pain points, news), (3) Multi-channel engagement (outbound, targeted ads, events, direct mail), (4) Measurement by account (not by lead count).

**Real-world example:** Snowflake's ABM motion targeting enterprise accounts included personalized microsites, custom data cloud ROI calculators for specific industries, and coordinated outreach across SDRs, AEs, and executives. Their enterprise business grew from $96M to $1.2B ARR in three years — not through inbound volume but through deliberate account penetration of a curated list.

**Key takeaway:** ABM isn't a tactic — it's a go-to-market motion that requires sales and marketing to operate as one team against a shared account list. The failure mode is marketing running "ABM campaigns" without sales alignment, which produces personalized content that nobody follows up on.`,
    },
    {
      id: 153,
      name: "Demand Creation vs. Demand Capture",
      desc: `The most common B2B marketing mistake is spending 90% of budget on demand capture (search ads, bottom-of-funnel retargeting) while ignoring the 95% of your market that isn't in an active buying cycle yet. Demand creation builds future pipeline; demand capture harvests it.

**How it works:**
- **Demand capture:** Target buyers who are *already* in-market — searching for your solution, visiting competitor sites, comparing options. Channels: branded search, competitor SEO, bottom-funnel retargeting, review sites (G2, Capterra). High intent, high efficiency, limited scale — constrained by how many people are currently in-market.
- **Demand creation:** Educate buyers who have the problem but don't yet know the solution exists (or that yours is the right one). Channels: thought leadership content, podcasts, LinkedIn, events, category-defining research. Longer time-to-revenue but the only way to expand your addressable opportunity.

**The B2B buying cycle reality:** Gartner research shows that B2B buyers spend only 17% of their purchase journey talking to potential vendors — and 27% of their time doing independent online research. The vendor who shaped their thinking *before* they entered the active evaluation window has an enormous advantage.

**Budget allocation wisdom:** Binet & Field's research on B2B marketing effectiveness suggests a 60/40 split — 60% brand/demand creation, 40% performance/demand capture — for long-term revenue growth. Most B2B companies run closer to 10/90, starving future pipeline while competing for a small pool of current buyers.

**Key takeaway:** If your pipeline is consistently thin, look at demand creation before demand capture. You can't capture demand you haven't created. The question isn't "are people searching for us?" but "are we part of the conversation that happens before they start searching?"`,
    },
    {
      id: 154,
      name: "B2B Buying Committee",
      desc: `Enterprise B2B sales are rarely decided by a single person. Gartner research found that the average B2B purchase involves 6–10 stakeholders, each with different concerns, veto power, and information needs. Marketing to "the buyer" when there are seven buyers is a recipe for stalled deals.

**How it works:** The buying committee typically includes:
- **Economic Buyer:** Controls budget and signs the contract. Cares about business outcomes and ROI, not features. Rarely in the early evaluation.
- **Technical Evaluator:** Assesses product fit, security, and integration requirements. Can block a deal. Needs depth — docs, API specs, security reviews.
- **End User / Champion:** Will use the product daily. Needs to believe it will make their job better. Often the internal advocate who drives the deal forward.
- **Legal / Procurement:** Enters late but can slow everything. Focuses on contract terms, data processing agreements, vendor risk.
- **Influencer / Friend:** A peer or advisor whose opinion carries informal weight. Often invisible in CRM.

**Marketing implications:** Create content for each stakeholder type. An ROI calculator speaks to the economic buyer; a security whitepaper speaks to IT; a product walkthrough video speaks to end users. Marketing that only produces awareness content never equips the champion to sell internally — which is where most deals die.

**Real-world example:** Gong's marketing creates "value for everyone in the room." Their economic buyer content shows pipeline risk reduction; their end-user content shows call coaching and skill development; their technical content covers Salesforce and HRIS integrations. Each stakeholder finds relevant content that reinforces the champion's case internally.

**Key takeaway:** Your champion wants to buy you — but they have to sell you to four other people. Marketing's job doesn't end when a lead is generated; it extends to creating the internal selling assets (business case templates, ROI tools, competitive talking points) that let your champion win the internal vote.`,
    },
    {
      id: 155,
      name: "Sales Development Representatives (SDR/BDR)",
      desc: `SDRs (Sales Development Representatives) and BDRs (Business Development Representatives) are the pipeline engine of outbound B2B marketing — the human bridge between marketing-generated interest and sales-closed revenue. The distinction: SDRs typically work inbound leads; BDRs do cold outbound prospecting.

**How it works:** The SDR/BDR role is specialized: they don't close deals — they create opportunities. Their job is to:
1. Identify and research target accounts (from ICP and ABM lists)
2. Execute multi-touch outbound sequences (email, LinkedIn, phone, video)
3. Qualify interest and pain via discovery conversations
4. Schedule introductory calls and demos for Account Executives (AEs)

**Outbound sequence design:** A typical B2B outbound sequence is 8–12 touches over 2–3 weeks: Day 1 (personalized email), Day 3 (LinkedIn connection), Day 5 (follow-up email with value add), Day 8 (phone call + voicemail), Day 10 (video message), Day 14 (breakup email). Personalization lifts reply rates — generic sequences average 1–3% reply rates; highly personalized ones hit 10–20%.

**Marketing alignment (SMarketing):** Marketing feeds SDRs with content to reference, accounts showing intent signals, and personalized landing pages. When marketing and sales share a pipeline target, SDR follow-up on MQLs happens in hours not days — and response-to-meeting rates increase by 5–10x compared to next-day follow-up.

**Real-world example:** Outreach.io (an SDR sequencing platform) reports that their own SDR team averages $1.2M in sourced pipeline per SDR per quarter by combining intent data from 6sense, personalized video (Vidyard), and a 3-step initial outreach sequence. The companies whose SDRs outperform aren't doing more outreach — they're doing better-targeted, more personalized outreach.

**Key takeaway:** An SDR team without quality marketing inputs (content, intent data, account prioritization) is a cold-calling team. An SDR team with those inputs is a precision prospecting operation. Marketing's responsibility doesn't end at lead generation — it extends to arming SDRs with the context they need to personalize at scale.`,
    },
    {
      id: 156,
      name: "MEDDIC / BANT Qualification",
      desc: `Qualification frameworks prevent sales teams from spending time on opportunities that will never close. BANT and MEDDIC are the two dominant frameworks — BANT for SMB velocity deals, MEDDIC for complex enterprise sales.

**BANT (Budget, Authority, Need, Timeline):**
- **Budget:** Does the prospect have the money allocated? Is it in-budget?
- **Authority:** Are you talking to the decision-maker, or someone who needs approval?
- **Need:** Is there a genuine, urgent problem your product solves?
- **Timeline:** Is there a deadline driving the purchase? (Without urgency, deals stall.)
Weakness: BANT is prospect-qualifying (can they buy?) without seller-qualifying (should *we* invest resources?).

**MEDDIC (Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion):**
- **Metrics:** What measurable business outcomes will the buyer achieve? (e.g., "reduce churn by 15%")
- **Economic Buyer:** Who controls the budget? Have you met them?
- **Decision Criteria:** What formal criteria are they using to evaluate solutions?
- **Decision Process:** What are the steps, stakeholders, and timeline to a decision?
- **Identify Pain:** What's the specific, quantified pain — and what happens if it's not solved?
- **Champion:** Who internally advocates for your solution when you're not in the room?

**Marketing contribution:** Marketing can pre-qualify before sales engagement by building content that surfaces pain (pain-focused copy), identifies decision criteria (comparison guides), and educates on metrics (ROI calculators).

**Key takeaway:** A well-qualified pipeline is worth more than a large pipeline. SDRs spending time on unqualified accounts is wasted capacity that compounds over quarters. MEDDIC is the single framework most often cited by enterprise sales leaders as the reason their deals don't stall in late stages.`,
    },
    {
      id: 157,
      name: "Account Scoring & Prioritization",
      desc: `With a universe of thousands of potential accounts, the decision about which 50 to focus on this quarter is one of the highest-leverage decisions a B2B marketing and sales team makes. Account scoring replaces gut feel with data-driven prioritization.

**How it works:** A composite account score typically combines:
- **Fit score:** How closely does this account match the ICP? (industry, size, tech stack, geography) — static attributes
- **Intent score:** Is this account showing buying signals right now? (third-party intent data from Bombora/G2, first-party signals like pricing page visits) — dynamic, time-sensitive
- **Engagement score:** Has this account interacted with your marketing? (webinar attendees, content downloads, email opens) — first-party behavioral data
- **Relationship score:** Do you have existing contacts, relationships, or a previous champion at this account?

The output is a tiered list: Tier 1 (high fit + high intent = immediate 1:1 ABM), Tier 2 (high fit + low intent = nurture and monitor), Tier 3 (lower fit = broad awareness campaigns only).

**Tools:** 6sense, Demandbase, and Terminus build account scores automatically from intent data aggregation + CRM integration. Without tooling, a manually curated list updated weekly can achieve similar prioritization for teams under 50 accounts.

**Real-world example:** Demandbase's own ABM team scores 12,000 in-ICP accounts weekly. Tier 1 accounts (top 500 by combined fit + intent) receive personalized outreach from SDRs and AEs within 48 hours of showing intent signals. Tier 2 accounts get targeted ads and content. Tier 3 accounts receive only broad awareness campaigns. This structure reduced wasted SDR outreach by 60% while increasing pipeline quality.

**Key takeaway:** Account scoring is the answer to "where should we focus?" — which is the most important question in any B2B go-to-market. Without a scoring model, teams default to instinct, recency bias, and whoever shouted loudest in the last sales call.`,
    },
    {
      id: 158,
      name: "Win/Loss Analysis",
      desc: `Most companies know their win rate. Very few know *why* they win or lose. Win/loss analysis is the systematic process of interviewing buyers after a decision — win or loss — to understand what actually drove the outcome.

**How it works:** The key is interviewing the buyer, not the sales rep. Reps rationalize — buyers tell the truth, especially if the interview is conducted by a neutral third party (a product marketer or external firm) after the decision is made.

Interview questions that yield signal:
- "What prompted you to begin evaluating options?"
- "Who else did you evaluate, and what were you comparing?"
- "What was the top factor in your final decision?"
- "What almost made you choose differently?"
- "What would we need to change for you to reconsider in the future?" (on losses)

**Common findings:** Most companies discover their win/loss drivers differ dramatically from what sales reps report. Common surprises: "We lost on price" often becomes "we lost because we didn't demonstrate ROI" when buyers are interviewed. "We won on features" often becomes "we won because the sales process felt more consultative."

**Output:** Win/loss analysis feeds product roadmap priorities, messaging updates, competitive battle cards, and sales training. It's the most direct line from market feedback to strategic adjustment.

**Real-world example:** Gong analyzed 1 million sales calls and discovered that deals mentioning the term "single platform" were 35% more likely to close. This single insight from their win/loss equivalent reshaped how their sales team positioned their product — from individual features to platform consolidation — driving a measurable improvement in win rates.

**Key takeaway:** Win/loss analysis is the highest-ROI research a B2B marketing team can do. A quarterly cadence of 10–15 buyer interviews generates more actionable insight than any survey or NPS score. The conversations that hurt most to hear are usually the ones most worth acting on.`,
    },
    {
      id: 159,
      name: "Category Creation",
      desc: `Most companies compete within an existing category — trying to win market share from entrenched players. Category creation is a different strategy: define a new category that didn't exist before, make your company synonymous with it, and become the default choice before competitors understand what's happening.

**How it works:** Category creation has three components:
1. **Name the problem:** Give the market a new vocabulary for a pain they already feel but haven't articulated. "Alert fatigue" (PagerDuty), "revenue intelligence" (Gong), "people operations" (Lattice) — each named a new category.
2. **Educate the market:** Create thought leadership, research, events, and community that establishes the category — not just your product. Category creators are generous with ideas.
3. **Own the narrative:** Be the source of data, benchmarks, and language that the category uses. If you publish the annual "State of [Category]" report, you define what the category cares about.

**The risk:** Category creation is expensive and slow. It requires educating buyers who don't yet know they have the problem. The payoff: category kings capture 70–80% of the total category value long after competitors enter.

**Real-world example:** Salesforce didn't invent CRM — they created the "No Software" category, positioning cloud-based CRM as a fundamentally new thing versus on-premise software. Their early marketing wasn't "better CRM" — it was a protest movement against software as it existed. By the time SAP and Oracle responded with cloud versions, Salesforce owned the mental model of cloud software. Today they hold ~23% of the global CRM market.

**Key takeaway:** Category creation is a long-term bet that pays compound returns. The test: can a prospect describe the category (the problem type) without mentioning your product name? If yes, you're building a durable market. If your category disappears the moment your company does, you built a product — not a market.`,
    },
    {
      id: 160,
      name: "Sales Enablement",
      desc: `Sales enablement is the process of providing your sales team with the content, tools, training, and information they need to effectively engage buyers throughout the sales cycle. It's what ensures that the marketing assets you create are actually used — and used correctly.

**How it works:** Sales enablement spans three categories:
- **Content:** battle cards (how to beat Competitor X), case studies by vertical and company size, ROI calculators, demo scripts, email templates, proposal frameworks, one-pagers for each persona
- **Training:** product knowledge sessions (especially after launches), competitive positioning updates, objection handling, deal review coaching
- **Tools:** sales engagement platforms (Outreach, Salesloft), content management (Highspot, Seismic), conversation intelligence (Gong, Chorus), CRM

**The utilization problem:** SiriusDecisions research found that 65% of B2B marketing content is never used by sales — because it's hard to find, not specific enough to a sales scenario, or not trusted by reps. Effective enablement is built with sales input, tested in real calls, and organized around buyer stage and persona — not by marketing deliverable type.

**The product marketing link:** Product marketing is the function most directly responsible for sales enablement — translating product knowledge and market research into battle-ready assets. In companies without a product marketing function, sales enablement is a gap.

**Real-world example:** Highspot (a sales enablement platform) reports that companies using structured sales enablement programs see 19% improvement in win rates and 14% reduction in sales cycle length. The mechanism: reps who can find the right content in under 30 seconds (instead of digging through shared drives) engage buyers with relevant material at the right moment — rather than defaulting to generic decks.

**Key takeaway:** Sales enablement is marketing's responsibility to sales. If reps are losing deals on objections that marketing's competitive battle cards address — but reps don't know those battle cards exist or can't find them — that's a sales enablement failure, not a competitive weakness.`,
    },
    {
      id: 161,
      name: "Analyst Relations (AR)",
      desc: `Enterprise B2B buyers don't just trust vendors — they trust analysts. Gartner, Forrester, IDC, and G2 shape how IT leaders, procurement teams, and executives understand markets, evaluate vendors, and justify purchases. Analyst relations is the marketing function that manages these relationships.

**How it works:** Analyst relations encompasses:
- **Briefings:** scheduled sessions to update analysts on product developments, market strategy, and customer outcomes — keeping them informed so their research reflects your current position
- **Inquiries:** paid analyst time where you can ask them questions about market trends, buyer behavior, or competitive dynamics — reverse intelligence gathering
- **Evaluation participation:** providing information and customer references for inclusion in landmark reports (Gartner Magic Quadrant, Forrester Wave) that buyers use to build shortlists
- **Content collaboration:** co-creating research reports, whitepapers, or webinars where the analyst's credibility transfers to your brand

**Why it matters:** Gartner's research shows that 80% of enterprise technology buyers consult analyst research before making a purchase decision. A "Leader" placement in a Magic Quadrant can drive hundreds of inbound inquiries annually. An "Niche Player" placement — or absence from the report entirely — signals immaturity to buyers at exactly the wrong moment.

**The access question:** Analyst firms are expensive (Gartner contracts often $50K–$500K+/year). Smaller companies can participate in briefings (free) and evaluation inquiries without paid access. The payoff for investing in AR before you can afford it: analysts form opinions whether you brief them or not — better to shape the narrative proactively.

**Key takeaway:** Analyst relations is a long game. Analysts update their mental models slowly and trust is built through consistent briefings over years. The companies that lead Magic Quadrants in year 5 started briefing analysts in year 2 — when they had no product news worth a briefing. Show up consistently.`,
    },
    {
      id: 162,
      name: "Partner-Led Growth",
      desc: `Partner-led growth is the strategy of building revenue through an ecosystem of partners — resellers, referral partners, systems integrators, OEMs — rather than through direct sales alone. At scale, the best B2B businesses have more revenue flowing through partners than through their direct sales force.

**How it works:** Partner programs operate in tiers:
- **Referral partners:** Send leads in exchange for a commission (5–20% of first-year ACV). Low investment, highly scalable.
- **Resellers / VARs (Value-Added Resellers):** Buy and resell your product, often with added services. They own the customer relationship; you provide product and support.
- **System Integrators (SIs):** Consulting firms (Accenture, Deloitte, smaller boutiques) that implement your product for enterprise customers. SI endorsement can unlock deals too large for direct sales.
- **Technology partners (ISVs):** Companies who integrate their product with yours — creating bundled value that benefits both customer bases. Salesforce's AppExchange is the canonical example.

**The enablement requirement:** Partners won't sell what they don't understand or can't make money on. Partner success requires: a clear margin structure, co-selling support from your SEs, marketing development funds (MDF), partner certification programs, and a partner portal with sales enablement assets.

**Real-world example:** HubSpot's Solutions Partner program (formerly Agency Partner Program) has 6,000+ partner agencies that resell and implement HubSpot. Partners contribute roughly 40% of HubSpot's revenue — at lower customer acquisition cost than direct sales, because partners bring their own customer relationships. Each certified agency is a distribution channel HubSpot doesn't pay to maintain.

**Key takeaway:** Partner-led growth compounds — each new partner adds a distribution channel you don't have to build yourself. The investment is in enablement and relationship management, not headcount. The model works when the partner can make more money serving customers who use your product — that alignment is the engine.`,
    },
  ],
};
export default b2bAbm;
