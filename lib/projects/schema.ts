import { z } from "zod";

import { projectPhaseSchema } from "./phases";

export const newProjectSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  sector: z.string().min(1),
  phase: projectPhaseSchema,
  deadline: z.iso.date().nullable().optional(),
  summary: z.string().min(1),
  description: z.string().min(1),
});

export const updateProjectSchema = newProjectSchema.extend({
  slug: z.string().min(1),
});
