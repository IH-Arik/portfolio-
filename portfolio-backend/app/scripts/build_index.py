import os
import json
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

def build_vector_store():
    raw_dir = "app/data/raw"
    store_dir = "app/data/vector_store"
    os.makedirs(store_dir, exist_ok=True)

    print("Loading sentence-transformers model (all-MiniLM-L6-v2)...")
    model = SentenceTransformer("all-MiniLM-L6-v2")

    chunks = []

    # 1. Load Biography
    bio_path = os.path.join(raw_dir, "bio.md")
    if os.path.exists(bio_path):
        with open(bio_path, "r", encoding="utf-8") as f:
            content = f.read()
            paragraphs = [p.strip() for p in content.split("\n\n") if p.strip()]
            for p in paragraphs:
                chunks.append({
                    "text": p,
                    "source": "Biography"
                })

    # 2. Load Projects
    projects_path = os.path.join(raw_dir, "projects.json")
    if os.path.exists(projects_path):
        with open(projects_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            for proj in data:
                text = (
                    f"Project: {proj['title']}\n"
                    f"Description: {proj['description']}\n"
                    f"Role: {proj['role']}\n"
                    f"Problem (Before): {proj['before']}\n"
                    f"Solution (After): {proj['after']}\n"
                    f"Tags: {', '.join(proj['tags'])}"
                )
                chunks.append({
                    "text": text,
                    "source": f"Project: {proj['title']}"
                })

    # 3. Load Research Publications
    research_path = os.path.join(raw_dir, "research.json")
    if os.path.exists(research_path):
        with open(research_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            for res in data:
                text = (
                    f"Research Publication: {res['title']}\n"
                    f"Authors: {', '.join(res['authors'])}\n"
                    f"Venue: {res['venue']} ({res['date']})\n"
                    f"Abstract: {res['abstract']}\n"
                    f"Key Findings: {'; '.join(res['keyFindings'])}"
                )
                chunks.append({
                    "text": text,
                    "source": f"Research: {res['title']}"
                })

    if not chunks:
        print("Error: No content chunks generated. Aborting index compilation.")
        return

    print(f"Embedding {len(chunks)} text chunks...")
    texts = [c["text"] for c in chunks]
    embeddings = model.encode(texts, show_progress_bar=True)
    embeddings = np.array(embeddings).astype("float32")

    dimension = embeddings.shape[1]
    print(f"Building FAISS IndexFlatL2 (dimension={dimension})...")
    index = faiss.IndexFlatL2(dimension)
    index.add(embeddings)

    # Save index and metadata
    index_path = os.path.join(store_dir, "index.faiss")
    faiss.write_index(index, index_path)
    
    metadata_path = os.path.join(store_dir, "metadata.json")
    with open(metadata_path, "w", encoding="utf-8") as f:
        json.dump(chunks, f, indent=2)

    print(f"FAISS vector store successfully saved to {store_dir}")

if __name__ == "__main__":
    # Ensure working directory is the backend root
    if os.path.basename(os.getcwd()) == "scripts":
        os.chdir("../..")
    build_vector_store()
