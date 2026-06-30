"use client";

import {
  AlertTriangleIcon,
  Building2Icon,
  CalendarDaysIcon,
  ClipboardListIcon,
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
  SidebarRail,
} from "@/components/ui/sidebar";

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
      items: [
        {
          title: "Overview",
          url: "/app",
        },
        {
          title: "Readiness",
          url: "#",
        },
        {
          title: "Today",
          url: "#",
        },
      ],
    },
    {
      title: "Work Packages",
      url: "#",
      icon: <ClipboardListIcon />,
      items: [
        {
          title: "Ready",
          url: "#",
        },
        {
          title: "Blocked",
          url: "#",
        },
        {
          title: "Due today",
          url: "#",
        },
      ],
    },
    {
      title: "Procurement",
      url: "#",
      icon: <PackageCheckIcon />,
      items: [
        {
          title: "Material actions",
          url: "#",
        },
        {
          title: "Submittals",
          url: "#",
        },
        {
          title: "Vendor holds",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
      items: [
        {
          title: "Project",
          url: "#",
        },
        {
          title: "Crew",
          url: "#",
        },
        {
          title: "Integrations",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Level 04 rough-in",
      url: "#",
      icon: <FolderKanbanIcon />,
    },
    {
      name: "MCC room prefab",
      url: "#",
      icon: <UsersRoundIcon />,
    },
    {
      name: "Switchgear release",
      url: "#",
      icon: <AlertTriangleIcon />,
    },
    {
      name: "Install week plan",
      url: "#",
      icon: <CalendarDaysIcon />,
    },
  ],
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
