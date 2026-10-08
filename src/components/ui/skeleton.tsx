import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-[calc(var(--app-radius)*0.75)] bg-muted", className)} {...props} />;
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("grid gap-2", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton key={index} className={cn("h-4", index === lines - 1 && "w-2/3")} />
      ))}
    </div>
  );
}
