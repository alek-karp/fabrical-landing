"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Project } from "@/lib/projects";

type ProcurementProjectSelectProps = {
  projects: Project[];
  id?: string;
  name?: string;
};

export const ProcurementProjectSelect = ({
  projects,
  id = "request-project",
  name = "project_id",
}: ProcurementProjectSelectProps) => {
  const [projectId, setProjectId] = useState(projects[0]?.slug ?? "");

  return (
    <>
      <input name={name} type="hidden" value={projectId} />
      <Select onValueChange={setProjectId} value={projectId}>
        <SelectTrigger className="w-full" id={id}>
          <SelectValue placeholder="Select a job" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {projects.map((project) => (
              <SelectItem key={project.slug} value={project.slug}>
                {project.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
