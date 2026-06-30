"use client";

import {
  AlertTriangleIcon,
  BotIcon,
  Building2Icon,
  CalendarDaysIcon,
  FactoryIcon,
  FolderKanbanIcon,
  GaugeIcon,
  PackageCheckIcon,
  Settings2Icon,
  UsersRoundIcon,
  ZapIcon,
} from "lucide-react";
import type * as React from "react";
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
import { projects } from "@/lib/projects";

function getProjectIcon(index: number) {
  switch (index) {
    case 0:
      return <FolderKanbanIcon />;
    case 1:
      return <UsersRoundIcon />;
    case 2:
      return <AlertTriangleIcon />;
    default:
      return <CalendarDaysIcon />;
  }
}

const data = {
  user: {
    name: "Site PM",
    email: "pm@fabrical.ai",
    avatar: "",
  },
  teams: [
    {
      name: "Fabrical",
      logo: <ZapIcon />,
      plan: "Command center",
    },
    {
      name: "Data Center West",
      logo: <Building2Icon />,
      plan: "Electrical scope",
    },
    {
      name: "Advanced Manufacturing",
      logo: <FactoryIcon />,
      plan: "Prefab scope",
    },
  ],
  navMain: [
    {
      title: "Command Center",
      url: "/app",
      icon: <GaugeIcon />,
      isActive: true,
    },
    {
      title: "Agent",
      url: "/agent",
      icon: <BotIcon />,
    },
    {
      title: "Procurement",
      url: "/procurement",
      icon: <PackageCheckIcon />,
    },
  ],
  settings: {
    title: "Settings",
    url: "#",
  },
  projects: projects.map((project, index) => ({
    name: project.name,
    url: `/projects/${project.slug}`,
    icon: getProjectIcon(index),
    location: project.location,
  })),
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
