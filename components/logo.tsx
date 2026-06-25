import { Radius } from "lucide-react";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Radius className="w-7 h-7 text-white" />
      {/* heading: 600, -0.4px */}
      <span className="text-white text-xl font-semibold tracking-[-0.4px]">
        Fabrical
      </span>
    </div>
  );
}
