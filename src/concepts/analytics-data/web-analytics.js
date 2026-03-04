const webAnalytics = {
  name: "Web Analytics",
  icon: "🌐",
  color: "#3b82f6",
  concepts: [
    {
      id: 444,
      name: "Google Analytics 4 (GA4)",
      desc: `**Google Analytics 4 (GA4)** — Google's current analytics platform, replacing Universal Analytics (UA) in July 2023. GA4 is built on an event-based data model rather than the session-based model of UA — every interaction is an event, which provides more flexible and precise measurement of modern user behavior across web and app.

**The core shift from UA:** In UA, a session was the unit of measurement — everything was filtered through the lens of "what happened in this session." In GA4, events are the unit — each interaction (page_view, scroll, click, purchase) is a discrete event with its own properties. This enables more accurate cross-device measurement and future-proof data modeling.

**Key GA4 features:**
- **BigQuery export (free):** Raw event data exportable to BigQuery for SQL analysis — previously a GA360 paid feature
- **Exploration reports:** Free-form analysis builder for funnels, paths, and cohorts
- **Predictive audiences:** ML-powered segments (users likely to purchase, likely to churn) for remarketing
- **Enhanced measurement:** automatic tracking of scrolls, outbound clicks, video plays, and file downloads without additional code

**The learning curve:** GA4's interface is genuinely more complex than UA. Metrics have different definitions (sessions, bounce rate renamed "engagement rate"), report structures changed, and custom reporting requires the Exploration interface rather than standard reports.

**Key insight:** GA4's BigQuery free export is its most underutilized feature and its most powerful differentiator from competing platforms. Raw event-level data in BigQuery enables custom attribution modeling, cohort analysis, and ML scoring that no GA4 built-in report can match. Set up the BigQuery link on day one — even if you're not using it yet, you'll be glad the historical data is accumulating.`,
    },
    {
      id: 445,
      name: "Sessions, Users & Pageviews",
      desc: `**The core web analytics trinity** — sessions, users, and pageviews are the foundational metrics of web analytics, but their definitions have more nuance than their names suggest, and conflating them produces incorrect analysis.

**Users:** In GA4, a "user" is identified by a unique user identifier — either a logged-in user ID you provide, a Google Signals cross-device identity, or a device-level ID. "New users" vs. "returning users" depends on whether the identifier has been seen before. User counts are inherently fuzzy — cookie deletion, multiple devices, and private browsing all cause the same human to be counted as multiple users.

**Sessions:** A session is a group of events from the same user within a time window. In GA4, a session starts with the first event and ends after 30 minutes of inactivity (configurable). One user can have multiple sessions in a day. Session attribution (which source/medium "gets credit" for the session) is determined at the first event of the session.

**Pageviews:** A pageview fires when a page loads. In single-page applications (SPAs), pageviews don't fire automatically on navigation — you must manually fire page_view events or configure the router to trigger them. Missing SPA pageview tracking is one of the most common web analytics instrumentation errors.

**Engaged sessions (GA4):** GA4 replaced bounce rate with "engaged sessions" — sessions lasting 10+ seconds, involving a conversion, or involving 2+ pageviews. Engagement rate is the inverse of bounce rate. This is a more meaningful metric because a user who read a 1,000-word article and left isn't a "bounce" in any meaningful sense.

**Key insight:** For any site with significant mobile or cross-device traffic, reported "user" counts are 20-40% understated relative to actual humans. This is fine for relative comparisons (is traffic up or down?) but matters when doing absolute calculations like CAC (don't divide marketing spend by GA4 users as if it's people).`,
    },
    {
      id: 446,
      name: "Events & Event Parameters",
      desc: `**GA4 events** — every interaction on your website or app is measured as an event, making the event the fundamental unit of GA4 measurement. Events replace the UA model of pageview + goals + events as separate measurement types.

**Event categories in GA4:**
- **Automatically collected:** events GA4 fires without configuration (page_view, session_start, first_visit, user_engagement)
- **Enhanced measurement:** events enabled via a toggle (scroll, outbound_click, site_search, video_engagement, file_download)
- **Recommended events:** predefined event schemas Google provides for e-commerce, gaming, and common use cases (purchase, add_to_cart, sign_up, login) — using these ensures compatibility with GA4's built-in reports
- **Custom events:** any event name and parameter set you define for your specific product behavior

**Event parameters:** Parameters provide context for events. The purchase event has parameters like transaction_id, value, currency, and items (an array). Consistent parameter naming enables segmentation and filtering. GA4 allows up to 25 custom parameters per event, but only 50 total custom dimensions and metrics at the property level — design your parameter schema before instrumenting.

**Conversion events:** Any event can be marked as a "key event" (formerly "conversion") in GA4 — the platform will track volume and attribution for marked events across all reports.

**Key insight:** The most common GA4 instrumentation error is firing too many custom events with too few consistent parameters. An event called "button_clicked" with no properties about which button or where it appears is nearly useless. An event called "cta_clicked" with parameters for cta_text, cta_location, and page_path is highly actionable. Always instrument for the question you need to answer.`,
    },
    {
      id: 447,
      name: "Google Tag Manager (GTM)",
      desc: `**Google Tag Manager (GTM)** — a tag management system (TMS) that allows you to deploy and manage analytics tracking code (tags) on your website without modifying the site's source code for every change. It's the standard deployment method for GA4, Meta Pixel, LinkedIn Insight Tag, and dozens of other marketing and analytics tools.

**How GTM works:** A single GTM container snippet is added to your site's code. From the GTM web interface, you create Tags (the tracking code that fires), Triggers (the conditions under which a tag fires — page load, button click, form submission), and Variables (reusable values — page URL, click text, data layer values).

**The data layer:** GTM's data layer (window.dataLayer) is a JavaScript array your developers push structured data into — product IDs, prices, user properties, custom events. GTM then reads from the data layer to populate tag parameters. The data layer is the bridge between your application code and your marketing tags.

**Server-side GTM:** A newer architecture where GTM runs on a server you control rather than the client browser. Benefits: tags aren't blocked by ad blockers, first-party cookie lifetimes can be extended, sensitive data doesn't flow through the browser. Requires additional infrastructure (Cloud Run, App Engine).

**GTM vs. direct implementation:** GTM adds a dependency — a non-developer can accidentally break tracking by misconfiguring a tag. Preview mode and version control mitigate this, but critical tracking (revenue, activation) should always have a server-side backup independent of GTM.

**Key insight:** GTM is best used for marketing tags and non-critical analytics events. Core product analytics instrumentation — the events your product decisions depend on — should be implemented directly in code with proper QA, not through GTM where a marketing manager could inadvertently change a conversion event's trigger condition.`,
    },
    {
      id: 448,
      name: "Traffic Sources & UTM Parameters",
      desc: `**Traffic source analysis** — understanding which channels, campaigns, and keywords drive visitors to your site. Without source tracking, all marketing attribution collapses into "direct traffic," making it impossible to evaluate channel effectiveness or allocate budgets.

**The GA4 default channel groups:**
- Organic Search (unpaid clicks from Google, Bing, etc.)
- Paid Search (Google/Bing/Yahoo ads)
- Organic Social (unpaid clicks from social platforms)
- Paid Social (Meta, LinkedIn, TikTok ads)
- Email (clicks from email campaigns)
- Referral (clicks from other websites)
- Direct (no referrer — typed URL, dark social, bookmarks)

**UTM parameters:** Custom URL parameters you append to campaign links so analytics platforms can correctly attribute the source. The five standard UTM parameters are utm_source (e.g., facebook), utm_medium (e.g., cpc), utm_campaign (e.g., summer_sale), utm_content (distinguishes ad variants), and utm_term (keyword). UTM parameters should be used on all paid, email, and influencer campaign links.

**The dark social problem:** Social media sharing via DMs, WhatsApp, Slack, and private messaging strips referrer information — the traffic appears as "direct." Research by RadiumOne estimates 84% of content sharing happens via dark social channels. This systematically understates social and content marketing's contribution to traffic.

**Key insight:** UTM parameter discipline is the single highest-impact, lowest-cost improvement most marketing teams can make to their attribution data. Create a UTM naming convention (consistent casing, underscore vs hyphen, campaign naming taxonomy) and enforce it via a UTM builder tool rather than manual URL construction. Inconsistent UTM naming (Facebook vs facebook vs FB) fragments attribution across dozens of false sources.`,
    },
    {
      id: 449,
      name: "Funnel Analysis in Web Analytics",
      desc: `**Funnel analysis** — tracking the sequential steps users take toward a goal and measuring dropout at each step. Funnels expose where potential customers abandon a process, quantify the business impact of each drop-off point, and prioritize where to invest optimization effort.

**Funnel types:**
- **Linear (closed) funnel:** users must complete steps in sequence. Strict but reveals ordered friction (e.g., checkout flow: product page → cart → billing → confirmation)
- **Open funnel:** users can enter at any step or skip steps. Better for complex, multi-path journeys where users don't always follow the prescribed sequence
- **Behavioral funnel:** based on events, not page URLs — fires when a specific action occurs regardless of page (e.g., video_started → form_submitted → purchase_completed)

**Reading a funnel:** The key metric at each step is the step-conversion rate. A drop from 80% to 40% between two steps indicates severe friction at that specific transition — investigate session recordings, form analytics, and qualitative feedback at that exact point.

**Where funnels mislead:** Aggregate funnel rates can mask segment-level differences. A 30% checkout completion rate might be 55% on desktop and 12% on mobile — an optimization problem entirely invisible in the aggregate view. Always segment funnels by device type, traffic source, new vs. returning user, and user geography.

**Key insight:** The most actionable funnel insight is usually not the last step (cart abandonment at payment is well-known and commonly optimized) but an earlier, less-examined step where 50% of potential customers quietly disappear. Build funnels from the first meaningful product interaction all the way to conversion — not just from cart to checkout.`,
    },
    {
      id: 450,
      name: "Heatmaps & Session Recordings",
      desc: `**Heatmaps** visualize aggregated user behavior on a page — where users click, how far they scroll, where their mouse moves — producing a visual overlay that reveals attention patterns invisible in numeric analytics. **Session recordings** replay individual user sessions as video, showing exactly how a real user navigated the page.

**Types of heatmaps:**
- **Click maps:** show where users tap or click — including rage clicks (rapid repeated clicks indicating frustration)
- **Scroll maps:** show what percentage of users reached each vertical point on the page — revealing where content below the fold goes unseen
- **Move maps:** track mouse cursor position as a proxy for visual attention (eye-tracking correlation is ~80%)
- **Attention maps:** combine cursor movement, time on area, and scrolling to estimate visual attention per page zone

**Tools:** Hotjar, Microsoft Clarity (free), FullStory, Lucky Orange, Smartlook. Microsoft Clarity is surprisingly capable for a free tool and integrates natively with GA4.

**Session recordings for debugging:** When funnel analysis shows a specific step with high dropout, session recordings of users who dropped off at that step reveal the specific behavior. Did they scroll to the form and leave? Did they start filling it out and abandon? Did they encounter an error? Recordings answer the "why" that quantitative data can't.

**Privacy considerations:** Session recordings must mask or exclude sensitive form fields (credit card numbers, passwords, SSNs). GDPR requires consent before recording EU users. Most tools provide automatic PII masking, but verify the configuration is correct before deployment.

**Key insight:** The combination of heatmaps and session recordings is the fastest path from a quantitative "we have a problem here" to a qualitative "we now understand what the problem actually is." Funnel data shows the what; recordings show the why. Always use them together when diagnosing high-value conversion problems.`,
    },
    {
      id: 451,
      name: "Landing Page Analysis",
      desc: `**Landing page analysis** — the systematic evaluation of pages that serve as entry points for marketing traffic, assessing their effectiveness at converting visitors into the next desired action. Landing pages are the conversion junction between your media spend and your business results.

**Key metrics for landing pages:**
- **Conversion rate:** the primary effectiveness metric — what percentage of arrivals complete the desired action
- **Bounce/engagement rate:** are visitors interested or immediately leaving?
- **Time on page:** are they reading the content or just glancing?
- **Scroll depth:** do they reach the CTA, or does the page lose them above the fold?
- **Form completion rate:** for lead gen pages, at which form field are users dropping off?

**Traffic quality segmentation:** A landing page's conversion rate can't be evaluated without segmenting by traffic source. A 3% conversion rate on cold paid social traffic may be excellent; the same rate on branded search traffic is a problem. Always analyze landing page performance broken down by the traffic source driving it.

**Page speed as conversion lever:** Research consistently shows page load time above 3 seconds causes significant bounce rate increases. Google's Core Web Vitals — Largest Contentful Paint (LCP < 2.5s), First Input Delay (FID < 100ms), and Cumulative Layout Shift (CLS < 0.1) — are both SEO ranking signals and direct conversion factors.

**Message match:** The most impactful landing page optimization is often not the page itself but the alignment between the ad message and the page message. An ad promising "50% off all shoes" that lands on a general sale page (not a shoes-specific sale page) has poor message match — the visitor arrives expecting something specific and gets something general.

**Key insight:** Before running A/B tests on landing page elements (button color, headline copy), audit message match and page speed. These two factors together account for 60-70% of landing page conversion variance and are almost always easier to improve than running statistically valid experiments on button color.`,
    },
    {
      id: 452,
      name: "Dimensions vs Metrics",
      desc: `**Dimensions** are qualitative attributes that describe data — they categorize and segment. **Metrics** are quantitative measurements — they count and measure. The distinction governs how you build reports, segment analysis, and structure queries in any analytics platform.

**Examples:**
- Dimensions: page_path, traffic_source, device_category, country, user_segment, campaign_name
- Metrics: sessions, users, conversion_rate, revenue, average_session_duration, bounce_rate

**How they combine:** Every analytics report is a combination of one or more dimensions and one or more metrics. "Sessions by traffic source" pairs the dimension (traffic_source) with the metric (sessions). "Conversion rate by device type and country" pairs two dimensions with one metric, enabling a cross-tabulation that reveals how behavior differs across device and geography simultaneously.

**Cardinality problems:** High-cardinality dimensions (user_id with millions of unique values, product_id with thousands of SKUs) cause performance problems in some analytics systems. GA4 caps certain dimensions at 500 unique values in standard reports — dimensions with more values get sampled or truncated. Know your platform's cardinality limits when designing custom dimensions.

**Custom dimensions and metrics:** Standard analytics platforms provide a set of built-in dimensions and metrics. Custom dimensions let you add product-specific attributes (user plan tier, company size, experiment variant assignment) to your analytics data. These are essential for meaningful segmentation in B2B SaaS and enterprise products.

**Key insight:** The most common analytics query mistake is aggregating across a dimension that has high variance — calculating average session duration across all traffic sources produces a number that describes no actual user group accurately. Always ask "what dimension should I segment by?" before drawing any conclusion from an aggregate metric.`,
    },
    {
      id: 453,
      name: "Site Search Analytics",
      desc: `**Site search analytics** — measuring what visitors search for on your website, revealing intent gaps between what your navigation and content offer and what users actually want to find. Search queries are the most direct signal of user intent you can collect without asking.

**What site search data reveals:**
- **Content gaps:** queries with no results show topics your site doesn't cover that users explicitly want
- **Navigation failures:** queries for things that exist on the site reveal that users couldn't find them via navigation — a UX and IA problem, not a content problem
- **Product demand signals:** e-commerce searches for products you don't carry represent direct demand intelligence
- **Vocabulary mismatches:** users searching for "pricing" while the nav says "Plans" shows terminology friction

**Setting up site search tracking in GA4:** Enable "Site Search" in GA4's enhanced measurement settings if using the default search query parameter (q, s, or search). For custom search implementations, fire a search event manually with the search_term parameter.

**Analysis methods:** Look at search volume by query to find the highest-demand topics. Look at "refinements" (subsequent searches after the first) to understand when initial search results failed. Look at conversion rate from search vs. non-search sessions — search users often convert at 3-5x the rate of general visitors because they're expressing active intent.

**Key insight:** Site search is one of the most under-analyzed analytics reports in most organizations. Users who search are telling you exactly what they want in their own words — this data should directly influence content strategy, navigation design, and product roadmap. A monthly review of top 50 site search queries typically uncovers at least 3-5 immediately actionable insights.`,
    },
    {
      id: 454,
      name: "Real-Time Analytics",
      desc: `**Real-time analytics** — analysis of data as it is generated, with latency measured in seconds to minutes rather than hours or days. Real-time data enables immediate response to product launches, marketing campaigns, technical issues, and viral content moments.

**Use cases for real-time:**
- **Monitoring launches:** is a new feature/campaign generating the expected traffic and conversion? Are there sudden error spikes?
- **Event-driven marketing:** adjusting bids, content, and messaging based on live performance
- **Fraud detection:** identifying anomalous purchase or sign-up patterns before they complete
- **Personalization:** adapting in-session experience based on live behavioral signals (e.g., exit intent)
- **Operations:** detecting traffic spikes that require infrastructure scaling

**Real-time vs. near-real-time:** True real-time (sub-second) requires streaming infrastructure (Kafka, Kinesis, Pub/Sub) with stream processing (Flink, Spark Streaming). Near-real-time (5-60 minute latency) is achievable with batch processing at high frequency and is sufficient for most marketing and analytics use cases.

**Tools:** GA4 real-time report (sampling-limited), Amplitude and Mixpanel have near-real-time views (5-15 minute lag), Segment Journeys enables real-time audience activation. For true real-time custom dashboards, Grafana with a streaming data source is common.

**When NOT to use real-time:** Optimization decisions based on real-time data without statistical significance are dangerous. Pausing an ad campaign 4 hours after launch because the real-time ROAS looks low may be making a decision on noise. Most A/B tests and campaign decisions require days of data to reach significance.

**Key insight:** Real-time analytics is most valuable as a monitoring and alerting system — catching things going wrong quickly — rather than as a basis for optimization decisions. Set up real-time alerts for anomaly detection (traffic drops 50%, error rate spikes, conversion rate deviates 20% from baseline) and use real-time data for response, not for optimization.`,
    },
    {
      id: 455,
      name: "Cross-Device Analytics",
      desc: `**Cross-device analytics** — tracking and attributing user behavior across the multiple devices a single person uses: mobile phone, desktop, tablet. As users move between devices in their journey to conversion, single-device analytics systematically misattributes intent and undercounts the contribution of each channel.

**The cross-device problem:** A user discovers a product on their phone (paid social ad), researches it on their laptop (organic search), and purchases on their desktop the next evening (direct). Last-click analytics credits "direct" on desktop. In reality, paid social and organic search each contributed to this conversion — but only a cross-device identity graph can see the full path.

**How cross-device identity works:**
- **Deterministic matching:** the user logs in on multiple devices, providing a first-party user ID that links all sessions definitively
- **Probabilistic matching:** statistical inference using signals (IP address, browser fingerprint, behavioral patterns) to estimate that two device sessions belong to the same person — less accurate but covers non-logged-in users
- **Google Signals:** enables cross-device measurement within GA4 for Google account users who have opted in to ad personalization

**Implications for attribution:** Cross-device attribution models show that mobile's contribution to conversions is systematically understated when using single-device, last-click attribution. A user's mobile session often initiates the journey that completes on desktop — without cross-device tracking, the mobile channel looks like it doesn't convert when it actually drives initial intent.

**Key insight:** For products with significant mobile traffic that converts on desktop (B2B SaaS, high-consideration e-commerce), single-device analytics may be showing mobile conversion rates 3-5x lower than its true contribution to revenue. Implementing user ID tracking across devices is the most impactful attribution improvement available to these businesses — more impactful than any attribution model change.`,
    },
  ],
};

export default webAnalytics;
