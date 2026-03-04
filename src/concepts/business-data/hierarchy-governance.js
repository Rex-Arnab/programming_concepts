const hierarchyGovernance = {
  name: "Company Hierarchy & Governance",
  icon: "🏛️",
  color: "#06b6d4",
  concepts: [
    {
      id: 1603,
      name: "Board of Directors",
      desc: `**Board of Directors** — the governing body of a corporation, responsible for overseeing management, approving major strategic decisions, and representing shareholder interests. The board is not the management team — it governs the management team.

**Founder lens:** The board is your most important external relationship. Great board members provide strategic guidance, open doors, and support in adversity. Terrible board members micromanage, create confusion in the management team, and undermine your authority. Choose board members with as much care as co-founders — these relationships last 7-10 years.

**Investor lens:** Board seats give investors governance rights: approval of CEO, major M&A, significant financing, and amendment of founder vesting. Investors who are constructive board members add enormous value — preparation for board meetings, network access, and crisis counsel. Those who are passive or destructive destroy more value than they protect.

**Key insight:** The board meeting rhythm matters as much as the composition. Monthly or quarterly board meetings with a well-structured board package (financials, metrics, key decisions, asks) keep boards aligned and prevent "surprise governance" — the worst kind. Founders who run tight board meetings retain authority; those who go in unprepared often leave with homework.`,
    },
    {
      id: 1604,
      name: "Shareholders & Ownership",
      desc: `**Shareholders** — individuals or entities that own equity (shares) in a company. In a startup: founders (common shareholders), investors (preferred shareholders), employees (options/common), and advisors (restricted stock or options).

**Founder lens:** Shareholder rights vary by share class and investment agreement. Preferred shareholders have protective provisions and liquidation preferences. Common shareholders have basic voting and economic rights. Managing shareholder relationships proactively — especially with early investors who may not be active — prevents surprises at critical moments.

**Investor lens:** Large shareholders (typically >10% ownership) often have specific rights: board seats, information rights, and consent rights for major decisions. Shareholder concentration matters — a cap table with one investor owning 40% has very different governance dynamics than one where no investor owns more than 15%.

**Key insight:** "Who can block this deal?" is the most important question in any M&A process. A single shareholder with a blocking stake (often >33% for certain votes) can veto an acquisition. Know your shareholder registry intimately — every holder's rights, their likely reaction to a deal, and their contact relationship.`,
    },
    {
      id: 1605,
      name: "Corporate Governance",
      desc: `**Corporate Governance** — the system of rules, practices, and processes by which a company is directed and controlled. For startups, governance evolves from informal (founders make all decisions) to formal (board approval required for major actions) as the company grows and investors are involved.

**Founder lens:** Poor governance at early stage creates massive cleanup costs later. Missing board minutes, undocumented equity grants, no audit committee, and related-party transactions without board approval are all governance failures that surface painfully in due diligence. Budget for a good startup lawyer from day one.

**Investor lens:** Governance quality signals management maturity. Companies with proper governance are easier to invest in, audit, and ultimately exit. Investors who join boards of companies with poor governance spend the first 6 months cleaning up rather than adding value.

**Key insight:** Governance is not bureaucracy — it's protection. A board meeting minute that documents a decision protects the founders from personal liability, protects the company from disputes, and creates a historical record that's valuable in M&A. Spend 2 hours/month on proper governance hygiene.`,
    },
    {
      id: 1606,
      name: "C-Suite Overview",
      desc: `**C-Suite** — the highest-ranking executives of a company, each overseeing a major functional area. Common roles: CEO (Chief Executive Officer), COO (Chief Operating Officer), CTO (Chief Technology Officer), CFO (Chief Financial Officer), CMO (Chief Marketing Officer), CPO (Chief Product Officer).

**Founder lens:** At seed stage, founders wear all hats. As you scale, hire C-suite roles when a function is clearly the company's bottleneck and the founder can no longer own it. The sequence matters: most SaaS companies hire in order: first VP Engineering, then VP Sales, then CFO, then CMO. Don't hire a full C-suite before you've earned the revenue to support it.

**Investor lens:** C-suite team strength is a critical diligence factor at Series A+. Investors look for: domain credibility (has this person scaled a similar function before?), cultural fit with the founder, complementary skills to fill the founder's gaps, and evidence of high performance in the role. Weak C-suite is a leading indicator of company failure.

**Key insight:** The hardest C-suite hire is the CEO's first direct report — either COO or VP Sales. This person sets the management culture template. Hire someone who makes the company run better, not someone who competes with the CEO for authority. The first bad executive hire typically costs 12+ months to recover from.`,
    },
    {
      id: 1607,
      name: "Management vs Governance",
      desc: `**Management vs Governance** — two distinct functions in a company. Management: the day-to-day operational execution by executives and employees. Governance: the oversight, direction-setting, and accountability function performed by the board.

**Founder lens:** The most common early governance mistake is conflating management and board roles. Your investors on the board govern — they don't manage. When board members start making operational suggestions ("you should hire X person," "you should close this deal"), clarify the boundary. A healthy relationship is: board sets direction and holds management accountable; management executes.

**Investor lens:** Board members who over-manage create confusion and undermine the CEO's authority. The board's job is to hire/fire the CEO, approve strategy, and protect shareholders — not to run the company. The best board members understand this distinction and practice governance, not management.

**Key insight:** Governance problems escalate with scale. At seed, informal governance is fine because the team is small. At 100 people, poor governance creates legal risk, cultural confusion, and accountability gaps. Building governance structures slightly ahead of company size (not far ahead — that's bureaucracy) keeps scaling smooth.`,
    },
    {
      id: 1608,
      name: "Advisory Board",
      desc: `**Advisory Board** — a group of individuals (domain experts, industry veterans, potential customers) who provide informal guidance to the company. Unlike the board of directors, advisors have no fiduciary duty, voting rights, or legal authority.

**Founder lens:** Advisors are typically compensated with 0.1-0.5% equity (vesting over 2 years). The best advisors make specific introductions, provide domain expertise you lack, and validate your thesis to investors. Avoid "trophy advisors" — impressive names who never actually help. A working advisor with 10 hours/month of genuine engagement is worth 10 passive advisors with famous names.

**Investor lens:** Advisory board composition signals who the company has convinced to believe in the thesis. Strong strategic advisors (domain experts, former executives from target customers) add credibility. But investors look past the names to verify actual engagement — a single email introduction from a "key advisor" who hasn't logged into the product is not a signal of value.

**Key insight:** Treat advisors like investors: clear expectations, defined commitments, and regular cadence. Send advisors the same investor update you send investors. Advisors who feel informed and included provide proactive help; those who feel forgotten quietly let their vesting expire without contributing.`,
    },
    {
      id: 1609,
      name: "Fiduciary Duty",
      desc: `**Fiduciary Duty** — the legal obligation of directors and officers to act in the best interests of the company and its shareholders. Directors have two primary duties: duty of care (make informed decisions) and duty of loyalty (no self-dealing or conflicts of interest).

**Founder lens:** As a director of your own company, you have fiduciary duties. This means: disclose conflicts of interest (e.g., you're also an investor in a supplier), make decisions with reasonable care (get proper financial advice for major transactions), and don't use company resources for personal benefit. Breach of fiduciary duty is a serious legal exposure.

**Investor lens:** Board members owe fiduciary duty to the company, not just to their fund. This creates interesting tension: an investor's duty as a board member is to the company's shareholders broadly, but their economic interest is in their fund's return. Well-structured boards manage this tension by including independent directors without fund affiliations.

**Key insight:** In a company sale process, the board owes the fiduciary duty to shareholders to maximize value — including common shareholders. Investors who structure deals that heavily favor preferred shareholders over common (founders, employees) can face breach of fiduciary duty claims. The "entire fairness" standard in Delaware courts scrutinizes self-dealing transactions carefully.`,
    },
    {
      id: 1610,
      name: "Voting Rights & Shareholder Meetings",
      desc: `**Voting Rights** — the ability of shareholders to vote on major corporate decisions: electing directors, approving major transactions, amending corporate documents. Common stock typically carries 1 vote per share; dual-class structures give founders "super voting" shares.

**Founder lens:** Dual-class structures (e.g., 10:1 voting ratio for founder shares vs public shares) have enabled founders to maintain control after IPO — see Google, Meta, and Snap. At early stage, protect your common stock voting rights. Investors will receive preferred stock voting rights via protective provisions; founders should maintain common stock voting majority to control board elections.

**Investor lens:** Institutional investors increasingly push back on dual-class structures at IPO — ISS (proxy advisory firm) routinely recommends voting against dual-class board members, and many pension funds have policies against buying dual-class shares. The founder-control benefit is real but comes with a governance discount at the public markets stage.

**Key insight:** Weighted voting is a founder protection, not a free pass to ignore investor concerns. Founders who use super voting to override legitimate governance concerns erode trust and damage their company's long-term relationships. Use it sparingly and legitimately.`,
    },
    {
      id: 1611,
      name: "Shareholders' Agreement",
      desc: `**Shareholders' Agreement** — a legal document between shareholders defining their rights and obligations, transfer restrictions, dispute resolution mechanisms, and governance rules. Complements (but is separate from) the corporate charter and bylaws.

**Founder lens:** The shareholders' agreement is where investor rights from the term sheet get codified. Covers: information rights, pro-rata rights, right of first refusal on share transfers, co-sale agreements, and drag-along/tag-along provisions. Use a standard NVCA-model investor rights agreement for institutional rounds — custom drafting adds cost without clarity.

**Investor lens:** The shareholders' agreement is the primary legal document investors rely on for their rights. A well-drafted agreement gives investors confidence that their rights are protected contractually. Breaches of the shareholders' agreement (e.g., founder doesn't provide required financial information) can trigger default provisions.

**Key insight:** Shareholders' agreements are private documents not filed with the government. This is intentional — they can include commercially sensitive information about rights and restrictions. Unlike charter documents (which are public), the shareholders' agreement governs the real power dynamics of the company.`,
    },
    {
      id: 1612,
      name: "Org Chart Design",
      desc: `**Org Chart Design** — the formal representation of reporting relationships, spans of control, and functional ownership in a company. How you structure reporting determines how decisions get made, how information flows, and how culture propagates.

**Founder lens:** Flat orgs (few layers) are fast and agile for 0-50 people. Beyond that, spans of control become unmanageable. The inflection points: 15-20 people (first management layer needed), 50-100 people (functional departments crystallize), 200+ people (VP layer becomes critical). Reorganizations are disruptive — design slightly ahead of current size.

**Investor lens:** Org design quality signals how much the founder understands organizational dynamics. A founder who can articulate "this is our org today, this is how it evolves at $10M ARR, and here are the specific roles we'll hire next" demonstrates operational thinking that separates good CEOs from great ones.

**Key insight:** Org structure should follow strategy, not the other way around. The biggest organizational mistake is building functions around the people you have rather than the capabilities you need. "We have a great engineer, so they're the VP Engineering" instead of "we need a VP Engineering who can manage 30 engineers, hire A-players, and build technical architecture" — these produce very different companies.`,
    },
  ],
};

export default hierarchyGovernance;
