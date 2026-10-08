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
