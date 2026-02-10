import { useState } from "react";

export const meta = {
  title: "Marketing Concepts",
  description: "Essential marketing concepts and strategies",
};

const categories = [
  {
    name: "Fundamentals",
    icon: "◆",
    color: "#FF6B35",
    concepts: [
      { id: 1, name: "Marketing Mix (4Ps)", desc: "Product, Price, Place, Promotion. The foundational framework for any marketing strategy. Extended to 7Ps with People, Process, Physical Evidence." },
      { id: 2, name: "Target Market", desc: "The specific group of consumers most likely to buy your product. Defined by demographics, psychographics, behavior, and geography." },
      { id: 3, name: "Market Segmentation", desc: "Dividing a broad market into subgroups with shared needs. Types: demographic, geographic, psychographic, behavioral, firmographic (B2B)." },
      { id: 4, name: "Positioning", desc: "How your brand occupies a distinct place in the consumer's mind relative to competitors. Defined by your unique value proposition." },
      { id: 5, name: "Unique Value Proposition (UVP)", desc: "A clear statement of the unique benefit your product delivers that competitors don't. Answers: why should I choose you?" },
      { id: 6, name: "Brand Identity", desc: "The visual and verbal elements that represent your brand — logo, colors, typography, voice, tone, personality, and values." },
      { id: 7, name: "Brand Equity", desc: "The commercial value derived from consumer perception of the brand name. Built through awareness, associations, loyalty, and perceived quality." },
      { id: 8, name: "Brand Awareness", desc: "The extent to which consumers recognize and recall a brand. Levels: unaware → recognition → recall → top-of-mind." },
      { id: 9, name: "Competitive Analysis", desc: "Systematic evaluation of competitors' strengths, weaknesses, strategies, and market position. Tools: SWOT, Porter's Five Forces." },
      { id: 10, name: "SWOT Analysis", desc: "Framework evaluating Strengths, Weaknesses (internal), Opportunities, Threats (external). Foundation for strategic planning." },
      { id: 11, name: "Go-to-Market Strategy (GTM)", desc: "Plan for launching a product to market. Covers target audience, messaging, channels, pricing, sales strategy, and timeline." },
      { id: 12, name: "Product-Market Fit", desc: "When your product satisfies strong market demand. The point where growth becomes organic. Measured by retention and NPS." },
      { id: 13, name: "Total Addressable Market (TAM/SAM/SOM)", desc: "TAM: total market demand. SAM: segment you can serve. SOM: portion you can realistically capture. Used for sizing opportunities." },
      { id: 14, name: "Market Penetration vs Market Development", desc: "Penetration: sell more to existing market. Development: enter new markets with existing products. Part of Ansoff Matrix." },
    ],
  },
  {
    name: "Digital Marketing",
    icon: "⬡",
    color: "#4ECDC4",
    concepts: [
      { id: 15, name: "SEO (Search Engine Optimization)", desc: "Optimizing content and site structure to rank higher in organic search results. On-page, off-page, and technical SEO." },
      { id: 16, name: "SEM (Search Engine Marketing)", desc: "Paid advertising on search engines (Google Ads, Bing Ads). Includes PPC campaigns, keyword bidding, and ad copy optimization." },
      { id: 17, name: "PPC (Pay-Per-Click)", desc: "Ad model where you pay each time someone clicks your ad. Platforms: Google Ads, Meta Ads, LinkedIn Ads. Measured by CPC." },
      { id: 18, name: "Content Marketing", desc: "Creating and distributing valuable content to attract and retain an audience. Blog posts, videos, podcasts, whitepapers, infographics." },
      { id: 19, name: "Social Media Marketing", desc: "Using social platforms to build brand awareness, engage audiences, and drive conversions. Organic and paid strategies." },
      { id: 20, name: "Email Marketing", desc: "Direct communication via email for nurturing leads, driving conversions, and retention. Newsletters, drip campaigns, transactional emails." },
      { id: 21, name: "Influencer Marketing", desc: "Partnering with individuals who have audience trust and reach. Micro (<100K), macro (100K–1M), mega (1M+) influencers." },
      { id: 22, name: "Affiliate Marketing", desc: "Performance-based model where partners earn commission for driving sales/leads. Tracked via unique links and cookies." },
      { id: 23, name: "Display Advertising", desc: "Visual banner/video ads on websites and apps. Bought via ad networks (Google Display Network) or programmatic platforms." },
      { id: 24, name: "Programmatic Advertising", desc: "Automated buying and selling of digital ads using AI and real-time bidding (RTB). DSPs, SSPs, and ad exchanges." },
      { id: 25, name: "Native Advertising", desc: "Ads that match the look and feel of the platform they appear on. Sponsored content, in-feed ads, recommended content." },
      { id: 26, name: "Retargeting / Remarketing", desc: "Showing ads to users who previously visited your site or engaged with your content. Keeps your brand top-of-mind." },
      { id: 27, name: "Video Marketing", desc: "Using video content for promotion. YouTube, TikTok, Reels, webinars, product demos. Highest engagement format." },
      { id: 28, name: "Podcast Marketing", desc: "Promoting through or creating podcasts. Host-read ads, branded podcasts, sponsorships. Builds deep audience connection." },
      { id: 29, name: "SMS / Mobile Marketing", desc: "Reaching consumers via text messages, push notifications, and in-app messaging. High open rates (~98% for SMS)." },
    ],
  },
  {
    name: "Content & SEO",
    icon: "⬢",
    color: "#45B7D1",
    concepts: [
      { id: 30, name: "Keyword Research", desc: "Identifying search terms your audience uses. Analyze volume, difficulty, intent. Tools: Ahrefs, SEMrush, Google Keyword Planner." },
      { id: 31, name: "Search Intent", desc: "The purpose behind a search query. Types: informational, navigational, transactional, commercial investigation. Match content to intent." },
      { id: 32, name: "On-Page SEO", desc: "Optimizing individual pages: title tags, meta descriptions, headers, internal links, keyword placement, image alt text, URL structure." },
      { id: 33, name: "Off-Page SEO", desc: "Building authority through external signals: backlinks, social signals, brand mentions, guest posting, digital PR." },
      { id: 34, name: "Technical SEO", desc: "Site infrastructure optimization: page speed, mobile-friendliness, crawlability, structured data (schema), XML sitemaps, canonical tags." },
      { id: 35, name: "Domain Authority / Page Authority", desc: "Score (1–100) predicting how well a site will rank. Built through quality backlinks, content, and site age. Moz metric." },
      { id: 36, name: "Content Calendar", desc: "Planning document scheduling what content is published when, where, and by whom. Ensures consistency and strategic alignment." },
      { id: 37, name: "Pillar Pages & Topic Clusters", desc: "SEO strategy: one comprehensive pillar page linked to multiple related cluster pages. Establishes topical authority." },
      { id: 38, name: "Evergreen Content", desc: "Content that remains relevant and valuable long after publication. Drives sustained organic traffic. Guides, tutorials, FAQs." },
      { id: 39, name: "Content Repurposing", desc: "Adapting one piece of content into multiple formats. Blog → video → infographic → social posts → newsletter. Maximizes ROI." },
      { id: 40, name: "User-Generated Content (UGC)", desc: "Content created by customers: reviews, photos, testimonials, social posts. Builds trust and provides social proof." },
      { id: 41, name: "E-E-A-T", desc: "Google's quality criteria: Experience, Expertise, Authoritativeness, Trustworthiness. Critical for YMYL (Your Money, Your Life) content." },
      { id: 42, name: "Link Building", desc: "Acquiring backlinks from other websites. Methods: guest posting, broken link building, digital PR, resource pages, HARO." },
      { id: 43, name: "Local SEO", desc: "Optimizing for location-based searches. Google Business Profile, local citations, reviews, NAP consistency, local keywords." },
    ],
  },
  {
    name: "Funnels & Customer Journey",
    icon: "▽",
    color: "#F7DC6F",
    concepts: [
      { id: 44, name: "Marketing Funnel (TOFU/MOFU/BOFU)", desc: "Top: awareness (blog, ads). Middle: consideration (case studies, webinars). Bottom: decision (demos, free trials, offers)." },
      { id: 45, name: "AIDA Model", desc: "Attention → Interest → Desire → Action. Classic framework for crafting persuasive marketing messages and campaigns." },
      { id: 46, name: "Customer Journey Mapping", desc: "Visualizing every touchpoint a customer has with your brand from awareness to post-purchase. Identifies pain points and opportunities." },
      { id: 47, name: "Lead Generation", desc: "Attracting and capturing potential customers' contact info. Methods: gated content, forms, webinars, free tools, quizzes." },
      { id: 48, name: "Lead Nurturing", desc: "Building relationships with leads through targeted content and communication over time until they're ready to buy." },
      { id: 49, name: "Lead Scoring", desc: "Assigning numerical value to leads based on behavior and attributes. Prioritizes sales efforts on most promising leads." },
      { id: 50, name: "Landing Pages", desc: "Standalone pages designed for a single conversion goal. Minimal distractions, clear CTA, social proof, benefit-driven copy." },
      { id: 51, name: "Call to Action (CTA)", desc: "Prompt that tells the user what to do next: sign up, buy now, learn more. Placement, copy, and design all matter." },
      { id: 52, name: "Conversion Rate Optimization (CRO)", desc: "Systematic process of increasing the percentage of visitors who complete a desired action. A/B testing, UX improvements." },
      { id: 53, name: "Sales Funnel vs Marketing Funnel", desc: "Marketing funnel generates and nurtures leads. Sales funnel converts them to customers. Alignment between both is critical." },
      { id: 54, name: "Flywheel Model", desc: "HubSpot's alternative to funnels. Customers at the center, momentum from attract → engage → delight. Happy customers fuel growth." },
      { id: 55, name: "Micro-Conversions", desc: "Small actions leading to the main conversion: newsletter signup, video view, add-to-cart. Track these to optimize the path." },
    ],
  },
  {
    name: "Analytics & Metrics",
    icon: "◈",
    color: "#BB8FCE",
    concepts: [
      { id: 56, name: "ROI (Return on Investment)", desc: "Net profit divided by cost of investment × 100. The ultimate measure of marketing effectiveness." },
      { id: 57, name: "ROAS (Return on Ad Spend)", desc: "Revenue generated per dollar spent on ads. ROAS of 4:1 means $4 revenue for every $1 spent. Key for paid media." },
      { id: 58, name: "CAC (Customer Acquisition Cost)", desc: "Total cost to acquire one customer (marketing + sales spend / new customers). Must be lower than LTV for viability." },
      { id: 59, name: "LTV / CLV (Customer Lifetime Value)", desc: "Total revenue expected from a customer over their entire relationship. LTV:CAC ratio of 3:1 is a common benchmark." },
      { id: 60, name: "Conversion Rate", desc: "Percentage of users who complete a desired action. Varies by channel: websites ~2-5%, email ~2-5%, landing pages ~5-15%." },
      { id: 61, name: "Bounce Rate", desc: "Percentage of visitors who leave after viewing only one page. High bounce rate signals poor UX, irrelevant content, or slow load." },
      { id: 62, name: "Click-Through Rate (CTR)", desc: "Clicks divided by impressions × 100. Measures ad/email/content effectiveness at driving engagement." },
      { id: 63, name: "Cost Per Click (CPC) / CPM / CPA", desc: "CPC: cost per click. CPM: cost per 1,000 impressions. CPA: cost per acquisition/action. Core paid media pricing models." },
      { id: 64, name: "Churn Rate", desc: "Percentage of customers who stop using your product in a given period. Monthly churn of 5% means ~46% annual loss." },
      { id: 65, name: "Net Promoter Score (NPS)", desc: "Measures customer loyalty: 'How likely to recommend? (0–10)'. Promoters (9–10) minus Detractors (0–6). Range: -100 to +100." },
      { id: 66, name: "Attribution Models", desc: "Rules for assigning conversion credit to touchpoints. First-touch, last-touch, linear, time-decay, data-driven." },
      { id: 67, name: "Multi-Touch Attribution", desc: "Distributing credit across all touchpoints in the customer journey. More accurate than single-touch but harder to implement." },
      { id: 68, name: "Marketing Qualified Lead (MQL) vs SQL", desc: "MQL: lead that marketing deems ready for sales. SQL: lead that sales accepts as worth pursuing. Defines handoff criteria." },
      { id: 69, name: "Cohort Analysis", desc: "Grouping users by shared characteristics (signup date, channel) and tracking behavior over time. Reveals retention trends." },
      { id: 70, name: "Engagement Rate", desc: "Total engagements (likes, comments, shares, clicks) divided by reach or followers. Key social media health metric." },
      { id: 71, name: "Share of Voice (SOV)", desc: "Your brand's visibility compared to competitors. Measured in search, social mentions, ad impressions, or media coverage." },
    ],
  },
  {
    name: "Growth & Acquisition",
    icon: "↗",
    color: "#58D68D",
    concepts: [
      { id: 72, name: "Growth Hacking", desc: "Rapid experimentation across marketing and product to find the most efficient ways to grow. Data-driven, scrappy, iterative." },
      { id: 73, name: "Product-Led Growth (PLG)", desc: "Product itself drives acquisition, activation, and retention. Free trials, freemium models. Examples: Slack, Zoom, Notion." },
      { id: 74, name: "Viral Marketing / Viral Coefficient", desc: "Users organically spread the product. K-factor > 1 means exponential growth. Built through referral loops and shareability." },
      { id: 75, name: "Referral Programs", desc: "Incentivizing existing customers to bring new ones. Two-sided rewards (referrer + referee). Dropbox grew 3900% with referrals." },
      { id: 76, name: "Freemium Model", desc: "Free basic product with paid premium features. Acquires users at scale, converts a percentage. Conversion rate typically 2-5%." },
      { id: 77, name: "Network Effects", desc: "Product becomes more valuable as more people use it. Direct (phone network) or indirect (marketplace buyers/sellers)." },
      { id: 78, name: "AARRR Framework (Pirate Metrics)", desc: "Acquisition → Activation → Retention → Revenue → Referral. Startup growth framework for tracking the full user lifecycle." },
      { id: 79, name: "North Star Metric", desc: "The single metric that best captures the core value your product delivers. Spotify: time spent listening. Airbnb: nights booked." },
      { id: 80, name: "Activation Rate", desc: "Percentage of new users who reach the 'aha moment' — the point where they first experience core value." },
      { id: 81, name: "Onboarding Optimization", desc: "Reducing friction between signup and value realization. Checklists, tooltips, progressive disclosure, personalized flows." },
      { id: 82, name: "Demand Generation", desc: "Creating awareness and interest in your product through content, events, ads, and outreach. Feeds the top of funnel." },
      { id: 83, name: "Inbound vs Outbound Marketing", desc: "Inbound: attract with valuable content (SEO, blogs). Outbound: push messages out (cold email, ads, trade shows)." },
    ],
  },
  {
    name: "Pricing & Revenue",
    icon: "⬣",
    color: "#F0B27A",
    concepts: [
      { id: 84, name: "Pricing Strategies", desc: "Cost-plus, value-based, competitive, penetration, skimming, dynamic, psychological. Each suits different markets and goals." },
      { id: 85, name: "Penetration Pricing", desc: "Launching at a low price to capture market share fast, then raising prices. Works in price-sensitive markets." },
      { id: 86, name: "Price Skimming", desc: "Launching at a high price, then gradually lowering. Captures maximum revenue from early adopters first (Apple iPhones)." },
      { id: 87, name: "Value-Based Pricing", desc: "Setting price based on perceived value to the customer, not cost. Requires deep understanding of customer willingness to pay." },
      { id: 88, name: "Dynamic Pricing", desc: "Adjusting prices in real-time based on demand, competition, time, or user segment. Airlines, Uber surge pricing." },
      { id: 89, name: "Psychological Pricing", desc: "Using pricing psychology: charm pricing ($9.99), anchoring, decoy effect, bundle pricing, price framing." },
      { id: 90, name: "Subscription / Recurring Revenue", desc: "Customers pay regularly for ongoing access. MRR (Monthly Recurring Revenue), ARR (Annual). Predictable revenue stream." },
      { id: 91, name: "Unit Economics", desc: "Revenue and costs on a per-unit (per-customer) basis. LTV, CAC, contribution margin. Must be positive for sustainability." },
      { id: 92, name: "Loss Leader Strategy", desc: "Selling a product below cost to attract customers who'll buy profitable items. Grocery stores, razor-and-blade model." },
      { id: 93, name: "Upselling vs Cross-Selling", desc: "Upsell: encourage a higher-tier purchase. Cross-sell: suggest complementary products. Amazon: 'Frequently bought together'." },
    ],
  },
  {
    name: "Branding & Psychology",
    icon: "◎",
    color: "#EC7063",
    concepts: [
      { id: 94, name: "Social Proof", desc: "People follow others' actions. Reviews, testimonials, user counts, endorsements, case studies. '10,000+ companies trust us'." },
      { id: 95, name: "Scarcity & Urgency", desc: "Limited availability ('Only 3 left') or time pressure ('Offer ends tonight') triggers fear of missing out (FOMO)." },
      { id: 96, name: "Anchoring Effect", desc: "First piece of information heavily influences decisions. Show original price before discount. Present premium plan first." },
      { id: 97, name: "Reciprocity", desc: "People feel obligated to return favors. Give free value (content, tools, samples) and customers are more likely to buy." },
      { id: 98, name: "Storytelling in Marketing", desc: "Using narrative to create emotional connection. Hero's journey, customer success stories, brand origin stories." },
      { id: 99, name: "Emotional vs Rational Appeals", desc: "Emotional: connect through feelings (Nike 'Just Do It'). Rational: connect through logic and features. Most effective: both." },
      { id: 100, name: "Brand Loyalty", desc: "Customer's commitment to repurchase. Built through consistent quality, emotional connection, and exceeding expectations." },
      { id: 101, name: "Cognitive Biases in Marketing", desc: "Leveraging mental shortcuts: loss aversion, bandwagon effect, confirmation bias, endowment effect, framing effect." },
      { id: 102, name: "Color Psychology", desc: "Colors evoke emotions and associations. Blue: trust. Red: urgency. Green: nature/health. Orange: energy. Context matters." },
      { id: 103, name: "Brand Archetypes", desc: "12 universal character types for brands (Hero, Outlaw, Sage, Jester, etc.). Guides voice, messaging, and positioning." },
      { id: 104, name: "Positioning Map / Perceptual Map", desc: "2D chart plotting brands on attributes (price vs quality). Identifies gaps and competitive opportunities in the market." },
    ],
  },
  {
    name: "Email & Automation",
    icon: "⟐",
    color: "#5DADE2",
    concepts: [
      { id: 105, name: "Marketing Automation", desc: "Software that automates repetitive tasks: email sequences, lead scoring, social posting, ad management. HubSpot, Marketo, Mailchimp." },
      { id: 106, name: "Drip Campaigns", desc: "Automated email sequence triggered by user action. Welcome series, onboarding, abandoned cart, re-engagement." },
      { id: 107, name: "Email Segmentation", desc: "Dividing your email list into targeted groups. By behavior, demographics, purchase history, engagement level." },
      { id: 108, name: "Personalization", desc: "Tailoring content to individual users. Name, recommendations, dynamic content, behavioral triggers. Increases conversions 10-30%." },
      { id: 109, name: "A/B Testing (Split Testing)", desc: "Comparing two versions of a page, email, or ad to see which performs better. Change one variable at a time." },
      { id: 110, name: "Open Rate & Click Rate", desc: "Open rate: % who open an email (~20-25% average). Click rate: % who click a link in the email (~2-5% average)." },
      { id: 111, name: "Email Deliverability", desc: "Getting emails into the inbox, not spam. Affected by sender reputation, authentication (SPF, DKIM, DMARC), list hygiene." },
      { id: 112, name: "Customer Data Platform (CDP)", desc: "Unified database of customer data from all sources. Creates single customer view for personalization across channels." },
      { id: 113, name: "CRM (Customer Relationship Management)", desc: "System for managing customer interactions and data. Salesforce, HubSpot. Tracks leads, deals, communication history." },
      { id: 114, name: "Trigger-Based Marketing", desc: "Automated messages sent based on specific user actions: browse abandonment, milestone reached, inactivity, purchase." },
    ],
  },
  {
    name: "Social Media & Community",
    icon: "⟡",
    color: "#AF7AC5",
    concepts: [
      { id: 115, name: "Organic vs Paid Social", desc: "Organic: free posts to followers. Paid: sponsored content and ads to targeted audiences. Organic reach declining across platforms." },
      { id: 116, name: "Social Listening", desc: "Monitoring social media for brand mentions, competitor activity, and industry trends. Tools: Brandwatch, Sprout Social, Mention." },
      { id: 117, name: "Community Marketing", desc: "Building and nurturing a community around your brand. Discord, Slack groups, forums, events. Creates advocacy and loyalty." },
      { id: 118, name: "Creator Economy / Creator Partnerships", desc: "Collaborating with content creators for authentic promotion. More trusted than traditional ads. Long-term partnerships over one-offs." },
      { id: 119, name: "Social Commerce", desc: "Selling directly through social platforms. Instagram Shop, TikTok Shop, Facebook Marketplace. Reduces friction to purchase." },
      { id: 120, name: "Platform Algorithm Understanding", desc: "Each platform rewards different content. Instagram: Reels. LinkedIn: text posts. TikTok: watch time. YouTube: retention & CTR." },
      { id: 121, name: "Employee Advocacy", desc: "Employees sharing company content on personal social accounts. Extends reach, builds authenticity. 8x more engagement than brand posts." },
      { id: 122, name: "Social Proof & Reviews Management", desc: "Actively collecting, monitoring, and responding to reviews. G2, Trustpilot, Google Reviews. Impacts SEO and conversion." },
    ],
  },
  {
    name: "Strategy & Planning",
    icon: "◉",
    color: "#48C9B0",
    concepts: [
      { id: 123, name: "Integrated Marketing Communications (IMC)", desc: "Unified messaging across all channels and touchpoints. Ensures consistent brand experience whether ad, email, social, or in-store." },
      { id: 124, name: "Omnichannel Marketing", desc: "Seamless customer experience across all channels (online, offline, mobile, in-store). All channels connected and data-shared." },
      { id: 125, name: "Account-Based Marketing (ABM)", desc: "B2B strategy targeting specific high-value accounts with personalized campaigns. Sales and marketing fully aligned per account." },
      { id: 126, name: "Customer Retention", desc: "Strategies to keep existing customers. 5x cheaper than acquisition. Loyalty programs, excellent support, personalization." },
      { id: 127, name: "Customer Advocacy", desc: "Turning satisfied customers into active promoters. Case studies, testimonials, referrals, community champions." },
      { id: 128, name: "Market Research", desc: "Gathering data about target market. Primary (surveys, interviews) and secondary (reports, data). Quant and qual methods." },
      { id: 129, name: "Buyer Personas", desc: "Semi-fictional profiles of ideal customers. Demographics, goals, pain points, behavior, objections. Guides messaging and targeting." },
      { id: 130, name: "Jobs To Be Done (JTBD)", desc: "Framework focusing on what customers are trying to accomplish, not who they are. 'People don't want a drill, they want a hole'." },
      { id: 131, name: "Blue Ocean Strategy", desc: "Creating uncontested market space rather than competing in existing 'red oceans'. Differentiation + low cost simultaneously." },
      { id: 132, name: "Porter's Five Forces", desc: "Industry analysis: supplier power, buyer power, competitive rivalry, threat of substitutes, threat of new entrants." },
      { id: 133, name: "Ansoff Matrix", desc: "Growth strategy framework: market penetration, market development, product development, diversification. Risk increases diagonally." },
      { id: 134, name: "BCG Matrix", desc: "Portfolio analysis: Stars (high growth, high share), Cash Cows (low growth, high share), Question Marks, Dogs." },
      { id: 135, name: "Product Lifecycle", desc: "Introduction → Growth → Maturity → Decline. Marketing strategy changes at each stage. Extend maturity phase as long as possible." },
    ],
  },
  {
    name: "Emerging & Advanced",
    icon: "✦",
    color: "#F1948A",
    concepts: [
      { id: 136, name: "AI in Marketing", desc: "Using AI for content generation, predictive analytics, ad optimization, chatbots, personalization, and audience segmentation." },
      { id: 137, name: "Conversational Marketing", desc: "Real-time conversations via chatbots, live chat, and messaging apps to qualify leads and guide buyers. Drift, Intercom." },
      { id: 138, name: "Zero-Party & First-Party Data", desc: "Zero-party: data customers intentionally share (preferences). First-party: data you collect (behavior). Critical in cookieless future." },
      { id: 139, name: "Privacy & Cookieless Marketing", desc: "Adapting to GDPR, CCPA, and cookie deprecation. Contextual targeting, first-party data strategies, server-side tracking." },
      { id: 140, name: "Growth Loops", desc: "Self-reinforcing cycles where output of one step feeds the next. User → Creates content → Attracts new users → Repeat." },
      { id: 141, name: "Dark Social", desc: "Sharing that happens in private channels (DMs, email, text) and can't be tracked by analytics. Estimated 80%+ of sharing." },
      { id: 142, name: "Intent Data", desc: "Signals showing a prospect is actively researching a solution. Bombora, G2 intent. Enables timely, relevant outreach." },
      { id: 143, name: "Predictive Analytics", desc: "Using historical data and ML to forecast customer behavior, churn risk, and campaign performance." },
      { id: 144, name: "Marketing Mix Modeling (MMM)", desc: "Statistical analysis measuring the impact of each marketing channel on sales. Privacy-safe alternative to attribution." },
      { id: 145, name: "Incrementality Testing", desc: "Measuring the true causal impact of marketing by comparing exposed vs holdout groups. Proves actual lift, not just correlation." },
      { id: 146, name: "Revenue Operations (RevOps)", desc: "Aligning marketing, sales, and customer success operations. Shared data, processes, and goals for revenue growth." },
      { id: 147, name: "Customer Experience (CX)", desc: "Total experience across every interaction. Goes beyond marketing to include product, support, billing. CX is the new differentiator." },
      { id: 148, name: "Neuromarketing", desc: "Applying neuroscience to marketing. Eye tracking, brain imaging, biometrics to understand subconscious reactions to messaging." },
      { id: 149, name: "Experiential Marketing", desc: "Creating immersive brand experiences. Pop-ups, events, interactive installations. Generates UGC and emotional connection." },
      { id: 150, name: "Sustainability Marketing / Purpose-Driven", desc: "Aligning brand with social and environmental causes authentically. Consumers increasingly choose purpose-driven brands." },
    ],
  },
];

const totalConcepts = categories.reduce((sum, c) => sum + c.concepts.length, 0);

export default function MarketingConcepts() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      concepts: cat.concepts.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.desc.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.concepts.length > 0);

  const displayCategories = activeCategory
    ? filteredCategories.filter((c) => c.name === activeCategory)
    : filteredCategories;

  const matchCount = filteredCategories.reduce(
    (sum, c) => sum + c.concepts.length,
    0
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#08090E",
        color: "#D8D8E4",
        fontFamily: "'IBM Plex Mono', 'Menlo', 'Consolas', monospace",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "40px 32px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background:
            "linear-gradient(180deg, rgba(255,107,53,0.05) 0%, transparent 100%)",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontSize: 11,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#FF6B35",
                fontWeight: 600,
              }}
            >
              Reference Guide
            </span>
            <span
              style={{
                fontSize: 10,
                background: "rgba(255,107,53,0.13)",
                color: "#FF6B35",
                padding: "2px 8px",
                borderRadius: 3,
                letterSpacing: 1,
              }}
            >
              {totalConcepts} CONCEPTS
            </span>
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              margin: "8px 0 6px",
              color: "#FAFAFF",
              letterSpacing: -0.5,
              fontFamily: "'DM Sans', 'Helvetica Neue', system-ui, sans-serif",
            }}
          >
            Marketing Concepts
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "#6E6E82",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            From fundamentals to growth hacking — every concept a modern marketer needs
          </p>

          {/* Search */}
          <div style={{ marginTop: 20, position: "relative" }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search concepts..."
              style={{
                width: "100%",
                padding: "10px 16px 10px 36px",
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 8,
                color: "#D8D8E4",
                fontSize: 13,
                fontFamily: "inherit",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#555",
                fontSize: 14,
              }}
            >
              ⌕
            </span>
            {search && (
              <span
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#6E6E82",
                  fontSize: 11,
                }}
              >
                {matchCount} results
              </span>
            )}
          </div>

          {/* Category pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginTop: 16,
            }}
          >
            <button
              onClick={() => setActiveCategory(null)}
              style={{
                padding: "5px 12px",
                fontSize: 11,
                borderRadius: 4,
                border: "1px solid",
                borderColor: !activeCategory
                  ? "rgba(255,107,53,0.4)"
                  : "rgba(255,255,255,0.07)",
                background: !activeCategory
                  ? "rgba(255,107,53,0.1)"
                  : "transparent",
                color: !activeCategory ? "#FF6B35" : "#6E6E82",
                cursor: "pointer",
                fontFamily: "inherit",
                letterSpacing: 0.3,
                transition: "all 0.15s",
              }}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === cat.name ? null : cat.name
                  )
                }
                style={{
                  padding: "5px 12px",
                  fontSize: 11,
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor:
                    activeCategory === cat.name
                      ? `${cat.color}66`
                      : "rgba(255,255,255,0.07)",
                  background:
                    activeCategory === cat.name
                      ? `${cat.color}15`
                      : "transparent",
                  color:
                    activeCategory === cat.name ? cat.color : "#6E6E82",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  letterSpacing: 0.3,
                  transition: "all 0.15s",
                }}
              >
                <span style={{ marginRight: 4 }}>{cat.icon}</span>
                {cat.name}
                <span style={{ marginLeft: 4, opacity: 0.5 }}>
                  {cat.concepts.length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{ maxWidth: 960, margin: "0 auto", padding: "24px 32px 60px" }}
      >
        {displayCategories.map((cat) => (
          <div key={cat.name} style={{ marginBottom: 32 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
                paddingBottom: 8,
                borderBottom: `1px solid ${cat.color}1A`,
              }}
            >
              <span style={{ color: cat.color, fontSize: 16 }}>
                {cat.icon}
              </span>
              <h2
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: cat.color,
                  margin: 0,
                  letterSpacing: 0.5,
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                }}
              >
                {cat.name}
              </h2>
              <span
                style={{
                  fontSize: 10,
                  color: "#444",
                  marginLeft: "auto",
                }}
              >
                {cat.concepts.length} concepts
              </span>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: 4 }}
            >
              {cat.concepts.map((concept) => {
                const isExpanded = expandedId === concept.id;
                return (
                  <div
                    key={concept.id}
                    onClick={() =>
                      setExpandedId(isExpanded ? null : concept.id)
                    }
                    style={{
                      padding: isExpanded ? "12px 16px" : "9px 16px",
                      background: isExpanded
                        ? `${cat.color}08`
                        : "rgba(255,255,255,0.012)",
                      border: "1px solid",
                      borderColor: isExpanded
                        ? `${cat.color}28`
                        : "rgba(255,255,255,0.035)",
                      borderRadius: 6,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 9,
                          color: "#444",
                          minWidth: 24,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {String(concept.id).padStart(3, "0")}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: isExpanded ? "#FAFAFF" : "#B0B0C0",
                          flex: 1,
                        }}
                      >
                        {concept.name}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          color: "#3A3A48",
                          transform: isExpanded
                            ? "rotate(90deg)"
                            : "none",
                          transition: "transform 0.15s",
                        }}
                      >
                        ▸
                      </span>
                    </div>
                    {isExpanded && (
                      <div
                        style={{
                          marginTop: 10,
                          marginLeft: 34,
                          fontSize: 12,
                          lineHeight: 1.7,
                          color: "#8A8A9E",
                          borderLeft: `2px solid ${cat.color}2A`,
                          paddingLeft: 12,
                        }}
                      >
                        {concept.desc}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
