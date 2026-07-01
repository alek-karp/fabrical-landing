create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  project_id text not null,
  entity_type text not null,
  entity_id text not null,
  event jsonb not null,
  description text,
  actor_id uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create index activity_logs_project_id_created_at_idx
  on public.activity_logs (project_id, created_at desc);

alter table public.activity_logs enable row level security;

drop policy if exists "Activity logs are readable by authenticated users" on public.activity_logs;
drop policy if exists "Activity logs can be created by authenticated users" on public.activity_logs;

create policy "Activity logs are readable by authenticated users"
on public.activity_logs
for select
to authenticated
using (true);

create policy "Activity logs can be created by authenticated users"
on public.activity_logs
for insert
to authenticated
with check (auth.uid() = actor_id);
