"""
IBM Langflow Integration
------------------------
Handles RAG pipeline execution through IBM Langflow.
Configure LANGFLOW_URL and LANGFLOW_API_KEY to enable live flows.
"""
import os
import httpx
from fastapi import APIRouter
from app.models.schemas import RAGRequest, APIResponse

router = APIRouter()
LANGFLOW_URL = os.getenv("LANGFLOW_URL", "")
LANGFLOW_API_KEY = os.getenv("LANGFLOW_API_KEY", "")
RAG_FLOW_ID = os.getenv("RAG_FLOW_ID", "")


@router.post("/rag", response_model=APIResponse)
async def run_rag_pipeline(req: RAGRequest):
    """
    Execute RAG pipeline through IBM Langflow.
    Flow: Query → IBM Embeddings → FAISS Search → Granite Generation → Response
    """
    if not LANGFLOW_URL:
        return APIResponse(
            data={
                "answer": "IBM Langflow RAG pipeline placeholder.\n\nTo enable:\n1. Set LANGFLOW_URL environment variable\n2. Set LANGFLOW_API_KEY\n3. Set RAG_FLOW_ID\n\nThe RAG pipeline will:\n• Embed your query with IBM Slate\n• Search FAISS/ChromaDB for relevant chunks\n• Pass context to IBM Granite for grounded answers",
                "sources": [],
                "flow_id": RAG_FLOW_ID or "not-configured",
            },
            placeholder=True
        )

    async with httpx.AsyncClient(timeout=60) as client:
        response = await client.post(
            f"{LANGFLOW_URL}/api/v1/run/{req.flow_id or RAG_FLOW_ID}",
            headers={"x-api-key": LANGFLOW_API_KEY},
            json={
                "input_value": req.query,
                "input_type": "chat",
                "output_type": "chat",
                "tweaks": {"document_ids": req.documentIds},
            },
        )
        if response.status_code == 200:
            data = response.json()
            answer = data.get("outputs", [{}])[0].get("outputs", [{}])[0].get("results", {}).get("message", {}).get("text", "")
            return APIResponse(data={"answer": answer, "sources": []})

    return APIResponse(success=False, error="Langflow request failed", placeholder=True)


@router.get("/flows")
async def list_flows():
    """List available Langflow RAG pipelines."""
    return {
        "flows": [
            {"id": "rag-research", "name": "Research RAG Pipeline", "description": "IBM Slate + FAISS + Granite"},
            {"id": "citation-gen", "name": "Citation Generator", "description": "Extract and format citations"},
            {"id": "lit-review", "name": "Literature Review", "description": "Generate structured literature reviews"},
        ],
        "connected": bool(LANGFLOW_URL)
    }
