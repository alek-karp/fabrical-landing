import type { z } from "zod";

import type {
  addProcurementNoteSchema,
  newProcurementRequestSchema,
  updateProcurementStatusSchema,
} from "./schema";
import type { ProcurementStatus } from "./statuses";

export type ProcurementRequest = {
  id: string;
  project_id: string;
  item: string;
  quantity: string;
  needed_by: string | null;
  supplier: string | null;
  status: ProcurementStatus;
  notes: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type ProcurementCommunicationLog = {
  id: string;
  request_id: string;
  note: string;
  created_by: string;
  created_at: string;
};

export type NewProcurementRequest = z.infer<typeof newProcurementRequestSchema>;

export type UpdateProcurementStatus = z.infer<
  typeof updateProcurementStatusSchema
>;

export type AddProcurementNote = z.infer<typeof addProcurementNoteSchema>;

export type ProcurementAlertSeverity = "critical" | "warning";

export type ProcurementAlert = {
  request: ProcurementRequest;
  severity: ProcurementAlertSeverity;
  message: string;
};
