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
import { generateCodingExercise } from "@/ai/flows/generate-coding-exercises";
import { learningPaths } from "@/lib/data";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "./ui/scroll-area";
import { useLocale } from "@/hooks/use-locale";

const formSchema = z.object({
  technology: z.string().min(1, "Please select a technology."),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
});

type FormValues = z.infer<typeof formSchema>;

export function PlaygroundForm() {
  const [generatedExercise, setGeneratedExercise] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { t } = useLocale();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      technology: "csharp",
      difficulty: "beginner",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setGeneratedExercise("");
    try {
      const technologyName =
        learningPaths(t).find((p) => p.slug === values.technology)?.name ||
        values.technology;

      const result = await generateCodingExercise({
        ...values,
        technology: technologyName,
      });

      setGeneratedExercise(result.exercise);
    } catch (error) {
      console.error("Failed to generate exercise:", error);
      toast({
        variant: "destructive",
        title: t("toast.generationFailed.title"),
        description: t("toast.generationFailed.description"),
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>{t("playground.form.title")}</CardTitle>
              <CardDescription>
                {t("playground.form.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2" />
                )}
                {t("playground.form.generateButton")}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>{t("playground.result.title")}</CardTitle>
          <CardDescription>
            {t("playground.result.description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4">
          <ScrollArea className="h-48 w-full rounded-md border p-4 bg-muted/50">
            {isLoading ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                {t("playground.result.generating")}
              </div>
            ) : generatedExercise ? (
              <pre className="whitespace-pre-wrap text-sm">
                {generatedExercise}
              </pre>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                {t("playground.result.placeholder")}
              </div>
            )}
          </ScrollArea>
          <Textarea
            placeholder={t("playground.result.solvePlaceholder")}
            className="flex-1 text-sm font-mono"
            rows={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}
