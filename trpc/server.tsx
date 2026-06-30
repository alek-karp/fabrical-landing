import "server-only";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  createTRPCOptionsProxy,
  type DefaultFeatureFlags,
  type TRPCQueryOptions,
} from "@trpc/tanstack-react-query";
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

type AnyQueryOptions = ReturnType<
  TRPCQueryOptions<{
    input: unknown;
    output: unknown;
    transformer: false;
    errorShape: unknown;
    featureFlags: DefaultFeatureFlags;
  }>
>;

export const prefetch = <T extends AnyQueryOptions>(queryOptions: T) => {
  const queryClient = getQueryClient();
  if (queryOptions.queryKey[1]?.type === "infinite") {
    void queryClient.prefetchInfiniteQuery(queryOptions as never);
  } else {
    void queryClient.prefetchQuery(queryOptions);
  }
};
