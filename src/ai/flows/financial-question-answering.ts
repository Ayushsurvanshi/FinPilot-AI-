'use server';
/**
 * @fileOverview This file defines a Genkit flow for answering financial questions with personalized, empathetic, and predictive insights.
 *
 * - financialQuestionAnswering - A function that accepts a financial question and returns a comprehensive answer.
 * - FinancialQuestionAnsweringInput - The input type for the financialQuestionAnswering function.
 * - FinancialQuestionAnsweringOutput - The return type for the financialQuestionAnswering function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialQuestionAnsweringInputSchema = z.object({
  question: z.string().describe('The financial question asked by the user.'),
  financialSituation: z.string().optional().describe('A description of the user\'s current financial situation.'),
  emotionalState: z.string().optional().describe('A description of the user\'s current emotional state related to finances.'),
});
export type FinancialQuestionAnsweringInput = z.infer<typeof FinancialQuestionAnsweringInputSchema>;

const FinancialQuestionAnsweringOutputSchema = z.object({
  answer: z.string().describe('The answer to the financial question, including personalized advice and predictive insights.'),
  emotionalSupport: z.string().optional().describe('Empathetic response and stress-relief financial guidance based on the user\'s emotional state.'),
  predictiveAnalysis: z.string().optional().describe('Future impact analysis and risk assessment related to the financial question.'),
});
export type FinancialQuestionAnsweringOutput = z.infer<typeof FinancialQuestionAnsweringOutputSchema>;

export async function financialQuestionAnswering(input: FinancialQuestionAnsweringInput): Promise<FinancialQuestionAnsweringOutput> {
  return financialQuestionAnsweringFlow(input);
}

const financialQuestionAnsweringPrompt = ai.definePrompt({
  name: 'financialQuestionAnsweringPrompt',
  input: {schema: FinancialQuestionAnsweringInputSchema},
  output: {schema: FinancialQuestionAnsweringOutputSchema},
  prompt: `You are a financial advisor AI, adept at answering complex financial questions with personalized, empathetic, and predictive insights.

  Consider the user's financial situation and emotional state to provide tailored advice.

  Question: {{{question}}}
  Financial Situation: {{{financialSituation}}}
  Emotional State: {{{emotionalState}}}

  Answer the question providing useful advice.
  Also generate an empathetic response based on the user's emotional state in the emotionalSupport field.
  Provide a predictive analysis of the outcome in predictiveAnalysis field.
  Ensure the answer is easy to understand and actionable. Focus on how the user can improve their situation.
  If financialSituation is not available, make general recommendations. If emotionalState is not available, skip the empathetic response.
`,
});

const financialQuestionAnsweringFlow = ai.defineFlow(
  {
    name: 'financialQuestionAnsweringFlow',
    inputSchema: FinancialQuestionAnsweringInputSchema,
    outputSchema: FinancialQuestionAnsweringOutputSchema,
  },
  async input => {
    const {output} = await financialQuestionAnsweringPrompt(input);
    return output!;
  }
);
