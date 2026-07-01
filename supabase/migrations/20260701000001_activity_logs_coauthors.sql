alter table public.activity_logs alter column actor_id drop not null;
alter table public.activity_logs add column if not exists actor_type text not null default 'user';
alter table public.activity_logs add column if not exists coauthors jsonb not null default '[]'::jsonb;

alter table public.activity_logs drop constraint if exists activity_logs_actor_type_check;
alter table public.activity_logs add constraint activity_logs_actor_type_check
  check (actor_type in ('user', 'agent'));

alter table public.activity_logs drop constraint if exists activity_logs_actor_id_check;
alter table public.activity_logs add constraint activity_logs_actor_id_check
  check (
    (actor_type = 'user' and actor_id is not null)
    or (actor_type = 'agent' and actor_id is null)
  );

drop policy if exists "Activity logs can be created by authenticated users" on public.activity_logs;

create policy "Activity logs can be created by authenticated users"
on public.activity_logs
for insert
to authenticated
with check (
  (actor_type = 'user' and auth.uid() = actor_id)
  or (
    actor_type = 'agent'
    and coauthors @> jsonb_build_array(jsonb_build_object('type', 'user', 'id', auth.uid()::text))
  )
);
