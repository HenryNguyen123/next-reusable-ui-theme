import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    name,
    label,
    description,
    error,
    success,
    leftIcon,
    rightIcon,
    containerClassName,
    className,
    disabled,
    ...props
  },
  ref,
) {
  const inputId = id ?? name;
  const messageId = `${inputId ?? "input"}-message`;
  const describedBy = description || error || success ? messageId : props["aria-describedby"];
  const invalid = Boolean(error) || props["aria-invalid"];

  return (
    <div className={cn("grid gap-1.5", containerClassName)}>
      {label ? (
        <label htmlFor={inputId} className="text-sm font-medium">
          {label}
        </label>
      ) : null}
      <div className="relative">
        {leftIcon ? (
          <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-muted-foreground">
            {leftIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          name={name}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(
            "h-[var(--control-md)] w-full rounded-[var(--app-radius)] border bg-card px-3 text-sm text-card-foreground shadow-xs transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:bg-muted disabled:text-muted-foreground",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
            success && !error && "border-success focus:border-success focus:ring-success/20",
            className,
          )}
          {...props}
        />
        {rightIcon ? (
          <span className="absolute inset-y-0 right-3 grid place-items-center text-muted-foreground">
            {rightIcon}
          </span>
        ) : null}
      </div>
      {description || error || success ? (
        <p
          id={messageId}
          className={cn(
            "text-xs text-muted-foreground",
            error && "text-destructive",
            success && !error && "text-success",
          )}
        >
          {error ?? success ?? description}
        </p>
      ) : null}
    </div>
  );
});
