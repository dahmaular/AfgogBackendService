# Afgog Backend Service - Vercel Deployment Guide

## Prerequisites
- Vercel account (sign up at vercel.com)
- Vercel CLI installed: `npm install -g vercel`

## Deployment Steps

### 1. Install Vercel CLI (if not installed)
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy to Vercel
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **afgog-backend** (or your preferred name)
- Directory? **./** (press Enter)
- Override settings? **N**

### 4. Set Environment Variables in Vercel

After deployment, add your environment variables:

**Option A: Via Vercel Dashboard**
1. Go to vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add these variables:
   - `afgog_jwtPrivateKey` = `qwerty` (change in production!)
   - `EMAIL_USER` = `your-email@gmail.com`
   - `EMAIL_PASSWORD` = `your-app-password`

**Option B: Via Vercel CLI**
```bash
vercel env add afgog_jwtPrivateKey
vercel env add EMAIL_USER
vercel env add EMAIL_PASSWORD
```

### 5. Redeploy with Environment Variables
```bash
vercel --prod
```

## Important Notes

### MongoDB Connection
- Your MongoDB connection string is currently hardcoded in `config/default.json`
- **SECURITY WARNING**: Move this to environment variables!
- Add `MONGODB_URI` as an environment variable in Vercel
- Update `src/config/db.js` to use `process.env.MONGODB_URI`

### File Uploads
- Vercel has a read-only filesystem
- Current file uploads in `/uploads` won't persist
- **Recommendation**: Use AWS S3, Cloudinary, or similar cloud storage
- You already have AWS SDK installed, so S3 integration is straightforward

### Domain Configuration
- After deployment, Vercel provides a URL like: `afgog-backend.vercel.app`
- Add this URL to your CORS allowed origins in `src/config/routes.js`
- You can add a custom domain in Vercel dashboard

### Update CORS for Production
Add your Vercel URL to CORS:
```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://your-frontend.vercel.app',
    'https://afgog-backend.vercel.app'
  ],
  credentials: true
};
```

## Viewing Logs
```bash
vercel logs
```

## Production Deployment
```bash
vercel --prod
```

## Useful Commands
- `vercel ls` - List all deployments
- `vercel logs [deployment-url]` - View logs
- `vercel domains` - Manage domains
- `vercel env ls` - List environment variables

## API Endpoint
After deployment, your API will be available at:
- Development: `https://afgog-backend-[hash].vercel.app/api/...`
- Production: `https://afgog-backend.vercel.app/api/...`

## Swagger Documentation
- `https://your-vercel-url.vercel.app/api-docs`
