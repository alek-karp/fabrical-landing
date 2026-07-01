"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { Project } from "@/lib/projects";
import { resolveProjectPhase } from "@/lib/projects";
import { routes } from "@/lib/routes";
import { caller } from "@/trpc/server";

export type CreateProjectState = {
  message: string;
};

const requiredFields = ["name", "location", "sector", "summary"] as const;

const getValue = (formData: FormData, key: string) => {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

const getDeadline = (formData: FormData) => {
  const value = getValue(formData, "deadline");

  return value || null;
};

export const createProject = async (
  _state: CreateProjectState,
  formData: FormData,
): Promise<CreateProjectState> => {
  const values = {
    name: getValue(formData, "name"),
    location: getValue(formData, "location"),
    sector: getValue(formData, "sector"),
    phase: resolveProjectPhase(getValue(formData, "phase")),
    deadline: getDeadline(formData),
    summary: getValue(formData, "summary"),
    description: getValue(formData, "description"),
  };

  const missingField = requiredFields.find((field) => !values[field]);

  if (missingField) {
    return {
      message: "Name, location, sector, and summary are required.",
    };
  }

  let project: Project;

  try {
    project = await caller.projects.create({
      ...values,
      description: values.description || values.summary,
    });
  } catch (error) {
    return {
      message:
        error instanceof Error
          ? error.message
          : "Unable to create the project.",
    };
  }

  revalidatePath(routes.projects.list);
  revalidatePath(routes.projects.detail(project.slug));
  redirect(routes.projects.detail(project.slug));
};

export const updateProject = async (
  _state: CreateProjectState,
  formData: FormData,
): Promise<CreateProjectState> => {
  const slug = getValue(formData, "slug");
  const values = {
    name: getValue(formData, "name"),
    location: getValue(formData, "location"),
    sector: getValue(formData, "sector"),
    phase: resolveProjectPhase(getValue(formData, "phase")),
    deadline: getDeadline(formData),
    summary: getValue(formData, "summary"),
    description: getValue(formData, "description"),
  };

  if (!slug) {
    return {
      message: "Unable to identify the project to update.",
    };
  }

  const missingField = requiredFields.find((field) => !values[field]);

  if (missingField) {
    return {
      message: "Name, location, sector, and summary are required.",
    };
  }

  let project: Project;

  try {
    project = await caller.projects.update({
      slug,
      ...values,
      description: values.description || values.summary,
    });
  } catch (error) {
    return {
      message:
        error instanceof Error
          ? error.message
          : "Unable to update the project.",
    };
  }

  revalidatePath(routes.projects.list);
  revalidatePath(routes.projects.detail(project.slug));
  revalidatePath(routes.projects.edit(project.slug));
  redirect(routes.projects.detail(project.slug));
};

export type UpdateProjectStageState = {
  message: string;
};

export const updateProjectStage = async (
  slug: string,
  phase: string,
  project: Pick<
    Project,
    "name" | "location" | "sector" | "deadline" | "summary" | "description"
  >,
): Promise<UpdateProjectStageState> => {
  try {
    await caller.projects.update({
      slug,
      name: project.name,
      location: project.location,
      sector: project.sector,
      phase: resolveProjectPhase(phase),
      deadline: project.deadline,
      summary: project.summary,
      description: project.description,
    });
  } catch (error) {
    return {
      message:
        error instanceof Error
          ? error.message
          : "Unable to update the project stage.",
    };
  }

  revalidatePath(routes.projects.list);
  revalidatePath(routes.projects.detail(slug));
  return { message: "" };
};
