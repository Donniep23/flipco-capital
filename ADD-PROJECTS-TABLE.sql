-- ============================================
-- ADD PROJECTS TABLE TO SUPABASE
-- ============================================
-- Run this in Supabase SQL Editor to enable Projects admin functionality

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id TEXT UNIQUE NOT NULL,
  name TEXT,
  address TEXT,
  status TEXT DEFAULT 'Planning',
  category TEXT DEFAULT 'upcoming',
  purchase_price INTEGER DEFAULT 0,
  rehab_cost INTEGER DEFAULT 0,
  rehab_budget INTEGER DEFAULT 0,
  sale_price INTEGER DEFAULT 0,
  estimated_sale INTEGER DEFAULT 0,
  total_profit INTEGER DEFAULT 0,
  projected_profit INTEGER DEFAULT 0,
  roi INTEGER DEFAULT 0,
  timeline TEXT,
  start_date TEXT,
  completion_date TEXT,
  estimated_completion TEXT,
  progress INTEGER DEFAULT 0,
  before_image TEXT,
  after_image TEXT,
  before_images JSONB DEFAULT '[]'::jsonb,
  after_images JSONB DEFAULT '[]'::jsonb,
  description TEXT,
  highlights JSONB DEFAULT '[]'::jsonb,
  synced_from_opportunity BOOLEAN DEFAULT false,
  opportunity_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_projects_project_id ON projects(project_id);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust as needed for security)
CREATE POLICY "Allow all operations on projects" ON projects
  FOR ALL USING (true) WITH CHECK (true);

-- Add trigger for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
