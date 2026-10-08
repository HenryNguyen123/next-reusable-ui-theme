# Complete Source Code

This file contains the complete project source, file-by-file.

// .gitignore

```gitignore
node_modules/
.next/
out/
*.log
.env
.env.local
.DS_Store
.vscode/
.idea/

```

// README.md

```md
# Next Theme — Reusable UI Foundation

A production-oriented Next.js + Tailwind CSS design system intended to be copied into many applications instead of being coupled to one product domain.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4 with CSS-first configuration
- Lucide React
- Class Variance Authority
- `clsx` + `tailwind-merge`
- React Hook Form + Zod
- pnpm

## Quick start

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

Production checks:

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm start
```

## Project structure

```text
src/
├── app/                         # Demo routes and App Router entry points
├── components/
│   ├── ui/                     # Reusable primitives and interaction components
│   ├── forms/                  # React Hook Form composition helpers
│   ├── layouts/                # Page/application shells
│   └── theme/                  # Theme runtime + playground controls
├── config/                     # Default product-independent theme configuration
├── hooks/                      # Thin reusable hooks
├── lib/                        # Small pure utilities
├── styles/                     # Global CSS and semantic theme tokens
└── types/                      # Shared theme types
```

## Design tokens

`src/styles/theme.css` is the source of truth for semantic colors, typography, spacing, radius, shadows, control heights, and density variables.

Components use semantic tokens such as:

```text
bg-background
text-foreground
bg-primary
text-primary-foreground
border-border
ring-ring
bg-card
text-card-foreground
```

To create another visual identity, change the token layer rather than rewriting component classes.

## Themes

Built-in color themes:

- Blue
- Violet
- Green
- Orange
- Rose
- Neutral

Built-in modes:

- Light
- Dark
- System

Theme state is persisted in `localStorage` and initialized before the page paints through `ThemeScript` to minimize a theme flash.

## UI density

Density is controlled centrally and modifies control heights, cards, table rows, navigation spacing, and section spacing.

```ts
compact
comfortable
spacious
```

## Component usage

```tsx
import { Button, Card, CardContent, Input } from "@/components/ui";

export function Example() {
  return (
    <Card variant="interactive">
      <CardContent className="grid gap-4">
        <Input label="Email" placeholder="you@example.com" />
        <Button variant="primary">Continue</Button>
      </CardContent>
    </Card>
  );
}
```

### Variants

Variants use CVA so the component API stays stable while styles stay centralized.

```tsx
<Button variant="outline" size="sm" />
<Card variant="elevated" />
```

### Toasts

Wrap the application with `ToastProvider` (already done in `src/app/layout.tsx`) and call the API from client-side interactions:

```tsx
import { toast } from "@/components/ui";

toast.success("Saved successfully");
toast.error("Something went wrong");
toast.info("New update available");
toast.warning("Review before publishing");
```

## Forms

The form layer intentionally separates validation from presentation.

```tsx
const schema = z.object({
  email: z.email(),
});

const methods = useForm<Values>({
  resolver: zodResolver(schema),
});

<Form methods={methods} onSubmit={onSubmit}>
  <FormField
    name="email"
    render={({ field, error }) => (
      <Input {...field} type="email" error={error} />
    )}
  />
</Form>
```

## Adding a new theme

1. Add the theme name to `src/types/theme.ts`.
2. Add light and dark semantic variable overrides in `src/styles/theme.css`.
3. Add a label in `src/config/theme.config.ts`.
4. Add the theme to the theme controls if you want it exposed in the playground.
5. Do not rewrite component styles.

## Adding a component

Keep a component product-independent. Prefer:

```text
semantic token → variant → component → page composition
```

Avoid:

```text
product rule → component → one-off page
```

Components should expose typed props, a `className` escape hatch, states where appropriate, and semantic markup.

## Reusing the foundation in another project

Copy the `src/components`, `src/config`, `src/hooks`, `src/lib`, `src/styles`, and `src/types` directories plus the required package dependencies. Keep the app routes separate from product code. The `app/components`, `app/dashboard`, `app/forms`, `app/layouts`, and `app/themes` routes in this repository are demos/reference material, not part of the product domain.

## Accessibility

The system favors native HTML controls when their behavior is already accessible (`select`, checkbox, radio) and uses ARIA/focus handling where custom behavior is required (dialog, dropdown, tabs, switch, tooltip). All interactive components expose visible focus states and keyboard paths.

## Tailwind v4 note

This project intentionally does not use a `tailwind.config.ts`. Tailwind CSS v4 supports CSS-first configuration, so the design tokens and theme mappings live in `src/styles/theme.css`.

## License

Use the project as a starting point for your own applications. Add your preferred license before publishing a distributed package.

```

// eslint.config.mjs

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

```

// next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited.
// See https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

// next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
};

export default nextConfig;

```

// package.json

```json
{
  "name": "next-reusable-ui-theme",
  "version": "1.0.0",
  "private": true,
  "packageManager": "pnpm@10.18.2",
  "engines": {
    "node": ">=20.9.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.9.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^1.53.0",
    "next": "^16.4.0",
    "react": "^19.3.0",
    "react-dom": "^19.3.0",
    "react-hook-form": "^7.89.0",
    "tailwind-merge": "^3.7.0",
    "zod": "^4.6.5"
  },
  "devDependencies": {
    "@types/node": "^24.9.1",
    "@types/react": "^19.2.13",
    "@types/react-dom": "^19.2.3",
    "eslint": "^10.0.0",
    "eslint-config-next": "^16.4.0",
    "postcss": "^8.5.6",
    "typescript": "^6.0.3",
    "@tailwindcss/postcss": "^4.3.3"
  }
}

```

// postcss.config.mjs

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;

```

// src/app/components/component-showcase.tsx

```tsx
"use client";

import { useState } from "react";
import { Bell, CalendarDays, Check, ChevronDown, Download, Mail, MoreHorizontal, Search, Settings2, Sparkles, User } from "lucide-react";
import { Alert, Avatar, Badge, Breadcrumb, BreadcrumbItem, BreadcrumbSeparator, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Checkbox, Dialog, Dropdown, DropdownItem, DropdownMenu, DropdownSeparator, DropdownTrigger, Input, Pagination, Radio, RadioGroup, Select, Separator, Skeleton, SkeletonText, Switch, Table, TableBody, TableCell, TableEmpty, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, toast, Tooltip } from "@/components/ui";
import { Container, Grid, Section, Stack } from "@/components/ui/layout";

const codeSample = `<Button variant="primary" size="lg">Publish</Button>\n<Card variant="interactive">...</Card>\n<Input label="Email" error="Invalid email" />`;

export function ComponentShowcase() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(2);
  const [checked, setChecked] = useState(true);
  const [status, setStatus] = useState(true);
  return (
    <div>
      <header className="border-b bg-card/70 py-10 backdrop-blur">
        <Container>
          <Breadcrumb><BreadcrumbItem href="/">Home</BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem current>Components</BreadcrumbItem></Breadcrumb>
          <div className="mt-6 max-w-3xl"><Badge variant="primary">UI Inventory</Badge><h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Every reusable primitive in one place.</h1><p className="mt-3 text-muted-foreground">Use this route as a living reference when copying the system into a new product.</p></div>
        </Container>
      </header>
      <main>
        <Section className="pt-12">
          <Container>
            <Stack gap="2xl">
              <Card><CardHeader><CardTitle>Button</CardTitle><CardDescription>Variants, sizes, icons, loading, and disabled states.</CardDescription></CardHeader><CardContent><div className="flex flex-wrap gap-2">{(["default", "primary", "secondary", "outline", "ghost", "destructive", "success", "warning", "link"] as const).map((variant) => <Button key={variant} variant={variant}>{variant}</Button>)}<Button loading loadingText="Saving…">Save</Button><Button size="icon" aria-label="Settings"><Settings2 className="size-4" /></Button></div></CardContent></Card>

              <Grid columns="2">
                <Card><CardHeader><CardTitle>Inputs</CardTitle></CardHeader><CardContent className="grid gap-5"><Input label="Search" placeholder="Search components…" leftIcon={<Search className="size-4" />} /><Input label="Email" type="email" placeholder="you@example.com" error="Enter a valid email address." /><Input label="Password" type="password" description="Use at least 8 characters." success="Looks good." /></CardContent></Card>
                <Card><CardHeader><CardTitle>Textarea + Select</CardTitle></CardHeader><CardContent className="grid gap-5"><Textarea label="Description" placeholder="Write something useful…" maxLength={240} showCount /><Select label="Role" placeholder="Select a role" options={[{ value: "designer", label: "Designer" }, { value: "developer", label: "Developer" }, { value: "product", label: "Product" }]} /></CardContent></Card>
              </Grid>

              <Grid columns="3">
                <Card><CardHeader><CardTitle>Selection</CardTitle></CardHeader><CardContent className="grid gap-5"><Checkbox id="terms" label="Accept terms" description="Required before continuing." checked={checked} onChange={(event) => setChecked(event.target.checked)} /><RadioGroup label="Plan"><Radio name="plan" value="starter" label="Starter" defaultChecked /><Radio name="plan" value="pro" label="Pro" description="Best for teams." /><Radio name="plan" value="enterprise" label="Enterprise" /></RadioGroup><Switch label="Live mode" description="Enable real-time updates." checked={status} onCheckedChange={setStatus} /></CardContent></Card>
                <Card><CardHeader><CardTitle>Feedback</CardTitle></CardHeader><CardContent className="grid gap-3"><Alert title="Heads up" description="This is an informational alert." variant="info" /><Alert title="Saved" description="Your changes are live." variant="success" /><Alert title="Review" description="Check these settings before publishing." variant="warning" /><Alert title="Error" description="The request could not be completed." variant="error" /></CardContent></Card>
                <Card><CardHeader><CardTitle>Badge + Avatar</CardTitle></CardHeader><CardContent><div className="flex flex-wrap items-center gap-3"><Badge>Default</Badge><Badge variant="primary">Primary</Badge><Badge variant="success">Success</Badge><Badge variant="warning">Warning</Badge><Badge variant="destructive">Critical</Badge></div><Separator className="my-6" /><div className="flex items-center gap-3"><Avatar fallback="Grace Hopper" status="online" size="lg" /><div><p className="text-sm font-semibold">Grace Hopper</p><p className="text-xs text-muted-foreground">Design System Lead</p></div></div></CardContent></Card>
              </Grid>

              <Grid columns="2">
                <Card><CardHeader><CardTitle>Dialog</CardTitle><CardDescription>Accessible modal with ESC and focus containment.</CardDescription></CardHeader><CardContent><Button onClick={() => setDialogOpen(true)}>Open dialog</Button><Dialog open={dialogOpen} onOpenChange={setDialogOpen} title="Publish changes" description="Review your settings before publishing." footer={<><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={() => { toast.success("Published successfully"); setDialogOpen(false); }}>Publish</Button></>}><div className="grid gap-4"><Input label="Title" defaultValue="Q4 design system" /><Textarea label="Notes" defaultValue="Token changes are ready for review." /></div></Dialog></CardContent></Card>
                <Card><CardHeader><CardTitle>Dropdown + Tooltip</CardTitle></CardHeader><CardContent className="flex flex-wrap items-center gap-3"><Dropdown><DropdownTrigger className="border bg-card px-3 py-2 text-sm hover:bg-accent"><MoreHorizontal className="size-4" /> Actions <ChevronDown className="size-4" /></DropdownTrigger><DropdownMenu align="start"><DropdownItem icon={<Download className="size-4" />}>Download</DropdownItem><DropdownItem icon={<User className="size-4" />}>Profile</DropdownItem><DropdownSeparator /><DropdownItem destructive icon={<Bell className="size-4" />}>Mute alerts</DropdownItem></DropdownMenu></Dropdown><Tooltip content="Keyboard accessible tooltip"><Button size="icon" variant="outline" aria-label="Help"><Sparkles className="size-4" /></Button></Tooltip></CardContent></Card>
              </Grid>

              <Card><CardHeader><CardTitle>Tabs</CardTitle></CardHeader><CardContent><Tabs defaultValue="preview"><TabsList><TabsTrigger value="preview">Preview</TabsTrigger><TabsTrigger value="code">Code</TabsTrigger><TabsTrigger value="notes">Notes</TabsTrigger></TabsList><TabsContent value="preview" className="pt-4"><div className="rounded-[var(--app-radius)] bg-muted p-5"><p className="text-sm font-medium">Preview content</p><p className="mt-1 text-sm text-muted-foreground">Arrow keys move between tabs.</p></div></TabsContent><TabsContent value="code" className="pt-4"><pre><code>{codeSample}</code></pre></TabsContent><TabsContent value="notes" className="pt-4"><p className="text-sm text-muted-foreground">Keep product-specific rules outside the component layer.</p></TabsContent></Tabs></CardContent></Card>

              <Card><CardHeader><CardTitle>Table + Pagination</CardTitle><CardDescription>Responsive table shell with sortable headings and empty state support.</CardDescription></CardHeader><CardContent className="grid gap-5"><Table><TableHeader><TableRow><TableHead sortable sortDirection="asc">Project</TableHead><TableHead>Status</TableHead><TableHead>Owner</TableHead><TableHead>Updated</TableHead></TableRow></TableHeader><TableBody>{[{ project: "Marketing site", status: "Live", owner: "Avery", updated: "2m ago" }, { project: "Admin dashboard", status: "Review", owner: "Jordan", updated: "18m ago" }, { project: "Documentation", status: "Draft", owner: "Taylor", updated: "1h ago" }].map((row) => <TableRow key={row.project}><TableCell className="font-medium">{row.project}</TableCell><TableCell><Badge variant={row.status === "Live" ? "success" : row.status === "Review" ? "warning" : "secondary"}>{row.status}</Badge></TableCell><TableCell>{row.owner}</TableCell><TableCell className="text-muted-foreground">{row.updated}</TableCell></TableRow>)}</TableBody></Table><Pagination page={page} pageCount={7} onPageChange={setPage} /></CardContent></Card>

              <Grid columns="2">
                <Card><CardHeader><CardTitle>Loading</CardTitle></CardHeader><CardContent className="grid gap-4"><div className="flex items-center gap-3"><Skeleton className="size-10 rounded-full" /><SkeletonText lines={2} className="flex-1" /></div><Skeleton className="h-32 w-full" /></CardContent></Card>
                <Card><CardHeader><CardTitle>Toast</CardTitle><CardDescription>Global API: toast.success(), toast.error(), toast.info(), toast.warning().</CardDescription></CardHeader><CardContent className="flex flex-wrap gap-2"><Button onClick={() => toast.success("Saved successfully", { description: "The record is now updated." })}>Success</Button><Button variant="destructive" onClick={() => toast.error("Something went wrong")}>Error</Button><Button variant="outline" onClick={() => toast.info("New update available")}>Info</Button><Button variant="outline" onClick={() => toast.warning("Review before publish")}>Warning</Button></CardContent></Card>
              </Grid>
            </Stack>
          </Container>
        </Section>
      </main>
    </div>
  );
}

```

// src/app/components/page.tsx

```tsx
import { ComponentShowcase } from "@/app/components/component-showcase";

export default function ComponentsPage() {
  return <ComponentShowcase />;
}

```

// src/app/dashboard/dashboard-interactive.tsx

```tsx
"use client";

import { BarChart3, MoreHorizontal, Plus, TrendingUp, Users } from "lucide-react";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, toast } from "@/components/ui";
import { Container, Grid, Stack } from "@/components/ui/layout";

const projects = [
  { name: "Marketing site", owner: "Avery Stone", status: "Live", revenue: "$18,420" },
  { name: "Admin dashboard", owner: "Jordan Lee", status: "Review", revenue: "$12,980" },
  { name: "Docs portal", owner: "Taylor Kim", status: "Draft", revenue: "$8,240" },
  { name: "Mobile launch", owner: "Morgan Wu", status: "Live", revenue: "$24,410" },
];

export function DashboardInteractive() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur"><Container className="flex min-h-16 items-center justify-between gap-4"><div><p className="text-sm text-muted-foreground">Workspace</p><h1 className="font-semibold">Dashboard overview</h1></div><Button onClick={() => toast.success("New project started") } leftIcon={<Plus className="size-4" />}>New project</Button></Container></header>
      <main><Container className="py-8"><Stack gap="xl">
        <Grid columns="4">
          {[{ label: "Revenue", value: "$64.1k", note: "+12.4%", icon: TrendingUp }, { label: "Users", value: "12,840", note: "+8.2%", icon: Users }, { label: "Conversion", value: "7.4%", note: "+1.1%", icon: BarChart3 }, { label: "Active projects", value: "24", note: "+4", icon: Plus }].map(({ label, value, note, icon: Icon }) => <Card key={label}><CardContent className="flex items-start justify-between"><div><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-bold tracking-tight">{value}</p><p className="mt-1 text-xs text-success">{note} this month</p></div><div className="grid size-10 place-items-center rounded-[calc(var(--app-radius)*0.8)] bg-primary/10 text-primary"><Icon className="size-5" /></div></CardContent></Card>)}
        </Grid>
        <Grid columns="2">
          <Card className="min-h-72"><CardHeader><CardTitle>Activity</CardTitle><CardDescription>A simple chart placeholder for a future charting package.</CardDescription></CardHeader><CardContent className="flex min-h-44 items-end gap-3"><div className="grid h-40 w-full grid-cols-12 items-end gap-2">{[30, 55, 46, 72, 64, 88, 62, 80, 92, 76, 96, 84].map((height, index) => <div key={index} className="rounded-t bg-primary/70" style={{ height: `${height}%` }} />)}</div></CardContent></Card>
          <Card><CardHeader><CardTitle>Quick actions</CardTitle><CardDescription>Keep product actions close to the data.</CardDescription></CardHeader><CardContent className="grid gap-2"><Button variant="outline" className="justify-start" onClick={() => toast.info("Invite flow opened")}>Invite teammate</Button><Button variant="outline" className="justify-start" onClick={() => toast.info("Report generation started")}>Generate report</Button><Button variant="outline" className="justify-start" onClick={() => toast.info("Settings opened")}>Manage settings</Button></CardContent></Card>
        </Grid>
        <Card><CardHeader className="flex-row items-center justify-between"><div><CardTitle>Projects</CardTitle><CardDescription>Recent product work across the workspace.</CardDescription></div><Dropdown><DropdownTrigger className="grid size-9 place-items-center rounded-[var(--app-radius)] hover:bg-accent" aria-label="Project actions"><MoreHorizontal className="size-4" /></DropdownTrigger><DropdownMenu align="end"><DropdownItem>Export CSV</DropdownItem><DropdownItem>Refresh data</DropdownItem></DropdownMenu></Dropdown></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Project</TableHead><TableHead>Owner</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Revenue</TableHead></TableRow></TableHeader><TableBody>{projects.map((project) => <TableRow key={project.name}><TableCell className="font-medium">{project.name}</TableCell><TableCell>{project.owner}</TableCell><TableCell><Badge variant={project.status === "Live" ? "success" : project.status === "Review" ? "warning" : "secondary"}>{project.status}</Badge></TableCell><TableCell className="text-right font-medium">{project.revenue}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card>
      </Stack></Container></main>
    </div>
  );
}

```

// src/app/dashboard/page.tsx

```tsx
import { DashboardLayout } from "@/components/layouts";
import { DashboardInteractive } from "@/app/dashboard/dashboard-interactive";

export default function DashboardPage() {
  return <DashboardLayout><DashboardInteractive /></DashboardLayout>;
}

```

// src/app/forms/form-demo.tsx

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, UserRound } from "lucide-react";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Textarea, toast } from "@/components/ui";
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage } from "@/components/forms";
import { Container } from "@/components/ui/layout";

const profileSchema = z.object({
  name: z.string().trim().min(2, "Name must contain at least 2 characters."),
  email: z.email("Enter a valid email address."),
  bio: z.string().max(240, "Bio must be 240 characters or fewer.").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function FormDemo() {
  const methods = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", email: "", bio: "" },
    mode: "onBlur",
  });

  const onSubmit = (values: ProfileFormValues) => {
    toast.success("Profile saved", { description: `${values.name} is ready to use.` });
  };

  return (
    <main><Container className="py-12"><div className="mx-auto max-w-2xl"><Badge variant="primary">React Hook Form + Zod</Badge><h1 className="mt-3 text-3xl font-bold tracking-tight">Production-style form primitives.</h1><p className="mt-2 text-muted-foreground">FormProvider, Controller fields, error messages and schema validation stay composable.</p><Card className="mt-8"><CardHeader><CardTitle>Profile</CardTitle><CardDescription>Validate the shape with Zod while keeping UI concerns inside reusable primitives.</CardDescription></CardHeader><CardContent>
      <Form methods={methods} onSubmit={onSubmit}>
        <FormField name="name" render={({ field, error }) => <div className="grid gap-1.5"><FormLabel htmlFor="name" required>Name</FormLabel><FormControl><Input {...field} placeholder="Ada Lovelace" leftIcon={<UserRound className="size-4" />} error={error} /></FormControl><FormMessage>{error}</FormMessage></div>} />
        <FormField name="email" render={({ field, error }) => <div className="grid gap-1.5"><FormLabel htmlFor="email" required>Email</FormLabel><FormControl><Input {...field} type="email" placeholder="ada@example.com" leftIcon={<Mail className="size-4" />} error={error} /></FormControl><FormDescription>We use this to identify the workspace member.</FormDescription><FormMessage>{error}</FormMessage></div>} />
        <FormField name="bio" render={({ field, error }) => <div className="grid gap-1.5"><FormLabel htmlFor="bio">Bio</FormLabel><FormControl><Textarea {...field} placeholder="Tell the team a little about yourself." maxLength={240} showCount error={error} /></FormControl><FormMessage>{error}</FormMessage></div>} />
        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end"><Button type="button" variant="outline" onClick={() => methods.reset()}>Reset</Button><Button type="submit" loading={methods.formState.isSubmitting}>Save profile</Button></div>
      </Form>
    </CardContent></Card></div></Container></main>
  );
}

```

// src/app/forms/page.tsx

```tsx
import { FormDemo } from "@/app/forms/form-demo";

export default function FormsPage() {
  return <FormDemo />;
}

```

// src/app/layout.tsx

```tsx
import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeScript } from "@/components/theme/theme-script";
import { ToastProvider } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "Next Theme — Reusable UI Foundation",
  description: "A production-ready Next.js and Tailwind CSS design system foundation.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
};

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeScript />
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

```

// src/app/layouts/layouts-demo.tsx

```tsx
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

```

// src/app/layouts/page.tsx

```tsx
import { LayoutsDemo } from "@/app/layouts/layouts-demo";

export default function LayoutsPage() {
  return <LayoutsDemo />;
}

```

// src/app/page.tsx

```tsx
import Link from "next/link";
import { ArrowRight, Check, Code2, Layers3, Palette, Sparkles } from "lucide-react";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Container, Grid, Navbar, NavbarActions, NavbarItem, NavbarLogo, NavbarMenu, NavbarMobileTrigger, MobileNavbar, Section, Stack } from "@/components/ui";
import { navigationItems } from "@/lib/constants";

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

```

// src/app/themes/page.tsx

```tsx
import { ThemePlayground } from "@/app/themes/theme-playground";

export default function ThemesPage() {
  return <ThemePlayground />;
}

```

// src/app/themes/theme-playground.tsx

```tsx
"use client";

import { Moon, Palette, Radius, Ruler, Sun } from "lucide-react";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Container, Grid, Stack } from "@/components/ui/layout";
import { ThemeControls } from "@/components/theme/theme-controls";
import { useTheme } from "@/components/theme/theme-provider";

const swatches = ["primary", "secondary", "accent", "success", "warning", "destructive", "info"] as const;
const swatchClasses: Record<(typeof swatches)[number], string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
  info: "bg-info",
};

export function ThemePlayground() {
  const { resolvedMode, colorTheme, radius, density } = useTheme();
  return <main><Container className="py-12"><div className="max-w-3xl"><Badge variant="primary">Theme system</Badge><h1 className="mt-3 text-3xl font-bold tracking-tight">Change the visual identity without changing components.</h1><p className="mt-2 text-muted-foreground">The active theme is <strong className="text-foreground">{colorTheme}</strong>, <strong className="text-foreground">{resolvedMode}</strong> mode, <strong className="text-foreground">{radius}</strong> radius and <strong className="text-foreground">{density}</strong> density.</p></div><div className="mt-8"><ThemeControls /></div><Grid columns="2" className="mt-6"><Card><CardHeader><CardTitle>Semantic tokens</CardTitle><CardDescription>Components reference semantic variables instead of raw colors.</CardDescription></CardHeader><CardContent><div className="grid gap-3 sm:grid-cols-2">{swatches.map((token) => <div key={token} className="rounded-[var(--app-radius)] border p-3"><div className={`h-14 rounded-[calc(var(--app-radius)*0.8)] ${swatchClasses[token]}`} /><p className="mt-2 text-xs font-mono text-muted-foreground">--{token}</p></div>)}</div></CardContent></Card><Card><CardHeader><CardTitle>Visual controls</CardTitle><CardDescription>These controls are implemented once and persist in localStorage.</CardDescription></CardHeader><CardContent><Stack gap="md"><div className="flex items-center gap-3"><Sun className="size-4 text-muted-foreground" /> Light/Dark/System</div><div className="flex items-center gap-3"><Palette className="size-4 text-muted-foreground" /> Blue, Violet, Green, Orange, Rose, Neutral</div><div className="flex items-center gap-3"><Radius className="size-4 text-muted-foreground" /> Radius scale</div><div className="flex items-center gap-3"><Ruler className="size-4 text-muted-foreground" /> Compact, Comfortable, Spacious</div><div className="flex items-center gap-2"><Button size="sm" variant="outline"><Moon className="size-4" /> Dark-safe</Button><Button size="sm" variant="primary">Primary action</Button></div></Stack></CardContent></Card></Grid></Container></main>;
}

```

// src/components/forms/form-field.tsx

```tsx
"use client";

import type { ReactNode } from "react";
import { Controller, useFormContext, type ControllerRenderProps, type FieldPath, type FieldValues } from "react-hook-form";
import { cn } from "@/lib/cn";

export function FormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  name,
  render,
}: {
  name: TName;
  render: (props: { field: ControllerRenderProps<TFieldValues, TName>; error?: string }) => ReactNode;
}) {
  const { control } = useFormContext<TFieldValues>();
  return <Controller control={control} name={name} render={({ field, fieldState }) => <>{render({ field, error: fieldState.error?.message })}</>} />;
}

export function FormLabel({ className, htmlFor, required, children }: { className?: string; htmlFor?: string; required?: boolean; children: ReactNode }) {
  return <label htmlFor={htmlFor} className={cn("text-sm font-medium", className)}>{children}{required ? <span className="ml-1 text-destructive" aria-hidden="true">*</span> : null}</label>;
}

export function FormControl({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function FormDescription({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn("text-xs text-muted-foreground", className)}>{children}</p>;
}

export function FormMessage({ className, children }: { className?: string; children?: ReactNode }) {
  if (!children) return null;
  return <p role="alert" className={cn("text-xs text-destructive", className)}>{children}</p>;
}

```

// src/components/forms/form.tsx

```tsx
"use client";

import { FormProvider, type FieldValues, type SubmitHandler, type UseFormReturn } from "react-hook-form";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface FormProps<TFieldValues extends FieldValues> {
  methods: UseFormReturn<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  className?: string;
  children: ReactNode;
}

export function Form<TFieldValues extends FieldValues>({ methods, onSubmit, className, children }: FormProps<TFieldValues>) {
  return <FormProvider {...methods}><form className={cn("grid gap-5", className)} onSubmit={methods.handleSubmit(onSubmit)}>{children}</form></FormProvider>;
}

```

// src/components/forms/index.ts

```ts
export * from "./form";
export * from "./form-field";

```

// src/components/layouts/blog-layout.tsx

```tsx
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

```

// src/components/layouts/centered-layout.tsx

```tsx
import type { ReactNode } from "react";
import { Container } from "@/components/ui";

export function CenteredLayout({ children, className }: { children: ReactNode; className?: string }) {
  return <Container className={`flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 ${className ?? ""}`}>{children}</Container>;
}

```

// src/components/layouts/dashboard-layout.tsx

```tsx
"use client";

import { useState, type ReactNode } from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarItem, SidebarMobileClose, SidebarMobileTrigger, SidebarToggle } from "@/components/ui/sidebar";
import { dashboardItems } from "@/lib/constants";
import { Home, Palette, PanelsTopLeft, Settings2, Table2 } from "lucide-react";

const icons = {
  Overview: Home,
  Components: PanelsTopLeft,
  Forms: PanelsTopLeft,
  Layouts: Table2,
  Themes: Palette,
} as const;

export function DashboardLayout({ children, sidebarVariant = "default" }: { children: ReactNode; sidebarVariant?: "default" | "bordered" | "floating" | "compact" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen md:flex">
      <Sidebar variant={sidebarVariant} mobileOpen={mobileOpen} onMobileOpenChange={setMobileOpen}>
        <SidebarHeader>
          <div className="truncate font-semibold">Next Theme</div>
          <div className="flex items-center gap-1"><SidebarToggle /><SidebarMobileClose /></div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup label="Workspace">
            {dashboardItems.map((item) => {
              const Icon = icons[item.label];
              return <SidebarItem key={item.href} href={item.href} icon={<Icon className="size-4" />} active={item.href === "/dashboard"}>{item.label}</SidebarItem>;
            })}
          </SidebarGroup>
          <SidebarGroup label="System">
            <SidebarItem href="#" icon={<Settings2 className="size-4" />}>Settings</SidebarItem>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter><div className="rounded-[var(--app-radius)] bg-muted p-3 text-xs text-muted-foreground">Reusable layout foundation for product dashboards.</div></SidebarFooter>
      </Sidebar>
      <div className="min-w-0 flex-1"><div className="border-b bg-card/80 px-4 py-2 backdrop-blur md:hidden"><SidebarMobileTrigger onOpen={() => setMobileOpen(true)} /></div>{children}</div>
    </div>
  );
}

```

// src/components/layouts/index.ts

```ts
export * from "./blog-layout";
export * from "./centered-layout";
export * from "./dashboard-layout";
export * from "./root-layout";

```

// src/components/layouts/root-layout.tsx

```tsx
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

```

// src/components/theme/index.ts

```ts
export * from "./theme-controls";
export * from "./theme-provider";
export * from "./theme-script";

```

// src/components/theme/theme-controls.tsx

```tsx
"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle, Select } from "@/components/ui";
import { colorThemes, densityOptions, navbarVariants, radiusOptions, sidebarVariants, type ThemeMode } from "@/types/theme";
import { densityLabels, radiusLabels, themeLabels } from "@/config/theme.config";
import { useTheme } from "./theme-provider";

export function ThemeControls() {
  const { mode, resolvedMode, colorTheme, radius, density, sidebar, navbar, setMode, setColorTheme, setRadius, setDensity, setSidebar, setNavbar } = useTheme();
  const modes: Array<{ value: ThemeMode; label: string; icon: typeof Sun }> = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];
  return (
    <Card variant="bordered">
      <CardHeader><CardTitle>Theme playground</CardTitle></CardHeader>
      <CardContent className="grid gap-5">
        <div>
          <p className="mb-2 text-sm font-medium">Mode <span className="text-muted-foreground">({resolvedMode})</span></p>
          <div className="flex flex-wrap gap-2">
            {modes.map(({ value, label, icon: Icon }) => <Button key={value} variant={mode === value ? "primary" : "outline"} size="sm" onClick={() => setMode(value)} leftIcon={<Icon className="size-4" />}>{label}</Button>)}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Select label="Color theme" value={colorTheme} onChange={(event) => setColorTheme(event.target.value as typeof colorTheme)} options={colorThemes.map((value) => ({ value, label: themeLabels[value] }))} />
          <Select label="Radius" value={radius} onChange={(event) => setRadius(event.target.value as typeof radius)} options={radiusOptions.map((value) => ({ value, label: radiusLabels[value] }))} />
          <Select label="Density" value={density} onChange={(event) => setDensity(event.target.value as typeof density)} options={densityOptions.map((value) => ({ value, label: densityLabels[value] }))} />
          <Select label="Sidebar style" value={sidebar} onChange={(event) => setSidebar(event.target.value as typeof sidebar)} options={sidebarVariants.map((value) => ({ value, label: value }))} />
          <Select label="Navbar style" value={navbar} onChange={(event) => setNavbar(event.target.value as typeof navbar)} options={navbarVariants.map((value) => ({ value, label: value }))} />
        </div>
      </CardContent>
    </Card>
  );
}

```

// src/components/theme/theme-provider.tsx

```tsx
"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { themeConfig } from "@/config/theme.config";
import type { ColorTheme, Density, NavbarVariant, Radius, SidebarVariant, ThemeMode } from "@/types/theme";

interface ThemeContextValue {
  mode: ThemeMode;
  resolvedMode: "light" | "dark";
  colorTheme: ColorTheme;
  radius: Radius;
  density: Density;
  sidebar: SidebarVariant;
  navbar: NavbarVariant;
  setMode: (mode: ThemeMode) => void;
  setColorTheme: (theme: ColorTheme) => void;
  setRadius: (radius: Radius) => void;
  setDensity: (density: Density) => void;
  setSidebar: (sidebar: SidebarVariant) => void;
  setNavbar: (navbar: NavbarVariant) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside <ThemeProvider>. ");
  return context;
}

function readStorage(key: string, fallback: string) {
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(themeConfig.mode);
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(themeConfig.colorTheme);
  const [radius, setRadiusState] = useState<Radius>(themeConfig.radius);
  const [density, setDensityState] = useState<Density>(themeConfig.density);
  const [sidebar, setSidebarState] = useState<SidebarVariant>(themeConfig.sidebar);
  const [navbar, setNavbarState] = useState<NavbarVariant>(themeConfig.navbar);
  const [systemDark, setSystemDark] = useState(false);

  useEffect(() => {
    setModeState(readStorage("theme-mode", themeConfig.mode) as ThemeMode);
    setColorThemeState(readStorage("color-theme", themeConfig.colorTheme) as ColorTheme);
    setRadiusState(readStorage("theme-radius", themeConfig.radius) as Radius);
    setDensityState(readStorage("theme-density", themeConfig.density) as Density);
    setSidebarState(readStorage("theme-sidebar", themeConfig.sidebar) as SidebarVariant);
    setNavbarState(readStorage("theme-navbar", themeConfig.navbar) as NavbarVariant);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemDark(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const resolvedMode = mode === "system" ? (systemDark ? "dark" : "light") : mode;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", resolvedMode === "dark");
    root.classList.remove(...["blue", "violet", "green", "orange", "rose", "neutral"].map((theme) => `theme-${theme}`));
    root.classList.add(`theme-${colorTheme}`);
    root.dataset.radius = radius;
    root.dataset.density = density;
    root.dataset.sidebar = sidebar;
    root.dataset.navbar = navbar;
  }, [resolvedMode, colorTheme, radius, density, sidebar, navbar]);

  const persist = (key: string, value: string) => {
    try { localStorage.setItem(key, value); } catch {}
  };

  const setMode = (value: ThemeMode) => { setModeState(value); persist("theme-mode", value); };
  const setColorTheme = (value: ColorTheme) => { setColorThemeState(value); persist("color-theme", value); };
  const setRadius = (value: Radius) => { setRadiusState(value); persist("theme-radius", value); };
  const setDensity = (value: Density) => { setDensityState(value); persist("theme-density", value); };
  const setSidebar = (value: SidebarVariant) => { setSidebarState(value); persist("theme-sidebar", value); };
  const setNavbar = (value: NavbarVariant) => { setNavbarState(value); persist("theme-navbar", value); };

  const value = useMemo(() => ({ mode, resolvedMode, colorTheme, radius, density, sidebar, navbar, setMode, setColorTheme, setRadius, setDensity, setSidebar, setNavbar }), [mode, resolvedMode, colorTheme, radius, density, sidebar, navbar]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

```

// src/components/theme/theme-script.tsx

```tsx
import { themeConfig } from "@/config/theme.config";

export function ThemeScript() {
  const serialized = JSON.stringify(themeConfig);
  const script = `(() => { try { const config = ${serialized}; const root = document.documentElement; const mode = localStorage.getItem('theme-mode') || config.mode; const color = localStorage.getItem('color-theme') || config.colorTheme; const radius = localStorage.getItem('theme-radius') || config.radius; const density = localStorage.getItem('theme-density') || config.density; const sidebar = localStorage.getItem('theme-sidebar') || config.sidebar; const navbar = localStorage.getItem('theme-navbar') || config.navbar; const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches; const dark = mode === 'dark' || (mode === 'system' && systemDark); root.classList.toggle('dark', dark); root.classList.add('theme-' + color); root.dataset.radius = radius; root.dataset.density = density; root.dataset.sidebar = sidebar; root.dataset.navbar = navbar; } catch {} })();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

```

// src/components/ui/alert.tsx

```tsx
import type { HTMLAttributes } from "react";
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/cn";

const variants = {
  info: { wrapper: "border-info/30 bg-info/10", icon: Info, iconClass: "text-info" },
  success: { wrapper: "border-success/30 bg-success/10", icon: CircleCheck, iconClass: "text-success" },
  warning: { wrapper: "border-warning/30 bg-warning/10", icon: TriangleAlert, iconClass: "text-warning" },
  error: { wrapper: "border-destructive/30 bg-destructive/10", icon: CircleAlert, iconClass: "text-destructive" },
} as const;

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variants;
  title?: string;
  description?: string;
}

export function Alert({ variant = "info", title, description, className, children, ...props }: AlertProps) {
  const config = variants[variant];
  const Icon = config.icon;
  return (
    <div role="alert" className={cn("flex gap-3 rounded-[var(--app-radius)] border p-4", config.wrapper, className)} {...props}>
      <Icon className={cn("mt-0.5 size-5 shrink-0", config.iconClass)} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        {title ? <p className="text-sm font-semibold">{title}</p> : null}
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
        {children}
      </div>
    </div>
  );
}

```

// src/components/ui/avatar.tsx

```tsx
import { forwardRef, useState, type HTMLAttributes, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { getInitials } from "@/lib/utils";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg" | "xl";
  src?: string;
  alt?: string;
  fallback?: string;
  status?: "online" | "offline" | "busy" | "away";
}

const statusClasses = {
  online: "bg-success",
  offline: "bg-muted-foreground",
  busy: "bg-destructive",
  away: "bg-warning",
} as const;

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { className, size = "md", src, alt, fallback, status, children, ...props },
  ref,
) {
  const [failed, setFailed] = useState(false);
  const sizeClass = { sm: "size-7 text-xs", md: "size-9 text-sm", lg: "size-12 text-base", xl: "size-16 text-lg" }[size];
  return (
    <span ref={ref} className={cn("relative inline-grid shrink-0 place-items-center overflow-visible rounded-full bg-muted font-medium text-muted-foreground", sizeClass, className)} {...props}>
      <span className="absolute inset-0 overflow-hidden rounded-full">
        {src && !failed ? (
          <img src={src} alt={alt ?? ""} className="size-full object-cover" onError={() => setFailed(true)} />
        ) : (
          children ?? getInitials(fallback ?? alt ?? "User")
        )}
      </span>
      {status ? <span className={cn("absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-card", statusClasses[status])} aria-label={status} /> : null}
    </span>
  );
});

export function AvatarImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img {...props} className={cn("size-full object-cover", props.className)} />;
}

export function AvatarFallback({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("grid size-full place-items-center bg-muted text-muted-foreground", className)} {...props} />;
}

```

// src/components/ui/badge.tsx

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const badgeVariants = cva("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium", {
  variants: {
    variant: {
      default: "border-transparent bg-muted text-foreground",
      primary: "border-transparent bg-primary text-primary-foreground",
      secondary: "border-transparent bg-secondary text-secondary-foreground",
      success: "border-transparent bg-success text-success-foreground",
      warning: "border-transparent bg-warning text-warning-foreground",
      destructive: "border-transparent bg-destructive text-destructive-foreground",
      outline: "bg-transparent text-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

```

// src/components/ui/breadcrumb.tsx

```tsx
import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function Breadcrumb({ children, className, ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="Breadcrumb" className={cn("flex min-w-0", className)} {...props}><ol className="flex min-w-0 flex-wrap items-center gap-1.5 text-sm">{children}</ol></nav>;
}

export function BreadcrumbItem({ href, current = false, children, className }: { href?: string; current?: boolean; children: ReactNode; className?: string }) {
  return <li className={cn("flex min-w-0 items-center gap-1.5", className)}>{href && !current ? <Link href={href} className="truncate text-muted-foreground hover:text-foreground">{children}</Link> : <span aria-current={current ? "page" : undefined} className={cn("truncate", current ? "font-medium" : "text-muted-foreground")}>{children}</span>}</li>;
}

export function BreadcrumbSeparator({ children }: { children?: ReactNode }) {
  return <li aria-hidden="true"><span className="inline-flex text-muted-foreground">{children ?? <ChevronRight className="size-4" />}</span></li>;
}

```

// src/components/ui/button.tsx

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cloneElement, isValidElement, type ButtonHTMLAttributes, type ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--app-radius)] text-sm font-medium transition-[background-color,color,border-color,box-shadow,transform] duration-150 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-[0.99]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:opacity-90",
        primary: "bg-primary text-primary-foreground shadow-xs hover:opacity-90",
        secondary: "bg-secondary text-secondary-foreground hover:opacity-85",
        outline: "border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:opacity-90",
        success: "bg-success text-success-foreground shadow-xs hover:opacity-90",
        warning: "bg-warning text-warning-foreground shadow-xs hover:brightness-95",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-[var(--control-xs)] rounded-[calc(var(--app-radius)*0.8)] px-2.5 text-xs",
        sm: "h-[var(--control-sm)] px-3",
        md: "h-[var(--control-md)] px-4",
        lg: "h-[var(--control-lg)] px-5",
        xl: "h-[var(--control-xl)] px-6 text-base",
        icon: "h-[var(--control-md)] w-[var(--control-md)] p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  loading = false,
  loadingText,
  leftIcon,
  rightIcon,
  asChild = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      className: cn(classes, (children.props as { className?: string }).className),
      "aria-disabled": disabled || loading || undefined,
      "aria-busy": loading || undefined,
    } as never);
  }

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : leftIcon}
      {loading && loadingText ? loadingText : children}
      {!loading ? rightIcon : null}
    </button>
  );
}

export { buttonVariants };

```

// src/components/ui/card.tsx

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const cardVariants = cva("rounded-[var(--app-radius)] bg-card text-card-foreground", {
  variants: {
    variant: {
      default: "border shadow-xs",
      bordered: "border shadow-none",
      elevated: "border shadow-md",
      flat: "shadow-none",
      interactive: "border shadow-xs transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export function Card({ className, variant, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant }), className)} {...props} />;
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-1 border-b px-[var(--card-padding)] py-[var(--card-padding)]", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-base font-semibold tracking-tight", className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-[var(--card-padding)] py-[var(--card-padding)]", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col-reverse items-stretch gap-2 border-t px-[var(--card-padding)] py-[var(--card-padding)] sm:flex-row sm:items-center sm:justify-between", className)} {...props} />;
}

export { cardVariants };

```

// src/components/ui/checkbox.tsx

```tsx
import { forwardRef, useEffect, useRef, type InputHTMLAttributes } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  error?: string;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { id, label, description, error, indeterminate = false, className, checked, ...props },
  forwardedRef,
) {
  const localRef = useRef<HTMLInputElement>(null);
  const setRef = (element: HTMLInputElement | null) => {
    localRef.current = element;
    if (typeof forwardedRef === "function") forwardedRef(element);
    else if (forwardedRef) forwardedRef.current = element;
  };

  useEffect(() => {
    if (localRef.current) localRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const messageId = `${id ?? "checkbox"}-message`;
  return (
    <label htmlFor={id} className={cn("flex cursor-pointer items-start gap-3", props.disabled && "cursor-not-allowed opacity-60")}>
      <span className="relative mt-0.5 grid size-4 shrink-0 place-items-center">
        <input
          ref={setRef}
          id={id}
          type="checkbox"
          checked={checked}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={description || error ? messageId : undefined}
          className={cn(
            "peer size-4 appearance-none rounded-[calc(var(--app-radius)*0.75)] border bg-card transition-colors checked:border-primary checked:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-50",
            error && "border-destructive",
            className,
          )}
          {...props}
        />
        <Check className="pointer-events-none absolute size-3 scale-0 stroke-3 text-primary-foreground transition-transform peer-checked:scale-100" aria-hidden="true" />
        <Minus className="pointer-events-none absolute size-3 stroke-3 text-primary-foreground transition-transform peer-indeterminate:scale-100" aria-hidden="true" />
      </span>
      {label || description || error ? (
        <span className="grid gap-0.5">
          {label ? <span className="text-sm font-medium leading-5">{label}</span> : null}
          {description || error ? (
            <span id={messageId} className={cn("text-xs text-muted-foreground", error && "text-destructive")}>
              {error ?? description}
            </span>
          ) : null}
        </span>
      ) : null}
    </label>
  );
});

```

// src/components/ui/dialog.tsx

```tsx
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

```

// src/components/ui/dropdown.tsx

```tsx
"use client";

import { createContext, useContext, useEffect, useRef, useState, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) throw new Error("Dropdown components must be used inside <Dropdown>. ");
  return context;
}

export function Dropdown({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={rootRef} className="relative inline-block text-left">{children}</div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenu({ align = "start", className, children, ...props }: HTMLAttributes<HTMLDivElement> & { align?: "start" | "end" }) {
  const { open, setOpen } = useDropdownContext();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const firstItem = menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])');
    firstItem?.focus();
  }, [open]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])') ?? []);
    if (!items.length) return;
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      items[(currentIndex + 1 + items.length) % items.length]?.focus();
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      items[(currentIndex - 1 + items.length) % items.length]?.focus();
    }
    if (event.key === "Home") {
      event.preventDefault();
      items[0]?.focus();
    }
    if (event.key === "End") {
      event.preventDefault();
      items.at(-1)?.focus();
    }
  };

  if (!open) return null;
  return (
    <div
      ref={menuRef}
      role="menu"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className={cn("absolute z-40 mt-2 min-w-52 rounded-[var(--app-radius)] border bg-popover p-1.5 text-popover-foreground shadow-lg", align === "end" ? "right-0" : "left-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownTrigger({ children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useDropdownContext();
  return (
    <button
      type="button"
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      className={cn("inline-flex items-center justify-center gap-2 rounded-[var(--app-radius)]", className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownItem({
  className,
  icon,
  destructive = false,
  disabled = false,
  children,
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { icon?: ReactNode; destructive?: boolean }) {
  const { setOpen } = useDropdownContext();
  return (
    <button
      type="button"
      role="menuitem"
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(false);
      }}
      className={cn("flex w-full items-center gap-2 rounded-[calc(var(--app-radius)*0.8)] px-2.5 py-2 text-left text-sm outline-none hover:bg-accent focus-visible:bg-accent disabled:opacity-50", destructive && "text-destructive hover:bg-destructive/10 focus-visible:bg-destructive/10", className)}
      {...props}
    >
      {icon}
      <span className="min-w-0 flex-1">{children}</span>
    </button>
  );
}

export function DropdownSeparator({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div role="separator" className={cn("my-1 h-px bg-border", className)} {...props} />;
}

export function DropdownSubmenuHint() {
  return <ChevronRight className="ml-auto size-4 text-muted-foreground" aria-hidden="true" />;
}

export function IconDropdownTrigger({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <DropdownTrigger className={cn("size-9 text-muted-foreground hover:bg-accent", className)} {...props}>
      <MoreHorizontal className="size-4" aria-hidden="true" />
      <span className="sr-only">Open menu</span>
    </DropdownTrigger>
  );
}

```

// src/components/ui/index.ts

```ts
export * from "./alert";
export * from "./avatar";
export * from "./badge";
export * from "./breadcrumb";
export * from "./button";
export * from "./card";
export * from "./checkbox";
export * from "./dialog";
export * from "./dropdown";
export * from "./input";
export * from "./layout";
export * from "./navbar";
export * from "./pagination";
export * from "./radio";
export * from "./select";
export * from "./separator";
export * from "./skeleton";
export * from "./sidebar";
export * from "./switch";
export * from "./table";
export * from "./tabs";
export * from "./textarea";
export * from "./toast";
export * from "./tooltip";

```

// src/components/ui/input.tsx

```tsx
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    name,
    label,
    description,
    error,
    success,
    leftIcon,
    rightIcon,
    containerClassName,
    className,
    disabled,
    ...props
  },
  ref,
) {
  const inputId = id ?? name;
  const messageId = `${inputId ?? "input"}-message`;
  const describedBy = description || error || success ? messageId : props["aria-describedby"];
  const invalid = Boolean(error) || props["aria-invalid"];

  return (
    <div className={cn("grid gap-1.5", containerClassName)}>
      {label ? (
        <label htmlFor={inputId} className="text-sm font-medium">
          {label}
        </label>
      ) : null}
      <div className="relative">
        {leftIcon ? (
          <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-muted-foreground">
            {leftIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          name={name}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(
            "h-[var(--control-md)] w-full rounded-[var(--app-radius)] border bg-card px-3 text-sm text-card-foreground shadow-xs transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:bg-muted disabled:text-muted-foreground",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
            success && !error && "border-success focus:border-success focus:ring-success/20",
            className,
          )}
          {...props}
        />
        {rightIcon ? (
          <span className="absolute inset-y-0 right-3 grid place-items-center text-muted-foreground">
            {rightIcon}
          </span>
        ) : null}
      </div>
      {description || error || success ? (
        <p
          id={messageId}
          className={cn(
            "text-xs text-muted-foreground",
            error && "text-destructive",
            success && !error && "text-success",
          )}
        >
          {error ?? success ?? description}
        </p>
      ) : null}
    </div>
  );
});

```

// src/components/ui/layout.tsx

```tsx
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, as: Comp = "div", children, ...props }: { as?: ElementType; className?: string; children: ReactNode } & Record<string, unknown>) {
  return <Comp className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props}>{children}</Comp>;
}

export function Stack({ gap = "md", className, children, ...props }: ComponentPropsWithoutRef<"div"> & { gap?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" }) {
  const gaps = { xs: "gap-1", sm: "gap-2", md: "gap-4", lg: "gap-6", xl: "gap-8", "2xl": "gap-12" };
  return <div className={cn("flex flex-col", gaps[gap], className)} {...props}>{children}</div>;
}

export function Flex({ gap = "md", align = "center", justify = "start", wrap = false, className, children, ...props }: ComponentPropsWithoutRef<"div"> & { gap?: "xs" | "sm" | "md" | "lg" | "xl"; align?: "start" | "center" | "end" | "stretch"; justify?: "start" | "center" | "between" | "end"; wrap?: boolean }) {
  const gaps = { xs: "gap-1", sm: "gap-2", md: "gap-4", lg: "gap-6", xl: "gap-8" };
  const aligns = { start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch" };
  const justifies = { start: "justify-start", center: "justify-center", between: "justify-between", end: "justify-end" };
  return <div className={cn("flex", gaps[gap], aligns[align], justifies[justify], wrap && "flex-wrap", className)} {...props}>{children}</div>;
}

export function Grid({ columns = "auto", className, children, ...props }: ComponentPropsWithoutRef<"div"> & { columns?: "auto" | "2" | "3" | "4" }) {
  const cols = { auto: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", "2": "grid-cols-1 sm:grid-cols-2", "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" };
  return <div className={cn("grid gap-4", cols[columns], className)} {...props}>{children}</div>;
}

export function Section({ className, children, ...props }: ComponentPropsWithoutRef<"section">) {
  return <section className={cn("py-[var(--section-y)]", className)} {...props}>{children}</section>;
}

export function Spacer({ size = "md" }: { size?: "xs" | "sm" | "md" | "lg" | "xl" }) {
  const sizes = { xs: "h-1", sm: "h-2", md: "h-4", lg: "h-8", xl: "h-12" };
  return <div aria-hidden="true" className={sizes[size]} />;
}

```

// src/components/ui/navbar.tsx

```tsx
"use client";

import { createContext, useContext, useState, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import type { NavbarVariant } from "@/types/theme";

const NavbarContext = createContext<{ mobileOpen: boolean; setMobileOpen: (open: boolean) => void } | null>(null);

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  variant?: NavbarVariant;
}

export function Navbar({ variant = "solid", className, children, ...props }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const styles: Record<NavbarVariant, string> = {
    transparent: "bg-transparent",
    solid: "border-b bg-card/90 backdrop-blur",
    bordered: "border-b bg-background",
    floating: "mt-3 mx-3 rounded-[var(--app-radius)] border bg-card/90 shadow-sm backdrop-blur sm:mx-6",
  };
  return (
    <NavbarContext.Provider value={{ mobileOpen, setMobileOpen }}>
      <header className={cn("sticky top-0 z-30", styles[variant], className)} {...props}>
        <div className="mx-auto flex min-h-[calc(4rem*var(--density-scale))] max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">{children}</div>
      </header>
    </NavbarContext.Provider>
  );
}

export function NavbarLogo({ href = "/", className, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string }) {
  return (
    <Link href={href} className={cn("inline-flex shrink-0 items-center gap-2 font-semibold tracking-tight", className)} {...props}>
      <span className="grid size-8 place-items-center rounded-[calc(var(--app-radius)*0.8)] bg-primary text-primary-foreground">N</span>
      {children ?? <span>Next Theme</span>}
    </Link>
  );
}

export function NavbarMenu({ className, children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <nav aria-label="Primary navigation" className={cn("hidden items-center gap-[var(--nav-gap)] md:flex", className)} {...props}>
      {children}
    </nav>
  );
}

export function NavbarItem({ href, active = false, className, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; active?: boolean }) {
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={cn("rounded-[calc(var(--app-radius)*0.8)] px-3 py-[calc(0.5rem*var(--density-scale))] text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground", active && "bg-accent text-foreground", className)} {...props}>
      {children}
    </Link>
  );
}

export function NavbarActions({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("ml-auto flex items-center gap-2", className)} {...props}>{children}</div>;
}

export function NavbarMobileTrigger({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = useContext(NavbarContext);
  if (!context) throw new Error("NavbarMobileTrigger must be used inside <Navbar>. ");
  const { mobileOpen, setMobileOpen } = context;
  return (
    <button type="button" className={cn("inline-grid size-9 place-items-center rounded-[var(--app-radius)] hover:bg-accent md:hidden", className)} onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label={mobileOpen ? "Close menu" : "Open menu"} {...props}>
      {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
    </button>
  );
}

export function MobileNavbar({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const context = useContext(NavbarContext);
  if (!context) throw new Error("MobileNavbar must be used inside <Navbar>. ");
  if (!context.mobileOpen) return null;
  return <div className={cn("absolute left-0 right-0 top-full border-y bg-card p-4 shadow-lg md:hidden", className)} {...props}>{children}</div>;
}

```

// src/components/ui/pagination.tsx

```tsx
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

```

// src/components/ui/radio.tsx

```tsx
import { forwardRef, type HTMLAttributes, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
}

export function RadioGroup({ label, error, className, children, ...props }: RadioGroupProps) {
  const messageId = `${props.id ?? "radio-group"}-message`;
  return (
    <fieldset className={cn("grid gap-3", className)} aria-invalid={Boolean(error) || undefined} aria-describedby={error ? messageId : undefined} {...props}>
      {label ? <legend className="text-sm font-medium">{label}</legend> : null}
      {children}
      {error ? <p id={messageId} className="text-xs text-destructive">{error}</p> : null}
    </fieldset>
  );
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  description?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { id, label, description, disabled, className, ...props },
  ref,
) {
  return (
    <label htmlFor={id} className={cn("flex cursor-pointer items-start gap-3", disabled && "cursor-not-allowed opacity-60")}>
      <span className="relative mt-1 grid size-4 place-items-center">
        <input
          ref={ref}
          id={id}
          type="radio"
          disabled={disabled}
          className={cn("peer size-4 appearance-none rounded-full border bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 checked:border-primary", className)}
          {...props}
        />
        <span className="pointer-events-none absolute size-2 rounded-full bg-primary opacity-0 transition-opacity peer-checked:opacity-100" />
      </span>
      {label || description ? (
        <span className="grid gap-0.5">
          {label ? <span className="text-sm font-medium leading-5">{label}</span> : null}
          {description ? <span className="text-xs text-muted-foreground">{description}</span> : null}
        </span>
      ) : null}
    </label>
  );
});

```

// src/components/ui/select.tsx

```tsx
import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  description?: string;
  error?: string;
  options?: SelectOption[];
  placeholder?: string;
  containerClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { id, name, label, description, error, options, placeholder, containerClassName, className, children, ...props },
  ref,
) {
  const selectId = id ?? name;
  const messageId = `${selectId ?? "select"}-message`;
  return (
    <div className={cn("grid gap-1.5", containerClassName)}>
      {label ? <label className="text-sm font-medium" htmlFor={selectId}>{label}</label> : null}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          name={name}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={description || error ? messageId : undefined}
          className={cn(
            "h-[var(--control-md)] w-full appearance-none rounded-[var(--app-radius)] border bg-card px-3 pr-10 text-sm text-card-foreground shadow-xs focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:bg-muted disabled:text-muted-foreground",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
            className,
          )}
          {...props}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options?.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      </div>
      {description || error ? (
        <p id={messageId} className={cn("text-xs text-muted-foreground", error && "text-destructive")}>
          {error ?? description}
        </p>
      ) : null}
    </div>
  );
});

```

// src/components/ui/separator.tsx

```tsx
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Separator({ orientation = "horizontal", className, ...props }: HTMLAttributes<HTMLDivElement> & { orientation?: "horizontal" | "vertical" }) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(orientation === "horizontal" ? "h-px w-full" : "h-full w-px", "shrink-0 bg-border", className)}
      {...props}
    />
  );
}

```

// src/components/ui/sidebar.tsx

```tsx
"use client";

import { createContext, useContext, useState, type HTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { ChevronDown, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { cn } from "@/lib/cn";
import type { SidebarVariant } from "@/types/theme";

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("Sidebar subcomponents must be used inside <Sidebar>. ");
  return context;
}

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  variant?: SidebarVariant;
  width?: "sm" | "md" | "lg";
}

export function Sidebar({
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  mobileOpen: controlledMobileOpen,
  onMobileOpenChange,
  variant = "default",
  width = "md",
  className,
  children,
  ...props
}: SidebarProps) {
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(defaultCollapsed);
  const [uncontrolledMobileOpen, setUncontrolledMobileOpen] = useState(false);
  const collapsed = controlledCollapsed ?? uncontrolledCollapsed;
  const mobileOpen = controlledMobileOpen ?? uncontrolledMobileOpen;
  const setCollapsed = (value: boolean) => {
    if (controlledCollapsed === undefined) setUncontrolledCollapsed(value);
    onCollapsedChange?.(value);
  };
  const setMobileOpen = (value: boolean) => {
    if (controlledMobileOpen === undefined) setUncontrolledMobileOpen(value);
    onMobileOpenChange?.(value);
  };

  const widths = { sm: "w-56", md: "w-64", lg: "w-72" };
  const styles: Record<SidebarVariant, string> = {
    default: "border-r bg-card",
    bordered: "border-r bg-background",
    floating: "m-3 rounded-[var(--app-radius)] border bg-card shadow-sm",
    compact: "border-r bg-card",
  };

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}>
      <>
        {mobileOpen ? <button aria-label="Close sidebar" className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setMobileOpen(false)} /> : null}
        <aside
          className={cn(
            "z-50 flex shrink-0 flex-col transition-[width,transform] duration-200 md:relative md:translate-x-0",
            styles[variant],
            collapsed ? "w-16" : widths[width],
            mobileOpen ? "fixed inset-y-0 left-0 translate-x-0" : "fixed -translate-x-full md:sticky md:top-0 md:h-screen md:translate-x-0",
            className,
          )}
          aria-label="Sidebar navigation"
          data-collapsed={collapsed}
          {...props}
        >
          {children}
        </aside>
      </>
    </SidebarContext.Provider>
  );
}

export function SidebarHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex min-h-[calc(4rem*var(--density-scale))] items-center justify-between gap-2 px-3", className)} {...props}>{children}</div>;
}

export function SidebarContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("min-h-0 flex-1 overflow-y-auto px-2 py-3", className)} {...props} />;
}

export function SidebarFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-t p-2", className)} {...props} />;
}

export function SidebarGroup({ label, className, children, ...props }: HTMLAttributes<HTMLDivElement> & { label?: string }) {
  const { collapsed } = useSidebarContext();
  return (
    <section className={cn("mb-5", className)} {...props}>
      {label && !collapsed ? <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</p> : null}
      {children}
    </section>
  );
}

export function SidebarItem({ href, active = false, icon, badge, expandable = false, defaultExpanded = false, children, className, ...props }: ComponentProps<typeof Link> & { href: string; active?: boolean; icon?: ReactNode; badge?: ReactNode; expandable?: boolean; defaultExpanded?: boolean }) {
  const { collapsed } = useSidebarContext();
  const [expanded, setExpanded] = useState(defaultExpanded);
  if (expandable) {
    return (
      <div className="mb-0.5">
        <button type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)} className={cn("flex w-full items-center gap-3 rounded-[calc(var(--app-radius)*0.8)] px-2.5 py-[calc(0.5rem*var(--density-scale))] text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground", active && "bg-accent text-foreground")}>
          <span className="grid size-5 shrink-0 place-items-center">{icon}</span>
          {!collapsed ? <span className="min-w-0 flex-1 text-left">{children}</span> : null}
          {!collapsed ? <ChevronDown className={cn("size-4 transition-transform", expanded && "rotate-180")} aria-hidden="true" /> : null}
        </button>
      </div>
    );
  }
  return (
    <Link href={href} aria-current={active ? "page" : undefined} title={collapsed && typeof children === "string" ? children : undefined} className={cn("mb-0.5 flex items-center gap-3 rounded-[calc(var(--app-radius)*0.8)] px-2.5 py-[calc(0.5rem*var(--density-scale))] text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground", active && "bg-accent text-foreground", className)} {...props}>
      <span className="grid size-5 shrink-0 place-items-center">{icon}</span>
      {!collapsed ? <span className="min-w-0 flex-1 truncate">{children}</span> : null}
      {!collapsed && badge ? badge : null}
    </Link>
  );
}

export function SidebarSeparator({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("my-2 h-px bg-border", className)} {...props} />;
}

export function SidebarToggle({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { collapsed, setCollapsed } = useSidebarContext();
  return (
    <button type="button" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} className={cn("inline-grid size-9 place-items-center rounded-[var(--app-radius)] text-muted-foreground hover:bg-accent hover:text-accent-foreground", className)} {...props}>
      {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
    </button>
  );
}

export function SidebarMobileTrigger({ onOpen, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { onOpen: () => void }) {
  return <button type="button" onClick={onOpen} aria-label="Open sidebar" className={cn("inline-grid size-9 place-items-center rounded-[var(--app-radius)] hover:bg-accent md:hidden", className)} {...props}><PanelLeftOpen className="size-4" /></button>;
}

export function SidebarMobileClose({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setMobileOpen } = useSidebarContext();
  return (
    <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close sidebar" className={cn("inline-grid size-9 place-items-center rounded-[var(--app-radius)] md:hidden", className)} {...props}>
      <X className="size-4" />
    </button>
  );
}

```

// src/components/ui/skeleton.tsx

```tsx
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-[calc(var(--app-radius)*0.75)] bg-muted", className)} {...props} />;
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("grid gap-2", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton key={index} className={cn("h-4", index === lines - 1 && "w-2/3")} />
      ))}
    </div>
  );
}

```

// src/components/ui/switch.tsx

```tsx
"use client";

import { useId, useState, type ButtonHTMLAttributes } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  loading?: boolean;
}

export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  label,
  description,
  loading = false,
  className,
  disabled,
  ...props
}: SwitchProps) {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
  const checked = controlledChecked ?? uncontrolledChecked;
  const descriptionId = useId();

  const toggle = () => {
    if (disabled || loading) return;
    const next = !checked;
    if (controlledChecked === undefined) setUncontrolledChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <div className="flex items-start justify-between gap-4">
      {label || description ? (
        <div className="grid gap-0.5">
          {label ? <span className="text-sm font-medium">{label}</span> : null}
          {description ? <span id={descriptionId} className="text-xs text-muted-foreground">{description}</span> : null}
        </div>
      ) : null}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-describedby={description ? descriptionId : undefined}
        disabled={disabled || loading}
        onClick={toggle}
        className={cn(
          "inline-flex h-6 w-11 shrink-0 items-center rounded-full border p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-50",
          checked ? "border-primary bg-primary" : "bg-muted",
          className,
        )}
        {...props}
      >
        <span className={cn("grid size-5 place-items-center rounded-full bg-white shadow-sm transition-transform", checked && "translate-x-5")}>
          {loading ? <LoaderCircle className="size-3 animate-spin text-muted-foreground" aria-hidden="true" /> : null}
        </span>
      </button>
    </div>
  );
}

```

// src/components/ui/table.tsx

```tsx
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

```

// src/components/ui/tabs.tsx

```tsx
"use client";

import { createContext, useContext, useId, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs components must be used inside <Tabs>. ");
  return context;
}

export function Tabs({ defaultValue, value: controlledValue, onValueChange, className, children, ...props }: HTMLAttributes<HTMLDivElement> & { defaultValue?: string; value?: string; onValueChange?: (value: string) => void }) {
  const baseId = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? "");
  const value = controlledValue ?? uncontrolledValue;
  const setValue = (nextValue: string) => {
    if (controlledValue === undefined) setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
  };
  return <TabsContext.Provider value={{ value, setValue, baseId }}><div className={cn("grid gap-4", className)} {...props}>{children}</div></TabsContext.Provider>;
}

export function TabsList({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { setValue } = useTabs();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const triggers = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'));
    const index = triggers.indexOf(document.activeElement as HTMLButtonElement);
    if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); const next = triggers[(index + 1) % triggers.length]; next?.focus(); next?.click(); }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); const next = triggers[(index - 1 + triggers.length) % triggers.length]; next?.focus(); next?.click(); }
    if (event.key === "Home") { event.preventDefault(); triggers[0]?.focus(); triggers[0]?.click(); }
    if (event.key === "End") { event.preventDefault(); triggers.at(-1)?.focus(); triggers.at(-1)?.click(); }
  };
  return <div role="tablist" aria-orientation="horizontal" onKeyDown={handleKeyDown} className={cn("inline-flex max-w-full gap-1 overflow-x-auto rounded-[var(--app-radius)] bg-muted p-1", className)} {...props}>{children}</div>;
}

export function TabsTrigger({ value, disabled, className, children, ...props }: HTMLAttributes<HTMLButtonElement> & { value: string; disabled?: boolean }) {
  const { value: activeValue, setValue, baseId } = useTabs();
  const active = value === activeValue;
  return <button type="button" id={`${baseId}-tab-${value}`} role="tab" aria-selected={active} aria-controls={`${baseId}-panel-${value}`} tabIndex={active ? 0 : -1} disabled={disabled} onClick={() => setValue(value)} className={cn("whitespace-nowrap rounded-[calc(var(--app-radius)*0.8)] px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none", active && "bg-card text-foreground shadow-xs", className)} {...props}>{children}</button>;
}

export function TabsContent({ value, className, children, ...props }: HTMLAttributes<HTMLDivElement> & { value: string }) {
  const { value: activeValue, baseId } = useTabs();
  if (value !== activeValue) return null;
  return <div role="tabpanel" id={`${baseId}-panel-${value}`} aria-labelledby={`${baseId}-tab-${value}`} tabIndex={0} className={cn("focus-visible:outline-none", className)} {...props}>{children}</div>;
}

```

// src/components/ui/textarea.tsx

```tsx
"use client";

import { forwardRef, useState, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  showCount?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
  containerClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { id, name, label, description, error, success, showCount, maxLength, resize = "vertical", containerClassName, className, defaultValue, value, onChange, ...props },
  ref,
) {
  const initial = typeof value === "string" ? value : typeof defaultValue === "string" ? defaultValue : "";
  const [count, setCount] = useState(initial.length);
  const textareaId = id ?? name;
  const messageId = `${textareaId ?? "textarea"}-message`;
  const handleChange: NonNullable<TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"]> = (event) => {
    setCount(event.target.value.length);
    onChange?.(event);
  };

  return (
    <div className={cn("grid gap-1.5", containerClassName)}>
      {label ? <label htmlFor={textareaId} className="text-sm font-medium">{label}</label> : null}
      <textarea
        ref={ref}
        id={textareaId}
        name={name}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={description || error || success || showCount ? messageId : undefined}
        className={cn(
          "min-h-28 w-full rounded-[var(--app-radius)] border bg-card px-3 py-2.5 text-sm text-card-foreground shadow-xs transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:bg-muted disabled:text-muted-foreground",
          resize === "none" && "resize-none",
          resize === "horizontal" && "resize-x",
          resize === "vertical" && "resize-y",
          resize === "both" && "resize",
          error && "border-destructive focus:border-destructive focus:ring-destructive/20",
          success && !error && "border-success focus:border-success focus:ring-success/20",
          className,
        )}
        {...props}
      />
      {(description || error || success || showCount) ? (
        <div id={messageId} className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className={cn(error && "text-destructive", success && !error && "text-success")}>{error ?? success ?? description}</span>
          {showCount ? <span aria-live="polite">{count}{maxLength ? `/${maxLength}` : ""}</span> : null}
        </div>
      ) : null}
    </div>
  );
});

```

// src/components/ui/toast.tsx

```tsx
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

```

// src/components/ui/tooltip.tsx

```tsx
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

```

// src/config/theme.config.ts

```ts
import type { ThemeConfig } from "@/types/theme";

export const themeConfig: ThemeConfig = {
  colorTheme: "blue",
  mode: "system",
  radius: "md",
  density: "comfortable",
  sidebar: "default",
  navbar: "solid",
};

export const themeLabels = {
  blue: "Blue",
  violet: "Violet",
  green: "Green",
  orange: "Orange",
  rose: "Rose",
  neutral: "Neutral",
} as const;

export const radiusLabels = {
  none: "None",
  sm: "Small",
  md: "Medium",
  lg: "Large",
  xl: "Extra Large",
  "2xl": "2XL",
  full: "Pill",
} as const;

export const densityLabels = {
  compact: "Compact",
  comfortable: "Comfortable",
  spacious: "Spacious",
} as const;

```

// src/hooks/use-mobile.ts

```ts
"use client";

import { useEffect, useState } from "react";

export function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [breakpoint]);
  return isMobile;
}

```

// src/hooks/use-theme.ts

```ts
export { useTheme } from "@/components/theme/theme-provider";

```

// src/hooks/use-toast.ts

```ts
export { toast, useToast } from "@/components/ui/toast";

```

// src/lib/cn.ts

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

```

// src/lib/constants.ts

```ts
export const navigationItems = [
  { label: "Components", href: "/components" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Forms", href: "/forms" },
  { label: "Layouts", href: "/layouts" },
  { label: "Themes", href: "/themes" },
] as const;

export const dashboardItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Components", href: "/components" },
  { label: "Forms", href: "/forms" },
  { label: "Layouts", href: "/layouts" },
  { label: "Themes", href: "/themes" },
] as const;

```

// src/lib/utils.ts

```ts
export function formatNumber(value: number, locale = "en-US") {
  return new Intl.NumberFormat(locale).format(value);
}

export function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

```

// src/styles/globals.css

```css
@import "tailwindcss";
@import "./theme.css";

@custom-variant dark (&:where(.dark, .dark *));

* {
  border-color: var(--border);
}

html {
  min-width: 320px;
  background: var(--background);
  color: var(--foreground);
  text-rendering: optimizeLegibility;
}

body {
  min-height: 100vh;
  margin: 0;
  background:
    radial-gradient(circle at top, color-mix(in oklab, var(--primary) 5%, transparent), transparent 36rem),
    var(--background);
  color: var(--foreground);
  font-family: var(--font-sans-token);
}

::selection {
  background: color-mix(in oklab, var(--primary) 24%, transparent);
  color: var(--foreground);
}

:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

button,
a,
input,
select,
textarea {
  -webkit-tap-highlight-color: transparent;
}

button:disabled,
input:disabled,
select:disabled,
textarea:disabled {
  cursor: not-allowed;
}

a {
  color: inherit;
  text-decoration: none;
}

code,
kbd,
samp,
pre {
  font-family: var(--font-mono-token);
}

pre {
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: var(--app-radius);
  background: var(--muted);
  padding: 1rem;
  font-size: 0.875rem;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@utility focus-ring {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

@utility surface {
  background: var(--card);
  color: var(--card-foreground);
}

@utility muted-surface {
  background: var(--muted);
  color: var(--muted-foreground);
}

.text-display { font-size: var(--type-display-size); line-height: var(--type-display-line); font-weight: var(--type-display-weight); letter-spacing: -0.035em; }
.text-h1 { font-size: var(--type-h1-size); line-height: var(--type-h1-line); font-weight: var(--type-h1-weight); letter-spacing: -0.03em; }
.text-h2 { font-size: var(--type-h2-size); line-height: var(--type-h2-line); font-weight: var(--type-h2-weight); letter-spacing: -0.025em; }
.text-h3 { font-size: var(--type-h3-size); line-height: var(--type-h3-line); font-weight: var(--type-h3-weight); letter-spacing: -0.02em; }
.text-body { font-size: var(--type-body-size); line-height: var(--type-body-line); font-weight: var(--type-body-weight); }
.text-body-small { font-size: var(--type-small-size); line-height: var(--type-small-line); }
.text-caption { font-size: var(--type-caption-size); line-height: var(--type-caption-line); }
.text-label { font-size: var(--type-label-size); line-height: var(--type-label-line); font-weight: var(--type-label-weight); }
.text-code { font-size: var(--type-code-size); font-family: var(--font-mono-token); }

```

// src/styles/theme.css

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --font-sans: var(--font-sans-token);
  --font-mono: var(--font-mono-token);
}

:root {
  color-scheme: light;
  --background: oklch(0.985 0.003 255);
  --foreground: oklch(0.23 0.02 255);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.23 0.02 255);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.23 0.02 255);
  --primary: oklch(0.58 0.19 252);
  --primary-foreground: oklch(0.99 0.002 255);
  --secondary: oklch(0.95 0.018 252);
  --secondary-foreground: oklch(0.31 0.04 252);
  --muted: oklch(0.96 0.006 255);
  --muted-foreground: oklch(0.53 0.025 255);
  --accent: oklch(0.93 0.04 252);
  --accent-foreground: oklch(0.3 0.04 252);
  --destructive: oklch(0.62 0.21 25);
  --destructive-foreground: oklch(0.99 0.004 25);
  --success: oklch(0.62 0.16 150);
  --success-foreground: oklch(0.98 0.004 150);
  --warning: oklch(0.74 0.17 82);
  --warning-foreground: oklch(0.24 0.05 82);
  --info: oklch(0.68 0.15 235);
  --info-foreground: oklch(0.98 0.004 235);
  --border: oklch(0.89 0.01 255);
  --input: oklch(0.89 0.01 255);
  --ring: oklch(0.58 0.19 252);
  --radius-none: 0px;
  --radius-sm: 0.375rem;
  --radius-md: 0.625rem;
  --radius-lg: 0.875rem;
  --radius-xl: 1.125rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;
  --shadow-none: 0 0 #0000;
  --shadow-xs: 0 1px 2px rgb(15 23 42 / 0.04);
  --shadow-sm: 0 1px 3px rgb(15 23 42 / 0.08), 0 1px 2px rgb(15 23 42 / 0.04);
  --shadow-md: 0 8px 24px rgb(15 23 42 / 0.1);
  --shadow-lg: 0 16px 40px rgb(15 23 42 / 0.12);
  --shadow-xl: 0 24px 64px rgb(15 23 42 / 0.16);
  --font-sans-token: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono-token: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  --type-display-size: clamp(2.75rem, 7vw, 5.5rem);
  --type-display-line: 1.02;
  --type-display-weight: 750;
  --type-h1-size: clamp(2rem, 4vw, 3.75rem);
  --type-h1-line: 1.08;
  --type-h1-weight: 700;
  --type-h2-size: clamp(1.75rem, 3vw, 2.5rem);
  --type-h2-line: 1.12;
  --type-h2-weight: 700;
  --type-h3-size: 1.5rem;
  --type-h3-line: 1.2;
  --type-h3-weight: 650;
  --type-body-size: 1rem;
  --type-body-line: 1.625;
  --type-body-weight: 400;
  --type-small-size: 0.875rem;
  --type-small-line: 1.5;
  --type-caption-size: 0.75rem;
  --type-caption-line: 1.4;
  --type-label-size: 0.875rem;
  --type-label-line: 1.35;
  --type-label-weight: 550;
  --type-code-size: 0.875rem;
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  --space-4xl: 6rem;
  --control-xs: 1.75rem;
  --control-sm: 2.125rem;
  --control-md: 2.5rem;
  --control-lg: 2.875rem;
  --control-xl: 3.25rem;
  --density-scale: 1;
  --card-padding: 1.25rem;
  --table-cell-y: 0.75rem;
  --nav-gap: 0.25rem;
  --section-y: 5rem;
}

.dark {
  color-scheme: dark;
  --background: oklch(0.17 0.012 255);
  --foreground: oklch(0.96 0.005 255);
  --card: oklch(0.21 0.014 255);
  --card-foreground: oklch(0.96 0.005 255);
  --popover: oklch(0.2 0.014 255);
  --popover-foreground: oklch(0.96 0.005 255);
  --secondary: oklch(0.26 0.025 255);
  --secondary-foreground: oklch(0.93 0.009 255);
  --muted: oklch(0.245 0.012 255);
  --muted-foreground: oklch(0.72 0.025 255);
  --accent: oklch(0.28 0.04 255);
  --accent-foreground: oklch(0.94 0.009 255);
  --destructive: oklch(0.64 0.2 25);
  --destructive-foreground: oklch(0.99 0.004 25);
  --success: oklch(0.66 0.15 150);
  --success-foreground: oklch(0.99 0.004 150);
  --warning: oklch(0.77 0.15 82);
  --warning-foreground: oklch(0.2 0.04 82);
  --info: oklch(0.72 0.14 235);
  --info-foreground: oklch(0.18 0.02 235);
  --border: oklch(0.32 0.014 255);
  --input: oklch(0.34 0.015 255);
  --ring: oklch(0.69 0.16 252);
}

html[data-radius="none"] { --app-radius: var(--radius-none); }
html[data-radius="sm"] { --app-radius: var(--radius-sm); }
html[data-radius="md"] { --app-radius: var(--radius-md); }
html[data-radius="lg"] { --app-radius: var(--radius-lg); }
html[data-radius="xl"] { --app-radius: var(--radius-xl); }
html[data-radius="2xl"] { --app-radius: var(--radius-2xl); }
html[data-radius="full"] { --app-radius: var(--radius-full); }
html:not([data-radius]) { --app-radius: var(--radius-md); }

html[data-density="compact"] {
  --control-xs: 1.625rem;
  --control-sm: 1.875rem;
  --control-md: 2.25rem;
  --control-lg: 2.625rem;
  --control-xl: 3rem;
  --density-scale: 0.875;
  --card-padding: 1rem;
  --table-cell-y: 0.55rem;
  --nav-gap: 0.1rem;
  --section-y: 4rem;
}

html[data-density="spacious"] {
  --control-xs: 1.875rem;
  --control-sm: 2.375rem;
  --control-md: 2.75rem;
  --control-lg: 3.125rem;
  --control-xl: 3.5rem;
  --density-scale: 1.125;
  --card-padding: 1.5rem;
  --table-cell-y: 0.95rem;
  --nav-gap: 0.5rem;
  --section-y: 6rem;
}

html.theme-violet {
  --primary: oklch(0.59 0.23 304);
  --secondary: oklch(0.95 0.03 304);
  --secondary-foreground: oklch(0.33 0.06 304);
  --accent: oklch(0.93 0.05 304);
  --accent-foreground: oklch(0.31 0.05 304);
  --ring: oklch(0.59 0.23 304);
}

html.dark.theme-violet {
  --primary: oklch(0.7 0.18 304);
  --secondary: oklch(0.27 0.035 304);
  --secondary-foreground: oklch(0.94 0.012 304);
  --accent: oklch(0.29 0.05 304);
  --accent-foreground: oklch(0.94 0.012 304);
  --ring: oklch(0.71 0.18 304);
}

html.theme-green {
  --primary: oklch(0.59 0.17 155);
  --secondary: oklch(0.95 0.025 155);
  --secondary-foreground: oklch(0.29 0.05 155);
  --accent: oklch(0.92 0.045 155);
  --accent-foreground: oklch(0.29 0.05 155);
  --ring: oklch(0.59 0.17 155);
}

html.dark.theme-green {
  --primary: oklch(0.7 0.15 155);
  --secondary: oklch(0.26 0.03 155);
  --secondary-foreground: oklch(0.94 0.012 155);
  --accent: oklch(0.28 0.045 155);
  --accent-foreground: oklch(0.94 0.012 155);
  --ring: oklch(0.72 0.15 155);
}

html.theme-orange {
  --primary: oklch(0.68 0.19 54);
  --primary-foreground: oklch(0.2 0.04 54);
  --secondary: oklch(0.95 0.03 54);
  --secondary-foreground: oklch(0.32 0.06 54);
  --accent: oklch(0.93 0.05 54);
  --accent-foreground: oklch(0.32 0.06 54);
  --ring: oklch(0.68 0.19 54);
}

html.dark.theme-orange {
  --primary: oklch(0.76 0.16 58);
  --primary-foreground: oklch(0.2 0.04 58);
  --secondary: oklch(0.28 0.035 54);
  --secondary-foreground: oklch(0.95 0.012 54);
  --accent: oklch(0.3 0.045 54);
  --accent-foreground: oklch(0.95 0.012 54);
  --ring: oklch(0.77 0.16 58);
}

html.theme-rose {
  --primary: oklch(0.61 0.21 8);
  --secondary: oklch(0.95 0.03 8);
  --secondary-foreground: oklch(0.32 0.05 8);
  --accent: oklch(0.93 0.05 8);
  --accent-foreground: oklch(0.31 0.05 8);
  --ring: oklch(0.61 0.21 8);
}

html.dark.theme-rose {
  --primary: oklch(0.72 0.17 8);
  --secondary: oklch(0.28 0.035 8);
  --secondary-foreground: oklch(0.95 0.01 8);
  --accent: oklch(0.3 0.045 8);
  --accent-foreground: oklch(0.95 0.01 8);
  --ring: oklch(0.73 0.17 8);
}

html.theme-neutral {
  --primary: oklch(0.32 0.012 255);
  --secondary: oklch(0.94 0.006 255);
  --secondary-foreground: oklch(0.28 0.014 255);
  --accent: oklch(0.91 0.008 255);
  --accent-foreground: oklch(0.25 0.012 255);
  --ring: oklch(0.38 0.012 255);
}

html.dark.theme-neutral {
  --primary: oklch(0.86 0.008 255);
  --primary-foreground: oklch(0.2 0.012 255);
  --secondary: oklch(0.28 0.012 255);
  --secondary-foreground: oklch(0.93 0.008 255);
  --accent: oklch(0.3 0.012 255);
  --accent-foreground: oklch(0.94 0.008 255);
  --ring: oklch(0.8 0.008 255);
}

```

// src/types/theme.ts

```ts
export const colorThemes = [
  "blue",
  "violet",
  "green",
  "orange",
  "rose",
  "neutral",
] as const;

export const themeModes = ["light", "dark", "system"] as const;
export const radiusOptions = ["none", "sm", "md", "lg", "xl", "2xl", "full"] as const;
export const densityOptions = ["compact", "comfortable", "spacious"] as const;
export const sidebarVariants = ["default", "bordered", "floating", "compact"] as const;
export const navbarVariants = ["transparent", "solid", "bordered", "floating"] as const;

export type ColorTheme = (typeof colorThemes)[number];
export type ThemeMode = (typeof themeModes)[number];
export type Radius = (typeof radiusOptions)[number];
export type Density = (typeof densityOptions)[number];
export type SidebarVariant = (typeof sidebarVariants)[number];
export type NavbarVariant = (typeof navbarVariants)[number];

export interface ThemeConfig {
  colorTheme: ColorTheme;
  mode: ThemeMode;
  radius: Radius;
  density: Density;
  sidebar: SidebarVariant;
  navbar: NavbarVariant;
}

```

// tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", ".next/types/**/*.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}

```