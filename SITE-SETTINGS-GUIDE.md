# 🎨 Global Site Settings - Complete Control Guide

## ✅ What You Can Now Edit From Admin Portal

You can now edit **EVERY piece of text** on your homepage and projects page from one central location in the admin portal.

---

## 📍 How to Access Site Settings

1. **Login:** Go to `flipcocapital.com/admin` and login
2. **Click:** "Site Settings" card on the dashboard
3. **Edit:** Any text you want to change
4. **Save:** Click "Save All Settings" button
5. **Refresh:** Your homepage or projects page to see changes live!

**Direct URL:** `flipcocapital.com/admin/edit/site-settings`

---

## 📊 What You Can Edit

### **1. Global Statistics** (Show on Homepage & Projects Page)

These numbers appear in multiple places across your site:

| Setting | Where It Shows | Example |
|---------|---------------|---------|
| **Total Properties Flipped** | Homepage hero stats, Projects page stats | `1500` |
| **Average ROI (%)** | Homepage hero stats, Projects page stats | `30` |
| **Transparency Stat** | Homepage hero stats (3rd stat) | `100%` |
| **Total Investment Volume** | About page | `300` (in millions) |
| **Happy Investors** | About page | `30` |

**How to edit:**
- Just change the numbers
- No need to add "%" or "+" - they're added automatically
- Changes appear on ALL pages instantly

---

### **2. Contact Information** (Shows Everywhere)

| Setting | Where It Shows | Example |
|---------|---------------|---------|
| **Company Phone** | Homepage contact, Footer | `(713) 545-3662` |
| **Company Email** | Homepage contact, Footer | `invest@flipcocapital.com` |

---

### **3. Homepage Hero Section** (Top of Homepage)

The big bold section at the top of your homepage:

| Setting | What It Is | Example |
|---------|-----------|---------|
| **Hero Title Line 1** | First line of headline | `Real Estate Investment` |
| **Hero Title Line 2** | Second line (appears in blue) | `Made Transparent` |
| **Hero Description** | Paragraph below headline | `Partner with Flipco Capital for complete transparency...` |
| **Primary Button Text** | Blue button text | `Start Investing` |
| **Secondary Button Text** | White button text | `Watch Demo` |

**Preview:**
```
Real Estate Investment
Made Transparent  ← Blue text
[Description paragraph here]
[Start Investing] [Watch Demo]
```

---

### **4. Section Titles** (Homepage)

Control all the section headings:

| Setting | Section | Default Text |
|---------|---------|-------------|
| **"Our Process" Title** | Process section | `Our Process` |
| **"Our Process" Subtitle** | Below title | `Simple, transparent, and profitable` |
| **"Platform Features" Title** | Features section | `Platform Features` |
| **"Platform Features" Subtitle** | Below title | `Advanced technology for complete investment transparency` |
| **"Investment Opportunities" Title** | Opportunities section | `Current Investment Opportunities` |
| **"Investment Opportunities" Subtitle** | Below title | `Partner with us on these vetted...` |

---

### **5. Projects Page**

| Setting | What It Is | Default Text |
|---------|-----------|-------------|
| **Projects Page Title** | Main heading | `Our Project Portfolio` |
| **Projects Page Subtitle** | Description below | `Explore our successful property transformations...` |

---

### **6. Other Settings**

| Setting | Where It Shows | Example |
|---------|---------------|---------|
| **Minimum Investment** | Homepage contact section | `$50,000` |

---

## 🚀 How Changes Work

### **Instant Sync Across Pages**

When you change a setting, it updates **everywhere** it's used:

**Example:** Change "Total Properties Flipped" from 1500 to 2000

✅ **Homepage hero stats:** Shows `2000+`
✅ **Projects page stats:** Shows `2000+`
✅ **All devices:** Everyone sees `2000+`

---

## 📝 Step-by-Step Example: Changing Your Stats

**Goal:** Update your total properties from 1500 to 2000

1. **Go to:** `flipcocapital.com/admin/edit/site-settings`
2. **Find:** "Total Properties Flipped" field (in Global Statistics section)
3. **Change:** `1500` → `2000`
4. **Click:** "Save All Settings" button
5. **Wait:** 2-3 seconds for "✅ Settings saved!" message
6. **Open:** `flipcocapital.com` in a new tab
7. **Refresh:** The page
8. **See:** Homepage now shows "2000+ Properties Flipped"
9. **Also check:** `flipcocapital.com/projects` - shows 2000+ there too!

---

## 🎯 Common Use Cases

### **Use Case 1: Update Your Company Achievements**

```
Every quarter, update your stats:
- Total Properties: 1500 → 1750 → 2000
- Average ROI: 30% → 32% → 35%
```

### **Use Case 2: Change Your Pitch**

```
Test different headlines:
- "Real Estate Investment Made Transparent"
- "Transparent Real Estate Partnerships"
- "Co-Own Every Property You Invest In"
```

### **Use Case 3: Seasonal Campaigns**

```
Update your CTA buttons:
- "Start Investing" → "Join Our 2025 Cohort"
- "Watch Demo" → "See Our Q1 Results"
```

### **Use Case 4: A/B Testing**

```
Try different descriptions:
- Version A: Focus on transparency
- Version B: Focus on returns
- Version C: Focus on partnership model
```

---

## 🔄 What Syncs Where

### **Numbers That Sync**

| Setting | Homepage | Projects Page |
|---------|----------|---------------|
| Total Properties | ✅ Hero stats | ✅ Portfolio stats |
| Average ROI | ✅ Hero stats | ✅ Portfolio stats |
| Transparency | ✅ Hero stats | ❌ |

### **Text That Syncs**

| Setting | Homepage | Projects Page | Other |
|---------|----------|---------------|-------|
| Company Phone | ✅ Contact | ❌ | ✅ Footer |
| Company Email | ✅ Contact | ❌ | ✅ Footer |
| Hero Title | ✅ | ❌ | ❌ |
| Section Titles | ✅ | ❌ | ❌ |
| Projects Title | ❌ | ✅ | ❌ |

---

## 💡 Pro Tips

### **Tip 1: Keep Backups**
Before making big changes, write down your current text so you can revert if needed.

### **Tip 2: Test on Mobile**
After changing text, check how it looks on your phone - some long titles might wrap awkwardly.

### **Tip 3: Be Specific with Stats**
Use real numbers from your business - transparency is your brand!

### **Tip 4: Update Regularly**
Keep your stats fresh. Update them monthly or quarterly as you complete more projects.

### **Tip 5: Consistent Voice**
When changing text, maintain a consistent tone across all sections.

---

## 🛠️ Technical Details (For Your Developer)

### **Database Structure**

All settings are stored in the `site_settings` table in Supabase:

```sql
SELECT * FROM site_settings WHERE id = 1;
```

### **API Endpoint**

```
GET  /api/site-settings  - Load current settings
PUT  /api/site-settings  - Update settings
```

### **How Pages Load Data**

1. **Homepage:** Fetches settings on load, uses them in JSX
2. **Projects Page:** Fetches settings on load, displays title and stats
3. **Admin Page:** Fetches settings, allows editing, saves via PUT

### **Schema Migration**

If you need to add the new columns to your Supabase database:

1. Go to Supabase SQL Editor
2. Run the file: `SUPABASE-EXPAND-SETTINGS.sql`
3. This adds all the new text fields

---

## ✅ Checklist: First Time Setup

- [ ] Run `SUPABASE-EXPAND-SETTINGS.sql` in Supabase
- [ ] Verify the `site_settings` table has all columns
- [ ] Login to admin portal
- [ ] Go to Site Settings page
- [ ] Update all fields with your actual values
- [ ] Click "Save All Settings"
- [ ] Check homepage to see changes
- [ ] Check projects page to see updated stats
- [ ] Test on mobile device
- [ ] Bookmark the Site Settings admin page for quick access

---

## 🆘 Troubleshooting

### **Changes Don't Appear**

**Solution:**
1. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Wait 30 seconds for Netlify edge cache to update
4. Check admin panel - did you click "Save All Settings"?

### **Some Fields Are Empty**

**Solution:**
1. Go to Supabase SQL Editor
2. Run `SUPABASE-EXPAND-SETTINGS.sql` to add missing columns
3. Refresh admin page
4. Fields should now show default values

### **Settings Won't Save**

**Solution:**
1. Check browser console for errors (F12)
2. Verify you're logged in to admin
3. Check Netlify environment variables are set
4. Verify Supabase connection is working

---

## 📞 Quick Reference

**Admin Login:** `flipcocapital.com/admin`
**Site Settings:** `flipcocapital.com/admin/edit/site-settings`
**Homepage:** `flipcocapital.com`
**Projects:** `flipcocapital.com/projects`

---

## 🎉 What's Next?

You now have complete control over your site's text content! Here's what you can do:

1. ✅ Update your stats as you complete more projects
2. ✅ Test different headlines to improve conversions
3. ✅ Keep your contact info current
4. ✅ Adjust your messaging for different campaigns
5. ✅ Maintain consistent branding across all pages

**No developer needed - you can do it all yourself!** 🚀
