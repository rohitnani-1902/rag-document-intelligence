# Sift AI — Document Intelligence

An evidence-first browser retrieval prototype. Ask questions over the sample knowledge base or your own text files, then inspect the ranked passages and their sources.

## Run the demo

Open `index.html` in a modern browser. No installation, API key, backend or language model is required. Try “response latency”, “source citations”, or “tenant encrypted retention”. An unmatched question shows a no-evidence response.

Choose or drop `.txt`, `.md`, `.csv` or `.json` files. Files stay in browser memory and disappear on reload. Reset documents restores the five built-in sources.

## Architecture

Local text → overlapping word-boundary passages → Unicode normalization and tokenization → BM25 lexical ranking → top three evidence passages → extractive answer from the top two.

BM25 uses term frequency, inverse document frequency and passage-length normalization (k1=1.2, b=0.75). A small English stopword list removes common question words. Stable ties preserve input order. Query-term coverage is the fraction of distinct non-stopword query terms in the best passage; it is not confidence or a probability. BM25 scores compare passages within a query, not across different queries.

## Document handling

- Extension allowlist and 1.5 MB per-file limit; empty and control-character content is rejected.
- Approximately 600-character passages with 12-word overlap; a long word can exceed that target.
- At most 80 passages per file, 200 per session and 10 files per import. Truncation, rejection and read failures are reported.
- Duplicate filenames receive distinct internal source identifiers.
- Imported names and passages are rendered with DOM textContent, never interpreted as HTML.
- Imports run sequentially; reset and file selection are disabled while reading.

CSV and JSON are searched as plain text. The extension checks do not constitute a full file-format validator.

## Repeatable checks

With Node.js installed, run:

```sh
node tests/retrieval.test.cjs
```

The test extracts the actual ranking and chunking code from index.html. Ten labeled queries over the five built-in sources achieve **10/10 top-1 matches**. Additional checks cover unmatched and stopword-only queries, rare-term discrimination, Unicode, stable ties, file size/type limits, chunk truncation and text-only rendering.

This small authored fixture set is a regression check, not a general accuracy benchmark or a measured improvement over another retriever. Browser upload behavior is checked separately before deployment.

## Limits and next steps

Lexical retrieval cannot resolve synonyms or infer semantic similarity. Answers are excerpts, not generated reasoning. English stopwords do not provide multilingual semantic understanding. There is no PDF parser, persistence, tenant isolation or production authorization layer.

Next: evaluate a larger independently labeled corpus, then consider embeddings and grounded generation with document permissions.
