import { type InferAgentUIMessage, ToolLoopAgent } from "ai";
import { z } from "zod";

import { DEFAULT_CHAT_MODEL_ID, resolveAiModel } from "@/lib/ai";
import { agentTools, buildToolsContext } from "@/lib/ai/tools";
import type { AiToolCaller } from "@/lib/ai/tools/context";

const callOptionsSchema = z.object({
  modelId: z.string(),
});

const agentInstructions = `You are an assistant for electrical construction teams. Help with coordination, scheduling, procurement, and field execution.

You have tools to check the current date and time, list portfolio projects, and create new projects.

When the user asks about projects, use listProjects before answering from memory.
When creating a project, gather name, location, sector, phase, summary, and description before calling createProject.
When checking the date or time, call getCurrentDateTime and pass an IANA time zone when the user specifies one.
Be concise and practical.`;

type CreateFabricalAgentOptions = {
  defaultTimeZone?: string;
};

export const createFabricalAgent = (
  caller: AiToolCaller,
  { defaultTimeZone = "UTC" }: CreateFabricalAgentOptions = {},
) =>
  new ToolLoopAgent({
    model: resolveAiModel(DEFAULT_CHAT_MODEL_ID),
    callOptionsSchema,
    instructions: agentInstructions,
    tools: agentTools,
    toolsContext: buildToolsContext({ caller, defaultTimeZone }),
    prepareCall: ({ options, ...settings }) => ({
      ...settings,
      model: resolveAiModel(options.modelId),
    }),
  });

export type FabricalAgentUIMessage = InferAgentUIMessage<
  ReturnType<typeof createFabricalAgent>
>;
