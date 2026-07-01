import { TRPCError } from "@trpc/server";
import { tool } from "ai";

import { ACTIVITY_ENTITY_TYPES } from "@/lib/activity";
import { newProjectSchema } from "@/lib/projects";

import { trpcToolContextSchema } from "./context";

export const createProjectTool = tool({
  description:
    "Create a new portfolio project. Requires the user to be signed in.",
  inputSchema: newProjectSchema,
  contextSchema: trpcToolContextSchema,
  execute: async (input, { context }) => {
    try {
      const project = await context.caller.projects.create(input);

      try {
        await context.caller.activity.log({
          project_id: project.slug,
          entity_type: ACTIVITY_ENTITY_TYPES.Project,
          entity_id: project.slug,
          event: { type: "project.created", name: project.name },
          via_agent: true,
        });
      } catch (error) {
        console.error("Failed to record activity log", error);
      }

      return {
        success: true as const,
        project: {
          slug: project.slug,
          name: project.name,
          location: project.location,
          sector: project.sector,
          phase: project.phase,
          deadline: project.deadline,
          summary: project.summary,
        },
      };
    } catch (error) {
      if (error instanceof TRPCError && error.code === "UNAUTHORIZED") {
        return {
          success: false as const,
          error: "You must be signed in to create a project.",
        };
      }

      if (error instanceof TRPCError) {
        return {
          success: false as const,
          error: error.message,
        };
      }

      throw error;
    }
  },
});
