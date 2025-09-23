"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { learningPaths } from "@/lib/data";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { DashboardChart } from "@/components/dashboard-chart";
import { useLocale } from "@/hooks/use-locale";

export default function Dashboard() {
  const { t } = useLocale();
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>{t("dashboard.continueLearning.title")}</CardTitle>
            <CardDescription>
              {t("dashboard.continueLearning.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex items-center gap-4">
              <Icons.csharp className="size-12 shrink-0" />
              <div className="w-full">
                <h3 className="font-semibold">Variables and Data Types</h3>
                <p className="text-sm text-muted-foreground">
                  C# Beginner Path
                </p>
                <Progress value={66} className="mt-2 h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/paths/csharp">
                {t("dashboard.continueLearning.button")}
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <DashboardChart />

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>{t("dashboard.achievements.title")}</CardTitle>
            <CardDescription>
              {t("dashboard.achievements.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <div className="flex items-center gap-4">
              <CheckCircle className="size-6 text-accent" />
              <div>
                <h3 className="font-semibold">
                  {t("dashboard.achievements.firstSteps.title")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("dashboard.achievements.firstSteps.description")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <BookOpen className="size-6 text-primary" />
              <div>
                <h3 className="font-semibold">
                  {t("dashboard.achievements.pathfinder.title")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("dashboard.achievements.pathfinder.description")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
    </div>
  );
}
