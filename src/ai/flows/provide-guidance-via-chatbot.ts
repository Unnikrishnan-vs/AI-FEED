'use server';
/**
 * @fileOverview An AI chatbot agent for providing guidance to users.
 *
 * - provideGuidanceViaChatbot - A function that handles the chatbot interaction.
 * - ProvideGuidanceViaChatbotInput - The input type for the provideGuidanceViaChatbot function.
 * - ProvideGuidanceViaChatbotOutput - The return type for the provideGuidanceViaChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideGuidanceViaChatbotInputSchema = z.object({
  message: z.string().describe('The user message to be processed by the chatbot.'),
});
export type ProvideGuidanceViaChatbotInput = z.infer<typeof ProvideGuidanceViaChatbotInputSchema>;

const ProvideGuidanceViaChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user message.'),
});
export type ProvideGuidanceViaChatbotOutput = z.infer<typeof ProvideGuidanceViaChatbotOutputSchema>;

export async function provideGuidanceViaChatbot(input: ProvideGuidanceViaChatbotInput): Promise<ProvideGuidanceViaChatbotOutput> {
  return provideGuidanceViaChatbotFlow(input);
}

const provideGuidanceViaChatbotPrompt = ai.definePrompt({
  name: 'provideGuidanceViaChatbotPrompt',
  input: {schema: ProvideGuidanceViaChatbotInputSchema},
  output: {schema: ProvideGuidanceViaChatbotOutputSchema},
  prompt: `You are a chatbot designed to provide guidance to users on the AI-FEED platform, offering information on donating or receiving food, answering common questions, and providing helpful tips to facilitate engagement and effective platform usage.

User Message: {{{message}}}

Chatbot Response: `,
});

const provideGuidanceViaChatbotFlow = ai.defineFlow(
  {
    name: 'provideGuidanceViaChatbotFlow',
    inputSchema: ProvideGuidanceViaChatbotInputSchema,
    outputSchema: ProvideGuidanceViaChatbotOutputSchema,
  },
  async input => {
    const {output} = await provideGuidanceViaChatbotPrompt(input);
    return output!;
  }
);
