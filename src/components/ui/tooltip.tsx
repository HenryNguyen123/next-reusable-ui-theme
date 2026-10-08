"use client";

import { cloneElement, isValidElement, useId, useRef, useState, type FocusEvent, type HTMLAttributes, type MouseEvent, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Tooltip({ content, side = "top", children, delay = 120 }: { content: ReactNode; side?: "top" | "bottom" | "left" | "right"; children: ReactElement; delay?: number }) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);
  const id = useId();
  const openLater = () => {
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setOpen(true), delay);
  };
  const close = () => {
    window.clearTimeout(timerRef.current);
    setOpen(false);
  };

  if (!isValidElement(children)) return children;
  const childProps = children.props as { onMouseEnter?: (event: MouseEvent) => void; onMouseLeave?: (event: MouseEvent) => void; onFocus?: (event: FocusEvent) => void; onBlur?: (event: FocusEvent) => void; className?: string };
  const child = cloneElement(children, {
    "aria-describedby": open ? id : undefined,
    onMouseEnter: (event: MouseEvent) => { childProps.onMouseEnter?.(event); openLater(); },
    onMouseLeave: (event: MouseEvent) => { childProps.onMouseLeave?.(event); close(); },
    onFocus: (event: FocusEvent) => { childProps.onFocus?.(event); openLater(); },
    onBlur: (event: FocusEvent) => { childProps.onBlur?.(event); close(); },
  } as never);
  const sideClasses = {
    top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
    bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
    left: "right-full top-1/2 mr-2 -translate-y-1/2",
    right: "left-full top-1/2 ml-2 -translate-y-1/2",
  } as const;
  return (
    <span className="relative inline-flex" onMouseEnter={openLater} onMouseLeave={close}>
      {child}
      {open ? <span id={id} role="tooltip" className={cn("pointer-events-none absolute z-50 w-max max-w-xs rounded-md bg-foreground px-2.5 py-1.5 text-xs text-background shadow-md", sideClasses[side])}>{content}</span> : null}
    </span>
  );
}

export function TooltipProvider({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}
