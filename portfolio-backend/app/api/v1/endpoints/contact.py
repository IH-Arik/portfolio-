from fastapi import APIRouter, Depends, Request
from sqlmodel import Session
from app.core.security import limiter
from app.core.db import get_db
from app.schemas.contact import ContactSubmission, ContactResponse
from app.models.contact import Contact
from app.services.email_service import send_contact_email

router = APIRouter()

@router.post("/submit", response_model=ContactResponse)
@limiter.limit("3/minute")
def submit_contact(
    request: Request,
    submission: ContactSubmission,
    db: Session = Depends(get_db)
):
    # Spam prevention: honeypot check
    # Silently ignore spam by returning a fake success code to trick bot agents
    if submission.honeypot:
        return ContactResponse(
            success=True,
            message="Transmission received."
        )

    # Store in SQLite
    db_contact = Contact(
        name=submission.name,
        email=submission.email,
        subject=submission.subject,
        message=submission.message
    )
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)

    # Forward email notification
    send_contact_email(
        name=submission.name,
        sender_email=submission.email,
        subject=submission.subject,
        message=submission.message
    )

    return ContactResponse(
        success=True,
        message="Transmission completed successfully."
    )
