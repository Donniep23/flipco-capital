# 🔐 Netlify Environment Variables Setup

## Your Site is Live!
**URL:** https://same-zbf9n8rlt2m-latest.netlify.app

The site is working, but to enable email notifications, you need to add environment variables.

---

## 📧 Step 1: Get Resend API Key

### Option A: Already have Resend account?
1. Go to https://resend.com/api-keys
2. Create a new API key
3. Copy the key (starts with `re_`)

### Option B: New to Resend?
1. Go to https://resend.com
2. Sign up for free account
3. Verify your email
4. Go to API Keys section
5. Create new API key
6. Copy the key

---

## ⚙️ Step 2: Add Environment Variables to Netlify

1. **Go to your Netlify site:**
   - https://app.netlify.com

2. **Click on your site** (same-zbf9n8rlt2m-latest)

3. **Go to:** Site configuration → Environment variables

4. **Click "Add a variable"** and add these:

### Required Variables:

| Variable Name | Example Value | Description |
|--------------|---------------|-------------|
| `RESEND_API_KEY` | `re_123abc...` | Your Resend API key |
| `FROM_EMAIL` | `noreply@yourdomain.com` | Sender email address |
| `ADMIN_EMAIL` | `your@email.com` | Where to receive notifications |

### Optional Variables:

| Variable Name | Example Value | Description |
|--------------|---------------|-------------|
| `BACKUP_ADMIN_EMAIL` | `backup@email.com` | Backup notification email |
| `NEXT_PUBLIC_SITE_URL` | Your Netlify URL | Site URL for links in emails |

---

## 🔄 Step 3: Trigger Redeploy

After adding environment variables:

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait 2-3 minutes for rebuild
4. Your email system will now work!

---

## ✅ Step 4: Test Email System

After redeployment:

1. **Test Contact Form:**
   - Go to your live site → scroll to contact form
   - Fill out and submit
   - Check your `ADMIN_EMAIL` inbox

2. **Test Contractor Application:**
   - Go to `/contractor-register`
   - Fill out application (with ID upload)
   - Check admin email for notification

3. **Test Investor Registration:**
   - Go to `/register`
   - Complete registration form
   - Check admin email for notification

---

## 🌐 Optional: Connect Custom Domain

1. Go to **Site configuration** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `flipcocapital.com`)
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic, ~24 hours)

**Note:** You'll need to update `FROM_EMAIL` to use your custom domain once it's connected.

---

## 📊 What Works Without Environment Variables:

✅ All pages load and display correctly
✅ Admin portal works (content management)
✅ Contractor portal works
✅ Investor portal works
✅ Investment opportunities sync
✅ Projects portfolio
✅ All navigation and features

❌ Email notifications won't send (contact form, registrations, contractor approvals)

---

## 🎯 Summary

**Current Status:**
- ✅ Site is live and fully functional
- ⏳ Email system waiting for environment variables

**Next Steps:**
1. Get Resend API key (2 minutes)
2. Add environment variables to Netlify (2 minutes)
3. Trigger redeploy (3 minutes)
4. Test emails (2 minutes)

**Total time: ~10 minutes** to have everything fully operational!

---

## 🆘 Need Help?

**Resend Support:**
- Documentation: https://resend.com/docs
- Support: support@resend.com

**Netlify Support:**
- Documentation: https://docs.netlify.com
- Community: https://answers.netlify.com

**Same Support:**
- Email: support@same.new

---

**Your platform is ready! Just add those environment variables and you're 100% complete! 🚀**
