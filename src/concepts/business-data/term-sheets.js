const termSheets = {
  name: "Term Sheets & Deal Structure",
  icon: "📝",
  color: "#ef4444",
  concepts: [
    {
      id: 1593,
      name: "Term Sheet",
      desc: `**Term Sheet** — a non-binding letter of intent outlining the key terms of a proposed investment. It's the starting point for negotiation, not the final legal agreement. The binding documents (Stock Purchase Agreement, Investor Rights Agreement, etc.) come after.

**Founder lens:** Receive a term sheet as a win but not a close. Term sheets have exclusivity clauses ("no-shop") that prevent you from talking to other investors for 30-60 days while the investor does diligence. Read every term before signing. The economic terms (valuation, option pool) and governance terms (board composition, protective provisions) are both critical — don't optimize one at the expense of the other.

**Investor lens:** Term sheets are negotiating documents. Investors present terms that give them options in adverse scenarios; founders negotiate to limit those options. The most skilled investors structure term sheets to be fair enough that founders sign quickly, while preserving the protections they actually need.

**Key insight:** The most important term sheet negotiation is with yourself: what are your must-haves vs nice-to-haves? Prioritize board composition over anti-dilution provisions at seed stage. Protecting control now is worth more than financial provisions that only matter in bad exit scenarios.`,
    },
    {
      id: 1594,
      name: "Pre-money vs Post-money Valuation",
      desc: `**Pre-money Valuation** — what the company is worth before the new investment. **Post-money valuation** — the company's value after the investment is added (pre-money + investment = post-money). These determine how much equity investors receive.

**Founder lens:** If you raise $2M at a $8M pre-money valuation, the post-money is $10M. Investors own $2M/$10M = 20%. But "pre-money" shifts when the option pool is created pre-close — a $8M pre-money with a required 15% option pool creation effectively makes the real pre-money $6.8M. Always calculate the effective pre-money after option pool.

**Investor lens:** Valuation is a negotiation, not a science. Seed stage valuations are entirely based on narrative: team, market, thesis. Series A valuations are roughly 10-20x ARR. Series B is 8-15x. These multiples compress post-2021 correction. Investors care more about ownership percentage than headline valuation.

**Key insight:** $5M at $20M pre vs $5M at $10M pre means the investor owns 20% vs 33.3% respectively. The headline number in press releases is post-money — always find the pre-money to understand what founders actually gave up. YC SAFEs are now post-money SAFEs, meaning dilution is fully transparent at signing.`,
    },
    {
      id: 1595,
      name: "Liquidation Preference",
      desc: `**Liquidation Preference** — a term that determines how much investors get paid before common shareholders in a liquidation event (acquisition, dissolution). The "1x" means investors get their investment back first; "2x" means they get twice their investment back first.

**Founder lens:** 1x non-participating liquidation preference is the founder-friendly standard. This means: investors get their money back first, then everyone participates pro-rata. 1x participating ("double dip") means investors get their money back AND then participate in the remainder as if they owned their percentage of common. In a $50M exit for a company that raised $20M, participating preferred investors take $20M first + 30% of remaining $30M = $29M, leaving $21M for the rest.

**Investor lens:** 1x non-participating is standard at seed and Series A in competitive Silicon Valley deal environments. Participating preferred is more common in later stages, growth equity, or deals with less investor competition. It's used to protect against scenarios where the company is acquired for slightly above the invested capital.

**Key insight:** Model your cap table through 5+ exit scenarios before signing. At exit values below 1.5x invested capital, even 1x non-participating preference significantly advantages investors over common holders. At 5x+ valuations, the preference barely matters because everyone's happy. The dangerous middle ground (1.5-3x) is where preferences extract the most pain.`,
    },
    {
      id: 1596,
      name: "Anti-Dilution Provisions",
      desc: `**Anti-Dilution Provisions** — terms that protect investors from having their effective ownership reduced if a company raises a future round at a lower price per share (a "down round"). The two main types: Broad-based weighted average (standard/founder-friendly) and Full Ratchet (aggressive/investor-friendly).

**Founder lens:** Broad-based weighted average recalculates the conversion price for existing preferred stock when new shares are issued at a lower price — but it factors in all outstanding shares to soften the impact. Full ratchet is brutal: it reprices existing preferred shares to the new (lower) round price, massively diluting common stockholders. Never accept full ratchet unless absolutely necessary.

**Investor lens:** Anti-dilution is a risk management tool for down rounds. In a healthy market with increasing valuations, it rarely triggers. In a down market (2022-2023), down rounds became common and anti-dilution math affected many cap tables. Sophisticated investors know the difference between "protecting against bad luck" and "extracting value in adversity."

**Key insight:** Broad-based weighted average anti-dilution is so standard at Seed and Series A that asking for full ratchet signals an unsophisticated or aggressive investor. If a term sheet includes full ratchet, negotiate it out. If they won't budge, seriously reconsider taking the investment.`,
    },
    {
      id: 1597,
      name: "Pro-rata Rights",
      desc: `**Pro-rata Rights** — the right for existing investors to participate in future funding rounds at their proportional ownership percentage, preventing dilution of their stake.

**Founder lens:** Pro-rata rights mean your seed investor can write a check in your Series A to maintain their ownership. This is often fine — it keeps loyal early investors engaged and signals confidence. But pro-rata rights complicate future rounds when you want strategic investors and existing investors' pro-rata blocks their allocation. Negotiate to make pro-rata a right of first offer, not a right of first refusal — gives you more flexibility.

**Investor lens:** Pro-rata is one of the most valuable provisions in a seed term sheet. A $100K seed investment in a company that raises a $5B outcome means the investor can double down in every round to maintain ownership. Losing pro-rata (through dilutive rounds or founder resistance) significantly reduces returns in the fund's best performers.

**Key insight:** "Super pro-rata" rights (right to invest *more* than your proportional share in future rounds) are occasionally requested by lead investors. These give the investor increasing ownership without doing additional work — generally bad for founders. Limit pro-rata to maintain-ownership, not increase-ownership.`,
    },
    {
      id: 1598,
      name: "Board Composition",
      desc: `**Board Composition** — the structure of the company's board of directors: how many members, who appoints them, and what voting rights they have. Typically: founder seats, investor seats, and independent seats.

**Founder lens:** At seed, most boards are 3 people: 2 founders + 1 investor lead. At Series A: 5 people: 2 founders + 2 investors + 1 independent. Protect your board majority as long as possible — losing board control means investors can theoretically fire the CEO and change strategy. Independent directors are critical and often underrated: a great independent director who is genuinely aligned with founders provides a crucial buffer.

**Investor lens:** Board seats give investors governance rights they can't get through share ownership alone. A board seat allows participation in hiring the CEO, approving major financings, and M&A decisions. Most Series A-stage investors require at least one board seat as a condition of investment.

**Key insight:** "Board control" is often more symbolic than real. In practice, founders with strong relationships and moral authority run their boards even without voting majorities. But board composition becomes critical in adversarial scenarios — a 3-2 board split where investors side together can override a founder. Think carefully about who you add as independent directors: they should be truly independent, not investor-aligned.`,
    },
    {
      id: 1599,
      name: "Protective Provisions",
      desc: `**Protective Provisions** — a list of specific actions that require investor approval (or a supermajority vote of preferred shareholders) before the company can take them. They give minority investors veto rights over major decisions.

**Founder lens:** Standard protective provisions include: issuing new equity, amending the charter, changing the rights of preferred shareholders, liquidating or dissolving the company, and taking on debt above a threshold. These are generally reasonable and expected. Non-standard provisions to push back on: approval rights for hiring/firing executives, budget approval rights, customer approval rights.

**Investor lens:** Protective provisions are the primary tool investors use to protect themselves against scenarios where management acts against their interests. A company that wants to take on $50M in debt without investor approval, for example, could dramatically change the risk profile of the investment. Standard provisions are non-negotiable.

**Key insight:** The protective provisions that bite founders most are often around new equity issuance. If investors must approve all new employee grants, you lose the ability to hire and compensate quickly. Negotiate to exclude option grants below a set threshold from requiring board or investor approval.`,
    },
    {
      id: 1600,
      name: "Drag-Along & Tag-Along Rights",
      desc: `**Drag-Along Rights** — allow a majority of shareholders to force all other shareholders to approve a sale of the company. **Tag-Along Rights** — allow minority shareholders to "tag along" on a deal where majority shareholders are selling, ensuring they can participate in the same terms.

**Founder lens:** Drag-along rights are necessary to enable clean M&A processes. Without them, a single holdout shareholder can block an acquisition. Negotiate: who holds the drag right (majority of all preferred + majority of common together, rather than just preferred alone — prevents investors from forcing a sale you oppose).

**Investor lens:** Drag-along rights ensure investors can exit even if a minority group of shareholders (often early angels) opposes the deal. Tag-along rights protect early investors from being sold out at a discount — if founders sell secondary to a buyer, early investors get to participate on the same terms.

**Key insight:** Drag-along is a board and majority vote mechanism, not an investor unilateral right (in founder-friendly deals). The structure "majority of preferred + majority of common" for drag-along means founders + investors must jointly agree to sell. This is the right structure to ensure alignment, not coercion.`,
    },
    {
      id: 1601,
      name: "Information Rights",
      desc: `**Information Rights** — contractual rights for investors to receive regular financial and operational information about the company: monthly financials, quarterly board packages, annual audited statements, and sometimes access to company systems.

**Founder lens:** Standard information rights for major investors (Series A lead) include: monthly unaudited financials, quarterly board meeting updates, annual audited financial statements, and a 30-day inspection right. Smaller investors (angels, SAFE holders) typically get minimal or no information rights. Information rights create overhead — assign your CFO/finance person to manage investor reporting.

**Investor lens:** Information rights are essential for investors to manage their portfolios, value the investment, and know when to follow on or write down. Investors who don't get information feel blind and become nervous — good investor relations reduces anxiety and maintains goodwill for the company when it needs support.

**Key insight:** Send investors proactive updates even if not required — brief monthly "investor update" emails with metrics, wins, challenges, and asks. Founders who communicate proactively get more help, more warm intros, and more goodwill than those who go silent between board meetings.`,
    },
    {
      id: 1602,
      name: "Down Rounds",
      desc: `**Down Round** — a funding round where shares are priced lower than the previous round — signaling company value has decreased since the prior investment.

**Founder lens:** Down rounds are deeply demoralizing but sometimes necessary. Alternatives to a down round: bridge financing to extend runway, debt financing, or significant cost cuts to reach profitability. If you must do a down round, negotiate anti-dilution provisions carefully (broad-based weighted average is standard; full ratchet would be catastrophic). Be transparent with your team — rumors of a down round demoralize faster than the truth.

**Investor lens:** Down rounds trigger anti-dilution provisions, complicating existing cap tables. Existing investors face difficult choices: participate in the down round to avoid dilution, or accept their stake being reduced. It also creates IRS and financial reporting issues. Most VCs will encourage restructuring to avoid down rounds, but sometimes they're unavoidable.

**Key insight:** The 2022-2023 market correction saw hundreds of private companies face valuations well below their 2021 peaks. Many chose to do "stealth down rounds" — raising at lower valuations without disclosing it publicly. While this preserves optics, it doesn't change the cap table math. Transparency with employees who hold options is a cultural obligation, even when the news is bad.`,
    },
  ],
};

export default termSheets;
