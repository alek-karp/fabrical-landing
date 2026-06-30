import { z } from "zod";

import {
  createStoredProject,
  getPortfolioProject,
  getPortfolioProjects,
  newProjectSchema,
  updateProjectSchema,
  updateStoredProject,
} from "@/lib/projects";
import { createTRPCRouter, protectedProcedure } from "../init";

export const projectsRouter = createTRPCRouter({
  list: protectedProcedure.query(({ ctx }) =>
    getPortfolioProjects(ctx.supabase),
  ),
  bySlug: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => getPortfolioProject(ctx.supabase, input.slug)),
  create: protectedProcedure
    .input(newProjectSchema)
    .mutation(({ ctx, input }) => createStoredProject(ctx.supabase, input)),
  update: protectedProcedure
    .input(updateProjectSchema)
    .mutation(({ ctx, input }) => updateStoredProject(ctx.supabase, input)),
});
