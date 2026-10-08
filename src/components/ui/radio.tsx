import { forwardRef, type HTMLAttributes, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
}

export function RadioGroup({ label, error, className, children, ...props }: RadioGroupProps) {
  const messageId = `${props.id ?? "radio-group"}-message`;
  return (
    <fieldset className={cn("grid gap-3", className)} aria-invalid={Boolean(error) || undefined} aria-describedby={error ? messageId : undefined} {...props}>
      {label ? <legend className="text-sm font-medium">{label}</legend> : null}
      {children}
      {error ? <p id={messageId} className="text-xs text-destructive">{error}</p> : null}
    </fieldset>
  );
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  description?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { id, label, description, disabled, className, ...props },
  ref,
) {
  return (
    <label htmlFor={id} className={cn("flex cursor-pointer items-start gap-3", disabled && "cursor-not-allowed opacity-60")}>
      <span className="relative mt-1 grid size-4 place-items-center">
        <input
          ref={ref}
          id={id}
          type="radio"
          disabled={disabled}
          className={cn("peer size-4 appearance-none rounded-full border bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 checked:border-primary", className)}
          {...props}
        />
        <span className="pointer-events-none absolute size-2 rounded-full bg-primary opacity-0 transition-opacity peer-checked:opacity-100" />
      </span>
      {label || description ? (
        <span className="grid gap-0.5">
          {label ? <span className="text-sm font-medium leading-5">{label}</span> : null}
          {description ? <span className="text-xs text-muted-foreground">{description}</span> : null}
        </span>
      ) : null}
    </label>
  );
});
