const graphql = {
  name: "GraphQL",
  icon: "◈",
  color: "#e10098",
  concepts: [
    {
      id: 1249,
      name: "GraphQL Overview",
      desc: `**GraphQL** — a query language for APIs and a runtime for executing those queries, developed by Facebook (2012) and open-sourced (2015). Instead of multiple endpoints returning fixed data shapes, GraphQL exposes a single endpoint where clients specify exactly what data they need.

**Core concepts:**
- **Schema:** a strongly typed contract defining all types, queries, mutations, and subscriptions available — the schema is the API
- **Query:** read operation — client specifies exact fields needed; server returns exactly that, nothing more, nothing less
- **Mutation:** write operation — create, update, delete
- **Subscription:** real-time — server pushes updates when data changes (typically over WebSockets)
- **Resolver:** the function that fetches data for each field in the schema

**Solving REST's over/under-fetching:**
- REST: "GET /users/123" returns all 50 user fields; frontend needs 3
- GraphQL: "{ user(id: 123) { name avatar } }" — returns only name and avatar

**Single endpoint:** "POST /graphql" — all queries and mutations go to one URL. No URL routing to design. Versioning through schema evolution rather than URL versions.

**Strongly typed:** the schema is a contract. Every field has a type. Invalid queries are rejected at parse time, before execution — impossible to request a field that doesn't exist.

**Key insight:** GraphQL shines when you have multiple client types (iOS, Android, web, partner) with different data needs. Instead of maintaining three REST endpoints for three client shapes, one GraphQL schema serves all. Facebook built it because their mobile app needed a subset of the data their desktop app needed — REST's fixed responses were wasteful on mobile.`,
    },
    {
      id: 1250,
      name: "GraphQL Schema Definition Language (SDL)",
      desc: `**GraphQL SDL (Schema Definition Language)** — the human-readable syntax for defining a GraphQL schema. The schema is the centerpiece of GraphQL — it defines every type, field, and operation the API supports.

**Type definitions:**
"type User { id: ID! name: String! email: String! posts: [Post!]! createdAt: DateTime! }"
- "!" = non-null (required). Without "!": field may be null.
- "[Post!]!" = non-null list of non-null Posts. "[Post]" = nullable list of nullable Posts.

**Special root types:**
- "type Query { user(id: ID!): User users(limit: Int, offset: Int): [User!]! }" — all read operations
- "type Mutation { createUser(input: CreateUserInput!): User! deleteUser(id: ID!): Boolean! }" — write operations
- "type Subscription { messageAdded(channelId: ID!): Message! }" — real-time push

**Input types:** "input CreateUserInput { name: String! email: String! role: UserRole = USER }" — separate from output types; used for mutation arguments.

**Enums:** "enum UserRole { ADMIN EDITOR VIEWER }" — typed finite set of values.

**Interfaces and unions:** "interface Node { id: ID! }" — shared fields across types. "union SearchResult = User | Post | Comment" — a field that can be one of several types (requires "__typename" in queries).

**Directives:** "@deprecated(reason: 'Use newField')", "@auth(requires: ADMIN)", "@cacheControl(maxAge: 60)" — schema-level annotations.

**Scalars:** built-in: ID, String, Int, Float, Boolean. Custom: "scalar DateTime", "scalar Upload" (for file uploads).

**Key insight:** The schema is not implementation — it's the contract. Write the schema first (API-first for GraphQL) before writing resolvers. Review it with client teams. A schema error discovered at design time costs 0; discovered after clients have integrated costs hours of coordination.`,
    },
    {
      id: 1251,
      name: "Resolvers",
      desc: `**Resolvers** — the functions that resolve (fetch) the data for each field in a GraphQL schema. Every field in the schema has a corresponding resolver; when a client queries a field, GraphQL calls its resolver to get the value.

**Resolver signature:** "(parent, args, context, info) => value | Promise"
- "parent" (root): resolved value of the parent object (allows chaining)
- "args": arguments passed to the field in the query ("{ user(id: 123) }" → args = { id: 123 })
- "context": shared object across all resolvers in a request (database connection, current user, DataLoader instances)
- "info": query AST metadata (field name, return type, path — rarely used directly)

**Resolver chain:** resolvers compose hierarchically. Query.user resolves the User object; User.posts resolver receives the resolved User as "parent" and fetches its posts:
"const resolvers = { Query: { user: (_, { id }, { db }) => db.users.findById(id) }, User: { posts: (user, _, { db }) => db.posts.findByUserId(user.id) } }"

**Default resolver:** if no resolver is defined for a field, GraphQL uses the default resolver: return "parent[fieldName]". For simple object fields matching the type definition, no resolver is needed.

**Async resolvers:** resolvers return Promises; GraphQL executes sibling resolvers in parallel and awaits all before proceeding to children.

**Error handling in resolvers:** throw an "ApolloError" (or "GraphQLError") to return a field error. Errors are collected and returned in the "errors" array alongside partial data — GraphQL returns as much data as it can even when some resolvers fail.

**Key insight:** The resolver architecture is what makes GraphQL composable. Query "{ user { name posts { title comments { author { name } } } } }" automatically chains User.posts → Post.comments → Comment.author resolvers. Each resolver is independently testable and replaceable. The architecture encourages clean separation of data fetching from business logic.`,
    },
    {
      id: 1252,
      name: "N+1 Problem & DataLoader",
      desc: `**N+1 Problem** — the most common GraphQL performance issue where fetching a list of N items triggers N additional database queries for a related field. Without mitigation, a query for 100 users with their posts fires 100 + 1 = 101 database queries.

**Example:** "{ users { name posts { title } } }" → resolvers call "db.users.all()" (1 query) then for each of 100 users: "db.posts.findByUserId(user.id)" (100 queries) = 101 total.

**DataLoader — the solution:** a batching and caching library by Facebook. Instead of executing each database call immediately, DataLoader collects all load requests within a single event loop tick, then fires ONE batched query for all of them.

**DataLoader usage:**
"const userPostsLoader = new DataLoader(async (userIds) => { const posts = await db.posts.where({ userId: { $in: userIds } }); return userIds.map(id => posts.filter(p => p.userId === id)); });"

"User.posts resolver: (user) => userPostsLoader.load(user.id)"

DataLoader collects all "load(userId)" calls from 100 User.posts resolvers, fires ONE "SELECT * FROM posts WHERE user_id IN (1, 2, ..., 100)", then maps results back. 101 queries → 2 queries.

**Key DataLoader rule:** batch functions must return values in the same order as the input keys; each key maps to exactly one value (or null/error).

**Caching in DataLoader:** DataLoader caches loaded values within a single request — loading user 123 twice returns the same promise. This is per-request memoization, not cross-request caching.

**Key insight:** DataLoader is not optional for production GraphQL — it's essential. A GraphQL API without DataLoader under any non-trivial relationship (users-posts, posts-comments, etc.) will destroy your database under load. Install DataLoader on day one; create one instance per request (not global — caching is per-request).`,
    },
    {
      id: 1253,
      name: "GraphQL Queries & Mutations",
      desc: `**GraphQL Queries and Mutations** — the client-side syntax for reading and writing data through a GraphQL API. Unlike REST where the URL and method determine the operation, in GraphQL the client writes the operation explicitly.

**Query syntax:**
"query GetUser($id: ID!) { user(id: $id) { id name email posts(limit: 5) { title createdAt } } }"
- "query" keyword (can be omitted for read operations)
- Named operation ("GetUser") — optional but essential for logging, tracing, and client tooling
- Variables ("$id: ID!") — always use variables for dynamic values; never string interpolate (injection risk)
- Field selection: only request fields you need

**Mutation syntax:**
"mutation CreatePost($input: CreatePostInput!) { createPost(input: $input) { id title author { name } } }"
- "mutation" keyword — required for write operations
- Request the newly created/updated resource in the response (avoids a separate refetch)

**Fragments:** reusable field selection sets:
"fragment UserFields on User { id name avatar } query GetUsersAndAdmins { users { ...UserFields } admins { ...UserFields role } }"

**Aliases:** request the same field multiple times with different arguments:
"{ activeOrders: orders(status: ACTIVE) { id } pastOrders: orders(status: COMPLETED) { id } }"

**Inline fragments for union/interface types:**
"{ search(query: 'alice') { ... on User { name email } ... on Post { title content } } }"

**Variables (always use them):** pass "{ id: '123' }" as a separate variables object; never build queries with "query { user(id: " + userId + ") }" — this bypasses type validation and risks injection.

**Key insight:** Named operations are not optional in production GraphQL. "query GetUserProfile" appears in server logs, error traces, and performance monitoring — making debugging 10x easier than anonymous "{ user { ... } }". Enforce named operations via server-side rules.`,
    },
    {
      id: 1254,
      name: "GraphQL Subscriptions",
      desc: `**GraphQL Subscriptions** — real-time data streaming where the server pushes updates to clients when data changes. Subscriptions are the GraphQL equivalent of WebSocket push events, defined in the schema and queried like regular operations.

**Subscription syntax:**
"subscription OnMessageAdded($channelId: ID!) { messageAdded(channelId: $channelId) { id content author { name } createdAt } }"

Client sends this over WebSocket (or SSE); server pushes matching events when they occur.

**Transport:** subscriptions run over WebSocket (most common), Server-Sent Events (SSE), or long-polling. Apollo Server uses the "graphql-ws" protocol (superseded the older "subscriptions-transport-ws").

**Resolver pattern:** subscription resolvers use an async iterator (pub/sub):
"Subscription: { messageAdded: { subscribe: (_, { channelId }, { pubsub }) => pubsub.asyncIterableIterator(CHANNEL_MESSAGE_ + channelId), resolve: (payload) => payload.messageAdded } }"

**PubSub implementations:** Apollo Server's built-in "PubSub" (in-memory, single-server only); Redis PubSub via "graphql-redis-subscriptions" for multi-server setups (scales horizontally).

**Subscription vs polling:** polling ("setInterval(() => query(), 5000)") works but is inefficient. Subscriptions push only when data changes — zero wasted requests. Use polling for simple cases; subscriptions for real-time features where latency matters.

**Filtering:** subscription resolvers can filter events per subscriber: "withFilter(iterator, (payload, variables) => payload.channelId === variables.channelId)" — subscribers only receive events relevant to their subscription.

**Key insight:** Subscriptions add significant operational complexity (WebSocket connections are stateful, long-lived, and consume server resources). Don't use subscriptions where polling is sufficient. Use them for features where real-time matters to users: chat, live collaboration, live sports scores, market data. The rule: if 1-second staleness is acceptable, poll; if milliseconds matter, subscribe.`,
    },
    {
      id: 1255,
      name: "GraphQL Schema Design",
      desc: `**GraphQL Schema Design** — the art of designing a schema that is intuitive for clients, maintainable as the API evolves, and performant to resolve. Schema design mistakes are expensive to fix after clients have integrated.

**Design for the client, not the database:** GraphQL schemas should reflect the client's mental model, not the database structure. If the client thinks of a "Product" with "price" and "inventory", expose that — not "ProductRow" with "unit_cost" and "stock_count".

**Nullable vs non-null:** use "!" (non-null) sparingly on output types. Every "!" is a contract — if a resolver fails, the entire parent chain becomes null (error bubbles up). Prefer nullable fields on deeply nested data; use "!" only where null is truly impossible.

**Input design:** use input types (not argument lists) for mutations: "createUser(input: CreateUserInput!)" not "createUser(name: String!, email: String!, role: UserRole)". Input types are reusable; argument lists explode as requirements grow.

**Connection pattern (Relay pagination):** the standard pattern for paginated lists:
"type UserConnection { edges: [UserEdge!]! pageInfo: PageInfo! totalCount: Int! } type UserEdge { node: User! cursor: String! }"

Verbose but enables cursor pagination, total counts, and edge-level metadata. "pageInfo" includes "hasNextPage", "endCursor". Worth adopting for list fields that will be paginated.

**Schema deprecation:** "@deprecated(reason: 'Use newField instead')" on fields — clients see this in tooling (GraphiQL, Apollo Studio shows deprecated fields in orange). Never remove deprecated fields; give clients time to migrate.

**Schema stitching vs federation:** stitch multiple GraphQL schemas into one (manual) or use Apollo Federation (schema composition with "@key" directive for distributed ownership across services).

**Key insight:** The hardest GraphQL schema decision is nullable vs non-null. Default to nullable — it gives you flexibility. Non-null is a promise: "this field will always have a value." Breaking that promise nullifies the entire response path. Netflix, GitHub, and Shopify all use nullable-heavy schemas for resilience.`,
    },
    {
      id: 1256,
      name: "GraphQL Security",
      desc: `**GraphQL Security** — the specific security concerns introduced by GraphQL's flexible query model: clients can request arbitrary query depths, sizes, and field combinations that could exhaust server resources.

**Query depth attacks:** "{ user { friends { friends { friends { friends { ... } } } } } }" — unbounded nesting hits database recursively and times out. Fix: depth limiting middleware (graphql-depth-limit). Max depth of 7-10 levels is typical.

**Query complexity attacks:** "{ products(limit: 1000) { reviews(limit: 1000) { comments(limit: 1000) { author { name } } } } }" — 1B potential objects from one query. Fix: complexity analysis — assign costs to fields and reject queries exceeding a threshold. "graphql-query-complexity" library.

**Batched query attacks:** GraphQL typically supports batching multiple operations in one request: "[{ query: ... }, { query: ... }]". An attacker sends 1000 operations in one HTTP request. Fix: disable batching or limit batch size.

**Introspection in production:** "{ __schema { types { name } } }" reveals your entire schema — field names, types, relationships. A roadmap for attackers. Disable introspection in production; enable it for authenticated users or in staging only.

**Field-level authorization:** every resolver must check permissions. Returning a "User" type from an admin query doesn't automatically restrict access to "User.salary" — resolvers must check: "if (!context.user.isAdmin) throw new ForbiddenError()".

**persisted queries:** instead of accepting arbitrary query strings, only allow pre-registered query hashes. Client sends "{ id: 'abc123' }"; server executes the pre-stored query with that hash. Eliminates query injection; enables allowlisting.

**Key insight:** GraphQL's greatest strength (clients can request anything) is also its greatest security surface. Never trust client-sent query strings in production without depth limiting, complexity analysis, and authorization in every resolver. The "let the client ask for anything" promise must be scoped by what the client is allowed to see.`,
    },
    {
      id: 1257,
      name: "Apollo Server & Federation",
      desc: `**Apollo Server** — the most widely used Node.js GraphQL server implementation. **Apollo Federation** — Apollo's architecture for splitting a single GraphQL schema across multiple independent services (subgraphs), each owned by a separate team.

**Apollo Server basics:**
"const server = new ApolloServer({ typeDefs, resolvers, plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], context: ({ req }) => ({ db, user: authenticateRequest(req) }) });"

Built-in: schema validation, operation tracing, error formatting, health endpoint. Apollo Studio integration for performance monitoring.

**Federation architecture:**
"Monolith GraphQL schema → broken into subgraphs: Products (products team) + Reviews (reviews team) + Users (auth team) → Apollo Router / Gateway composes them into unified schema"

- Each subgraph defines its portion of the schema with "@key" directive for entities: "@key(fields: 'id')"
- The Router fetches from subgraphs and merges results transparently — client sees one unified schema
- Teams deploy their subgraphs independently; the Router re-composes automatically

**Entity references:** "type Product @key(fields: 'id') { id: ID! price: Float! } extend type Product @key(fields: 'id') { reviews: [Review!]! }" — Reviews subgraph extends the Product type to add review data.

**Schema registry (Apollo Studio):** validates new schema pushes against breaking change rules; manages the composition of all subgraphs. Blocks deployment if a subgraph introduces breaking changes.

**Key insight:** Apollo Federation is the GraphQL equivalent of microservices — it enables large organizations to scale GraphQL development across teams without a centralized schema bottleneck. Each team owns their schema slice. The Router handles composition transparently. For teams of 5+, Federation is worth the operational overhead; for small teams, a monolith schema is simpler.`,
    },
    {
      id: 1258,
      name: "GraphQL Caching",
      desc: `**GraphQL Caching** — one of the hardest problems in GraphQL, because the single-endpoint "POST /graphql" design bypasses HTTP GET-based caching by default. Effective caching requires deliberate strategies at multiple layers.

**Why HTTP caching doesn't work out of the box:**
- All queries use POST (CDNs and browsers don't cache POST by default)
- Same URL, different queries — cache key must include query body
- Client-specific data in responses prevents shared caching

**Solutions by layer:**

**1. Persisted queries via GET:** send query hash as "GET /graphql?extensions={"persistedQuery": {"id": "abc123"}}" — cacheable by CDNs for anonymous, public queries.

**2. Apollo Client in-memory cache:** client-side normalized cache. Every queried object is stored by "__typename + id". Subsequent queries for the same entity are served from cache without network requests. Requires IDs in every query.

**3. "@cacheControl" directive (server-side):**
"type Product @cacheControl(maxAge: 300) { id: ID! name: String! }"
Apollo Server respects these hints and sets "Cache-Control" headers on responses. Works for public, non-personalized data.

**4. Dataloader (per-request):** not traditional caching but memoizes database calls within a single request — prevents re-fetching the same entity multiple times in one query.

**5. Response caching plugins:** "apollo-server-plugin-response-cache" caches full query responses in Redis/Memcached; returns cached response for identical queries (same query + variables + authenticated user).

**6. CDN caching for public data:** for public queries (e-commerce catalog, content), use persisted queries over GET — CDN caches the response, dramatically reducing origin load.

**Key insight:** GraphQL caching requires explicit design — it doesn't happen automatically. The highest-value first step: implement Apollo Client's normalized cache correctly (always request ID fields). Second: server-side "@cacheControl" for public data. Don't skip both and wonder why your GraphQL API is slow.`,
    },
    {
      id: 1259,
      name: "GraphQL vs REST Decision",
      desc: `**GraphQL vs REST Decision** — the practical framework for choosing between GraphQL and REST, based on your specific use case, team, and client landscape. The choice is not technical dogma — it's an engineering trade-off.

**Choose GraphQL when:**
- Multiple clients (iOS, Android, web, partner) with different data shape requirements
- Complex, deeply nested data with many relationships (social graph, product catalog with variants, CMS)
- Rapid frontend iteration — frontend changes data requirements frequently; schema evolution without versioning
- Strong typing is a priority — the schema as documentation + codegen for type-safe clients
- You have the tooling maturity: DataLoader, persisted queries, monitoring

**Choose REST when:**
- Simple CRUD API with predictable, stable data shapes
- Public API for third-party developers (REST is more universally understood; GraphQL's query language is a learning curve)
- Heavy caching requirements (REST's HTTP caching works naturally; GraphQL caching needs extra work)
- File uploads (GraphQL multipart is awkward; REST handles it naturally)
- Small team without GraphQL expertise
- Streaming / download APIs

**Both (common pattern):** REST for the public API (Stripe-like), GraphQL internally for complex data fetching between frontend and backend.

**GraphQL operational cost:** more complex to set up (schema, resolvers, DataLoader, persisted queries, monitoring). REST has a lower operational floor — express + a few routes is production-ready in hours.

**Key insight:** GraphQL is not "better than REST" — it solves specific problems (over/under-fetching, multiple client types) at the cost of complexity (N+1, caching, security surface, tooling). The engineers who regret adopting GraphQL tried to use it as a REST replacement everywhere. Use it where it excels; use REST where it suffices.`,
    },
    {
      id: 1260,
      name: "GraphQL Tooling & Ecosystem",
      desc: `**GraphQL Tooling Ecosystem** — the libraries, platforms, and developer tools that make building, documenting, and consuming GraphQL APIs practical at scale.

**Server libraries:**
- **Apollo Server (Node.js):** most popular; excellent ecosystem; Apollo Studio integration
- **GraphQL Yoga (Node.js):** lighter weight; Envelop plugin system; built on graphql-js
- **Strawberry (Python):** code-first with Python type hints; excellent DX
- **gqlgen (Go):** type-safe, code-generated Go server from schema; high performance
- **Lighthouse (PHP/Laravel):** annotation-based GraphQL for Laravel
- **Juniper (Rust):** type-safe GraphQL for Rust

**Client libraries:**
- **Apollo Client:** industry standard; normalized cache; React/Vue/Angular integrations; dev tools
- **urql:** lighter weight alternative; extensible via exchanges; good performance
- **SWR / React Query + fetch:** minimal GraphQL clients for simpler use cases

**Developer experience:**
- **GraphiQL / Apollo Sandbox:** in-browser IDE; schema exploration; query autocomplete
- **Apollo Studio:** schema registry; operation monitoring; performance tracing; breaking change detection
- **GraphQL Code Generator:** generates TypeScript types, hooks, and query documents from schema + operations
- **Pothos (GraphQL Schema Builder):** code-first type-safe schema building for TypeScript

**Testing:**
- **graphql-tag (gql):** parse GraphQL documents in tests
- **msw (Mock Service Worker):** mock GraphQL operations in browser tests
- **jest-graphql-schema:** validate schema shape in tests

**Key insight:** GraphQL Code Generator is non-negotiable for TypeScript projects. It reads your schema and operations, generates fully typed React hooks and TypeScript types — zero manual type writing. When the schema changes, regenerate and TypeScript errors show exactly where client code needs updating. This workflow makes schema-first development practical.`,
    },
  ],
};

export default graphql;
