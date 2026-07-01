import { TRPCError } from "@trpc/server";
import { tool } from "ai";

import { ACTIVITY_ENTITY_TYPES } from "@/lib/activity";
import { newProcurementRequestSchema } from "@/lib/procurement";

import { trpcToolContextSchema } from "./context";

export const createProcurementOrderTool = tool({
  description:
    "Create a procurement material order. Requires project_id as the project slug, item, and quantity. Optional fields are needed_by as YYYY-MM-DD, supplier, and notes.",
  inputSchema: newProcurementRequestSchema,
  contextSchema: trpcToolContextSchema,
  execute: async (input, { context }) => {
    try {
      const order = await context.caller.procurement.create(input);

      try {
        await context.caller.activity.log({
          project_id: order.project_id,
          entity_type: ACTIVITY_ENTITY_TYPES.Procurement,
          entity_id: order.id,
          event: { type: "procurement.requested", item: order.item },
          via_agent: true,
        });
      } catch (error) {
        console.error("Failed to record activity log", error);
      }

      return {
        success: true as const,
        order: {
          id: order.id,
          project_id: order.project_id,
          item: order.item,
          quantity: order.quantity,
          needed_by: order.needed_by,
          supplier: order.supplier,
          status: order.status,
          notes: order.notes,
          created_at: order.created_at,
          updated_at: order.updated_at,
        },
      };
    } catch (error) {
      if (error instanceof TRPCError && error.code === "UNAUTHORIZED") {
        return {
          success: false as const,
          error: "You must be signed in to create a procurement order.",
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
