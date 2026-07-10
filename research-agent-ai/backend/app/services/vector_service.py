"""
Vector Database Service (FAISS / ChromaDB)
------------------------------------------
Handles document chunking, embedding storage, and semantic search.
Uses FAISS as the primary backend with ChromaDB as an alternative.
"""
import os
import json
from typing import List, Dict, Optional

# ---- FAISS placeholder ----
# from langchain.vectorstores import FAISS
# from langchain.embeddings import WatsonxEmbeddings

# ---- ChromaDB placeholder ----
# import chromadb
# chroma_client = chromadb.PersistentClient(path="./chroma_db")
# collection = chroma_client.get_or_create_collection("research_papers")

VECTOR_DB_TYPE = os.getenv("VECTOR_DB", "faiss")  # "faiss" or "chroma"

# In-memory mock store for demo mode
_mock_store: List[Dict] = [
    {
        "id": "doc_001",
        "text": "Transformer architecture with attention mechanisms for NLP tasks",
        "metadata": {"title": "Attention Is All You Need", "year": 2017},
        "embedding": [0.1, 0.2, 0.3],
    },
    {
        "id": "doc_002",
        "text": "BERT pre-training bidirectional transformers language understanding",
        "metadata": {"title": "BERT", "year": 2019},
        "embedding": [0.15, 0.25, 0.35],
    },
]


def chunk_text(text: str, chunk_size: int = 512, overlap: int = 50) -> List[str]:
    """Split text into overlapping chunks for embedding."""
    words = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size - overlap):
        chunk = " ".join(words[i:i + chunk_size])
        if chunk:
            chunks.append(chunk)
    return chunks


async def add_document(doc_id: str, text: str, metadata: dict = {}) -> bool:
    """
    Add a document to the vector store.
    Placeholder: Connect FAISS or ChromaDB for production use.
    """
    chunks = chunk_text(text)
    for i, chunk in enumerate(chunks):
        _mock_store.append({
            "id": f"{doc_id}_chunk_{i}",
            "text": chunk,
            "metadata": {**metadata, "chunk": i},
            "embedding": [0.0] * 128,  # Replace with real embeddings
        })
    return True


async def semantic_search(query: str, top_k: int = 5, filters: dict = {}) -> List[Dict]:
    """
    Perform semantic similarity search.
    Placeholder: Uses simple text matching; replace with vector similarity.
    """
    query_lower = query.lower()
    results = []
    for doc in _mock_store:
        if query_lower in doc["text"].lower():
            results.append({
                "id": doc["id"],
                "text": doc["text"][:300],
                "metadata": doc["metadata"],
                "score": 0.92,
            })
    return results[:top_k] if results else [
        {
            "id": "placeholder",
            "text": f"Semantic search placeholder for '{query}'. Connect FAISS/ChromaDB + IBM embeddings.",
            "metadata": {},
            "score": 0.0,
        }
    ]


async def delete_document(doc_id: str) -> bool:
    global _mock_store
    _mock_store = [d for d in _mock_store if not d["id"].startswith(doc_id)]
    return True
