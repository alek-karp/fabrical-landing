"use client";

import type { LucideIcon } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { ProjectDeadlinePicker } from "./project-deadline-picker";
import { ProjectPhaseSelect } from "./project-phase-select";

export type ProjectFormState = {
  message: string;
};

export type ProjectFormValues = {
  name: string;
  location: string;
  sector: string;
  phase: string;
  deadline: string;
  summary: string;
  description: string;
};

type ProjectFormProps = {
  action: (
    state: ProjectFormState,
    formData: FormData,
  ) => Promise<ProjectFormState>;
  title: string;
  description: string;
  submitLabel: string;
  pendingLabel: string;
  icon: LucideIcon;
  slug?: string;
  defaultValues?: Partial<ProjectFormValues>;
};

export const ProjectForm = ({
  action,
  title,
  description,
  submitLabel,
  pendingLabel,
  icon: Icon,
  slug,
  defaultValues,
}: ProjectFormProps) => {
  const [state, formAction, pending] = useActionState(action, { message: "" });

  useEffect(() => {
    if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="border border-border bg-card text-card-foreground">
      <div className="flex items-start justify-between border-b border-border px-6 py-4">
        <div>
          <p className="font-medium">{title}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="p-6">
        <form action={formAction}>
          {slug ? <input name="slug" type="hidden" value={slug} /> : null}
          <FieldGroup className="gap-5">
            <Field>
              <FieldLabel htmlFor="project-name">Project name</FieldLabel>
              <Input
                defaultValue={defaultValues?.name}
                id="project-name"
                name="name"
                placeholder="North Terminal Upgrade"
                required
              />
            </Field>
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="project-location">Location</FieldLabel>
                <Input
                  defaultValue={defaultValues?.location}
                  id="project-location"
                  name="location"
                  placeholder="Seattle, WA"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="project-sector">Sector</FieldLabel>
                <Input
                  defaultValue={defaultValues?.sector}
                  id="project-sector"
                  name="sector"
                  placeholder="Infrastructure"
                  required
                />
              </Field>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="project-phase">Phase</FieldLabel>
                <ProjectPhaseSelect defaultValue={defaultValues?.phase} />
              </Field>
              <Field>
                <FieldLabel htmlFor="project-deadline">Deadline</FieldLabel>
                <ProjectDeadlinePicker defaultValue={defaultValues?.deadline} />
                <FieldDescription>Optional target completion date.</FieldDescription>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="project-summary">Summary</FieldLabel>
              <Textarea
                defaultValue={defaultValues?.summary}
                id="project-summary"
                name="summary"
                placeholder="A short portfolio summary for this project."
                required
              />
              <FieldDescription>
                Appears on project cards and in the portfolio table.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="project-description">Description</FieldLabel>
              <Textarea
                defaultValue={defaultValues?.description}
                id="project-description"
                name="description"
                placeholder="Optional longer project context."
              />
            </Field>
            <Field>
              <Button disabled={pending} type="submit">
                <Icon data-icon="inline-start" />
                {pending ? pendingLabel : submitLabel}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};
