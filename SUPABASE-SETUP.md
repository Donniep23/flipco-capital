# 🚀 Supabase Database Setup Guide

## Step 1: Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Sign up with GitHub (recommended) or email
4. Create a new organization (use your company name: "Flipco Capital")

---

## Step 2: Create New Project

1. Click **"New Project"**
2. Fill in details:
   - **Name:** `flipco-capital` (or any name you prefer)
   - **Database Password:** Create a strong password (SAVE THIS!)
   - **Region:** Choose closest to your users (e.g., US East, US West)
   - **Pricing Plan:** Free (works perfectly for your needs)
3. Click **"Create new project"**
4. Wait 2-3 minutes for database to initialize

---

## Step 3: Get Your API Keys

1. In your Supabase project dashboard, click **"Settings"** (gear icon in sidebar)
2. Click **"API"** in the settings menu
3. You'll see two important values:

### Copy These Values:

**Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
```

**anon public key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...
```

**service_role key (secret):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...
```

---

## Step 4: Add Environment Variables

Create a `.env.local` file in your `flipco-capital` folder:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Replace the values with your actual keys from Step 3!**

---

## Step 5: Create Database Tables

1. In Supabase dashboard, click **"SQL Editor"** in the sidebar
2. Click **"New query"**
3. Copy and paste the SQL below
4. Click **"Run"** (or press Ctrl+Enter)

### SQL Schema:

```sql
-- ============================================
-- FLIPCO CAPITAL DATABASE SCHEMA
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. INVESTMENT OPPORTUNITIES TABLE
-- ============================================
CREATE TABLE investment_opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  beds INTEGER DEFAULT 0,
  baths INTEGER DEFAULT 0,
  sqft INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Available Now',
  status_color TEXT NOT NULL DEFAULT 'green',
  roi INTEGER NOT NULL DEFAULT 0,
  projected_profit INTEGER NOT NULL DEFAULT 0,
  purchase_price INTEGER NOT NULL DEFAULT 0,
  renovation_budget INTEGER NOT NULL DEFAULT 0,
  estimated_arv INTEGER NOT NULL DEFAULT 0,
  timeline TEXT NOT NULL DEFAULT '4 months',
  image TEXT NOT NULL,
  investment_tiers JSONB NOT NULL DEFAULT '{"bronze": 0, "silver": 0, "gold": 0}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. TEAM MEMBERS TABLE
-- ============================================
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  bio TEXT NOT NULL,
  experience TEXT NOT NULL,
  specialties JSONB NOT NULL DEFAULT '[]'::jsonb,
  linkedin TEXT DEFAULT '#',
  email TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. CONTRACTOR DATA TABLE
-- ============================================
CREATE TABLE contractor_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  stats JSONB NOT NULL DEFAULT '{
    "total_earnings": 0,
    "active_projects": 0,
    "completed_projects": 0,
    "average_rating": 5.0,
    "tasks_completed": 0,
    "pending_payments": 0
  }'::jsonb,
  projects JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. INVESTOR PORTFOLIOS TABLE
-- ============================================
CREATE TABLE investor_portfolios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  investor_name TEXT NOT NULL,
  investor_email TEXT UNIQUE NOT NULL,
  total_invested INTEGER NOT NULL DEFAULT 0,
  projects JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_investment_opportunities_opportunity_id ON investment_opportunities(opportunity_id);
CREATE INDEX idx_team_members_order_index ON team_members(order_index);
CREATE INDEX idx_contractor_data_username ON contractor_data(username);
CREATE INDEX idx_investor_portfolios_email ON investor_portfolios(investor_email);

-- ============================================
-- 6. UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 7. APPLY TRIGGERS TO ALL TABLES
-- ============================================
CREATE TRIGGER update_investment_opportunities_updated_at
  BEFORE UPDATE ON investment_opportunities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON team_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contractor_data_updated_at
  BEFORE UPDATE ON contractor_data
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_investor_portfolios_updated_at
  BEFORE UPDATE ON investor_portfolios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS
ALTER TABLE investment_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE contractor_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_portfolios ENABLE ROW LEVEL SECURITY;

-- Allow public read access (everyone can view)
CREATE POLICY "Public read access" ON investment_opportunities FOR SELECT USING (true);
CREATE POLICY "Public read access" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public read access" ON contractor_data FOR SELECT USING (true);
CREATE POLICY "Public read access" ON investor_portfolios FOR SELECT USING (true);

-- Allow service role full access (for admin operations)
CREATE POLICY "Service role full access" ON investment_opportunities FOR ALL USING (true);
CREATE POLICY "Service role full access" ON team_members FOR ALL USING (true);
CREATE POLICY "Service role full access" ON contractor_data FOR ALL USING (true);
CREATE POLICY "Service role full access" ON investor_portfolios FOR ALL USING (true);
```

---

## Step 6: Verify Tables Created

1. In Supabase dashboard, click **"Table Editor"** in sidebar
2. You should see 4 tables:
   - ✅ `investment_opportunities`
   - ✅ `team_members`
   - ✅ `contractor_data`
   - ✅ `investor_portfolios`

---

## Step 7: Add to Netlify Environment Variables

1. Go to your Netlify dashboard
2. Select your `flipco-capital` site
3. Go to **Site settings** → **Environment variables**
4. Click **"Add a variable"** and add these 3:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxxxxxxxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJI...` (your anon key) |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJI...` (your service role key) |

5. Click **"Save"**
6. **Trigger a new deploy** for changes to take effect

---

## Step 8: Test Locally

1. Restart your development server:
```bash
cd flipco-capital
bun run dev
```

2. The app should now connect to Supabase!

---

## ✅ What This Gives You

### Before (localStorage):
- ❌ Changes only visible on YOUR browser
- ❌ Data lost if you clear browser
- ❌ Can't share with team

### After (Supabase):
- ✅ Changes visible on ALL devices instantly
- ✅ Data persists permanently
- ✅ Professional database
- ✅ Free tier supports thousands of users
- ✅ Admin edits appear immediately on flipcocapital.com

---

## 🔐 Security Features

- **Row Level Security (RLS)** enabled
- **Public can read** (view website)
- **Only service role can write** (admin panel with API keys)
- **SSL encrypted** connections
- **Automatic backups** (Supabase handles this)

---

## 📊 How to View Your Data

1. Go to **"Table Editor"** in Supabase dashboard
2. Click any table to see stored data
3. You can manually edit data here too (for testing)

---

## 🆘 Need Help?

If you get stuck:
1. Check that `.env.local` has the correct keys
2. Verify tables were created in Supabase
3. Make sure Netlify environment variables are set
4. Clear browser cache and restart dev server

---

**Once you complete these steps, let me know and I'll update the admin panel to use Supabase!**
