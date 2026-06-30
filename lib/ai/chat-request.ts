import { z } from "zod";

import { isValidTimeZone } from "./time-zone";

const uiMessagePartSchema = z
  .object({
    type: z.string(),
  })
  .passthrough();

const uiMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["system", "user", "assistant"]),
  parts: z.array(uiMessagePartSchema).min(1),
  metadata: z.unknown().optional(),
});

export const chatRequestSchema = z.object({
  messages: z.array(uiMessageSchema).min(1).max(100),
  modelId: z.string().optional(),
  timeZone: z
    .string()
    .refine(isValidTimeZone, { message: "Invalid IANA time zone" })
    .optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;

export const MAX_CHAT_REQUEST_BYTES = 512_000;

export const getJsonBodyByteLength = (body: unknown): number =>
  new TextEncoder().encode(JSON.stringify(body)).length;
