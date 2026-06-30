import { tool } from "ai";
import { z } from "zod";

import { isValidTimeZone } from "@/lib/ai/time-zone";

export const getCurrentDateTimeTool = tool({
  description:
    "Get the current date and time. Use when the user asks what time or day it is, or when scheduling needs today's date.",
  inputSchema: z.object({
    timeZone: z
      .string()
      .optional()
      .describe(
        "IANA time zone (e.g. America/New_York). Omit to use the user's session time zone.",
      ),
  }),
  contextSchema: z.object({
    defaultTimeZone: z.string(),
  }),
  execute: async ({ timeZone }, { context }) => {
    const now = new Date();
    const resolvedTimeZone = timeZone ?? context.defaultTimeZone;

    if (!isValidTimeZone(resolvedTimeZone)) {
      return {
        error: `Invalid time zone "${resolvedTimeZone}". Use a valid IANA time zone (e.g. America/New_York).`,
      };
    }

    const formatted = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: resolvedTimeZone,
    }).format(now);

    return {
      iso: now.toISOString(),
      formatted,
      timeZone: resolvedTimeZone,
      usedSessionDefault: timeZone === undefined,
      unixMs: now.getTime(),
    };
  },
});
