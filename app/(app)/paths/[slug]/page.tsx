"use client";

import { Icons } from "@/components/icons";
import { learningPaths } from "@/lib/data";
import { notFound } from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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

export default function PathDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
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
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-0"
            >
              {level.modules.length > 0 ? (
                level.modules.map((module, index) => (
                  <AccordionItem key={module.title} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-semibold">
                      {module.title}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-muted-foreground">
                        {module.description}
                      </p>

                      {path.slug === "csharp" &&
                      module.title ===
                        t("technologies.csharp.beginner.module2.title") ? (
                        <div>
                          <h4 className="font-semibold mb-4">
                            {t("paths.detail.resources")}:
                          </h4>
                          <ul className="space-y-3">
                            {module.sopraResources.map((resource) => (
                              <li key={resource.title}>
                                <Link
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 group"
                                >
                                  <div className="p-2 rounded-md bg-muted group-hover:bg-primary/10 transition-colors">
                                    <FileText className="text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium group-hover:underline">
                                      {resource.title}
                                    </p>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <Tabs defaultValue="Sopra" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="Sopra">Sopra</TabsTrigger>
                            <TabsTrigger value="Youtube">Youtube</TabsTrigger>
                          </TabsList>
                          <TabsContent value="Sopra">
                            <h4 className="font-semibold mb-4 mt-4">
                              {t("paths.detail.resources")}:
                            </h4>
                            <ul className="space-y-3">
                              {module.sopraResources.map((resource) => (
                                <li key={resource.title}>
                                  <Link
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 group"
                                  >
                                    <div className="p-2 rounded-md bg-muted group-hover:bg-primary/10 transition-colors">
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
                              ))}
                              {module.sopraResources.length === 0 && (
                                <p className="text-muted-foreground text-sm">
                                  {t("paths.detail.noResources")}
                                </p>
                              )}
                            </ul>
                          </TabsContent>
                          <TabsContent value="Youtube">
                            <h4 className="font-semibold mb-4 mt-4">
                              {t("paths.detail.resources")}:
                            </h4>
                            <ul className="space-y-3">
                              {module.youtubeResources.map((resource) => (
                                <li key={resource.title}>
                                  <Link
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 group"
                                  >
                                    <div className="p-2 rounded-md bg-muted group-hover:bg-primary/1e-f1c5-42cf-9b14-2c738633361a0 transition-colors">
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
                              ))}
                              {module.youtubeResources.length === 0 && (
                                <p className="text-muted-foreground text-sm">
                                  {t("paths.detail.noResources")}
                                </p>
                              )}
                            </ul>
                          </TabsContent>
                        </Tabs>
                      )}

                      {module.quiz && (
                        <Button variant="outline" className="mt-4">
                          <Puzzle className="mr-2" />
                          {t("paths.detail.takeQuiz")}: {module.quiz.title}
                        </Button>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))
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
