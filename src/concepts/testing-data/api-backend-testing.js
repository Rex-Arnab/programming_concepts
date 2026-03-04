const apiBackendTesting = {
  name: "API & Backend Testing",
  icon: "↯",
  color: "#F59E0B",
  concepts: [
    { id: 107, name: "API Testing", desc: "Testing application programming interfaces directly — request/response validation, status codes, headers, payload structure, auth, error handling. No UI involved." },
    { id: 108, name: "REST API Testing", desc: "Testing RESTful endpoints: HTTP methods (GET, POST, PUT, DELETE), status codes (200, 400, 401, 404, 500), JSON schema validation, HATEOAS links." },
    { id: 109, name: "GraphQL Testing", desc: "Testing queries, mutations, subscriptions. Schema validation, resolver testing, depth limiting, query complexity analysis, error handling for partial responses." },
    { id: 110, name: "Contract Testing", desc: "Verifying that API provider and consumer agree on the interface. Consumer-driven contracts. Pact is the standard. Prevents breaking changes across services." },
    { id: 111, name: "Schema Validation", desc: "Ensuring API responses match the expected schema (JSON Schema, OpenAPI spec, GraphQL SDL). Catches structural regressions and missing/extra fields." },
    { id: 112, name: "Postman / Insomnia", desc: "GUI tools for manual and automated API testing. Collections, environments, pre/post scripts, CI integration. Postman also supports mock servers." },
    { id: 113, name: "Supertest / REST Assured", desc: "Code-level HTTP testing libraries. Supertest (Node.js), REST Assured (Java), httpx (Python), Requests (Python). Programmatic API validation in test suites." },
    { id: 114, name: "Database Testing", desc: "Verifying data integrity, CRUD operations, constraints, triggers, stored procedures, migrations, and rollbacks. Test queries, indexes, and data consistency." },
    { id: 115, name: "Message Queue Testing", desc: "Testing producers, consumers, message format, ordering, delivery guarantees, dead letter queues, idempotency. Kafka, RabbitMQ, SQS test patterns." },
    { id: 116, name: "Service Virtualization", desc: "Simulating dependent services that are unavailable, slow, or expensive to use in testing. WireMock, Mountebank, MockServer. Test in isolation." },
    { id: 117, name: "gRPC Testing", desc: "Testing Protocol Buffer contracts, streaming RPCs, error codes, deadline handling, and interceptors. grpcurl, BloomRPC, and language-specific testing libraries." },
  ],
};
export default apiBackendTesting;
