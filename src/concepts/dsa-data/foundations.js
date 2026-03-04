const foundations = {
  name: "Foundations & Complexity",
  icon: "🧮",
  color: "#6366f1",
  concepts: [
    {
      id: 1401,
      name: "Big O Notation",
      desc: `**Big O Notation** — a mathematical notation that describes the upper bound of an algorithm's growth rate relative to its input size, answering "how does runtime or memory scale as n → ∞?" It's the lingua franca of algorithm analysis — every engineer should be able to read and write Big O fluently.

**Common complexities ranked from best to worst:**
- O(1): Constant — hash table lookup, array indexing
- O(log n): Logarithmic — binary search, balanced BST operations
- O(n): Linear — single pass through array, linear search
- O(n log n): Linearithmic — merge sort, heap sort, efficient sorting lower bound
- O(n²): Quadratic — nested loops, bubble sort, insertion sort
- O(2ⁿ): Exponential — subset enumeration, naive recursion
- O(n!): Factorial — permutation generation, TSP brute force

**Key rules:** Big O drops constants and lower-order terms. O(2n + 100) = O(n). O(n² + n) = O(n²). For nested loops, multiply: two nested loops over n = O(n²). For sequential operations, add (then drop lower order).

**Key insight:** Big O describes *shape*, not speed. An O(n) algorithm with a huge constant may be slower than O(n²) for small n — always profile. Big O tells you which algorithm *wins at scale*, not which one to always use.`,
    },
    {
      id: 1402,
      name: "Space Complexity",
      desc: `**Space Complexity** — the total memory an algorithm uses relative to input size, including input space (sometimes excluded), auxiliary space (extra space beyond input), and call stack space for recursive algorithms.

**Auxiliary vs total space:** when comparing algorithms, focus on *auxiliary space* (memory the algorithm allocates beyond its input). Merge sort is O(n) auxiliary space; quicksort is O(log n) auxiliary (stack frames). Both sort the same O(n) input.

**Stack space in recursion:** each recursive call adds a stack frame. A recursive DFS on a balanced BST has O(h) = O(log n) stack space; on a skewed tree (worst case), O(n). Infinite recursion = stack overflow.

**In-place algorithms:** O(1) auxiliary space. Quicksort, binary search, heapsort are in-place. Merge sort is not (requires O(n) merge buffer). "In-place" doesn't mean zero memory — it means constant *extra* memory.

**Key insight:** time-space trade-offs are fundamental. Memoization trades space for time. Streaming algorithms sacrifice accuracy for O(1) space. Always ask: "can I reduce space by computing on the fly instead of storing?"`,
    },
    {
      id: 1403,
      name: "Asymptotic Analysis",
      desc: `**Asymptotic Analysis** — the study of algorithm performance as input size approaches infinity, using three notations: Big O (upper bound / worst case), Ω Omega (lower bound / best case), and Θ Theta (tight bound / exact asymptotic behavior).

**Three notations:**
- **Big O (O):** f(n) = O(g(n)) means f grows *no faster than* g. Used for worst-case guarantees.
- **Omega (Ω):** f(n) = Ω(g(n)) means f grows *at least as fast as* g. Best-case behavior.
- **Theta (Θ):** f(n) = Θ(g(n)) means f grows *exactly as fast as* g (both O and Ω). Tight bound.

**Best, average, worst case:** these are independent of the notation. Quicksort is O(n²) worst case (bad pivot selection) but O(n log n) average case. The notation (O, Θ, Ω) describes the type of bound; the case (best/average/worst) describes the scenario.

**Amortized analysis:** analyzes the average cost per operation over a sequence of operations. Dynamic array append is O(1) amortized even though occasional resizes are O(n). The resize cost is "amortized" across all appends.

**Key insight:** Θ is the most precise characterization. Saying binary search is "O(n)" is technically correct but useless — it's Θ(log n). Always seek the tightest accurate bound.`,
    },
    {
      id: 1404,
      name: "Recursion & Recurrence Relations",
      desc: `**Recursion** — a function that calls itself with a smaller or simpler subproblem, converging toward a base case. Three laws: (1) must have a base case, (2) must change state and move toward base case, (3) must call itself recursively.

**Anatomy of a recursive function:**
- **Base case:** the stopping condition — prevents infinite recursion
- **Recursive case:** reduces the problem and makes the recursive call
- **Trust the recursion:** the hardest mental shift — assume the recursive call works correctly, then build your solution on top of it

**Recurrence relations** express the time complexity of recursive algorithms mathematically:
- Binary search: T(n) = T(n/2) + O(1) → O(log n)
- Merge sort: T(n) = 2T(n/2) + O(n) → O(n log n)
- Fibonacci (naive): T(n) = T(n-1) + T(n-2) + O(1) → O(2ⁿ)

**Master Theorem** solves T(n) = aT(n/b) + f(n) recurrences for divide-and-conquer algorithms where a ≥ 1, b > 1.

**Tail recursion:** a recursive call is the last operation in a function. Languages with tail call optimization (TCO) convert it to iteration, eliminating stack frame overhead. JavaScript doesn't reliably do TCO; use explicit iteration for performance-critical code.

**Key insight:** every recursive solution has an equivalent iterative solution (using an explicit stack). Recursion is often clearer; iteration is often faster and avoids stack overflow on deep inputs.`,
    },
    {
      id: 1405,
      name: "Divide & Conquer",
      desc: `**Divide & Conquer** — a paradigm that solves a problem by (1) dividing it into smaller subproblems of the same type, (2) conquering (recursively solving) each subproblem, and (3) combining the results. The canonical strategy for algorithms that "halve the problem" each step.

**Classic examples:**
- **Merge sort:** divide array in half, sort each half, merge — O(n log n)
- **Binary search:** divide search space in half each step — O(log n)
- **QuickSort:** partition around pivot, recurse on each part — O(n log n) average
- **Karatsuba multiplication:** divide large numbers for O(n^1.585) vs O(n²) naive
- **Strassen matrix multiplication:** divide matrices for O(n^2.81) vs O(n³) naive

**When to apply:** subproblems are independent (unlike DP where they overlap), natural halving of input, and combining solutions is straightforward.

**Key insight:** the "log n" factor in O(n log n) algorithms almost always comes from divide-and-conquer — each level of recursion halves the problem, creating log n levels, with O(n) work per level. Recognizing this structure immediately tells you the complexity.`,
    },
    {
      id: 1406,
      name: "Iteration vs Recursion",
      desc: `**Iteration vs Recursion** — two equivalent computation models. Any iterative algorithm can be made recursive and vice versa; the choice is usually about clarity, performance, and stack depth limits.

**Recursion strengths:** naturally expresses tree/graph traversal, divide-and-conquer, backtracking. Code mirrors mathematical definitions. Cleaner for inherently recursive structures.

**Iteration strengths:** no stack frame overhead (O(1) space vs O(depth)). No risk of stack overflow. Typically faster in practice due to lower function call overhead.

**Converting recursion to iteration:** use an explicit stack data structure. DFS on a tree: recursive version uses call stack; iterative version uses a Stack<Node>. The explicit stack mirrors what the OS does automatically in recursion.

**Stack overflow risk:** default stack sizes are ~1MB on most systems, allowing ~10,000-50,000 frames. Deep recursion on large inputs (n=100,000) risks overflow. Binary search on n=10^6 only requires ~20 frames (log₂(10⁶) ≈ 20) — safe. Recursion over each element of n=100,000 array — risky.

**Key insight:** prefer recursion when it makes the logic clear and depth is bounded (like tree depth). Convert to iteration when processing large linear sequences or when stack depth is unbounded.`,
    },
    {
      id: 1407,
      name: "Algorithm Design Paradigms",
      desc: `**Algorithm Design Paradigms** — the high-level strategies for approaching algorithmic problems. Knowing which paradigm applies to a problem is often 80% of the solution.

**The major paradigms:**
- **Brute Force:** try all possibilities. Correct by definition, exponential in complexity. Starting point for understanding a problem.
- **Divide & Conquer:** split into independent subproblems, solve, combine. Merge sort, binary search.
- **Dynamic Programming:** split into *overlapping* subproblems, cache results. Fibonacci, shortest path.
- **Greedy:** at each step, make the locally optimal choice. Activity selection, Dijkstra.
- **Backtracking:** systematically explore all possibilities with pruning. N-queens, sudoku, subset sum.
- **Two Pointers / Sliding Window:** maintain a window or pair of indices that traverse the array. Efficient for subarray/substring problems.
- **Reduction / Transform:** convert the problem into a known problem. "This is a bipartite matching problem" → use max flow.

**Choosing the right paradigm:** does the problem have overlapping subproblems? → DP. Can greedy choices be proven optimal? → Greedy. Graph structure? → BFS/DFS. Sorted input? → Binary search or two pointers.

**Key insight:** paradigm recognition is a skill built by solving hundreds of problems. With practice, you stop thinking "how do I solve this?" and start thinking "this is a sliding window problem" — and the solution follows.`,
    },
    {
      id: 1408,
      name: "Problem-Solving Framework",
      desc: `**Problem-Solving Framework** — a systematic approach to tackling algorithmic problems in interviews and real work. Having a repeatable process prevents panic and ensures thoroughness.

**The UMPIRE method (or similar):**
1. **Understand:** read carefully, identify constraints (n size, value ranges, edge cases). Ask: can input be empty? Can values be negative? Is the array sorted?
2. **Match:** identify patterns — is this a graph problem? Subarray sum? Binary search on the answer?
3. **Plan:** outline the approach before coding. State the time/space complexity.
4. **Implement:** code methodically. Handle edge cases explicitly.
5. **Review:** trace through examples, verify against edge cases.
6. **Evaluate:** discuss trade-offs, alternative approaches, what would change at scale.

**Constraint analysis:** the input size n tells you what complexity is acceptable:
- n ≤ 20: O(2ⁿ) or O(n!) feasible
- n ≤ 500: O(n³) feasible
- n ≤ 5,000: O(n²) feasible
- n ≤ 10⁶: O(n log n) required
- n ≤ 10⁸: O(n) required
- n > 10⁸: O(log n) or O(1) required

**Key insight:** "I don't know" is always the wrong answer in an interview. "Let me think through the constraints and see what paradigm fits" is always the right answer — even if the solution isn't optimal, demonstrating structured thinking matters enormously.`,
    },
    {
      id: 1409,
      name: "Trade-offs: Time vs Space",
      desc: `**Time-Space Trade-off** — the fundamental engineering trade-off where using more memory can reduce computation time, and reducing memory often requires more computation. Most optimization decisions are fundamentally time-space choices.

**Classic trade-off examples:**
- **Memoization / caching:** store computed results to avoid recomputation. Fibonacci: O(2ⁿ) time → O(n) time with O(n) space
- **Lookup tables:** precompute all possible values. O(1) lookup at the cost of O(n) space
- **Compression:** trade CPU cycles to reduce storage (zip, deflate)
- **Indexing:** databases trade storage for O(log n) vs O(n) query time
- **String interning:** trade O(n) space for O(1) string comparison

**When to trade space for time:** when time is the bottleneck (real-time systems, hot paths), space is abundant (RAM is cheap), and the same values are computed many times (high reuse).

**When to trade time for space:** when memory is constrained (embedded systems, mobile), data is large relative to available RAM, and computation is cheap.

**Key insight:** "optimize first" is a mistake; "optimize correctly" is wisdom. Profile to find the actual bottleneck — it's almost always in 10% of the code. Then decide if the trade-off is worth the complexity cost.`,
    },
    {
      id: 1410,
      name: "Stability, In-Place & Adaptive Properties",
      desc: `**Algorithm Properties** — key characteristics that determine which algorithm is appropriate for a given situation beyond just time complexity.

**Stability (for sorting):** a sorting algorithm is *stable* if equal elements maintain their relative order from the input. Critical when sorting by a secondary key after a primary key. Merge sort and insertion sort are stable. Quicksort and heapsort are not (in standard implementations).

**In-place:** uses O(1) auxiliary space beyond the input. QuickSort and HeapSort are in-place. Merge sort requires O(n) auxiliary. "In-place" doesn't mean modifying the input — it means not allocating O(n) extra memory.

**Adaptive:** runs faster on partially sorted input. Insertion sort is adaptive: O(n) on nearly-sorted data, O(n²) worst case. Merge sort is non-adaptive (always O(n log n) regardless of input). Timsort (Python's sort) is adaptive merge sort — fast on natural runs.

**Online vs offline:** an online algorithm processes input as it arrives without seeing future elements. Insertion sort is online (you can insert elements one at a time). Merge sort is offline (needs all data).

**Key insight:** for large-scale data engineering, stability matters for multi-key sort pipelines. For embedded systems, in-place matters because you can't allocate O(n) buffers. Choose your algorithm based on all constraints, not just asymptotic complexity.`,
    },
  ],
};

export default foundations;
