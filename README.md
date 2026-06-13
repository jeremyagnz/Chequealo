# Chequealo AI

**Chequealo AI** is an open-source SaaS platform for verifying news, claims, and rumors using multiple AI providers and real-time evidence.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Backend API | Next.js API Routes |
| Database | PostgreSQL + Drizzle ORM |
| Cache / Queue | Redis + BullMQ |
| AI Providers | OpenAI, Anthropic, Gemini, Groq |
| Search | Serper, Brave Search, Tavily |
| Auth | Auth.js (NextAuth v5) |
| Monorepo | Turborepo + npm workspaces |
| Deployment | Docker (Vercel + Railway/Fly.io) |

---

## Folder Structure

```
chequealo-ai/
├── apps/
│   ├── web/                     # Next.js 14 frontend
│   └── worker/                  # BullMQ background worker
├── packages/
│   ├── ai-providers/            # OpenAI, Anthropic, Gemini, Groq adapters
│   ├── search-engine/           # Serper, Brave, Tavily adapters
│   ├── credibility-engine/      # Scoring: source, consensus, recency
│   ├── database/                # Drizzle ORM schema + client
│   ├── white-label/             # Theme & config resolver
│   └── shared-types/            # Shared TypeScript types/DTOs
├── infra/
│   ├── docker/                  # Dockerfiles (web, worker)
│   └── docker-compose.yml
├── turbo.json
├── package-lock.json
└── .env.example
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- npm ≥ 10
- Docker & Docker Compose (for local Postgres + Redis)

### 1. Clone and install

```bash
git clone https://github.com/jeremyagnz/Chequealo.git
cd Chequealo
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Fill in your API keys (OpenAI, Serper, etc.) and DB/Redis URLs
```

### 3. Start infrastructure

```bash
docker compose -f infra/docker-compose.yml up postgres redis -d
```

### 4. Run database migrations

```bash
npm exec --workspace @chequealo/database drizzle-kit push
```

### 5. Start development

```bash
# From the root — starts web + worker in parallel
npm run dev
```

The web app runs on **http://localhost:3000**.

---

## Architecture

### Data Flow

```
User submits claim
        │
        ▼
POST /api/verify        → enqueues BullMQ job, returns jobId
        │
        ▼
Worker: VerificationProcessor
   1. Search Engine  → real-time evidence (3–5 sources)
   2. AI Provider    → analyze claim + evidence
   3. Credibility Engine → score (0–100) + verdict
   4. Persist to PostgreSQL
        │
        ▼
GET /api/verify/:jobId  → poll for result
```

### Clean Architecture (per feature)

```
features/verification/
├── domain/           # Pure business entities & value objects
├── application/      # Use cases + port interfaces
├── infrastructure/   # DB repositories, queue adapters
└── presentation/     # React components, API handlers
```

---

## Multi-Tenant Support

- Every DB table has a `tenant_id` column (PostgreSQL RLS-ready)
- Subdomain routing: `acme.chequealo.ai` → tenant resolved via middleware
- Per-tenant AI/search provider config and credibility thresholds
- White-label themes via CSS variables injected at root layout

---

## Contributing

1. Create a branch from `main`
2. Make small, focused changes
3. Open a Pull Request with a clear description
