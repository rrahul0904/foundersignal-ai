# Architecture

## Goals
FounderSignal must be easy to demo locally while retaining boundaries that can scale to a production data platform.

## Logical architecture

\`\`\`text
Browser
  |
Next.js Web
  |-- Search API -------- Search service / Typesense
  |-- Reveal API ------- Entitlement service ---- PostgreSQL ledger
  |-- Export API ------- Queue/worker ------------ Object storage
  |-- AI intent API ---- LLM adapter ------------- deterministic query plan
  |
PostgreSQL
  |-- organizations/users
  |-- people/companies
  |-- contact_points
  |-- verification_events
  |-- subscriptions
  |-- reveal_events
  |-- export_jobs
  |-- ingestion_runs
  |
Workers
  |-- ingestion
  |-- normalization
  |-- entity resolution
  |-- deduplication
  |-- verification
  |-- confidence scoring
  \`-- search publication
\`\`\`

## Runtime modes

### Demo mode
Uses synthetic in-memory data. No external account or paid provider is required.

### Production mode
Uses PostgreSQL for canonical records, Redis for queue/cache concerns and Typesense for discovery. Provider interfaces isolate enrichment, verification, billing, AI and object storage.

## Security boundary
Search results never contain protected email/phone values. A dedicated reveal action performs authorization, entitlement checking and atomic usage accounting before protected values are returned.

## Scale path
- PostgreSQL remains the system of record.
- Search is moved to Typesense/OpenSearch.
- Large exports become asynchronous jobs.
- Workers become independently scalable consumers.
- Verification history is append-only.
- Search index documents carry only the metadata needed for discovery.
