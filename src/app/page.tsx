import Link from "next/link";
import { ArrowRight, Check, Code2, Layers3, Palette, Sparkles } from "lucide-react";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Container, Grid, Navbar, NavbarActions, NavbarItem, NavbarLogo, NavbarMenu, NavbarMobileTrigger, MobileNavbar, Section, Stack } from "@/components/ui";
import { navigationItems } from "@/lib/constants";
import Counter from "@/components/counter/Counter";

const features = [
  { title: "Token-driven", description: "Semantic CSS variables keep color, radius, shadow, typography, and density centralized.", icon: Palette },
  { title: "Composable", description: "Small primitives combine into dashboards, blogs, SaaS surfaces, forms, and marketing pages.", icon: Layers3 },
  { title: "Accessible", description: "Semantic elements, keyboard flows, focus states, labels, descriptions, and ARIA are built in.", icon: Check },
  { title: "Next.js native", description: "App Router, Server Components by default, and client boundaries only where interaction is needed.", icon: Code2 },
];

export default function HomePage() {
  return (
    <div>
      <Navbar variant="solid">
        <NavbarLogo />
        <NavbarMenu>
          {navigationItems.map((item) => <NavbarItem key={item.href} href={item.href}>{item.label}</NavbarItem>)}
        </NavbarMenu>
        <NavbarActions>
          <Badge variant="secondary" className="hidden sm:inline-flex">Design System</Badge>
          <NavbarMobileTrigger />
          <Button asChild variant="primary" size="sm">
            <Link href="/components">Explore</Link>
          </Button>
        </NavbarActions>
        <MobileNavbar>
          <nav aria-label="Mobile navigation" className="grid gap-1">
            {navigationItems.map((item) => <NavbarItem key={item.href} href={item.href} className="block">{item.label}</NavbarItem>)}
          </nav>
        </MobileNavbar>
      </Navbar>

      <main>
        <Section className="pb-16 pt-20 sm:pt-28">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="primary">Reusable Next.js UI Foundation</Badge>
              {/* <div>
                <Counter/>
              </div> */}
              <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-6xl">Build many products from one consistent visual foundation.</h1>
              <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">A theme-first system for blogs, SaaS apps, admin panels, e-commerce, CMS, social products, and landing pages—without business-specific coupling.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button size="lg" rightIcon={<ArrowRight className="size-4" />}>
                  <Link href="/components">View components</Link>
                </Button>
                <Button variant="outline" size="lg"><Link href="/themes">Customize theme</Link></Button>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="pt-0">
          <Container>
            <Grid columns="2">
              {features.map(({ title, description, icon: Icon }) => (
                <Card key={title} variant="interactive">
                  <CardHeader>
                    <div className="mb-2 grid size-10 place-items-center rounded-[calc(var(--app-radius)*0.8)] bg-primary/10 text-primary"><Icon className="size-5" /></div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                  <CardContent><span className="text-xs font-medium text-muted-foreground">Ready to reuse across Project A → B → C → D</span></CardContent>
                </Card>
              ))}
            </Grid>
          </Container>
        </Section>

        <Section className="pt-0">
          <Container>
            <Card variant="elevated" className="overflow-hidden">
              <CardContent className="grid gap-6 p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
                <Stack gap="sm">
                  <div className="flex items-center gap-2"><Sparkles className="size-5 text-primary" /><span className="text-sm font-semibold">Start from primitives, not pages</span></div>
                  <p className="max-w-2xl text-sm leading-6 text-muted-foreground">Change theme variables once and the same Button, Card, Input, Sidebar, Navbar, Table, Form, and Layout components follow automatically.</p>
                </Stack>
                <Button variant="outline" rightIcon={<ArrowRight className="size-4" />}><Link href="/layouts">See layouts</Link></Button>
              </CardContent>
            </Card>
          </Container>
        </Section>
      </main>
    </div>
  );
}
