'use server';
/**
 * @fileOverview This file defines a Genkit flow for analyzing a user's refactored code solution.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeRefactorSolutionInputSchema = z.object({
  originalCode: z.string().describe('The original code snippet that was to be refactored.'),
  userSolution: z.string().describe("The user's refactored code solution."),
  optimalSolution: z.string().describe('The optimal refactored version of the code for comparison.'),
  technology: z.string().describe('The programming language or framework of the code.'),
  language: z.string().describe('The language for the analysis (e.g., "en", "es").'),
});
export type AnalyzeRefactorSolutionInput = z.infer<
  typeof AnalyzeRefactorSolutionInputSchema
>;

const AnalyzeRefactorSolutionOutputSchema = z.object({
  analysis: z.string().describe(
    'A detailed analysis of the user\'s solution, highlighting strengths, weaknesses, and areas for improvement. Provide feedback in markdown format.'
  ),
});
export type AnalyzeRefactorSolutionOutput = z.infer<
  typeof AnalyzeRefactorSolutionOutputSchema
>;

export async function analyzeRefactorSolution(
  input: AnalyzeRefactorSolutionInput
): Promise<AnalyzeRefactorSolutionOutput> {
  return analyzeRefactorSolutionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeRefactorSolutionPrompt',
  input: { schema: AnalyzeRefactorSolutionInputSchema },
  output: { schema: AnalyzeRefactorSolutionOutputSchema },
  prompt: `You are an expert code reviewer. Analyze the user's attempt to refactor a piece of code.
The entire response must be in the language with this ISO 639-1 code: {{{language}}}.

Technology: {{{technology}}}

Original Code:
'''
{{{originalCode}}}
'''

User's Refactored Solution:
'''
{{{userSolution}}}
'''

Optimal Solution for reference:
'''
{{{optimalSolution}}}
'''

Your task is to provide a constructive analysis of the user's solution. Compare it to the original code and the optimal solution.

- Did the user correctly identify and address the main issues in the original code?
- How does the user's solution compare to the optimal one?
- What did they do well?
- What could be improved?
- Provide specific suggestions for improvement.

Format your response in Markdown. Use headings, lists, and code blocks for clarity.
`,
});

const analyzeRefactorSolutionFlow = ai.defineFlow(
  {
    name: 'analyzeRefactorSolutionFlow',
    inputSchema: AnalyzeRefactorSolutionInputSchema,
    outputSchema: AnalyzeRefactorSolutionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
