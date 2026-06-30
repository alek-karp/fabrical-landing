import { caller } from "@/trpc/server";
import { ProjectsHome } from "./_components/projects-home";

export default async function ProjectsPage() {
  const portfolioProjects = await caller.projects.list();

  return <ProjectsHome projects={portfolioProjects} />;
}
