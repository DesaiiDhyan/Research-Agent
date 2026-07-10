import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// IBM Watsonx Granite — Summarization
export const summarizeText = async (text) => {
  try {
    const response = await api.post('/granite/summarize', { text });
    return response.data;
  } catch {
    // Return mock data when backend not connected
    return { summary: 'IBM Watsonx Granite summarization placeholder. Connect IBM_API_KEY to enable.' };
  }
};

// IBM Watsonx — Q&A
export const askQuestion = async (question, context) => {
  try {
    const response = await api.post('/granite/qa', { question, context });
    return response.data;
  } catch {
    return { answer: 'IBM Granite Q&A placeholder. Connect IBM_API_KEY and PROJECT_ID to enable.' };
  }
};

// PDF Upload & Processing
export const uploadDocument = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await api.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => onProgress && onProgress(Math.round((e.loaded * 100) / e.total)),
    });
    return response.data;
  } catch {
    return {
      id: 'doc_' + Date.now(),
      filename: file.name,
      extracted_text: 'Sample extracted text from PDF...',
      summary: 'AI-generated summary placeholder',
      keywords: ['AI', 'Research', 'Machine Learning'],
      entities: ['IBM', 'Transformer', 'BERT'],
    };
  }
};

// Semantic Search via FAISS/ChromaDB
export const semanticSearch = async (query, filters = {}) => {
  try {
    const response = await api.post('/search/semantic', { query, filters });
    return response.data;
  } catch {
    const { samplePapers } = await import('../data/sampleData.js');
    return { results: samplePapers.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
    )};
  }
};

// IBM Langflow — RAG Pipeline
export const runRAGPipeline = async (query, documentIds = []) => {
  try {
    const response = await api.post('/langflow/rag', { query, documentIds });
    return response.data;
  } catch {
    return { answer: 'IBM Langflow RAG pipeline placeholder. Configure LANGFLOW_URL to enable.' };
  }
};

// IBM Orchestrate — Agent Workflow
export const runAgentWorkflow = async (task, params = {}) => {
  try {
    const response = await api.post('/orchestrate/run', { task, params });
    return response.data;
  } catch {
    return { status: 'placeholder', result: 'IBM Orchestrate agent workflow placeholder.' };
  }
};

// Citation Generation
export const generateCitations = async (paperIds, format = 'apa') => {
  try {
    const response = await api.post('/citations/generate', { paperIds, format });
    return response.data;
  } catch {
    return { citations: [] };
  }
};

// Trend Prediction
export const predictTrends = async (topicArea) => {
  try {
    const response = await api.post('/trends/predict', { topicArea });
    return response.data;
  } catch {
    const { emergingTopics } = await import('../data/sampleData.js');
    return { predictions: emergingTopics };
  }
};

// Knowledge Graph Generation
export const generateKnowledgeGraph = async (documentIds) => {
  try {
    const response = await api.post('/graph/generate', { documentIds });
    return response.data;
  } catch {
    const { knowledgeGraphNodes, knowledgeGraphEdges } = await import('../data/sampleData.js');
    return { nodes: knowledgeGraphNodes, edges: knowledgeGraphEdges };
  }
};

// Literature Review Generation
export const generateLiteratureReview = async (topic, papers) => {
  try {
    const response = await api.post('/review/generate', { topic, papers });
    return response.data;
  } catch {
    return { review: 'IBM Granite literature review generation placeholder.' };
  }
};

export default api;
