"use client";

import {
  ArrowRight,
  CalendarDays,
  FolderKanban,
  LayoutGrid,
  List,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { AppHeader, AppSidebar } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Project } from "@/lib/projects";
import { formatProjectDeadline } from "@/lib/projects";
import { routes } from "@/lib/routes";

type ProjectsHomeProps = {
  projects: Project[];
};

type ViewMode = "card" | "list";

export const ProjectsHome = ({ projects }: ProjectsHomeProps) => {
  const [view, setView] = useState<ViewMode>("card");

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-svh bg-background text-foreground">
        <AppHeader title="Projects" />

        <main className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-6 md:px-10">
          <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-normal md:text-4xl">
                Projects
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Track active portfolio work and create new project records.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ButtonGroup className="rounded-md border border-border p-0.5">
                <Button
                  aria-label="Card view"
                  aria-pressed={view === "card"}
                  onClick={() => setView("card")}
                  size="icon"
                  variant={view === "card" ? "secondary" : "ghost"}
                >
                  <LayoutGrid />
                </Button>
                <Button
                  aria-label="List view"
                  aria-pressed={view === "list"}
                  onClick={() => setView("list")}
                  size="icon"
                  variant={view === "list" ? "secondary" : "ghost"}
                >
                  <List />
                </Button>
              </ButtonGroup>
              <Button asChild>
                <Link href={routes.projects.new}>
                  <PlusIcon data-icon="inline-start" />
                  New project
                </Link>
              </Button>
            </div>
          </section>

          {view === "card" ? (
            <section className="grid gap-4 md:grid-cols-3">
              {projects.map((project) => (
                <Link
                  className="group border border-border bg-card p-5 text-card-foreground transition-colors hover:bg-muted/40"
                  href={routes.projects.detail(project.slug)}
                  key={project.slug}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {project.location}
                      </p>
                      <h2 className="mt-2 text-xl font-semibold tracking-normal">
                        {project.name}
                      </h2>
                    </div>
                    <FolderKanban className="size-5 text-muted-foreground" />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {project.summary}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{project.phase}</Badge>
                      {formatProjectDeadline(project.deadline) ? (
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <CalendarDays className="size-3.5" />
                          {formatProjectDeadline(project.deadline)}
                        </span>
                      ) : null}
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </section>
          ) : (
            <section className="border border-border bg-card text-card-foreground">
              <div className="divide-y divide-border">
                {projects.map((project) => (
                  <Link
                    className="group grid gap-3 px-5 py-4 transition-colors hover:bg-muted/40 md:grid-cols-[1fr_10rem_8rem_8rem_auto] md:items-center"
                    href={routes.projects.detail(project.slug)}
                    key={project.slug}
                  >
                    <span className="font-medium group-hover:text-primary">
                      {project.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {project.location}
                    </span>
                    <Badge className="w-fit" variant="outline">
                      {project.phase}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {formatProjectDeadline(project.deadline) ?? "No deadline"}
                    </span>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 md:justify-self-end" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
