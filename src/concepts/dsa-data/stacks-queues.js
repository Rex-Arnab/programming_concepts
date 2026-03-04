const stacksQueues = {
  name: "Stacks & Queues",
  icon: "📚",
  color: "#f97316",
  concepts: [
    {
      id: 1433,
      name: "Stack",
      desc: `**Stack** — a LIFO (Last-In, First-Out) data structure where the last element pushed is the first to be popped. Think of a stack of plates: you add to the top and remove from the top.

**Core operations (all O(1)):**
- push(item): add to top
- pop(): remove and return top
- peek() / top(): view top without removing
- isEmpty(): check if empty

**Implementations:**
- **Array-based:** most common. Pre-allocated array + top index. O(1) all operations. Cache-friendly. Fixed capacity (or use dynamic array for amortized O(1)).
- **Linked list-based:** nodes pushed/popped at head. O(1) always, but O(n) memory overhead per node (pointer + value).

**Applications:**
- **Function call stack:** OS maintains a stack of stack frames (local variables, return address, args). Recursion depth = stack depth. Stack overflow = too deep.
- **Expression evaluation:** infix → postfix conversion; postfix evaluation
- **Bracket matching:** push open brackets, pop and verify on close
- **Undo/redo:** push states onto undo stack; pop to undo

**Key insight:** the call stack is a stack. Understanding stack behavior explains recursion naturally: each function call pushes a frame, each return pops one. "Stack overflow" is a stack overfilling (too many recursive calls without returning).`,
    },
    {
      id: 1434,
      name: "Queue",
      desc: `**Queue** — a FIFO (First-In, First-Out) data structure where the first element enqueued is the first to be dequeued. Think of a line at a store: first in, first served.

**Core operations (all O(1)):**
- enqueue(item): add to back
- dequeue(): remove and return front
- peek() / front(): view front without removing
- isEmpty(): check if empty

**Implementations:**
- **Circular array:** use a fixed-size array with head and tail indices that wrap around modulo capacity. O(1) all operations, cache-friendly.
- **Linked list:** enqueue at tail, dequeue at head. O(1) all operations. Use doubly linked list or maintain tail pointer.
- **Two stacks:** push to stack1; pop: if stack2 empty, move all from stack1 to stack2. Amortized O(1) per operation.

**Applications:**
- **BFS:** the defining data structure for breadth-first search — maintains the "frontier" layer by layer
- **Task scheduling:** CPU process scheduling, print spooling, network packet buffering
- **Producer-consumer:** bounded queue (BlockingQueue) between producer and consumer threads

**Key insight:** queues and stacks are inverses — stack reverses order, queue preserves it. BFS uses a queue (visit in discovery order → level-by-level). DFS uses a stack (go deep → backtrack). Choosing BFS vs DFS is often choosing queue vs stack.`,
    },
    {
      id: 1435,
      name: "Deque (Double-Ended Queue)",
      desc: `**Deque (Double-Ended Queue)** — a generalization of queue that allows efficient insertion and deletion at both front and back. The "superstructure" — both stack (push/pop at one end) and queue (push back, pop front) are special cases.

**Operations (all O(1)):**
- appendleft() / addFirst(): add to front
- append() / addLast(): add to back
- popleft() / removeFirst(): remove from front
- pop() / removeLast(): remove from back

**Implementation:** doubly linked list is the natural backing structure. Python's "collections.deque" is a doubly linked list of 64-element arrays (chunked for cache efficiency). Java's "ArrayDeque" uses a resizable circular array.

**Applications:**

**Sliding window maximum (O(n)):** maintain a monotonically decreasing deque of indices. When a new element is added, pop from back all indices with smaller values (they'll never be the max). Pop from front if the index is outside the window. Front is always the maximum.

**Palindrome check:** add all characters, compare front and back simultaneously, shrink from both ends.

**BFS with 0-1 weights (0-1 BFS):** when edge weights are 0 or 1, use a deque instead of a priority queue. Weight-0 edges go to front, weight-1 edges go to back. O(V+E) vs O((V+E) log V) with Dijkstra.

**Key insight:** the sliding window maximum deque is one of the most powerful and commonly tested tricks. A naive O(n·k) approach (check all k elements for each window position) is beaten by the O(n) deque solution by maintaining only "useful" candidates.`,
    },
    {
      id: 1436,
      name: "Priority Queue & Heap",
      desc: `**Priority Queue** — an abstract data type where each element has a priority, and the element with the highest (or lowest) priority is always served first, regardless of insertion order. The standard implementation is a binary heap.

**Operations:**
- insert(item, priority): O(log n)
- extractMax() / extractMin(): O(log n)
- peekMax() / peekMin(): O(1)
- decreaseKey() / increaseKey(): O(log n)

**Use cases:**
- **Dijkstra's shortest path:** always process the unvisited node with smallest tentative distance
- **Prim's MST:** always add the minimum-weight edge to the growing tree
- **Top-K elements:** maintain a min-heap of size k; if new element > min, replace min
- **Merge k sorted lists:** extract the smallest across all lists efficiently
- **Event-driven simulation:** process events in time order
- **A* search:** priority queue ordered by f(n) = g(n) + h(n)

**Max heap vs min heap:** most implementations provide a min-heap. To get max-heap behavior: negate values before inserting, negate when extracting.

**Key insight:** "top-k" problems are a priority queue's natural habitat. Find k largest elements in O(n log k) by maintaining a min-heap of size k: if the current element exceeds the heap's minimum, pop the min and push the current. Final heap contains the k largest.`,
    },
    {
      id: 1437,
      name: "Stack-Based Expression Parsing",
      desc: `**Expression Parsing with Stacks** — using stacks to evaluate arithmetic expressions, convert between notations, and check balanced parentheses. A classic stack application that appears in compilers and calculators.

**Balanced parentheses:** push open brackets, when closing bracket encountered, check top of stack. If they match, pop. If stack is empty or they don't match, invalid. After processing all characters, valid if and only if stack is empty.

**Infix to Postfix (Shunting-Yard algorithm):**
- Operands go directly to output
- Operators go to operator stack (pop operators of higher/equal precedence first)
- Parentheses: push open, pop to output on close
- Result: postfix expression, easily evaluated with one-pass stack

**Postfix evaluation:**
"for token in expression:
    if token is operand: stack.push(token)
    else: b, a = stack.pop(), stack.pop(); stack.push(apply(a, op, b))
return stack.pop()"

**Monotone stack for expressions:** "132 pattern" detection, "remove k digits to make smallest number" — use a monotone stack to maintain invariants on the expression structure.

**Basic calculator (with +/-/*/( )):** classic hard interview problem. Use a stack to handle parentheses — push current result and sign when opening, pop and combine when closing.

**Key insight:** stacks are the natural data structure for "the most recent context" — parentheses, function calls, undo operations. Any problem where you need to "remember what you were doing before you entered this subproblem" likely wants a stack.`,
    },
    {
      id: 1438,
      name: "BFS with Queues",
      desc: `**BFS (Breadth-First Search)** — an algorithm that explores a graph (or tree) level by level, using a queue to track the "frontier." The queue ensures nodes are processed in discovery order, visiting all nodes at distance d before any at distance d+1.

**BFS template:**
"from collections import deque
queue = deque([start])
visited = {start}
level = 0
while queue:
    for _ in range(len(queue)):  # process entire level
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)"

**Key BFS properties:**
- **Shortest path (unweighted):** BFS finds shortest path in unweighted graphs. First time a node is visited = shortest distance. Dijkstra generalizes to weighted graphs.
- **Level-order traversal:** the "process entire level before next" pattern gives level order.
- **Multi-source BFS:** start from multiple sources simultaneously. Find "distance to nearest X" for all nodes in O(V+E). Examples: nearest exit from a maze, rotting oranges.

**BFS in 2D grids:** 4 or 8 directional expansion. Each cell is visited once. O(rows × cols) time and space.

**When to use BFS vs DFS:**
- **BFS:** shortest path, level-order, spreading from source
- **DFS:** topology, cycle detection, connected components, backtracking

**Key insight:** multi-source BFS is underappreciated. Instead of running BFS from each source separately (O(S × V)), starting all sources simultaneously and letting the BFS "wavefront" expand from all of them gives O(V+E) — a massive improvement.`,
    },
    {
      id: 1439,
      name: "Monotonic Stack Problems",
      desc: `**Monotonic Stack Problems** — a category of problems solvable in O(n) by maintaining a stack where elements are monotonically increasing or decreasing. The key insight: when we pop an element, we've found its "answer" (next greater, previous smaller, etc.).

**Next Greater Element (template):**
"stack = []  # indices
result = [-1] * n
for i in range(n):
    while stack and nums[stack[-1]] < nums[i]:
        result[stack.pop()] = nums[i]  # i is the next greater for popped index
    stack.append(i)"

**Classic monotonic stack problems:**
- **Largest Rectangle in Histogram:** decreasing stack. When we pop a bar (because current bar is shorter), its area = popped_height × (i - stack[-1] - 1). O(n).
- **Trapping Rain Water:** for each position, water = min(max_left, max_right) - height. Two-pass precomputation or monotonic stack.
- **Next Greater Element / Smaller Element / Previous Greater / Previous Smaller:** four variants, all O(n) with a monotonic stack.
- **Sum of Subarray Minimums:** for each element as the minimum, count subarrays where it's the minimum using previous smaller and next smaller element.
- **Buildings with Ocean View:** maintain a decreasing stack of building heights.

**Key insight:** the monotonic stack is a "lazy deletion" mechanism. We keep elements in the stack only as long as they're still "relevant" (haven't been beaten by a later element). When we pop, we compute the answer for the popped element using the current context. Each element is pushed/popped once → O(n).`,
    },
    {
      id: 1440,
      name: "Stack for DFS (Iterative)",
      desc: `**Iterative DFS with Explicit Stack** — converting recursive DFS to iterative using an explicit stack, avoiding call stack depth limits and gaining control over traversal order.

**Iterative DFS template:**
"stack = [root]
visited = set()
while stack:
    node = stack.pop()  # LIFO: explores most recently discovered node
    if node in visited:
        continue
    visited.add(node)
    # process node
    for neighbor in graph[node]:
        if neighbor not in visited:
            stack.append(neighbor)"

**Tree preorder vs postorder iteratively:**
- Preorder (root, left, right): push right first, then left (pop processes left first)
- Postorder (left, right, root): reverse of "root, right, left" → push left, then right, then reverse result
- Inorder (left, root, right): more complex — push nodes as you go left, process when no more left children

**Backtracking with iterative DFS:** instead of tracking the path in a variable, you can maintain state in the stack items as tuples (node, partial_path, remaining_choices).

**Controlled DFS:** iterative DFS lets you pause and resume, implement coroutines, or add timeout. Recursive DFS doesn't give you these control points without complex coroutine machinery.

**Key insight:** recursive DFS uses the OS call stack implicitly. Iterative DFS uses your own explicit stack. The behavior is identical — the difference is who manages the stack. When recursion depth could exceed ~10,000 nodes (rare but possible), convert to iterative.`,
    },
    {
      id: 1441,
      name: "Queue Implementations",
      desc: `**Queue Implementation Details** — how queues are built under the hood, and the trade-offs between implementations.

**Circular array queue:** use a fixed-size array. head and tail are indices modulo capacity. Enqueue: arr[tail] = item; tail = (tail+1) % capacity. Dequeue: item = arr[head]; head = (head+1) % capacity. O(1) all ops, excellent cache performance, fixed capacity.

**Dynamic resizing:** when full, allocate 2x array, copy elements starting from head. Amortized O(1) enqueue. Python's "collections.deque" uses a different strategy: doubly linked list of fixed-size blocks (64 elements each) — avoids full copy on resize, maintains cache efficiency.

**Two-stack queue:** use two stacks (inbox and outbox). Enqueue to inbox. Dequeue from outbox; if outbox is empty, move all from inbox to outbox. Amortized O(1) per operation. Classic interview question.

**Linked list queue:** maintain head (dequeue here) and tail (enqueue here) pointers. O(1) guaranteed all operations. O(n) memory with pointer overhead. Good when you can't bound queue size.

**Thread-safe queues:** Java's "ArrayBlockingQueue" (bounded, blocks producer when full), "LinkedBlockingQueue" (unbounded). Python's "queue.Queue" (thread-safe with locking). Lock-free queues exist but are complex.

**Key insight:** for interview problems, "collections.deque" is the correct Python queue — O(1) popleft(), which a plain list cannot provide (list.pop(0) is O(n) due to shifting). This is a common source of TLE on BFS problems using Python lists as queues.`,
    },
    {
      id: 1442,
      name: "Heap Implementation",
      desc: `**Binary Heap** — a complete binary tree satisfying the heap property: in a max-heap, every parent ≥ its children; in a min-heap, every parent ≤ its children. Stored efficiently as an array with no explicit pointers.

**Array indexing:**
- Left child of i: 2i + 1
- Right child of i: 2i + 2
- Parent of i: (i - 1) // 2

**Heapify (sift-down):** fix the heap property at index i by comparing with children and swapping with the smaller child (min-heap), recursively. O(log n).

**Build heap from array (heapify all):** start from the last non-leaf node (n//2 - 1), sift down each. O(n) — counterintuitive but proven by summing the work per level.

**Heap push (sift-up):** add to end, bubble up by swapping with parent while heap property violated. O(log n).

**Heap pop (extract min/max):** swap root with last element, remove last, sift root down. O(log n).

**Python heapq module:** "heapq.heappush(heap, item)", "heapq.heappop(heap)" for min-heap. "heapq.heapify(list)" in O(n). For max-heap: negate values. For custom priority: push (priority, item) tuples.

**Heap sort:** build heap O(n), extract max n times O(n log n) total. In-place, O(1) space, O(n log n) always. But poor cache performance (non-sequential access pattern) makes it slower than quicksort in practice despite same asymptotic complexity.

**Key insight:** build-heap is O(n), not O(n log n). This is why creating a priority queue from a list with "heapify" is faster than inserting elements one by one. The math: most nodes are near the bottom (leaves) and require only O(1) sift-down work.`,
    },
  ],
};

export default stacksQueues;
