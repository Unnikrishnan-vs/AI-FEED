#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up AI-FEED Connector development environment...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...');
  const envContent = `# Google AI API Key - Get from https://makersuite.google.com/app/apikey
GOOGLE_API_KEY=your_google_ai_api_key_here

# Next.js Environment
NEXT_PUBLIC_APP_URL=http://localhost:9002
`;
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local created successfully');
  console.log('⚠️  Please update GOOGLE_API_KEY with your actual API key\n');
} else {
  console.log('✅ .env.local already exists');
}

// Check if node_modules exists
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies...');
  console.log('   Run: npm install');
} else {
  console.log('✅ Dependencies already installed');
}

console.log('\n🎯 Next steps:');
console.log('1. Update GOOGLE_API_KEY in .env.local with your API key');
console.log('2. Run: npm run dev (for Next.js only)');
console.log('3. Or run both servers:');
console.log('   - Terminal 1: npm run genkit:dev');
console.log('   - Terminal 2: npm run dev');
console.log('4. Open http://localhost:9002 in your browser\n');

console.log('📚 For more information, see README.md'); 