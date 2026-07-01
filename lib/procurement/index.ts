import type { SupabaseClient } from "@supabase/supabase-js";
import { differenceInCalendarDays } from "date-fns";

import type {
  AddProcurementNote,
  NewProcurementRequest,
  ProcurementAlert,
  ProcurementCommunicationLog,
  ProcurementRequest,
  UpdateProcurementStatus,
} from "./types";

export {
  addProcurementNoteSchema,
  listProcurementNotesSchema,
  listProcurementRequestsSchema,
  newProcurementRequestSchema,
  updateProcurementStatusSchema,
} from "./schema";
export type { ProcurementStatus } from "./statuses";
export {
  DEFAULT_PROCUREMENT_STATUS,
  isProcurementStatus,
  PROCUREMENT_STATUS_LABELS,
  PROCUREMENT_STATUS_ORDER,
  PROCUREMENT_STATUS_VALUES,
  PROCUREMENT_STATUSES,
  procurementStatusSchema,
  resolveProcurementStatus,
} from "./statuses";
export * from "./types";

const STALE_AFTER_DAYS = 3;

export const formatProcurementNeededBy = (
  neededBy: string | null,
): string | null => {
  if (!neededBy) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${neededBy}T00:00:00`));
};

export const listProcurementRequests = async (
  supabase: SupabaseClient,
  projectId?: string,
): Promise<ProcurementRequest[]> => {
  let query = supabase
    .from("procurement_requests")
    .select("*")
    .order("needed_by", { ascending: true, nullsFirst: false });

  if (projectId) {
    query = query.eq("project_id", projectId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data as ProcurementRequest[];
};

export const getProcurementRequest = async (
  supabase: SupabaseClient,
  id: string,
): Promise<ProcurementRequest | null> => {
  const { data, error } = await supabase
    .from("procurement_requests")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as ProcurementRequest | null;
};

export const createProcurementRequest = async (
  supabase: SupabaseClient,
  createdBy: string,
  input: NewProcurementRequest,
): Promise<ProcurementRequest> => {
  const { data, error } = await supabase
    .from("procurement_requests")
    .insert({
      project_id: input.project_id,
      item: input.item,
      quantity: input.quantity,
      needed_by: input.needed_by ?? null,
      supplier: input.supplier || null,
      notes: input.notes || null,
      created_by: createdBy,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as ProcurementRequest;
};

export const updateProcurementRequestStatus = async (
  supabase: SupabaseClient,
  input: UpdateProcurementStatus,
): Promise<ProcurementRequest> => {
  const { data, error } = await supabase
    .from("procurement_requests")
    .update({ status: input.status })
    .eq("id", input.id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as ProcurementRequest;
};

export const listProcurementNotes = async (
  supabase: SupabaseClient,
  requestId: string,
): Promise<ProcurementCommunicationLog[]> => {
  const { data, error } = await supabase
    .from("procurement_communication_logs")
    .select("*")
    .eq("request_id", requestId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as ProcurementCommunicationLog[];
};

export const addProcurementNote = async (
  supabase: SupabaseClient,
  createdBy: string,
  input: AddProcurementNote,
): Promise<ProcurementCommunicationLog> => {
  const { data, error } = await supabase
    .from("procurement_communication_logs")
    .insert({
      request_id: input.request_id,
      note: input.note,
      created_by: createdBy,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as ProcurementCommunicationLog;
};

export const computeProcurementAlerts = (
  requests: ProcurementRequest[],
  now: Date = new Date(),
): ProcurementAlert[] => {
  const alerts: ProcurementAlert[] = [];

  for (const request of requests) {
    if (request.status === "delivered") {
      continue;
    }

    if (request.status === "backordered") {
      alerts.push({
        request,
        severity: "critical",
        message: "Marked missing/backordered",
      });
    }

    if (request.needed_by) {
      const neededBy = new Date(`${request.needed_by}T00:00:00`);
      const daysUntilNeeded = differenceInCalendarDays(neededBy, now);

      if (daysUntilNeeded < 0) {
        alerts.push({
          request,
          severity: "critical",
          message: "Needed date has passed and it's still not delivered",
        });
      } else if (daysUntilNeeded === 0) {
        alerts.push({
          request,
          severity: "critical",
          message: "Needed today and not yet delivered",
        });
      } else if (
        daysUntilNeeded === 1 &&
        (request.status === "requested" || request.status === "quoted")
      ) {
        alerts.push({
          request,
          severity: "warning",
          message: "Needed tomorrow and still not ordered",
        });
      }
    }

    const daysSinceUpdate = differenceInCalendarDays(
      now,
      new Date(request.updated_at),
    );

    if (daysSinceUpdate >= STALE_AFTER_DAYS) {
      alerts.push({
        request,
        severity: "warning",
        message: `No status update in ${daysSinceUpdate} days`,
      });
    }
  }

  return alerts;
};
