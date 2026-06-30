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
import { PROJECT_PHASES, resolveProjectPhase } from "@/lib/projects";

type ProjectPhaseSelectProps = {
  defaultValue?: string;
  id?: string;
  name?: string;
};

export const ProjectPhaseSelect = ({
  defaultValue,
  id = "project-phase",
  name = "phase",
}: ProjectPhaseSelectProps) => {
  const [phase, setPhase] = useState(() => resolveProjectPhase(defaultValue));

  return (
    <>
      <input name={name} type="hidden" value={phase} />
      <Select
        onValueChange={(value) => setPhase(resolveProjectPhase(value))}
        value={phase}
      >
        <SelectTrigger className="w-full" id={id}>
          <SelectValue placeholder="Select phase" />
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
    </>
  );
};
