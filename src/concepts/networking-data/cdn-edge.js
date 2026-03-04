const cdnEdge = {
  name: "CDN & Edge Computing",
  icon: "⚡",
  color: "#06b6d4",
  concepts: [
    {
      id: 858,
      name: "What Is a CDN",
      desc: `**CDN (Content Delivery Network)** — a geographically distributed network of servers (Points of Presence, or PoPs) that cache and serve content from locations close to end users, reducing latency and origin load. Major CDNs: Cloudflare (300+ PoPs), Akamai (4,000+ PoPs), Fastly, AWS CloudFront, Google Cloud CDN.

**How CDNs work:**
1. Origin server holds the canonical content
2. CDN edge servers are globally distributed
3. User's DNS query resolves (via GeoDNS or anycast) to the nearest CDN edge PoP
4. Edge server checks its cache for the requested content
5. **Cache hit:** edge serves content directly; origin not involved; typical latency: 10-50ms
6. **Cache miss:** edge fetches from origin, caches the response, serves to user; subsequent users served from cache

**What CDNs accelerate:**
- **Static assets** — images, CSS, JavaScript bundles, fonts; high cache hit rate; simple caching
- **Video streaming** — large files requiring segmented delivery; CDNs serve HLS/DASH segments from edge
- **Dynamic content acceleration** — CDN sits between users and origin; TCP connections are established to nearby edge (reducing handshake latency); even uncached requests benefit from optimized routing to origin
- **Software downloads** — OS updates, game patches; CDNs absorb massive simultaneous download loads

**CDN economics:** Cache hit rate is the key metric. 90%+ cache hit rate means 90% of requests never reach the origin — 10× reduction in origin compute cost and egress bandwidth. CDN bandwidth is much cheaper than origin bandwidth (CDNs have direct peering with ISPs).

**Key insight:** A CDN's benefit is often misunderstood as "only for static files." Modern CDNs provide full-stack acceleration: TCP connection termination near the user (reduces TLS handshake latency), smart routing over optimized backbones to origin (reduces dynamic request latency), and edge compute for some logic. For a global product, CDN acceleration consistently reduces P99 latency by 50-80%.`,
    },
    {
      id: 859,
      name: "CDN Caching",
      desc: `**CDN caching** — the mechanism by which CDN edge servers store responses from the origin and serve subsequent identical requests without contacting the origin. Caching strategy is the critical design decision in CDN deployment — what to cache, for how long, and how to invalidate.

**Cache-Control headers:** The primary mechanism for controlling CDN caching behavior:
- "Cache-Control: public, max-age=31536000" — cache for 1 year; appropriate for versioned static assets (CSS with hash in filename)
- "Cache-Control: public, max-age=3600, stale-while-revalidate=86400" — serve from cache for 1 hour; serve stale content for 1 day while revalidating in background
- "Cache-Control: private" — CDN should not cache; browser may cache
- "Cache-Control: no-store" — don't cache anywhere
- "Cache-Control: no-cache" — must revalidate with origin before serving (confusing name)
- "Surrogate-Control: max-age=3600" — CDN-specific header (Varnish, Fastly) for separate CDN TTL from browser TTL

**Cache key:** What determines whether two requests share a cached response. Default: URL. Customizable: vary by Accept-Encoding, cookies, query parameters, headers. "Vary: Accept-Encoding" creates separate cache entries for gzip and non-gzip responses.

**Cache invalidation:** The hard problem. Options:
- **URL fingerprinting** — embed content hash in filename (style.abc123.css); old and new versions coexist; no invalidation needed; best approach for versioned assets
- **Purge API** — CDN vendor API to invalidate specific URLs or tags; Cloudflare, Fastly support single-file and tag-based purge
- **Short TTL** — cache for 60 seconds; stale content is brief; simple but wastes CDN capability for content that rarely changes

**Key insight:** Cache-busting via URL fingerprinting (webpack content hashes, Vite asset fingerprinting) is the most reliable caching strategy: set max-age to 1 year for fingerprinted assets; the user automatically gets new versions because the URL changes. Deploying without URL fingerprinting means choosing between stale content (long TTL) and poor CDN utilization (short TTL).`,
    },
    {
      id: 860,
      name: "Edge Computing",
      desc: `**Edge computing** — processing computation at the edge of the network, near users, rather than in centralized cloud data centers. Reduces round-trip time for latency-sensitive operations by executing code in the PoP closest to the user.

**CDN edge compute offerings:**
- **Cloudflare Workers** — V8 JavaScript isolates; execute at 300+ PoPs; ~0ms cold start; no containers; stateless; 128MB memory; access to KV, Durable Objects, R2 storage
- **Fastly Compute@Edge** — WebAssembly-based; supports multiple languages (Rust, JavaScript, Go); execution at all Fastly PoPs
- **AWS Lambda@Edge / CloudFront Functions** — execute at CloudFront edge; Lambda@Edge runs Node.js/Python; CloudFront Functions are lighter, faster, cheaper (JavaScript only)
- **Vercel Edge Functions / Netlify Edge Functions** — built on Cloudflare Workers and Deno Deploy respectively

**Edge compute use cases:**
- **Request routing** — redirect based on geolocation, A/B test assignment, device type; zero origin latency
- **Authentication** — verify JWT tokens at the edge; reject unauthorized requests before they reach origin
- **Response transformation** — modify HTML, add security headers, personalize content
- **API gateway** — lightweight API handling without a full origin server round trip
- **Server-side rendering at the edge** — render personalized HTML at the edge PoP; Next.js, Remix, and other frameworks support edge rendering

**Edge limitations:** No persistent local state (stateless by design); no file system; limited memory; limited execution time; restricted APIs (no arbitrary TCP connections); V8 isolates (not Node.js — some npm packages won't work). The isolation model is security-critical but constrains capabilities.

**Key insight:** Edge functions are not a replacement for origin servers — they're a filter layer that handles logic that can be resolved without origin data. The question to ask: "Does answering this request require data from my database, or can it be answered from information in the request itself (headers, URL, cookies) and a small amount of edge-stored data?" If yes, edge is appropriate.`,
    },
    {
      id: 861,
      name: "CDN Security (WAF & DDoS)",
      desc: `**CDN security** — the security services bundled with CDN offerings, primarily Web Application Firewalls (WAF) and DDoS protection. Major CDNs have become the primary line of defense for most internet properties.

**Web Application Firewall (WAF):** Inspects HTTP/HTTPS traffic and blocks requests matching attack signatures. Protects against OWASP Top 10: SQL injection, XSS, CSRF, path traversal, and other application-layer attacks. Cloudflare WAF, AWS WAF, Akamai App & API Protector, Imperva Cloud WAF are market leaders.

**WAF rule types:**
- **Managed rule sets** — vendor-maintained rules for common attacks; OWASP Core Rule Set (CRS), vendor-specific threat intelligence; regularly updated for new CVEs
- **Custom rules** — organization-specific rules (block traffic from specific countries, rate-limit specific paths, block specific User-Agent patterns)
- **Rate limiting rules** — limit requests per IP, per URL, per custom criteria; mitigates credential stuffing, scraping, API abuse

**CDN DDoS absorption:** CDNs absorb volumetric DDoS attacks because their aggregate network capacity (Cloudflare: 200+ Tbps, Akamai: 1.3 Pbps) dwarfs any attack. Attack traffic hits CDN edge PoPs, which have sufficient capacity to absorb it while continuing to serve legitimate traffic. Anycast distribution spreads attack volume across hundreds of PoPs.

**Bot management:** Modern CDNs offer sophisticated bot detection: browser fingerprinting, behavioral analysis, IP reputation, proof-of-work challenges. Distinguishes between legitimate crawlers (Googlebot), benign automation (monitoring tools), and malicious bots (credential stuffing, scraping, carding).

**Key insight:** For most internet-facing applications, putting the application behind a CDN with WAF and DDoS protection is the most cost-effective security investment available. The alternative — building or buying equivalent DDoS scrubbing infrastructure, WAF hardware, and network capacity — costs millions. Cloudflare's free and Pro tiers provide enterprise-grade protection that was previously only available to large enterprises.`,
    },
    {
      id: 862,
      name: "Image & Video Optimization",
      desc: `**CDN media optimization** — automated transformation, compression, and format conversion of images and video performed at CDN edge nodes, reducing file size and improving load performance without requiring origin-side processing.

**Image optimization at the edge:**
- **Format conversion** — detect browser support (WebP, AVIF) and serve the optimal format: same image, 25-80% smaller than JPEG/PNG depending on format and content
- **Responsive resizing** — serve appropriately sized images for the requesting device; a phone doesn't need a 3000px wide image; URL parameters or Accept headers trigger resize
- **Compression level tuning** — per-content-type quality optimization; photographs vs illustrations vs screenshots require different quality settings
- **Lazy loading headers** — some CDNs inject "loading=lazy" attributes into img tags for below-the-fold images

**Tools:** Cloudflare Images, Fastly Image Optimizer, Imgix, Cloudinary, AWS CloudFront + Lambda@Edge with Sharp, Vercel Image Optimization.

**Video delivery:**
- **Adaptive Bitrate (ABR) streaming** — video encoded at multiple bitrates (360p, 720p, 1080p, 4K); player selects highest quality bitrate that plays without buffering based on available bandwidth; HLS (HTTP Live Streaming) and MPEG-DASH are the standards
- **CDN video delivery** — HLS/DASH segments are small files (2-10 seconds); extremely cache-friendly; CDNs dramatically reduce origin load for video
- **Video transcoding** — some CDNs offer transcoding (MP4 → HLS); more commonly done at origin (FFmpeg, AWS Elemental MediaConvert)

**LCP (Largest Contentful Paint) impact:** The hero image is typically the LCP element — the metric most impacted by image optimization. Serving the hero image in AVIF format from a nearby CDN edge consistently reduces LCP by 500ms-2s on real-world mobile connections.

**Key insight:** Image optimization is one of the highest-ROI web performance investments. In most real-world web pages, images account for 60-80% of total page weight. A single configuration change (enable WebP/AVIF serving on your CDN) can reduce page weight by 40-60% with no visual quality degradation — and it's often a one-click configuration, not a code change.`,
    },
    {
      id: 863,
      name: "CDN Cache Invalidation",
      desc: `**Cache invalidation** — the process of removing or updating cached content on CDN edge nodes before its TTL expires. Necessary when content changes and you can't wait for the TTL to expire. Phil Karlton's famous observation: "There are only two hard things in Computer Science: cache invalidation and naming things."

**Why it's hard:** CDN edge nodes (hundreds of them) each hold their own copies of cached content. Invalidation must be atomic enough that no user sees stale content after a deployment, and fast enough to not require long "deployment windows." In practice, there's always a brief window where some edges have new content and others have old.

**Invalidation approaches:**
- **URL-based purge** — invalidate specific URL paths; supported by all CDNs; "POST /zones/{zone}/purge_cache" with URL list; fast (seconds) but requires knowing all affected URLs
- **Tag-based purge (Cache Tags / Surrogate Keys)** — origin tags cached responses with a "Cache-Tag: blog-post-123" header; when content changes, purge by tag; all responses tagged with that tag are invalidated atomically. Cloudflare Cache Tags, Fastly Surrogate Keys implement this.
- **Wildcard purge** — invalidate all URLs matching a pattern; slower and more disruptive; use sparingly
- **Full cache purge** — invalidate everything; appropriate for major site redesigns; triggers a thundering herd (all requests hit origin until caches warm)

**Cache versioning as invalidation-free strategy:** For static assets, URL fingerprinting (content hash in filename) eliminates the need for invalidation. The URL changes when content changes; old and new exist simultaneously; browser and CDN cache the correct version by URL.

**The thundering herd problem:** After a full cache purge, all traffic hits origin simultaneously. Mitigation: "stale-while-revalidate" (serve stale content while revalidating; prevents thundering herd at the cost of brief staleness), gradual rollout, origin autoscaling.

**Key insight:** Cache tags/surrogate keys are the most powerful invalidation tool available — they enable "purge all content related to this entity" without knowing every URL. If your CDN supports them and your CMS or API doesn't emit cache tags, adding that capability is the highest-ROI caching investment after basic TTL configuration.`,
    },
    {
      id: 864,
      name: "Multi-CDN Strategy",
      desc: `**Multi-CDN** — using two or more CDN providers simultaneously to serve different portions of traffic, enabling failover between providers, geographic coverage optimization, and negotiating leverage.

**Motivations for multi-CDN:**
- **Availability** — CDN outages happen (Fastly 2021, Cloudflare 2022, Akamai 2021); a single CDN is a single point of failure for a global internet property
- **Performance** — different CDNs have different coverage strengths in different regions; Cloudflare may be fastest in North America; Akamai may be fastest in certain Asian markets
- **Cost optimization** — route traffic to the cheapest CDN per region, per content type
- **Vendor negotiation leverage** — operating with two CDNs prevents lock-in and enables competitive pricing negotiation

**Traffic steering approaches:**
- **DNS-based steering** — return different CNAME records or IPs for different user populations (geo, ISP); simplest but bounded by DNS TTL
- **Anycast-based steering** — use a traffic management service (NS1, Route 53, Cloudflare Traffic Manager) that monitors CDN performance in real time and steers traffic to the best-performing CDN
- **Real User Monitoring (RUM) steering** — measure actual CDN performance from real users; Route 53 Application Recovery Controller, Cedexis (now Akamai mPulse) provide RUM-based CDN selection

**Operational complexity:** Multi-CDN requires consistent cache invalidation across providers (purge on all CDNs simultaneously), consistent WAF policies, and consistent origin authentication (CDN-to-origin tokens for each provider).

**Key insight:** Most organizations don't need multi-CDN at their scale. Single-CDN with proper DDoS protection and origin failover is sufficient for most use cases. Multi-CDN is a strategy for organizations where CDN availability directly correlates with significant revenue impact — e-commerce, streaming services, financial platforms. For others, the operational complexity outweighs the marginal availability gain.`,
    },
    {
      id: 865,
      name: "CDN Performance Metrics",
      desc: `**CDN performance metrics** — the measurements used to evaluate CDN effectiveness and identify optimization opportunities. Understanding these metrics distinguishes good CDN configuration from optimal.

**Key CDN metrics:**
- **Cache Hit Ratio (CHR)** — percentage of requests served from cache without contacting origin; target: 85-95%+ for static assets; lower for highly dynamic content; the primary CDN efficiency metric
- **Origin Offload** — percentage of origin requests saved by CDN; closely related to CHR; target: same
- **Edge Response Time** — time from CDN edge receiving request to sending first byte; includes cache lookup time and, on miss, origin fetch time
- **Time to First Byte (TTFB)** — from user sending request to first byte received; includes network latency to edge + edge processing; should be < 200ms for cached content from a nearby edge
- **Bandwidth distribution** — how traffic is distributed across PoPs; reveals geographic demand patterns
- **Error rates** — 4xx (client errors, potentially indicating misconfiguration) and 5xx (origin errors being passed through or generated by the CDN)

**Diagnosing low cache hit ratio:**
- **Cacheable content with short TTL** — increase TTL for content that changes infrequently
- **Cache key fragmentation** — unnecessary query parameters in cache key (session IDs, ad tracking parameters) prevent cache sharing; normalize cache keys by stripping irrelevant parameters
- **Vary header fragmentation** — "Vary: User-Agent" creates a separate cache entry per user agent (thousands of unique user agents); replace with "Vary: Accept-Encoding" only
- **Authenticated content** — "Cache-Control: private" content correctly bypasses CDN; if most traffic is authenticated, CDN primarily accelerates via TCP termination, not caching

**Key insight:** A low cache hit ratio (< 50%) often indicates a configuration problem rather than inherently uncacheable content. Auditing cache key configuration and TTL settings for the most-requested URLs typically reveals multiple high-traffic URLs that are either unnecessarily uncacheable or fragmented across many cache keys.`,
    },
    {
      id: 866,
      name: "Origin Shield",
      desc: `**Origin shield** — an additional CDN caching layer between the edge nodes and the origin server. Instead of each edge PoP independently fetching uncached content from origin, they funnel requests through a single shield PoP that acts as a shared second-level cache.

**The problem origin shield solves:** A CDN with 300 edge PoPs, each with a cold cache after a deployment or for rarely-accessed content, could send 300 simultaneous requests to origin for the same uncached content (the "thundering herd"). Origin shield ensures only the shield PoP queries origin; all other PoPs get the cached response from the shield.

**How it works:**
- Edge receives a cache miss
- Instead of going directly to origin, edge queries the shield PoP (geographically central, well-connected)
- If shield has it cached, returns immediately to edge
- If shield has a cache miss, one request goes to origin; the response is cached at the shield and returned to the edge; subsequent edge misses hit the shield cache

**Origin shield benefits:**
- Dramatically reduces origin traffic — from O(PoPs) requests per content object to O(1)
- Reduces origin infrastructure requirements (fewer servers, lower bandwidth costs)
- Protects origin from flash crowds (new viral content, marketing launches, deployment cache warm-up)
- Better cache utilization — shield aggregates demand from all edges, achieving higher cache hit rates than each edge independently

**Cloudflare Argo, Fastly Origin Shield, AWS CloudFront Origin Shield** are commercial implementations. The shield location should be chosen geographically close to the origin for low shield-to-origin latency.

**Key insight:** Origin shield is the CDN investment with the clearest ROI for content-heavy applications. The math is simple: without shield, a cold cache across 300 edge PoPs means 300 origin requests for the same URL; with shield, it's 1. For high-traffic sites launching new content, origin shield is the difference between "smooth launch" and "launch caused origin overload."`,
    },
    {
      id: 867,
      name: "Anycast Routing",
      desc: `**Anycast** — a network addressing and routing technique where a single IP address is assigned to multiple nodes, and traffic is routed to the topologically nearest node according to the routing protocol (BGP). The sender uses the same IP address regardless of which physical server will receive the packet.

**How anycast routing works:**
1. Multiple servers at different locations each announce the same IP prefix via BGP to their upstream ISPs
2. ISPs' BGP propagates these routes globally
3. When any router on the internet needs to forward a packet to that IP, it follows standard BGP routing — choosing the path with the fewest AS hops (by default) or best routing metric
4. Different geographic regions route to different physical servers based on their view of the routing topology
5. If one server fails and withdraws its BGP announcement, BGP reconverges (typically within minutes) and traffic routes to the next closest server

**Anycast for CDNs and DNS:** Cloudflare operates at 300+ PoPs all announcing the same anycast IP ranges. A user in Tokyo gets a different physical server than a user in London — same IP, different machine. DNS resolution for Cloudflare-protected domains typically returns Cloudflare's anycast IP, which routes to the nearest PoP.

**Anycast vs GeoDNS:**
- Anycast: routing decision made in the network core; sub-millisecond "failover" (BGP reconvergence); no DNS TTL dependency; most reliable
- GeoDNS: routing decision at DNS resolution time; bounded by DNS TTL for failover; simpler to understand; more configurable

**Key insight:** Anycast is the most robust global routing mechanism available and the foundation of most CDN and DNS infrastructure. Its elegance lies in requiring no client-side changes — the client uses one IP address, and network routing transparently delivers it to the optimal server. The trade-off is that anycast requires operating BGP infrastructure at multiple Internet Exchange Points — feasible only for large networks.`,
    },
  ],
};

export default cdnEdge;
