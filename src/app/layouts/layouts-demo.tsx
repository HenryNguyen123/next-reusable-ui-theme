import Link from "next/link";
import type { ComponentProps, ComponentType } from "react";
import { ArrowRight, BookOpen, LayoutDashboard, PanelsTopLeft } from "lucide-react";
import { BlogLayout, CenteredLayout, DashboardLayout, RootLayout, Footer, Header, MainContent } from "@/components/layouts";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Container, Grid, Section } from "@/components/ui";

function SampleCard({ title, icon: Icon, description }: { title: string; icon: ComponentType<ComponentProps<typeof BookOpen>>; description: string }) {
  return <Card variant="interactive"><CardHeader><div className="grid size-10 place-items-center rounded-[calc(var(--app-radius)*0.8)] bg-primary/10 text-primary"><Icon className="size-5" /></div><CardTitle>{title}</CardTitle><CardDescription>{description}</CardDescription></CardHeader><CardContent><Button asChild variant="outline" size="sm"><Link href="/components">Open</Link></Button></CardContent></Card>;
}

export function LayoutsDemo() {
  return (
    <RootLayout>
      <Header />
      <MainContent>
        <Section className="pt-12">
          <Container>
            <div className="max-w-3xl"><p className="text-sm font-semibold text-primary">Layout primitives</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Five common page compositions from the same primitives.</h1><p className="mt-3 text-muted-foreground">The layouts are structural shells. Product-specific content stays outside the layout component.</p></div>
            <Grid columns="2" className="mt-8">
              <SampleCard title="Full width / Root" icon={PanelsTopLeft} description="Header, content, footer without application chrome." />
              <SampleCard title="Centered" icon={BookOpen} description="Ideal for auth, onboarding, settings, and focused tasks." />
              <SampleCard title="Blog" icon={BookOpen} description="Article content with an optional sticky sidebar." />
              <SampleCard title="Dashboard" icon={LayoutDashboard} description="Persistent sidebar with a flexible main content area." />
            </Grid>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <CenteredLayout className="min-h-72 rounded-[var(--app-radius)] border bg-card p-6"><Card className="w-full max-w-sm"><CardHeader><CardTitle>Centered layout</CardTitle><CardDescription>Focus a single task in the middle of the viewport.</CardDescription></CardHeader><CardContent><Button>Continue</Button></CardContent></Card></CenteredLayout>
              <BlogLayout article={<Card><CardHeader><CardTitle>Blog article</CardTitle></CardHeader><CardContent><p className="leading-7 text-muted-foreground">Article content occupies the flexible column while the sidebar stays optional.</p></CardContent></Card>} sidebar={<div><p className="text-sm font-semibold">On this page</p><div className="mt-3 grid gap-2 text-sm text-muted-foreground"><a href="#intro">Introduction</a><a href="#tokens">Design tokens</a><a href="#usage">Usage</a></div></div>} />
              <div className="overflow-hidden rounded-[var(--app-radius)] border bg-card"><DashboardLayout><div className="p-6"><Card><CardHeader><CardTitle>Dashboard layout</CardTitle><CardDescription>Sidebar + content shell for application workspaces.</CardDescription></CardHeader><CardContent><Button asChild variant="outline"><Link href="/dashboard">Open dashboard</Link></Button></CardContent></Card></div></DashboardLayout></div>
            </div>
          </Container>
        </Section>
        <Footer />
      </MainContent>
    </RootLayout>
  );
}
