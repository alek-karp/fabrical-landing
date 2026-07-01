import { z } from "zod";

import { ACTIVITY_ENTITY_TYPE_VALUES } from "./types";

export const activityEventSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("project.phase_changed"),
    from: z.string(),
    to: z.string(),
  }),
  z.object({
    type: z.literal("project.deadline_changed"),
    from: z.string().nullable(),
    to: z.string().nullable(),
  }),
  z.object({
    type: z.literal("project.created"),
    name: z.string(),
  }),
  z.object({
    type: z.literal("procurement.blocked"),
    reason: z.string().optional(),
  }),
  z.object({
    type: z.literal("procurement.unblocked"),
  }),
  z.object({
    type: z.literal("procurement.requested"),
    item: z.string(),
  }),
  z.object({
    type: z.literal("procurement.status_changed"),
    item: z.string(),
    from: z.string(),
    to: z.string(),
  }),
  z.object({
    type: z.literal("transaction.flagged"),
    amount: z.number(),
    reason: z.string().optional(),
  }),
]);

export const logActivitySchema = z.object({
  project_id: z.string(),
  entity_type: z.enum(ACTIVITY_ENTITY_TYPE_VALUES),
  entity_id: z.string(),
  event: activityEventSchema,
  description: z.string().optional(),
  /** True when the agent performed this change on the signed-in user's behalf. */
  via_agent: z.boolean().optional(),
});

export const listActivitySchema = z.object({
  project_id: z.string(),
  entity_type: z.enum(ACTIVITY_ENTITY_TYPE_VALUES).optional(),
  entity_id: z.string().optional(),
  from: z.string().datetime({ offset: true }).optional(),
  to: z.string().datetime({ offset: true }).optional(),
  limit: z.number().min(1).max(100).default(50),
});
