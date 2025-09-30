"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import {
  SidebarMenuButton
} from "@/components/ui/sidebar";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          variant="ghost"
          className="w-full justify-start"
        >
          <Languages/>
          <span>{t("userNav.language")}</span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" className="mb-2 w-56">
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(value) => setLocale(value as "en" | "es")}
        >
          <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="es">Español</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
