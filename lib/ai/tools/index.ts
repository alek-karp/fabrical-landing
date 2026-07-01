import type { AiToolCaller } from "./context";
import { createProcurementOrderTool } from "./create-procurement-order";
import { createProjectTool } from "./create-project";
import { getCurrentDateTimeTool } from "./get-current-datetime";
import { getProcurementOrderTool } from "./get-procurement-order";
import { listActivityTool } from "./list-activity";
import { listProcurementOrdersTool } from "./list-procurement-orders";
import { listProjectsTool } from "./list-projects";
import { updateProjectTool } from "./update-project";

export const trpcAgentTools = {
  listProjects: listProjectsTool,
  createProject: createProjectTool,
  updateProject: updateProjectTool,
  listProcurementOrders: listProcurementOrdersTool,
  createProcurementOrder: createProcurementOrderTool,
  getProcurementOrder: getProcurementOrderTool,
  listActivity: listActivityTool,
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
