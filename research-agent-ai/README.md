# Research Agent AI 🧠

**Your Intelligent AI Research Companion** — A full-stack AI platform for academic research powered by IBM AI technologies.

[![IBM Watsonx](https://img.shields.io/badge/IBM-Watsonx-blue?style=flat-square)](https://www.ibm.com/watsonx)
[![IBM Granite](https://img.shields.io/badge/IBM-Granite_Models-0f62fe?style=flat-square)](https://www.ibm.com/granite)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat-square)](https://fastapi.tiangolo.com)

---

## 🚀 Quick Start

### Frontend (React + Vite)
```bash
cd research-agent-ai
npm install
npm run dev
# → http://localhost:5173
```

### Backend (FastAPI)
```bash
cd research-agent-ai/backend
pip install -r requirements.txt
cp .env.example .env   # Add your IBM credentials
uvicorn main:app --reload --port 8000
# → http://localhost:8000/docs
```

---

## 🏗️ Architecture

```
Frontend  ──────────────────────────────────────────
  React + Vite + Tailwind CSS + Framer Motion
  React Router v6 (8 pages + nested routes)
  Recharts + ReactFlow (interactive charts & graphs)

Backend  ───────────────────────────────────────────
  FastAPI (Python) — 9 router modules, 24+ endpoints
  Pydantic v2 schema validation
  CORS + async request handling

IBM AI Layer  ──────────────────────────────────────
  IBM Watsonx → Text generation & embeddings
  IBM Granite 3 (8B Instruct) → Summarization, Q&A
  IBM Langflow → Visual RAG pipeline orchestration
  IBM Orchestrate → Multi-agent task automation

Vector Database  ───────────────────────────────────
  FAISS → High-speed vector similarity search
  ChromaDB → Persistent document embeddings
  IBM Slate 125M → Semantic embedding model

Document Processing  ───────────────────────────────
  pypdf → PDF text extraction
  Pillow + pytesseract → OCR for images
  Text chunking + embedding pipeline
```

---

## 📄 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing Page | Hero, Features, How It Works, Tech Stack, About |
| `/dashboard` | Dashboard | Analytics overview with charts |
| `/literature` | Literature Review | Filterable paper cards |
| `/knowledge-graph` | Knowledge Graph | Interactive ReactFlow graph |
| `/trends` | Trend Analysis | Multi-chart analytics |
| `/predictions` | Future Predictions | AI research gap detection |
| `/search` | Search | Semantic paper search |
| `/demo` | Live AI Demo | Chat with Research Agent AI |
| `/upload` | Upload | Drag-and-drop document processing |
| `/login` | Login | Authentication page |

---

## 🔌 IBM AI Integration

### IBM Watsonx Granite
```env
IBM_API_KEY=your_api_key
IBM_PROJECT_ID=your_project_id
IBM_WATSONX_URL=https://us-south.ml.cloud.ibm.com
```
Models used:
- `ibm/granite-3-8b-instruct` — Summarization, Q&A, Literature Review
- `ibm/slate-125m-english-rtrvr` — Semantic embeddings

### IBM Langflow
```env
LANGFLOW_URL=https://your-langflow-instance
LANGFLOW_API_KEY=your_key
RAG_FLOW_ID=your_flow_id
```
RAG Flow: Query → IBM Slate Embeddings → FAISS Search → Granite Generation

### IBM Orchestrate
```env
ORCHESTRATE_URL=https://your-orchestrate-instance
ORCHESTRATE_TOKEN=your_token
```
Agents: Literature Review • Citation Extraction • Trend Analysis • Gap Detection

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 6 |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| Routing | React Router v6 |
| Charts | Recharts |
| Graph | ReactFlow |
| Icons | Lucide React |
| Backend | FastAPI + Python |
| AI Models | IBM Watsonx Granite |
| RAG Pipeline | IBM Langflow |
| Orchestration | IBM Orchestrate |
| Vector DB | FAISS + ChromaDB |
| File Upload | react-dropzone |

---

## 📡 API Endpoints

```
POST /api/granite/summarize     — Summarize with IBM Granite
POST /api/granite/qa            — Q&A with context
POST /api/documents/upload      — Upload & process documents
POST /api/search/semantic       — FAISS semantic search
POST /api/langflow/rag          — IBM Langflow RAG pipeline
POST /api/orchestrate/run       — IBM Orchestrate multi-agent
POST /api/citations/generate    — Generate formatted citations
POST /api/trends/predict        — Research trend prediction
POST /api/graph/generate        — Knowledge graph generation
POST /api/review/generate       — Literature review generation
GET  /api/health                — System health check
GET  /docs                      — Swagger API documentation
```

---

## 🎨 Design System

- **Dark Theme**: `#0F172A` background with `#2563EB` IBM Blue accents
- **Typography**: Poppins (300–900 weights)
- **Effects**: Glassmorphism, gradient borders, particle canvas
- **Animations**: Framer Motion entrance animations + CSS keyframes
- **Responsive**: Mobile-first, 3-column desktop → 1-column mobile

---

*Built for IBM Hackathon — Powered by IBM Watsonx, Granite, Langflow & Orchestrate*
