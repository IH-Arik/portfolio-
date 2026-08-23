from sqlmodel import SQLModel, Field
from datetime import datetime, timezone
from typing import Optional

class Contact(SQLModel, table=True):
    __tablename__ = "contacts"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    subject: str = ""
    message: str
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
