from pydantic import BaseModel
from typing import Optional, List, Any


class SummarizeRequest(BaseModel):
    text: str
    max_tokens: int = 500


class QARequest(BaseModel):
    question: str
    context: Optional[str] = None
    document_ids: Optional[List[str]] = None


class SearchRequest(BaseModel):
    query: str
    filters: Optional[dict] = {}
    top_k: int = 10


class RAGRequest(BaseModel):
    query: str
    documentIds: Optional[List[str]] = []
    flow_id: Optional[str] = None


class OrchestrateRequest(BaseModel):
    task: str
    params: Optional[dict] = {}


class CitationRequest(BaseModel):
    paperIds: List[int]
    format: str = "apa"


class TrendRequest(BaseModel):
    topicArea: str


class GraphRequest(BaseModel):
    documentIds: Optional[List[str]] = []


class ReviewRequest(BaseModel):
    topic: str
    papers: Optional[List[dict]] = []


class APIResponse(BaseModel):
    success: bool = True
    data: Any = None
    error: Optional[str] = None
    placeholder: bool = False
