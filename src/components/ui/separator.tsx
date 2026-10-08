import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Separator({ orientation = "horizontal", className, ...props }: HTMLAttributes<HTMLDivElement> & { orientation?: "horizontal" | "vertical" }) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(orientation === "horizontal" ? "h-px w-full" : "h-full w-px", "shrink-0 bg-border", className)}
      {...props}
    />
  );
}
