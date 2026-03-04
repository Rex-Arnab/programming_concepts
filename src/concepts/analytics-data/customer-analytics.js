const customerAnalytics = {
  name: "Customer Analytics",
  icon: "👥",
  color: "#84cc16",
  concepts: [
    {
      id: 508,
      name: "Customer Segmentation",
      desc: `**Customer segmentation** — dividing your customer base into distinct groups based on shared characteristics, behaviors, or needs, and tailoring strategy, messaging, and product investment to each group. Segmentation is the foundation of personalized marketing and targeted product development.

**Segmentation dimensions:**
- **Demographic:** age, gender, income, education, job title, company size (B2B)
- **Geographic:** country, region, city, timezone
- **Behavioral:** purchase frequency, product usage patterns, features adopted, engagement level
- **Psychographic:** values, interests, lifestyle, motivations
- **Needs-based:** what job the customer is trying to get done, what problem they're solving
- **Value-based:** high LTV vs. low LTV, by product tier, by expansion potential

**B2B segmentation (firmographic):** Company size, industry, technology stack, growth stage, and revenue are the primary firmographic segmentation variables. B2B SaaS companies typically see dramatically different conversion and retention rates across firmographic segments — enterprise segments may have 5x the LTV of SMB with 10x the CAC.

**Actionable vs. descriptive segmentation:** Segments are only valuable if they drive different actions. "High-value customers in financial services" is actionable if it leads to a dedicated CS program, different pricing, and industry-specific content. Segments that exist only in a report and don't change any workflow add reporting complexity without business value.

**Segmentation for product development:** Behavioral segmentation reveals power users (high engagement, high feature adoption) vs. casual users vs. inactive users. Understanding what differentiates power users from casual users — which features they've adopted, what workflows they've built — directly informs which product improvements will drive the broadest upgrade in engagement.

**Key insight:** The most actionable segmentation framework for most early-stage companies is a simple 2x2: engagement level (high/low) × value (high/low). High engagement + high value = champions to leverage for referrals and case studies. Low engagement + high value = churn risk requiring immediate intervention. Low engagement + low value = candidates for winback or sunset. This simple matrix drives four completely different tactics.`,
    },
    {
      id: 509,
      name: "RFM Analysis",
      desc: `**RFM analysis** (Recency, Frequency, Monetary) — a behavioral segmentation framework that scores customers on three dimensions and combines the scores to identify distinct customer groups for targeted marketing. RFM is simple, powerful, and requires only transaction data — making it accessible to any business with purchase history.

**The three dimensions:**
- **Recency:** how recently did the customer last purchase? Recent purchasers are more likely to buy again; customers who haven't purchased in a year are churn risks
- **Frequency:** how often do they purchase? Frequent buyers have formed a habit and have higher LTV; infrequent buyers need re-engagement
- **Monetary:** how much have they spent in total? High monetary customers are your most valuable; high-frequency low-monetary may represent a different product tier opportunity

**Scoring:** Divide customers into quintiles (1-5) on each dimension. A customer scoring 5-5-5 is the ideal: purchased recently, purchases often, and has high total spend. A 1-1-1 customer hasn't purchased recently, rarely purchases, and has spent little — the lowest priority segment.

**RFM segments and tactics:**
- **Champions (high R, high F, high M):** reward with VIP programs, early access, referral asks
- **Loyal customers (medium R, high F, medium M):** upsell to higher tiers or bundles
- **At-risk customers (low R, previously high F):** win-back campaign with re-engagement offer
- **Can't lose them (low R, high M):** urgent win-back — these customers are high-value but drifting
- **Hibernating (very low R, low F):** win-back attempt, then sunset

**When RFM is most valuable:** RFM is especially powerful for e-commerce, retail, and subscription businesses where the three dimensions are clearly defined. For SaaS, "frequency" maps to feature usage or login frequency rather than purchase frequency — adapt the dimensions to your business model.

**Key insight:** The single highest-ROI RFM application is the "At Risk — High Value" segment (formerly high frequency/monetary, now declining recency). These customers represent departing revenue that can often be recovered with personalized intervention at far lower cost than acquiring replacement customers. Automating a win-back sequence triggered when a high-value customer's recency crosses a threshold is a direct revenue recovery mechanism.`,
    },
    {
      id: 510,
      name: "Churn Prediction & Prevention",
      desc: `**Churn prediction** — using ML models to identify customers at risk of canceling or disengaging before they actually do, enabling proactive retention interventions. The goal is to give customer success, marketing, or product teams a prioritized list of high-risk customers to act on while there's still time to recover them.

**Churn signals (leading indicators):**
- Declining login frequency or session depth
- Feature adoption breadth decreasing (using fewer features than before)
- Decreasing API call volume or usage metrics
- Increasing support ticket volume or negative sentiment
- Billing contact changes (budget reviews often precede cancellations)
- Key user departure (the product champion leaves the company)
- No activity from admin users (engagement shifting to lower-authority users)

**Building a churn model:**
- Define churn: subscription canceled within X days? No login in 90 days? Account downgrade?
- Collect features: usage events, engagement scores, firmographic attributes, support interactions
- Label historical data: which accounts churned in the past 6 months?
- Train a classifier (logistic regression, random forest, or gradient boosting work well for churn)
- Score active accounts weekly and deliver a ranked churn risk list to CS team

**Health scores as a proxy:** Full ML churn models require data science capability. A simpler alternative is a rules-based customer health score — weighted average of engagement metrics (login frequency, feature adoption breadth, NPS response) normalized to a 0-100 score. Accounts below 40 are flagged for CS outreach.

**Churn prevention interventions:** The churn model is only valuable if it triggers action. Common interventions by score tier: high-risk accounts → CS outreach call; medium-risk → automated re-engagement email with success content; low-risk → routine QBR scheduling. The intervention must match the urgency — a CS call for every medium-risk account is not scalable.

**Key insight:** Churn prediction's ROI is entirely determined by the cost of intervention and the success rate. If CS can recover 15% of high-risk accounts and the average ACV is $12,000, each recovered account is worth $12,000 in preserved revenue — a calculation that almost always justifies significant CS investment in high-risk outreach.`,
    },
    {
      id: 511,
      name: "Customer Health Score",
      desc: `**Customer health score** — a single composite metric that aggregates multiple signals of customer engagement, adoption, and satisfaction into a 0-100 score reflecting how healthy a customer relationship is. Health scores are the primary operational tool for customer success teams to prioritize accounts and predict renewal outcomes.

**Building a health score:**

1. **Identify the signals:** product usage frequency, feature adoption breadth, user count and seat utilization, NPS or CSAT score, support ticket sentiment, training completion, QBR engagement, executive sponsor activity

2. **Assign weights:** not all signals are equally predictive of renewal or churn. Use historical data to determine which signals most strongly correlate with renewal vs. churn — then weight the score accordingly. Usage depth typically has highest weight

3. **Score and aggregate:** normalize each signal to a 0-100 scale, then compute the weighted average

4. **Define thresholds:** green (>70 — healthy, renewal likely), yellow (40-70 — attention needed), red (<40 — at risk, escalate)

**Health score drift:** Health scores must be reviewed and recalibrated regularly. As products evolve, the signals that predict renewal change. A feature that was a strong adoption indicator 18 months ago may be superseded by a newer, more critical feature.

**Operationalizing the score:** A health score is only valuable if it drives action. Integrate health scores into Salesforce or Gainsight so CS managers see them in their daily workflow. Configure alerts when a previously-green account drops to yellow. Link health scores to renewal probability forecasts for revenue operations.

**Key insight:** The most common health score failure is including too many signals without validating their predictive value. Adding 20 signals weighted by gut feel creates a score that looks comprehensive but doesn't predict churn better than usage frequency alone. Validate your health score's predictive accuracy against historical renewal/churn outcomes — only include signals that demonstrably improve prediction accuracy.`,
    },
    {
      id: 512,
      name: "Voice of Customer (VoC) Analytics",
      desc: `**Voice of Customer (VoC) analytics** — the systematic collection, analysis, and actioning of customer feedback to understand their needs, pain points, and satisfaction levels. VoC provides the qualitative context that quantitative analytics can't — the "why" behind behavioral data.

**VoC data sources:**
- **NPS surveys:** quantitative loyalty score with qualitative follow-up ("What's the primary reason for your score?")
- **CSAT (Customer Satisfaction) surveys:** immediate post-interaction feedback (after support ticket resolution, after onboarding call)
- **CES (Customer Effort Score):** how much effort did the customer have to expend to complete a task? Low effort = high satisfaction
- **Product feedback tools:** Canny, UserVoice — structured feature request capture
- **Support ticket analysis:** categorize support tickets by issue type and track volume trends
- **Win/loss interviews:** why did prospects choose or reject your product in sales cycles?
- **Churn exit surveys:** why did canceling customers leave?

**Thematic analysis:** Open-ended feedback requires thematic analysis — clustering responses by topic to identify patterns. GPT-based text classification dramatically accelerates this: prompt an LLM to classify each feedback response into predefined categories, then analyze category frequency and sentiment trends.

**VoC-to-product pipeline:** VoC value is only realized if insights reach product decisions. Establish a regular review (monthly) where top VoC themes are presented to product leadership alongside quantitative impact estimates. A theme appearing in 25% of churn exit surveys is a quantified product gap with a measurable retention impact.

**Key insight:** Exit survey responses from churned customers are the single highest-signal VoC data source available. A canceling customer has no incentive to be diplomatic — their stated reason for leaving is typically the most honest and actionable feedback you'll ever receive. A dedicated churn exit survey, reviewed weekly, surfaces the product gaps and service failures that are costing you the most revenue.`,
    },
    {
      id: 513,
      name: "Customer Journey Analytics",
      desc: `**Customer journey analytics** — measuring and analyzing the complete sequence of customer interactions across all touchpoints — from first awareness through purchase, onboarding, usage, support, and renewal — to understand experience quality and identify improvement opportunities at each stage.

**The full customer journey stages:**
1. **Awareness:** first exposure to the brand (ad, content, word-of-mouth)
2. **Consideration:** evaluating the product (website visits, trials, demos, comparisons)
3. **Acquisition:** converting to customer (purchase, sign-up, subscription)
4. **Onboarding:** reaching first value — the activation moment
5. **Adoption:** regular feature usage and workflow integration
6. **Expansion:** upgrading, buying more seats, adopting new features
7. **Advocacy:** referring others, providing testimonials, submitting reviews
8. **Renewal/retention:** continuing the relationship vs. churning

**Cross-channel journey complexity:** Customers move between channels in ways that don't follow neat linear progressions. A customer might: see a LinkedIn post (awareness) → read a blog post (consideration) → attend a webinar (deeper consideration) → start a trial (acquisition) → receive an onboarding email (onboarding) → engage with a in-app tooltip (adoption). Each touchpoint is owned by a different team — marketing, sales, product, customer success.

**Journey mapping vs. journey analytics:** Journey mapping is qualitative — workshops and user research that document the intended journey. Journey analytics is quantitative — data-driven analysis of actual journeys, measuring where the intended path diverges from actual behavior. Both are necessary; maps without data are assumptions; data without maps lack narrative context.

**Key insight:** The biggest journey analytics opportunity for most companies is the boundary between marketing and product — the transition from prospect to user. Marketing tracks acquisition; product tracks usage. The gap between these two systems means no one owns the full picture of what happens between "ad click" and "activated user." Closing this gap with a unified customer data layer (CDP + product analytics) reveals the most impactful optimization opportunities.`,
    },
    {
      id: 514,
      name: "Propensity Modeling",
      desc: `**Propensity modeling** — building ML models that predict the probability of a specific user action: converting from free to paid, purchasing a specific product, churning, upgrading, or responding to a campaign. Propensity scores enable prioritized, targeted interventions rather than treating all customers the same.

**Common propensity models in marketing analytics:**
- **Purchase propensity:** probability that a visitor converts to a customer; used to qualify leads and optimize bidding
- **Churn propensity:** probability that a customer cancels; used to prioritize CS outreach
- **Upgrade propensity:** probability that a freemium or lower-tier user upgrades; used to target in-app upgrade prompts
- **Product affinity:** probability that a customer will purchase a specific product; used for personalized recommendations and cross-sell

**Model inputs (features):** Behavioral features (engagement frequency, feature adoption, session depth), firmographic features (company size, industry, growth stage), historical purchase behavior, and interaction history (emails opened, support tickets, NPS score) all contribute predictive power.

**Translating scores to actions:** A propensity score is only valuable if it triggers differentiated treatment. Customers scoring in the top decile for upgrade propensity get a personalized in-app prompt with a specific offer. Customers in the bottom decile for churn propensity receive lighter-touch check-ins. Customers in the top decile for purchase propensity are prioritized for sales outreach.

**Propensity score calibration:** A well-calibrated propensity model means a predicted 80% conversion probability corresponds to approximately 80% of those users actually converting. Calibration matters when absolute probability thresholds determine action (e.g., "call everyone above 60% churn probability").

**Key insight:** The highest-ROI propensity model for most companies is the upgrade propensity model — identifying which free or low-tier users are most likely to upgrade in the next 30 days and triggering personalized upgrade prompts for them. This model converts a generic upgrade campaign (email everyone) into a targeted, personalized outreach that typically produces 3-5x higher conversion rates from the same effort.`,
    },
    {
      id: 515,
      name: "NPS Analytics & Action",
      desc: `**NPS analytics** — moving beyond NPS as a single number to extract, segment, trend-analyze, and operationalize Net Promoter Score data to drive product improvements and customer retention. Raw NPS scores are lagging indicators; NPS analytics turns them into a real-time customer intelligence system.

**NPS segmentation analysis:**
- By customer segment: do enterprise customers score differently than SMB? Do users in North America score differently than APAC?
- By product tier: does the free plan have lower NPS than paid tiers? (Expected — but by how much?)
- By activation status: do users who've reached the aha moment score higher than those who haven't?
- By feature adoption: which features most strongly correlate with Promoter scores?

**Verbatim text analysis:** The NPS follow-up question ("What's the primary reason for your score?") is where the real insight lives. Analyze verbatim responses by:
- Thematic clustering (group responses by topic: onboarding, pricing, missing features, support, performance)
- Sentiment by theme (which topics generate negative vs. positive sentiment?)
- Volume by segment (which themes are most common among Detractors in enterprise accounts?)

**NPS trend analysis:** Track NPS over time by cohort and by product version. If users who started using the product after your Q2 redesign have 15 points higher NPS than those who onboarded in Q1, the redesign demonstrably improved satisfaction. Month-over-month NPS trends correlate with future retention and expansion revenue.

**Closing the loop:** For Detractor scores, personal follow-up from CS or product within 48 hours converts 20-30% of Detractors to Neutrals and 5-10% to Promoters. This "close the loop" process is the highest-ROI use of NPS data, but only works if it's fast — delayed follow-up loses the emotional window.

**Key insight:** NPS without the verbatim is nearly worthless. The score tells you where you are; the verbatim tells you how to move. Companies that segment verbatim responses by churn risk, account value, and product area — then route those insights to the specific product teams responsible — get dramatically more value from NPS than companies that report a quarterly average score.`,
    },
    {
      id: 516,
      name: "Win/Loss Analysis",
      desc: `**Win/loss analysis** — the systematic study of why sales deals were won or lost, to improve sales effectiveness, product positioning, competitive differentiation, and marketing messaging. Win/loss analysis bridges the gap between sales team intuitions and objective customer perspectives.

**Why self-reported win/loss is unreliable:** Salespeople have incentives to attribute losses to product gaps or pricing (external factors) rather than their own execution. Win/loss data from CRM fields like "loss reason: price" is typically 60-70% inaccurate relative to what prospects actually said in post-decision interviews.

**Win/loss interview methodology:**
- Interview lost prospects within 2-4 weeks of the decision (decision is still fresh)
- Use a neutral third-party interviewer when possible — prospects are more candid with someone not from sales
- Ask about the full decision journey: what triggered the search, how they evaluated options, what mattered most, who was involved
- Understand both what they valued in the winner AND what concerned them about you

**Win/loss metrics:**
- Win rate by competitor (who are you losing to most often?)
- Win rate by deal size, industry, and use case
- Win rate trend over time (are you winning more or fewer competitive deals?)
- Deal cycle length for wins vs. losses (are long deals more likely to be lost?)

**Win/loss-to-product pipeline:** Win/loss reveals product gaps — features that caused you to lose deals that you would otherwise have won. These are the highest-priority feature requests because they have a measurable revenue impact: "we lost $450K in Q3 to competitors who had SSO/SCIM integration that we don't offer."

**Key insight:** Win/loss analysis is one of the most impactful and most neglected analytics functions in B2B companies. A dedicated win/loss program — 10-15 interviews per quarter, analyzed thematically, and presented to product and marketing leadership — consistently surfaces insights that change product roadmaps and messaging in ways that produce measurable win rate improvements.`,
    },
    {
      id: 517,
      name: "Sentiment Analysis & Review Analytics",
      desc: `**Sentiment analysis** — using NLP techniques to automatically classify text (reviews, survey responses, support tickets, social mentions) as positive, negative, or neutral, and to identify the specific topics or aspects associated with each sentiment. Review analytics applies this to public review platform data to benchmark competitive positioning and identify improvement areas.

**Sources for sentiment analysis:**
- App store reviews (Apple App Store, Google Play)
- Software review platforms (G2, Capterra, Trustpilot, TrustRadius)
- Social media mentions (Twitter/X, Reddit, LinkedIn)
- NPS and CSAT verbatim responses
- Support ticket content
- Product feedback tools (Canny, UserVoice)

**Aspect-based sentiment analysis:** Beyond "positive/negative," aspect-based sentiment identifies which features or attributes are receiving positive vs. negative sentiment. "The dashboard is beautiful but the reports are too slow" is positive on design and negative on performance — aggregate sentiment would show "neutral" but miss both the specific praise and the specific complaint.

**Competitive review analytics:** Scraping and analyzing competitors' reviews reveals their product strengths (for competitive positioning) and weaknesses (for conquest messaging). If competitors consistently receive negative reviews about customer support, and you have strong customer support, this is a positioning opportunity.

**Automated sentiment monitoring:** Set up real-time sentiment monitoring on your brand name and product across review platforms and social media. A sudden spike in negative sentiment (1-star reviews mentioning the same issue) is an early warning of a product problem before it affects renewal rates.

**Key insight:** G2 and Capterra reviews are significantly more valuable than their raw star ratings suggest. The verbatim reviews contain specific, detailed feedback from users who took time to document their experience — much higher signal than star ratings. Exporting and thematically analyzing all reviews every quarter is a high-signal, low-effort product intelligence activity.`,
    },
  ],
};

export default customerAnalytics;
