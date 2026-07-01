import {
  getWorkspace,
  updateWorkspaceName,
  updateWorkspaceNameSchema,
} from "@/lib/workspace";
import { createTRPCRouter, protectedProcedure } from "../init";

export const workspaceRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) => getWorkspace(ctx.supabase)),
  updateName: protectedProcedure
    .input(updateWorkspaceNameSchema)
    .mutation(({ ctx, input }) =>
      updateWorkspaceName(ctx.supabase, input.name),
    ),
});
