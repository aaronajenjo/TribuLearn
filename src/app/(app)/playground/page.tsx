"use client";

import { PlaygroundForm } from "@/components/playground-form";
import { useLocale } from "@/hooks/use-locale";

export default function PlaygroundPage() {
  const { t } = useLocale();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tighter">
          {t("playground.page.title")}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t("playground.page.description")}
        </p>
      </div>
      <PlaygroundForm />
    </div>
  );
}
