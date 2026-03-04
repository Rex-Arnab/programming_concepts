const productMarketing = {
  name: "Product Marketing",
  icon: "◈",
  color: "#F59E0B",
  concepts: [
    {
      id: 163,
      name: "Jobs-to-be-Done (JTBD)",
      desc: `People don't buy products — they hire products to do a job. JTBD reframes product and marketing thinking: instead of asking "what features does our customer want?", ask "what progress is our customer trying to make, and what's getting in the way?" The shift in perspective changes everything from messaging to product roadmap.

**How it works:** Clayton Christensen's framework distinguishes three types of jobs:
- **Functional job:** The core task the customer needs to accomplish ("send invoices and get paid on time")
- **Emotional job:** How they want to feel doing it ("feel in control of my business finances")
- **Social job:** How they want to be perceived ("look like a professional to clients")

The JTBD interview methodology (pioneered by Bob Moesta and Chris Spiek) focuses on the "switch moment" — what caused someone to stop using the old solution and hire the new one. Questions: "Walk me through the day you decided to look for a new solution." "What were you using before?" "What made you stop?" The stories people tell reveal the real job — which often has nothing to do with the product's stated value proposition.

**Marketing application:** JTBD changes copy from feature-centric to outcome-centric. Instead of "automated invoicing with 50+ templates," the message becomes "get paid 3x faster without chasing clients." One is a product description; the other speaks to the job.

**Real-world example:** Milkshake Company (Christensen's classic case): McDonald's found that 40% of milkshakes were purchased before 8am. The job wasn't dessert — it was "entertain me during a boring commute and keep me full until lunch." Competitors selling breakfast sandwiches or coffee weren't even on the competitor set. Understanding the job revealed competitors no market research would have surfaced.

**Key takeaway:** If your marketing messaging describes your product, you're speaking to yourself. If it describes the progress your customer is trying to make, you're speaking to them. JTBD interviews — 10–15 with recent buyers — are the fastest way to discover messaging that resonates without guessing.`,
    },
    {
      id: 164,
      name: "Product Launch Playbook",
      desc: `A product launch isn't the day you ship — it's the coordinated moment when the market learns that a meaningful new thing exists and immediately understands why it matters to them. Without a playbook, launches are chaotic and fail to generate the attention the product deserves.

**How it works:** The three-tier launch framework based on impact:
- **Tier 1 (Major launch):** New product or significant platform evolution. Full press strategy, analyst briefings, customer webinar, in-product announcement, social campaign, sales team enablement. 8–12 week lead time.
- **Tier 2 (Mid launch):** Significant new feature or integration. Customer email, blog post, in-product notification, sales enablement brief. 3–4 week lead time.
- **Tier 3 (Minor):** Bug fixes, small improvements. Changelog entry, maybe a social post. 1 week lead time.

**The T-minus framework:** Work backward from launch day. T-60: finalize messaging and positioning. T-45: brief analysts and press under embargo. T-30: sales enablement (training, battle cards, one-pagers). T-14: customer preview / beta access. T-0: coordinated deployment across all channels simultaneously.

**Launch post-mortem metrics:** Measure awareness (media coverage, search volume lift), engagement (webpage traffic, demo requests spike), and pipeline (influenced opportunities created in 30 days post-launch).

**Real-world example:** Notion's AI launch (early 2023) is a masterclass. They built a waitlist pre-launch, onboarded access in waves to create FOMO, seeded power users who created viral demo content, and let organic enthusiasm outpace any paid promotion. Within 30 days, Notion AI had 1M+ users on the waitlist. The launch *generated* interest rather than simply announcing a feature.

**Key takeaway:** The biggest mistake in product marketing is treating a launch as an internal milestone ("feature is shipped!") rather than an external event ("the market learns something"). Ship = technical. Launch = marketing. They're different dates, and the gap between them is where great launches are built.`,
    },
    {
      id: 165,
      name: "Competitive Battle Cards",
      desc: `A battle card is a one-page competitive intelligence document that equips your sales team to win deals when a specific competitor is in the room. Not a comparison table — a combat-ready guide with objection handling, talk tracks, and proof points tailored for live sales conversations.

**How it works:** An effective battle card has six sections:
1. **When you'll see them:** Deal types, deal sizes, regions, industries where this competitor appears
2. **Their pitch:** What they'll say about themselves — so your rep knows it before the prospect repeats it
3. **Their weaknesses:** What they can't do well, where customers are frustrated (sourced from G2 reviews, win/loss interviews, community forums)
4. **How to position against them:** Your differentiators framed relative to their specific weakness — not just your strengths in isolation
5. **Trap questions:** Questions the rep can ask that reveal why the prospect's needs align with you, not them (e.g., "How important is X to your team?" — where X is something you do well and they don't)
6. **Proof points:** Case studies, quotes, third-party validation from wins against this competitor

**Maintenance:** Battle cards are perishable — they expire when competitors release new features or change pricing. A quarterly review cadence (after each win/loss analysis cycle) keeps them current. Outdated battle cards are worse than no battle cards — they make reps look out of touch.

**Real-world example:** HubSpot maintains battle cards against Salesforce, Marketo, Pardot, and dozens of niche competitors. Their competitive intelligence team (part of product marketing) monitors G2 reviews, competitor release notes, and social listening in real time. When Salesforce acquired Pardot and rebranded it, HubSpot's battle card was updated within a week — and reps had talking points about the disruption to Pardot customers before prospects brought it up.

**Key takeaway:** The best battle card is the one the sales rep actually uses. A 12-page PDF that lives in a shared drive is not a battle card — it's a document. One-page, scannable, usable in a 5-minute deal prep moment before a call is what gets used.`,
    },
    {
      id: 166,
      name: "Messaging Architecture",
      desc: `A messaging architecture is the structured hierarchy of claims, proof points, and stories that positions your product consistently across every surface — website headline, sales deck, email campaign, and support documentation. Without one, every team invents their own messaging and the brand sounds like five different companies.

**How it works:** The hierarchy has three levels:
- **Level 1 — Core positioning statement:** The single sentence that captures what you do, for whom, and the outcome. Internal compass, not always used verbatim externally.
- **Level 2 — Proof pillars:** 3–4 claims that support the core position. Each pillar has a proof point, a customer quote, and a metric. These become website sections, email sequences, and demo structure.
- **Level 3 — Feature/benefit mapping:** Specific product capabilities mapped to the benefits they deliver, aligned to the pillar they support.

**Audience adaptation:** The architecture is a single source of truth, but the *expression* adapts by audience. The economic buyer hears Pillar 1 most prominently (business outcomes). The technical buyer hears Pillar 3 (integration, security). The end user hears specific workflow benefits. Same architecture, different emphasis.

**Real-world example:** Stripe's messaging architecture is consistently "the internet's economic infrastructure." Everything — documentation, talks, sales conversations, marketing copy — reinforces this single idea. The pillars (developer-first, global, reliable) are consistently expressed across all channels. A Stripe engineer, a Stripe marketer, and a Stripe salesperson sound like they work at the same company — which is the goal.

**Key takeaway:** A messaging architecture is complete when anyone in the company — sales, support, engineering, marketing — can explain the product positioning in a consistent way without reading from a doc. Building it requires cross-functional input; governing it requires a product marketing owner who reviews content for consistency before publishing.`,
    },
    {
      id: 167,
      name: "Crossing the Chasm (Geoffrey Moore)",
      desc: `Geoffrey Moore's 1991 framework explains why so many technology products succeed with early adopters but fail to cross to mainstream adoption. The "chasm" is the gap between visionary early customers and pragmatic mainstream buyers — and most B2B tech companies fall into it.

**How it works:** The Technology Adoption Lifecycle has five segments:
1. **Innovators (2.5%):** Technology enthusiasts who buy unfinished products for the thrill of being first
2. **Early Adopters (13.5%):** Visionaries who see strategic advantage in new tech; accept rough edges for competitive gain
3. **Early Majority (34%):** Pragmatists who buy only after proven solutions emerge; risk-averse; rely on peer references
4. **Late Majority (34%):** Conservatives who buy only under competitive pressure; want complete solutions
5. **Laggards (16%):** Buy only when forced to; still using fax machines

**The chasm:** Between Early Adopters and Early Majority. Pragmatists don't trust visionaries' opinions ("they have different priorities"). They want references from companies like them, proven ROI, complete solutions, and vendor credibility. They buy categories that exist, not new categories — which is why category creation comes before mainstream adoption.

**Crossing strategy:** Moore's prescription: pick one beachhead — one narrow segment of the early majority where you can dominate completely, build deep references and community proof, then use that beachhead to attack adjacent segments.

**Real-world example:** Salesforce crossed the chasm by targeting small sales teams at startups — a narrow segment with low IT gatekeeping and high urgency. Once they dominated that segment, references from startup sales teams gave them credibility to move into mid-market. The chasm didn't exist for them because they never tried to be everything to everyone — they were everything to one segment first.

**Key takeaway:** If your early adopter growth has stalled and mainstream customers aren't adopting despite great product reviews, you're in the chasm. The fix is narrower focus, not broader positioning — pick the beachhead, win it completely, then expand.`,
    },
    {
      id: 168,
      name: "Feature Prioritization & Roadmap Communication",
      desc: `The product roadmap is one of the most politically charged documents in a company — every stakeholder (sales, customers, executives, engineering) has a different version of "what we should build next." Product marketing's job is to translate market evidence into prioritized themes and communicate the roadmap in a way that aligns internal teams and manages customer expectations.

**How it works:** Evidence-based prioritization combines:
- **Win/loss data:** Features that cost you deals deserve higher priority than features requested by current customers (who already bought)
- **Churn signals:** Features whose absence is cited in churn surveys or exit interviews
- **Market opportunity size:** How many accounts in your ICP need this? Weighted by deal value.
- **Strategic alignment:** Does this feature advance your positioning, or is it a distraction?

**External roadmap communication:** Be specific about *themes*, vague about *timing*. "We're investing in enterprise security capabilities" is a defensible commitment. "SAML SSO in Q3" becomes a customer expectation and a support escalation if delayed. Roadmap communication is a sales enablement tool — "we're investing in X" gives sales a response to objections today without committing to dates.

**The "no" message:** Product marketing often delivers bad news — features that won't be built, timelines that are longer than sales promised, capabilities that exist in a different tier. Framing these conversations around the *problem you're focused on* rather than the *features you're not building* maintains trust without overpromising.

**Key takeaway:** The roadmap's job is to communicate strategic direction and investment priority, not to be a delivery schedule. Managing expectation delta — the gap between what customers expect based on your roadmap communication and what ships — is the day-to-day challenge of product marketing.`,
    },
    {
      id: 169,
      name: "Pricing Psychology",
      desc: `Pricing is a marketing decision as much as a financial one. How a price is *presented* — its anchoring context, its framing, the alternatives it's compared to — shapes willingness to pay as powerfully as the number itself.

**How it works:** Key pricing psychology principles:
- **Anchoring:** Present a higher-priced option first. The anchor sets the reference point — everything else seems reasonable by comparison. A $999 option followed by a $299 option makes $299 feel cheap.
- **Decoy pricing:** A third option, positioned between two others, makes one of the other two clearly superior in value. The Economist's famous example: Print ($125) + Print + Digital ($125) made Digital-only ($59) look worse — adding the combo option made Print + Digital look like a bargain.
- **Charm pricing:** Prices ending in 9 ($299, $99) anchor to the lower hundred. The effect is real but diminishing — premium brands avoid it intentionally.
- **Framing: cost per day:** $36/month sounds larger than "$1.20 a day." Same price, different psychological weight.
- **Loss vs. gain framing:** "Don't lose $10,000 in missed revenue" outperforms "gain $10,000 in additional revenue" — loss aversion is 2x more powerful than equivalent gain.

**B2B-specific:** Willingness to pay research (Van Westendorp Price Sensitivity Meter, conjoint analysis) tests actual pricing ranges with target buyers before committing. Interviewing lost deals on price reveals whether pricing is the real objection or a proxy for "I don't see enough value."

**Key takeaway:** Raising prices is usually more effective than lowering CAC at improving unit economics — but only if the value story supports the price. The most common B2B pricing mistake isn't charging too much; it's charging too little (which signals low quality) without a clear value proof that justifies the number.`,
    },
    {
      id: 170,
      name: "Beta Programs & Early Access",
      desc: `Beta programs are not just QA tools — they're product marketing events that create customer investment in your success before launch, generate reference customers before GA, and surface adoption blockers that would otherwise hit your entire customer base at once.

**How it works:** A structured beta program has five phases:
1. **Selection:** Identify ideal beta participants — customers who match your launch ICP, have the use case, and have a track record of giving honest feedback (not just cheerleaders)
2. **Onboarding:** Set expectations: what they're getting, what you need from them (usage, feedback sessions, case study consent), and what they're not getting (SLAs, full support)
3. **Engagement cadence:** Weekly check-ins, in-product feedback loops (Sprig, Productboard), and mid-beta NPS to catch problems early
4. **Co-creation:** Involve beta customers in naming features, writing documentation, testing UX flows. Participation creates ownership — beta customers become advocates
5. **Exit:** Convert beta customers to logo case studies, reference calls, and G2 reviewers before GA launch. The launch has proof points on day one.

**The marketing output of a beta:** A successful beta produces: 3–5 case studies, 10–20 G2 reviews, 2–3 reference customers for sales, and 50–100 customers who are already successful (reducing early churn post-launch).

**Real-world example:** Figma ran an extended beta for 2 years before general availability. By launch, thousands of designers were already deeply invested in the tool, had built community tutorials, and were advocates before any marketing budget was spent. The beta wasn't a product test — it was a community-building and marketing event that made the official launch feel like catching up to organic momentum.

**Key takeaway:** Treat your beta program as your first launch, not a prelude to it. The customers who succeed in beta are your first case studies, your most credible references, and your most forgiving guinea pigs. Their success stories are more valuable than any paid media you could run.`,
    },
    {
      id: 171,
      name: "Competitive Intelligence",
      desc: `Competitive intelligence is the continuous process of monitoring, analyzing, and synthesizing information about competitors — their products, pricing, positioning, customers, and strategy — to inform your product, sales, and marketing decisions. It's not corporate espionage; it's systematic attention to public signals.

**How it works:** CI sources layer from free to paid:
- **Public sources (free):** Competitor websites (especially pricing pages, changelog, jobs listings), G2/Capterra/Trustpilot reviews, social listening, press releases, conference talks, LinkedIn posts, patents
- **Sales intelligence:** CRM tagging of every deal that included a competitor; win/loss interview data from competitive deals; sales call recordings (Gong) where competitors are mentioned
- **Third-party tools:** Similarweb (traffic and channel mix), SEMrush/Ahrefs (keyword gaps), SpyFu (PPC keywords), LinkedIn Sales Navigator (hiring trends as strategic signal), Crunchbase (funding and news)
- **Paid research:** Crayon, Klue, and Kompyte aggregate CI signals automatically, alert on changes, and distribute battlefield-ready updates to sales

**Reading between the lines:** Job postings reveal strategic direction — a competitor hiring 10 enterprise AEs signals a move upmarket. A competitor hiring a Head of International signals geographic expansion. What's in their content marketing tells you what problems they think resonate with buyers. What's in their G2 reviews tells you what problems they're failing to solve.

**Real-world example:** When a competitor of a SaaS company began offering a free tier, Crayon's CI platform caught the pricing page change within hours — before any customer or sales rep noticed. The product marketing team had a competitive battle card update and sales email drafted within 24 hours, before the competitor had even announced the change publicly.

**Key takeaway:** CI is a function, not a project. The value of a weekly intelligence brief versus a quarterly competitive report is the difference between proactive positioning and reactive scrambling. The best CI programs distribute signals in real time to the people who need them — sales reps, product managers, executives — not just into a shared drive nobody opens.`,
    },
    {
      id: 172,
      name: "Product-Led Growth (PLG) Marketing",
      desc: `In a product-led growth model, the product itself is the primary acquisition, retention, and expansion vehicle. Marketing's role shifts from generating leads for sales to optimizing the product experience that converts users into customers — and customers into power users who expand and refer.

**How it works:** PLG marketing operates at the intersection of product and growth:
- **Freemium / free trial design:** What features are free vs. paid? The free plan must deliver genuine value (or users churn immediately) while creating a natural reason to upgrade (hitting limits, needing team features, wanting integrations)
- **Activation optimization:** The percentage of new signups who reach the "aha moment" — the first point of genuine product value — is the most important top-of-funnel metric. Marketing's job is to shorten the path to aha.
- **Product-qualified leads (PQLs):** In PLG, the signal isn't form submission — it's in-product behavior. A user who has invited 3 teammates, created 5 projects, and hit the free tier limit is a PQL. Sales should talk to this person, not the person who downloaded a whitepaper.
- **Viral loops in product:** Notion pages shared publicly, Calendly links sent to non-users, Figma files shared for collaboration — these are engineered growth loops built into the product itself.

**The marketing shift:** In PLG, content marketing's goal isn't to generate leads for sales — it's to educate users to get value faster (reducing time-to-aha) and to attract organic traffic from people searching for the problems the product solves.

**Real-world example:** Atlassian grew from $0 to $100M ARR with no enterprise sales team — purely PLG. Their products (Jira, Confluence, Trello) spread through individual adoption, team adoption, and eventually departmental procurement. Marketing's contribution was content (developer tutorials, templates), community (Atlassian Community forums), and in-product onboarding flows that turned technical users into power users who justified enterprise contracts.

**Key takeaway:** PLG doesn't eliminate marketing — it changes marketing's target from "get someone to talk to sales" to "get someone to value." The metrics change: free-to-paid conversion rate, time-to-activation, PQL volume. The skills required expand: product analytics, in-product messaging, onboarding optimization.`,
    },
  ],
};
export default productMarketing;
