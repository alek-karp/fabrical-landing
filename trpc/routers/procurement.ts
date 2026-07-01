import {
  addProcurementNote,
  addProcurementNoteSchema,
  createProcurementRequest,
  listProcurementNotes,
  listProcurementNotesSchema,
  listProcurementRequests,
  listProcurementRequestsSchema,
  newProcurementRequestSchema,
  updateProcurementRequestStatus,
  updateProcurementStatusSchema,
} from "@/lib/procurement";
import { createTRPCRouter, protectedProcedure } from "../init";

export const procurementRouter = createTRPCRouter({
  list: protectedProcedure
    .input(listProcurementRequestsSchema)
    .query(({ ctx, input }) =>
      listProcurementRequests(ctx.supabase, input.project_id),
    ),
  create: protectedProcedure
    .input(newProcurementRequestSchema)
    .mutation(({ ctx, input }) =>
      createProcurementRequest(ctx.supabase, ctx.user.id, input),
    ),
  updateStatus: protectedProcedure
    .input(updateProcurementStatusSchema)
    .mutation(({ ctx, input }) =>
      updateProcurementRequestStatus(ctx.supabase, input),
    ),
  listNotes: protectedProcedure
    .input(listProcurementNotesSchema)
    .query(({ ctx, input }) =>
      listProcurementNotes(ctx.supabase, input.request_id),
    ),
  addNote: protectedProcedure
    .input(addProcurementNoteSchema)
    .mutation(({ ctx, input }) =>
      addProcurementNote(ctx.supabase, ctx.user.id, input),
    ),
});
