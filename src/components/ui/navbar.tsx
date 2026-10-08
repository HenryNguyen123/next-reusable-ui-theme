"use client";

import { createContext, useContext, useState, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import type { NavbarVariant } from "@/types/theme";

const NavbarContext = createContext<{ mobileOpen: boolean; setMobileOpen: (open: boolean) => void } | null>(null);

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  variant?: NavbarVariant;
}

export function Navbar({ variant = "solid", className, children, ...props }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const styles: Record<NavbarVariant, string> = {
    transparent: "bg-transparent",
    solid: "border-b bg-card/90 backdrop-blur",
    bordered: "border-b bg-background",
    floating: "mt-3 mx-3 rounded-[var(--app-radius)] border bg-card/90 shadow-sm backdrop-blur sm:mx-6",
  };
  return (
    <NavbarContext.Provider value={{ mobileOpen, setMobileOpen }}>
      <header className={cn("sticky top-0 z-30", styles[variant], className)} {...props}>
        <div className="mx-auto flex min-h-[calc(4rem*var(--density-scale))] max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">{children}</div>
      </header>
    </NavbarContext.Provider>
  );
}

export function NavbarLogo({ href = "/", className, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string }) {
  return (
    <Link href={href} className={cn("inline-flex shrink-0 items-center gap-2 font-semibold tracking-tight", className)} {...props}>
      <span className="grid size-8 place-items-center rounded-[calc(var(--app-radius)*0.8)] bg-primary text-primary-foreground">N</span>
      {children ?? <span>Next Theme</span>}
    </Link>
  );
}

export function NavbarMenu({ className, children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <nav aria-label="Primary navigation" className={cn("hidden items-center gap-[var(--nav-gap)] md:flex", className)} {...props}>
      {children}
    </nav>
  );
}

export function NavbarItem({ href, active = false, className, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; active?: boolean }) {
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={cn("rounded-[calc(var(--app-radius)*0.8)] px-3 py-[calc(0.5rem*var(--density-scale))] text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground", active && "bg-accent text-foreground", className)} {...props}>
      {children}
    </Link>
  );
}

export function NavbarActions({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("ml-auto flex items-center gap-2", className)} {...props}>{children}</div>;
}

export function NavbarMobileTrigger({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = useContext(NavbarContext);
  if (!context) throw new Error("NavbarMobileTrigger must be used inside <Navbar>. ");
  const { mobileOpen, setMobileOpen } = context;
  return (
    <button type="button" className={cn("inline-grid size-9 place-items-center rounded-[var(--app-radius)] hover:bg-accent md:hidden", className)} onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label={mobileOpen ? "Close menu" : "Open menu"} {...props}>
      {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
    </button>
  );
}

export function MobileNavbar({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const context = useContext(NavbarContext);
  if (!context) throw new Error("MobileNavbar must be used inside <Navbar>. ");
  if (!context.mobileOpen) return null;
  return <div className={cn("absolute left-0 right-0 top-full border-y bg-card p-4 shadow-lg md:hidden", className)} {...props}>{children}</div>;
}
