const cicdPipelines = {
  name: "CI/CD Pipelines",
  icon: "⬢",
  color: "#EF476F",
  concepts: [
    { id: 24, name: "CI/CD Pipeline", desc: "Automated workflow: code commit → build → test → deploy. Defined as code in YAML/config. The backbone of DevOps delivery." },
    { id: 25, name: "Build Automation", desc: "Compiling code, resolving dependencies, and producing artifacts automatically. Tools: Maven, Gradle, Webpack, esbuild, Vite." },
    { id: 26, name: "Artifact Repository", desc: "Stores build outputs (JARs, Docker images, binaries). JFrog Artifactory, Nexus, GitHub Packages, AWS ECR. Single source of truth for artifacts." },
    { id: 27, name: "Pipeline as Code", desc: "Defining CI/CD pipelines in version-controlled files. Jenkinsfile, .gitlab-ci.yml, .github/workflows. Reviewable and reproducible." },
    { id: 28, name: "Pipeline Stages", desc: "Typical stages: Lint → Build → Unit Test → Integration Test → Security Scan → Deploy Staging → E2E Test → Deploy Production." },
    { id: 29, name: "Parallel & Matrix Builds", desc: "Running pipeline jobs simultaneously across multiple OS, language versions, or configurations. Reduces total pipeline time dramatically." },
    { id: 30, name: "Self-Hosted vs Cloud CI Runners", desc: "Cloud: managed runners (GitHub Actions, CircleCI). Self-hosted: your own machines. Trade-off: convenience vs control and cost." },
    { id: 31, name: "CI/CD Tools", desc: "Jenkins, GitHub Actions, GitLab CI, CircleCI, Travis CI, Azure DevOps, ArgoCD, Tekton, Drone, Buildkite. Each has different strengths." },
    { id: 32, name: "Caching in CI", desc: "Caching dependencies and build outputs between pipeline runs. Dramatically reduces build times. npm cache, Docker layer caching." },
    { id: 33, name: "Flaky Tests", desc: "Tests that pass and fail inconsistently. Erode trust in CI. Must be quarantined, fixed, or deleted. A major DevOps pain point." },
    { id: 34, name: "Pipeline Security (Supply Chain)", desc: "Securing the CI/CD pipeline itself: signed commits, verified base images, SBOM, dependency scanning, secret rotation, SLSA framework." },
  ],
};
export default cicdPipelines;
