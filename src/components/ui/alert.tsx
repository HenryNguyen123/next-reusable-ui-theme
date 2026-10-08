import type { HTMLAttributes } from "react";
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/cn";

const variants = {
  info: { wrapper: "border-info/30 bg-info/10", icon: Info, iconClass: "text-info" },
  success: { wrapper: "border-success/30 bg-success/10", icon: CircleCheck, iconClass: "text-success" },
  warning: { wrapper: "border-warning/30 bg-warning/10", icon: TriangleAlert, iconClass: "text-warning" },
  error: { wrapper: "border-destructive/30 bg-destructive/10", icon: CircleAlert, iconClass: "text-destructive" },
} as const;

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variants;
  title?: string;
  description?: string;
}

export function Alert({ variant = "info", title, description, className, children, ...props }: AlertProps) {
  const config = variants[variant];
  const Icon = config.icon;
  return (
    <div role="alert" className={cn("flex gap-3 rounded-[var(--app-radius)] border p-4", config.wrapper, className)} {...props}>
      <Icon className={cn("mt-0.5 size-5 shrink-0", config.iconClass)} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        {title ? <p className="text-sm font-semibold">{title}</p> : null}
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
        {children}
      </div>
    </div>
  );
}
