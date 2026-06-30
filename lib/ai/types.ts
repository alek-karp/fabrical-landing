export type AiModelProvider = "xai";

export type AiModelConfig = {
  id: string;
  name: string;
  provider: AiModelProvider;
  providerLabel: string;
  maxTokens: number;
};
