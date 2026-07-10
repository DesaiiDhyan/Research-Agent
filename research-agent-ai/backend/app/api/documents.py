import uuid
import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models.schemas import APIResponse
from app.services.vector_service import add_document, chunk_text

router = APIRouter()

UPLOAD_DIR = "./uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_TYPES = {
    "application/pdf", "image/png", "image/jpeg",
    "text/plain", "text/csv",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
}


@router.post("/upload", response_model=APIResponse)
async def upload_document(file: UploadFile = File(...)):
    """
    Upload and process a research document.
    Extracts text, generates summary, keywords, and entities using IBM Granite.
    Stores embeddings in FAISS/ChromaDB for semantic search.
    """
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(400, f"Unsupported file type: {file.content_type}")

    contents = await file.read()
    doc_id = f"doc_{uuid.uuid4().hex[:8]}"

    # Save file
    save_path = os.path.join(UPLOAD_DIR, f"{doc_id}_{file.filename}")
    with open(save_path, "wb") as f:
        f.write(contents)

    # ---- PDF Text Extraction Placeholder ----
    # from pypdf import PdfReader
    # reader = PdfReader(BytesIO(contents))
    # extracted = "\n".join(p.extract_text() for p in reader.pages)

    extracted_text = f"Extracted text placeholder from {file.filename}. Connect pypdf/pdfminer for real extraction."

    # ---- OCR Placeholder for images ----
    # from PIL import Image; import pytesseract
    # extracted_text = pytesseract.image_to_string(Image.open(BytesIO(contents)))

    # Store in vector DB
    await add_document(doc_id, extracted_text, {"filename": file.filename})

    # Mock AI processing results
    result = {
        "id": doc_id,
        "filename": file.filename,
        "size": len(contents),
        "extracted_text": extracted_text[:500],
        "summary": "IBM Granite summary placeholder — connect IBM_API_KEY to get AI-generated summaries.",
        "keywords": ["AI", "Research", "Machine Learning", "IBM"],
        "entities": ["IBM", "Watsonx", "Granite"],
        "pages": max(1, len(contents) // 3000),
        "word_count": len(extracted_text.split()),
        "chunks": len(chunk_text(extracted_text)),
        "indexed": True,
    }
    return APIResponse(data=result, placeholder=True)


@router.get("/list", response_model=APIResponse)
async def list_documents():
    """List all uploaded documents."""
    files = os.listdir(UPLOAD_DIR) if os.path.exists(UPLOAD_DIR) else []
    return APIResponse(data={"documents": files, "count": len(files)})
