"use client";

import { forwardRef, useEffect, useRef, type InputHTMLAttributes } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  error?: string;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { id, label, description, error, indeterminate = false, className, checked, ...props },
  forwardedRef,
) {
  const localRef = useRef<HTMLInputElement>(null);
  const setRef = (element: HTMLInputElement | null) => {
    localRef.current = element;
    if (typeof forwardedRef === "function") forwardedRef(element);
    else if (forwardedRef) forwardedRef.current = element;
  };

  useEffect(() => {
    if (localRef.current) localRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const messageId = `${id ?? "checkbox"}-message`;
  return (
    <label htmlFor={id} className={cn("flex cursor-pointer items-start gap-3", props.disabled && "cursor-not-allowed opacity-60")}>
      <span className="relative mt-0.5 grid size-4 shrink-0 place-items-center">
        <input
          ref={setRef}
          id={id}
          type="checkbox"
          checked={checked}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={description || error ? messageId : undefined}
          className={cn(
            "peer size-4 appearance-none rounded-[calc(var(--app-radius)*0.75)] border bg-card transition-colors checked:border-primary checked:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-50",
            error && "border-destructive",
            className,
          )}
          {...props}
        />
        <Check className="pointer-events-none absolute size-3 scale-0 stroke-3 text-primary-foreground transition-transform peer-checked:scale-100" aria-hidden="true" />
        <Minus className="pointer-events-none absolute size-3 stroke-3 text-primary-foreground transition-transform peer-indeterminate:scale-100" aria-hidden="true" />
      </span>
      {label || description || error ? (
        <span className="grid gap-0.5">
          {label ? <span className="text-sm font-medium leading-5">{label}</span> : null}
          {description || error ? (
            <span id={messageId} className={cn("text-xs text-muted-foreground", error && "text-destructive")}>
              {error ?? description}
            </span>
          ) : null}
        </span>
      ) : null}
    </label>
  );
});
