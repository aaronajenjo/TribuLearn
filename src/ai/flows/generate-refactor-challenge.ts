'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating code refactoring challenges.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateRefactorChallengeInputSchema = z.object({
  technology: z
    .string()
    .describe('The technology for which to generate the refactor challenge (e.g., C#, Angular).'),
  difficulty: z
    .enum(['beginner', 'intermediate', 'advanced'])
    .describe('The difficulty level of the challenge.'),
});
export type GenerateRefactorChallengeInput = z.infer<
  typeof GenerateRefactorChallengeInputSchema
>;

const GenerateRefactorChallengeOutputSchema = z.object({
  codeToRefactor: z.string().describe('The code snippet that needs to be refactored.'),
  optimalSolution: z.string().describe('The optimal refactored version of the code.'),
});
export type GenerateRefactorChallengeOutput = z.infer<
  typeof GenerateRefactorChallengeOutputSchema
>;

export async function generateRefactorChallenge(
  input: GenerateRefactorChallengeInput
): Promise<GenerateRefactorChallengeOutput> {
  return generateRefactorChallengeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRefactorChallengePrompt',
  input: { schema: GenerateRefactorChallengeInputSchema },
  output: { schema: GenerateRefactorChallengeOutputSchema },
  prompt: `You are a senior software development instructor. Your task is to generate a code refactoring challenge.

Provide a snippet of code that has clear opportunities for refactoring based on the specified technology and difficulty level. The code should be functional but poorly written (e.g., long methods, duplicate code, poor naming, not using best practices).

Also, provide the optimal, refactored version of the code.

Technology: {{{technology}}}
Difficulty: {{{difficulty}}}
`,
});

const generateRefactorChallengeFlow = ai.defineFlow(
  {
    name: 'generateRefactorChallengeFlow',
    inputSchema: GenerateRefactorChallengeInputSchema,
    outputSchema: GenerateRefactorChallengeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
