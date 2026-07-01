"use server";

import { revalidatePath } from "next/cache";

import { routes } from "@/lib/routes";
import { caller } from "@/trpc/server";

export type UpdateWorkspaceNameState = {
  message: string;
};

export const updateWorkspaceName = async (
  name: string,
): Promise<UpdateWorkspaceNameState> => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return { message: "Workspace name is required." };
  }

  try {
    await caller.workspace.updateName({ name: trimmedName });
  } catch (error) {
    return {
      message:
        error instanceof Error
          ? error.message
          : "Unable to update the workspace name.",
    };
  }

  revalidatePath(routes.app.settings);
  return { message: "" };
};
