const messagingStreaming = {
  name: "Messaging & Streaming",
  icon: "↯",
  color: "#00B894",
  concepts: [
    { id: 70, name: "Message Queues", desc: "Asynchronous communication buffer between services (RabbitMQ, SQS). Decouples producers from consumers." },
    { id: 71, name: "Pub/Sub (Publish-Subscribe)", desc: "Publishers send messages to topics, subscribers receive them. Enables fan-out to multiple consumers." },
    { id: 72, name: "Event Streaming / Log", desc: "Append-only log of events (Kafka, Kinesis). Consumers read at their own pace. Replayable." },
    { id: 73, name: "Dead Letter Queue (DLQ)", desc: "Stores messages that fail processing repeatedly. Enables debugging and retry without blocking the pipeline." },
    { id: 74, name: "Idempotency", desc: "Operations produce the same result regardless of how many times executed. Critical for retry-safe systems." },
    { id: 75, name: "Exactly-Once vs At-Least-Once vs At-Most-Once", desc: "Message delivery guarantees. Trade-offs between reliability, performance, and complexity." },
    { id: 76, name: "Backpressure", desc: "Mechanism to slow producers when consumers can't keep up. Prevents system overload." },
  ],
};
export default messagingStreaming;
