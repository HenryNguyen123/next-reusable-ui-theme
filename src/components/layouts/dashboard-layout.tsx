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
