-- ========================================
-- COPY EVERYTHING IN THIS FILE
-- ========================================
-- Select all (Ctrl+A), copy (Ctrl+C), then paste into Supabase SQL Editor

-- Add all columns if they don't exist
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS total_properties INTEGER DEFAULT 1500;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS average_roi INTEGER DEFAULT 30;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS stats_transparency TEXT DEFAULT '100%';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS total_investment_volume INTEGER DEFAULT 300;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS happy_investors INTEGER DEFAULT 30;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS company_phone TEXT DEFAULT '(713) 545-3662';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS company_email TEXT DEFAULT 'invest@flipcocapital.com';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS hero_title TEXT DEFAULT 'Real Estate Investment';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS hero_subtitle TEXT DEFAULT 'Made Transparent';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS hero_description TEXT DEFAULT 'Partner with Flipco Capital for complete transparency in fix-and-flip investments. Every project is co-owned with live tracking, real-time cost breakdowns, and guaranteed returns.';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS cta_button_primary TEXT DEFAULT 'Start Investing';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS cta_button_secondary TEXT DEFAULT 'Watch Demo';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS section_process_title TEXT DEFAULT 'Our Process';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS section_process_subtitle TEXT DEFAULT 'Simple, transparent, and profitable';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS section_features_title TEXT DEFAULT 'Platform Features';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS section_features_subtitle TEXT DEFAULT 'Advanced technology for complete investment transparency';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS section_opportunities_title TEXT DEFAULT 'Current Investment Opportunities';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS section_opportunities_subtitle TEXT DEFAULT 'Partner with us on these vetted, high-potential fix-and-flip projects. Each opportunity includes full transparency, live monitoring, and co-ownership through dedicated LLCs.';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS projects_page_title TEXT DEFAULT 'Our Project Portfolio';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS projects_page_subtitle TEXT DEFAULT 'Explore our portfolio of successful fix-and-flip investments';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS about_company_name TEXT DEFAULT 'Flipco Capital';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS about_tagline TEXT DEFAULT 'Transparent real estate investment partnerships';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS minimum_investment TEXT DEFAULT '$50,000';

-- Insert a default row if the table is empty
INSERT INTO site_settings (id)
SELECT 1
WHERE NOT EXISTS (SELECT 1 FROM site_settings WHERE id = 1);

-- Update the row with all default values (only updates NULL fields)
UPDATE site_settings SET
  total_properties = COALESCE(total_properties, 1500),
  average_roi = COALESCE(average_roi, 30),
  stats_transparency = COALESCE(stats_transparency, '100%'),
  total_investment_volume = COALESCE(total_investment_volume, 300),
  happy_investors = COALESCE(happy_investors, 30),
  company_phone = COALESCE(company_phone, '(713) 545-3662'),
  company_email = COALESCE(company_email, 'invest@flipcocapital.com'),
  hero_title = COALESCE(hero_title, 'Real Estate Investment'),
  hero_subtitle = COALESCE(hero_subtitle, 'Made Transparent'),
  hero_description = COALESCE(hero_description, 'Partner with Flipco Capital for complete transparency in fix-and-flip investments. Every project is co-owned with live tracking, real-time cost breakdowns, and guaranteed returns.'),
  cta_button_primary = COALESCE(cta_button_primary, 'Start Investing'),
  cta_button_secondary = COALESCE(cta_button_secondary, 'Watch Demo'),
  section_process_title = COALESCE(section_process_title, 'Our Process'),
  section_process_subtitle = COALESCE(section_process_subtitle, 'Simple, transparent, and profitable'),
  section_features_title = COALESCE(section_features_title, 'Platform Features'),
  section_features_subtitle = COALESCE(section_features_subtitle, 'Advanced technology for complete investment transparency'),
  section_opportunities_title = COALESCE(section_opportunities_title, 'Current Investment Opportunities'),
  section_opportunities_subtitle = COALESCE(section_opportunities_subtitle, 'Partner with us on these vetted, high-potential fix-and-flip projects. Each opportunity includes full transparency, live monitoring, and co-ownership through dedicated LLCs.'),
  projects_page_title = COALESCE(projects_page_title, 'Our Project Portfolio'),
  projects_page_subtitle = COALESCE(projects_page_subtitle, 'Explore our portfolio of successful fix-and-flip investments'),
  about_company_name = COALESCE(about_company_name, 'Flipco Capital'),
  about_tagline = COALESCE(about_tagline, 'Transparent real estate investment partnerships'),
  minimum_investment = COALESCE(minimum_investment, '$50,000')
WHERE id = 1;

-- Verify it worked
SELECT * FROM site_settings WHERE id = 1;
