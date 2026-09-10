create extension if not exists pgcrypto;

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  email text not null unique,
  name text,
  role text not null default 'member',
  created_at timestamptz not null default now()
);

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  normalized_name text not null,
  domain text,
  website text,
  industry text,
  subindustry text,
  country text,
  city text,
  employee_range text,
  revenue_range text,
  technologies jsonb not null default '[]'::jsonb,
  source_count integer not null default 0,
  confidence numeric(5,4),
  observed_at timestamptz,
  last_refresh_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists companies_domain_unique
  on companies(lower(domain)) where domain is not null;

create table if not exists people (
  id uuid primary key default gen_random_uuid(),
  first_name text,
  last_name text,
  full_name text not null,
  normalized_title text,
  job_title text,
  seniority text,
  department text,
  company_id uuid references companies(id),
  country text,
  region text,
  city text,
  linkedin_url text,
  confidence numeric(5,4),
  source_count integer not null default 0,
  observed_at timestamptz,
  last_refresh_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists contact_points (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id) on delete cascade,
  type text not null,
  value text not null,
  status text not null default 'unknown',
  source_key text,
  confidence numeric(5,4),
  observed_at timestamptz,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists contact_points_person_type_value_unique
  on contact_points(person_id, type, value);

create table if not exists verification_events (
  id uuid primary key default gen_random_uuid(),
  contact_point_id uuid not null references contact_points(id) on delete cascade,
  provider text not null,
  status text not null,
  confidence numeric(5,4),
  response_code text,
  verified_at timestamptz not null default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  provider text,
  provider_customer_id text,
  provider_subscription_id text,
  plan_key text not null,
  status text not null,
  reveal_allowance integer not null default 0,
  billing_period_start timestamptz,
  billing_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists reveal_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  user_id uuid references users(id),
  person_id uuid not null references people(id),
  subscription_id uuid references subscriptions(id),
  billing_period_key text not null,
  revealed_at timestamptz not null default now(),
  unique (organization_id, person_id, billing_period_key)
);

create table if not exists export_jobs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  user_id uuid references users(id),
  status text not null default 'queued',
  filter_snapshot jsonb not null default '{}'::jsonb,
  object_key text,
  row_count integer,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists ingestion_runs (
  id uuid primary key default gen_random_uuid(),
  source_key text not null,
  status text not null default 'running',
  records_seen bigint not null default 0,
  records_written bigint not null default 0,
  error_count bigint not null default 0,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);
