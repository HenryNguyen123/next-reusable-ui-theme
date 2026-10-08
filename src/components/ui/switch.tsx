"use client";

import { useId, useState, type ButtonHTMLAttributes } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  loading?: boolean;
}

export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  label,
  description,
  loading = false,
  className,
  disabled,
  ...props
}: SwitchProps) {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
  const checked = controlledChecked ?? uncontrolledChecked;
  const descriptionId = useId();

  const toggle = () => {
    if (disabled || loading) return;
    const next = !checked;
    if (controlledChecked === undefined) setUncontrolledChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <div className="flex items-start justify-between gap-4">
      {label || description ? (
        <div className="grid gap-0.5">
          {label ? <span className="text-sm font-medium">{label}</span> : null}
          {description ? <span id={descriptionId} className="text-xs text-muted-foreground">{description}</span> : null}
        </div>
      ) : null}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-describedby={description ? descriptionId : undefined}
        disabled={disabled || loading}
        onClick={toggle}
        className={cn(
          "inline-flex h-6 w-11 shrink-0 items-center rounded-full border p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-50",
          checked ? "border-primary bg-primary" : "bg-muted",
          className,
        )}
        {...props}
      >
        <span className={cn("grid size-5 place-items-center rounded-full bg-white shadow-sm transition-transform", checked && "translate-x-5")}>
          {loading ? <LoaderCircle className="size-3 animate-spin text-muted-foreground" aria-hidden="true" /> : null}
        </span>
      </button>
    </div>
  );
}
