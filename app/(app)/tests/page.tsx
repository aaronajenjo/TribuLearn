"use client";

import { TestsContainer } from "@/components/tests-container";
import { learningPaths } from "@/lib/data";
import { useLocale } from "@/hooks/use-locale";

export default function TestsPage() {
  const { t } = useLocale();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tighter">
          {t("tests.page.title")}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t("tests.page.description")}
        </p>
      </div>
      <TestsContainer technologies={learningPaths(t)} />
    </div>
  );
}
