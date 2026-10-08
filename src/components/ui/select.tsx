import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  description?: string;
  error?: string;
  options?: SelectOption[];
  placeholder?: string;
  containerClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { id, name, label, description, error, options, placeholder, containerClassName, className, children, ...props },
  ref,
) {
  const selectId = id ?? name;
  const messageId = `${selectId ?? "select"}-message`;
  return (
    <div className={cn("grid gap-1.5", containerClassName)}>
      {label ? <label className="text-sm font-medium" htmlFor={selectId}>{label}</label> : null}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          name={name}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={description || error ? messageId : undefined}
          className={cn(
            "h-[var(--control-md)] w-full appearance-none rounded-[var(--app-radius)] border bg-card px-3 pr-10 text-sm text-card-foreground shadow-xs focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:bg-muted disabled:text-muted-foreground",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
            className,
          )}
          {...props}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options?.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      </div>
      {description || error ? (
        <p id={messageId} className={cn("text-xs text-muted-foreground", error && "text-destructive")}>
          {error ?? description}
        </p>
      ) : null}
    </div>
  );
});
