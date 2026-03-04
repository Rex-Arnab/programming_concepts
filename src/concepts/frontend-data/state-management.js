const stateManagement = {
  name: "State Management",
  icon: "↯",
  color: "#764ABC",
  concepts: [
    { id: 69, name: "Component State (useState)", desc: "Local state within a single component. The simplest form. useState in React, ref() in Vue, $state in Svelte. Start here, escalate when needed." },
    { id: 70, name: "Context / Provide-Inject", desc: "Share state across component tree without prop drilling. React Context, Vue provide/inject. Good for themes, auth, locale. Not ideal for frequent updates." },
    { id: 71, name: "Redux / Redux Toolkit", desc: "Centralized store with predictable state updates via actions and reducers. Redux Toolkit simplifies boilerplate. Middleware for async (thunks, sagas)." },
    { id: 72, name: "Zustand", desc: "Minimal, hook-based state management for React. No boilerplate, no providers. const useStore = create((set) => ({...})). Rapidly replacing Redux." },
    { id: 73, name: "Jotai / Recoil", desc: "Atomic state management. Each atom is an independent piece of state. Derived atoms for computed values. Bottom-up approach vs Redux's top-down." },
    { id: 74, name: "MobX / Valtio", desc: "Proxy-based reactive state. Mutate state directly, UI updates automatically. MobX (observable/action), Valtio (proxy snapshots). Feels like vanilla JS." },
    { id: 75, name: "Pinia", desc: "Vue's official state management. Stores with state, getters, actions. TypeScript-native, devtools support, hot module replacement. Replaced Vuex." },
    { id: 76, name: "Server State (TanStack Query)", desc: "Managing async server data: caching, deduplication, background refetching, stale-while-revalidate, pagination, optimistic updates. React Query / TanStack Query." },
    { id: 77, name: "URL as State", desc: "Storing UI state in the URL: search params, hash, pathname. Shareable, bookmarkable, works with back/forward. nuqs, next-usequerystate." },
    { id: 78, name: "State Machines (XState)", desc: "Modeling state as finite state machines or statecharts. Explicit states and transitions. Prevents impossible states. Complex workflows, multi-step forms." },
    { id: 79, name: "Signals", desc: "Fine-grained reactive primitives. Auto-track dependencies, update only what changed. Solid.js, Preact, Angular, Vue's ref. More efficient than virtual DOM diffing." },
    { id: 80, name: "Immutability Patterns", desc: "Never mutate state directly. Spread operator, Object.assign, structuredClone, Immer (produce). Required for React re-renders and time-travel debugging." },
  ],
};
export default stateManagement;
