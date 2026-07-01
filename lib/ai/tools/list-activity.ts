import { TRPCError } from "@trpc/server";
import { tool } from "ai";

import { listActivitySchema } from "@/lib/activity";
import { trpcToolContextSchema } from "./context";

export const listActivityTool = tool({
  description:
    "List business activity logs for a project. Shows what changed, when, who changed it, and any added context. Supports date filtering via 'from' and 'to' ISO timestamps. Use to answer questions like 'what happened today', 'summarize last week', 'why was procurement blocked', or 'what phase changes occurred this month'.",
  inputSchema: listActivitySchema,
  contextSchema: trpcToolContextSchema,
  execute: async (input, { context }) => {
    try {
      const logs = await context.caller.activity.list(input);

      return {
        count: logs.length,
        logs: logs.map((log) => ({
          id: log.id,
          entity_type: log.entity_type,
          entity_id: log.entity_id,
          event: log.event,
          description: log.description,
          actor_id: log.actor_id,
          created_at: log.created_at,
        })),
      };
    } catch (error) {
      if (error instanceof TRPCError) {
        return { count: 0, logs: [], error: error.message };
      }

      throw error;
    }
  },
});
