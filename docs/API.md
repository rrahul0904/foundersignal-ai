# API Draft

## GET /api/health
Returns service health and current runtime mode.

## GET /api/search
Query parameters:
- q
- country
- industry
- seniority
- verifiedOnly

Returns prospect metadata only. Protected email/phone fields are intentionally absent.

## POST /api/reveal/:id
Checks authorization and entitlement, then returns protected contact fields. Repeated reveals follow configured no-double-charge semantics.

## POST /api/exports
Accepts a list/filter snapshot and produces CSV output. Baseline mode returns generated CSV directly; production mode should queue a durable export job.

## Future APIs
- POST /api/ai/query-plan
- POST /api/icp
- GET /api/companies
- GET /api/signals
- POST /api/lists
- POST /api/billing/webhook
- POST /api/privacy/remove
