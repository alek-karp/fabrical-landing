create table if not exists public.workspace (
  id text primary key default 'default',
  name text not null default 'Fabrical',
  updated_at timestamptz not null default now()
);

alter table public.workspace enable row level security;

drop policy if exists "Workspace is readable by authenticated users" on public.workspace;
drop policy if exists "Authenticated users can update the workspace" on public.workspace;

create policy "Workspace is readable by authenticated users"
on public.workspace
for select
to authenticated
using (true);

create policy "Authenticated users can update the workspace"
on public.workspace
for update
to authenticated
using (true)
with check (true);

insert into public.workspace (id, name)
values ('default', 'Fabrical')
on conflict (id) do nothing;
