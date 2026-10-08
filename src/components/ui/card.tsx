import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const cardVariants = cva("rounded-[var(--app-radius)] bg-card text-card-foreground", {
  variants: {
    variant: {
      default: "border shadow-xs",
      bordered: "border shadow-none",
      elevated: "border shadow-md",
      flat: "shadow-none",
      interactive: "border shadow-xs transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export function Card({ className, variant, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant }), className)} {...props} />;
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-1 border-b px-[var(--card-padding)] py-[var(--card-padding)]", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-base font-semibold tracking-tight", className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-[var(--card-padding)] py-[var(--card-padding)]", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col-reverse items-stretch gap-2 border-t px-[var(--card-padding)] py-[var(--card-padding)] sm:flex-row sm:items-center sm:justify-between", className)} {...props} />;
}

export { cardVariants };
