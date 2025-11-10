'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating soft skill practice scenarios.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateSoftSkillExerciseInputSchema = z.object({
  skillType: z
    .string()
    .describe('The type of soft skill to generate a scenario for (e.g., Communication, Conflict Resolution).'),
  language: z.string().describe('The language for the scenario (e.g., "en", "es").'),
});
export type GenerateSoftSkillExerciseInput = z.infer<
  typeof GenerateSoftSkillExerciseInputSchema
>;

const GenerateSoftSkillExerciseOutputSchema = z.object({
  scenario: z.string().describe(
    'A detailed scenario in markdown format that the user needs to respond to. It should present a challenging workplace situation.'
  ),
});
export type GenerateSoftSkillExerciseOutput = z.infer<
  typeof GenerateSoftSkillExerciseOutputSchema
>;

export async function generateSoftSkillExercise(
  input: GenerateSoftSkillExerciseInput
): Promise<GenerateSoftSkillExerciseOutput> {
  return generateSoftSkillExerciseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSoftSkillExercisePrompt',
  input: { schema: GenerateSoftSkillExerciseInputSchema },
  output: { schema: GenerateSoftSkillExerciseOutputSchema },
  prompt: `You are an expert in corporate training and HR. Your task is to create a realistic and challenging workplace scenario to help an employee practice their soft skills.
The entire response must be in the language with this ISO 639-1 code: {{{language}}}.

The scenario should focus on the following soft skill: {{{skillType}}}.

Generate a scenario that:
- Is detailed and sets a clear scene (e.g., who is involved, what is the context).
- Presents a problem or a difficult situation that does not have an obvious or easy answer.
- Requires the user to think critically and apply the specified soft skill.
- Ends with a clear question or prompt asking the user how they would respond or act.

Format the output as a single markdown block.
`,
});

const generateSoftSkillExerciseFlow = ai.defineFlow(
  {
    name: 'generateSoftSkillExerciseFlow',
    inputSchema: GenerateSoftSkillExerciseInputSchema,
    outputSchema: GenerateSoftSkillExerciseOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
