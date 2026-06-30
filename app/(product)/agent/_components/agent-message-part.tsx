"use client";

import { isToolUIPart } from "ai";
import { FileIcon } from "lucide-react";

import { MessageResponse } from "@/components/ai-elements/message";
import type { FabricalAgentUIMessage } from "@/lib/ai/agents/fabrical-agent";

import { AgentToolPart } from "./agent-tool-part";

type AgentMessagePartProps = {
  part: FabricalAgentUIMessage["parts"][number];
};

export const AgentMessagePart = ({ part }: AgentMessagePartProps) => {
  if (part.type === "text") {
    return <MessageResponse>{part.text}</MessageResponse>;
  }

  if (part.type === "file") {
    if (part.mediaType?.startsWith("image/")) {
      return (
        // biome-ignore lint/performance/noImgElement: attachment previews are local blob URLs, not optimizable by next/image
        <img
          alt={part.filename ?? "attachment"}
          className="max-h-64 max-w-full rounded-lg object-contain"
          src={part.url}
        />
      );
    }

    return (
      <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2 text-sm">
        <FileIcon className="size-4 shrink-0 text-muted-foreground" />
        <span className="truncate">{part.filename ?? "file"}</span>
      </div>
    );
  }

  if (isToolUIPart(part)) {
    return <AgentToolPart part={part} />;
  }

  return null;
};
