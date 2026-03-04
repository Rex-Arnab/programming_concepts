const strategyPlanning = {
  name: "Strategy & Planning",
  icon: "◉",
  color: "#48C9B0",
  concepts: [
    { id: 123, name: "Integrated Marketing Communications (IMC)", desc: `Most brands run their channels in silos — the social team doesn't know what the email team is sending, and neither knows what sales is saying on calls. IMC treats all channels as one coordinated system with a unified message.

**How it works:** Every customer-facing channel — paid ads, email, social, PR, in-store, sales conversations — carries the same core message and brand voice. A central creative brief defines: what are we saying? to whom? in what tone? by when? Channel-specific adaptations differ in format (a 15-second video vs. a 1,200-word email) but not in substance or positioning. IMC also means timing: a product launch coordinated across channels simultaneously instead of rolled out ad hoc.

**Real-world example:** Apple's product launches are the standard for IMC. When iPhone 15 launched, the "Dynamic Island" message appeared simultaneously in the keynote, TV ads, App Store banners, retail displays, and press releases — all with consistent visuals and language. That coherence makes each individual channel punch above its weight, because every touchpoint reinforces the last.

**Key takeaway:** Inconsistent messaging doesn't just waste budget — it actively confuses customers and dilutes brand trust. IMC isn't just coordination; it's the difference between a brand that feels coherent and one that feels scattered.` },
    { id: 124, name: "Omnichannel Marketing", desc: `Being present on many channels is **multichannel**. Having those channels share data and work together to create one seamless experience — regardless of where the customer is — is **omnichannel**. The distinction is infrastructure, not presence.

**How it works:** Consider this flow: a customer browses a product on mobile → receives a retargeted ad on Instagram → walks into a store where the associate can see their online browsing history → completes the purchase online using a loyalty reward earned in-store. This requires shared data infrastructure (a CDP or unified CRM), real-time sync between channels, and consistent UX at every touchpoint. The opposite — multichannel — is the customer who browsed online and is then asked "how did you hear about us?" when they walk in.

**Real-world example:** Starbucks is consistently cited as best-in-class. Their app, loyalty card, and in-store POS are fully integrated — reload your card from your phone while standing in line, the barista sees the updated balance instantly, and points update in real time. This integration drove over 53% of US transactions through their rewards program, giving Starbucks unmatched data on purchase behavior.

**Key takeaway:** Omnichannel is an infrastructure investment, not a messaging strategy. The seamless experience customers feel is built on data flowing freely behind the scenes — without that backend integration, you just have multichannel with extra steps.` },
    { id: 125, name: "Account-Based Marketing (ABM)", desc: `Traditional B2B marketing casts a wide net: generate leads, qualify, hand to sales. ABM reverses the funnel — identify the exact companies you want to win first, then build a custom campaign for each one.

**How it works:**
- Sales and marketing agree on a target account list (typically 10–500 companies depending on deal size and sales capacity)
- Research each account: their tech stack, current initiatives, known pain points, key stakeholders by name
- Build account-specific content: personalized landing pages, custom case studies, LinkedIn ads shown only to employees at that specific company
- Run coordinated outreach: marketing warms the account with content; sales reaches out when engagement signals show readiness
- Measurement is account-level, not lead-level — are target accounts progressing through the pipeline?

**Real-world example:** Snowflake's enterprise growth relied heavily on ABM. Their team targeted specific Fortune 500 companies with campaigns tailored to each industry's data challenges — not generic cloud messaging. This approach helped close deals with JPMorgan, Capital One, and others before their 2020 IPO, which was the largest software IPO in history at $33.2B valuation.

**Key takeaway:** ABM makes sense when your ideal customer is a known set of companies and deal value is high enough to justify the per-account investment. It's not for high-volume, low-ACV products — it's for when landing one account is worth a year of inbound leads.` },
    { id: 126, name: "Customer Retention", desc: `Acquiring a new customer costs 5–7x more than keeping an existing one. Yet most marketing budgets skew heavily toward acquisition. Retention is the discipline of keeping customers long enough for them to become profitable — and then keeping them longer.

**How it works:**
- **Onboarding:** The first 30–90 days carry the highest churn risk. Structured onboarding sequences that guide users to their first "aha moment" reduce early dropout significantly
- **Engagement loops:** Regular touchpoints (email, in-app nudges, success check-ins) keep customers activated beyond the honeymoon period
- **Loyalty programs:** Points, tiers, and rewards create switching costs — the longer you stay, the more you'd lose by leaving
- **Proactive intervention:** Identifying at-risk customers before they churn (usage dropping, support tickets increasing) and reaching out before they decide to leave
- **Feedback loops:** NPS and CSAT surveys catch dissatisfaction early enough to act on it

**Real-world example:** Amazon Prime is one of the most effective retention mechanisms ever built. Members spend ~2.5x more annually than non-members, and ~95% renew after year one. The key: Prime bundles shipping, video, music, and reading into one fee — each additional benefit raises the perceived cost of canceling, creating a powerful switching cost moat.

**Key takeaway:** Retention compounds. A 5% improvement in retention can increase profits 25–95% (Bain & Company data) because of the cumulative effect of longer customer lifetimes, higher LTV, and referral behavior from satisfied long-term customers.` },
    { id: 127, name: "Customer Advocacy", desc: `Peer recommendations are trusted 12x more than branded content. Customer advocacy turns your best customers into an active, credible marketing channel — one you can't buy, only earn.

**How it works:**
- **Case studies & testimonials:** Documented stories of specific, measurable results — used by sales to overcome objections and by marketing to build credibility
- **Referral programs:** Incentivized sharing. Dropbox offered free storage for both referrer and referee — growing from 100K to 4M users in 15 months through this one mechanic
- **Community champions:** Power users who answer questions in forums, speak at events, and write tutorials — reducing your support and content costs while building your brand
- **Review management:** Actively soliciting G2, Trustpilot, and Google reviews from satisfied customers, and responding (not ignoring) negative ones

Advocacy can't be manufactured from mediocre product experience. The prerequisite is genuine customer success.

**Real-world example:** Salesforce's Trailblazer community has grown to 10M+ members who build on, teach, certify in, and actively advocate for Salesforce. Community members churn less, buy more new products, and refer new customers — Salesforce has essentially built a self-sustaining marketing engine from its user base.

**Key takeaway:** Customer advocacy is a lagging indicator of real product-market fit. If you're struggling to generate authentic advocates, the answer is usually in the product or onboarding experience — not in the incentive structure.` },
    { id: 128, name: "Market Research", desc: `Marketing decisions made without data are just opinions. Market research is the systematic process of gathering information about your target market — who they are, what they need, what they'll pay, and how they actually behave.

**How it works:** Two broad categories:
- **Primary research** (you collect it directly):
- Surveys: quantitative, scalable, good for validating hypotheses at volume
- Interviews: qualitative, slow, but rich in nuance — best for discovery
- Observational: watching how people actually use your product vs. what they say they do
- **Secondary research** (already exists):
- Industry reports (Gartner, Forrester), government data, competitor filings, academic studies

Good research combines both: quantitative data shows *what* is happening at scale; qualitative insight explains *why*. Neither alone is sufficient.

**Real-world example:** When Airbnb was struggling to grow in New York City, their analysis pointed to a simple culprit: listing photos were bad. They hired professional photographers to shoot host properties, and bookings doubled in affected markets within weeks. No survey told them this — they discovered it through direct qualitative research (customer calls and in-person visits to hosts' apartments).

**Key takeaway:** The most common mistake in market research is asking people what they want instead of observing what they do. What people say and what they do are frequently different — the gap between the two is usually where the real insight lives.` },
    { id: 129, name: "Buyer Personas", desc: `Generic messaging resonates with no one. A buyer persona is a semi-fictional profile of your ideal customer — not any individual, but a composite that captures the common patterns across your best customers so every piece of messaging can be written for a specific, imaginable person.

**How it works:** A complete persona includes:
- **Role & context:** Job title, company size, industry, reporting structure
- **Goals:** What they're trying to achieve professionally or personally
- **Pain points:** What problems they face that your product addresses
- **Decision criteria:** What matters most when evaluating a solution (price, ease of use, integrations, security)
- **Objections:** What would stop them from buying ("We're too small," "We don't have budget until Q3")
- **Watering holes:** Where they get information — specific LinkedIn groups, Slack communities, podcasts, subreddits

Personas are derived from real customer interviews, CRM analysis, and sales team input — not assumptions or demographic guesses.

**Real-world example:** HubSpot built their early marketing entirely around the persona "Marketing Mary" — a marketing manager at a 20–200 person company, digitally savvy but budget-constrained, trying to prove ROI to her CEO. Every piece of HubSpot content was written for Mary. That specificity drove millions of organic visitors and became a model for inbound marketing that the entire industry adopted.

**Key takeaway:** A persona is useful only if it's specific enough to make a decision. "Marketing professionals aged 25–45" is not a persona. A persona is specific enough that you could write a subject line and know immediately whether Marketing Mary would open it.` },
    { id: 130, name: "Jobs To Be Done (JTBD)", desc: `Demographics tell you who your customer is. Jobs To Be Done tells you *why* they hired your product — what progress they were trying to make in their life or work when they chose you. The core insight: people don't buy products, they hire them to do a job.

**How it works:** The JTBD framework asks: what situation causes someone to seek out your product? What functional, emotional, and social outcomes are they trying to achieve? The classic framing from Clayton Christensen: "People don't want a quarter-inch drill — they want a quarter-inch hole." More precise still: they want to hang a shelf so their home feels organized.

To uncover jobs:
- Interview recent purchasers about the exact moment they decided to buy
- Ask: "What were you doing when you first thought 'I need this'?"
- Map the **functional** job (save time, reduce cost), **emotional** job (feel in control, feel confident), and **social** job (look professional, impress my team)

**Real-world example:** Christensen's milkshake research found that 40% of McDonald's milkshakes were bought in the morning. The job: a companion for a boring commute that was filling, took long to consume, and could be handled one-handed. Bagels and bananas couldn't do that job as well. McDonald's thickened the shake for the morning job — sales increased without changing price or advertising.

**Key takeaway:** JTBD reframes competition. Your real competitor isn't always the company making a similar product — it's whatever customers are currently hiring to do the same job. Understanding the job reveals both the actual value you deliver and the unconventional alternatives you're really competing against.` },
    { id: 131, name: "Blue Ocean Strategy", desc: `Most industries are "red oceans" — defined markets with established players competing on the same dimensions, driving margins down through attrition. Blue Ocean Strategy is about creating entirely new market space where competition is temporarily irrelevant.

**How it works:** The core tool is the **Strategy Canvas** — a chart mapping how competing companies perform across each key competitive factor. The blue ocean move uses four actions:
- **Eliminate:** factors the industry takes for granted that add no real customer value
- **Reduce:** factors that are over-engineered relative to what customers actually need
- **Raise:** factors that are genuinely under-delivered
- **Create:** entirely new factors no competitor offers

The result: a new value curve that serves a previously ignored customer in a way no incumbent does.

**Real-world example:** Cirque du Soleil didn't compete with Ringling Bros. by having bigger animals or cheaper tickets. They eliminated animals and star performers (expensive and increasingly controversial), raised theatrical production quality, and created narrative themes no circus had attempted. They could charge 10x traditional circus prices by targeting adult theatergoers — an audience no circus had ever pursued. Revenue grew to $1B+ from a market that was supposedly in decline.

**Key takeaway:** Blue Ocean thinking is hardest when your industry feels stable — but that's precisely when it's most valuable. The question isn't "how do we beat competitors?" but "how do we make competition irrelevant by finding customers our entire industry ignores?"` },
    { id: 132, name: "Porter's Five Forces", desc: `Profitability in an industry isn't random — it's determined by structural forces that dictate how value gets distributed between producers, suppliers, and customers. Porter's Five Forces is the framework for diagnosing why some industries print money while others destroy it.

**How it works:** Five structural factors determine competitive intensity and profit potential:
- **Competitive rivalry:** How intensely do existing players compete? High rivalry compresses margins through price wars
- **Threat of new entrants:** How easy is it to enter? Low barriers attract competition, limiting long-run profitability
- **Bargaining power of suppliers:** Can they raise prices or restrict supply? High supplier power squeezes producer margins
- **Bargaining power of buyers:** Can customers demand lower prices or switch easily? High buyer power caps pricing
- **Threat of substitutes:** Can customers meet the same need in a fundamentally different way? Caps the ceiling price the market will bear

**Real-world example:** Airlines score poorly on almost all five forces: intense rivalry (constant price wars), powerful suppliers (Boeing/Airbus duopoly, volatile fuel costs), highly price-sensitive buyers who compare fares instantly, easy substitutes (Zoom replaced business travel), and periodic disruption from low-cost carriers. The result: US airlines collectively lost money for most of the industry's history despite carrying billions of passengers. Warren Buffett famously called investing in airlines "a death trap" — then invested in them anyway in 2016 and sold at a loss in 2020.

**Key takeaway:** Use Porter's Five Forces before entering a new market or evaluating a strategy shift. It tells you whether you're stepping into a structurally profitable or structurally punishing industry — a distinction no amount of execution can fully overcome.` },
    { id: 133, name: "Ansoff Matrix", desc: `Every growth strategy boils down to a fundamental choice: sell more of what you have, or expand into something new. The Ansoff Matrix maps four possible directions — each with progressively higher risk and reward — so leadership can make explicit, informed bets.

**How it works:** A 2×2 grid with products on one axis and markets on the other:
- **Market Penetration** (existing product, existing market): Grow share with current customers — more advertising, better retention, lower prices. Lowest risk.
- **Market Development** (existing product, new market): Take your current product into new geographies, customer segments, or distribution channels. Moderate risk.
- **Product Development** (new product, existing market): Build new products for customers you already know well. Moderate-high risk.
- **Diversification** (new product, new market): Enter entirely new territory with no established advantage in either dimension. Highest risk.

**Real-world example:** Amazon's entire growth trajectory illustrates all four quadrants sequentially: Market Penetration (selling more books to US shoppers), Market Development (expanding books to new countries), Product Development (Kindle for existing Amazon customers), and Diversification (AWS — an entirely new product category for enterprise customers they had never served). Each move built on capabilities from the previous stage rather than leaping blindly.

**Key takeaway:** Most companies should exhaust market penetration before pursuing riskier quadrants. The most common strategic mistake is diversifying before the core market is fully harvested — burning resources on new bets while leaving money on the table in existing ones.` },
    { id: 134, name: "BCG Matrix", desc: `Large companies with multiple products face a hard allocation problem: which products get investment, which get maintained, and which get cut? The BCG Matrix provides a framework for those decisions using two variables: market growth rate and relative market share.

**How it works:** Four quadrants based on growth and share:
- **Stars** (high growth, high share): You're winning a fast-growing market. Invest heavily to maintain leadership. These become tomorrow's Cash Cows.
- **Cash Cows** (low growth, high share): Dominant in a mature market. They generate more cash than they need — harvest that cash to fund Stars.
- **Question Marks** (high growth, low share): The market is growing but you're not winning it yet. Decide: invest to become a Star, or exit before it becomes a Dog?
- **Dogs** (low growth, low share): Neither growing nor dominant. Consider divesting or harvesting remaining value.

**Real-world example:** Within Apple's portfolio: iPhone is the Cash Cow (dominant share, maturing smartphone market — milked to fund everything else). Apple Vision Pro is a Question Mark (new market, trajectory unknown). Apple Services is graduating from Question Mark toward Star. BCG thinking explains why Apple can afford to take 10-year bets on new categories — the iPhone is funding all of it.

**Key takeaway:** The BCG Matrix prevents two common errors: over-investing in Dogs (emotional attachment to legacy products) and under-investing in Stars (treating all products equally). Its limitation: share and growth don't fully capture competitive advantage — use it as a starting point, not a final verdict.` },
    { id: 135, name: "Product Lifecycle", desc: `Every product moves through a predictable arc: launch, grow, mature, decline. The strategy that creates success at launch will actively harm you at maturity — and marketers who don't recognize the transition pay for it.

**How it works:** Four stages with different strategic priorities:
- **Introduction:** Low sales, high costs, losses or thin margins. Goal: build awareness and trial. Pricing can be high (skimming early adopters) or low (penetration to capture share fast)
- **Growth:** Sales accelerating, competitors entering, brand differentiation becoming critical. Goal: maximize market share before the market consolidates
- **Maturity:** Sales plateau, competition fierce, margins under pressure. Goal: extend this phase — find new segments, geographies, or use cases. This is where most marketing budget gets spent
- **Decline:** Sales falling as substitutes emerge or tastes change. Goal: harvest remaining cash while managing cost structure down, or reinvent entirely

**Real-world example:** Physical DVDs followed this arc precisely. Growth in the late 1990s, maturity through the 2000s, decline beginning ~2010 as streaming emerged. Blockbuster stayed in maturity-mode strategy (more stores, more inventory, more late fees) while the product was already moving into decline. Netflix recognized the shift and repositioned aggressively — Blockbuster filed for bankruptcy in 2010; Netflix is now worth $300B+.

**Key takeaway:** The most dangerous moment is late maturity — it looks like stability but is actually the last window before decline accelerates. Companies that mistake maturity for permanence (Kodak, BlackBerry, Blockbuster) are always surprised by how quickly decline follows once a genuine substitute appears.` },
  ],
};
export default strategyPlanning;
