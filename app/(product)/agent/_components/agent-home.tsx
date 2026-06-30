import { AppHeader, AppSidebar } from "@/components/app-shell";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AgentChat } from "./agent-chat";

export const AgentHome = () => (
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset className="flex min-h-svh flex-col bg-background text-foreground">
      <AppHeader title="Agent" />

      <AgentChat />
    </SidebarInset>
  </SidebarProvider>
);
