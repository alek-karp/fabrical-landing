import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "cascade-data-hall",
    name: "Cascade Data Hall",
    location: "Hillsboro, OR",
    sector: "Hyperscale data center",
    phase: "Electrical rough-in",
    deadline: "2026-08-15",
    summary:
      "A fast-track data hall build coordinating feeders, switchgear, grounding, and commissioning readiness across office, shop, and field teams.",
    description:
      "Fabrical keeps the electrical plan live as submittals, RFIs, coordination drawings, procurement windows, and crew sequencing change. The team can see which work is ready, which packages are blocked, and where material risk threatens install week.",
    image: "/hero-datacenter.webp",
    stats: [
      { label: "Readiness", value: "91%" },
      { label: "Activities", value: "482" },
      { label: "Risks cleared", value: "14" },
    ],
    milestones: [
      {
        label: "Switchgear submittal closeout",
        status: "In review",
        date: "Week 06",
      },
      { label: "Level 04 feeder release", status: "Ready", date: "Week 07" },
      { label: "MCC room prefab package", status: "Blocked", date: "Week 08" },
    ],
    risks: [
      { label: "Long-lead breaker release", severity: "High" },
      { label: "BIM sleeve conflict", severity: "Medium" },
      { label: "Night shift access window", severity: "Low" },
    ],
    workPackages: [
      {
        name: "Level 04 feeder rough-in",
        owner: "Foreman review",
        state: "Ready",
      },
      {
        name: "MCC room prefab release",
        owner: "Shop coordination",
        state: "Blocked",
      },
      {
        name: "Panel schedule reconciliation",
        owner: "PM approval",
        state: "Due today",
      },
    ],
    documents: [
      {
        name: "switchgear-submittal-package.pdf",
      },
      {
        name: "level-04-feeder-install-drawings.dwg",
      },
      {
        name: "mcc-room-prefab-release-notes.pdf",
      },
      {
        name: "commissioning-readiness-checklist.xlsx",
      },
    ],
  },
  {
    slug: "mesa-battery-plant",
    name: "Mesa Battery Plant",
    location: "Mesa, AZ",
    sector: "Advanced manufacturing",
    phase: "Prefab release",
    deadline: "2026-07-30",
    summary:
      "A manufacturing expansion using prefab electrical rooms and sequenced material releases to keep installation aligned with process equipment turnover.",
    description:
      "Project teams use Fabrical to connect procurement signals with installation constraints, turning changing vendor dates and equipment layouts into actionable work packages for the shop and field.",
    image: "/hero-home.webp",
    stats: [
      { label: "Readiness", value: "84%" },
      { label: "Activities", value: "317" },
      { label: "Risks cleared", value: "9" },
    ],
    milestones: [
      {
        label: "Electrical room prefab release",
        status: "Ready",
        date: "Week 03",
      },
      {
        label: "Process tool utility routing",
        status: "In review",
        date: "Week 04",
      },
      {
        label: "Panelboard procurement check",
        status: "At risk",
        date: "Week 05",
      },
    ],
    risks: [
      { label: "Vendor drawing latency", severity: "High" },
      { label: "Tray support revision", severity: "Medium" },
      { label: "Crew split across zones", severity: "Medium" },
    ],
    workPackages: [
      { name: "Prefab electrical room A", owner: "Shop lead", state: "Ready" },
      {
        name: "Tool hookup conduit racks",
        owner: "Coordination",
        state: "In review",
      },
      {
        name: "Panelboard release batch",
        owner: "Procurement",
        state: "At risk",
      },
    ],
    documents: [
      {
        name: "prefab-electrical-room-a-release.pdf",
      },
      {
        name: "process-tool-utility-routing-markups.pdf",
      },
      {
        name: "panelboard-release-batch.xlsx",
      },
    ],
  },
  {
    slug: "harbor-grid-upgrade",
    name: "Harbor Grid Upgrade",
    location: "Long Beach, CA",
    sector: "Infrastructure",
    phase: "Commissioning prep",
    deadline: "2026-09-01",
    summary:
      "A port electrification project tracking cutover windows, procurement exposure, and commissioning dependencies across energized work zones.",
    description:
      "Fabrical gives the delivery team a current view of outage readiness, crew constraints, and testing dependencies so each cutover window has verified scope, labor, and material coverage.",
    image: "/hero-datacenter.webp",
    stats: [
      { label: "Readiness", value: "88%" },
      { label: "Activities", value: "226" },
      { label: "Risks cleared", value: "11" },
    ],
    milestones: [
      { label: "Cutover window validation", status: "Ready", date: "Week 02" },
      {
        label: "Medium-voltage test plan",
        status: "In review",
        date: "Week 03",
      },
      { label: "Commissioning turnover", status: "Queued", date: "Week 05" },
    ],
    risks: [
      { label: "Outage approval dependency", severity: "High" },
      { label: "Temporary power routing", severity: "Medium" },
      { label: "Testing vendor availability", severity: "Low" },
    ],
    workPackages: [
      {
        name: "Shore power feeder cutover",
        owner: "General foreman",
        state: "Ready",
      },
      {
        name: "MV testing sequence",
        owner: "Commissioning",
        state: "In review",
      },
      { name: "Temporary power removal", owner: "Field ops", state: "Queued" },
    ],
    documents: [
      {
        name: "cutover-window-validation-packet.pdf",
      },
      {
        name: "medium-voltage-test-plan.pdf",
      },
      {
        name: "temporary-power-removal-plan.pdf",
      },
    ],
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
