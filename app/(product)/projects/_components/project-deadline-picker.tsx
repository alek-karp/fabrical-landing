"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const parseDeadline = (value?: string) => {
  if (!value) {
    return undefined;
  }

  return new Date(`${value}T00:00:00`);
};

const toDeadlineValue = (date?: Date) => {
  if (!date) {
    return "";
  }

  return format(date, "yyyy-MM-dd");
};

type ProjectDeadlinePickerProps = {
  defaultValue?: string;
  id?: string;
  name?: string;
};

export const ProjectDeadlinePicker = ({
  defaultValue,
  id = "project-deadline",
  name = "deadline",
}: ProjectDeadlinePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(() =>
    parseDeadline(defaultValue),
  );

  return (
    <>
      <input name={name} type="hidden" value={toDeadlineValue(date)} />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
            data-empty={!date}
            id={id}
            type="button"
            variant="outline"
          >
            <CalendarIcon data-icon="inline-start" />
            {date ? format(date, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar mode="single" onSelect={setDate} selected={date} />
        </PopoverContent>
      </Popover>
    </>
  );
};
