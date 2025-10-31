# 📧 Email Backend Setup Guide

Your Flipco Capital website now has a fully functional contact form backend! Here's how to set it up for production use.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Resend Account
1. Go to [resend.com](https://resend.com) and sign up for a free account
2. Free tier includes 3,000 emails/month (perfect for contact forms)
3. Verify your email address

### Step 2: Get Your API Key
1. Log into Resend dashboard
2. Go to [API Keys](https://resend.com/api-keys)
3. Click "Create API Key"
4. Name it "Flipco Capital Website"
5. Copy the key (starts with `re_`)

### Step 3: Add Domain (Optional but Recommended)
1. In Resend dashboard, go to "Domains"
2. Add your domain (e.g., `flipcocapital.com`)
3. Follow the DNS setup instructions
4. This allows emails to come from your domain instead of resend.dev

### Step 4: Configure Environment Variables
1. Open your `.env.local` file in the project root
2. Replace the placeholder with your actual API key:

```env
# Replace with your actual Resend API key
RESEND_API_KEY=re_your_actual_api_key_here

# Your business email where contact forms will be sent
BUSINESS_EMAIL=invest@flipcocapital.com
```

## ✅ What Happens When Someone Submits the Form

### You Receive:
- **Professional email notification** with all contact details
- **Formatted HTML email** with prospect information
- **Direct links** to call/email the prospect back
- **Investment amount** if specified
- **Full message** content

### The Visitor Receives:
- **Immediate confirmation email** thanking them for their interest
- **Professional branded email** with Flipco Capital styling
- **Clear next steps** explanation
- **Contact information** for any questions
- **Company benefits** reminder

## 🔧 Testing the Setup

1. **Development Mode**: Without API key configured, form data is logged to console
2. **Production Mode**: With API key configured, real emails are sent
3. **Test the form** on your live website
4. **Check both inboxes** (yours and test email)

## 📊 Email Templates Include

### Business Notification Email:
- ✅ Contact details with clickable links
- ✅ Investment amount (if provided)
- ✅ Full message content
- ✅ Submission timestamp
- ✅ Professional styling
- ✅ Call-to-action reminder

### Customer Confirmation Email:
- ✅ Personalized greeting
- ✅ Clear next steps
- ✅ Company benefits reminder
- ✅ Contact information
- ✅ Professional branding
- ✅ Urgency messaging

## 🚨 Important Notes

- **API Key Security**: Never commit your `.env.local` file to version control
- **Email Deliverability**: Using your own domain improves email delivery rates
- **Response Time**: The faster you respond to inquiries, the higher your conversion rate
- **Backup Plan**: Even if email fails, form data is logged to server console

## 💰 Cost Breakdown

**Resend Pricing** (very affordable):
- **Free**: 3,000 emails/month, 100 emails/day
- **Pro**: $20/month for 50,000 emails/month
- **Business**: $80/month for 200,000 emails/month

For a contact form, the free tier is usually sufficient unless you get hundreds of inquiries daily.

## 🔍 Monitoring & Analytics

Check your server console for:
- ✅ Successful form submissions
- ❌ Error messages
- 📊 Submission frequency
- 🔧 Configuration issues

## 🆘 Troubleshooting

**Form not working?**
1. Check browser console for JavaScript errors
2. Verify API key is correctly set in `.env.local`
3. Restart your development server after changing environment variables
4. Check server console for detailed error messages

**Emails not sending?**
1. Verify API key is correct and active
2. Check your Resend dashboard for email logs
3. Ensure "from" email domain is verified in Resend
4. Check spam folders

**Need help?** Contact same.new support or check the browser console for detailed error messages.

---

🎉 **Your contact form is now a professional lead generation machine!**
