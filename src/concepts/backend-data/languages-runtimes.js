const languagesRuntimes = {
  name: "Languages & Runtimes",
  icon: "⬡",
  color: "#3B82F6",
  concepts: [
    { id: 14, name: "Node.js", desc: "JavaScript runtime built on V8. Event-driven, non-blocking I/O. Single-threaded event loop. Express, Fastify, NestJS, Hono. Massive npm ecosystem. Full-stack JS." },
    { id: 15, name: "Python", desc: "Versatile language for backends. Django (batteries-included), Flask (micro), FastAPI (async, typed). Strong in ML/data pipelines. GIL limits true parallelism." },
    { id: 16, name: "Go (Golang)", desc: "Compiled, statically typed, built for concurrency. Goroutines and channels. Fast compilation, small binaries. Standard library includes HTTP server. Kubernetes, Docker written in Go." },
    { id: 17, name: "Rust", desc: "Memory-safe without garbage collection. Ownership system prevents data races at compile time. Actix-web, Axum frameworks. Extreme performance. Steeper learning curve." },
    { id: 18, name: "Java / Kotlin", desc: "JVM languages. Java: Spring Boot ecosystem, enterprise standard. Kotlin: modern syntax, coroutines, null safety. JVM: mature, performant, excellent tooling." },
    { id: 19, name: "C# / .NET", desc: "Microsoft ecosystem. ASP.NET Core for high-performance backends. Entity Framework ORM. Azure-native. Excellent for enterprise, gaming backends (Unity)." },
    { id: 20, name: "Ruby", desc: "Developer happiness focused. Ruby on Rails: convention over configuration, rapid prototyping. Active Record ORM. Startup favorite. Shopify, GitHub built with Rails." },
    { id: 21, name: "PHP", desc: "Powers ~77% of the web (WordPress). Laravel: modern MVC framework. Composer package manager. Swoole for async. Still actively evolving with PHP 8.x." },
    { id: 22, name: "Elixir / Erlang", desc: "BEAM VM: fault-tolerant, concurrent, distributed. Elixir: modern syntax on Erlang's VM. Phoenix framework. Ideal for real-time systems, chat, IoT. WhatsApp uses Erlang." },
    { id: 23, name: "Deno / Bun", desc: "Deno: secure TS/JS runtime by Node creator. Bun: all-in-one (runtime, bundler, package manager, test runner). Both aim to improve on Node.js limitations." },
  ],
};
export default languagesRuntimes;
