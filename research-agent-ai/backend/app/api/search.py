from fastapi import APIRouter
from app.models.schemas import SearchRequest, APIResponse
from app.services.vector_service import semantic_search

router = APIRouter()

SAMPLE_PAPERS = [
    {"id": 1, "title": "Attention Is All You Need", "authors": ["Vaswani et al."], "year": 2017, "citations": 87420, "score": 0.97},
    {"id": 2, "title": "BERT: Pre-training Deep Bidirectional Transformers", "authors": ["Devlin et al."], "year": 2019, "citations": 65000, "score": 0.93},
    {"id": 3, "title": "GPT-4 Technical Report", "authors": ["OpenAI"], "year": 2023, "citations": 45200, "score": 0.89},
    {"id": 4, "title": "Retrieval-Augmented Generation for NLP", "authors": ["Lewis et al."], "year": 2020, "citations": 32800, "score": 0.85},
    {"id": 5, "title": "IBM Watsonx: Enterprise AI Platform", "authors": ["IBM Research"], "year": 2024, "citations": 15600, "score": 0.88},
]


@router.post("/semantic", response_model=APIResponse)
async def semantic_search_endpoint(req: SearchRequest):
    """
    Semantic search across the knowledge base.
    Uses FAISS/ChromaDB vector similarity search with IBM embeddings.
    """
    # Try vector search
    vector_results = await semantic_search(req.query, top_k=req.top_k, filters=req.filters)

    # Fallback to keyword matching on sample data
    q = req.query.lower()
    keyword_results = [p for p in SAMPLE_PAPERS if q in p["title"].lower()]

    results = keyword_results if keyword_results else vector_results
    return APIResponse(data={"results": results, "count": len(results), "query": req.query})


@router.get("/suggest/{query}")
async def search_suggestions(query: str):
    """Return autocomplete suggestions for search queries."""
    suggestions = ["transformer", "BERT", "GPT", "RAG", "IBM Watsonx", "attention mechanism", "knowledge graph"]
    filtered = [s for s in suggestions if query.lower() in s.lower()]
    return {"suggestions": filtered[:5]}
