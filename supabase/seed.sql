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
