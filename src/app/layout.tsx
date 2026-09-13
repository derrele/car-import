import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { ThemeProvider } from "@/components/theme-provider";
export const metadata: Metadata = { title: "Car Import", description: "Anàlisi d'oportunitats d'importació de vehicles" };
export default function RootLayout({ children }: LayoutProps<"/">) { return <html lang="ca" suppressHydrationWarning><body className="min-h-screen bg-background font-sans text-foreground antialiased"><ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange><AppShell>{children}</AppShell></ThemeProvider></body></html>; }
