const versionControl = {
  name: "Version Control & Collaboration",
  icon: "⬡",
  color: "#118AB2",
  concepts: [
    { id: 15, name: "Git", desc: "Distributed version control system. Tracks code changes, enables branching/merging. Foundation of all modern development workflows." },
    { id: 16, name: "Branching Strategies", desc: "Git Flow (feature/develop/release/hotfix), GitHub Flow (main + feature branches), Trunk-Based Development (short-lived branches off main)." },
    { id: 17, name: "Trunk-Based Development", desc: "All developers commit to a single branch (main/trunk). Short-lived feature branches (<1 day). Enables CI and reduces merge conflicts." },
    { id: 18, name: "Pull Requests / Merge Requests", desc: "Proposed code changes reviewed by peers before merging. Includes code review, automated checks, and discussion. Quality gate." },
    { id: 19, name: "Code Review", desc: "Peers examine code for bugs, style, architecture, and security. Catches issues early. Knowledge sharing across the team." },
    { id: 20, name: "Monorepo vs Polyrepo", desc: "Monorepo: all projects in one repo (Google, Meta). Polyrepo: separate repos per service. Trade-off: visibility vs independence." },
    { id: 21, name: "Semantic Versioning (SemVer)", desc: "MAJOR.MINOR.PATCH (e.g., 2.4.1). Major: breaking changes. Minor: new features. Patch: bug fixes. Standard for dependency management." },
    { id: 22, name: "Conventional Commits", desc: "Structured commit messages (feat:, fix:, chore:, docs:). Enables automated changelogs, versioning, and release notes." },
    { id: 23, name: "Git Hooks", desc: "Scripts that run at specific Git events (pre-commit, pre-push). Enforce linting, tests, commit message format before code enters repo." },
  ],
};
export default versionControl;
