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
