# AI-FEED Connector

A Next.js application that connects food donors with recipients to reduce waste and hunger using AI-powered matching.

## Features

- **AI-Powered Matching**: Intelligent matching of food donors with recipients based on location and needs
- **Real-time Chatbot**: AI assistant for user guidance and support
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Modern UI**: Clean, accessible interface with smooth animations
- **Form Validation**: Robust input validation using Zod schemas

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Google AI API key (for AI features)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Google AI API Key - Get from https://makersuite.google.com/app/apikey
GOOGLE_API_KEY=your_google_ai_api_key_here

# Next.js Environment
NEXT_PUBLIC_APP_URL=http://localhost:9002
```

**To get a Google AI API key:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and paste it in your `.env.local` file

### 3. Run the Development Server

**Option A: Run only the Next.js app (without AI features)**
```bash
npm run dev
```

**Option B: Run with AI features (recommended)**
You'll need two terminal windows:

**Terminal 1 - Start the AI server:**
```bash
npm run genkit:dev
```

**Terminal 2 - Start the Next.js app:**
```bash
npm run dev
```

### 4. Access the Application

Once both servers are running, open your browser and go to:
- **Main App**: `http://localhost:9002`
- **AI Development Server**: Usually runs on a different port (check terminal output)

## Deployment

### Vercel Deployment

This project is optimized for Vercel deployment. Follow these steps:

#### 1. Prepare for Deployment

```bash
# Build the project locally to test
npm run build
```

#### 2. Deploy to Vercel

**Option A: Using Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts and set up environment variables
```

**Option B: Using Vercel Dashboard**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `GOOGLE_API_KEY`: Your Google AI API key
   - `NEXT_PUBLIC_APP_URL`: Your Vercel app URL

#### 3. Environment Variables in Vercel

In your Vercel dashboard, add these environment variables:

```
GOOGLE_API_KEY=your_actual_google_ai_api_key
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```

#### 4. Important Notes for Vercel

- **AI Features**: The AI features will work on Vercel, but they use serverless functions
- **Cold Starts**: AI responses might be slower due to serverless cold starts
- **API Limits**: Be aware of Google AI API rate limits
- **Fallback**: The app includes fallback responses when AI is unavailable

## Available Scripts

- `npm run dev` - Start Next.js development server on port 9002
- `npm run genkit:dev` - Start AI development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── donate/            # Donation interface
│   ├── receive/           # Recipient interface
│   ├── dashboard/         # User dashboard
│   └── login/             # Authentication
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Header, Footer
│   └── chatbot/          # AI chatbot component
├── ai/                   # AI integration
│   └── flows/            # AI workflows
├── lib/                  # Utility functions
└── hooks/                # Custom React hooks
```

## Troubleshooting

### Common Issues

**If you get dependency errors:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**If AI features don't work:**
- Make sure you have a valid Google AI API key
- Ensure the `.env.local` file is in the root directory
- Check that both the Next.js and Genkit servers are running

**If you get TypeScript errors:**
```bash
npm run typecheck
```

**If the app doesn't start:**
- Check if port 9002 is available
- Try running on a different port: `npm run dev -- -p 3000`

**Vercel Deployment Issues:**
- Ensure all environment variables are set in Vercel dashboard
- Check build logs for any errors
- Verify Google AI API key is valid and has proper permissions

### Error Handling

The application includes fallback mechanisms when AI services are unavailable:
- Chatbot will show a helpful error message
- Food matching will return a fallback match
- All errors are logged to the console for debugging

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **AI Integration**: Google AI (Gemini 2.0 Flash) via Genkit
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Deployment**: Vercel (optimized)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
