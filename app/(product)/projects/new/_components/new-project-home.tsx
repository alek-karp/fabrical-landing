import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { AppHeader, AppSidebar } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CreateProjectForm } from "../../_components/create-project-form";

export const NewProjectHome = () => (
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset className="min-h-svh bg-background text-foreground">
      <AppHeader title="New project" />

      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-6 md:px-10">
        <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-normal md:text-4xl">
              New project
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Create a project record for the portfolio.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/projects">
              <ArrowLeftIcon data-icon="inline-start" />
              Projects
            </Link>
          </Button>
        </section>

        <CreateProjectForm />
      </main>
    </SidebarInset>
  </SidebarProvider>
);
