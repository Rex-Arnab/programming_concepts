const hashTables = {
  name: "Hash Tables & Maps",
  icon: "#️⃣",
  color: "#ec4899",
  concepts: [
    {
      id: 1467,
      name: "Hash Table Fundamentals",
      desc: `**Hash Table** — a data structure that maps keys to values using a hash function, providing O(1) average-case insert, delete, and lookup. The most important data structure in practical programming.

**Core mechanism:**
1. Compute hash(key) → integer
2. Map integer to bucket index: index = hash(key) % capacity
3. Store (key, value) at that bucket
4. On lookup: recompute hash, check bucket

**Hash function properties:**
- **Deterministic:** same input → same hash always
- **Uniform distribution:** keys spread evenly across buckets (minimize collisions)
- **Fast to compute:** O(1) or O(L) for strings of length L

**Load factor:** number of entries / number of buckets. As load factor increases, collision probability rises. Typical rehash threshold: 0.7-0.75 (Java HashMap).

**Rehashing:** when load factor exceeds threshold, allocate a new array (typically 2x size), re-insert all entries. O(n) amortized O(1) per insert.

**Hash table operations (amortized O(1)):**
- insert(key, value): O(1) average, O(n) worst case (all keys collide)
- lookup(key): O(1) average, O(n) worst case
- delete(key): O(1) average

**Key insight:** "O(1) average" hides worst-case O(n) behavior when hash functions produce many collisions. Real-world hash tables use collision-resistant hash functions and dynamic resizing to maintain practically constant performance. Understanding when the worst case occurs (adversarial inputs, pathological keys) is important for security.`,
    },
    {
      id: 1468,
      name: "Collision Resolution",
      desc: `**Collision Resolution** — the strategies for handling when two different keys hash to the same bucket. Two main approaches: chaining (store multiple entries at each bucket) and open addressing (find an alternative bucket).

**Chaining:** each bucket holds a linked list of (key, value) pairs with the same hash. On collision, append to the list. Lookup: hash to bucket, traverse list comparing keys.
- Load factor can exceed 1
- Worst case (all keys same hash): O(n) per operation → linked list
- Java HashMap uses chaining (converts to balanced BST when chain length > 8)

**Open Addressing:** when collision occurs, probe for an alternative empty slot. All data stored in the array itself (no external lists).
- **Linear probing:** check index, index+1, index+2, ... Suffers from "primary clustering" — filled slots cluster together.
- **Quadratic probing:** check index, index+1², index+2², ... Reduces primary clustering but can loop.
- **Double hashing:** second hash function determines probe step size. Best distribution, more computation.
- Load factor must stay < 1 (otherwise no empty slots)

**Deletion in open addressing:** must use "tombstone" markers — simply emptying a slot breaks the probe chain for other keys. Tombstones mark "deleted" slots that are skipped during lookup but available for insertion.

**Key insight:** chaining is more popular in library implementations (Java HashMap, Python dict) because it handles high load factors gracefully. Open addressing is preferred when memory overhead of pointers is unacceptable and load factors are kept below 0.7. Python switched from open addressing to a denser scheme in Python 3.6+.`,
    },
    {
      id: 1469,
      name: "Hash Functions",
      desc: `**Hash Functions** — the engine of a hash table. A good hash function distributes keys uniformly across the hash space, is fast to compute, and is deterministic.

**For integers:** many strategies. Multiplication method: hash(k) = floor(capacity × (k × A mod 1)) where A ≈ 0.618 (golden ratio conjugate). Division method: hash(k) = k mod m (choose m as prime, not a power of 2 to avoid bit-pattern artifacts).

**For strings (polynomial rolling hash):**
"hash = 0
for char in s:
    hash = (hash * 31 + ord(char)) % MOD"
Constant 31 (odd prime) reduces collisions. MOD is typically a large prime like 10⁹+7.

**Cryptographic vs non-cryptographic:**
- Non-crypto (fast): MurmurHash, FNV, xxHash — for hash tables where adversarial input isn't a concern
- Crypto (slow): SHA-256, MD5 — collision-resistant against adversaries. Used in blockchain, TLS, digital signatures.
- Python uses SipHash for dictionary keys (since 3.4) to prevent hash flooding DoS attacks

**Hash flooding attacks:** an adversary provides inputs that all hash to the same bucket, degrading O(1) to O(n). Mitigated by randomized hash seeds (salting). Python adds random hash salt per process.

**Perfect hashing:** when all keys are known in advance, a perfect hash function maps keys to unique indices (no collisions). O(1) guaranteed. Used for static lookup tables (keywords in compilers, DNS records).

**Key insight:** most performance bugs in hash tables stem from using a poor hash function that produces many collisions for the actual input distribution. "User email addresses" have very different distribution than "integers from 0 to n" — choosing or tuning hash functions for your data matters.`,
    },
    {
      id: 1470,
      name: "Python dict & Java HashMap Internals",
      desc: `**Language-Level Hash Maps** — the hash map implementations built into Python (dict) and Java (HashMap). Understanding their internals helps you write faster code and reason about performance.

**Python dict (CPython 3.6+):**
- Uses open addressing with a compact key-index array + separate (hash, key, value) storage
- Keys maintain insertion order (guaranteed since Python 3.7) — an implementation decision elevated to language spec
- Load factor: resize at 2/3 capacity
- Initial capacity: 8 slots. Resizes double: 8 → 16 → 32 → ...
- "dict" is highly optimized in C — ~50ns per lookup in CPython
- Counter, defaultdict, OrderedDict are built on dict

**Java HashMap:**
- Uses chaining with an array of Entry linked lists
- Load factor default: 0.75 — resizes when entries exceed capacity × 0.75
- Initial capacity: 16. Resizes double on threshold breach.
- Hash function: "key.hashCode()" then "spread" function (XORs upper bits into lower bits)
- Since Java 8: chains become red-black trees when length > 8 (treeify threshold), reverting to list when < 6 — prevents O(n) chain pathology while staying simple for short chains

**Python set and Java HashSet:** same mechanism as dict/HashMap but store only keys (no values). Python frozenset is an immutable version for use as a dict key.

**OrderedDict and LinkedHashMap:** maintain insertion order via a doubly linked list alongside the hash table. O(1) operations with order guarantee. Java's LinkedHashMap also supports access-order mode (LRU order) — perfect for LRU cache implementation.

**Key insight:** Python dict insertion-order guarantee is not just a feature — it changes how you think about iteration. And Java's treeification threshold (8) means your hash table is implicitly guarded against chain DoS in JVM applications.`,
    },
    {
      id: 1471,
      name: "Sets & Multisets",
      desc: `**Sets** — a hash table variant storing only keys (no values), providing O(1) membership testing, insert, and delete. The "is this element in the collection?" data structure.

**Key operations (O(1) average):**
- add(x): insert element
- remove(x): delete element
- contains(x) / "in" operator: membership test
- union, intersection, difference: O(n+m) or O(min(n,m))

**Set vs List for membership testing:** "x in list" is O(n) linear scan. "x in set" is O(1) hash lookup. This single difference can turn O(n²) algorithms into O(n) — always convert to set when doing repeated membership tests.

**Multiset (Counter / frequency map):** a hash map from element to count. Python's "collections.Counter" is a multiset. Supports counting, most_common(), set operations (counter subtraction = multiset difference).

**Frozenset:** immutable version of set. Can be used as a dictionary key or added to another set. Useful when you need a set as a hash table key (e.g., grouping by character set: anagram grouping).

**Ordered set (sorted set):** Python's "sortedcontainers.SortedList" provides O(log n) add/remove/lookup with O(n) iteration in sorted order. Java's "TreeSet" is a Red-Black tree set. Use when you need both O(log n) operations and sorted iteration.

**Key insight:** the canonical O(n²) → O(n) optimization: "for each element, check if target - element exists" with a list is O(n²). With a set, it's O(n). The set is built once in O(n), each lookup is O(1). This two-sum pattern generalizes to many array problems.`,
    },
    {
      id: 1472,
      name: "Rolling Hash & Rabin-Karp",
      desc: `**Rolling Hash** — a hash function that can be updated incrementally as a window slides over a string, enabling O(n) string matching (vs O(n·m) naive).

**Polynomial hash:** H(s[i..i+k-1]) = s[i]×p^(k-1) + s[i+1]×p^(k-2) + ... + s[i+k-1]×p^0 (mod M)

**Rolling update:** when window slides by 1, remove the leftmost character and add the rightmost:
"H_new = (H_old - s[i] × p^(k-1)) × p + s[i+k]"
All mod M. O(1) per window slide after O(k) initial computation.

**Rabin-Karp algorithm:** O(n+m) average string matching using rolling hash.
1. Compute hash of pattern (length m): O(m)
2. Compute hash of first window in text: O(m)
3. Slide window: compare hashes O(1). If match, verify by direct string comparison O(m).
4. Hash collisions cause false positives → O(m) verification. With good hash, false positives are rare.

**Applications:**
- Pattern matching: find all occurrences of pattern in text
- Duplicate substring detection: find duplicate substrings of length k — store hashes in a set
- Longest duplicate substring: binary search on length + rolling hash for O(n log n)
- Longest common substring: hash substrings of both strings into a set, find common hashes

**Key insight:** the rolling hash's O(1) update is the key. The naive "hash each window from scratch" would be O(m) per window, giving O(n·m) total — the same as brute force. The rolling update amortizes the hash computation across the entire string.`,
    },
    {
      id: 1473,
      name: "Bloom Filters",
      desc: `**Bloom Filter** — a probabilistic data structure that uses multiple hash functions and a bit array to test set membership in O(1) with zero false negatives and configurable false positive rate. Cannot delete (standard) and never stores actual values.

**How it works:**
- Bit array of m bits, all initialized to 0
- k hash functions that map any element to k positions in the array
- **Add:** set bits at all k positions to 1
- **Query:** check if all k positions are 1. If any is 0 → definitely not present. If all are 1 → probably present (may be false positive).

**False positive rate:** ~(1 - e^(-kn/m))^k where n = elements inserted, m = bits, k = hash functions. Example: 10M elements, 100M bits (100MB), 7 hash functions → ~1% false positive rate.

**Cannot delete:** setting bits to 0 could affect other elements sharing those bits. Counting Bloom filter: store counts instead of bits, allows decrements — supports deletion at 4x memory cost.

**Use cases:**
- **Databases (Cassandra, HBase, PostgreSQL):** "does this key exist in this SSTable?" — skip disk I/O for definite misses
- **Browsers (Google Chrome):** local bloom filter for safe browsing — "is this URL in the phishing list?" — saves a network request for most URLs
- **Distributed systems (Akamai CDN):** filter out one-hit wonders to protect cache from single-request items
- **Bitcoin full node:** quick UTXO existence check

**Key insight:** bloom filters trade accuracy for extraordinary space efficiency. A hash set needs O(n × key_size) bytes. A bloom filter needs only ~1.4 bytes per element for 1% false positive rate. For applications where false negatives are unacceptable but false positives trigger only a slower fallback (like a disk read), bloom filters are the perfect data structure.`,
    },
    {
      id: 1474,
      name: "Hashing for Algorithm Problems",
      desc: `**Hashing Patterns in Competitive Programming** — the repertoire of hash-based techniques that appear repeatedly in interview and competitive programming problems.

**Pattern 1 — Complement lookup (Two Sum family):**
Store seen values or computed values in a hash map. For each element, check if its "complement" (target - x, x XOR target, etc.) exists. O(n) time, O(n) space.

**Pattern 2 — Frequency map + sliding window:**
Count character frequencies in the current window. Slide the window by adding one character and removing one. O(n) substring problems: "minimum window substring," "find all anagrams."

**Pattern 3 — Group by key:**
Map from computed key to list of elements. "Group anagrams": key = sorted string or tuple(Counter). "Group numbers by digit sum": key = sum of digits. O(n × key_computation_cost).

**Pattern 4 — State compression with hash map:**
In DP or BFS on complex state, use a hash map to memoize states. Key = tuple(state variables). Python naturally hashes tuples.

**Pattern 5 — Subarray with sum = k:**
Use prefix sum + hash map counting occurrences of each prefix sum. "Number of subarrays with sum k" = count of prefix sums equal to (current_prefix - k). O(n).

**Pattern 6 — Longest consecutive sequence:**
Store all elements in a set. For each element that starts a sequence (element - 1 not in set), extend the sequence as far as possible. O(n).

**Key insight:** when you see "find any pair/subarray/substring satisfying X," the first question should be "can I store processed elements in a hash map to make each lookup O(1)?" This thought process converts O(n²) or O(n·m) brute force to O(n) in a large fraction of cases.`,
    },
    {
      id: 1475,
      name: "Consistent Hashing",
      desc: `**Consistent Hashing** — a hashing technique where adding or removing nodes (servers, cache hosts) changes only O(1/n) key assignments on average (vs O(k/n) with modular hashing). Essential for distributed caching and databases.

**Problem with naive hash(key) % n:** when a server is added or removed, almost all keys get remapped to different servers — massive cache invalidation, thundering herd.

**Consistent hashing approach:**
- Map both servers and keys to positions on a circular ring (0 to 2³²-1)
- Each key is assigned to the next server clockwise on the ring
- Adding a server: only keys between the new server and its predecessor are remapped
- Removing a server: only keys assigned to that server are remapped (to its successor)

**Virtual nodes:** to ensure even distribution even with few servers, each physical server is represented by multiple virtual nodes on the ring (e.g., 100-200 virtual nodes per server). Balances key distribution without requiring many physical servers.

**Used by:** Amazon DynamoDB, Apache Cassandra, Akamai CDN, Memcached clients (ketama), Discord's session routing.

**Rendezvous hashing (highest random weight):** alternative to ring-based consistent hashing. For each key, compute a hash with each server, assign to the server with the highest hash. Equally minimal remapping. Simpler to implement.

**Key insight:** consistent hashing solves the classic "sticky sessions" and "cache invalidation" problems in distributed systems. Without it, adding a server to a cache cluster would invalidate 50% of the cache (n/(n+1) ≈ 50% remapping). With consistent hashing, only 1/(n+1) ≈ 10% for a 10-server cluster is remapped.`,
    },
    {
      id: 1476,
      name: "Count Min Sketch",
      desc: `**Count-Min Sketch** — a probabilistic data structure for frequency estimation in data streams using multiple hash functions and a 2D array of counters. O(1) update and query with sub-linear space.

**Structure:** 2D array of d rows × w columns. d different hash functions, each mapping to a column in its row.

**Add element x:** for each row i, increment count[i][h_i(x)].

**Query frequency of x:** return min(count[i][h_i(x)]) across all rows. The minimum over all rows filters out the overcount from collisions.

**Error guarantee:** the estimate is always ≥ true count (never underestimates). Error ≤ ε × total_items with probability ≥ 1 - δ, where w = ⌈e/ε⌉ and d = ⌈ln(1/δ)⌉.

**Space:** d × w = O((e/ε) × ln(1/δ)) counters — much less than exact frequency map for large alphabets.

**Applications:**
- **Twitter trending topics:** count-min sketch estimates tweet frequencies for billions of tweets without storing all tweet IDs
- **Network traffic analysis:** estimate packet frequencies per IP without O(n) exact counters
- **Heavy hitter detection:** find elements appearing more than k% of the time
- **Database query optimization:** estimate selectivity of query predicates

**Key insight:** count-min sketch is the frequency-estimation analog of bloom filter. Both trade accuracy for space: bloom filter for membership ("is X in the set?"), count-min for frequency ("how many times did X appear?"). The "take minimum" across hash functions is the key — collisions always cause overcounting, so the minimum is the best estimate.`,
    },
  ],
};

export default hashTables;
