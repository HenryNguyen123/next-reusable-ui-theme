import type { HTMLAttributes, ReactNode } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/cn";

export function Table({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
  return <div className="w-full overflow-x-auto rounded-[var(--app-radius)] border"><table className={cn("w-full min-w-[640px] caption-bottom border-collapse text-sm", className)} {...props} /></div>;
}

export function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("bg-muted/60 text-left", className)} {...props} />;
}

export function TableBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("divide-y divide-border", className)} {...props} />;
}

export function TableFooter({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tfoot className={cn("border-t bg-muted/40 font-medium", className)} {...props} />;
}

export function TableRow({ className, selectable = false, selected = false, onSelect, onKeyDown, ...props }: HTMLAttributes<HTMLTableRowElement> & { selectable?: boolean; selected?: boolean; onSelect?: () => void }) {
  const handleKeyDown = (event: KeyboardEvent<HTMLTableRowElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !selectable || !onSelect) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect();
    }
  };
  return <tr aria-selected={selectable ? selected : undefined} tabIndex={selectable ? 0 : undefined} onClick={onSelect} onKeyDown={handleKeyDown} className={cn("border-border transition-colors", "[&:not(:last-child)]:border-b", selectable && "cursor-pointer hover:bg-accent/50", selected && "bg-accent/50", className)} {...props} />;
}

export function TableHead({ className, children, ...props }: HTMLAttributes<HTMLTableCellElement> & { sortable?: boolean; sortDirection?: "asc" | "desc"; onSort?: () => void }) {
  const { sortable, sortDirection, onSort, ...cellProps } = props;
  if (!sortable) return <th className={cn("px-4 py-[var(--table-cell-y)] text-xs font-semibold uppercase tracking-wide text-muted-foreground", className)} {...cellProps}>{children}</th>;
  return (
    <th className={cn("px-4 py-[var(--table-cell-y)] text-xs font-semibold uppercase tracking-wide text-muted-foreground", className)} {...cellProps}>
      <button type="button" onClick={onSort} className="inline-flex items-center gap-1.5 rounded px-1 py-0.5 hover:bg-accent hover:text-foreground" aria-label={`Sort by ${typeof children === "string" ? children : "column"}`}>
        {children}
        {sortDirection === "asc" ? <ArrowUp className="size-3" /> : sortDirection === "desc" ? <ArrowDown className="size-3" /> : <ArrowUpDown className="size-3" />}
      </button>
    </th>
  );
}

export function TableCell({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("px-4 py-[var(--table-cell-y)] align-middle", className)} {...props} />;
}

export function TableCaption({ className, ...props }: HTMLAttributes<HTMLTableCaptionElement>) {
  return <caption className={cn("mt-3 text-left text-xs text-muted-foreground", className)} {...props} />;
}

export function TableEmpty({ colSpan, children = "No results found.", className }: { colSpan: number; children?: ReactNode; className?: string }) {
  return <tr><td colSpan={colSpan} className={cn("px-4 py-12 text-center text-sm text-muted-foreground", className)}>{children}</td></tr>;
}

export function TableLoading({ colSpan, className }: { colSpan: number; className?: string }) {
  return <tr><td colSpan={colSpan} className={cn("px-4 py-12 text-center text-sm text-muted-foreground", className)}>Loading…</td></tr>;
}
