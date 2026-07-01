import type { SupabaseClient } from "@supabase/supabase-js";

import { getProfilesByIds } from "@/lib/profiles";

import {
  ACTIVITY_ACTOR_TYPES,
  type ActivityActor,
  type ActivityCoauthorRow,
  type ActivityLog,
  type ActivityLogRow,
  type ActivityPerson,
  type LogActivity,
} from "./types";

export {
  activityEventSchema,
  listActivitySchema,
  logActivitySchema,
} from "./schema";
export type {
  ActivityActor,
  ActivityActorType,
  ActivityEntityType,
  ActivityEvent,
  ActivityLog,
  ActivityPerson,
  LogActivity,
} from "./types";
export {
  ACTIVITY_ACTOR_TYPES,
  ACTIVITY_ENTITY_TYPE_VALUES,
  ACTIVITY_ENTITY_TYPES,
} from "./types";

export const AGENT_ACTOR_NAME = "Fabrical Agent";

export type ActivityActorInput =
  | { type: typeof ACTIVITY_ACTOR_TYPES.User; id: string }
  | { type: typeof ACTIVITY_ACTOR_TYPES.Agent };

export const logActivity = async (
  supabase: SupabaseClient,
  actor: ActivityActorInput,
  coauthors: ActivityCoauthorRow[],
  input: LogActivity,
): Promise<ActivityLogRow> => {
  const { data, error } = await supabase
    .from("activity_logs")
    .insert({
      project_id: input.project_id,
      entity_type: input.entity_type,
      entity_id: input.entity_id,
      event: input.event,
      description: input.description ?? null,
      actor_type: actor.type,
      actor_id: actor.type === ACTIVITY_ACTOR_TYPES.User ? actor.id : null,
      coauthors,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as ActivityLogRow;
};

type ActivityProfile = {
  full_name: string | null;
  avatar_url: string | null;
  email: string | null;
};

const toPerson = (
  id: string,
  profile: ActivityProfile | undefined,
): ActivityPerson => ({
  type: ACTIVITY_ACTOR_TYPES.User,
  id,
  name:
    profile?.full_name ?? profile?.email?.split("@")[0] ?? "Unknown teammate",
  avatarUrl: profile?.avatar_url ?? null,
});

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

  const rows = data as ActivityLogRow[];

  const userIds = new Set<string>();
  for (const row of rows) {
    if (row.actor_type === ACTIVITY_ACTOR_TYPES.User && row.actor_id) {
      userIds.add(row.actor_id);
    }
    for (const coauthor of row.coauthors) {
      userIds.add(coauthor.id);
    }
  }

  const profiles = await getProfilesByIds(supabase, [...userIds]);
  const profileById = new Map(profiles.map((profile) => [profile.id, profile]));

  return rows.map((row) => {
    const actor: ActivityActor =
      row.actor_type === ACTIVITY_ACTOR_TYPES.Agent
        ? { type: ACTIVITY_ACTOR_TYPES.Agent, name: AGENT_ACTOR_NAME }
        : toPerson(
            row.actor_id as string,
            profileById.get(row.actor_id as string),
          );

    return {
      id: row.id,
      project_id: row.project_id,
      entity_type: row.entity_type,
      entity_id: row.entity_id,
      event: row.event,
      description: row.description,
      actor,
      coauthors: row.coauthors.map((coauthor) =>
        toPerson(coauthor.id, profileById.get(coauthor.id)),
      ),
      created_at: row.created_at,
    };
  });
};
