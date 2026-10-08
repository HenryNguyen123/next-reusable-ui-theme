"use client";

import { forwardRef, useState, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  showCount?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
  containerClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { id, name, label, description, error, success, showCount, maxLength, resize = "vertical", containerClassName, className, defaultValue, value, onChange, ...props },
  ref,
) {
  const initial = typeof value === "string" ? value : typeof defaultValue === "string" ? defaultValue : "";
  const [count, setCount] = useState(initial.length);
  const textareaId = id ?? name;
  const messageId = `${textareaId ?? "textarea"}-message`;
  const handleChange: NonNullable<TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"]> = (event) => {
    setCount(event.target.value.length);
    onChange?.(event);
  };

  return (
    <div className={cn("grid gap-1.5", containerClassName)}>
      {label ? <label htmlFor={textareaId} className="text-sm font-medium">{label}</label> : null}
      <textarea
        ref={ref}
        id={textareaId}
        name={name}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={description || error || success || showCount ? messageId : undefined}
        className={cn(
          "min-h-28 w-full rounded-[var(--app-radius)] border bg-card px-3 py-2.5 text-sm text-card-foreground shadow-xs transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:bg-muted disabled:text-muted-foreground",
          resize === "none" && "resize-none",
          resize === "horizontal" && "resize-x",
          resize === "vertical" && "resize-y",
          resize === "both" && "resize",
          error && "border-destructive focus:border-destructive focus:ring-destructive/20",
          success && !error && "border-success focus:border-success focus:ring-success/20",
          className,
        )}
        {...props}
      />
      {(description || error || success || showCount) ? (
        <div id={messageId} className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className={cn(error && "text-destructive", success && !error && "text-success")}>{error ?? success ?? description}</span>
          {showCount ? <span aria-live="polite">{count}{maxLength ? `/${maxLength}` : ""}</span> : null}
        </div>
      ) : null}
    </div>
  );
});
