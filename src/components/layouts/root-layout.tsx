import type { ReactNode } from "react";
import Link from "next/link";
import { Container, Separator } from "@/components/ui";

export function RootLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}

export function Header({ children }: { children?: ReactNode }) {
  return <header className="border-b bg-card/80 backdrop-blur"><Container className="flex min-h-16 items-center">{children ?? <Link href="/" className="font-semibold">Next Theme</Link>}</Container></header>;
}

export function MainContent({ children, className }: { children: ReactNode; className?: string }) {
  return <main className={className}>{children}</main>;
}

export function Footer({ children }: { children?: ReactNode }) {
  return <footer className="border-t bg-card/50"><Container className="flex min-h-20 items-center justify-between gap-4 py-4 text-sm text-muted-foreground">{children ?? <><span>Reusable Next.js UI Theme</span><span>Built for composition.</span></>}</Container></footer>;
}

export function RootFooter({ children }: { children?: ReactNode }) {
  return <><Separator />{children}</>;
}
