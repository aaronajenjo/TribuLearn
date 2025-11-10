"use client";

import { useState } from "react";
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
import { generateSoftSkillExercise } from "@/ai/flows/generate-soft-skill-exercise";
import { analyzeSoftSkillSolution } from "@/ai/flows/analyze-soft-skill-solution";
import { Loader2, Sparkles, Wand2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "./ui/scroll-area";
import { useLocale } from "@/hooks/use-locale";
import { marked } from "marked";

const formSchema = z.object({
  skillType: z.string().min(1, "Please select a skill."),
});

type FormValues = z.infer<typeof formSchema>;

const softSkillTypes = [
  { value: "communication", labelKey: "softskills.types.communication" },
  { value: "conflict-resolution", labelKey: "softskills.types.conflictResolution" },
  { value: "leadership", labelKey: "softskills.types.leadership" },
  { value: "teamwork", labelKey: "softskills.types.teamwork" },
  { value: "adaptability", labelKey: "softskills.types.adaptability" },
];

export function SoftSkillsChallenge() {
  const [scenario, setScenario] = useState<string>("");
  const [userSolution, setUserSolution] = useState<string>("");
  const [analysis, setAnalysis] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const { toast } = useToast();
  const { t, locale } = useLocale();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skillType: "communication",
    },
  });

  async function onGenerate(values: FormValues) {
    setIsGenerating(true);
    setScenario("");
    setAnalysis("");
    setUserSolution("");
    try {
      const skillName = t(softSkillTypes.find(s => s.value === values.skillType)?.labelKey || '');
      const result = await generateSoftSkillExercise({
        skillType: skillName,
        language: locale,
      });
      const rawMarkup = marked.parse(result.scenario) as string;
      setScenario(rawMarkup);
    } catch (error) {
      console.error("Failed to generate exercise:", error);
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
    if (!scenario || !userSolution) return;
    setIsAnalyzing(true);
    setAnalysis("");
    try {
      const result = await analyzeSoftSkillSolution({
        scenario,
        userSolution,
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

  return (
    <div className="space-y-8">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onGenerate)}>
            <CardHeader>
              <CardTitle>{t("softskills.exercises.form.title")}</CardTitle>
              <CardDescription>
                {t("softskills.exercises.form.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="skillType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("softskills.exercises.form.skill")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("softskills.exercises.form.selectSkill")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {softSkillTypes.map((skill) => (
                          <SelectItem key={skill.value} value={skill.value}>
                            {t(skill.labelKey)}
                          </SelectItem>
                        ))}
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
                {t("softskills.exercises.form.generateButton")}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {(isGenerating || scenario) && (
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>{t("softskills.exercises.challenge.title")}</CardTitle>
            <CardDescription>
              {t("softskills.exercises.challenge.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ScrollArea className="h-64 w-full rounded-md border p-4 bg-muted/50">
              {isGenerating ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                  {t("softskills.exercises.challenge.generating")}
                </div>
              ) : scenario ? (
                 <div
                  className="prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: scenario }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  {t("softskills.exercises.challenge.placeholder")}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {scenario && (
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>{t("softskills.exercises.solution.title")}</CardTitle>
            <CardDescription>
              {t("softskills.exercises.solution.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={t("softskills.exercises.solution.placeholder")}
              className="h-64 text-sm"
              value={userSolution}
              onChange={(e) => setUserSolution(e.target.value)}
              disabled={isAnalyzing}
            />
          </CardContent>
          <CardFooter>
            <Button
              onClick={onAnalyze}
              disabled={!userSolution || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2" />
              )}
              {t("softskills.exercises.solution.analyzeButton")}
            </Button>
          </CardFooter>
        </Card>
      )}

      {(isAnalyzing || analysis) && (
         <Card>
          <CardHeader>
            <CardTitle>{t("softskills.exercises.analysis.title")}</CardTitle>
            <CardDescription>
              {t("softskills.exercises.analysis.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
             {isAnalyzing ? (
                <div className="h-64 w-full rounded-md border p-4 bg-muted/50 flex items-center justify-center">
                    <div className="flex items-center text-muted-foreground">
                        <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                        {t("softskills.exercises.analysis.generating")}
                    </div>
                </div>
                ) : (
                <div
                    className="prose prose-sm dark:prose-invert max-w-none p-4 rounded-md border bg-muted/50"
                    dangerouslySetInnerHTML={{ __html: analysis }}
                />
             )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
