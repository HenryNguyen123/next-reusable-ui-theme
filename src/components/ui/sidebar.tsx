"use client";

import { createContext, useContext, useState, type HTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { ChevronDown, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { cn } from "@/lib/cn";
import type { SidebarVariant } from "@/types/theme";

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("Sidebar subcomponents must be used inside <Sidebar>. ");
  return context;
}

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  variant?: SidebarVariant;
  width?: "sm" | "md" | "lg";
}

export function Sidebar({
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  mobileOpen: controlledMobileOpen,
  onMobileOpenChange,
  variant = "default",
  width = "md",
  className,
  children,
  ...props
}: SidebarProps) {
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(defaultCollapsed);
  const [uncontrolledMobileOpen, setUncontrolledMobileOpen] = useState(false);
  const collapsed = controlledCollapsed ?? uncontrolledCollapsed;
  const mobileOpen = controlledMobileOpen ?? uncontrolledMobileOpen;
  const setCollapsed = (value: boolean) => {
    if (controlledCollapsed === undefined) setUncontrolledCollapsed(value);
    onCollapsedChange?.(value);
  };
  const setMobileOpen = (value: boolean) => {
    if (controlledMobileOpen === undefined) setUncontrolledMobileOpen(value);
    onMobileOpenChange?.(value);
  };

  const widths = { sm: "w-56", md: "w-64", lg: "w-72" };
  const styles: Record<SidebarVariant, string> = {
    default: "border-r bg-card",
    bordered: "border-r bg-background",
    floating: "m-3 rounded-[var(--app-radius)] border bg-card shadow-sm",
    compact: "border-r bg-card",
  };

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}>
      <>
        {mobileOpen ? <button aria-label="Close sidebar" className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setMobileOpen(false)} /> : null}
        <aside
          className={cn(
            "z-50 flex shrink-0 flex-col transition-[width,transform] duration-200 md:relative md:translate-x-0",
            styles[variant],
            collapsed ? "w-16" : widths[width],
            mobileOpen ? "fixed inset-y-0 left-0 translate-x-0" : "fixed -translate-x-full md:sticky md:top-0 md:h-screen md:translate-x-0",
            className,
          )}
          aria-label="Sidebar navigation"
          data-collapsed={collapsed}
          {...props}
        >
          {children}
        </aside>
      </>
    </SidebarContext.Provider>
  );
}

export function SidebarHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex min-h-[calc(4rem*var(--density-scale))] items-center justify-between gap-2 px-3", className)} {...props}>{children}</div>;
}

export function SidebarContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("min-h-0 flex-1 overflow-y-auto px-2 py-3", className)} {...props} />;
}

export function SidebarFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-t p-2", className)} {...props} />;
}

export function SidebarGroup({ label, className, children, ...props }: HTMLAttributes<HTMLDivElement> & { label?: string }) {
  const { collapsed } = useSidebarContext();
  return (
    <section className={cn("mb-5", className)} {...props}>
      {label && !collapsed ? <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</p> : null}
      {children}
    </section>
  );
}

export function SidebarItem({ href, active = false, icon, badge, expandable = false, defaultExpanded = false, children, className, ...props }: ComponentProps<typeof Link> & { href: string; active?: boolean; icon?: ReactNode; badge?: ReactNode; expandable?: boolean; defaultExpanded?: boolean }) {
  const { collapsed } = useSidebarContext();
  const [expanded, setExpanded] = useState(defaultExpanded);
  if (expandable) {
    return (
      <div className="mb-0.5">
        <button type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)} className={cn("flex w-full items-center gap-3 rounded-[calc(var(--app-radius)*0.8)] px-2.5 py-[calc(0.5rem*var(--density-scale))] text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground", active && "bg-accent text-foreground")}>
          <span className="grid size-5 shrink-0 place-items-center">{icon}</span>
          {!collapsed ? <span className="min-w-0 flex-1 text-left">{children}</span> : null}
          {!collapsed ? <ChevronDown className={cn("size-4 transition-transform", expanded && "rotate-180")} aria-hidden="true" /> : null}
        </button>
      </div>
    );
  }
  return (
    <Link href={href} aria-current={active ? "page" : undefined} title={collapsed && typeof children === "string" ? children : undefined} className={cn("mb-0.5 flex items-center gap-3 rounded-[calc(var(--app-radius)*0.8)] px-2.5 py-[calc(0.5rem*var(--density-scale))] text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground", active && "bg-accent text-foreground", className)} {...props}>
      <span className="grid size-5 shrink-0 place-items-center">{icon}</span>
      {!collapsed ? <span className="min-w-0 flex-1 truncate">{children}</span> : null}
      {!collapsed && badge ? badge : null}
    </Link>
  );
}

export function SidebarSeparator({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("my-2 h-px bg-border", className)} {...props} />;
}

export function SidebarToggle({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { collapsed, setCollapsed } = useSidebarContext();
  return (
    <button type="button" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} className={cn("inline-grid size-9 place-items-center rounded-[var(--app-radius)] text-muted-foreground hover:bg-accent hover:text-accent-foreground", className)} {...props}>
      {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
    </button>
  );
}

export function SidebarMobileTrigger({ onOpen, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { onOpen: () => void }) {
  return <button type="button" onClick={onOpen} aria-label="Open sidebar" className={cn("inline-grid size-9 place-items-center rounded-[var(--app-radius)] hover:bg-accent md:hidden", className)} {...props}><PanelLeftOpen className="size-4" /></button>;
}

export function SidebarMobileClose({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setMobileOpen } = useSidebarContext();
  return (
    <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close sidebar" className={cn("inline-grid size-9 place-items-center rounded-[var(--app-radius)] md:hidden", className)} {...props}>
      <X className="size-4" />
    </button>
  );
}
