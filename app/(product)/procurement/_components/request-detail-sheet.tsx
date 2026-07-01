"use client";

import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  formatProcurementNeededBy,
  type ProcurementRequest,
} from "@/lib/procurement";
import { useTRPC } from "@/trpc/client";

import { addProcurementNoteAction } from "../_actions";
import { ProcurementStatusSelect } from "./procurement-status-select";

type RequestDetailSheetProps = {
  request: ProcurementRequest;
  projectName: string;
};

export const RequestDetailSheet = ({
  request,
  projectName,
}: RequestDetailSheetProps) => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [isPending, startTransition] = useTransition();
  const trpc = useTRPC();

  const {
    data: notes,
    isPending: notesPending,
    isError,
    error,
  } = useQuery({
    ...trpc.procurement.listNotes.queryOptions({ request_id: request.id }),
    enabled: open,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.message || "Unable to load the communication log.");
    }
  }, [isError, error]);

  const handleAddNote = () => {
    const trimmed = note.trim();

    if (!trimmed) {
      return;
    }

    startTransition(async () => {
      const result = await addProcurementNoteAction(request.id, trimmed);

      if (result.message) {
        toast.error(result.message);
        return;
      }

      setNote("");
    });
  };

  const neededBy = formatProcurementNeededBy(request.needed_by);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button size="sm" variant="outline">
          View
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-6 overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{request.item}</SheetTitle>
          <SheetDescription>{projectName}</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">
                Quantity
              </p>
              <p>{request.quantity}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">
                Needed by
              </p>
              <p>{neededBy ?? "Not set"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">
                Supplier
              </p>
              <p>{request.supplier || "Not set"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">
                Status
              </p>
              <ProcurementStatusSelect request={request} />
            </div>
          </div>
          {request.notes ? (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">
                Notes
              </p>
              <p className="text-sm">{request.notes}</p>
            </div>
          ) : null}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-muted-foreground uppercase">
              Supplier communication
            </p>
            <Textarea
              onChange={(event) => setNote(event.target.value)}
              placeholder="Called supplier, confirmed order, delivery moved to Friday..."
              value={note}
            />
            <Button
              className="self-start"
              disabled={isPending || !note.trim()}
              onClick={handleAddNote}
              size="sm"
            >
              {isPending ? "Saving..." : "Log update"}
            </Button>
            <ul className="flex flex-col gap-3">
              {notesPending ? (
                <li className="text-sm text-muted-foreground">
                  Loading log...
                </li>
              ) : null}
              {!notesPending && (!notes || notes.length === 0) ? (
                <li className="text-sm text-muted-foreground">
                  No communication logged yet.
                </li>
              ) : null}
              {notes?.map((entry) => (
                <li
                  className="border-border border-b pb-3 text-sm last:border-0"
                  key={entry.id}
                >
                  <p>{entry.note}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(entry.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
