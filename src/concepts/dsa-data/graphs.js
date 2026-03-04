const graphs = {
  name: "Graphs & Graph Algorithms",
  icon: "🕸️",
  color: "#06b6d4",
  concepts: [
    {
      id: 1477,
      name: "Graph Fundamentals",
      desc: `**Graph** — a data structure of vertices (nodes) and edges (connections). The most general relational data structure, representing everything from road networks to social graphs, dependency trees, and circuit boards.

**Graph terminology:**
- **Directed (digraph):** edges have direction. A → B ≠ B → A. Used for: dependency graphs, web links, Twitter following.
- **Undirected:** edges are bidirectional. A — B means both A→B and B→A. Used for: road maps, friendship graphs, network topology.
- **Weighted:** edges have associated costs. Used for: shortest path with distances, MST.
- **Unweighted:** all edges have equal cost (or cost = 1).
- **Cyclic / Acyclic:** has cycles or doesn't. DAG = Directed Acyclic Graph.
- **Connected / Disconnected:** every vertex reachable from every other (connected) or not.
- **Dense / Sparse:** E ≈ V² (dense) vs E ≈ V (sparse).

**Graph representations:**
- **Adjacency list:** for each vertex, list of neighbors. O(V+E) space. O(degree) to find neighbors. Standard for sparse graphs.
- **Adjacency matrix:** V×V boolean matrix. O(V²) space. O(1) edge existence check. Standard for dense graphs or where edge lookup is critical.
- **Edge list:** list of (u, v) or (u, v, weight) pairs. O(E) space. Used in Kruskal's algorithm.

**Key insight:** most real-world graphs are sparse (E << V²). Use adjacency lists by default. Adjacency matrices waste memory for sparse graphs but give O(1) "does edge (u,v) exist?" which matters in algorithms like Floyd-Warshall.`,
    },
    {
      id: 1478,
      name: "Graph DFS",
      desc: `**Graph DFS (Depth-First Search)** — explore as far as possible along each branch before backtracking. Uses a stack (implicit recursion or explicit). Discovers connected components, detects cycles, produces topological order.

**DFS template (iterative):**
"def dfs(graph, start):
    visited = set()
    stack = [start]
    while stack:
        node = stack.pop()
        if node in visited: continue
        visited.add(node)
        process(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                stack.append(neighbor)"

**DFS tree edges:** during DFS, edges are classified as:
- **Tree edges:** edges in the DFS tree (discovery edges)
- **Back edges:** to an ancestor in DFS tree → indicates a cycle (in directed graphs)
- **Forward/Cross edges:** only in directed graphs

**DFS time complexity:** O(V+E) — each vertex and edge is processed once.

**DFS applications:**
- **Connected components:** run DFS from each unvisited node, each DFS = one component
- **Cycle detection (directed):** track "currently in stack" (gray nodes). Back edge → cycle.
- **Cycle detection (undirected):** back edge to any visited non-parent node → cycle.
- **Topological sort:** post-order DFS reversal (reverse of finish times)
- **Strongly Connected Components (SCC):** Tarjan's or Kosaraju's algorithm uses DFS twice
- **Path finding, maze solving, flood fill**

**Key insight:** DFS on graphs differs from trees because graphs can have cycles. The visited set (or color coding: white/gray/black) prevents revisiting nodes and infinite loops. This simple addition makes DFS on arbitrary graphs as clean as DFS on trees.`,
    },
    {
      id: 1479,
      name: "Graph BFS",
      desc: `**Graph BFS (Breadth-First Search)** — explore all neighbors at distance d before any at distance d+1. Uses a queue. Finds shortest paths in unweighted graphs. Essential for level-by-level or "spreading" problems.

**BFS shortest path:**
"from collections import deque
def bfs(graph, start, end):
    queue = deque([(start, [start])])
    visited = {start}
    while queue:
        node, path = queue.popleft()
        if node == end: return path
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))"

**BFS applications:**
- **Shortest path (unweighted):** first time BFS reaches a node = shortest distance from source
- **Level-order traversal:** process nodes by increasing distance from source
- **Multi-source BFS:** start from all sources simultaneously. "Distance to nearest X": add all X to queue initially, BFS outward.
- **Bipartite check:** try 2-coloring with BFS. If any edge connects same-color nodes → not bipartite.
- **Word ladder:** BFS on "word graph" where edges connect words differing by one letter
- **01 BFS:** use a deque, push weight-0 neighbors to front, weight-1 to back — O(V+E) shortest path for 0/1 weights

**BFS vs DFS:**
| | BFS | DFS |
|---|---|---|
| Path found | Shortest (unweighted) | Any path |
| Space | O(W) where W = max width | O(D) where D = max depth |
| Use for | Level/distance problems | Cycle, topology, SCCs |

**Key insight:** BFS guarantees shortest path in unweighted graphs because it explores nodes in non-decreasing order of distance. Prove it by induction: all nodes at distance d are visited before any at distance d+1 (queue order guarantees this).`,
    },
    {
      id: 1480,
      name: "Topological Sort",
      desc: `**Topological Sort** — an ordering of vertices in a directed acyclic graph (DAG) such that for every directed edge u → v, u comes before v in the ordering. Only possible for DAGs (no cycles).

**Use cases:** task scheduling with dependencies, build systems (npm install order), course prerequisites, compilation order, spreadsheet formula evaluation.

**Algorithm 1 — Kahn's (BFS-based):**
1. Compute in-degree of all vertices
2. Add all vertices with in-degree 0 to queue
3. Process: pop from queue, output, decrement neighbors' in-degrees, add newly zero-in-degree neighbors to queue
4. If output has fewer than V vertices → cycle detected

**Algorithm 2 — DFS postorder:**
1. Run DFS, tracking finish times
2. Output vertices in reverse order of finish time (postorder reversed = topological order)
3. If a back edge is detected during DFS → cycle

"def topo_sort(graph):
    visited, result = set(), []
    def dfs(node):
        visited.add(node)
        for nei in graph[node]:
            if nei not in visited: dfs(nei)
        result.append(node)  # postorder
    for node in graph:
        if node not in visited: dfs(node)
    return result[::-1]  # reverse = topological order"

**All topological orderings:** when multiple valid orderings exist, Kahn's naturally generates one. Finding all orderings is exponential.

**Key insight:** Kahn's algorithm doubles as cycle detection — if the output list length < number of vertices, there's a cycle (some vertex was never added to the queue because its in-degree never reached zero). This is cleaner than DFS-based cycle detection.`,
    },
    {
      id: 1481,
      name: "Shortest Path Algorithms",
      desc: `**Shortest Path Algorithms** — a family of algorithms for finding minimum-cost paths between vertices in weighted graphs.

**Algorithm selection guide:**
| Scenario | Algorithm | Complexity |
|---|---|---|
| Unweighted graph | BFS | O(V+E) |
| Single source, non-negative weights | Dijkstra | O((V+E) log V) |
| Single source, negative weights | Bellman-Ford | O(VE) |
| All pairs | Floyd-Warshall | O(V³) |
| DAG (any weights) | DAG relaxation | O(V+E) |
| Dense graph | Dijkstra w/ matrix | O(V²) |

**Bellman-Ford:** relax all edges V-1 times. Handles negative weights. Detects negative cycles (if relaxation possible after V-1 rounds → negative cycle). O(VE).

**Floyd-Warshall:** DP on pairs. "dist[i][j][k] = shortest path from i to j using only intermediate nodes 0..k." Transition: "dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])". O(V³) time and O(V²) space.

**SPFA (Shortest Path Faster Algorithm):** Bellman-Ford with a queue — only relax edges from recently updated vertices. Average O(E) but O(VE) worst case. Used in competitive programming.

**Key insight:** negative edge weights destroy Dijkstra's correctness. Dijkstra's invariant — "when a node is popped, its distance is final" — fails with negative edges because a future path via a negative edge could be shorter. If you see negative weights, reach for Bellman-Ford. If you see negative cycles (infinite negative loop), the problem changes fundamentally.`,
    },
    {
      id: 1482,
      name: "Minimum Spanning Tree",
      desc: `**Minimum Spanning Tree (MST)** — a spanning tree of a weighted undirected graph that includes all vertices and minimizes the total edge weight. Exactly V-1 edges, no cycles.

**Kruskal's Algorithm:**
1. Sort all edges by weight: O(E log E)
2. Process edges in order: if adding an edge connects two different components (Union-Find), add it; otherwise skip (would create a cycle)
3. Stop when V-1 edges added

"edges.sort(key=lambda e: e.weight)
uf = UnionFind(V)
for edge in edges:
    if uf.union(edge.u, edge.v):  # returns True if they were in different components
        mst.append(edge)"

**Prim's Algorithm:** grow one tree from a start vertex. At each step, add the minimum weight edge connecting the current tree to a new vertex. Use a min-heap. O((V+E) log V).

**Kruskal vs Prim:**
- Kruskal: sort edges first — better for sparse graphs (small E). Simple with Union-Find.
- Prim: heap-based — better for dense graphs (large E). Finds the MST component-by-component.

**Cut Property (why greedy works):** for any cut (partition of vertices into two sets), the minimum weight edge crossing the cut must be in the MST. This is why both algorithms are correct: they always choose the minimum safe edge.

**MST applications:** network design (minimum cable laying cost), clustering, TSP approximation (MST gives 2x approximation), Borůvka's for parallel MST computation.

**Key insight:** both Kruskal's and Prim's are greedy, and their correctness follows from the same cut property. The difference is *how* they select the next safe edge: Kruskal globally sorts all edges; Prim greedily extends the current frontier.`,
    },
    {
      id: 1483,
      name: "Union-Find (Disjoint Set Union)",
      desc: `**Union-Find (DSU)** — a data structure that efficiently tracks a partition of elements into disjoint sets, supporting near-O(1) union and find operations. The backbone of Kruskal's MST and many connectivity problems.

**Operations:**
- **find(x):** returns the representative (root) of x's set. Two elements in the same set have the same representative.
- **union(x, y):** merges the sets containing x and y.

**Naive implementation:** array where parent[i] = parent of i (parent[root] = root). find() traverses up to root. O(n) worst case for degenerate trees.

**Optimizations (crucial):**
- **Union by rank/size:** always attach the smaller tree under the larger. Keeps tree height O(log n).
- **Path compression:** when finding root, make every node on the path point directly to root.
"def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])  # path compression
    return parent[x]"

**Combined (Inverse Ackermann time):** with both optimizations, nearly O(1) per operation — practically constant for all problem sizes. Formally O(α(n)) where α is the inverse Ackermann function (α(10^80) = 4).

**Applications:**
- **MST (Kruskal's):** union two endpoints of an edge; skip if already connected
- **Number of islands:** union adjacent land cells
- **Accounts merge:** union emails belonging to the same account
- **Cycle detection (undirected):** if find(u) == find(v) before union → cycle
- **Dynamic connectivity:** track connected components as edges are added

**Key insight:** Union-Find answers "are these two elements in the same group?" and "merge these two groups" in near-O(1). It cannot answer "list all members of a group" efficiently (without extra bookkeeping). The path compression + union by rank combination is one of the most elegant optimizations in all of computer science.`,
    },
    {
      id: 1484,
      name: "Cycle Detection in Graphs",
      desc: `**Cycle Detection** — determining whether a graph contains a cycle. Different algorithms for directed vs undirected graphs.

**Undirected graph (DFS):** during DFS, if we reach a visited vertex that is not the parent of the current vertex → cycle found. Track parent to avoid trivially going back on the same edge.

**Undirected graph (Union-Find):** process each edge (u, v): if find(u) == find(v), they're already connected → adding this edge creates a cycle. If not, union them.

**Directed graph (DFS with 3-coloring):**
- White (0): unvisited
- Gray (1): currently in DFS stack (being explored)
- Black (2): fully explored
If we encounter a gray vertex → back edge → cycle.

"color = [0] * V
def dfs(v):
    color[v] = 1  # gray
    for nei in graph[v]:
        if color[nei] == 1: return True  # back edge → cycle
        if color[nei] == 0 and dfs(nei): return True
    color[v] = 2  # black
    return False"

**Floyd's cycle detection (linked list / sequence):** fast/slow pointer algorithm for cycle detection in sequences. If fast == slow, cycle exists. Find entry: reset one pointer to start, advance both by 1 until they meet.

**Kahn's topological sort:** if output length < V after Kahn's → cycle detected (vertices in cycle never reach in-degree 0).

**Key insight:** for directed graphs, you must track the "currently on the path" state (gray) separately from "already fully explored" (black). A visited (black) vertex is not a cycle — you can legitimately reach it from multiple paths. Only a currently-in-stack (gray) vertex indicates a back edge and cycle.`,
    },
    {
      id: 1485,
      name: "Strongly Connected Components",
      desc: `**Strongly Connected Components (SCCs)** — maximal subgraphs where every vertex is reachable from every other vertex. The fundamental decomposition of directed graphs.

**Kosaraju's Algorithm (two-pass DFS):**
1. Run DFS on original graph, push to stack in finish order
2. Transpose graph (reverse all edges)
3. Run DFS on transposed graph in reverse finish order (from stack) — each DFS tree is one SCC

**Tarjan's Algorithm (single-pass DFS):**
- Track discovery time ("disc") and lowest reachable time ("low") for each vertex
- When "low[v] == disc[v]", v is the root of an SCC — pop vertices from a stack until v

"def tarjan(v):
    disc[v] = low[v] = timer[0]; timer[0] += 1
    stack.append(v); on_stack[v] = True
    for nei in graph[v]:
        if disc[nei] == -1: tarjan(nei); low[v] = min(low[v], low[nei])
        elif on_stack[nei]: low[v] = min(low[v], disc[nei])
    if low[v] == disc[v]:  # v is SCC root
        scc = []
        while True:
            u = stack.pop(); on_stack[u] = False; scc.append(u)
            if u == v: break
        sccs.append(scc)"

**SCC applications:**
- **Condensation graph:** contract each SCC to a single node → DAG. Many graph problems reduce to DAG problems after condensation.
- **2-SAT:** SCC on implication graph
- **Strongly connected component in software:** find cyclic dependencies in module graphs
- **Web graph analysis:** "bow-tie" structure of the web (giant SCC with peripheral nodes)

**Key insight:** the SCC condensation gives you a DAG, which is much easier to work with than a general directed graph. Many "find the best path/ordering" problems on directed graphs are solved by: find SCCs, contract to DAG, solve the problem on the DAG.`,
    },
    {
      id: 1486,
      name: "Bipartite Graph & Matching",
      desc: `**Bipartite Graph** — a graph where vertices can be divided into two disjoint sets U and V such that every edge connects a vertex in U to a vertex in V. No edges within U or within V.

**Bipartite check (2-coloring):** BFS or DFS, alternating colors. If any edge connects two same-colored vertices → not bipartite. A graph is bipartite if and only if it has no odd-length cycles.

**Applications of bipartiteness:**
- Job scheduling: jobs (U) and machines (V), edges = capability
- Stable matching: men (U) and women (V), edges = preferences
- Recommendation: users (U) and items (V), edges = interactions

**Maximum Bipartite Matching:** find the maximum number of edges such that each vertex is matched to at most one partner.

**Hungarian Algorithm (augmenting paths):** O(V × E). Find an augmenting path (alternating matched/unmatched edges from unmatched U vertex to unmatched V vertex). Augmenting: flip matched/unmatched along the path, increasing matching size by 1. Repeat until no augmenting path.

**Hopcroft-Karp:** O(E × √V). Finds multiple augmenting paths simultaneously using BFS for level graph, DFS for paths.

**König's Theorem (for bipartite graphs):** maximum matching = minimum vertex cover. (Not true for general graphs — that's NP-hard.)

**Key insight:** bipartite matching reduces to max-flow on a flow network: super-source → U vertices (capacity 1), U vertices → V vertices (capacity 1 for each edge), V vertices → super-sink (capacity 1). This connection between matching and flow is one of the most beautiful results in combinatorics.`,
    },
    {
      id: 1487,
      name: "Network Flow",
      desc: `**Network Flow (Max Flow)** — finding the maximum flow from source s to sink t in a directed graph with edge capacities. Applications in transportation, scheduling, and matching.

**Ford-Fulkerson Method:** while there exists an augmenting path from s to t (path with available capacity on every edge), send flow along it. The residual graph includes backward edges (capacity = current flow, enabling "undoing" flow).

**Augmenting path algorithms:**
- **Edmonds-Karp:** BFS augmenting paths. O(VE²). Guaranteed polynomial time.
- **Dinic's Algorithm:** BFS to build level graph, DFS for blocking flow. O(V²E). O(E√V) for unit-capacity graphs. Practical and commonly implemented.

**Residual graph:** after sending f units on edge u→v, add backward edge v→u with capacity f. This allows "canceling" previously sent flow if a better path uses that capacity.

**Max-Flow Min-Cut Theorem:** maximum flow = minimum cut capacity. A cut partitions vertices into S (containing s) and T (containing t); cut capacity = sum of capacities of edges from S to T.

**Applications:**
- **Bipartite matching:** as described above — O(E√V) with Dinic's
- **Image segmentation:** pixels as nodes, edges weighted by similarity
- **Project selection:** maximize profit given dependencies
- **Baseball elimination:** can team X still win? Formulated as max flow.

**Key insight:** many problems that don't obviously involve flow turn out to reduce to it. The technique: model entities as source/sink, decisions as edges with capacities, and find the max flow. If max flow equals the total possible flow, a certain outcome is achievable; otherwise it's not.`,
    },
    {
      id: 1488,
      name: "Bellman-Ford & SPFA",
      desc: `**Bellman-Ford Algorithm** — computes single-source shortest paths in graphs with negative edge weights. Runs V-1 relaxation passes over all edges, detecting negative cycles on the Vth pass.

**Relaxation:** "if dist[u] + weight(u,v) < dist[v]: dist[v] = dist[u] + weight(u,v)". After V-1 passes, shortest paths of at most V-1 edges are optimal. If a path can still be relaxed after V-1 passes → negative cycle.

"dist = [infinity] * V; dist[src] = 0
for _ in range(V - 1):
    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            dist[v] = dist[u] + w
# Check for negative cycles:
for u, v, w in edges:
    if dist[u] + w < dist[v]: return 'negative cycle'"

**Negative cycle detection:** not just detection but finding the cycle — run Bellman-Ford, find the vertex still being relaxed, trace back V steps through predecessors.

**SPFA (Shortest Path Faster Algorithm):** maintains a queue of vertices whose distances have been updated. Only relaxes edges from these vertices. Average O(E), worst O(VE). Popular in competitive programming for its speed in practice (though same theoretical worst case as Bellman-Ford).

**When Bellman-Ford is the right choice:**
- Negative edge weights (Dijkstra fails)
- Need to detect/report negative cycles
- Graph has small V (V ≤ 1000 makes O(VE) tractable)

**Key insight:** Bellman-Ford is correct because the shortest path between any two vertices in a V-vertex graph uses at most V-1 edges (no negative cycles). So V-1 passes of "relax all edges" is sufficient to find all shortest paths.`,
    },
    {
      id: 1489,
      name: "Floyd-Warshall",
      desc: `**Floyd-Warshall** — an all-pairs shortest path algorithm using DP. Computes the shortest path between all pairs (i, j) in O(V³) time and O(V²) space.

**DP recurrence:** "dist[i][j][k] = minimum distance from i to j using only vertices {0, 1, ..., k} as intermediates."
Transition: "dist[i][j][k] = min(dist[i][j][k-1], dist[i][k][k-1] + dist[k][j][k-1])"
Simplified (iterate k from 0 to V-1, in-place):
"for k in range(V):
    for i in range(V):
        for j in range(V):
            dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])"

**Initialization:** dist[i][i] = 0, dist[i][j] = weight(i,j) if edge exists, else infinity.

**Negative cycle detection:** after running Floyd-Warshall, if dist[i][i] < 0 for any i → vertex i is on a negative cycle.

**When to use Floyd-Warshall:**
- Need all-pairs shortest paths (not just from one source)
- Dense graph (V² edges) — O(V³) beats V × Dijkstra's O(V² log V + VE) for dense graphs
- V is small (V ≤ 500 for typical constraints)
- Negative edge weights exist (run Bellman-Ford V times otherwise)

**Transitive closure:** replace min with OR, + with AND. Computes reachability: "can vertex i reach vertex j?" O(V³).

**Key insight:** Floyd-Warshall's elegance is in the DP formulation: "What if vertex k is the highest-numbered intermediate vertex on the path from i to j?" Adding vertices one by one and updating all pairs gives an easy-to-implement O(V³) solution that subsumes all previous work.`,
    },
    {
      id: 1490,
      name: "A* Search Algorithm",
      desc: `**A* Search** — an informed graph search algorithm that finds the shortest path from source to target using a heuristic function h(n) to guide the search. Faster than Dijkstra by exploring more promising paths first.

**Core formula:** f(n) = g(n) + h(n), where:
- g(n): actual cost from source to current node
- h(n): estimated (heuristic) cost from current node to target
- f(n): estimated total path cost through n

**Priority queue:** ordered by f(n), not just g(n) like Dijkstra. Nodes with lower estimated total cost are explored first.

**Admissible heuristic:** h(n) must never overestimate the true cost. With an admissible heuristic, A* is optimal (finds the shortest path).
- Grid pathfinding: Manhattan distance (4-directional) or Euclidean distance (8-directional)
- Road networks: straight-line (Euclidean) distance to destination

**Consistent (monotone) heuristic:** h(n) ≤ cost(n, n') + h(n') for every edge (n, n'). Stronger than admissibility. Ensures each node is expanded at most once (like Dijkstra's node-expansion guarantee).

**A* vs Dijkstra:** Dijkstra explores all nodes within distance d before any at distance d+1. A* focuses the search toward the target, potentially exploring far fewer nodes. On a grid, A* with Manhattan heuristic is often 10-100x faster than Dijkstra for point-to-point queries.

**Key insight:** the quality of the heuristic determines A* efficiency. A heuristic of h(n) = 0 reduces A* to Dijkstra. A perfect heuristic (h = true distance) makes A* explore only the optimal path. The better your heuristic, the fewer nodes explored — choosing or deriving a good heuristic is the art of applying A*.`,
    },
  ],
};

export default graphs;
