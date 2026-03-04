const dynamicProgramming = {
  name: "Dynamic Programming",
  icon: "🧩",
  color: "#ef4444",
  concepts: [
    {
      id: 1503,
      name: "DP Fundamentals",
      desc: `**Dynamic Programming (DP)** — an algorithm design paradigm for problems with *overlapping subproblems* and *optimal substructure*. Solve each subproblem once, store the result, and reuse it — transforming exponential naive recursion into polynomial time.

**Two necessary conditions:**
1. **Optimal substructure:** an optimal solution to the problem contains optimal solutions to its subproblems. (If the global optimal doesn't use subproblem optima, DP is incorrect.)
2. **Overlapping subproblems:** the same subproblems are computed repeatedly. (If subproblems don't overlap, divide-and-conquer is sufficient — no need to store.)

**Two implementation styles:**
- **Top-down (memoization):** recursive, add a cache. "If this subproblem is in the cache, return it; otherwise compute and cache." Natural recursive thinking with automatic subproblem identification.
- **Bottom-up (tabulation):** iterative, fill a table from base cases to target. Explicit ordering, no recursion overhead, often more cache-efficient.

**Steps to solve any DP problem:**
1. Identify the subproblem (what varies? → define the state)
2. Write the recurrence relation (how does state(i) relate to state(i-1) or smaller states?)
3. Identify base cases
4. Determine traversal order (bottom-up requires correct ordering)
5. Optimize space if possible

**Key insight:** DP is not a magic technique — it's systematic caching of recursive computation. When a recursive solution computes the same subproblem multiple times (you can see this in a recursion tree), DP is applicable. The art is in *defining the state* — what parameters uniquely identify a subproblem.`,
    },
    {
      id: 1504,
      name: "Memoization vs Tabulation",
      desc: `**Memoization (Top-Down)** — caching recursive function results. Write the natural recursion, add "@functools.lru_cache" or a dictionary cache.

**Memoization advantages:**
- Natural to write — just add caching to recursion
- Only computes subproblems that are actually needed (lazy evaluation)
- No need to figure out correct computation order

**Memoization disadvantages:**
- Recursion overhead (function call stack)
- Stack overflow risk for deep recursion (Python default: 1000 frames, set via sys.setrecursionlimit)
- Harder to optimize space (all subproblems stay in cache)

**Tabulation (Bottom-Up)** — fill a DP table iteratively from base cases to target.

**Tabulation advantages:**
- No recursion overhead
- No stack overflow risk
- Easier to optimize space (rolling array, only keep last row/two rows)
- Slightly faster constant factor

**Tabulation disadvantages:**
- Must determine correct filling order explicitly
- Computes all subproblems (even unneeded ones)
- Code can be less intuitive

**Space optimization with tabulation:** many DP recurrences only need the previous row/step. Replace 2D table with two 1D arrays or even a single 1D array with careful update order.

"# Fibonacci: O(n) → O(1) space
prev, curr = 0, 1
for _ in range(n - 1):
    prev, curr = curr, prev + curr"

**Key insight:** for interviews, start with memoization (cleaner code). For production, prefer tabulation (better performance). For space-optimized solutions, tabulation enables rolling arrays that memoization cannot match. Always ask after solving: "can I reduce space to O(1) or O(n)?"`,
    },
    {
      id: 1505,
      name: "1D DP: Linear Problems",
      desc: `**1D DP** — DP problems where the state is a single index, and the recurrence looks at a constant number of previous states.

**Fibonacci (the prototype):** dp[n] = dp[n-1] + dp[n-2]. Base: dp[0]=0, dp[1]=1. Optimizable to O(1) space (two variables).

**Climbing Stairs:** dp[i] = dp[i-1] + dp[i-2] (can take 1 or 2 steps). Same structure as Fibonacci.

**House Robber:** "dp[i] = max(dp[i-1], dp[i-2] + nums[i])". Don't rob adjacent houses. At each house: rob (take house i + skip i-1) or skip (best of previous). Optimizable to O(1) space.

**Coin Change:** dp[amount] = min coins to make that amount. "dp[a] = min(dp[a], dp[a - coin] + 1) for each coin". Bottom-up from 0 to amount. O(amount × coins).

**Longest Increasing Subsequence (LIS):** dp[i] = length of LIS ending at index i. "dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i]". O(n²). Optimized with patience sorting + binary search to O(n log n).

**Word Break:** dp[i] = can string s[0..i] be segmented into dictionary words. "dp[i] = any(dp[j] and s[j..i] in wordDict for j < i)".

**Decode Ways:** dp[i] = number of ways to decode s[0..i]. Check single digit and two-digit combinations.

**Key insight:** 1D DP often enables the "rolling optimization" — you only need the last 1 or 2 values. House Robber is the canonical example where the O(n) space table reduces to O(1) by keeping only prev and curr. Always look for this opportunity.`,
    },
    {
      id: 1506,
      name: "2D DP: Grid & String Problems",
      desc: `**2D DP** — DP with two-dimensional state, typically (i, j) representing two indices into an array, two strings, or position in a grid.

**Unique Paths (grid):** "dp[i][j] = dp[i-1][j] + dp[i][j-1]". How many ways from top-left to bottom-right of m×n grid moving only right/down. O(mn) time, optimizable to O(n) space.

**Minimum Path Sum:** same grid, dp[i][j] = min cost to reach cell (i,j). "dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])".

**Longest Common Subsequence (LCS):**
"dp[i][j] = longest common subsequence of s1[0..i] and s2[0..j]
if s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1] + 1
else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])"
O(mn) time and space. Space optimizable to O(n) with rolling array.

**Edit Distance (Levenshtein):**
"dp[i][j] = min edits to convert s1[0..i] to s2[0..j]
if s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1]  # no edit needed
else: dp[i][j] = 1 + min(dp[i-1][j],   # delete
                          dp[i][j-1],   # insert
                          dp[i-1][j-1]) # replace"

**Longest Common Substring (contiguous):** dp[i][j] = length of longest common substring ending at s1[i], s2[j]. "if s1[i]==s2[j]: dp[i][j] = dp[i-1][j-1]+1; else 0". Answer = max over all i, j.

**Key insight:** LCS vs Longest Common Substring: LCS doesn't require contiguity (characters can skip), while common substring must be contiguous. LCS can skip → extend from dp[i-1][j-1] even if characters don't match. Substring cannot skip → reset to 0 on mismatch.`,
    },
    {
      id: 1507,
      name: "Knapsack Problems",
      desc: `**Knapsack Problems** — a family of DP optimization problems involving selecting items with weights/costs to maximize value within a capacity constraint. Foundational in combinatorial optimization.

**0/1 Knapsack:** each item can be taken or not (binary). n items with weights w[] and values v[], capacity W.
"dp[i][c] = max value using first i items with capacity c
if w[i] > c: dp[i][c] = dp[i-1][c]  # can't take item i
else: dp[i][c] = max(dp[i-1][c], dp[i-1][c-w[i]] + v[i])"
O(nW) time and space. Space-optimizable to O(W) with reversed inner loop.

**Unbounded Knapsack:** each item can be taken unlimited times.
"dp[c] = max(dp[c], dp[c - w[i]] + v[i]) for each item i"
Inner loop goes forward (not reversed) to allow reuse.

**Partition Equal Subset Sum:** can we partition array into two equal-sum subsets? Equivalent to 0/1 knapsack where target = total_sum // 2, values = weights = array values.

**Coin Change (minimization variant):** unbounded knapsack where value = -1 (minimize coins).

**Target Sum (subset with + or - signs):** can we assign +/- to reach target? Reduces to: find subset with sum = (total + target) // 2. Standard 0/1 knapsack counting.

"# Count subsets with sum = target (0/1 knapsack counting)
dp = [0] * (target + 1); dp[0] = 1
for num in nums:
    for j in range(target, num - 1, -1):
        dp[j] += dp[j - num]"

**Key insight:** the 0/1 knapsack inner loop must iterate *backwards* (from W to w[i]) to prevent using item i multiple times in the same pass. The unbounded knapsack iterates *forward* to allow reuse. Getting this direction wrong is the most common knapsack bug.`,
    },
    {
      id: 1508,
      name: "Interval DP",
      desc: `**Interval DP** — DP where the subproblem is defined over an interval [i, j] of the input. Solve smaller intervals first, build up to the full interval.

**Structural pattern:**
- State: dp[i][j] = optimal value for the interval [i..j]
- Transition: try every split point k ∈ [i, j), dp[i][j] = best(dp[i][k] + dp[k+1][j] + cost(i,j,k))
- Order: increasing interval length

**Matrix Chain Multiplication:** given n matrices, find the optimal parenthesization to minimize multiplications.
"dp[i][j] = min multiplications to compute matrices[i..j]
dp[i][j] = min over k in [i,j): dp[i][k] + dp[k+1][j] + dims[i] * dims[k+1] * dims[j+1]"
O(n³) time, O(n²) space.

**Burst Balloons:** burst balloons to maximize coins. Trick: think in reverse — which balloon was burst *last*?
"dp[i][j] = max coins from bursting all balloons between i and j (exclusive boundaries)
dp[i][j] = max over k in (i,j): dp[i][k] + balloons[i] * balloons[k] * balloons[j] + dp[k][j]"

**Palindrome Partitioning (minimum cuts):** minimum cuts to partition string into palindromes. Check palindrome[i][j] with DP, then dp[i] = min cuts for s[0..i].

**Strange Printer / Zuma Game:** interval DP on printing or game-like problems where optimal play on a range builds on optimal play on sub-ranges.

**Key insight:** the key to interval DP is choosing what the "last" operation is (last multiplication, last balloon burst, last merge). By considering all choices for the last operation and taking the best, you build the optimal solution bottom-up. The "enumerate the split point" pattern is the signature of interval DP.`,
    },
    {
      id: 1509,
      name: "DP on Trees",
      desc: `**Tree DP** — applying dynamic programming to trees, where subproblems correspond to subtrees. Naturally computed in postorder (children before parents).

**General template:**
"def dp(node):
    if not node: return base_case
    left = dp(node.left)
    right = dp(node.right)
    # Combine children's DP values to compute this node's DP value
    return f(node.val, left, right)"

**House Robber III (no adjacent nodes):** at each node, track: rob = max value if we rob this node, skip = max value if we don't.
"rob = node.val + left_skip + right_skip
skip = max(left_rob, left_skip) + max(right_rob, right_skip)
return (rob, skip)"

**Diameter of Binary Tree:** diameter through node = left_height + right_height + 2. Track global max.
"def height_and_update(node):
    if not node: return -1
    l, r = height_and_update(node.left), height_and_update(node.right)
    diameter = max(diameter, l + r + 2)  # nonlocal update
    return 1 + max(l, r)"

**Maximum Path Sum (any path):** at each node, can take 0, 1, or both branches. For returning to parent, take at most one branch.
"def gain(node):
    if not node: return 0
    left = max(0, gain(node.left)); right = max(0, gain(node.right))
    max_sum = max(max_sum, node.val + left + right)  # nonlocal
    return node.val + max(left, right)  # return the best single branch"

**Key insight:** tree DP always has two "modes" of a node: contributing to a path that passes through it and continues upward (can only go up one branch), vs being the top of a path that goes down two branches (answer can be found here). This dual-mode thinking resolves most tree DP problems.`,
    },
    {
      id: 1510,
      name: "State Machine DP",
      desc: `**State Machine DP** — modeling a problem as a finite automaton with states and transitions, using DP to find the optimal path through states. Elegant for problems with multiple "modes" or phases.

**Best Time to Buy/Sell Stock variants:**

**With cooldown:** states: held (have stock), sold (just sold, in cooldown), rest (can buy).
"held = max(held, rest - price)     # buy: rest → held
sold = held + price                 # sell: held → sold
rest = max(rest, sold)              # cooldown ends: sold → rest"

**With k transactions:** dp[k][0 or 1] = max profit with k remaining transactions, currently holding(1) or not(0).
"dp[k][1] = max(dp[k][1], dp[k][0] - price)  # buy (use one transaction)
dp[k][0] = max(dp[k][0], dp[k+1][1] + price) # sell"

**Regex matching (. and *):** states are (string_index, pattern_index). Transitions depend on whether current pattern char is '.', '*', or literal. Classic 2D DP.
"dp[i][j] = does s[0..i] match p[0..j]
if p[j] == '*': dp[i][j] = dp[i][j-2] (skip a*) or (dp[i-1][j] and matches(s[i], p[j-1]))
else: dp[i][j] = dp[i-1][j-1] and matches(s[i], p[j])"

**Parsing with DP:** tokenize input as a sequence, model parser states as DP states. Used in NLP CYK parsing algorithm.

**Key insight:** state machine DP is powerful when a problem has clearly defined "modes" that the solution transitions between. Instead of tracking all history, you track only the current state. The key insight: what information from the past do I actually need? That becomes your DP state.`,
    },
    {
      id: 1511,
      name: "Bitmask DP",
      desc: `**Bitmask DP** — DP where the state includes a bitmask representing a subset of elements. Solves optimization problems over subsets in O(2ⁿ × n) — exponential but feasible for n ≤ 20.

**State representation:** an integer from 0 to 2ⁿ-1 where bit i = 1 means element i is in the subset.
- Check if i is in mask: "(mask >> i) & 1"
- Add i to mask: "mask | (1 << i)"
- Remove i from mask: "mask & ~(1 << i)"
- Enumerate all masks: "for mask in range(1 << n)"
- Enumerate all subsets of mask: "sub = mask; while sub: process(sub); sub = (sub-1) & mask"

**Traveling Salesman Problem (TSP):**
"dp[mask][v] = minimum cost path that visits exactly the nodes in mask, ending at v"
"dp[mask | (1 << u)][u] = min(dp[mask][v] + dist[v][u]) for all v in mask, u not in mask"
Answer: "min(dp[(1<<n)-1][v] + dist[v][0] for all v)"
O(2ⁿ × n²) time, O(2ⁿ × n) space.

**Minimum XOR of all pairs:** bitmask DP on pairs.
**Cover all nodes with minimum cliques:** set cover with bitmask DP.
**Hamiltonian path:** exists if dp[(1<<n)-1][any v] is reachable.
**Stickers to spell word:** bitmask DP on characters needed.

**Key insight:** bitmask DP is the bridge between brute-force subset enumeration (O(n! or n×2ⁿ naive)) and polynomial algorithms. For n ≤ 20, O(2ⁿ × n) is feasible (~20M operations for n=20). For n > 25, it becomes impractical. The trick: represent "which elements have been used" as a bitmask rather than a list.`,
    },
    {
      id: 1512,
      name: "LIS & LCS (Classic Problems)",
      desc: `**LIS (Longest Increasing Subsequence) & LCS (Longest Common Subsequence)** — two foundational DP problems that appear as building blocks in dozens of other problems.

**LIS — O(n²) DP:**
"dp[i] = len(LIS ending at index i)
dp[i] = max(dp[j] + 1) for j < i where nums[j] < nums[i]
answer = max(dp)"

**LIS — O(n log n) patience sorting:**
Maintain a list "tails" where tails[i] = smallest tail of all IS of length i+1.
For each num: binary search for the leftmost position in tails ≥ num, replace with num (or append if new max).
tails length = LIS length.

"tails = []
for num in nums:
    idx = bisect_left(tails, num)
    if idx == len(tails): tails.append(num)
    else: tails[idx] = num"

**LCS — O(mn):** as shown earlier. Reduce to LIS: for each element of A, find its positions in B, process in reverse to get LIS of B positions → LCS.

**Applications of LIS/LCS:**
- **Russian Doll Envelopes (2D LIS):** sort by width ascending, then height descending. LIS on heights gives the answer. (Descending height prevents counting same-width envelopes.)
- **Longest Bitonic Subsequence:** LIS from left + LIS from right - 1 at each position.
- **Minimum deletions to make array sorted:** n - LIS length.
- **Longest Palindromic Subsequence:** LCS of string and its reverse.
- **Minimum insertions to make palindrome:** n - LPS = n - LCS(s, reverse(s)).
- **Diff algorithm:** Unix diff computes LCS of lines between two files.

**Key insight:** LIS O(n log n) via patience sorting is a masterpiece — it maintains a "virtual" sorted structure using binary search, achieving log n per element without ever explicitly computing all dp[j] for j < i. The tails array isn't the LIS itself, but its length equals the LIS length.`,
    },
    {
      id: 1513,
      name: "DP Optimization Techniques",
      desc: `**DP Optimizations** — techniques to reduce the complexity of DP recurrences from O(n²) or O(n³) to O(n log n) or O(n).

**Divide & Conquer Optimization:** when the optimal split point opt(i) is monotone (opt(i) ≤ opt(i+1)), the O(n²) or O(n³) interval DP recurrence can be solved in O(n log n) or O(n²) by a divide-and-conquer on rows.

**Knuth-Yao Optimization:** for specific interval DP where the cost function satisfies the "quadrangle inequality," reduces O(n³) to O(n²) by narrowing the range of split points.

**Monotone Deque Optimization:** for recurrences of the form "dp[i] = min/max(dp[j] + cost) for j in range [L(i), R(i)]" where L and R are monotonically non-decreasing, use a monotone deque to maintain the optimal j. Reduces O(n²) to O(n).

**Slope Trick:** represent the DP function as a piecewise linear function and update it efficiently. Used for: "minimum absolute difference" problems, "minimum cost to sort an array with limited swaps."

**Convex Hull Trick (CHT):** when the transition is "dp[i] = min over j (dp[j] + b[j] * a[i])" where b[j] and a[i] are monotone, the optimal transition can be found on the lower convex hull of lines. O(n log n) or O(n) with Li Chao tree or monotone pointer.

**Key insight:** DP optimization is a deep topic in competitive programming. The insight is always: "the optimal choice for larger i is at least as large as for smaller i (monotone optimal)" or "the cost function has convexity properties." Most interview problems don't require these optimizations — they're competitive programming territory.`,
    },
    {
      id: 1514,
      name: "DP Problem Recognition",
      desc: `**DP Problem Recognition** — identifying when a problem is a DP problem and which type it is. This is the hardest skill in DP — harder than implementation.

**Signals that a problem is DP:**
- "How many ways can you...?" → counting DP
- "What is the minimum/maximum...?" → optimization DP
- "Is it possible to...?" → boolean DP
- "Find the length of the longest/shortest..." → extremal DP
- Problem involves: sequences, grids, intervals, trees, subsets
- Choices at each step affect future options ("locally optimal doesn't imply globally optimal")

**Is it DP or Greedy?** If greedy correctness can be proven (exchange argument), use greedy. If counterexamples show greedy fails, use DP. Activity selection → provably greedy. Coin change with arbitrary denominations → DP.

**State design tips:**
- What information do I need to compute the answer at any given stage?
- What parameters make each subproblem unique?
- Minimize state dimensions (fewer dimensions = less memory, faster)
- "Use suffix" instead of "use prefix" when the problem looks forward

**Common state patterns:**
- "dp[i]" — considering the first i elements
- "dp[i][j]" — considering i elements from one sequence, j from another (2-sequence DP)
- "dp[i][j]" — interval [i, j] (interval DP)
- "dp[mask]" — subset of elements (bitmask DP)
- "dp[i][state]" — at position i, in state (state machine DP)

**Key insight:** you can't memorize solutions to all DP problems. You must develop intuition: "this problem has overlapping subproblems and optimal substructure → DP. The choices at each position affect future positions → the position is part of the state." Practice by writing the recurrence on paper before coding.`,
    },
    {
      id: 1515,
      name: "Palindrome DP",
      desc: `**Palindrome DP** — a family of DP problems involving palindromic substrings and subsequences.

**Is substring s[i..j] a palindrome?**
"palindrome[i][j] = (s[i] == s[j]) and palindrome[i+1][j-1]"
Build for all lengths 1, 2, 3, ..., n. O(n²) time and space.
"for length in range(1, n+1):
    for i in range(n - length + 1):
        j = i + length - 1
        palindrome[i][j] = (s[i] == s[j]) and (length <= 2 or palindrome[i+1][j-1])"

**Longest Palindromic Substring:**
- DP approach: O(n²) time, O(n²) space using palindrome table
- Expand-around-center: O(n²) time, O(1) space — for each center (n odd centers + n-1 even), expand outward while palindrome
- Manacher's Algorithm: O(n) — compute longest palindrome at each center using previously computed results

**Longest Palindromic Subsequence (LPS):** LCS of string and its reverse. O(n²).

**Minimum Insertions to Make Palindrome:** n - LPS. (Insert the reverse of the non-palindromic part.)

**Palindrome Partitioning (Minimum Cuts):**
"cuts[i] = min cuts to partition s[0..i] into palindromes
cuts[i] = min(cuts[j-1] + 1) for j where s[j..i] is palindrome"
O(n²) with palindrome precomputation.

**Key insight:** Manacher's algorithm is one of the most elegant string algorithms. It extends each center using the observation: if a palindrome centered at i mirrors a palindrome centered at j (which mirrors i), the palindrome at i has at least as large a radius as at j. This prevents recomputation, giving O(n) overall.`,
    },
    {
      id: 1516,
      name: "Space Optimization in DP",
      desc: `**Space Optimization** — reducing DP memory from O(n²) or O(nm) to O(n) or O(min(n,m)) by recognizing that only the most recent rows/columns are needed.

**Rolling array technique:** if dp[i] only depends on dp[i-1] (and maybe dp[i-2]), replace the full array with just the needed previous values.

"# LCS: O(mn) → O(n) space
prev = [0] * (n + 1)
for i in range(1, m + 1):
    curr = [0] * (n + 1)
    for j in range(1, n + 1):
        if s1[i-1] == s2[j-1]: curr[j] = prev[j-1] + 1
        else: curr[j] = max(prev[j], curr[j-1])
    prev = curr"

**0/1 Knapsack O(W) space:** iterate the capacity dimension backwards to prevent using item twice.
"for item in items:
    for c in range(W, item.weight - 1, -1):  # MUST go backwards
        dp[c] = max(dp[c], dp[c - item.weight] + item.value)"

**Reducing O(n²) to O(n) for 1D DP:** check if the recurrence at position i only uses a constant number of previous positions. If so, use variables instead of an array.

**When you can't reduce space:** interval DP (dp[i][j] depends on dp[i+1][j-1]), some 2D grid DP with diagonal dependencies, bitmask DP. In these cases, the 2D table is necessary.

**Hirschberg's algorithm:** O(nm) time, O(n) space for LCS by computing the optimal alignment using divide-and-conquer. Useful when you need to reconstruct the actual LCS (not just its length) with O(n) space.

**Key insight:** space optimization often reveals the deepest insight about a DP's dependency structure. "What do I actually need from the past?" If the answer is "only the previous row," the rolling array follows naturally. This is the engineering discipline of DP — theoretical correctness first, then space efficiency.`,
    },
  ],
};

export default dynamicProgramming;
