"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { updateWorkspaceName } from "../_actions";

type WorkspaceNameFieldProps = {
  name: string;
};

export const WorkspaceNameField = ({ name }: WorkspaceNameFieldProps) => {
  const router = useRouter();
  const [value, setValue] = useState(name);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateWorkspaceName(value);

      if (result.message) {
        setValue(name);
        toast.error(result.message);
        return;
      }

      router.refresh();
    });
  };

  return (
    <Field orientation="horizontal">
      <FieldLabel htmlFor="workspace-name">Workspace name</FieldLabel>
      <div className="flex flex-1 items-center gap-2">
        <Input
          id="workspace-name"
          disabled={isPending}
          onChange={(event) => setValue(event.target.value)}
          value={value}
        />
        <Button
          disabled={isPending || value.trim() === name}
          onClick={handleSave}
          size="sm"
          variant="outline"
        >
          Save
        </Button>
      </div>
    </Field>
  );
};
