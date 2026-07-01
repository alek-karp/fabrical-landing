insert into public.projects (
  slug,
  name,
  location,
  sector,
  phase,
  deadline,
  summary,
  description
)
values
  (
    'cascade-data-hall',
    'Cascade Data Hall',
    'Hillsboro, OR',
    'Hyperscale data center',
    'Electrical rough-in',
    '2026-08-15',
    'A fast-track data hall build coordinating feeders, switchgear, grounding, and commissioning readiness across office, shop, and field teams.',
    'Fabrical keeps the electrical plan live as submittals, RFIs, coordination drawings, procurement windows, and crew sequencing change. The team can see which work is ready, which packages are blocked, and where material risk threatens install week.'
  ),
  (
    'mesa-battery-plant',
    'Mesa Battery Plant',
    'Mesa, AZ',
    'Advanced manufacturing',
    'Prefab release',
    '2026-07-30',
    'A manufacturing expansion using prefab electrical rooms and sequenced material releases to keep installation aligned with process equipment turnover.',
    'Project teams use Fabrical to connect procurement signals with installation constraints, turning changing vendor dates and equipment layouts into actionable work packages for the shop and field.'
  ),
  (
    'harbor-grid-upgrade',
    'Harbor Grid Upgrade',
    'Long Beach, CA',
    'Infrastructure',
    'Commissioning prep',
    '2026-09-01',
    'A port electrification project tracking cutover windows, procurement exposure, and commissioning dependencies across energized work zones.',
    'Fabrical gives the delivery team a current view of outage readiness, crew constraints, and testing dependencies so each cutover window has verified scope, labor, and material coverage.'
  )
on conflict (slug) do update
set
  name = excluded.name,
  location = excluded.location,
  sector = excluded.sector,
  phase = excluded.phase,
  deadline = excluded.deadline,
  summary = excluded.summary,
  description = excluded.description;

do $$
declare
  actor uuid := (select id from auth.users limit 1);
begin
  if actor is null then
    return;
  end if;

  insert into public.activity_logs (project_id, entity_type, entity_id, event, description, actor_id, created_at) values
    (
      'cascade-data-hall', 'project', 'cascade-data-hall',
      '{"type":"project.created","name":"Cascade Data Hall"}',
      'Project created',
      actor,
      now() - interval '14 days'
    ),
    (
      'cascade-data-hall', 'project', 'cascade-data-hall',
      '{"type":"project.phase_changed","from":"Permitting","to":"Electrical rough-in"}',
      'Phase advanced after permit approval',
      actor,
      now() - interval '7 days'
    ),
    (
      'cascade-data-hall', 'procurement', 'a1b2c3d4-0001-0001-0001-000000000001',
      '{"type":"procurement.blocked","reason":"Switchgear lead time extended by vendor"}',
      null,
      actor,
      now() - interval '3 days'
    ),
    (
      'cascade-data-hall', 'transaction', 'b1b2c3d4-0001-0001-0001-000000000002',
      '{"type":"transaction.flagged","amount":142500,"reason":"Amount exceeds approved PO by 18%"}',
      null,
      actor,
      now() - interval '1 day'
    ),
    (
      'mesa-battery-plant', 'project', 'mesa-battery-plant',
      '{"type":"project.created","name":"Mesa Battery Plant"}',
      'Project created',
      actor,
      now() - interval '21 days'
    ),
    (
      'mesa-battery-plant', 'project', 'mesa-battery-plant',
      '{"type":"project.deadline_changed","from":"2026-06-30","to":"2026-07-30"}',
      'Deadline pushed after equipment delivery slip',
      actor,
      now() - interval '10 days'
    ),
    (
      'mesa-battery-plant', 'procurement', 'a1b2c3d4-0002-0002-0002-000000000001',
      '{"type":"procurement.blocked","reason":"Custom bus duct fabrication behind schedule"}',
      null,
      actor,
      now() - interval '5 days'
    ),
    (
      'mesa-battery-plant', 'procurement', 'a1b2c3d4-0002-0002-0002-000000000002',
      '{"type":"procurement.unblocked"}',
      'Fabricator confirmed revised ship date',
      actor,
      now() - interval '2 days'
    ),
    (
      'harbor-grid-upgrade', 'project', 'harbor-grid-upgrade',
      '{"type":"project.created","name":"Harbor Grid Upgrade"}',
      'Project created',
      actor,
      now() - interval '30 days'
    ),
    (
      'harbor-grid-upgrade', 'project', 'harbor-grid-upgrade',
      '{"type":"project.phase_changed","from":"Design","to":"Commissioning prep"}',
      'Entered commissioning prep after design freeze',
      actor,
      now() - interval '8 days'
    ),
    (
      'harbor-grid-upgrade', 'transaction', 'b1b2c3d4-0003-0003-0003-000000000001',
      '{"type":"transaction.flagged","amount":87000,"reason":"Vendor invoice received before PO issuance"}',
      null,
      actor,
      now() - interval '4 days'
    );
end $$;
