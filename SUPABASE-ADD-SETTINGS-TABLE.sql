-- Add this to your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  total_properties INTEGER DEFAULT 1500,
  average_roi INTEGER DEFAULT 30,
  total_investment_volume INTEGER DEFAULT 300,
  happy_investors INTEGER DEFAULT 30,
  company_phone TEXT DEFAULT '(713) 545-3662',
  company_email TEXT DEFAULT 'invest@flipcocapital.com',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert default values
INSERT INTO site_settings (id, total_properties, average_roi, total_investment_volume, happy_investors)
VALUES (1, 1500, 30, 300, 30)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read access" ON site_settings FOR SELECT USING (true);

-- Service role full access
CREATE POLICY "Service role full access" ON site_settings FOR ALL USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
