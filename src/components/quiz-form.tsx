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

type FailedQuestion = {
  question: string;
  userAnswer: string;
  correctAnswer: string;
};

interface QuizFormProps {
  quizData: Quiz;
  onSubmit: (score: number, failedQuestions: FailedQuestion[]) => void;
  submitted: boolean;
}

export function QuizForm({ quizData, onSubmit, submitted }: QuizFormProps) {
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

  const [isSubmitted, setIsSubmitted] = useState(submitted);
  const [questionResults, setQuestionResults] = useState<(boolean | null)[]>(
    Array(quizData.questions.length).fill(null)
  );

  const handleSubmit = form.handleSubmit((data) => {
    let score = 0;
    const failedQuestions: FailedQuestion[] = [];
    const results = data.answers.map((answer, index) => {
      const question = quizData.questions[index];
      const isCorrect =
        parseInt(answer.value) === question.correctAnswer;
      if (isCorrect) {
        score++;
      } else {
        failedQuestions.push({
          question: question.question,
          userAnswer: question.options[parseInt(answer.value)] || "No answer",
          correctAnswer: question.options[question.correctAnswer],
        });
      }
      return isCorrect;
    });
    setQuestionResults(results);
    setIsSubmitted(true);
    onSubmit(score, failedQuestions);
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
                    {isSubmitted && result === true && (
                      <CheckCircle2 className="ml-2 size-5 text-green-500 shrink-0" />
                    )}
                    {isSubmitted && result === false && (
                      <XCircle className="ml-2 size-5 text-red-500 shrink-0" />
                    )}
                  </p>
                  <RadioGroup
                    onValueChange={(value) =>
                      form.setValue(`answers.${index}.value`, value)
                    }
                    defaultValue={userAnswer}
                    disabled={isSubmitted}
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
                            isSubmitted &&
                              isCorrectAnswer &&
                              "border-green-500 bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-200 dark:border-green-500/50",
                            isSubmitted &&
                              !isCorrectAnswer &&
                              isUserAnswer &&
                              "border-red-500 bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-200 dark:border-red-500/50"
                          )}
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={optionIndex.toString()}
                              disabled={isSubmitted}
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
          {!isSubmitted && (
            <CardFooter>
              <Button type="submit" disabled={isSubmitted} className="w-full">
                {t("quiz.submitButton")}
              </Button>
            </CardFooter>
          )}
        </form>
      </Form>
    </FormProvider>
  );
}
