# Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Method 1: Vercel CLI (Fastest)

1. **Install dependencies**:
```bash
npm install
```

2. **Test locally**:
```bash
npm run dev
```
Visit http://localhost:4000 to verify everything works

3. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

4. **Deploy**:
```bash
vercel
```

5. **Follow the prompts**:
- Set up and deploy? `Y`
- Which scope? (Select your account)
- Link to existing project? `N`
- Project name? `company-research-app` (or your choice)
- Directory? `./`
- Override settings? `N`

6. **Your app will be deployed!** You'll get a URL like: `https://company-research-app.vercel.app`

### Method 2: Vercel Dashboard (Easiest for GitHub)

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Go to Vercel**:
- Visit [vercel.com](https://vercel.com)
- Sign in with GitHub
- Click "New Project"
- Import your repository

3. **Configure** (Vercel auto-detects Next.js):
- Framework Preset: `Next.js`
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

4. **Deploy**:
- Click "Deploy"
- Wait 1-2 minutes
- Your app is live! 🎉

## Environment Variables

The webhooks are hardcoded in the application:
- Text Webhook: `https://n8n.srv812138.hstgr.cloud/webhook/chat_webhook`
- Image Webhook: `https://n8n.srv812138.hstgr.cloud/webhook/image_send`

If you need to change them, update in:
- `app/research/page.tsx` (lines with webhook URLs)

## Troubleshooting

### Build Errors

If you get TypeScript errors during build:
```bash
npm run build
```
Fix any errors shown, then redeploy.

### Node Version

Ensure you're using Node.js 18 or higher:
```bash
node --version
```

If needed, update Node.js from [nodejs.org](https://nodejs.org)

### Missing Dependencies

```bash
rm -rf node_modules package-lock.json
npm install
```

## Post-Deployment Checklist

✅ Visit your deployed URL
✅ Test the "Start Research" button
✅ Test text search with a company name
✅ Test image upload functionality
✅ Check the results page displays correctly
✅ Verify history page works
✅ Test on mobile device

## Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click "Settings" > "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-30 minutes)

## Performance

The app is optimized for:
- Server-side rendering (SSR) where beneficial
- Client-side navigation
- Optimized images and assets
- Minimal bundle size
- Fast page loads

## Support

For deployment issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Review build logs in Vercel Dashboard
- Ensure all dependencies are in package.json

## Updating the Deployed App

```bash
git add .
git commit -m "Update description"
git push
```

Vercel automatically redeploys on every push to main branch!

