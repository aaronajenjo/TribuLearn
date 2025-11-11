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
  title: z.string().describe('The title of the recommended course or video search query.'),
  url: z.string().url().describe('The URL to the resource. This should be a search URL.'),
  description: z.string().describe('A brief explanation of why this resource is being recommended based on the failed questions.'),
});
export type Recommendation = z.infer<typeof RecommendationSchema>;

const GenerateRecommendationsOutputSchema = z.object({
  udemy: z.array(RecommendationSchema).describe('An array of recommended course searches from Udemy.'),
  youtube: z.array(RecommendationSchema).describe('An array of recommended video searches from YouTube.'),
  percipio: z.array(RecommendationSchema).describe('An array of recommended course searches from Percipio.'),
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

Based on the questions they got wrong and their current skill level, your task is to recommend resources to help them improve.

1.  **Udemy Course Searches**: Recommend 2 relevant course searches for Udemy. For each recommendation:
    - Create a concise, descriptive title that would be a good search query (e.g., "Complete C# Masterclass" or "Angular - The Complete Guide").
    - For the URL, create a valid Udemy search URL by encoding the title and appending it to 'https://www.udemy.com/courses/search/?q='. For example, for the title "Complete C# Masterclass", the URL should be "https://www.udemy.com/courses/search/?q=Complete+C%23+Masterclass".
    - Provide a short, encouraging description (in the language with ISO 639-1 code: {{{language}}}) explaining *specifically* how it addresses the concepts they struggled with.

2.  **YouTube Video Searches**: Recommend 3 video searches for YouTube. For each recommendation:
    - Create a concise, descriptive title that would be a good search query (e.g., "C# LINQ Tutorial for Beginners" or "Angular Reactive Forms Deep Dive").
    - For the URL, create a valid YouTube search URL by encoding the title and appending it to 'https://www.youtube.com/results?search_query='. For example, for the title "C# LINQ Tutorial", the URL should be "https://www.youtube.com/results?search_query=C%23+LINQ+Tutorial".
    - Provide a short, encouraging description (in the language with ISO 639-1 code: {{{language}}}) explaining what concepts the user will find by searching for this topic.

3.  **Percipio (Sopra Steria) Course Searches**: Recommend 2 relevant course searches for Percipio. For each recommendation:
    - Create a concise, descriptive title that would be a good search query.
    - For the URL, create a valid Percipio search URL by encoding the title and appending it to 'https://soprasteria.percipio.com/search?q='. For example, for "C# Fundamentals", the URL is "https://soprasteria.percipio.com/search?q=C%23+Fundamentals".
    - Provide a short, encouraging description (in the language with ISO 639-1 code: {{{language}}}) explaining its relevance.

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
