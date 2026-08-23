from pydantic import BaseModel, Field, field_validator
import re
from typing import Optional

class ContactSubmission(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., min_length=3, max_length=255)
    subject: str = Field(default="", max_length=200)
    message: str = Field(..., min_length=1, max_length=5000)
    
    # Honeypot field for spam prevention
    honeypot: Optional[str] = Field(None, alias="_honeypot")

    @field_validator("email")
    @classmethod
    def validate_email_format(cls, value: str) -> str:
        email_regex = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
        if not re.match(email_regex, value):
            raise ValueError("Invalid email format")
        return value

class ContactResponse(BaseModel):
    success: bool
    message: str
