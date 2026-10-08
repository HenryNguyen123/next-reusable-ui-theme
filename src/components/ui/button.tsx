import { cva, type VariantProps } from "class-variance-authority";
import { cloneElement, isValidElement, type ButtonHTMLAttributes, type ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--app-radius)] text-sm font-medium transition-[background-color,color,border-color,box-shadow,transform] duration-150 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-[0.99]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:opacity-90",
        primary: "bg-primary text-primary-foreground shadow-xs hover:opacity-90",
        secondary: "bg-secondary text-secondary-foreground hover:opacity-85",
        outline: "border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:opacity-90",
        success: "bg-success text-success-foreground shadow-xs hover:opacity-90",
        warning: "bg-warning text-warning-foreground shadow-xs hover:brightness-95",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-[var(--control-xs)] rounded-[calc(var(--app-radius)*0.8)] px-2.5 text-xs",
        sm: "h-[var(--control-sm)] px-3",
        md: "h-[var(--control-md)] px-4",
        lg: "h-[var(--control-lg)] px-5",
        xl: "h-[var(--control-xl)] px-6 text-base",
        icon: "h-[var(--control-md)] w-[var(--control-md)] p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  loading = false,
  loadingText,
  leftIcon,
  rightIcon,
  asChild = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      className: cn(classes, (children.props as { className?: string }).className),
      "aria-disabled": disabled || loading || undefined,
      "aria-busy": loading || undefined,
    } as never);
  }

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : leftIcon}
      {loading && loadingText ? loadingText : children}
      {!loading ? rightIcon : null}
    </button>
  );
}

export { buttonVariants };
