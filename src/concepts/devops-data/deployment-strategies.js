const deploymentStrategies = {
  name: "Deployment Strategies",
  icon: "↯",
  color: "#4CC9F0",
  concepts: [
    { id: 97, name: "Rolling Deployment", desc: "Gradually replace old instances with new ones. Zero downtime. If issues arise, stop rollout. Default K8s deployment strategy." },
    { id: 98, name: "Blue-Green Deployment", desc: "Two identical environments: Blue (current) and Green (new). Switch traffic after validation. Instant rollback by switching back." },
    { id: 99, name: "Canary Deployment", desc: "Route a small percentage of traffic (1-5%) to the new version. Monitor metrics. Gradually increase if healthy. Reduce blast radius." },
    { id: 100, name: "A/B Testing Deploys", desc: "Route different user segments to different versions. Measure business metrics (conversion, engagement). Data-driven feature decisions." },
    { id: 101, name: "Feature Flags / Feature Toggles", desc: "Deploy code with features disabled. Enable gradually by user segment, percentage, or geography. Decouple deploy from release. LaunchDarkly." },
    { id: 102, name: "Dark Launches", desc: "Deploy new code to production but don't expose to users. Process real traffic in shadow mode. Validate performance before enabling." },
    { id: 103, name: "Rollback Strategies", desc: "Automated or manual reversion to previous version. Requires: versioned artifacts, database migration compatibility, health check automation." },
    { id: 104, name: "Progressive Delivery", desc: "Umbrella term for canary, feature flags, and A/B testing. Gradually expose changes to larger audiences based on metrics. Flagger, Argo Rollouts." },
    { id: 105, name: "Immutable Deployments", desc: "Never modify running instances. Deploy new instances from new images, then terminate old ones. Eliminates snowflake servers." },
    { id: 106, name: "Database Migrations in CI/CD", desc: "Versioned, automated schema changes. Forward-only migrations. Must be backward-compatible for zero-downtime deploys. Flyway, Alembic, Prisma Migrate." },
  ],
};
export default deploymentStrategies;
