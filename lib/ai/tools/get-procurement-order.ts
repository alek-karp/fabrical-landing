import { TRPCError } from "@trpc/server";
import { tool } from "ai";

import { getProcurementRequestSchema } from "@/lib/procurement";

import { trpcToolContextSchema } from "./context";

export const getProcurementOrderTool = tool({
  description:
    "Get one procurement material order by request id, including its supplier communication log. Use this to answer questions about a specific order after finding its id with listProcurementOrders if needed.",
  inputSchema: getProcurementRequestSchema,
  contextSchema: trpcToolContextSchema,
  execute: async (input, { context }) => {
    try {
      const order = await context.caller.procurement.byId(input);

      if (!order) {
        return {
          found: false as const,
          order: null,
          notes: [],
          error: "Procurement order not found.",
        };
      }

      const notes = await context.caller.procurement.listNotes({
        request_id: order.id,
      });

      return {
        found: true as const,
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
        notes: notes.map((note) => ({
          id: note.id,
          note: note.note,
          created_at: note.created_at,
        })),
      };
    } catch (error) {
      if (error instanceof TRPCError) {
        return {
          found: false as const,
          order: null,
          notes: [],
          error: error.message,
        };
      }

      throw error;
    }
  },
});
