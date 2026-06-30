import { initTRPC, TRPCError } from "@trpc/server";
import { cookies } from "next/headers";
import { cache } from "react";

import { createClient } from "@/utils/supabase/server";

export const createTRPCContext = cache(async () => {
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabase, user };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create();

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({ ctx: { ...ctx, user: ctx.user } });
});
