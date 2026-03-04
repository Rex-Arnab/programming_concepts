const typesFunctional = {
  name: "Testing Types — Functional",
  icon: "⬢",
  color: "#10B981",
  concepts: [
    { id: 26, name: "Functional Testing", desc: "Validates that every function of the software operates according to requirements. Inputs, outputs, data handling, business logic, and user flows." },
    { id: 27, name: "Smoke Testing", desc: "Quick, shallow tests to verify the most critical functions work. 'Does the build even turn on?' Run first after deployment. Also called Build Verification Testing." },
    { id: 28, name: "Sanity Testing", desc: "Focused testing on a specific area after changes. Not exhaustive — just checks that the fix works and didn't obviously break related features." },
    { id: 29, name: "Regression Testing", desc: "Re-running existing tests after code changes to ensure nothing broke. Automated regression suites are essential. The safety net for every release." },
    { id: 30, name: "Happy Path Testing", desc: "Testing the expected, ideal user flow with valid inputs. The 'golden path' through the application. Should always pass before edge cases are tested." },
    { id: 31, name: "Negative Testing", desc: "Deliberately providing invalid inputs, unexpected conditions, or error scenarios. Ensures the system handles failures gracefully without crashing." },
    { id: 32, name: "Boundary Value Analysis (BVA)", desc: "Testing at the edges of input ranges. If valid range is 1–100, test: 0, 1, 2, 99, 100, 101. Bugs cluster at boundaries." },
    { id: 33, name: "Equivalence Partitioning", desc: "Dividing inputs into groups (partitions) that should behave the same. Test one value per partition instead of every possible input. Reduces test count." },
    { id: 34, name: "Decision Table Testing", desc: "Tabulating all combinations of input conditions and their expected outcomes. Systematic way to cover complex business rules and logic." },
    { id: 35, name: "State Transition Testing", desc: "Testing systems that behave differently based on current state. Diagrams show states, transitions, events, and actions. ATMs, workflows, order status." },
    { id: 36, name: "Error Guessing", desc: "Experience-based technique where testers intuitively identify likely error-prone areas. Based on knowledge of common mistakes, past bugs, and domain expertise." },
    { id: 37, name: "Pairwise / Combinatorial Testing", desc: "Testing all possible pairs of input parameter combinations instead of exhaustive combinations. Dramatically reduces test cases while catching most defects." },
    { id: 38, name: "Data-Driven Testing", desc: "Separating test logic from test data. Same test script runs with multiple datasets from external sources (CSV, database, JSON). Increases coverage efficiently." },
    { id: 39, name: "Keyword-Driven Testing", desc: "Tests defined using keywords (Click, Enter, Verify) in a table format. Non-programmers can create tests. Robot Framework is a popular implementation." },
  ],
};
export default typesFunctional;
