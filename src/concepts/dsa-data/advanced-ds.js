const advancedDs = {
  name: "Advanced Data Structures",
  icon: "🔬",
  color: "#f97316",
  concepts: [
    {
      id: 1525,
      name: "Disjoint Set Union (Advanced)",
      desc: `**Advanced Union-Find** — extended Union-Find (DSU) techniques for problems beyond simple connectivity: weighted DSU, rollback DSU, and offline dynamic connectivity.

**Weighted DSU (edge weighting):** each node maintains a weight relative to its parent. Track "potential" or "rank" differences. Applications: checking if a graph is bipartite (assign +1/-1 weights), food chain problems (assign 0/1/2 mod 3 for prey relationships).
"def find(x):
    if parent[x] != x:
        root = find(parent[x])
        weight[x] += weight[parent[x]]  # accumulate weights on path
        parent[x] = root
    return parent[x]"

**Rollback DSU (union by rank, no path compression):** for offline algorithms that need to undo union operations. Without path compression, union is O(log n) and reversible by saving the state before each union.

**Offline dynamic connectivity:** given a sequence of edge insertions, deletions, and connectivity queries, answer all queries efficiently. Use a segment tree on time intervals: each edge "exists" during [add_time, delete_time), add it to all O(log T) segment tree nodes, DFS the segment tree with rollback DSU.

**Parallel binary search:** binary search on the answer for multiple queries simultaneously. Use DSU to answer connectivity queries at different points in time.

**Applications of advanced DSU:**
- Social network analysis (community detection with rollback for historical queries)
- Circuit verification (weighted DSU for potential differences)
- Game theory (bipartite checking with weighted DSU)

**Key insight:** the trade-off between path compression and rollback is fundamental: path compression makes find O(α(n)) but destroys history; union-by-rank without path compression gives O(log n) find but allows rollback. Choosing correctly depends on whether you need undo.`,
    },
    {
      id: 1526,
      name: "Sparse Table",
      desc: `**Sparse Table** — a data structure for static range minimum (or maximum) queries in O(1) after O(n log n) preprocessing. The fastest possible range query structure for immutable data.

**Preprocessing:** build table where "table[i][j] = min/max of subarray starting at i with length 2^j."
"table[i][0] = arr[i]  # length-1 subarray
for j in range(1, LOG):
    for i in range(n - (1 << j) + 1):
        table[i][j] = min(table[i][j-1], table[i + (1<<(j-1))][j-1])"
O(n log n) preprocessing, O(n log n) space.

**Query (Range Minimum Query - RMQ):** for range [l, r], find k = floor(log2(r - l + 1)). The answer is "min(table[l][k], table[r - (1<<k) + 1][k])". These two sub-ranges overlap (that's OK for min/max since duplicates don't matter). O(1).

**Overlapping ranges trick:** works only for "idempotent" operations (min, max, GCD, OR, AND) where applying the operation to the same element twice doesn't change the result. Does NOT work for sum (would double-count elements in the overlap).

**For range sum queries:** use prefix sums (O(1) query, O(n) space) instead. No overlap issue.

**Applications:**
- LCA (Lowest Common Ancestor) using Euler tour + RMQ: linearize tree, LCA(u,v) = minimum depth node between first occurrences of u and v in Euler tour. O(n log n) preprocessing, O(1) LCA queries.
- Sliding window minimum/maximum: use monotone deque for O(n) total, but sparse table if random queries.
- Range GCD queries: GCD is idempotent → sparse table gives O(1) range GCD.

**Key insight:** sparse table achieves O(1) query by precomputing overlapping "power-of-2-length" ranges and using the idempotent property to allow the overlap. This is the classic "precompute more to query faster" trade-off — O(n log n) space and preprocessing for O(1) query.`,
    },
    {
      id: 1527,
      name: "Heavy-Light Decomposition",
      desc: `**Heavy-Light Decomposition (HLD)** — decomposes a tree into chains such that any root-to-leaf path traverses at most O(log n) chains, enabling efficient path queries and updates using a 1D data structure (e.g., segment tree).

**Decomposition:** for each node, the "heavy child" is the child with the largest subtree size (breaking ties arbitrarily). The heavy edge from a node to its heavy child is part of the same "chain." Light edges start new chains.

**Key property:** any root-to-leaf path crosses at most O(log n) light edges (and thus O(log n) chains). Proof: each time we cross a light edge to a child, the subtree size at least doubles, so we can cross at most log n light edges.

**Path query (sum/min/max):** for path(u, v), repeatedly move to the top of one chain (if not on the same chain), applying the segment tree query on that chain segment. O(log² n) for path queries with segment tree (log n chain switches × log n per query).

**Applications:**
- Path sum / minimum / maximum on weighted trees
- Path update + query (both): O(log² n) per operation
- Subtree update + query: simpler — assign contiguous DFS ordering, use segment tree directly (no HLD needed)

**Alternative: Euler Tour + Segment Tree for subtree queries:** assign in-time and out-time in DFS. Subtree of node v corresponds to a contiguous range [in_v, out_v] in the DFS array. No HLD needed for subtree queries.

**Key insight:** HLD is the bridge between tree algorithms and array algorithms. By decomposing a tree into chains and flattening each chain into an array, you convert tree path problems into 1D range problems that any array data structure can handle efficiently.`,
    },
    {
      id: 1528,
      name: "Suffix Array & Suffix Tree",
      desc: `**Suffix Array** — a sorted array of all suffixes of a string. Enables O(log n) pattern matching and many other string operations after O(n log n) or O(n) construction.

**Construction (naive):** generate all n suffixes as indices, sort. O(n² log n) due to O(n) string comparison per sort step.

**Prefix doubling (Manber-Myers):** O(n log n). Sort suffixes by first 2^k characters iteratively, doubling k each time.

**LCP Array:** "lcp[i] = longest common prefix of suffix_array[i] and suffix_array[i-1]." Built in O(n) using Kasai's algorithm. Enables:
- Distinct substrings count: n(n+1)/2 - sum(lcp)
- Longest repeated substring: max(lcp)
- Number of occurrences of pattern P: binary search in suffix array + LCP range

**Suffix Tree:** compressed trie of all suffixes. O(n) space and O(n) construction (Ukkonen's algorithm). Every suffix array query has a suffix tree equivalent with potentially better constants.

**Suffix Array vs Suffix Tree:**
- Suffix array: simpler to implement, better cache performance, O(n log n) or O(n) construction
- Suffix tree: O(n) construction (harder), O(m) pattern search (vs O(m log n) with SA), more flexible

**Applications:**
- Pattern matching (find all occurrences of P in T): binary search on SA in O(m log n)
- Longest repeated substring: max value in LCP array
- Longest common substring of two strings: concatenate S1 + '#' + S2, build SA+LCP, find max LCP between suffixes from different strings

**Key insight:** suffix array with LCP array is the "poor man's suffix tree" — nearly as powerful, much simpler to implement. For competitive programming and interviews, suffix array + LCP + binary search covers most string problems that would need a suffix tree in theory.`,
    },
    {
      id: 1529,
      name: "Persistent Data Structures",
      desc: `**Persistent Data Structures** — data structures that preserve all previous versions after updates. Every operation creates a new version while keeping all old versions accessible. Time-traveling data structures.

**Path copying (semi-persistence):** when updating a node in a tree, copy all nodes on the path from root to the changed node (O(log n) nodes for balanced BSTs). The new root points to the updated path; unchanged subtrees are shared. O(log n) per update, O(1) per historical query.

**Persistent segment tree:** enables O(log n) range queries on any historical version and O(log n) updates creating new versions. Classic application: "find the kth smallest element in subarray [l, r]" using the difference of two segment tree versions (built incrementally as elements are added one by one).

"# Version i = persistent segment tree built on first i elements
kth_smallest(l, r, k):
    return query(root[r], root[l-1], k)  # difference of two versions"

**Fully persistent vs partially persistent:**
- **Partially persistent:** can query any old version, but updates only create new versions from the latest. Arrays, linked lists.
- **Fully persistent:** can create new versions from any old version. Trees with path copying.

**Confluently persistent:** merging two versions is also supported. Much harder — required for some functional data structures.

**Applications:**
- Version control (Git uses a content-addressed tree with structural sharing — similar concept)
- Functional programming: immutable data structures in Haskell, Clojure, Scala
- Competitive programming: offline range queries, kth smallest in range

**Key insight:** structural sharing is the key to efficiency. A naive approach (copy the entire data structure per version) costs O(n) per update. Path copying shares all unchanged parts, paying only O(log n) per update. This is why immutable data structures in functional programming are not as expensive as they seem.`,
    },
    {
      id: 1530,
      name: "Treap",
      desc: `**Treap** — a randomized BST that satisfies both the BST property (by key) and the heap property (by random priority). Achieves O(log n) expected height without complex rotations. Combines "tree" + "heap."

**Structure:** each node has a key and a random priority. BST property: keys are ordered as in a BST. Heap property: each node's priority ≥ its children's priorities (max-heap by priority).

**Randomized priorities ensure balance:** since priorities are random, the resulting tree has the same distribution as a random BST — expected height O(log n), O(n log n) expected total path lengths.

**Operations:**
- **Split(treap, key):** split into two treaps: all keys ≤ key and all keys > key. O(log n) expected.
- **Merge(left, right):** merge two treaps where all keys in left < all keys in right. O(log n) expected.
- **Insert:** split at key, create node, merge left + node + right.
- **Delete:** split off the node, merge its children.

**Implicit treap (by index):** use subtree size as the key instead of an explicit key. Supports O(log n) array-like operations: split at index, merge, range reversal. Essentially a balanced BST array with O(log n) split and merge.

**Implicit treap applications:**
- Rope (string with O(log n) split, merge, index): text editor operations
- Order-maintenance with O(log n) operations
- Range reversal, range rotation on sequences

**Key insight:** the treap's elegance is that randomization eliminates the need for complex rotation logic (AVL: 4 cases, Red-Black: 6 cases). The split and merge operations are the core — everything else is composed from them. Implicit treap is particularly powerful, acting as an O(log n) random-access list with split/merge.`,
    },
    {
      id: 1531,
      name: "Van Emde Boas Tree",
      desc: `**Van Emde Boas (VEB) Tree** — a tree structure that supports predecessor, successor, insert, delete, and search in O(log log U) time, where U is the universe size (range of possible values). Dramatically faster than O(log n) for large n with small universe.

**Key insight:** recursively divide the universe into √U clusters of size √U. Each cluster is a VEB tree. A "summary" VEB tree tracks which clusters are non-empty.

**Operations:** insert, delete, member, min, max — all O(log log U). Predecessor and successor — O(log log U). Faster than binary search for large inputs with bounded universe.

**Space:** O(U) space — works when universe U is manageable (U ≤ 10⁶ or 10⁷ in practice).

**vs Hash table:** hash table gives O(1) insert/search but O(n) predecessor/successor. VEB tree gives O(log log U) for all operations including predecessor/successor.

**vs Balanced BST:** BST is O(log n). VEB is O(log log U). For n=10⁶ and U=10⁶: log n = 20, log log U = log 20 ≈ 4.3. VEB is ~4.6x fewer operations.

**Practical limitations:** large memory footprint, complex implementation, constant factors not captured by O. In practice, sorted arrays with binary search often outperform VEB trees for realistic inputs due to cache effects.

**y-fast trie:** a practical alternative combining VEB structure with hashing. O(log log U) operations, O(n) space. Used in integer sorting and routing tables.

**Key insight:** VEB trees are a theoretical triumph — proving that integer operations can be much faster than comparison-based O(log n). They're used in priority queues for Dijkstra on dense graphs where log log U << log n, but their complexity and memory make them rare in production code.`,
    },
    {
      id: 1532,
      name: "Wavelet Tree",
      desc: `**Wavelet Tree** — a data structure that partitions values into ranges recursively (like a segment tree on value space), enabling O(log U) range rank/select/kth-smallest queries.

**Structure:** binary tree where the root holds all elements. Left child: elements with values in the lower half of the value range; right child: upper half. Each internal node stores which elements went left vs right.

**Queries (all O(log U)):**
- **count(l, r, k):** count elements ≤ k in arr[l..r]
- **kth_smallest(l, r, k):** kth smallest in arr[l..r]
- **next_greater(l, r, val):** smallest value > val in arr[l..r]

**kth smallest in range (the killer feature):** persistent segment tree also solves this in O(log n), but wavelet tree is often simpler to implement and faster in practice.

**Applications:**
- "Given array arr, answer many queries: what's the kth smallest in arr[l..r]?" — O(n log n) preprocessing, O(log n) per query
- Range mode (most frequent element in a range) with wavelet tree + frequency counting
- Offline 2D problems: queries are rectangles, elements are points

**Wavelet tree vs merge sort tree:**
- Merge sort tree: O(n log n) space, O(log² n) per query — simpler to implement
- Wavelet tree: O(n log n) space, O(log n) per query — more complex but faster queries

**Key insight:** wavelet trees decompose the problem by value range rather than by index range. This "dual" perspective (index-based queries, value-based structure) is what enables efficient range rank/select. It's one of the more advanced data structures, common in competitive programming but rarely needed in industry.`,
    },
    {
      id: 1533,
      name: "Link-Cut Trees",
      desc: `**Link-Cut Trees** — a dynamic data structure for forests (collections of trees) that supports path queries, link (add an edge), and cut (remove an edge) in O(log n) amortized time. The dynamic tree data structure.

**Motivation:** HLD handles static trees with O(log² n) path queries. For dynamic trees where edges can be added/removed, HLD must be rebuilt. Link-Cut Trees handle both path queries and topology changes in O(log n).

**Auxiliary trees (splay trees):** represent each "preferred path" (similar to HLD chains) as a splay tree ordered by depth. "Access" operation: rearrange the preferred paths to include the root-to-v path.

**Operations:**
- **link(u, v):** make u's root a child of v. O(log n) amortized.
- **cut(u, v):** remove edge (u, v) from the tree. O(log n) amortized.
- **path_query(u, v):** query aggregate (sum, min, max) on path from u to v. O(log n) amortized.

**Access operation:** the key primitive. Rearranges splay trees so the path from v to root is one preferred path. Amortized O(log n) using the heavy-light structure.

**Applications:**
- Dynamic connectivity with path queries (network flow with edge updates)
- Online LCA with tree modifications
- Maximum spanning forest in dynamic graphs (competitive programming)
- Competitive programming: online MST, dynamic bipartite matching

**Key insight:** link-cut trees are one of the most sophisticated data structures in competitive programming. They combine splay trees (a self-adjusting BST) with the heavy-light decomposition insight to achieve O(log n) amortized for all operations. Rarely needed outside competitive programming, but understanding them demonstrates mastery of advanced DS concepts.`,
    },
    {
      id: 1534,
      name: "Randomized Data Structures",
      desc: `**Randomized Data Structures** — data structures that use randomization to achieve good expected performance, simplify implementation, or reduce worst-case probability.

**Skip List:** probabilistic O(log n) search, insert, delete. Each element promoted to higher levels with probability 1/2. Expected height O(log n). Simpler than AVL/Red-Black trees to implement. Used in Redis sorted sets.

**Treap:** BST with random priorities ensures O(log n) expected height. Easier to implement than AVL/Red-Black. Supports split/merge natively.

**Cuckoo Hashing:** two hash functions, two tables. Each key can be in one of two positions. On collision, evict the existing element and place it in its alternative position (recursively). O(1) worst-case lookup, O(1) amortized insert. Used in: routers (TCAM), DNS caches.

**Robin Hood Hashing:** open addressing variant. When inserting, if the current element has "traveled" farther from its home slot than the element being displaced, swap them. Reduces variance in probe lengths. Used in: Rust's HashMap.

**Randomized BST:** at each insertion, with probability 1/(n+1), insert the new element at the root (using split and merge). Expected height O(log n). Alternative to treap.

**Locality-Sensitive Hashing (LSH):** hash similar items to the same bucket with high probability. Enables approximate nearest-neighbor search in high-dimensional spaces. O(n^(1/c)) query time for c-approximate nearest neighbor. Used in: Spotify recommendations, image deduplication, NLP similarity.

**Key insight:** randomized data structures often match or beat deterministic ones in practice while being simpler to implement. The trade-off: performance is "expected" (probabilistic) rather than guaranteed. For adversarial inputs, add randomized hash salting (like Python's hash randomization). For non-adversarial inputs, randomized structures are usually the pragmatic choice.`,
    },
    {
      id: 1535,
      name: "String Matching Algorithms",
      desc: `**String Matching Algorithms** — efficiently finding occurrences of a pattern P in a text T.

**KMP (Knuth-Morris-Pratt):** O(n + m) worst case using a failure function to avoid backtracking.
- Preprocess P to build "failure function" (longest proper prefix of P[0..i] that is also a suffix)
- Use failure function to skip text comparisons when a mismatch occurs
- Never backtracks in T (each character of T is compared at most twice)

"# Build failure function
fail = [0] * m; j = 0
for i in range(1, m):
    while j > 0 and pattern[i] != pattern[j]: j = fail[j-1]
    if pattern[i] == pattern[j]: j += 1
    fail[i] = j"

**Boyer-Moore:** O(n/m) best case (sublinear!). Two heuristics: bad character rule and good suffix rule. Skips large portions of text on mismatch. Industry standard for large alphabets.

**Z-algorithm:** for each position i, compute Z[i] = length of longest substring starting at i that is also a prefix of the string. O(n+m). Pattern search: concatenate P+'#'+T, find positions where Z[i] == m.

**Aho-Corasick:** multi-pattern matching. Build a trie of all patterns + failure links (like KMP failure function on the trie). Find all occurrences of all patterns simultaneously in O(n + total_pattern_length + matches).

**Rabin-Karp:** rolling hash. O(n+m) average. Best for multiple pattern search with the same length.

**Key insight:** KMP and Z-algorithm are conceptually dual — KMP processes T online using the structure of P; Z-algorithm processes the concatenation P#T using prefix matching. For interviews, KMP is more commonly asked. For production multi-pattern matching (web scraping, antivirus), Aho-Corasick is the standard algorithm.`,
    },
    {
      id: 1536,
      name: "Data Structures in Practice",
      desc: `**Data Structures in Practice** — choosing the right data structure for production systems, not just interviews. The gap between "textbook DS" and "what professionals actually use."

**Language standard library DS:**

**Python:** list (dynamic array), dict (hash map with insertion order), set (hash set), deque (doubly linked list), heapq module, Counter (multiset), defaultdict, OrderedDict. "sortedcontainers.SortedList" for O(log n) sorted structure.

**Java:** ArrayList, LinkedList, HashMap, TreeMap, HashSet, TreeSet, PriorityQueue (min-heap), ArrayDeque, ConcurrentHashMap.

**C++:** vector, list, map (red-black BST), unordered_map (hash map), set, unordered_set, priority_queue, deque, stack, queue.

**Production system DS:**

**In-memory:** Redis — strings, lists, sets, sorted sets (skip list), hash maps, streams (log structure), bloom filters, hyperloglog.

**On-disk:** B+ trees (database indexes), LSM trees (write-optimized — Cassandra, RocksDB, LevelDB), R-trees (spatial data — PostGIS, MongoDB geospatial).

**Distributed:** consistent hash ring, vector clocks, CRDT (conflict-free replicated data types), Merkle trees (distributed verification — Git, blockchain).

**Choosing a DS checklist:**
1. What operations must be fast? (insert, delete, search, range query, iteration?)
2. What's the access pattern? (random, sequential, hot keys?)
3. How much memory is available?
4. Is the data sorted, structured, or arbitrary?
5. Is the data mutable or immutable?
6. Is concurrency required?

**Key insight:** in production, "right data structure" often means "right data structure in the right layer." A sorted list in memory + a B+ tree on disk + a bloom filter in front = the architecture of almost every major database storage engine. Understanding the full stack of data structures — from bits to distributed systems — is what separates a senior engineer from a junior one.`,
    },
  ],
};

export default advancedDs;
