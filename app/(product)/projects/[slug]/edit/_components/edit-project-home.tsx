import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/projects";
import { routes } from "@/lib/routes";
import { EditProjectForm } from "../../../_components/edit-project-form";

type EditProjectHomeProps = {
  project: Project;
};

export const EditProjectHome = ({ project }: EditProjectHomeProps) => (
  <AppShell title={`Edit ${project.name}`} className="max-w-4xl">
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
        <Link href={routes.projects.detail(project.slug)}>
          <ArrowLeftIcon data-icon="inline-start" />
          Back to project
        </Link>
      </Button>
    </section>

    <EditProjectForm project={project} />
  </AppShell>
);
