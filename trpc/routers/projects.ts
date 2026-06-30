import { z } from "zod";

import {
  createStoredProject,
  getPortfolioProject,
  getPortfolioProjects,
  newProjectSchema,
} from "@/lib/projects";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../init";

export const projectsRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) => getPortfolioProjects(ctx.supabase)),
  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => getPortfolioProject(ctx.supabase, input.slug)),
  create: protectedProcedure
    .input(newProjectSchema)
    .mutation(({ ctx, input }) => createStoredProject(ctx.supabase, input)),
});
