"use client";

import { PlusIcon } from "lucide-react";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type CreateProjectState, createProject } from "../_actions";

const initialState: CreateProjectState = {
  message: "",
};

export const CreateProjectForm = () => {
  const [state, formAction, pending] = useActionState(
    createProject,
    initialState,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>
          Add a live project record to the portfolio.
        </CardDescription>
        <CardAction>
          <PlusIcon />
        </CardAction>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="project-name">Project name</FieldLabel>
              <Input
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
                  id="project-location"
                  name="location"
                  placeholder="Seattle, WA"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="project-sector">Sector</FieldLabel>
                <Input
                  id="project-sector"
                  name="sector"
                  placeholder="Infrastructure"
                  required
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="project-phase">Phase</FieldLabel>
              <Input id="project-phase" name="phase" placeholder="Planning" />
            </Field>
            <Field>
              <FieldLabel htmlFor="project-summary">Summary</FieldLabel>
              <Textarea
                id="project-summary"
                name="summary"
                placeholder="A short portfolio summary for this project."
                required
              />
              <FieldDescription>
                This appears on project cards and in the portfolio table.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="project-description">Description</FieldLabel>
              <Textarea
                id="project-description"
                name="description"
                placeholder="Optional longer project context."
              />
            </Field>
            {state.message ? <FieldError>{state.message}</FieldError> : null}
            <Field>
              <Button disabled={pending} type="submit">
                <PlusIcon data-icon="inline-start" />
                {pending ? "Creating..." : "Create project"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};
