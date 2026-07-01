import { z } from "zod";

export const PROJECT_PHASES = [
  "Planning",
  "Design",
  "Prefab release",
  "Electrical rough-in",
  "Installation",
  "Commissioning prep",
  "Commissioning",
  "Closeout",
] as const;

export type ProjectPhase = (typeof PROJECT_PHASES)[number];

export const projectPhaseSchema = z.enum(PROJECT_PHASES);

export const DEFAULT_PROJECT_PHASE: ProjectPhase = "Planning";

export const isProjectPhase = (value: string): value is ProjectPhase =>
  PROJECT_PHASES.includes(value as ProjectPhase);

export const resolveProjectPhase = (value?: string): ProjectPhase =>
  value && isProjectPhase(value) ? value : DEFAULT_PROJECT_PHASE;

const COMPLETED_PROJECT_PHASE: ProjectPhase =
  PROJECT_PHASES[PROJECT_PHASES.length - 1];

export const isProjectComplete = (phase: string) =>
  phase === COMPLETED_PROJECT_PHASE;
