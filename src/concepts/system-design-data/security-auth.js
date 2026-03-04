const securityAuth = {
  name: "Security & Auth",
  icon: "⬟",
  color: "#E74C3C",
  concepts: [
    { id: 77, name: "Authentication vs Authorization", desc: "AuthN: who are you? (identity). AuthZ: what can you do? (permissions). Different concerns, often confused." },
    { id: 78, name: "OAuth 2.0 / OpenID Connect", desc: "OAuth2: delegated authorization framework. OIDC: identity layer on top of OAuth2. Standard for third-party login." },
    { id: 79, name: "JWT (JSON Web Tokens)", desc: "Self-contained tokens encoding user claims. Signed by server. Stateless authentication mechanism." },
    { id: 80, name: "Session-based vs Token-based Auth", desc: "Sessions: server stores state, sends cookie. Tokens: client stores JWT, sends in headers. Tokens scale better." },
    { id: 81, name: "Rate Limiting", desc: "Restricts number of requests per time window. Protects against abuse and DDoS. Algorithms: token bucket, sliding window." },
    { id: 82, name: "API Keys", desc: "Simple tokens identifying the calling application. Used for tracking, billing, basic access control." },
    { id: 83, name: "Encryption at Rest & in Transit", desc: "At rest: encrypting stored data (AES-256). In transit: encrypting network data (TLS/SSL)." },
    { id: 84, name: "Zero Trust Architecture", desc: "Never trust, always verify. Every request authenticated and authorized regardless of network location." },
  ],
};
export default securityAuth;
