import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  className?: string;
  siblingCount?: number;
}

function getPages(page: number, pageCount: number, siblingCount: number) {
  const totalVisible = siblingCount * 2 + 5;
  if (pageCount <= totalVisible) return Array.from({ length: pageCount }, (_, i) => i + 1).map(String);
  const start = Math.max(2, page - siblingCount);
  const end = Math.min(pageCount - 1, page + siblingCount);
  const items: Array<string | number> = [1];
  if (start > 2) items.push("ellipsis-left");
  for (let i = start; i <= end; i += 1) items.push(i);
  if (end < pageCount - 1) items.push("ellipsis-right");
  items.push(pageCount);
  return items;
}

export function Pagination({ page, pageCount, onPageChange, className, siblingCount = 1 }: PaginationProps) {
  if (pageCount <= 1) return null;
  const pages = getPages(page, pageCount, siblingCount);
  const go = (nextPage: number) => {
    if (nextPage >= 1 && nextPage <= pageCount && nextPage !== page) onPageChange?.(nextPage);
  };
  return (
    <nav aria-label="Pagination" className={cn("flex flex-wrap items-center justify-center gap-1", className)}>
      <Button variant="outline" size="sm" disabled={page === 1} onClick={() => go(page - 1)} leftIcon={<ChevronLeft className="size-4" />}><span className="sr-only sm:not-sr-only">Previous</span></Button>
      {pages.map((item, index) => typeof item === "string" && item.startsWith("ellipsis") ? (
        <span key={item} className="grid size-[var(--control-sm)] place-items-center text-muted-foreground"><MoreHorizontal className="size-4" /></span>
      ) : (
        <Button key={`${item}-${index}`} variant={Number(item) === page ? "primary" : "ghost"} size="sm" className="w-[var(--control-sm)] px-0" aria-current={Number(item) === page ? "page" : undefined} onClick={() => go(Number(item))}>{item}</Button>
      ))}
      <Button variant="outline" size="sm" disabled={page === pageCount} onClick={() => go(page + 1)} rightIcon={<ChevronRight className="size-4" />}><span className="sr-only sm:not-sr-only">Next</span></Button>
    </nav>
  );
}

export const PaginationItem = Button;
export const PaginationPrevious = Button;
export const PaginationNext = Button;
export const PaginationEllipsis = MoreHorizontal;
