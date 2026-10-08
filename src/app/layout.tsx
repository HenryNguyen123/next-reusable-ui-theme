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
