import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { CreateProjectForm } from "../../_components/create-project-form";

export const NewProjectHome = () => (
  <AppShell title="New project" className="max-w-3xl gap-4">
    <div className="flex justify-end">
      <Button asChild size="sm" variant="outline">
        <Link href={routes.projects.list}>
          <ArrowLeftIcon data-icon="inline-start" />
          Projects
        </Link>
      </Button>
    </div>

    <CreateProjectForm />
  </AppShell>
);
