import { createAgentUIStreamResponse } from "ai";

import { getAllowedModel } from "@/lib/ai";
import { createFabricalAgent } from "@/lib/ai/agents/fabrical-agent";
import {
  chatRequestSchema,
  getJsonBodyByteLength,
  MAX_CHAT_REQUEST_BYTES,
} from "@/lib/ai/chat-request";
import { caller } from "@/trpc/server";

export const maxDuration = 30;

export const POST = async (req: Request) => {
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > MAX_CHAT_REQUEST_BYTES) {
    return Response.json({ error: "Request too large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (getJsonBodyByteLength(body) > MAX_CHAT_REQUEST_BYTES) {
    return Response.json({ error: "Request too large" }, { status: 413 });
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { messages, modelId, timeZone } = parsed.data;

  return createAgentUIStreamResponse({
    agent: createFabricalAgent(caller, {
      defaultTimeZone: timeZone ?? "UTC",
    }),
    uiMessages: messages,
    options: {
      modelId: getAllowedModel(modelId).id,
    },
  });
};
