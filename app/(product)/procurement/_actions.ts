"use server";

import { revalidatePath } from "next/cache";

import { ACTIVITY_ENTITY_TYPES } from "@/lib/activity";
import {
  PROCUREMENT_STATUS_LABELS,
  type ProcurementRequest,
  resolveProcurementStatus,
} from "@/lib/procurement";
import { routes } from "@/lib/routes";
import { caller } from "@/trpc/server";

const logActivitySafely = async (
  input: Parameters<typeof caller.activity.log>[0],
) => {
  try {
    await caller.activity.log(input);
  } catch (error) {
    console.error("Failed to record activity log", error);
  }
};

export type ProcurementActionState = {
  message: string;
};

const getValue = (formData: FormData, key: string) => {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

export const createProcurementRequestAction = async (
  _state: ProcurementActionState,
  formData: FormData,
): Promise<ProcurementActionState> => {
  const values = {
    project_id: getValue(formData, "project_id"),
    item: getValue(formData, "item"),
    quantity: getValue(formData, "quantity"),
    needed_by: getValue(formData, "needed_by") || null,
    supplier: getValue(formData, "supplier"),
    notes: getValue(formData, "notes"),
  };

  if (!values.project_id || !values.item || !values.quantity) {
    return { message: "Job, item, and quantity are required." };
  }

  let request: ProcurementRequest;

  try {
    request = await caller.procurement.create(values);
  } catch (error) {
    return {
      message:
        error instanceof Error
          ? error.message
          : "Unable to create the material request.",
    };
  }

  await logActivitySafely({
    project_id: request.project_id,
    entity_type: ACTIVITY_ENTITY_TYPES.Procurement,
    entity_id: request.id,
    event: { type: "procurement.requested", item: request.item },
  });

  revalidatePath(routes.app.procurement);
  return { message: "" };
};

export const updateProcurementStatusAction = async (
  request: Pick<ProcurementRequest, "id" | "project_id" | "item" | "status">,
  status: string,
): Promise<ProcurementActionState> => {
  const nextStatus = resolveProcurementStatus(status);

  try {
    await caller.procurement.updateStatus({
      id: request.id,
      status: nextStatus,
    });
  } catch (error) {
    return {
      message:
        error instanceof Error
          ? error.message
          : "Unable to update the material request.",
    };
  }

  if (nextStatus !== request.status) {
    if (nextStatus === "backordered") {
      await logActivitySafely({
        project_id: request.project_id,
        entity_type: ACTIVITY_ENTITY_TYPES.Procurement,
        entity_id: request.id,
        event: { type: "procurement.blocked" },
      });
    } else if (request.status === "backordered") {
      await logActivitySafely({
        project_id: request.project_id,
        entity_type: ACTIVITY_ENTITY_TYPES.Procurement,
        entity_id: request.id,
        event: { type: "procurement.unblocked" },
      });
    } else {
      await logActivitySafely({
        project_id: request.project_id,
        entity_type: ACTIVITY_ENTITY_TYPES.Procurement,
        entity_id: request.id,
        event: {
          type: "procurement.status_changed",
          item: request.item,
          from: PROCUREMENT_STATUS_LABELS[request.status],
          to: PROCUREMENT_STATUS_LABELS[nextStatus],
        },
      });
    }
  }

  revalidatePath(routes.app.procurement);
  return { message: "" };
};

export const addProcurementNoteAction = async (
  requestId: string,
  note: string,
): Promise<ProcurementActionState> => {
  const trimmed = note.trim();

  if (!trimmed) {
    return { message: "Note can't be empty." };
  }

  try {
    await caller.procurement.addNote({ request_id: requestId, note: trimmed });
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "Unable to save the note.",
    };
  }

  revalidatePath(routes.app.procurement);
  return { message: "" };
};
