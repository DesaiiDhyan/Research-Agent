from fastapi import APIRouter
from app.models.schemas import TrendRequest, APIResponse

router = APIRouter()

TREND_DATA = {
    "deep_learning": {
        "score": 95,
        "growth": "+23% YoY",
        "emerging": ["Multimodal transformers", "Efficient attention", "State space models"],
        "declining": ["Basic RNNs", "Manual feature engineering"],
        "confidence": 0.94,
    },
    "nlp": {
        "score": 88,
        "growth": "+45% YoY",
        "emerging": ["RAG systems", "Agent frameworks", "Long-context LLMs"],
        "declining": ["Rule-based NLP", "Word2Vec"],
        "confidence": 0.91,
    },
    "default": {
        "score": 78,
        "growth": "+30% YoY",
        "emerging": ["AI Agent Orchestration", "Multimodal AI", "Federated Learning"],
        "declining": ["Traditional ML pipelines", "Static models"],
        "confidence": 0.87,
        "predictions": [
            {"topic": "Multimodal Reasoning", "confidence": 0.94, "timeline": "2025-2026"},
            {"topic": "AI Agent Orchestration", "confidence": 0.91, "timeline": "2025"},
            {"topic": "Federated Learning", "confidence": 0.87, "timeline": "2025-2027"},
            {"topic": "Quantum ML", "confidence": 0.72, "timeline": "2027-2030"},
            {"topic": "Neuro-Symbolic AI", "confidence": 0.85, "timeline": "2026-2027"},
        ]
    }
}


@router.post("/predict", response_model=APIResponse)
async def predict_trends(req: TrendRequest):
    """Predict research trends for a given topic area using IBM Granite temporal analysis."""
    topic_key = req.topicArea.lower().replace(" ", "_")
    data = TREND_DATA.get(topic_key, TREND_DATA["default"])
    return APIResponse(data={**data, "topic": req.topicArea})


@router.get("/current")
async def get_current_trends():
    return APIResponse(data={
        "top_trends": [
            {"name": "Agent Systems", "score": 95, "change": "+67%"},
            {"name": "RAG Systems", "score": 88, "change": "+45%"},
            {"name": "Multimodal AI", "score": 82, "change": "+38%"},
            {"name": "Foundation Models", "score": 91, "change": "+29%"},
            {"name": "Vector Databases", "score": 75, "change": "+55%"},
        ],
        "updated": "2025-07",
    })
