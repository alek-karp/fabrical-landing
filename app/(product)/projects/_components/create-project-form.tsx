"use client";

import { PlusIcon } from "lucide-react";

import { createProject } from "../_actions";
import { ProjectForm } from "./project-form";

export const CreateProjectForm = () => (
  <ProjectForm
    action={createProject}
    description="Add a live project record to the portfolio."
    icon={PlusIcon}
    pendingLabel="Creating..."
    submitLabel="Create project"
    title="Create project"
  />
);
