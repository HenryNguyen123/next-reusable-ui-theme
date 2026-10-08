import type { ReactNode } from "react";
import { Container, Card } from "@/components/ui";

export function BlogLayout({ article, sidebar }: { article: ReactNode; sidebar?: ReactNode }) {
  return (
    <Container className="grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <article className="min-w-0">{article}</article>
      {sidebar ? <aside className="min-w-0"><Card variant="flat" className="sticky top-24 p-5">{sidebar}</Card></aside> : null}
    </Container>
  );
}
