from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Union
import json

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    PROJECT_NAME: str = "Portfolio Backend"
    API_V1_STR: str = "/api/v1"

    # CORS Allow Origins: JSON list or comma-separated string
    ALLOWED_ORIGINS: Union[List[str], str] = ["http://localhost:3000"]

    # Database settings
    DATABASE_URL: str = "sqlite:///app/data/contact.db"

    # SMTP settings
    SMTP_HOST: str = ""
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_FROM_EMAIL: str = ""

    # RAG assistant settings
    USE_LLM_GENERATION: bool = False
    LLM_API_KEY: str = ""

    @property
    def cors_origins(self) -> List[str]:
        if isinstance(self.ALLOWED_ORIGINS, str):
            try:
                return json.loads(self.ALLOWED_ORIGINS)
            except json.JSONDecodeError:
                return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]
        return self.ALLOWED_ORIGINS

settings = Settings()
