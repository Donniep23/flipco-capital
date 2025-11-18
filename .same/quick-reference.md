# 🚀 Flipco Capital Platform - Quick Reference Guide

## Version 187 - Complete Feature Overview

---

## 🔐 Login Credentials

### Admin Portal
- **URL:** `http://localhost:3000/admin`
- **Username:** `admin`
- **Password:** `admin123`

### Contractor Portal (Demo)
- **URL:** `http://localhost:3000/contractor-login`
- **Username:** `demo`
- **Password:** `demo123`

### Investor Portal (Demo)
- **URL:** `http://localhost:3000/login`
- **Email:** Any email
- **Password:** Any password (demo mode)

---

## 📍 Page URLs

| Page | URL | Description |
|------|-----|-------------|
| **Homepage** | `/` | Main landing page with opportunities |
| **About** | `/about` | Team and company information |
| **Projects** | `/projects` | Portfolio with 4 tabs (All/Completed/In Progress/Upcoming) |
| **Admin Dashboard** | `/admin` | Content management system |
| **Investment Opportunities Manager** | `/admin/edit/investment-opportunities` | Add/edit properties |
| **Investor Portfolio Manager** | `/admin/edit/investor-portfolios` | Assign projects to investors |
| **Contractor Applications** | `/admin/edit/contractor-approval` | Review contractor applications |
| **Contractor Login** | `/contractor-login` | Contractor portal access |
| **Contractor Dashboard** | `/contractor-dashboard` | Contractor work management (6 tabs) |
| **Investor Login** | `/login` | Investor portal access |
| **Investor Dashboard** | `/dashboard` | Investor portfolio tracking |
| **Contractor Register** | `/contractor-register` | New contractor application |
| **Investor Register** | `/register` | New investor registration |

---

## 🎯 Key Features by Role

### 👨‍💼 Admin Features

**What You Can Do:**
1. **Manage Investment Opportunities**
   - Add/edit/delete properties shown on homepage
   - Set prices, ROI, timelines
   - Configure investment tiers
   - Upload property images

2. **Manage Investor Portfolios**
   - Create investor accounts
   - Assign projects to investors
   - Set investment amounts
   - Track progress and returns

3. **Approve Contractors**
   - Review applications with ID verification
   - Send temporary login credentials
   - Monitor contractor performance

4. **Edit All Content**
   - Homepage sections
   - About page
   - FAQ
   - Projects portfolio

**How to Access:**
1. Go to `/admin`
2. Login with admin credentials
3. Click any management card
4. Make changes and save

---

### 👷 Contractor Features

**What Contractors Can Do:**
1. **View Assigned Projects**
   - See all active renovation work
   - Track budgets and deadlines
   - View task lists

2. **Upload Progress Photos**
   - Document work as they go
   - Organize by room/area
   - Time-stamped uploads

3. **Chat with Admin**
   - Ask questions
   - Get approvals
   - Receive updates

4. **Submit Invoices**
   - Request payment
   - Track payment history
   - View pending payments

5. **Bid on Projects**
   - See available work
   - Submit competitive bids
   - Accept assignments

6. **View Ratings**
   - See performance scores
   - Read client feedback

**6 Dashboard Tabs:**
- Dashboard (default view)
- Ratings & Reviews
- Chat
- Photo Progress
- Payments & Invoices
- Project Bidding

**How to Access:**
1. Go to `/contractor-login`
2. Login with credentials
3. Navigate between tabs

---

### 💼 Investor Features

**What Investors Can Do:**
1. **View Portfolio**
   - See all investments
   - Track multiple projects
   - Monitor progress

2. **Financial Tracking**
   - Total invested
   - Current returns
   - Projected profits
   - ROI percentages

3. **Project Details**
   - Purchase prices
   - Rehab budgets
   - Timeline tracking
   - LLC information

4. **Live Updates**
   - Real-time progress
   - Cost breakdowns
   - Activity feed

**How to Access:**
1. Go to `/login`
2. Login with credentials
3. View dashboard

---

## 🔄 Auto-Sync Features

### Investment Opportunities → Projects Page

**How It Works:**
1. Add property in admin panel
2. Saves to localStorage
3. Automatically appears:
   - ✅ Homepage "Current Investment Opportunities"
   - ✅ Projects page "Upcoming" tab

**Test It:**
- Add opportunity: `/admin/edit/investment-opportunities`
- View on homepage: `/` (scroll to opportunities section)
- View on projects: `/projects` (click "Upcoming" tab)

---

## 📊 Data Flow

```
Admin Panel
    ↓
Investment Opportunities Manager
    ↓
Save to localStorage
    ↓
    ├─→ Homepage (Current Investment Opportunities section)
    └─→ Projects Page (Upcoming tab)
```

```
Admin Panel
    ↓
Investor Portfolio Manager
    ↓
Save to localStorage
    ↓
Investor Dashboard (Loads assigned projects)
```

---

## 🎨 Current Projects

### Completed (2):
- **Sparks St Renovation** - 8 photos, 34% ROI
- **Laurel Rose Project** - 7 before/after photos, 35% ROI
- **Roger Rd Project** - 18 before/18 after photos, 33% ROI

### In Progress (2):
- **Katy Fwy Flip** - 10 photos, 27% ROI, 75% complete
- **Elm Street Contemporary** - 30% ROI, 45% complete

### Upcoming (3):
- **Pine Cottage** - Planning phase
- **Maple Ridge Drive** - Investment opportunity (32% ROI)
- **Oakmont Circle** - Investment opportunity (29% ROI)

**Total Photo Slots: 57**

---

## 📧 Email System

**3 Email Types:**
1. **Contact Form** - Investor inquiries
2. **Contractor Application** - With ID verification
3. **Investor Registration** - Welcome email

**Integration:** Resend API

---

## 🔨 Contractor Workflow

### New Contractor Journey:
1. **Apply** at `/contractor-register`
2. **Upload ID** (required)
3. **Admin reviews** at `/admin/edit/contractor-approval`
4. **Admin approves** → System sends temporary credentials
5. **Contractor logins** → Forced password change
6. **Access dashboard** → View projects, upload photos, chat, etc.

---

## 💼 Investor Workflow

### New Investor Journey:
1. **Register** at `/register`
2. **System sends** welcome email
3. **Admin assigns projects** at `/admin/edit/investor-portfolios`
4. **Investor logins** → View portfolio, track progress

---

## 🧪 Testing Checklist

### ✅ Must Test:
- [ ] Add investment opportunity in admin
- [ ] Check it appears on homepage
- [ ] Check it appears in projects → upcoming
- [ ] Edit opportunity in admin
- [ ] Verify changes on homepage and projects page
- [ ] Login as contractor (demo/demo123)
- [ ] View all 6 contractor tabs
- [ ] Login as investor
- [ ] View portfolio dashboard

---

## 📱 Responsive Design

**All pages work on:**
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

---

## 🎯 Quick Actions

### Want to add a new property?
1. `/admin` → "Investment Opportunities"
2. Click "Add New Property"
3. Fill details → Save
4. Done! Appears everywhere

### Want to assign project to investor?
1. `/admin` → "Investor Portfolios"
2. Select investor or create new
3. Click "Add Project"
4. Choose project → Set amount → Save
5. Done! Investor sees it in dashboard

### Want to approve contractor?
1. `/admin` → "Contractor Applications"
2. Review application and ID
3. Click "Approve"
4. System emails temporary credentials
5. Done! Contractor can login

---

## 🚀 Deployment Ready

**What's Complete:**
- ✅ Full admin CMS
- ✅ Dual portal system (contractors + investors)
- ✅ Auto-sync integration
- ✅ Email notifications
- ✅ ID verification
- ✅ Multi-project tracking
- ✅ Photo galleries (57 slots total)
- ✅ Responsive design
- ✅ Professional UI/UX

**Next Step:** Deploy to Netlify!

---

## 📞 Support Info

**Displayed on site:**
- Phone: (713) 545-3662
- Email: invest@flipcocapital.com

---

**Everything is ready to use! Start by testing the investment opportunities sync feature.** 🎉
