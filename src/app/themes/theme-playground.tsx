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
