const ecommerceAnalytics = {
  name: "E-commerce Analytics",
  icon: "🛒",
  color: "#ec4899",
  concepts: [
    {
      id: 528,
      name: "E-commerce Conversion Funnel",
      desc: `**E-commerce conversion funnel** — the sequential stages an online shopper moves through from first landing on your site to completing a purchase. Funnel analysis reveals where shoppers abandon, quantifies the revenue impact of each drop-off, and prioritizes optimization efforts.

**The standard e-commerce funnel stages:**
1. **Landing/awareness:** visitor arrives (from ad, search, social, email, direct)
2. **Browse/discovery:** product listing pages, category navigation, search results
3. **Product consideration:** product detail page view — the critical evaluation stage
4. **Intent signal:** add to cart / wishlist
5. **Checkout initiation:** begin checkout process
6. **Checkout completion:** payment submitted successfully

**Industry benchmarks (Baymard Institute 2024):**
- Product page → Add to cart: 5-10% (high variance by category and price point)
- Add to cart → Checkout initiation: 40-60%
- Checkout initiation → Purchase completion: 50-60%
- Overall visit-to-purchase: 1.4-3% average

**Segmenting the funnel:** Aggregate funnel rates mask important segment differences. Always segment by:
- Device type (mobile conversion is typically 3-4x lower than desktop)
- Traffic source (organic search often converts better than paid social)
- New vs. returning visitors (returning visitors convert at 2-4x the rate of new visitors)
- Price tier (high-price items have inherently lower funnel conversion rates)

**Funnel vs. path analysis:** Funnels test a hypothesis about what the optimal journey is. Path analysis reveals what users actually do when they don't follow the funnel — they may be navigating to the homepage, reading the About page, or looking at shipping policies before converting. These diversions reveal information needs unmet by the standard funnel.

**Key insight:** The highest-leverage e-commerce funnel optimization is typically at the add-to-cart → checkout transition. Research by Baymard finds that 23% of shoppers abandon because "the site wanted me to create an account." Removing the mandatory account creation requirement for checkout is often the single highest-ROI change in a checkout funnel.`,
    },
    {
      id: 529,
      name: "Revenue Analytics Metrics",
      desc: `**E-commerce revenue analytics** — the set of metrics that quantify the health and performance of an online retail business beyond simple topline revenue, revealing the structure of revenue generation and enabling targeted optimization.

**Core e-commerce metrics:**
- **GMV (Gross Merchandise Value):** total value of goods sold before returns, refunds, and discounts. The top-line e-commerce metric
- **Net revenue:** GMV minus returns, refunds, and promotional discounts. The actual realized revenue
- **Average Order Value (AOV):** average GMV per completed order. AOV = Total Revenue / Total Orders
- **Units Per Transaction (UPT):** average number of items per order. Influenced by cross-sell and bundle strategies
- **Revenue Per Session (RPS):** conversion rate × AOV. The most useful single metric for measuring the combined effectiveness of traffic conversion and order value
- **Return rate:** percentage of purchased items returned. High return rates significantly erode net revenue and can indicate sizing, quality, or expectation mismatches

**Revenue breakdown analysis:**
- By product category: which categories drive the most revenue vs. the most margin?
- By customer segment: first-time buyers vs. repeat customers vs. VIP customers
- By traffic source: which channels drive the highest-value orders?
- By device type: mobile vs. desktop revenue contribution
- By geography: international revenue expansion opportunities

**Revenue forecasting:** Build a bottom-up revenue model: sessions × conversion rate × AOV = revenue. This decomposition makes forecasting modular — you can model the impact of improving each input independently.

**Key insight:** Revenue per session is more useful than conversion rate alone because it captures both the likelihood of conversion and the value of that conversion. A campaign driving 5% conversion at $30 AOV ($1.50 RPS) is less valuable than a campaign driving 3% conversion at $90 AOV ($2.70 RPS). Always evaluate acquisition channels on revenue generated, not on conversion rate alone.`,
    },
    {
      id: 530,
      name: "Cart Abandonment Analysis",
      desc: `**Cart abandonment** — the most commonly tracked e-commerce metric, measuring the percentage of shoppers who add items to their cart but don't complete the purchase. Average cart abandonment rate across industries is approximately 70% (Baymard Institute), meaning 7 out of 10 shoppers who demonstrate purchase intent don't convert.

**Why shoppers abandon carts:**
- Unexpected shipping costs or high total cost revealed at checkout (49% of abandonment — Baymard)
- Required account creation (24%)
- Delivery timeline too slow
- Site didn't inspire trust or feel secure
- Too complex/lengthy checkout process
- Couldn't see/calculate total cost upfront
- Couldn't find preferred payment method
- Browsing and not ready to buy (window shopping with natural dropout)

**Abandonment segmentation:** Not all abandonment is equal. Segment abandonment by:
- Stage in checkout (added to cart only vs. started checkout vs. entered payment info vs. submitted with error)
- Cart value (high-value abandonments are higher priority for recovery)
- Device type (mobile abandonment is structurally higher than desktop)
- Customer status (first-time vs. returning — returning customer abandonment is more recoverable)

**Cart abandonment recovery tactics:**
- **Email recovery sequences:** series of 3 emails at 1 hour, 24 hours, 72 hours post-abandonment. Subject lines that reference specific products recover at higher rates than generic cart reminders. First email urgency is highest
- **Retargeting ads:** show abandoned items in Facebook/Instagram/Google retargeting campaigns
- **Push notifications:** for mobile app purchases, push notifications recover 5-8% of app abandonment

**Key insight:** The highest-ROI cart abandonment intervention is fixing the cause, not treating the symptom. If 30% of abandonment is due to surprise shipping costs, display shipping costs earlier in the funnel rather than building elaborate recovery sequences. Every cart recovered via email is a user who experienced friction; fix the friction and you increase the initial conversion rate for all future shoppers.`,
    },
    {
      id: 531,
      name: "Product Performance Analytics",
      desc: `**Product performance analytics** — measuring how individual products and product categories contribute to traffic, conversion, and revenue, enabling merchandising decisions about which products to promote, price, bundle, and discontinue.

**Key product performance metrics:**
- **Product view-to-add-to-cart rate:** what percentage of users who view a product add it to cart? Low rates indicate price objections, poor descriptions, or insufficient images
- **Product add-to-cart-to-purchase rate:** of products added to cart, how many are ultimately purchased? High rates indicate strong purchase intent; low rates may indicate cart-as-wishlist behavior
- **Revenue by product:** absolute and percentage of total revenue contribution
- **Gross margin by product:** revenue contribution minus cost of goods — a high-revenue product with low margin may be less valuable than a lower-revenue product with high margin
- **Inventory turnover:** how quickly products sell relative to stock level — fast turnover = high demand; slow turnover = overstock risk

**GA4 e-commerce events for product analytics:** GA4's e-commerce schema tracks view_item, add_to_cart, remove_from_cart, begin_checkout, purchase, and refund events with item-level parameters (item_id, item_name, price, quantity, item_category). This enables product-level funnel analysis natively within GA4.

**Cross-sell and upsell analytics:** Measure the lift from product recommendations. An "Customers also bought" recommendation module should be evaluated on: click-through rate, units per transaction impact, and whether recommended products would have been discovered without the recommendation.

**Seasonal product analysis:** Track category and product performance through seasonal cycles to identify which products drive peak-season revenue and which require markdown clearance. Cohort-based analysis by first-purchase product reveals which gateway products predict long-term customer value.

**Key insight:** Product view-to-cart rate is the most actionable product page metric because it reflects the combined effect of price perception, image quality, description clarity, and trust signals for a specific product. Low rates on high-traffic products represent concentrated opportunities — small improvements to a product with 50,000 monthly views have more impact than large improvements to a product with 500 views.`,
    },
    {
      id: 532,
      name: "Average Order Value (AOV) Optimization",
      desc: `**AOV optimization** — strategies and tactics to increase the average amount spent per transaction, multiplying revenue from the same conversion rate and traffic volume. AOV is one of three levers in the revenue formula (revenue = sessions × conversion rate × AOV) and often the most accessible for immediate improvement.

**AOV optimization tactics:**

**Free shipping thresholds:** Setting a free shipping threshold slightly above your current AOV (e.g., AOV is $65 → set free shipping at $75) motivates shoppers to add more to their cart. Amazon's data shows that free shipping thresholds reliably increase AOV by 15-30% when placed at the right increment above the natural spend point.

**Product bundles:** Group complementary products at a slight discount — reduces price resistance for buying multiple items while maintaining better margin than discounting individual items. "Starter kit" bundles particularly effective for beauty, fitness, and hobby categories.

**Cross-sell and upsell recommendations:**
- **Cross-sell:** at product page and checkout — "Complete the look," "Frequently bought together"
- **Upsell:** higher-tier or premium version of the viewed product
- **Order bump:** add-on at checkout for a complementary item (gift wrapping, premium packaging, accessories)

**Tiered pricing and volume discounts:** "Buy 2, get 10% off; buy 3, get 20% off" structures encourage multi-unit purchases without discounting single-unit transactions.

**Minimum order for discount:** "Spend $X, get Y% off your order" creates an AOV floor — effective in promotional contexts but can depress margins if discount depth is miscalibrated.

**Key insight:** AOV optimization has different LTV implications for subscription vs. one-time purchase businesses. In subscription businesses, AOV optimization focuses on tier selection and add-ons at sign-up. In e-commerce, first-order AOV is less important than the pattern it sets — customers whose first purchase is above a certain threshold often have fundamentally higher LTV because they self-selected into a commitment level that predicts repeat purchase behavior.`,
    },
    {
      id: 533,
      name: "Customer Acquisition & Retention in E-commerce",
      desc: `**E-commerce growth analytics** — balancing new customer acquisition and existing customer retention, understanding the economics of each, and optimizing the channel mix to maximize profitable growth. The interplay between CAC, AOV, repeat purchase rate, and LTV determines whether an e-commerce business is structurally profitable.

**The repeat purchase ratio:** What percentage of your customers buy more than once? This is the single most important health indicator for an e-commerce business that isn't purely subscription. A brand where 30% of customers purchase again within 12 months has a fundamentally different business model than one where only 5% return.

**First-time vs. repeat customer revenue split:** Track what percentage of monthly revenue comes from new vs. returning customers. Most healthy e-commerce businesses aim for 40-60% repeat customer revenue by year 3. If >80% of revenue is always from new customers, the brand is perpetually acquiring without building a loyal base.

**LTV by acquisition channel:** The most important e-commerce attribution insight is LTV by channel, not just first-order conversion. An influencer campaign with high initial conversion but low repeat purchase rate may be less valuable than a Google Shopping campaign with lower conversion but 2x the repeat purchase rate.

**The CAC payback in e-commerce:** For subscription businesses, CAC payback is predictable. For e-commerce, it depends on repeat purchase rate. If CAC is $30 and margin per order is $20, the first purchase doesn't pay back CAC. If 40% of customers buy again within 6 months (adding $20 more margin), payback occurs around the second purchase. If only 10% repurchase, you never achieve payback on customer acquisition costs.

**Key insight:** The most impactful e-commerce analytics investment is accurately measuring and optimizing the repeat purchase rate. A 10% increase in first-year repeat purchase rate changes the entire unit economics of customer acquisition — making previously unprofitable channels profitable and justifying higher CPAs for high-LTV customer acquisition.`,
    },
    {
      id: 534,
      name: "Subscription & DTC Analytics",
      desc: `**Subscription e-commerce analytics** — measurement frameworks for direct-to-consumer brands selling on subscription (beauty boxes, meal kits, specialty consumables, digital product + physical component bundles). Subscription models introduce metrics distinct from one-time-purchase e-commerce.

**Subscription-specific metrics:**
- **Active subscriber count:** the primary topline metric
- **Subscriber acquisition rate:** new subscribers per period
- **Subscriber churn rate:** cancellations per period (monthly, annual)
- **Average subscription duration:** mean tenure before cancellation — directly drives LTV
- **Pause vs. cancel rate:** subscription pause (temporary hold) is a leading indicator of eventual churn — track pause rate as a churn precursor
- **Subscription LTV:** average subscription duration × monthly net revenue per subscriber × gross margin

**Subscription cohort analysis:** Track each acquisition cohort's survival curve — what percentage of subscribers acquired in month M are still active at M+1, M+3, M+6, M+12? Improving early-cohort survival (months 1-3) has the highest compounding impact because it extends the duration of the entire subscription.

**Churn reason analysis:** Unlike SaaS, subscription e-commerce churn often has tangible, actionable reasons: "too expensive," "product stopped working for me," "forgot to cancel during pause." Exit surveys are critical — the reasons inform product, pricing, and win-back messaging.

**Box personalization as retention lever:** Subscription boxes that personalize contents based on feedback (like Stitch Fix, Ipsy) have lower churn rates than generic curation, because personalization creates perceived value specific to the subscriber. Tracking personalization feedback completion rate as a leading indicator of retention is an effective subscription health metric.

**Key insight:** The subscription e-commerce metric most correlated with long-term LTV is "skip rate" — the percentage of boxes subscribers skip in any given month. Subscribers who frequently skip are on the path to cancel. An automated win-back flow triggered when skip rate exceeds a threshold (e.g., 2 consecutive skips) significantly reduces conversion from skip to cancel.`,
    },
    {
      id: 535,
      name: "Merchandising Analytics",
      desc: `**Merchandising analytics** — the use of data to inform product catalog decisions: which products to feature, promote, mark down, bundle, or discontinue. Effective merchandising analytics connects inventory, conversion, and revenue data to make catalog management proactive rather than reactive.

**Search merchandising analytics:** Site search provides direct demand signals for merchandising. Track search queries with no results (new product opportunities or inventory gaps) and high-search, low-purchase products (intent exists but conversion is low — investigate whether the product, price, or page is the barrier).

**Category performance analytics:**
- Revenue per category: which categories drive the most revenue?
- Margin per category: revenue is not margin — some high-revenue categories are low-margin
- Conversion rate per category: some categories browse more than convert (inspiration categories) vs. high-intent categories that convert well
- Average images per product page × conversion correlation: products with more high-quality images typically convert better

**Inventory-conversion correlation:** Track the impact of inventory status on conversion. "Low stock" indicators increase conversion by leveraging scarcity psychology. Out-of-stock products damage SEO and should trigger automated alerts when stock falls below threshold.

**Price elasticity analysis:** How does conversion rate respond to price changes? A/B testing different price points (or analyzing historical price changes) reveals price sensitivity by category. Some categories have inelastic demand (price changes don't significantly affect conversion); others are highly elastic.

**New product launch analytics:** Track first 30-day performance of new product introductions against the launch hypothesis: did the product reach projected view-to-cart rates? Are early reviews positive? Is it gaining repeat purchases? Early indicators of product-market fit within the catalog.

**Key insight:** Gross margin per category, not revenue per category, is the right metric for merchandising investment decisions. A category that contributes 25% of revenue but 10% of gross margin should receive less promotional investment than a category with 15% of revenue and 30% of gross margin. Promotional spend on low-margin categories often fails unit economics tests that high-margin categories easily pass.`,
    },
    {
      id: 536,
      name: "Mobile Commerce Analytics",
      desc: `**Mobile commerce (m-commerce) analytics** — measuring the specific performance, behavior, and conversion patterns of mobile shoppers. Mobile accounts for 60-75% of e-commerce traffic but only 30-45% of revenue in most categories, reflecting a persistent mobile conversion gap that represents one of the most significant optimization opportunities in e-commerce.

**The mobile conversion gap:** Mobile conversion rates are typically 3-4x lower than desktop (Kibo Commerce benchmarks: desktop 3-4%, mobile 1-2%, tablet 2-3%). Contributing factors:
- Smaller screen size makes product detail evaluation harder
- Checkout friction is amplified on mobile (typing payment details on a touchscreen)
- Mobile sessions tend to be shorter and more browsing-oriented
- Security concerns are higher on mobile for many demographics
- Page speed issues affect mobile more due to network variability

**Mobile-specific analytics:**
- Mobile conversion rate separately from overall conversion rate
- Mobile page speed (Core Web Vitals are measured separately for mobile in GSC)
- Mobile form completion rates (identify where mobile users abandon forms)
- App vs. mobile web conversion rate (apps typically convert 2-3x higher than mobile web)

**Mobile optimization tactics with measurement:**
- Implement Apple Pay / Google Pay → measure checkout completion rate improvement
- Sticky "Add to Cart" bar that stays visible while scrolling product description
- Mobile-optimized image galleries (swipe gestures, zoom)
- Accelerated Mobile Pages (AMP) for product pages from search traffic

**App analytics:** For brands with shopping apps, track app-specific metrics: push notification open rate, deep link conversion, session-to-purchase rate, and app-exclusive feature usage. App users typically have 2-3x higher LTV than mobile web users.

**Key insight:** The highest-ROI mobile commerce investment for most brands is implementing accelerated payment methods (Apple Pay, Google Pay, Shop Pay) before any UX optimization. Reducing checkout from 10+ form fields to a single biometric confirmation can increase mobile checkout conversion by 40-80% — a more significant impact than months of UX testing work.`,
    },
    {
      id: 537,
      name: "Email & SMS Analytics for E-commerce",
      desc: `**Email and SMS analytics for e-commerce** — measuring the revenue contribution, engagement metrics, and customer lifecycle performance of owned channel communications. Email and SMS are among the highest-ROI marketing channels for e-commerce because they reach an audience that has already demonstrated interest.

**Email performance metrics:**
- **Deliverability rate:** percentage of emails reaching the inbox (not spam). Low deliverability undermines every other metric
- **Open rate:** percentage of delivered emails opened. Industry average: 20-25% for e-commerce. Apple Mail Privacy Protection (MPP) inflates open rates by pre-loading images — treat open rate trends rather than absolutes since MPP
- **Click rate:** percentage of delivered emails that generated a click. More reliable than open rate post-MPP. E-commerce average: 2-3%
- **Revenue per email:** total revenue attributed to the email / emails sent. The most business-relevant email metric
- **Unsubscribe rate:** high unsubscribe rates on specific campaigns indicate frequency or relevance problems

**Email lifecycle flows vs. campaigns:**
- **Flows (automated):** welcome series, abandoned cart, post-purchase, win-back, browse abandonment — triggered by behavior, consistently high ROI
- **Campaigns:** promotional sends, newsletters, product launches — batch sends with variable ROI

**SMS metrics:** SMS typically has 90%+ open rates (most texts are read) and 15-20% CTR — dramatically higher than email. But SMS frequency sensitivity is high — over-messaging causes opt-out rates that permanently reduce list value. Revenue per SMS subscriber is typically 3-5x higher than email subscriber.

**Klaviyo benchmark:** E-commerce brands on Klaviyo report that email drives 20-30% of total revenue on average. Flows (automated sequences) typically drive 60-70% of email revenue despite being a minority of sends — because they're behavior-triggered and therefore highly relevant.

**Key insight:** The welcome series (emails 1-3 sent to new subscribers) is the highest-leverage email optimization in e-commerce. New subscribers have maximum attention and curiosity — the welcome series converts at 5-10x the rate of promotional campaigns to the same audience. Invest in a high-quality, multi-email welcome series before optimizing any other email flow.`,
    },
  ],
};

export default ecommerceAnalytics;
