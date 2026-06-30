import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AppHeader, AppSidebar } from "@/components/app-shell";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { projects } from "@/lib/projects";
import { caller } from "@/trpc/server";

import { ProjectDetail } from "./_components/project-detail";

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
  const project = await caller.projects.bySlug({ slug });

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
  const project = await caller.projects.bySlug({ slug });

  if (!project) {
    notFound();
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-svh bg-background text-foreground">
        <AppHeader title={project.name} />
        <ProjectDetail project={project} />
      </SidebarInset>
    </SidebarProvider>
  );
}
