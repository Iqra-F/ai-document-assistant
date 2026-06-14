# AI Document Assistant (RAG System)

A production-style AI-powered document assistant built with **NestJS, PostgreSQL, Prisma, pgvector, and local LLMs (Ollama)**.  
The system implements a full **Retrieval-Augmented Generation (RAG)** pipeline for querying PDF documents using semantic search and AI-generated responses.

---

## 🚀 Features

- 📄 PDF upload and processing
- ✂️ Text extraction and chunking
- 🧠 Embedding generation using Ollama (local AI)
- 🗄️ Vector-based semantic search (pgvector)
- 🤖 Context-aware AI responses (Mistral / Llama models)
- 💬 Chat API with retrieval-augmented generation
- ⚡ Rate limiting for API protection
- 🔐 Security middleware (Helmet, Compression)
- 🧾 Global validation and error handling
- 🧱 Modular NestJS architecture

---

## 🧠 AI Architecture (RAG Pipeline)


PDF Upload
↓
Text Extraction (pdf-parse)
↓
Chunking (500–1000 chars)
↓
Embedding Generation (Ollama)
↓
Store in PostgreSQL (pgvector)
↓
User Question
↓
Query Embedding
↓
Vector Similarity Search
↓
Top Matching Chunks
↓
LLM (Mistral / Llama)
↓
Final Answer


---

## 🏗️ Tech Stack

### Backend
- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- pgvector
- Ollama (local LLMs)
- pdf-parse
- class-validator / class-transformer

### Infrastructure
- Helmet (security headers)
- Compression (gzip responses)
- Rate Limiting (@nestjs/throttler)

---

## 📁 Project Structure


src/
├── common/
│ ├── filters/
│ ├── utils/
├── config/
├── modules/
│ ├── document/
│ ├── chat/
│ ├── embedding/
│ ├── retrieval/
│ ├── llm/
├── prisma/
├── main.ts


---

## ⚙️ Setup Instructions

### 1. Install dependencies

```bash
npm install
2. Setup PostgreSQL

Create database:

CREATE DATABASE ragdb;

Enable vector extension:

CREATE EXTENSION vector;
3. Setup environment
DATABASE_URL="postgresql://user:password@localhost:5432/ragdb"
4. Run Prisma
npx prisma generate
npx prisma db push
5. Start server
npm run start:dev

## 📡 API Endpoints

Upload Document
POST /documents/upload

Uploads a PDF and processes it into chunks + embeddings.

Ask Question (RAG)
POST /chat/ask

Request:

{
  "question": "What does the document say about databases?"
}

Response:

{
  "answer": "...",
  "matches": [...]
}

## 🔐 Security Features
Helmet (HTTP security headers)
Compression (performance optimization)
Rate limiting (anti-abuse protection)
DTO validation (input safety)
File validation (PDF-only uploads)

## ⚡ Performance Optimizations
pgvector indexing for fast similarity search
Chunk-based embedding storage
Selective database queries
Local LLM inference (Ollama)
Response compression

## 🧠 Key AI Concepts Implemented
Embeddings
Semantic search
Vector databases
Retrieval-Augmented Generation (RAG)
Prompt engineering
Context injection into LLMs
Local LLM inference (Ollama)
