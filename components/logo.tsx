import { Radius } from "lucide-react";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Radius className="w-7 h-7 text-white" />
      <span className="font-heading text-xl font-semibold tracking-[-0.4px] text-white">
        Fabrical
      </span>
    </div>
  );
}
