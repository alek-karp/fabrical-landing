import type { SupabaseClient } from "@supabase/supabase-js";
import slugify from "slugify";

import { getProject, projects } from "./data";
import type {
  NewProject,
  Project,
  StoredProjectRow,
  UpdateProject,
} from "./types";

export { getProject, projects } from "./data";
export type { ProjectPhase } from "./phases";
export {
  DEFAULT_PROJECT_PHASE,
  isProjectComplete,
  isProjectPhase,
  PROJECT_PHASES,
  projectPhaseSchema,
  resolveProjectPhase,
} from "./phases";
export { newProjectSchema, updateProjectSchema } from "./schema";
export * from "./types";

const fallbackStats = [
  { label: "Readiness", value: "0%" },
  { label: "Activities", value: "0" },
  { label: "Risks cleared", value: "0" },
];

const fallbackMilestones = [
  { label: "Project kickoff", status: "Queued", date: "TBD" },
  { label: "Scope validation", status: "Queued", date: "TBD" },
  { label: "Field release plan", status: "Queued", date: "TBD" },
];

const fallbackRisks = [
  { label: "Initial risk review", severity: "Pending" },
  { label: "Procurement exposure", severity: "Pending" },
  { label: "Crew availability", severity: "Pending" },
];

const fallbackWorkPackages = [
  { name: "Project setup", owner: "PM review", state: "Queued" },
  { name: "Scope import", owner: "Coordination", state: "Queued" },
  { name: "Baseline schedule", owner: "Planning", state: "Queued" },
];

export const formatProjectDeadline = (deadline: string | null | undefined) => {
  if (!deadline) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${deadline}T00:00:00`));
};

const toProject = (row: StoredProjectRow): Project => ({
  slug: row.slug,
  name: row.name,
  location: row.location,
  sector: row.sector,
  phase: row.phase,
  deadline: row.deadline,
  summary: row.summary,
  description: row.description,
  image: "/hero-datacenter.webp",
  stats: fallbackStats,
  milestones: fallbackMilestones,
  risks: fallbackRisks,
  workPackages: fallbackWorkPackages,
});

export const getStoredProjects = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase
    .from("projects")
    .select("slug,name,location,sector,phase,deadline,summary,description")
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data.map((row) => toProject(row));
};

export const getPortfolioProjects = async (supabase: SupabaseClient) => {
  const storedProjects = await getStoredProjects(supabase);
  const storedSlugs = new Set(storedProjects.map((project) => project.slug));

  return [
    ...storedProjects,
    ...projects.filter((project) => !storedSlugs.has(project.slug)),
  ];
};

export const getPortfolioProject = async (
  supabase: SupabaseClient,
  slug: string,
) => {
  const { data, error } = await supabase
    .from("projects")
    .select("slug,name,location,sector,phase,deadline,summary,description")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    return getProject(slug);
  }

  return toProject(data);
};

export const createStoredProject = async (
  supabase: SupabaseClient,
  project: NewProject,
) => {
  const baseSlug = slugify(project.name, {
    lower: true,
    strict: true,
    trim: true,
  });
  const slug = `${baseSlug}-${crypto.randomUUID().slice(0, 8)}`;

  const { data, error } = await supabase
    .from("projects")
    .insert({
      slug,
      name: project.name,
      location: project.location,
      sector: project.sector,
      phase: project.phase,
      deadline: project.deadline ?? null,
      summary: project.summary,
      description: project.description,
    })
    .select("slug,name,location,sector,phase,deadline,summary,description")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return toProject(data);
};

export const updateStoredProject = async (
  supabase: SupabaseClient,
  project: UpdateProject,
) => {
  const { data, error } = await supabase
    .from("projects")
    .upsert(
      {
        slug: project.slug,
        name: project.name,
        location: project.location,
        sector: project.sector,
        phase: project.phase,
        deadline: project.deadline ?? null,
        summary: project.summary,
        description: project.description,
      },
      { onConflict: "slug" },
    )
    .select("slug,name,location,sector,phase,deadline,summary,description")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return toProject(data);
};
