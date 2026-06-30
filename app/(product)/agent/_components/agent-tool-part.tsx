"use client";

import { isDynamicToolUIPart } from "ai";

import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "@/components/ai-elements/tool";
import type { FabricalAgentUIMessage } from "@/lib/ai/agents/fabrical-agent";

type AgentMessageToolPart = Extract<
  FabricalAgentUIMessage["parts"][number],
  { type: `tool-${string}` } | { type: "dynamic-tool" }
>;

type AgentToolPartProps = {
  part: AgentMessageToolPart;
};

export const AgentToolPart = ({ part }: AgentToolPartProps) => (
  <Tool>
    {isDynamicToolUIPart(part) ? (
      <ToolHeader
        state={part.state}
        toolName={part.toolName}
        type={part.type}
      />
    ) : (
      <ToolHeader state={part.state} type={part.type} />
    )}
    <ToolContent>
      {"input" in part && part.input !== undefined ? (
        <ToolInput input={part.input} />
      ) : null}
      <ToolOutput
        errorText={"errorText" in part ? part.errorText : undefined}
        output={"output" in part ? part.output : undefined}
      />
    </ToolContent>
  </Tool>
);
