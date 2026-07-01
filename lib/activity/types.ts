import type { z } from "zod";

import type { activityEventSchema, logActivitySchema } from "./schema";

export const ACTIVITY_ENTITY_TYPES = {
  Project: "project",
  Procurement: "procurement",
  Transaction: "transaction",
} as const;

export type ActivityEntityType =
  (typeof ACTIVITY_ENTITY_TYPES)[keyof typeof ACTIVITY_ENTITY_TYPES];

export const ACTIVITY_ENTITY_TYPE_VALUES = Object.values(
  ACTIVITY_ENTITY_TYPES,
) as [ActivityEntityType, ...ActivityEntityType[]];

export type ActivityEvent = z.infer<typeof activityEventSchema>;

export type ActivityLog = {
  id: string;
  project_id: string;
  entity_type: ActivityEntityType;
  entity_id: string;
  event: ActivityEvent;
  description: string | null;
  actor_id: string;
  created_at: string;
};

export type LogActivity = z.infer<typeof logActivitySchema>;
