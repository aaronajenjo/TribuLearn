'use server';

import { config } from 'dotenv';
config();

import '@/ai/flows/generate-coding-exercises.ts';
import '@/ai/flows/generate-quiz.ts';
import '@/ai/flows/generate-refactor-challenge';
import '@/ai/flows/analyze-refactor-solution';
