"use client";

import { Icons } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { softSkillsData } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/hooks/use-locale";
import { BrainCircuit } from "lucide-react";

export default function SoftSkillsCoursesPage() {
  const { t } = useLocale();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tighter">
          {t("softskills.courses.page.title")}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t("softskills.courses.page.description")}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {softSkillsData(t).map((skill) => {
          const image = PlaceHolderImages.find(
            (img) => img.id === skill.imageId
          );
          return (
            <Link href={`/soft-skills-courses/${skill.slug}`} key={skill.id} className="group">
              <Card className="flex flex-col h-full transition-transform transform-gpu group-hover:scale-[1.02] group-hover:shadow-xl">
                <CardHeader className="flex-row items-start gap-4">
                  <div className="p-3 bg-card rounded-lg border">
                    <BrainCircuit className="size-8" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="font-headline text-2xl">
                      {skill.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {skill.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 relative aspect-video">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={skill.name}
                      fill
                      className="object-cover rounded-md"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
