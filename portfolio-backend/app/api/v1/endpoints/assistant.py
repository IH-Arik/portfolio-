from fastapi import APIRouter, Request
from app.core.security import limiter
from app.schemas.assistant import AssistantQuery, AssistantResponse
from app.services.rag_service import rag_service

router = APIRouter()

@router.post("/query", response_model=AssistantResponse)
@limiter.limit("10/minute")
def query_assistant(request: Request, query: AssistantQuery):
    result = rag_service.query(query.question)
    return AssistantResponse(
        answer=result["answer"],
        sources=result["sources"]
    )
