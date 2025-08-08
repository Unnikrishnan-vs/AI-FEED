# Environment Variables Guide

## 🔒 Security Best Practices

**NEVER commit environment files to your repository!** This guide shows you how to manage environment variables securely.

## 📁 Environment Files Structure

```
project-root/
├── .env.local          # Local development (IGNORED by git)
├── .env.example        # Example file (COMMITTED to git)
├── .env.production     # Production variables (IGNORED by git)
└── .env.development    # Development variables (IGNORED by git)
```

## 🛡️ What's Protected

The following files are **automatically ignored** by git:

- `.env`
- `.env.local`
- `.env.development.local`
- `.env.test.local`
- `.env.production.local`
- `.env*.local`

## 📝 Setting Up Environment Variables

### 1. Local Development

Create `.env.local` in your project root:

```bash
# Create the file
touch .env.local

# Add your variables
echo "GOOGLE_API_KEY=your_actual_api_key_here" >> .env.local
echo "NEXT_PUBLIC_APP_URL=http://localhost:9002" >> .env.local
```

### 2. Production (Vercel)

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add these variables:

```
GOOGLE_API_KEY=your_actual_google_ai_api_key
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```

## 🔍 Verifying Protection

### Check if .env.local is ignored:

```bash
# This should show .env.local as ignored
git status

# This should NOT show .env.local
git ls-files | grep env
```

### Test the protection:

```bash
# Try to add .env.local (should fail)
git add .env.local

# Check status (should not show .env.local)
git status
```

## 🚨 Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] No API keys in committed files
- [ ] Environment variables set in Vercel
- [ ] `.env.example` contains dummy values
- [ ] Team members know not to commit secrets

## 📋 Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GOOGLE_API_KEY` | Google AI API key | `AIzaSyC...` |
| `NEXT_PUBLIC_APP_URL` | Your app URL | `https://app.vercel.app` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `development` |
| `PORT` | Server port | `9002` |

## 🛠️ Troubleshooting

### Issue: Environment variables not working

```bash
# Check if file exists
ls -la .env*

# Check if variables are loaded
node -e "console.log(process.env.GOOGLE_API_KEY)"
```

### Issue: Variables not available in browser

- Only variables starting with `NEXT_PUBLIC_` are available in the browser
- Server-side variables (like `GOOGLE_API_KEY`) are only available on the server

### Issue: Vercel deployment fails

1. Check Vercel build logs
2. Verify environment variables are set in Vercel dashboard
3. Ensure API key is valid and has proper permissions

## 🔄 Team Collaboration

### For New Team Members

1. Clone the repository
2. Copy `.env.example` to `.env.local`
3. Replace dummy values with real API keys
4. Never commit `.env.local`

### For Deployment

1. Set environment variables in Vercel dashboard
2. Use different API keys for development and production
3. Rotate API keys regularly

## 📚 Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Google AI API Setup](https://makersuite.google.com/app/apikey) 