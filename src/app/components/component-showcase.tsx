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
