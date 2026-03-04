const informationArchitecture = {
  name: "Information Architecture",
  icon: "🗺️",
  color: "#10b981",
  concepts: [
    {
      id: 712,
      name: "Information Architecture (IA)",
      desc: `**Information Architecture (IA)** — the discipline of organizing, structuring, and labeling content in an effective and sustainable way. IA determines how information is grouped, labeled, and navigated — it is the blueprint of a product's content space before any visual design is applied. Pioneered by Richard Saul Wurman, formalized by Peter Morville and Louis Rosenfeld in their seminal "Information Architecture for the World Wide Web" (1998).

**The three circles of IA (Morville & Rosenfeld):**
- **Users** — what people need, how they think, what language they use
- **Content** — what information exists and what will exist in the future
- **Context** — the business goals, constraints, and environment

IA operates at the intersection of all three.

**Core IA deliverables:**
- Sitemaps — visual representation of content hierarchy
- Navigation models — how users move through the space
- Labeling systems — what to call things (labels users understand vs internal terminology)
- Search systems — how content is indexed and retrieved
- Metadata schema — how content is tagged for findability

**IA vs UX:** IA is a subset of UX focused specifically on structure and organization. Good IA means users can find what they're looking for; good UX means they can accomplish their goals. You can have good IA with bad UX (the content is organized logically but the interface is terrible) and vice versa.

**Key insight:** The biggest IA failure is designing the structure around the organization's internal hierarchy rather than users' mental models. Users don't know (or care) how your company is organized internally. They need the structure to match how they think about their problems — not your org chart.`,
    },
    {
      id: 713,
      name: "Navigation Models",
      desc: `**Navigation models** — the systems through which users move through a product's content space. Navigation is the primary affordance of IA — it makes the structure visible and traversable. Poor navigation is the most common IA failure: users can't find what they need because the paths aren't clear.

**Navigation types:**
- **Global navigation** — appears on every page; the main menu; anchors users in the product structure
- **Local navigation** — context-specific to a section (left sidebar in settings, tabs in a product area)
- **Contextual navigation** — inline links, related content, "see also" — connects content thematically
- **Supplemental navigation** — breadcrumbs, site maps, indexes, tags — alternative paths through content
- **Utility navigation** — account, help, settings — functional but not content-oriented

**Navigation patterns:**
- **Tab bar** (mobile) — 3-5 primary destinations; always visible
- **Hamburger menu** — hides navigation; reduces discoverability; appropriate when space is constrained and navigation is secondary
- **Mega menu** — complex hierarchies on desktop; visible deep navigation in one interaction
- **Left sidebar** — standard for dense enterprise/B2B tools; always-visible hierarchical navigation
- **Faceted navigation** — filtering large content sets by multiple attributes simultaneously (e-commerce filtering)

**Navigation as wayfinding:** Navigation does three things: tells users where they are, shows where they can go, and reminds them where they've been. Breadcrumbs, active states in the nav, and page titles all serve this wayfinding function.

**Key insight:** Navigation should be designed last, not first. Start with user goals and content, define the structure via IA, validate with card sorting and tree testing — then design the navigation system. Teams that start by designing the nav menu are designing the answer before they understand the question.`,
    },
    {
      id: 714,
      name: "Mental Models & Information Scent",
      desc: `**Information scent** — the degree to which a navigation label, link, or visual cue signals to users that clicking it will lead to what they're looking for. The concept originates from information foraging theory (Pirolli & Card, 1999): users behave like animals foraging for food, following "scent trails" of information cues. Strong scent = users follow the right path. Weak scent = users are lost or abandon.

**What creates strong information scent:**
- Labels that match users' language (not internal jargon or marketing speak)
- Navigation categories that users can predict what's inside
- Preview text and images that indicate content quality
- Breadcrumbs and context that confirm users are on the right path

**What destroys information scent:**
- Generic labels ("Services", "Solutions", "Products" — what do these mean?)
- Clever or branded names that don't describe content ("The Lab" instead of "Research")
- Ambiguous categories where content could reasonably belong to multiple places
- Icons without labels (no verbal scent)

**Mental models and labeled categories:** Card sorting reveals what categories users expect and what labels they associate with content. When your taxonomy uses labels that match users' mental models (how they think about the information space), navigation becomes intuitive. When it uses internal terminology or arbitrary categories, it breaks the scent trail.

**Key insight:** The test for information scent is simple: can a first-time user predict what's behind each navigation item without clicking it? If users have to click and back-track repeatedly ("pogo-sticking"), scent is weak. Improving scent is often just renaming categories — label research is the highest-ROI IA investment.`,
    },
    {
      id: 715,
      name: "Card Sorting",
      desc: `**Card sorting** — a UX research method for understanding how users mentally organize information, used to design or validate information architecture. Participants sort cards (each representing a piece of content or feature) into groups that make sense to them, and optionally name the groups. Results reveal user mental models and inform navigation taxonomy.

**Open card sort:** Participants create their own groups and name them. Used when you're designing navigation from scratch and want to discover the categories users naturally form. Results reveal mental models and labeling preferences.

**Closed card sort:** Participants sort cards into predefined categories. Used to validate an existing IA — do users put content where you expect? Reveals whether category labels are clear and whether assignments are intuitive.

**Hybrid card sort:** Participants can use provided categories or create new ones. Flexible; good for validating structure while remaining open to surprises.

**Analysis:**
- **Dendrograms** — tree diagrams showing how frequently cards were grouped together; items co-grouped often belong in the same category
- **Agreement score** — percentage of participants who put a card in the same place; low agreement = ambiguous content or unclear categories
- **Category names** — qualitative gold; users' vocabulary for grouping is exactly the label language to use

**Tools:** Optimal Workshop (OptimalSort), Maze, UserZoom, UserTesting all offer digital card sorting. Digital allows larger sample sizes; in-person allows follow-up questions and think-aloud narration.

**Key insight:** Card sorting doesn't design your navigation for you — it gives you data to inform design decisions. Two different card sort populations may produce different groupings. The output is evidence about how your users think, not a prescription for exactly what to build.`,
    },
    {
      id: 716,
      name: "Tree Testing",
      desc: `**Tree testing** — a usability evaluation method for testing the findability of topics within a site's navigation hierarchy (the "tree"). Participants are given tasks ("find X") and navigate a text-only version of the site structure (no visual design, no content) — isolating whether the IA itself is the problem or whether visual design is masking structural issues.

**Why text-only:** Removing visual design eliminates confounds — participants can't use visual cues, image content, or layout to find things. Pure tree navigation reveals whether the labels and structure work on their own terms.

**Key tree testing metrics:**
- **Success rate** — percentage of participants who found the correct answer
- **Directness** — percentage who went straight to the correct location (vs backtracked)
- **Time on task** — faster = clearer information scent
- **First-click analysis** — where participants clicked first; indicates initial mental model

**Interpreting results:**
- High success + high directness = IA is working
- Low success + many first-clicks at the wrong top-level category = category labels are mismatched to mental models
- High backtracking = weak scent at intermediate nodes; users know the category but can't find the leaf
- Consistent wrong locations = items are in the wrong category; the content belongs where users look for it

**Tree testing workflow:** Card sorting → design the tree → tree test → refine → tree test again. Iterate until directness and success rates are acceptable before investing in visual design.

**Tools:** Treejack (Optimal Workshop), Maze, UserZoom.

**Key insight:** Tree testing before visual design is the most cost-efficient form of IA validation. Changing labels and hierarchy in a text tree takes minutes. Changing them after a visual design is built takes days. Test early, test the structure, not the skin.`,
    },
    {
      id: 717,
      name: "Sitemaps",
      desc: `**Sitemap (UX artifact)** — a visual diagram representing a product's content hierarchy: every major section, subsection, and page, and how they relate to each other. Not to be confused with XML sitemaps (for search engine crawlers) — a UX sitemap is a design communication and planning tool.

**What sitemaps are for:**
- **Communication** — aligning stakeholders, clients, and teams on the scope and structure before development begins
- **Gap detection** — reveals orphan content (pages not connected to navigation), duplicate sections, and unclear hierarchy
- **Navigation planning** — informs how many navigation levels are needed and what the primary/secondary nav structure should be

**Sitemap conventions:**
- Boxes represent pages or content types
- Lines show parent-child relationships (hierarchy) or cross-links (related content)
- Numbers indicate page hierarchy (1.0 Home, 1.1 About, 1.1.1 Team)
- Color coding can distinguish content types, team ownership, or development status

**Flat vs deep hierarchies:** Information architecture has a fundamental tension between broad (many items at each level, few levels) and deep (few items at each level, many levels). Research suggests 3-4 levels maximum before navigation becomes exhausting. Flat navigations require users to evaluate many options; deep navigations require many clicks.

**When to build one:** Before any design work begins for new products or major redesigns. For ongoing products, a "current state" sitemap can reveal structural problems that have accumulated over time.

**Key insight:** A sitemap is not the architecture — it's a representation of the architecture. The most valuable thing that happens when building a sitemap is the conversation it generates: "Where does this content actually live? Why is this buried four levels deep?" These conversations surface structural decisions that would otherwise be made implicitly in the moment of building.`,
    },
    {
      id: 718,
      name: "Taxonomy & Ontology",
      desc: `**Taxonomy** — a hierarchical classification system that organizes content into categories and subcategories. **Ontology** — a broader knowledge structure that captures not just hierarchy but the relationships between concepts (is-a, part-of, related-to). In practice: taxonomy structures how content is organized; ontology enables more sophisticated connections between content.

**Taxonomies in UX:**
- **Navigation taxonomies** — the category structure of product navigation
- **Content taxonomies** — how content types are classified (blog: Tutorial/Case Study/News; product: Shoes/Boots/Sneakers)
- **Tag taxonomies** — flat or hierarchical keyword systems for content tagging and faceted filtering

**Controlled vocabulary:** A defined set of preferred terms for content tagging — ensures consistency across a team or content management system. Without it, the same concept gets tagged with 15 different synonyms, destroying findability.

**Faceted classification:** Multiple independent attributes applied to each item, enabling multi-dimensional filtering. An e-commerce product has attributes: category, brand, size, color, material, price range. Faceted navigation lets users filter by any combination. This is more flexible than hierarchical taxonomy but more complex to design.

**Taxonomy governance:** Who can add new tags or categories? Ungoverned folksonomies (user-generated tags) produce synonym explosions and garbage data. Governed taxonomies require a content strategy owner and editorial standards.

**Key insight:** Taxonomy work is unsexy, high-value, and chronically underfunded. The most common content strategy failure is launching a product with no controlled vocabulary, then discovering 18 months later that the same concept has 40 different tag labels in the system. Retrofitting taxonomy is far more expensive than designing it upfront.`,
    },
    {
      id: 719,
      name: "Search & Findability",
      desc: `**Findability** — the ease with which users can locate specific information within a product. Search is the primary escape valve when navigation fails — users who can't find content through navigation resort to search. Poor findability is the single most common reason users abandon products.

**The two findability modes:**
- **Known-item search** — users know exactly what they want and are looking for it ("find my last invoice")
- **Exploratory search** — users have a vague goal and are browsing/discovering ("what laptops are available under $1000?")

These require different search experiences: known-item needs precision (exact match); exploratory needs recall, suggestions, and filtering.

**Search UX components:**
- **Autocomplete & suggestions** — reduces typing, corrects spelling, surfaces popular queries
- **Filters & facets** — refine large result sets by attribute (price range, date, category, author)
- **Result ranking** — relevance (default), recency, popularity; user should understand how results are ordered
- **Zero-results handling** — empty results are a UX emergency; offer suggestions, spell-check fallback, alternative paths
- **Search result design** — title, URL/breadcrumb, description snippet, metadata (date, author); enough context for users to evaluate without clicking

**Search analytics:** Query logs are gold for IA and content strategy. High-volume searches that return no results identify content gaps. High-volume searches that users then navigate away from identify content quality issues or misleading labels.

**Key insight:** Search is not a substitute for good navigation — it's a complement. Users who know your navigation can find things quickly; users who don't (first-timers, occasional users) fall back to search. A site that relies entirely on search has given up on helping users understand its content space.`,
    },
    {
      id: 720,
      name: "Progressive Disclosure",
      desc: `**Progressive disclosure** — a design pattern that presents only the most relevant information initially, revealing more details as users request them or as they become relevant. Prevents cognitive overload by deferring complexity until it's needed, while still making it available.

**The principle:** Match the information presented to the user's current task and context. Show beginners the simple version; show experts the advanced version. Show all users the summary first; reveal details on demand.

**Implementation patterns:**
- **Accordions** — collapse secondary content, expand on click (FAQs, long settings pages)
- **Progressive form disclosure** — show next set of fields only when earlier fields are completed
- **Expandable sections** — "Show more" / "Advanced options" for secondary settings
- **Layered navigation** — top-level categories first, subcategories revealed on hover or click
- **Tooltips & popovers** — contextual help revealed on hover, not always visible
- **Wizard / stepper pattern** — multi-step forms that reveal one conceptual step at a time

**When NOT to use it:** When users need to see all information at once to make a decision (comparison tables, data grids, form validation feedback). Progressive disclosure is for reducing complexity, not hiding necessary information.

**The cost of extra clicks:** Each disclosure event requires a click or interaction. If users must expand to see content they need frequently, progressive disclosure becomes a friction source. The pattern works when the hidden content is genuinely secondary.

**Key insight:** Progressive disclosure is a powerful tool misused when it hides information that a large percentage of users actually need. If 70% of users immediately expand an accordion, the content belongs visible by default. Good progressive disclosure requires usage analytics, not just good intentions.`,
    },
    {
      id: 721,
      name: "Content Strategy",
      desc: `**Content strategy** — the planning, creation, delivery, and governance of useful, usable content. Kristina Halvorson's definition: "the practice of planning for the creation, delivery, and governance of useful, usable content." In the context of IA and UX, content strategy determines what content exists, what form it takes, and how it is maintained.

**Content strategy components:**
- **Content inventory & audit** — cataloguing all existing content, assessing quality and relevance
- **Content model** — how content is structured (what types exist, what fields/attributes each type has); the data model for content
- **Voice & tone** — how the product communicates (personality, formality level, empathy in error messages)
- **Content governance** — who creates, approves, and maintains content; editorial standards; content lifecycle
- **Content migration** — plan for moving from old structure to new during redesigns

**Content first vs design first:** The "content first" principle: design around real content, not lorem ipsum. Placeholder text masks content problems — text that looks fine as lorem ipsum fails with real headlines that are 3× longer. Content first prevents late-stage redesigns caused by content that doesn't fit the designed containers.

**Microcopy:** The small text that interfaces use to communicate: button labels, error messages, empty states, form instructions, confirmation dialogs. Often overlooked; profoundly impacts UX. "Submit" tells users nothing; "Create my account" is action-oriented and clear.

**Key insight:** Content is not the stuff that fills in the design — content IS the product. Most digital products are entirely content (information, data, communications). Treating content as a design implementation detail, rather than the core design problem, is the source of most information architecture failures.`,
    },
  ],
};

export default informationArchitecture;
