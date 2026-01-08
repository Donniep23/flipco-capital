-- Run this in Supabase SQL Editor to add ALL editable text fields

ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS stats_transparency TEXT DEFAULT '100%';
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
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS projects_page_title TEXT DEFAULT 'Our Projects';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS projects_page_subtitle TEXT DEFAULT 'Explore our portfolio of successful fix-and-flip investments';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS about_company_name TEXT DEFAULT 'Flipco Capital';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS about_tagline TEXT DEFAULT 'Transparent real estate investment partnerships';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS minimum_investment TEXT DEFAULT '$50,000';

-- Update existing record with default text
UPDATE site_settings SET
  stats_transparency = '100%',
  hero_title = 'Real Estate Investment',
  hero_subtitle = 'Made Transparent',
  hero_description = 'Partner with Flipco Capital for complete transparency in fix-and-flip investments. Every project is co-owned with live tracking, real-time cost breakdowns, and guaranteed returns.',
  cta_button_primary = 'Start Investing',
  cta_button_secondary = 'Watch Demo',
  section_process_title = 'Our Process',
  section_process_subtitle = 'Simple, transparent, and profitable',
  section_features_title = 'Platform Features',
  section_features_subtitle = 'Advanced technology for complete investment transparency',
  section_opportunities_title = 'Current Investment Opportunities',
  section_opportunities_subtitle = 'Partner with us on these vetted, high-potential fix-and-flip projects. Each opportunity includes full transparency, live monitoring, and co-ownership through dedicated LLCs.',
  projects_page_title = 'Our Projects',
  projects_page_subtitle = 'Explore our portfolio of successful fix-and-flip investments',
  about_company_name = 'Flipco Capital',
  about_tagline = 'Transparent real estate investment partnerships',
  minimum_investment = '$50,000'
WHERE id = 1;
