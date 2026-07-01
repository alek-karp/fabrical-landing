create table if not exists public.procurement_requests (
  id uuid primary key default gen_random_uuid(),
  project_id text not null,
  item text not null,
  quantity text not null,
  needed_by date,
  supplier text,
  status text not null default 'requested',
  notes text,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.procurement_requests drop constraint if exists procurement_requests_status_check;
alter table public.procurement_requests add constraint procurement_requests_status_check
  check (status in ('requested', 'quoted', 'ordered', 'shipped', 'delivered', 'backordered'));

create index if not exists procurement_requests_project_id_idx
  on public.procurement_requests (project_id);

drop trigger if exists procurement_requests_set_updated_at on public.procurement_requests;

create trigger procurement_requests_set_updated_at
before update on public.procurement_requests
for each row
execute function public.set_updated_at();

alter table public.procurement_requests enable row level security;

drop policy if exists "Procurement requests are readable by authenticated users" on public.procurement_requests;
drop policy if exists "Procurement requests can be created by authenticated users" on public.procurement_requests;
drop policy if exists "Procurement requests can be updated by authenticated users" on public.procurement_requests;

create policy "Procurement requests are readable by authenticated users"
on public.procurement_requests
for select
to authenticated
using (true);

create policy "Procurement requests can be created by authenticated users"
on public.procurement_requests
for insert
to authenticated
with check (auth.uid() = created_by);

create policy "Procurement requests can be updated by authenticated users"
on public.procurement_requests
for update
to authenticated
using (true)
with check (true);

create table if not exists public.procurement_communication_logs (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.procurement_requests(id) on delete cascade,
  note text not null,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create index if not exists procurement_communication_logs_request_id_created_at_idx
  on public.procurement_communication_logs (request_id, created_at desc);

alter table public.procurement_communication_logs enable row level security;

drop policy if exists "Procurement notes are readable by authenticated users" on public.procurement_communication_logs;
drop policy if exists "Procurement notes can be created by authenticated users" on public.procurement_communication_logs;

create policy "Procurement notes are readable by authenticated users"
on public.procurement_communication_logs
for select
to authenticated
using (true);

create policy "Procurement notes can be created by authenticated users"
on public.procurement_communication_logs
for insert
to authenticated
with check (auth.uid() = created_by);
