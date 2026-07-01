import { AppShell } from "@/components/app-shell";

import { AgentChat } from "./agent-chat";

export const AgentHome = () => (
  <AppShell title="Agent" bare>
    <AgentChat />
  </AppShell>
);
