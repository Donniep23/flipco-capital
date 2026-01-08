-- ============================================
-- ADD INVESTOR APPROVAL SYSTEM COLUMNS
-- ============================================
-- Run this in Supabase SQL Editor to enable investor approval workflow

-- Add password_hash column if it doesn't exist
ALTER TABLE investor_users
ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Ensure status column exists with correct default
ALTER TABLE investor_users
ALTER COLUMN status SET DEFAULT 'pending';

-- Update any existing records without status to 'pending'
UPDATE investor_users
SET status = 'pending'
WHERE status IS NULL;

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_investor_users_email ON investor_users(email);
CREATE INDEX IF NOT EXISTS idx_investor_users_status ON investor_users(status);

-- Verify the table structure
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'investor_users';
