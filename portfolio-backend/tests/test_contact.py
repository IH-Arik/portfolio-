import pytest
from fastapi.testclient import TestClient
from sqlmodel import SQLModel, Session, create_engine, select
from sqlalchemy.pool import StaticPool
from app.main import app
from app.core.db import get_db
from app.models.contact import Contact

# Isolated in-memory SQLite configuration with StaticPool to share connection
test_engine = create_engine(
    "sqlite://",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)

@pytest.fixture(name="session")
def session_fixture():
    SQLModel.metadata.create_all(test_engine)
    with Session(test_engine) as session:
        yield session
    SQLModel.metadata.drop_all(test_engine)

@pytest.fixture(name="client")
def client_fixture(session: Session):
    def get_db_override():
        yield session
    app.dependency_overrides[get_db] = get_db_override
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()

def test_health_check(client: TestClient):
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_submit_contact_success(client: TestClient, session: Session):
    payload = {
        "name": "Test User",
        "email": "test@user.com",
        "message": "Hello, this is a valid test submission."
    }
    response = client.post("/api/v1/contact/submit", json=payload)
    assert response.status_code == 200
    assert response.json()["success"] is True

    # Assert record is written to SQLite
    statement = select(Contact).where(Contact.email == "test@user.com")
    contact = session.exec(statement).first()
    assert contact is not None
    assert contact.name == "Test User"
    assert contact.message == "Hello, this is a valid test submission."

def test_submit_contact_validation_failure(client: TestClient, session: Session):
    # Empty message fields check
    payload = {
        "name": "Test User",
        "email": "test@user.com",
        "message": ""
    }
    response = client.post("/api/v1/contact/submit", json=payload)
    assert response.status_code == 422

    # Verify no records are written
    statement = select(Contact)
    records = session.exec(statement).all()
    assert len(records) == 0

def test_submit_contact_invalid_email(client: TestClient, session: Session):
    # Missing domain @ separator email format check
    payload = {
        "name": "Test User",
        "email": "invalid-email-format.com",
        "message": "Hello, this email should fail validation checks."
    }
    response = client.post("/api/v1/contact/submit", json=payload)
    assert response.status_code == 422

    # Verify no records are written
    statement = select(Contact)
    records = session.exec(statement).all()
    assert len(records) == 0

def test_submit_contact_honeypot_trap(client: TestClient, session: Session):
    # Spam bots populating honeypot checks
    payload = {
        "name": "Spam Bot",
        "email": "spam@bot.com",
        "message": "Buy something!",
        "_honeypot": "I am a bot"
    }
    response = client.post("/api/v1/contact/submit", json=payload)
    assert response.status_code == 200
    assert response.json()["success"] is True

    # Verify record was NOT written to database
    statement = select(Contact)
    records = session.exec(statement).all()
    assert len(records) == 0
