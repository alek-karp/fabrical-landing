"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { type MutableRefObject, useRef } from "react";

import type { AiModelId } from "@/lib/ai";
import { DEFAULT_CHAT_MODEL_ID } from "@/lib/ai";
import type { FabricalAgentUIMessage } from "@/lib/ai/agents/fabrical-agent";
import { routes } from "@/lib/routes";

const CLIENT_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

const createChatTransport = (modelIdRef: MutableRefObject<AiModelId>) =>
  new DefaultChatTransport({
    api: routes.api.chat,
    body: () => ({
      modelId: modelIdRef.current,
      timeZone: CLIENT_TIME_ZONE,
    }),
  });

export const useAgentChat = () => {
  const modelIdRef = useRef<AiModelId>(DEFAULT_CHAT_MODEL_ID);
  const transportRef =
    useRef<DefaultChatTransport<FabricalAgentUIMessage> | null>(null);

  if (transportRef.current === null) {
    transportRef.current = createChatTransport(modelIdRef);
  }

  const chat = useChat<FabricalAgentUIMessage>({
    transport: transportRef.current,
  });

  const selectModelId = (modelId: AiModelId) => {
    modelIdRef.current = modelId;
  };

  return { ...chat, selectModelId };
};
