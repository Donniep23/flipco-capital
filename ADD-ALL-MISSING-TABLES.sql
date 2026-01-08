-- ============================================
-- ADD ALL MISSING TABLES FOR ADMIN PORTAL
-- ============================================
-- Run this ENTIRE file in Supabase SQL Editor
-- This enables all admin sections to save and sync

-- ============================================
-- 1. SITE SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  total_properties INTEGER DEFAULT 1500,
  average_roi INTEGER DEFAULT 30,
  stats_transparency TEXT DEFAULT '100%',
  total_investment_volume INTEGER DEFAULT 300,
  happy_investors INTEGER DEFAULT 30,
  company_phone TEXT DEFAULT '(713) 545-3662',
  company_email TEXT DEFAULT 'invest@flipcocapital.com',
  hero_title TEXT DEFAULT 'Real Estate Investment',
  hero_subtitle TEXT DEFAULT 'Made Transparent',
  hero_description TEXT,
  cta_button_primary TEXT DEFAULT 'Start Investing',
  cta_button_secondary TEXT DEFAULT 'Watch Demo',
  section_process_title TEXT DEFAULT 'Our Process',
  section_process_subtitle TEXT,
  section_features_title TEXT DEFAULT 'Platform Features',
  section_features_subtitle TEXT,
  section_opportunities_title TEXT DEFAULT 'Current Investment Opportunities',
  section_opportunities_subtitle TEXT,
  projects_page_title TEXT DEFAULT 'Our Projects',
  projects_page_subtitle TEXT,
  minimum_investment TEXT DEFAULT '$50,000',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all on site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- 2. FAQ ITEMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS faq_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  faq_id TEXT UNIQUE NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all on faq_items" ON faq_items FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- 3. MEDIA/IMAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS media_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT DEFAULT 'image',
  size INTEGER DEFAULT 0,
  alt_text TEXT,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all on media_library" ON media_library FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- 4. CONTRACTOR APPROVALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS contractor_approvals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contractor_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  license_number TEXT,
  specialties JSONB DEFAULT '[]'::jsonb,
  experience TEXT,
  service_areas TEXT,
  status TEXT DEFAULT 'pending',
  id_card_url TEXT,
  notes TEXT,
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE contractor_approvals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all on contractor_approvals" ON contractor_approvals FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- 5. CONTRACTOR ASSIGNMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS contractor_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id TEXT UNIQUE NOT NULL,
  contractor_id TEXT NOT NULL,
  project_id TEXT NOT NULL,
  task_description TEXT,
  status TEXT DEFAULT 'assigned',
  start_date TEXT,
  due_date TEXT,
  completed_date TEXT,
  payment_amount INTEGER DEFAULT 0,
  payment_status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE contractor_assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all on contractor_assignments" ON contractor_assignments FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- 6. INVESTOR USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS investor_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  investor_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  company TEXT,
  investment_amount TEXT,
  investment_goals TEXT,
  risk_tolerance TEXT,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE investor_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all on investor_users" ON investor_users FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- 7. CONTACT SUBMISSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  investment_amount TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all on contact_submissions" ON contact_submissions FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
-- If you see this, all tables were created successfully!
SELECT 'All tables created successfully!' as status;
