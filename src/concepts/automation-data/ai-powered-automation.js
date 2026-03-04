const aiPoweredAutomation = {
  name: "AI-Powered Automation",
  icon: "🧠",
  color: "#7C3AED",
  concepts: [
    {
      id: 268,
      name: "LLM Agents",
      desc: `**LLM Agents** — AI systems that use large language models as a reasoning engine to plan and execute multi-step tasks by choosing from available tools, observing results, and adapting their approach.

**Core mental model:** An LLM agent is an LLM in a loop. The model receives a goal, reasons about how to achieve it, selects and calls a tool (web search, code execution, API call), observes the result, then reasons again based on new information — repeating until the goal is achieved or it determines the goal is unachievable.

**The ReAct pattern (Reason + Act):**
\`\`\`
Goal: "Find the current price of AAPL stock and save it to a spreadsheet"

Thought: I need to get the current AAPL price. I'll use the stock API.
Action: search_stock_price("AAPL")
Observation: {"price": 182.50, "timestamp": "2024-01-15T14:30:00Z"}

Thought: I have the price. Now I need to write it to the spreadsheet.
Action: write_to_spreadsheet(sheet_id="abc", row=1, data=["AAPL", 182.50, "2024-01-15"])
Observation: {"success": true, "updated_cells": 3}

Thought: Task complete.
Result: Saved AAPL price $182.50 to spreadsheet.
\`\`\`

**Tool design matters:** The quality of an LLM agent is limited by the quality of its tools. Good tools are: atomic (do one thing well), well-documented (clear description of what the tool does and what parameters it accepts), and safe (cannot take irreversible destructive actions without confirmation).

**Agent failure modes:**
- **Hallucinated tool calls:** The LLM calls a tool that doesn't exist or with incorrect parameters
- **Infinite loops:** The agent gets stuck repeating the same actions
- **Scope creep:** The agent takes actions beyond the intended task

**Key insight:** LLM agents are not deterministic. The same goal given twice may produce different action sequences. For automation that requires auditability and repeatability, log every thought, action, and observation. Human-in-the-loop review for irreversible actions is often essential.`,
    },
    {
      id: 269,
      name: "LangChain / LangGraph",
      desc: `**LangChain** — a Python and JavaScript framework for building LLM-powered applications that provides abstractions for chains, agents, memory, retrieval, and tool integration. **LangGraph** extends LangChain with a graph-based workflow model for complex multi-agent systems.

**LangChain key concepts:**
- **Chain:** A sequence of operations — prompt → LLM → output parser → next step
- **Agent:** LLM with tool access in a reasoning loop
- **Memory:** Conversation history stored and retrieved between turns
- **Retrieval:** Fetch relevant documents from a vector store to provide as context

**Simple agent with tools:**
\`\`\`python
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_core.tools import tool
from langchain_core.prompts import ChatPromptTemplate

@tool
def get_stock_price(ticker: str) -> str:
    """Get the current stock price for a given ticker symbol."""
    price = fetch_from_api(ticker)
    return f"Current price of {ticker}: \${price}"

@tool
def send_email(to: str, subject: str, body: str) -> str:
    """Send an email notification."""
    send_email_api(to, subject, body)
    return f"Email sent to {to}"

llm = ChatOpenAI(model="gpt-4o")
tools = [get_stock_price, send_email]

agent = create_tool_calling_agent(llm, tools, ChatPromptTemplate.from_messages([
    ("system", "You are a helpful financial automation assistant."),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
]))
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
executor.invoke({"input": "Check AAPL price and email me if it's above $180"})
\`\`\`

**LangGraph for complex workflows:** Model agent behavior as a graph of nodes (LLM reasoning steps) and edges (transitions based on outputs). Enables cycles (retry loops), parallel branches (research multiple topics simultaneously), and conditional routing.

**Key insight:** LangChain's abstraction layer is both its strength and weakness. It makes common patterns easy (RAG pipelines, basic agents) but adds complexity and version churn to less common ones. For simple automation, direct SDK calls (OpenAI Python SDK) are often cleaner. LangChain shines in multi-agent orchestration.`,
    },
    {
      id: 270,
      name: "n8n AI Nodes",
      desc: `**n8n AI nodes** — built-in nodes in n8n for integrating LLMs, vector databases, and AI agents directly into visual automation workflows, without requiring custom code for most AI-powered automations.

**Key AI nodes in n8n:**

**AI Agent node:** Configure a reasoning agent with:
- System prompt (defining the agent's role and constraints)
- Connected tools (other n8n nodes exposed as tools — HTTP requests, database queries, email sends)
- Memory (conversation history stored in a database or in-memory)
- Model (OpenAI, Anthropic Claude, Ollama local models)

**Basic LLM Chain node:** Simpler than the agent — a single prompt-in, response-out node. Use for: classification, extraction, summarization, translation — tasks that don't require multi-step reasoning.

**Information Extractor node:** Extract structured data from unstructured text using a defined schema. Input: "Invoice PDF text". Output: \`{vendor, amount, date, line_items}\`. Backed by LLM structured output.

**Summarize node:** Chunk and summarize long documents using map-reduce strategy — summarize each chunk, then summarize the summaries. Handles documents too long for a single context window.

**Vector Store operations:** Upsert embeddings (chunk → embed → store), retrieve similar chunks (query → embed → vector search → return), and build RAG pipelines without code.

**Practical workflow: AI email triage:**
Trigger: Gmail → new email received
→ Basic LLM Chain: classify as [inquiry, complaint, billing, other]
→ Switch node: route by classification
→ AI Agent (for complaints): research customer history, draft empathetic response
→ Send Gmail: reply with draft (requires human approval gate)

**Key insight:** n8n's AI nodes democratize AI automation for non-engineers. The key limitation: complex reasoning chains that benefit from fine-tuned control (custom prompts for each step, dynamic tool selection) are better implemented in code (LangChain, direct SDK). n8n AI nodes excel at the 80% of AI automation use cases that fit standard patterns.`,
    },
    {
      id: 271,
      name: "Computer Use (Claude / GPT-4o Vision)",
      desc: `**Computer Use** — AI models that can perceive and interact with computer interfaces visually — taking screenshots, identifying UI elements, and sending mouse clicks and keyboard input — enabling automation of any application without APIs.

**Anthropic's Computer Use API:** Claude 3.5 Sonnet (and later models) can:
- Receive a screenshot of the computer screen
- Identify UI elements (buttons, text fields, menus) from the screenshot
- Issue tool calls: \`screenshot()\`, \`click(x, y)\`, \`type(text)\`, \`key(combo)\`, \`scroll(x, y, direction)\`
- Plan multi-step interactions to achieve a goal

**Workflow:**
\`\`\`python
# Computer Use loop
goal = "Find the contact form and submit name=John and email=john@example.com"

while not done:
    screenshot = capture_screenshot()  # Current screen state

    response = claude.messages.create(
        model="claude-sonnet-4-5",
        tools=[screenshot_tool, click_tool, type_tool, key_tool],
        messages=[
            {"role": "user", "content": [
                {"type": "image", "source": {"type": "base64", "data": screenshot}},
                {"type": "text", "text": goal}
            ]}
        ]
    )

    # Execute the tool calls Claude requested
    for tool_use in response.tool_calls:
        execute_tool(tool_use)  # click, type, screenshot, etc.

    done = check_if_task_complete(response)
\`\`\`

**Use cases:** Automating legacy applications with no API, testing complex UI flows across arbitrary browsers/apps, data entry in systems that block automated browser control.

**Limitations:** Slow (screenshot-LLM roundtrip per action), expensive (image tokens are costly), non-deterministic (may approach the same task differently each time), security risk (unrestricted computer access).

**Key insight:** Computer Use is a breakthrough for automation of legacy systems — the "any application" automation that RPA promised but delivered with fragile image matching. However, it's not a replacement for API-based automation when APIs exist. Use Computer Use as the last resort when no API, accessibility interface, or web scraping approach is viable.`,
    },
    {
      id: 272,
      name: "AutoGPT & Autonomous Agents",
      desc: `**AutoGPT and autonomous agents** — LLM-powered systems designed to pursue long-horizon goals with minimal human intervention, autonomously planning and executing multi-step tasks over extended periods.

**AutoGPT (2023 concept):** One of the first demonstrations of autonomous agent loops — an LLM given a goal, tools (web search, code execution, file management), and a memory system would iteratively reason and act toward the goal. Showed both the potential and limitations of autonomous agents in production.

**Key architectural components of autonomous agents:**
- **Goal/task definition:** What the agent is trying to achieve
- **Planning module:** Break the goal into steps (often a separate LLM call)
- **Tool execution:** Act on the plan using available tools
- **Memory:** Short-term (current context), long-term (vector store for information accumulation), and episodic (history of what was tried and what worked)
- **Evaluation:** Judge whether the goal is achieved or the approach needs revision

**The autonomous agent reliability problem:**
- **Error accumulation:** Each step has some error probability. Over 10 steps, errors compound. A 90% accurate agent fails to complete 10-step tasks 65% of the time.
- **Goal drift:** The agent optimizes for achieving the stated goal, sometimes in unintended ways.
- **Scope creep:** Autonomous agents often take actions beyond the intended scope.
- **Infinite loops:** Without proper stopping conditions, agents can loop indefinitely.

**When autonomous agents work well:**
- Well-defined, bounded tasks with clear success criteria
- Short task horizons (fewer steps = less error accumulation)
- Reversible actions (the agent can undo mistakes)
- Human checkpoint after each major step

**Key insight:** "Autonomous" is a spectrum, not binary. The most reliable autonomous agents in production are not fully autonomous — they have human checkpoints at key decision points, reversibility built into every action, and explicit stopping conditions. True fully-autonomous long-horizon AI agents remain primarily a research topic.`,
    },
    {
      id: 273,
      name: "CrewAI & Multi-Agent Systems",
      desc: `**CrewAI** — a Python framework for orchestrating multiple AI agents working together as a "crew," each with a defined role, goal, and tool set, collaborating to complete complex tasks beyond the capability of any single agent.

**Core mental model:** Divide complex tasks among specialized agents. A research task might use: a Research Agent (web search, summarization), an Analysis Agent (data interpretation, trend identification), and a Writing Agent (synthesis, formatting). Each agent does what it's best at; the crew coordinator manages handoffs.

**CrewAI components:**
\`\`\`python
from crewai import Agent, Task, Crew, Process
from crewai_tools import SerperDevTool, FileWriterTool

# Define agents with roles
researcher = Agent(
    role='Market Research Specialist',
    goal='Find comprehensive data on competitor pricing',
    backstory='Expert at finding market intelligence from public sources',
    tools=[SerperDevTool()],  # Web search
    llm=ChatOpenAI(model="gpt-4o")
)

analyst = Agent(
    role='Data Analyst',
    goal='Analyze the research and identify key insights',
    backstory='Specialist in identifying patterns and competitive insights',
    llm=ChatOpenAI(model="gpt-4o")
)

# Define tasks
research_task = Task(
    description='Research competitor pricing for enterprise SaaS plans',
    agent=researcher,
    expected_output='A comprehensive list of competitor pricing tiers'
)

analysis_task = Task(
    description='Analyze the pricing data and recommend positioning',
    agent=analyst,
    context=[research_task],  # Receives research_task output
    expected_output='Pricing recommendations with supporting rationale'
)

# Assemble the crew
crew = Crew(agents=[researcher, analyst], tasks=[research_task, analysis_task],
            process=Process.sequential)
result = crew.kickoff()
\`\`\`

**Multi-agent patterns:**
- **Sequential:** Each agent's output feeds the next (pipeline)
- **Hierarchical:** A manager agent decomposes goals and delegates to worker agents
- **Parallel:** Multiple agents research different subtopics simultaneously; results merged

**Key insight:** Multi-agent systems excel at tasks requiring diverse expertise — research + analysis + writing, or data collection + verification + formatting. The overhead of coordinating multiple agents is justified when a single agent's context window or tool access is the bottleneck.`,
    },
    {
      id: 274,
      name: "Prompt Chaining",
      desc: `**Prompt chaining** — breaking a complex LLM task into a sequence of smaller, focused prompts where each step's output becomes the next step's input, improving reliability and output quality.

**Why prompt chaining works:**
- LLMs produce better output on focused, bounded tasks than on complex multi-part requests
- Intermediate outputs can be validated before passing to the next step
- Each step's system prompt can be optimized for that specific task
- Failures are isolated to specific steps (easier debugging)

**Example: Article research and writing chain:**
\`\`\`python
import anthropic

client = anthropic.Anthropic()

def chain_article_creation(topic: str, target_audience: str) -> str:
    # Step 1: Generate outline
    outline_response = client.messages.create(
        model="claude-sonnet-4-6",
        system="You are an expert content strategist. Create clear, logical outlines.",
        messages=[{"role": "user", "content":
            f"Create a detailed outline for an article about {topic} for {target_audience}"}]
    )
    outline = outline_response.content[0].text

    # Step 2: Research key points (validate outline exists before proceeding)
    if len(outline.split('\\n')) < 5:  # Validation gate
        raise ValueError("Outline too sparse, regenerating...")

    research_response = client.messages.create(
        model="claude-sonnet-4-6",
        system="You are a research specialist. Provide factual, sourced information.",
        messages=[{"role": "user", "content":
            f"For this outline:\\n{outline}\\n\\nProvide key facts and data points for each section."}]
    )
    research = research_response.content[0].text

    # Step 3: Write the article
    article_response = client.messages.create(
        model="claude-sonnet-4-6",
        system=f"You are a skilled writer for {target_audience}. Write in an engaging, accessible style.",
        messages=[{"role": "user", "content":
            f"Using this outline:\\n{outline}\\n\\nAnd these research notes:\\n{research}\\n\\nWrite the full article."}]
    )
    return article_response.content[0].text
\`\`\`

**Validation gates between steps:** Check each step's output quality before proceeding. "Does the outline have at least 4 sections?" "Does the research include at least 3 specific data points?" Catching quality issues early prevents downstream cascade failures.

**Key insight:** The single best improvement to any LLM-powered automation is adding validation gates between steps. A bad outline fed into a writing step produces a bad article; a bad outline caught at the outline stage triggers a retry with a better prompt. Fail fast, fail early.`,
    },
    {
      id: 275,
      name: "Structured Output for Automation",
      desc: `**Structured output from LLMs** — forcing LLM responses to conform to a defined schema (JSON, specific fields) rather than free-form text, enabling reliable programmatic consumption of AI-generated data.

**Why structured output matters:** Free-form text is human-readable but machine-unreliable. An LLM might say "The sentiment is positive" or "I'd call it positive overall" or "Positive (confidence: 85%)" — all equivalent to a human reader but incompatible in downstream code that expects \`{"sentiment": "positive", "confidence": 0.85}\`.

**OpenAI structured outputs:**
\`\`\`python
from openai import OpenAI
from pydantic import BaseModel
from typing import Literal

client = OpenAI()

class SupportTicket(BaseModel):
    category: Literal['billing', 'technical', 'feature_request', 'complaint']
    priority: Literal['low', 'medium', 'high', 'critical']
    sentiment: Literal['positive', 'neutral', 'negative']
    summary: str
    required_action: str

response = client.beta.chat.completions.parse(
    model="gpt-4o-2024-08-06",
    messages=[
        {"role": "system", "content": "Analyze support tickets and extract structured information."},
        {"role": "user", "content": ticket_text}
    ],
    response_format=SupportTicket,
)
ticket_data = response.choices[0].message.parsed  # Validated SupportTicket object
print(f"Category: {ticket_data.category}, Priority: {ticket_data.priority}")
\`\`\`

**Anthropic Claude structured outputs:**
\`\`\`python
client.messages.create(
    model="claude-sonnet-4-6",
    system="Respond only with valid JSON. No explanation, no markdown code blocks.",
    messages=[{"role": "user", "content": f"Extract entities from: {text}\\n\\nReturn: {{\"people\": [], \"organizations\": [], \"locations\": []}}"}]
)
\`\`\`

**Validation after extraction:** Even with structured output enforcement, always validate the received data:
- Check required fields exist
- Validate enum values are in the expected set
- Validate numeric ranges (confidence scores between 0 and 1)
- Validate string formats (email regex, date format)

**Key insight:** Use Pydantic models to define output schemas for LLM integrations. Pydantic validation catches model output issues at the point of extraction, providing clear error messages and preventing malformed data from propagating into downstream automation steps.`,
    },
    {
      id: 276,
      name: "RAG in Automated Pipelines",
      desc: `**Retrieval-Augmented Generation (RAG) in automation** — dynamically providing LLMs with relevant context from a knowledge base at query time, enabling automations to make decisions based on current, organization-specific information.

**The problem RAG solves:** LLMs have a knowledge cutoff and don't know your organization's specific policies, products, documentation, or recent events. Without RAG, you'd need to fine-tune a model (expensive) or include everything in every prompt (impossible for large knowledge bases). RAG retrieves only the relevant subset of information for each specific query.

**RAG pipeline for automation:**
\`\`\`python
from anthropic import Anthropic
import chromadb  # Vector database

client = Anthropic()
chroma_client = chromadb.PersistentClient(path="./knowledge_base")
collection = chroma_client.get_collection("company_docs")

def automated_support_response(customer_query: str) -> str:
    # 1. Embed the query
    query_embedding = embed_text(customer_query)

    # 2. Retrieve relevant documents
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=5,
        include=["documents", "metadatas"]
    )

    context_docs = "\\n\\n".join(results["documents"][0])

    # 3. Generate response with retrieved context
    response = client.messages.create(
        model="claude-sonnet-4-6",
        system="""You are a support agent with access to company documentation.
Use the provided context to answer the customer's question accurately.
If the answer isn't in the context, say so honestly.""",
        messages=[{
            "role": "user",
            "content": f"Context:\\n{context_docs}\\n\\nCustomer question: {customer_query}"
        }]
    )
    return response.content[0].text
\`\`\`

**RAG in automation workflows:**
- **Policy compliance checking:** Retrieve relevant policy sections before making a decision
- **Personalized responses:** Retrieve customer history before drafting communication
- **Technical support:** Retrieve relevant troubleshooting docs before generating resolution steps

**Chunking strategy:** How you split documents for embedding significantly affects retrieval quality. Fixed-size chunks (512 tokens) are simple but may split important context. Semantic chunking (split at paragraph/section boundaries) preserves meaning better.

**Key insight:** RAG quality is determined more by the retrieval step than the generation step. Poor chunking or embedding produces irrelevant retrieved documents, which produces irrelevant responses regardless of LLM quality. Evaluate retrieval accuracy (did we retrieve the right documents?) separately from generation quality.`,
    },
    {
      id: 277,
      name: "AI Decision Nodes in Workflows",
      desc: `**AI decision nodes** — integration points in automation workflows where an LLM provides classification, scoring, or routing decisions that replace or augment rule-based logic.

**Core pattern:** Where a traditional workflow uses \`if priority == "critical"\`, an AI decision node might use: "Given this ticket, is this a critical situation requiring immediate escalation?" — handling the nuanced cases that static rules miss.

**Types of AI decisions in workflows:**

**Classification routing:**
\`\`\`python
def route_support_ticket(ticket_text: str) -> str:
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",  # Haiku for fast, cheap classification
        system="Classify this support ticket into exactly one category: billing, technical, refund, feature_request, other. Respond with only the category name.",
        messages=[{"role": "user", "content": ticket_text}]
    )
    category = response.content[0].text.strip().lower()

    routes = {
        'billing': billing_queue,
        'technical': tech_queue,
        'refund': refund_queue,
    }
    return routes.get(category, general_queue)
\`\`\`

**Confidence-gated routing:**
\`\`\`python
def process_invoice(invoice_data: dict) -> str:
    # AI scores invoice for anomaly risk
    risk_score = ai_anomaly_scorer(invoice_data)

    if risk_score < 0.2:  # Low risk: auto-approve
        return auto_approve(invoice_data)
    elif risk_score < 0.7:  # Medium risk: expedited review
        return queue_for_review(invoice_data, priority='normal')
    else:  # High risk: flag for immediate human review
        alert_fraud_team(invoice_data)
        return queue_for_review(invoice_data, priority='urgent')
\`\`\`

**Model selection by task type:**
- **Fast classification** (high volume, simple): claude-haiku-4-5-20251001 — 50ms, cheap
- **Complex reasoning** (low volume, nuanced): claude-opus-4-6 — more accurate but slower/expensive
- **Structured extraction**: Any model with structured output support

**Key insight:** Use the least powerful model that achieves the required accuracy. Routing a support ticket to the right queue doesn't need Opus-level reasoning — Haiku classification at 50ms and 1/50th the cost is almost always sufficient. Reserve powerful models for genuinely complex reasoning steps.`,
    },
  ],
};
export default aiPoweredAutomation;
