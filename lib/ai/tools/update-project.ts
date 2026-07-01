import { TRPCError } from "@trpc/server";
import { tool } from "ai";

import { ACTIVITY_ENTITY_TYPES } from "@/lib/activity";
import { updateProjectSchema } from "@/lib/projects";

import { trpcToolContextSchema } from "./context";

export const updateProjectTool = tool({
  description:
    "Update an existing portfolio project identified by slug. Requires the user to be signed in. Use listProjects first to find the slug if you don't already have it.",
  inputSchema: updateProjectSchema,
  contextSchema: trpcToolContextSchema,
  execute: async (input, { context }) => {
    try {
      const previousProject = await context.caller.projects.bySlug({
        slug: input.slug,
      });

      const project = await context.caller.projects.update(input);

      await Promise.all([
        previousProject && previousProject.phase !== project.phase
          ? context.caller.activity
              .log({
                project_id: project.slug,
                entity_type: ACTIVITY_ENTITY_TYPES.Project,
                entity_id: project.slug,
                event: {
                  type: "project.phase_changed",
                  from: previousProject.phase,
                  to: project.phase,
                },
                via_agent: true,
              })
              .catch((error) => {
                console.error("Failed to record activity log", error);
              })
          : null,
        previousProject && previousProject.deadline !== project.deadline
          ? context.caller.activity
              .log({
                project_id: project.slug,
                entity_type: ACTIVITY_ENTITY_TYPES.Project,
                entity_id: project.slug,
                event: {
                  type: "project.deadline_changed",
                  from: previousProject.deadline,
                  to: project.deadline,
                },
                via_agent: true,
              })
              .catch((error) => {
                console.error("Failed to record activity log", error);
              })
          : null,
      ]);

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
          error: "You must be signed in to update a project.",
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
