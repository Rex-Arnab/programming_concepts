const businessFundamentals = {
  name: "Business Fundamentals",
  icon: "🏗️",
  color: "#6366f1",
  concepts: [
    {
      id: 1537,
      name: "What Is a Business",
      desc: `**Business** — an organization that creates value by delivering products or services to customers in exchange for money. At its core, every business solves a problem someone is willing to pay to have solved.

**Founder lens:** Before building anything, validate that the problem is real, the customer will pay, and you can reach them. Thousands of startups fail not because they built bad products, but because they built for problems people won't pay to solve. "A startup is a temporary organization searching for a repeatable, scalable business model" (Steve Blank).

**Investor lens:** Investors back businesses that solve *painful* problems for a *large enough* market with a *defensible* solution. Clarity on all three is the baseline before any check is written.

**Key insight:** The best businesses feel inevitable in hindsight — they solved a problem that was always there but nobody had attacked the right way. Ask: why now, why us, why this solution?`,
    },
    {
      id: 1538,
      name: "Business Model",
      desc: `**Business Model** — the framework describing how a company creates, delivers, and captures value. It answers: who is the customer, what value do we deliver, how do we reach them, and how do we make money?

**Founder lens:** Common models include SaaS (recurring subscription), marketplace (take rate on transactions), transactional (one-time sale), freemium (free tier converts to paid), and advertising (attention monetized by advertisers). Your model determines your unit economics, sales motion, and scalability ceiling. Choose early, validate fast.

**Investor lens:** SaaS and marketplace businesses are highly valued because of recurring revenue and network effects respectively. Investors scrutinize whether the business model is defensible and whether the unit economics improve with scale (positive contribution margin, decreasing CAC, increasing LTV).

**Key insight:** The business model is not just "how we charge" — it's the entire logic of value creation and capture. A great product with a broken business model will fail. A mediocre product with a great model can win (see: most enterprise software).`,
    },
    {
      id: 1539,
      name: "Value Proposition",
      desc: `**Value Proposition** — the specific bundle of benefits a company delivers to customers. The clearest test: what problem does your product solve, for whom, and why better than the alternative?

**Founder lens:** A strong value proposition is specific, not generic. "We help [customer segment] do [job] better/faster/cheaper than [alternative] by [your key differentiation]." Avoid "we make X easier" — be precise about the mechanism. Your value prop drives your positioning, pricing, and marketing.

**Investor lens:** Investors look for a "hair on fire" problem — not just a nice-to-have. The stronger the pain and the clearer the relief, the better. A value prop that resonates with 1% of a huge market is more compelling than a vague claim that could apply to everyone.

**Key insight:** The value proposition is a hypothesis. It needs to be validated with real customer conversations before you build — not after. The Product-Market Fit journey is the process of iterating your value proposition until it clicks.`,
    },
    {
      id: 1540,
      name: "Product-Market Fit (PMF)",
      desc: `**Product-Market Fit** — the degree to which your product satisfies a strong market demand. Marc Andreessen's definition: "being in a good market with a product that can satisfy that market." When you have PMF, growth feels like a wave you're riding, not a hill you're pushing up.

**Founder lens:** Sean Ellis's survey test: ask users "how would you feel if you could no longer use this product?" If 40%+ say "very disappointed," you likely have PMF. Other signals: organic word-of-mouth, high retention, users pulling the product into their organizations. Before PMF, focus entirely on finding it — don't scale sales, don't over-hire.

**Investor lens:** PMF is the primary gating factor for Series A investment. Revenue alone doesn't prove it — retention and NPS do. Investors look for retention curves that flatten (not die), not just hockey-stick growth (which can be manufactured with spend).

**Key insight:** PMF is not a switch that flips on — it's a spectrum. "Weak PMF" means some users love you. "Strong PMF" means they'd riot if you went away. Most companies raise a Series A with weak PMF and pay for it later with high churn.`,
    },
    {
      id: 1541,
      name: "Total Addressable Market (TAM, SAM, SOM)",
      desc: `**TAM/SAM/SOM** — three concentric circles for sizing a market. TAM (Total Addressable Market) = the full revenue opportunity if you captured 100% of the market. SAM (Serviceable Addressable Market) = the portion you can realistically reach with your current model. SOM (Serviceable Obtainable Market) = what you can realistically capture in the near term.

**Founder lens:** A large TAM ($1B+) signals to investors that the opportunity justifies venture returns. But don't fabricate TAM by over-generalizing ("everyone who uses a computer"). Use bottoms-up sizing: number of customers × annual contract value. Be able to defend every assumption.

**Investor lens:** VCs need the TAM to justify a fund-returning outcome. A $10M TAM can't produce a $1B company. They look for defensible bottoms-up sizing — not consultant-style "X% of a $500B industry." They also want to see a credible path from SOM to SAM to TAM.

**Key insight:** It's better to own 30% of a $500M market than 1% of a $10B market. Focus beats breadth at early stage. Nail the beachhead market, then expand.`,
    },
    {
      id: 1542,
      name: "Competitive Moat",
      desc: `**Competitive Moat** — a durable, structural advantage that protects your business from competition. Warren Buffett coined the term — a moat makes it hard for competitors to take your customers even if they copy your product.

**Founder lens:** The five classic moats: network effects (product gets more valuable as more people use it), switching costs (painful to leave), economies of scale (cheaper per unit at volume), brand (trust and preference), proprietary data/technology (hard to replicate). For startups, network effects are the holy grail — but most don't have them. Switching costs and data moats are achievable earlier.

**Investor lens:** The absence of a credible moat is a red flag at Series B+. "We're better" is not a moat — that's just a temporary lead. Investors assess: will this lead compound or erode? What happens when a well-funded competitor enters?

**Key insight:** Most early-stage startups don't have a moat — they have a head start. The job in the first 3 years is to convert that head start into a structural moat before well-capitalized competitors catch up.`,
    },
    {
      id: 1543,
      name: "Unit Economics",
      desc: `**Unit Economics** — the revenue and cost associated with a single "unit" of business (one customer, one transaction, one subscription). The key metrics: LTV (lifetime value), CAC (customer acquisition cost), and their ratio.

**Founder lens:** LTV:CAC > 3:1 and CAC payback < 18 months are the baseline benchmarks for a healthy SaaS business. Below 1:1 means you lose money on every customer — no amount of growth fixes this. Improve LTV by increasing retention and expansion revenue. Reduce CAC through referrals, content, and product-led virality.

**Investor lens:** At seed, investors accept that unit economics are unproven. At Series A, they need to see a credible path. At Series B+, they expect demonstrated LTV:CAC > 3x with improving payback. "Show me your cohort retention" is the key question — it reveals the true economics better than blended averages.

**Key insight:** Blended averages lie. A startup with great unit economics from organic customers and terrible economics from paid customers looks average in aggregate. Always break down economics by acquisition channel.`,
    },
    {
      id: 1544,
      name: "Go-to-Market Strategy (GTM)",
      desc: `**Go-to-Market Strategy** — the plan for how you will reach your target customers and deliver your value proposition. It covers: who you're selling to, how you'll reach them, what you'll say, and how deals get closed.

**Founder lens:** The three main GTM motions: product-led (users discover, try, and buy without a salesperson — think Slack, Figma), sales-led (outbound or inbound SDR/AE motion for higher-touch enterprise deals), and marketing-led (content, brand, community driving inbound). Your GTM must match your ACV (average contract value) — a $500/yr product can't afford a full enterprise sales cycle.

**Investor lens:** GTM is often underbuilt at early stage. Investors look for evidence that the founder knows exactly how the first 100 customers will be acquired and what that repeatable motion looks like. "We'll go viral" is not a GTM strategy.

**Key insight:** The best GTM is the one that matches your buyers' buying behavior, not what you're comfortable with. Enterprise software buyers don't want a free trial — they want a POC, security review, and executive sponsor.`,
    },
    {
      id: 1545,
      name: "B2B vs B2C vs B2B2C",
      desc: `**B2B / B2C / B2B2C** — three primary business orientations. B2B (Business-to-Business): sells to companies. B2C (Business-to-Consumer): sells directly to individuals. B2B2C: sells to businesses who then serve consumers (e.g., Stripe for e-commerce).

**Founder lens:** B2B has higher ACVs, longer sales cycles, and more rational buyers. B2C has massive scale potential but brutal CAC economics and irrational/emotional buyers. B2B2C is powerful because you get enterprise distribution with consumer-scale usage. Know which you are — mixed models confuse the team and investors.

**Investor lens:** B2B SaaS has been the dominant VC-friendly model because of recurring revenue, enterprise contracts, and expansion potential. B2C requires proof of a viral growth loop or network effect — pure paid acquisition economics rarely pencil out at scale. B2B2C is valued when the platform company becomes infrastructure.

**Key insight:** Most successful consumer businesses are more like B2B2C than pure B2C — they found a business buyer (employers, media companies, retailers) to distribute to consumers at scale. DTC is notoriously hard without a hook that makes CAC economics work.`,
    },
    {
      id: 1546,
      name: "Network Effects",
      desc: `**Network Effects** — a phenomenon where a product or service becomes more valuable as more people use it. The classic example: a fax machine is worthless alone, valuable when millions have one.

**Founder lens:** There are several types: direct (more users = more value for all users — WhatsApp, Telegram), indirect (more users attract more supply-side participants — Airbnb, Uber), data (more usage improves the product's intelligence — Google, Waze), and marketplace liquidity (more buyers attract more sellers). Build for the type that fits your model.

**Investor lens:** Network effects are the strongest moat. They create compounding value and defensive barriers simultaneously. Investors will pay enormous premiums for businesses with genuine network effects vs those with simple switching costs. The key test: does the product *measurably* get better for existing users as new users join?

**Key insight:** Most "network effects" claimed by startups are actually just "brand" or "distribution." True network effects are demonstrable — you can show in data that retention or engagement improves as the network grows. False network effects don't survive competitive pressure.`,
    },
    {
      id: 1547,
      name: "Business Model Canvas",
      desc: `**Business Model Canvas** — a one-page strategic framework (Alex Osterwalder) with 9 building blocks: Customer Segments, Value Propositions, Channels, Customer Relationships, Revenue Streams, Key Resources, Key Activities, Key Partnerships, Cost Structure.

**Founder lens:** Use it to stress-test your assumptions before building. Fill it in fast, then identify your riskiest assumptions and go test them with real customers. It's a design tool, not a finished document — update it as you learn. Most useful in early-stage ideation and pivots.

**Investor lens:** Investors rarely see a Canvas, but the thinking it requires maps directly to pitch deck slides. If you can't articulate each block clearly, your strategy has holes. Founders who've done this exercise tend to give cleaner, more credible answers in due diligence.

**Key insight:** The Canvas is most valuable for identifying interdependencies — changing your Revenue Streams usually requires changing your Channels and Customer Relationships too. It surfaces these cascading effects that linear business plans miss.`,
    },
    {
      id: 1548,
      name: "Revenue Streams",
      desc: `**Revenue Streams** — the specific mechanisms by which a company generates money from its customer segments. Different from "revenue model" — this is the tactical "how money flows in."

**Founder lens:** Common streams: subscription fees, usage/consumption fees, licensing fees, transaction fees (take rates), professional services, advertising, freemium upgrades, data licensing. Multi-stream businesses are more resilient but harder to optimize. Startups should pick one primary stream and nail it before diversifying.

**Investor lens:** Recurring revenue (subscriptions, retainers) trades at a premium over transactional revenue because of predictability. Gross margin matters as much as revenue — a 90% gross margin SaaS business is worth far more than a 20% gross margin services business at the same revenue.

**Key insight:** "Revenue-first" vs "land-and-expand" are different strategies with different implications. Charging from day one proves willingness to pay. Giving away for free to grow fast assumes you'll be able to monetize later — which is much harder than it sounds.`,
    },
  ],
};

export default businessFundamentals;
