"use client";

import { Icons } from "@/components/icons";
import { softSkillsData } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FileText,
  BookOpen,
  Clock,
  PlayCircle,
  BrainCircuit,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/hooks/use-locale";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function SoftSkillsCoursesPage() {
  const { t } = useLocale();
  const skills = softSkillsData(t);
  const [activeSkill, setActiveSkill] = React.useState(skills[0]?.slug || "");

  const currentSkillData = skills.find((s) => s.slug === activeSkill);

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
        <div className="p-4 bg-card rounded-lg border shrink-0">
          <BrainCircuit className="size-12" />
        </div>
        <div>
          <h1 className="text-4xl font-bold font-headline tracking-tighter">
            {t("softskills.courses.page.title")}
          </h1>
          <p className="text-lg text-muted-foreground mt-1">
            {t("softskills.courses.page.description")}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <nav className="sticky top-20">
            <h3 className="text-lg font-semibold mb-3 px-2">
              {t("softskills.courses.categories")}
            </h3>
            <div className="flex flex-col gap-1">
              {skills.map((skill) => (
                <button
                  key={skill.id}
                  onClick={() => setActiveSkill(skill.slug)}
                  className={cn(
                    "flex items-center justify-between text-left p-2 rounded-md transition-colors",
                    activeSkill === skill.slug
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <span className="font-medium">{skill.name}</span>
                  <ChevronRight
                    className={cn(
                      "size-5 transition-transform",
                      activeSkill === skill.slug
                        ? "transform translate-x-1"
                        : ""
                    )}
                  />
                </button>
              ))}
            </div>
          </nav>
        </aside>

        <main className="md:col-span-3">
          {currentSkillData ? (
            <div>
              <h2 className="text-3xl font-bold font-headline mb-1">
                {currentSkillData.name}
              </h2>
              <p className="text-muted-foreground mb-6">
                {currentSkillData.description}
              </p>
              {currentSkillData.modules.length > 0 ? (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-4"
                  defaultValue="item-0"
                >
                  {currentSkillData.modules.map((module, index) => {
                    const allResources = [
                      ...(module.sopraResources || []).map((r) => ({
                        ...r,
                        source: "sopra" as const,
                      })),
                      ...(module.youtubeResources || []).map((r) => ({
                        ...r,
                        source: "youtube" as const,
                      })),
                      ...(module.udemyResources || []).map((r) => ({
                        ...r,
                        source: "udemy" as const,
                      })),
                      ...(module.openWebinarsResources || []).map((r) => ({
                        ...r,
                        source: "openWebinars" as const,
                      })),
                      ...(module.pluralsightResources || []).map((r) => ({
                        ...r,
                        source: "pluralsight" as const,
                      })),
                    ];
                    return (
                      <AccordionItem
                        key={`${module.title}-${index}`}
                        value={`item-${index}`}
                        className="border rounded-lg overflow-hidden"
                      >
                        <AccordionTrigger className="text-lg font-semibold px-6 py-4 bg-card hover:bg-muted/50 transition-colors">
                          {module.title}
                        </AccordionTrigger>
                        <AccordionContent className="p-6 bg-card space-y-4">
                          <p className="text-muted-foreground">
                            {module.description}
                          </p>

                          <div>
                            <h4 className="font-semibold mb-4 mt-4">
                              {t("paths.detail.resources")}:
                            </h4>
                            {allResources.length > 0 ? (
                              <ul className="space-y-3">
                                {allResources.map((resource, resIndex) => {
                                  const SourceIcon = resource.source
                                    ? Icons[resource.source]
                                    : null;
                                  return (
                                    <li key={`${resource.title}-${resIndex}`}>
                                      <Link
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 group"
                                      >
                                        <div className="flex items-center gap-2 p-2 rounded-md bg-muted group-hover:bg-primary/10 transition-colors">
                                          {SourceIcon && (
                                            <SourceIcon className="size-4" />
                                          )}
                                          {resource.type === "video" && (
                                            <PlayCircle className="text-primary" />
                                          )}
                                          {resource.type === "article" && (
                                            <FileText className="text-primary" />
                                          )}
                                          {resource.type === "course" && (
                                            <BookOpen className="text-primary" />
                                          )}
                                        </div>
                                        <div className="flex-1">
                                          <p className="font-medium group-hover:underline">
                                            {resource.title}
                                          </p>
                                          {resource.duration && (
                                            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                                              <Clock className="size-3" />
                                              {resource.duration}
                                            </p>
                                          )}
                                        </div>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            ) : (
                              <p className="text-muted-foreground text-sm">
                                {t("paths.detail.noResources")}
                              </p>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              ) : (
                <Card>
                  <CardContent className="text-center py-12 text-muted-foreground">
                    <p>
                      {t("softskills.courses.detail.comingSoon", {
                        skillName: currentSkillData.name,
                      })}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12 text-muted-foreground">
                <p>{t("paths.detail.selectLevel")}</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
