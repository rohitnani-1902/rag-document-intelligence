# Sift AI — RAG Document Intelligence

An evidence-first, browser-based document retrieval prototype. Upload supported text files, ask a question, and inspect the ranked passages used to construct every answer.

![Sift AI preview](https://github.com/rohitnani-1902/rag-document-intelligence/raw/main/public/og.png)

## What it does

- Reads `.txt`, `.md`, `.csv`, and `.json` files directly in the browser
- Splits imported text into retrieval-ready passages
- Ranks relevant passages with client-side keyword matching
- Produces an extractive answer with a visible evidence trail
- Keeps documents local to the browser session

## Why this project

This is a transparent RAG prototype focused on the retrieval layer. Instead of hiding the reasoning behind a black-box response, it shows the source passages and match scores that support each answer.

## Run it

No build step is required for the GitHub version:

1. Clone or download this repository.
2. Open `index.html` in a modern browser.
3. Use the included demo knowledge base or upload your own text documents.

## Production extension path

The prototype can be extended with:

- Embedding models and vector databases such as Pinecone or pgvector
- A LangChain retrieval pipeline
- LLM-based grounded answer generation
- Authentication, document permissions, and audit logs
- Retrieval-quality evaluation and user feedback loops

## Stack

`HTML` · `CSS` · `JavaScript` · `Client-side retrieval` · `RAG architecture`

---

Built by [Chitirala Rohit](https://github.com/rohitnani-1902) as an AI engineering portfolio project.
