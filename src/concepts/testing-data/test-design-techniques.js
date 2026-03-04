const testDesignTechniques = {
  name: "Test Design Techniques",
  icon: "◎",
  color: "#14B8A6",
  concepts: [
    { id: 139, name: "Black Box Testing", desc: "Testing without knowledge of internal code structure. Based on requirements and specifications. Focus on inputs and outputs. Most functional testing is black box." },
    { id: 140, name: "White Box Testing", desc: "Testing with full knowledge of internal code. Statement coverage, branch coverage, path coverage. Finding unreachable code, logic errors, and dead paths." },
    { id: 141, name: "Grey Box Testing", desc: "Partial knowledge of internals. Combines black and white box approaches. Common in integration testing and security testing where some architecture is known." },
    { id: 142, name: "Exploratory Testing", desc: "Simultaneous learning, test design, and execution. No predefined scripts — tester uses skill and intuition. Time-boxed sessions. Finds bugs automation misses." },
    { id: 143, name: "Session-Based Test Management (SBTM)", desc: "Structured approach to exploratory testing. Chartered sessions, time-boxed, debriefed. Mission statement, notes, bugs found, areas covered." },
    { id: 144, name: "Risk-Based Testing", desc: "Prioritizing test effort based on risk: probability × impact. High-risk areas get more testing. Focuses limited resources where they matter most." },
    { id: 145, name: "Heuristic Test Strategy Model (HTSM)", desc: "James Bach's framework for test planning. Quality criteria, project environment, product elements, and test techniques combined systematically." },
    { id: 146, name: "Test Charter", desc: "A mission statement for an exploratory testing session. Defines what to explore, with what resources, and what to look for. Focused but flexible." },
    { id: 147, name: "Use Case Testing", desc: "Deriving tests from use case scenarios. Main flow, alternative flows, exception flows. Covers complete user interactions with the system." },
    { id: 148, name: "Orthogonal Array Testing (OATS)", desc: "Statistical technique for testing with minimum test cases when inputs have multiple values. Guarantees pairwise coverage with mathematical efficiency." },
    { id: 149, name: "Cause-Effect Graphing", desc: "Mapping inputs (causes) to outputs (effects) in a boolean graph. Generates decision tables systematically. Formal method for complex logic testing." },
    { id: 150, name: "Model-Based Testing", desc: "Generating test cases from a model of the system (state machine, UML, decision tree). Tools: GraphWalker, Spec Explorer. Systematic and exhaustive." },
  ],
};
export default testDesignTechniques;
