const advancedEmerging = {
  name: "Advanced & Emerging",
  icon: "✦",
  color: "#D946EF",
  concepts: [
    { id: 161, name: "Edge Computing", desc: "Running backend logic at CDN edge locations. Cloudflare Workers, Vercel Edge Functions, Deno Deploy. Lowest latency. Limited runtimes (no filesystem, smaller memory)." },
    { id: 162, name: "AI/ML Integration", desc: "Embedding AI in backends: LLM APIs (OpenAI, Anthropic), embedding generation, RAG pipelines, vector search, model serving (TensorFlow Serving, Triton), feature stores." },
    { id: 163, name: "RAG (Retrieval-Augmented Generation)", desc: "Combine LLMs with your data: embed documents → store in vector DB → retrieve relevant chunks → pass to LLM as context. Powers AI-driven search and chat." },
    { id: 164, name: "WebAssembly on the Server", desc: "Run Wasm modules server-side for near-native performance. Language-agnostic (Rust, C, Go compiled to Wasm). Spin, Fermyon, WasmCloud. Fast cold starts." },
    { id: 165, name: "Multi-Tenancy", desc: "Single application serving multiple customers (tenants). Shared database (tenant_id column), schema-per-tenant, or database-per-tenant. Data isolation is critical." },
    { id: 166, name: "Feature Flags", desc: "Toggle functionality without deployment. Percentage rollouts, user targeting, kill switches. LaunchDarkly, Flagsmith, Unleash. Decouple deploy from release." },
    { id: 167, name: "Audit Logging", desc: "Immutable log of who did what, when, and to what. Compliance requirement (SOC2, HIPAA, GDPR). Structured logs with actor, action, resource, timestamp, before/after state." },
    { id: 168, name: "File Upload Handling", desc: "Multipart form data, streaming uploads, direct-to-S3 presigned URLs, chunked uploads for large files, virus scanning, type validation, size limits." },
    { id: 169, name: "Email Sending", desc: "Transactional (receipts, password resets) and marketing emails. Providers: SendGrid, Postmark, Resend, SES. SPF/DKIM/DMARC for deliverability. Queue emails, don't send synchronously." },
    { id: 170, name: "Full-Text Search", desc: "Beyond LIKE queries. Tokenization, stemming, ranking, fuzzy matching, faceted search. Elasticsearch, Typesense, Meilisearch, PostgreSQL tsvector. Search-as-you-type." },
    { id: 171, name: "Webhooks (Implementing)", desc: "Sending webhooks: retry with backoff, signature verification (HMAC), event types, payload versioning. Receiving: verify signatures, respond quickly (202), process async." },
    { id: 172, name: "Data Privacy & Compliance", desc: "GDPR: right to deletion, data portability, consent. CCPA: California privacy rights. PII encryption, data retention policies, anonymization, audit trails." },
    { id: 173, name: "API Monetization & Metering", desc: "Tracking API usage per customer. Billing based on requests, compute, storage. Usage metering, rate tiers, overage handling. Stripe Billing, Lago, Orb." },
    { id: 174, name: "Database as a Service (DBaaS)", desc: "Fully managed databases. PlanetScale (MySQL), Supabase (PostgreSQL), Neon (serverless Postgres), Turso (SQLite), MongoDB Atlas. Branching, scaling, zero-ops." },
    { id: 175, name: "Real-Time Collaboration", desc: "Multiple users editing simultaneously. CRDTs (Conflict-free Replicated Data Types), Operational Transform (OT). Yjs, Liveblocks, Partykit. Google Docs-like experiences." },
  ],
};
export default advancedEmerging;
