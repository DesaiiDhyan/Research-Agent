from fastapi import APIRouter
from app.models.schemas import ReviewRequest, APIResponse
from app.services.watsonx_service import granite_generate, is_connected, PLACEHOLDER_RESPONSES

router = APIRouter()


@router.post("/generate", response_model=APIResponse)
async def generate_review(req: ReviewRequest):
    """
    Generate a structured literature review using IBM Watsonx Granite.
    Takes a research topic and list of papers, produces an academic review.
    """
    if not is_connected():
        placeholder_review = f"""# Literature Review: {req.topic}

## Introduction
This automated literature review covers recent advances in {req.topic}, synthesizing findings from {len(req.papers)} research papers.

## Background
The field of {req.topic} has seen significant growth in recent years, with transformer-based approaches dominating the landscape...

## Key Themes
1. **Foundation Models**: Large-scale pre-training has become the dominant paradigm
2. **Retrieval Augmentation**: Combining parametric and non-parametric memory improves factuality
3. **Agent Systems**: Autonomous AI agents are emerging as a key research direction

## Gaps Identified
- Limited work on energy efficiency in large-scale deployments
- Insufficient cross-lingual evaluation benchmarks
- Lack of real-time adaptation mechanisms

## Conclusion
The field continues to evolve rapidly. Future work should address the identified gaps...

*Note: Connect IBM_API_KEY for AI-generated reviews using IBM Granite.*
"""
        return APIResponse(data={"review": placeholder_review, "topic": req.topic}, placeholder=True)

    prompt = f"""Generate a structured academic literature review for the topic: {req.topic}

Include:
1. Introduction
2. Background and Related Work  
3. Key Themes and Contributions
4. Research Gaps
5. Conclusion and Future Directions

Papers to synthesize: {[p.get('title', '') for p in req.papers[:10]]}

Literature Review:"""

    review = await granite_generate(prompt, max_tokens=800)
    return APIResponse(data={"review": review, "topic": req.topic})
