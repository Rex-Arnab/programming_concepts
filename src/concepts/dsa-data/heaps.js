const heaps = {
  name: "Heaps & Priority Queues",
  icon: "⛰️",
  color: "#f59e0b",
  concepts: [
    {
      id: 1457,
      name: "Binary Heap Properties",
      desc: `**Binary Heap** — a complete binary tree (filled left-to-right at every level) satisfying the heap property: in a max-heap, every parent ≥ its children; in a min-heap, every parent ≤ its children. The root always holds the global min (or max).

**Completeness property:** ensures the tree has height O(log n) and can be stored efficiently in an array without pointers. The last level fills left-to-right.

**Heap vs BST:** both are tree-based, but different properties and trade-offs:
| Property | Heap | BST |
|---|---|---|
| Find min/max | O(1) | O(log n) |
| Search arbitrary | O(n) | O(log n) |
| Insert | O(log n) | O(log n) |
| Delete min/max | O(log n) | O(log n) |
| Sorted iteration | O(n log n) | O(n) inorder |

**Heap applications:** priority queues, heap sort, Dijkstra's algorithm, Prim's MST, top-k problems, median finder.

**d-ary Heaps:** instead of 2 children per node, use d children. Smaller height O(log_d n), but sift-down compares d children → O(d log_d n) per operation. For d=4, decreases the number of cache misses in sift-down at the cost of more comparisons per level. Used in some Dijkstra implementations.

**Key insight:** the heap's O(1) min/max is its superpower. Whenever you need to repeatedly find and remove the minimum (or maximum) element from a dynamic set, a heap is the right choice. This pattern — "process in priority order" — appears in Dijkstra, Prim, Huffman coding, and scheduling algorithms.`,
    },
    {
      id: 1458,
      name: "Heap Operations",
      desc: `**Heap Operations** — the core operations that maintain the heap property after modifications.

**Sift-up (bubble-up):** after inserting at the end, compare with parent. If heap property violated, swap with parent. Repeat until heap property holds or root is reached. O(log n).

**Sift-down (heapify-down):** after removing the root (replace with last element), compare with children. Swap with the smaller child (min-heap) or larger child (max-heap). Repeat until property holds or leaf. O(log n).

**Build heap (heapify-all):** given an unsorted array, build a heap in O(n):
"for i in range(n//2 - 1, -1, -1):
    sift_down(arr, i, n)"
Start from the last internal node (n//2 - 1) and sift down each. Total work = O(n) by summing geometric series (most nodes are near leaves with little work).

**Why O(n) build-heap beats n × O(log n) insertions:** inserting n elements one by one costs O(n log n). Build-heap is O(n) — the bottom half of nodes (leaves) require zero sift-down work, the quarter above them require 1 swap max, etc. The sum converges to O(n).

**Decrease-key:** update a node's value to a smaller value (min-heap), then sift-up. O(log n). Requires knowing the node's position in the heap — standard heaps don't support this directly. Fibonacci heaps support amortized O(1) decrease-key, enabling O(E + V log V) Dijkstra.

**Key insight:** build-heap's O(n) complexity is non-obvious but important. It's why "heapify an existing list" is faster than "insert elements one by one." Python's heapq.heapify() runs in O(n) for exactly this reason.`,
    },
    {
      id: 1459,
      name: "Top-K Problems",
      desc: `**Top-K Problems** — finding the k largest (or smallest) elements from a collection, a ubiquitous interview pattern solvable in O(n log k) with a heap.

**Approach 1 — Min-heap of size k (for k largest):**
"heap = []
for num in nums:
    heapq.heappush(heap, num)
    if len(heap) > k:
        heapq.heappop(heap)  # remove smallest
return list(heap)  # contains k largest"
Complexity: O(n log k). Space: O(k). Streaming-compatible.

**Approach 2 — Sort:** sort in O(n log n), take last k. Simpler code, worse complexity. Good when k ≈ n.

**Approach 3 — QuickSelect:** O(n) average for kth element (then partition once more for k elements). O(n²) worst case (bad pivots). Use when k is 1 or you need the exact kth element (not the full list).

**K closest points to origin:** O(n log k) with max-heap of size k. Compare squared distances (avoid sqrt).

**Top-K frequent elements:** frequency count (O(n)), then top-k by frequency using heap (O(n log k)). Or use "bucket sort" by frequency for O(n).

**Kth largest in a stream:** maintain a min-heap of size k. Each new element: if heap size < k, push. If new element > heap[0] (min), pop and push. heap[0] is always the kth largest.

**Key insight:** the core insight for top-k with a heap: "use a min-heap of size k for top-k largest." The min-heap's minimum is the 'weakest' element — it gets evicted when a stronger element arrives. Counterintuitive but correct: min-heap for max results.`,
    },
    {
      id: 1460,
      name: "Median in Data Stream",
      desc: `**Median of a Data Stream** — find the median of a dynamically growing stream of numbers with O(log n) insert and O(1) median query. The classic two-heap problem.

**Two-heap approach:**
- **Max-heap (lower half):** stores the smaller half of numbers. Max-heap so we can quickly get the largest of the small half.
- **Min-heap (upper half):** stores the larger half of numbers. Min-heap so we can quickly get the smallest of the large half.
- Invariant: max_heap.size == min_heap.size (even n) or max_heap.size == min_heap.size + 1 (odd n)

**Add number:**
"def addNum(self, num):
    heapq.heappush(self.low, -num)  # max-heap via negation
    heapq.heappush(self.high, -heapq.heappop(self.low))  # balance
    if len(self.high) > len(self.low):
        heapq.heappush(self.low, -heapq.heappop(self.high))"

**Get median:**
"def findMedian(self):
    if len(self.low) > len(self.high):
        return -self.low[0]
    return (-self.low[0] + self.high[0]) / 2"

**Extensions:**
- Sliding window median: same approach but with removal (hard — requires lazy deletion)
- Weighted median: weight each element, find the point where cumulative weight crosses 0.5
- Order statistics (kth quantile): generalize by maintaining 1/k split instead of 1/2

**Key insight:** the two-heap approach elegantly maintains the sorted partition without actually sorting. The max-heap and min-heap together act like a "split sorted list" — the boundary between them is the median. Any element that crosses the boundary is rebalanced by swapping across the heaps.`,
    },
    {
      id: 1461,
      name: "Heap Sort",
      desc: `**Heap Sort** — an O(n log n) worst-case, O(1) space, in-place comparison sort using a max-heap.

**Algorithm:**
1. Build max-heap from array: O(n)
2. Repeatedly extract max (swap root with last element, heapify-down, reduce heap size): n × O(log n) = O(n log n)
3. Result: sorted array (ascending) in-place

"def heap_sort(arr):
    n = len(arr)
    # Build max-heap
    for i in range(n//2 - 1, -1, -1):
        sift_down(arr, i, n)
    # Extract elements one by one
    for i in range(n-1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]  # swap max to end
        sift_down(arr, 0, i)              # heapify reduced heap"

**Heap sort vs Quick sort vs Merge sort:**
| Property | Heap | Quick | Merge |
|---|---|---|---|
| Worst case | O(n log n) | O(n²) | O(n log n) |
| Average case | O(n log n) | O(n log n) | O(n log n) |
| Space | O(1) | O(log n) stack | O(n) |
| Stable | No | No | Yes |
| Cache performance | Poor | Excellent | Good |

**Why quick sort beats heap sort in practice:** heap sort accesses memory in non-sequential patterns (sift-down jumps between levels), causing cache misses. Quick sort accesses memory sequentially in partitioning, fitting well in CPU cache lines.

**Key insight:** heap sort is the "theoretically optimal but practically suboptimal" sort. O(n log n) worst case (unlike quicksort) and O(1) space (unlike mergesort) — but cache-unfriendly. The introsort algorithm (used in C++ std::sort) uses quicksort with a fallback to heapsort when recursion depth exceeds log n, getting the best of both worlds.`,
    },
    {
      id: 1462,
      name: "Kth Smallest in Matrix",
      desc: `**Kth Smallest Element in a Sorted Matrix** — a matrix where each row and column is sorted in ascending order. Find the kth smallest element.

**Approach 1 — Min-heap:** push all first-column elements. Pop min, push its right neighbor (if any). Repeat k times. O(k log n) where n = number of rows. Works for any "virtual sorted list" defined by a next-element function.

**Approach 2 — Binary search on value range:** binary search on the value space [matrix[0][0], matrix[n-1][n-1]]. Count elements ≤ mid in O(n) using sorted row properties (binary search each row or start from top-right corner). Find the smallest value where count ≥ k. O(n log(max-min)).

**Generalization — Kth smallest in m sorted arrays:** use a min-heap with tuples (value, array_index, element_index). Pop the min and push the next element from the same array. O(k log m). This is the merge-k-sorted-arrays pattern.

**Kth smallest pair (i,j) with i < j:** if pairs are implicitly defined (e.g., all pairs with sum = nums1[i] + nums2[j]), use a heap to lazily enumerate pairs in order.

**Key insight:** many "kth smallest" problems are solved by recognizing that you're merging multiple sorted sequences. A min-heap of size = number of sequences lazily enumerates elements in sorted order. After k extractions, you have your answer. This unifies matrix problems, sorted array problems, and implicit-sequence problems.`,
    },
    {
      id: 1463,
      name: "Lazy Deletion in Heaps",
      desc: `**Lazy Deletion** — a technique for removing arbitrary elements from a heap in O(log n) without rebuilding it, by marking elements as "deleted" and skipping them during extraction.

**Problem:** standard heaps support O(log n) deletion of the root only. Deleting an arbitrary element requires finding it first (O(n)) then restoring heap property (O(log n)). For sliding window median, task scheduling with cancellation, or Dijkstra with vertex re-relaxation, you need arbitrary deletion.

**Lazy deletion approach:**
- Maintain a "to_delete" counter map or set
- When an element should be deleted, add it to the to_delete set (don't remove from heap)
- On extract (pop): if top element is in to_delete, pop it and skip; repeat until top is valid

"def pop_valid(heap, to_delete):
    while heap and heap[0] in to_delete:
        to_delete[heap[0]] -= 1
        if to_delete[heap[0]] == 0:
            del to_delete[heap[0]]
        heapq.heappop(heap)
    return heapq.heappop(heap) if heap else None"

**Sliding window maximum with lazy heap:** maintain a max-heap (via negation). When the window slides, "delete" the element that left the window lazily.

**Dijkstra's implicit lazy deletion:** standard Dijkstra pushes updated (smaller distance, node) pairs without removing the old one. When popping, if the distance doesn't match the current shortest, skip (lazy delete).

**Key insight:** lazy deletion trades space (the deleted elements remain in the heap) for simplicity and speed. The heap may temporarily be larger than necessary, but each element is deleted at most once, keeping amortized O(log n) per operation.`,
    },
    {
      id: 1464,
      name: "Dijkstra's Algorithm",
      desc: `**Dijkstra's Algorithm** — finds the shortest path from a source node to all other nodes in a graph with non-negative edge weights. Uses a min-heap priority queue to greedily process nodes in order of current shortest distance.

**Algorithm:**
"dist = {node: infinity for node in graph}; dist[src] = 0
heap = [(0, src)]  # (distance, node)
while heap:
    d, u = heapq.heappop(heap)
    if d > dist[u]: continue  # outdated entry (lazy deletion)
    for v, weight in graph[u]:
        if dist[u] + weight < dist[v]:
            dist[v] = dist[u] + weight
            heapq.heappush(heap, (dist[v], v))"

**Complexity:**
- With binary heap: O((V + E) log V)
- With Fibonacci heap: O(E + V log V) — theoretically better for dense graphs
- Binary heap is preferred in practice due to simpler implementation

**Why non-negative weights only:** negative edges violate the greedy assumption. A node already processed as "shortest" could be improved via a negative edge discovered later. Use Bellman-Ford for negative edges.

**Dijkstra variants:**
- **Single target:** stop when target is popped
- **Bidirectional Dijkstra:** run from both source and target, stop when frontiers meet — ~2x speedup
- **Dijkstra on a grid:** 4-directional movement, each cell has a weight

**Key insight:** Dijkstra's correctness relies on the invariant: when a node is popped from the priority queue, its recorded distance is final (the true shortest distance). This works because all future paths to this node go through nodes with equal or greater current distance.`,
    },
    {
      id: 1465,
      name: "Huffman Coding",
      desc: `**Huffman Coding** — a greedy algorithm for lossless data compression that assigns shorter binary codes to more frequent characters. Produces an optimal prefix-free code: no code is a prefix of another, enabling unambiguous decoding.

**Algorithm:**
1. Count character frequencies
2. Build a min-heap of (frequency, character) leaf nodes
3. Greedily: pop two nodes with lowest frequency, merge into a new internal node (frequency = sum of children), push back
4. Repeat until one node remains (the root)
5. Assign codes by traversing the tree: left = 0, right = 1

**Correctness (greedy proof):** the two least frequent characters should have the longest codes (deepest in the tree). Swapping any more-frequent character to the deeper position increases total encoded length. Therefore, the greedy merge of two smallest is always optimal.

**Code properties:**
- Variable-length encoding (vs fixed 8-bit ASCII)
- Prefix-free: codes can be uniquely decoded by scanning left-to-right
- Optimal: no other prefix-free code has a smaller average code length

**Used in:** zlib, gzip, PNG, JPEG (for DC coefficients), HTTP/2 header compression (HPACK uses Huffman), DEFLATE.

**Key insight:** Huffman coding is the classic greedy algorithm where a priority queue drives the solution. The greedy choice — always merge the two least frequent nodes — leads to the globally optimal tree. The tree structure is the code: path from root to leaf encodes the character.`,
    },
    {
      id: 1466,
      name: "Prim's & Task Scheduling",
      desc: `**Prim's Algorithm & Task Scheduling** — two important applications of heaps beyond shortest paths.

**Prim's MST (Minimum Spanning Tree):**
- Start with any node, add it to the MST
- Maintain a min-heap of edges from MST to non-MST nodes
- Greedily: extract the minimum weight edge that connects a new node to the MST
- Add the new node, update the heap with its edges
- O((V + E) log V) with a binary heap

**Prim vs Kruskal:**
- Prim: grow one tree from a start, using a heap — good for dense graphs
- Kruskal: sort all edges, use Union-Find — good for sparse graphs, simpler code

**Task Scheduling (CPU Task Scheduler):**
- Given tasks with frequencies, schedule with n cooldown between same tasks
- Greedy: always schedule the most frequent remaining task
- Min-heap tracks (next_available_time, remaining_count) per task type
- Or: maximum frequency task determines idle slots (formula-based O(n) solution)

**Meeting Rooms II (minimum rooms needed):**
- Sort meetings by start time
- Min-heap of end times: pop meetings that have ended, push current meeting's end time
- Heap size at any point = rooms in use = answer when maximized

**Key insight:** "minimum number of X needed to handle Y events" is often a min-heap problem. Sort events by start time, maintain a heap of end times for ongoing events, greedily reuse the earliest-ending resource.`,
    },
  ],
};

export default heaps;
