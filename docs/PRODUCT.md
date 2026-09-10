# Product Specification

## Product
FounderSignal AI is a clean-room GTM intelligence platform that turns an ICP or market thesis into searchable companies, decision-makers, verified contact points, buying signals, and exportable prospect lists.

## Primary users
- SaaS founders validating markets
- Growth and GTM teams
- Sales teams that need focused prospect discovery
- Agencies sourcing high-fit leads

## Core user journey
1. Define an ICP manually or with AI.
2. Search people and companies using structured filters or natural language.
3. Preview non-sensitive prospect metadata without consuming credits.
4. Reveal protected contact data only after an entitlement check.
5. Save/export lists.
6. Add signals such as hiring, funding, technology, product launches, and leadership changes.
7. Rank prospects using ICP fit + evidence + signal freshness.
8. Generate personalized outreach using grounded prospect evidence.

## Product principles
- Search is free; protected data is gated.
- Re-revealing the same contact does not charge twice within the configured entitlement policy.
- Data provenance and freshness are first-class fields.
- AI may translate intent, classify and summarize, but deterministic systems execute filters, billing and permissions.
- The demo works without paid providers; production providers are swappable adapters.
- No proprietary KaiZap code or datasets are copied.

## Initial scope
The first baseline contains a working prospect-search UI, masked search results, reveal endpoint, quota logic, export route, demo records, ingestion worker scaffold, production schema, Docker infrastructure and CI.

## North-star expansion
Market research -> ICP -> companies -> people -> signals -> evidence -> scoring -> outreach -> validation.
