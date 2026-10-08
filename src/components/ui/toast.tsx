"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { CheckCircle2, CircleAlert, Info, LoaderCircle, TriangleAlert, X } from "lucide-react";
import { cn } from "@/lib/cn";

export type ToastType = "success" | "error" | "warning" | "info" | "loading";

export interface ToastData {
  id: string;
  type: ToastType;
  title?: string;
  description?: string;
  duration?: number;
  action?: ReactNode;
}

type ToastListener = (toast: ToastData) => void;
const listeners = new Set<ToastListener>();
let sequence = 0;

function emit(data: Omit<ToastData, "id">) {
  const toast = { ...data, id: `toast-${Date.now()}-${sequence++}` };
  listeners.forEach((listener) => listener(toast));
  return toast.id;
}

export const toast = {
  show: (data: Omit<ToastData, "id" | "type"> & { type?: ToastType }) => emit({ type: "info", ...data }),
  success: (title: string, options?: Omit<ToastData, "id" | "type" | "title">) => emit({ type: "success", title, ...options }),
  error: (title: string, options?: Omit<ToastData, "id" | "type" | "title">) => emit({ type: "error", title, ...options }),
  warning: (title: string, options?: Omit<ToastData, "id" | "type" | "title">) => emit({ type: "warning", title, ...options }),
  info: (title: string, options?: Omit<ToastData, "id" | "type" | "title">) => emit({ type: "info", title, ...options }),
  loading: (title: string, options?: Omit<ToastData, "id" | "type" | "title">) => emit({ type: "loading", title, ...options, duration: options?.duration ?? 0 }),
};

const ToastContext = createContext<{ dismiss: (id: string) => void } | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside <ToastProvider>. ");
  return context;
}

const typeConfig = {
  success: { Icon: CheckCircle2, className: "text-success" },
  error: { Icon: CircleAlert, className: "text-destructive" },
  warning: { Icon: TriangleAlert, className: "text-warning" },
  info: { Icon: Info, className: "text-info" },
  loading: { Icon: LoaderCircle, className: "animate-spin text-primary" },
} as const;

export function Toast({ item, onDismiss }: { item: ToastData; onDismiss: (id: string) => void }) {
  const config = typeConfig[item.type];
  useEffect(() => {
    if (!item.duration) return;
    const timer = window.setTimeout(() => onDismiss(item.id), item.duration);
    return () => window.clearTimeout(timer);
  }, [item.duration, item.id, onDismiss]);
  return (
    <div className="pointer-events-auto flex w-full max-w-sm gap-3 rounded-[var(--app-radius)] border bg-card p-4 text-card-foreground shadow-lg" role="status" aria-live="polite">
      <config.Icon className={cn("mt-0.5 size-5 shrink-0", config.className)} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        {item.title ? <p className="text-sm font-semibold">{item.title}</p> : null}
        {item.description ? <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p> : null}
        {item.action ? <div className="mt-2">{item.action}</div> : null}
      </div>
      <button type="button" aria-label="Dismiss notification" className="inline-grid size-7 shrink-0 place-items-center rounded-[calc(var(--app-radius)*0.8)] text-muted-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => onDismiss(item.id)}>
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

export function ToastProvider({ children, maxToasts = 5 }: { children: ReactNode; maxToasts?: number }) {
  const [items, setItems] = useState<ToastData[]>([]);

  useEffect(() => {
    const listener: ToastListener = (item) => setItems((current) => [item, ...current].slice(0, maxToasts));
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, [maxToasts]);

  const value = useMemo(() => ({ dismiss: (id: string) => setItems((current) => current.filter((item) => item.id !== id)) }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex flex-col items-end gap-2 sm:inset-x-auto sm:right-4 sm:w-[calc(100vw-2rem)] sm:max-w-sm" aria-label="Notifications">
        {items.map((item) => <Toast key={item.id} item={item} onDismiss={value.dismiss} />)}
      </div>
    </ToastContext.Provider>
  );
}
