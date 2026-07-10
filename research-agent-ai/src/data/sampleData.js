export const samplePapers = [
  {
    id: 1,
    title: "Attention Is All You Need: Transformer Architecture for NLP",
    authors: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar", "Jakob Uszkoreit"],
    journal: "Neural Information Processing Systems (NeurIPS)",
    year: 2023,
    citations: 87420,
    domain: "Deep Learning",
    keywords: ["Transformer", "Attention Mechanism", "NLP", "Neural Networks"],
    summary: "This paper introduces the Transformer architecture, relying entirely on attention mechanisms to draw global dependencies between input and output, dispensing with recurrence and convolutions entirely.",
    abstract: "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train.",
  },
  {
    id: 2,
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    authors: ["Jacob Devlin", "Ming-Wei Chang", "Kenton Lee", "Kristina Toutanova"],
    journal: "NAACL-HLT",
    year: 2022,
    citations: 65000,
    domain: "Natural Language Processing",
    keywords: ["BERT", "Pre-training", "Bidirectional", "Transformers"],
    summary: "BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers.",
    abstract: "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations from unlabeled text.",
  },
  {
    id: 3,
    title: "GPT-4 Technical Report: Large Language Models as Few-Shot Learners",
    authors: ["OpenAI Research Team"],
    journal: "arXiv preprint",
    year: 2023,
    citations: 45200,
    domain: "Artificial Intelligence",
    keywords: ["GPT-4", "Large Language Models", "Few-Shot Learning", "Multimodal"],
    summary: "GPT-4 is a large multimodal model that accepts image and text inputs and produces text outputs, exhibiting human-level performance on various professional and academic benchmarks.",
    abstract: "We report the development of GPT-4, a large-scale, multimodal model which can accept image and text inputs and produce text outputs. Although less capable than humans in many real-world scenarios, GPT-4 exhibits human-level performance on various professional and academic benchmarks.",
  },
  {
    id: 4,
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    authors: ["Patrick Lewis", "Ethan Perez", "Aleksandra Piktus", "Fabio Petroni"],
    journal: "NeurIPS 2020",
    year: 2022,
    citations: 32800,
    domain: "Information Retrieval",
    keywords: ["RAG", "Retrieval", "Knowledge Base", "Generation"],
    summary: "RAG combines parametric and non-parametric memory for language generation, allowing models to access up-to-date information and provide more accurate responses.",
    abstract: "We explore a general-purpose fine-tuning recipe for retrieval-augmented generation (RAG) -- models which combine pre-trained parametric and non-parametric memory for language generation.",
  },
  {
    id: 5,
    title: "LangChain: Building Applications with LLMs through Composability",
    authors: ["Harrison Chase", "Ankush Gola", "Nuno Campos"],
    journal: "GitHub Technical Report",
    year: 2023,
    citations: 28900,
    domain: "Software Engineering",
    keywords: ["LangChain", "LLM", "Agents", "Chains", "Tools"],
    summary: "LangChain provides a framework for developing applications powered by language models, enabling composable and flexible LLM application development.",
    abstract: "LangChain is a framework for developing applications powered by language models. It enables applications that are context-aware and reason about their actions.",
  },
  {
    id: 6,
    title: "IBM Watsonx: Enterprise AI Platform for Foundation Models",
    authors: ["IBM Research Team"],
    journal: "IBM Technical Journal",
    year: 2024,
    citations: 15600,
    domain: "Enterprise AI",
    keywords: ["IBM Watsonx", "Foundation Models", "Enterprise AI", "Granite"],
    summary: "IBM Watsonx provides a comprehensive enterprise AI platform built on foundation models, enabling organizations to build, deploy, and monitor AI applications at scale.",
    abstract: "Watsonx is IBM's enterprise-grade AI and data platform that empowers businesses to build, deploy, and govern AI applications using foundation models and machine learning.",
  },
];

export const topicDistributionData = [
  { name: "Deep Learning", value: 35, fill: "#2563EB" },
  { name: "NLP", value: 28, fill: "#06B6D4" },
  { name: "Computer Vision", value: 20, fill: "#8B5CF6" },
  { name: "Reinforcement Learning", value: 10, fill: "#F59E0B" },
  { name: "Other", value: 7, fill: "#6B7280" },
];

export const citationGrowthData = [
  { month: "Jan", citations: 1200 },
  { month: "Feb", citations: 2100 },
  { month: "Mar", citations: 3400 },
  { month: "Apr", citations: 4800 },
  { month: "May", citations: 5200 },
  { month: "Jun", citations: 6800 },
  { month: "Jul", citations: 8200 },
  { month: "Aug", citations: 9400 },
  { month: "Sep", citations: 11000 },
  { month: "Oct", citations: 13200 },
  { month: "Nov", citations: 15600 },
  { month: "Dec", citations: 18400 },
];

export const researchTimelineData = [
  { year: "2019", papers: 45 },
  { year: "2020", papers: 78 },
  { year: "2021", papers: 112 },
  { year: "2022", papers: 165 },
  { year: "2023", papers: 234 },
  { year: "2024", papers: 310 },
];

export const trendData = [
  { name: "Transformer", score: 95, growth: "+23%" },
  { name: "RAG Systems", score: 88, growth: "+45%" },
  { name: "Multimodal AI", score: 82, growth: "+38%" },
  { name: "Agent Systems", score: 78, growth: "+67%" },
  { name: "Foundation Models", score: 91, growth: "+29%" },
  { name: "Vector Databases", score: 75, growth: "+55%" },
];

export const radarData = [
  { subject: "Deep Learning", A: 120, B: 110, fullMark: 150 },
  { subject: "NLP", A: 98, B: 130, fullMark: 150 },
  { subject: "Computer Vision", A: 86, B: 130, fullMark: 150 },
  { subject: "Robotics", A: 99, B: 100, fullMark: 150 },
  { subject: "Knowledge Graphs", A: 85, B: 90, fullMark: 150 },
  { subject: "Multimodal", A: 65, B: 85, fullMark: 150 },
];

export const emergingTopics = [
  { topic: "Multimodal Reasoning", confidence: 94, timeline: "2025-2026" },
  { topic: "AI Agent Orchestration", confidence: 91, timeline: "2025" },
  { topic: "Federated Learning", confidence: 87, timeline: "2025-2027" },
  { topic: "Quantum ML", confidence: 72, timeline: "2027-2030" },
  { topic: "Neuro-Symbolic AI", confidence: 85, timeline: "2026-2027" },
  { topic: "Edge AI Models", confidence: 89, timeline: "2025-2026" },
];

export const knowledgeGraphNodes = [
  { id: "1", data: { label: "Transformer" }, position: { x: 300, y: 100 }, style: { background: "rgba(37,99,235,0.3)", color: "white", border: "1px solid #2563EB", borderRadius: "8px", padding: "8px 14px", fontSize: "12px" } },
  { id: "2", data: { label: "BERT" }, position: { x: 100, y: 220 }, style: { background: "rgba(6,182,212,0.3)", color: "white", border: "1px solid #06B6D4", borderRadius: "8px", padding: "8px 14px", fontSize: "12px" } },
  { id: "3", data: { label: "GPT-4" }, position: { x: 500, y: 220 }, style: { background: "rgba(139,92,246,0.3)", color: "white", border: "1px solid #8B5CF6", borderRadius: "8px", padding: "8px 14px", fontSize: "12px" } },
  { id: "4", data: { label: "Attention" }, position: { x: 300, y: 340 }, style: { background: "rgba(245,158,11,0.3)", color: "white", border: "1px solid #F59E0B", borderRadius: "8px", padding: "8px 14px", fontSize: "12px" } },
  { id: "5", data: { label: "RAG" }, position: { x: 100, y: 460 }, style: { background: "rgba(34,197,94,0.3)", color: "white", border: "1px solid #22C55E", borderRadius: "8px", padding: "8px 14px", fontSize: "12px" } },
  { id: "6", data: { label: "LLM Agents" }, position: { x: 500, y: 460 }, style: { background: "rgba(239,68,68,0.3)", color: "white", border: "1px solid #EF4444", borderRadius: "8px", padding: "8px 14px", fontSize: "12px" } },
  { id: "7", data: { label: "IBM Granite" }, position: { x: 700, y: 340 }, style: { background: "rgba(37,99,235,0.5)", color: "white", border: "2px solid #3B82F6", borderRadius: "8px", padding: "8px 14px", fontSize: "12px", fontWeight: "600" } },
  { id: "8", data: { label: "NLP" }, position: { x: 200, y: 100 }, style: { background: "rgba(148,163,184,0.2)", color: "white", border: "1px solid #94A3B8", borderRadius: "8px", padding: "8px 14px", fontSize: "12px" } },
];

export const knowledgeGraphEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#2563EB" } },
  { id: "e1-3", source: "1", target: "3", animated: true, style: { stroke: "#8B5CF6" } },
  { id: "e1-4", source: "1", target: "4", animated: false, style: { stroke: "#06B6D4" } },
  { id: "e2-4", source: "2", target: "4", style: { stroke: "#94A3B8" } },
  { id: "e2-5", source: "2", target: "5", animated: true, style: { stroke: "#22C55E" } },
  { id: "e3-6", source: "3", target: "6", animated: true, style: { stroke: "#EF4444" } },
  { id: "e4-6", source: "4", target: "6", style: { stroke: "#F59E0B" } },
  { id: "e7-3", source: "7", target: "3", animated: true, style: { stroke: "#3B82F6", strokeWidth: 2 } },
  { id: "e7-6", source: "7", target: "6", animated: true, style: { stroke: "#3B82F6", strokeWidth: 2 } },
  { id: "e8-2", source: "8", target: "2", style: { stroke: "#94A3B8" } },
  { id: "e8-1", source: "8", target: "1", style: { stroke: "#94A3B8" } },
];

export const aiResponses = {
  summarize: `**Research Summary: Transformer-Based AI Models**\n\nBased on your uploaded documents, here is a comprehensive summary:\n\n**Key Findings:**\n- Transformer architectures have revolutionized NLP tasks with attention mechanisms\n- BERT and GPT models achieve state-of-the-art results on 11 NLP benchmarks\n- Self-attention allows parallel processing, reducing training time by 60%\n\n**Core Contributions:**\n1. Multi-head attention mechanism enables capturing diverse representation subspaces\n2. Positional encoding preserves sequence order without recurrence\n3. Transfer learning reduces labeled data requirements by up to 80%\n\n**IBM Granite Integration:** The IBM Granite model family offers enterprise-grade summarization with citation-aware outputs, making it ideal for academic research synthesis.`,

  findPapers: `**Relevant Papers Found (via Semantic Search)**\n\n1. **"Attention Is All You Need"** - Vaswani et al. (2017) — 87,420 citations\n2. **"BERT: Pre-training of Deep Bidirectional Transformers"** - Devlin et al. (2019) — 65,000 citations\n3. **"GPT-4 Technical Report"** - OpenAI (2023) — 45,200 citations\n4. **"RAG for Knowledge-Intensive NLP"** - Lewis et al. (2020) — 32,800 citations\n\n*Powered by IBM Watsonx Embedding Model + FAISS Vector Search*`,

  references: `**Generated References (APA 7th Edition)**\n\nVaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I. (2017). Attention is all you need. *Advances in Neural Information Processing Systems*, 30.\n\nDevlin, J., Chang, M.-W., Lee, K., & Toutanova, K. (2019). BERT: Pre-training of deep bidirectional transformers for language understanding. *Proceedings of NAACL-HLT 2019*, 4171–4186.\n\nLewis, P., Perez, E., Piktus, A., & Petroni, F. (2020). Retrieval-augmented generation for knowledge-intensive NLP tasks. *NeurIPS 2020*, 9459–9474.`,

  predictTrends: `**Research Trend Predictions (2025–2030)**\n\n📈 **Emerging Trends:**\n- **AI Agent Orchestration** — 94% confidence, peak 2025–2026\n- **Multimodal Reasoning** — 91% confidence, peak 2025–2027\n- **Federated Learning** — 87% confidence, widespread adoption by 2026\n\n⚠️ **Citation Gaps Detected:**\n- Quantum ML + Transformers: Only 234 papers (low coverage)\n- Neuromorphic AI: 89 papers (emerging gap)\n\n🔭 **Future Research Opportunities:**\n1. Hybrid symbolic-neural architectures\n2. Energy-efficient foundation models\n3. Real-time multimodal agent systems`,

  literatureReview: `**Generated Literature Review**\n\n## Introduction\nThe landscape of artificial intelligence has been fundamentally transformed by the introduction of attention-based neural architectures. This literature review synthesizes recent advances in transformer models, retrieval-augmented generation, and agentic AI systems.\n\n## Background\nSeminal work by Vaswani et al. (2017) established the transformer architecture as the dominant paradigm in NLP, inspiring subsequent models including BERT (Devlin et al., 2019) and GPT series (Brown et al., 2020).\n\n## Recent Developments\nThe integration of retrieval mechanisms with generative models (RAG; Lewis et al., 2020) addresses hallucination and knowledge staleness issues. Enterprise platforms such as IBM Watsonx provide production-grade implementations...\n\n## Research Gaps\nCurrent literature lacks comprehensive studies on energy efficiency trade-offs in large-scale deployments and cross-domain transfer in low-resource settings.`,
};
