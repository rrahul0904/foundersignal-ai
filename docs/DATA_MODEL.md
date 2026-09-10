# Data Model

## Core entities

### organizations
Tenant boundary and billing owner.

### users
Authenticated members belonging to organizations.

### companies
Canonical company record including normalized name, domain, industry, geography, employee range, technology signals and confidence.

### people
Canonical person identity with company relationship, normalized title, department, seniority, geography and identity confidence.

### contact_points
Protected emails/phones linked to a person. Each value carries type, source, confidence and current status.

### verification_events
Append-only history for verification attempts. Do not overwrite historical evidence.

### subscriptions
Plan and entitlement state for an organization.

### reveal_events
Immutable accounting record for protected-data reveals.

### export_jobs
Filter snapshot, status, row count and output location for generated exports.

### ingestion_runs
Operational ledger for source ingestion, records observed/written and errors.

## Data quality fields
Every production record should be able to expose:
- source/provider
- observed_at
- verified_at where relevant
- confidence
- provenance reference
- last_refresh_at
