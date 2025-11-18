# Flipco Capital Admin Panel Guide

## 🏠 Managing Investment Opportunities (Homepage Properties)

### How to Access:
1. Go to `/admin` and login
2. Click on **"Investment Opportunities"** card
3. You'll see all properties currently displayed on the homepage

### What You Can Do:
✅ **Add New Properties:**
- Click "Add New Property" button
- Fill in all details:
  - Property name and address
  - Purchase price, renovation budget, estimated ARV
  - ROI percentage
  - Timeline (e.g., "4 months")
  - Property image URL
  - Status (Available Now, Starting Soon, Fully Funded)
  - Investment tier ROIs (Bronze, Silver, Gold)
- Click "Save Changes"
- **Property immediately appears on homepage!**

✅ **Edit Existing Properties:**
- Click on any property from the list
- Modify any field
- Click "Save Changes"
- Homepage updates instantly

✅ **Delete Properties:**
- Click on a property
- Click "Delete" button
- Confirm deletion
- Property removed from homepage

### Key Features:
- **Unlimited properties** - Add as many as you want
- **Real-time updates** - Changes appear immediately
- **Full control** - Edit every detail
- **Investment tiers** - Set different ROI for Bronze/Silver/Gold investors

---

## 👥 Managing Investor Portfolios

### How to Access:
1. Go to `/admin` and login
2. Click on **"Investor Portfolios"** card
3. You'll see all investor accounts

### How to Assign Projects to Investors:

**Step 1: Select or Create Investor**
- Click existing investor from list, OR
- Click "Add New Investor"
- Enter investor name and email

**Step 2: Add Projects to Portfolio**
- Click "Add Project" button
- Select project from dropdown (shows all your properties)
- Set details:
  - **Investment Amount** - How much they invested
  - **Status** - Planning, In Progress, or Completed
  - **Progress** - 0-100%
  - **Estimated Return** - Their expected profit
- Click "Save Portfolio Changes"

**Step 3: Manage Multiple Projects**
- Each investor can have multiple projects
- Add/remove projects anytime
- Update progress as work advances
- Change status when project completes

### What Happens:
✅ Investor sees their portfolio in their dashboard at `/dashboard`
✅ All projects you assign appear in their account
✅ Progress bars update automatically
✅ Returns and profits calculate in real-time
✅ Total invested and active projects auto-calculate

### Use Cases:
1. **New investor signs up** → Create account → Assign first project
2. **Project sells** → Change status to "Completed" → Update actual return
3. **Investor adds capital** → Add another project to their portfolio
4. **Track progress** → Update progress % as renovation advances

---

## 🔄 How It All Connects:

```
1. You create PROPERTY in "Investment Opportunities"
   ↓
2. Property appears on HOMEPAGE for all visitors
   ↓
3. Investor shows interest and registers
   ↓
4. You go to "Investor Portfolios"
   ↓
5. Assign that PROPERTY to their account
   ↓
6. Investor logs in and sees project in their dashboard!
```

---

## 💡 Pro Tips:

**For Investment Opportunities:**
- Use high-quality property images
- Keep status up-to-date (Available → Starting Soon → Fully Funded)
- Adjust ROI tiers to match your profit margins
- Set realistic timelines

**For Investor Portfolios:**
- Update progress weekly to keep investors engaged
- Change status to "Completed" when project sells
- Input actual returns (not just estimated) when done
- Add new projects as investor reinvests

---

## 🎯 Common Workflows:

### Adding a New Property Deal:
1. Admin → Investment Opportunities
2. Click "Add New Property"
3. Enter all property details
4. Save
5. Property now visible on homepage!

### Onboarding a New Investor:
1. Investor registers on website
2. Admin → Investor Portfolios
3. Click "Add New Investor" (enter their details)
4. Click "Add Project"
5. Select project, enter investment amount
6. Save portfolio
7. Investor can now login and see their project!

### Completing a Project:
1. Admin → Investor Portfolios
2. Select investor
3. Find the project
4. Change status to "Completed"
5. Update actual return amount
6. Save changes
7. Investor sees updated return!

---

## 📊 Data Storage:

All data is stored in browser localStorage:
- **Investment Opportunities:** `flipco_investment_opportunities`
- **Investor Portfolios:** `flipco_investors`

This means:
- ✅ Changes persist across sessions
- ✅ No database needed for testing
- ✅ Easy to backup (export localStorage)
- ⚠️ Data is browser-specific (use same browser/computer)

---

## 🚀 Next Level:

When ready to deploy:
1. Integrate with real database (PostgreSQL, MongoDB, etc.)
2. Add API endpoints for CRUD operations
3. Deploy to production
4. All your test data can be migrated!

---

**You now have full control over:**
- ✅ What properties appear on your website
- ✅ Which projects are in each investor's portfolio
- ✅ All investment amounts and returns
- ✅ Project statuses and progress tracking

**Everything updates in real-time! 🎉**
