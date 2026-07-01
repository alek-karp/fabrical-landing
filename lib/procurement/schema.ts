import { z } from "zod";

import { procurementStatusSchema } from "./statuses";

export const newProcurementRequestSchema = z.object({
  project_id: z.string().min(1),
  item: z.string().min(1),
  quantity: z.string().min(1),
  needed_by: z.iso.date().nullable().optional(),
  supplier: z.string().optional(),
  notes: z.string().optional(),
});

export const updateProcurementStatusSchema = z.object({
  id: z.string().min(1),
  status: procurementStatusSchema,
});

export const getProcurementRequestSchema = z.object({
  id: z.string().min(1),
});

export const listProcurementRequestsSchema = z.object({
  project_id: z.string().optional(),
});

export const addProcurementNoteSchema = z.object({
  request_id: z.string().min(1),
  note: z.string().min(1),
});

export const listProcurementNotesSchema = z.object({
  request_id: z.string().min(1),
});
