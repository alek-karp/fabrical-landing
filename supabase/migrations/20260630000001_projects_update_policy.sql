drop policy if exists "Projects can be updated" on public.projects;

create policy "Projects can be updated"
on public.projects
for update
to anon, authenticated
using (true)
with check (true);
