const aiSafetyEthics = {
  name: "AI Safety & Ethics",
  icon: "⬟",
  color: "#EF4444",
  concepts: [
    { id: 133, name: "AI Alignment", desc: "Ensuring AI systems act in accordance with human values and intentions. The core challenge: how to specify and verify that AI does what we actually want." },
    { id: 134, name: "Bias & Fairness", desc: "AI models can perpetuate or amplify societal biases from training data. Gender, racial, socioeconomic biases. Fairness metrics, debiasing techniques, diverse datasets." },
    { id: 135, name: "Hallucination Mitigation", desc: "Reducing false confident outputs. Grounding in retrieved data (RAG), chain-of-thought reasoning, confidence calibration, citation generation, human verification." },
    { id: 136, name: "Red Teaming", desc: "Adversarially testing AI systems to find vulnerabilities: jailbreaks, harmful outputs, bias, privacy leaks. Systematic probing by security researchers. Essential before deployment." },
    { id: 137, name: "Prompt Injection", desc: "Attackers insert malicious instructions into LLM inputs. Direct (user input) or indirect (data sources). Hijack behavior, leak system prompts, bypass safety. Defense-in-depth needed." },
    { id: 138, name: "AI Governance & Regulation", desc: "EU AI Act, NIST AI RMF, Executive Orders, industry standards. Risk classification, transparency requirements, mandatory assessments for high-risk applications." },
    { id: 139, name: "Explainability & Interpretability", desc: "Understanding why models make decisions. SHAP, LIME, attention visualization, feature importance. Critical for healthcare, finance, legal. Black box vs interpretable models." },
    { id: 140, name: "Data Privacy in AI", desc: "Federated learning (train without sharing data), differential privacy (add noise), data anonymization. GDPR right to deletion complicates model training. PII in training data." },
    { id: 141, name: "Responsible AI", desc: "Developing AI with fairness, transparency, accountability, privacy, and safety as core principles. Model cards, datasheets for datasets, impact assessments. Ethical by design." },
    { id: 142, name: "Existential Risk (AI Safety)", desc: "Concerns about advanced AI systems posing catastrophic risks. Superintelligence alignment, misuse, power concentration. Anthropic, OpenAI safety research. Active academic and policy debate." },
    { id: 143, name: "Deepfakes & Misinformation", desc: "AI-generated synthetic media: face swaps, voice cloning, fake text. Detection methods: watermarking (C2PA), artifact analysis, provenance tracking. Growing societal concern." },
    { id: 144, name: "Copyright & AI Training Data", desc: "Legal debates around training on copyrighted data. Fair use, opt-out mechanisms, data licensing. NYT vs OpenAI, Getty vs Stability AI. Evolving legal landscape." },
  ],
};
export default aiSafetyEthics;
