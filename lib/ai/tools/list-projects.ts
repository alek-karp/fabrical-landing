import { TRPCError } from "@trpc/server";
import { tool } from "ai";
import { z } from "zod";

import { trpcToolContextSchema } from "./context";

export const listProjectsTool = tool({
  description:
    "List all portfolio projects with name, location, sector, phase, and summary.",
  inputSchema: z.object({}),
  contextSchema: trpcToolContextSchema,
  execute: async (_input, { context }) => {
    try {
      const projects = await context.caller.projects.list();

      return {
        count: projects.length,
        projects: projects.map((project) => ({
          slug: project.slug,
          name: project.name,
          location: project.location,
          sector: project.sector,
          phase: project.phase,
          summary: project.summary,
        })),
      };
    } catch (error) {
      if (error instanceof TRPCError) {
        return {
          count: 0,
          projects: [],
          error: error.message,
        };
      }

      throw error;
    }
  },
});
