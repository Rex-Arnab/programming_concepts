const arraysStrings = {
  name: "Arrays & Strings",
  icon: "📋",
  color: "#3b82f6",
  concepts: [
    {
      id: 1411,
      name: "Arrays",
      desc: `**Array** — a contiguous block of memory holding elements of the same type, indexed by integer offsets. The most fundamental and cache-friendly data structure in computing.

**Memory layout:** elements are stored back-to-back. Array element access is O(1) because: address = base_address + (index × element_size). No pointer chasing, no cache misses (unlike linked lists).

**Static vs dynamic arrays:** static arrays have fixed size set at creation (C arrays, Java int[]). Dynamic arrays (Python lists, Java ArrayList, C++ vector) resize automatically by allocating a new larger array and copying. Amortized O(1) append.

**Resizing strategy:** typically double capacity when full. Doubling ensures O(1) amortized append because each element is copied at most log n times across all resizes. Shrinking on removal is less common (often waits until size < capacity/4).

**Cache efficiency:** iterating an array sequentially is the most cache-friendly operation in computing. CPU prefetcher loads ahead. Linked list traversal causes a cache miss per node; array traversal causes a cache miss per cache line (~64 bytes / element_size elements).

**Key insight:** if your algorithm accesses data sequentially and performance matters, prefer arrays over linked lists. The constant factor difference is often 5-10x due to cache behavior — Big O notation doesn't capture this, but profiling will.`,
    },
    {
      id: 1412,
      name: "Two Pointers Technique",
      desc: `**Two Pointers** — a technique where two indices traverse an array (or string) in a coordinated way to solve problems in O(n) that would naively require O(n²) nested loops. One of the most common patterns in array/string interviews.

**Variants:**
- **Opposite ends:** left starts at 0, right at n-1, move toward each other. Used for: two-sum in sorted array, palindrome check, container with most water, trapping rain water.
- **Same direction (fast/slow):** one pointer moves faster. Used for: removing duplicates in-place, detecting cycles (Floyd's algorithm), finding middle of linked list.
- **Sliding window:** two pointers define a window; expand right, shrink left. Used for: longest substring without repeating characters, minimum window substring.

**Prerequisite:** usually requires a sorted array or exploits a monotone property. Two pointers work because moving one pointer changes the state in a predictable direction.

**Example — two sum in sorted array:** if nums[left] + nums[right] < target, left++ (increase sum). If > target, right-- (decrease sum). Each step eliminates an entire row/column of the search space.

**Key insight:** whenever you see a nested loop that checks pairs (i, j) in a sorted structure, ask "can two pointers eliminate one dimension?" It almost always can, dropping O(n²) to O(n).`,
    },
    {
      id: 1413,
      name: "Sliding Window",
      desc: `**Sliding Window** — a technique for finding subarrays or substrings satisfying a condition in O(n) by maintaining a window (defined by left and right pointers) that expands and contracts rather than restarting from scratch.

**Fixed-size window:** right - left + 1 = k. Both pointers advance together. Used for: maximum sum subarray of size k, average of all subarrays of size k.

**Variable-size window:** expand right, shrink left when constraint is violated. Used for: longest substring with at most k distinct characters, minimum window substring, longest subarray with sum ≤ target.

**Template:**
"left = 0
for right in range(n):
    # add nums[right] to window
    while window_violates_constraint:
        # remove nums[left] from window
        left += 1
    # update answer with current window"

**Why O(n):** each element enters the window once (right++) and leaves once (left++). Total operations = 2n = O(n). This is the key insight: we avoid restarting the inner loop by maintaining incremental state.

**Key insight:** sliding window replaces "for each starting position, scan forward" (O(n²)) with "maintain a valid window, never go backward." The trick is always: what invariant does your window maintain, and how do you efficiently update when adding/removing an element?`,
    },
    {
      id: 1414,
      name: "Prefix Sums",
      desc: `**Prefix Sum** — a precomputed array where prefix[i] = sum of all elements from index 0 to i. Enables O(1) range sum queries after O(n) preprocessing, instead of O(n) per query.

**Construction:** prefix[0] = nums[0]; prefix[i] = prefix[i-1] + nums[i].
**Range sum query:** sum(l, r) = prefix[r] - prefix[l-1] (or prefix[r] - prefix[l] with off-by-one handled carefully).

**2D prefix sums:** extend to matrices for O(1) rectangle sum queries after O(n²) preprocessing. Essential in image processing (integral images, used in Viola-Jones face detection).

**Prefix XOR / prefix product:** the same technique applies to XOR (subarray XOR queries) and products (but watch for zeros).

**Applications:**
- Count subarrays with sum = k: use a hash map counting prefix sums, incrementally check if prefix[i] - k exists in the map — O(n).
- Number of subarrays with sum ≤ k: combine with two pointers or binary search.
- Equilibrium index: find i where prefix sum of left = suffix sum of right.

**Key insight:** if a problem asks about subarray properties (sum, XOR, product) over many queries, prefix sums convert each query from O(n) to O(1) with a single O(n) preprocessing pass. The pattern generalizes to any associative, invertible operation.`,
    },
    {
      id: 1415,
      name: "Sorting Techniques for Arrays",
      desc: `**Sorting Techniques** — a collection of patterns that leverage sorted order to solve problems more efficiently than brute force.

**Sort-then-solve:** sorting an array or a collection of pairs often unlocks a simpler algorithm. Interval problems (merge overlapping intervals, meeting rooms): sort by start time → single pass to merge. Two-sum in unsorted array → sort + two pointers.

**Custom comparators:** sort by secondary key, or by computed value. Largest number from an array of integers: sort strings by concatenation order ("9" > "90" because "990" > "909"). Meeting rooms: sort by end time for greedy interval scheduling.

**Frequency sorting:** count occurrences → sort by frequency. Top k frequent elements, sort characters by frequency.

**Partial sorts:** if you only need the top k elements, use a heap instead of full sort. O(n log k) vs O(n log n). QuickSelect finds the kth smallest in O(n) average without fully sorting.

**Stability matters:** when sorting objects by one key after already sorting by another, a stable sort preserves the prior ordering among ties. Python's sort (Timsort) is stable; this is often relied upon.

**Key insight:** "can I sort first?" is one of the most powerful questions in algorithm design. O(n log n) preprocessing often unlocks O(n) solutions, making the overall complexity O(n log n) instead of O(n²).`,
    },
    {
      id: 1416,
      name: "Binary Search on Arrays",
      desc: `**Binary Search** — an O(log n) search algorithm for sorted arrays that repeatedly halves the search space by comparing the target to the middle element.

**Invariant:** at every step, the target (if it exists) is within the range [left, right]. Move left or right based on mid comparison, maintaining the invariant.

**Template (left-inclusive, right-exclusive):**
"left, right = 0, len(arr)
while left < right:
    mid = left + (right - left) // 2  # avoid overflow
    if arr[mid] < target:
        left = mid + 1
    else:
        right = mid
return left"

**Binary search variations:**
- **Find leftmost occurrence:** use "else: right = mid" (standard template)
- **Find rightmost occurrence:** use "if arr[mid] <= target: left = mid + 1" then return left - 1
- **Search in rotated sorted array:** determine which half is sorted, binary search that half
- **Binary search on the answer:** when the answer has a monotone property (feasible vs not), binary search on the answer space rather than the array

**Common bugs:** off-by-one errors in boundary conditions. Always verify: does left < right or left <= right terminate correctly? Does mid = (left + right) // 2 cause integer overflow in other languages?

**Key insight:** binary search applies anywhere there's a monotone predicate — not just sorted arrays. "Find the minimum bandwidth that satisfies this constraint" → binary search on bandwidth. This generalization is extremely powerful.`,
    },
    {
      id: 1417,
      name: "Kadane's Algorithm",
      desc: `**Kadane's Algorithm** — finds the maximum sum contiguous subarray in O(n) time and O(1) space. One of the most elegant DP-on-array examples.

**Core insight:** at each position i, the maximum subarray ending at i is either: (a) just nums[i] alone, or (b) the maximum subarray ending at i-1, extended by nums[i]. So: max_ending_here = max(nums[i], max_ending_here + nums[i]).

**Implementation:**
"max_sum = max_ending_here = nums[0]
for num in nums[1:]:
    max_ending_here = max(num, max_ending_here + num)
    max_sum = max(max_sum, max_ending_here)"

**Extensions:**
- **Track indices:** store start/end when updating max_sum for reconstruction
- **Maximum product subarray:** track both max and min ending here (negative × negative = positive)
- **Circular array:** max of (Kadane's result, total_sum - min_subarray_sum)
- **At most k elements:** add a constraint, use deque for O(n log n) solution

**Why it works:** resetting max_ending_here to nums[i] when it goes negative corresponds to "starting a fresh subarray is better than extending a negative-sum one."

**Key insight:** Kadane's is the canonical example of optimal substructure in a linear DP. The decision at each step — extend or restart — is the key insight. This pattern (1D DP with local reset) recurs in many problems.`,
    },
    {
      id: 1418,
      name: "Strings & String Algorithms",
      desc: `**String Fundamentals** — strings are sequences of characters, typically immutable in high-level languages (Python, Java). String operations that seem O(1) are often O(n) — concatenation in a loop is O(n²); use StringBuilder or join() instead.

**Key string operations and complexities:**
- Length: O(1) (stored)
- Indexing: O(1)
- Substring: O(k) where k is substring length (copying)
- Concatenation: O(n+m) — builds new string
- Contains / indexOf: O(n·m) naive, O(n+m) with KMP or Rabin-Karp

**StringBuilder pattern:** concatenating strings in a loop: "result = ''; for x in items: result += x" is O(n²). Use "''.join(items)" in Python — O(n). This is a famous gotcha.

**Character frequency with hash map:** "How many distinct characters?", "Is string an anagram?", "First non-repeating character?" → count character frequencies in O(n), then query in O(1).

**String as character array:** for in-place string manipulation (reverse, remove characters), convert to char array, operate, then join. Needed in languages with immutable strings.

**Key insight:** in interviews, treat strings as arrays of characters when you need in-place operations. The "sliding window on strings" pattern (find smallest window containing all characters of t) is one of the most frequently asked hard-string problems — practice it.`,
    },
    {
      id: 1419,
      name: "Hashing for Array Problems",
      desc: `**Hashing in Array Problems** — using a hash map or hash set to solve array problems in O(n) that would require O(n²) with nested loops. The "think hash map" heuristic solves a huge class of interview problems.

**Classic hash map patterns:**

**Two Sum:** "Do any two elements sum to target?" → store seen values in a set, check if target - num exists. O(n) time, O(n) space vs O(n²) brute force.

**Frequency counting:** "Count occurrences of each element" → hash map from value → count. Foundation for: top-k frequent, anagram grouping, majority element.

**Complement / inverse lookup:** "Does this value's complement exist?" Applies to two-sum, number of pairs with given XOR, subarray sum equals k.

**Index storage:** store value → index in map. Useful when you need to find elements later: "longest consecutive sequence" — store all values in a set, start sequences only at their beginning.

**Grouping by key:** "Group anagrams together" → key is sorted string or character frequency tuple. One pass through words → O(n·k) where k is word length.

**Key insight:** whenever you see O(n²) from "for each element, search for its pair," ask "can I store what I've seen and look it up?" Hash maps turn O(n) search into O(1) average lookup, often transforming the entire algorithm from O(n²) to O(n).`,
    },
    {
      id: 1420,
      name: "Matrix & 2D Array Techniques",
      desc: `**Matrix Algorithms** — a grid of values accessed by (row, col) pairs. Many graph and DP problems are expressed on 2D grids.

**Matrix traversal patterns:**
- **Row-by-row:** cache-friendly in row-major storage (C, Python NumPy). Column-by-column is cache-unfriendly.
- **Spiral traversal:** maintain four boundaries (top, bottom, left, right), rotate through them.
- **Diagonal traversal:** row + col = constant for anti-diagonals; row - col = constant for diagonals.

**BFS/DFS on grids:** graphs represented as grids (islands, shortest path, flood fill). Use 4-directional (up/down/left/right) or 8-directional movement. Mark visited cells in-place (or use a visited set) to avoid revisiting.

**Matrix rotation:** rotate 90° in-place: transpose then reverse each row. Rotate 180°: reverse rows then columns. Understanding why this works requires visualizing the transformation.

**Sparse matrices:** most entries are zero. Store as list of (row, col, value) tuples or compressed sparse row (CSR) format. Avoids O(n²) storage for n²-element sparse matrices.

**Key insight:** grid BFS for shortest path is extremely common in interviews. Template: start from source(s), BFS layer by layer, each layer represents one step. Multi-source BFS (start from all sources simultaneously) is a crucial optimization for "distance to nearest X" problems.`,
    },
    {
      id: 1421,
      name: "Bit Manipulation",
      desc: `**Bit Manipulation** — using bitwise operators (&, |, ^, ~, <<, >>) to solve problems faster or more elegantly, often achieving O(1) operations that would otherwise require O(n) loops.

**Essential operations:**
- Check if bit i is set: "(n >> i) & 1"
- Set bit i: "n | (1 << i)"
- Clear bit i: "n & ~(1 << i)"
- Toggle bit i: "n ^ (1 << i)"
- Check power of 2: "n & (n-1) == 0" (clears lowest set bit)
- Count set bits: "bin(n).count('1')" or hardware popcount
- Isolate lowest set bit: "n & (-n)"

**XOR properties — the most useful tricks:**
- a ^ a = 0 (XOR with itself = 0)
- a ^ 0 = a (XOR with 0 = identity)
- XOR is commutative and associative

**Applications:**
- Find the single number in an array where everything else appears twice: XOR all elements — pairs cancel, single remains. O(n) time, O(1) space.
- Subset enumeration: all subsets of n elements can be represented as bit masks 0 to 2ⁿ-1.
- In-place swap without temp: a ^= b; b ^= a; a ^= b (works, but don't use in practice — confusing and has edge cases when a and b are same variable).

**Key insight:** bit manipulation solutions are often O(1) where others are O(n), but they sacrifice readability. Use them when performance matters or when the problem explicitly requires O(1) space with no data structures.`,
    },
    {
      id: 1422,
      name: "Monotonic Stack & Queue",
      desc: `**Monotonic Stack** — a stack that maintains elements in monotonically increasing or decreasing order by popping elements that violate the order when a new element is pushed. Enables O(n) solutions to "nearest greater/smaller element" problems.

**Monotonic decreasing stack:** pop when new element is greater than top. Each element is pushed once and popped once → O(n) total.

**Classic problems:**
- **Next Greater Element:** for each element, find the next element to its right that is larger. Use a decreasing stack: when we pop an element (because the new element is greater), the new element is its "next greater."
- **Largest Rectangle in Histogram:** use a stack to track bars with increasing heights. When a shorter bar is encountered, pop and compute area. O(n) solution to what seems like an O(n²) problem.
- **Trapping Rain Water:** water above index i = min(max_left[i], max_right[i]) - height[i]. Compute with two passes or with a stack.
- **Daily Temperatures:** next warmer day for each day.

**Monotonic Deque (sliding window maximum):** maintain a decreasing deque of indices. Remove from front if out of window; remove from back if smaller than current. Current max is always at front. O(n) for sliding window maximum vs O(n·k) naive.

**Key insight:** if the problem involves "find the nearest element that is larger/smaller to the left/right," immediately think monotonic stack. The O(n) solution with a stack beats the O(n²) nested loop by maintaining a carefully constrained window of "candidates."`,
    },
  ],
};

export default arraysStrings;
