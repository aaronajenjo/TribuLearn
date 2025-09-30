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
  language: z.string().describe('The language for the challenge (e.g., "en", "es").'),
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
  prompt: `You are a senior software development instructor creating code refactoring challenges.
The entire response for the "codeToRefactor" field must be in the language with this ISO 639-1 code: {{{language}}}. The "optimalSolution" must be only code.
Both the 'codeToRefactor' and 'optimalSolution' must be well-indented.

Your task is to generate a code snippet that is a small method, but contains multiple anti-patterns and areas for improvement. The code should be functional but poorly written. Focus on things like:
- Bad variable names
- Magic numbers
- Deeply nested logic
- Long methods that could be broken down
- Duplicate code
- Not using language features correctly
- Inefficient algorithms or loops

If the technology is C#, please include poorly optimized Entity Framework queries where applicable (e.g., N+1 problems, missing AsNoTracking(), or inefficient filtering).

Also, provide the optimal, refactored version of the code that addresses all the issues.

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
