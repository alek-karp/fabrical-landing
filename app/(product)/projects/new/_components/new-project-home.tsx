import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { AppHeader, AppSidebar } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { routes } from "@/lib/routes";
import { CreateProjectForm } from "../../_components/create-project-form";

export const NewProjectHome = () => (
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset className="min-h-svh bg-background text-foreground">
      <AppHeader title="New project" />

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 py-6 md:px-10">
        <div className="flex justify-end">
          <Button asChild size="sm" variant="outline">
            <Link href={routes.projects.list}>
              <ArrowLeftIcon data-icon="inline-start" />
              Projects
            </Link>
          </Button>
        </div>

        <CreateProjectForm />
      </main>
    </SidebarInset>
  </SidebarProvider>
);
