"use client";

import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { generateQuiz } from "@/ai/flows/generate-quiz";
import type { Technology } from "@/lib/data";
import { Loader2 } from "lucide-react";
import { QuizForm, Quiz } from "@/components/quiz-form";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLocale } from "@/hooks/use-locale";

type QuizState = {
  [key: string]: {
    quiz: Quiz | null;
    isLoading: boolean;
    error: string | null;
    result: { score: number; level: string } | null;
  };
};

export function TestsContainer({
  technologies,
}: {
  technologies: Technology[];
}) {
  const [activeTab, setActiveTab] = useState("");
  const [quizState, setQuizState] = useState<QuizState>({});
  const { toast } = useToast();
  const { t } = useLocale();

  const handleTabChange = async (value: string) => {
    setActiveTab(value);
    if (!quizState[value]?.quiz && !quizState[value]?.isLoading) {
      loadQuiz(value);
    }
  };

  const loadQuiz = async (slug: string) => {
    setQuizState((prev) => ({
      ...prev,
      [slug]: { quiz: null, isLoading: true, error: null, result: null },
    }));

    try {
      const technologyName =
        technologies.find((t) => t.slug === slug)?.name || slug;
      const result = await generateQuiz({ technology: technologyName });
      setQuizState((prev) => ({
        ...prev,
        [slug]: { ...prev[slug], quiz: result, isLoading: false },
      }));
    } catch (error) {
      console.error("Failed to generate quiz:", error);
      toast({
        variant: "destructive",
        title: t("toast.quizGenerationFailed.title"),
        description: t("toast.quizGenerationFailed.description"),
      });
      setQuizState((prev) => ({
        ...prev,
        [slug]: {
          ...prev[slug],
          isLoading: false,
          error: t("tests.container.error"),
        },
      }));
    }
  };

  const handleQuizSubmit = (slug: string, score: number) => {
    let level = "Beginner";
    if (score > 10) {
      level = "Advanced";
    } else if (score > 5) {
      level = "Intermediate";
    }
    setQuizState((prev) => ({
      ...prev,
      [slug]: { ...prev[slug], result: { score, level } },
    }));
  };

  return (
    <>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {technologies.map((tech) => (
            <TabsTrigger key={tech.id} value={tech.slug}>
              {tech.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {technologies.map((tech) => (
          <TabsContent key={tech.id} value={tech.slug}>
            <Card>
              <CardContent className="p-6">
                {quizState[tech.slug]?.isLoading && (
                  <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    {t("tests.container.generating")}
                  </div>
                )}
                {quizState[tech.slug]?.error && (
                  <div className="flex items-center justify-center h-64 text-destructive">
                    {quizState[tech.slug]?.error}
                  </div>
                )}
                {quizState[tech.slug]?.quiz && !quizState[tech.slug]?.result && (
                  <QuizForm
                    quizData={quizState[tech.slug]!.quiz!}
                    onSubmit={(score) => handleQuizSubmit(tech.slug, score)}
                  />
                )}
                {quizState[tech.slug]?.result && (
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold mb-2">
                      {t("tests.container.result.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-4">
                      {t("tests.container.result.description", {
                        score: quizState[tech.slug]!.result!.score,
                        total: 15,
                      })}
                    </p>
                    <p className="text-xl">
                      {t("tests.container.result.suggestedLevel")}:
                    </p>
                    <Badge
                      className="text-2xl mt-2"
                      variant={
                        quizState[tech.slug]!.result!.level === "Advanced"
                          ? "default"
                          : quizState[tech.slug]!.result!.level ===
                            "Intermediate"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {t(
                        `paths.levels.${quizState[
                          tech.slug
                        ]!.result!.level.toLowerCase()}`
                      )}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      {!activeTab && (
        <Card className="mt-2">
          <CardContent className="flex flex-col items-center justify-center h-64 text-muted-foreground p-6">
            <p>{t("tests.container.prompt")}</p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
