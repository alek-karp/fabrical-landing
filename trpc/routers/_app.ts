import { createTRPCRouter } from "../init";
import { activityRouter } from "./activity";
import { procurementRouter } from "./procurement";
import { projectsRouter } from "./projects";
import { workspaceRouter } from "./workspace";

export const appRouter = createTRPCRouter({
  projects: projectsRouter,
  activity: activityRouter,
  procurement: procurementRouter,
  workspace: workspaceRouter,
});

export type AppRouter = typeof appRouter;
