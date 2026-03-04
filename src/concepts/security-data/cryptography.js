const cryptography = {
  name: "Cryptography",
  icon: "🔐",
  color: "#6366f1",
  concepts: [
    {
      id: 1048,
      name: "Symmetric Encryption",
      desc: `**Symmetric encryption** — a cryptographic scheme where the same key is used for both encryption and decryption. Fast, efficient, and suitable for bulk data encryption — but requires a secure channel to exchange the shared key.

**AES (Advanced Encryption Standard)** is the gold standard: 128, 192, or 256-bit keys; used in TLS, disk encryption (FileVault, BitLocker), database encryption, and virtually everything that needs fast bulk encryption.

**Modes of operation matter enormously:**
- **ECB (Electronic Codebook):** encrypts each block independently — the same plaintext block always produces the same ciphertext block, leaking patterns (the famous encrypted Linux penguin image). Never use ECB.
- **CBC (Cipher Block Chaining):** XORs each block with the previous ciphertext block before encrypting. Better than ECB but requires an Initialization Vector (IV) and is vulnerable to padding oracle attacks (POODLE, BEAST) without authentication.
- **GCM (Galois/Counter Mode):** authenticated encryption — provides both confidentiality AND integrity in one operation. The standard for modern systems.

**Stream ciphers (ChaCha20):** XOR plaintext with a keystream; no block size constraints; ChaCha20-Poly1305 is TLS 1.3's preferred cipher for mobile (faster than AES on devices without hardware AES acceleration).

**Key insight:** Always use authenticated encryption (AES-GCM or ChaCha20-Poly1305). Encryption without authentication allows attackers to tamper with ciphertext and potentially mount decryption oracle attacks — as demonstrated by the POODLE, Lucky Thirteen, and CBC padding attacks.`,
    },
    {
      id: 1049,
      name: "Asymmetric (Public-Key) Encryption",
      desc: `**Asymmetric encryption** — a cryptographic scheme using mathematically related key pairs: a public key (shared openly) and a private key (kept secret). Data encrypted with the public key can only be decrypted with the private key; digital signatures created with the private key can be verified with the public key.

**RSA:** the original public-key cryptosystem. Security relies on the difficulty of factoring large integers. RSA-2048 is the current minimum for signatures; RSA-4096 for long-term security. Slow — 1000x slower than AES — so it's used only to encrypt small payloads or symmetric keys.

**Elliptic Curve Cryptography (ECC):** provides equivalent security to RSA with much smaller keys. ECDSA P-256 is comparable to RSA-3072 but far faster and produces smaller signatures. Used in TLS 1.3, code signing, SSH keys ("ssh-keygen -t ed25519").

**Ed25519:** a specific EdDSA (Edwards-curve Digital Signature Algorithm) that's fast, deterministic (no random nonce needed), and resistant to implementation bugs. The preferred modern signature algorithm.

**Diffie-Hellman Key Exchange:** allows two parties to establish a shared secret over an insecure channel without transmitting the secret. Neither party reveals their private value; both compute the same shared secret from the exchange. Foundation of TLS handshake key establishment.

**Key insight:** Asymmetric cryptography doesn't replace symmetric cryptography — it solves the key distribution problem. TLS uses asymmetric crypto to securely exchange a symmetric session key, then uses AES for the bulk data transfer.`,
    },
    {
      id: 1050,
      name: "Cryptographic Hash Functions",
      desc: `**Cryptographic hash function** — a deterministic one-way function that maps arbitrary-length input to a fixed-length digest, with three critical properties: pre-image resistance (can't reverse the hash), second pre-image resistance (can't find a different input with the same hash), and collision resistance (can't find any two inputs with the same hash).

**SHA-2 family (SHA-256, SHA-512):** the current standard for general-purpose hashing — data integrity verification, digital signatures, certificate fingerprints. SHA-256 produces a 256-bit digest; extremely fast for single-pass hashing.

**SHA-3:** based on a completely different construction (Keccak sponge function, not Merkle-Damgard like SHA-2). Resistant to length-extension attacks that affect SHA-2. NIST standard but less widely adopted than SHA-2.

**MD5 and SHA-1 are BROKEN** for security purposes: MD5 collision attacks take seconds on a laptop; SHA-1 was broken in 2017 ("SHAttered" attack). Still used for non-security checksums (detecting file corruption, not tampering) but NEVER for security.

**Password hashing requires adaptive KDFs (Key Derivation Functions):**
- **bcrypt:** designed for password hashing; has a cost factor; widely supported; limited to 72-byte passwords
- **Argon2:** winner of the Password Hashing Competition 2015; memory-hard (prevents GPU/ASIC attacks); recommended by OWASP. Three variants: Argon2i (side-channel resistant), Argon2d (maximum GPU resistance), Argon2id (hybrid, preferred)
- **scrypt:** memory-hard, predates Argon2; still considered secure

**Key insight:** SHA-256 is the wrong tool for passwords — it's designed to be fast (billions of attempts per second on a GPU). bcrypt and Argon2 are designed to be slow and memory-intensive, making brute-force attacks economically infeasible.`,
    },
    {
      id: 1051,
      name: "Digital Signatures",
      desc: `**Digital signature** — a cryptographic mechanism that provides authentication (proves who signed), integrity (proves the data wasn't modified), and non-repudiation (the signer can't deny having signed). Created by hashing the data and encrypting the hash with the private key; verified by decrypting with the public key and comparing hashes.

**Signature workflow:**
1. Alice hashes the document: "H = SHA-256(document)"
2. Alice signs: "sig = RSA-encrypt(H, Alice_private_key)"
3. Alice sends document + sig to Bob
4. Bob verifies: "H' = SHA-256(document)"; "H = RSA-decrypt(sig, Alice_public_key)"; if H == H', the signature is valid

**Common signature algorithms:**
- **RSA-PSS:** modern RSA signature with probabilistic padding (more secure than PKCS#1 v1.5)
- **ECDSA:** faster, smaller signatures than RSA; used in TLS, JWT (ES256), Bitcoin
- **Ed25519:** fastest, most secure, deterministic — the recommended modern choice for new systems
- **HMAC:** keyed hash (not asymmetric) — provides authentication and integrity but not non-repudiation (both parties share the key)

**Real-world uses:** TLS certificates, code signing (Windows Authenticode, Apple notarization, apt/yum package signing), JWT (JSON Web Tokens), SSH host key verification, PGP email/file signing, Git commit signing.

**Key insight:** Digital signatures solve the authenticity problem that symmetric MACs can't — with a MAC, both parties share the key, so either could have created the message. With a digital signature, only the holder of the private key could have signed.`,
    },
    {
      id: 1052,
      name: "Public Key Infrastructure (PKI)",
      desc: `**Public Key Infrastructure (PKI)** — a framework of policies, procedures, hardware, software, and entities used to create, manage, distribute, use, store, and revoke digital certificates. PKI is the trust layer that makes TLS/HTTPS work — it solves the problem of how you know that a public key actually belongs to the entity claiming it.

**X.509 certificates:** the standard format for digital certificates. Contains: subject name (domain or identity), public key, validity period, issuer (Certificate Authority), and the CA's digital signature binding all this together.

**Certificate chain of trust:**
- **Root CA:** a self-signed certificate; trusted by operating systems and browsers by default (the "trust anchor"). About 150 root CAs are trusted by Chrome/Firefox.
- **Intermediate CA:** signed by the root; signs end-entity certificates. Roots are kept offline (air-gapped); intermediates do the actual signing.
- **End-entity (leaf) certificate:** your server's certificate, signed by an intermediate CA.

**Certificate validation:** HTTPS clients verify: the certificate's digital signature is valid, the domain matches the "Common Name" or "Subject Alternative Names", the certificate is not expired, and the certificate is not revoked (via CRL or OCSP).

**Certificate Transparency (CT):** all publicly-trusted TLS certificates must be logged to public, append-only CT logs. Enables detection of misissued or malicious certificates within hours.

**Key insight:** PKI's security depends on CA trustworthiness. Major incidents (DigiNotar, Symantec) show that a compromised or misbehaving CA can issue fraudulent certificates for any domain — which is why Certificate Transparency logging was introduced.`,
    },
    {
      id: 1053,
      name: "TLS/SSL Protocol",
      desc: `**TLS (Transport Layer Security)** — the cryptographic protocol that secures the vast majority of internet communications. Provides: confidentiality (encryption), integrity (authenticated encryption prevents tampering), and authentication (certificates verify server identity). The successor to SSL (which is deprecated and broken).

**TLS 1.3 handshake (simplified):**
1. Client sends "ClientHello" with supported cipher suites and a key share (ECDH public key)
2. Server responds with "ServerHello", its certificate, and its own key share
3. Both derive the session key from the ECDH exchange — no key transmitted over the wire
4. Handshake completes in 1 round trip (vs 2 for TLS 1.2); resumption with 0-RTT is possible

**Cipher suite (TLS 1.3):** fixed to strong choices only: TLS_AES_128_GCM_SHA256, TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256. The long negotiable list of TLS 1.2 cipher suites (which included weak options) is gone.

**Perfect Forward Secrecy (PFS):** TLS 1.3 mandates ephemeral ECDH key exchange — a fresh key pair generated per session. Even if the server's private key is compromised later, past sessions cannot be decrypted.

**Common misconfigurations:** supporting TLS 1.0/1.1 (vulnerable to POODLE, BEAST); weak cipher suites (RC4, 3DES); missing HSTS header; certificate not covering all subdomains; expired certificates.

**Key insight:** TLS 1.3 is simpler, faster (1-RTT), and more secure than TLS 1.2 — yet many services still negotiate TLS 1.2 for legacy compatibility. Disable TLS 1.0/1.1 and weak ciphers; test with "testssl.sh" or SSL Labs.`,
    },
    {
      id: 1054,
      name: "Key Management & HSMs",
      desc: `**Key management** — the entire lifecycle of cryptographic keys: generation, distribution, storage, rotation, revocation, and destruction. The weakest link in any encryption system is almost never the algorithm — it's the key management.

**The fundamental rule:** encryption keys must never be stored adjacent to the data they encrypt. If an attacker compromises the database (or the application server's filesystem), they should not find the keys that decrypt the data on the same system.

**Cloud Key Management Services:**
- **AWS KMS / Google Cloud KMS / Azure Key Vault:** managed key storage with hardware-backed HSMs; key material never leaves the KMS; usage audited via CloudTrail; IAM policies control who can use which keys
- **Envelope encryption:** generate a Data Encryption Key (DEK) per record; encrypt DEK with a Key Encryption Key (KEK) stored in KMS; store the encrypted DEK alongside the data. To revoke: rotate/delete the KEK

**Hardware Security Modules (HSMs):** tamper-resistant hardware devices that generate, store, and perform cryptographic operations on keys that never leave the device in plaintext. Used for root CA keys, payment systems (PCI HSM requirement), code signing.

**Key rotation:** regularly replacing keys limits the blast radius of a key compromise. Automated rotation (AWS KMS can auto-rotate every year); application must support decrypting with the old key until all data is re-encrypted.

**Key insight:** The most common key management failure is storing secrets in environment variables that end up in logs, crash dumps, or environment variable dumps — or hardcoding them in source code. Use a secrets manager (Vault, AWS Secrets Manager) and audit access logs.`,
    },
    {
      id: 1055,
      name: "Perfect Forward Secrecy (PFS)",
      desc: `**Perfect Forward Secrecy (PFS)** — a property of key exchange protocols where compromise of the server's long-term private key does not compromise past session keys. Each session generates an independent ephemeral key pair; past sessions remain secure even if future keys are compromised.

**Why it matters:** without PFS, an adversary can record all TLS traffic today and decrypt it later once they obtain the server's private key (via court order, hack, or vulnerability). With PFS, each session key is independently derived and never transmitted — recording traffic today is useless even with tomorrow's key.

**How PFS is achieved:** Ephemeral Diffie-Hellman (DHE or ECDHE) key exchange. Both client and server generate a fresh DH key pair for each session. The session key is derived from the DH exchange; the ephemeral keys are discarded after the session. The server's long-term key is only used for authentication (signing the handshake), not for key derivation.

**TLS 1.3 mandates PFS:** all TLS 1.3 cipher suites use ephemeral ECDHE. TLS 1.2 included RSA key exchange (no PFS) — a configuration that must be explicitly disabled.

**0-RTT and PFS trade-off:** TLS 1.3's 0-RTT resumption replays data from the first flight, which is not forward-secret — a compromise of the session ticket key could decrypt 0-RTT data. For sensitive APIs, disable 0-RTT.

**Key insight:** PFS transforms cryptography from "secure unless the key is ever compromised" to "secure even if the key is eventually compromised." This is especially important for long-lived sensitive data — medical records, financial transactions, classified communications.`,
    },
    {
      id: 1056,
      name: "End-to-End Encryption (E2EE)",
      desc: `**End-to-End Encryption (E2EE)** — an encryption scheme where only the communicating parties (endpoints) can read the messages; the service provider handling the transmission sees only ciphertext and cannot decrypt the content, even if legally compelled.

**Signal Protocol:** the gold standard for E2EE messaging. Used by Signal, WhatsApp, and Facebook Messenger's Secret Conversations. Combines: X3DH (Extended Triple Diffie-Hellman) for initial key agreement; Double Ratchet Algorithm for forward secrecy and break-in recovery (each message uses a new key derived from the ratchet — even if one message key is compromised, past and future messages are protected).

**E2EE vs transport encryption (TLS):** HTTPS encrypts data between your browser and the server. The server decrypts it, processes it (potentially reading your content), then re-encrypts for the next hop. E2EE means the server never has the decryption key.

**E2EE for files:** age, GPG (GNU Privacy Guard), and Keybase provide file encryption where only the recipient can decrypt. Cloud storage E2EE (Proton Drive, Tresorit) means the provider cannot read your files.

**E2EE challenges:** key verification (how do you know you have the right person's public key?); key backup (if you lose your device, you may lose access to encrypted messages); metadata still visible (who talks to whom, when, how often — even if content is encrypted).

**Key insight:** E2EE is a trust model shift: instead of trusting the service provider not to read your data, you cryptographically prevent them from doing so. The trade-off is that providers also cannot recover lost data or moderate content.`,
    },
    {
      id: 1057,
      name: "Zero-Knowledge Proofs (ZKPs)",
      desc: `**Zero-Knowledge Proof (ZKP)** — a cryptographic protocol where a prover can convince a verifier that a statement is true without revealing any information beyond the truth of the statement itself. Classic example: proving you know a password without transmitting the password.

**Properties:** completeness (an honest prover can always prove a true statement), soundness (a dishonest prover cannot prove a false statement), and zero-knowledge (the verifier learns nothing beyond the statement's truth).

**Types:**
- **Interactive ZKPs:** require back-and-forth communication between prover and verifier (original academic ZKPs)
- **Non-interactive ZKPs (NIZKs):** proofs that work without interaction; most practical — the prover sends a single proof
- **zk-SNARKs (Succinct Non-interactive ARguments of Knowledge):** proofs that are tiny and fast to verify; used in Zcash (private blockchain transactions), zkRollups (Ethereum scaling); require a trusted setup ceremony
- **zk-STARKs:** no trusted setup; quantum-resistant; proofs are larger than SNARKs but more transparent

**Real-world applications:**
- **Blockchain privacy:** Zcash uses ZKPs to hide transaction amounts and addresses while still proving validity
- **Age/credential verification:** prove you're over 18 without revealing your birthdate
- **Password authentication without transmission:** SRP (Secure Remote Password) protocol
- **Private set intersection:** compute the intersection of two sets without revealing the sets themselves (contact tracing privacy)

**Key insight:** ZKPs are moving from theoretical cryptography to practical systems — zkRollups are scaling Ethereum by doing computation off-chain and posting only a ZK proof on-chain. The proof is small and fast to verify, even though the underlying computation was massive.`,
    },
    {
      id: 1058,
      name: "Cryptographic Randomness & Entropy",
      desc: `**Cryptographic randomness** — unpredictable random numbers that cannot be predicted by an adversary even with knowledge of previous outputs. A critical and often underestimated foundation: weak randomness has broken real-world cryptographic systems more often than algorithmic weaknesses.

**CSPRNG (Cryptographically Secure Pseudo-Random Number Generator):** a deterministic algorithm that produces outputs indistinguishable from truly random bytes, given a secret seed. Examples: OS-provided "/dev/urandom" (Linux), "CryptGenRandom" (Windows), "SecureRandom" (Java). Always use the OS CSPRNG or a library that wraps it.

**NEVER use "Math.random()" for security:** JavaScript's Math.random() is a fast PRNG designed for games and simulations, not cryptography. Its output can be predicted from a few observations. For tokens, IDs, and keys, use "crypto.getRandomValues()" in browsers or "crypto.randomBytes()" in Node.js.

**Entropy sources:** the OS collects entropy from hardware events (keyboard timing, disk I/O, network packets, CPU jitter). Early in boot, entropy pools are shallow — a cloud VM that starts from a fixed image has low entropy. Solutions: dedicated hardware RNG (Intel RDRAND instruction), cloud entropy services, seeding the PRNG from multiple sources.

**Real catastrophes from weak randomness:**
- **Debian OpenSSL bug (2008):** a code change accidentally removed 99.99% of entropy sources; all generated SSH and TLS keys were predictable from a pool of ~32,000 keys
- **Android Bitcoin wallet vulnerability (2013):** Java's "SecureRandom" on older Android used a weak seed; private keys were recoverable

**Key insight:** Cryptographic key and token generation must use the OS CSPRNG. The API in your language is "os.urandom(32)" (Python), "crypto.randomBytes(32)" (Node.js), or "SecureRandom" (Java) — anything else is probably wrong for security use.`,
    },
    {
      id: 1059,
      name: "Post-Quantum Cryptography",
      desc: `**Post-quantum cryptography (PQC)** — cryptographic algorithms designed to resist attacks from quantum computers, which could break widely-used public-key cryptosystems (RSA, ECC, Diffie-Hellman) using Shor's algorithm.

**The quantum threat:** a sufficiently powerful quantum computer running Shor's algorithm can factor large integers and compute discrete logarithms in polynomial time — breaking RSA and ECC. Symmetric cryptography (AES) and hash functions are much less affected: Grover's algorithm provides a quadratic speedup, effectively halving key length — AES-256 becomes equivalent to AES-128 security, which is still considered secure.

**"Harvest now, decrypt later" threat:** state actors are collecting encrypted traffic today with the intent to decrypt it once quantum computers are available. This makes PQC urgent for long-lived secrets even before quantum computers arrive.

**NIST PQC Standardization (2024):** NIST selected the first post-quantum standards:
- **ML-KEM (CRYSTALS-Kyber):** key encapsulation mechanism replacing RSA/ECC for key exchange; lattice-based
- **ML-DSA (CRYSTALS-Dilithium):** digital signature algorithm; lattice-based
- **SLH-DSA (SPHINCS+):** hash-based signature; conservative choice; larger signatures but well-understood security
- **FN-DSA (FALCON):** lattice-based signature; compact signatures; complex implementation

**Migration:** major cloud providers, browsers, and VPN vendors are beginning hybrid deployments (classical + PQC simultaneously). TLS 1.3 with X25519Kyber768 hybrid key exchange is already supported by Chrome and Cloudflare.

**Key insight:** PQC migration is a decade-long infrastructure project, not a version update. Start by auditing which systems use asymmetric cryptography, prioritize long-lived secrets, and follow NIST's migration guidance — the timeline is uncertain but the direction is clear.`,
    },
  ],
};

export default cryptography;
