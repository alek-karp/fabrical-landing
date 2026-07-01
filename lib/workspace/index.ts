import type { SupabaseClient } from "@supabase/supabase-js";

import type { Workspace } from "./types";

export { updateWorkspaceNameSchema } from "./schema";
export type { Workspace } from "./types";

const WORKSPACE_ID = "default";

export const getWorkspace = async (
  supabase: SupabaseClient,
): Promise<Workspace> => {
  const { data, error } = await supabase
    .from("workspace")
    .select("id,name,updated_at")
    .eq("id", WORKSPACE_ID)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Workspace;
};

export const updateWorkspaceName = async (
  supabase: SupabaseClient,
  name: string,
): Promise<Workspace> => {
  const { data, error } = await supabase
    .from("workspace")
    .update({ name, updated_at: new Date().toISOString() })
    .eq("id", WORKSPACE_ID)
    .select("id,name,updated_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Workspace;
};
