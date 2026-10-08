import { themeConfig } from "@/config/theme.config";

export function ThemeScript() {
  const serialized = JSON.stringify(themeConfig);
  const script = `(() => { try { const config = ${serialized}; const root = document.documentElement; const mode = localStorage.getItem('theme-mode') || config.mode; const color = localStorage.getItem('color-theme') || config.colorTheme; const radius = localStorage.getItem('theme-radius') || config.radius; const density = localStorage.getItem('theme-density') || config.density; const sidebar = localStorage.getItem('theme-sidebar') || config.sidebar; const navbar = localStorage.getItem('theme-navbar') || config.navbar; const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches; const dark = mode === 'dark' || (mode === 'system' && systemDark); root.classList.toggle('dark', dark); root.classList.add('theme-' + color); root.dataset.radius = radius; root.dataset.density = density; root.dataset.sidebar = sidebar; root.dataset.navbar = navbar; } catch {} })();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
