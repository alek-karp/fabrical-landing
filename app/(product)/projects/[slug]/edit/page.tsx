import { notFound } from "next/navigation";

import { caller } from "@/trpc/server";
import { EditProjectHome } from "./_components/edit-project-home";

type EditProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { slug } = await params;
  const project = await caller.projects.bySlug({ slug });

  if (!project) {
    notFound();
  }

  return <EditProjectHome project={project} />;
}
