'use server';
/**
 * @fileOverview This file defines a Genkit flow for analyzing a user's response to a soft skill scenario.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeSoftSkillSolutionInputSchema = z.object({
  scenario: z.string().describe('The workplace scenario that was presented to the user.'),
  userSolution: z.string().describe("The user's proposed solution or response to the scenario."),
  language: z.string().describe('The language for the analysis (e.g., "en", "es").'),
});
export type AnalyzeSoftSkillSolutionInput = z.infer<
  typeof AnalyzeSoftSkillSolutionInputSchema
>;

const AnalyzeSoftSkillSolutionOutputSchema = z.object({
  analysis: z.string().describe(
    "A detailed, constructive analysis of the user's response. It should be in markdown format."
  ),
});
export type AnalyzeSoftSkillSolutionOutput = z.infer<
  typeof AnalyzeSoftSkillSolutionOutputSchema
>;

export async function analyzeSoftSkillSolution(
  input: AnalyzeSoftSkillSolutionInput
): Promise<AnalyzeSoftSkillSolutionOutput> {
  return analyzeSoftSkillSolutionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSoftSkillSolutionPrompt',
  input: { schema: AnalyzeSoftSkillSolutionInputSchema },
  output: { schema: AnalyzeSoftSkillSolutionOutputSchema },
  prompt: `You are an expert corporate coach and HR specialist. Your task is to provide constructive feedback on a user's response to a workplace scenario.
The entire response must be in the language with this ISO 639-1 code: {{{language}}}.

Original Scenario:
'''
{{{scenario}}}
'''

User's Response:
'''
{{{userSolution}}}
'''

Your analysis should:
1.  Start by acknowledging the strengths of the user's approach. What did they do well?
2.  Identify areas for improvement. Are there any potential negative consequences of their proposed action? Did they miss any key considerations?
3.  Provide an alternative, ideal way to handle the situation. Explain *why* this alternative is better, referencing principles of good communication, conflict resolution, or leadership.
4.  Conclude with a summary of key takeaways or a general principle the user can apply in the future.

Format your response in Markdown. Use headings, bold text, and bullet points to make the feedback clear, structured, and easy to digest.
`,
});

const analyzeSoftSkillSolutionFlow = ai.defineFlow(
  {
    name: 'analyzeSoftSkillSolutionFlow',
    inputSchema: AnalyzeSoftSkillSolutionInputSchema,
    outputSchema: AnalyzeSoftSkillSolutionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
