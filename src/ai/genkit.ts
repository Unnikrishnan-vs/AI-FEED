import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Check if API key is available
const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.warn('⚠️  GOOGLE_API_KEY not found in environment variables');
  console.warn('   AI features will use fallback responses');
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: apiKey || 'dummy-key', // Will use fallback if no key
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
