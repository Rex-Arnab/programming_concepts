const typescript = {
  name: "TypeScript",
  icon: "◈",
  color: "#3178C6",
  concepts: [
    { id: 44, name: "TypeScript Basics", desc: "Typed superset of JavaScript. Static type checking at compile time. Interfaces, enums, generics, type inference. Catches bugs before runtime." },
    { id: 45, name: "Type Inference", desc: "TS automatically infers types from assignments: const x = 5 is number. Reduces verbosity. Hover in IDE to see inferred types. Let the compiler work." },
    { id: 46, name: "Interfaces vs Types", desc: "Both define object shapes. Interfaces: extendable with extends, declaration merging. Types: unions, intersections, mapped types, conditional types. Use types for flexibility." },
    { id: 47, name: "Generics", desc: "Parameterized types: function identity<T>(arg: T): T. Enables reusable, type-safe code. Array<T>, Promise<T>, Record<K, V>. Constraints with extends." },
    { id: 48, name: "Union & Intersection Types", desc: "Union: string | number (either). Intersection: A & B (both). Discriminated unions for type narrowing: { type: 'success', data } | { type: 'error', message }." },
    { id: 49, name: "Type Guards & Narrowing", desc: "Techniques to narrow types: typeof, instanceof, in operator, custom type predicates (is), assertion functions. Makes union types safe to use." },
    { id: 50, name: "Utility Types", desc: "Built-in type transformations: Partial<T>, Required<T>, Pick<T, K>, Omit<T, K>, Record<K, V>, Readonly<T>, ReturnType<T>, Parameters<T>." },
    { id: 51, name: "Enums vs Const Assertions", desc: "Enums: named constants (numeric or string). as const: readonly literal types from objects. as const preferred — smaller bundle, no runtime code." },
    { id: 52, name: "Strict Mode", desc: "strict: true enables all strict checks: strictNullChecks, noImplicitAny, strictFunctionTypes, etc. Always enable. Non-strict TS loses most benefits." },
    { id: 53, name: "Declaration Files (.d.ts)", desc: "Type definitions for JS libraries. DefinitelyTyped (@types/react). Enables TS to understand untyped packages. Generate with tsc --declaration." },
    { id: 54, name: "Mapped & Conditional Types", desc: "Mapped: transform all properties { [K in keyof T]: boolean }. Conditional: T extends string ? A : B. Powerful for library-level type utilities." },
    { id: 55, name: "Template Literal Types", desc: "Type-level string manipulation: type Route = `/api/${string}`. Combine with unions for exhaustive route typing. Powers frameworks like tRPC and Hono." },
  ],
};
export default typescript;
