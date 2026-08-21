import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.rag_service import rag_service

@pytest.fixture(name="client")
def client_fixture():
    return TestClient(app)

def test_query_assistant_not_compiled(client: TestClient):
    # Temporarily set RAGService to uncompiled state
    original_ready = rag_service.is_ready
    rag_service.is_ready = False
    
    payload = {"question": "What is his strongest project?"}
    response = client.post("/api/v1/assistant/query", json=payload)
    
    # Restore state
    rag_service.is_ready = original_ready

    assert response.status_code == 200
    assert "CORE_RAG_NOTICE" in response.json()["answer"]
    assert response.json()["sources"] == []

def test_query_assistant_success(client: TestClient):
    # Mock RAGService query method
    original_query = rag_service.query
    
    def mock_query(question):
        return {
            "answer": "Mocked RAG response about projects",
            "sources": ["Mocked Project Context"]
        }
    
    rag_service.query = mock_query
    
    payload = {"question": "What is his strongest project?"}
    response = client.post("/api/v1/assistant/query", json=payload)
    
    # Restore original query
    rag_service.query = original_query

    assert response.status_code == 200
    assert response.json()["answer"] == "Mocked RAG response about projects"
    assert response.json()["sources"] == ["Mocked Project Context"]

def test_query_assistant_empty_payload(client: TestClient):
    # Empty query string check
    payload = {"question": ""}
    response = client.post("/api/v1/assistant/query", json=payload)
    assert response.status_code == 422
