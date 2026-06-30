import { z } from "zod";

export const newProjectSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  sector: z.string().min(1),
  phase: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
});
