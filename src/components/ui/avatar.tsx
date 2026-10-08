"use client";

import { forwardRef, useState, type HTMLAttributes, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { getInitials } from "@/lib/utils";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg" | "xl";
  src?: string;
  alt?: string;
  fallback?: string;
  status?: "online" | "offline" | "busy" | "away";
}

const statusClasses = {
  online: "bg-success",
  offline: "bg-muted-foreground",
  busy: "bg-destructive",
  away: "bg-warning",
} as const;

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { className, size = "md", src, alt, fallback, status, children, ...props },
  ref,
) {
  const [failed, setFailed] = useState(false);
  const sizeClass = { sm: "size-7 text-xs", md: "size-9 text-sm", lg: "size-12 text-base", xl: "size-16 text-lg" }[size];
  return (
    <span ref={ref} className={cn("relative inline-grid shrink-0 place-items-center overflow-visible rounded-full bg-muted font-medium text-muted-foreground", sizeClass, className)} {...props}>
      <span className="absolute inset-0 overflow-hidden rounded-full">
        {src && !failed ? (
          <img src={src} alt={alt ?? ""} className="size-full object-cover" onError={() => setFailed(true)} />
        ) : (
          children ?? getInitials(fallback ?? alt ?? "User")
        )}
      </span>
      {status ? <span className={cn("absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-card", statusClasses[status])} aria-label={status} /> : null}
    </span>
  );
});

export function AvatarImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img {...props} className={cn("size-full object-cover", props.className)} />;
}

export function AvatarFallback({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("grid size-full place-items-center bg-muted text-muted-foreground", className)} {...props} />;
}
