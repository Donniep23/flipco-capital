# 📧 Email Integration Setup Guide

Your Flipco Capital website now has **complete email integration** for contact forms and registration notifications! Follow this guide to activate the email functionality.

## 🚀 **What's Already Configured:**

✅ **Professional Contact Form Emails** - Automatic admin notifications + thank you emails
✅ **Contractor Registration Notifications** - Instant admin alerts with detailed applicant info
✅ **Investor Registration Notifications** - Complete lead capture with investment details
✅ **Beautiful HTML Email Templates** - Professional branding with your company colors
✅ **Error Handling & Logging** - Robust system with detailed console logging

---

## 🔧 **Step 1: Get Your Resend API Key**

**Resend** is a modern, reliable email service that's perfect for transactional emails.

1. **Sign up for Resend**: Go to [https://resend.com](https://resend.com)
2. **Create an account** (free tier includes 3,000 emails/month)
3. **Get your API key**:
   - Go to [API Keys](https://resend.com/api-keys)
   - Click "Create API Key"
   - Name it "Flipco Capital Website"
   - Copy the API key (starts with `re_`)

---

## 🔧 **Step 2: Configure Environment Variables**

Create a `.env.local` file in your project root with these settings:

```bash
# Email Configuration (Required)
RESEND_API_KEY=re_your_actual_api_key_here
ADMIN_EMAIL=your-email@yourdomain.com
FROM_EMAIL=noreply@yourdomain.com

# Website Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: Backup admin email
BACKUP_ADMIN_EMAIL=backup@yourdomain.com
```

### **Important Notes:**
- Replace `your_actual_api_key_here` with your real Resend API key
- Replace `your-email@yourdomain.com` with YOUR actual email address
- The `FROM_EMAIL` should be from a domain you own (or use a subdomain)

---

## 🔧 **Step 3: Domain Setup (Optional but Recommended)**

For production, you'll want to use your own domain for sending emails:

1. **Add your domain to Resend**:
   - Go to [Domains](https://resend.com/domains) in Resend
   - Click "Add Domain"
   - Enter your domain (e.g., `flipcocapital.com`)
   - Follow the DNS setup instructions

2. **Update your FROM_EMAIL**:
   ```bash
   FROM_EMAIL=noreply@flipcocapital.com
   ```

---

## 🎯 **Step 4: Test the Email System**

1. **Start your development server**:
   ```bash
   bun run dev
   ```

2. **Test the contact form**:
   - Go to your website
   - Fill out the contact form at the bottom
   - Submit it
   - Check your email for both the admin notification AND thank you email

3. **Test contractor registration**:
   - Go to `/contractor-register`
   - Fill out the contractor application
   - Submit it
   - Check your email for the detailed registration notification

4. **Check the console logs**:
   - Look for `📧 Contact form emails sent successfully` messages
   - Look for `📧 contractor registration notification sent successfully` messages

---

## 📧 **What Emails You'll Receive:**

### **Contact Form Submissions:**
- **Admin Notification**: Detailed lead information with call-to-action buttons
- **Thank You Email**: Professional response to the prospect with next steps

### **Contractor Registrations:**
- **Detailed Application**: Complete contractor profile with all form data
- **Generated Credentials**: Temporary login credentials for the contractor
- **Action Items**: Clear next steps for verification and follow-up

### **Investor Registrations:**
- **Investment Profile**: Complete investor information and preferences
- **Lead Scoring**: Investment amount and timeline details
- **Follow-up Instructions**: Automated guidance for the sales process

---

## 🛠️ **Advanced Configuration:**

### **Multiple Admin Emails:**
```bash
# In your .env.local, you can send to multiple emails
ADMIN_EMAIL=admin@flipcocapital.com,sales@flipcocapital.com
```

### **Different Email Templates:**
The email templates are in `/src/lib/email.ts` and can be customized:
- Company branding and colors
- Email content and messaging
- Call-to-action buttons
- Contact information

### **Email Analytics:**
Resend provides detailed analytics:
- Open rates
- Click rates
- Bounce rates
- Delivery status

---

## 🚨 **Troubleshooting:**

### **Emails not sending?**
1. Check your `.env.local` file exists and has the correct API key
2. Verify your Resend API key is valid
3. Check the console for error messages
4. Make sure you're using a valid domain for the FROM_EMAIL

### **Admin not receiving emails?**
1. Check spam/junk folder
2. Verify the ADMIN_EMAIL is correct
3. Check Resend dashboard for delivery status
4. Try using a different admin email address

### **Console Errors:**
- `❌ Failed to send contact form email`: API key or domain issue
- `❌ Registration notification error`: Form data validation issue
- Check the detailed error logs for specific error messages

---

## 📊 **Email System Features:**

### **Contact Form System:**
- ✅ **Instant admin notifications** with lead details
- ✅ **Professional thank you emails** to prospects
- ✅ **Lead scoring** with investment amounts
- ✅ **Call-to-action buttons** for immediate follow-up

### **Registration System:**
- ✅ **Detailed applicant profiles** with all form data
- ✅ **Automatic credential generation** for new users
- ✅ **Verification checklists** for admin review
- ✅ **Professional HTML formatting** with company branding

### **Developer Features:**
- ✅ **Comprehensive error handling** with graceful fallbacks
- ✅ **Detailed console logging** for debugging
- ✅ **TypeScript support** with full type safety
- ✅ **Production-ready** with proper error boundaries

---

## 🎉 **You're All Set!**

Once configured, your website will automatically:
- **Capture all leads** from your contact form
- **Notify you instantly** of new registrations
- **Send professional responses** to prospects
- **Generate login credentials** for new users
- **Track all email activity** in your Resend dashboard

Your Flipco Capital website now has enterprise-level email automation! 🚀

---

## 📞 **Need Help?**

If you encounter any issues with the email setup:
1. Check the console logs for detailed error messages
2. Verify your Resend account and API key
3. Test with a simple email first
4. Contact Resend support if needed

**Your email system is now ready to capture and convert leads automatically!** 💼✨
