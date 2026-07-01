import {
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
      limit: input.limit,
    }),
  ),

  log: protectedProcedure
    .input(logActivitySchema)
    .mutation(({ ctx, input }) =>
      logActivity(ctx.supabase, ctx.user.id, input),
    ),
});
