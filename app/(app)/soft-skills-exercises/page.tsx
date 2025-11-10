"use client";

import { SoftSkillsChallenge } from "@/components/soft-skills-challenge";
import { useLocale } from "@/hooks/use-locale";

export default function SoftSkillsExercisesPage() {
  const { t } = useLocale();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tighter">
          {t("softskills.exercises.page.title")}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t("softskills.exercises.page.description")}
        </p>
      </div>
       <SoftSkillsChallenge />
    </div>
  );
}
