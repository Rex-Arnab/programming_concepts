const linkedLists = {
  name: "Linked Lists",
  icon: "🔗",
  color: "#8b5cf6",
  concepts: [
    {
      id: 1423,
      name: "Linked List Fundamentals",
      desc: `**Linked List** — a linear data structure where each element (node) holds a value and a pointer (reference) to the next node. Unlike arrays, nodes are scattered in memory; there's no random access — traversal must start from the head.

**Singly vs Doubly linked:**
- **Singly:** each node has value + next pointer. O(1) insert/delete at head. O(n) to access/delete arbitrary nodes.
- **Doubly:** each node has value + next + prev. O(1) insert/delete given a node reference (no need to find predecessor). 2x memory per node.
- **Circular:** tail's next points back to head. Used for round-robin scheduling, LRU cache.

**Linked list vs array trade-offs:**
| Operation | Array | Linked List |
|---|---|---|
| Access by index | O(1) | O(n) |
| Insert/delete at head | O(n) | O(1) |
| Insert/delete at tail | O(1) amortized | O(1) doubly, O(n) singly |
| Insert/delete in middle | O(n) | O(1) if node known |
| Memory locality | Excellent | Poor (cache misses) |

**When to prefer linked lists:** frequent insertions/deletions at known positions, O(1) splice and merge of sublists, when size is truly unknown and reallocation is costly.

**Key insight:** in practice, arrays beat linked lists in almost all scenarios because cache performance dominates. Modern CPUs can be 5-10x faster on array traversal vs linked list traversal. Use linked lists when algorithmic O(1) insertion is the bottleneck, not cache performance.`,
    },
    {
      id: 1424,
      name: "Dummy Head Pattern",
      desc: `**Dummy Head (Sentinel Node)** — a technique to simplify linked list code by adding a fake head node that always exists, eliminating special cases for empty lists or operations at the head.

**Problem it solves:** without a dummy head, inserting/deleting the first node requires special-casing because there's no "prev" node. Code becomes cluttered with "if head is None" or "if prev is None" checks.

**With dummy head:**
"dummy = ListNode(0)
dummy.next = head
curr = dummy
# ... operate on curr.next, never worry about null head
return dummy.next"

**Applications:**
- Merge two sorted lists: create a dummy, always append to dummy.next. Return dummy.next.
- Remove nth node from end: dummy avoids special case when removing the head.
- Reverse a linked list: build reversed list by inserting at dummy's next.
- Partition list: create two dummy heads, partition into two lists, connect.

**Two dummy heads:** for problems that split a list into two (partition, odd/even grouping), use two dummies — one for each partition. Connect them at the end.

**Key insight:** the dummy head pattern is essentially "pretend the list already has one element before it." This symmetry means your loop body handles all nodes the same way — no special-casing for the first or last node. When linked list code has lots of null checks, the dummy pattern usually eliminates them.`,
    },
    {
      id: 1425,
      name: "Fast & Slow Pointers",
      desc: `**Fast & Slow Pointers (Floyd's Algorithm)** — a two-pointer technique where one pointer advances one step at a time (slow) and another advances two steps (fast). They meet at a cycle entry point if a cycle exists.

**Cycle detection:** if there's a cycle, fast and slow will eventually meet inside the cycle (fast catches up at 1 step per move). If there's no cycle, fast reaches null first.

**Finding cycle entry point (Floyd's phase 2):** after detecting the meeting point, reset one pointer to head. Both advance one step at a time. They meet at the cycle entry — provable by modular arithmetic.

**Middle of linked list:** slow = head, fast = head. When fast reaches the end (or fast.next = null), slow is at the middle.
- n odd: fast.next == null when slow is at (n//2 + 1)th node
- n even: fast == null when slow is at n//2 th node (first of two middles)

**Linked list length:** count steps until fast reaches null (counting fast pointer).

**Applications:**
- Linked list cycle detection and entry (Floyd's)
- Palindrome linked list: find middle, reverse second half, compare
- Happy number: cycle detection on the sequence of digit-square sums
- Reorder list: find middle, reverse second half, interleave

**Key insight:** fast/slow pointers solve O(1) space cycle detection — the only alternative is an O(n) hash set. Floyd's algorithm is elegant because it needs no extra memory and the phase 2 proof (why the two pointers meet at the cycle entry) is beautifully non-obvious.`,
    },
    {
      id: 1426,
      name: "Reversing a Linked List",
      desc: `**Linked List Reversal** — a fundamental operation requiring only O(1) extra space, implemented iteratively by maintaining three pointers: prev, curr, next.

**Iterative reversal:**
"prev = None
curr = head
while curr:
    next_node = curr.next  # save next
    curr.next = prev        # reverse pointer
    prev = curr             # advance prev
    curr = next_node        # advance curr
return prev  # new head"

**Recursive reversal:**
"def reverse(head):
    if not head or not head.next:
        return head
    new_head = reverse(head.next)
    head.next.next = head
    head.next = None
    return new_head"

Recursive reversal is O(n) space (call stack) — avoid for long lists.

**Partial reversal (reverse from position l to r):** use dummy head, traverse to l-1, reverse exactly r-l+1 nodes, reconnect.

**Applications:**
- Palindrome linked list check: reverse second half, compare with first half, reverse back
- Reverse k-group: reverse every k nodes (Leetcode hard)
- Rotate list: find new tail, cut and reconnect

**Key insight:** linked list reversal is asked in nearly every interview because it's simple to state but requires precise pointer manipulation. The three-pointer pattern (prev, curr, next) must be memorized and drawable from memory. The mistake is always losing a pointer before saving it — always save next_node first.`,
    },
    {
      id: 1427,
      name: "Merging Linked Lists",
      desc: `**Merging Linked Lists** — combining two or more sorted linked lists into one sorted list, a core operation in merge sort and many other algorithms.

**Merge two sorted lists:** use a dummy head, compare heads of both lists, append the smaller one, advance that list's pointer. O(n+m) time, O(1) space.

"dummy = ListNode(0); curr = dummy
while l1 and l2:
    if l1.val <= l2.val: curr.next = l1; l1 = l1.next
    else: curr.next = l2; l2 = l2.next
    curr = curr.next
curr.next = l1 or l2  # attach remaining
return dummy.next"

**Merge k sorted lists:** two approaches:
- **Divide & conquer:** merge pairs of lists, then pairs of merged results. O(n log k) where n = total nodes, k = number of lists. Same structure as merge sort.
- **Min-heap:** push head of each list into a min-heap of (value, list_index). Pop minimum, push its next. O(n log k) — each push/pop is O(log k), done n times.

**Why min-heap for k lists:** when k is large (k = 1000 lists), the divide-and-conquer requires O(n log k) passes. A min-heap gives the same complexity with simpler implementation.

**Key insight:** merging sorted linked lists is the "combine" step of merge sort. Understanding it deeply (including the k-way merge) is essential for external merge sort — the algorithm used when data doesn't fit in RAM and must be sorted from disk.`,
    },
    {
      id: 1428,
      name: "Linked List Sorting",
      desc: `**Linked List Sorting** — sorting algorithms adapted for linked lists, where random access is O(n) and swapping is pointer manipulation rather than value copying.

**Merge sort on linked lists:** the preferred O(n log n) sorting algorithm for linked lists. No arrays needed, O(1) auxiliary space (just pointers), stable, and works naturally with linked list's strengths.
1. Find middle (fast/slow pointers)
2. Recursively sort each half
3. Merge the sorted halves (O(n), O(1) space)

**Insertion sort on linked lists:** O(n²) but O(1) space and stable. Good for nearly-sorted lists (where it's O(n) adaptive). Build a sorted list by inserting each element in its correct position.

**Why not quicksort on linked lists:** pivot selection is hard (no O(1) random access to find median). Partition requires O(n) traversal. Performance advantage of quicksort (cache efficiency) disappears for linked lists. Merge sort is the correct choice.

**Converting to array for sort:** for small lists or when you have the luxury of O(n) extra space, extract values to array, sort, write back. Code is simpler. Only works if values fit in memory.

**Key insight:** the inability to random access makes quicksort impractical for linked lists. Merge sort is uniquely well-suited because its "divide" step (finding the middle) and "combine" step (merging) both work with pointer operations in O(n) time and O(1) space.`,
    },
    {
      id: 1429,
      name: "LRU Cache",
      desc: `**LRU Cache (Least Recently Used)** — a cache eviction policy that removes the least recently used item when capacity is exceeded. The classic data structure interview problem requiring O(1) get and O(1) put.

**Required operations:**
- **get(key):** return value if exists, else -1. Mark as recently used.
- **put(key, value):** insert or update. If at capacity, evict the least recently used.

**Implementation: doubly linked list + hash map:**
- **Hash map:** key → node reference for O(1) lookup
- **Doubly linked list:** maintains access order. Most recently used at head, least recently used at tail.
- On get: move node to head. On put: add node at head. On eviction: remove tail node.

"class LRUCache:
    def get(self, key):
        if key in self.map:
            self.move_to_head(self.map[key])
            return self.map[key].val
        return -1"

**Python shortcut:** "collections.OrderedDict" provides O(1) ordered insertion and move-to-end: "cache.move_to_end(key)" — implements LRU in 5 lines.

**LRU vs LFU:** LRU evicts by recency (time since last access). LFU (Least Frequently Used) evicts by frequency (total access count). LFU is more complex to implement in O(1) (requires another map of frequency → list of nodes at that frequency).

**Key insight:** LRU cache is the canonical example of combining two data structures to achieve O(1) for all operations. The hash map gives O(1) lookup; the doubly linked list gives O(1) insertion/deletion with maintained order. This "DS combination" pattern recurs in many advanced problems.`,
    },
    {
      id: 1430,
      name: "Skip Lists",
      desc: `**Skip List** — a probabilistic data structure that provides O(log n) average search, insertion, and deletion using multiple layers of linked lists. An alternative to balanced BSTs with simpler implementation and better concurrent performance.

**Structure:** multiple levels of linked lists on the same elements. Bottom level contains all elements. Each higher level contains a random subset (~50%) of the level below. Top level has very few elements.

**Search:** start at top-left. Move right until next value exceeds target, then drop one level. Repeat until bottom level. Expected O(log n) levels traversed.

**Insertion:** find the correct position at each level, insert with probability 1/2 of adding to the next level (coin flip). Expected O(log n) levels.

**Why probabilistic:** instead of complex rotations (like AVL or Red-Black trees) to maintain balance, skip lists use randomization to achieve expected O(log n) performance. Simpler to implement and reason about.

**Redis sorted sets:** Redis's primary sorted data structure is a skip list (with a hash map for O(1) lookup). Supports O(log n) rank queries, range queries by score, and O(1) hash lookups — a compelling real-world use case.

**Skip list vs balanced BST:** comparable asymptotic performance. Skip lists are simpler to implement, easier to make lock-free for concurrent access, and support range queries well. BSTs (especially B-trees) have better cache performance.

**Key insight:** skip lists demonstrate that probabilistic algorithms can match deterministic ones in expected performance with much simpler implementation. The "expected O(log n)" comes from the expected number of levels (log n) and the expected horizontal distance at each level.`,
    },
    {
      id: 1431,
      name: "Linked List Edge Cases",
      desc: `**Linked List Edge Cases** — the specific scenarios that break linked list algorithms, responsible for most bugs in interviews and production code.

**The critical edge cases:**
- **Empty list (head = null):** every operation must check this first.
- **Single node list:** operations like "find middle," "detect cycle," "reverse" all have edge cases when n = 1.
- **Two-node list:** reversal and cycle detection often fail at n = 2.
- **Cycle involving the head:** Floyd's phase 2 must handle when cycle entry = head.
- **Equal-length vs different-length lists:** merging, intersection finding.

**Null pointer before advancing:** the most common bug is advancing a pointer (curr = curr.next) without first checking curr is not null. "if curr.next and curr.next.val == target" not "if curr.next.val == target".

**The "off by one" in fast/slow for middle:** does "fast.next == null" or "fast == null" give you the first or second middle for even-length lists? This matters for palindrome check (you need the second half to start at the right node).

**Reconnecting after modification:** after reversing a sublist, forgetting to connect the predecessor's next to the new head, or the new tail's next to the successor, creates a broken list.

**Key insight:** when implementing a linked list algorithm, explicitly trace through: (1) empty list, (2) one node, (3) two nodes, (4) n nodes. If your code handles all four, it likely handles everything. The single-node and two-node cases catch most bugs.`,
    },
    {
      id: 1432,
      name: "Intersection & nth From End",
      desc: `**Linked List Intersection & nth From End** — two classic problems that showcase elegant O(1) space techniques.

**Find intersection node (two lists meet at same node):**
- Naive: hash all nodes of list A; check each node of list B. O(n+m) time, O(n) space.
- O(1) space trick: traverse both lists. When reaching the end of one, redirect to the head of the other. Both pointers will have traveled the same total distance (len_A + len_B) when they meet at the intersection (or both reach null if no intersection).

"a, b = headA, headB
while a != b:
    a = a.next if a else headB
    b = b.next if b else headA
return a"

**Find nth node from end:**
- Two-pass: count length L, then traverse to (L - n)th node. O(n) space-free.
- One-pass: advance fast pointer n steps ahead. Then advance both until fast reaches end. Slow is at the target.

**Remove nth from end:** same technique, but use a dummy head so the "prev" pointer of the target node is always accessible (even when removing the head node).

**Key insight:** the intersection trick is beautiful — it works because a + b = b + a. After traversing their respective lists, both pointers have traveled the same distance, so if they'll ever meet (at the intersection), they must meet at the same step. This is an O(1) space solution to a problem that seems to require a hash set.`,
    },
  ],
};

export default linkedLists;
