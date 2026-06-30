create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  location text not null,
  sector text not null,
  phase text not null default 'Planning',
  summary text not null,
  description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;

create trigger projects_set_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();

alter table public.projects enable row level security;

drop policy if exists "Projects are readable" on public.projects;
drop policy if exists "Projects can be created" on public.projects;

create policy "Projects are readable"
on public.projects
for select
to anon, authenticated
using (true);

create policy "Projects can be created"
on public.projects
for insert
to anon, authenticated
with check (true);
