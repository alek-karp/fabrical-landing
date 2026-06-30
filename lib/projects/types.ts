import type { z } from "zod";

import type { newProjectSchema } from "./schema";

export type Project = {
  slug: string;
  name: string;
  location: string;
  sector: string;
  phase: string;
  summary: string;
  description: string;
  image: string;
  stats: {
    label: string;
    value: string;
  }[];
  milestones: {
    label: string;
    status: string;
    date: string;
  }[];
  risks: {
    label: string;
    severity: string;
  }[];
  workPackages: {
    name: string;
    owner: string;
    state: string;
  }[];
};

export type StoredProjectRow = {
  slug: string;
  name: string;
  location: string;
  sector: string;
  phase: string;
  summary: string;
  description: string;
};

export type NewProject = z.infer<typeof newProjectSchema>;
