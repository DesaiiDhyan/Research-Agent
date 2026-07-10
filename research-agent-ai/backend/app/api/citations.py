from fastapi import APIRouter
from app.models.schemas import CitationRequest, APIResponse

router = APIRouter()

SAMPLE_CITATIONS = {
    1: {
        "apa": "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I. (2017). Attention is all you need. *NeurIPS*, 30.",
        "mla": 'Vaswani, Ashish, et al. "Attention Is All You Need." *Advances in Neural Information Processing Systems* 30 (2017).',
        "ieee": "A. Vaswani et al., 'Attention is all you need,' in *Proc. NeurIPS*, 2017, vol. 30.",
        "bibtex": "@inproceedings{vaswani2017attention,\n  title={Attention is all you need},\n  author={Vaswani, Ashish and Shazeer, Noam and Parmar, Niki and Uszkoreit, Jakob and Jones, Llion and Gomez, Aidan N and Kaiser, Lukasz and Polosukhin, Illia},\n  booktitle={NeurIPS},\n  year={2017}\n}",
    },
    2: {
        "apa": "Devlin, J., Chang, M.-W., Lee, K., & Toutanova, K. (2019). BERT: Pre-training of deep bidirectional transformers for language understanding. *NAACL-HLT*, 4171–4186.",
        "mla": 'Devlin, Jacob, et al. "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding." *NAACL-HLT* (2019): 4171-4186.',
        "ieee": "J. Devlin, M.-W. Chang, K. Lee, and K. Toutanova, 'BERT: Pre-training of deep bidirectional transformers,' in *NAACL-HLT*, 2019, pp. 4171-4186.",
        "bibtex": "@inproceedings{devlin2019bert,\n  title={BERT: Pre-training of deep bidirectional transformers for language understanding},\n  author={Devlin, Jacob and Chang, Ming-Wei and Lee, Kenton and Toutanova, Kristina},\n  booktitle={NAACL-HLT},\n  year={2019}\n}",
    },
}


@router.post("/generate", response_model=APIResponse)
async def generate_citations(req: CitationRequest):
    """Generate formatted citations for given paper IDs."""
    citations = []
    for paper_id in req.paperIds:
        if paper_id in SAMPLE_CITATIONS:
            citation_text = SAMPLE_CITATIONS[paper_id].get(req.format, SAMPLE_CITATIONS[paper_id]["apa"])
            citations.append({"id": paper_id, "citation": citation_text, "format": req.format})
        else:
            citations.append({
                "id": paper_id,
                "citation": f"[{req.format.upper()} Citation placeholder for paper ID {paper_id}]",
                "format": req.format
            })
    return APIResponse(data={"citations": citations, "format": req.format, "count": len(citations)})


@router.get("/formats")
async def get_formats():
    return {"formats": ["apa", "mla", "ieee", "chicago", "bibtex", "ris"]}
