"use client";

import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileText,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";

import { LocationBadge } from "@/components/location-badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Project } from "@/lib/projects";
import { formatProjectDeadline } from "@/lib/projects";
import { routes } from "@/lib/routes";

type ProjectDetailProps = {
  project: Project;
};

const tabs = [
  { value: "overview", label: "Overview" },
  { value: "work-packages", label: "Work Packages" },
  { value: "timeline", label: "Timeline" },
  { value: "team", label: "Team" },
  { value: "risk-watch", label: "Risk Watch" },
];

const placeholderTabs = tabs.filter(
  (tab) => tab.value !== "overview" && tab.value !== "timeline",
);

export const ProjectDetail = ({ project }: ProjectDetailProps) => (
  <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-6 md:px-10">
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <h1 className="text-3xl font-semibold tracking-normal md:text-4xl">
        {project.name}
      </h1>
      {formatProjectDeadline(project.deadline) ? (
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="size-4" />
          Deadline {formatProjectDeadline(project.deadline)}
        </span>
      ) : null}
    </div>

    <Tabs className="gap-6" defaultValue="overview">
      <div className="flex flex-col gap-4 border-b border-border md:flex-row md:items-center md:justify-between">
        <TabsList
          className="h-auto justify-start overflow-x-auto p-0"
          variant="line"
        >
          {tabs.map((tab) => (
            <TabsTrigger
              className="flex-none pb-3"
              key={tab.value}
              value={tab.value}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="flex items-center gap-3 pb-3">
          <Button variant="outline">
            <FileText data-icon="inline-start" />
            Export
          </Button>
          <Button asChild>
            <Link href={routes.projects.new}>
              <PlusIcon data-icon="inline-start" />
              Add Project
            </Link>
          </Button>
        </div>
      </div>

      <TabsContent value="overview">
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <section className="flex flex-col gap-6">
            <section className="border border-border bg-card p-5 text-card-foreground">
              <div className="flex flex-wrap items-center gap-3">
                <span className="w-fit border border-border px-2 py-1 text-xs font-semibold uppercase">
                  {project.phase}
                </span>
                <LocationBadge location={project.location} />
                {formatProjectDeadline(project.deadline) ? (
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CalendarDays className="size-4" />
                    {formatProjectDeadline(project.deadline)}
                  </span>
                ) : null}
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
                {project.description}
              </p>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
              {project.stats.map((stat) => (
                <div
                  className="border border-border bg-card p-5 text-card-foreground"
                  key={stat.label}
                >
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <div className="mt-4 flex items-end justify-between gap-3">
                    <span className="text-4xl font-semibold">{stat.value}</span>
                    <CheckCircle2 className="mb-1 size-5 text-primary" />
                  </div>
                </div>
              ))}
            </section>

            <section className="border border-border bg-card text-card-foreground">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div>
                  <h2 className="text-lg font-semibold tracking-normal">
                    Active work packages
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Next field releases and approval blockers
                  </p>
                </div>
                <ClipboardList className="size-5 text-muted-foreground" />
              </div>
              <div className="divide-y divide-border">
                {project.workPackages.map((item) => (
                  <div
                    className="grid gap-3 px-5 py-4 md:grid-cols-[1fr_12rem_7rem] md:items-center"
                    key={item.name}
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.owner}
                    </span>
                    <span className="w-fit border border-border px-2 py-1 text-xs font-semibold uppercase">
                      {item.state}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </section>

          <aside className="flex flex-col gap-6">
            <section className="border border-border bg-card p-5 text-card-foreground">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold tracking-normal">
                  Milestones
                </h2>
                <CheckCircle2 className="size-5 text-muted-foreground" />
              </div>
              <ol className="mt-5 flex flex-col gap-4 text-sm text-muted-foreground">
                {project.milestones.map((milestone, index) => (
                  <li className="flex gap-3" key={milestone.label}>
                    <span className="font-semibold text-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-foreground">
                        {milestone.label}
                      </span>
                      {milestone.status} - {milestone.date}
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="border border-border bg-card p-5 text-card-foreground">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold tracking-normal">
                  Risk watch
                </h2>
                <AlertTriangle className="size-5 text-primary" />
              </div>
              <div className="mt-5 divide-y divide-border border-y border-border">
                {project.risks.map((risk) => (
                  <div
                    className="flex items-center justify-between gap-4 py-3 text-sm"
                    key={risk.label}
                  >
                    <span>{risk.label}</span>
                    <span className="text-muted-foreground">
                      {risk.severity}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </TabsContent>

      <TabsContent value="timeline">
        <section className="border border-border bg-card p-5 text-card-foreground md:p-8">
          <ol className="relative flex flex-col gap-8 border-l border-border pl-8">
            {project.milestones.map((milestone, index) => (
              <li className="relative" key={milestone.label}>
                <span className="absolute -left-[2.55rem] flex size-7 items-center justify-center border border-border bg-background text-xs font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-4">
                  <span className="font-medium">{milestone.label}</span>
                  <span className="text-sm text-muted-foreground">
                    {milestone.date}
                  </span>
                </div>
                <span className="mt-2 inline-block w-fit border border-border px-2 py-1 text-xs font-semibold uppercase">
                  {milestone.status}
                </span>
              </li>
            ))}
          </ol>
        </section>
      </TabsContent>

      {placeholderTabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <div className="border border-border bg-card p-10 text-center text-sm text-muted-foreground">
            {tab.label} coming soon.
          </div>
        </TabsContent>
      ))}
    </Tabs>
  </main>
);
