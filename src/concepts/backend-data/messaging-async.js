const messagingAsync = {
  name: "Messaging & Async Processing",
  icon: "↯",
  color: "#06B6D4",
  concepts: [
    { id: 102, name: "Message Queues", desc: "Asynchronous communication buffer between producers and consumers. Decouples services. RabbitMQ (AMQP), SQS, BullMQ (Redis). At-least-once or exactly-once delivery." },
    { id: 103, name: "Pub/Sub (Publish-Subscribe)", desc: "Publishers send messages to topics. Multiple subscribers receive copies. Fan-out pattern. Redis Pub/Sub, Google Pub/Sub, SNS. One event triggers many reactions." },
    { id: 104, name: "Event Streaming (Kafka)", desc: "Append-only distributed log. Consumers read at their own pace. Replayable. Kafka, Redpanda, Amazon Kinesis. High throughput, ordered within partitions." },
    { id: 105, name: "Background Jobs / Workers", desc: "Processing tasks outside the request cycle: emails, image processing, reports, data pipelines. BullMQ, Celery, Sidekiq, Temporal. Queue → worker → result." },
    { id: 106, name: "Scheduled Jobs (Cron)", desc: "Time-based task execution. Cron expressions (0 */6 * * *). node-cron, APScheduler, Hangfire. Use distributed schedulers to avoid duplicate execution across instances." },
    { id: 107, name: "Dead Letter Queue (DLQ)", desc: "Stores messages that fail processing after max retries. Enables debugging without blocking the pipeline. Alert on DLQ growth. Manual or automated re-processing." },
    { id: 108, name: "Event Sourcing", desc: "Store all state changes as immutable events instead of current state. Rebuild state by replaying events. Full audit trail, temporal queries, undo capability." },
    { id: 109, name: "Saga Pattern", desc: "Manage distributed transactions across microservices. Sequence of local transactions with compensating actions on failure. Choreography (events) or orchestration (coordinator)." },
    { id: 110, name: "Outbox Pattern", desc: "Reliably publish events alongside DB writes. Write event to outbox table in same transaction. Separate process publishes from outbox. Prevents lost events." },
    { id: 111, name: "Idempotency", desc: "Operations produce the same result regardless of how many times executed. Idempotency keys for API requests. Essential for retry safety. PUT is idempotent, POST is not." },
    { id: 112, name: "Backpressure", desc: "Mechanism to slow producers when consumers can't keep up. Prevents queue overflow and system crashes. Bounded queues, rate limiting, reactive streams." },
    { id: 113, name: "Workflow Engines (Temporal / Inngest)", desc: "Orchestrate complex, long-running processes with durability. Automatic retries, state persistence, timeout handling. Temporal, Inngest, Step Functions, Airflow." },
  ],
};
export default messagingAsync;
