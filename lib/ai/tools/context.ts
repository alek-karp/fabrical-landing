import { z } from "zod";

import type { caller } from "@/trpc/server";

export type AiToolCaller = typeof caller;

export const trpcToolContextSchema = z.object({
  caller: z.custom<AiToolCaller>(),
});

export type TrpcToolContext = z.infer<typeof trpcToolContextSchema>;
