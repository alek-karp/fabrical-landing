import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  MapPin,
  PackageCheck,
} from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AppHeader, AppSidebar } from "@/components/app-shell";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getProject, projects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project not found | Fabrical",
    };
  }

  return {
    title: `${project.name} | Fabrical Projects`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-svh bg-background text-foreground">
        <AppHeader title={project.name} />

        <main className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-6 md:px-10 lg:grid-cols-[1fr_22rem]">
          <section className="flex flex-col gap-6">
            <section className="border border-border bg-card p-5 text-card-foreground">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="w-fit border border-border px-2 py-1 text-xs font-semibold uppercase">
                      {project.phase}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-4" />
                      {project.location}
                    </span>
                  </div>
                  <h1 className="mt-5 text-3xl font-semibold tracking-normal md:text-4xl">
                    {project.name}
                  </h1>
                  <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
                    {project.description}
                  </p>
                </div>
                <PackageCheck className="size-6 text-primary" />
              </div>
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
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
