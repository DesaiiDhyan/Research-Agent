"""
IBM Watsonx Granite Service
--------------------------
Handles all interactions with IBM Watsonx foundation models.
Configure IBM_API_KEY and IBM_PROJECT_ID to enable live responses.
"""
import os
from typing import Optional
import httpx

IBM_API_KEY = os.getenv("IBM_API_KEY", "")
IBM_PROJECT_ID = os.getenv("IBM_PROJECT_ID", "")
IBM_WATSONX_URL = os.getenv("IBM_WATSONX_URL", "https://us-south.ml.cloud.ibm.com")
LANGFLOW_URL = os.getenv("LANGFLOW_URL", "")
ORCHESTRATE_URL = os.getenv("ORCHESTRATE_URL", "")

GRANITE_MODELS = {
    "summarize": "ibm/granite-3-8b-instruct",
    "qa": "ibm/granite-3-8b-instruct",
    "embed": "ibm/slate-125m-english-rtrvr",
}

PLACEHOLDER_RESPONSES = {
    "summarize": "IBM Watsonx Granite summarization placeholder. Set IBM_API_KEY and IBM_PROJECT_ID environment variables to enable live AI responses.",
    "qa": "IBM Watsonx Granite Q&A placeholder. Connect your IBM Cloud credentials to get live answers.",
    "embed": "Embedding placeholder — configure IBM_API_KEY to generate real semantic embeddings.",
    "review": "Literature review generation placeholder. IBM Granite will produce structured academic reviews when connected.",
    "citation": "Citation generation placeholder. IBM Granite will format proper academic citations when connected.",
}


async def get_iam_token() -> Optional[str]:
    """Obtain IAM access token from IBM Cloud."""
    if not IBM_API_KEY:
        return None
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://iam.cloud.ibm.com/identity/token",
            data={
                "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
                "apikey": IBM_API_KEY,
            },
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )
        if response.status_code == 200:
            return response.json().get("access_token")
    return None


async def granite_generate(prompt: str, model: str = "ibm/granite-3-8b-instruct", max_tokens: int = 500) -> str:
    """Call IBM Watsonx text generation endpoint."""
    token = await get_iam_token()
    if not token:
        return PLACEHOLDER_RESPONSES.get("summarize")

    async with httpx.AsyncClient(timeout=60) as client:
        response = await client.post(
            f"{IBM_WATSONX_URL}/ml/v1/text/generation",
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
            },
            json={
                "model_id": model,
                "input": prompt,
                "parameters": {
                    "decoding_method": "greedy",
                    "max_new_tokens": max_tokens,
                    "temperature": 0.7,
                },
                "project_id": IBM_PROJECT_ID,
            },
        )
        if response.status_code == 200:
            results = response.json().get("results", [])
            if results:
                return results[0].get("generated_text", "")
    return PLACEHOLDER_RESPONSES.get("qa")


async def granite_embed(text: str) -> list:
    """Generate embeddings using IBM Slate embedding model."""
    token = await get_iam_token()
    if not token:
        return [0.0] * 128  # Placeholder embedding

    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.post(
            f"{IBM_WATSONX_URL}/ml/v1/text/embeddings",
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
            },
            json={
                "model_id": GRANITE_MODELS["embed"],
                "inputs": [text],
                "project_id": IBM_PROJECT_ID,
            },
        )
        if response.status_code == 200:
            return response.json().get("results", [{}])[0].get("embedding", [])
    return [0.0] * 128


def is_connected() -> bool:
    return bool(IBM_API_KEY and IBM_PROJECT_ID)
