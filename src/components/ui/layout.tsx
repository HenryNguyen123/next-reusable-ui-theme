import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, as: Comp = "div", children, ...props }: { as?: ElementType; className?: string; children: ReactNode } & Record<string, unknown>) {
  return <Comp className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props}>{children}</Comp>;
}

export function Stack({ gap = "md", className, children, ...props }: ComponentPropsWithoutRef<"div"> & { gap?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" }) {
  const gaps = { xs: "gap-1", sm: "gap-2", md: "gap-4", lg: "gap-6", xl: "gap-8", "2xl": "gap-12" };
  return <div className={cn("flex flex-col", gaps[gap], className)} {...props}>{children}</div>;
}

export function Flex({ gap = "md", align = "center", justify = "start", wrap = false, className, children, ...props }: ComponentPropsWithoutRef<"div"> & { gap?: "xs" | "sm" | "md" | "lg" | "xl"; align?: "start" | "center" | "end" | "stretch"; justify?: "start" | "center" | "between" | "end"; wrap?: boolean }) {
  const gaps = { xs: "gap-1", sm: "gap-2", md: "gap-4", lg: "gap-6", xl: "gap-8" };
  const aligns = { start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch" };
  const justifies = { start: "justify-start", center: "justify-center", between: "justify-between", end: "justify-end" };
  return <div className={cn("flex", gaps[gap], aligns[align], justifies[justify], wrap && "flex-wrap", className)} {...props}>{children}</div>;
}

export function Grid({ columns = "auto", className, children, ...props }: ComponentPropsWithoutRef<"div"> & { columns?: "auto" | "2" | "3" | "4" }) {
  const cols = { auto: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", "2": "grid-cols-1 sm:grid-cols-2", "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" };
  return <div className={cn("grid gap-4", cols[columns], className)} {...props}>{children}</div>;
}

export function Section({ className, children, ...props }: ComponentPropsWithoutRef<"section">) {
  return <section className={cn("py-[var(--section-y)]", className)} {...props}>{children}</section>;
}

export function Spacer({ size = "md" }: { size?: "xs" | "sm" | "md" | "lg" | "xl" }) {
  const sizes = { xs: "h-1", sm: "h-2", md: "h-4", lg: "h-8", xl: "h-12" };
  return <div aria-hidden="true" className={sizes[size]} />;
}
