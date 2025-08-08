import { config } from 'dotenv';
config();

console.log('🤖 Starting AI-FEED AI Server...');
console.log('📡 Loading AI flows...');

try {
  // Import AI flows
  import('@/ai/flows/provide-guidance-via-chatbot');
  import('@/ai/flows/match-food-supply-and-demand');
  
  console.log('✅ AI flows loaded successfully');
  console.log('🚀 AI server is ready');
} catch (error) {
  console.error('❌ Error loading AI flows:', error);
  process.exit(1);
}