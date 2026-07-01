import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { isProjectComplete } from "@/lib/projects";
import { cn } from "@/lib/utils";

export const completedPhaseBadgeClassName =
  "border-green-600/30 bg-green-600/10 text-green-700 dark:border-green-400/30 dark:bg-green-400/10 dark:text-green-400";

type ProjectPhaseBadgeProps = {
  phase: string;
  className?: string;
};

export const ProjectPhaseBadge = ({
  phase,
  className,
}: ProjectPhaseBadgeProps) => {
  const complete = isProjectComplete(phase);

  return (
    <Badge
      className={cn(complete && completedPhaseBadgeClassName, className)}
      variant="outline"
    >
      {complete ? <CheckCircle2 data-icon="inline-start" /> : null}
      {phase}
    </Badge>
  );
};
