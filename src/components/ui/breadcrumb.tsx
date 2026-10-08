import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function Breadcrumb({ children, className, ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="Breadcrumb" className={cn("flex min-w-0", className)} {...props}><ol className="flex min-w-0 flex-wrap items-center gap-1.5 text-sm">{children}</ol></nav>;
}

export function BreadcrumbItem({ href, current = false, children, className }: { href?: string; current?: boolean; children: ReactNode; className?: string }) {
  return <li className={cn("flex min-w-0 items-center gap-1.5", className)}>{href && !current ? <Link href={href} className="truncate text-muted-foreground hover:text-foreground">{children}</Link> : <span aria-current={current ? "page" : undefined} className={cn("truncate", current ? "font-medium" : "text-muted-foreground")}>{children}</span>}</li>;
}

export function BreadcrumbSeparator({ children }: { children?: ReactNode }) {
  return <li aria-hidden="true"><span className="inline-flex text-muted-foreground">{children ?? <ChevronRight className="size-4" />}</span></li>;
}
