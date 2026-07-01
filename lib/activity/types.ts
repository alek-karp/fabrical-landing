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

export const ACTIVITY_ACTOR_TYPES = {
  User: "user",
  Agent: "agent",
} as const;

export type ActivityActorType =
  (typeof ACTIVITY_ACTOR_TYPES)[keyof typeof ACTIVITY_ACTOR_TYPES];

export type ActivityEvent = z.infer<typeof activityEventSchema>;

export type ActivityCoauthorRow = {
  type: typeof ACTIVITY_ACTOR_TYPES.User;
  id: string;
};

/** Row shape as stored in and read back from `activity_logs`. */
export type ActivityLogRow = {
  id: string;
  project_id: string;
  entity_type: ActivityEntityType;
  entity_id: string;
  event: ActivityEvent;
  description: string | null;
  actor_type: ActivityActorType;
  actor_id: string | null;
  coauthors: ActivityCoauthorRow[];
  created_at: string;
};

export type ActivityPerson = {
  type: typeof ACTIVITY_ACTOR_TYPES.User;
  id: string;
  name: string;
  avatarUrl: string | null;
};

export type ActivityAgent = {
  type: typeof ACTIVITY_ACTOR_TYPES.Agent;
  name: string;
};

export type ActivityActor = ActivityAgent | ActivityPerson;

/** Enriched shape returned by `getActivityLogs`, with actor/coauthor profiles resolved. */
export type ActivityLog = {
  id: string;
  project_id: string;
  entity_type: ActivityEntityType;
  entity_id: string;
  event: ActivityEvent;
  description: string | null;
  actor: ActivityActor;
  coauthors: ActivityPerson[];
  created_at: string;
};

export type LogActivity = z.infer<typeof logActivitySchema>;
