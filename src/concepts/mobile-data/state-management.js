const stateManagement = {
  name: "State Management",
  icon: "🗂️",
  color: "#f97316",
  concepts: [
    {
      id: 360,
      name: "Local vs Global State",
      desc: `**State management architecture** begins with correctly classifying state: local state lives in a single component and doesn't need to be shared; global state is accessed and mutated by multiple components across the app.

**The state classification matrix:**
- **Local / component state:** Form input values, expanded/collapsed toggle, loading indicator, scroll position — belongs in useState/setState
- **Screen state:** Data fetched for a specific screen, selected items — belongs in the screen's state or a screen-scoped provider
- **Feature state:** Shopping cart, authentication, user preferences — shared across multiple screens, belongs in a global store or scoped provider
- **Server state:** Data fetched from an API — has its own lifecycle (loading, error, stale, fresh) and should be managed by a data-fetching library (React Query, SWR, Riverpod AsyncNotifier)

**The "lift state up" mistake in mobile:** Web developers often lift all state to a global Redux store by habit. In mobile apps, this creates performance problems (the entire app re-renders on state changes) and coupling (screens that could be isolated become dependent on global state).

**Server state vs client state:** These are fundamentally different problems. Client state (theme, selected tab) is owned by the app. Server state (user profile, feed items) is owned by the server — the app holds a cached copy. Treat them differently: client state gets a simple store, server state gets a caching layer with invalidation.

**Key insight:** Most state management complexity in mobile apps comes from prematurely globalizing state that belongs in a component or screen. Start with local state; only elevate to global when you have a concrete need (two distant components need the same data). You can always lift state up; it's harder to push it back down.`,
    },
    {
      id: 361,
      name: "Redux in React Native",
      desc: `**Redux** — a predictable state management library based on unidirectional data flow: actions describe what happened, reducers describe how state changes in response, and the store holds the current state. **Redux Toolkit (RTK)** is the modern, opinionated way to write Redux with significantly less boilerplate.

**Redux core concepts:**
- **Store:** Single source of truth — one JS object containing all global state
- **Action:** Plain object describing an event ({type: 'counter/increment', payload: 1})
- **Reducer:** Pure function (currentState, action) → newState
- **Dispatch:** Sends an action to the store, triggering the reducer
- **Selector:** Derived state computed from the store

**Redux Toolkit improvements:** createSlice() generates action creators and reducers together. createAsyncThunk handles async operations with loading/success/error states. RTK Query is a built-in data-fetching and caching layer — comparable to React Query but integrated with Redux.

**react-redux hooks:** useSelector() subscribes to store state. useDispatch() returns the dispatch function. Both are memoized — useSelector only re-renders when the selected state changes.

**Redux DevTools:** Time-travel debugging, action replay, and state inspection. Invaluable for complex state flows. In React Native, use the Flipper Redux DevTools plugin.

**When Redux fits:** Large apps with complex state interactions across many screens, apps requiring time-travel debugging, teams that benefit from explicit action documentation, apps with complex optimistic UI or offline-sync scenarios.

**Key insight:** Redux Toolkit solved most of the boilerplate criticisms of original Redux. If you're writing action type constants, mapStateToProps, and switch statements in 2025, adopt RTK — you're writing 5x more code than necessary.`,
    },
    {
      id: 362,
      name: "Zustand",
      desc: `**Zustand** — a minimal, unopinionated React state management library that uses hooks and closures instead of Redux's explicit action/reducer model. Extremely small (under 1KB), simple to learn, and surprisingly capable for most React Native app state needs.

**Zustand model:** Create a store with a create() function that returns a hook. The store is a function that receives a set() function to update state and a get() function to read current state. Consume state with the useStore hook.

**Zustand advantages over Redux:**
- No actions, no reducers, no action creators — just methods that call set()
- No Provider required — store is a module, not a React context
- Selective subscriptions built-in (subscribe to only the slice you need)
- Works outside React (in services, non-component code)
- Middleware for devtools, immer, persist, subscribeWithSelector

**Slice pattern:** For large apps, split the store into slices and combine them — similar to Redux's combineReducers but simpler. Each slice defines its own state and actions.

**Zustand + immer:** The immer middleware lets you write mutative-looking state updates (draft.count++) that produce immutable state updates underneath. Eliminates the nested spread operator boilerplate.

**When Zustand fits:** Mid-size apps with straightforward state needs, teams that find Redux too ceremonial, new projects where developer velocity matters. Zustand is not a replacement for server state management — pair it with React Query for server state.

**Key insight:** Zustand's simplicity is deceptive — it handles production apps at significant scale (including major apps). Don't equate "simple" with "limited." The absence of boilerplate is a genuine feature, not a missing feature.`,
    },
    {
      id: 363,
      name: "React Query / TanStack Query",
      desc: `**TanStack Query (React Query)** — a server state management library that handles data fetching, caching, background refetching, pagination, and mutation with automatic stale-while-revalidate behavior. Often described as "missing data-fetching layer for React."

**Why server state is different:** Server state is asynchronous (requires loading/error states), shared (multiple components need the same data), possibly stale (the server's version may have changed), and needs synchronization (keep the UI in sync with the server).

**Core abstractions:**
- **useQuery:** Fetches data, returns {data, isLoading, isError, refetch}. Caches by queryKey. Background refetches when window refocuses or network reconnects
- **useMutation:** Handles create/update/delete operations. Provides onSuccess/onError callbacks for cache invalidation and optimistic updates
- **queryClient.invalidateQueries:** Marks cache entries as stale, triggering background refetch

**Stale-while-revalidate:** Show cached (potentially stale) data immediately while fetching fresh data in the background. Users see instant content instead of loading spinners; they get updated content without waiting for a full refresh.

**In React Native context:** React Query works identically in React Native. AppState listener integration triggers refetch when the app comes to the foreground. Network status integration pauses queries when offline.

**Optimistic updates:** Immediately update the cache with the expected mutation result, then rollback if the server returns an error. Provides instant feedback for common actions (like/unlike, follow/unfollow).

**Key insight:** React Query eliminates 80% of the useEffect + useState + fetch boilerplate that pollutes React Native screens. Every screen that currently has "const [data, setData] = useState(null); useEffect(() => { fetch...}, []);" should be migrated to useQuery.`,
    },
    {
      id: 364,
      name: "Context API & useReducer",
      desc: `**React Context API** distributes state to deeply nested components without prop drilling. **useReducer** manages complex state transitions with an action/state model similar to Redux but local to a component tree.

**Context API mechanics:** createContext() creates a context object. Provider wraps the component tree and supplies a value. useContext() subscribes any descendant to that value. When the Provider's value changes, all subscribers re-render.

**Context performance caveat:** Every useContext(MyContext) call re-renders when the context value changes — even if the consuming component only uses one field of a multi-field context value. This is the context performance trap: putting multiple state values in one context causes unnecessary re-renders.

**Solutions to context re-render problem:** Split context by update frequency (ThemeContext changes rarely, CartContext changes frequently — separate them). Use useMemo for context values. Use context selector libraries (use-context-selector) that re-render only when the selected slice changes.

**useReducer pattern:** For complex local state with multiple sub-values and interdependencies, useReducer (state, dispatch) provides a Redux-like mental model locally. Define actions and a reducer; dispatch actions to update state.

**When Context + useReducer is appropriate:** Authentication state (user, login, logout), theme state, locale/i18n, simple app-wide settings. Not appropriate for high-frequency updates, large data sets, or server state (use React Query instead).

**Key insight:** Context API is NOT a state management solution for complex apps — it's a dependency injection mechanism. Using it for everything causes performance problems at scale. Use it for stable, infrequently-changing data (auth, theme, locale), and use dedicated state libraries for everything else.`,
    },
    {
      id: 365,
      name: "Offline-First Architecture",
      desc: `**Offline-first** — designing a mobile app so that it functions fully (or gracefully degrades) without network connectivity, treating the network as an enhancement rather than a requirement.

**Why mobile needs offline-first:** Mobile devices lose connectivity constantly — tunnels, elevators, subways, poor signal areas. Apps that display blank screens or errors during connectivity loss provide poor user experience. The average mobile user experiences network interruptions multiple times per day.

**Offline-first patterns:**
- **Cache-first reads:** Always read from local cache first, then update from server in the background
- **Queue-first writes:** User actions (form submissions, messages, likes) are queued locally and synced when connectivity restores
- **Conflict resolution:** When a local mutation and a server update affect the same data, a conflict resolution strategy is needed (last-write-wins, operational transforms, CRDTs)

**Implementation stack (React Native):**
- **WatermelonDB or SQLite:** Local relational database for structured data with sync capability
- **React Query offline support:** Pauses network requests when offline, resumes when online
- **react-native-netinfo:** Network state monitoring
- **Background Fetch:** Periodic background sync even when app is backgrounded

**Sync strategies:**
- **Full sync:** Re-fetch everything periodically. Simple, but bandwidth-intensive
- **Delta sync:** Fetch only changes since last sync (using timestamps or sequence numbers). Efficient, more complex to implement
- **Conflict-free Replicated Data Types (CRDTs):** Mathematical structures that merge concurrent edits without conflicts. Used by Figma, Linear, and collaborative apps

**Key insight:** Offline-first is a spectrum, not a binary. Start with "cache-first reads" (show cached data immediately, update in background) — this is achievable with React Query's staleTime and a reasonable cache duration, and it dramatically improves perceived performance without a full offline implementation.`,
    },
    {
      id: 366,
      name: "MobX in React Native",
      desc: `**MobX** — a state management library based on the observable pattern. State is made observable; components that read observable state automatically subscribe and re-render when it changes. No explicit actions/reducers/dispatches required.

**MobX core concepts:**
- **Observable:** State that MobX tracks. @observable decorator or makeAutoObservable()
- **Action:** Method that modifies observable state. MobX batches re-renders during actions
- **Computed:** Derived state, cached and only recalculated when dependencies change. @computed
- **Reaction / autorun:** Side effects that run when observable state changes

**MobX vs Redux:** Redux is explicit (you define every state change as an action + reducer). MobX is implicit (read state, mutation is automatic). MobX requires less boilerplate; Redux provides more auditability. MobX can mutate state directly; Redux enforces immutability.

**makeAutoObservable:** MobX 6 helper that automatically makes all class properties observable, all methods actions, and all getters computed. Minimal annotation required.

**React + MobX:** MobX React Lite (observer HOC or useObserver hook) connects MobX observables to React components. observer(Component) makes a React component reactive — it automatically re-renders when any observable it reads changes.

**When MobX fits:** Apps with complex interdependent state where tracking derived values is important, teams coming from OOP backgrounds who prefer class-based models, apps where the implicit reactivity feels more natural than explicit dispatching.

**Key insight:** MobX's magic is also its danger — observable mutations can happen anywhere, making state change tracing harder than Redux's explicit action log. Enable MobX strict mode to enforce that mutations only happen inside actions, preserving the auditability you'd otherwise lose.`,
    },
    {
      id: 367,
      name: "Jotai & Recoil (Atomic State)",
      desc: `**Atomic state management** (Jotai, Recoil) — a pattern where state is split into small independent units (atoms) that components subscribe to individually. Components re-render only when the specific atoms they use change.

**Jotai atoms:** An atom is a primitive unit of state — like useState but shared across components. Derived state (selectors) is created with atom(() => ...) that reads other atoms. Components use the useAtom hook to read and write atoms.

**Why atomic over Context API:** Context re-renders all consumers when any part of the context value changes. Atoms are granular — a component reading atom A doesn't re-render when atom B changes, even if A and B are in the "same" state domain.

**Recoil (Meta's library):** Similar to Jotai but with more features — RecoilRoot required, selectors have their own caching lifecycle, atomFamily for dynamic collections, and snapshot API for state inspection. Heavier than Jotai.

**Jotai in React Native:** Works identically to web React. JotaiDevtools integrates with React Native Debugger for atom inspection. Atoms can be initialized with async values (Suspense integration) or created from external stores.

**Atom families:** For dynamic collections (one atom per todo item, one atom per user ID), atom families create atoms on demand keyed by a parameter. Eliminates the need to store collections in a single large array atom.

**When atomic state fits:** Apps with many independent UI states that happen to need sharing, feature-flagged UI where different components need different slices of state, or apps where you want fine-grained reactivity without Redux's overhead.

**Key insight:** Jotai is surprisingly powerful for small, composable state slices. Its simplicity (atoms are just useState that's shareable) makes it approachable, and the granular re-rendering is a genuine performance win over Context in apps with many independent state slices.`,
    },
    {
      id: 368,
      name: "State Persistence & Hydration",
      desc: `**State persistence** saves application state to local storage so it's restored when the app restarts. **Hydration** is the process of loading persisted state back into the store on app launch.

**Redux Persist:** The standard solution for persisting Redux store state to AsyncStorage (or MMKV for performance). Serialize selected slices of the Redux store, save on change, rehydrate on launch. Config controls which slices to persist, versioning handles state shape migrations between app versions.

**Zustand persist middleware:** Built into Zustand. Wrap the store with persist() middleware, specify storage (AsyncStorage, MMKV), and which parts of state to persist. Handles serialization/deserialization automatically.

**Rehydration loading state:** On app launch, persisted state loads asynchronously. During rehydration, the app shows a loading state (or the splash screen) to avoid displaying stale or undefined state. Redux Persist's REHYDRATE action signals when rehydration is complete.

**State schema migrations:** When you ship a new app version with a different state shape, old persisted state may be incompatible. Redux Persist's migrate function and Zustand's version + migrate config handle schema migrations gracefully.

**What to persist vs what to refetch:**
- **Persist:** User preferences, auth tokens (in secure storage), UI state (selected tab, scroll position), cached data for offline
- **Don't persist:** Sensitive data in AsyncStorage (use Keychain), server state you'd rather refetch fresh (product prices, stock levels), large data sets (use a database, not the Redux store)

**Key insight:** Don't persist your entire state tree by default. Be intentional about what survives app restarts. A bloated persisted store delays app launch (deserialization of large JSON is synchronous). Persist preferences and tokens; let server state refresh on app launch.`,
    },
    {
      id: 369,
      name: "State Machines (XState)",
      desc: `**State machines** model behavior as a finite set of states, transitions between states triggered by events, and actions executed during transitions. **XState** is a JavaScript/TypeScript state machine library compatible with React Native.

**Why state machines in mobile:** Mobile UIs have many implicit states that manual boolean management handles poorly. A checkout flow has: idle, selecting items, entering address, confirming, paying, processing, success, error. Managing this with multiple booleans (isLoading, isError, isSuccess, isPaying...) leads to impossible states (isLoading: true AND isError: true simultaneously).

**State machine guarantees:** A finite state machine can only be in one state at a time, and can only transition to states reachable from the current state. Impossible states are structurally prevented — you can't be in "success" and "error" simultaneously.

**XState in React Native:** useMachine hook integrates XState machines with React components. The machine definition (states, transitions, actions) is separate from the UI — fully testable without rendering.

**When state machines shine:** Complex multi-step flows (onboarding, checkout, file uploads), forms with validation and error recovery, request lifecycle management (loading states with retry logic), and any UI where boolean flag combinations produce bugs.

**Lightweight alternative:** React's useReducer with carefully defined state string literals (status: 'idle' | 'loading' | 'success' | 'error') achieves most of state machine's "no impossible states" benefit without XState's dependency.

**Key insight:** Replace (isLoading: boolean, isError: boolean, isSuccess: boolean) with a single status: 'idle' | 'loading' | 'success' | 'error' string. This eliminates impossible boolean combinations and makes state transitions explicit. You don't need XState to get most of the benefit.`,
    },
  ],
};

export default stateManagement;
