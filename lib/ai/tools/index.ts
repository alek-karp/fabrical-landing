import type { AiToolCaller } from "./context";
import { createProjectTool } from "./create-project";
import { getCurrentDateTimeTool } from "./get-current-datetime";
import { listProjectsTool } from "./list-projects";

export const trpcAgentTools = {
  listProjects: listProjectsTool,
  createProject: createProjectTool,
} as const;

export const agentTools = {
  getCurrentDateTime: getCurrentDateTimeTool,
  ...trpcAgentTools,
} as const;

type BuildToolsContextOptions = {
  caller: AiToolCaller;
  defaultTimeZone: string;
};

export const buildToolsContext = ({
  caller,
  defaultTimeZone,
}: BuildToolsContextOptions) => {
  const trpcContext = Object.fromEntries(
    (Object.keys(trpcAgentTools) as Array<keyof typeof trpcAgentTools>).map(
      (name) => [name, { caller }],
    ),
  ) as { [K in keyof typeof trpcAgentTools]: { caller: AiToolCaller } };

  return {
    getCurrentDateTime: { defaultTimeZone },
    ...trpcContext,
  };
};
