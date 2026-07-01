"use client";

import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { BotIcon } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ACTIVITY_ACTOR_TYPES,
  type ActivityActor,
  type ActivityEvent,
  type ActivityLog,
} from "@/lib/activity";
import { formatProjectDeadline } from "@/lib/projects";
import { getInitials } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";

type ProjectTimelineProps = {
  slug: string;
};

const describeEvent = (event: ActivityEvent): string => {
  switch (event.type) {
    case "project.created":
      return `created the project "${event.name}"`;
    case "project.phase_changed":
      return `moved the phase from ${event.from} to ${event.to}`;
    case "project.deadline_changed":
      return event.to
        ? `set the deadline to ${formatProjectDeadline(event.to)}`
        : "cleared the deadline";
    case "procurement.blocked":
      return event.reason
        ? `blocked procurement: ${event.reason}`
        : "blocked procurement";
    case "procurement.unblocked":
      return "unblocked procurement";
    case "transaction.flagged":
      return `flagged a transaction of $${event.amount.toLocaleString()}${event.reason ? ` — ${event.reason}` : ""}`;
  }
};

const ActorAvatar = ({ actor }: { actor: ActivityActor }) => {
  if (actor.type === ACTIVITY_ACTOR_TYPES.Agent) {
    return (
      <Avatar>
        <AvatarFallback>
          <BotIcon className="size-4" />
        </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar>
      <AvatarImage alt={actor.name} src={actor.avatarUrl ?? undefined} />
      <AvatarFallback>{getInitials(actor.name)}</AvatarFallback>
    </Avatar>
  );
};

const TimelineEntry = ({ log }: { log: ActivityLog }) => (
  <li className="relative">
    <span className="absolute -left-[2.85rem] flex size-8 items-center justify-center">
      <ActorAvatar actor={log.actor} />
    </span>
    <div className="flex min-h-8 flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-4">
      <p className="text-sm">
        <span className="font-medium">{log.actor.name}</span>{" "}
        <span className="text-muted-foreground">
          {describeEvent(log.event)}
        </span>
      </p>
      <span className="shrink-0 text-xs text-muted-foreground">
        {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
      </span>
    </div>
    {log.description ? (
      <p className="mt-1 text-sm text-muted-foreground">{log.description}</p>
    ) : null}
    {log.coauthors.length > 0 ? (
      <p className="mt-1 text-xs text-muted-foreground">
        Co-authored by{" "}
        {log.coauthors.map((coauthor) => coauthor.name).join(", ")}
      </p>
    ) : null}
  </li>
);

export const ProjectTimeline = ({ slug }: ProjectTimelineProps) => {
  const trpc = useTRPC();
  const {
    data: logs,
    isPending,
    isError,
    error,
  } = useQuery(trpc.activity.list.queryOptions({ project_id: slug }));

  useEffect(() => {
    if (isError) {
      toast.error(error.message || "Unable to load the project timeline.");
    }
  }, [isError, error]);

  if (isPending) {
    return (
      <section className="border border-border bg-card p-5 text-card-foreground md:p-8">
        <p className="text-sm text-muted-foreground">Loading timeline...</p>
      </section>
    );
  }

  if (!logs || logs.length === 0) {
    return (
      <section className="border border-border bg-card p-5 text-card-foreground md:p-8">
        <p className="text-sm text-muted-foreground">
          No activity recorded yet.
        </p>
      </section>
    );
  }

  return (
    <section className="border border-border bg-card p-5 text-card-foreground md:p-8">
      <ol className="relative flex flex-col gap-8 border-l border-border pl-8">
        {logs.map((log) => (
          <TimelineEntry key={log.id} log={log} />
        ))}
      </ol>
    </section>
  );
};
