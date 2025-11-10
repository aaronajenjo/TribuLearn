'use server';

import { config } from 'dotenv';
config();

import '@/ai/flows/generate-coding-exercises.ts';
import '@/ai/flows/generate-quiz.ts';
import '@/ai/flows/generate-refactor-challenge';
import '@/ai/flows/analyze-refactor-solution';
import '@/ai/flows/generate-recommendations';
import '@/ai/flows/generate-soft-skill-exercise';
import '@/ai/flows/analyze-soft-skill-solution';
