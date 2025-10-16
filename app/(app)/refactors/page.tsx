"use client";

import { RefactorChallenge } from "@/components/refactor-challenge";
import { useLocale } from "@/hooks/use-locale";

export default function RefactorsPage() {
  const { t } = useLocale();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tighter">
          {t("refactors.page.title")}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t("refactors.page.description")}
        </p>
      </div>
      <RefactorChallenge />
    </div>
  );
}
