"use client";

import { createContext, useContext, useEffect, useRef, useState, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) throw new Error("Dropdown components must be used inside <Dropdown>. ");
  return context;
}

export function Dropdown({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={rootRef} className="relative inline-block text-left">{children}</div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenu({ align = "start", className, children, ...props }: HTMLAttributes<HTMLDivElement> & { align?: "start" | "end" }) {
  const { open, setOpen } = useDropdownContext();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const firstItem = menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])');
    firstItem?.focus();
  }, [open]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])') ?? []);
    if (!items.length) return;
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      items[(currentIndex + 1 + items.length) % items.length]?.focus();
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      items[(currentIndex - 1 + items.length) % items.length]?.focus();
    }
    if (event.key === "Home") {
      event.preventDefault();
      items[0]?.focus();
    }
    if (event.key === "End") {
      event.preventDefault();
      items.at(-1)?.focus();
    }
  };

  if (!open) return null;
  return (
    <div
      ref={menuRef}
      role="menu"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className={cn("absolute z-40 mt-2 min-w-52 rounded-[var(--app-radius)] border bg-popover p-1.5 text-popover-foreground shadow-lg", align === "end" ? "right-0" : "left-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownTrigger({ children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useDropdownContext();
  return (
    <button
      type="button"
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      className={cn("inline-flex items-center justify-center gap-2 rounded-[var(--app-radius)]", className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownItem({
  className,
  icon,
  destructive = false,
  disabled = false,
  children,
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { icon?: ReactNode; destructive?: boolean }) {
  const { setOpen } = useDropdownContext();
  return (
    <button
      type="button"
      role="menuitem"
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(false);
      }}
      className={cn("flex w-full items-center gap-2 rounded-[calc(var(--app-radius)*0.8)] px-2.5 py-2 text-left text-sm outline-none hover:bg-accent focus-visible:bg-accent disabled:opacity-50", destructive && "text-destructive hover:bg-destructive/10 focus-visible:bg-destructive/10", className)}
      {...props}
    >
      {icon}
      <span className="min-w-0 flex-1">{children}</span>
    </button>
  );
}

export function DropdownSeparator({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div role="separator" className={cn("my-1 h-px bg-border", className)} {...props} />;
}

export function DropdownSubmenuHint() {
  return <ChevronRight className="ml-auto size-4 text-muted-foreground" aria-hidden="true" />;
}

export function IconDropdownTrigger({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <DropdownTrigger className={cn("size-9 text-muted-foreground hover:bg-accent", className)} {...props}>
      <MoreHorizontal className="size-4" aria-hidden="true" />
      <span className="sr-only">Open menu</span>
    </DropdownTrigger>
  );
}
