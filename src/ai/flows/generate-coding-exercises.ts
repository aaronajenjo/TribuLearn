'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating coding exercises based on technology and difficulty level.
 *
 * @remarks
 * The flow takes a technology and difficulty level as input and returns a coding exercise.
 *
 * @exports generateCodingExercise - A function that calls the generateCodingExerciseFlow.
 * @exports GenerateCodingExerciseInput - The input type for the generateCodingExercise function.
 * @exports GenerateCodingExerciseOutput - The return type for the generateCodingExercise function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCodingExerciseInputSchema = z.object({
  technology: z
    .string()
    .describe('The technology for which to generate the exercise (e.g., C#, Angular).'),
  difficulty: z
    .enum(['beginner', 'intermediate', 'advanced'])
    .describe('The difficulty level of the exercise.'),
  language: z.string().describe('The language for the exercise (e.g., "en", "es").'),
});
export type GenerateCodingExerciseInput = z.infer<
  typeof GenerateCodingExerciseInputSchema
>;

const GenerateCodingExerciseOutputSchema = z.object({
  exercise: z.string().describe('The generated coding exercise.'),
});
export type GenerateCodingExerciseOutput = z.infer<
  typeof GenerateCodingExerciseOutputSchema
>;

export async function generateCodingExercise(
  input: GenerateCodingExerciseInput
): Promise<GenerateCodingExerciseOutput> {
  return generateCodingExerciseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodingExercisePrompt',
  input: {schema: GenerateCodingExerciseInputSchema},
  output: {schema: GenerateCodingExerciseOutputSchema},
  prompt: `You are a software development instructor. Generate a coding exercise for the given technology and difficulty level.
The entire response must be in the language with this ISO 639-1 code: {{{language}}}.

Technology: {{{technology}}}
Difficulty: {{{difficulty}}}

Exercise:`,
});

const generateCodingExerciseFlow = ai.defineFlow(
  {
    name: 'generateCodingExerciseFlow',
    inputSchema: GenerateCodingExerciseInputSchema,
    outputSchema: GenerateCodingExerciseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
