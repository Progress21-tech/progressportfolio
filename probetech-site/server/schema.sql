-- Run this in your Supabase project: SQL Editor → New query → paste → Run

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  project_type text,
  message text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security: lock the table down.
-- The backend uses the SERVICE ROLE key, which bypasses RLS, so inserts work
-- from the server while the table stays private to the public/anon key.
alter table contact_submissions enable row level security;

-- (No public policies added = no anon access. Only your server can read/write.)
