"use client";

import { Icons } from "@/components/icons";
import { learningPaths } from "@/lib/data";
import { notFound, useParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, Clock, PlayCircle, Puzzle } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/hooks/use-locale";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PathDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { t } = useLocale();
  const path = learningPaths(t).find((p) => p.slug === slug);

  if (!path) {
    notFound();
  }

  const Icon = Icons[path.icon];

  return (
    <div className="max-w-4xl mx-auto">
      <header className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
        <div className="p-4 bg-card rounded-lg border shrink-0">
          <Icon className="size-12" />
        </div>
        <div>
          <h1 className="text-4xl font-bold font-headline tracking-tighter">
            {t("paths.detail.title", { pathName: path.name })}
          </h1>
          <p className="text-lg text-muted-foreground mt-1">
            {path.description}
          </p>
        </div>
      </header>

      <Tabs defaultValue="Beginner" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {path.levels.map((level) => (
            <TabsTrigger key={level.name} value={level.name}>
              {t(`paths.levels.${level.name.toLowerCase()}`)}
            </TabsTrigger>
          ))}
        </TabsList>
        {path.levels.map((level) => (
          <TabsContent key={level.name} value={level.name}>
            <Accordion type="single" collapsible className="w-full">
              {level.modules.length > 0 ? (
                level.modules.map((module, index) => {
                  const allResources = [
                    ...(module.sopraResources || []).map((r) => ({
                      ...r,
                      source: "sopra" as const,
                    })),
                    ...(module.youtubeResources || []).map((r) => ({
                      ...r,
                      source: "youtube" as const,
                    })),
                  ];

                  return (
                    <AccordionItem
                      key={`${module.title}-${index}`}
                      value={`item-${index}`}
                    >
                      <AccordionTrigger className="text-lg font-semibold">
                        {module.title}
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
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
                                const SourceIcon =
                                  resource.source && Icons[resource.source];
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

                        {module.quiz && (
                          <Button variant="outline" className="mt-4">
                            <Puzzle className="mr-2" />
                            {t("paths.detail.takeQuiz")}: {module.quiz.title}
                          </Button>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>
                    {t("paths.detail.comingSoon", { levelName: level.name })}
                  </p>
                </div>
              )}
            </Accordion>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
