import { ArrowUpRight } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { AgentChat } from "./agent-chat";

export const AgentHome = () => (
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset className="flex min-h-svh flex-col bg-background text-foreground">
      <header className="border-b border-border bg-background px-6 py-4 md:px-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <SidebarTrigger className="-ml-2 hover:bg-muted" />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase text-muted-foreground">
                Fabrical app
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-normal">
                Agent
              </h1>
            </div>
          </div>
          <a
            className="inline-flex h-10 items-center gap-2 border border-border bg-background px-4 text-sm font-semibold transition-colors hover:bg-muted"
            href="/app"
          >
            Command center
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </header>

      <AgentChat />
    </SidebarInset>
  </SidebarProvider>
);
