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
import { Loader2, Eye, RotateCw } from "lucide-react";
import { QuizForm, Quiz } from "@/components/quiz-form";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLocale } from "@/hooks/use-locale";
import { Button } from "./ui/button";

type QuizState = {
  [key: string]: {
    quiz: Quiz | null;
    isLoading: boolean;
    error: string | null;
    result: { score: number; level: string } | null;
    showResults: boolean;
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
  const { t, locale } = useLocale();

  const handleTabChange = async (value: string) => {
    setActiveTab(value);
    if (!quizState[value]?.quiz && !quizState[value]?.isLoading) {
      loadQuiz(value);
    }
  };

  const loadQuiz = async (slug: string) => {
    setQuizState((prev) => ({
      ...prev,
      [slug]: {
        quiz: null,
        isLoading: true,
        error: null,
        result: null,
        showResults: false,
      },
    }));

    try {
      const technologyName =
        technologies.find((t) => t.slug === slug)?.name || slug;
      const result = await generateQuiz({
        technology: technologyName,
        language: locale,
      });
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
      [slug]: { ...prev[slug], result: { score, level }, showResults: true },
    }));
  };

  const handleViewAnswers = (slug: string) => {
    setQuizState((prev) => ({
      ...prev,
      [slug]: { ...prev[slug], showResults: false },
    }));
  };

  const handleRetry = (slug: string) => {
    loadQuiz(slug);
  };

  const currentQuizState = quizState[activeTab];

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
                {currentQuizState?.isLoading && (
                  <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    {t("tests.container.generating")}
                  </div>
                )}
                {currentQuizState?.error && (
                  <div className="flex items-center justify-center h-64 text-destructive">
                    {currentQuizState?.error}
                  </div>
                )}
                {currentQuizState?.quiz && (
                  <>
                    {currentQuizState.result && currentQuizState.showResults ? (
                      <div className="text-center py-12">
                        <h2 className="text-2xl font-bold mb-2">
                          {t("tests.container.result.title")}
                        </h2>
                        <p className="text-lg text-muted-foreground mb-4">
                          {t("tests.container.result.description", {
                            score: currentQuizState.result.score,
                            total: 15,
                          })}
                        </p>
                        <p className="text-xl">
                          {t("tests.container.result.suggestedLevel")}:
                        </p>
                        <Badge
                          className="text-2xl mt-2"
                          variant={
                            currentQuizState.result.level === "Advanced"
                              ? "default"
                              : currentQuizState.result.level ===
                                "Intermediate"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {t(
                            `paths.levels.${currentQuizState.result.level.toLowerCase()}`
                          )}
                        </Badge>
                        <div className="mt-8 flex justify-center gap-4">
                          <Button
                            onClick={() => handleViewAnswers(tech.slug)}
                          >
                            <Eye className="mr-2" />
                            {t("tests.container.result.viewAnswers")}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleRetry(tech.slug)}
                          >
                            <RotateCw className="mr-2" />
                            {t("tests.container.result.retry")}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <QuizForm
                        quizData={currentQuizState.quiz}
                        onSubmit={(score) => handleQuizSubmit(tech.slug, score)}
                        submitted={!!currentQuizState.result}
                      />
                    )}
                  </>
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
