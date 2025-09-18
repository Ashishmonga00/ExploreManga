# Vercel Deployment Guide for Explore Manga

This project has been configured for Vercel deployment. Here's what you need to know:

## Deployment Setup

### 1. Files Created/Modified
- `vercel.json` - Vercel configuration file
- `api/index.ts` - Serverless function for the backend
- `api/package.json` - Dependencies for the serverless function

### 2. Project Structure for Vercel
```
project-root/
├── api/                 # Serverless backend
│   ├── index.ts        # Express server as serverless function
│   └── package.json    # Backend dependencies
├── client/             # React frontend
│   └── dist/          # Built frontend (created during build)
├── server/            # Original backend code (used by api/index.ts)
└── vercel.json        # Vercel deployment configuration
```

### 3. Environment Variables
Make sure to set these in your Vercel dashboard (Project Settings → Environment Variables):
- `NODE_ENV=production`
- Any other environment variables your app needs

### 4. Deployment Steps

#### Option 1: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project" 
4. Import your GitHub repository
5. Vercel will automatically detect the configuration and deploy

#### Option 2: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### 5. Build Process
Vercel will:
1. Run `npm run build` to build the React frontend
2. Build the serverless function from `api/index.ts`
3. Deploy both the static frontend and serverless API

### 6. After Deployment
- Frontend will be served from the root domain: `https://your-project.vercel.app`
- API endpoints will be available at: `https://your-project.vercel.app/api/*`

### 7. Common Issues & Solutions

**"Serverless Function has crashed"**
- Check Vercel function logs in the dashboard
- Ensure all dependencies are in `api/package.json`
- Verify environment variables are set correctly

**"404 on API routes"**
- Confirm API routes start with `/api/`
- Check that `vercel.json` routing is correct

**Frontend not loading**
- Ensure `npm run build` works locally
- Check that build output is in `client/dist/`

### 8. Local Development
Continue using `npm run dev` for local development. The Vercel configuration only affects deployment.

### 9. Monitoring
- Check deployment status in Vercel dashboard
- Monitor function logs for any runtime errors
- Use Vercel Analytics for performance insights

## Support
If you encounter issues, check:
1. Vercel function logs in the dashboard
2. Browser developer tools for frontend errors  
3. Ensure all required environment variables are set