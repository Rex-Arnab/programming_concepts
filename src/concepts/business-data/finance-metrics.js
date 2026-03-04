const financeMetrics = {
  name: "Business Finance & Metrics",
  icon: "📉",
  color: "#ec4899",
  concepts: [
    {
      id: 1635,
      name: "ARR & MRR",
      desc: `**ARR (Annual Recurring Revenue)** — the annualized value of all active subscription contracts. **MRR (Monthly Recurring Revenue)** — the monthly equivalent. These are the bedrock metrics for SaaS businesses.

**Founder lens:** ARR = MRR × 12. Only include truly recurring, contracted revenue in ARR — not one-time professional services, usage overages, or non-recurring contracts. Inflating ARR by including non-recurring revenue creates false signals and misaligns the team. Track MRR movements: new MRR, expansion MRR (upsells), contraction MRR (downgrades), and churned MRR.

**Investor lens:** ARR is the primary SaaS valuation input — multiples are expressed as X × ARR. Investors look at ARR growth rate (YoY % change), ARR quality (% contracted vs soft commitments), and ARR composition (enterprise vs SMB vs consumer). "ARR quality" matters because some ARR is stickier (3-year contracts) than others (monthly).

**Key insight:** The best ARR dashboard tracks the "four quadrants of MRR movement": new MRR added from new customers, expansion MRR from existing customers, contraction MRR from downgrades, and churned MRR from lost customers. The sum tells you if growth is healthy or masked by new sales offsetting massive churn.`,
    },
    {
      id: 1636,
      name: "Burn Rate & Runway",
      desc: `**Burn Rate** — the rate at which a company is spending cash reserves beyond its revenue. **Runway** — how many months the company can operate before running out of cash at the current burn rate.

**Founder lens:** Net burn = cash out - cash in. Gross burn = total cash spent. Keep 18-24 months of runway at all times. When runway drops below 6 months, you're in fundraising emergency mode — which is the worst position to raise from. The "18-month warning": if you can't see 18 months of runway in your current trajectory, start your next raise now.

**Investor lens:** Burn multiple = net burn / net new ARR. This measures capital efficiency. A burn multiple of 1x means you're spending $1 to generate $1 of new ARR. Below 1x is excellent; 1-1.5x is good; above 2x at growth stage is concerning. Post-2022, investors moved from "growth at all costs" to scrutinizing burn multiple as a primary metric.

**Key insight:** Many founders underestimate burn because they forget accruals (employee expenses that haven't hit the bank yet), upcoming large payments (annual contracts, tax bills), and the time lag in revenue recognition. Build your cash flow model with 90-day granularity, not just monthly averages.`,
    },
    {
      id: 1637,
      name: "Gross Margin",
      desc: `**Gross Margin** — (Revenue - Cost of Goods Sold) / Revenue. Measures how much of each dollar of revenue the company retains after direct delivery costs. One of the most important metrics for understanding the fundamental economics of a business.

**Founder lens:** SaaS companies target 70-80%+ gross margins. Lower margins signal expensive infrastructure, heavy services components, or hardware. Low gross margin compresses the capital available for R&D, Sales, and G&A — making it impossible to build a high-performing organization without massive revenue. Know your gross margin by revenue type: product gross margin vs services gross margin.

**Investor lens:** Gross margin is the ceiling on profitability and a primary driver of valuation multiples. A 80% gross margin SaaS company at $10M ARR is worth 3-5x more than a 40% gross margin tech-enabled services company at the same revenue. Investors multiply gross margin into their valuation models.

**Key insight:** Gross margin improvement often requires architectural investment. Moving from a cost of $30/customer/month to $10/customer/month through infrastructure optimization is a massive value creation lever — often more valuable than a commensurate increase in ARR. Commission your CTO to produce a cost-of-delivery roadmap alongside the product roadmap.`,
    },
    {
      id: 1638,
      name: "LTV:CAC Ratio",
      desc: `**LTV:CAC** — the ratio of Customer Lifetime Value (total revenue from a customer over their entire relationship) to Customer Acquisition Cost (total cost to acquire one customer). The fundamental unit economics metric.

**Founder lens:** LTV = ARPU × Gross Margin % × (1 / Churn Rate). CAC = total Sales + Marketing spend / number of new customers acquired. LTV:CAC > 3:1 is the standard benchmark; > 5:1 is excellent. CAC payback period < 12 months is healthy for SMB; < 24 months is acceptable for enterprise. If your payback period is 48 months, you're lending customers money.

**Investor lens:** LTV:CAC is scrutinized intensely at Series A. The challenge: LTV is a forward-looking projection based on assumed churn and expansion rates. A company claiming 5:1 LTV:CAC based on 0% assumed churn is misrepresenting its economics. Investors normalize LTV projections using observed cohort retention and skeptical churn assumptions.

**Key insight:** The most common LTV:CAC mistake is using blended CAC (total S&M spend / all new customers) instead of segmented CAC by channel. Your paid CAC might be $15,000 while your organic/referral CAC is $300. Blending these hides the truth about your scalable acquisition economics.`,
    },
    {
      id: 1639,
      name: "Churn Rate",
      desc: `**Churn Rate** — the percentage of customers or revenue lost in a given period. Customer churn measures lost accounts; revenue churn measures lost dollars. Net Revenue Retention (NRR) = gross revenue retention + expansion revenue.

**Founder lens:** Monthly revenue churn > 2% is a serious problem — it annualizes to ~22% ARR churn, meaning you're replacing nearly a quarter of your revenue every year just to stand still. The benchmark: < 0.5% monthly churn for enterprise SaaS. The fix: churn is almost always a product problem (customers not achieving value) masked as a sales problem ("we need more new customers").

**Investor lens:** Churn is the single most important indicator of product-market fit. A company with 3% monthly churn raising on 200% ARR growth is building on sand. A company with 0.5% monthly churn growing 80% is compounding. The best SaaS businesses have negative net churn (expansion revenue from existing customers exceeds churn losses).

**Key insight:** Cohort analysis reveals churn truth that aggregate metrics hide. Plot the MRR from each customer cohort over 24 months: do the cohort curves flatten (healthy) or continue declining (concerning)? A company whose oldest customer cohorts are stable or growing is showing genuine product-market fit, not just early adoption novelty.`,
    },
    {
      id: 1640,
      name: "Burn Multiple & Capital Efficiency",
      desc: `**Burn Multiple** — net burn divided by net new ARR. Measures how efficiently a company is converting capital into recurring revenue. A burn multiple of 1.0x means spending $1 of cash to generate $1 of new ARR.

**Founder lens:** David Sacks popularized the burn multiple framework in 2022. Benchmarks: < 1x = excellent (investors will compete to give you money), 1-1.5x = good, 1.5-2x = acceptable early stage, > 2x = concerning, > 3x = unsustainable at scale. Improving your burn multiple is a combination of cutting unproductive spend and accelerating revenue growth — not just cutting.

**Investor lens:** Post-2022 correction, burn multiple replaced "growth at all costs" as the primary capital efficiency metric. The most valued companies in 2024 were those that maintained > 80% growth with < 1x burn multiple. This combination is rare and commands premium valuations.

**Key insight:** Burn multiple gives investors a way to compare companies at different scales. A $1M ARR company with 5x burn multiple is less concerning than a $20M ARR company with the same ratio — the early stage company is still finding PMF, while the larger company's inefficiency is systemic. Context always matters.`,
    },
    {
      id: 1641,
      name: "Financial Modeling",
      desc: `**Financial Modeling** — building quantitative representations of the business's economics to project revenue, expenses, cash flow, and growth scenarios. The CFO's primary analytical tool and the basis for fundraising conversations.

**Founder lens:** Build a 3-statement model (P&L, balance sheet, cash flow) with 3 scenarios: base, bear, bull. The base case is what you're planning for; the bear case shows minimum viability; the bull case shows the upside if things go right. The most important model output: monthly cash flow and the date you run out of money under each scenario.

**Investor lens:** Investors will pull apart your financial model in diligence. Key tests: are the assumptions bottom-up and defensible (not top-down "we capture 1% of market")? Does the unit economics math reconcile with the historical data? Is the headcount growth plan achievable with the proposed capital? Investors are less concerned with the projected outcome than with the quality of the founder's thinking.

**Key insight:** The financial model is a communication device, not a prediction. No 3-year model for a startup is accurate — but the *process* of building it forces you to articulate your assumptions, identify dependencies, and understand the math of your business. Founders who have internalized their model can answer any investor question from first principles.`,
    },
    {
      id: 1642,
      name: "EBITDA & Path to Profitability",
      desc: `**EBITDA** — Earnings Before Interest, Taxes, Depreciation, and Amortization. A measure of operating profitability that strips out financing and accounting factors to show the core business economics.

**Founder lens:** For early-stage startups, EBITDA is rarely positive or relevant — you're intentionally losing money to invest in growth. EBITDA becomes critical at: (1) Series C+ where investors want to see a "path to profitability," (2) approaching an IPO (public investors scrutinize EBITDA margins), (3) late-stage growth where growth slows and efficiency becomes the valuation driver.

**Investor lens:** The "Rule of 40" (growth rate % + EBITDA margin % > 40%) is the growth-stage benchmark that balances growth and profitability. A company growing 60% with -20% EBITDA margin scores 40 — the same as one growing 20% with 20% EBITDA margin. Both are considered healthy; below 40 at growth stage raises questions.

**Key insight:** EBITDA can be manipulated by shifting costs into capitalized R&D or depreciation. Always look at cash flow from operations alongside EBITDA — divergence between the two signals accounting choices that may not reflect true business economics. Sophisticated investors build their own adjusted EBITDA calculations.`,
    },
    {
      id: 1643,
      name: "Investor Reporting & Updates",
      desc: `**Investor Reporting** — the regular communication of business performance, challenges, and needs to existing investors. One of the most underrated CEO activities for building trust and getting help.

**Founder lens:** Send monthly investor updates, even when things are hard — especially when things are hard. Include: key metrics vs last month, top wins, top challenges/risks, and specific asks (intro to X customer, feedback on Y decision, connection to Z investor for the next round). Founders who communicate proactively get more support. Those who go quiet get worried investors calling for emergency board meetings.

**Investor lens:** Investors who receive regular updates are less anxious, more helpful, and more likely to do their pro-rata in the next round. Proactive communication also surfaces problems early when they're still solvable — the worst surprises are problems that surface at board meetings for the first time, already critical.

**Key insight:** The investor update is a trust-building exercise over years. The investors who've received 24 months of honest, clear updates from a founder will wire money for a bridge round with a phone call. Those who only hear from the founder when money is needed will demand additional diligence at the worst possible time.`,
    },
    {
      id: 1644,
      name: "Cash Flow Management",
      desc: `**Cash Flow Management** — the operational discipline of monitoring, forecasting, and optimizing the timing of cash inflows and outflows to ensure the company never runs out of money unexpectedly.

**Founder lens:** Cash flow is the lifeblood of a business — companies die from running out of cash, not from running at a loss. Key practices: collect AR aggressively (net 30 terms, early payment incentives), pay AP slowly (use full payment terms), negotiate annual prepayment discounts from vendors, and maintain a 13-week rolling cash forecast updated every week.

**Investor lens:** Poor cash management is a management quality signal. Investors who see a company that doesn't know its cash position weekly, or that gets surprised by large cash outflows, lose confidence in management's operational discipline quickly. "Do you know your cash position right now?" is a basic interview question for founders raising.

**Key insight:** The 13-week cash flow forecast is the most important operational document in a cash-constrained startup — more important than the 3-year financial model. It answers: when will we run out of money if nothing changes? It surfaces problems 90 days before they become existential, when there's still time to act. Build it, update it weekly, and review it with your CFO/finance lead every Monday.`,
    },
  ],
};

export default financeMetrics;
