const startingABusiness = {
  name: "Starting a Business",
  icon: "🚀",
  color: "#3b82f6",
  concepts: [
    {
      id: 1549,
      name: "Ideation & Problem Validation",
      desc: `**Ideation & Problem Validation** — the process of identifying a real problem worth solving before committing to building a solution. The most common startup failure: building something nobody wants.

**Founder lens:** Validate the problem before the solution. Do 50+ customer discovery interviews. Ask about their existing behavior, not their hypothetical desire for your product. "Would you use X?" is useless — "walk me through how you handle Y today" reveals the truth. Rob Fitzpatrick's "The Mom Test" is the handbook.

**Investor lens:** Investors at pre-seed and seed invest in problem clarity as much as solution clarity. Founders who've done deep customer discovery have sharper theses, more confident pitches, and better product instincts. The biggest red flag: founders who've never talked to customers.

**Key insight:** You're not validating your idea — you're validating the problem's severity and frequency. A severe problem that only happens once a year may not be worth solving. An annoying problem that happens daily is a business.`,
    },
    {
      id: 1550,
      name: "Minimum Viable Product (MVP)",
      desc: `**Minimum Viable Product (MVP)** — the simplest version of your product that lets you test your core hypothesis with real users and collect validated learning. Not a half-finished product — a complete test of one key assumption.

**Founder lens:** The MVP's job is to answer a specific question, not to impress. A landing page that collects emails is an MVP for "do people want this?" A concierge service (manual work behind a slick interface) is an MVP for "will people pay and retain?" Build the minimum to learn the maximum. Resist the urge to polish before you've proven the core.

**Investor lens:** Investors want to see evidence of learning from an MVP, not just that one was built. What did you discover? What did you change as a result? A founder who says "we built MVP v1, learned X, iterated to v2, and now see Y retention" demonstrates scientific thinking — exactly what early-stage investors fund.

**Key insight:** The word "viable" is as important as "minimum." An MVP that doesn't actually solve the problem enough for someone to adopt it produces false negatives (you'll think the idea is bad when really your execution was too low-fidelity).`,
    },
    {
      id: 1551,
      name: "Business Entity Types",
      desc: `**Business Entity Types** — the legal structure you choose to incorporate your company. The main options for US startups: Sole Proprietorship, LLC, S-Corporation, C-Corporation, and Benefit Corporation (PBC).

**Founder lens:** For VC-backed startups: Delaware C-Corp is the de facto standard. LLCs are great for lifestyle businesses, consulting, and small partnerships — but VCs won't invest in them (LLCs can't issue preferred stock easily and have complicated tax pass-through for institutional LPs). S-Corps have shareholder limits (max 100 shareholders, all US residents).

**Investor lens:** Institutional investors require Delaware C-Corps. Period. A VC seeing a Florida LLC will tell you to reincorporate before they'll even do a term sheet. This is not negotiable — factor in the conversion cost and legal complexity early.

**Key insight:** Incorporate as a Delaware C-Corp from day one if you plan to raise VC. Conversion from LLC to C-Corp is possible but costly (legal fees, tax complexity, existing investor signatures required). Doing it right once is cheaper than doing it twice.`,
    },
    {
      id: 1552,
      name: "Delaware C-Corp",
      desc: `**Delaware C-Corporation** — the dominant legal entity for VC-backed startups, incorporated in Delaware regardless of where the company operates. Delaware's Court of Chancery provides predictable, sophisticated corporate law with decades of precedent.

**Founder lens:** Key advantages: well-understood by investors and lawyers, flexible equity structures (multiple share classes, options), no requirement to operate in Delaware, corporate law is predictable for disputes. Downsides: double taxation (corporate tax + personal dividend tax) vs LLC pass-through, franchise tax (typically $300-$400/yr for small companies, more as you grow).

**Investor lens:** Delaware C-Corp is not a preference — it's a precondition. Sequoia, a16z, and every institutional VC have boilerplate for Delaware entities. Non-Delaware structures require custom legal work and create delays in due diligence.

**Key insight:** The Delaware franchise tax for startups is calculated two ways: authorized shares method (can be very high) and assumed par value method (usually much lower). Always use the assumed par value method and set par value at $0.00001 per share. A good lawyer will do this automatically.`,
    },
    {
      id: 1553,
      name: "Founders' Agreement",
      desc: `**Founders' Agreement** — a legal document establishing the rights, responsibilities, equity split, vesting, IP ownership, and decision-making authority between co-founders. The prenuptial agreement of startups.

**Founder lens:** Sign this before you build anything. Core elements: who owns what equity (and what it's conditioned on), how decisions are made (voting rights), what happens if a founder leaves (buyback rights), who owns the IP you're building, non-compete and non-solicitation clauses. Equity splits should be decided based on expected future contributions, not past — don't reward the person who had the idea equally to the person who will build it.

**Investor lens:** Investors will ask for the founders' agreement during due diligence. Missing vesting schedules or unresolved co-founder equity disputes are serious red flags — they signal organizational fragility that could blow up the cap table.

**Key insight:** The most important conversation to have before incorporating is "what happens if one of us wants to leave in 18 months?" Setting those rules while everyone is aligned (pre-money, pre-stress) is infinitely easier than negotiating them when the relationship is strained.`,
    },
    {
      id: 1554,
      name: "Vesting Schedules",
      desc: `**Vesting Schedule** — the timeline over which founders and employees earn their equity. Standard: 4 years with a 1-year cliff. Without vesting, a co-founder can leave after 3 months with 33% of the company permanently.

**Founder lens:** The 1-year cliff means no equity is earned in the first year — if someone leaves before 12 months, they get nothing. After the cliff, equity vests monthly over the remaining 3 years. For founders, vesting should start from the founding date, not the investment date. Accelerated vesting on acquisition (double trigger preferred: requires both acquisition AND termination) protects founders without alarming investors.

**Investor lens:** Investor-aligned vesting means the company retains leverage over founders' commitment. They will require founder vesting as a condition of investment — refreshing the vesting clock at investment is standard for founders who've been working on the idea for years.

**Key insight:** 4-year vesting was designed to align incentives with a company's growth arc. If you're a repeat founder or have unique leverage, you can negotiate a shorter vesting period or higher acceleration provisions — but do this before signing the term sheet.`,
    },
    {
      id: 1555,
      name: "IP Assignment",
      desc: `**Intellectual Property (IP) Assignment** — the legal transfer of all IP created by founders and employees to the company entity. Ensures the company owns what it was built on, not the individual who built it.

**Founder lens:** Every founder and employee must sign an IP assignment agreement at the start. This includes code written on personal computers before incorporation — yes, even the weekend hacking that led to the idea. Failure to assign IP creates a chain-of-title problem that surfaces in due diligence and can crater a deal.

**Investor lens:** IP chain-of-title is a standard due diligence check. Missing IP assignments (especially from early contractors or departed co-founders) are deal blockers. One investor passed on a $10M Series A because a CTO who left 18 months prior had never signed an IP assignment for the core algorithm.

**Key insight:** If you used employer resources (computer, time, networks) to build any part of your company's IP while employed elsewhere, you may have inadvertently assigned that IP to your employer. Review your employment agreement before founding — this is a real and common problem.`,
    },
    {
      id: 1556,
      name: "Co-founder Dynamics",
      desc: `**Co-founder Dynamics** — the operational and interpersonal relationship between the people who start a company together. The #1 reason early-stage startups fail is co-founder conflict.

**Founder lens:** Y Combinator data shows co-founder splits are the leading cause of company death in the first two years. Mitigate this: have explicit conversations about roles (who has final say on product? on hiring? on fundraising?), work styles (full-time commitment? remote?), and values (how do we handle adversity?). Before co-founding with someone, work on a project together first — personality conflicts that seem manageable in low-stress environments become catastrophic under startup pressure.

**Investor lens:** Investors assess co-founder relationship health directly in interviews. They look for: clear division of responsibilities, mutual respect in how founders talk about each other, and evidence of navigating disagreement. "The co-founders are married" (metaphorically) — investors don't invest in marriages they think will fail.

**Key insight:** The best co-founder relationship is built on complementary skills + aligned values + mutual respect — not friendship. Many best-friend co-founders blow up their friendship. Many professional co-founder pairings thrive precisely because they're optimized for working together, not socializing.`,
    },
    {
      id: 1557,
      name: "Bylaws & Operating Agreement",
      desc: `**Bylaws & Operating Agreement** — the foundational governing documents that define how the company operates. Bylaws govern C-Corps; Operating Agreements govern LLCs.

**Founder lens:** Bylaws set the rules for: shareholder meetings, board composition and voting, how officers are appointed and removed, and amendment procedures. For a startup C-Corp, use standard startup bylaws (NVCA model or legal firm's template) rather than custom-drafting — you'll spend money and create friction with investors who expect standard structures. Keep bylaws simple at the start.

**Investor lens:** Non-standard bylaws create due diligence overhead. Investors and their counsel will redline anything unusual. Standard = speed. Custom = friction and legal bills. Investors occasionally negotiate specific bylaw provisions (information rights, board observer seats) — this belongs in the shareholder agreement, not the bylaws.

**Key insight:** The bylaws are not the document where you customize your governance for your specific situation — that's what the investment agreement and shareholder agreements are for. Use standard startup bylaws, period.`,
    },
    {
      id: 1558,
      name: "Pre-seed Stage",
      desc: `**Pre-seed Stage** — the earliest formal stage of a startup, typically before institutional funding. Founders are building the product, finding initial customers, and validating core assumptions. Capital comes from personal savings, friends & family, or small pre-seed funds.

**Founder lens:** Pre-seed is the "crawl" phase. Goals: validate the problem, build an MVP, land 3-10 paying (or heavily-engaged) early customers, figure out the GTM motion. Keep burn low — every dollar you don't raise is equity you keep. Pre-seed valuations are typically $1-5M, with checks of $25K-$500K from angels and pre-seed funds.

**Investor lens:** Pre-seed investors bet almost entirely on the founders. There's no product to evaluate, no customers to reference, no metrics to analyze. They ask: does this team have the insight, grit, and resourcefulness to find PMF? Warm introductions matter enormously at this stage — cold email response rates from pre-seed investors are very low.

**Key insight:** The pre-seed stage is the only stage where you control your destiny entirely. Once you raise, investors have rights and preferences. Use pre-seed time to build conviction in your thesis before giving up equity — a company with 10 paying customers raises a seed round at a dramatically better valuation than one with zero.`,
    },
  ],
};

export default startingABusiness;
