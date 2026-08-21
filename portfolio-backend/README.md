# Portfolio API Backend

FastAPI-based API service powering the portfolio frontend with:
- **Assistant (RAG)**: Cosine/L2 distance vector search via `sentence-transformers` and `FAISS` over raw Markdown/JSON biography, projects, and research content.
- **Contact Logs**: SQLite storage via `SQLModel` combined with SMTP mail forwarding.
- **Rate Limiting**: Public endpoint abuse prevention via `slowapi`.

---

## Technical Setup

### 1. Ingest/Build Vector Index
To compile raw text files from `app/data/raw/` into the FAISS vector database, run the ingestion compiler script:
```bash
python app/scripts/build_index.py
```
This builds and stores `index.faiss` and `metadata.json` inside `app/data/vector_store/`.

### 2. Run API Server Local Host
Launch the Uvicorn web server locally:
```bash
uvicorn app.main:app --reload --port 8000
```
- API Endpoint: `http://localhost:8000`
- Interactive Swagger docs: `http://localhost:8000/docs`

### 3. Run Verification Tests
Verify endpoint validations and SQLite transactions:
```bash
pytest
```
