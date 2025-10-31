-- ============================================
-- FLIPCO CAPITAL DATABASE SCHEMA
-- ============================================
-- Copy this ENTIRE file and paste into Supabase SQL Editor
-- Then click "Run" to create all tables

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
