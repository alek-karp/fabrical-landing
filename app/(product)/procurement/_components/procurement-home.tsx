import { AppShell } from "@/components/app-shell";
import {
  computeProcurementAlerts,
  type ProcurementRequest,
} from "@/lib/procurement";
import type { Project } from "@/lib/projects";

import { ProcurementAlerts } from "./procurement-alerts";
import { ProcurementSearch } from "./procurement-search";

type ProcurementHomeProps = {
  projects: Project[];
  requests: ProcurementRequest[];
};

export const ProcurementHome = ({
  projects,
  requests,
}: ProcurementHomeProps) => {
  const projectNameById = new Map(
    projects.map((project) => [project.slug, project.name]),
  );

  const alerts = computeProcurementAlerts(requests);

  return (
    <AppShell title="Procurement">
      <section className="flex flex-col gap-3">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-normal md:text-4xl">
              Material tracker
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Track material requests by status and job impact.
            </p>
          </div>
        </div>
      </section>

      {alerts.length > 0 ? (
        <ProcurementAlerts alerts={alerts} projectNameById={projectNameById} />
      ) : null}

      <ProcurementSearch projects={projects} requests={requests} />
    </AppShell>
  );
};
