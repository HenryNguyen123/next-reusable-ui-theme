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
