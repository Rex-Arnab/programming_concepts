const identityAccess = {
  name: "Identity & Access Management",
  icon: "🪪",
  color: "#8b5cf6",
  concepts: [
    {
      id: 1060,
      name: "Authentication vs Authorization",
      desc: `**Authentication (AuthN)** — verifying who you are. **Authorization (AuthZ)** — verifying what you're allowed to do. These are distinct, sequential concerns: a system must authenticate before it can authorize; failing to separate them is a common design flaw.

**Classic analogy:** authentication is checking your ID at the door; authorization is checking your ticket to see which sections of the venue you can access. A valid ID doesn't grant access to the VIP lounge.

**Authentication factors:**
- **Something you know:** password, PIN, security question (weakest)
- **Something you have:** OTP token, hardware key (YubiKey), SMS code
- **Something you are:** fingerprint, face recognition, voice (biometrics)
- **MFA:** combining two or more factors — dramatically reduces risk

**Authorization models:** ACL (Access Control List — per-resource permission lists), RBAC (roles define what users can do), ABAC (policies based on attributes), ReBAC (relationship-based — a user can edit a document if they're its owner).

**Common mistakes:** checking authentication but not authorization (assuming all logged-in users can access any endpoint); performing authorization on the client side (easily bypassed); conflating roles with permissions (a "role" is just a label — permissions must be checked for each action).

**Key insight:** "I know who you are" does not mean "I know what you can do." Treat every authorization decision as a first-class check: even if the user is authenticated, explicitly verify they have permission for this specific resource and action.`,
    },
    {
      id: 1061,
      name: "OAuth 2.0",
      desc: `**OAuth 2.0** — an authorization framework (not authentication!) that enables a user to grant a third-party application limited access to their resources on another service, without sharing their password. The "Sign in with Google" button on an app delegates to Google for authorization.

**Core roles:** Resource Owner (user), Client (the app requesting access), Authorization Server (Google, GitHub — issues tokens), Resource Server (the API holding the user's data).

**The authorization code flow (most common):**
1. User clicks "Sign in with Google" — client redirects to Google with client_id, redirect_uri, scope, state
2. User authenticates with Google and grants permissions
3. Google redirects back to the app with an authorization code
4. App exchanges the code for access token + refresh token (server-side, never exposing tokens to the browser)
5. App uses access token to call the resource server (Google APIs)

**Scopes:** limit what the token can do. "read:email" only allows reading email; "repo" allows full repository access. Request minimum necessary scopes.

**PKCE (Proof Key for Code Exchange):** for public clients (SPAs, mobile apps) that can't store a client secret, PKCE prevents authorization code interception attacks. Use PKCE for all public client OAuth flows.

**Common mistakes:** storing access tokens in localStorage (vulnerable to XSS — use HttpOnly cookies or memory); not validating the "state" parameter (CSRF protection); using implicit flow (deprecated — access token in URL fragment, no refresh token).

**Key insight:** OAuth 2.0 is about delegation, not authentication. "The user authorized my app to read their Google Calendar" ≠ "The user is who they claim to be." OpenID Connect adds identity on top of OAuth 2.0.`,
    },
    {
      id: 1062,
      name: "OpenID Connect (OIDC)",
      desc: `**OpenID Connect (OIDC)** — an identity layer built on top of OAuth 2.0 that adds authentication. While OAuth 2.0 gives you an access token to call APIs, OIDC gives you an ID Token (a JWT) that tells you who the user is: their identity, name, email, and other profile claims.

**ID Token structure (JWT):** header.payload.signature. The payload contains claims: "sub" (subject/user ID), "iss" (issuer — the identity provider), "aud" (audience — your client ID), "exp" (expiration), "iat" (issued at), "email", "name", etc.

**OIDC flows:** same as OAuth 2.0 (authorization code, implicit, hybrid) — OIDC extends OAuth by adding the ID Token and a UserInfo endpoint.

**Validating the ID Token:** verify the JWT signature using the IdP's public key (obtained from the JWKS endpoint); verify "iss" matches the expected issuer; verify "aud" matches your client ID; verify "exp" is in the future; verify "nonce" matches (prevents replay attacks).

**OIDC Discovery:** IdPs publish their configuration at "/.well-known/openid-configuration" — endpoints, supported scopes, signing key URLs. Libraries handle discovery automatically.

**Major IdPs using OIDC:** Google, Microsoft (Azure AD), Okta, Auth0, GitHub, Apple, Amazon Cognito. All expose compatible OIDC endpoints.

**Key insight:** Use a battle-tested OIDC library (Auth.js, Passport-oidc, python-social-auth, Spring Security OAuth) — never manually parse and validate JWTs for authentication. JWT validation has subtle edge cases (algorithm confusion, signature bypass) that have broken many custom implementations.`,
    },
    {
      id: 1063,
      name: "SAML 2.0",
      desc: `**SAML 2.0 (Security Assertion Markup Language)** — an XML-based open standard for exchanging authentication and authorization data between an Identity Provider (IdP) and a Service Provider (SP). The dominant protocol for enterprise Single Sign-On (SSO) before OIDC emerged; still ubiquitous in large organizations using Active Directory Federation Services (ADFS), Okta, or Azure AD.

**SAML flow (SP-initiated):**
1. User accesses a service (SP) without a session
2. SP generates a SAML AuthnRequest and redirects to the IdP with the request (HTTP Redirect or POST binding)
3. User authenticates with the IdP (or is already authenticated via SSO)
4. IdP generates a SAML Assertion (XML document signed with its private key) and posts it to the SP's Assertion Consumer Service (ACS) URL
5. SP validates the assertion's signature, expiration, and audience; establishes a session

**SAML Assertion:** XML containing: Subject (user identity), Conditions (validity window, audience), AuthnStatement (how and when the user authenticated), AttributeStatement (user attributes: email, groups, roles).

**SAML vs OIDC:** SAML is XML-based, complex, and designed for enterprise SSO. OIDC is JSON/JWT-based, simpler, and designed for web/mobile applications. OIDC is preferred for new integrations; SAML is still required for legacy enterprise software and Salesforce/Workday/legacy SaaS tools.

**Common vulnerabilities:** XML Signature Wrapping (XSW) attacks — injecting additional XML nodes to bypass signature validation; lack of replay protection (missing InResponseTo validation); accepting unsigned assertions.

**Key insight:** SAML's complexity has been the source of several critical SSO bypass vulnerabilities. If implementing SAML, use a well-maintained library (OneLogin SAML toolkit, python3-saml) and never write your own SAML parsing logic.`,
    },
    {
      id: 1064,
      name: "JSON Web Tokens (JWT)",
      desc: `**JWT (JSON Web Token)** — a compact, URL-safe token format for transmitting claims between parties as a JSON object, signed (and optionally encrypted) so the receiver can verify authenticity. Widely used for API authentication, session tokens, and OIDC ID Tokens.

**Structure:** "header.payload.signature" — each part is base64url-encoded. Header: "{"alg":"RS256","typ":"JWT"}". Payload: "{"sub":"user123","exp":1700000000,"email":"user@example.com"}". Signature: algorithm applied to header + "." + payload using the key.

**Signed (JWS) vs Encrypted (JWE):** a standard JWT is signed only — the payload is readable by anyone (base64url is not encryption!). JWE encrypts the payload. Never put sensitive data (SSN, password, internal system info) in a JWT without encryption.

**JWT security pitfalls:**
- **"alg: none" attack:** some libraries accept tokens with "alg: none" and no signature. Always explicitly specify accepted algorithms in your library configuration.
- **RS256 to HS256 confusion:** if the server uses RS256, a library might accept an HS256 token signed with the public key — which attackers can compute since the public key is public. Explicitly validate the algorithm.
- **No expiration:** a JWT without "exp" is valid forever. Always set short expiration (15 minutes for access tokens).
- **JWT revocation:** stateless JWTs cannot be invalidated before expiration. Workarounds: short expiration + refresh tokens; maintain a server-side blocklist (adds statefulness); use opaque tokens instead.

**Key insight:** JWTs are not sessions. A traditional session ID is a random token with server-side state (the server looks up the session). A JWT carries its own state — the server doesn't need to look anything up, but also can't invalidate it. Choose based on your revocation requirements.`,
    },
    {
      id: 1065,
      name: "Multi-Factor Authentication (MFA)",
      desc: `**Multi-Factor Authentication (MFA)** — requiring two or more independent verification factors to authenticate, dramatically reducing the risk from stolen credentials. Even a compromised password is useless without the second factor.

**MFA methods (from strongest to weakest):**
1. **Hardware security keys (FIDO2/WebAuthn):** YubiKey, Google Titan Key — phishing-proof, as the key is bound to the specific origin; the strongest available MFA
2. **TOTP apps (Authenticator apps):** Google Authenticator, Authy, 1Password — generate 6-digit codes that change every 30 seconds; phishable (a fake login page can relay the code in real time)
3. **Push notifications:** Duo Security, Microsoft Authenticator — approve/deny on your phone; also phishable via MFA fatigue attacks (bombarding with push requests until the user approves)
4. **SMS one-time passwords:** most vulnerable — SIM swapping attacks allow an attacker to intercept SMS; still far better than no MFA but not acceptable for high-value accounts
5. **Security questions:** not a true second factor (something you know, not something you have); easily researched or guessed

**Passkeys (FIDO2/WebAuthn):** a newer standard where the private key is stored on the device (secure enclave, hardware key); authentication requires device possession + biometric or PIN. Phishing-proof because the cryptographic challenge is origin-bound. Apple, Google, and Microsoft are all pushing passkeys.

**MFA fatigue attacks:** attackers bombard users with MFA push notifications until they approve one out of fatigue or confusion (Uber breach, 2022). Mitigate with number matching (show a code in the notification that matches one on screen).

**Key insight:** Mandating TOTP or hardware MFA for all admin and privileged accounts is the single highest-impact security control for most organizations. Phishing-resistant MFA (FIDO2) is required for high-value targets.`,
    },
    {
      id: 1066,
      name: "Role-Based Access Control (RBAC)",
      desc: `**RBAC (Role-Based Access Control)** — an authorization model where permissions are assigned to roles, and users are assigned to roles. Users gain permissions through their role memberships rather than direct permission assignments. Simplifies administration: adding a new "editor" user means assigning them the "Editor" role, not enumerating every individual permission.

**Components:** Users → Roles → Permissions → Resources/Operations. A "Manager" role might include "view_reports", "approve_requests", and "manage_team" permissions.

**RBAC vs ACL:** ACL (Access Control List) assigns permissions directly to users per resource — flexible but scales poorly (thousands of users × thousands of resources = unmanageable). RBAC centralizes permission logic in roles — easier to audit, change, and onboard new users.

**Hierarchical RBAC (RBAC1):** roles can inherit from parent roles. "Senior Editor" inherits all "Editor" permissions plus additional ones. Reduces duplication.

**Implementation in practice:**
- Store role assignments in the database; check on every request server-side
- "hasPermission(user, action, resource)" as a centralized function — never scattered if-statements
- Deny by default: if a permission isn't explicitly granted, it's denied
- Separation of duties: critical operations require two roles (maker-checker pattern)

**RBAC pitfalls:** role explosion (too many fine-grained roles, each with slightly different permissions — hard to audit); roles that don't map to actual job functions; skipping regular access reviews (employees accumulate roles as they change jobs, never losing old ones — "permission creep").

**Key insight:** Conduct quarterly access reviews — users accumulate permissions over time as they change roles and projects. Every permission a user doesn't need is an attack surface that shouldn't exist.`,
    },
    {
      id: 1067,
      name: "Attribute-Based Access Control (ABAC)",
      desc: `**ABAC (Attribute-Based Access Control)** — an authorization model where access decisions are based on attributes of the user, resource, action, and environment, combined into policies. More expressive and flexible than RBAC — can express complex conditions like "a doctor can access patient records if they're the assigned physician, during business hours, from a hospital network."

**Attributes:**
- **Subject attributes:** user.role, user.department, user.clearanceLevel, user.location
- **Resource attributes:** resource.classification, resource.owner, resource.department, resource.sensitivity
- **Action attributes:** action.type (read/write/delete)
- **Environment attributes:** time.hour, request.ipAddress, request.device

**Policy example (XACML-style):** "Permit if subject.role == 'Manager' AND resource.department == subject.department AND action == 'approve' AND environment.time >= 09:00 AND environment.time <= 17:00"

**OPA (Open Policy Agent):** a general-purpose policy engine using the Rego language; ABAC in Kubernetes RBAC extensions, API gateway authorization, and cloud infrastructure access. Cloud-native ABAC.

**ReBAC (Relationship-Based Access Control):** a variant where access depends on the relationship between subject and resource — "user can edit this document if they're the owner or have been explicitly granted editor access." Google Zanzibar (the authorization system behind Google Drive, YouTube, and Maps) is the canonical ReBAC system; open-source implementations include SpiceDB and OpenFGA.

**Key insight:** RBAC is sufficient for most applications. Reach for ABAC/ReBAC when you need fine-grained, context-sensitive access control that can't be expressed with roles — typically for multi-tenant SaaS, compliance-heavy industries (healthcare, finance), or large-scale platforms with complex sharing semantics.`,
    },
    {
      id: 1068,
      name: "Zero Trust Architecture",
      desc: `**Zero Trust** — a security model based on the principle "never trust, always verify." Abandons the traditional perimeter model (trust everything inside the corporate network) in favor of treating every request — regardless of origin — as untrusted until explicitly verified.

**Core principles:**
1. **Verify explicitly:** authenticate and authorize every request using all available data (identity, location, device health, service, workload, data classification)
2. **Use least-privilege access:** limit access to only what's needed, just-in-time, just-enough-access
3. **Assume breach:** design as if the network is already compromised; minimize blast radius with micro-segmentation; encrypt everything; use analytics to detect anomalies

**Why Zero Trust:** the perimeter model assumes that internal traffic is safe — but attackers who compromise a single internal machine can move laterally. 74% of breaches involve a compromised internal credential. Remote work and cloud adoption mean "inside the network" no longer maps to "trusted."

**Zero Trust components:** identity provider with MFA, device management/compliance (MDM), micro-segmentation (network isolation between services), continuous risk scoring, just-in-time (JIT) access, privileged access workstations.

**BeyondCorp (Google's implementation):** Google moved all internal applications behind the corporate VPN to being accessible from the internet via identity-aware proxies, with per-request authentication and device trust. Published externally; inspired the NIST Zero Trust Architecture (SP 800-207).

**Tools:** Cloudflare Access, Google BeyondCorp Enterprise, Palo Alto Prisma Access, Zscaler Private Access — all implement Zero Trust Network Access (ZTNA) as a VPN replacement.

**Key insight:** Zero Trust is a philosophy, not a product. Start with strong identity (MFA everywhere), move to least-privilege network segmentation, then add continuous monitoring. The journey takes years; begin with identity as the control plane.`,
    },
    {
      id: 1069,
      name: "Single Sign-On (SSO)",
      desc: `**SSO (Single Sign-On)** — a session authentication scheme allowing a user to log in once with a single set of credentials and gain access to multiple applications without re-authenticating for each. The identity provider (IdP) acts as the central authentication hub; each application (service provider) delegates authentication to the IdP.

**SSO protocols:** SAML 2.0 (enterprise), OIDC/OAuth 2.0 (web/mobile), Kerberos (internal Windows networks), WS-Federation (Microsoft).

**Enterprise SSO components:**
- **Identity Provider (IdP):** Okta, Azure AD, Google Workspace, Ping Identity — the authoritative source of user identity
- **Service Providers (SP):** Salesforce, Slack, GitHub, AWS — delegate authentication to the IdP
- **Directory:** LDAP or Active Directory stores user accounts; IdP syncs from directory via SCIM or AD Sync

**SSO session management:** the IdP establishes an SSO session (typically 8-12 hours). When a user accesses an SP, the SP redirects to IdP; IdP sees existing SSO session and issues a token without re-challenging the user. Logout must be global (Single Log-Out / SLO) — terminating the IdP session; per-SP logout leaves other sessions active.

**Benefits:** reduced password fatigue (users only manage one password), centralized access revocation (disabling the user in the IdP instantly revokes access to all connected apps), unified audit logs, easier MFA enforcement across all apps.

**SSO and security:** SSO centralizes the attack surface — compromise the IdP account and you compromise all connected applications. This is why phishing-resistant MFA (FIDO2) is critical for IdP accounts, and why IdP accounts should use strong, unique credentials.

**Key insight:** SSO is essential for enterprise security hygiene — it enables centralized MFA enforcement and instant access revocation. Without SSO, when an employee leaves, you must manually remove them from dozens of SaaS apps — and inevitably miss some.`,
    },
    {
      id: 1070,
      name: "Privileged Access Management (PAM)",
      desc: `**Privileged Access Management (PAM)** — a security discipline focused on controlling, monitoring, and auditing the access of privileged accounts (administrators, root users, service accounts, database admins) that have elevated permissions to sensitive systems.

**Why PAM:** privileged accounts are the highest-value target for attackers — a compromised domain admin account gives access to everything in an Active Directory forest. Attackers frequently target privileged credentials via spear phishing, credential dumping, or lateral movement.

**PAM capabilities:**
- **Vault / credential management:** privileged account passwords stored in an encrypted vault; users check out credentials and they're rotated automatically after use. Nobody knows the permanent password.
- **Just-in-time (JIT) access:** grant elevated access only when needed, for a limited time window ("I need admin access to this server for the next 2 hours to do a deployment")
- **Session recording:** record and audit all privileged sessions — screen video, keystrokes, commands. Forensic capability and deterrence.
- **Break-glass accounts:** emergency access accounts with sealed credentials and automatic alerting on use

**PAM tools:** CyberArk (enterprise leader), HashiCorp Vault (developer-centric, excellent for application secrets), Delinea Secret Server, BeyondTrust, AWS IAM with role assumption + CloudTrail, GCP Privileged Access Manager.

**Service account sprawl:** applications and scripts that use service account credentials (passwords or API keys) with excessive, never-rotated privileges. Mitigate with short-lived dynamic secrets (Vault), IAM roles for EC2/GCE (no static credentials), and OIDC workload identity federation.

**Key insight:** Attackers don't hack; they log in — with privileged credentials. PAM limits the blast radius of credential compromise by enforcing least-privilege, time-limited access and creating an audit trail that enables forensic investigation.`,
    },
    {
      id: 1071,
      name: "LDAP & Active Directory",
      desc: `**LDAP (Lightweight Directory Access Protocol)** — a protocol for accessing and managing distributed directory information services. The standard protocol for querying Active Directory (AD) and other LDAP-compatible directories (OpenLDAP, FreeIPA).

**Active Directory (AD):** Microsoft's directory service that manages users, groups, computers, and policies in a Windows domain. The central authentication and authorization infrastructure for most enterprise environments. Domains, forests, and trusts organize resources; Group Policy Objects (GPOs) enforce security configurations.

**LDAP concepts:**
- **DN (Distinguished Name):** unique identifier for an entry — "CN=John Smith,OU=Engineering,DC=company,DC=com"
- **OU (Organizational Unit):** container for grouping objects; GPOs are applied at the OU level
- **Attributes:** cn (common name), sAMAccountName (login name), memberOf (group memberships), mail (email)
- **Bind:** authenticate to LDAP; anonymous bind is often disabled in production

**AD authentication protocols:** Kerberos (primary — tickets, no password transmitted); NTLM (legacy, hash-based — still used for legacy compatibility but vulnerable to pass-the-hash attacks).

**Security concerns:**
- **LDAP injection:** user input in LDAP filters without escaping — bypasses authentication or extracts directory data
- **Pass-the-hash:** capture NTLM hash from network, reuse it without knowing the password
- **Kerberoasting:** request service tickets for service accounts; crack them offline (service accounts often have weak passwords and long-term keys)
- **BloodHound:** free tool that maps AD relationships to find privilege escalation paths; widely used by both defenders and attackers

**Key insight:** Active Directory is the most common lateral movement target in enterprise breaches. Hardening AD — disabling legacy protocols (NTLM, NTLMv1), enforcing LDAP signing, protecting privileged accounts — is the highest-impact enterprise security work.`,
    },
  ],
};

export default identityAccess;
