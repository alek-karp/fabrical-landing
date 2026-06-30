"use client";

import { SaveIcon } from "lucide-react";

import type { Project } from "@/lib/projects";
import { updateProject } from "../_actions";
import { ProjectForm } from "./project-form";

type EditProjectFormProps = {
  project: Project;
};

export const EditProjectForm = ({ project }: EditProjectFormProps) => (
  <ProjectForm
    action={updateProject}
    defaultValues={{
      name: project.name,
      location: project.location,
      sector: project.sector,
      phase: project.phase,
      deadline: project.deadline ?? "",
      summary: project.summary,
      description: project.description,
    }}
    description="Update this project record in the portfolio."
    icon={SaveIcon}
    pendingLabel="Saving..."
    slug={project.slug}
    submitLabel="Save changes"
    title="Edit project"
  />
);
