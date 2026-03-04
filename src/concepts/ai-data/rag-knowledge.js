const ragKnowledge = {
  name: "RAG & Knowledge Systems",
  icon: "⬣",
  color: "#06B6D4",
  concepts: [
    { id: 63, name: "RAG (Retrieval-Augmented Generation)", desc: "Combine LLMs with external knowledge. Embed documents → store in vector DB → retrieve relevant chunks → pass as context to LLM. Reduces hallucination, grounds in facts." },
    { id: 64, name: "Embeddings", desc: "Dense vector representations capturing semantic meaning. Words, sentences, or documents mapped to high-dimensional space. Similar meanings → close vectors. text-embedding-3, sentence-transformers." },
    { id: 65, name: "Vector Databases", desc: "Store and search high-dimensional embeddings. Approximate Nearest Neighbor (ANN) search. Pinecone, Weaviate, Milvus, Chroma, Qdrant, pgvector. Foundation of RAG systems." },
    { id: 66, name: "Similarity Search", desc: "Finding the most similar vectors to a query. Cosine similarity, Euclidean distance, dot product. ANN algorithms: HNSW, IVF, product quantization. Speed vs accuracy trade-off." },
    { id: 67, name: "Chunking Strategies", desc: "Splitting documents into retrieval units. Fixed-size (512 tokens), semantic (by topic), recursive (split by hierarchy). Overlap between chunks preserves context. Chunk size affects quality." },
    { id: 68, name: "Hybrid Search", desc: "Combining vector (semantic) search with keyword (BM25) search. Reciprocal Rank Fusion or weighted scoring to merge results. Better retrieval than either alone." },
    { id: 69, name: "Re-Ranking", desc: "Second-stage ranking of retrieved documents by relevance. Cross-encoder models score query-document pairs. Cohere Rerank, ColBERT. More accurate than embedding similarity alone." },
    { id: 70, name: "Knowledge Graphs", desc: "Structured representations: entities (nodes) and relationships (edges). Neo4j, Amazon Neptune. Graph RAG: combine structured knowledge with LLMs for richer reasoning." },
    { id: 71, name: "Agentic RAG", desc: "AI agents that dynamically decide what to retrieve, when, and how. Multi-step retrieval, query reformulation, tool use. Beyond single-shot retrieve-and-generate." },
    { id: 72, name: "Document Parsing & Extraction", desc: "Converting PDFs, images, tables into LLM-ready text. OCR, table extraction, layout detection. Unstructured, LlamaParse, Docling. Garbage in, garbage out for RAG." },
    { id: 73, name: "Contextual Compression", desc: "Reducing retrieved context to only relevant portions. LLM-based extraction or summarization of chunks before final generation. Reduces noise and token cost." },
    { id: 74, name: "Evaluation for RAG", desc: "Measuring RAG quality: retrieval relevance (precision@k, recall), generation faithfulness, answer correctness. RAGAS framework, LLM-as-judge. Context relevance vs answer relevance." },
  ],
};
export default ragKnowledge;
