import type { ReactNode } from "react";
import { Container } from "@/components/ui";

export function CenteredLayout({ children, className }: { children: ReactNode; className?: string }) {
  return <Container className={`flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 ${className ?? ""}`}>{children}</Container>;
}
