import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { AppHeader, AppSidebar } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Project } from "@/lib/projects";
import { EditProjectForm } from "../../../_components/edit-project-form";

type EditProjectHomeProps = {
  project: Project;
};

export const EditProjectHome = ({ project }: EditProjectHomeProps) => (
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset className="min-h-svh bg-background text-foreground">
      <AppHeader title={`Edit ${project.name}`} />

      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-6 md:px-10">
        <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-normal md:text-4xl">
              Edit project
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Update the portfolio record for {project.name}.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href={`/projects/${project.slug}`}>
              <ArrowLeftIcon data-icon="inline-start" />
              Back to project
            </Link>
          </Button>
        </section>

        <EditProjectForm project={project} />
      </main>
    </SidebarInset>
  </SidebarProvider>
);
