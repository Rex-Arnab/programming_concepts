const apiEventAutomation = {
  name: "API & Event-Driven Automation",
  icon: "🔔",
  color: "#0EA5E9",
  concepts: [
    {
      id: 258,
      name: "REST API Automation",
      desc: `**REST API automation** — programmatic integration with web services through HTTP requests, enabling automation workflows to read data from and write data to external systems without human intervention.

**Core HTTP methods in automation context:**
- **GET:** Fetch data — polling for new records, reading current state, listing resources
- **POST:** Create new records — submit orders, create tickets, start workflows
- **PUT/PATCH:** Update existing records — update status, modify properties
- **DELETE:** Remove records — clean up test data, archive processed items

**Python requests pattern:**
\`\`\`python
import requests

session = requests.Session()
session.headers.update({
    'Authorization': f'Bearer {api_key}',
    'Content-Type': 'application/json'
})

# GET with pagination
def fetch_all_records(base_url):
    records = []
    page = 1
    while True:
        response = session.get(f'{base_url}?page={page}&per_page=100')
        response.raise_for_status()
        data = response.json()
        records.extend(data['results'])
        if not data.get('next'):
            break
        page += 1
    return records

# POST with error handling
def create_ticket(title, description):
    response = session.post('/api/tickets', json={
        'title': title,
        'description': description,
        'priority': 'medium'
    })
    if response.status_code == 429:
        retry_after = int(response.headers.get('Retry-After', 60))
        time.sleep(retry_after)
        return create_ticket(title, description)
    response.raise_for_status()
    return response.json()
\`\`\`

**Authentication patterns:** API keys (header or query param), Bearer tokens (OAuth 2.0), Basic auth (username:password base64), HMAC signatures (AWS-style signed requests).

**Key insight:** Use sessions (requests.Session in Python, axios instances in Node.js) to share headers, cookies, and connection pools across multiple requests. Creating a new HTTP connection per request is 10–50x slower than reusing existing connections via a session.`,
    },
    {
      id: 259,
      name: "Webhook Architecture",
      desc: `**Webhook architecture** — designing systems that both consume webhooks (receive events from external services) and produce webhooks (notify downstream consumers of events in your system).

**Consuming webhooks (receiving):**
Design considerations:
- **Acknowledge immediately:** Return HTTP 200 within 2–3 seconds. If processing takes longer, acknowledge first, then process asynchronously (enqueue to a job queue, return 200, process in background).
- **Verify authenticity:** Every incoming webhook should be verified using the sender's signature (HMAC-SHA256 of the payload using a shared secret).
- **Store raw payload:** Save the raw webhook payload before processing. When something goes wrong, the raw data lets you replay and debug.
- **Idempotent handlers:** The same webhook may arrive multiple times. Use the event ID to detect and skip duplicates.

\`\`\`python
import hmac, hashlib
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/webhooks/stripe', methods=['POST'])
def stripe_webhook():
    payload = request.get_data()
    signature = request.headers.get('Stripe-Signature')

    # Verify signature
    try:
        event = stripe.Webhook.construct_event(payload, signature, webhook_secret)
    except stripe.error.SignatureVerificationError:
        return jsonify({'error': 'Invalid signature'}), 400

    # Acknowledge immediately, process async
    process_stripe_event.delay(event)
    return jsonify({'status': 'received'}), 200
\`\`\`

**Producing webhooks (sending):**
- Store webhook registrations in a database (URL, events subscribed to, secret, active status)
- On each internal event, fan out to all registered webhooks for that event type
- Retry failed deliveries with exponential backoff (3–5 attempts over 24 hours)
- Disable endpoints that consistently fail (circuit breaker)

**Key insight:** The webhook producer is responsible for reliable delivery. Build retry logic, dead letter tracking, and endpoint health monitoring into any webhook-sending system. A webhook that fails silently is worse than no webhook at all.`,
    },
    {
      id: 260,
      name: "AWS EventBridge",
      desc: `**AWS EventBridge** — a serverless event bus that enables event-driven automation across AWS services, SaaS applications, and custom applications. The AWS-native backbone for event-driven architectures.

**Core concepts:**
- **Event bus:** A channel that receives and routes events. The default bus receives AWS service events. Custom buses isolate event streams by domain or application.
- **Event:** A JSON object describing something that happened — who, what, when, and relevant data.
- **Rule:** A pattern-matching configuration that routes matching events to one or more targets.
- **Target:** The destination for matched events (Lambda, SQS, SNS, Step Functions, API Gateway, another event bus).

**Event pattern matching:**
\`\`\`json
{
  "source": ["com.myapp.orders"],
  "detail-type": ["OrderPlaced"],
  "detail": {
    "amount": [{ "numeric": [">", 1000] }],
    "currency": ["USD"]
  }
}
\`\`\`

**EventBridge Pipes:** Direct, enriched connections between sources (SQS, DynamoDB Streams, Kinesis) and targets without intermediate Lambda code. Add filtering, transformation, and enrichment in the pipe configuration.

**EventBridge Scheduler:** Replace cron jobs with a managed scheduler that can invoke any AWS service on a one-time or recurring schedule. Scales to millions of schedules; pays per invocation.

**SaaS integrations:** EventBridge natively receives events from 30+ SaaS providers (Salesforce, Zendesk, GitHub, Shopify, Datadog) without custom webhook infrastructure.

**Key insight:** EventBridge's event archiving + replay feature is underutilized and invaluable. Archive events from any bus; replay archived events to a new target. When you add a new consumer for historical events, replay the archive instead of building a backfill pipeline.`,
    },
    {
      id: 261,
      name: "Message Queues in Automation",
      desc: `**Message queues in automation** — decoupled, persistent channels for passing work items between automation components, enabling reliable async processing, load leveling, and fault tolerance.

**Why queues in automation:**
- **Decoupling:** The producer and consumer of work don't need to run simultaneously. The queue buffers work during spikes and drains when capacity allows.
- **Reliability:** Messages persist in the queue even if the consumer crashes. Processing resumes when the consumer restarts.
- **Scaling:** Multiple consumers can process from the same queue in parallel, automatically scaling throughput.
- **Rate limiting:** Consumer processes at its own pace, regardless of producer burst rates. The queue absorbs the burst.

**AWS SQS patterns:**
\`\`\`python
import boto3
import json

sqs = boto3.client('sqs')
queue_url = 'https://sqs.us-east-1.amazonaws.com/123456789/processing-queue'

# Send message (producer)
sqs.send_message(
    QueueUrl=queue_url,
    MessageBody=json.dumps({'invoice_id': '12345', 'action': 'process'}),
    MessageGroupId='invoices',  # FIFO queue grouping
)

# Receive and process (consumer)
while True:
    response = sqs.receive_message(
        QueueUrl=queue_url,
        MaxNumberOfMessages=10,
        WaitTimeSeconds=20,  # Long polling — reduce empty responses
    )
    for message in response.get('Messages', []):
        try:
            process(json.loads(message['Body']))
            sqs.delete_message(QueueUrl=queue_url, ReceiptHandle=message['ReceiptHandle'])
        except Exception as e:
            log_error(e)  # Message returns to queue after visibility timeout
\`\`\`

**Queue vs. stream:** Queues (SQS, RabbitMQ) are designed for task distribution — each message is processed once by one consumer, then deleted. Streams (Kafka, Kinesis) are designed for event log replay — multiple consumers can read the same stream independently.

**Key insight:** Set the message visibility timeout longer than your maximum processing time. If processing takes 5 minutes and visibility timeout is 30 seconds, the message will become visible again to other consumers while still being processed — causing duplicate processing.`,
    },
    {
      id: 262,
      name: "Pub/Sub Pattern",
      desc: `**Pub/Sub (Publish-Subscribe)** — a messaging pattern where publishers emit events to a topic without knowledge of subscribers; subscribers receive all events from topics they've subscribed to, without knowledge of publishers.

**Core mental model:** A newspaper analogy. The newspaper (publisher) prints articles once for a topic (Sports section). Every subscriber to that section receives the same content. Adding a new subscriber doesn't require changes to the publisher. Adding a new topic doesn't require existing subscribers to do anything.

**Pub/Sub vs. message queues:**
- **Queue:** One message → processed by ONE consumer (competing consumers). Used for task distribution.
- **Pub/Sub:** One message → delivered to ALL subscribers. Used for event broadcasting.

**Google Cloud Pub/Sub:**
\`\`\`python
from google.cloud import pubsub_v1

# Publisher
publisher = pubsub_v1.PublisherClient()
topic_path = 'projects/my-project/topics/order-events'

publisher.publish(
    topic_path,
    data=json.dumps({'order_id': '12345', 'event': 'shipped'}).encode(),
    origin='warehouse-system'  # Optional attributes
)

# Subscriber
subscriber = pubsub_v1.SubscriberClient()
subscription_path = 'projects/my-project/subscriptions/fulfillment-sub'

def callback(message):
    print(f"Received: {message.data}")
    message.ack()

subscriber.subscribe(subscription_path, callback=callback)
\`\`\`

**Fan-out pattern:** One order-placed event fans out to: inventory reservation service, fulfillment service, email notification service, analytics pipeline. All four receive the same event independently; none knows about the others.

**Push vs. pull subscriptions:** Pull subscriptions (consumer polls for messages) give more control over processing rate. Push subscriptions (Pub/Sub POSTs to your endpoint) are simpler but require a publicly accessible URL.

**Key insight:** Pub/Sub's power is in decoupling. When you need to add a new consumer for existing events — a new analytics pipeline, a new notification channel — you add a subscription without touching the publisher or other subscribers. Zero-downtime extensibility.`,
    },
    {
      id: 263,
      name: "OAuth 2.0 Automation Flows",
      desc: `**OAuth 2.0 in automation** — the authorization framework that enables automations to access protected resources on behalf of users or applications, without handling passwords.

**OAuth 2.0 grant types for automation:**

**Client Credentials (machine-to-machine):** For server-to-server automation with no user involved. The automation authenticates with client ID + secret and receives an access token.
\`\`\`python
import requests

def get_access_token(client_id, client_secret, token_url):
    response = requests.post(token_url, data={
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret,
        'scope': 'read:orders write:fulfillment'
    })
    response.raise_for_status()
    return response.json()['access_token']

# Token caching (avoid re-requesting on every API call)
import time
_token_cache = {}

def get_cached_token(client_id, client_secret, token_url):
    now = time.time()
    if client_id in _token_cache:
        token, expires_at = _token_cache[client_id]
        if expires_at - now > 60:  # 60s buffer
            return token

    data = get_token_data(client_id, client_secret, token_url)
    _token_cache[client_id] = (data['access_token'], now + data['expires_in'])
    return data['access_token']
\`\`\`

**Authorization Code + Refresh Token (user-authorized):** For automations acting on behalf of specific users. User completes one-time authorization; automation stores refresh token and exchanges it for access tokens as needed.

**PKCE (Proof Key for Code Exchange):** Required for public clients (SPAs, mobile apps). Prevents authorization code interception attacks.

**Token management in automation:**
- Never hardcode tokens in code or config files (use environment variables or secret managers)
- Refresh access tokens proactively (before expiry, not after 401)
- Handle token revocation — detect 401 responses, re-authenticate, retry once

**Key insight:** Token caching is not optional in automation. Making a token request for every API call burns quota and adds 100–500ms of latency. Cache tokens and refresh them 60 seconds before expiry. A token cache miss is a recoverable event; a revoked token is an authentication failure requiring re-authorization.`,
    },
    {
      id: 264,
      name: "API Rate Limiting Strategies",
      desc: `**API rate limiting strategies** — techniques for staying within API quotas while maximizing throughput in automation workflows that make many API calls.

**Understanding rate limits:**
- **Requests per second/minute/hour:** Most common. Simple to handle.
- **Concurrent requests:** Maximum simultaneous open requests. Relevant for parallel automation.
- **Points/credits:** Variable cost per endpoint. Expensive operations cost more "points."
- **Burst vs. sustained:** APIs often allow short bursts above the sustained rate (e.g., 100/min sustained but 20/second burst).
Always read the rate limit response headers: \`X-RateLimit-Remaining\`, \`X-RateLimit-Reset\`, \`Retry-After\`.

**Strategy 1: Token Bucket with Python:**
\`\`\`python
import time
import threading

class RateLimiter:
    def __init__(self, rate, per=1.0):
        self.rate = rate      # tokens per period
        self.per = per        # period in seconds
        self.tokens = rate
        self.last_check = time.time()
        self.lock = threading.Lock()

    def acquire(self):
        with self.lock:
            now = time.time()
            elapsed = now - self.last_check
            self.tokens = min(self.rate, self.tokens + elapsed * (self.rate / self.per))
            self.last_check = now

            if self.tokens >= 1:
                self.tokens -= 1
                return

            sleep_time = (1 - self.tokens) * (self.per / self.rate)
            time.sleep(sleep_time)
            self.tokens = 0

limiter = RateLimiter(rate=100, per=60)  # 100 per minute

def api_call(endpoint):
    limiter.acquire()  # Block until rate limit allows
    return requests.get(endpoint)
\`\`\`

**Strategy 2: Exponential backoff on 429:**
\`\`\`python
def api_call_with_retry(url, max_retries=5):
    for attempt in range(max_retries):
        response = requests.get(url)
        if response.status_code == 429:
            retry_after = int(response.headers.get('Retry-After', 2 ** attempt))
            time.sleep(retry_after)
            continue
        response.raise_for_status()
        return response.json()
    raise Exception("Max retries exceeded")
\`\`\`

**Key insight:** Proactive rate limiting (token bucket) is far more efficient than reactive (retry on 429). A 429 response means you've already failed a request and must wait — wasting both a request and time. A token bucket prevents the 429 from ever happening.`,
    },
    {
      id: 265,
      name: "Polling vs Push",
      desc: `**Polling vs. push** — the two fundamental strategies for receiving data updates from external systems, each with distinct latency, resource, and complexity characteristics.

**Polling (pull model):** Your system periodically asks "any new data?" The system queries the source on a fixed interval, stores the last-seen state (cursor), and processes any changes since the last check.

**Push (event-driven model):** The external system notifies you when something changes. You provide an endpoint (webhook URL, subscription); the source pushes events to you in real time.

**Decision matrix:**

| Dimension | Polling | Push |
|---|---|---|
| Latency | Up to interval length | Near-zero |
| Complexity | Simple | Requires public endpoint |
| Reliability | Fully controlled | Depends on sender |
| Data freshness | Stale by design | Real-time |
| API load | Continuous (even when quiet) | Only on events |
| Your infrastructure | Scheduler + cursor | Webhook receiver |

**When polling is the right choice:**
- Source doesn't support webhooks (most legacy systems)
- You can't expose a public endpoint (internal network, no ingress)
- The polling interval matches acceptable staleness (hourly report refresh is fine polling hourly)
- Reliability is paramount and sender's webhook reliability is unknown

**When push is the right choice:**
- Real-time response required (payment confirmation, alert notification)
- High-frequency events (pushing beats polling every second for efficiency)
- Source supports webhooks or pub/sub natively

**Hybrid approach:** Many production systems use both: webhooks for real-time critical events + scheduled polling as a reconciliation mechanism to catch any missed events. The polling serves as a safety net for webhook delivery failures.

**Key insight:** The cost comparison: polling 1,000 sources every minute = 1,440,000 API calls/day (most returning "nothing new"). Push from 1,000 sources with 100 events/day = 100,000 deliveries/day — 14x more efficient. At scale, push-based architecture is dramatically cheaper.`,
    },
    {
      id: 266,
      name: "ngrok for Local Webhook Dev",
      desc: `**ngrok** — a tool that creates a secure tunnel from a public URL to your local development server, enabling webhook development and testing without deploying to a cloud environment.

**The local webhook problem:** Webhooks require a publicly accessible URL to receive events. Your local \`localhost:3000\` is unreachable from external services (Stripe, GitHub, Slack). Traditionally, this meant deploying to staging just to test webhook integrations — a slow, expensive feedback loop.

**ngrok solution:**
\`\`\`bash
# Install ngrok (once)
brew install ngrok  # macOS
ngrok config add-authtoken <your-token>

# Start tunnel
ngrok http 3000
# → Forwarding https://abc123.ngrok.io → localhost:3000

# Register https://abc123.ngrok.io/webhooks/stripe with Stripe
# Now Stripe events reach your local Flask/Express app
\`\`\`

**ngrok features:**
- **Request inspector:** Web UI at \`localhost:4040\` shows all tunneled requests with full headers, body, response, and timing
- **Request replay:** Resend any received webhook for debugging without triggering the event again
- **Stable URLs (paid):** Reserve a consistent subdomain instead of a random one that changes on each restart
- **HTTP authentication:** Add basic auth to protect your tunnel from unauthorized access
- **Traffic inspection via API:** Programmatically access tunnel request/response data

**Alternative tools:**
- **Cloudflare Tunnel:** Zero-trust alternative; longer setup but no account required for basic use
- **localtunnel:** Open-source, no account required; less reliable than ngrok
- **Tailscale Funnel:** If your team uses Tailscale, expose local services with persistent URLs
- **VS Code Dev Tunnels:** Built into VS Code; no additional install

**Key insight:** ngrok's request inspector is its most underrated feature. When a webhook behavior is unexpected, replay the same request 10 times while iterating on your handler code — no need to trigger the actual event in the external system each time.`,
    },
    {
      id: 267,
      name: "Event Sourcing for Automation",
      desc: `**Event sourcing** — storing system state as an immutable sequence of events (facts) rather than mutable current state, enabling complete audit trails, temporal queries, and reliable automation replay.

**Core mental model:** Instead of storing "the current balance of account X is $150," store "account X was created with $200, then $50 was withdrawn." The current balance ($150) is derived by replaying the events. The event log is the source of truth; the current state is a derived projection.

**Event sourcing structure:**
\`\`\`python
# Events are facts — immutable, past-tense
events = [
    {'type': 'OrderPlaced', 'order_id': '123', 'items': [...], 'timestamp': '...'},
    {'type': 'PaymentReceived', 'order_id': '123', 'amount': 99.99, 'timestamp': '...'},
    {'type': 'OrderFulfilled', 'order_id': '123', 'tracking': 'UPS123', 'timestamp': '...'},
]

# Projection: derive current state from events
def project_order_state(order_id, events):
    state = {}
    for event in filter(lambda e: e.get('order_id') == order_id, events):
        if event['type'] == 'OrderPlaced':
            state = {'status': 'pending', 'items': event['items']}
        elif event['type'] == 'PaymentReceived':
            state['status'] = 'paid'
        elif event['type'] == 'OrderFulfilled':
            state['status'] = 'fulfilled'
            state['tracking'] = event['tracking']
    return state
\`\`\`

**Event sourcing benefits for automation:**
- **Complete audit trail:** Every state change is recorded with timestamp and context
- **Time travel:** Replay events to reconstruct state at any point in the past
- **Automation replay:** Re-run automation workflows against historical events to debug, fix, or extend
- **Event-driven triggers:** New automation consumers can replay the event log to process historical data without backfill pipelines

**Event sourcing in practice:** Kafka is the most common event store for event-sourced systems at scale. PostgreSQL (with an append-only events table) is simpler for smaller systems.

**Key insight:** Event sourcing is not suitable for all systems (GDPR deletion requirements conflict with immutability; high write volume requires careful storage management). It excels in domains requiring auditability (financial transactions, healthcare records, compliance) and complex business processes where understanding "how did we get here" is as important as "what is the current state."`,
    },
  ],
};
export default apiEventAutomation;
