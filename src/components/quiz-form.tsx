"use client";

import { useState } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { GenerateQuizOutput } from "@/ai/flows/generate-quiz";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

export type Quiz = GenerateQuizOutput;

interface QuizFormProps {
  quizData: Quiz;
  onSubmit: (score: number) => void;
}

export function QuizForm({ quizData, onSubmit }: QuizFormProps) {
  const { t } = useLocale();
  const form = useForm({
    defaultValues: {
      answers: quizData.questions.map(() => ({ value: "" })),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "answers",
  });

  const [submitted, setSubmitted] = useState(false);
  const [questionResults, setQuestionResults] = useState<(boolean | null)[]>(
    Array(quizData.questions.length).fill(null)
  );

  const handleSubmit = form.handleSubmit((data) => {
    let score = 0;
    const results = data.answers.map((answer, index) => {
      const isCorrect =
        parseInt(answer.value) === quizData.questions[index].correctAnswer;
      if (isCorrect) {
        score++;
      }
      return isCorrect;
    });
    setQuestionResults(results);
    setSubmitted(true);
    onSubmit(score);
  });

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{quizData.title}</CardTitle>
            <CardDescription>{t("quiz.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {fields.map((field, index) => {
              const question = quizData.questions[index];
              const result = questionResults[index];
              const userAnswer = form.watch(`answers.${index}.value`);

              return (
                <div key={field.id}>
                  <p className="font-semibold mb-4 flex items-start">
                    <span className="mr-2">{index + 1}.</span>
                    <span>{question.question}</span>
                    {submitted && result === true && (
                      <CheckCircle2 className="ml-2 size-5 text-green-500 shrink-0" />
                    )}
                    {submitted && result === false && (
                      <XCircle className="ml-2 size-5 text-red-500 shrink-0" />
                    )}
                  </p>
                  <RadioGroup
                    onValueChange={(value) =>
                      form.setValue(`answers.${index}.value`, value)
                    }
                    defaultValue={userAnswer}
                    disabled={submitted}
                  >
                    {question.options.map((option, optionIndex) => {
                      const isCorrectAnswer =
                        optionIndex === question.correctAnswer;
                      const isUserAnswer =
                        userAnswer !== "" &&
                        parseInt(userAnswer) === optionIndex;

                      return (
                        <FormItem
                          key={optionIndex}
                          className={cn(
                            "flex items-center space-x-3 space-y-0 rounded-md border p-3 transition-colors",
                            submitted &&
                              isCorrectAnswer &&
                              "border-green-500 bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-200 dark:border-green-500/50",
                            submitted &&
                              !isCorrectAnswer &&
                              isUserAnswer &&
                              "border-red-500 bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-200 dark:border-red-500/50"
                          )}
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={optionIndex.toString()}
                              disabled={submitted}
                            />
                          </FormControl>
                          <FormLabel className="font-normal flex-1 cursor-pointer">
                            {option}
                          </FormLabel>
                        </FormItem>
                      );
                    })}
                  </RadioGroup>
                </div>
              );
            })}
          </CardContent>
          {!submitted && (
            <CardFooter>
              <Button type="submit" disabled={submitted} className="w-full">
                {t("quiz.submitButton")}
              </Button>
            </CardFooter>
          )}
        </form>
      </Form>
    </FormProvider>
  );
}
