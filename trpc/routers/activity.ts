import {
  ACTIVITY_ACTOR_TYPES,
  getActivityLogs,
  listActivitySchema,
  logActivity,
  logActivitySchema,
} from "@/lib/activity";
import { createTRPCRouter, protectedProcedure } from "../init";

export const activityRouter = createTRPCRouter({
  list: protectedProcedure.input(listActivitySchema).query(({ ctx, input }) =>
    getActivityLogs(ctx.supabase, {
      project_id: input.project_id,
      entity_type: input.entity_type,
      entity_id: input.entity_id,
      from: input.from,
      to: input.to,
      limit: input.limit,
    }),
  ),

  log: protectedProcedure
    .input(logActivitySchema)
    .mutation(({ ctx, input }) => {
      const { via_agent, ...event } = input;

      if (via_agent) {
        return logActivity(
          ctx.supabase,
          { type: ACTIVITY_ACTOR_TYPES.Agent },
          [{ type: ACTIVITY_ACTOR_TYPES.User, id: ctx.user.id }],
          event,
        );
      }

      return logActivity(
        ctx.supabase,
        { type: ACTIVITY_ACTOR_TYPES.User, id: ctx.user.id },
        [],
        event,
      );
    }),
});
