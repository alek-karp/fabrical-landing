import { createTRPCRouter } from "../init";
import { activityRouter } from "./activity";
import { projectsRouter } from "./projects";
import { workspaceRouter } from "./workspace";

export const appRouter = createTRPCRouter({
  projects: projectsRouter,
  activity: activityRouter,
  workspace: workspaceRouter,
});

export type AppRouter = typeof appRouter;
