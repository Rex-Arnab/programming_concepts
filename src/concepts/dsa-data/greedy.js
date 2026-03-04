const greedy = {
  name: "Greedy Algorithms",
  icon: "🏆",
  color: "#10b981",
  concepts: [
    {
      id: 1517,
      name: "Greedy Algorithm Fundamentals",
      desc: `**Greedy Algorithm** — makes the locally optimal choice at each step, hoping to find the global optimum. Faster than DP (no subproblem caching needed) but only correct when the "greedy choice property" and "optimal substructure" both hold.

**Greedy choice property:** a globally optimal solution can be obtained by making the locally optimal (greedy) choice at each step. The greedy choice doesn't depend on future choices.

**When greedy works:**
- Activity selection (interval scheduling): always pick the earliest-finishing activity
- Huffman coding: always merge the two least-frequent nodes
- Kruskal's / Prim's MST: always add the minimum-weight safe edge
- Dijkstra's: always process the unvisited node with minimum distance
- Fractional knapsack (items divisible): always take the highest value/weight ratio first

**When greedy fails — counterexamples:**
- 0/1 Knapsack (items not divisible): greedy by ratio fails — use DP
- Coin change with arbitrary denominations: greedy (pick largest coin) fails — use DP
- General shortest path with negative edges: Dijkstra's greedy choice fails — use Bellman-Ford

**Proving greedy correctness:**
- **Exchange argument:** assume the optimal solution differs from greedy. Show you can exchange the non-greedy choice for the greedy one without worsening the solution. → Greedy is optimal.
- **Matroid theory:** greedy works on "matroids" (independence systems with exchange property). MST, interval scheduling, Huffman all correspond to matroid problems.

**Key insight:** the most common mistake is applying greedy to a problem where greedy is tempting but wrong. Always ask: "Can I construct a counterexample?" If yes, use DP. If no, try to prove the exchange argument. Greedy bugs are subtle — the algorithm looks correct but fails on specific input patterns.`,
    },
    {
      id: 1518,
      name: "Interval Scheduling",
      desc: `**Interval Scheduling** — problems involving selecting or processing a set of intervals [start, end] optimally. A classic domain for greedy algorithms.

**Activity Selection (maximum non-overlapping intervals):**
- Greedy: sort by end time, always select the earliest-finishing activity that doesn't conflict with the last selected.
- Why: by choosing the earliest-finishing activity, we leave the most remaining "time" for future activities.
- O(n log n) sort + O(n) selection.

**Minimum number of intervals to remove (to make all non-overlapping):** same as activity selection. Total - max non-overlapping = minimum removals.

**Meeting Rooms II (minimum conference rooms):**
- Sort by start time. Use a min-heap of end times of ongoing meetings.
- For each meeting: if heap top (earliest-ending meeting) ends before this starts → reuse that room. Else → new room.
- Answer: max heap size = minimum rooms.

**Interval merging:**
- Sort by start time. Merge if current start ≤ last merged end: extend last end to max(last.end, current.end).

**Insert Interval:** given sorted merged intervals, insert a new interval. Find where new interval overlaps, merge all overlapping into one, reconnect.

**Jump Game:** can you reach the end? Greedy: track the furthest reachable position. If current position > furthest reachable → can't continue.

**Jump Game II (minimum jumps):** greedy BFS. Track current range [lo, hi]. From this range, find the furthest reachable position for the next jump. Increment jumps when you reach hi.

**Key insight:** for interval problems, sorting by end time is the key for selection (activity selection, minimum deletions). Sorting by start time is the key for merging and partitioning (merge intervals, meeting rooms). This distinction matters — always identify which sort order unlocks the greedy insight.`,
    },
    {
      id: 1519,
      name: "Greedy on Arrays",
      desc: `**Greedy Array Problems** — problems where making locally optimal decisions on array elements leads to global optima.

**Candy (minimum candies per rating):** two passes. Forward pass: if rating[i] > rating[i-1], give candy[i] = candy[i-1] + 1. Backward pass: if rating[i] > rating[i+1], candy[i] = max(candy[i], candy[i+1] + 1). O(n) time and space.

**Gas Station:** can you complete a circular route? Greedy: track cumulative surplus. If it goes negative, start over from the next station (current station can't be the start for this leg). If total gas ≥ total cost, a solution exists; the last restart point is the answer.

**Assign Cookies:** maximize number of children satisfied. Sort children by greed factor, sort cookies by size. Two pointers: match each child with the smallest sufficient cookie. O(n log n).

**Non-decreasing array with at most one change:** can you make the array non-decreasing by modifying at most one element? Greedy: when you find a violation at i, try: decrease arr[i] to arr[i-1], or increase arr[i-1] to arr[i]. Choose greedily, then verify.

**Partition Labels:** partition string so each character appears in at most one part, maximize parts. Greedy: find last occurrence of each character. Maintain current partition end = max last occurrence of any character seen. When we reach current end → partition complete.

**Key insight:** greedy array problems often have a "scan left to right, maintain a variable that tracks the greedily optimal state" structure. Gas station's "restart when cumulative goes negative" is the archetype. The proof is always: any other starting point would fail sooner or not improve the result.`,
    },
    {
      id: 1520,
      name: "Greedy on Strings",
      desc: `**Greedy String Problems** — problems involving optimal manipulation or construction of strings.

**Remove K Digits (smallest number):** remove k digits to form the smallest possible number. Greedy: use a monotonic stack. When a digit is larger than the next digit, removing the larger one makes the number smaller. Keep removing until k digits removed or stack is monotonically non-decreasing.

**Largest Number from Array:** arrange array elements to form the largest number. Sort with custom comparator: a+b vs b+a (string concatenation comparison). "9" > "90" because "990" > "909".

**Minimum Number of Arrows to Burst Balloons:** same as activity selection. Sort by end, greedily shoot at the end of current balloon — bursts all overlapping.

**Monotone Array (minimum operations):** how many operations to make array non-decreasing? Convert to counting inversions problem, or use the identity that minimum operations = count of strictly decreasing pairs.

**Breaking Cryptographic Key (robot arm):** greedy sweep across characters/positions to find the minimum path.

**Reorganize String:** arrange characters so no two adjacent are the same. Greedy: always place the most frequent remaining character. Use a max-heap. If can't place (most frequent = last placed), place second most frequent. Fails only if max_frequency > (n+1)//2.

**Key insight:** "remove digits/characters greedily using a monotonic stack" is a powerful pattern. The monotonic stack naturally implements the greedy rule: "if the current element makes the stack non-monotone, the element we'd remove from the stack is the locally worse choice."`,
    },
    {
      id: 1521,
      name: "Fractional Knapsack",
      desc: `**Fractional Knapsack** — a variant of the knapsack problem where items can be divided (take any fraction). Unlike 0/1 knapsack, a simple greedy algorithm is optimal.

**Greedy strategy:** compute value/weight ratio for each item. Sort by ratio descending. Take items greedily: take the whole item if it fits, or the remaining fraction if it's the last item.

"items.sort(key=lambda x: x.value / x.weight, reverse=True)
capacity, total_value = W, 0
for item in items:
    if item.weight <= capacity:
        total_value += item.value; capacity -= item.weight
    else:
        total_value += (capacity / item.weight) * item.value; break"

**Why greedy works here (but not 0/1):** in the fractional version, taking a fraction of a high-ratio item is always at least as good as taking any fraction of a lower-ratio item. There's no indivisibility constraint that forces a binary choice.

**Why 0/1 knapsack needs DP:** suppose items are (weight=6, value=10), (weight=4, value=7), (weight=4, value=6) with W=8. Greedy by ratio: take first item (10/6≈1.67), then we can't take either other item. Optimal: take items 2 and 3 (7+6=13). Greedy fails because we can't split item 1.

**Applications:**
- Resource allocation where resources are divisible (bandwidth, CPU time, funding)
- Maximizing value when items can be partially consumed
- Scheduling with preemption (jobs can be preempted, fractional completion allowed)

**Key insight:** the fractional/0-1 distinction is fundamental. Divisibility unlocks greedy; indivisibility forces DP or combinatorial search. This is why energy routing in networks (fractional, greedy) differs from combinatorial auction (0/1, NP-hard).`,
    },
    {
      id: 1522,
      name: "Greedy Graph Algorithms",
      desc: `**Greedy Graph Algorithms** — Dijkstra's, Prim's, and Kruskal's are all greedy algorithms that work correctly because their problem structure (non-negative weights, spanning tree matroid) satisfies the greedy property.

**Kruskal's MST:** sort all edges by weight, add each edge if it connects two different components (Union-Find). Greedy correctness: the cut property — the minimum weight edge crossing any cut must be in the MST.

**Prim's MST:** start from any vertex, always add the minimum weight edge that connects the current tree to a new vertex. Min-heap tracks the frontier. Same correctness: cut property.

**Dijkstra's shortest path:** always process the unvisited node with the minimum current distance. Greedy correctness: for non-negative weights, when a node is finalized, its distance is the true shortest path (no future update can improve it, because all future edges add non-negative cost).

**Borůvka's algorithm:** for each component, find the minimum outgoing edge. Add all those edges. Repeat. O(E log V) and naturally parallelizable — used in MapReduce MST computation.

**Greedy coloring:** color graph vertices greedily (assign smallest color not used by any neighbor). Uses at most Δ+1 colors (Δ = max degree). Not always optimal (coloring is NP-hard in general) but useful heuristic.

**Key insight:** greedy graph algorithms work because graph optimization problems often have "exchange" structures — the minimum safe edge can always be swapped in from the greedy choice without loss. This is formalized by matroid theory: MST algorithms work because the set of spanning forests is a matroid.`,
    },
    {
      id: 1523,
      name: "Task Scheduling & Greedy",
      desc: `**Task Scheduling with Greedy** — optimally assigning tasks to time slots or machines using greedy strategies.

**CPU Task Scheduler (cooldown):** tasks of types A-Z, n-unit cooldown between same tasks. Greedy: always schedule the most frequent available task (or idle if cooldown forces it).

**Formula-based solution:** arrange most frequent task in blocks of (n+1). Other tasks fill the gaps. Time = max(total_tasks, (max_freq - 1) * (n + 1) + count_of_max_freq_tasks).

**Job Sequencing (maximize profit):** jobs with deadlines and profits. Greedy: sort by profit descending. For each job, schedule it in the latest available slot before its deadline. Use Union-Find to efficiently find the latest available slot.

**Minimize lateness (single machine):** schedule jobs to minimize maximum lateness (how late the last deadline-missed job is). Greedy: sort by deadline (earliest deadline first). Proof by exchange argument: swapping any non-EDF pair can only worsen the lateness.

**Weighted Job Scheduling:** each job has a start, end, and profit. Cannot have overlapping jobs. Maximize profit. Greedy fails — use DP: dp[i] = max profit considering first i jobs (sorted by end time), dp[i] = max(dp[i-1], profit[i] + dp[last_compatible(i)]).

**Key insight:** "minimize maximum lateness" with EDF is a greedy that's provably optimal via exchange argument. "Maximize total profit" requires DP because combining non-overlapping jobs is an overlapping subproblem. Recognizing which variant you have determines whether greedy or DP is correct.`,
    },
    {
      id: 1524,
      name: "Greedy Proofs & Pitfalls",
      desc: `**Greedy Correctness Proofs** — the techniques for rigorously proving or disproving greedy algorithms.

**Exchange argument (most common):** show that any solution can be converted to the greedy solution without losing quality.
1. Let OPT be any optimal solution, G be the greedy solution.
2. Find the first position where OPT differs from G.
3. Show that swapping OPT's choice for G's choice at this position yields a solution that is equally good (or better).
4. By induction, the fully-swapped solution = G is optimal.

**Matroid argument:** the problem is a matroid problem. Greedy on a matroid always gives the optimal weighted independent set. Recognizing the matroid structure immediately validates the greedy approach.

**Common greedy pitfalls:**

**Wrong greedy criterion:** the greedy rule seems natural but doesn't capture the right property. Coin change with arbitrary denominations: "pick largest coin" fails for coins [1, 3, 4] and target 6 (greedy: 4+1+1=3 coins; optimal: 3+3=2 coins).

**Greedy works for one variant but not another:** activity selection (unweighted) → greedy. Weighted job scheduling → DP. Same structure, different complexity because weights break the exchange argument.

**Local vs global optimum:** hill climbing (greedy ascent) finds a local optimum but not necessarily global. Needs restarts or simulated annealing for global search.

**Key insight:** the hardest skill in algorithm design is knowing when NOT to use greedy. A useful heuristic: if the problem has "weights" or "profits" attached to choices, be suspicious of greedy — the weights often break the exchange argument and require DP. If the problem is purely structural (earliest deadline, minimum merge cost), greedy is more likely correct.`,
    },
  ],
};

export default greedy;
