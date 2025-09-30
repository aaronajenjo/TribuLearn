"use client";

import { Icons } from "@/components/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { UserNav } from "@/components/ui/user-nav";
import { useLocale } from "@/hooks/use-locale";
import {
  BookOpen,
  Code2,
  LayoutDashboard,
  ClipboardList,
  CodeSquare,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useLocale();

  const navItems = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      label: t("nav.dashboard"),
    },
    { href: "/paths", icon: BookOpen, label: t("nav.learningPaths") },
    { href: "/playground", icon: Code2, label: t("nav.playground") },
    { href: "/tests", icon: ClipboardList, label: t("nav.tests") },
    { href: "/refactors", icon: CodeSquare, label: t("nav.refactors") },
  ];

  return (
    <SidebarProvider>
      <div className="flex">
        <Sidebar
          collapsible="none"
          className="h-screen sticky top-0"
        >
          <SidebarHeader className="mb-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sopra_logo.png" alt="Sopra Steria Logo" width={32} height={32} className="size-8" />
              <h1 className="text-lg font-bold font-headline tracking-tighter text-sidebar-primary-foreground truncate">
                Tribu Learning
              </h1>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="px-2 space-y-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                    className="py-2 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <LanguageSwitcher />
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1">
          <header className="flex h-14 items-center justify-between border-b bg-card sticky top-0 z-10 w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold font-headline">
                {navItems.find((item) => pathname.startsWith(item.href))
                  ?.label || "Tribu"}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <UserNav />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
