import { TRPCError } from "@trpc/server";
import { tool } from "ai";

import { listProcurementRequestsSchema } from "@/lib/procurement";

import { trpcToolContextSchema } from "./context";

export const listProcurementOrdersTool = tool({
  description:
    "List all procurement material orders. Optionally filter by project_id, which is the project slug. Use this before answering broad questions about orders, requested materials, suppliers, statuses, needed dates, or delayed procurement.",
  inputSchema: listProcurementRequestsSchema,
  contextSchema: trpcToolContextSchema,
  execute: async (input, { context }) => {
    try {
      const orders = await context.caller.procurement.list(input);

      return {
        count: orders.length,
        orders: orders.map((order) => ({
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
        })),
      };
    } catch (error) {
      if (error instanceof TRPCError) {
        return { count: 0, orders: [], error: error.message };
      }

      throw error;
    }
  },
});
