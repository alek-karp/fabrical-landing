"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  formatProcurementNeededBy,
  PROCUREMENT_STATUS_LABELS,
  type ProcurementRequest,
} from "@/lib/procurement";
import type { Project } from "@/lib/projects";

import { CreateRequestDialog } from "./create-request-dialog";
import { ProcurementRequestList } from "./procurement-request-list";

type ProcurementSearchProps = {
  projects: Project[];
  requests: ProcurementRequest[];
};

const getSearchableRequestText = (
  request: ProcurementRequest,
  projectName: string,
) =>
  [
    request.item,
    projectName,
    request.project_id,
    request.quantity,
    formatProcurementNeededBy(request.needed_by),
    request.supplier,
    PROCUREMENT_STATUS_LABELS[request.status],
    request.status,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

export const ProcurementSearch = ({
  projects,
  requests,
}: ProcurementSearchProps) => {
  const [query, setQuery] = useState("");

  const projectNameById = useMemo(
    () => new Map(projects.map((project) => [project.slug, project.name])),
    [projects],
  );

  const filteredRequests = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return requests;
    }

    return requests.filter((request) => {
      const projectName =
        projectNameById.get(request.project_id) ?? request.project_id;

      return getSearchableRequestText(request, projectName).includes(
        normalizedQuery,
      );
    });
  }, [projectNameById, query, requests]);

  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          No material requests yet. Add one to start tracking it here.
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative md:max-w-sm md:flex-1">
          <Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-4 text-muted-foreground" />
          <Input
            aria-label="Search material requests"
            className="pl-9"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search requests"
            value={query}
          />
        </div>
        <CreateRequestDialog projects={projects} />
      </div>

      {filteredRequests.length > 0 ? (
        <Card className="py-0">
          <ProcurementRequestList
            projectNameById={projectNameById}
            requests={filteredRequests}
          />
        </Card>
      ) : (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            No material requests match your search.
          </CardContent>
        </Card>
      )}
    </>
  );
};
