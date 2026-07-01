import { AlertTriangleIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ProcurementAlert } from "@/lib/procurement";

type ProcurementAlertsProps = {
  alerts: ProcurementAlert[];
  projectNameById: Map<string, string>;
};

export const ProcurementAlerts = ({
  alerts,
  projectNameById,
}: ProcurementAlertsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Delivery risk</CardTitle>
      <CardDescription>Requests most likely to block a crew</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col gap-3">
      {alerts.map((alert) => (
        <div
          className="flex items-start gap-3"
          key={`${alert.request.id}-${alert.message}`}
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
            <AlertTriangleIcon className="size-4" />
          </div>
          <div>
            <p className="text-sm font-medium leading-5">
              {alert.request.item} —{" "}
              {projectNameById.get(alert.request.project_id) ??
                alert.request.project_id}
            </p>
            <p className="text-sm text-muted-foreground">{alert.message}</p>
          </div>
          <Badge
            className="ml-auto"
            variant={alert.severity === "critical" ? "destructive" : "outline"}
          >
            {alert.severity === "critical" ? "Critical" : "Warning"}
          </Badge>
        </div>
      ))}
    </CardContent>
  </Card>
);
