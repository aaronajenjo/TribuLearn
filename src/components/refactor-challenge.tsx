"use client";

import { useState, KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  generateRefactorChallenge,
  GenerateRefactorChallengeOutput,
} from "@/ai/flows/generate-refactor-challenge";
import { analyzeRefactorSolution } from "@/ai/flows/analyze-refactor-solution";
import { learningPaths } from "@/lib/data";
import { Loader2, Sparkles, Wand2, Search, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "./ui/scroll-area";
import { useLocale } from "@/hooks/use-locale";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { marked } from "marked";

const formSchema = z.object({
  technology: z.string().min(1, "Please select a technology."),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
});

type FormValues = z.infer<typeof formSchema>;

export function RefactorChallenge() {
  const [challenge, setChallenge] =
    useState<GenerateRefactorChallengeOutput | null>(null);
  const [userSolution, setUserSolution] = useState<string>("");
  const [analysis, setAnalysis] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const { toast } = useToast();
  const { t, locale } = useLocale();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      technology: "csharp",
      difficulty: "beginner",
    },
  });

  async function onGenerate(values: FormValues) {
    setIsGenerating(true);
    setChallenge(null);
    setAnalysis("");
    setUserSolution("");
    try {
      const technologyName =
        learningPaths(t).find((p) => p.slug === values.technology)?.name ||
        values.technology;
      const result = await generateRefactorChallenge({
        ...values,
        technology: technologyName,
        language: locale,
      });
      setChallenge(result);
    } catch (error) {
      console.error("Failed to generate challenge:", error);
      toast({
        variant: "destructive",
        title: t("toast.generationFailed.title"),
        description: t("toast.generationFailed.description"),
      });
    } finally {
      setIsGenerating(false);
    }
  }

  async function onAnalyze() {
    if (!challenge || !userSolution) return;
    setIsAnalyzing(true);
    setAnalysis("");
    try {
      const result = await analyzeRefactorSolution({
        originalCode: challenge.codeToRefactor,
        userSolution: userSolution,
        optimalSolution: challenge.optimalSolution,
        technology:
          learningPaths(t).find(
            (p) => p.slug === form.getValues("technology")
          )?.name || form.getValues("technology"),
        language: locale,
      });
      const rawMarkup = marked.parse(result.analysis) as string;
      setAnalysis(rawMarkup);
    } catch (error) {
      console.error("Failed to analyze solution:", error);
      toast({
        variant: "destructive",
        title: t("toast.generationFailed.title"),
        description: t("toast.generationFailed.description"),
      });
    } finally {
      setIsAnalyzing(false);
    }
  }

  const handleTab = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      e.currentTarget.value =
        e.currentTarget.value.substring(0, start) +
        "  " +
        e.currentTarget.value.substring(end);
      e.currentTarget.selectionStart = e.currentTarget.selectionEnd =
        start + 2;
      setUserSolution(e.currentTarget.value);
    }

    if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const before_start = e.currentTarget.value.substring(0, start);
      const after_end = e.currentTarget.value.substring(end);
      const between = e.currentTarget.value.substring(start, end);
      const lines = before_start.split('\n');
      const last_line = lines[lines.length - 1];
      if (last_line.startsWith("  ")) {
        lines[lines.length - 1] = last_line.substring(2);
        const new_before_start = lines.join('\n');
        e.currentTarget.value = new_before_start + between + after_end;
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start - 2;
        setUserSolution(e.currentTarget.value);
      }
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onGenerate)}>
            <CardHeader>
              <CardTitle>{t("refactors.form.title")}</CardTitle>
              <CardDescription>
                {t("refactors.form.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="technology"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("playground.form.technology")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("playground.form.selectTechnology")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {learningPaths(t).map((path) => (
                          <SelectItem key={path.id} value={path.slug}>
                            {path.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("playground.form.difficulty")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("playground.form.selectDifficulty")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">
                          {t("paths.levels.beginner")}
                        </SelectItem>
                        <SelectItem value="intermediate">
                          {t("paths.levels.intermediate")}
                        </SelectItem>
                        <SelectItem value="advanced">
                          {t("paths.levels.advanced")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2" />
                )}
                {t("refactors.form.generateButton")}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="grid grid-cols-1 gap-8">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>{t("refactors.challenge.title")}</CardTitle>
            <CardDescription>
              {t("refactors.challenge.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ScrollArea className="h-96 w-full rounded-md border p-4 bg-muted/50 font-mono text-sm">
              {isGenerating ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                  {t("refactors.challenge.generating")}
                </div>
              ) : challenge ? (
                <pre className="whitespace-pre-wrap">
                  {challenge.codeToRefactor}
                </pre>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  {t("refactors.challenge.placeholder")}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>{t("refactors.solution.title")}</CardTitle>
            <CardDescription>
              {t("refactors.solution.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={t("refactors.solution.placeholder")}
              className="h-96 text-sm font-mono"
              value={userSolution}
              onChange={(e) => setUserSolution(e.target.value)}
              onKeyDown={handleTab}
              disabled={!challenge || isAnalyzing}
            />
          </CardContent>
          <CardFooter className="flex-col sm:flex-row gap-2">
            <Button
              onClick={onAnalyze}
              disabled={!challenge || !userSolution || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2" />
              )}
              {t("refactors.solution.analyzeButton")}
            </Button>

            {challenge && (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b-0">
                  <AccordionTrigger>
                      <Button
                        variant="outline"
                        className="w-full"
                        disabled={!challenge || isAnalyzing}
                      >
                        <FileText className="mr-2" />
                        {t("refactors.solution.showButton")}
                      </Button>
                  </AccordionTrigger>
                  <AccordionContent className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>{t("refactors.optimal.title")}</CardTitle>
                        <CardDescription>
                          {t("refactors.optimal.description")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-64 w-full rounded-md border p-4 bg-muted/50 font-mono text-sm">
                          <pre className="whitespace-pre-wrap">
                            {challenge.optimalSolution}
                          </pre>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </CardFooter>
        </Card>
      </div>

      {isAnalyzing && (
        <Card>
          <CardHeader>
            <CardTitle>{t("refactors.analysis.title")}</CardTitle>
            <CardDescription>
              {t("refactors.analysis.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full rounded-md border p-4 bg-muted/50 flex items-center justify-center">
              <div className="flex items-center text-muted-foreground">
                <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                {t("refactors.analysis.generating")}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle>{t("refactors.analysis.title")}</CardTitle>
            <CardDescription>
              {t("refactors.analysis.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-sm dark:prose-invert max-w-none p-4 rounded-md border bg-muted/50"
              dangerouslySetInnerHTML={{ __html: analysis }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
