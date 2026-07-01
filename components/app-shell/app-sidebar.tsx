"use client";

import { useQuery } from "@tanstack/react-query";
import {
  BotIcon,
  FolderDotIcon,
  FolderKanbanIcon,
  GaugeIcon,
  PackageCheckIcon,
  Settings2Icon,
} from "lucide-react";
import type * as React from "react";
import { LogoIcon } from "@/components/logo";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { routes } from "@/lib/routes";
import { useTRPC } from "@/trpc/client";

const SIDEBAR_PROJECT_LIMIT = 5;

const DEFAULT_TEAM_NAME = "Fabrical";

const data = {
  navMain: [
    {
      title: "Command Center",
      url: routes.app.home,
      icon: <GaugeIcon />,
      isActive: true,
    },
    {
      title: "Agent",
      url: routes.app.agent,
      icon: <BotIcon />,
    },
    {
      title: "Procurement",
      url: routes.app.procurement,
      icon: <PackageCheckIcon />,
    },
    {
      title: "All Projects",
      url: routes.projects.list,
      icon: <FolderKanbanIcon />,
    },
  ],
  settings: {
    title: "Settings",
    url: routes.app.settings,
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const trpc = useTRPC();
  const { data: portfolioProjects, isLoading } = useQuery(
    trpc.projects.list.queryOptions(),
  );
  const { data: workspace } = useQuery(trpc.workspace.get.queryOptions());

  const sidebarProjects = (portfolioProjects ?? [])
    .slice(0, SIDEBAR_PROJECT_LIMIT)
    .map((project) => ({
      name: project.name,
      url: routes.projects.detail(project.slug),
      icon: <FolderDotIcon />,
      location: project.location,
    }));

  const hasMoreProjects =
    (portfolioProjects?.length ?? 0) > SIDEBAR_PROJECT_LIMIT;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          team={{
            name: workspace?.name ?? DEFAULT_TEAM_NAME,
            logo: <LogoIcon />,
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects
          projects={sidebarProjects}
          moreUrl={hasMoreProjects ? routes.projects.list : undefined}
          isLoading={isLoading}
        />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={data.settings.title}>
              <a href={data.settings.url}>
                <Settings2Icon />
                <span>{data.settings.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
