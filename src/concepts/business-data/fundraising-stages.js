const fundraisingStages = {
  name: "Fundraising Stages",
  icon: "📈",
  color: "#8b5cf6",
  concepts: [
    {
      id: 1559,
      name: "Bootstrapping",
      desc: `**Bootstrapping** — building a company without external equity investment, funded by founder savings, early customer revenue, and cash flow. The opposite of the VC-backed path.

**Founder lens:** Bootstrapping forces revenue focus and capital discipline from day one. Without a runway clock, you're freed from investor timelines but constrained by cash. Best suited for: businesses with quick time-to-revenue, founders who value control, markets that don't require winner-take-all speed. Shopify, Basecamp, Mailchimp, and GitHub were all bootstrapped to meaningful scale.

**Investor lens:** Bootstrapped companies that come to raise later often have better economics, clearer customer understanding, and more leverage in negotiations. A $5M ARR bootstrapped company can raise a growth round at significantly better terms than a VC-backed company of the same revenue size with massive burn.

**Key insight:** Bootstrapping is not about being anti-VC — it's about optimizing for control and profitability. If your market has network effects or first-mover advantages that require blitzscaling, you likely need VC. If speed isn't existential, bootstrapping preserves more of what you built.`,
    },
    {
      id: 1560,
      name: "Friends & Family Round",
      desc: `**Friends & Family Round** — early capital raised from personal networks before institutional investors are involved. Typically $25K-$500K in total, at very early-stage or even pre-incorporation.

**Founder lens:** Friends & family capital is the most accessible but comes with personal relationship risk. Be honest about the risk of total loss — most startups fail, and these investors' money goes with them. Use simple instruments (SAFE notes, not equity) to avoid complex cap table issues. Never raise more than you need, and never raise from someone who can't afford to lose it.

**Investor lens:** A friends & family round signals founder resourcefulness and early conviction. It's rarely scrutinized in due diligence unless the terms are unusual. The bigger concern: overly complex cap tables with many small investors at this stage create future friction (lots of signatures needed for future rounds).

**Key insight:** Don't let the "friends & family" label make you sloppy. These are real investors with real legal rights. Use proper documentation (SAFE notes, not handshakes), disclose the risk clearly in writing, and treat them with the same professionalism you'd give a professional investor.`,
    },
    {
      id: 1561,
      name: "Seed Funding",
      desc: `**Seed Funding** — the first significant round of external funding, typically from angels and seed funds. Typical check size: $500K-$3M. Round size: $1M-$5M. Used to build product, hire initial team, and find PMF.

**Founder lens:** At seed, you're selling the future — your vision, team, and thesis — not your metrics. Seed rounds are increasingly competitive: top seed funds (Homebrew, Precursor, Hustle Fund, etc.) see thousands of decks. Warm intros close the gap dramatically. Lead investors set the terms; other investors follow. Find a lead first.

**Investor lens:** Seed investors take the most risk — they invest in the team and idea before PMF is proven. They expect a small percentage to return the fund (power law). The key question: is this team uniquely positioned to solve this problem, and is the market large enough to matter?

**Key insight:** A seed round buys 18-24 months of runway. Spend it obsessively on finding PMF and achieving the milestones that make your Series A fundable: ideally $1-2M ARR with strong retention for SaaS. If you can't define those milestones clearly, don't raise seed yet.`,
    },
    {
      id: 1562,
      name: "Series A",
      desc: `**Series A** — the first institutional round, typically from tier-1 or tier-2 VC firms. Typical round: $5M-$20M. You should have PMF evidence, some revenue, and a repeatable growth loop. This round funds scaling the proven model.

**Founder lens:** The Series A bar has risen significantly. The median Series A company in 2024 has $1-2M ARR with strong retention. You need a clear answer to: "what did you prove at seed?" and "how will this $15M turn into $5M ARR?" VCs will do deep diligence — customer calls, cohort analysis, team reference checks.

**Investor lens:** Series A is pattern matching + conviction. VCs look for: strong metrics (LTV:CAC > 3x, net revenue retention > 110% for SaaS), a repeatable sales motion, and a team that can scale from 10 to 50 people. One tier-1 Series A lead can set the company's trajectory for a decade.

**Key insight:** The most common Series A failure mode: founders raise before they have a repeatable customer acquisition engine. Getting 10 customers through founder hustle is not the same as having a scalable go-to-market. Investors know the difference.`,
    },
    {
      id: 1563,
      name: "Series B",
      desc: `**Series B** — a growth round to scale an already-working business. Typical round: $20M-$75M. The company has product-market fit, proven unit economics, and is now focused on accelerating customer acquisition and expanding the team.

**Founder lens:** By Series B, the company should have a repeatable go-to-market motion, a scaling sales team, and clear metrics (ARR growth rate > 3x YoY is the informal "triple, triple, double, double, double" benchmark). The diligence at this stage is intense — financial audits, customer references at scale, competitive landscape analysis.

**Investor lens:** Series B investors are essentially buying a stake in a company that has de-risked the product and GTM but still needs to prove it can scale operations, culture, and revenue simultaneously. They're evaluating whether the team can make the transition from "founder-led everything" to "professional management."

**Key insight:** Series B is where "founder-led sales" must transition to a scalable sales organization. Founders who can't let go of deals and delegate to VP Sales often stall their own companies at this stage. Hiring a great VP Sales before you need one is the right call.`,
    },
    {
      id: 1564,
      name: "Series C and Growth Rounds",
      desc: `**Series C and Growth Rounds** — late-stage institutional rounds ($75M-$500M+) funding market expansion, international growth, M&A, or pre-IPO optimization. Investors include growth equity firms (General Atlantic, Tiger Global) alongside traditional VCs.

**Founder lens:** At Series C, you're operating a real company: hundreds of employees, multi-product, multiple geographies. The challenges shift from "will this work?" to "can we scale operations, culture, and execution across a much larger organization?" Rounds at this stage often include secondary components — founders and early investors can sell some equity.

**Investor lens:** Growth investors at Series C are more financial than operators — they look at growth rate, ARR, net revenue retention, gross margins, and cash efficiency rather than early-stage narrative. Valuation multiples compress meaningfully from 2021 highs; 2024 SaaS growth rounds at 10-15x ARR are common.

**Key insight:** Series C is often where founders realize the company has grown beyond their direct control. The best founders embrace this and build great leadership teams. The worst founders try to stay in every decision and become organizational bottlenecks.`,
    },
    {
      id: 1565,
      name: "Bridge Rounds",
      desc: `**Bridge Rounds** — small funding rounds between larger rounds, used to extend runway when a company isn't quite ready for its next full round. Often structured as SAFE notes or convertible notes.

**Founder lens:** A bridge is not a victory lap — it means your Series A milestones weren't met, or market conditions changed. The best bridges are short (3-6 months) with a clear plan to hit a specific milestone before the next raise. Existing investors bridging you is a positive signal. Needing to find new investors for a bridge is a red flag that will follow you.

**Investor lens:** Bridges are common and not inherently negative, but the context matters. An investor bridging to a known outcome (contract signed, specific metric in sight) is different from bridging an aimless company hoping things turn around. The bridge terms should be favorable to bridge investors — at minimum, a discount or interest rate on conversion.

**Key insight:** Never raise a bridge without a specific, measurable milestone and a clear timeline. "We're raising a bridge to extend runway while we find product-market fit" is the bridge to nowhere. "We're bridging to close our first enterprise contract in 90 days" is fundable.`,
    },
    {
      id: 1566,
      name: "Bootstrapped to Venture (Hybrid Path)",
      desc: `**Bootstrapped-to-Venture** — a strategy where founders bootstrap long enough to achieve meaningful traction, then raise VC from a position of strength rather than necessity.

**Founder lens:** This path offers the best of both worlds: you validate the idea without dilution, build a product customers love, and then raise at a much higher valuation with more leverage. Risks: the market may move faster than your bootstrap pace allows, and talented employees are harder to attract without equity upside during bootstrapped phase.

**Investor lens:** Companies that come to VCs after bootstrapping to $2-5M ARR are among the most attractive investments. The proof of concept is done, the team is lean, and the founders have demonstrated discipline. These deals often happen at 40-60% higher valuations than comparable companies that raised seed early.

**Key insight:** The moment to raise venture is when you've proven the model and capital is the only constraint on growth — not before. "We need money to build the product" is a weak position. "We have $2M ARR growing 20% MoM and need capital to hire a sales team to close our pipeline" is an excellent position.`,
    },
    {
      id: 1567,
      name: "IPO (Initial Public Offering)",
      desc: `**IPO** — the process by which a private company issues shares to the public for the first time, listing on a stock exchange (NYSE, NASDAQ). The ultimate liquidity event for founders, employees, and investors in most VC-backed companies.

**Founder lens:** An IPO is not an exit — it's a financing event with new obligations. Public company life means quarterly earnings calls, SEC filings, analyst coverage, and the relentless pressure of short-term shareholders. Companies typically need $100M+ in ARR, strong growth, and profitability-adjacent metrics (or a credible path) to IPO successfully.

**Investor lens:** The IPO is where VC funds achieve liquidity on their largest wins. Lock-up periods (typically 180 days) mean investors can't sell immediately. Post-IPO performance often diverges from private valuations — many 2021 IPOs traded down 70-90% from their peaks.

**Key insight:** IPO prep takes 12-18 months minimum. The difference between a great IPO and a stumbling one often comes down to financial discipline built 3+ years prior. Companies that didn't build proper financial controls, forecasting, and legal infrastructure as a private company pay dearly in the public scrutiny of an IPO.`,
    },
    {
      id: 1568,
      name: "Acquisition (M&A Exit)",
      desc: `**Acquisition** — the purchase of a company by another company or private equity firm. The most common exit path for venture-backed startups, especially those that achieve strong product-market fit but face competitive headwinds at scale.

**Founder lens:** Acquisitions are usually initiated by buyers, not sellers. The best way to get acquired is to build something so valuable that buyers come to you. Never put yourself in a "we need to sell" position — desperation kills price. Most acquisitions take 6-12 months from initial conversation to close and are emotionally exhausting.

**Investor lens:** M&A exits range from "acqui-hire" (buying the team, often below capital invested) to strategic acquisitions (2-10x revenue multiples) to full-price strategic exits (10-20x+ for companies with unique technology or market position). The distribution of outcomes is extremely skewed — 80% of VC exits are M&A, but most returns come from the few IPOs and large acquisitions.

**Key insight:** The best time to sell is when you don't need to. Build relationships with potential acquirers years before you need them as a buyer. A Google or Salesforce exec who knows your company and respects your work is worth more than an investment banker who cold-emails a list.`,
    },
    {
      id: 1569,
      name: "Equity Crowdfunding",
      desc: `**Equity Crowdfunding** — raising small amounts of equity capital from a large number of individual investors via platforms like Republic, Wefunder, or StartEngine. Regulated in the US under Regulation Crowdfunding (Reg CF) and Regulation A+.

**Founder lens:** Reg CF allows raising up to $5M per year from non-accredited investors. Reg A+ allows up to $75M. Benefits: builds community, creates evangelists, no single investor has significant control. Downsides: significant legal/compliance costs, cap table complexity with hundreds of small investors, ongoing reporting requirements.

**Investor lens:** Traditional VCs are generally skeptical of equity crowdfunding on the cap table — too many small investors creates friction for future rounds (signature requirements, pro-rata management). Increasingly, SPVs aggregate crowdfunding investors into a single vehicle to reduce this friction.

**Key insight:** Equity crowdfunding works best for consumer brands where your customers become your investors and advocates. It's a marketing event as much as a financing event. For deep B2B tech, the overhead rarely justifies the capital raised.`,
    },
    {
      id: 1570,
      name: "Revenue-Based Financing",
      desc: `**Revenue-Based Financing (RBF)** — a non-dilutive funding model where investors provide capital in exchange for a fixed percentage of future revenues until a predetermined repayment cap (typically 1.5-3x the principal) is reached. No equity, no board seat.

**Founder lens:** RBF is ideal for companies with predictable recurring revenue (SaaS, subscription e-commerce) that want capital without dilution. Common providers: Clearco, Pipe, Capchase. Drawback: repayment begins immediately as a % of revenue, reducing near-term cash flow. Better for growth than for early survival.

**Investor lens:** RBF doesn't compete with equity — it's a different instrument for different needs. Companies with strong ARR can use RBF to fund growth without diluting equity, then raise a larger equity round from a stronger position. VCs view responsible RBF use as a sign of financial sophistication.

**Key insight:** RBF is essentially a revenue-sharing loan, not free money. Model out your cash flow carefully — if repayments slow your team growth or marketing significantly, the tradeoff may not be worth the non-dilutive benefit. Compare it to the dilution cost of an equity round at your current valuation.`,
    },
  ],
};

export default fundraisingStages;
