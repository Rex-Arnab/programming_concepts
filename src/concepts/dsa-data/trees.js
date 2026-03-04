const trees = {
  name: "Trees & Binary Search Trees",
  icon: "🌳",
  color: "#10b981",
  concepts: [
    {
      id: 1443,
      name: "Tree Fundamentals",
      desc: `**Tree** — a hierarchical data structure of nodes where each node has a value and zero or more child nodes. A connected acyclic graph with n nodes and n-1 edges.

**Vocabulary:**
- **Root:** the topmost node (no parent)
- **Leaf:** a node with no children
- **Height:** longest path from root to any leaf. Leaf height = 0.
- **Depth:** distance from root to a specific node. Root depth = 0.
- **Subtree:** a node and all its descendants
- **Degree:** number of children of a node

**Binary tree:** each node has at most 2 children (left and right). Most common tree variant in interviews and algorithms.

**Tree properties:**
- n nodes → n-1 edges (always, for a tree)
- Binary tree with height h: at most 2^(h+1) - 1 nodes
- Complete binary tree with n nodes: height = floor(log₂ n)

**Tree traversals:**
- **Preorder (NLR):** root → left → right. Used to serialize/copy a tree.
- **Inorder (LNR):** left → root → right. Gives sorted order for BSTs.
- **Postorder (LRN):** left → right → root. Used to delete or compute subtree properties.
- **Level order:** BFS traversal, level by level.

**Key insight:** tree problems almost always use recursion because trees are recursively defined (a tree is a root + left subtree + right subtree). The base case is null (empty tree). The recursive trust: "if my left and right subtrees return correctly, what do I do with those results?"`,
    },
    {
      id: 1444,
      name: "Binary Search Tree (BST)",
      desc: `**BST** — a binary tree with the invariant: for every node, all values in its left subtree are strictly less, and all values in its right subtree are strictly greater. Enables O(log n) search, insert, and delete on average.

**BST operations:**
- **Search:** start at root, go left if target < node, right if target > node. O(h) where h = height.
- **Insert:** search for the position, insert as a leaf. O(h).
- **Delete:** three cases — (1) leaf: just remove, (2) one child: replace with child, (3) two children: replace with inorder successor (leftmost node of right subtree), then delete successor.
- **Inorder traversal:** yields sorted order — key property of BSTs.

**Height issue:** BST height depends on insertion order. Random inserts → O(log n) height. Sorted inserts → O(n) height (a "degenerate" BST is a linked list). This is why balanced BSTs exist.

**BST vs sorted array:**
- BST: O(log n) insert/delete; O(log n) search
- Sorted array: O(n) insert/delete (shifting); O(log n) search (binary search)
- BST wins when inserts/deletes are frequent; sorted array wins when queries dominate

**Key insight:** the BST property means inorder traversal = sorted order. This is crucial: "find kth smallest element in BST" → inorder traversal, count k nodes. "Validate BST" → inorder traversal should be strictly increasing. Many BST problems are solved by recognizing what inorder traversal means.`,
    },
    {
      id: 1445,
      name: "Tree Traversals (DFS)",
      desc: `**Tree DFS Traversals** — three orderings of depth-first traversal: preorder, inorder, and postorder. Each has distinct use cases and can be implemented recursively or iteratively.

**Recursive implementations (simplest):**
"def preorder(root):   # NLR
    if not root: return
    visit(root); preorder(root.left); preorder(root.right)

def inorder(root):    # LNR — sorted order in BST
    if not root: return
    inorder(root.left); visit(root); inorder(root.right)

def postorder(root):  # LRN — process children before parent
    if not root: return
    postorder(root.left); postorder(root.right); visit(root)"

**Iterative inorder (most asked):** push nodes while going left, process when popping, then go right.
"stack = []; curr = root
while curr or stack:
    while curr: stack.append(curr); curr = curr.left
    curr = stack.pop(); visit(curr); curr = curr.right"

**Use cases:**
- **Preorder:** serialize tree, copy tree, print directory structure (process dir before contents)
- **Inorder:** BST sorted iteration, BST validation
- **Postorder:** delete tree, compute subtree sizes/heights, evaluate expression trees (operands before operators)

**Key insight:** when a tree problem requires computing something bottom-up (using children's values to compute parent's value), postorder is the natural fit. When processing parent before children (top-down propagation), preorder. When BST and order matters, inorder.`,
    },
    {
      id: 1446,
      name: "Level Order Traversal (BFS)",
      desc: `**Level Order Traversal** — visiting all nodes level by level from left to right, using a queue. The tree equivalent of BFS; produces a layered view of the tree.

**Template with level grouping:**
"from collections import deque
result = []
if not root: return result
queue = deque([root])
while queue:
    level_size = len(queue)
    level = []
    for _ in range(level_size):
        node = queue.popleft()
        level.append(node.val)
        if node.left: queue.append(node.left)
        if node.right: queue.append(node.right)
    result.append(level)"

**Applications:**
- **Minimum depth:** first time you reach a leaf in level order = minimum depth (BFS gives shortest path)
- **Right side view:** last node of each level is visible from the right
- **Zigzag traversal:** alternate left-to-right and right-to-left per level (use deque or reverse)
- **Average of levels:** sum all nodes in a level, divide by count
- **Connect next right pointers:** for perfect binary trees, connect each node to its level-order successor

**BFS vs DFS for tree minimum depth:** DFS must explore all paths to find minimum. BFS stops at the first leaf encountered. For wide trees (small depth, many nodes), BFS is significantly faster in practice.

**Key insight:** "level order" and "BFS" are synonymous for trees. Any problem asking about levels, layers, widths, or "what's visible" from a side is a level-order problem. The "process entire level before moving to next" loop (using len(queue) as a snapshot) is the key pattern.`,
    },
    {
      id: 1447,
      name: "Tree Recursion Patterns",
      desc: `**Tree Recursion Patterns** — the common recursive structures that appear across most tree problems. Recognizing the pattern turns a hard problem into a fill-in-the-blank exercise.

**Pattern 1 — Return a value (bottom-up):** compute something for each subtree and combine at root. Used for: height, diameter, max path sum, subtree sum.
"def height(root):
    if not root: return -1  # or 0 depending on definition
    return 1 + max(height(root.left), height(root.right))"

**Pattern 2 — Pass a value down (top-down):** propagate context from parent to children. Used for: BST validation (pass min/max bounds), path sum from root to leaf, level numbering.
"def validate(node, min_val, max_val):
    if not node: return True
    if not (min_val < node.val < max_val): return False
    return validate(node.left, min_val, node.val) and validate(node.right, node.val, max_val)"

**Pattern 3 — Accumulate globally:** use a nonlocal or class variable to track the global answer as you recurse. Used for: diameter (max path that might not pass through root), LCA, max path sum (path can start/end anywhere).

**Pattern 4 — Return multiple values:** return a tuple from each recursive call. Used for: BST validation (is_valid + min + max), balanced tree check (is_balanced + height).

**Key insight:** most tree problems follow one of these patterns. Before coding, identify: "do I need information from children to compute the answer at this node?" → bottom-up. "Do I need to pass context from the root to this node?" → top-down. "Is the answer possibly at a node that's not the root?" → nonlocal variable.`,
    },
    {
      id: 1448,
      name: "Balanced Binary Trees (AVL, Red-Black)",
      desc: `**Balanced BSTs** — self-balancing binary search trees that maintain O(log n) height through rotations, ensuring O(log n) worst-case for all operations. The unbalanced BST's Achilles heel — O(n) worst case — is eliminated.

**AVL Tree:** maintains height balance: for every node, |height(left) - height(right)| ≤ 1. Uses 4 rotation types (LL, RR, LR, RL) to rebalance after insert/delete. Strictly balanced → fastest search. More rotations needed → slower inserts.

**Red-Black Tree:** maintains color balance: nodes are red or black, satisfying 5 properties including "no two consecutive red nodes" and "equal black height on all paths." O(log n) height guaranteed. Fewer rotations than AVL → faster inserts/deletes. Used in: C++ std::map, Java TreeMap, Linux CFS scheduler.

**B-Tree:** generalization to m-way branching. Stores multiple keys per node. Optimized for disk I/O — each node fills one disk page. Height is O(log_m n) — very short. Used in: database indexes (MySQL InnoDB B+ tree), file systems (NTFS, ext4).

**B+ Tree (vs B-Tree):** all values at leaves; internal nodes store only keys as separators. Leaves linked for efficient range scans. This is the standard for database index implementations — range queries traverse leaves sequentially.

**Key insight:** you don't implement AVL or Red-Black trees in interviews — you use them via TreeMap/SortedDict. What matters is knowing: balanced BST = O(log n) guaranteed. When you need a sorted structure with O(log n) insert/delete/search, reach for a balanced BST (TreeMap in Java, sortedcontainers.SortedList in Python).`,
    },
    {
      id: 1449,
      name: "Lowest Common Ancestor (LCA)",
      desc: `**Lowest Common Ancestor (LCA)** — the deepest node in a tree that is an ancestor of both given nodes. A fundamental tree primitive used in many algorithms.

**For BST (efficient):** use BST property. If both p and q are less than root, LCA is in left subtree. If both greater, in right subtree. Otherwise (root is between them, or root equals one), root is LCA. O(h).

**For general binary tree (no BST property):**
"def lca(root, p, q):
    if not root or root == p or root == q: return root
    left = lca(root.left, p, q)
    right = lca(root.right, p, q)
    if left and right: return root  # p in left subtree, q in right
    return left or right           # both in same subtree"

**Variants:**
- **LCA with parent pointers:** traverse up from both nodes, find first common node. Or store path of ancestors in a set.
- **Multiple LCA queries:** Euler tour + sparse table (range minimum query) for O(1) per query after O(n log n) preprocessing (Farach-Colton and Bender algorithm).
- **LCA in a DAG:** find all ancestors of each node (BFS upward), intersect sets.

**Applications:** LCA appears in distance queries (dist(u,v) = depth(u) + depth(v) - 2·depth(LCA(u,v))), compiler symbol table lookup, bioinformatics (phylogenetic trees).

**Key insight:** the general binary tree LCA solution works by searching left and right subtrees and interpreting the results: if both sides return non-null, the current node is the LCA. If only one side returns non-null, propagate that up. This clean 4-line solution handles all cases.`,
    },
    {
      id: 1450,
      name: "Trie (Prefix Tree)",
      desc: `**Trie (Prefix Tree)** — a tree where each path from root to a node represents a prefix of the strings stored. Each node has up to 26 children (for lowercase alphabet), making prefix lookups O(L) where L is the string length, independent of number of strings n.

**Node structure:**
"class TrieNode:
    def __init__(self):
        self.children = {}  # char → TrieNode
        self.is_end = False  # marks end of a word"

**Operations (all O(L)):**
- **Insert:** traverse/create nodes for each character, mark last as is_end = True
- **Search:** traverse nodes for each character, return is_end at last node
- **StartsWith (prefix search):** traverse nodes, return True if all characters found (regardless of is_end)

**Trie vs Hash Map for strings:**
- Hash map: O(L) insert/search (hash computation), but no prefix queries
- Trie: O(L) insert/search, O(L + result size) prefix enumeration — unique capability
- Trie uses O(L × n) space in worst case (no shared prefixes), O(n) in best case (all share prefix)

**Applications:**
- Autocomplete (enumerate all words with given prefix)
- Spell checker (find similar words)
- IP routing (longest prefix match in CIDR, implemented as a trie on bits)
- Word search II (find all words from a list in a 2D grid)
- Boggle solver

**Key insight:** tries excel when you need prefix-based operations — "how many words start with 'un-'?", "find the longest word whose prefix is also a word." For simple membership testing with no prefix queries, a hash set is simpler and uses less memory.`,
    },
    {
      id: 1451,
      name: "Segment Tree",
      desc: `**Segment Tree** — a tree that stores aggregates (sum, min, max, GCD) over intervals of an array, enabling O(log n) range queries and O(log n) point updates.

**Structure:** binary tree where each leaf = one array element, each internal node = aggregate of its range. Root = aggregate of entire array.

**Build:** O(n) — fill leaves, compute parents bottom-up.
**Query(l, r):** decompose into O(log n) disjoint nodes that together cover [l, r].
**Update(i, val):** update leaf, recompute O(log n) ancestors.

**Array-based implementation (easiest):** store in an array of size 4n. Node i's left child = 2i, right child = 2i+1, parent = i//2.

**Lazy propagation:** when updating a range [l, r] (not just a point), propagate lazily — store the pending update at the node, apply to children only when needed. Enables O(log n) range updates. Example: "add 5 to all elements from index 3 to 10."

**vs Fenwick Tree (BIT):**
- Fenwick tree: simpler code, O(log n) point update and prefix query, O(n) space
- Segment tree: more powerful (arbitrary queries and updates), O(log n) range query, O(n) space
- Use Fenwick for prefix sums; use segment tree when you need non-prefix range queries or range updates

**Key insight:** segment trees solve "range query + point/range update" problems that would be O(n²) with a naive approach. The key insight is representing a range query as a union of O(log n) precomputed intervals. Any operation that is associative (sum, min, max, XOR, GCD) can be a segment tree aggregate.`,
    },
    {
      id: 1452,
      name: "Binary Indexed Tree (Fenwick Tree)",
      desc: `**Fenwick Tree / Binary Indexed Tree (BIT)** — a data structure for prefix sum queries and point updates in O(log n) with O(n) space and extremely simple implementation. Faster in practice than a segment tree for prefix queries.

**Core insight:** each index i in the BIT stores the sum of a specific range. The range length is determined by the lowest set bit of i: "i & (-i)". This cleverly encodes a hierarchy of ranges using bit manipulation.

**Operations:**
"def update(i, delta):  # add delta to index i (1-indexed)
    while i <= n:
        tree[i] += delta
        i += i & (-i)  # move to parent

def query(i):  # sum from index 1 to i
    total = 0
    while i > 0:
        total += tree[i]
        i -= i & (-i)  # move to predecessor
    return total

def range_query(l, r):
    return query(r) - query(l - 1)"

**Build in O(n):** for each i from 1 to n, call update(i, arr[i-1]).

**Applications:**
- Count inversions in an array (merge sort alternative)
- Order statistics in a stream
- 2D BIT for 2D range sum queries
- LIS (Longest Increasing Subsequence) O(n log n)

**BIT limitations:** only supports operations with inverses (sum/subtraction). Cannot do range minimum queries (no inverse for min).

**Key insight:** the "i & (-i)" trick is what makes Fenwick trees elegant — it efficiently identifies which partial sums to update or query using the binary representation of the index. The code is ~10 lines but the insight is profound.`,
    },
    {
      id: 1453,
      name: "N-ary Trees & General Trees",
      desc: `**N-ary Trees** — trees where each node can have any number of children. More general than binary trees; used in file systems, XML/HTML DOM, organization hierarchies, and game trees.

**Representation:**
- **List of children:** each node stores a list. Flexible, common in interview problems.
- **Left-child right-sibling:** binary tree representation of an N-ary tree. Left pointer = first child, right pointer = next sibling. Enables binary tree algorithms on N-ary trees.
- **Adjacency list:** for general tree traversal without explicit parent pointers.

**Traversals:**
- **Preorder:** visit node, then recursively all children
- **Postorder:** recursively all children, then visit node
- No "inorder" for N-ary trees (inorder only makes sense with exactly 2 children)

**Tree serialization / deserialization:** convert a tree to a string and back. Used for: storing trees, comparing trees, LeetCode encode/decode problems.
- BFS serialization: level-order with null markers between children
- DFS preorder: record value + child count, or use "#" as null marker

**File system trees:** directory structure is an N-ary tree. "du -sh" computes subtree sizes (postorder). "find" does DFS traversal. "ls -R" is a preorder traversal.

**Key insight:** when converting N-ary tree algorithms to code, always iterate over the children list instead of accessing left/right. The pattern "for child in node.children: recurse(child)" replaces "recurse(root.left); recurse(root.right)". Everything else is the same.`,
    },
    {
      id: 1454,
      name: "Tree DP",
      desc: `**Tree DP (Dynamic Programming on Trees)** — applying DP to trees by computing optimal substructure using subtree results. Postorder traversal naturally implements tree DP: children are computed before parents.

**General pattern:**
"def dp(node):
    if not node: return base_case
    # Compute from children (trust the recursion)
    left_result = dp(node.left)
    right_result = dp(node.right)
    # Use children's results to compute this node's result
    return combine(node.val, left_result, right_result)"

**Classic tree DP problems:**
- **Maximum path sum (any path):** at each node, compute: (1) max gain going down one branch (for passing to parent), (2) max path through this node (using both branches). Track global max.
- **House Robber on Tree:** cannot rob adjacent nodes. At each node: rob = node.val + left_skip + right_skip; skip = max(left_rob, left_skip) + max(right_rob, right_skip). Return both (rob, skip).
- **Diameter of tree:** diameter through node = left_height + right_height + 2. Track global max.
- **Subtree sum equals k:** count subtrees with sum = k. Each node returns its subtree sum.

**State transitions in tree DP:** the "transition" is the combine step. Unlike linear DP where you transition from dp[i-1] to dp[i], in tree DP you transition from children's states to parent's state.

**Key insight:** tree DP solves problems where the decision at a node depends on choices made in its subtree. The key is: what state do I need to return from each subtree? Often you return multiple values (a tuple) representing different "choices" the parent can make.`,
    },
    {
      id: 1455,
      name: "Morris Traversal",
      desc: `**Morris Traversal** — a tree traversal algorithm that achieves O(n) time and O(1) space (no stack, no recursion) by temporarily modifying the tree structure using "threaded binary trees."

**Core idea:** for inorder traversal, before going to the left subtree, find the inorder predecessor of the current node (rightmost node in left subtree). Create a temporary link from the predecessor's right to the current node. This "thread" allows returning to the current node without a stack.

**Morris Inorder:**
"curr = root
while curr:
    if not curr.left:
        visit(curr)  # no left subtree, visit and move right
        curr = curr.right
    else:
        # Find inorder predecessor
        pred = curr.left
        while pred.right and pred.right != curr:
            pred = pred.right
        if not pred.right:    # thread doesn't exist yet
            pred.right = curr # create thread
            curr = curr.left  # go left
        else:                 # thread exists, we're returning
            pred.right = None # remove thread (restore tree)
            visit(curr)       # visit current
            curr = curr.right # move right"

**When to use Morris traversal:** when O(1) space is a hard constraint (embedded systems, very deep trees). The tree is temporarily modified and restored — safe if single-threaded.

**Preorder Morris:** similar but visit the node when creating the thread (before going left), not when removing it.

**Key insight:** Morris traversal is the most elegant O(1) space tree traversal, but also the hardest to implement. Understanding it deeply demonstrates mastery of pointer manipulation and the relationship between inorder predecessor and traversal order.`,
    },
    {
      id: 1456,
      name: "Tree Serialization",
      desc: `**Tree Serialization** — encoding a tree into a string or array for storage or transmission, and deserializing it back into the original structure. Essential for distributed systems, databases, and tree comparison.

**Preorder DFS serialization (most common):**
- Serialize: preorder traversal, write node value or "#" for null.
- Deserialize: read values one by one, recursively build: if "#" return None, else build node, recurse for left, then right.
- Uses a global index or iterator to track position in the string.

"def serialize(root):
    if not root: return '#'
    return str(root.val) + ',' + serialize(root.left) + ',' + serialize(root.right)

def deserialize(data):
    vals = iter(data.split(','))
    def build():
        val = next(vals)
        if val == '#': return None
        node = TreeNode(int(val))
        node.left = build(); node.right = build()
        return node
    return build()"

**BFS serialization:** level order, null for missing children. Shorter strings for shallow, wide trees. Deserialization uses a queue.

**BST serialization (more compact):** only need preorder (no nulls needed!) because BST property lets you reconstruct from preorder uniquely: values less than root go left, values greater go right.

**Key insight:** DFS preorder + null markers uniquely identifies any binary tree. For BST, preorder alone (no nulls) is sufficient — the BST property provides the missing information. This is why "serialize BST" and "serialize binary tree" have different solutions.`,
    },
  ],
};

export default trees;
