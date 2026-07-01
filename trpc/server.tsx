import "server-only";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { cache } from "react";

import { createTRPCContext } from "./init";
import { makeQueryClient } from "./query-client";
import { appRouter } from "./routers/_app";

export const getQueryClient = cache(makeQueryClient);

/** Resolves auth from the current request via cached createTRPCContext (cookies). */
export const caller = appRouter.createCaller(createTRPCContext);

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});

export const HydrateClient = (props: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
};

// Just enough shape to branch on regular vs. infinite queries; the concrete
// TRPCQueryOptions return type doesn't stay assignable to a shared generic
// constraint across different procedures' input/output types, so we only
// require what this function actually inspects and hand the rest to
// react-query's own (already well-typed) prefetch overloads.
type PrefetchableQueryOptions = {
  queryKey: readonly [readonly string[], { type?: string }?];
};

export const prefetch = <T extends PrefetchableQueryOptions>(
  queryOptions: T,
) => {
  const queryClient = getQueryClient();
  if (queryOptions.queryKey[1]?.type === "infinite") {
    void queryClient.prefetchInfiniteQuery(queryOptions as never);
  } else {
    void queryClient.prefetchQuery(queryOptions as never);
  }
};
