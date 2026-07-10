from fastapi import APIRouter
from app.models.schemas import SummarizeRequest, QARequest, APIResponse
from app.services.watsonx_service import granite_generate, is_connected, PLACEHOLDER_RESPONSES

router = APIRouter()


@router.post("/summarize", response_model=APIResponse)
async def summarize(req: SummarizeRequest):
    """Summarize text using IBM Watsonx Granite."""
    if not is_connected():
        return APIResponse(
            data={"summary": PLACEHOLDER_RESPONSES["summarize"]},
            placeholder=True
        )
    prompt = f"Summarize the following academic text in 3-4 sentences:\n\n{req.text}\n\nSummary:"
    result = await granite_generate(prompt, max_tokens=req.max_tokens)
    return APIResponse(data={"summary": result})


@router.post("/qa", response_model=APIResponse)
async def question_answer(req: QARequest):
    """Answer research questions using IBM Watsonx Granite."""
    if not is_connected():
        return APIResponse(
            data={"answer": PLACEHOLDER_RESPONSES["qa"]},
            placeholder=True
        )
    context_section = f"\nContext:\n{req.context}" if req.context else ""
    prompt = f"You are an expert research assistant.{context_section}\n\nQuestion: {req.question}\n\nAnswer:"
    result = await granite_generate(prompt, max_tokens=600)
    return APIResponse(data={"answer": result})


@router.get("/models")
async def list_models():
    return {
        "models": [
            {"id": "ibm/granite-3-8b-instruct", "name": "Granite 3 8B Instruct", "type": "generation"},
            {"id": "ibm/granite-3-2b-instruct", "name": "Granite 3 2B Instruct", "type": "generation"},
            {"id": "ibm/slate-125m-english-rtrvr", "name": "Slate 125M Embeddings", "type": "embedding"},
        ],
        "connected": is_connected()
    }
