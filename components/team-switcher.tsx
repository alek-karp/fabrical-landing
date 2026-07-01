"use client";

import Link from "next/link";
import type * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { routes } from "@/lib/routes";

export function TeamSwitcher({
  team,
}: {
  team: {
    name: string;
    logo: React.ReactNode;
  };
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link href={routes.app.settings}>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-yellow-400 text-yellow-950">
              {team.logo}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{team.name}</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
