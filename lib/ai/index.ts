import { xai } from "@ai-sdk/xai";
import type { LanguageModel } from "ai";

import type { AiModelConfig } from "./types";

export * from "./types";

export const AI_MODELS = [
  {
    id: "grok-4.3",
    name: "Grok 4.3",
    provider: "xai",
    providerLabel: "xAI",
    maxTokens: 256000,
  },
  {
    id: "grok-3-mini",
    name: "Grok 3 mini",
    provider: "xai",
    providerLabel: "xAI",
    maxTokens: 131072,
  },
] as const satisfies readonly AiModelConfig[];

export type AiModelId = (typeof AI_MODELS)[number]["id"];

export const DEFAULT_CHAT_MODEL_ID = "grok-4.3" satisfies AiModelId;

const MODEL_BY_ID = new Map<string, (typeof AI_MODELS)[number]>(
  AI_MODELS.map((model) => [model.id, model]),
);

export const getAllowedModel = (
  modelId: unknown,
  fallbackModelId: AiModelId = DEFAULT_CHAT_MODEL_ID,
): (typeof AI_MODELS)[number] => {
  if (typeof modelId === "string") {
    const model = MODEL_BY_ID.get(modelId);
    if (model) {
      return model;
    }
  }

  return MODEL_BY_ID.get(fallbackModelId) ?? AI_MODELS[0];
};

export const resolveAiModel = (
  modelId: unknown,
  fallbackModelId: AiModelId = DEFAULT_CHAT_MODEL_ID,
): LanguageModel => xai(getAllowedModel(modelId, fallbackModelId).id);
