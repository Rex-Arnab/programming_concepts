const fundamentals = {
  name: "Fundamentals",
  icon: "◆",
  color: "#FF6B35",
  concepts: [
    { id: 1, name: "Marketing Mix (4Ps)", desc: `Every marketing strategy can be broken down into four controllable decisions: **Product** (what you sell), **Price** (what you charge), **Place** (where and how it's distributed), and **Promotion** (how you communicate it) — get all four aligned and you have a coherent go-to-market strategy.

**How it works:** Each P is an independent lever with its own tradeoffs:
- **Product** — features, quality, design, packaging, and lifecycle stage
- **Price** — positioning signal (premium vs. budget), competitive benchmarking, margin targets
- **Place** — distribution channels (direct, retail, online, wholesale), geographic reach, convenience
- **Promotion** — advertising, PR, content, sales, and partnerships

The four are interdependent: a premium price requires a product that justifies it, channels that reinforce exclusivity, and promotion that targets buyers who value quality over cost. For **service businesses**, the model extends to **7Ps**, adding People (staff interactions), Process (service delivery steps), and Physical Evidence (tangible cues like a hotel lobby or packaging).

**Real-world example:** Apple's iPhone launch nailed all four: Product (touchscreen, closed ecosystem, polished design), Price ($499 at launch — unsubsidized, signaling premium), Place (Apple Stores + AT&T exclusive, no mass-market discount retailers), Promotion (Steve Jobs keynote, stark minimalist ads, zero feature-list clutter). The coherence across every P was as strategic as any individual choice.

**Key takeaway:** Use the 4Ps as a diagnostic when a product underperforms — isolate which lever is misaligned. A great product priced wrong, sold in the wrong channel, or promoted to the wrong audience will still fail.` },
    { id: 2, name: "Target Market", desc: `A defined segment of the population that a business aims its products, messaging, and marketing efforts at — the people most likely to buy and benefit from what you offer.

**How it works:** A target market is identified by layering four lenses — **demographics** (age, gender, income, education), **psychographics** (values, lifestyle, interests, attitudes), **behavior** (purchase history, brand loyalty, usage patterns), and **geography** (region, city size, climate). The tighter and more specific the definition, the more precisely you can craft messaging, choose channels, and allocate budget. Most businesses have a primary target market and secondary audiences.

**Real-world example:** When Nike launched its women's running line, it didn't target "all women." Its target market was women aged 18–35, urban, fitness-conscious, with disposable income — who already run or aspire to. This let Nike choose Instagram over TV, use aspirational language over functional specs, and partner with female athletes rather than generic celebrities.

**Key takeaway:** A well-defined target market is the foundation of every other marketing decision — channel, message, price point, and creative tone all flow from knowing exactly who you're talking to. Trying to market to everyone usually means reaching no one effectively.` },
    { id: 3, name: "Market Segmentation", desc: `Trying to market to everyone at once almost always fails — you end up with messaging too vague to resonate with anyone. Segmentation solves this by splitting your market into distinct groups so you can tailor your product, pricing, and messaging to each one.

**How it works:** There are five common ways to slice a market, and most strategies combine two or more:

- **Demographic** — age, gender, income, education, job title (e.g., "women 25–34 earning $80K+")
- **Geographic** — country, city, climate, or region (e.g., selling heavy coats only in cold climates)
- **Psychographic** — values, lifestyle, personality, interests (e.g., "eco-conscious urban professionals")
- **Behavioral** — purchase history, usage frequency, brand loyalty, occasion (e.g., "users who bought in the last 90 days")
- **Firmographic** — the B2B equivalent of demographics: company size, industry, revenue, tech stack

**Real-world example:** Spotify uses behavioral segmentation in its marketing. Heavy users who listen 3+ hours daily see ads for Premium; casual listeners get different messaging. Geographically, Spotify prices Premium at $1.99/month in India versus $10.99 in the US — same product, radically different price points built on geographic segmentation.

**Key takeaway:** Segmentation is the foundation of targeting — you can't personalize a message or allocate a budget effectively until you know exactly *who* you're talking to. Start with one or two segments where your product fits best before expanding.` },
    { id: 4, name: "Positioning", desc: `Positioning answers a deceptively simple question: when a customer thinks of your category, where do you fit — and why should they choose you over everyone else? It's not about features; it's about owning a mental slot.

**How it works:** Positioning is defined along axes your customers care about. A classic tool is the **positioning map** — a 2×2 grid plotting your brand against competitors on two key dimensions (e.g., price vs. quality, convenience vs. customization). The goal is to occupy a distinct, defensible position no competitor can easily copy. A useful positioning statement follows the form: *"For [target customer] who [need], [brand] is the [category] that [unique benefit] because [reason to believe]."*

**Real-world example:** Volvo has owned "safety" in the car category for 60+ years. Every ad, engineering investment, and PR story has pointed at one word. By 2022, Volvo's brand was valued at $16.7B — not because other cars are unsafe, but because Volvo built its entire identity around that single claimed attribute and never wavered.

**Key takeaway:** Positioning is a decision made before marketing begins. Pick one or two attributes to own completely — trying to stand for everything means standing for nothing.` },
    { id: 5, name: "Unique Value Proposition (UVP)", desc: `Every sales conversation eventually hits the same question: "Why you, not them?" The UVP is the pre-prepared, honest answer — one statement that tells the right customer exactly what they get that they can't get elsewhere.

**How it works:** A strong UVP sits at the intersection of three things: what you do well, what customers want badly, and what competitors don't offer. It's built from three ingredients — the **customer segment** it speaks to, the **core benefit** delivered (outcome, not feature list), and the **differentiator** that separates it from alternatives. A common format: *"[Product] helps [customer] [accomplish outcome] without [pain/alternative]."* A UVP is not a tagline — taglines are creative expressions of the UVP, not the UVP itself.

**Real-world example:** Slack's original UVP was essentially: *replace email threads and endless meetings with a searchable, organized messaging platform.* When Slack launched, enterprise email was painful and alternatives like HipChat were clunky. Slack's UVP was clarity and speed, not features. It grew from 0 to a $1B valuation in under 1.5 years — the UVP resonated because it named the exact pain (inbox chaos) and offered a concrete alternative.

**Key takeaway:** Your UVP should be specific enough that a competitor can't claim it without lying. If it applies equally to a dozen rivals, keep sharpening it.` },
    { id: 6, name: "Brand Identity", desc: `Brand identity is everything that makes your brand recognizable at a glance — the consistent visual and verbal system that signals "this is us" before a customer reads a single word of copy.

**How it works:** Identity breaks into two layers:

- **Visual identity** — logo, color palette, typography, iconography, photography style, layout grids. These create immediate recognition across packaging, ads, and digital surfaces.
- **Verbal identity** — brand voice (how you sound), tone (how that voice adapts by context — warmer in social, more precise in legal), taglines, naming conventions, and language you consistently use or avoid.

Both layers are governed by a **brand style guide** that ensures consistency across in-house teams, agencies, and partners. Identity is distinct from *brand image* — identity is what you design and publish; image is what customers actually perceive.

**Real-world example:** Oatly built one of the sharpest brand identities in consumer packaged goods. Their packaging uses rough hand-drawn type, self-deprecating copy ("It's like milk, but made for humans"), and a deliberately imperfect aesthetic. Every can, ad, and social post sounds exactly like Oatly without needing the logo. That distinctive identity helped them grow from a niche Swedish brand to a $10B IPO in 2021.

**Key takeaway:** A strong brand identity lowers the cost of every future marketing effort — customers recognize you faster, trust you sooner, and need less convincing with each subsequent touchpoint.` },
    { id: 7, name: "Brand Equity", desc: `Brand equity is the reason people pay $5 for a Starbucks coffee instead of $1.50 for the same caffeine at a gas station. It's the premium — and business resilience — that comes from what a brand *means* to people, not just what it makes.

**How it works:** David Aaker's model breaks brand equity into four pillars:

- **Brand awareness** — how readily customers recognize or recall the brand in its category
- **Perceived quality** — the reputation for quality, which often exceeds what product specs alone justify
- **Brand associations** — the feelings, images, and ideas triggered by the brand (e.g., Patagonia = environmental activism)
- **Brand loyalty** — how consistently customers buy again and resist switching to alternatives

High brand equity gives you pricing power, lower customer acquisition cost (customers seek you out), and resilience during crises — loyal customers give you the benefit of the doubt when things go wrong.

**Real-world example:** When Interbrand measured Apple's brand equity in 2023, it was valued at $502 billion. That figure captures the 30–50% price premium customers accept over comparable hardware specs, the preferential treatment Apple gets from retail and carrier partners, and the fact that negative press cycles fade faster for Apple than for lower-equity brands.

**Key takeaway:** Brand equity is a compounding business asset — it lowers CAC, raises LTV, and protects margin over time. It's built through consistency and trust, not any single campaign.` },
    { id: 8, name: "Brand Awareness", desc: `Before anyone can buy from you, they have to know you exist. Brand awareness is the starting point of the entire marketing funnel — and its depth determines how hard every downstream conversion has to work.

**How it works:** Awareness exists on a spectrum from invisible to default choice:

- **Unaware** — the customer has never encountered your brand
- **Aided recognition** — when prompted ("Have you heard of X?"), they recognize the name
- **Unaided recall** — they can name you without prompting ("What running shoe brands do you know?")
- **Top-of-mind** — you're the *first* brand they mention in the category

Marketers measure awareness through brand tracking surveys run quarterly or continuously. **Top-of-mind awareness (TOMA)** is the highest-value position because it means you're the default choice the moment a need arises. Awareness is built through consistent exposure — reach (how many people see you) and frequency (how often) are the primary levers.

**Real-world example:** Coca-Cola spends roughly $4 billion per year on advertising — not to explain what Coke is, but to maintain top-of-mind awareness in a category where switching costs are zero. When New Coke launched in 1985, brand awareness was so deep that consumer backlash mobilized within days, forcing a reversal in 79 days. Awareness was both the asset and the amplifier of the crisis.

**Key takeaway:** Awareness without differentiation is just recognition — people know you exist but have no reason to prefer you. Always pair awareness-building with clear, consistent messaging about what makes you worth choosing.` },
    { id: 9, name: "Competitive Analysis", desc: `Competing without understanding your competition is like playing chess without watching your opponent's moves. Competitive analysis gives you a structured map of where rivals are strong, where they're vulnerable, and what moves they're likely to make next.

**How it works:** Analysis typically covers three tiers:

- **Direct competitors** — same product, same target customer (e.g., Pepsi vs. Coke)
- **Indirect competitors** — different product, same customer need (e.g., energy drinks vs. coffee)
- **Substitutes and emerging threats** — alternatives that could replace the category entirely

Common frameworks: **SWOT Analysis** (your position relative to rivals), **Porter's Five Forces** (competitive intensity across rivalry, supplier power, buyer power, new entrants, substitutes), and a **competitive matrix** (side-by-side comparison of features, pricing, and positioning). Data sources include competitor pricing pages, review sites (G2, Trustpilot, Capterra), ad libraries (Meta Ad Library, Google Ads Transparency), job postings (signals strategic direction), and SEO tools like Ahrefs for traffic and keyword data.

**Real-world example:** When HubSpot entered the CRM market dominated by Salesforce, their competitive analysis found a clear weakness: Salesforce required dedicated admins and months of implementation. HubSpot positioned its CRM as "free, easy, and set up in minutes." By 2023, HubSpot had 177,000 customers — having captured the SMB segment Salesforce's complexity had left exposed.

**Key takeaway:** The most valuable competitive insight isn't "where are rivals strong?" — it's "where are customers frustrated with every current option?" That gap is the opening worth targeting.` },
    { id: 10, name: "SWOT Analysis", desc: `SWOT is the fastest way to audit where a business stands before making a strategic decision — it forces teams to separate what they control from what they're reacting to, and surface the intersection where strategy lives.

**How it works:** The 2×2 grid maps four factors:

- **Strengths** (internal, positive) — competitive advantages you own: brand, proprietary tech, distribution, talent, cost structure
- **Weaknesses** (internal, negative) — gaps, constraints, or liabilities: thin margins, small team, legacy systems, limited geographic reach
- **Opportunities** (external, positive) — market trends, regulatory shifts, competitor missteps, underserved segments
- **Threats** (external, negative) — new entrants, economic headwinds, substitute products, changing customer behavior

The real value isn't filling in four boxes — it's the **SO/ST/WO/WT strategies** that follow: use strengths to capture opportunities (SO), use strengths to counter threats (ST), fix weaknesses to capture opportunities (WO), and minimize exposed weaknesses against threats (WT).

**Real-world example:** When Netflix decided to invest in original content in 2012, the SWOT was clear: Strength = subscriber data and streaming infrastructure; Weakness = no owned IP, dependent on studio licensing; Opportunity = cable-dissatisfied audiences cutting the cord; Threat = studios withholding rights as Netflix grew. *House of Cards* was a WO move — fix the IP weakness to capture the cord-cutting opportunity. Within three years, originals drove Netflix's international expansion.

**Key takeaway:** SWOT is a starting point, not a conclusion. Its output should be a prioritized shortlist of strategic moves, not a balanced list of observations. If you can't act on it, the analysis wasn't sharp enough.` },
    { id: 11, name: "Go-to-Market Strategy (GTM)", desc: `Building a great product without a GTM strategy is like opening a restaurant with no sign, no address listed, and no plan for who you're cooking for. The GTM answers three questions before launch: who are we selling to, how will they find us, and how do we convert them?

**How it works:** A GTM strategy aligns six elements:

- **Target customer** — Ideal Customer Profile (ICP) and buyer personas, with pain points mapped out
- **Value proposition** — the specific problem you solve and why better than alternatives for this buyer
- **Pricing model** — freemium, subscription, per-seat, usage-based, or enterprise license
- **Channels** — where customers will discover and buy (paid search, outbound sales, partnerships, marketplace, product-led growth)
- **Sales motion** — self-serve, inside sales, field sales, or channel partners — chosen based on deal size and buyer complexity
- **Launch sequence** — beta program, press/PR timing, messaging rollout, milestone targets

The GTM is distinct from an ongoing marketing plan — it's the ignition strategy for a product or market entry.

**Real-world example:** Notion's GTM was entirely product-led and bottom-up. Instead of targeting enterprise IT buyers, Notion launched free for individuals, spread virally through power users sharing templates, and let adoption flow up into teams organically. By the time companies wanted enterprise contracts, internal demand was already pulling from inside. This PLG GTM took Notion from 0 to a $10B valuation in five years with a sales team a fraction of competitors' size.

**Key takeaway:** GTM failure is the #1 reason good products don't succeed. The channel and sales motion must match how your buyer actually discovers, evaluates, and buys — not just what your product does.` },
    { id: 12, name: "Product-Market Fit", desc: `Product-market fit is the point where you've built something people want badly enough to tell others about it unprompted. Before it, growth requires constant pushing. After it, the market pulls you forward.

**How it works:** PMF is the alignment between your product's value and a segment's burning, unmet need. You can feel it — support tickets shift from "how do I do X?" to "can you add Y?", referrals come without asking, and churn drops sharply. Metrics that signal PMF:

- **Retention curve** — cohort retention that flattens (rather than going to zero) means users are staying
- **Sean Ellis test** — survey: "How would you feel if you could no longer use this product?" If 40%+ say "very disappointed," you likely have PMF
- **NPS** — consistent scores above 50 suggest strong word-of-mouth potential
- **Organic growth share** — a rising percentage of new users arriving via referral, not paid channels

PMF is segment-specific — you may have it strongly for one persona and not at all for another.

**Real-world example:** Slack found PMF almost accidentally. Built as an internal tool for a gaming company (Glitch), the team noticed after Glitch shut down that they didn't want to stop using it. When they opened it to other teams, the reaction was identical. Day-1 retention after public launch was 93% — and 8,000 companies signed up in the first 24 hours. The signal wasn't revenue; it was the retention curve.

**Key takeaway:** Don't scale marketing spend before you have PMF — you'll accelerate churn, not growth. PMF is confirmed by retention data and organic referrals, not revenue. A product people actually keep using is the only foundation worth building on.` },
    { id: 13, name: "Total Addressable Market (TAM/SAM/SOM)", desc: `Before pursuing an opportunity — or pitching investors — you need an honest answer to: how big is the prize, and how much of it can you actually reach? TAM/SAM/SOM gives you three increasingly realistic answers.

**How it works:** The three layers nest inside each other, from theoretical to achievable:

- **TAM (Total Addressable Market)** — the entire global revenue opportunity if you somehow captured 100% of the market. For CRM software, TAM is roughly $80B+ — every company on earth that could use CRM.
- **SAM (Serviceable Addressable Market)** — the subset of TAM you can realistically reach with your current product, geography, and go-to-market model. A CRM built for mid-market SaaS companies in North America has a much smaller SAM.
- **SOM (Serviceable Obtainable Market)** — the slice of SAM you can realistically capture in the next 3–5 years, given competition, resources, and sales capacity.

Bottom-up sizing (number of target customers × price per customer) is far more credible than top-down (take X% of a large industry figure). Investors specifically probe SOM assumptions for realism.

**Real-world example:** When Airbnb pitched in 2008, they framed TAM as the entire hotel and lodging market (~$500B globally). SAM was urban leisure travelers comfortable booking accommodations online. SOM was a realistic 1–2% of urban short-term rental demand. Sequoia funded them partly because the bottom-up math — built from actual Craigslist listing volume — held up under scrutiny.

**Key takeaway:** TAM gets investor attention; SOM earns credibility. If your SOM requires >10% market share in year 3, or is too small to build on, the TAM number doesn't matter.` },
    { id: 14, name: "Market Penetration vs Market Development", desc: `When a company wants to grow, it faces a fundamental fork: sell more to the people you already know, or go find new people to sell to. The **Ansoff Matrix** makes this choice — and its risks — explicit.

**How it works:** The Ansoff Matrix maps four growth strategies across two axes (existing vs. new product, existing vs. new market):

- **Market Penetration** (existing product + existing market) — grow share without changing the product. Tactics: competitive pricing, increased ad spend, better distribution, loyalty programs. Lowest risk, highest certainty.
- **Market Development** (existing product + new market) — take what works in one market and replicate it in another. New geographies, new customer segments, new use cases. Medium risk.
- **Product Development** (new product + existing market) — build something new for your current customers. Medium-high risk.
- **Diversification** (new product + new market) — move into unknown territory on both axes simultaneously. Highest risk.

Most companies jump to market development or product development before fully exhausting penetration — leaving cheaper growth on the table.

**Real-world example:** McDonald's used both strategies simultaneously in the 2010s. **Penetration:** all-day breakfast in the US (existing product, existing market) — drove a 5.7% same-store sales increase in Q4 2015. **Development:** aggressive expansion into India, China, and Southeast Asia with localized menus (McAloo Tikki, Spicy McWings) on the same operational playbook.

**Key takeaway:** Run the math on your current market share before assuming you need a new market. It's almost always cheaper to sell more to people who already know you than to acquire an entirely new audience.` },
  ],
};
export default fundamentals;
