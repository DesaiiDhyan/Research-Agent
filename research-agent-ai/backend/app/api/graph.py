from fastapi import APIRouter
from app.models.schemas import GraphRequest, APIResponse

router = APIRouter()


@router.post("/generate", response_model=APIResponse)
async def generate_graph(req: GraphRequest):
    """Generate a knowledge graph from research documents."""
    nodes = [
        {"id": "1", "label": "Transformer", "type": "architecture", "weight": 100},
        {"id": "2", "label": "BERT", "type": "model", "weight": 85},
        {"id": "3", "label": "GPT-4", "type": "model", "weight": 90},
        {"id": "4", "label": "Attention", "type": "mechanism", "weight": 95},
        {"id": "5", "label": "RAG", "type": "system", "weight": 80},
        {"id": "6", "label": "LLM Agents", "type": "system", "weight": 75},
        {"id": "7", "label": "IBM Granite", "type": "model", "weight": 88},
    ]
    edges = [
        {"source": "1", "target": "2", "label": "base_of", "weight": 0.9},
        {"source": "1", "target": "3", "label": "base_of", "weight": 0.9},
        {"source": "4", "target": "1", "label": "component_of", "weight": 0.95},
        {"source": "2", "target": "5", "label": "used_in", "weight": 0.8},
        {"source": "3", "target": "6", "label": "enables", "weight": 0.85},
        {"source": "7", "target": "3", "label": "similar_to", "weight": 0.75},
    ]
    return APIResponse(data={"nodes": nodes, "edges": edges, "node_count": len(nodes), "edge_count": len(edges)})


@router.get("/stats")
async def graph_stats():
    return APIResponse(data={"nodes": 47, "edges": 124, "clusters": 8, "density": 0.34})
