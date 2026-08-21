from fastapi import APIRouter

router = APIRouter()

@router.get("", response_model=dict)
def health_check():
    return {
        "status": "ok",
        "service": "portfolio-backend",
        "version": "1.0.0"
    }
