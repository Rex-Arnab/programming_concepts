const evaluationMetrics = {
  name: "Evaluation & Metrics",
  icon: "⛉",
  color: "#0EA5E9",
  concepts: [
    { id: 145, name: "Accuracy, Precision, Recall, F1", desc: "Accuracy: correct predictions / total. Precision: true positives / predicted positives. Recall: true positives / actual positives. F1: harmonic mean of precision and recall." },
    { id: 146, name: "Confusion Matrix", desc: "Table of True Positives, True Negatives, False Positives, False Negatives. Visualizes classification performance. Reveals where the model confuses classes." },
    { id: 147, name: "AUC-ROC Curve", desc: "Area Under the Receiver Operating Characteristic curve. Plots True Positive Rate vs False Positive Rate. AUC = 1.0 is perfect, 0.5 is random. Threshold-independent metric." },
    { id: 148, name: "Cross-Validation", desc: "K-Fold: split data into K parts, train on K-1, validate on 1, rotate K times. Robust performance estimate. Stratified for imbalanced classes. Standard: 5 or 10 folds." },
    { id: 149, name: "Perplexity", desc: "Language model metric: how 'surprised' the model is by text. Lower = better predictions. Exponential of cross-entropy loss. Standard LLM pre-training metric." },
    { id: 150, name: "BLEU / ROUGE / METEOR", desc: "Text generation metrics. BLEU: precision-based (translation). ROUGE: recall-based (summarization). METEOR: considers synonyms. Imperfect but widely used baselines." },
    { id: 151, name: "LLM-as-Judge", desc: "Using a strong LLM to evaluate outputs of another model. Pairwise comparison, scoring rubrics, multi-aspect evaluation. Scales evaluation but introduces its own biases." },
    { id: 152, name: "Human Evaluation", desc: "Human raters judge quality: fluency, helpfulness, harmlessness, factuality. Chatbot Arena, Elo ratings. Gold standard but expensive and subjective. Inter-annotator agreement." },
    { id: 153, name: "Benchmark Suites", desc: "Standardized tests: MMLU (knowledge), HumanEval (coding), GSM8K (math), HellaSwag (commonsense), MT-Bench (conversation). Limitations: contamination, Goodhart's law." },
    { id: 154, name: "Evals for Production", desc: "Beyond benchmarks: task-specific evaluation, A/B testing, user satisfaction, latency, cost per query, error rate monitoring. Continuous evaluation in deployment." },
  ],
};
export default evaluationMetrics;
