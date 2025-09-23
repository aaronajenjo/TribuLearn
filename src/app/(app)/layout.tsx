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
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { UserNav } from "@/components/ui/user-nav";
import { useLocale } from "@/hooks/use-locale";
import {
  BookOpen,
  Code2,
  LayoutDashboard,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <Icons.logo className="size-7 text-primary" />
            <h1 className="text-lg font-bold font-headline tracking-tighter text-foreground">
              Tribu Learning
            </h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
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
          <UserNav />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-card px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h2 className="text-lg font-semibold font-headline">
              {navItems.find((item) => pathname.startsWith(item.href))?.label ||
                "Tribu"}
            </h2>
          </div>
          {/* <UserNav /> */}
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
