const angelsVc = {
  name: "Angels & Venture Capital",
  icon: "💰",
  color: "#f59e0b",
  concepts: [
    {
      id: 1571,
      name: "Angel Investors",
      desc: `**Angel Investors** — high-net-worth individuals who invest personal capital in early-stage startups, typically in exchange for equity or convertible instruments. Angels often invest at seed or pre-seed stages before institutional VCs engage.

**Founder lens:** Angels are valuable beyond their capital — look for angels with operational expertise in your domain, warm network connections to customers and future investors, and willingness to provide advice without micromanaging. Bad angels: those who treat a $25K investment like they own the company, demand excessive updates, or undermine future investor relationships.

**Investor lens:** From an angel's perspective, this is high-risk, illiquid investing. Expect 7-10 year hold periods, high loss rates, and returns concentrated in 1-2 deals out of every 10. Angels who don't expect this lose patience and become bad investors.

**Key insight:** The best angels are former successful founders. They understand the journey, know the right questions to ask without demoralizing, and can open doors that matter. One intro from a domain-relevant angel can be worth more than the check itself.`,
    },
    {
      id: 1572,
      name: "Angel Networks & Syndicates",
      desc: `**Angel Networks & Syndicates** — organized groups of angels who co-invest in deals, pooling capital and diligence. Networks: groups with shared membership criteria (e.g., Band of Angels, Tech Coast Angels). Syndicates: one lead investor brings a deal to followers via platforms like AngelList.

**Founder lens:** Syndicates let you raise from 50+ angels through one relationship (the syndicate lead). The lead does the diligence and sets the terms; followers invest alongside. Benefits: fast, standardized, minimal negotiation. AngelList SPVs aggregate all syndicate investors into a single cap table entry. Highly efficient for founders.

**Investor lens:** Running a syndicate requires deal flow, reputation, and investor trust. Syndicate leads typically earn 20% carry on profits. The lead's reputation is their brand — they only back deals they genuinely believe in (or should).

**Key insight:** For hot deals, the right syndicate lead can move $500K-$2M in 48 hours. Access to quality deal flow is the syndicate lead's moat. For founders, getting on a top syndicate lead's radar requires the same approach as any investor: warm intro or outstanding reputation.`,
    },
    {
      id: 1573,
      name: "Venture Capital Fundamentals",
      desc: `**Venture Capital** — a form of private equity financing provided to startups with high growth potential in exchange for equity. VCs manage pooled funds contributed by institutional and wealthy individual limited partners (LPs).

**Founder lens:** VCs are not banks or charities — they have a fiduciary duty to return capital to their LPs. This means they need a small number of companies to return the fund (typically 3x+). A $100M fund needs to return $300M. This math drives VC behavior: they only invest in companies that could plausibly be worth $500M+. Understanding their return math makes their behavior comprehensible.

**Investor lens:** VC is a power law business. The top 10-20 firms generate the majority of returns. Performance of the rest is mediocre on a risk-adjusted basis. The fund-of-fund data shows that LP money is better deployed in top-quartile VC than average VC, but top-quartile access is hard to get.

**Key insight:** VCs invest in "outliers" — companies that can return their entire fund. This means a company with a 90% chance of returning 3x and a 10% chance of returning 50x is more attractive to VCs than a company with a 90% chance of returning 5x. Embrace the power law implications of this if you're targeting venture returns.`,
    },
    {
      id: 1574,
      name: "LP/GP Structure",
      desc: `**LP/GP Structure** — the legal and economic framework of a VC fund. General Partners (GPs) are the fund managers who make investment decisions. Limited Partners (LPs) are the capital providers — pension funds, endowments, family offices, funds-of-funds, corporations.

**Founder lens:** Understanding the fund structure explains VC incentives. GPs earn a 2% annual management fee on committed capital plus 20% carried interest on profits. This means a $300M fund generates $6M/year in management fees and 20% of every dollar of profit above the hurdle rate. GPs need wins to raise their next fund.

**Investor lens:** LPs commit to multi-year funds (10-year typical life, often extended). They receive quarterly reports and annual LP meetings. LP/GP power dynamics have shifted — LPs have become more demanding on fees, governance, and ESG as the asset class has matured.

**Key insight:** A VC firm is itself a startup. Managing Partner GPs need to show enough early momentum to raise Fund II. This creates urgency in their early deployment decisions. A GP who doesn't deploy capital can't demonstrate performance, which risks the firm's ability to fundraise. This timeline pressure often explains their urgency in deal processes.`,
    },
    {
      id: 1575,
      name: "VC Fund Economics (2/20 Model)",
      desc: `**2/20 Model** — the standard fee structure for a VC fund: 2% annual management fee on committed capital, plus 20% carried interest (carry) on profits above the hurdle rate (typically 8% preferred return to LPs).

**Founder lens:** This structure means VCs are paid to manage money AND to make money. The management fee covers operations; the carry is the incentive. A $200M fund generates $4M/year in fees — enough to pay salaries and expenses regardless of performance. The real wealth for GPs comes from carry in successful funds.

**Investor lens:** Top-tier VCs (a16z, Sequoia, Benchmark) charge 2.5/30 or more. Emerging managers often do 2/20 or even 1.5/20 to attract LPs. The economics favor GPs heavily in hot markets (2020-2021) and expose LPs to poor risk-adjusted returns in down markets (2022-2023 vintage).

**Key insight:** Carried interest is the GP's "lottery ticket" — they only pay it on fund profits. If a $300M fund returns $600M, the GP earns 20% of the $300M profit = $60M in carry (split among partners). This alignment of interests is the intended design, but it also means GPs have incentive to swing for moonshots even at the cost of higher fund volatility.`,
    },
    {
      id: 1576,
      name: "VC Investment Thesis",
      desc: `**Investment Thesis** — a VC firm's articulated belief about what kinds of companies, markets, and technologies will produce outsized returns. It guides which deals they pursue, what check size they write, and at what stage.

**Founder lens:** Research the thesis of every VC you pitch. Pitching a B2B SaaS company to a fund that only invests in consumer apps wastes everyone's time. Most VC theses are publicly stated — read their portfolio, their blog posts, and their Twitter/Substack. Tailor your pitch to resonate with their specific thesis language and focus areas.

**Investor lens:** A clear thesis helps GPs stand out to LPs and gives associates a filter for deal sourcing. "We invest in the future of work" is generic. "We invest in infrastructure for the AI-native enterprise, specifically companies that own proprietary training data" is specific enough to guide decisions.

**Key insight:** The best VCs have conviction-led theses, not consensus-following ones. Being early to a thesis (before it's obvious) is how great venture returns are generated. A VC saying "we invest in AI" in 2024 is following the crowd; one who said it in 2019 generated real returns.`,
    },
    {
      id: 1577,
      name: "Due Diligence",
      desc: `**Due Diligence (DD)** — the comprehensive review process VCs conduct before making an investment. Covers: business/product review, market analysis, financial review, reference checks, legal/IP review, and team assessment.

**Founder lens:** Prepare for due diligence before you need it. Maintain a data room with: financials (P&L, balance sheet, cap table), product metrics (cohort retention, NPS, DAU/MAU), customer references (3-5 happy customers who can speak to your product's value), legal documents (incorporation, IP assignments, prior agreements), and competitive analysis. The faster you can respond, the more professional you appear.

**Investor lens:** The depth of DD is proportional to check size and stage. Seed DD is 1-2 weeks, mostly reference calls and market research. Series A DD is 4-8 weeks, including deep customer calls, financial model review, and technical due diligence. A red flag that surfaces in DD doesn't automatically kill a deal, but unexplained discrepancies between pitch claims and data room reality will.

**Key insight:** Due diligence is a two-way process. While investors diligence you, you should diligence them: talk to their portfolio founders (including those who had bad outcomes), understand how they behave when things go wrong, and evaluate whether their network and expertise actually helps your business.`,
    },
    {
      id: 1578,
      name: "Deal Flow & Sourcing",
      desc: `**Deal Flow** — the stream of investment opportunities that VCs evaluate. Top firms receive thousands of inbound pitches per year. Deal sourcing is how VCs proactively identify companies before they're widely known.

**Founder lens:** Getting into a VC's deal flow without a warm intro is very hard. Cold emails have <5% response rates at top firms. The most effective paths: portfolio founder referrals (highest conversion), mutual investor/angel referrals, demo days (YC, Techstars, emerging accelerators), and exceptional online presence (viral launch, open-source reputation, influential blog).

**Investor lens:** The best deals often aren't on AngelList or Crunchbase — they come through trusted networks. VCs invest heavily in community building (programs, events, founder networks) specifically to source deals before they're competitive. Proprietary deal flow is a VC's competitive advantage.

**Key insight:** If you've built something impressive, VCs will find you. The best startups are pulled into VC offices by referrals, not pushed in through cold outreach. Spend 90% of your fundraising energy building something that generates inbound interest, and 10% on outreach.`,
    },
    {
      id: 1579,
      name: "Portfolio Construction",
      desc: `**Portfolio Construction** — a VC's strategy for how many companies to invest in, at what stages, with what ownership targets, and how to reserve capital for follow-on rounds.

**Founder lens:** Understanding portfolio construction explains follow-on behavior. A fund that targets 10% ownership in 30 companies needs to reserve significant capital for follow-ons to maintain ownership as companies grow. A VC who "passes on" your B round may not dislike the company — they may simply be out of capital to deploy.

**Investor lens:** Standard seed fund portfolio: 30-50 companies, $50-200K checks, targeting 5-10% initial ownership. Series A portfolios: 15-25 companies, $5-15M checks, targeting 10-20% ownership. Reserve ratios (% of fund kept for follow-ons) typically range from 40-60%.

**Key insight:** Pro-rata rights (the right to invest in future rounds at your current ownership %) are one of the most valuable terms in an early investment. A $100K seed check with pro-rata in a company that becomes Uber is worth far more than the $100K implies, because you can follow that $100K with millions in later rounds.`,
    },
    {
      id: 1580,
      name: "Accelerators & Incubators",
      desc: `**Accelerators & Incubators** — programs that provide early-stage startups with capital, mentorship, office space, and network access, typically in exchange for equity (2-10%). Accelerators have a defined cohort and demo day; incubators are longer-term and less structured.

**Founder lens:** Y Combinator (YC) is the gold standard — their alumni network, investor relationships, and brand create a measurable premium at fundraising. Post-YC companies raise at 30-50% higher valuations than comparable companies. Other strong programs: Techstars, Pioneer, On Deck. The program is the network, not the mentorship — choose based on the quality of alumni connections in your sector.

**Investor lens:** YC's stamp signals that the company passed a rigorous selection process with a track record of identifying winners. YC-branded companies raise seed rounds faster and at better terms. The alumni network also creates proprietary sourcing for investors with YC relationships.

**Key insight:** The equity you give to an accelerator is worth it if and only if the accelerator network materially improves your outcome. For YC, the math almost always works. For second-tier accelerators, model it carefully — 6% equity at a $2M post-money is $120K of value you need to get back through the program's benefits.`,
    },
    {
      id: 1581,
      name: "Corporate Venture Capital (CVC)",
      desc: `**Corporate Venture Capital (CVC)** — investment arms of large corporations (Google Ventures, Salesforce Ventures, Intel Capital, Microsoft M12) that invest in startups, primarily for strategic rather than purely financial returns.

**Founder lens:** CVC investment can open doors — access to the parent company's customers, distribution channels, enterprise contracts, and technical resources. But CVCs come with strategic alignment requirements that can limit your flexibility. A CVC from Competitor X can scare off other potential acquirers. Read the strategic implications carefully.

**Investor lens:** CVCs are "smart money" when the strategic fit is obvious and the terms are market-rate. They're dangerous when their investment creates conflicts of interest with the founder's long-term optionality (limiting acquisition conversations, creating information disclosure concerns). Traditional VCs view CVC co-investors with caution.

**Key insight:** "Don't take money from your acquirer or your competitor" is a reasonable rule of thumb. A CVC check from Google may feel like validation, but it may also signal to Apple and Microsoft that you're "Google's company" — reducing your strategic optionality significantly. Evaluate the CVC relationship for what it truly gives you, not just the validation feeling.`,
    },
    {
      id: 1582,
      name: "VC Signaling & Social Proof",
      desc: `**VC Signaling** — the information conveyed to the market by which investors choose (and decline) to back a company. A Sequoia or a16z lead signals quality; an early investor's failure to follow on signals concern.

**Founder lens:** Investor signaling cuts both ways. Having a top-tier lead investor dramatically increases inbound from other top-tier investors. Having a known "tourist investor" (one who invests sporadically without sector expertise) can actually make other investors less interested. Be selective about your first institutional check — it sets the tone for the cap table.

**Investor lens:** Signaling risk is why some investors prefer to lead or not invest at all. If Benchmark passes on the Series A of a company where they have Series Seed, the market reads that as a negative signal. This creates pressure to follow on even when internal conviction is medium, to avoid sending a damaging signal.

**Key insight:** "Signal carefully" applies to founders too. Reaching out to 200 investors simultaneously via mass email signals "nobody has committed yet" — the reverse of your intention. Create FOMO through scarcity (1-2 term sheets in hand, closing round soon) not through bulk outreach. Warm, sequential intros are always better than blast campaigns.`,
    },
  ],
};

export default angelsVc;
