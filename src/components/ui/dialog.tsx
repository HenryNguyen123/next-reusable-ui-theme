"use client";

import { useEffect, useId, useRef, type HTMLAttributes, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlayClick?: boolean;
  className?: string;
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnOverlayClick = true,
  className,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descriptionId = description ? `${baseId}-description` : undefined;

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    );
    firstFocusable?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
        return;
      }
      if (event.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusables = Array.from(root.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      ));
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[calc(100vw-2rem)]",
  };

  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-6" aria-hidden={false}>
      <button
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={() => closeOnOverlayClick && onOpenChange(false)}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={descriptionId}
        className={cn("relative flex max-h-[calc(100vh-2rem)] w-full flex-col overflow-hidden rounded-[var(--app-radius)] border bg-card shadow-xl", sizes[size], className)}
      >
        <div className="flex items-start justify-between gap-4 border-b px-5 py-4">
          <div className="min-w-0">
            {title ? <h2 id={titleId} className="text-lg font-semibold tracking-tight">{title}</h2> : null}
            {description ? <p id={descriptionId} className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
          </div>
          <button
            type="button"
            className="inline-grid size-8 shrink-0 place-items-center rounded-[calc(var(--app-radius)*0.8)] text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => onOpenChange(false)}
          >
            <X className="size-4" aria-hidden="true" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">{children}</div>
        {footer ? <div className="flex flex-col-reverse gap-2 border-t px-5 py-4 sm:flex-row sm:justify-end">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}

export function Modal(props: DialogProps) {
  return <Dialog {...props} />;
}

export function DialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 grid gap-1", className)} {...props} />;
}

export function DialogFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />;
}
