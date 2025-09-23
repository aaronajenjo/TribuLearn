"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { GenerateQuizOutput } from "@/ai/flows/generate-quiz";

export type Quiz = GenerateQuizOutput;

interface QuizFormProps {
  quizData: Quiz;
  onSubmit: (score: number) => void;
}

export function QuizForm({ quizData, onSubmit }: QuizFormProps) {
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
    <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle>{quizData.title}</CardTitle>
        <CardDescription>Answer the following questions to the best of your ability.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {fields.map((field, index) => (
          <div key={field.id}>
            <p className="font-semibold mb-4">{index + 1}. {quizData.questions[index].question}</p>
            <RadioGroup
              onValueChange={(value) => form.setValue(`answers.${index}.value`, value)}
              defaultValue={form.getValues(`answers.${index}.value`)}
            >
              {quizData.questions[index].options.map((option, optionIndex) => (
                <FormItem key={optionIndex} className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={optionIndex.toString()} />
                  </FormControl>
                  <FormLabel className="font-normal">{option}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button type="submit" disabled={submitted} className="w-full">
          Submit Answers
        </Button>
      </CardFooter>
    </form>
  );
}
