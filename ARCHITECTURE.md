# Architecture

This document describes how data flows through the app and the conventions that
keep it consistent. Read this before adding API endpoints, server actions, or
data-fetching code.

## Single data path

All application data goes through **tRPC**. There is exactly one way to read or
write domain data: call a tRPC procedure. Components, pages, and server actions
never talk to Supabase (or any other data source) directly.

```
React Server Component ─┐
Server Action ──────────┼─► tRPC procedure ─► data layer (lib/*) ─► Supabase
Client Component ───────┘        (router)        (pure functions)
```

- **Server (RSC, server actions, route handlers):** call the server-side
  `caller` — `await caller.projects.list()`.
- **Client components:** use the React Query hooks via `useTRPC()` — e.g.
  `useQuery(trpc.projects.list.queryOptions())`.

Keeping a single path means input validation, auth, and error handling live in
one place (the procedure) instead of being re-implemented at every call site.

## Directory layout

```
trpc/
├── init.ts            tRPC initialization
│                        - createTRPCContext: per-request context (cached)
│                        - createTRPCRouter, publicProcedure, protectedProcedure
├── routers/
│   ├── _app.ts        appRouter (merges all routers) + exported AppRouter type
│   └── projects.ts    example feature router
├── query-client.ts    makeQueryClient (shared React Query config)
├── server.tsx         server-only entry: caller, trpc proxy, HydrateClient, prefetch
└── client.tsx         "use client" entry: TRPCProvider/useTRPC + TRPCReactProvider

app/api/trpc/[trpc]/route.ts   HTTP handler (fetch adapter) mounted at /api/trpc

lib/                   pure data layer — functions take a SupabaseClient argument
```

This mirrors the official tRPC + TanStack React Query App Router setup. Server
code (`server.tsx`) and client code (`client.tsx`) are split by the
`server-only` and `"use client"` directives so server internals never leak into
the browser bundle.

## Context, procedures, and auth

`createTRPCContext` (in `trpc/init.ts`) runs once per request — it is wrapped in
React's `cache()` so the same context (including the Supabase client and the
resolved `user`) is reused across all procedure calls within a request.

- `publicProcedure` — no auth requirement.
- `protectedProcedure` — throws `TRPCError({ code: "UNAUTHORIZED" })` when there
  is no `ctx.user`, and narrows `ctx.user` to non-null for the resolver.

Procedures read and write through `ctx.supabase`; they do not create their own
client.

## Data layer (`lib/`)

Files under `lib/` (e.g. `lib/project-store.ts`) are **pure data functions**:
they accept a `SupabaseClient` as their first argument and contain no request
or framework coupling (no `cookies()`, no `next/headers`). This keeps them
reusable and testable, and ensures the client is always the request-scoped one
created in the tRPC context.

```ts
// lib/project-store.ts
export const getPortfolioProjects = async (supabase: SupabaseClient) => { ... };

// trpc/routers/projects.ts
list: publicProcedure.query(({ ctx }) => getPortfolioProjects(ctx.supabase)),
```

## Consuming data

### Server components (server-rendered data as props)

```ts
import { caller } from "@/trpc/server";

export default async function ProjectsPage() {
  const projects = await caller.projects.list();
  return <ProjectsHome projects={projects} />;
}
```

### Server actions

```ts
"use server";
import { caller } from "@/trpc/server";

export const createProject = async (/* ... */) => {
  const project = await caller.projects.create(values);
  // revalidate / redirect
};
```

### Client components

```ts
"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const trpc = useTRPC();
const { data } = useQuery(trpc.projects.list.queryOptions());
```

### Prefetch + hydrate (server prefetch, client consume)

When a client component uses `useQuery`, prefetch on the server to avoid a
client round-trip:

```tsx
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

prefetch(trpc.projects.list.queryOptions());
return (
  <HydrateClient>
    <ClientThatUsesUseQuery />
  </HydrateClient>
);
```

## Adding a new feature router

1. Create `trpc/routers/<feature>.ts` with `createTRPCRouter` and the relevant
   `publicProcedure` / `protectedProcedure` definitions. Validate inputs with
   `zod`.
2. Put the actual data access in a pure `lib/<feature>-store.ts` function that
   takes `ctx.supabase`.
3. Register the router in `trpc/routers/_app.ts`.
4. Consume it via `caller` (server) or `useTRPC()` (client) — never reach into
   the data layer or Supabase directly from app code.
