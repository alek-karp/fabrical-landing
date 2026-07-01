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
import { usePathname } from "next/navigation";
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

const isRouteActive = (pathname: string, url: string) =>
  pathname === url || pathname.startsWith(`${url}/`);

const data = {
  navMain: [
    {
      title: "Command Center",
      url: routes.app.home,
      icon: <GaugeIcon />,
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
  const pathname = usePathname();
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
      isActive: isRouteActive(pathname, routes.projects.detail(project.slug)),
    }));

  const hasMoreProjects =
    (portfolioProjects?.length ?? 0) > SIDEBAR_PROJECT_LIMIT;
  const hasActiveSidebarProject = sidebarProjects.some(
    (project) => project.isActive,
  );
  const isMoreProjectsActive =
    isRouteActive(pathname, routes.projects.list) &&
    pathname !== routes.projects.list &&
    pathname !== routes.projects.new &&
    !hasActiveSidebarProject;

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
        <NavMain
          items={data.navMain.map((item) => ({
            ...item,
            isActive:
              item.url === routes.projects.list
                ? pathname === item.url || pathname === routes.projects.new
                : isRouteActive(pathname, item.url),
          }))}
        />
        <NavProjects
          projects={sidebarProjects}
          moreUrl={hasMoreProjects ? routes.projects.list : undefined}
          isMoreActive={isMoreProjectsActive}
          isLoading={isLoading}
        />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isRouteActive(pathname, data.settings.url)}
              tooltip={data.settings.title}
            >
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
