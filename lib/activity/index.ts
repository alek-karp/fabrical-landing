import type { SupabaseClient } from "@supabase/supabase-js";

import type { ActivityLog, LogActivity } from "./types";

export {
  activityEventSchema,
  listActivitySchema,
  logActivitySchema,
} from "./schema";
export type {
  ActivityEntityType,
  ActivityEvent,
  ActivityLog,
  LogActivity,
} from "./types";
export { ACTIVITY_ENTITY_TYPE_VALUES, ACTIVITY_ENTITY_TYPES } from "./types";

export const logActivity = async (
  supabase: SupabaseClient,
  actorId: string,
  input: LogActivity,
): Promise<ActivityLog> => {
  const { data, error } = await supabase
    .from("activity_logs")
    .insert({
      project_id: input.project_id,
      entity_type: input.entity_type,
      entity_id: input.entity_id,
      event: input.event,
      description: input.description ?? null,
      actor_id: actorId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as ActivityLog;
};

export const getActivityLogs = async (
  supabase: SupabaseClient,
  options: {
    project_id: string;
    entity_type?: string;
    entity_id?: string;
    from?: string;
    to?: string;
    limit?: number;
  },
): Promise<ActivityLog[]> => {
  let query = supabase
    .from("activity_logs")
    .select("*")
    .eq("project_id", options.project_id)
    .order("created_at", { ascending: false });

  if (options.entity_type) {
    query = query.eq("entity_type", options.entity_type);
  }

  if (options.entity_id) {
    query = query.eq("entity_id", options.entity_id);
  }

  if (options.from) {
    query = query.gte("created_at", options.from);
  }

  if (options.to) {
    query = query.lte("created_at", options.to);
  }

  const { data, error } = await query.limit(options.limit ?? 50);

  if (error) {
    throw new Error(error.message);
  }

  return data as ActivityLog[];
};
