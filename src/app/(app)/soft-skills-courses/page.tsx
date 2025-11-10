"use client";

import { useLocale } from "@/hooks/use-locale";
import { Card, CardContent } from "@/components/ui/card";

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
      <Card>
        <CardContent className="flex flex-col items-center justify-center h-64 text-muted-foreground p-6">
            <p>Coming Soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
