# 🚀 GitHub Deployment Instructions
## Step 1: ✅ DONE - Git Repository Created
Your local git repository is ready with all files committed!
## Step 2: Create GitHub Repository
1. Go to: https://github.com/new
2. Repository name: `flipco-capital`
3. Choose Private or Public
4. **DO NOT** check "Initialize with README"
5. Click "Create repository"
## Step 3: Push to GitHub
After creating the repository on GitHub, run these commands:
```bash
cd flipco-capital
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/flipco-capital.git
# Push to GitHub
git push -u origin main
```
**Example (replace with your username):**
```bash
git remote add origin https://github.com/johndoe/flipco-capital.git
git push -u origin main
```
## Step 4: Connect to Netlify
1. Go to: https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"GitHub"**
4. Authorize Netlify to access your GitHub
5. Select **"flipco-capital"** repository
6. Netlify will auto-detect settings from `netlify.toml`:
   - Build command: `bun run build`
   - Publish directory: `.next`
7. Click **"Deploy site"**
## Step 5: Add Environment Variables
After deployment starts, go to:
**Site settings** → **Environment variables** → **Add a variable**
Add these:
| Key | Value | Description |
|-----|-------|-------------|
| `RESEND_API_KEY` | your-resend-api-key | For email notifications |
| `ADMIN_EMAIL` | your@email.com | Admin notification email |
| `FROM_EMAIL` | noreply@yourdomain.com | Sender email address |
| `BACKUP_ADMIN_EMAIL` | backup@email.com | Backup admin email |
| `NEXT_PUBLIC_SITE_URL` | https://your-site.netlify.app | Your site URL |
After adding, click **"Trigger deploy"** to rebuild with environment variables.
## 🎉 Your Site Will Be Live!
**Expected build time:** 2-3 minutes
**You'll get:**
- ✅ Live URL: `https://your-site.netlify.app`
- ✅ Free SSL certificate (HTTPS)
- ✅ Automatic deployments on git push
- ✅ All features working
## 📊 What's Deployed
**Version 190** includes:
- ✅ Admin portal at `/admin` (admin/admin123)
- ✅ Contractor portal at `/contractor-login` (demo/demo123)
- ✅ Investor dashboard at `/dashboard`
- ✅ Investment opportunities auto-sync
- ✅ Projects portfolio with 57 photo slots
- ✅ Email notification system
- ✅ Complete CMS with 8 management sections
## 🔄 Future Updates
To deploy updates:
```bash
cd flipco-capital
git add .
git commit -m "Your update description"
git push
```
Netlify will automatically deploy your changes!
## 🌐 Custom Domain (Optional)
After deployment:
1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow the instructions to configure DNS
---
**Need help? Check the documentation in `.same/` folder!**