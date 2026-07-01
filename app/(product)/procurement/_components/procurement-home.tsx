import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  computeProcurementAlerts,
  type ProcurementRequest,
} from "@/lib/procurement";
import type { Project } from "@/lib/projects";

import { CreateRequestDialog } from "./create-request-dialog";
import { ProcurementAlerts } from "./procurement-alerts";
import { ProcurementRequestList } from "./procurement-request-list";

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
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Procurement control</Badge>
        </div>
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-normal md:text-4xl">
              Material tracker
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Never lose track of a material order. See what has been requested,
              ordered, delayed, delivered, or is blocking a job.
            </p>
          </div>
          <CreateRequestDialog projects={projects} />
        </div>
      </section>

      {alerts.length > 0 ? (
        <ProcurementAlerts alerts={alerts} projectNameById={projectNameById} />
      ) : null}

      {requests.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            No material requests yet. Add one to start tracking it here.
          </CardContent>
        </Card>
      ) : (
        <Card className="py-0">
          <ProcurementRequestList
            projectNameById={projectNameById}
            requests={requests}
          />
        </Card>
      )}
    </AppShell>
  );
};
