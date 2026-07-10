from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

from app.api import granite, documents, search, langflow, orchestrate, citations, trends, graph, review

app = FastAPI(
    title="Research Agent AI - Backend API",
    description="IBM Watsonx-powered academic research platform API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(granite.router, prefix="/api/granite", tags=["IBM Granite"])
app.include_router(documents.router, prefix="/api/documents", tags=["Documents"])
app.include_router(search.router, prefix="/api/search", tags=["Semantic Search"])
app.include_router(langflow.router, prefix="/api/langflow", tags=["IBM Langflow"])
app.include_router(orchestrate.router, prefix="/api/orchestrate", tags=["IBM Orchestrate"])
app.include_router(citations.router, prefix="/api/citations", tags=["Citations"])
app.include_router(trends.router, prefix="/api/trends", tags=["Trends"])
app.include_router(graph.router, prefix="/api/graph", tags=["Knowledge Graph"])
app.include_router(review.router, prefix="/api/review", tags=["Literature Review"])


@app.get("/")
async def root():
    return {"message": "Research Agent AI API", "version": "1.0.0", "status": "running"}


@app.get("/api/health")
async def health():
    return {"status": "healthy", "ibm_connected": False, "vector_db": "placeholder"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
