"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { learningPaths } from "@/lib/data";
import { Icons } from "@/components/icons";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLocale } from "@/hooks/use-locale";
import { Code2, ClipboardList, CodeSquare } from "lucide-react";

export default function Dashboard() {
  const { t } = useLocale();

  const quickAccessLinks = [
    {
      href: "/playground",
      icon: Code2,
      title: t("nav.playground"),
      description: t("playground.page.description"),
    },
    {
      href: "/tests",
      icon: ClipboardList,
      title: t("nav.tests"),
      description: t("tests.page.description"),
    },
    {
      href: "/refactors",
      icon: CodeSquare,
      title: t("nav.refactors"),
      description: t("refactors.page.description"),
    },
  ];

  return (
    <div className="grid gap-8">
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">
          {t("dashboard.explorePaths.title")}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {learningPaths(t).map((path) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === path.imageId
            );
            const Icon = Icons[path.icon];
            return (
              <Link
                href={`/paths/${path.slug}`}
                key={path.id}
                className="group"
              >
                <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="relative h-40 w-full">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={path.name}
                        fill
                        className="object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Icon className="size-16 text-white" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{path.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {path.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">
          {t("dashboard.quickAccess.title")}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quickAccessLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link href={link.href} key={link.href} className="group">
                <Card className="flex flex-col h-full transition-transform transform-gpu group-hover:scale-[1.02] group-hover:shadow-xl">
                  <CardHeader className="flex-row items-start gap-4">
                    <div className="p-3 bg-card rounded-lg border">
                      <Icon className="size-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="font-headline text-xl">
                        {link.title}
                      </CardTitle>
                      <CardDescription className="mt-1 line-clamp-2">
                        {link.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
