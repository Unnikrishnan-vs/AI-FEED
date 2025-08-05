'use server';
/**
 * @fileOverview An AI agent that matches food donations with recipient needs.
 *
 * - matchFoodSupplyAndDemand - A function that handles the matching process.
 * - MatchFoodSupplyAndDemandInput - The input type for the matchFoodSupplyAndDemand function.
 * - MatchFoodSupplyAndDemandOutput - The return type for the matchFoodSupplyAndDemand function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchFoodSupplyAndDemandInputSchema = z.object({
  foodType: z
    .string()
    .describe('The type of food available for donation (e.g., cooked meals, bread).'),
  quantity: z.number().describe('The quantity of food available (e.g., 50 servings, 20 loaves).'),
  donorLatitude: z.number().describe('The latitude of the donor location.'),
  donorLongitude: z.number().describe('The longitude of the donor location.'),
  recipientNeed: z.string().describe('The food need of the recipient (e.g., meals for 60 people, bread).'),
  recipientLatitude: z.number().describe('The latitude of the recipient location.'),
  recipientLongitude: z.number().describe('The longitude of the recipient location.'),
});
export type MatchFoodSupplyAndDemandInput = z.infer<typeof MatchFoodSupplyAndDemandInputSchema>;

const MatchFoodSupplyAndDemandOutputSchema = z.object({
  match: z.object({
    recipient: z.string().describe('The name of the recipient matched with the donation.'),
    distance: z
      .string()
      .describe('The distance between the donor and recipient locations (e.g., 5km).'),
    notes: z.string().describe('Additional notes or considerations for the match.'),
  }),
});
export type MatchFoodSupplyAndDemandOutput = z.infer<typeof MatchFoodSupplyAndDemandOutputSchema>;

export async function matchFoodSupplyAndDemand(
  input: MatchFoodSupplyAndDemandInput
): Promise<MatchFoodSupplyAndDemandOutput> {
  return matchFoodSupplyAndDemandFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchFoodSupplyAndDemandPrompt',
  input: {schema: MatchFoodSupplyAndDemandInputSchema},
  output: {schema: MatchFoodSupplyAndDemandOutputSchema},
  prompt: `You are an AI assistant designed to match food donations with recipient needs, leveraging semantic similarity and proximity.

  Analyze the following food donation and recipient request details to find the best match. Consider the type of food, quantity, and location of both the donor and recipient.

  Food Donation:
  - Type: {{{foodType}}}
  - Quantity: {{{quantity}}}
  - Location (Latitude, Longitude): ({{{donorLatitude}}}, {{{donorLongitude}}})

  Recipient Request:
  - Need: {{{recipientNeed}}}
  - Location (Latitude, Longitude): ({{{recipientLatitude}}}, {{{recipientLongitude}}})

  Determine the most suitable recipient for the food donation based on the provided information. Prioritize matches within a 5km radius.  Return the recipient name, distance between donor and recipent and any notes or considerations for the match.

  Ensure the output matches the specified JSON schema.`,
});

const matchFoodSupplyAndDemandFlow = ai.defineFlow(
  {
    name: 'matchFoodSupplyAndDemandFlow',
    inputSchema: MatchFoodSupplyAndDemandInputSchema,
    outputSchema: MatchFoodSupplyAndDemandOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
