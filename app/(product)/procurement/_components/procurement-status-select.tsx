"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PROCUREMENT_STATUS_LABELS,
  PROCUREMENT_STATUS_ORDER,
  type ProcurementRequest,
  resolveProcurementStatus,
} from "@/lib/procurement";

import { updateProcurementStatusAction } from "../_actions";

type ProcurementStatusSelectProps = {
  request: ProcurementRequest;
  className?: string;
};

export const ProcurementStatusSelect = ({
  request,
  className,
}: ProcurementStatusSelectProps) => {
  const [status, setStatus] = useState(request.status);
  const [isPending, startTransition] = useTransition();

  const handleValueChange = (value: string) => {
    const previousStatus = status;
    const nextStatus = resolveProcurementStatus(value);
    setStatus(nextStatus);

    startTransition(async () => {
      const result = await updateProcurementStatusAction(
        { ...request, status: previousStatus },
        nextStatus,
      );

      if (result.message) {
        setStatus(previousStatus);
        toast.error(result.message);
      }
    });
  };

  return (
    <Select
      disabled={isPending}
      onValueChange={handleValueChange}
      value={status}
    >
      <SelectTrigger
        aria-label="Material status"
        className={className}
        size="sm"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {PROCUREMENT_STATUS_ORDER.map((option) => (
            <SelectItem key={option} value={option}>
              {PROCUREMENT_STATUS_LABELS[option]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
