"use client";

import { createContext, useContext, useId, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs components must be used inside <Tabs>. ");
  return context;
}

export function Tabs({ defaultValue, value: controlledValue, onValueChange, className, children, ...props }: HTMLAttributes<HTMLDivElement> & { defaultValue?: string; value?: string; onValueChange?: (value: string) => void }) {
  const baseId = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? "");
  const value = controlledValue ?? uncontrolledValue;
  const setValue = (nextValue: string) => {
    if (controlledValue === undefined) setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
  };
  return <TabsContext.Provider value={{ value, setValue, baseId }}><div className={cn("grid gap-4", className)} {...props}>{children}</div></TabsContext.Provider>;
}

export function TabsList({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { setValue } = useTabs();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const triggers = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'));
    const index = triggers.indexOf(document.activeElement as HTMLButtonElement);
    if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); const next = triggers[(index + 1) % triggers.length]; next?.focus(); next?.click(); }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); const next = triggers[(index - 1 + triggers.length) % triggers.length]; next?.focus(); next?.click(); }
    if (event.key === "Home") { event.preventDefault(); triggers[0]?.focus(); triggers[0]?.click(); }
    if (event.key === "End") { event.preventDefault(); triggers.at(-1)?.focus(); triggers.at(-1)?.click(); }
  };
  return <div role="tablist" aria-orientation="horizontal" onKeyDown={handleKeyDown} className={cn("inline-flex max-w-full gap-1 overflow-x-auto rounded-[var(--app-radius)] bg-muted p-1", className)} {...props}>{children}</div>;
}

export function TabsTrigger({ value, disabled, className, children, ...props }: HTMLAttributes<HTMLButtonElement> & { value: string; disabled?: boolean }) {
  const { value: activeValue, setValue, baseId } = useTabs();
  const active = value === activeValue;
  return <button type="button" id={`${baseId}-tab-${value}`} role="tab" aria-selected={active} aria-controls={`${baseId}-panel-${value}`} tabIndex={active ? 0 : -1} disabled={disabled} onClick={() => setValue(value)} className={cn("whitespace-nowrap rounded-[calc(var(--app-radius)*0.8)] px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none", active && "bg-card text-foreground shadow-xs", className)} {...props}>{children}</button>;
}

export function TabsContent({ value, className, children, ...props }: HTMLAttributes<HTMLDivElement> & { value: string }) {
  const { value: activeValue, baseId } = useTabs();
  if (value !== activeValue) return null;
  return <div role="tabpanel" id={`${baseId}-panel-${value}`} aria-labelledby={`${baseId}-tab-${value}`} tabIndex={0} className={cn("focus-visible:outline-none", className)} {...props}>{children}</div>;
}
