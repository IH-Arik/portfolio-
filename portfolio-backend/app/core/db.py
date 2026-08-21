from sqlmodel import SQLModel, create_engine, Session
from app.core.config import settings

# SQLite connection configuration (connect_args required for SQLite multi-thread)
engine = create_engine(
    settings.DATABASE_URL, 
    connect_args={"check_same_thread": False}
)

def init_db():
    SQLModel.metadata.create_all(engine)

def get_db():
    with Session(engine) as session:
        yield session
