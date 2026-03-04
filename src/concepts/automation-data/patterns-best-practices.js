const patternsBestPractices = {
  name: "Patterns & Best Practices",
  icon: "📐",
  color: "#D97706",
  concepts: [
    {
      id: 286,
      name: "Idempotency Pattern",
      desc: `**Idempotency pattern** — designing operations so that executing them multiple times produces the same result as executing them once, enabling safe retries and at-least-once delivery guarantees in distributed automation.

**The implementation patterns in detail:**

**Pattern 1: Idempotency key with cache:**
\`\`\`python
import hashlib
import redis

cache = redis.Redis()

def send_welcome_email(user_id: str, email: str) -> bool:
    # Derive idempotency key from the operation's natural identity
    key = f"welcome_email:{user_id}"

    # Check: has this operation already been executed?
    if cache.get(key):
        return True  # Already sent — return success without re-executing

    # Execute the operation
    send_email(email, subject="Welcome!", body="...")

    # Record completion with TTL (cleanup after 7 days)
    cache.setex(key, 7 * 24 * 3600, "sent")
    return True
\`\`\`

**Pattern 2: Database upsert:**
\`\`\`sql
-- INSERT ... ON CONFLICT handles duplicate external IDs
INSERT INTO orders (external_id, customer_id, amount, status)
VALUES ('stripe_pi_abc123', 42, 99.99, 'pending')
ON CONFLICT (external_id)
DO UPDATE SET status = EXCLUDED.status  -- Update if already exists
RETURNING id, status;
\`\`\`

**Pattern 3: Conditional execution:**
\`\`\`python
def provision_user_account(user_id: str):
    user = db.get_user(user_id)

    # Check preconditions before acting
    if user.account_provisioned:
        return  # Idempotent: no-op if already done

    create_account_in_system(user)
    send_access_email(user)

    db.update_user(user_id, account_provisioned=True)
\`\`\`

**Choosing the right idempotency key:** The key must uniquely identify the logical operation — not the physical request. For payment processing: the order ID, not the request UUID. If a request is retried (different request UUID), it should still be detected as "already processed."

**Key insight:** Idempotency is not about preventing re-execution — it's about making re-execution safe. The operation may run multiple times, but only the first execution produces side effects. Design this at the operation level, not just the API level.`,
    },
    {
      id: 287,
      name: "Retry with Exponential Backoff",
      desc: `**Exponential backoff** — a retry strategy where the delay between retry attempts grows exponentially with each failure, reducing load on struggling upstream systems and improving overall system resilience.

**The problem with fixed-delay retries:** If 10,000 clients all hit the same API, get a 503, and retry after exactly 1 second — they all retry simultaneously at T+1 second. This creates a "thundering herd" that hits the service with another 10,000 concurrent requests when it's still recovering.

**Exponential backoff with full jitter:**
\`\`\`python
import time
import random

def retry_with_backoff(
    func,
    max_retries: int = 5,
    base_delay: float = 1.0,
    max_delay: float = 60.0,
    exponential_base: float = 2.0,
    retryable_exceptions=(TimeoutError, ConnectionError)
):
    for attempt in range(max_retries + 1):
        try:
            return func()
        except retryable_exceptions as e:
            if attempt == max_retries:
                raise  # Final attempt failed — propagate exception

            # Exponential backoff: 1s, 2s, 4s, 8s, 16s (capped at max_delay)
            delay = min(max_delay, base_delay * (exponential_base ** attempt))

            # Full jitter: random value in [0, delay]
            # Spreads retry requests over time — prevents thundering herd
            jitter_delay = random.uniform(0, delay)

            time.sleep(jitter_delay)

# Usage
result = retry_with_backoff(
    lambda: call_external_api(data),
    max_retries=5,
    base_delay=1.0,
    max_delay=30.0
)
\`\`\`

**Jitter strategies:**
- **Full jitter:** sleep = random(0, min(cap, base * 2^attempt)) — recommended for most cases
- **Decorrelated jitter:** sleep = min(cap, random(base, sleep * 3)) — produces wider distribution
- **No jitter (pure exponential):** Never use for public APIs or distributed systems

**Retry vs. circuit breaker:** Retry handles transient failures (retry and it works); circuit breaker handles sustained failures (stop trying, fail fast). Use both together.

**Key insight:** Always log retry attempts with: attempt number, error type, delay chosen, and eventual outcome. This data reveals which dependencies are flaky (high retry rates), whether retries are succeeding (good — transient errors), or all failing (bad — fundamental problem needing investigation beyond retry logic).`,
    },
    {
      id: 288,
      name: "Circuit Breaker in Automation",
      desc: `**Circuit breaker pattern** — protecting automation workflows from cascading failures by temporarily stopping calls to a failing dependency after a threshold of failures, allowing time for the dependency to recover.

**The analogy:** An electrical circuit breaker trips when current exceeds safe levels, preventing fire. A software circuit breaker "trips" when error rates exceed a threshold, preventing a struggling service from being overwhelmed by continued requests.

**Circuit breaker states:**
- **Closed (normal):** Calls flow through normally; failures are counted
- **Open (tripped):** Calls are immediately rejected without hitting the dependency; returns a cached or error response
- **Half-open (recovery probe):** After a timeout, allows a limited number of test requests; if they succeed, transitions to Closed; if they fail, returns to Open

**Python circuit breaker implementation:**
\`\`\`python
import time
from enum import Enum

class CircuitState(Enum):
    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half_open"

class CircuitBreaker:
    def __init__(self, failure_threshold=5, reset_timeout=60, success_threshold=2):
        self.failure_threshold = failure_threshold  # Failures before opening
        self.reset_timeout = reset_timeout          # Seconds before trying again
        self.success_threshold = success_threshold  # Successes to close again
        self.state = CircuitState.CLOSED
        self.failure_count = 0
        self.success_count = 0
        self.last_failure_time = None

    def call(self, func, *args, **kwargs):
        if self.state == CircuitState.OPEN:
            if time.time() - self.last_failure_time > self.reset_timeout:
                self.state = CircuitState.HALF_OPEN
            else:
                raise Exception(f"Circuit breaker OPEN: {func.__name__} unavailable")

        try:
            result = func(*args, **kwargs)
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            raise

    def _on_success(self):
        if self.state == CircuitState.HALF_OPEN:
            self.success_count += 1
            if self.success_count >= self.success_threshold:
                self.state = CircuitState.CLOSED
                self.failure_count = 0
        elif self.state == CircuitState.CLOSED:
            self.failure_count = 0

    def _on_failure(self):
        self.failure_count += 1
        self.last_failure_time = time.time()
        if self.failure_count >= self.failure_threshold:
            self.state = CircuitState.OPEN
            self.success_count = 0

# Production libraries: pybreaker (Python), resilience4j (Java), Polly (.NET)
\`\`\`

**Key insight:** The circuit breaker's fallback behavior is as important as the tripping mechanism. When the circuit is open, decide: return cached data, return a default response, queue the request for later, or fail immediately. The right fallback depends on the operation — a search returning cached results is fine; a payment failing immediately is not.`,
    },
    {
      id: 289,
      name: "Saga Pattern for Long Processes",
      desc: `**Saga pattern** — managing long-running business transactions that span multiple services by breaking them into a sequence of local transactions, each with a compensating transaction to undo its effects if a later step fails.

**The problem with distributed transactions:** A traditional database transaction (ACID) guarantees all-or-nothing across operations in a single database. Across multiple services (each with its own database), there's no global transaction manager. The saga pattern provides eventual consistency without distributed locks.

**Order processing saga example:**
\`\`\`
Step 1: Reserve inventory         → Compensate: Release inventory
Step 2: Charge payment            → Compensate: Issue refund
Step 3: Create shipping label     → Compensate: Void shipping label
Step 4: Send confirmation email   → Compensate: Send cancellation email (no technical undo)

If Step 3 fails:
  → Compensate Step 2: Issue refund
  → Compensate Step 1: Release inventory
  → Saga fails gracefully with all effects undone
\`\`\`

**Choreography-based saga (event-driven):**
Each service publishes events when it completes its step; other services listen and react. No central coordinator. Simpler to build; harder to debug.

**Orchestration-based saga (centralized coordinator):**
A saga orchestrator calls each service in sequence and handles compensation on failure. Explicit flow; easier to observe and debug. Temporal is the recommended tool.

\`\`\`python
@workflow.defn
class OrderSaga:
    @workflow.run
    async def run(self, order: Order) -> str:
        try:
            # Step 1
            reservation = await workflow.execute_activity(
                reserve_inventory, order, retry_policy=RetryPolicy(maximum_attempts=3))
            try:
                # Step 2
                payment = await workflow.execute_activity(
                    charge_payment, order)
                try:
                    # Step 3
                    label = await workflow.execute_activity(create_shipping_label, order)
                    return "fulfilled"
                except Exception:
                    await workflow.execute_activity(issue_refund, payment)  # Compensate step 2
                    raise
            except Exception:
                await workflow.execute_activity(release_inventory, reservation)  # Compensate step 1
                raise
        except Exception:
            return "failed"
\`\`\`

**Key insight:** Design compensating transactions before you need them. A compensation that was an afterthought is usually incomplete — it undoes the technical action but misses side effects (notifications already sent, audit logs already written). Think through compensation at design time.`,
    },
    {
      id: 290,
      name: "Audit Logging & Traceability",
      desc: `**Audit logging** — recording a tamper-evident history of every significant action taken by an automation system, enabling accountability, debugging, compliance, and forensic investigation.

**What to log:** Every automated action that changes state or triggers external effects should be logged with enough context to answer: What happened? Who/what triggered it? When? What was the input? What was the output? Did it succeed or fail?

\`\`\`python
import structlog
import uuid
from datetime import datetime, timezone

log = structlog.get_logger()

class AuditLogger:
    def __init__(self, service_name: str):
        self.service = service_name

    def log_action(self, action: str, entity_type: str, entity_id: str,
                   triggered_by: str, before_state: dict, after_state: dict,
                   correlation_id: str = None):
        log.info(
            "automation_action",
            event_id=str(uuid.uuid4()),
            timestamp=datetime.now(timezone.utc).isoformat(),
            service=self.service,
            action=action,
            entity_type=entity_type,
            entity_id=entity_id,
            triggered_by=triggered_by,  # "scheduler:daily-sync" or "webhook:stripe"
            correlation_id=correlation_id or str(uuid.uuid4()),  # Links related events
            before_state=before_state,
            after_state=after_state,
        )

# Usage
auditor = AuditLogger("fulfillment-service")
auditor.log_action(
    action="order.status.updated",
    entity_type="order",
    entity_id="ord_12345",
    triggered_by="workflow:shipping-confirmation-webhook",
    before_state={"status": "paid"},
    after_state={"status": "shipped", "tracking": "UPS123456"},
    correlation_id=webhook_correlation_id
)
\`\`\`

**Audit log requirements for compliance:**
- **Immutability:** Audit logs must not be modifiable after creation. Write to append-only storage (S3, CloudWatch Logs, dedicated audit DB with no UPDATE/DELETE)
- **Completeness:** Every state change, not just successful ones. Failed attempts are often more important than successes.
- **Retention:** Compliance requirements vary (SOX: 7 years, GDPR: as long as necessary, PCI DSS: 1 year online + 3 years archived)

**Distributed tracing:** Use W3C trace context (correlation IDs propagated through all system calls) so a single user action can be traced through all downstream automation steps.

**Key insight:** The audience for audit logs is not developers — it's compliance auditors, incident responders, and business stakeholders asking "what happened to this record and why?" Write audit messages in terms of business events ("Order status changed from paid to shipped"), not technical operations ("Updated row 12345 in orders table").`,
    },
    {
      id: 291,
      name: "Monitoring Automation Workflows",
      desc: `**Monitoring automation workflows** — instrumenting automated processes to provide visibility into health, performance, and failures, enabling proactive detection of problems before users are impacted.

**The automation monitoring stack:**
1. **Metrics:** Quantitative measurements — execution counts, latency, error rates, queue depths, processing throughput
2. **Logs:** Structured records of events — what happened, when, with what inputs and outputs
3. **Traces:** End-to-end view of a single request/workflow across all system components
4. **Alerts:** Notifications when metrics exceed thresholds

**Key metrics to monitor:**
\`\`\`python
# Using prometheus_client (Python)
from prometheus_client import Counter, Histogram, Gauge

workflow_executions = Counter(
    'automation_workflow_executions_total',
    'Total workflow executions',
    ['workflow_name', 'status']  # Labels for filtering
)

workflow_duration = Histogram(
    'automation_workflow_duration_seconds',
    'Workflow execution duration',
    ['workflow_name'],
    buckets=[1, 5, 10, 30, 60, 120, 300]
)

queue_depth = Gauge(
    'automation_queue_depth',
    'Current items in processing queue',
    ['queue_name']
)

# Instrument your workflow
def execute_workflow(name: str, *args):
    with workflow_duration.labels(name).time():
        try:
            result = run_workflow(name, *args)
            workflow_executions.labels(name, 'success').inc()
            return result
        except Exception as e:
            workflow_executions.labels(name, 'failure').inc()
            raise
\`\`\`

**Essential alerts for automation:**
- Workflow failure rate > 5% in 5 minutes
- Workflow execution time > 2x baseline (P95)
- Queue depth > threshold (indicates consumer falling behind)
- DLQ depth > 0 (any message in dead letter queue)
- No successful executions in expected window (missed scheduled workflow)
- External dependency error rate spike

**Dashboard design:** One dashboard per workflow with: last 24h execution timeline, success/failure rate trend, P50/P95 duration, queue depth, recent error samples.

**Key insight:** The "no executions" alert is as important as the "high error rate" alert. A scheduled workflow that silently stops running (because the scheduler crashed, the trigger configuration was accidentally deleted, or a deployment broke the cron job) is invisible without a "last successful run was X minutes ago — expected every Y minutes" alert.`,
    },
    {
      id: 292,
      name: "Self-Healing Systems",
      desc: `**Self-healing systems** — automation infrastructure designed to automatically detect and recover from failures without human intervention, increasing reliability and reducing on-call burden.

**Self-healing capabilities by layer:**

**Infrastructure self-healing (cloud-native):**
- **Auto-scaling groups (ASS):** Replace unhealthy EC2 instances automatically based on health checks
- **Kubernetes pod restart policies:** Containers that crash are automatically restarted; \`restartPolicy: Always\` handles transient failures
- **Load balancer health checks:** Remove unhealthy targets from rotation automatically; add back when healthy
- **Database failover:** RDS Multi-AZ automatically promotes a standby replica when the primary fails

**Application-level self-healing:**
\`\`\`python
import threading
import time

class AutoRecoveringWorker:
    def __init__(self, worker_func, restart_delay=5, max_restarts=10):
        self.worker_func = worker_func
        self.restart_delay = restart_delay
        self.max_restarts = max_restarts
        self.restart_count = 0
        self._running = True

    def start(self):
        while self._running and self.restart_count < self.max_restarts:
            try:
                self.worker_func()
            except Exception as e:
                self.restart_count += 1
                log.error("Worker crashed", error=str(e),
                          restart_count=self.restart_count,
                          max_restarts=self.max_restarts)
                alert_on_call_if_threshold_exceeded(self.restart_count)
                time.sleep(self.restart_delay * self.restart_count)  # Progressive delay
        if self.restart_count >= self.max_restarts:
            trigger_human_escalation()  # Self-healing exhausted; escalate
\`\`\`

**Automated remediation workflows:**
- Monitor for symptom → run diagnostic → if known pattern → apply fix → verify → log and alert if fix failed
- Example: "If disk usage > 90% → find and archive logs older than 30 days → verify disk usage dropped → alert if still > 90%"

**Rollback automation:** When a deployment degrades key metrics (error rate up, latency up), automatically roll back to the previous version. Spinnaker, Argo Rollouts, and AWS CodeDeploy support automated rollback triggers.

**Key insight:** Self-healing has a limit. Build in escalation thresholds — if the system tries to self-heal 5 times and keeps failing, escalate to a human immediately. Infinite self-healing loops without escalation create situations where the system "looks healthy" (it keeps restarting) but is actually broken.`,
    },
    {
      id: 293,
      name: "Version Control for Workflows",
      desc: `**Version control for workflows** — treating automation workflows, configurations, and definitions as code artifacts subject to Git-based source control, code review, and deployment pipelines.

**Why workflows need version control:**
- Track what changed, when, and who approved it
- Roll back to a known-good workflow when a change breaks automation
- Review workflow changes in pull requests before they affect production
- Test workflow changes in staging before deploying to production
- Audit trail for compliance (required change for regulated industries)

**Workflow-as-code patterns:**

**n8n workflow exports:**
\`\`\`bash
# Export n8n workflow to JSON (commit to Git)
n8n export:workflow --id=42 --output=workflows/invoice-processing.json

# Import from Git (deploy to n8n instance)
n8n import:workflow --input=workflows/invoice-processing.json
\`\`\`

**Airflow DAGs are already code:** Airflow DAGs are Python files committed to a Git repository and synced to the Airflow scheduler automatically (via GitSync or CI/CD deployment).

**Temporal workflows are code:** Workflow code lives in your service repository, deployed via your standard deployment pipeline.

**Infrastructure as Code for automation infrastructure:**
\`\`\`yaml
# GitHub Actions workflow — version controlled
name: Invoice Processing
on:
  schedule:
    - cron: '0 1 * * *'  # Daily at 1am
jobs:
  process:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: python process_invoices.py
\`\`\`

**GitOps for automation:** Apply GitOps principles — Git is the single source of truth; changes to automation workflows go through the same PR → review → merge → deploy pipeline as application code changes.

**Key insight:** The biggest risk in workflow version control is the gap between "the workflow in Git" and "the workflow actually running in production." Close this gap with GitSync (automatic deployment from Git to Airflow), CI/CD deployment pipelines that deploy workflow changes, and monitoring that alerts when the deployed workflow version doesn't match the Git version.`,
    },
    {
      id: 294,
      name: "Secret Management in Automation",
      desc: `**Secret management in automation** — securely storing, distributing, rotating, and auditing access to sensitive credentials (API keys, passwords, certificates, tokens) used by automated systems.

**The secret sprawl problem:** Automation integrates with dozens of services. Each integration needs credentials. Without central management, secrets end up in: config files committed to Git (catastrophic), environment variables on servers (mediocre), spreadsheets (dangerous), hardcoded in code (catastrophic). Secret sprawl means you can't track who has access to what, can't rotate credentials efficiently, and can't detect credential misuse.

**Secret management solutions:**

**HashiCorp Vault:**
\`\`\`python
import hvac

client = hvac.Client(url='https://vault.example.com', token=os.environ['VAULT_TOKEN'])

# Read a secret (leased — access expires, audit logged)
secret = client.secrets.kv.v2.read_secret_version(
    mount_point='automation',
    path='stripe/api-keys',
)
stripe_key = secret['data']['data']['api_key']

# Dynamic secrets — Vault generates temporary credentials
db_creds = client.secrets.database.generate_credentials('automation-role')
# → {'username': 'v-token-abcd1234', 'password': 'A1B2C3...', 'lease_duration': 3600}
\`\`\`

**AWS Secrets Manager:**
\`\`\`python
import boto3, json

sm = boto3.client('secretsmanager')
secret_value = sm.get_secret_value(SecretId='automation/stripe-api-key')
stripe_key = json.loads(secret_value['SecretString'])['api_key']
\`\`\`

**Secret rotation:** Automatically rotate credentials on a schedule without manual intervention. AWS Secrets Manager supports automatic rotation via Lambda. Vault's dynamic secrets provide credentials with short TTLs (1 hour) — rotation is implicit.

**Secret hygiene principles:**
- Never log secrets — filter them from all log output
- Least privilege — each automation gets only the secrets it needs
- Time-limited secrets — short TTL + rotation reduces exposure window
- Audit access — who requested which secret, when

**Key insight:** The rotation discipline reveals the real cost of poor secret management. If rotating a single API key requires updating it in 20 different places, that's the architectural problem to fix — not the rotation frequency. Centralized secret management makes rotation a 1-place update.`,
    },
    {
      id: 295,
      name: "Automation Documentation",
      desc: `**Automation documentation** — the structured documentation of what automations do, why they exist, how they work, how to debug them, and how to maintain them — the difference between automation as an asset and automation as technical debt.

**The documentation problem unique to automation:** Application code is read by developers who can understand it. Automations are often maintained by the team that benefits from them (marketing, operations, finance) — teams that can't read code. Without documentation, automations become "magic" that nobody dares touch.

**Documentation components for each automation:**

**1. README / Overview:**
\`\`\`markdown
# Invoice Processing Automation
**Purpose:** Automatically process invoices from the /data/incoming folder
**Trigger:** File watcher — fires when a PDF is dropped in /data/incoming
**Frequency:** Event-driven (immediate on file arrival)
**Owner:** Finance team (Sarah Smith) / Engineering: Backend team
**Last reviewed:** 2024-01-15
**Dependencies:** AWS Textract, QuickBooks API, Slack
\`\`\`

**2. Process flow diagram:** Visual representation of trigger → steps → outputs. Even a simple text diagram helps:
\`\`\`
File dropped → OCR extraction → Validation → [PASS] QuickBooks entry + Slack notification
                                             → [FAIL] Manual review queue + alert
\`\`\`

**3. Error handling reference:**
- Common error: "Textract timeout" → Resolution: File may be corrupted; move to /failed and alert
- Common error: "QuickBooks 401" → Resolution: Re-authenticate OAuth token (see runbook)
- Common error: "Duplicate invoice" → Resolution: Expected; automation skips and logs

**4. Runbook (operational guide):**
- How to restart the automation if it's stuck
- How to process a single file manually for debugging
- How to disable temporarily during maintenance
- Who to contact if automation fails outside business hours

**5. Change log:**
- 2024-01-15: Added duplicate detection (prevents double-entry)
- 2023-11-01: Migrated from Google Vision to AWS Textract (90% → 97% accuracy)

**Key insight:** The best time to write automation documentation is when the automation is being built — when the intent, edge cases, and design decisions are fresh. The second best time is immediately after the first production incident, when the gaps in documentation become painfully clear.`,
    },
  ],
};
export default patternsBestPractices;
