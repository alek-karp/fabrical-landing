import { z } from "zod";

export const updateWorkspaceNameSchema = z.object({
  name: z.string().trim().min(1).max(120),
});
