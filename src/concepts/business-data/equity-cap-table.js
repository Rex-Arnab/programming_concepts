const equityCapTable = {
  name: "Equity & Cap Table",
  icon: "📊",
  color: "#10b981",
  concepts: [
    {
      id: 1583,
      name: "Cap Table (Capitalization Table)",
      desc: `**Cap Table** — a spreadsheet or database tracking who owns what in a company: every equity holder (founders, employees, investors), how many shares or options they hold, and what percentage of the company each stake represents.

**Founder lens:** Your cap table is a living document. Treat it as seriously as your financial statements. Keep it in a dedicated tool (Carta, Pulley, or AngelList) rather than a spreadsheet — human error in cap table math has cost founders millions. The cap table determines how proceeds are distributed in an exit and how decisions are made (voting rights follow ownership).

**Investor lens:** A clean, well-maintained cap table is table stakes for due diligence. Messy cap tables (missing IP assignments, unresolved co-founder equity disputes, improperly documented convertible notes) are red flags that signal operational immaturity. Investors also look at the cap table to understand leverage — too many small investors with pro-rata rights can make future rounds complex.

**Key insight:** Model your cap table through 3-4 rounds of funding, an option pool refresh, and an exit scenario before signing anything. What seems like a good deal today may leave founders with a surprisingly small check at exit after dilution and liquidation preferences.`,
    },
    {
      id: 1584,
      name: "Common vs Preferred Stock",
      desc: `**Common vs Preferred Stock** — two classes of equity with fundamentally different rights. Common stock: held by founders and employees — basic voting rights, last in line for proceeds. Preferred stock: held by investors — comes with special rights (liquidation preferences, anti-dilution, information rights).

**Founder lens:** Founders hold common stock. Investors hold preferred stock. The "preference" in preferred means investors get paid before common stockholders in an exit. In a down exit (below the last round's valuation), preferred shareholders get their money back while common shareholders may get nothing. Understanding this asymmetry is critical to negotiating term sheets.

**Investor lens:** Preferred stock protections are risk management tools, not expressions of distrust. They protect capital in scenarios where the company sells for less than it raised. The debate is around *how much* preference is fair: 1x non-participating is standard and founder-friendly; 2x participating preferred is aggressive and founder-unfriendly.

**Key insight:** When founders grant equity to employees, they grant common stock. The liquidation preference gap between preferred (investor) and common (employees) means employees in a modest exit often receive far less than they expected. Managing employee equity expectations requires explaining this gap honestly.`,
    },
    {
      id: 1585,
      name: "SAFE Notes",
      desc: `**SAFE (Simple Agreement for Future Equity)** — a seed financing instrument created by Y Combinator that gives investors the right to receive equity in a future priced round, in exchange for capital today. Not a loan — no interest, no maturity date.

**Founder lens:** SAFEs are the default instrument for pre-seed and seed in Silicon Valley because they're simple (3-5 pages), cheap (~$2-5K in legal fees), and fast. The two key terms: valuation cap (the maximum price at which the SAFE converts to equity in the next round) and discount rate (typically 20% off the next round price). The lower the cap, the more dilutive the SAFE.

**Investor lens:** SAFEs are uncapped-risky: if a company's seed valuation cap is $8M and they raise a Series A at $50M, the SAFE converts at $8M — the investor gets a great deal. But SAFEs can also pile up with different caps, creating "dilution bombs" when they all convert. SAFE investors have no rights until conversion — no board seat, no information rights by default.

**Key insight:** Stack multiple SAFEs with different caps carefully. A company that raises $500K on a $4M SAFE, then $1M on an $8M SAFE, then $500K on a $12M SAFE has a complex conversion table. When these all convert at a Series A, the total effective dilution can shock founders who didn't model it.`,
    },
    {
      id: 1586,
      name: "Convertible Notes",
      desc: `**Convertible Note** — a short-term debt instrument that converts to equity at a future priced round. Unlike SAFEs, convertible notes are loans: they have an interest rate (typically 4-8% annually) and a maturity date (typically 18-24 months).

**Founder lens:** Convertible notes are slightly more complex than SAFEs but more familiar to non-YC angels. Key terms: principal amount, interest rate, maturity date, conversion discount (20% typical), and valuation cap. At maturity, if the company hasn't raised a priced round, the note holder can demand repayment or extend — creating leverage over the founder.

**Investor lens:** Convertible notes give investors more protection than SAFEs via the maturity date and interest accrual. If the company is struggling and hasn't raised, noteholders can force a difficult conversation. Some investors prefer notes for this reason; others prefer SAFEs for simplicity.

**Key insight:** Interest on a convertible note accrues as additional principal, which then converts to equity — so a $100K note at 8% for 18 months converts as $112K of principal. Small amounts, but it affects cap table math. Track accrued interest in your cap table tool.`,
    },
    {
      id: 1587,
      name: "Dilution",
      desc: `**Dilution** — the reduction in existing shareholders' ownership percentage when new shares are issued. Issuing new stock for a funding round, option pool, or any new equity holder dilutes all existing shareholders proportionally.

**Founder lens:** Dilution is not inherently bad — if you raise $5M at a $20M pre-money valuation, existing shareholders give up 20% but the company is now worth more (ideally). The question is: does the value created exceed the equity given up? Anti-dilution is about negotiating structural protections; operational anti-dilution is about raising at higher valuations.

**Investor lens:** Investors model dilution carefully in their return calculations. A 20% stake at Series A that gets diluted to 8% by IPO still produces excellent returns if the valuation grew 100x. Pro-rata rights preserve ownership percentage in subsequent rounds — critical for investors who believe in their best companies.

**Key insight:** Founder dilution follows a predictable pattern over the startup lifecycle: seed round (-20-25%), Series A (-20-25%), Series B (-15-20%), Series C (-10-15%), option pool refreshes (-10% total). A founder who starts with 50% may own 15-20% at IPO — which is still worth hundreds of millions in a successful outcome.`,
    },
    {
      id: 1588,
      name: "Option Pool",
      desc: `**Option Pool** — a reserved pool of equity (typically 10-20% of outstanding shares) set aside for future employee stock options. Established at or before a funding round.

**Founder lens:** The option pool shuffle is a classic VC tactic: investors require that the option pool be created *before* the new investment closes (pre-money). This means the option pool dilutes founders rather than investors. If a VC requires a 20% post-money option pool on a $10M pre-money, they're effectively setting the real pre-money at $8M.

**Investor lens:** Option pools ensure the company has equity to attract great employees after the investment. Too small an option pool means constant cap table disruption for top-ups. 15% post-money is a common seed round target; 10-12% post-money is common at Series A after the initial pool is partially allocated.

**Key insight:** Model the option pool carefully before agreeing to it. Negotiate to include previously committed options in the pool count (not fresh new shares) — this reduces dilution. Always know the "fully diluted" ownership including the unallocated option pool, as VCs calculate their ownership on this basis.`,
    },
    {
      id: 1589,
      name: "Stock Options (ISO vs NSO)",
      desc: `**Stock Options** — contractual rights granted to employees to purchase company stock at a predetermined price (the exercise price or strike price) at a future date. ISOs (Incentive Stock Options) are tax-advantaged for employees; NSOs (Non-Qualified Stock Options) are simpler but less tax-favorable.

**Founder lens:** ISOs are typically granted to employees (US residents) and offer favorable tax treatment: no ordinary income tax at exercise if AMT requirements are met, long-term capital gains rates at sale. NSOs can be granted to advisors, contractors, and non-US employees. Exercise price must be set at Fair Market Value (FMV) per 409A valuation to avoid IRS penalties.

**Investor lens:** Employee option grants are dilutive but necessary. The key concern: is the company granting options responsibly (at FMV, properly documented, with reasonable option pools)? Backdating options or under-pricing them creates massive tax and legal liability — a Sarbanes-Oxley era scandal that still echoes.

**Key insight:** Early employees receive options with very low strike prices because the 409A FMV is low. A $0.05/share strike price on stock that's worth $10/share at exit creates enormous employee wealth. This is the startup compensation bargain: lower cash salary + potential upside from low-strike options. Never lose sight of strike price when evaluating an offer.`,
    },
    {
      id: 1590,
      name: "409A Valuation",
      desc: `**409A Valuation** — an independent third-party assessment of a private company's Fair Market Value (FMV) per common share, required by US tax law (Section 409A of the IRC) before granting stock options.

**Founder lens:** You must get a 409A before granting stock options. Granting options below FMV exposes the company and employees to significant IRS penalties. 409A valuations cost $1-5K from specialized firms (Carta, Stripe Atlas, or independent valuators), need to be refreshed at least annually or after significant events (new funding round, major revenue milestone).

**Investor lens:** The 409A common share value is typically set well below the preferred share price paid by investors (the "common-to-preferred ratio" or "discount"). In early stage, common is often 10-20% of preferred price — reflecting that preferred has rights that common lacks. This discount is what allows early employees to receive options with meaningful upside.

**Key insight:** After a funding round, get your 409A refreshed before granting any new options. The window between a round closing and a new 409A is legally murky — most lawyers advise stopping grants in this window. Delays in getting the 409A done delay making competitive offers to new hires.`,
    },
    {
      id: 1591,
      name: "Secondary Sales",
      desc: `**Secondary Sales** — transactions where existing shareholders (founders, employees, early investors) sell shares to new buyers before an IPO or M&A exit. Also called "liquidity events" for early stakeholders.

**Founder lens:** Secondaries let founders take chips off the table early — de-risking personal finances without requiring a full exit. Common in late-stage rounds (Series C+) where large funds acquire secondary shares from early employees or angels. Some investors specifically allocate to secondaries (Destiny, Forge, Carta SecondMind). Taking secondary can reduce founder intensity and raise concerns among investors — be transparent.

**Investor lens:** Secondaries are increasingly standard at later stages. Investors evaluate whether founders selling secondary means they're less committed, or whether it's reasonable financial planning (founders often have 90%+ of net worth in one illiquid stock). Small to moderate secondary (<25% of holdings) is generally accepted; large secondary raises eyebrows.

**Key insight:** The secondary market is where many early employees get their first real liquidity. Employee secondaries are increasingly facilitated by companies themselves (tender offers) at growth stage. Building a culture of transparency around secondary options improves retention — employees who feel financially trapped resent their equity, not value it.`,
    },
    {
      id: 1592,
      name: "Fully Diluted Shares",
      desc: `**Fully Diluted Share Count** — the total number of shares outstanding if all convertible securities, options, warrants, and SAFEs were converted or exercised. This is the denominator investors use to calculate ownership percentages.

**Founder lens:** Always think in fully diluted terms. If you have 8M shares, 2M in an option pool, $500K in SAFE notes (converting at $4M cap with $5M pre-money = 10% on fully diluted), your fully diluted base is approximately 11.1M shares. An investor who says "we want 20% of the company" means 20% of fully diluted, not just common shares.

**Investor lens:** Investors always calculate ownership on a fully diluted basis. Any term sheet that specifies ownership should be read against fully diluted share count. Discrepancies between "pre-dilution" and "fully diluted" ownership are the source of many founder surprises at exit.

**Key insight:** When a company is sold, the proceeds are distributed based on fully diluted ownership (after accounting for liquidation preferences, vesting, and option exercising). Modeling exit scenarios on fully diluted shares reveals whether employees with in-the-money options will actually exercise them or let them lapse — which in turn affects how much founders actually receive.`,
    },
  ],
};

export default equityCapTable;
