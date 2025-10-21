'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating learning recommendations
 * based on quiz results.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FailedQuestionSchema = z.object({
  question: z.string().describe('The question the user answered incorrectly.'),
  userAnswer: z.string().describe('The incorrect answer provided by the user.'),
  correctAnswer: z.string().describe('The correct answer to the question.'),
});

const GenerateRecommendationsInputSchema = z.object({
  technology: z.string().describe('The technology the quiz was about (e.g., C#, Angular).'),
  level: z.string().describe('The skill level determined by the quiz result (e.g., Beginner, Intermediate).'),
  failedQuestions: z.array(FailedQuestionSchema).describe('A list of questions the user failed.'),
  language: z.string().describe('The language for the recommendations (e.g., "en", "es").'),
});
export type GenerateRecommendationsInput = z.infer<typeof GenerateRecommendationsInputSchema>;

const RecommendationSchema = z.object({
  title: z.string().describe('The title of the recommended course or video.'),
  url: z.string().url().describe('The URL to the resource.'),
  description: z.string().describe('A brief explanation of why this resource is being recommended based on the failed questions.'),
});
export type Recommendation = z.infer<typeof RecommendationSchema>;

const GenerateRecommendationsOutputSchema = z.object({
  udemy: z.array(RecommendationSchema).describe('An array of recommended courses from Udemy.'),
  youtube: z.array(RecommendationSchema).describe('An array of recommended videos from YouTube.'),
});
export type GenerateRecommendationsOutput = z.infer<typeof GenerateRecommendationsOutputSchema>;

export async function generateRecommendations(
  input: GenerateRecommendationsInput
): Promise<GenerateRecommendationsOutput> {
  return generateRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecommendationsPrompt',
  input: { schema: GenerateRecommendationsInputSchema },
  output: { schema: GenerateRecommendationsOutputSchema },
  prompt: `You are an expert software development tutor. A user has just completed a quiz for {{{technology}}} and their skill level has been assessed as {{{level}}}.
The user failed the following questions:
{{#each failedQuestions}}
- Question: {{{question}}}
  - User's Answer: {{{userAnswer}}}
  - Correct Answer: {{{correctAnswer}}}
{{/each}}

Based on the questions they got wrong and their current skill level, your task is to recommend highly-rated, relevant courses from Udemy and videos from YouTube to help them improve.

For each recommendation, provide a title, a valid URL, and a short, encouraging description (in the language with ISO 639-1 code: {{{language}}}) explaining *specifically* how it will help them understand the concepts they struggled with.

Find 2 relevant courses on Udemy and 3 relevant videos on YouTube.
The entire response must be in the language with this ISO 639-1 code: {{{language}}}.
`,
});

const generateRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateRecommendationsFlow',
    inputSchema: GenerateRecommendationsInputSchema,
    outputSchema: GenerateRecommendationsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
