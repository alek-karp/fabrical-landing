"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Project } from "@/lib/projects";
import { PROJECT_PHASES, resolveProjectPhase } from "@/lib/projects";

import { updateProjectStage } from "../../_actions";

type ProjectStageControlProps = {
  project: Project;
};

export const ProjectStageControl = ({ project }: ProjectStageControlProps) => {
  const [phase, setPhase] = useState(() => resolveProjectPhase(project.phase));
  const [isPending, startTransition] = useTransition();

  const handleValueChange = (value: string) => {
    const previousPhase = phase;
    const nextPhase = resolveProjectPhase(value);
    setPhase(nextPhase);

    startTransition(async () => {
      const result = await updateProjectStage(
        project.slug,
        previousPhase,
        nextPhase,
        {
          name: project.name,
          location: project.location,
          sector: project.sector,
          deadline: project.deadline,
          summary: project.summary,
          description: project.description,
        },
      );

      if (result.message) {
        setPhase(previousPhase);
        toast.error(result.message);
      }
    });
  };

  return (
    <Select
      disabled={isPending}
      onValueChange={handleValueChange}
      value={phase}
    >
      <SelectTrigger
        aria-label="Project stage"
        className="h-fit border-border px-2 py-1 text-xs font-semibold uppercase"
        size="sm"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {PROJECT_PHASES.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
