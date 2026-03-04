const testingLevels = {
  name: "Testing Levels",
  icon: "⬡",
  color: "#3B82F6",
  concepts: [
    { id: 18, name: "Unit Testing", desc: "Testing the smallest testable parts (functions, methods, classes) in isolation. Fast, deterministic, cheap to run. Foundation of the testing pyramid." },
    { id: 19, name: "Component Testing", desc: "Testing individual components or modules with their internal dependencies. Larger scope than unit tests. Verifies a module's interface and behavior." },
    { id: 20, name: "Integration Testing", desc: "Testing how modules or services interact together. Verifies interfaces, data flow, and communication. Catches issues unit tests miss." },
    { id: 21, name: "System Testing", desc: "Testing the complete integrated system against requirements. End-to-end flows, full stack. Functional and non-functional aspects verified." },
    { id: 22, name: "Acceptance Testing", desc: "Final verification that the system meets business requirements. Often performed by or for stakeholders. User Acceptance Testing (UAT) is the most common form." },
    { id: 23, name: "End-to-End (E2E) Testing", desc: "Simulating real user workflows through the entire application stack including UI, APIs, databases, and third-party services. Validates complete flows." },
    { id: 24, name: "Alpha Testing", desc: "Internal testing by the development team or QA in a controlled environment before external release. Catches bugs before beta users see them." },
    { id: 25, name: "Beta Testing", desc: "Pre-release testing by a limited group of real end users in their own environment. Gathers real-world feedback, uncovers usage patterns devs didn't anticipate." },
  ],
};
export default testingLevels;
