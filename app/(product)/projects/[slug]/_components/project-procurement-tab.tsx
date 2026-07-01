"use client";

import { PackageCheckIcon } from "lucide-react";

import type { ProcurementRequest } from "@/lib/procurement";
import type { Project } from "@/lib/projects";

import { CreateRequestDialog } from "../../../procurement/_components/create-request-dialog";
import { ProcurementRequestList } from "../../../procurement/_components/procurement-request-list";

type ProjectProcurementTabProps = {
  project: Project;
  requests: ProcurementRequest[];
};

export const ProjectProcurementTab = ({
  project,
  requests,
}: ProjectProcurementTabProps) => {
  const projectNameById = new Map([[project.slug, project.name]]);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-lg font-semibold tracking-normal">
            Material orders
          </h2>
          <p className="text-sm text-muted-foreground">
            Orders and supplier updates linked to this project.
          </p>
        </div>
        <CreateRequestDialog fixedProject={project} projects={[project]} />
      </div>

      {requests.length === 0 ? (
        <div className="border border-border bg-card p-8 text-center text-card-foreground">
          <PackageCheckIcon className="mx-auto size-6 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            No material orders have been added for this project.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-border bg-card text-card-foreground">
          <ProcurementRequestList
            projectNameById={projectNameById}
            requests={requests}
          />
        </div>
      )}
    </section>
  );
};
