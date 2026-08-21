import os
import json
import faiss
import numpy as np
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

class RAGService:
    def __init__(self):
        self.model = None
        self.index = None
        self.metadata = []
        self.store_dir = "app/data/vector_store"
        self.is_ready = False

    def initialize(self):
        try:
            print("Loading sentence-transformers model (all-MiniLM-L6-v2)...")
            from sentence_transformers import SentenceTransformer
            self.model = SentenceTransformer("all-MiniLM-L6-v2")

            index_path = os.path.join(self.store_dir, "index.faiss")
            metadata_path = os.path.join(self.store_dir, "metadata.json")

            if os.path.exists(index_path) and os.path.exists(metadata_path):
                print("Loading FAISS vector store index...")
                self.index = faiss.read_index(index_path)
                with open(metadata_path, "r", encoding="utf-8") as f:
                    self.metadata = json.load(f)
                self.is_ready = True
                print("RAGService successfully initialized.")
            else:
                logger.warning(
                    "FAISS index files not found in app/data/vector_store/. "
                    "Please run 'python app/scripts/build_index.py' to compile index."
                )
        except Exception as e:
            logger.error(f"Failed to initialize RAG service: {e}")

    def query(self, question: str) -> dict:
        if not self.is_ready or not self.model or not self.index:
            return {
                "answer": (
                    "CORE_RAG_NOTICE: RAG indexing database is not compiled.\n\n"
                    "Please execute the build index script ('python app/scripts/build_index.py') "
                    "on the backend host to compile the knowledge base vector store."
                ),
                "sources": []
            }

        # Embed incoming question
        question_emb = self.model.encode([question])
        question_emb = np.array(question_emb).astype("float32")

        # Search top-1 nearest neighbor
        distances, indices = self.index.search(question_emb, k=1)
        
        best_idx = indices[0][0]

        # FAISS returns -1 if no matches or invalid index
        if best_idx == -1 or best_idx >= len(self.metadata):
            return {
                "answer": "I could not retrieve relevant matches from Arik's portfolio index.",
                "sources": []
            }

        matched_chunk = self.metadata[best_idx]
        answer = matched_chunk["text"]
        source = matched_chunk["source"]

        # Future placeholder LLM generation path stub
        if settings.USE_LLM_GENERATION:
            answer = f"[LLM_SYNTHESIZED_STUB] (Source context: {source})\n\n{answer}"

        return {
            "answer": answer,
            "sources": [source]
        }

rag_service = RAGService()
