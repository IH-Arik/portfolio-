from fastapi import APIRouter
from app.api.v1.endpoints import assistant, contact, health

api_router = APIRouter()

api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(contact.router, prefix="/contact", tags=["contact"])
api_router.include_router(assistant.router, prefix="/assistant", tags=["assistant"])
