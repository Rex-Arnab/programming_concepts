const browserBuilders = {
  name: "Browser-Based Builders",
  icon: "🏗️",
  color: "#8b5cf6",
  concepts: [
    {
      id: 1667,
      name: "Bolt.new",
      desc: `**Bolt.new** — StackBlitz's browser-native full-stack app builder where you describe an application in natural language and receive a running, editable, deployable codebase — without installing anything locally.

Bolt.new runs a full Node.js environment in your browser using WebContainers technology, meaning generated apps actually execute in real time as they are built. Describe "a SaaS dashboard with Stripe payments and user authentication" and Bolt generates the full stack — frontend, backend, database schema — with a live preview. It excels at rapid prototyping where you need a working app in under an hour. The default stack is typically React + Vite + Tailwind, but you can specify alternatives in your prompt.

**Builder tip:** Always enable Bolt's "Prompt Enhance" feature before generating. It rewrites your prompt to be more specific and technical, dramatically improving output coherence. Also, specify your exact tech stack preferences upfront — "Use React 18, TypeScript, Tailwind CSS, and Supabase for the database" — rather than letting Bolt choose defaults.

**Watch out:** Bolt has a context ceiling — as you iterate and the project grows, the AI loses track of earlier decisions and starts generating inconsistent code. When this happens, do not keep prompting in the same session. Export to GitHub and continue in Cursor where context management is more controllable.`,
    },
    {
      id: 1668,
      name: "Lovable",
      desc: `**Lovable** — a design-first AI app builder that produces visually polished, full-stack web applications from natural language descriptions, with a built-in GitHub sync and Supabase integration for persistent data.

Lovable's key differentiator is output aesthetics — it generates modern, production-quality UIs that do not look like AI-generated prototypes. Its integration with Supabase enables real authentication, real databases, and real file storage without leaving the browser. Every change syncs to a connected GitHub repository, making it possible to export cleanly and continue in a local IDE. For non-technical founders or designers who need a working app to demo to customers, Lovable is the fastest path from idea to something real.

**Builder tip:** Connect Lovable to a GitHub repository before you generate your first component. This gives you a clean export path from day one and ensures every iteration is version-controlled. If you start without GitHub sync and generate 50 iterations, you will have no commit history and no clean export point.

**Watch out:** Lovable produces excellent UIs but shallower backend logic. Complex server-side business rules, custom API integrations, and non-standard authentication flows quickly exceed what Lovable handles well. Recognize the transition point: when you find yourself fighting the AI to implement backend logic, it is time to graduate to a local IDE.`,
    },
    {
      id: 1669,
      name: "v0 by Vercel",
      desc: `**v0** — Vercel's AI UI component generator that takes natural language descriptions or screenshots and produces production-ready React components using Shadcn/UI, Tailwind CSS, and Radix primitives — ready to drop into any Next.js project.

v0 is narrowly focused: it generates UI components, not full applications. This focus makes it exceptionally good at what it does. Describe a data table with sorting and filtering, paste a screenshot of a design, or reference a component from a popular site, and v0 produces a clean, accessible, styled component. Generated components use the Shadcn/UI component system, which means they are composable, themeable, and built on accessible Radix primitives — production-ready from day one.

**Builder tip:** Use v0 with screenshot input for the fastest results. Take a screenshot of a UI element you like from anywhere on the web, paste it into v0 with a note about your tech stack and color scheme, and it will generate a close implementation. Then iterate with text prompts to adjust details.

**Watch out:** v0 components use the Shadcn/UI component library — if your project does not use Shadcn, you will need to translate the output to your component system. The generated code assumes you have Shadcn installed with its default configuration. Installing Shadcn just for v0 output introduces a significant dependency for what might be a one-off component.`,
    },
    {
      id: 1670,
      name: "Replit Agent",
      desc: `**Replit Agent** — an autonomous AI coding agent embedded in Replit's browser-based IDE that can build, debug, and deploy full-stack applications, with built-in hosting, database, and collaboration features in a single environment.

Replit Agent is unique in combining the AI builder, the runtime environment, the database, and the deployment pipeline in one place. You describe what you want to build, the agent generates and executes the code in a live environment, and you can deploy it with one click to a Replit-hosted URL. For learning, prototyping, and building tools that need to be accessible to others immediately, Replit removes all the infrastructure friction. Its collaborative features let multiple people edit and run the same project simultaneously.

**Builder tip:** Use Replit Agent for projects that need to be instantly shareable — tutorials, demos, internal tools, hackathon projects. The combination of AI generation + instant deployment + shareable URL is unmatched for getting something in front of users quickly. Generate, deploy, share the link, get feedback, iterate.

**Watch out:** Replit's free tier has significant compute and storage limitations. Projects that generate substantial traffic or use large models will hit limits quickly. Also, Replit-hosted apps are not suitable for production workloads with SLA requirements — the platform is optimized for development and prototyping, not reliability.`,
    },
    {
      id: 1671,
      name: "Firebase Studio",
      desc: `**Firebase Studio** — Google's browser-based development environment powered by Gemini, designed for building Firebase-native full-stack applications with AI-assisted code generation, integrated emulators, and direct deployment to Google Cloud.

Firebase Studio combines a cloud IDE, AI code generation via Gemini, Firebase's full suite (Authentication, Firestore, Storage, Functions, Hosting), and local emulators in a single browser interface. For developers building on Google's ecosystem, it removes the friction of project setup — you go from prompt to running Firebase app without configuring anything locally. Gemini's deep integration with Firebase's APIs means the generated code follows Firebase patterns correctly, using the SDK properly rather than guessing at its structure.

**Builder tip:** Use Firebase Studio when your app's architecture naturally maps to Firebase's strengths — real-time data with Firestore, serverless functions, Google authentication, and simple hosting. Start by describing your data model first ("I need collections for users, posts, and comments with these relationships") before describing the UI, so the AI builds on a solid data foundation.

**Watch out:** Firebase Studio locks you into the Firebase ecosystem deeply. The generated code uses Firebase SDKs throughout, making it difficult to migrate to another backend later. If there is any possibility your app will need a non-Firebase backend, the tight coupling will cost significant refactoring effort.`,
    },
    {
      id: 1672,
      name: "The Graduate Workflow",
      desc: `**The Graduate Workflow** — the recommended multi-stage vibe coding process: prototype rapidly in a browser builder (Lovable, Bolt.new), validate the concept, export to GitHub, then refine and harden in a local AI IDE (Cursor, Windsurf) before production deployment.

Browser builders optimize for speed of creation; local IDEs optimize for control and quality. Using both in sequence captures the strengths of each. Spend 1-2 hours in Lovable or Bolt to get a working prototype that demonstrates the core value. Once the concept is validated — customers want it, the flow makes sense, the data model is right — graduate to Cursor. In Cursor, add proper error handling, security hardening, tests, observability, and production infrastructure.

**Builder tip:** The transition point is not arbitrary. Graduate when you have answered the question the prototype was designed to answer. If you built a prototype to validate "will users pay for this feature," graduate after you have your first paying customer — not before. Premature graduation wastes time hardening something that might pivot.

**Watch out:** The most common Graduate Workflow mistake is over-engineering the browser builder phase. Builders add authentication, complex state management, and production database schemas to their Lovable prototype — then discover the concept needs a pivot. Keep the prototype phase ruthlessly focused on proving the core hypothesis; save all the engineering for after validation.`,
    },
    {
      id: 1673,
      name: "Prompt Enhance",
      desc: `**Prompt Enhance** — a built-in feature in Bolt.new and similar builders that rewrites your natural language prompt before sending it to the AI, adding technical specificity, clarifying ambiguities, and framing the request in terms the model handles better.

Prompt Enhance is effectively a meta-prompt layer — you write in plain English, and the system translates your intent into a more precise, technically structured prompt. The resulting generation is more coherent, more consistent, and more likely to match your actual intent. Enabling it adds a second or two to generation time but produces meaningfully better output, especially for vague or high-level requests. Think of it as an automatic "please plan this carefully before coding" instruction.

**Builder tip:** Always enable Prompt Enhance, but read the enhanced prompt before accepting it. Occasionally the enhancer misinterprets your intent — adding technical constraints you did not want or choosing a tech stack you did not specify. Reading the enhanced version takes 10 seconds and saves you from generating code in the wrong direction.

**Watch out:** Prompt Enhance is a black box — you do not control the enhancement logic. If the enhancer consistently misinterprets your domain-specific language or makes wrong assumptions about your tech stack, it can make things worse. In these cases, write more detailed prompts yourself and disable the feature rather than fighting the enhancer's assumptions.`,
    },
    {
      id: 1674,
      name: "Browser Builders vs Local IDEs",
      desc: `**Browser Builders vs Local IDEs** — the strategic decision of which environment to use based on project stage, technical complexity, team structure, and deployment requirements — not a permanent choice, but a stage-appropriate one.

Browser builders (Bolt, Lovable, Replit) win when: speed of creation is paramount, zero setup time matters, the project is early-stage validation, or non-technical collaborators need to participate. Local AI IDEs (Cursor, Windsurf, Claude Code) win when: the codebase is large and complex, security and production hardening are required, team collaboration needs proper git workflows, or the tech stack is non-standard. The decision is not either/or — it is sequential. Browser builders for discovery, local IDEs for delivery.

**Builder tip:** Map your workflow to project lifecycle stages. Week 1 of a new idea: browser builder for prototyping. Week 2 after validation: local IDE for architecture. Month 2 with paying customers: local IDE with CI/CD, testing, and monitoring. Do not use a browser builder to maintain a production application.

**Watch out:** Browser builders have hidden costs at scale. Generous free tiers run out. Rate limits appear at inconvenient times. The vendor's infrastructure reliability affects your prototype's availability during demos. For anything being shown to investors or paying customers, understand the browser builder's SLA and have a fallback.`,
    },
    {
      id: 1675,
      name: "Exporting from Browser Builders",
      desc: `**Exporting from Browser Builders** — the process of extracting your generated codebase from a browser-based tool into a local repository for continued development, version control, and production hardening.

Every serious browser builder supports export: Lovable syncs to GitHub, Bolt downloads a zip or pushes to a repo, Replit exports to GitHub. The export gives you a clean copy of the generated code that you can open in Cursor or any local IDE. From this point, the AI IDE has full access to your actual codebase — not a limited browser sandbox — enabling the full capabilities of context-aware generation, terminal access, and multi-file coordination.

**Builder tip:** Export early and often. Do not wait until you have 100 iterations in the browser builder — export after every significant milestone (data model finalized, core flow working, auth added). Each export point is a stable commit you can return to. Treat exports like git checkpoints in the browser builder phase.

**Watch out:** Exports are often messy. Browser builders generate code quickly, not cleanly — expect to find unused imports, inconsistent naming, duplicate utility functions, and missing type annotations. Do not assume the exported code is production-ready. Conduct a code quality pass immediately after export, before adding new features on top of a shaky foundation.`,
    },
    {
      id: 1676,
      name: "Browser Builder Limitations",
      desc: `**Browser Builder Limitations** — the hard constraints of browser-based vibe coding tools: no custom native dependencies, shallow backend logic, context ceilings, vendor lock-in, and infrastructure unsuitable for production workloads.

Browser builders run in sandboxed environments with predefined dependency sets. You can not install arbitrary native modules, custom build tools, or non-standard runtimes. Complex backend requirements — custom message queue integrations, binary data processing, long-running background jobs, sophisticated caching layers — quickly exceed what browser builders support. The context ceiling means projects beyond a certain size start generating incoherent, contradictory code as the model loses track of earlier decisions.

**Builder tip:** Before starting a project in a browser builder, list your top 5 technical requirements. Then check each against the builder's capability list. If more than 2 of your requirements are "maybe" or "no," start in a local IDE from the beginning. Browser builders save time only when they are actually capable of building what you need.

**Watch out:** Vendor lock-in in browser builders is subtle but real. Replit apps depend on Replit's hosting. Firebase Studio generates Firebase-specific code throughout. Lovable uses Supabase for everything. When you export and try to run the code locally, you often discover the app was more tightly coupled to the browser builder's infrastructure than you realized. Always test the exported code locally before declaring a prototype "production-ready."`,
    },
  ],
};

export default browserBuilders;
