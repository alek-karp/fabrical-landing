import type { SupabaseClient } from "@supabase/supabase-js";

import type { Profile } from "./types";

export type { Profile } from "./types";

export const getProfilesByIds = async (
  supabase: SupabaseClient,
  ids: string[],
): Promise<Profile[]> => {
  if (ids.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id,full_name,avatar_url,email")
    .in("id", ids);

  if (error) {
    throw new Error(error.message);
  }

  return data as Profile[];
};
