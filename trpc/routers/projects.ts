import { z } from "zod";

import {
  createStoredProject,
  getPortfolioProject,
  getPortfolioProjects,
} from "@/lib/project-store";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../init";

const newProjectInput = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  sector: z.string().min(1),
  phase: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
});

export const projectsRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) => getPortfolioProjects(ctx.supabase)),
  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => getPortfolioProject(ctx.supabase, input.slug)),
  create: protectedProcedure
    .input(newProjectInput)
    .mutation(({ ctx, input }) => createStoredProject(ctx.supabase, input)),
});
