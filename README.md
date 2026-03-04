# Programming Concepts

A static React site hosting interactive reference guides for core programming and engineering concepts. Built with Vite, deployed on GitHub Pages.

**Live:** [https://arnabbiswas.github.io/ProgrammingConcepts/](https://arnabbiswas.github.io/ProgrammingConcepts/)

## Concepts Covered

- Frontend Development
- Backend Development
- System Design
- DevOps
- Testing
- AI / Machine Learning
- Marketing
- Automation

## Adding a New Concept

Create a `.jsx` file in `src/concepts/`:

```jsx
import { useState } from "react";

export const meta = {
  title: "Your Topic",
  description: "Short description",
};

export default function YourTopic() {
  return <div>...</div>;
}
```

It auto-registers via `import.meta.glob` -- no manual imports needed.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

---

### Pending Topics

#### CS Fundamentals
1. [ ] Data Structures & Algorithms                                 
2. [ ] Computer Architecture                     
3. [ ] Operating Systems
4. [ ] Compiler Design & Programming Languages
5. [ ] Theory of Computation (Automata, Complexity)
6. [ ] Mathematics for CS (Discrete Math, Linear Algebra, Probability)

---
#### Web Development

7. [x] Frontend Development
8. [x] Backend Development
9. [ ] API Design (REST, GraphQL, gRPC, WebSockets)
10. [ ] Web Performance & Core Web Vitals
11. [ ] Web Accessibility (a11y)
12. [ ] Progressive Web Apps (PWA)
13. [ ] WebAssembly (WASM)

---
### Mobile

14. [ ] iOS Development
15. [ ] Android Development
16. [ ] Cross-Platform Mobile (React Native, Flutter)

---
### Systems & Low-Level

17. [ ] Systems Programming (Memory, Concurrency, C/Rust)
18. [ ] Embedded Systems & Firmware
19. [ ] Real-Time Systems
20. [ ] Operating System Internals

---
### Architecture & Design

21. [x] System Design
22. [ ] Software Architecture (SOLID, DDD, Clean Architecture)
23. [ ] Distributed Systems
24. [ ] Microservices & Service Mesh
25. [ ] Event-Driven Architecture
26. [ ] Serverless Architecture

---
### Data

27. [ ] Databases (SQL, NoSQL, NewSQL)
28. [ ] Data Engineering (Pipelines, ETL/ELT)
29. [ ] Data Warehousing & OLAP
30. [ ] Big Data (Spark, Hadoop, streaming)
31. [ ] Data Science & Analytics

---
### AI / ML

32. [x] Machine Learning
33. [x] Deep Learning & Neural Networks
34. [x] Natural Language Processing (NLP)
35. [x] Computer Vision
36. [x] Generative AI & LLM Engineering
37. [x] MLOps & AI Infrastructure
38. [ ] Reinforcement Learning

---
### Infrastructure & Operations

39. [x] DevOps
40. [x] Cloud Architecture (AWS / GCP / Azure)
41. [ ] Platform Engineering
42. [x] Site Reliability Engineering (SRE)
43. [x] Infrastructure as Code (Terraform, Pulumi)
44. [x] Containerization & Orchestration (Docker, Kubernetes)
45. [x] CI/CD & Build Systems
46. [x] Observability & Monitoring

---
### Security

47. [ ] Application Security (AppSec / OWASP)
48. [ ] Network Security
49. [ ] Cloud Security
50. [ ] Cryptography
51. [ ] Identity & Access Management (IAM / Zero Trust)
52. [ ] Penetration Testing & Red Teaming
53. [ ] DevSecOps
54. [ ] Threat Modeling

---
### Networking

55. [ ] Networking Fundamentals (TCP/IP, DNS, HTTP)
56. [ ] Network Protocols (BGP, OSPF, QUIC)
57. [ ] CDN & Edge Computing
58. [ ] Network Engineering & Administration

---
### Quality & Testing

59. [x] Software Testing (Unit, Integration, E2E)
60. [x] Test Automation
61. [x] Performance & Load Testing
62. [x] QA Engineering & Methodology

---
### Developer Experience & Tooling

63. [ ] Version Control & Git Workflows
64. [ ] Developer Tools & Productivity
65. [ ] Documentation Engineering
66. [ ] Code Review & Static Analysis

---
### Domain-Specific Engineering

67. [ ] Game Development
68. [ ] Computer Graphics & Rendering (OpenGL, WebGL, Ray Tracing)
69. [ ] Blockchain & Web3
70. [ ] Internet of Things (IoT)
71. [ ] AR / VR / XR
72. [ ] Robotics & Autonomous Systems
73. [ ] Quantum Computing
74. [ ] FinTech Engineering
75. [ ] Healthcare / MedTech Engineering

---
### Design & UX (Engineering-adjacent)

76. [ ] UI/UX Design
77. [ ] Design Systems
78. [ ] Information Architecture
79. [ ] Human-Computer Interaction (HCI)

---
### Engineering Process & Leadership

80. [ ] Agile, Scrum & Engineering Methodologies
81. [ ] Technical Leadership & Engineering Management
82. [ ] Software Engineering Principles (TDD, BDD, DDD)
83. [ ] Product Management for Engineers

---
#### Total: 83 categories across 15 super-domains.

`The ones with the most depth for a reference site (i.e., 100+ learnable concepts each): System Design, Databases, Distributed Systems, Machine Learning, Cloud Architecture, Security, Networking, Frontend, Backend, DevOps, Algorithms & Data Structures, and Software Architecture.`

---

Deployment to GitHub Pages is automated via GitHub Actions on push to `main`.
- Author: Arnab Biswas