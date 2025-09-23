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

  const handleSubmit = form.handleSubmit((data) => {
    let score = 0;
    data.answers.forEach((answer, index) => {
      if (parseInt(answer.value) === quizData.questions[index].correctAnswer) {
        score++;
      }
    });
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
            {fields.map((field, index) => (
              <div key={field.id}>
                <p className="font-semibold mb-4">
                  {index + 1}. {quizData.questions[index].question}
                </p>
                <RadioGroup
                  onValueChange={(value) =>
                    form.setValue(`answers.${index}.value`, value)
                  }
                  defaultValue={form.getValues(`answers.${index}.value`)}
                >
                  {quizData.questions[index].options.map(
                    (option, optionIndex) => (
                      <FormItem
                        key={optionIndex}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={optionIndex.toString()} />
                        </FormControl>
                        <FormLabel className="font-normal">{option}</FormLabel>
                      </FormItem>
                    )
                  )}
                </RadioGroup>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={submitted} className="w-full">
              {t("quiz.submitButton")}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </FormProvider>
  );
}
