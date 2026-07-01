import { z } from "zod";

export const PROCUREMENT_STATUSES = {
  Requested: "requested",
  Quoted: "quoted",
  Ordered: "ordered",
  Shipped: "shipped",
  Delivered: "delivered",
  Backordered: "backordered",
} as const;

export type ProcurementStatus =
  (typeof PROCUREMENT_STATUSES)[keyof typeof PROCUREMENT_STATUSES];

export const PROCUREMENT_STATUS_VALUES = Object.values(
  PROCUREMENT_STATUSES,
) as [ProcurementStatus, ...ProcurementStatus[]];

export const procurementStatusSchema = z.enum(PROCUREMENT_STATUS_VALUES);

export const DEFAULT_PROCUREMENT_STATUS: ProcurementStatus =
  PROCUREMENT_STATUSES.Requested;

export const PROCUREMENT_STATUS_ORDER: ProcurementStatus[] = [
  PROCUREMENT_STATUSES.Requested,
  PROCUREMENT_STATUSES.Quoted,
  PROCUREMENT_STATUSES.Ordered,
  PROCUREMENT_STATUSES.Shipped,
  PROCUREMENT_STATUSES.Delivered,
  PROCUREMENT_STATUSES.Backordered,
];

export const PROCUREMENT_STATUS_LABELS: Record<ProcurementStatus, string> = {
  requested: "Requested",
  quoted: "Quoted",
  ordered: "Ordered",
  shipped: "Shipped",
  delivered: "Delivered",
  backordered: "Missing/backordered",
};

export const isProcurementStatus = (
  value: string,
): value is ProcurementStatus =>
  PROCUREMENT_STATUS_VALUES.includes(value as ProcurementStatus);

export const resolveProcurementStatus = (value?: string): ProcurementStatus =>
  value && isProcurementStatus(value) ? value : DEFAULT_PROCUREMENT_STATUS;
