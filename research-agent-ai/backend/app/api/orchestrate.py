"""
IBM Orchestrate Integration
---------------------------
Handles multi-agent research automation workflows.
Configure ORCHESTRATE_URL and credentials to enable live orchestration.
"""
import os
import httpx
from fastapi import APIRouter
from app.models.schemas import OrchestrateRequest, APIResponse

router = APIRouter()
ORCHESTRATE_URL = os.getenv("ORCHESTRATE_URL", "")
ORCHESTRATE_TOKEN = os.getenv("ORCHESTRATE_TOKEN", "")

AGENT_TASKS = {
    "literature_review": "Automated literature review generation agent",
    "citation_extraction": "Citation extraction and formatting agent",
    "trend_analysis": "Research trend analysis agent",
    "gap_detection": "Research gap detection agent",
    "paper_recommendation": "Paper recommendation agent",
}


@router.post("/run", response_model=APIResponse)
async def run_workflow(req: OrchestrateRequest):
    """
    Execute an IBM Orchestrate multi-agent workflow.
    Agents collaborate to complete complex research tasks autonomously.
    """
    if not ORCHESTRATE_URL:
        return APIResponse(
            data={
                "status": "placeholder",
                "task": req.task,
                "result": f"IBM Orchestrate placeholder for task: '{req.task}'.\n\nTo enable:\n1. Set ORCHESTRATE_URL\n2. Set ORCHESTRATE_TOKEN\n\nAvailable agents: {', '.join(AGENT_TASKS.keys())}",
                "agents_used": list(AGENT_TASKS.keys())[:2],
                "steps_completed": 0,
            },
            placeholder=True
        )

    async with httpx.AsyncClient(timeout=120) as client:
        response = await client.post(
            f"{ORCHESTRATE_URL}/v1/workflows/run",
            headers={"Authorization": f"Bearer {ORCHESTRATE_TOKEN}"},
            json={"task": req.task, "parameters": req.params},
        )
        if response.status_code == 200:
            return APIResponse(data=response.json())

    return APIResponse(success=False, error="Orchestrate request failed")


@router.get("/agents")
async def list_agents():
    return {
        "agents": [
            {"name": k, "description": v, "status": "placeholder"}
            for k, v in AGENT_TASKS.items()
        ],
        "connected": bool(ORCHESTRATE_URL)
    }
