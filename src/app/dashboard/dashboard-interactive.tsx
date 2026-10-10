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
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div><CardTitle>Projects</CardTitle>
              <CardDescription>Recent product work across the workspace.</CardDescription>
            </div>
            <Dropdown>
              <DropdownTrigger className="grid size-9 place-items-center rounded-[var(--app-radius)] hover:bg-accent" aria-label="Project actions"><MoreHorizontal className="size-4" /></DropdownTrigger><DropdownMenu align="end"><DropdownItem>Export CSV</DropdownItem><DropdownItem>Refresh data</DropdownItem></DropdownMenu>
            </Dropdown>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow><TableHead>Project</TableHead><TableHead>Owner</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Revenue</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => <TableRow key={project.name}><TableCell className="font-medium">{project.name}</TableCell><TableCell>{project.owner}</TableCell><TableCell><Badge variant={project.status === "Live" ? "success" : project.status === "Review" ? "warning" : "secondary"}>{project.status}</Badge></TableCell><TableCell className="text-right font-medium">{project.revenue}</TableCell></TableRow>)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Stack></Container></main>
    </div>
  );
}
