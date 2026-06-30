import {
  ArrowRight,
  CheckCircle2,
  FolderKanban,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";

import { AppHeader, AppSidebar } from "@/components/app-shell";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-svh bg-background text-foreground">
        <AppHeader title="Projects" />

        <main className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-6 md:px-10">
          <section className="grid gap-4 md:grid-cols-3">
            {projects.map((project) => (
              <Link
                className="group border border-border bg-card p-5 text-card-foreground transition-colors hover:bg-muted/40"
                href={`/projects/${project.slug}`}
                key={project.slug}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {project.location}
                    </p>
                    <h1 className="mt-2 text-xl font-semibold tracking-normal">
                      {project.name}
                    </h1>
                  </div>
                  <FolderKanban className="size-5 text-muted-foreground" />
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {project.summary}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <span className="w-fit border border-border px-2 py-1 text-xs font-semibold uppercase">
                    {project.phase}
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </section>

          <section className="border border-border bg-card text-card-foreground">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold tracking-normal">
                  Project readiness
                </h2>
                <p className="text-sm text-muted-foreground">
                  Active mocked projects from the sidebar
                </p>
              </div>
              <CheckCircle2 className="size-5 text-primary" />
            </div>
            <div className="divide-y divide-border">
              {projects.map((project) => (
                <div
                  className="grid gap-3 px-5 py-4 md:grid-cols-[1fr_10rem_8rem_5rem] md:items-center"
                  key={project.slug}
                >
                  <Link
                    className="font-medium hover:text-primary"
                    href={`/projects/${project.slug}`}
                  >
                    {project.name}
                  </Link>
                  <span className="text-sm text-muted-foreground">
                    {project.sector}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {project.phase}
                  </span>
                  <span className="text-right font-semibold">
                    {project.stats[0]?.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="border border-border bg-card p-5 text-card-foreground">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold tracking-normal">
                Portfolio risk
              </h2>
              <TriangleAlert className="size-5 text-primary" />
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
              Mocked project data is shared between the sidebar, the project
              index, and each project detail page so the navigation reflects the
              same portfolio.
            </p>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
