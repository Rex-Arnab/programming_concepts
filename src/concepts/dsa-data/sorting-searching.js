const sortingSearching = {
  name: "Sorting & Searching",
  icon: "🔍",
  color: "#84cc16",
  concepts: [
    {
      id: 1491,
      name: "Comparison Sort Lower Bound",
      desc: `**Comparison Sort Lower Bound** — any comparison-based sorting algorithm requires Ω(n log n) comparisons in the worst case. This is a provable theoretical limit, not just a practical observation.

**Decision tree argument:** every comparison sort can be modeled as a binary decision tree where each internal node is a comparison (is A[i] < A[j]?) and each leaf is one of n! possible orderings. A tree with n! leaves must have height ≥ log₂(n!). By Stirling's approximation: log₂(n!) ≈ n log₂ n. Therefore, any comparison sort makes Ω(n log n) comparisons.

**Implications:**
- Merge sort, heap sort, quicksort (average) all achieve the optimal O(n log n) — they are asymptotically optimal comparison sorts.
- No comparison sort can be faster than O(n log n).
- But non-comparison sorts CAN be faster — they exploit additional structure.

**Non-comparison sorts (faster than O(n log n)):**
- **Counting sort:** O(n + k) where k = range of values. Only for small integer ranges.
- **Radix sort:** O(d × (n + k)) where d = number of digits, k = base. Linear for fixed-length integers.
- **Bucket sort:** O(n + k) average for uniformly distributed data.

**Key insight:** the Ω(n log n) lower bound is one of the most important theorems in CS — it proves that merge sort and heapsort are optimal, and no one can ever do fundamentally better for comparison-based sorting. When you see a claim of O(n) sorting without extra information about the input, it must use non-comparison-based techniques.`,
    },
    {
      id: 1492,
      name: "Quicksort",
      desc: `**Quicksort** — a divide-and-conquer sort that partitions the array around a pivot, then recursively sorts each partition. O(n log n) average, O(n²) worst case. The fastest comparison sort in practice due to excellent cache performance.

**Lomuto partition scheme:**
"def quicksort(arr, lo, hi):
    if lo < hi:
        pivot_idx = partition(arr, lo, hi)
        quicksort(arr, lo, pivot_idx - 1)
        quicksort(arr, pivot_idx + 1, hi)

def partition(arr, lo, hi):
    pivot = arr[hi]  # last element as pivot
    i = lo - 1  # boundary of smaller elements
    for j in range(lo, hi):
        if arr[j] <= pivot:
            i += 1; arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[hi] = arr[hi], arr[i+1]
    return i + 1"

**Worst case (O(n²)):** sorted or reverse-sorted input with first/last pivot selection. All elements go to one side → n levels of recursion, O(n) work each.

**Avoiding worst case:**
- **Random pivot:** shuffle array first, or pick random pivot. Reduces worst case probability to negligible.
- **Median-of-three:** pivot = median of first, middle, last. Good heuristic.
- **Introsort:** C++ std::sort — quicksort with heapsort fallback when depth > 2 log n. Guarantees O(n log n) worst case.

**3-way partitioning (Dutch National Flag):** handle many equal elements efficiently. Partition into < pivot, = pivot, > pivot. Array of equal elements sorts in O(n) with 3-way quicksort.

**Key insight:** quicksort's practical advantage over mergesort is cache efficiency. Quicksort operates in-place with sequential memory access patterns. Mergesort requires O(n) auxiliary space and less sequential access. For real data, quicksort is typically 30-40% faster.`,
    },
    {
      id: 1493,
      name: "Merge Sort",
      desc: `**Merge Sort** — a divide-and-conquer sort that splits the array in half, recursively sorts each half, then merges the sorted halves. O(n log n) guaranteed, O(n) auxiliary space, stable.

**Implementation:**
"def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []; i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]: result.append(left[i]); i += 1
        else: result.append(right[j]); j += 1
    return result + left[i:] + right[j:]"

**In-place merge sort:** possible but O(n log² n) due to in-place merge cost. Not commonly used — the space-time trade-off favors O(n) space.

**Bottom-up merge sort:** iterative version. Start with runs of size 1, merge pairs to size 2, then 4, 8, etc. Avoids recursion overhead. Used in Timsort.

**External merge sort:** for data too large for RAM. Sort chunks that fit in memory, write to disk, merge sorted runs from disk. Database sort operations use this.

**Counting inversions:** merge sort naturally counts inversions (pairs where i < j but arr[i] > arr[j]) — count right-half elements merged before left-half elements. O(n log n).

**Key insight:** merge sort's O(n log n) worst-case guarantee and stability make it the preferred choice when either property matters. Java's Arrays.sort for objects uses Timsort (adaptive merge sort). Python's built-in sort is Timsort. For linked lists, merge sort is optimal (O(1) auxiliary space with pointer-based merge).`,
    },
    {
      id: 1494,
      name: "Counting, Radix & Bucket Sort",
      desc: `**Non-Comparison Sorts** — sorting algorithms that don't compare elements directly, achieving O(n) or O(n log n) by exploiting structure in the input.

**Counting Sort:** for integers in range [0, k].
1. Count occurrences of each value: O(n)
2. Compute prefix sums (cumulative counts): O(k)
3. Place elements in output array by reading positions from prefix sums: O(n)
Total: O(n + k). When k = O(n), this is O(n).

**Radix Sort:** sort integers digit by digit from least significant to most significant.
- Sort by each digit (0-9) using a stable sort (counting sort for each digit)
- d passes where d = number of digits (log₁₀ max_value)
- Total: O(d × (n + 10)) = O(d × n)
- For 32-bit integers: d = 10 decimal digits, or d = 4 bytes → O(4n) = O(n)

**Bucket Sort:** distribute elements into k buckets based on value range, sort each bucket (insertion sort if small), concatenate.
- Average O(n) for uniform distribution (few elements per bucket)
- Worst case O(n²) if all elements in one bucket

**When to use each:**
- Counting sort: small integer range (k << n or k = O(n))
- Radix sort: fixed-length integers or strings (competitive programming, hardware)
- Bucket sort: floating point values in [0, 1] uniformly distributed

**Key insight:** "faster than O(n log n) sorting" isn't magic — it's using extra information (integer range, digit structure, uniform distribution). The extra information trades the comparison lower bound for a different complexity parameter.`,
    },
    {
      id: 1495,
      name: "Binary Search Variants",
      desc: `**Binary Search Variants** — beyond the basic "find target in sorted array," binary search has powerful generalizations for first/last occurrence, rotated arrays, and searching on the answer space.

**First occurrence of target:**
"lo, hi = 0, n - 1; result = -1
while lo <= hi:
    mid = (lo + hi) // 2
    if arr[mid] == target: result = mid; hi = mid - 1  # go left for first
    elif arr[mid] < target: lo = mid + 1
    else: hi = mid - 1"

**Last occurrence:** change "hi = mid - 1" to "lo = mid + 1" when found.

**Lower bound (first index ≥ target):** Python's bisect_left. Upper bound (first index > target): bisect_right.

**Search in rotated sorted array:** find which half is sorted (compare mid with lo), determine which half target falls in, recurse into that half.

**Find minimum in rotated sorted array:** binary search comparing mid with hi — if arr[mid] > arr[hi], minimum is in right half; else in left half.

**Binary search on the answer ("binary search the answer"):** when the answer has a monotone property (feasible below X, not feasible above X), binary search on X directly.
- "Find minimum speed to arrive on time": binary search on speed
- "Split array into k subarrays to minimize maximum sum": binary search on the max sum
- "Koko eating bananas": binary search on eating speed

**Key insight:** "binary search on the answer" is one of the most powerful techniques in competitive programming. If you can write a function "can_achieve(x)" that returns True/False with a monotone property, binary search finds the optimal x in O(log(answer_space)) × O(check_cost).`,
    },
    {
      id: 1496,
      name: "QuickSelect",
      desc: `**QuickSelect** — finds the kth smallest (or largest) element in an unsorted array in O(n) average time using the same partitioning strategy as QuickSort, but only recursing into one partition.

**Algorithm:**
"def quickselect(arr, lo, hi, k):
    if lo == hi: return arr[lo]
    pivot_idx = partition(arr, lo, hi)  # same as quicksort
    if k == pivot_idx: return arr[pivot_idx]
    elif k < pivot_idx: return quickselect(arr, lo, pivot_idx - 1, k)
    else: return quickselect(arr, pivot_idx + 1, hi, k)"

**Complexity:**
- Average: O(n) — T(n) = T(n/2) + O(n) → O(n)
- Worst case: O(n²) — same pathology as QuickSort (bad pivot)

**Median of Medians:** guarantees O(n) worst case by choosing a pivot that always eliminates at least 30% of elements. Divide into groups of 5, find median of each group, recursively find median of these medians, use as pivot. Too complex for most practical use.

**Python heapq.nsmallest vs QuickSelect:**
- heapq.nsmallest(k, iterable): O(n log k) — good when k << n
- QuickSelect: O(n) average — good when k ≈ n/2
- Full sort: O(n log n) — good when many k queries on same data

**Applications:**
- "Find kth largest element in array" (LeetCode 215 — a classic)
- Finding the median: k = n//2
- Top-k elements (follow-up: partition around the kth element, take all left)
- Database percentile queries

**Key insight:** QuickSelect achieves O(n) by not sorting the entire array — it only needs the element at position k, so it discards the half that doesn't contain it after partitioning. This is the classic "we don't need all the information, just this one piece" insight.`,
    },
    {
      id: 1497,
      name: "Insertion & Selection Sort",
      desc: `**Insertion & Selection Sort** — simple O(n²) sorting algorithms important for understanding, small inputs, nearly-sorted data, and as building blocks in hybrid algorithms.

**Insertion Sort:**
- Take the next unsorted element, insert it at the correct position in the sorted left portion
- "for i in range(1, n): j = i; while j > 0 and arr[j] < arr[j-1]: swap(arr, j, j-1); j -= 1"
- **Stable, in-place, online (can sort a stream)**
- **Adaptive:** O(n) on nearly-sorted input (few inversions)
- **Best for:** n < 20, nearly-sorted data, last step of Timsort for small runs

**Selection Sort:**
- Find the minimum in the unsorted portion, swap to the front
- "for i in range(n): min_idx = i; for j in range(i+1, n): if arr[j] < arr[min_idx]: min_idx = j; swap(arr, i, min_idx)"
- **Not stable (swaps can disrupt relative order), in-place**
- Exactly n-1 swaps (minimum possible) — useful when swap is expensive
- **Not adaptive:** always O(n²) comparisons regardless of input

**Bubble Sort:** repeatedly swap adjacent elements if out of order. O(n²) comparisons, O(n²) swaps — worst of the simple sorts. Rarely used except as a teaching tool. One optimization: if no swaps in a pass → sorted → O(n) best case.

**Shell Sort:** insertion sort with decreasing gap sequences. O(n^1.3) to O(n^1.5) with good gap sequences (Knuth: 1, 4, 13, 40...). Practically fast, in-place, but complex analysis.

**Key insight:** insertion sort is not just a toy algorithm. Timsort (Python, Java) uses insertion sort for runs of length < 64, where its cache efficiency and adaptiveness outperform merge sort's overhead. The "simple algorithm for small inputs, complex algorithm for large" combination is a key optimization strategy.`,
    },
    {
      id: 1498,
      name: "Ternary Search",
      desc: `**Ternary Search** — a search technique for finding the maximum or minimum of a unimodal function (one that increases then decreases, or decreases then increases) over a continuous or discrete domain.

**For continuous domain (find maximum of unimodal function):**
"lo, hi = 0, 1  # or any bounds
for _ in range(100):  # 100 iterations → ~10^-30 precision
    m1 = lo + (hi - lo) / 3
    m2 = hi - (hi - lo) / 3
    if f(m1) < f(m2): lo = m1
    else: hi = m2"

**For discrete domain:** similar but with integer bounds and "while lo < hi" termination.

**Unimodal property:** the function has exactly one local maximum. Without this property, ternary search cannot be applied.

**Applications:**
- Find the point on a convex hull closest to a query point
- Minimize the maximum sum of partitioned array segments
- Find the optimal resource allocation that maximizes throughput
- Optical lens optimization in physics simulations

**Ternary search vs binary search:** binary search requires monotone function (always increases or always decreases). Ternary search requires unimodal function (increase-then-decrease or decrease-then-increase). Both reduce domain by 1/3 each step → O(log₃(range)) = O(log n).

**Key insight:** ternary search extends binary search to a broader class of functions. The key question is always: "is this function monotone? → binary search. Is it unimodal (one peak/valley)? → ternary search. Has multiple peaks? → can't use either directly."`,
    },
    {
      id: 1499,
      name: "External Sorting",
      desc: `**External Sort** — sorting datasets larger than available RAM by combining in-memory sorting with disk I/O. The algorithm underlying database ORDER BY on large tables and big data sort stages.

**Two-phase merge sort:**
1. **Sort phase:** read chunks of data that fit in RAM, sort each chunk (quick sort), write sorted runs to disk
2. **Merge phase:** merge k sorted runs using a k-way merge with a min-heap. Read next element from each run on demand, merge into output file.

**I/O complexity:** minimize disk reads/writes (much slower than RAM). For N records, B bytes/block, M bytes RAM: create N/M sorted runs, merge in O(N/B × log_{M/B}(N/B)) I/O operations.

**Multiway merging:** instead of two-way merge (two runs at a time), merge all runs simultaneously using a min-heap. With M/buffer_size = k-way merge, we need only 2 passes for N/M² ≤ 1. Maximizing k minimizes passes.

**Replacement selection:** instead of reading M records and sorting, maintain a priority queue. For each output, evict min and add a new record from disk — if it's ≥ current output, add to current run; otherwise, start new run. Produces runs of average length 2M instead of M → fewer runs → fewer merge passes.

**Real-world:** Hadoop MapReduce sort phase, Spark sort operator, PostgreSQL external sort (work_mem threshold), database bulk loads.

**Key insight:** external sorting efficiency is dominated by the number of disk passes. A 1TB dataset on a disk with 500MB/s sequential throughput takes 2TB/500MB/s = ~67 minutes for a single pass. Minimizing passes from 3 to 2 saves an hour. This is why database systems invest heavily in merge optimization.`,
    },
    {
      id: 1500,
      name: "Order Statistics & Rank",
      desc: `**Order Statistics** — finding elements at specific positions in a sorted order (kth smallest, median, percentiles) from dynamic datasets.

**Order statistics tree:** augmented BST where each node stores the size of its subtree. Enables O(log n) "find kth smallest" and O(log n) "find rank of element" while maintaining O(log n) insert/delete.

"find_kth(node, k):
    left_size = node.left.size if node.left else 0
    if k <= left_size: return find_kth(node.left, k)
    elif k == left_size + 1: return node
    else: return find_kth(node.right, k - left_size - 1)"

**Dynamic median:** maintain two heaps (max-heap of lower half, min-heap of upper half). Insert and rebalance in O(log n). Query median in O(1). The "median finder" problem.

**Percentile queries in databases:** "SELECT PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY response_time)" — approximated using HyperLogLog or T-Digest for streaming data.

**T-Digest:** a data structure for approximate quantile queries in data streams. Maintains weighted centroids that compress the distribution. O(log n) per insert, O(1) per query. Error ≤ 1% for extreme percentiles, < 0.01% for median. Used in observability tools (Prometheus, Elasticsearch).

**Key insight:** exact order statistics require O(n log n) preprocessing or O(log n) per operation with augmented BSTs. For large-scale systems where you need p50/p95/p99 latency across billions of requests, approximate data structures (T-Digest, quantile sketches) provide sub-percent accuracy with dramatically less memory and compute.`,
    },
    {
      id: 1501,
      name: "Timsort",
      desc: `**Timsort** — the hybrid sorting algorithm used in Python's built-in sort and Java's Arrays.sort for objects. Combines merge sort and insertion sort, achieving O(n) on already-sorted and nearly-sorted data while maintaining O(n log n) worst case.

**Core insight:** real-world data is rarely random. It often contains "runs" — sequences that are already sorted or reverse-sorted. Timsort exploits these natural runs.

**Algorithm:**
1. **Detect runs:** scan for naturally sorted sequences. Reverse any descending runs to make them ascending.
2. **Minimum run length (minrun):** typically 32-64. Runs shorter than minrun are extended using insertion sort (adaptive and fast on small inputs).
3. **Merge runs:** merge runs using a stack-based strategy. The stack maintains the invariant that each run is larger than the sum of the two below it (Fibonacci-like). This ensures O(n log n) total merges.

**Galloping mode:** when merging two runs, if one run dominates (repeatedly wins the comparison), switch from element-by-element to binary search (gallop) to find the boundary. Reduces O(n) merge to O(log n) for highly imbalanced merges.

**Performance characteristics:**
- O(n) best case: already sorted input
- O(n log n) worst case: random input
- Stable: equal elements maintain original order
- O(n) auxiliary space (merge buffers)

**Key insight:** Timsort is designed for real-world data, not theoretical worst-case inputs. The insight that real data has "runs" is decades of empirical observation turned into algorithmic advantage. It's a lesson that the best algorithm for a use case depends on the actual data distribution, not just worst-case theory.`,
    },
    {
      id: 1502,
      name: "Sorting Problem Patterns",
      desc: `**Sorting Problem Patterns** — common algorithmic patterns that leverage sorting as a preprocessing step to simplify the main algorithm.

**Pattern 1 — Sort then linear scan:**
"Merge intervals:" sort by start time → single left-to-right scan to merge overlapping intervals. O(n log n).
"Meeting rooms (minimum rooms):" sort by start time, use a min-heap of end times.
"Two sum in sorted array:" sort + two pointers. O(n log n) total.

**Pattern 2 — Sort by custom key:**
"Largest number:" concatenate any ordering — sort strings by (a+b) > (b+a) comparison. O(n log n).
"Task scheduler:" sort by frequency, schedule most frequent first.
"Reorder data in log files:" sort with a custom comparator that handles letter-logs before digit-logs.

**Pattern 3 — Sort to enable binary search:**
Sort once, answer many queries with binary search. O(n log n + q log n) vs O(nq) with linear scan.

**Pattern 4 — Counting sort for frequency:**
"Top k frequent elements": count with hash map → partial sort by frequency with quickselect or bucket sort → O(n).
"Sort characters by frequency": counter → rebuild string from most to least frequent.

**Pattern 5 — Sort to detect duplicates / proximity:**
"Contains duplicate within k distance": sort indices by value → check if adjacent equal-value elements are within k.
"Maximum gap between elements": if max gap > (max-min)/(n-1), use pigeonhole + bucket sort.

**Key insight:** "sort first" is one of the most powerful algorithmic strategies. It trades O(n log n) preprocessing for an O(n) or O(log n) main algorithm, often turning an O(n²) brute force into an elegant O(n log n) solution. The question to ask is: "if I sort the input, what becomes easy?"`,
    },
  ],
};

export default sortingSearching;
