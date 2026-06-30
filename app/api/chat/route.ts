import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";

import { resolveAiModel } from "@/lib/ai";

export const maxDuration = 30;

export const POST = async (req: Request) => {
  const { messages, modelId }: { messages: UIMessage[]; modelId?: unknown } =
    await req.json();

  const result = streamText({
    model: resolveAiModel(modelId),
    instructions:
      "You are Fabrical's assistant for electrical construction teams. Help with coordination, scheduling, procurement, and field execution. Be concise and practical.",
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onError: (error) =>
        error instanceof Error ? error.message : String(error),
    }),
  });
};
