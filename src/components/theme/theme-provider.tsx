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
