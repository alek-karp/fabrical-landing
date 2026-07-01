"use client";

import { PackageCheckIcon } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Project } from "@/lib/projects";

import { createProcurementRequestAction } from "../_actions";
import { ProcurementDatePicker } from "./procurement-date-picker";
import { ProcurementProjectSelect } from "./procurement-project-select";

type CreateRequestDialogProps = {
  projects: Project[];
};

export const CreateRequestDialog = ({ projects }: CreateRequestDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await createProcurementRequestAction(
        { message: "" },
        formData,
      );

      if (result.message) {
        toast.error(result.message);
        return;
      }

      formRef.current?.reset();
      setOpen(false);
    });
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>
          Add material request
          <PackageCheckIcon data-icon="inline-end" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add material request</DialogTitle>
          <DialogDescription>
            Track a new material need against install dates.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <FieldGroup className="gap-5">
            <Field>
              <FieldLabel htmlFor="request-project">Job</FieldLabel>
              <ProcurementProjectSelect
                id="request-project"
                projects={projects}
              />
            </Field>
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="request-item">Item</FieldLabel>
                <Input
                  id="request-item"
                  name="item"
                  placeholder="3/4 inch EMT conduit"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="request-quantity">Quantity</FieldLabel>
                <Input
                  id="request-quantity"
                  name="quantity"
                  placeholder="500 ft"
                  required
                />
              </Field>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="request-needed-by">Needed by</FieldLabel>
                <ProcurementDatePicker id="request-needed-by" />
                <FieldDescription>
                  Optional install-critical date.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="request-supplier">Supplier</FieldLabel>
                <Input
                  id="request-supplier"
                  name="supplier"
                  placeholder="Gescan"
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="request-notes">Notes</FieldLabel>
              <Textarea
                id="request-notes"
                name="notes"
                placeholder="Needed for second-floor rough-in"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button disabled={isPending} type="submit">
              {isPending ? "Adding..." : "Add request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
