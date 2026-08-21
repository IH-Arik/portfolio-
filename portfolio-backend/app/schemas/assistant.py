from pydantic import BaseModel, Field
from typing import List

class AssistantQuery(BaseModel):
    question: str = Field(..., min_length=1, max_length=500)

class AssistantResponse(BaseModel):
    answer: str
    sources: List[str]
