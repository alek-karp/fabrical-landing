"use client";

import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { BotIcon } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ACTIVITY_ACTOR_TYPES,
  type ActivityActor,
  type ActivityEvent,
  type ActivityLog,
  type ActivityPerson,
} from "@/lib/activity";
import { formatProjectDeadline } from "@/lib/projects";
import { cn, getInitials } from "@/lib/utils";
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
    case "procurement.requested":
      return `requested material "${event.item}"`;
    case "procurement.status_changed":
      return `moved "${event.item}" from ${event.from} to ${event.to}`;
    case "transaction.flagged":
      return `flagged a transaction of $${event.amount.toLocaleString()}${event.reason ? ` — ${event.reason}` : ""}`;
  }
};

const ActorAvatar = ({ actor }: { actor: ActivityActor }) => {
  if (actor.type === ACTIVITY_ACTOR_TYPES.Agent) {
    return (
      <Avatar>
        <AvatarFallback className="bg-primary text-primary-foreground">
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

const CoauthorAvatar = ({ coauthor }: { coauthor: ActivityPerson }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Avatar>
        <AvatarImage
          alt={coauthor.name}
          src={coauthor.avatarUrl ?? undefined}
        />
        <AvatarFallback>{getInitials(coauthor.name)}</AvatarFallback>
      </Avatar>
    </TooltipTrigger>
    <TooltipContent>{coauthor.name}</TooltipContent>
  </Tooltip>
);

const TimelineEntry = ({ log }: { log: ActivityLog }) => (
  <li className="relative">
    <span className="-left-12 absolute flex size-8 items-center justify-center">
      {log.coauthors.length > 0 ? (
        <AvatarGroup>
          <ActorAvatar actor={log.actor} />
          {log.coauthors.map((coauthor) => (
            <CoauthorAvatar coauthor={coauthor} key={coauthor.id} />
          ))}
        </AvatarGroup>
      ) : (
        <ActorAvatar actor={log.actor} />
      )}
    </span>
    <div
      className={cn(
        "flex min-h-8 flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-4",
        log.coauthors.length > 0 && "ml-4",
      )}
    >
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
      <p
        className={cn(
          "mt-1 text-sm text-muted-foreground",
          log.coauthors.length > 0 && "ml-4",
        )}
      >
        {log.description}
      </p>
    ) : null}
    {log.coauthors.length > 0 ? (
      <p className="mt-1 ml-4 text-xs text-muted-foreground">
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
