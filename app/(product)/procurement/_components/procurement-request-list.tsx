import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatProcurementNeededBy,
  type ProcurementRequest,
} from "@/lib/procurement";

import { ProcurementStatusSelect } from "./procurement-status-select";
import { RequestDetailSheet } from "./request-detail-sheet";

type ProcurementRequestListProps = {
  requests: ProcurementRequest[];
  projectNameById: Map<string, string>;
};

export const ProcurementRequestList = ({
  requests,
  projectNameById,
}: ProcurementRequestListProps) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Item</TableHead>
        <TableHead>Job</TableHead>
        <TableHead>Quantity</TableHead>
        <TableHead>Needed by</TableHead>
        <TableHead>Supplier</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {requests.map((request) => (
        <TableRow key={request.id}>
          <TableCell className="font-medium">{request.item}</TableCell>
          <TableCell className="text-muted-foreground">
            {projectNameById.get(request.project_id) ?? request.project_id}
          </TableCell>
          <TableCell>{request.quantity}</TableCell>
          <TableCell>
            {formatProcurementNeededBy(request.needed_by) ?? "Not set"}
          </TableCell>
          <TableCell>{request.supplier || "Not set"}</TableCell>
          <TableCell>
            <ProcurementStatusSelect className="w-44" request={request} />
          </TableCell>
          <TableCell className="text-right">
            <RequestDetailSheet
              projectName={
                projectNameById.get(request.project_id) ?? request.project_id
              }
              request={request}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
