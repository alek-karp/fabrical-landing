import { createTRPCRouter } from "../init";
import { activityRouter } from "./activity";
import { projectsRouter } from "./projects";

export const appRouter = createTRPCRouter({
  projects: projectsRouter,
  activity: activityRouter,
});

export type AppRouter = typeof appRouter;
