"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Languages, LogOut, Settings } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import Image from 'next/image';

const aerolineLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAABaCAYAAADh/yPsAAACiUlEQVR4nO3dy03DQBQE0bn/amCgAChIORw2IwvCwAgcwHIKxQFqICTgCr6CvygE+fD+/v7jA0CAAwQECAgQECBAgAABAQIChJEQf4D/Gprv+1u/34c7/fb5/c/vzw8+7M8Hl/f7/f0+v/0+P+x3+v31/f68vj6+3i/v3+8v/9P/h8MEBAgIEBAgIECAgAABAQICEpBA+gD+f3w/P7/f/x6m9/v77e7+fX5+vj7ez7fX9/sL/Pz6/Pz+P3x/f3//f2/X/6c/hAUCBAYICBAQICBAgAABAQICEpDA/gD+f/x+f3++/j2M7/dXt9f3+wvy+fX5+f1+f31/f/9/eL+/vx/2h3/+RwgQECBAQIABAQIChJ+QwA/4f/j99e3+fb6+v7/eX9/vj6/38+319f7y/v58fX19//b+eX+9/8v9/f7+/v/e9P8pwgGBgAABAYGAAAECBAgQECBAICAI/EACASAgQECQgIB/hIaAAAECBAgQECBAgAABAQICBASIgAABAYGAAAECBAgQECBAQIBAQBAQBAgQECBAQIABAQIChJ/gLwh8/f7+fR8gQECgQECAgAABgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYAAgYCAAAEBAn8B+mGbGvj/aJ0AAAAASUVORK5CYII=";

export function UserNav() {
  const { locale, setLocale, t } = useLocale();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-24 h-10">
          <Image src={aerolineLogo} alt="Aeroline Logo" fill style={{objectFit: "contain"}} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {t("userNav.name")}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {t("userNav.email")}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Languages className="mr-2 h-4 w-4" />
              <span>{t("userNav.language")}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={locale}
                  onValueChange={(value) => setLocale(value as "en" | "es")}
                >
                  <DropdownMenuRadioItem value="en">
                    English
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="es">
                    Español
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>{t("userNav.settings")}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t("userNav.logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
