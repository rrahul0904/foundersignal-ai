# FounderSignal AI

FounderSignal is a clean-room, production-shaped GTM intelligence platform inspired by publicly observable lead-discovery workflows. It is **not a copy of proprietary source code or datasets**.

## What is included

- B2B people/company search with free-text and structured filters
- Protected contact reveal flow with quota accounting
- CSV export flow
- Demo dataset so the product runs without paid data providers
- Production data model for people, companies, contact points, verifications, entitlements, reveals and exports
- Ingestion / normalization / verification worker scaffold
- Docker Compose for PostgreSQL, Redis and Typesense
- CI and tests
- Product, architecture, data-model, compliance and roadmap documentation

## Quick start

```bash
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:3000`.

The web app starts in demo mode and does not require a database or enrichment vendor.

## Production infrastructure

```bash
docker compose up -d
```

This starts PostgreSQL, Redis and Typesense. Apply `infra/migrations/001_initial.sql` to PostgreSQL before wiring the production repository adapter.

## Core product flow

`search -> preview -> reveal -> quota ledger -> export`

Search responses intentionally omit protected contact values. Email and phone data are returned only from the reveal endpoint after the entitlement check.

## Repository layout

```text
apps/web       Next.js UI + route handlers
apps/worker    ingestion / verification worker
packages/core  domain types, search, quota logic, demo data
infra          local infrastructure and SQL migrations
docs           product and technical specifications
```

## Current phase

This repository is an end-to-end **Phase 0/1 implementation baseline**: the product is runnable with realistic demo data and production boundaries are defined. The next production wave is to connect licensed data providers, persistent repository adapters, billing webhooks and authenticated organizations.

See `docs/IMPLEMENTATION_ROADMAP.md`.
