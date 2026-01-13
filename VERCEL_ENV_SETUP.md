# Vercel Environment Variables Setup

After deployment, you need to add these environment variables in Vercel:

## 1. Go to Vercel Dashboard
- Visit: https://vercel.com/dashboard
- Select your project: `afgog-backend-service`
- Go to Settings → Environment Variables

## 2. Add These Environment Variables:

### Required Variables:
```
afgog_jwtPrivateKey = qwerty
MONGODB_URI = mongodb+srv://dahmaular:Ib30ZGgiJgbnX2qi@afgog.iftjr52.mongodb.net/afgog?retryWrites=true&w=majority
EMAIL_USER = adedamolagunbiade@gmail.com
EMAIL_PASSWORD = wrvaoymyzvbechal
BUCKET_URL = afgog-1a208.appspot.com
```

### Optional (if using AWS S3):
```
AWS_BUCKET_NAME = your-bucket-name
AWS_REGION = us-east-1
AWS_ACCESS_KEY = your-aws-access-key
AWS_SECRET_ACCESS_KEY = your-aws-secret-key
```

## 3. Redeploy After Adding Variables
Run in your terminal:
```bash
vercel --prod
```

## 4. Your API Endpoints:
- Production: `https://afgog-backend-service.vercel.app/api/...`
- Swagger Docs: `https://afgog-backend-service.vercel.app/api-docs`

## 5. Update Frontend
Update your frontend to use the new Vercel URL:
```javascript
const API_URL = 'https://afgog-backend-service.vercel.app/api';
```

## Important Security Notes:
⚠️ **BEFORE GOING TO PRODUCTION:**
1. Change `afgog_jwtPrivateKey` to a strong random string
2. Never commit `.env` file to git (already in .gitignore)
3. Use different credentials for development and production
